"use client";

import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  RocketIcon,
  GlobeIcon,
  BookIcon,
  HelpCircleIcon,
  CheckIcon,
  ServerIcon,
  ShieldIcon,
  CpuIcon,
  LayersIcon,
  ActivityIcon,
  StarIcon,
  KanbanIcon,
  FileTextIcon,
  PlugIcon,
} from "@/components/Layouts/sidebar/icons";

const features = [
  {
    icon: <LayersIcon className="size-5" />,
    title: "100+ production pages",
    description:
      "Dashboards, apps, ecommerce, user-account, forms, tables, charts, ui-components, auth, errors, marketing — all wired and routed.",
  },
  {
    icon: <CpuIcon className="size-5" />,
    title: "Next.js 16 + React 19",
    description:
      "App Router, server components by default, TypeScript 5 strict mode. The `\"use client\"` directive is used only where state and effects are truly needed.",
  },
  {
    icon: <KanbanIcon className="size-5" />,
    title: "25+ reusable components",
    description:
      "Button, Card, Badge, Avatar, StatCard, ChartCard, DataTable, Modal, Drawer, Tabs, Accordion, Progress, Timeline and more.",
  },
  {
    icon: <ActivityIcon className="size-5" />,
    title: "Theme-aware charts",
    description:
      "HeliosChart wraps ApexCharts with light/dark awareness, emerald + amber palettes, and a single declarative API.",
  },
  {
    icon: <ShieldIcon className="size-5" />,
    title: "SOC 2 + SSO ready",
    description:
      "Defensive auth-client and db stubs ship in demo mode. Wire NextAuth + Prisma when you are ready to go live.",
  },
  {
    icon: <PlugIcon className="size-5" />,
    title: "12 first-party integrations",
    description:
      "Stripe, Shopify, HubSpot, Slack, Notion, GitHub, Linear, Postgres, BigQuery, Snowflake, Segment — all bi-directional.",
  },
];

const stats = [
  { label: "Production pages", value: "100+", tone: "primary" as const },
  { label: "Reusable components", value: "25+", tone: "accent" as const },
  { label: "Chart types", value: "10+", tone: "info" as const },
  { label: "Customers", value: "12.4k", tone: "violet" as const },
];

const testimonials = [
  {
    name: "Daniel Okafor",
    role: "CTO, Northwind Labs",
    quote:
      "We shipped our internal analytics tool in 9 days instead of 9 weeks. The chart layer alone saved us a sprint.",
    tone: "primary" as const,
  },
  {
    name: "Sofia Rossi",
    role: "Product Lead, Cascade",
    quote:
      "The design system is so well-thought-out that our designers and engineers now speak the same language. Worth every dollar.",
    tone: "accent" as const,
  },
  {
    name: "Liam Chen",
    role: "Indie hacker",
    quote:
      "I bought Helios Pro on a Friday and had a paid SaaS landing page live by Monday morning. The marketing pages are gorgeous.",
    tone: "violet" as const,
  },
];

