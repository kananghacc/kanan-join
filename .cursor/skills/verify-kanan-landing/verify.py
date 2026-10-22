#!/usr/bin/env python3
"""Own one static server and browser run; keep evidence after teardown."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import socket
import subprocess
import sys
import time
import urllib.request


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--feature', choices=['all', 'demo', 'testimonials', 'trainers', 'thank-you'], default='demo')
    parser.add_argument('--evidence', required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[3]
    evidence = Path(args.evidence).resolve()
    evidence.mkdir(parents=True, exist_ok=False)
    runtime = Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node'
    node = os.environ.get('VERIFY_NODE') or str(runtime / 'bin/node')
    if not Path(node).is_file():
        node = shutil.which('node')
    if not node:
        raise RuntimeError('Node is missing; set VERIFY_NODE to an installed Node executable')
    env = os.environ.copy()
    env.setdefault('NODE_PATH', str(runtime / 'node_modules'))
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        port = sock.getsockname()[1]
    url = f'http://127.0.0.1:{port}'
    source = root / 'ielts-online-coaching-gcc/index.html'
    before = hashlib.sha256(source.read_bytes()).hexdigest()
    server = None
    report = {'feature': args.feature, 'url': url, 'source_sha256': before}
    result = 1
    with (evidence / 'server.log').open('w') as log:
        try:
            server = subprocess.Popen([sys.executable, '-u', str(root / 'dev_server.py'), '--host', '127.0.0.1', '--port', str(port)], cwd=root, stdout=log, stderr=log)
            report['server_pid'] = server.pid
            def doctor():
                for attempt in range(100):
                    if server.poll() is not None:
                        raise RuntimeError('Owned server exited; inspect server.log')
                    try:
                        with urllib.request.urlopen(url + '/ielts-online-coaching-gcc/', timeout=1) as response:
                            body = response.read()
                        if body != source.read_bytes():
                            raise RuntimeError('Doctor: served source differs from this checkout')
                        return 'passed: owned process alive, HTTP source matches checkout'
                    except (OSError, TimeoutError):
                        time.sleep(0.1)
                raise RuntimeError('Server never became ready')

            report['doctor'] = doctor()
            report['server_pid'] = server.pid
            (evidence / 'run.json').write_text(json.dumps(report, indent=2) + '\n')
            features = ['demo', 'testimonials', 'trainers', 'thank-you'] if args.feature == 'all' else [args.feature]
            report['features'] = {}
            result = 0
            for feature in features:
                feature_dir = evidence / feature if args.feature == 'all' else evidence
                feature_dir.mkdir(exist_ok=True)
                state = {'doctor_before': doctor()}
                with (feature_dir / 'browser.log').open('w') as browser_log:
                    completed = subprocess.run([node, str(Path(__file__).with_name('drive.cjs')), url, str(feature_dir), feature], env=env, stdout=browser_log, stderr=subprocess.STDOUT, timeout=180)
                state['browser_exit_code'] = completed.returncode
                state['doctor_after'] = doctor()
                state['evidence_retained'] = all((feature_dir / name).is_file() for name in ['result.json', 'requests.json', 'trace.zip'])
                report['features'][feature] = state
                if completed.returncode or not state['evidence_retained']:
                    result = 1
        except Exception as exc:
            result = 1
            report['error'] = str(exc)
        finally:
            if server is not None:
                server.terminate()
                try:
                    server.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    server.kill()
                    server.wait()
                report['cleanup'] = 'owned server stopped'
            report['source_unchanged'] = hashlib.sha256(source.read_bytes()).hexdigest() == before
            report['browser_exit_code'] = result
            (evidence / 'run.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))
    assert (evidence / 'run.json').is_file()
    return result


if __name__ == '__main__':
    sys.exit(main())
