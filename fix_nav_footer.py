import re

base_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\base.html"
navbar_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\components\navbar.html"

# 1. Update base.html
with open(base_html_path, "r", encoding="utf-8") as f:
    base_content = f.read()

# We want to remove the block from "/* Light theme overrides for footer */" to the end of the <style> tag.
# Basically from `      /* Light theme overrides for footer */` up to just before `    </style>`
override_start = base_content.find("      /* Light theme overrides for footer */")
if override_start != -1:
    override_end = base_content.find("    </style>", override_start)
    if override_end != -1:
        base_content = base_content[:override_start] + base_content[override_end:]

with open(base_html_path, "w", encoding="utf-8") as f:
    f.write(base_content)


# 2. Update navbar.html
with open(navbar_html_path, "r", encoding="utf-8") as f:
    navbar_content = f.read()

# Make the bottom part uniform charcoal grey
navbar_content = navbar_content.replace("#2d3a43", "#36454F")

# Make text ice white where it's light grey
navbar_content = navbar_content.replace("color: #cbd5e1;", "color: #ffffff;")

# Remove the `html[data-theme="light"] ` prefix from navbar CSS
navbar_content = navbar_content.replace('html[data-theme="light"] ', '')

with open(navbar_html_path, "w", encoding="utf-8") as f:
    f.write(navbar_content)

print("Navbar and footer fixed successfully!")