const pricingTeaser = [
  {
    name: "Starter",
    price: "$49",
    blurb: "Single project, 1 developer, 6 months of updates.",
    features: ["100+ pages", "25+ components", "Light + dark", "Community Discord"],
    cta: "Buy Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$149",
    blurb: "Unlimited projects, 5 developers, lifetime updates.",
    features: [
      "Everything in Starter",
      "Unlimited projects",
      "5 developer seats",
      "Priority support",
      "Theme customizer source",
    ],
    cta: "Buy Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "SAML SSO, SCIM, audit logs, dedicated SLA.",
    features: [
      "Everything in Pro",
      "SAML SSO + SCIM",
      "Audit log export",
      "Dedicated SLA",
      "Solution architect",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const faqTeaser = [
  {
    q: "Which framework and language does Helios Pro use?",
    a: "Next.js 16 with the App Router, React 19 and TypeScript 5. Styling is Tailwind CSS v4 with a custom design-token layer.",
  },
  {
    q: "Can I use Helios Pro for client work?",
    a: "Yes — the license covers unlimited personal and commercial projects. You may not resell the kit as a standalone product.",
  },
  {
    q: "Do you offer refunds?",
    a: "Within 14 days of purchase, no questions asked. Email billing@heliospro.io with your invoice number.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/landing" },
          { label: "Landing" },
        ]}
        className="mb-4"
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-primary-subtle via-white to-accent-subtle p-8 dark:border-dark-3 dark:from-primary/15 dark:via-gray-dark dark:to-accent/15 md:p-14">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge variant="primary" size="lg" className="mb-5">
            <RocketIcon className="size-3.5" /> Helios Pro v4.2 is here
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-dark dark:text-white md:text-5xl md:leading-tight">
            Illuminating data,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}empowering decisions.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-dark-5 dark:text-dark-6 md:text-lg">
            The premium Next.js 16 admin UI kit with 100+ pages, 25+ reusable
            components and a refined emerald + amber design system. Ship your
            next dashboard in days, not months.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg">
              <RocketIcon className="size-4" /> Get Helios Pro
            </Button>
            <Button size="lg" variant="outline">
              <BookIcon className="size-4" /> Read the docs
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-dark-5 dark:text-dark-6">
            <AvatarGroup
              names={["Aarav Mehta", "Priya Nair", "Daniel Okafor", "Sofia Rossi", "Liam Chen"]}
              size="sm"
            />
            <span>
              Trusted by{" "}
              <strong className="text-dark dark:text-white">12,400+</strong>{" "}
              developers
            </span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} hover className="text-center">
            <p
              className={`text-3xl font-bold tracking-tight ${
                s.tone === "primary"
                  ? "text-primary"
                  : s.tone === "accent"
                    ? "text-accent-dark dark:text-accent-light"
                    : s.tone === "info"
                      ? "text-blue-dark dark:text-blue-light"
                      : "text-violet dark:text-violet-light"
              }`}
            >
              {s.value}
            </p>
            <p className="mt-1 text-sm font-medium text-dark-5 dark:text-dark-6">
              {s.label}
            </p>
          </Card>
        ))}
      </section>

      {/* FEATURES */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <Badge variant="accent">Features</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            Everything you need to ship a premium dashboard
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            From realtime charts to a full ecommerce suite, Helios Pro has the
            building blocks for any data-heavy web app.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} hover>
              <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-dark-5 dark:text-dark-6">
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <Badge variant="violet">Testimonials</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            Loved by product teams worldwide
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} hover>
              <div className="mb-3 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-4" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-dark dark:text-white">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-stroke pt-4 dark:border-dark-3">
                <Avatar name={t.name} tone={t.tone} />
                <div>
                  <p className="text-sm font-semibold text-dark dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <Badge variant="success">Pricing</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            One-time purchase. Lifetime updates on Pro and Enterprise. No
            subscriptions, no per-seat fees on Starter.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pricingTeaser.map((p) => (
            <Card
              key={p.name}
              hover
              className={
                p.highlight
                  ? "relative border-primary/50 ring-1 ring-primary/30 dark:border-primary/40"
                  : ""
              }
            >
              {p.highlight && (
                <Badge variant="primary" className="absolute right-4 top-4">
                  Most popular
                </Badge>
              )}
              <h3 className="text-sm font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6">
                {p.name}
              </h3>
              <p className="mt-3 text-3xl font-bold tracking-tight text-dark dark:text-white">
                {p.price}
              </p>
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                {p.blurb}
              </p>
              <ul className="mt-5 space-y-2">
                {p.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-sm text-dark dark:text-white"
                  >
                    <CheckIcon className="size-4 text-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlight ? "primary" : "outline"}
                className="mt-6 w-full"
              >
                {p.cta}
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm">
            <FileTextIcon className="size-4" /> Compare all features
          </Button>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <Badge variant="info">FAQ</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
            Can&rsquo;t find the answer you are looking for? Reach out to our
            team — we usually reply within a few hours.
          </p>
          <Button variant="soft" size="sm" className="mt-5">
            <HelpCircleIcon className="size-4" /> Visit full FAQ
          </Button>
        </Card>
        <Card className="lg:col-span-2">
          <ul className="divide-y divide-stroke dark:divide-dark-3">
            {faqTeaser.map((f) => (
              <li key={f.q} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {f.q}
                </p>
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                  {f.a}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-white md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to ship your next dashboard?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              Join 12,400+ developers and product teams building on Helios Pro.
              One-time purchase, lifetime updates, 14-day refund window.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <BookIcon className="size-4" /> View docs
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <RocketIcon className="size-4" /> Get Helios Pro
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { icon: <GlobeIcon className="size-4" />, label: "Remote-first", value: "24 people, 11 timezones" },
          { icon: <ShieldIcon className="size-4" />, label: "SOC 2 Type II", value: "Security & availability" },
          { icon: <ServerIcon className="size-4" />, label: "99.99% uptime", value: "Last 12 months" },
          { icon: <CheckIcon className="size-4" />, label: "14-day refund", value: "No questions asked" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
              {s.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">
                {s.label}
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">{s.value}</p>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}