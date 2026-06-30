# Changelog

All notable changes to MTVerse Dashboard are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-24

### 🎉 Initial Release

#### Added
- **10 production-grade dashboards**: Ecommerce, Analytics, Marketing, CRM, Stocks, SaaS, Logistics, AI Workspace, Sales, Finance
- **19 UI library pages**: Forms & Inputs (50+ variants), UI Elements, Tables, Charts, Maps, Chat, File Manager, Advanced UI, Extended UI, Forms, Navigation Menus, Feedback Status, Data Display, Date Search, Media Content, Communication, Overlay Interactive, Utility Customization, Interactive Utilities
- **10 ecommerce pages**: Products, Product Detail, Product Cards, Add Product, Billing, Invoices, Single Invoice, Create Invoice, Transactions, Single Transaction
- **7 AI pages**: Chat, Workspace, Image Generator, Code Generator, Video Generator, Settings, API Usage
- **16 general pages**: Profile, Settings, Pricing (4 variants), FAQ, API Keys, Integrations, Activity Log, Notifications, Team, Success, Blank, 404, 500, 503, Coming Soon, Maintenance
- **9 auth pages**: Sign In, Sign Up, Forgot Password, Reset Password, Verify Email, Two Factor, OTP, Welcome, Active Sessions
- **250+ components** built on shadcn/ui (new-york style)
- **Dark mode** with no-flash theme script + system preference detection
- **Responsive design** — mobile, tablet, desktop, ultrawide (3xl breakpoint)
- **TailAdmin-aligned typography system** — Outfit font, 7-level text scale
- **Design tokens** in `globals.css` — colors, shadows, radius, spacing
- **Command palette** (⌘K) for global navigation
- **Production metadata system**:
  - Auto-generated `sitemap.xml` from nav config
  - `robots.txt` with sitemap reference
  - PWA `manifest.webmanifest`
  - Open Graph image (1200×630, auto-generated via `next/og`)
  - Dynamic favicon + Apple touch icon
  - JSON-LD structured data (SoftwareApplication schema)
  - Per-page `generateMetadata` support
- **Performance optimizations**:
  - ApexCharts lazy-loaded via `next/dynamic`
  - react-simple-maps lazy-loaded via `lazy-maps.tsx` wrapper
  - lucide-react tree-shaken via `modularizeImports`
  - Outfit font preloaded with `display: swap`
  - Chart/map skeletons prevent CLS during chunk load
  - Standalone build output for Docker/self-host
- **Security**:
  - HTTP security headers (X-Frame-Options, X-Content-Type-Options, HSTS, etc.)
  - `poweredByHeader: false`
  - Strict TypeScript (no `ignoreBuildErrors`)
  - React Strict Mode enabled
- **SEO**:
  - Semantic HTML throughout
  - Canonical URLs
  - hreflang ready
  - WCAG-compliant contrast
- **Developer experience**:
  - Central `site-config.ts` for branding (single file to rebrand)
  - Bun + npm + yarn support
  - `--legacy-peer-deps` documented for npm
  - Comprehensive README + LICENSE + .env.example

#### Premium upgrades (this release)
- CRM Dashboard — full premium rebuild (gradient title, premium card system, unified hover states, sparklines, account health radar)
- Forms & Inputs — full rewrite (50+ variants, icon alignment fixed, premium button system, sticky nav removed per UX feedback)
- Ecommerce Dashboard — premium command center (4 unique KPI cards, custom tooltips, hover-reveal details, working Create Order drawer)
- Analytics Dashboard — unique bento layout (journey flow, source quality matrix, engagement heatmap, retention cohort grid, session detail drawer)
- Marketing Dashboard — campaign command center (real SVG brand icons, channel war room, creative board, attribution path)
- File Manager — 3-column TailAdmin replica (storage donut, category grid, recent files table)
- Maps page — 4 genuinely different map designs
- Pricing page — 4 variants (compact, mixed features, dark featured, comparison table)
- Profile page — 6 tabs (overview, activity, projects, skills, connections, security) with cover image
- Typography system unified (576 weight fixes, single Outfit font)

#### Technical foundation
- Next.js 16 with App Router + Turbopack
- React 19
- TypeScript 5 (strict)
- Tailwind CSS v4
- shadcn/ui (new-york style)
- Zustand for client state
- React Hook Form + Zod for forms
- Framer Motion for animations
- Prisma (optional, schema included)
- NextAuth ready (optional)

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking changes (e.g., folder structure reorganization)
- **MINOR** — new features (e.g., new dashboard page, new component)
- **PATCH** — bug fixes, UI polish, performance improvements

## Release Schedule

- **Patch releases** — weekly (bug fixes, polish)
- **Minor releases** — monthly (new components, new pages)
- **Major releases** — quarterly (architecture changes, breaking changes)

---

## Upgrade Path

From v0.x → v1.0:
1. Update `next.config.ts` (new strict TS, security headers)
2. Add `src/lib/site-config.ts` (new — required for metadata)
3. Add `src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`
4. Update `src/app/layout.tsx` (new metadata structure)
5. Remove `public/robots.txt` (now auto-generated)

See `MIGRATION.md` (coming soon) for detailed upgrade instructions.
