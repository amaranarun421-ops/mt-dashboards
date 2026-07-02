"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Star, Zap, Shield, Code2, Palette,
  LayoutDashboard, Table2, BarChart3, Briefcase, Users, ShoppingCart,
  Wallet, Megaphone, Calendar, MessageSquare, FileText, Settings,
  Component, FormInput, GitBranch, Sparkles, BookOpen, TrendingUp,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/route-map";
import { PageHero, SectionHeading, QuickLinkCard, Callout } from "@/components/common/page-blocks";

function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/features", label: "Features" },
              { href: "/pages-preview", label: "Pages" },
              { href: "/components-preview", label: "Components" },
              { href: "/pricing-license", label: "Pricing" },
              { href: "/docs", label: "Docs" },
              { href: "/changelog", label: "Changelog" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild className="gap-1.5">
              <Link href="/dashboard/ecommerce">Live Preview <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-xs text-gray-400">
        © 2026 Nexus Labs · Nexus Pro™ · <Link href="/" className="hover:text-brand-500">Back to home</Link>
      </footer>
    </div>
  );
}

// ============ Features page ============

export function FeaturesPage() {
  const featureGroups = [
    {
      title: "Foundation",
      icon: Code2,
      features: [
        { title: "Real Next.js App Router", desc: "Every nav item is a refresh-safe URL route — no client-side page switcher." },
        { title: "TypeScript strict", desc: "No `ignoreBuildErrors`, no `any`-everywhere. Proper domain types in src/types." },
        { title: "Clean code organization", desc: "src/app, src/components/{layout,common,charts,tables,forms}, src/features, src/data, src/hooks, src/lib." },
        { title: "reactStrictMode enabled", desc: "Catches bugs early. No skipped safety checks." },
        { title: "Mock data layer", desc: "Realistic customers, deals, products, audit events, API keys — not John Doe or Acme Corp." },
        { title: "API routes", desc: "Health check + dashboard + sales endpoints as realistic examples." },
      ],
    },
    {
      title: "Theming",
      icon: Palette,
      features: [
        { title: "Dark-first default", desc: "Default theme is dark, with a polished light mode that preserves brand identity." },
        { title: "No theme flash", desc: "Inline script sets the theme class before React hydrates." },
        { title: "Brand-aligned tokens", desc: "Same color, spacing, radius, and component behavior across themes." },
        { title: "Theme-aware charts", desc: "Recharts uses CSS variables for grid, axis, and tooltip colors." },
        { title: "Premium micro-interactions", desc: "Dialog/dropdown/popover animations, fade-in-up, scale-in, slide-in." },
        { title: "Glass effect, mesh background", desc: "Used judiciously on auth and error pages." },
      ],
    },
    {
      title: "Data tables",
      icon: Table2,
      features: [
        { title: "TanStack-powered", desc: "Sort, filter, global search, column search, column visibility, column resizing." },
        { title: "Row selection + bulk actions", desc: "Select rows and run bulk actions from a contextual bar." },
        { title: "Density toggle", desc: "Compact / standard / comfortable row heights." },
        { title: "CSV + JSON export", desc: "Export filtered or selected rows in one click." },
        { title: "Loading + empty states", desc: "Skeleton rows while loading, illustrated empty state when no data." },
        { title: "Mobile-responsive", desc: "Horizontal scroll with sticky first column on narrow viewports." },
      ],
    },
    {
      title: "Charts",
      icon: BarChart3,
      features: [
        { title: "Custom dark/light tooltips", desc: "Theme-aware tooltip component, not the default Recharts tooltip." },
        { title: "Trend badges", desc: "Inline trend indicators on chart cards." },
        { title: "Fullscreen chart modal", desc: "Expand any chart to a 60vh modal for presentation mode." },
        { title: "Funnel + cohort matrix", desc: "Custom SVG funnel and heatmap-style cohort matrix." },
        { title: "Reusable series tokens", desc: "8-color brand-aligned series palette." },
        { title: "Line, area, bar, pie, donut, radar, radial", desc: "All built as reusable components with consistent theming." },
      ],
    },
    {
      title: "Sales Ops flagship",
      icon: Briefcase,
      features: [
        { title: "Pipeline value + weighted forecast", desc: "Live pipeline with weighted forecast and accuracy tracking." },
        { title: "Quota attainment leaderboard", desc: "Per-rep attainment with win rate, deal count, and pipeline." },
        { title: "Deal risk scoring", desc: "Each deal has a 0–100 risk score based on age, stage, and activity." },
        { title: "Next-best-action panel", desc: "AI-style recommendation panel for stalled deals." },
        { title: "Activity timeline", desc: "Calls, emails, meetings, notes — all filterable." },
        { title: "Territory + rep analytics", desc: "Geo breakdown with attainment per territory." },
      ],
    },
    {
      title: "Polish",
      icon: Sparkles,
      features: [
        { title: "Command palette (⌘K)", desc: "Search all pages, quick-create deals/leads/tasks, theme toggle, recent pages." },
        { title: "Favorites + recent pages", desc: "Sidebar surfaces your starred and recently visited routes." },
        { title: "Route-aware header", desc: "Breadcrumbs, quick-create menu, and actions adapt to the current route's domain." },
        { title: "9 unique error pages", desc: "Each error code has its own layout, message, and CTA — not a shared template." },
        { title: "Premium auth flow", desc: "Sign-in, sign-up, forgot, reset, verify, 2FA, lock — all polished." },
        { title: "No repeated layouts", desc: "PageHero (6 tones), StatBlock (5 variants), EmptyState (3 variants) for visual variety." },
      ],
    },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Features"
        description="A complete dashboard foundation built to commercial standards."
        breadcrumb={["Home", "Features"]}
        tone="brand"
        actions={<Button asChild><Link href="/dashboard/ecommerce">Try Live Demo <ArrowRight className="h-4 w-4" /></Link></Button>}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {featureGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title}>
                <SectionHeading
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-5 w-5 text-brand-500" /> {group.title}
                    </span>
                  }
                  description={`${group.features.length} capabilities`}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.features.map((f) => (
                    <Card key={f.title} className="card-hover">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Check className="h-4 w-4 text-success-500" /> {f.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">{f.desc}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MarketingShell>
  );
}

// ============ Pages preview ============

export function PagesPreviewPage() {
  const groups = [
    { label: "Dashboards", routes: routes.filter((r) => r.group === "Dashboards"), icon: LayoutDashboard },
    { label: "Sales Ops", routes: routes.filter((r) => r.group === "Sales Ops" && !r.hidden), icon: Briefcase },
    { label: "Applications", routes: routes.filter((r) => r.group === "Applications"), icon: Component },
    { label: "Account", routes: routes.filter((r) => r.group === "Account"), icon: Users },
    { label: "UI Elements", routes: routes.filter((r) => r.group === "UI Elements"), icon: Component },
    { label: "Forms", routes: routes.filter((r) => r.group === "Forms"), icon: FormInput },
    { label: "Tables", routes: routes.filter((r) => r.group === "Tables"), icon: Table2 },
    { label: "Charts", routes: routes.filter((r) => r.group === "Charts"), icon: BarChart3 },
    { label: "Pages", routes: routes.filter((r) => r.group === "Pages"), icon: FileText },
    { label: "Authentication", routes: routes.filter((r) => r.group === "Authentication"), icon: Shield },
    { label: "Error Pages", routes: routes.filter((r) => r.group === "Errors"), icon: Component },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Pages preview"
        description="Every route below is a real, refresh-safe URL. Click any to open."
        breadcrumb={["Home", "Pages"]}
        tone="brand"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.label}>
              <SectionHeading
                title={<span className="inline-flex items-center gap-2"><Icon className="h-5 w-5 text-brand-500" /> {g.label}</span>}
                description={`${g.routes.length} page${g.routes.length === 1 ? "" : "s"}`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {g.routes.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link
                      key={r.id}
                      href={r.path}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] px-4 py-3 card-hover"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-brand-500/10 group-hover:text-brand-500 transition">
                        <RIcon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{r.label}</p>
                        <p className="text-xs text-gray-400 truncate font-mono">{r.path}</p>
                      </div>
                      {r.badge && (
                        <Badge variant="secondary" className="text-[10px]">{r.badge}</Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MarketingShell>
  );
}

// ============ Components preview ============

export function ComponentsPreviewPage() {
  const components = [
    { name: "DataTable", desc: "TanStack-powered table with sort, filter, select, export, density, column visibility.", href: "/tables/advanced", icon: Table2 },
    { name: "ChartCard", desc: "Wrapper with title, description, fullscreen modal, trend badge, and legend.", href: "/charts/line", icon: BarChart3 },
    { name: "PageHero", desc: "6 tonal variants for page headers — default, brand, success, warning, error, minimal.", href: "/dashboard/analytics", icon: LayoutDashboard },
    { name: "StatBlock", desc: "5 stat card variants — card, minimal, bar, gradient, compact — with sparklines.", href: "/dashboard/ecommerce", icon: TrendingUp },
    { name: "EmptyState", desc: "3 variants — default, minimal, illustrated — for contextual empty states.", href: "/apps/files", icon: Sparkles },
    { name: "Callout", desc: "5 tonal callouts for tips, warnings, errors, info, brand highlights.", href: "/ui/alerts", icon: Component },
    { name: "FunnelChart", desc: "Custom SVG funnel chart with conversion percentages and gradient bars.", href: "/dashboard/analytics", icon: TrendingUp },
    { name: "CohortMatrix", desc: "Heatmap-style cohort retention matrix with intensity-based coloring.", href: "/dashboard/analytics", icon: LayoutDashboard },
    { name: "CommandPalette", desc: "⌘K palette with quick actions, recent pages, theme toggle, and grouped search.", href: "/dashboard/ecommerce", icon: Component },
    { name: "Sidebar", desc: "Grouped nav, favorites, recent, search, badge variants, collapse animation.", href: "/dashboard/ecommerce", icon: Component },
    { name: "Header", desc: "Breadcrumbs, search trigger, quick-create, notifications, theme toggle, user menu.", href: "/dashboard/ecommerce", icon: Component },
    { name: "Marketing Landing", desc: "This very page — hero, features, dashboards showcase, CTA, footer.", href: "/", icon: Sparkles },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Components preview"
        description="The reusable premium component systems that power every Nexus Pro page."
        breadcrumb={["Home", "Components"]}
        tone="brand"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((c) => {
            const Icon = c.icon;
            return (
              <QuickLinkCard
                key={c.name}
                title={c.name}
                description={c.desc}
                href={c.href}
                icon={Icon}
                badge="Preview"
              />
            );
          })}
        </div>
      </div>
    </MarketingShell>
  );
}

// ============ Pricing / License ============

export function PricingPage() {
  const [billing, setBilling] = React.useState<"once" | "yearly">("once");

  const plans = [
    {
      name: "Starter",
      price: { once: 49, yearly: 0 },
      desc: "For solo builders shipping their first dashboard.",
      features: ["1 project", "Personal use license", "12 dashboard pages", "Community support", "6 months of updates"],
      cta: "Buy Starter",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { once: 149, yearly: 0 },
      desc: "For freelancers and small teams shipping commercial SaaS.",
      features: ["Unlimited projects", "Commercial license", "All 100+ pages", "Sales Ops module", "Priority email support", "Lifetime updates", "No attribution required"],
      cta: "Buy Pro",
      highlighted: true,
      badge: "Most popular",
    },
    {
      name: "Enterprise",
      price: { once: 499, yearly: 0 },
      desc: "For teams who need white-label + custom support.",
      features: ["Everything in Pro", "White-label branding", "Up to 10 developers", "Dedicated Slack channel", "Custom onboarding session", "1-on-1 quarterly reviews", "Source Figma files"],
      cta: "Talk to Sales",
      highlighted: false,
    },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Pricing & License"
        description="One-time purchase. Lifetime updates. No subscriptions, no usage tracking."
        breadcrumb={["Home", "Pricing"]}
        tone="brand"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 p-1">
            <button
              onClick={() => setBilling("once")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${billing === "once" ? "bg-brand-500 text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            >
              One-time
            </button>
            <button
              disabled
              className="px-4 py-1.5 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed"
            >
              Yearly <span className="text-xs">(N/A)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${plan.highlighted ? "border-brand-500 dark:border-brand-500/60 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/30" : ""}`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-500 to-purple-500 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  {plan.badge}
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price.once}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/dashboard/ecommerce">{plan.cta}</Link>
                </Button>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Callout title="License summary" tone="brand" icon={Shield}>
            <p>
              All plans include a royalty-free, perpetual license. Use Nexus Pro in unlimited
              commercial projects. The Pro and Enterprise tiers remove attribution requirements.
              Reselling or redistributing the source as a competing dashboard kit is not permitted.
            </p>
          </Callout>
        </div>
      </div>
    </MarketingShell>
  );
}

// ============ Documentation ============

export function DocsPage() {
  const sections = [
    { title: "Getting started", items: ["Installation", "Project structure", "Running the dev server", "Building for production", "Deploying to Vercel"] },
    { title: "Theming", items: ["Dark-first defaults", "CSS variables", "Theme tokens", "Switching themes", "Customizing the brand color"] },
    { title: "Routing", items: ["App Router structure", "Route map (src/lib/route-map.ts)", "Adding a new page", "Metadata API", "Loading & error boundaries"] },
    { title: "Data tables", items: ["Using the DataTable component", "Defining columns", "Customizing the toolbar", "Bulk actions", "Export to CSV/JSON"] },
    { title: "Charts", items: ["Chart tokens", "LineSeriesChart", "BarSeriesChart", "DonutChart", "FunnelChart", "CohortMatrix", "Fullscreen modal"] },
    { title: "Sales Ops module", items: ["Overview page", "Pipeline visualization", "Forecasting", "Deal risk scoring", "Rep leaderboard", "Territory analytics"] },
    { title: "State management", items: ["Zustand for UI state", "When to use server state", "Persisting preferences", "Theme + density + favorites"] },
    { title: "Authentication", items: ["Auth flow overview", "Mock auth pages", "Wiring real auth", "Protected routes"] },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Documentation"
        description="Everything you need to build, customize, and ship with Nexus Pro."
        breadcrumb={["Home", "Docs"]}
        tone="brand"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-1">
              {sections.map((s) => (
                <a key={s.title} href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`} className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-white/[0.03] rounded-md transition">
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
          <div className="lg:col-span-3 space-y-12">
            {sections.map((s) => (
              <section key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
                <div className="space-y-3">
                  {s.items.map((item) => (
                    <div key={item} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-brand-500/40 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold">{item}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Walkthrough, examples, and code snippets.</p>
                        </div>
                        <BookOpen className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
            <Callout title="Need more help?" tone="brand" icon={MessageSquare}>
              Pro and Enterprise customers get priority email and Slack support.{" "}
              <Link href="/pricing-license" className="font-semibold underline">View plans →</Link>
            </Callout>
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}

// ============ Changelog ============

export function ChangelogPage() {
  const releases = [
    {
      version: "1.0.0",
      date: "2026-07-01",
      tag: "Initial release",
      highlights: [
        "Real Next.js App Router routes for 100+ pages — no client-side switcher",
        "Dark-first default theme with polished light mode (no theme flash)",
        "TanStack-powered DataTable with sort, filter, select, bulk actions, export, density, column visibility",
        "Theme-aware Recharts components (Line, Area, Bar, Pie, Donut, Radar, Radial, Funnel, Cohort)",
        "Sales Ops flagship module with 20+ routes (pipeline, forecasting, quota, deals, leads, accounts, etc.)",
        "PageHero (6 tones), StatBlock (5 variants), EmptyState (3 variants) for visual variety",
        "Upgraded command palette (⌘K) with quick actions, recent pages, theme toggle",
        "Sidebar with favorites, recent pages, mini search, badge variants, collapse animation",
        "9 unique error pages (401, 403, 404, 405, 408, 429, 500, 503, offline)",
        "Premium auth flow (sign-in, sign-up, forgot, reset, verify, 2FA, lock)",
        "Marketing landing + features + pages preview + components preview + pricing + docs + changelog",
        "Cleaned dependencies — removed Prisma, next-auth, next-intl, react-query, sharp, z-ai-web-dev-sdk",
        "reactStrictMode enabled, ignoreBuildErrors removed",
      ],
    },
  ];

  return (
    <MarketingShell>
      <PageHero
        title="Changelog"
        description="What's new in every release of Nexus Pro."
        breadcrumb={["Home", "Changelog"]}
        tone="brand"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {releases.map((r) => (
          <div key={r.version} className="relative pl-8 pb-12 border-l-2 border-gray-200 dark:border-gray-800">
            <div className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-brand-500/20" />
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold">v{r.version}</h2>
              <Badge variant="secondary">{r.tag}</Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{r.date}</span>
            </div>
            <ul className="space-y-2">
              {r.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MarketingShell>
  );
}
