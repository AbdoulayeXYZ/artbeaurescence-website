# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Art'Beau-Rescence is a Next.js website for a Senegalese technology innovation company specializing in advanced AIoT and Telematics solutions for fleet management and road safety. The website is built with modern web technologies and optimized for static export deployment.

## Development Commands

### Core Development
```bash
# Start development server (uses bun by default)
bun dev
# or
npm run dev

# Build for production (static export)
bun run build
# or 
npm run build

# Build with bundle analysis
bun run build:analyze
# or
npm run analyze

# Start production server
bun start
# or
npm start

# Serve static build locally
bun run build && bunx serve@latest out

# Lint and format code
bun run lint
# or 
npm run lint
```

### Package Manager
This project is configured to use **Bun** as the primary package manager (specified in package.json engines). Commands should default to `bun` unless specifically using npm.

### Testing Static Build
```bash
# Test production build locally as specified in DEPLOYMENT.md
bun run build && bunx serve@latest out
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15+ with App Router (static export mode)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: Bun (primary), npm (fallback)
- **Linting**: Biome (primary) + ESLint
- **Deployment**: Static export for Netlify/Vercel

### Key Configuration
- **Static Export**: Configured for static site generation (`output: 'export'` in next.config.js)
- **Image Optimization**: Disabled for static export compatibility (`unoptimized: true`)
- **Development Rewrites**: API routes only work in development mode
- **Bundle Analysis**: Available via `@next/bundle-analyzer` when `ANALYZE=true`

### Component Architecture

#### Layout Structure
- **App Router**: Uses `src/app` directory structure
- **Main Layout**: `src/app/layout.tsx` with Geist fonts and metadata
- **Client Body**: `src/app/ClientBody.tsx` handles client-side rendering
- **Page Structure**: Single-page application with lazy-loaded sections

#### Component Organization
```
src/
├── components/          # Main UI components
│   ├── Hero.tsx        # Landing hero section with video background
│   ├── Services.tsx    # Service cards with hover effects
│   ├── About.tsx       # Company information
│   ├── Contact.tsx     # Contact form and information
│   ├── Navbar.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── *Showcase.tsx   # Various showcase components
├── components/         # Secondary components (duplicate structure)
├── hooks/              # Custom React hooks
│   └── useLazySection.ts
├── lib/                # Utility functions
│   └── utils.ts        # Tailwind class merging utilities
└── app/                # Next.js app directory
    ├── layout.tsx      # Root layout
    ├── page.tsx        # Main page with lazy loading
    ├── ClientBody.tsx  # Client wrapper
    └── globals.css     # Global styles
```

#### Performance Optimizations
- **Lazy Loading**: Non-critical components lazy-loaded with React Suspense
- **Code Splitting**: Automatic via Next.js and manual via React.lazy
- **Image Optimization**: Custom loading patterns for static export
- **Font Loading**: Optimized with `display: swap`
- **Animation**: Framer Motion with performance-conscious variants

### Styling System

#### Tailwind Configuration
- **Design System**: CSS variables-based theming in `src/app/globals.css`
- **Components**: shadcn/ui components with New York style variant
- **Responsive**: Mobile-first approach with custom container breakpoints
- **Colors**: Custom color palette with HSL variables
- **Animations**: Custom animations via `tailwindcss-animate`

#### shadcn/ui Integration
- **Style**: "new-york" variant with RSC and TypeScript enabled
- **Path Aliases**: `@/components`, `@/lib`, `@/utils`, `@/hooks`
- **CSS Variables**: Enabled for dynamic theming
- **Icon Library**: Lucide React

### Business Context

#### Target Market
- **Primary**: Senegalese and West African transport companies
- **Sectors**: Public transport, logistics, fleet management, construction
- **Solutions**: Video Telematics, Vehicle Telematics, Vehicle Tracking
- **Value Proposition**: 10:1 ROI with local expertise and support

#### Content Strategy
- **Multilingual**: French primary, with plans for Wolof support
- **Sector-Specific**: Tailored content for different vehicle fleet types
- **ROI-Focused**: Quantified benefits and case studies
- **Local Expertise**: Emphasis on Senegalese market knowledge

## Development Guidelines

### Code Quality
- **Linting**: Biome configuration in `biome.json` with relaxed a11y rules for design flexibility
- **TypeScript**: Strict mode enabled with Next.js TypeScript configuration
- **ESLint**: Additional rules in `eslint.config.mjs` for Next.js compliance
- **Formatting**: Biome handles formatting with space indentation and double quotes

### Component Patterns
- **Client Components**: Use `"use client"` directive for interactive components
- **Animation**: Framer Motion variants for consistent animations
- **Loading States**: Suspense fallbacks for lazy-loaded content
- **Image Handling**: Next.js Image component with unoptimized flag for static export
- **Responsive Design**: Mobile-first with container-based layouts

### File Naming
- **Components**: PascalCase TypeScript files (.tsx)
- **Utilities**: camelCase TypeScript files (.ts)
- **Styles**: CSS modules or global stylesheets
- **Assets**: Organized in `public/images/` directory

## Deployment

### Static Export Build
The site is configured for static export deployment with these characteristics:
- **Output**: Static HTML/CSS/JS files in `.next` directory
- **Images**: Unoptimized for compatibility with static hosting
- **Routing**: Client-side routing via Next.js App Router
- **API Routes**: Only functional in development mode

### Deployment Targets
- **Primary**: Netlify (configured in `netlify.toml`)
- **Secondary**: Vercel (native Next.js support)
- **Build Command**: `bun run build`
- **Publish Directory**: `.next`

### Environment Configuration
- **Development**: Full Next.js features including API routes
- **Production**: Static export mode with limited server features
- **Bundle Analysis**: Available in development via `ANALYZE=true`

## Troubleshooting

### Common Issues
- **Build Failures**: Check TypeScript errors and Biome linting issues
- **Image Loading**: Ensure images exist in `public/images/` for static export
- **Animation Performance**: Verify Framer Motion variants don't cause layout shifts
- **Static Export**: API routes won't work in production build

### Development Tips
- **Hot Reload**: Both Bun and npm development servers support fast refresh
- **Static Testing**: Use `bunx serve@latest out` to test static build locally
- **Bundle Size**: Use `npm run analyze` to identify optimization opportunities
- **Performance**: Check Core Web Vitals with Next.js built-in metrics
