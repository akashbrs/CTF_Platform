import os
import re

templates_dir = 'd:/Experiment/CTFd/CTFd/themes/core/templates'

for root, dirs, files in os.walk(templates_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove text-shadow
            content = re.sub(r'(?<!-)\btext-shadow\s*:[^;\"]+;?', '', content)
            
            # Remove box-shadow
            content = re.sub(r'(?<!-)\bbox-shadow\s*:[^;\"]+;?', '', content)
            
            # Remove filter: drop-shadow (and other filters to remove glows)
            content = re.sub(r'(?<!-)\bfilter\s*:[^;\"]+;?', '', content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print('Done stripping glows!')
