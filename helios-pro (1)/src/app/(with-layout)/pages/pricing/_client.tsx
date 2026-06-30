"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Accordion } from "@/components/shared/accordion";
import { Tabs } from "@/components/shared/tabs";
import {
  CheckIcon,
  RocketIcon,
  ShieldIcon,
  UsersIcon,
  StarIcon,
  HelpCircleIcon,
  CreditCardIcon,
} from "@/components/Layouts/sidebar/icons";

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  priceLabel?: string;
  highlight?: boolean;
  cta: string;
  features: string[];
  icon: React.ReactNode;
  tone: "primary" | "accent" | "violet";
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo founders and side projects.",
    monthly: 49,
    yearly: 39,
    cta: "Buy Starter",
    icon: <RocketIcon className="size-5" />,
    tone: "primary",
    features: [
      "100+ production pages",
      "25+ reusable components",
      "Light + dark mode",
      "1 developer seat",
      "6 months of updates",
      "Community Discord",
    ],
  },
  {
    name: "Pro",
    tagline: "For small product teams shipping fast.",
    monthly: 149,
    yearly: 119,
    highlight: true,
    cta: "Buy Pro",
    icon: <StarIcon className="size-5" />,
    tone: "accent",
    features: [
      "Everything in Starter",
      "Unlimited projects",
      "5 developer seats",
      "Lifetime updates",
      "Priority email support",
      "Theme customizer source",
      "HeliosChart advanced recipes",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For larger teams with compliance needs.",
    monthly: null,
    yearly: null,
    priceLabel: "Custom",
    cta: "Contact sales",
    icon: <ShieldIcon className="size-5" />,
    tone: "violet",
    features: [
      "Everything in Pro",
      "Unlimited seats",
      "SAML SSO + SCIM",
      "Audit log export",
      "99.99% uptime SLA",
      "Dedicated solution architect",
      "On-premise option",
    ],
  },
];

const comparisonFeatures: { category: string; rows: { label: string; starter: string; pro: string; enterprise: string }[] }[] = [
  {
    category: "Product",
    rows: [
      { label: "Production pages", starter: "100+", pro: "100+", enterprise: "100+" },
      { label: "Reusable components", starter: "25+", pro: "25+", enterprise: "25+" },
      { label: "HeliosChart recipes", starter: "Basic", pro: "Advanced", enterprise: "Advanced + custom" },
      { label: "Theme customizer source", starter: "—", pro: "Yes", enterprise: "Yes" },
    ],
  },
  {
    category: "Licensing",
    rows: [
      { label: "Projects", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
      { label: "Developer seats", starter: "1", pro: "5", enterprise: "Unlimited" },
      { label: "Updates", starter: "6 months", pro: "Lifetime", enterprise: "Lifetime" },
      { label: "Refund window", starter: "14 days", pro: "14 days", enterprise: "14 days" },
    ],
  },
  {
    category: "Support & compliance",
    rows: [
      { label: "Support channel", starter: "Discord", pro: "Priority email", enterprise: "Slack Connect" },
      { label: "SAML SSO + SCIM", starter: "—", pro: "—", enterprise: "Yes" },
      { label: "Audit log export", starter: "—", pro: "—", enterprise: "Yes" },
      { label: "Uptime SLA", starter: "—", pro: "—", enterprise: "99.99%" },
    ],
  },
];

const pricingFaqs = [
  {
    value: "pf1",
    title: "Is there a recurring subscription?",
    content:
      "No. Helios Pro is a one-time purchase. You pay once and keep the version you bought forever. Pro and Enterprise include lifetime updates; Starter includes 6 months of updates.",
  },
  {
    value: "pf2",
    title: "What does lifetime updates mean?",
    content:
      "Every minor and patch release of Helios Pro — v4.2, v4.3, v5.0 and beyond — is yours to download at no extra cost, for as long as the project exists.",
  },
  {
    value: "pf3",
    title: "Can I upgrade from Starter to Pro later?",
    content:
      "Yes. Pay the difference between the two plans within 12 months of your Starter purchase and we will upgrade your license and seat count immediately.",
  },
  {
    value: "pf4",
    title: "Do you charge per-seat fees?",
    content:
      "Starter includes 1 developer seat, Pro includes 5 and Enterprise is unlimited. There are no recurring per-seat fees — the seat count is part of the one-time price.",
  },
  {
    value: "pf5",
    title: "What payment methods do you accept?",
    content:
      "All major credit and debit cards through Stripe. Enterprise customers can also pay by wire transfer, ACH or invoiced billing with NET-30 terms.",
  },
];

const toneAccent: Record<Plan["tone"], string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
};

