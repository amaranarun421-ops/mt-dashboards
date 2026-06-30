# MTVerse Dashboard — Premium SaaS UI Kit

A production-ready SaaS dashboard + UI library built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. 60+ pages, 250+ components, dark mode, fully responsive, fully accessible.

![MTVerse Dashboard](https://mtverse-dashboard.vercel.app/opengraph-image)

---

## Quickstart

```bash
# 1. Install dependencies (bun recommended, npm/yarn also work)
bun install
# or
npm install --legacy-peer-deps

# 2. Start the dev server
bun dev
# or
npm run dev

# 3. Open http://localhost:3000
```

That's it. No environment variables required to run the demo.

---

## What's Inside

### 10 Production-Grade Dashboards
| Dashboard | Description |
|-----------|-------------|
| **Ecommerce** | Commerce command center — revenue forecast, channel performance, inventory risk |
| **Analytics** | Audience intelligence — journey flow, source quality matrix, retention cohort |
| **Marketing** | Campaign command center — 7 social channels, A/B tests, attribution |
| **CRM** | Relationship command center — pipeline board, lead intent radar, renewal risk |
| **Stocks** | Market intelligence — live tickers, watchlists, technical analysis |
| **SaaS** | Subscription growth OS — MRR waterfall, churn risk, expansion pipeline |
| **Logistics** | Fleet command center — live delivery map, route optimization |
| **AI Workspace** | AI operations hub — model performance, API usage, prompt library |
| **Sales** | Revenue command center — quota tracking, leaderboard, forecasting |
| **Finance** | Financial control tower — P&L, cash flow, expense analysis |

### 19 UI Library Pages
- **Forms & Inputs** — 50+ variants (buttons, inputs, selects, checkboxes, radios, switches, sliders, ratings, file upload)
- **UI Elements** — badges, chips, avatars, alerts, progress, skeletons, separators
- **Tables** — data tables, sortable, filterable, paginated, with row actions
- **Charts** — ApexCharts integration, 15+ chart types
- **Maps** — 4 different map styles (jvectormap, simple-maps, custom SVG)
- **Chat**, **File Manager**, **Advanced UI**, **Extended UI**, and 11 more

### 10 Ecommerce Pages
Products, Product Detail, Product Cards, Add Product, Billing, Invoices, Single Invoice, Create Invoice, Transactions, Single Transaction

### 7 AI Pages
Chat, Workspace, Image Generator, Code Generator, Video Generator, Settings, API Usage

### 16 General Pages
Profile, Settings, Pricing (4 variants), FAQ, API Keys, Integrations, Activity Log, Notifications, Team, Success, Blank, 404, 500, 503, Coming Soon, Maintenance

### 9 Auth Pages
Sign In, Sign Up, Forgot Password, Reset Password, Verify Email, Two Factor, OTP, Welcome, Active Sessions

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack, standalone output) |
| **Language** | TypeScript 5 (strict mode) |
| **UI** | React 19, Tailwind CSS v4, shadcn/ui (new-york style) |
| **Charts** | ApexCharts (lazy-loaded), Recharts (lazy-loaded) |
| **Maps** | react-simple-maps (lazy-loaded), @react-jvectormap |
| **Icons** | lucide-react (tree-shaken via modularizeImports) |
| **State** | Zustand (sidebar, theme), React Query (server state) |
| **Forms** | React Hook Form + Zod |
| **Animation** | Framer Motion, CSS transitions |
| **Fonts** | Outfit (body + headings), JetBrains Mono (code) |
| **Theme** | next-themes (no-flash dark mode) |
| **Notifications** | Sonner + Radix Toast |

---

## Project Structure

```
mtverse-dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout — metadata, fonts, theme provider
│   │   ├── page.tsx              # Main page (Zustand router)
│   │   ├── globals.css           # Tailwind v4 + design tokens
│   │   ├── icon.tsx              # Dynamic favicon (SVG)
│   │   ├── apple-icon.tsx        # iOS touch icon
│   │   ├── opengraph-image.tsx   # Social sharing image (1200×630)
│   │   ├── manifest.ts           # PWA manifest
│   │   ├── robots.ts             # robots.txt
│   │   └── sitemap.ts            # sitemap.xml (auto from nav config)
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives (48 components)
│   │   ├── dashboard/            # Dashboard shell, sidebar, header, primitives
│   │   ├── dashboards/           # 10 dashboard implementations
│   │   ├── component-pages/      # 19 UI library pages
│   │   ├── ecommerce-pages/      # 10 ecommerce pages
│   │   ├── ai-pages/             # 7 AI pages
│   │   ├── auth/                 # 9 auth pages
│   │   └── pages-section/        # 16 general pages
│   │
│   ├── lib/
│   │   ├── site-config.ts        # ← EDIT THIS to rebrand the entire template
│   │   ├── dashboard-store.ts    # Zustand store (sidebar, navigation)
│   │   ├── utils.ts              # cn() helper + utilities
│   │   └── db.ts                 # Prisma client (optional)
│   │
│   ├── hooks/                    # use-toast, use-mobile
│   └── ...
│
├── public/                       # Static assets
├── prisma/                       # Database schema (optional)
├── next.config.ts                # Production config (strict TS, security headers)
├── tailwind.config.ts            # Tailwind v4 config
├── tsconfig.json                 # Strict TypeScript config
└── package.json
```

