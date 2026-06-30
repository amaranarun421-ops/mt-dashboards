"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Link from "next/link";

const FrontPricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    { name: "Starter", price: { m: 0, y: 0 }, desc: "Perfect for trying out mtverse", icon: "solar:rocket-line-duotone", color: "info", features: ["Up to 3 users", "1 project", "1GB storage", "Community support", "Basic analytics"], popular: false },
    { name: "Pro", price: { m: 29, y: 290 }, desc: "For growing teams that need more power", icon: "solar:bolt-line-duotone", color: "primary", features: ["Up to 10 users", "10 projects", "50GB storage", "Priority support", "Advanced analytics", "Custom branding", "API access"], popular: true },
    { name: "Business", price: { m: 99, y: 990 }, desc: "For teams that need scale & control", icon: "solar:building-line-duotone", color: "secondary", features: ["Unlimited users", "Unlimited projects", "500GB storage", "24/7 phone support", "SSO (SAML)", "Audit logs", "Webhooks"], popular: false },
    { name: "Enterprise", price: null, desc: "Custom solutions for large orgs", icon: "solar:shield-check-line-duotone", color: "success", features: ["Everything in Business", "Dedicated server", "Unlimited storage", "Dedicated CSM", "Custom SLAs", "On-premise option"], popular: false },
  ];

  return (
    <PageContainer title="Pricing" description="Simple, transparent pricing for every team. No hidden fees.">
      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-full bg-lightgray dark:bg-dark p-1">
          <Button size="sm" variant={billing === "monthly" ? "default" : "ghost"} shape="pill" onClick={() => setBilling("monthly")}>Monthly</Button>
          <Button size="sm" variant={billing === "yearly" ? "default" : "ghost"} shape="pill" onClick={() => setBilling("yearly")} className="gap-1.5">Yearly <Badge variant="lightSuccess" className="text-[10px]">Save 17%</Badge></Button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-xl bg-background border p-6 relative flex flex-col ${p.popular ? "border-primary ring-2 ring-primary" : "border-defaultBorder"}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>Most Popular</Badge>
              </div>
            )}
            <div className={`h-12 w-12 rounded-xl bg-light${p.color} text-${p.color} flex items-center justify-center mb-4`}>
              <Icon icon={p.icon} width={26} />
            </div>
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4 min-h-[32px]">{p.desc}</p>
            <div className="mb-4">
              {p.price ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${billing === "monthly" ? p.price.m : p.price.y}</span>
                  <span className="text-sm text-muted-foreground">/{billing === "monthly" ? "mo" : "yr"}</span>
                </div>
              ) : (
                <span className="text-3xl font-bold">Custom</span>
              )}
              {billing === "yearly" && p.price && p.price.m > 0 && (
                <p className="text-xs text-success mt-1">Save ${(p.price.m * 12 - p.price.y).toFixed(0)} per year</p>
              )}
            </div>
            <Button className="w-full mb-6" variant={p.popular ? "default" : "outline"} asChild>
              <Link href="/auth/register">{p.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Link>
            </Button>
            <ul className="space-y-2.5 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Icon icon="solar:check-circle-bold" className={`text-${p.color} shrink-0 mt-0.5`} width={16} />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison CTA */}
      <div className="mt-12 rounded-2xl bg-dark text-white p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Not sure which plan is right for you?</h3>
        <p className="opacity-80 mb-5">Compare all features side by side or talk to our team.</p>
        <div className="flex gap-3 justify-center">
          <Button className="bg-white text-dark hover:bg-white/90">Compare Plans</Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">Contact Sales</Button>
        </div>
      </div>

      {/* FAQ teaser */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { q: "Can I change plans later?", a: "Yes! Upgrade or downgrade anytime.", icon: "solar:question-circle-bold-duotone" },
          { q: "Is there a free trial?", a: "14-day free trial on all paid plans.", icon: "solar:gift-bold-duotone" },
          { q: "Do you offer refunds?", a: "30-day money-back guarantee.", icon: "solar:undo-left-round-bold-duotone" },
        ].map((f) => (
          <div key={f.q} className="rounded-xl bg-background border border-defaultBorder p-5 flex items-start gap-3">
            <Icon icon={f.icon} width={24} className="text-primary shrink-0" />
            <div><p className="font-semibold text-sm">{f.q}</p><p className="text-xs text-muted-foreground mt-1">{f.a}</p></div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default FrontPricing;
