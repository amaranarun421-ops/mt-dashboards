"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Check, Shield, Zap, BarChart3, Code2, Palette,
  LayoutDashboard, Table2, ShoppingCart, Users, Wallet, Megaphone,
  Briefcase, TrendingUp, Star, Github, Chrome, Apple, Layers, Github as GithubIcon,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* ====== Top Nav ====== */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/features", label: "Features" },
              { href: "/pages-preview", label: "Pages" },
              { href: "/components-preview", label: "Components" },
              { href: "/pricing-license", label: "Pricing" },
              { href: "/docs", label: "Docs" },
              { href: "/changelog", label: "Changelog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="gap-1.5">
              <Link href="/dashboard/ecommerce">
                Live Preview <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ====== Hero ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            v1.0 — Now with Sales Ops flagship module
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            The premium dashboard kit for{" "}
            <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-purple-500 bg-clip-text text-transparent">
              modern SaaS teams
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            100+ production-ready pages, advanced TanStack data tables, fully themed Recharts,
            a polished dark-first design system, and a flagship Sales Ops module —
            all built on Next.js App Router, Tailwind v4, and shadcn/ui.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" asChild className="gap-2 h-12 px-6">
              <Link href="/dashboard/ecommerce">
                Explore Live Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6 gap-2">
              <Link href="/pricing-license">
                <Star className="h-4 w-4" /> View Pricing
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success-500" /> Lifetime updates</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success-500" /> Commercial license</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success-500" /> Premium support</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success-500" /> No attribution</span>
          </motion.div>
        </div>

        {/* Hero preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-2 shadow-2xl shadow-brand-500/10">
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-3 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-error-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-success-400" />
                <span className="ml-3 text-[10px] text-gray-500 dark:text-gray-400 font-mono">nexuspro.dashboard/overview</span>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-brand-500/5 via-white to-purple-500/5 dark:from-brand-500/10 dark:via-gray-900 dark:to-purple-500/10 grid grid-cols-12 gap-3 p-3">
                <div className="col-span-3 space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-6 rounded bg-gray-200/60 dark:bg-gray-800/60" />
                  ))}
                </div>
                <div className="col-span-9 space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-16 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                    ))}
                  </div>
                  <div className="h-32 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-24 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                    <div className="h-24 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====== Stats ====== */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "100+", label: "Production pages" },
            { value: "12", label: "Domain dashboards" },
            { value: "20+", label: "Sales Ops routes" },
            { value: "1", label: "Polished design system" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-brand-500 to-purple-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== Features ====== */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to ship</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              A complete dashboard foundation — routing, theming, data tables, charts, auth, and more — built to commercial standards.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: LayoutDashboard, title: "Real App Router routes", desc: "Every nav item is a refresh-safe, shareable Next.js App Router route with proper metadata, loading, and error boundaries." },
              { icon: Palette, title: "Dark-first premium theming", desc: "Default dark theme with a polished light mode. Same brand color, spacing, and component behavior across both." },
              { icon: Table2, title: "TanStack-powered data tables", desc: "Sort, filter, search, select, bulk actions, column visibility, density toggle, CSV/JSON export, saved views." },
              { icon: BarChart3, title: "Themed charts", desc: "Recharts with dark/light-aware colors, custom tooltips, trend badges, fullscreen mode, and a funnel + cohort matrix." },
              { icon: Briefcase, title: "Sales Ops flagship module", desc: "Pipeline value, weighted forecast, quota attainment, rep leaderboard, deal risk scoring, next-best-action." },
              { icon: Shield, title: "Auth & error pages", desc: "Sign-in, sign-up, forgot, reset, verify, 2FA, lock — plus 9 unique error pages with their own layout." },
              { icon: Zap, title: "Performance-first", desc: "Dynamic imports, lazy chart loading, memoized columns, route-level loading states, no ignored build errors." },
              { icon: Code2, title: "Clean TypeScript", desc: "Strict types, organized into src/features, src/data, src/types, src/hooks, src/lib. No `any` everywhere." },
              { icon: Layers, title: "Reusable component systems", desc: "PageHero, StatBlock (5 variants), EmptyState (3 variants), Panel, Callout, ChartCard, DataTable — no repeated layouts." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-6 card-hover"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== Dashboards showcase ====== */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-950/50 border-y border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">12 domain dashboards</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Each dashboard is purpose-built for its domain — not a generic template with different text.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: ShoppingCart, label: "Ecommerce", href: "/dashboard/ecommerce", color: "from-blue-light-500 to-blue-light-700" },
              { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", color: "from-brand-500 to-brand-700" },
              { icon: Users, label: "CRM", href: "/dashboard/crm", color: "from-success-500 to-success-700" },
              { icon: Wallet, label: "Finance", href: "/dashboard/finance", color: "from-warning-500 to-warning-700" },
              { icon: Megaphone, label: "Marketing", href: "/dashboard/marketing", color: "from-pink-500 to-purple-700" },
              { icon: Briefcase, label: "Sales Ops", href: "/sales/overview", color: "from-brand-500 to-purple-700" },
              { icon: LayoutDashboard, label: "Projects", href: "/dashboard/projects", color: "from-purple-500 to-pink-700" },
              { icon: TrendingUp, label: "Logistics", href: "/dashboard/logistics", color: "from-blue-light-500 to-success-700" },
            ].map((d) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.label}
                  href={d.href}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-5 card-hover"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${d.color} text-white shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{d.label}</p>
                  <ArrowRight className="absolute top-4 right-4 h-4 w-4 text-gray-300 opacity-0 transition group-hover:opacity-100 group-hover:text-brand-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-700 p-10 md:p-16 text-center text-white shadow-2xl shadow-brand-500/20">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ship your next SaaS dashboard in days, not months.</h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                One license, lifetime updates, commercial use. Get the entire Nexus Pro kit and start building today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" asChild className="bg-white text-brand-700 hover:bg-white/90 gap-2 h-12 px-6">
                  <Link href="/pricing-license">Get Nexus Pro <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white h-12 px-6">
                  <Link href="/dashboard/ecommerce">Try Live Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Footer ====== */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Logo />
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                The premium Next.js App Router dashboard kit for modern SaaS teams.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
                  <Chrome className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
                  <Apple className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Product</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/features" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Features</Link></li>
                <li><Link href="/pages-preview" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Pages</Link></li>
                <li><Link href="/pricing-license" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Pricing</Link></li>
                <li><Link href="/changelog" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Resources</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/docs" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Documentation</Link></li>
                <li><Link href="/components-preview" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Components</Link></li>
                <li><Link href="/dashboard/ecommerce" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">Live Demo</Link></li>
                <li><Link href="/pages/faq" className="text-gray-500 hover:text-brand-500 dark:text-gray-400">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© 2026 Nexus Labs. All rights reserved. Nexus Pro™ is a trademark of Nexus Labs.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-brand-500">Privacy</a>
              <a href="#" className="hover:text-brand-500">Terms</a>
              <a href="#" className="hover:text-brand-500">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
