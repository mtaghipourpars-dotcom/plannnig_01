#!/usr/bin/env python3
from pathlib import Path
import re, sys, yaml, json

root=Path(sys.argv[1] if len(sys.argv)>1 else '.')
skill_dir=root/'SKILL.md'
errors=[]
if not skill_dir.exists(): errors.append('SKILL.md missing')
else:
    text=skill_dir.read_text(encoding='utf-8')
    lines=text.splitlines()
    if len(lines)>=3 and lines[0].strip()=='---':
        try:
            end=lines.index('---',1)
            fm=yaml.safe_load('\n'.join(lines[1:end])) or {}
            body='\n'.join(lines[end+1:])
        except Exception as e:
            errors.append(f'frontmatter parse error: {e}'); fm={}; body=''
    else:
        errors.append('YAML frontmatter opening/closing markers missing'); fm={}; body=''
    name=fm.get('name')
    if name != root.name: errors.append(f'name must match directory: {root.name!r}, got {name!r}')
    if not isinstance(name,str) or not re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?',name) or '--' in name:
        errors.append('name violates Agent Skills naming constraints')
    desc=fm.get('description')
    if not isinstance(desc,str) or not (1<=len(desc)<=1024): errors.append('description missing or length out of range')
    if len(lines)>500: errors.append(f'SKILL.md too long: {len(lines)} lines')
    # Check every markdown link/path in skill body points to a package-relative file/directory.
    for m in re.finditer(r'`([^`]+)`',body):
        p=m.group(1)
        if p.startswith(('references/','assets/','scripts/')) and not (root/p).exists():
            errors.append(f'referenced path missing: {p}')

for p in [root/'assets/schemas/openapi.yaml', root/'assets/schemas/event-catalog.yaml', root/'assets/implementation-manifest.yaml']:
    if p.exists():
        try: yaml.safe_load(p.read_text(encoding='utf-8'))
        except Exception as e: errors.append(f'YAML parse error {p}: {e}')
    else: errors.append(f'missing asset: {p.relative_to(root)}')

for p in [root/'assets/schemas/database-catalog.json', root/'assets/examples/command-samples.json']:
    if p.exists():
        try: json.loads(p.read_text(encoding='utf-8'))
        except Exception as e: errors.append(f'JSON parse error {p}: {e}')
    else: errors.append(f'missing asset: {p.relative_to(root)}')

required=[root/'README.md', root/'references/99-complete-architecture.md', root/'assets/schemas/core-schema.sql']
for p in required:
    if not p.exists(): errors.append(f'missing required package file: {p.relative_to(root)}')

print('MAPNA Agent Skill validation')
print('Root:',root.resolve())
print('Status:', 'PASS' if not errors else 'FAIL')
if errors:
    for e in errors: print(' -',e)
    sys.exit(1)
print('Validated: SKILL.md frontmatter, naming, description, size, referenced files, and packaged machine-readable assets.')
print('For official conformance, run: skills-ref validate .')
