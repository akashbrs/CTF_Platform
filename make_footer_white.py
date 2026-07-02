import re

base_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\base.html"

with open(base_html_path, "r", encoding="utf-8") as f:
    content = f.read()

# We only want to modify the footer area to avoid touching global primary buttons
footer_start = content.find('<footer class="mt-auto">')
if footer_start != -1:
    footer_content = content[footer_start:]
    
    # Change bright blue to ice white
    footer_content = footer_content.replace("#0066ff", "#ffffff")
    
    # Change light grey text to ice white
    footer_content = footer_content.replace("#d0d0d0", "#ffffff")
    
    # Optional: Make the ctfd credit text slightly more visible on the dark background
    footer_content = footer_content.replace("opacity: 0.02;", "opacity: 0.3;")
    
    content = content[:footer_start] + footer_content

with open(base_html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Footer text and icons changed to ice white successfully!")