export default function PricingClient() {
  const [cycle, setCycle] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <PageHeader
        title="Pricing"
        description="One-time purchase. Lifetime updates on Pro and Enterprise. 14-day refund window on every plan."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/pricing" },
          { label: "Pricing" },
        ]}
        actions={
          <Badge variant="success">
            <CreditCardIcon className="size-3.5" /> One-time purchase
          </Badge>
        }
      />

      {/* BILLING CYCLE TOGGLE */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Tabs
          variant="pills"
          value={cycle}
          onChange={(v) => setCycle(v as "monthly" | "yearly")}
          tabs={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
        <p className="text-xs text-dark-5 dark:text-dark-6">
          {cycle === "yearly" ? (
            <>
              <span className="font-semibold text-primary">Save 20%</span> by
              billing yearly — charged once every 12 months.
            </>
          ) : (
            <>Switch to yearly billing to save 20% on every plan.</>
          )}
        </p>
      </div>

      {/* PLAN CARDS */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const price =
            p.priceLabel ??
            (cycle === "monthly"
              ? p.monthly !== null
                ? `$${p.monthly}`
                : "Custom"
              : p.yearly !== null
                ? `$${p.yearly}`
                : "Custom");
          return (
            <Card
              key={p.name}
              hover
              padded={false}
              className={
                p.highlight
                  ? "relative flex flex-col overflow-hidden border-primary/50 ring-1 ring-primary/30 dark:border-primary/40"
                  : "relative flex flex-col overflow-hidden"
              }
            >
              {p.highlight && (
                <div className="bg-gradient-to-r from-primary to-accent px-5 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
                  Most popular
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-xl ${toneAccent[p.tone]}`}>
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-dark dark:text-white">
                      {p.name}
                    </h3>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {p.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-dark dark:text-white">
                    {price}
                  </span>
                  {p.priceLabel ? null : (
                    <span className="mb-1 text-sm text-dark-5 dark:text-dark-6">
                      /seat / mo
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                  {p.priceLabel
                    ? "Billed annually. Custom quotes in 24 hours."
                    : cycle === "yearly"
                      ? "Billed annually — 12 months upfront."
                      : "Billed monthly. Cancel anytime."}
                </p>

                <Button
                  variant={p.highlight ? "primary" : "outline"}
                  className="mt-5 w-full"
                >
                  {p.cta}
                </Button>

                <ul className="mt-6 space-y-2.5">
                  {p.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-dark dark:text-white"
                    >
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </section>

      {/* COMPARISON TABLE */}
      <section className="mt-12">
        <CardHeader
          title="Compare plans"
          subtitle="Every feature, side-by-side."
          className="mb-4"
        />
        <Card padded={false}>
          <div className="helios-scroll overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-5 py-4 text-left font-semibold text-dark dark:text-white">
                    Feature
                  </th>
                  <th className="px-5 py-4 text-center font-semibold text-dark dark:text-white">
                    Starter
                  </th>
                  <th className="bg-primary-subtle/40 px-5 py-4 text-center font-semibold text-primary dark:bg-primary/10 dark:text-primary-light">
                    Pro
                  </th>
                  <th className="px-5 py-4 text-center font-semibold text-dark dark:text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((group) => (
                  <React.Fragment key={group.category}>
                    <tr className="border-b border-stroke bg-gray-2 dark:border-dark-3 dark:bg-white/5">
                      <td
                        colSpan={4}
                        className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-stroke last:border-0 dark:border-dark-3"
                      >
                        <td className="px-5 py-3 text-dark dark:text-white">
                          {row.label}
                        </td>
                        <td className="px-5 py-3 text-center text-dark-5 dark:text-dark-6">
                          {row.starter}
                        </td>
                        <td className="bg-primary-subtle/30 px-5 py-3 text-center font-medium text-dark dark:bg-primary/10 dark:text-white">
                          {row.pro}
                        </td>
                        <td className="px-5 py-3 text-center text-dark-5 dark:text-dark-6">
                          {row.enterprise}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <Badge variant="info">
            <HelpCircleIcon className="size-3.5" /> FAQ
          </Badge>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-dark dark:text-white">
            Pricing questions, answered
          </h3>
          <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
            Still curious? Reach out to{" "}
            <span className="font-medium text-primary">billing@heliospro.io</span>{" "}
            — we usually reply within a few hours.
          </p>
          <Button variant="soft" size="sm" className="mt-5">
            <UsersIcon className="size-4" /> Talk to sales
          </Button>
        </Card>
        <Card className="lg:col-span-2">
          <Accordion items={pricingFaqs} defaultOpen={["pf1"]} />
        </Card>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-white md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Not sure which plan is right for you?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              Book a 20-minute call with the Helios Pro team. We will walk you
              through the kit, answer your questions and recommend a plan.
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0 bg-white text-primary hover:bg-white/90"
          >
            <RocketIcon className="size-4" /> Book a demo
          </Button>
        </div>
      </section>
    </>
  );
}
