#!/usr/bin/env bash
# Fills the 8 image slots in index.html from prompts.json.
# Run once the image API is working:  ./regen.sh
#
# Each <img> in index.html carries data-slot="SHOT1".."SHOT8" and a placeholder src.
# This script generates one image per prompt and rewrites that img's src in place.

set -uo pipefail
cd "$(dirname "$0")"

API="https://cm-idea-assistant.vercel.app/api/generate"
HTML="index.html"
FAILED=()

command -v jq >/dev/null || { echo "jq is required"; exit 1; }
[ -f "$HTML" ] || { echo "$HTML not found"; exit 1; }

cp "$HTML" "$HTML.bak"

count=$(jq '.shots | length' prompts.json)
for i in $(seq 0 $((count - 1))); do
  slot=$(jq -r ".shots[$i].slot" prompts.json)
  name=$(jq -r ".shots[$i].name" prompts.json)
  prompt=$(jq -r ".shots[$i].prompt" prompts.json)

  echo "[$slot] $name"
  body=$(jq -n --arg p "$prompt" '{prompt: $p, n_images: 1}')
  resp=$(curl -s --max-time 300 -X POST "$API" -H "Content-Type: application/json" -d "$body")
  url=$(printf '%s' "$resp" | jq -r '.images[0].url // empty')

  if [ -z "$url" ]; then
    echo "  FAILED: $(printf '%s' "$resp" | jq -r '.error // "no url in response"')"
    FAILED+=("$slot")
    continue
  fi

  echo "  -> $url"
  # Replace the src="..." that follows this slot's data-slot attribute.
  python3 - "$HTML" "$slot" "$url" <<'PY'
import re, sys
path, slot, url = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(path, encoding='utf-8').read()
pat = re.compile(r'(data-slot="%s"[^>]*?\ssrc=")[^"]*(")' % re.escape(slot))
html, n = pat.subn(lambda m: m.group(1) + url + m.group(2), html, count=1)
if n == 0:
    sys.exit("  could not find src for slot " + slot)
open(path, 'w', encoding='utf-8').write(html)
PY
done

# Drop the pending banner once every slot is filled.
if [ ${#FAILED[@]} -eq 0 ]; then
  python3 - "$HTML" <<'PY'
import re, sys
path = sys.argv[1]
html = open(path, encoding='utf-8').read()
html = re.sub(r'\s*<!-- PENDING-BANNER -->.*?<!-- /PENDING-BANNER -->', '', html, flags=re.S)
html = html.replace(' placeholder-frame', '')
open(path, 'w', encoding='utf-8').write(html)
PY
  echo "All 8 slots filled. Pending banner removed. Backup at $HTML.bak"
else
  echo "Still missing: ${FAILED[*]}"
  exit 1
fi
