"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Link from "next/link";

const plans = [
  {
    name: "Starter", price: { monthly: 0, yearly: 0 }, description: "Perfect for trying out mtverse", icon: "solar:rocket-line-duotone", color: "info", popular: false,
    features: ["Up to 3 users","1 project","1GB storage","Community support","Basic analytics"],
  },
  {
    name: "Pro", price: { monthly: 29, yearly: 290 }, description: "For growing teams that need more power", icon: "solar:bolt-line-duotone", color: "primary", popular: true,
    features: ["Up to 10 users","10 projects","50GB storage","Priority support","Advanced analytics","Custom branding","API access"],
  },
  {
    name: "Business", price: { monthly: 99, yearly: 990 }, description: "For teams that need scale & control", icon: "solar:building-line-duotone", color: "secondary", popular: false,
    features: ["Unlimited users","Unlimited projects","500GB storage","24/7 phone support","Custom dashboards","SSO (SAML)","Audit logs","Webhooks"],
  },
  {
    name: "Enterprise", price: { monthly: null, yearly: null }, description: "Custom solutions for large orgs", icon: "solar:shield-check-line-duotone", color: "success", popular: false,
    features: ["Everything in Business","Dedicated server","Unlimited storage","Dedicated CSM","Custom SLAs","On-premise option","White-label","Compliance certifications"],
  },
];

const PricingPage = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <PageContainer
      title="Pricing"
      description="Simple, transparent pricing. Start free, upgrade when you're ready. No hidden fees."
      actions={
        <div className="inline-flex rounded-full bg-lightgray dark:bg-dark p-1">
          <Button size="sm" variant={billing === "monthly" ? "default" : "ghost"} shape="pill" onClick={() => setBilling("monthly")}>Monthly</Button>
          <Button size="sm" variant={billing === "yearly" ? "default" : "ghost"} shape="pill" onClick={() => setBilling("yearly")} className="gap-1.5">Yearly <Badge variant="lightSuccess" className="text-[10px]">-17%</Badge></Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl bg-background p-6 shadow-xs relative ${p.popular ? "ring-2 ring-primary" : "border border-defaultBorder"}`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" className="shadow-md">Most Popular</Badge>
              </div>
            )}
            <div className={`h-12 w-12 rounded-2xl bg-light${p.color} text-${p.color} flex items-center justify-center mb-4`}>
              <Icon icon={p.icon} width={26} />
            </div>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-xs opacity-70 mt-1 min-h-[32px]">{p.description}</p>
            <div className="mt-4">
              {p.price.monthly === null ? (
                <p className="text-3xl font-bold">Custom</p>
              ) : (
                <>
                  <span className="text-3xl font-bold">${billing === "monthly" ? p.price.monthly : p.price.yearly}</span>
                  <span className="text-sm opacity-60">/{billing === "monthly" ? "mo" : "yr"}</span>
                  {billing === "yearly" && p.price.monthly > 0 && (
                    <p className="text-xs text-success mt-1">Save ${(p.price.monthly * 12 - p.price.yearly).toFixed(0)} per year</p>
                  )}
                </>
              )}
            </div>
            <Button
              variant={p.popular ? "default" : "outline"}
              className="w-full mt-5"
              asChild={p.name !== "Enterprise"}
            >
              {p.name === "Enterprise" ? <Link href="/pages/faq">Contact Sales</Link> : <Link href="/auth/register">Get Started</Link>}
            </Button>
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Icon icon="solar:check-circle-bold" className={`text-${p.color} shrink-0 mt-0.5`} width={16} />
                  <span className="opacity-80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="mt-12 rounded-xl bg-background p-6 shadow-xs">
        <h3 className="text-xl font-bold mb-1">Compare All Features</h3>
        <p className="text-sm opacity-70 mb-6">See exactly what each plan includes</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-defaultBorder">
                <th className="py-3 text-left font-semibold">Feature</th>
                <th className="py-3 text-center font-semibold">Starter</th>
                <th className="py-3 text-center font-semibold text-primary">Pro</th>
                <th className="py-3 text-center font-semibold">Business</th>
                <th className="py-3 text-center font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Users", "3", "10", "Unlimited", "Unlimited"],
                ["Projects", "1", "10", "Unlimited", "Unlimited"],
                ["Storage", "1GB", "50GB", "500GB", "Unlimited"],
                ["API Access", "—", "✓", "✓", "✓"],
                ["SSO (SAML)", "—", "—", "✓", "✓"],
                ["Custom Branding", "—", "✓", "✓", "✓"],
                ["Audit Logs", "—", "—", "✓", "✓"],
                ["Dedicated Server", "—", "—", "—", "✓"],
                ["24/7 Phone Support", "—", "—", "✓", "✓"],
                ["On-premise Option", "—", "—", "—", "✓"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-defaultBorder last:border-b-0">
                  <td className="py-3 font-medium">{row[0]}</td>
                  {row.slice(1).map((v, i) => (
                    <td key={i} className={`py-3 text-center ${i === 1 ? "bg-lightprimary/30 font-medium text-primary" : ""}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-primary p-8 text-white text-center">
        <h3 className="text-2xl font-bold">Still have questions?</h3>
        <p className="opacity-90 mt-2 max-w-xl mx-auto">Our team is here to help you find the perfect plan for your needs. Get in touch for a personalized demo.</p>
        <div className="flex gap-3 justify-center mt-5">
          <Button variant="default" className="bg-white text-primary hover:bg-white/90" asChild><Link href="/pages/faq">Read FAQ</Link></Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/30 hover:text-white" asChild><Link href="/pages/faq">Contact Sales</Link></Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PricingPage;
