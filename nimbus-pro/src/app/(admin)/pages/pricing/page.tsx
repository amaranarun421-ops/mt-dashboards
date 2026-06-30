"use client";
import { useState } from "react";
import { Card, Badge, Button, Switch } from "@/components/ui";
import { PRICING_PLANS, FAQ } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Check, X, Sparkles, ArrowRight, Building2 } from "lucide-react";

const COMPARISON = [
  { feature: "Projects", personal: "1", pro: "Unlimited", agency: "Unlimited" },
  { feature: "Premium pages", personal: "20+", pro: "100+", agency: "100+" },
  { feature: "Theme customizer", personal: false, pro: true, agency: true },
  { feature: "Dark & RTL support", personal: true, pro: true, agency: true },
  { feature: "Lifetime updates", personal: false, pro: true, agency: true },
  { feature: "Priority support", personal: false, pro: true, agency: true },
  { feature: "White-label license", personal: false, pro: false, agency: true },
  { feature: "Dedicated Slack", personal: false, pro: false, agency: true },
  { feature: "Custom design tokens", personal: false, pro: false, agency: true },
] as const;

type Cell = string | boolean;

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-success-500" />;
  if (value === false) return <X className="mx-auto h-4 w-4 text-gray-300 dark:text-gray-600" />;
  return <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</span>;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-16">
      {/* ============ Hero + Toggle ============ */}
      <section className="text-center">
        <Badge tone="brand" variant="soft" className="mb-4">
          <Sparkles className="h-3 w-3" /> Simple pricing
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Pricing that scales with you
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
          Start free, upgrade when you ship. No hidden fees, cancel anytime.
        </p>
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1.5 dark:border-gray-800 dark:bg-gray-900">
          <span
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              !yearly ? "bg-brand-500 text-white" : "text-gray-500 dark:text-gray-400"
            )}
          >
            Monthly
          </span>
          <Switch checked={yearly} onChange={setYearly} />
          <span
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              yearly ? "bg-brand-500 text-white" : "text-gray-500 dark:text-gray-400"
            )}
          >
            Yearly
          </span>
          <Badge tone="success" variant="soft">Save 20%</Badge>
        </div>
      </section>

      {/* ============ Pricing cards ============ */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          const suffix = yearly ? "/year" : "/month";
          return (
            <Card
              key={p.name}
              className={cn(
                "relative flex h-full flex-col p-7",
                p.highlighted
                  ? "border-brand-500 ring-2 ring-brand-500/20 shadow-theme-lg"
                  : ""
              )}
            >
              {p.highlighted && (
                <Badge tone="brand" variant="solid" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Sparkles className="h-3 w-3" /> Most popular
                </Badge>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ${price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{suffix}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlighted ? "primary" : "outline"}
                className="mt-7 w-full"
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          );
        })}
      </section>

      {/* ============ Comparison table ============ */}
      <section>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Compare plans
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Every plan includes core components, dark mode, and TypeScript source.
          </p>
        </div>
        <Card className="overflow-hidden p-0">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-center">Personal</th>
                  <th className="text-center">
                    <span className="inline-flex items-center gap-1.5">
                      Pro <Badge tone="brand" variant="soft">Popular</Badge>
                    </span>
                  </th>
                  <th className="text-center">Agency</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="text-center"><CellValue value={row.personal as Cell} /></td>
                    <td className="text-center"><CellValue value={row.pro as Cell} /></td>
                    <td className="text-center"><CellValue value={row.agency as Cell} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ============ FAQ ============ */}
      <section>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pricing FAQ
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Quick answers about plans, billing, and licenses.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {FAQ.map((item, i) => {
              const open = openIdx === i;
              return (
                <Card key={i} className="overflow-hidden p-0">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-transform dark:bg-gray-800 dark:text-gray-400",
                        open && "rotate-45 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                      )}
                    >
                      +
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                      {item.a}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Enterprise CTA ============ */}
      <section>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white dark:from-gray-950 dark:to-gray-900 lg:p-12">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Need an enterprise plan?</h2>
                <p className="mt-2 max-w-xl text-sm text-gray-300">
                  Custom contracts, on-premise licensing, SSO/SAML, and a dedicated solutions engineer.
                  We will design a plan around your team.
                </p>
              </div>
            </div>
            <Button size="lg" className="shrink-0">
              Talk to sales <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
