#!/usr/bin/env python3
"""
Unicode Safety Scanner for ui-ux-pro-max
Scans skill and config files for hidden characters used in prompt injection attacks.
"""
import sys
import os

SUSPICIOUS = {
    '\u200B': 'Zero-width space',
    '\u200C': 'Zero-width non-joiner',
    '\u200D': 'Zero-width joiner',
    '\uFEFF': 'BOM / Zero-width no-break space',
    '\u00AD': 'Soft hyphen',
    '\u200E': 'Left-to-right mark',
    '\u200F': 'Right-to-left mark',
    '\u202A': 'Left-to-right embedding',
    '\u202B': 'Right-to-left embedding',
    '\u202C': 'Pop directional formatting',
    '\u202D': 'Left-to-right override',
    '\u202E': 'Right-to-left override',
    '\u2066': 'Left-to-right isolate',
    '\u2067': 'Right-to-left isolate',
    '\u2068': 'First strong isolate',
    '\u2069': 'Pop directional isolate',
    '\u2060': 'Word joiner',
}

SCAN_EXTENSIONS = {'.md', '.json', '.yml', '.yaml', '.toml', '.txt', '.js', '.py', '.ts'}

def scan_file(path):
    findings = []
    try:
        with open(path, encoding='utf-8', errors='replace') as f:
            for i, line in enumerate(f, 1):
                for char, name in SUSPICIOUS.items():
                    col = line.find(char)
                    while col != -1:
                        findings.append({
                            'file': path, 'line': i, 'col': col + 1,
                            'char': f'U+{ord(char):04X}', 'name': name
                        })
                        col = line.find(char, col + 1)
    except Exception:
        pass
    return findings

def walk(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'node_modules']
        for fname in filenames:
            if os.path.splitext(fname)[1].lower() in SCAN_EXTENSIONS:
                yield os.path.join(dirpath, fname)

if __name__ == '__main__':
    dirs = sys.argv[1:] or ['.']
    all_findings = []
    for d in dirs:
        for path in walk(d):
            all_findings.extend(scan_file(path))

    if all_findings:
        for f in all_findings:
            print(f"  {f['file']}:{f['line']}:{f['col']} — {f['char']} ({f['name']})")
        print(f"\n{len(all_findings)} suspicious character(s) found")
        sys.exit(1)
    else:
        print("Unicode safety scan passed — no hidden characters found")
