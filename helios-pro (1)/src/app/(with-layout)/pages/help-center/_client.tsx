"use client";

import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  BookIcon,
  HelpCircleIcon,
  WrenchIcon,
  RocketIcon,
  MailIcon,
  ChatIcon,
  FileTextIcon,
  ActivityIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";

const categories = [
  {
    icon: <BookIcon className="size-5" />,
    title: "Guides",
    description:
      "Step-by-step walkthroughs covering setup, customisation and common workflows.",
    count: 42,
    tone: "primary" as const,
  },
  {
    icon: <RocketIcon className="size-5" />,
    title: "Tutorials",
    description:
      "Hands-on, end-to-end projects — build a SaaS dashboard, ecommerce store, or analytics tool.",
    count: 28,
    tone: "accent" as const,
  },
  {
    icon: <FileTextIcon className="size-5" />,
    title: "Reference",
    description:
      "Component props, chart options, API endpoints, SDK method signatures and design tokens.",
    count: 156,
    tone: "violet" as const,
  },
  {
    icon: <WrenchIcon className="size-5" />,
    title: "Troubleshooting",
    description:
      "Solutions to common issues — hydration, theming, charts, build errors and deployment.",
    count: 37,
    tone: "info" as const,
  },
];

const toneAccent = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
};

const popularArticles = [
  {
    title: "Getting started in 5 minutes",
    category: "Guides",
    views: "48.2k",
    time: "5 min read",
  },
  {
    title: "Customising the theme and brand colors",
    category: "Guides",
    views: "31.8k",
    time: "8 min read",
  },
  {
    title: "Building a realtime dashboard with HeliosChart",
    category: "Tutorials",
    views: "27.4k",
    time: "22 min read",
  },
  {
    title: "DataTable — sorting, filtering and pagination",
    category: "Reference",
    views: "24.1k",
    time: "12 min read",
  },
  {
    title: "Deploying to Vercel, Netlify and AWS",
    category: "Guides",
    views: "19.7k",
    time: "10 min read",
  },
  {
    title: "Fixing hydration mismatches in dark mode",
    category: "Troubleshooting",
    views: "16.3k",
    time: "6 min read",
  },
  {
    title: "Wiring NextAuth and Prisma for production",
    category: "Tutorials",
    views: "14.9k",
    time: "18 min read",
  },
  {
    title: "API rate limits and authentication",
    category: "Reference",
    views: "12.6k",
    time: "7 min read",
  },
];

const contactOptions = [
  {
    icon: <MailIcon className="size-5" />,
    title: "Email support",
    description:
      "support@heliospro.io — replies within a few hours, Monday to Friday.",
    cta: "Send an email",
    tone: "primary" as const,
  },
  {
    icon: <ChatIcon className="size-5" />,
    title: "Live chat",
    description:
      "Chat with our team in real time, 8am to 8pm UTC. Average reply under 2 minutes.",
    cta: "Start a chat",
    tone: "accent" as const,
  },
  {
    icon: <HelpCircleIcon className="size-5" />,
    title: "Community Discord",
    description:
      "Join 4,200+ Helios Pro developers. Get help, share builds and request features.",
    cta: "Join Discord",
    tone: "violet" as const,
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/help-center" },
          { label: "Help Center" },
        ]}
        className="mb-4"
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-primary-subtle via-white to-accent-subtle p-8 dark:border-dark-3 dark:from-primary/15 dark:via-gray-dark dark:to-accent/15 md:p-12">
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Badge variant="primary" size="lg" className="mb-4">
            <HelpCircleIcon className="size-3.5" /> Help Center
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-dark dark:text-white md:text-4xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            Search 260+ articles across guides, tutorials, the API reference
            and troubleshooting. Or browse by category below.
          </p>

          {/* SEARCH BAR (visual only — full search lives in the FAQ page) */}
          <div className="mx-auto mt-6 max-w-xl">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <a
                href="/pages/faq"
                className="block w-full rounded-xl border border-stroke bg-white px-12 py-3.5 text-left text-sm text-dark-6 transition hover:border-primary/50 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:border-primary/40"
              >
                Search for articles, e.g. &ldquo;SSO&rdquo;, &ldquo;rate limit&rdquo;…
              </a>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-dark-5 dark:text-dark-6">
              <span>Popular:</span>
              {["Getting started", "Theming", "Charts", "Deployment"].map((t) => (
                <a
                  key={t}
                  href="/pages/faq"
                  className="rounded-full border border-stroke px-2.5 py-0.5 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:hover:text-primary-light"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-10">
        <CardHeader
          title="Browse by category"
          subtitle="Pick a track — each one has dozens of articles, tutorials and reference pages."
          className="mb-4"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Card key={c.title} hover>
              <div className={`mb-4 grid size-11 place-items-center rounded-xl ${toneAccent[c.tone]}`}>
                {c.icon}
              </div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                {c.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="neutral" size="sm">
                  {c.count} articles
                </Badge>
                <Button variant="ghost" size="sm">
                  Browse
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* POPULAR ARTICLES + CONTACT */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Popular articles"
            subtitle="The most-read pieces in the help center this month."
            action={
              <Badge variant="success">
                <ActivityIcon className="size-3.5" /> Trending
              </Badge>
            }
          />
          <ul className="divide-y divide-stroke dark:divide-dark-3">
            {popularArticles.map((a, i) => (
              <li key={a.title}>
                <a
                  href="#"
                  className="flex items-center gap-4 py-3.5 transition hover:bg-gray-2 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-gray-2 text-xs font-semibold text-dark-5 dark:bg-white/10 dark:text-dark-6">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                      {a.category} · {a.time} · {a.views} views
                    </p>
                  </div>
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 text-dark-5 dark:text-dark-6"
                  >
                    <path
                      d="M6 3.5L10.5 8L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <CardHeader title="Talk to us" className="mb-0" />
          {contactOptions.map((c) => (
            <Card key={c.title} hover className="py-4">
              <div className="flex items-start gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${toneAccent[c.tone]}`}>
                  {c.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-dark dark:text-white">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                    {c.description}
                  </p>
                  <Button variant="soft" size="sm" className="mt-3">
                    {c.cta}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* STATUS BANNER */}
      <section className="mt-10">
        <Card className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
              <CheckIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                All systems operational
              </h3>
              <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
                API, dashboards, integrations and the docs site are all green.
                Last incident: 41 days ago.{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:underline dark:text-primary-light"
                >
                  View status page
                </a>
              </p>
            </div>
          </div>
          <Badge variant="success">99.99% uptime</Badge>
        </Card>
      </section>
    </>
  );
}