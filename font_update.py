import os

font_link = """  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap" rel="stylesheet">
"""

base_path = 'd:/Experiment/CTFd/CTFd/themes/core/templates/base.html'
navbar_path = 'd:/Experiment/CTFd/CTFd/themes/core/templates/components/navbar.html'

with open(base_path, 'r', encoding='utf-8') as f:
    base = f.read()

if 'Geist+Pixel' not in base:
    base = base.replace('  <title>', font_link + '  <title>')

base = base.replace("'Orbitron', sans-serif", "'Geist Pixel', sans-serif")
base = base.replace("'Inter', sans-serif", "'Geist Pixel', sans-serif")

if "font-family: 'Geist Pixel'" not in base.split('body {')[1].split('}')[0]:
    base = base.replace('body {', "body {\n      font-family: 'Geist Pixel', sans-serif !important;")

with open(base_path, 'w', encoding='utf-8') as f:
    f.write(base)

with open(navbar_path, 'r', encoding='utf-8') as f:
    navbar = f.read()

navbar = navbar.replace("'Orbitron', sans-serif", "'Geist Pixel', sans-serif")
navbar = navbar.replace("'Inter', sans-serif", "'Geist Pixel', sans-serif")

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(navbar)
