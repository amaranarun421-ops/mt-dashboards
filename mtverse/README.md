# MTVerse — Enterprise Dashboard Kit

A premium, production-ready enterprise dashboard kit built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.

## ✨ Highlights

- **74 production-ready pages** across 5 categories
- **12 unique dashboards** with distinct visual layouts (no two look the same)
- **Premium design system** with violet aurora palette, dark mode, glass effects
- **Global command palette** (Cmd+K), navigation spinner, modern sidebar
- **Multilingual SEO metadata** covering 20+ languages
- **Zero lint errors, zero console errors, zero emojis** — only real lucide-react icons

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Charts**: Recharts (custom wrapper library)
- **State**: Zustand, TanStack Query
- **Forms**: react-hook-form + zod
- **Auth**: NextAuth.js v4
- **DB**: Prisma ORM (SQLite)
- **i18n**: next-intl
- **Notifications**: sonner
- **Animations**: Framer Motion

## 🚀 Getting Started

```bash
# 1. Install dependencies
bun install

# 2. Set up the database
bun run db:push

# 3. Start the dev server
bun run dev

# 4. Open http://localhost:3000
```

## 🏗️ Production Build

```bash
bun run build
bun run start
```

The build generates 77 prerendered static pages.

## 📁 Project Structure

```
src/
  app/
    (dashboard)/              # Dashboard shell (sidebar + topbar + footer)
      dashboards/             # 12 unique dashboards
        ecommerce/            # Bento grid layout
        analytics/            # Hero chart + KPI strip
        crm/                  # Pipeline swimlane
        finance/              # Hero numbers + breakdown
        ai-workspace/         # Chat-centric + token gauge
        marketing/            # Campaign cards + funnel
        saas/                 # Cohort retention heatmap
        logistics/            # Map-first (custom SVG)
        sales/                # Leaderboard podium
        support/              # Ticket queue kanban
        projects/             # Project cards + progress rings
        hr/                   # Employee directory grid
      apps/                   # 12 applications
        chat, email, kanban, notes, calendar,
        file-manager, tasks, ai-assistant, invoice,
        ecommerce-products, crm-pipeline, team-workspace
      enterprise/             # 15 enterprise pages
        pricing, api-keys, activity-logs, audit-logs,
        notifications, integrations, profile, team, rbac,
        settings, security, billing, help, faq, changelog
      ui/                     # 24 UI library showcase pages
        forms, inputs, tables, charts, maps, navigation,
        feedback, overlays, modals, drawers, popovers, tabs,
        accordions, command, skeletons, loaders, timeline,
        file-upload, drag-drop, resizable, rich-text,
        media-gallery, empty-states, search
      page.tsx                # Overview dashboard
      layout.tsx              # Dashboard layout (boxed container)
    auth/                     # 10 auth pages (split-screen branding)
      signin, signup, forgot, reset, otp, two-factor,
      sessions, lock, maintenance, coming-soon
    layout.tsx                # Root layout (multilingual metadata)
    globals.css               # MTVerse premium design system
  components/
    mtv/                      # MTVerse components
      sidebar.tsx             # Modern collapsible sidebar
      topbar.tsx              # Topbar with search + notifications
      command-palette.tsx     # Cmd+K command palette
      navigation-spinner.tsx  # Route-change spinner
      logo.tsx                # Brand logo (uses /sitelogo.png)
      theme-toggle.tsx        # Dark/light/system toggle
      primitives.tsx          # PageHeader, StatCard, SectionCard
    charts/                   # Reusable chart library
      AreaTrend, LineTrend, BarTrend, DonutChart,
      RadialProgress, RadarChartTrend, Sparkline
    ui/                       # shadcn/ui components (50+)
  lib/
    navigation.ts             # Central nav config (5 groups, 70+ items)
    utils.ts                  # cn() utility
    db.ts                     # Prisma client
public/
  sitelogo.png                # Brand logo (512x512 PNG)
  manifest.webmanifest        # PWA manifest with shortcuts
  sitemap.xml                 # SEO sitemap (20 languages)
  robots.txt                  # SEO robots
  browserconfig.xml           # Windows tile config
  favicon.svg                 # SVG favicon
```

## 🎨 Design System

- **Primary palette**: Violet aurora (`oklch(0.52 0.22 295)`)
- **Surfaces**: Warm premium neutrals with custom shadows
- **Charts**: 6-color palette (violet, emerald, amber, pink, cyan, orange)
- **Typography**: Geist Sans + Geist Mono
- **Radius**: 0.75rem base with sm/md/lg/xl/2xl/3xl scale
- **Dark mode**: Full token-based theming
- **Custom scrollbars**: Slim, premium feel
- **Animations**: fade-in, slide-up, scale-in, shimmer, pulse-glow

## ⌨️ Keyboard Shortcuts

- `Cmd+K` / `Ctrl+K` — Open command palette
- `Cmd+B` / `Ctrl+B` — Toggle sidebar collapse
- `Esc` — Close command palette / dialogs

## 🌍 Internationalization

- 20+ language keywords in metadata
- `alternates.languages` for locale-aware indexing
- OpenGraph `alternateLocale` for 18 regions
- next-intl ready for full i18n implementation

## ✅ Quality Checks

- `bun run lint` — passes with zero errors
- `bun run build` — compiles 77 pages successfully
- All 74 routes return HTTP 200
- Zero console errors
- Zero hydration issues
- Zero emojis (only lucide-react icons)
- Responsive across all breakpoints
- Dark mode fully supported
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

## 📄 License

MIT — Free to use for personal and commercial projects.
