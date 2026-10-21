#!/usr/bin/env bash
# Assert study-abroad country pages use native CRM forms (no Tally embeds).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PAGES=(
  "australia:australia"
  "canada:canada"
  "uk:uk"
  "us:us"
  "germany:germany"
  "dubai:dubai"
  "h1b-canada:h1b-canada"
  "to-canada-from-vadodara:to-canada-from-vadodara"
)

for entry in "${PAGES[@]}"; do
  dir="${entry%%:*}"
  slug="${entry##*:}"
  PAGE="$ROOT/$dir/index.html"
  if [ ! -f "$PAGE" ]; then
    echo "Missing page: $PAGE" >&2
    exit 1
  fi
  if grep -q 'tally\.so' "$PAGE"; then
    echo "Tally reference still present in $PAGE" >&2
    exit 1
  fi
  if ! grep -q 'data-kanan-lead-form' "$PAGE"; then
    echo "Expected data-kanan-lead-form in $PAGE" >&2
    exit 1
  fi
  if ! grep -q '/shared/kanan-lead-form.js' "$PAGE"; then
    echo "Expected shared kanan-lead-form.js in $PAGE" >&2
    exit 1
  fi
  if ! grep -q "data-utm-source-url=\"$slug\"" "$PAGE"; then
    echo "Expected data-utm-source-url=\"$slug\" in $PAGE" >&2
    exit 1
  fi
done

if [ ! -f "$ROOT/shared/kanan-lead-form.js" ]; then
  echo "Missing shared/kanan-lead-form.js" >&2
  exit 1
fi

echo "OK: study-abroad country CRM forms verified (${#PAGES[@]} pages)."
