"use client";
import { Card, Badge, Button, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Building2, Heart, Compass, Sparkles, Users, ArrowRight,
  Rocket, Trophy, Leaf, Shield
} from "lucide-react";

const TIMELINE = [
  { year: "2021", title: "The first commit", desc: "Nimbus started as a side project to scratch our own itch — dashboards were too slow to build.", tone: "brand" },
  { year: "2022", title: "Open-sourced v1", desc: "We released the first 30 pages as an open-source kit. The community response was immediate.", tone: "purple" },
  { year: "2023", title: "Pro tier launched", desc: "Premium pages, theme customizer, and priority support. Quit-our-dayjobs moment.", tone: "warning" },
  { year: "2024", title: "Nimbus Pro v2", desc: "Rewritten on Next.js 14 with strict TypeScript and a new emerald design system.", tone: "pink" },
  { year: "2026", title: "Nimbus Pro v3", desc: "100+ pages, 240+ components, and 11 categories. The most polished release yet.", tone: "success" },
] as const;

const VALUES = [
  { icon: Heart, title: "Craft over speed", desc: "We ship fewer features, polished to a shine. Every component gets the attention it deserves.", tone: "brand" },
  { icon: Compass, title: "Customer-obsessed", desc: "Every roadmap decision starts with a real user problem. Support tickets shape what we build.", tone: "purple" },
  { icon: Shield, title: "Privacy first", desc: "No dark patterns, no resold data. Your workspace belongs to you, full stop.", tone: "warning" },
  { icon: Leaf, title: "Sustainable pace", desc: "Burnout is a bug, not a feature. We are in this for the long haul.", tone: "success" },
] as const;

const TEAM = [
  { name: "Aaroh Sharma", role: "Founder & Engineering", location: "Bengaluru, IN" },
  { name: "Sofia García", role: "Head of Design", location: "Barcelona, ES" },
  { name: "Yuki Tanaka", role: "Product Lead", location: "Tokyo, JP" },
  { name: "Leo Romano", role: "Developer Advocate", location: "Rome, IT" },
  { name: "Mira Patel", role: "Frontend Engineer", location: "Mumbai, IN" },
  { name: "Dmitri Volkov", role: "Backend Engineer", location: "Berlin, DE" },
  { name: "Fatima Al-Rashid", role: "Customer Success", location: "Dubai, AE" },
  { name: "Marcus Chen", role: "DevOps Engineer", location: "Singapore, SG" },
];

const STATS = [
  { label: "Active builders", value: "18,400+", icon: Users },
  { label: "GitHub stars", value: "9.2k", icon: Sparkles },
  { label: "Years in business", value: "5", icon: Rocket },
  { label: "Awards won", value: "12", icon: Trophy },
];

const TONE: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
};

const DOT: Record<string, string> = {
  brand: "bg-brand-500",
  purple: "bg-purple-500",
  warning: "bg-warning-500",
  pink: "bg-pink-500",
  success: "bg-success-500",
};

export default function AboutPage() {
  return (
    <div className="space-y-20">
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900 sm:px-12 lg:px-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/20" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge tone="brand" variant="soft" className="mb-5">
            <Building2 className="h-3 w-3" /> Our story
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            We build the tools we <span className="gradient-text">wish we had</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Nimbus Pro started as a side project in 2021. Today it powers dashboards for thousands
            of teams across 60+ countries — and we&apos;re just getting started.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg"><ArrowRight className="h-4 w-4" /> Join the journey</Button>
            <Button variant="secondary" size="lg">Open positions</Button>
          </div>
        </div>
      </section>

      {/* ============ Stats strip ============ */}
      <section>
        <Card className="grid grid-cols-2 gap-6 p-8 lg:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              </div>
            );
          })}
        </Card>
      </section>

      {/* ============ Story timeline ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our journey so far
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Five years, three major versions, and a community we are proud of.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-800 sm:left-1/2" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={cn(
                    "relative flex items-start gap-6",
                    i % 2 === 0 ? "sm:flex-row-reverse sm:text-right" : "sm:flex-row"
                  )}
                >
                  <div className="hidden flex-1 sm:block" />
                  <div className="absolute left-4 top-1 -translate-x-1/2 sm:left-1/2">
                    <span className={cn("block h-3 w-3 rounded-full ring-4 ring-white dark:ring-gray-900", DOT[t.tone])} />
                  </div>
                  <div className="flex-1 pl-10 sm:pl-0">
                    <Card hover className="p-5">
                      <Badge tone={t.tone as "brand" | "purple" | "warning" | "pink" | "success"} variant="soft">
                        {t.year}
                      </Badge>
                      <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">{t.title}</h3>
                      <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{t.desc}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Values grid ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            What we believe in
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            The principles behind every decision we make.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title} hover className="p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", TONE[v.tone])}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ============ Team grid ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Meet the team
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Eight humans (and one office cat) building Nimbus Pro from across the globe.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Card key={m.name} hover className="flex flex-col items-center p-6 text-center">
              <Avatar name={m.name} size={72} />
              <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">{m.name}</p>
              <p className="mt-0.5 text-xs font-medium text-brand-600 dark:text-brand-400">{m.role}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{m.location}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
