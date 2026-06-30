# Helios Pro — Premium Next.js Admin & Dashboard UI Kit

**Helios Pro** is a premium, production-grade Next.js admin dashboard UI kit with 100+ high-quality pages, advanced data tables, charts, apps, ecommerce, auth flows, and a refined design system built on Tailwind CSS v4.

Built for teams who want a polished, scalable admin foundation — original branding, original layouts, and original content.

---

## Highlights

- **100+ unique pages** across dashboards, apps, ecommerce, user & account, forms, tables, charts, UI components, marketing pages, auth, and error pages.
- **Original brand identity** — Helios Pro, emerald + amber palette, sun-ray logo mark.
- **Premium design system** — refined typography, spacing, radius, shadows, borders, and motion.
- **Light & dark mode** with smooth transitions.
- **Compact / comfortable density** toggle.
- **Theme color switcher** (emerald, amber, rose, violet, cyan).
- **Command palette** for global search and quick navigation.
- **Advanced data tables** — sorting, filtering, pagination, column visibility, row selection, editable, drag-and-drop, sticky headers, empty states.
- **Real apps** — email, chat, calendar, kanban, notes, tasks, file manager, contacts, support tickets, invoices.
- **Ecommerce suite** — products, orders, customers, cart, checkout, reviews, coupons, inventory.
- **Auth flows** — login, register, forgot, reset, two-step, lock screen, side & boxed variants.
- **Error pages** — 400, 401, 403, 404, 500, 503.
- **Real SVG icons only**, no emojis.
- **Smooth micro-interactions** — hover lifts, page reveals, sidebar collapse, dropdowns, modals, drawers, tabs, accordions, notifications.
- **Fully responsive** desktop / tablet / mobile layouts.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Charts**: ApexCharts (react-apexcharts)
- **Maps**: jsvectormap
- **Date picker**: flatpickr
- **Notifications**: sonner
- **Theme**: next-themes
- **Auth**: better-auth (optional — pages work in demo mode)
- **DB**: Prisma (SQLite)

---

## Quick Start

```bash
# install deps
bun install   # or npm install / pnpm install

# run dev server (the sandbox auto-starts this)
bun run dev

# lint
bun run lint

# production build (optional, not required for preview)
bun run build
```

Open the **Preview Panel** on the right side of the sandbox, or click **"Open in New Tab"** for a full browser view.

---

## Project Structure

```
src/
├─ app/
│  ├─ (with-layout)/          # pages with sidebar + topbar shell
│  │  ├─ dashboards/          # 10 dashboard variants
│  │  ├─ apps/                # email, chat, calendar, kanban, notes, tasks, files, contacts, tickets, invoices
│  │  ├─ ecommerce/           # products, orders, customers, cart, checkout, reviews, coupons, inventory
│  │  ├─ user-account/        # profile, settings, team, roles, permissions, activity, notifications, connected apps
│  │  ├─ forms/               # 12 form pages
│  │  ├─ tables/              # 11 table pages
│  │  ├─ charts/              # 10 chart pages
│  │  ├─ ui-components/       # 21 UI component showcase pages
│  │  ├─ pages/               # landing, pricing, faq, help, about, contact, maintenance, coming-soon, changelog, roadmap
│  │  ├─ calendar/  profile/  forms/  tables/  charts/  ui-elements/  pages/  (legacy kept for backward-compat redirects)
│  │  └─ layout.tsx           # DashboardShell with sidebar + topbar
│  ├─ (without-layout)/       # auth, error, marketing standalone layouts
│  │  ├─ auth/                # 10 auth flows
│  │  ├─ errors/              # 6 error pages
│  │  └─ layout.tsx
│  ├─ layout.tsx              # root layout
│  └─ providers.tsx           # ThemeProvider + SidebarProvider + CommandPaletteProvider
├─ components/
│  ├─ layouts/                # AppSidebar, TopNavbar, Breadcrumbs, PageHeader, DashboardShell
│  ├─ shared/                 # StatCard, ChartCard, DataTable, EmptyState, ActivityFeed, UserAvatar, FormSection, SettingsPanel, ThemeCustomizer, CommandPalette, NotificationCenter, Modal, Drawer, Tabs, Accordion, Badge, Avatar, Timeline, Progress, Spinner, Toast, Tooltip, Popover, Banner, Pagination, Breadcrumbs
│  ├─ FormElements/           # legacy form elements (kept)
│  ├─ Charts/                 # ApexCharts wrappers
│  ├─ Tables/                 # legacy table components (kept)
│  └─ ui/                     # dropdown, skeleton, table primitives
├─ data/                      # mock data files for all pages
├─ lib/                       # utils, format, db, auth
└─ css/                       # style.css (Tailwind v4 theme), satoshi.css

```

---

## Page Catalog (100+)

### Dashboards (10)
analytics, ecommerce, crm, finance, saas, projects, marketing, ai, support, logistics

### Apps (15)
email-inbox, email-detail, chat, calendar, kanban, notes, tasks, file-manager, contacts, support-tickets, ticket-detail, invoice-list, invoice-detail, invoice-create, invoice-edit

### Ecommerce (12)
products, product-detail, add-product, edit-product, orders, order-detail, customers, customer-detail, cart, checkout, reviews, coupons, inventory

### User & Account (10)
profile, account-settings, security-settings, billing-settings, team-members, roles, permissions, activity-log, notifications-settings, connected-apps

### Forms (12)
basic-inputs, advanced-inputs, selects, checkbox-radio, switches, date-picker, file-upload, rich-text-editor, form-layouts, form-validation, multi-step-form, payment-form

### Tables (11)
basic, data, sorting, filtering, pagination, row-selection, editable, sticky, column-visibility, drag-drop, empty-state

### Charts & Data (10)
line, area, bar, pie-doughnut, radar-radial, candlestick, kpi-cards, realtime-metrics, chart-dashboard, reports

### UI Components (21)
buttons, badges, cards, alerts, avatars, dropdowns, modals, drawers, tabs, accordions, tooltips, popovers, breadcrumbs, pagination, progress, spinners, toasts, timeline, empty-states, banners, command-menu

### Pages (10)
landing, pricing, faq, help-center, about, contact, maintenance, coming-soon, changelog, roadmap

### Auth (10)
login, register, forgot-password, reset-password, two-step-verification, lock-screen, side-login, side-register, boxed-login, boxed-register

### Errors (6)
400, 401, 403, 404, 500, 503

---

## License

This product is provided as-is for evaluation. Rebranding, redistribution, and resale rights depend on your license tier. The Helios Pro name, logo, and design system are original to this kit.
