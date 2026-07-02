import os

css_fix = """
<style>
  /* Fix ice white text issue on light theme */
  .text-muted {
      color: #111111 !important;
      opacity: 0.8;
  }
</style>
"""

users_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\users\users.html"
challenges_path = r"d:\Experiment\CTFd\CTFd\themes\core\templates\challenges.html"

with open(users_path, "a", encoding="utf-8") as f:
    f.write(css_fix)

with open(challenges_path, "a", encoding="utf-8") as f:
    f.write(css_fix)

print("Text colors updated to black for users and challenges pages.")
