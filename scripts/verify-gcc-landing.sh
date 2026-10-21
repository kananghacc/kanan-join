#!/bin/bash

set -euo pipefail

PAGE_DIR="ielts-online-coaching-gcc"
PAGE="$PAGE_DIR/index.html"
THANK_YOU="$PAGE_DIR/thank-you.html"
SITEMAP="$PAGE_DIR/sitemap.xml"
ROBOTS="$PAGE_DIR/robots.txt"
DIST_PAGE="dist/$PAGE_DIR/index.html"
CAMPAIGN_URL="https://join.kanan.co/ielts-online-coaching-gcc/"
TALLY_URL="https://tally.so/embed/aQXeqq?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
WHATSAPP_URL="https://wa.me/919150050940"
WHATSAPP_LABEL="Chat with us on WhatsApp"
WHATSAPP_MARKER="WhatsApp Floating Button"
CALL_NOW_URL="tel:+91 92281 22552"

require() {
  local file="$1"
  local text="$2"
  grep -Fq "$text" "$file" || {
    echo "Missing expected text in $file: $text" >&2
    exit 1
  }
}

reject() {
  local file="$1"
  local text="$2"
  if grep -Fq "$text" "$file"; then
    echo "Unexpected stale text in $file: $text" >&2
    exit 1
  fi
}

for file in "$PAGE" "$THANK_YOU" "$SITEMAP" "$ROBOTS"; do
  test -f "$file" || {
    echo "Missing campaign file: $file" >&2
    exit 1
  }
done

require "$PAGE" "$CAMPAIGN_URL"
require "$PAGE" "United Arab Emirates"
require "$PAGE" "Qatar"
require "$PAGE" "Oman"
require "$PAGE" "Muscat"
require "$SITEMAP" "$CAMPAIGN_URL"
require "$ROBOTS" "https://join.kanan.co/ielts-online-coaching-gcc/sitemap.xml"
require "$THANK_YOU" "https://join.kanan.co/ielts-online-coaching-gcc/thank-you.html"
require "$THANK_YOU" "tel:+919228122552"
require "$THANK_YOU" "+91 92281 22552"
reject "$THANK_YOU" "22553"

if [ "$(grep -Fo "$TALLY_URL" "$PAGE" | wc -l | tr -d ' ')" -ne 2 ]; then
  echo "Expected two unchanged Tally embeds in $PAGE" >&2
  exit 1
fi

require "$PAGE" "$CALL_NOW_URL"
reject "$PAGE" "$WHATSAPP_URL"
reject "$PAGE" "$WHATSAPP_LABEL"
reject "$PAGE" "$WHATSAPP_MARKER"

for stale in "Tamil Nadu" "Chennai" "Coimbatore" "Madurai" "ielts-online-coaching-tn" "https://kanan.co/ielts-online"; do
  reject "$PAGE" "$stale"
  reject "$THANK_YOU" "$stale"
  reject "$SITEMAP" "$stale"
  reject "$ROBOTS" "$stale"
done

if [ -f "$DIST_PAGE" ]; then
  require "$DIST_PAGE" "$CAMPAIGN_URL"
  require "$DIST_PAGE" "smoky-nuthatch.pikapod.net/script.js"
  require "$DIST_PAGE" "$CALL_NOW_URL"
  reject "$DIST_PAGE" "$WHATSAPP_URL"
  reject "$DIST_PAGE" "$WHATSAPP_LABEL"
  reject "$DIST_PAGE" "$WHATSAPP_MARKER"
fi

echo "GCC landing checks passed."
