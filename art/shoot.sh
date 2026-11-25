#!/usr/bin/env bash
# Builds art/front-page.html and photographs it to entry.png (1024x1024).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
root="$(dirname "$here")"
node "$here/page.mjs"
chrome="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
profile="$(mktemp -d)"
win_html="$(cygpath -w "$here/front-page.html" 2>/dev/null || echo "$here/front-page.html")"
win_out="$(cygpath -w "$root/entry.png" 2>/dev/null || echo "$root/entry.png")"
timeout 90 "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --user-data-dir="$profile" --window-size=1024,1024 --virtual-time-budget=2000 \
  --screenshot="$win_out" "file:///${win_html//\\//}" >/dev/null 2>&1 || true
rm -rf "$profile"
ls -l "$root/entry.png"
