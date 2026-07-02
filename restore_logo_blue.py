import re

base_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\base.html"

with open(base_html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Restore CSS for .footer-title span
css_old = """.footer-title span {
        color: #ffffff;

      }"""
css_new = """.footer-title span {
        color: #0066ff;

      }"""
content = content.replace(css_old, css_new)

# Restore SVG stroke
svg_old = """stroke: #ffffff; stroke-width: 3;  margin: 0 2px;">"""
svg_new = """stroke: #0066ff; stroke-width: 3;  margin: 0 2px;">"""
content = content.replace(svg_old, svg_new)

# Restore left line
left_line_old = """<div style="height: 2px; width: 25px; background: #ffffff;  border-radius: 2px;">"""
left_line_new = """<div style="height: 2px; width: 25px; background: #0066ff;  border-radius: 2px;">"""
content = content.replace(left_line_old, left_line_new)

# Restore 'miss'
miss_old = """<span style="color: #ffffff; ">miss</span>"""
miss_new = """<span style="color: #0066ff; ">miss</span>"""
content = content.replace(miss_old, miss_new)

# Restore right line
right_line_old = """<div style="height: 2px; width: 15px; background: #ffffff;  border-radius: 2px;">"""
right_line_new = """<div style="height: 2px; width: 15px; background: #0066ff;  border-radius: 2px;">"""
content = content.replace(right_line_old, right_line_new)

# Restore slanted lines
slant_old = """<div style="width: 7px; height: 10px; background: #ffffff; transform: skewX(-30deg); ">"""
slant_new = """<div style="width: 7px; height: 10px; background: #0066ff; transform: skewX(-30deg); ">"""
content = content.replace(slant_old, slant_new)

with open(base_html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored blue accents in the footer logo successfully!")
