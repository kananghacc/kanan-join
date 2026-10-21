**Objective:** Convert a React component/page to a static HTML page that maintains 100% exact design fidelity while using only Lucide React icons and deploying as a static site like your existing IELTS pages.

### **Requirements:**

1. **Design Fidelity:** Maintain the exact same visual appearance, layout, spacing, colors, typography, and responsive behavior as the original React version.

2. **Icon Strategy:** Use Lucide React icons exclusively. Convert React icon components to static SVG elements by:
   - Extracting the SVG paths from Lucide React icons
   - Embedding them directly as inline SVG elements in HTML
   - Maintaining exact icon sizes, colors, and positioning

3. **Static HTML Structure:** Create a single, self-contained HTML file that includes:
   - All CSS styles inline or in `<style>` tags
   - All JavaScript functionality (if any) inline
   - All images and assets referenced with relative paths
   - Responsive design that works on all devices

4. **Deployment Ready:** Structure the output to match your existing deployment pattern:
   - Create a new directory (e.g., `new-page/`)
   - Include `index.html` as the main file
   - Include all necessary assets (images, favicon, manifest, etc.)
   - Follow the same file structure as `ielts/`, `ielts-chennai/`, `ielts-vadodara/`, and `dubai/`

### **Technical Specifications:**

**HTML Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags, title, description -->
    <!-- Google Tag Manager (if needed) -->
    <!-- Fonts (Google Fonts) -->
    <!-- Tailwind CSS CDN -->
    <!-- Custom styles -->
</head>
<body>
    <!-- Page content with inline SVGs for icons -->
    <!-- Inline JavaScript (if needed) -->
</body>
</html>
```

**Icon Conversion Process:**
1. Identify all Lucide React icons used in the component
2. For each icon, extract the SVG path from the Lucide React source
3. Create inline SVG elements with the exact same dimensions and styling
4. Ensure icons maintain their original colors, sizes, and positioning

**Styling Approach:**
- Use Tailwind CSS classes (matching your existing setup)
- Include any custom CSS inline in `<style>` tags
- Maintain exact spacing, colors, and responsive breakpoints
- Follow your existing design system (Manrope/Rubik fonts, color scheme, etc.)

**Asset Management:**
- Copy all images to the new directory
- Update image paths to be relative
- Include favicon, manifest.json, robots.txt, sitemap.xml
- Optimize images if needed (WebP format preferred)

### **Output Structure:**
```
new-page/
├── index.html (main static HTML file)
├── faviconV2.png
├── kanan-logo.svg
├── manifest.json
├── robots.txt
├── sitemap.xml
├── images/ (all page images)
└── assets/ (any additional assets)
```

### **Quality Checklist:**
- [ ] Visual design matches React version exactly (pixel-perfect)
- [ ] All Lucide icons converted to inline SVGs
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] All images load correctly with relative paths
- [ ] No JavaScript errors in console
- [ ] Fast loading performance
- [ ] SEO meta tags included
- [ ] Accessibility maintained (alt tags, semantic HTML)

### **Deployment Integration:**
After conversion, the new page should be deployable using your existing `build.sh` script by:
1. Adding the new directory to the build script
2. Copying assets following the same pattern as existing pages
3. Deploying to your static hosting (Netlify, etc.)

**Please provide the React component code, and I'll convert it to static HTML following these specifications.**