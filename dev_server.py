#!/usr/bin/env python3
import argparse
import os
import posixpath
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote


class MultiRootHTTPRequestHandler(SimpleHTTPRequestHandler):
    """
    A SimpleHTTPRequestHandler that can serve multiple directories mounted
    at specific URL prefixes (e.g., /canada -> ./canada).

    Example mounts:
        {
            "/canada": "/Applications/MAMP/htdocs/landing-3/canada",
            "/us": "/Applications/MAMP/htdocs/landing-3/us",
            "/ielts-online-coaching": "/Applications/MAMP/htdocs/landing-3/ielts-online-coaching",
        }
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


def main():
    parser = argparse.ArgumentParser(description='Multi-root static dev server')
    parser.add_argument('--port', type=int, default=8080, help='Port to listen on (default: 8080)')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to bind (default: 0.0.0.0)')

    # Allow overriding or adding mounts via env if desired in future
    args = parser.parse_args()

    base_dir = os.path.abspath(os.path.dirname(__file__))

    mounts = {}
    
    # Automatically discover landing page directories (any dir with index.html)
    for item in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path) and not item.startswith('.'):
            if os.path.exists(os.path.join(item_path, 'index.html')):
                mounts[f'/{item}'] = item_path

    # Keep explicit mounts if any are special, but here we cover them all
    # Adding some that might not have index.html at root but still need to be served
    special_mounts = {
        # Add any special mappings here if needed
    }
    mounts.update(special_mounts)

    handler_factory = lambda *h_args, **h_kwargs: MultiRootHTTPRequestHandler(
        *h_args, mounts=mounts, **h_kwargs
    )

    httpd = ThreadingHTTPServer((args.host, args.port), handler_factory)
    print(f"Serving multiple folders on http://{args.host}:{args.port}")
    # Sort for cleaner output
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







