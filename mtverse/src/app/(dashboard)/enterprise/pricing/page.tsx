"use client";

import * as React from "react";
import { useState } from "react";
import {
  Check, Sparkles, Building2, Rocket, Zap, Shield, HelpCircle,
  TrendingUp, Users, Database, Cloud, FileText, Headphones, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    icon: Rocket,
    tagline: "For small teams getting started",
    monthly: 29,
    annual: 24,
    color: "border-border",
    accent: "bg-muted text-muted-foreground",
    cta: "Start free trial",
    features: [
      "Up to 5 team members",
      "10 dashboards",
      "7-day data retention",
      "Community support",
      "Basic analytics",
      "1 GB storage",
    ],
  },
  {
    name: "Pro",
    icon: Zap,
    tagline: "For growing businesses",
    monthly: 99,
    annual: 82,
    color: "border-primary/40 ring-2 ring-primary/20",
    accent: "bg-primary text-primary-foreground",
    cta: "Upgrade to Pro",
    popular: true,
    features: [
      "Up to 25 team members",
      "Unlimited dashboards",
      "90-day data retention",
      "Priority email support",
      "Advanced analytics & AI insights",
      "50 GB storage",
      "Custom integrations",
      "API access (10k req/mo)",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    tagline: "For organizations at scale",
    monthly: null as number | null,
    annual: null as number | null,
    color: "border-border",
    accent: "bg-foreground text-background",
    cta: "Contact sales",
    features: [
      "Unlimited team members",
      "Unlimited dashboards",
      "Unlimited data retention",
      "24/7 dedicated support + SLA",
      "Custom AI models",
      "1 TB+ storage",
      "SSO, SAML, SCIM provisioning",
      "Unlimited API access",
      "Audit logs & compliance exports",
      "Dedicated success manager",
    ],
  },
];

