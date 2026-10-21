# Kanan.co Landing Pages Monorepo

This monorepo contains all landing pages for Kanan.co study abroad preparation services, deployed under `join.kanan.co`.

## 🏗️ Project Structure

```
kanan-landing-pages/
├── apps/
│   ├── ielts/          # IELTS coaching landing page
│   ├── gre/            # GRE preparation landing page
│   └── gmat/           # GMAT coaching landing page
├── shared/             # Shared components and utilities
├── src/                # Main routing application
├── dist/               # Built files for deployment
├── netlify.toml        # Netlify deployment configuration
├── build.js            # Build script for all apps
└── package.json        # Root package.json with workspaces
```

## 🌐 URL Structure

- **Main Hub**: `join.kanan.co/` - Landing page with links to all services
- **IELTS**: `join.kanan.co/ielts` - IELTS coaching landing page
- **GRE**: `join.kanan.co/gre` - GRE preparation landing page
- **GMAT**: `join.kanan.co/gmat` - GMAT coaching landing page

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

```bash
# Install dependencies for all workspaces
npm install

# Install dependencies for a specific app
npm install --workspace=apps/ielts
```

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev:ielts
npm run dev:gre
npm run dev:gmat
```

### Building

```bash
# Build all apps
npm run build

# Build specific app
npm run build:ielts
npm run build:gre
npm run build:gmat

# Use the custom build script (recommended)
node build.js
```

## 📦 Workspace Commands

Each app in the `apps/` directory is a separate workspace with its own:

- `package.json` - App-specific dependencies
- `vite.config.ts` - Build configuration
- `src/` - Source code
- `public/` - Static assets

### Adding a New Landing Page

1. Create a new directory in `apps/` (e.g., `apps/toefl/`)
2. Copy the structure from an existing app
3. Update the root `package.json` scripts
4. Update `vite.config.ts` to include the new app
5. Update `src/App.tsx` to add the new route
6. Update `netlify.toml` redirects

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `node build.js`
3. Set publish directory: `dist`
4. Deploy!

The `netlify.toml` file handles:
- SPA routing redirects
- Security headers
- Caching rules
- Form handling

### Manual Deployment

```bash
# Build all apps
node build.js

# Upload the `dist` folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables

Each app can have its own environment variables in `.env` files:

- `apps/ielts/.env`
- `apps/gre/.env`
- `apps/gmat/.env`

### Google Tag Manager

GTM is configured at the root level and will track all subdirectories automatically.

## 📊 Analytics

All pages are tracked under the same GTM container (`GTM-5TS75DC`) with automatic path tracking:

- `/` - Main hub page
- `/ielts` - IELTS landing page
- `/gre` - GRE landing page
- `/gmat` - GMAT landing page

## 🛠️ Development Workflow

1. **Feature Development**: Work in the specific app directory
2. **Shared Components**: Add to `shared/` directory
3. **Testing**: Test each app individually and the main routing
4. **Building**: Use `node build.js` for production builds
5. **Deployment**: Push to main branch for automatic deployment

## 📝 Notes

- Each app is a complete Vite + React application
- The main app handles routing between different landing pages
- Shared components can be imported using the `@shared` alias
- All apps share the same design system and branding
- Performance optimizations are applied at the build level

<!-- deploy: trigger 2025-09-29T09:59:28Z -->
