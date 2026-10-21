#!/bin/bash
# Adds Umami analytics tracking code to all HTML files.
# Idempotent: skips files that already have the script tag.

UMAMI_SCRIPT='<script defer src="https://smoky-nuthatch.pikapod.net/script.js" data-website-id="7c6e1e05-f8f8-4d33-ba6d-c1e60e7cba9f"></script>'

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COUNT=0
SKIPPED=0
EMPTY=0
NO_HEAD=0

echo "🔍 Adding Umami tracking to HTML files..."

while IFS= read -r -d '' file; do
  # Skip node_modules and dist directories
  if [[ "$file" == */node_modules/* || "$file" == */dist/* ]]; then
    continue
  fi

  # Skip empty files
  if [ ! -s "$file" ]; then
    echo "   ⏭️  Skipped (empty): ${file#$PROJECT_ROOT/}"
    EMPTY=$((EMPTY + 1))
    continue
  fi

  # Skip files without </head> tag (not a proper HTML page)
  if ! grep -q '</head>' "$file"; then
    echo "   ⏭️  Skipped (no </head> tag): ${file#$PROJECT_ROOT/}"
    NO_HEAD=$((NO_HEAD + 1))
    continue
  fi

  # Check if already present
  if grep -q 'smoky-nuthatch.pikapod.net/script.js' "$file"; then
    echo "   ⏭️  Skipped (already has Umami): ${file#$PROJECT_ROOT/}"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Insert before </head>
  # Use .bak suffix for cross-platform compatibility (macOS BSD vs Linux GNU sed)
  sed -i.bak "s|</head>|    $UMAMI_SCRIPT\n</head>|" "$file" && rm -f "$file.bak"

  echo "   ✅ Added Umami: ${file#$PROJECT_ROOT/}"
  COUNT=$((COUNT + 1))
done < <(find "$PROJECT_ROOT" -name '*.html' -type f -print0)

echo ""
echo "📊 Summary:"
echo "   Modified:  $COUNT files"
echo "   Skipped:   $SKIPPED (already had Umami)"
echo "   Empty:     $EMPTY (0-byte files)"
echo "   No <head>: $NO_HEAD (no </head> tag found)"
echo "✅ Done!"
