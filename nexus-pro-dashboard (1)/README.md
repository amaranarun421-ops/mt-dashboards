# Nexus Pro — Premium Next.js Admin Dashboard Kit

Nexus Pro is a premium, production-ready dashboard kit built on **Next.js App Router**, **Tailwind CSS v4**, **shadcn/ui**, **TanStack Table**, and **Recharts**. It ships with 100+ pages, advanced data tables, themed charts, a polished dark-first design system, and a flagship Sales Ops module.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
npm run typecheck # TypeScript check
```

No environment variables required — the kit ships with a fully functional mock data layer in `src/data/`.

## Project structure

```
src/
├── app/                        # Next.js App Router routes
│   ├── (marketing)/            # Landing, features, pricing, docs, changelog
│   ├── dashboard/              # 12 domain dashboards
│   ├── sales/                  # Sales Ops flagship module (20+ routes)
│   ├── apps/                   # Calendar, chat, mailbox, kanban, etc.
│   ├── account/                # Profile, settings, team, billing, etc.
│   ├── ui/                     # 18 UI element showcases
│   ├── forms/                  # 8 form pages
│   ├── tables/                 # 5 table pages
│   ├── charts/                 # 6 chart pages
│   ├── pages/                  # Pricing, FAQ, gallery, etc.
│   ├── auth/                   # 7 auth pages (standalone, no shell)
│   ├── errors/                 # 9 unique error pages (standalone)
│   ├── api/                    # Health, dashboard, sales endpoints
│   ├── layout.tsx              # Root layout with ThemeProvider + CommandPalette
│   ├── page.tsx                # Marketing landing
│   ├── not-found.tsx           # Custom 404
│   ├── global-error.tsx        # Global error boundary
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── globals.css             # Tailwind + theme tokens
├── components/
│   ├── layout/                 # AppShell, Sidebar, Header, CommandPalette, Logo
│   ├── common/                 # PageHero, StatBlock, EmptyState, Panel, Callout
│   ├── charts/                 # Themed Recharts wrappers
│   ├── tables/                 # DataTable (TanStack-powered)
│   ├── pages/                  # 80+ page components
│   ├── sales/                  # Sales Ops components
│   ├── marketing/              # Landing + marketing pages
│   ├── ui/                     # shadcn/ui primitives
│   └── providers/              # ThemeProvider
├── data/                       # Realistic mock data (sales, ecommerce, account)
├── types/                      # Shared domain types
├── hooks/                      # Reusable hooks
└── lib/                        # route-map, store, utils, chart-theme

public/
├── favicon.svg                 # Nexus Pro branded favicon
├── logo.svg                    # Full logo
├── manifest.json               # PWA manifest
└── robots.txt
```

## Key features

### Real App Router
Every nav item is a refresh-safe, shareable URL route. Zustand is used only for UI state (sidebar, command palette, theme preferences, favorites, recent pages, table density) — never for page routing.

### Dark-first theming
The default theme is **dark**. A polished light mode preserves the same brand color, spacing system, card radius, and component behavior. An inline script in `layout.tsx` sets the theme class before React hydrates to prevent a flash.

### Reusable premium systems
- **`DataTable`** — TanStack-powered with sort, filter, global + column search, column visibility, density toggle, row selection, bulk actions, CSV/JSON export, loading skeleton, empty state, mobile-responsive horizontal scroll.
- **Chart wrappers** — `LineSeriesChart`, `AreaSeriesChart`, `BarSeriesChart`, `DonutChart`, `RadarSeriesChart`, `RadialProgressChart`, `FunnelChart`, `CohortMatrix` — all with theme-aware colors and custom tooltips.
- **`ChartCard`** — wrapper with title, description, trend badge, legend, and fullscreen modal.
- **`PageHero`** — 6 tonal variants (default, brand, success, warning, error, minimal).
- **`StatBlock`** — 5 variants (card, minimal, bar, gradient, compact) with optional sparkline.
- **`EmptyState`** — 3 variants (default, minimal, illustrated).
- **`Panel`** — alternative to Card for visual variety.
- **`Callout`** — 5 tonal callouts for tips and warnings.

### Sales Ops flagship module (`/sales/*`)
20+ routes including Overview, Pipeline (Kanban-style), Deals, Leads, Accounts, Contacts, Forecasting (with scenario planner), Quota Attainment, Team Performance, Territories, Activities, Commissions, Playbooks, Reports, Import, Export, plus dynamic detail pages for deals, leads, accounts, and reps.

### Command palette (⌘K)
Quick page search, quick-create actions (deal, lead, account, task), recent pages, theme toggle, and documentation links.

### Sidebar
Grouped navigation with active route detection, favorites, recent pages, mini search filter, badge variants, and smooth collapse animation. Sidebar adapts to mobile with a drawer.

### Header
Breadcrumbs, route-aware quick-create menu, command palette trigger, notifications preview, theme toggle, and user menu.

### Error & auth pages
9 unique error pages (401, 403, 404, 405, 408, 429, 500, 503, offline) — each with its own icon, message, and CTA. 7 premium auth pages (sign-in, sign-up, forgot, reset, verify, 2FA, lock).

### Performance
- Dynamic imports where heavy
- `optimizePackageImports` for lucide-react, recharts, date-fns
- Memoized table columns
- Route-level `loading.tsx` + `error.tsx` boundaries
- `reactStrictMode` enabled — no ignored build errors

### TypeScript
Strict types with no `any` everywhere. Domain types organized in `src/types/`. No `typescript.ignoreBuildErrors` — all errors must be fixed properly.

## Customization

### Brand color
Edit `src/app/globals.css` and update the `--color-brand-*` tokens, plus `--primary` in both `:root` and `.dark`.

### Default theme
Edit `src/app/layout.tsx` — change `defaultTheme="dark"` to `"light"` or `"system"`.

### Adding a new route
1. Add the route to `src/lib/route-map.ts` (the `routes` array)
2. Create the page component in `src/components/pages/` (or `src/components/sales/`, etc.)
3. Create the route file at `src/app/<path>/page.tsx`

The sidebar, command palette, breadcrumbs, and active-route detection will pick it up automatically.

## License

Commercial. See `pricing-license` page in the live demo for plan details. Nexus Pro™ is a trademark of Nexus Labs.

---

© 2026 Nexus Labs. All rights reserved.
