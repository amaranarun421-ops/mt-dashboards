# Pipeline Pilot — Premium Sales Operations Dashboard

A production-ready Next.js 16 SaaS template for sales operations teams.
Built with React 19, TypeScript, Tailwind CSS v4, shadcn/Radix UI, and recharts.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# Open http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

## Deploy to Vercel

This project is Vercel-ready. Two options:

**Option A — CLI**
```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production deployment
```

**Option B — Git integration**
1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at https://vercel.com/new.
3. Vercel auto-detects Next.js — no configuration needed.
4. Click Deploy.

The included `vercel.json` is optional — Vercel's defaults already work.

## What's Included

- **70+ routes** across dashboard, auth, and special pages
- **Dark theme (default)** + polished **light mode** with theme switcher
- **Command palette** (⌘K / Ctrl+K) for global search
- **Three-pane layout**: collapsible left sidebar, main content, collapsible right workspace panel
- **Right workspace panel** with 4 tabs: Today (meetings + tasks + alerts), Activity (live feed), Hot Deals, Team leaderboard
- **Premium DataTable** with search, sort, pagination, bulk actions, CSV export
- **Reusable components**: KPICard with sparklines, ChartCard, PageHeader,
  StatusBadge, AvatarBadge (with Unsplash HD image support), StageBadge,
  EmptyState, Skeleton states
- **Realistic sales data**: reps, accounts, deals, contacts, leads, activities,
  territories, forecasts, commissions, playbooks, audit logs, and more
- **HD avatars** via Unsplash for reps, contacts, accounts, and the current user
- Fully responsive (mobile drawer sidebar, compact header, responsive tables)

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5 (strict)
- Tailwind CSS v4 (OKLCH color tokens)
- shadcn/Radix UI (57 components)
- recharts 2.15
- next-themes (dark default + light)
- lucide-react icons
- DM Sans + JetBrains Mono fonts

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/dashboard/    # 60+ dashboard pages with sidebar+header+right panel
│   ├── auth/                     # Login, Register, 2FA, Forgot/Reset Password, Invite
│   ├── onboarding/               # 4-step onboarding wizard
│   ├── maintenance/              # Maintenance page
│   ├── error.tsx                 # 500 error boundary
│   ├── not-found.tsx             # 404 page
│   ├── layout.tsx                # Root layout with ThemeProvider
│   └── page.tsx                  # Dashboard overview (renders at /)
├── components/
│   ├── common/                   # PageHeader, KPICard, ChartCard, StatusBadge, states
│   ├── dashboard/                # OverviewContent (shared dashboard body)
│   ├── tables/                   # DataTable with full features
│   ├── charts/                   # Chart helpers
│   ├── layout/                   # AppShell, Sidebar, Header, RightPanel, CommandPalette, Logo
│   └── ui/                       # 57 shadcn/Radix components
├── lib/
│   ├── avatars.ts                # Unsplash HD avatar/logo URL helpers
│   ├── data.ts                   # Central realistic SalesOps data
│   ├── navigation.ts             # Sidebar + command palette config
│   └── utils.ts                  # cn, formatCurrency, formatPercent, etc.
└── public/                       # SVG logo + favicon
```

## Pages Overview

### Dashboard
- Overview, Revenue, Command Center (live-updating)

### Pipeline
- Sales Pipeline (Kanban), Pipeline Board (swimlane), Kanban Deals, Deals, Deal Details

### Customers
- Customers, Customer Details, Accounts, Account Details, Contacts, Leads, Lead Details,
  Opportunities, Opportunity Details

### Forecast & Targets
- Forecasting, Forecast Details, Quota Tracking, Targets, Commissions, Compensation Plans

### Team & Territories
- Team Performance, Rep Details, Territories, Territory Details

### Activities
- Sales Activities, Calls, Meetings, Emails, Tasks, Calendar, Inbox

### Reports & Analytics
- Reports, Report Builder, Saved Reports, Revenue Analytics, Funnel Analytics,
  Conversion Analytics, Win/Loss Analysis, Churn Risk, Customer Health, Leaderboard,
  Campaign Attribution, Sales Playbooks

### Operations
- Integrations, CRM Sync, Import Data, Export Center, Notifications, Audit Logs

### Admin
- Roles & Permissions, Team Management, Billing, Subscription, API Keys, Webhooks,
  Workspace Settings, Profile Settings, Security Settings

### Auth & Onboarding
- Login, Register, Forgot Password, Reset Password, 2FA, Invite Team, Onboarding

### Special
- 404, 500, Maintenance, Empty State Examples (12-pattern library)

## License

This is a template project. Use freely for your own SalesOps dashboard.