const comparisonCategories = [
  {
    name: "Core Features",
    rows: [
      { feature: "Team members", starter: "5", pro: "25", enterprise: "Unlimited" },
      { feature: "Dashboards", starter: "10", pro: "Unlimited", enterprise: "Unlimited" },
      { feature: "Custom branding", starter: false, pro: true, enterprise: true },
      { feature: "White-label option", starter: false, pro: false, enterprise: true },
      { feature: "Data retention", starter: "7 days", pro: "90 days", enterprise: "Unlimited" },
    ],
  },
  {
    name: "Analytics & AI",
    rows: [
      { feature: "Real-time analytics", starter: true, pro: true, enterprise: true },
      { feature: "AI-powered insights", starter: false, pro: true, enterprise: true },
      { feature: "Custom AI models", starter: false, pro: false, enterprise: true },
      { feature: "Predictive forecasting", starter: false, pro: true, enterprise: true },
      { feature: "Anomaly detection", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    name: "Security & Compliance",
    rows: [
      { feature: "Two-factor authentication", starter: true, pro: true, enterprise: true },
      { feature: "SSO / SAML", starter: false, pro: false, enterprise: true },
      { feature: "SCIM provisioning", starter: false, pro: false, enterprise: true },
      { feature: "Audit logs", starter: false, pro: true, enterprise: true },
      { feature: "SOC 2 Type II report", starter: false, pro: false, enterprise: true },
      { feature: "Custom DPA", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    name: "Support",
    rows: [
      { feature: "Community forum", starter: true, pro: true, enterprise: true },
      { feature: "Email support", starter: "Best effort", pro: "Priority", enterprise: "24/7" },
      { feature: "Response time SLA", starter: "—", pro: "8 hours", enterprise: "1 hour" },
      { feature: "Dedicated CSM", starter: false, pro: false, enterprise: true },
      { feature: "Onboarding sessions", starter: false, pro: "1 session", enterprise: "Unlimited" },
    ],
  },
];

const faqs = [
  { q: "Can I change plans at any time?", a: "Yes — you can upgrade or downgrade your plan at any time from your billing settings. Upgrades take effect immediately and we prorate the difference. Downgrades take effect at the end of your current billing cycle." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), ACH transfers for annual plans, and wire transfers for Enterprise customers. Invoicing is available for plans billed annually over $1,200." },
  { q: "Is there a free trial?", a: "Yes — every paid plan includes a 14-day free trial with no credit card required. You'll have full access to all features during the trial so you can evaluate before committing." },
  { q: "What happens when I hit my plan limits?", a: "We'll notify you when you reach 80% of any limit. If you exceed your limits, we won't cut off service — instead we'll reach out to help you upgrade. Enterprise customers have soft limits that scale automatically." },
  { q: "Do you offer discounts for non-profits or education?", a: "Yes, we offer 40% off all paid plans for registered non-profits, educational institutions, and accredited bootcamps. Reach out to our sales team with your documentation to apply." },
  { q: "How is my data secured?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're SOC 2 Type II certified and GDPR compliant. Enterprise plans include additional controls like customer-managed encryption keys and private network deployment options." },
  { q: "Can I cancel my subscription?", a: "Yes — you can cancel at any time from your billing settings. You'll retain access until the end of your current billing period, and you can export all your data before your account is deactivated." },
  { q: "Do you offer custom Enterprise pricing?", a: "Absolutely. Enterprise pricing is tailored to your organization's needs based on seats, storage, custom AI usage, and support requirements. Contact our sales team for a personalized quote." },
];

const stats = [
  { icon: Users, label: "Active customers", value: "12,400+" },
  { icon: TrendingUp, label: "Avg ROI", value: "312%" },
  { icon: Shield, label: "Uptime SLA", value: "99.99%" },
  { icon: Headphones, label: "Avg support time", value: "< 2 hrs" },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="size-4 text-success mx-auto" />;
  if (v === false) return <span className="text-muted-foreground/40">—</span>;
  return <span className="text-sm font-medium">{v}</span>;
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pricing"
        description="Simple, transparent pricing that scales with your team. No hidden fees, cancel anytime."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Pricing" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9">
            <FileText className="size-4 mr-2" /> Compare plans (PDF)
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <s.icon className="size-4" />
              <span className="text-xs">{s.label}</span>
            </div>
            <p className="text-xl font-bold tracking-tight">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${billing === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <Switch
            checked={billing === "annual"}
            onCheckedChange={(c) => setBilling(c ? "annual" : "monthly")}
            aria-label="Toggle billing cycle"
          />
          <span className={`text-sm font-medium ${billing === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
          </span>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">Save 20%</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const price = billing === "annual" ? plan.annual : plan.monthly;
          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col p-6 ${plan.color} ${plan.popular ? "shadow-premium" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Sparkles className="size-3" /> Most popular
                </Badge>
              )}
              <div className="flex items-center gap-3 mb-1">
                <div className={`flex size-10 items-center justify-center rounded-xl ${plan.accent}`}>
                  <plan.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                </div>
              </div>

              <div className="py-5">
                {price === null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">Custom</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">${price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                    {billing === "annual" && (
                      <span className="text-xs text-muted-foreground ml-1">billed yearly</span>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {price === null
                    ? "Tailored to your organization"
                    : billing === "annual"
                    ? `$${price * 12}/year per user`
                    : "Per user, billed monthly"}
                </p>
              </div>

              <Button
                className={`w-full mb-6 ${plan.popular ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => toast.success(`${plan.name} plan selected`, { description: "Redirecting to checkout..." })}
              >
                {plan.cta} <ArrowRight className="size-4 ml-1" />
              </Button>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Database, title: "No data lock-in", desc: "Export all your data anytime in CSV, JSON, or via API. Your data is always yours." },
          { icon: Cloud, title: "Migrate from anywhere", desc: "Free white-glove migration from Looker, Tableau, Power BI, or any custom solution." },
          { icon: Shield, title: "Enterprise-grade security", desc: "SOC 2 Type II, GDPR, HIPAA-ready. Your data is encrypted at rest and in transit." },
        ].map((b) => (
          <Card key={b.title} className="p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
              <b.icon className="size-5" />
            </div>
            <h4 className="text-sm font-semibold mb-1">{b.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
          </Card>
        ))}
      </div>

      <SectionCard title="Compare all features" description="A detailed breakdown of what's included in each plan" noBodyPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left font-medium text-muted-foreground p-4 sticky left-0 bg-muted/30 min-w-[200px]">Feature</th>
                <th className="text-center font-semibold p-4 min-w-[120px]">Starter</th>
                <th className="text-center font-semibold p-4 min-w-[120px] bg-primary/5">Pro</th>
                <th className="text-center font-semibold p-4 min-w-[120px]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((cat) => (
                <React.Fragment key={cat.name}>
                  <tr className="border-b">
                    <td colSpan={4} className="bg-muted/20 p-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {cat.name}
                    </td>
                  </tr>
                  {cat.rows.map((row, i) => (
                    <tr key={i} className="border-b last:border-b-0 hover:bg-accent/30">
                      <td className="p-4 text-sm font-medium sticky left-0 bg-background">{row.feature}</td>
                      <td className="p-4 text-center"><Cell v={row.starter} /></td>
                      <td className="p-4 text-center bg-primary/5"><Cell v={row.pro} /></td>
                      <td className="p-4 text-center"><Cell v={row.enterprise} /></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Frequently asked questions" description="Everything you need to know about our pricing and plans">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <HelpCircle className="size-4 text-muted-foreground" />
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold">Still have questions?</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Our team is here to help you find the right plan for your team.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info("Opening live chat...")}>
              <Headphones className="size-4 mr-2" /> Live chat
            </Button>
            <Button size="sm" onClick={() => toast.success("Sales team will reach out within 1 business day")}>
              Contact sales
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
