import os

filepath = r"d:\Experiment\CTFd\CTFd\themes\core\templates\challenges.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Title area
content = content.replace(
    'class="cyber-page-title text-purple" style="letter-spacing: 4px; "',
    'class="cyber-page-title" style="letter-spacing: 4px; color: #0f172a; font-weight: 800;"'
)
content = content.replace(
    '<div style="width: 15px; height: 4px; background: #b026ff; transform: skewX(-30deg);"></div>\n        <div style="width: 15px; height: 4px; background: #b026ff; transform: skewX(-30deg);"></div>\n        <div style="width: 30px; height: 4px; background: #b026ff; transform: skewX(-30deg);"></div>',
    '<div style="width: 50px; height: 4px; background: linear-gradient(90deg, transparent, #0066ff); transform: skewX(-30deg);"></div>\n        <div style="width: 15px; height: 4px; background: #0066ff; transform: skewX(-30deg);"></div>\n        <div style="width: 15px; height: 4px; background: #0066ff; transform: skewX(-30deg);"></div>\n        <div style="width: 15px; height: 4px; background: #0066ff; transform: skewX(-30deg);"></div>'
)

# 2. Update Search icon color
content = content.replace(
    '<i class="fas fa-search position-absolute text-muted" style="left: 15px; top: 12px;"></i>',
    '<i class="fas fa-search position-absolute" style="color: #0066ff; left: 15px; top: 12px;"></i>'
)

# 3. Update Row Info (Title and Badge)
content = content.replace(
    '<h4 class="m-0 text-white font-weight-bold" x-text="c.name"></h4>',
    '<h4 class="m-0 font-weight-bold cyber-row-title" style="color: #0f172a;" x-text="c.name"></h4>'
)

# 4. Update Difficulty Dots HTML
old_diff = '''<div class="d-flex cyber-difficulty-bars">
                      <div class="cyber-bar cyber-bar-filled"></div>
                      <div class="cyber-bar" :class="(getDifficulty(c) === 'Medium' || getDifficulty(c) === 'Hard') ? 'cyber-bar-filled' : 'cyber-bar-inactive'"></div>
                      <div class="cyber-bar" :class="getDifficulty(c) === 'Hard' ? 'cyber-bar-filled' : 'cyber-bar-inactive'"></div>
                    </div>
                    <span class="small font-weight-bold text-purple" x-text="getDifficulty(c).toUpperCase()"></span>'''
new_diff = '''<div class="d-flex gap-1 cyber-difficulty-dots align-items-center">
                      <div class="diff-dot filled"></div>
                      <div class="diff-dot" :class="(getDifficulty(c) === 'Medium' || getDifficulty(c) === 'Hard') ? 'filled' : 'empty'"></div>
                      <div class="diff-dot" :class="getDifficulty(c) === 'Hard' ? 'filled' : 'empty'"></div>
                      <div class="diff-dot empty"></div>
                    </div>
                    <span class="small font-weight-bold" style="color: #0066ff;" x-text="getDifficulty(c).toUpperCase()"></span>'''
content = content.replace(old_diff, new_diff)

# 5. Update Points and Solves classes
content = content.replace('fs-4 text-purple font-monospace', 'fs-5 font-weight-bold')
content = content.replace('fs-4 text-purple font-monospace', 'fs-5 font-weight-bold') # do it again for solves

# 6. Update JS colors from #b026ff to #0066ff
content = content.replace("'#b026ff'", "'#0066ff'")
content = content.replace("text-purple", "text-primary")

# 7. Replace CSS block
style_start = content.find('  <style>')
style_end = content.find('  </style>') + len('  </style>')

new_css = """  <style>
    /* ICE WHITE CHALLENGES BOARD STYLES */
    body {
      background-color: #f4f6f9;
      background-image: 
        linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      color: #333;
    }
    
    .text-primary { color: #0066ff !important; }
    
    /* Filters */
    .cyber-domain-btn {
      background: #0f172a;
      border: 1px solid #0f172a;
      color: #fff;
      padding: 10px 24px;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .cyber-domain-btn i {
      color: #0066ff !important;
    }
    .cyber-domain-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    .cyber-domain-btn.active {
      border-color: #0066ff;
      background: #ffffff;
      color: #0066ff;
    }
    .cyber-domain-btn.active i {
      color: #0066ff !important;
    }
    
    .cyber-secondary-filters {
      background: transparent;
      border: none;
      padding: 0 !important;
    }
    
    .cyber-search-input, .cyber-select {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      color: #4a5568 !important;
      border-radius: 8px !important;
      padding: 10px 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .cyber-search-input:focus, .cyber-select:focus {
      border-color: #0066ff !important;
      box-shadow: 0 0 0 3px rgba(0,102,255,0.1) !important;
    }
    .cyber-search-input {
        padding-left: 45px !important;
    }
    .cyber-select option {
      background: #fff;
      color: #333;
    }
    
    /* Rows */
    .cyber-row {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    .cyber-row:hover {
      box-shadow: 0 8px 25px rgba(0,102,255,0.1);
      transform: translateY(-2px);
    }
    
    /* Left blue line accent */
    .cyber-row::before {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 5px;
      background: #0066ff;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
    .cyber-row::after { display: none; } /* Remove old corner cuts */
    
    .cyber-row-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      color: #0066ff !important;
      background: #eef2ff;
      border: none;
      position: relative;
    }
    .cyber-row-icon i { color: #0066ff !important; }
    .cyber-row-icon::before, .cyber-row-icon::after { display: none; } /* Remove old corner brackets */
    
    .cyber-badge-new {
      background: #eef2ff;
      border: none;
      color: #0066ff;
      font-size: 0.65rem;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    
    .cyber-category-pill {
      border: 1px solid #0066ff !important;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.75rem;
      color: #0066ff !important;
      background: transparent;
      font-weight: 600;
    }
    
    /* Difficulty Dots */
    .cyber-difficulty-dots { gap: 4px; }
    .diff-dot { width: 10px; height: 10px; border-radius: 50%; }
    .diff-dot.filled { background: #0066ff; }
    .diff-dot.empty { background: #cbd5e1; }
    
    .cyber-row-points .fs-5, .cyber-row-solves .fs-5 { color: #0066ff; }
    
    /* View Button */
    .cyber-view-btn {
      background: #ffffff;
      color: #4a5568;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 24px;
      font-weight: 600;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    .cyber-view-btn:hover {
      background: #f8fafc;
      border-color: #0066ff;
      color: #0066ff;
    }
    
    /* Solved State */
    .cyber-solved-row .cyber-view-btn {
      color: #0066ff;
      background: #f8fafc;
      border-color: #e2e8f0;
    }
    .cyber-solved-row {
      opacity: 0.8;
    }
    .cyber-solved-row:hover {
      opacity: 1;
    }
    
    /* Pagination */
    .cyber-pagination .page-link {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #4a5568;
      border-radius: 6px;
      margin: 0 2px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .cyber-pagination .page-item.active .page-link {
      background: #0066ff;
      border-color: #0066ff;
      color: #ffffff;
    }
    .cyber-pagination .page-link:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #0066ff;
      color: #0066ff;
    }
    .cyber-pagination .page-item.disabled .page-link {
      background: #f1f5f9;
      color: #94a3b8;
    }
  </style>"""

content = content[:style_start] + new_css + content[style_end:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Challenges page updated successfully!")
