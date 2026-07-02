import os

base_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\base.html"
navbar_html_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\components\navbar.html"

# 1. Update base.html
with open(base_html_path, "r", encoding="utf-8") as f:
    base_content = f.read()

# Replace main style block
style_start_marker = "  <style>\n    body {"
style_end_marker = "  </style>\n\n  {{ Configs.theme_header }}"

start_idx = base_content.find("  <style>\n    body {")
end_idx = base_content.find("  </style>\n\n  {{ Configs.theme_header }}") + len("  </style>")

if start_idx != -1 and end_idx != -1:
    new_style = """  <style>
    body {
      font-family: 'Geist Pixel', sans-serif !important;
      background-color: #f4f6f9;
      background-image: none;
      color: #1a1a1a !important;
      min-height: 100vh;
      margin: 0;
      position: relative;
    }

    /* Layout Gap Fixes */
    main>.container,
    main>.jumbotron {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    main .container>.row>div>img {
      padding-top: 20px !important;
    }

    /* Jumbotron / Page Headers */
    .jumbotron {
      background: transparent !important;
      padding: 1rem 0 1rem !important;
      position: relative;
      text-align: center;
      margin-top: 0 !important;
    }

    .jumbotron h1 {
      font-family: 'Geist Pixel', sans-serif;
      color: #111;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 0;
    }

    .jumbotron h1::after {
      content: '';
      display: block;
      width: 100px;
      border-top: 3px solid #0066ff;
      margin: 15px auto 0;
    }

    /* Global Forms & Search Bars */
    .form-control,
    .form-select {
      background: #fff !important;
      border: 1px solid #ccc !important;
      color: #333 !important;
      border-radius: 4px;
    }

    .form-control:focus,
    .form-select:focus {
      border-color: #0066ff !important;
    }

    .form-control::placeholder {
      color: #888 !important;
    }

    .btn-primary {
      background: linear-gradient(45deg, #7a00ff, #0066ff) !important;
      border: none !important;
      transition: 0.3s ease;
      color: #fff !important;
    }

    .btn-primary:hover {
      transform: scale(1.05);
    }

    /* Global Data Tables */
    .table {
      background: #fff;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      color: #333;
      margin-bottom: 30px;
      overflow: hidden;
    }

    .table> :not(caption)>*>* {
      background-color: transparent !important;
      color: inherit;
      border-bottom-color: #dee2e6;
    }

    .table thead th {
      background: #f8f9fa !important;
      color: #111 !important;
      font-family: 'Geist Pixel', sans-serif;
      letter-spacing: 1px;
      border-bottom: 2px solid #dee2e6 !important;
      border-top: none !important;
      text-transform: uppercase;
      font-size: 0.9rem;
    }

    .table tbody tr {
      transition: 0.3s ease;
      border-bottom: 1px solid #dee2e6;
    }

    .table tbody tr:hover td,
    .table tbody tr:hover th {
      background: #f1f3f5 !important;
    }

    .table tbody td {
      border: none !important;
      padding: 1rem 0.75rem;
      vertical-align: middle;
    }

    .table a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: 0.3s ease;
    }

    .table a:hover {
      color: #0066ff;
    }

    /* Navigation Pills (Scoreboard/Settings Tabs) */
    .nav-pills .nav-link {
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      margin: 0 5px;
      transition: 0.3s ease;
    }

    .nav-pills .nav-link.active,
    .nav-pills .nav-link:hover {
      background: rgba(0, 102, 255, 0.1) !important;
      border-color: #0066ff;
      color: #0066ff !important;
    }

    /* Challenge Board Buttons Override */
    .challenge-button {
      background: #fff !important;
      border: 1px solid #ccc !important;
      border-radius: 8px;
      color: #333 !important;
      transition: 0.3s ease !important;
    }

    .challenge-button:hover {
      border-color: #0066ff !important;
      transform: scale(1.02);
    }

    .challenge-solved {
      background: #e6f9ec !important;
      border-color: #00d140 !important;
    }

    /* Pagination */
    .page-select {
      background: #fff;
      border: 1px solid #ccc;
      color: #333;
      padding: 2px 10px;
      border-radius: 4px;
    }

    /* Modal overrides */
    .modal-content {
      background: #fff !important;
      color: #111 !important;
    }

    .modal-header,
    .modal-footer {
      border-color: #dee2e6 !important;
    }

    main {
      color: #111;
    }
  </style>"""
    base_content = base_content[:start_idx] + new_style + base_content[end_idx:]

# Update footer background
base_content = base_content.replace(
    "background: linear-gradient(135deg, rgba(40, 18, 65, 0.7), rgba(20, 5, 35, 0.9));",
    "background: #36454F;"
).replace(
    "border-top: 1px solid rgba(0, 102, 255, 0.25);",
    "border-top: 1px solid rgba(255, 255, 255, 0.1);"
).replace(
    "border-bottom: 1px solid rgba(0, 102, 255, 0.25);",
    "border-bottom: none;"
)

# Also remove html[data-theme="light"] prefixed rules from the footer style section just in case there are any,
# wait, I can just leave them if they don't break anything, or replace them. The prompt says remove dark theme, 
# so light is the only theme. We can leave the light-prefixed ones as they won't hurt, they'll just apply.
# Or better, just strip `html[data-theme="light"] ` from base.html.
base_content = base_content.replace('html[data-theme="light"] ', '')

with open(base_html_path, "w", encoding="utf-8") as f:
    f.write(base_content)

# 2. Update navbar.html
with open(navbar_html_path, "r", encoding="utf-8") as f:
    navbar_content = f.read()

# Top section background
navbar_content = navbar_content.replace(
    "background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); transition: top 0.2s ease-out;",
    "background: #36454F; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: top 0.2s ease-out;"
)

# Top section text colors
navbar_content = navbar_content.replace(
    "color: #0f172a;",
    "color: #ffffff;"
).replace(
    "color: #4a5568;",
    "color: #cbd5e1;"
)

# Bottom section background
navbar_content = navbar_content.replace(
    "background: rgba(10, 5, 20, 0.8) !important; backdrop-filter: blur(10px); border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border: 1px solid rgba(0, 102, 255, 0.3);",
    "background: #2d3a43 !important; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border: 1px solid rgba(255,255,255,0.1);"
)

# Remove any remaining dark theme specific stuff in navbar? 
# The modal ID card uses #36454F text color inside. It should remain because it has a light background.
# I'll leave the modal alone since it's already light themed.

with open(navbar_html_path, "w", encoding="utf-8") as f:
    f.write(navbar_content)

print("Theme updated successfully!")
