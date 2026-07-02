"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/common/status-badge";

const plans = [
  { name: "Starter", monthly: 0, yearly: 0, desc: "Perfect for trying out", features: ["Up to 3 projects", "Community support", "1 GB storage", "Basic analytics"], cta: "Get Started", popular: false },
  { name: "Pro", monthly: 29, yearly: 290, desc: "For growing teams", features: ["Unlimited projects", "Priority support", "50 GB storage", "Advanced analytics", "Custom branding", "API access"], cta: "Start Free Trial", popular: true },
  { name: "Business", monthly: 99, yearly: 990, desc: "For scaling companies", features: ["Everything in Pro", "Dedicated manager", "500 GB storage", "Team collaboration", "SSO & SAML", "Audit logs"], cta: "Start Free Trial", popular: false },
  { name: "Enterprise", monthly: 299, yearly: 2990, desc: "For large organizations", features: ["Everything in Business", "24/7 phone support", "Unlimited storage", "Custom SLAs", "On-premise option", "White-label"], cta: "Contact Sales", popular: false },
];

export function PricingPage() {
  const [yearly, setYearly] = React.useState(false);
  return (
    <div>
      <PageHeader breadcrumb={["Pages", "Pricing"]} title="Pricing Plans" description="Choose the perfect plan for your team. Cancel anytime." />
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className={`text-sm ${!yearly ? "font-bold" : "text-gray-500 dark:text-gray-400"}`}>Monthly</span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span className={`text-sm ${yearly ? "font-bold" : "text-gray-500 dark:text-gray-400"}`}>Yearly</span>
        <StatusBadge variant="success">Save 20%</StatusBadge>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={`relative flex h-full flex-col p-6 ${p.popular ? "border-2 border-brand-500 shadow-lg" : ""}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><StatusBadge variant="primary" className="shadow-md"><Sparkles className="mr-1 h-3 w-3" /> Most Popular</StatusBadge></div>}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">${yearly ? p.yearly : p.monthly}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/{yearly ? "year" : "month"}</span>
              </div>
              <Button className={`mt-4 w-full gap-1.5 ${!p.popular ? "outline" : ""}`} variant={p.popular ? "default" : "outline"}>{p.cta}<ArrowRight className="h-4 w-4" /></Button>
              <div className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success-500/15"><Check className="h-3 w-3 text-success-600 dark:text-success-500" /></div>
                    <span className="text-gray-500 dark:text-gray-400">{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
