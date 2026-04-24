import pathlib
import re

root = pathlib.Path('src')
pattern = re.compile(r'(["\'])([^"\']+?)@([0-9][^"\']*)(["\'])')
changed = []

for path in root.rglob('*'):
    if path.suffix.lower() in {'.ts', '.tsx', '.js', '.jsx'}:
        text = path.read_text(encoding='utf-8')
        new_text = pattern.sub(r'\1\2\4', text)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
            changed.append(str(path))

print('updated', len(changed), 'files')
for p in changed:
    print(p)
