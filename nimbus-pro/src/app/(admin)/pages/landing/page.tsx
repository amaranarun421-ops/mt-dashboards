"use client";
import { Card, Badge, Button, Avatar, AvatarGroup } from "@/components/ui";
import { PRICING_PLANS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Sparkles, ArrowRight, Check, Zap, Shield, Layers, BarChart3, Globe, Palette,
  Star, Quote, PlayCircle
} from "lucide-react";

const FEATURES = [
  { icon: Layers, title: "100+ Premium Pages", desc: "Eleven categories covering dashboards, apps, ecommerce, forms, and more.", tone: "brand" },
  { icon: Zap, title: "Blazing Performance", desc: "Next.js 16 + React 19 + Tailwind 4. Sub-second LCP on every route.", tone: "warning" },
  { icon: Palette, title: "Theme Customizer", desc: "5 curated palettes, dark mode, and density controls baked in.", tone: "purple" },
  { icon: Shield, title: "Production Secure", desc: "Strict TypeScript, accessible components, and CSP-friendly markup.", tone: "success" },
  { icon: BarChart3, title: "Rich Charts", desc: "ApexCharts-powered dashboards ready to wire to your data.", tone: "pink" },
  { icon: Globe, title: "RTL & i18n Ready", desc: "Full RTL support and a translation-friendly component layer.", tone: "orange" },
] as const;

const STATS = [
  { label: "Active builders", value: "18,400+" },
  { label: "GitHub stars", value: "9.2k" },
  { label: "Avg. rating", value: "4.9/5" },
  { label: "Components", value: "240+" },
];

const TESTIMONIALS = [
  { name: "Aaroh Sharma", role: "Engineering Lead, Northwind", quote: "Nimbus Pro cut our dashboard sprint from 6 weeks to 4 days. The component API is genuinely thoughtful." },
  { name: "Sofia García", role: "Product Designer, Lumen", quote: "Finally a kit where dark mode isn't an afterthought. Tokens just work, every screen." },
  { name: "Yuki Tanaka", role: "Founder, Kotori", quote: "We shipped our SaaS MVP in two weekends. Nimbus Pro paid for itself in the first hour." },
];

const TONE_ICON: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
};

export default function LandingPage() {
  return (
    <div className="space-y-20">
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-16 dark:border-gray-800 dark:bg-gray-900 sm:px-12 lg:px-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/20" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/20" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge tone="brand" variant="soft" className="mb-5">
            <Sparkles className="h-3 w-3" /> Nimbus Pro v3.0 — now live
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Build delightful products <span className="gradient-text">10× faster</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            The premium Next.js 16 admin kit with 100+ pages, 240+ components, and a design system
            your team will actually enjoy using.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Get Nimbus Pro <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <PlayCircle className="h-4 w-4" /> Live preview
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Lifetime license · Six months support · Free updates within v3
          </p>
        </div>
      </section>

      {/* ============ Features ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Everything you need to ship
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            From solo builders to enterprise teams — Nimbus Pro scales with you.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} hover className="h-full p-6">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", TONE_ICON[f.tone])}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ============ Stats strip ============ */}
      <section>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-white">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-white/85">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ============ Testimonial ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Loved by builders worldwide
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Join thousands of teams shipping faster with Nimbus Pro.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="flex h-full flex-col p-6">
              <Quote className="h-8 w-8 text-brand-500/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                <Avatar name={t.name} size={40} />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ Pricing preview ============ */}
      <section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Start free. Upgrade when you ship. Lifetime updates included.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRICING_PLANS.map((p) => (
            <Card
              key={p.name}
              className={cn(
                "relative flex h-full flex-col p-6",
                p.highlighted && "border-brand-500 ring-2 ring-brand-500/20"
              )}
            >
              {p.highlighted && (
                <Badge tone="brand" variant="solid" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most popular
                </Badge>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ${p.monthly}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlighted ? "primary" : "outline"}
                className="mt-6 w-full"
              >
                {p.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section>
        <Card className="relative overflow-hidden border-0 bg-gray-900 p-10 text-center dark:bg-gray-950 lg:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-30 gradient-bg" />
          <div className="relative mx-auto max-w-2xl">
            <AvatarGroup
              users={TESTIMONIALS.map((t) => ({ name: t.name }))}
              size={44}
              max={3}
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build something delightful?
            </h2>
            <p className="mt-3 text-gray-300">
              Get Nimbus Pro today and ship your next dashboard by the weekend.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Buy now — $49 <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Star className="h-4 w-4" /> View on GitHub
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
