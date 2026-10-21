#!/bin/bash

# Image Optimization Script for Canada Landing Page
# This script will optimize images and convert them to WebP format

echo "🚀 Starting image optimization for Canada page..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Create optimized directories
mkdir -p testimonial-images/optimized
mkdir -p images/optimized

# Optimize testimonial images (displayed at 35x35, so 70x70 for 2x retina)
echo "📸 Optimizing testimonial images..."

convert testimonial-images/Avisha_Sanjay_Kumar_Patel.png -resize 70x70 -quality 75 testimonial-images/optimized/Avisha_Sanjay_Kumar_Patel.webp
convert testimonial-images/Bhargavi_Patel.png -resize 70x70 -quality 75 testimonial-images/optimized/Bhargavi_Patel.webp
convert testimonial-images/Bhavik_Patel_b655b19057.png -resize 70x70 -quality 75 testimonial-images/optimized/Bhavik_Patel_b655b19057.webp
convert testimonial-images/Saloni_34fc2dee35.png -resize 70x70 -quality 75 testimonial-images/optimized/Saloni_34fc2dee35.webp
convert testimonial-images/Jaimin_Patel_65b6c293d5.png -resize 70x70 -quality 75 testimonial-images/optimized/Jaimin_Patel_65b6c293d5.webp
convert testimonial-images/Sanskriti_35d4ff78ca.png -resize 70x70 -quality 75 testimonial-images/optimized/Sanskriti_35d4ff78ca.webp
convert testimonial-images/hetvi_baktarwala_d25f05a368.png -resize 70x70 -quality 75 testimonial-images/optimized/hetvi_baktarwala_d25f05a368.webp
convert testimonial-images/disha_patel_b07218c2ac.png -resize 70x70 -quality 75 testimonial-images/optimized/disha_patel_b07218c2ac.webp
convert testimonial-images/jatin_raj_bharadwaj_52633119c0.png -resize 70x70 -quality 75 testimonial-images/optimized/jatin_raj_bharadwaj_52633119c0.webp
convert testimonial-images/tulsi_thakar_66cb3365ee.png -resize 70x70 -quality 75 testimonial-images/optimized/tulsi_thakar_66cb3365ee.webp

# Optimize hero image (responsive sizes: 600x400, 1200x800)
echo "🖼️ Optimizing hero image..."
convert images/hero-students-2-further-optimized.jpg -resize 600x400 -quality 70 images/optimized/hero-students-600.webp
convert images/hero-students-2-further-optimized.jpg -resize 1200x800 -quality 70 images/optimized/hero-students-1200.webp

# Optimize college logos (displayed at 120x48, so 240x96 for 2x retina)
echo "🏛️ Optimizing college logos..."
convert images/1_Centennial-optimized.png -resize 240x96 -quality 75 images/optimized/1_Centennial-optimized.webp
convert images/2_Conestoga-optimized.png -resize 240x96 -quality 75 images/optimized/2_Conestoga-optimized.webp
convert images/3_Seneca-optimized.png -resize 240x96 -quality 75 images/optimized/3_Seneca-optimized.webp
convert images/4_Loyalist-optimized.png -resize 240x96 -quality 75 images/optimized/4_Loyalist-optimized.webp
convert images/5_Algoma-optimized.png -resize 240x96 -quality 75 images/optimized/5_Algoma-optimized.webp
convert images/6_St_Lawrence_Black-optimized.png -resize 240x96 -quality 75 images/optimized/6_St_Lawrence_Black-optimized.webp
convert images/7_Cambrian_-optimized.png -resize 240x96 -quality 75 images/optimized/7_Cambrian_-optimized.webp
convert images/8_Canadore-optimized.png -resize 240x96 -quality 75 images/optimized/8_Canadore-optimized.webp
convert images/9_Fleming_-optimized.png -resize 240x96 -quality 75 images/optimized/9_Fleming_-optimized.webp
convert images/10_Georgian_-optimized.png -resize 240x96 -quality 75 images/optimized/10_Georgian_-optimized.webp
convert images/11_Lambton-optimized.png -resize 240x96 -quality 75 images/optimized/11_Lambton-optimized.webp
convert images/12_Mohawk_-optimized.png -resize 240x96 -quality 75 images/optimized/12_Mohawk_-optimized.webp
convert images/13_Niagara-optimized.png -resize 240x96 -quality 75 images/optimized/13_Niagara-optimized.webp
convert images/14_Northern_-optimized.png -resize 240x96 -quality 75 images/optimized/14_Northern_-optimized.webp
convert images/15_Sheridan-optimized.png -resize 240x96 -quality 75 images/optimized/15_Sheridan-optimized.webp
convert images/16_Fanshawe-optimized.png -resize 240x96 -quality 75 images/optimized/16_Fanshawe-optimized.webp

echo "✅ Image optimization complete!"
echo "📁 Optimized images saved in:"
echo "   - testimonial-images/optimized/"
echo "   - images/optimized/"

