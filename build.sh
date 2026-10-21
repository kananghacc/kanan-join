#!/bin/bash
echo "🚀 Static HTML Deployment for all landing pages"
echo "📁 Syncing landing folders into dist/..."

set -e

# Inject Umami analytics tracking code into all HTML landing pages
./scripts/add-umami.sh

LANDING_DIRS=(
  "ielts-chennai"
  "ielts-vadodara"
  "ielts-online"
  "ielts-online-coaching"
  "ielts-online-coaching-gcc"
  "ielts-online-training"
  "ielts-crash-course"
  "ielts-new"
  "dubai"
  "gre-coaching-online"
  "gre-coaching-chennai"
  "gre-coaching-vadodara"
  "us"
  "sat-online"
  "uk"
  "canada"
  "h1b-canada"
  "to-canada-from-vadodara"
  "australia"
  "germany"
  "spoken-english"
  "spoken-english-for-college-students"
  "english-course-for-working-professionals"
  "study-abroad"
  "study-french"
  "study-french-india"
  "study-french-learning"
  "partners"
  "aspiring-entrepreneurs"
)

# React apps that need to be built with npm
REACT_APPS=(
  "ielts-retakers"
  "junohub-bootcamp"
  "samash"
)

mkdir -p dist

echo "➡️  Copying public shared assets to dist/shared"
rm -rf dist/shared
mkdir -p dist/shared
cp shared/kanan-crm-config.js shared/kanan-lead-validation.js shared/kanan-lead-form.js shared/kanan-lead-form.css dist/shared/

# Build React apps first
for app in "${REACT_APPS[@]}"; do
  if [ ! -d "$app" ]; then
    echo "⚠️  Skipping React app $app (directory not found)"
    continue
  fi

  echo "⚛️  Building React app: $app"
  cd "$app"

  # Check if package.json exists
  if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in $app. Did you commit it?"
    echo "   Please ensure package.json is tracked in git for this React app."
    exit 1
  fi

  # Check if node_modules exists, if not run npm install
  if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies for $app..."
    # Use npm ci if package-lock.json exists, otherwise npm install
    if [ -f "package-lock.json" ]; then
      npm ci
    else
      npm install
    fi
  fi

  # Build the React app
  echo "🔨 Running npm build for $app..."
  npm run build

  cd ..

  # Copy the built files to main dist folder
  echo "➡️  Copying built files to dist/$app"
  # Next.js export uses out/ directory, Vite uses dist/
  OUTPUT_DIR="dist"
  if [ -d "$app/out" ]; then
    OUTPUT_DIR="out"
  fi
  rm -rf "dist/$app"
  mkdir -p "dist/$app"
  cp -a "$app/$OUTPUT_DIR/." "dist/$app/"

  if [ "$app" = "junohub-bootcamp" ] && [ -d "$app/$OUTPUT_DIR/adult" ]; then
    echo "➡️  Publishing JunoHub adult page to dist/junohub-ai-for-pros"
    rm -rf "dist/junohub-ai-for-pros"
    mkdir -p "dist/junohub-ai-for-pros"
    cp -a "$app/$OUTPUT_DIR/adult/." "dist/junohub-ai-for-pros/"
  fi

  # Inject Umami tracking into React app's built index.html
  # (Vite strips unknown scripts during build, so we add it post-build)
  UMAMI_SCRIPT='<script defer src="https://smoky-nuthatch.pikapod.net/script.js" data-website-id="7c6e1e05-f8f8-4d33-ba6d-c1e60e7cba9f"></script>'
  if ! grep -q 'smoky-nuthatch.pikapod.net/script.js' "dist/$app/index.html"; then
    sed -i.bak "s|</head>|    $UMAMI_SCRIPT\n</head>|" "dist/$app/index.html" && rm -f "dist/$app/index.html.bak"
  fi
done

# Copy root level pages (index.html, etc.)
if [ -f "index.html" ]; then
  echo "➡️  Copying root index.html"
  cp "index.html" "dist/index.html"
fi

# Root index.html references these assets with relative paths (logo, hero, avatars, trainers).
# Amplify/Netlify publish only dist/, so they must be copied or images 404 on the root page.
echo "➡️  Copying root-level static assets"
ROOT_FILES=(
  "404.html"
  "faviconV2.png"
  "kanan-logo.svg"
  "kanan-ielts-3.png"
  "kanan-ielts-3-optimized.webp"
  "manifest.json"
  "robots.txt"
  "sitemap.xml"
  "_redirects"
)
for f in "${ROOT_FILES[@]}"; do
  if [ -f "$f" ]; then
    cp "$f" "dist/$f"
  fi
done

ROOT_ASSET_DIRS=(
  "testimonial-images"
  "trainer-images"
)
for d in "${ROOT_ASSET_DIRS[@]}"; do
  if [ -d "$d" ]; then
    rm -rf "dist/$d"
    cp -a "$d" "dist/$d"
  fi
done

# Build static HTML landing pages
for d in "${LANDING_DIRS[@]}"; do
  if [ -d "$d" ]; then
    echo "➡️  Building dist/$d"
    rm -rf "dist/$d"
    mkdir -p "dist/$d"
    # Mirror the entire folder (includes index.html, thank-you.html, assets, images, etc.)
    cp -a "$d/." "dist/$d/"
  else
    echo "⚠️  Skipping $d (directory not found)"
  fi
done

echo "✅ Deployment ready!"
echo ""
echo "📊 Build Summary:"
echo "─────────────────"

# Summary for React apps
for app in "${REACT_APPS[@]}"; do
  if [ -d "dist/$app" ]; then
    file_count=$(find "dist/$app" -type f | wc -l | tr -d ' ')
    echo "⚛️  $file_count files in dist/$app (React app)"
  fi
done

# Summary for static HTML pages
for d in "${LANDING_DIRS[@]}"; do
  if [ -d "dist/$d" ]; then
    file_count=$(find "dist/$d" -type f | wc -l | tr -d ' ')
    echo "📂 $file_count files in dist/$d"
  else
    echo "📂 0 files in dist/$d (skipped)"
  fi
done

exit 0
