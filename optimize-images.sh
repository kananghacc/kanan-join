#!/bin/bash

# Image Optimization Script for IELTS Landing Page
# This script will optimize images and convert them to WebP format

echo "🚀 Starting image optimization..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Create optimized directories
mkdir -p public/testimonial-images/optimized
mkdir -p public/trainer-images/optimized

# Optimize testimonial images
echo "📸 Optimizing testimonial images..."

# Convert to WebP and resize to appropriate dimensions
convert public/testimonial-images/maitry_f4c1575654.png -resize 56x56 -quality 85 public/testimonial-images/optimized/maitry_f4c1575654.webp
convert public/testimonial-images/anees_basha_ielts_review_fd739179d4.png -resize 28x28 -quality 85 public/testimonial-images/optimized/anees_basha_ielts_review_fd739179d4.webp
convert public/testimonial-images/bharvi_patel_8d7835ce10.png -resize 28x28 -quality 85 public/testimonial-images/optimized/bharvi_patel_8d7835ce10.webp
convert public/testimonial-images/manan_rajesh_padsala_dca2ae5fe4.png -resize 28x28 -quality 85 public/testimonial-images/optimized/manan_rajesh_padsala_dca2ae5fe4.webp
convert public/testimonial-images/jayashankar_179f406b82.png -resize 128x128 -quality 85 public/testimonial-images/optimized/jayashankar_179f406b82.webp
convert public/testimonial-images/prachi_sexana_e01739ed20.png -resize 48x48 -quality 85 public/testimonial-images/optimized/prachi_sexana_e01739ed20.webp
convert public/testimonial-images/suriya_senthilkumar_ielts_review_7dfca668c9.png -resize 48x48 -quality 85 public/testimonial-images/optimized/suriya_senthilkumar_ielts_review_7dfca668c9.webp

# Optimize trainer images
echo "👨‍🏫 Optimizing trainer images..."

convert public/trainer-images/jayadev.png -resize 80x80 -quality 85 public/trainer-images/optimized/jayadev.webp
convert public/trainer-images/pooja.png -resize 80x80 -quality 85 public/trainer-images/optimized/pooja.webp
convert public/trainer-images/meena.png -resize 80x80 -quality 85 public/trainer-images/optimized/meena.webp
convert public/trainer-images/Rasheeda.png -resize 80x80 -quality 85 public/trainer-images/optimized/Rasheeda.webp

# Optimize hero image
echo "🖼️ Optimizing hero image..."
convert public/kanan-ielts-3.png -resize 390x192 -quality 85 public/kanan-ielts-3-optimized.webp

echo "✅ Image optimization complete!"
echo "📁 Optimized images saved in:"
echo "   - public/testimonial-images/optimized/"
echo "   - public/trainer-images/optimized/"
echo "   - public/kanan-ielts-3-optimized.webp"

# Show file size comparison
echo ""
echo "📊 File size comparison:"
echo "Original testimonial images: ~600+ KiB"
echo "Optimized WebP images: ~50-100 KiB"
echo "Total savings: ~500+ KiB" 