---

## Customization

### Rebrand in 5 minutes

Edit **`src/lib/site-config.ts`** — this is the single source of truth:

```typescript
export const SITE_CONFIG = {
  name: "Your Product Name",        // → updates title, OG, manifest, JSON-LD
  tagline: "Your tagline",
  description: "Your meta description",
  url: "https://your-domain.com",
  author: { name: "Your Company", url: "..." },
  theme: {
    brand: "#465FFF",               // → updates favicon, OG image, manifest
    accent: "#7A5AF8",
    // ...
  },
  // ...
};
```

Everything regenerates automatically — favicon, OG image, sitemap, manifest, metadata. No other files need editing.

### Change the brand color globally

Edit `src/app/globals.css` — the `--color-brand-*` scale drives every button, link, focus ring, and chart series:

```css
@theme inline {
  --color-brand-500: #465FFF;  /* ← your primary */
  --color-brand-600: #3641F5;  /* ← darker for hover */
  --color-brand-700: #2A31D8;  /* ← darker for active */
}
```

### Add a new dashboard page

1. Create `src/components/dashboards/your-dashboard.tsx`:
   ```typescript
   export function YourDashboard() {
     return <div className="space-y-6">...</div>;
   }
   ```
2. Register it in `src/app/page.tsx` (dashboards map).
3. Add a nav entry in `src/lib/site-config.ts` → `nav.dashboards`.
4. Done — sitemap auto-updates, command palette picks it up.

---

## Performance

| Metric | Target | Status |
|--------|--------|--------|
| Initial JS | < 300 KB | ✅ (charts/maps lazy-loaded) |
| LCP | < 2.5s | ✅ (Outfit preloaded, `display: swap`) |
| CLS | < 0.1 | ✅ (chart skeletons prevent layout shift) |
| Lighthouse | 95+ | ✅ |
| TypeScript | 0 errors | ✅ (strict mode, no `ignoreBuildErrors`) |

### Bundle optimization
- **ApexCharts** (350 KB) — lazy-loaded via `next/dynamic`, only loads on pages with charts
- **react-simple-maps** (150 KB) — lazy-loaded via `@/components/dashboard/lazy-maps`
- **lucide-react** — tree-shaken via `modularizeImports` (only used icons bundled)
- **Outfit font** — preloaded + `display: swap` (no invisible text)
- **JetBrains Mono** — not preloaded (only used in code blocks)

---

## SEO

- ✅ Per-page metadata via `generateMetadata`
- ✅ Auto-generated `sitemap.xml` (60+ URLs from nav config)
- ✅ `robots.txt` with sitemap reference
- ✅ PWA `manifest.webmanifest`
- ✅ Open Graph image (1200×630, auto-generated)
- ✅ Twitter card support
- ✅ JSON-LD structured data (SoftwareApplication schema)
- ✅ Canonical URLs
- ✅ Semantic HTML (`<h1>`-`<h6>`, `<nav>`, `<main>`, `<section>`, `<article>`)

---

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Deploy — zero config needed

### Docker / self-host
```bash
npm run build
# Standalone server in .next/standalone/
node .next/standalone/server.js
```

### Environment variables
None required for the demo. Optional:
```env
DATABASE_URL=postgresql://...    # If using Prisma
NEXTAUTH_SECRET=...              # If adding auth
```

---

## Browser Support

- Chrome / Edge 100+
- Firefox 100+
- Safari 15+
- Mobile Safari 15+ (iOS 15+)
- Chrome Android 100+

---

## License

See [LICENSE](./LICENSE).

---

## Support

- 📧 Email: hello@mtverse.dev
- 💬 Discord: [discord.gg/mtverse](https://discord.gg/mtverse)
- 🐛 Issues: [github.com/mtverse/dashboard/issues](https://github.com/mtverse/dashboard/issues)

---

**MTVerse Dashboard** — built with care for developers who care about craft.
