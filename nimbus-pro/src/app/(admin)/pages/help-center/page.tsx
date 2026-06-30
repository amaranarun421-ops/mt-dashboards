"use client";
import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  LifeBuoy, Search, BookOpen, CreditCard, Settings, ShieldCheck,
  Rocket, MessageCircle, ArrowRight, FileText, Zap, Palette
} from "lucide-react";

const CATEGORIES = [
  { icon: Rocket, title: "Getting started", desc: "Setup, install, and your first page", articles: 12, tone: "brand" },
  { icon: CreditCard, title: "Billing & plans", desc: "Subscriptions, invoices, and refunds", articles: 8, tone: "success" },
  { icon: Settings, title: "Account settings", desc: "Profile, security, and preferences", articles: 14, tone: "purple" },
  { icon: ShieldCheck, title: "Security & privacy", desc: "Data, access, and compliance", articles: 9, tone: "warning" },
  { icon: BookOpen, title: "Guides & tutorials", desc: "Step-by-step walkthroughs", articles: 24, tone: "pink" },
  { icon: Zap, title: "Integrations", desc: "Connect Nimbus Pro to your stack", articles: 11, tone: "orange" },
] as const;

const TONE: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
};

const POPULAR = [
  { title: "How to set up your first dashboard", category: "Getting started", views: "8.2k views", icon: Rocket },
  { title: "Customizing the theme and primary color", category: "Guides & tutorials", views: "6.1k views", icon: Palette },
  { title: "Connecting a Prisma database", category: "Integrations", views: "4.8k views", icon: Zap },
  { title: "Switching between density modes", category: "Account settings", views: "3.7k views", icon: Settings },
  { title: "Refund and license policy explained", category: "Billing & plans", views: "2.9k views", icon: CreditCard },
  { title: "Securing your workspace with 2FA", category: "Security & privacy", views: "2.4k views", icon: ShieldCheck },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-14">
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-14 dark:border-gray-800 dark:bg-gray-900 sm:px-12 lg:py-20">
        <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
        <div className="relative mx-auto max-w-2xl text-center">
          <Badge tone="brand" variant="soft" className="mb-4">
            <LifeBuoy className="h-3 w-3" /> Help Center
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            How can we help you today?
          </h1>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Search our knowledge base, browse popular topics, or contact support.
          </p>
          <div className="relative mx-auto mt-7 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, guides, and tutorials..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-theme-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-gray-800 dark:bg-gray-950"
            />
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Try: &quot;how to add a new page&quot; · &quot;theme customizer&quot; · &quot;reset password&quot;
          </p>
        </div>
      </section>

      {/* ============ Categories ============ */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Find what you need, fast.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} hover className="group h-full p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", TONE[c.tone])}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {c.articles} articles
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-brand-500" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ============ Popular articles ============ */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Popular articles
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Most-read this week.
          </p>
        </div>
        <Card className="divide-y divide-gray-100 p-0 dark:divide-gray-800">
          {POPULAR.map((a, i) => {
            const Icon = a.icon;
            return (
              <button
                key={i}
                className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {a.category} · {a.views}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-500 dark:text-gray-600" />
              </button>
            );
          })}
        </Card>
      </section>

      {/* ============ Contact CTA ============ */}
      <section>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-center text-white lg:p-12">
          <FileText className="mx-auto h-10 w-10 opacity-90" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            Couldn&apos;t find what you were looking for?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/85">
            Our support team is one click away. We respond to every ticket within one business day.
          </p>
          <Button variant="secondary" size="lg" className="mt-6">
            <MessageCircle className="h-4 w-4" /> Contact support
          </Button>
        </Card>
      </section>
    </div>
  );
}
