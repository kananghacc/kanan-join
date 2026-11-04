#!/usr/bin/env python3
import argparse
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote


# Local mirror of the Tailwind Play CDN so pages still style when
# https://cdn.tailwindcss.com is blocked or unreachable.
LOCAL_TAILWIND = "/shared/tailwindcdn.js"
CDN_TAILWIND_URLS = (
    "https://cdn.tailwindcss.com",
    "http://cdn.tailwindcss.com",
)
CRM_CONFIG_PLACEHOLDER = "__CRM_SUBMIT_URL__"


def load_env_file(path):
    """Minimal .env loader (KEY=VALUE lines). Does not override existing env."""
    if not os.path.isfile(path):
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            for raw in f:
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip().strip("'").strip('"')
                if key and key not in os.environ:
                    os.environ[key] = value
    except OSError:
        pass


def resolve_crm_submit_url():
    return (os.environ.get("CRM_SUBMIT_URL") or "").strip()


class MultiRootHTTPRequestHandler(SimpleHTTPRequestHandler):
    """
    A SimpleHTTPRequestHandler that can serve multiple directories mounted
    at specific URL prefixes (e.g., /canada -> ./canada).
    """

    def __init__(self, *args, mounts=None, **kwargs):
        self.mounts = mounts or {}
        # Normalize prefixes: ensure they start with '/' and do not end with '/'
        normalized = {}
        for prefix, directory in self.mounts.items():
            if not prefix.startswith('/'):
                prefix = '/' + prefix
            if prefix != '/' and prefix.endswith('/'):
                prefix = prefix[:-1]
            normalized[prefix] = os.path.abspath(directory)
        self.mounts = normalized
        super().__init__(*args, **kwargs)

    def translate_path(self, path):
        # Copied and adapted from SimpleHTTPRequestHandler to support mounts
        # Unquote URL path
        path = unquote(path)
        # Strip query parameters and fragments
        if '?' in path:
            path = path.split('?', 1)[0]
        if '#' in path:
            path = path.split('#', 1)[0]

        # Try to match a mount prefix
        matched_prefix = None
        for prefix in sorted(self.mounts.keys(), key=len, reverse=True):
            if path == prefix or path.startswith(prefix + '/'):
                matched_prefix = prefix
                break

        if matched_prefix is not None:
            # Map to mounted directory
            directory = self.mounts[matched_prefix]
            # Remove the prefix from the URL path
            suffix = path[len(matched_prefix):]
            if suffix.startswith('/'):
                suffix = suffix[1:]
            parts = [p for p in suffix.split('/') if p and p not in ('.',)]
            safe_parts = []
            for part in parts:
                if part in ('..',):
                    # prevent directory traversal
                    continue
                safe_parts.append(part)
            final_path = os.path.join(directory, *safe_parts)
            return final_path

        # Fallback to serving from current working directory
        path = path.split('?', 1)[0]
        path = path.split('#', 1)[0]
        trailing_slash = path.rstrip().endswith('/')
        parts = [p for p in path.split('/') if p and p not in ('.',)]
        safe_parts = []
        for part in parts:
            if part in ('..',):
                continue
            safe_parts.append(part)
        cwd = os.getcwd()
        final_path = os.path.join(cwd, *safe_parts)
        if trailing_slash and not final_path.endswith(os.sep):
            final_path += os.sep
        return final_path

    def do_GET(self):
        path = unquote(self.path.split('?', 1)[0].split('#', 1)[0])
        fs_path = self.translate_path(self.path)

        # Directory indexes resolve to index.html
        if os.path.isdir(fs_path):
            index = os.path.join(fs_path, 'index.html')
            if os.path.isfile(index):
                fs_path = index
            else:
                return super().do_GET()

        if fs_path.endswith('.html') and os.path.isfile(fs_path):
            try:
                with open(fs_path, 'rb') as f:
                    body = f.read()
            except OSError:
                self.send_error(404, "File not found")
                return

            text = body.decode('utf-8', errors='surrogateescape')
            rewritten = text
            for cdn_url in CDN_TAILWIND_URLS:
                rewritten = rewritten.replace(cdn_url, LOCAL_TAILWIND)
            out = rewritten.encode('utf-8', errors='surrogateescape')

            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(out)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(out)
            return

        # Inject CRM_SUBMIT_URL from .env into the Amplify placeholder for local forms.
        if fs_path.endswith('kanan-crm-config.js') and os.path.isfile(fs_path):
            try:
                with open(fs_path, 'rb') as f:
                    body = f.read()
            except OSError:
                self.send_error(404, "File not found")
                return

            text = body.decode('utf-8', errors='surrogateescape')
            crm_url = resolve_crm_submit_url()
            if crm_url and CRM_CONFIG_PLACEHOLDER in text:
                text = text.replace(CRM_CONFIG_PLACEHOLDER, crm_url)
            out = text.encode('utf-8', errors='surrogateescape')

            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.send_header('Content-Length', str(len(out)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(out)
            return

        return super().do_GET()


def main():
    parser = argparse.ArgumentParser(description='Multi-root static dev server')
    parser.add_argument('--port', type=int, default=8080, help='Port to listen on (default: 8080)')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to bind (default: 0.0.0.0)')

    args = parser.parse_args()

    base_dir = os.path.abspath(os.path.dirname(__file__))
    load_env_file(os.path.join(base_dir, '.env'))
    crm_submit_url = resolve_crm_submit_url()

    mounts = {}

    # Automatically discover landing page directories (any dir with index.html)
    for item in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path) and not item.startswith('.'):
            if os.path.exists(os.path.join(item_path, 'index.html')):
                mounts[f'/{item}'] = item_path

    # Shared assets (CRM form CSS/JS + local Tailwind mirror)
    shared_dir = os.path.join(base_dir, 'shared')
    if os.path.isdir(shared_dir):
        mounts['/shared'] = shared_dir

    local_tw = os.path.join(shared_dir, 'tailwindcdn.js')
    if not os.path.isfile(local_tw):
        print(
            f"WARNING: {local_tw} missing. Pages depend on Tailwind utilities "
            f"and will look unstyled if https://cdn.tailwindcss.com is blocked."
        )

    handler_factory = lambda *h_args, **h_kwargs: MultiRootHTTPRequestHandler(
        *h_args, mounts=mounts, **h_kwargs
    )

    httpd = ThreadingHTTPServer((args.host, args.port), handler_factory)
    print(f"Serving multiple folders on http://{args.host}:{args.port}")
    print(f"  Tailwind CDN rewritten to {LOCAL_TAILWIND} for local HTML")
    if crm_submit_url:
        print(f"  CRM submit URL injected into /shared/kanan-crm-config.js -> {crm_submit_url}")
    else:
        print(
            "  WARNING: CRM_SUBMIT_URL not set in .env — forms fall back to /api/submit-lead"
        )
    for prefix in sorted(mounts.keys()):
        print(f"  {prefix} -> {mounts[prefix]}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__ == '__main__':
    main()
