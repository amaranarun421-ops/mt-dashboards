"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const HeadlessRadioGroupPage = () => {
  const [plan, setPlan] = useState("pro");

  return (
    <PageContainer title="Headless Radio Group" description="Single-select option groups with keyboard navigation.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Radio Group">
          <RadioGroup defaultValue="medium">
            <div className="flex items-center gap-2"><RadioGroupItem value="small" id="r1" /><Label htmlFor="r1">Small</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="medium" id="r2" /><Label htmlFor="r2">Medium</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="large" id="r3" /><Label htmlFor="r3">Large</Label></div>
          </RadioGroup>
        </DemoBlock>

        <DemoBlock title="Card Radio Group">
          <RadioGroup value={plan} onValueChange={setPlan}>
            <div className="space-y-2">
              {[
                { id: "starter", label: "Starter", price: "$0/mo", icon: "solar:rocket-bold-duotone" },
                { id: "pro", label: "Pro", price: "$29/mo", icon: "solar:bolt-bold-duotone" },
                { id: "enterprise", label: "Enterprise", price: "Custom", icon: "solar:shield-check-bold-duotone" },
              ].map((p) => (
                <label key={p.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${plan === p.id ? "border-primary bg-lightprimary" : "border-defaultBorder hover:border-primary/40"}`}>
                  <RadioGroupItem value={p.id} />
                  <Icon icon={p.icon} width={20} className="text-primary" />
                  <div className="flex-1"><p className="text-sm font-medium">{p.label}</p><p className="text-xs opacity-60">{p.price}</p></div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </DemoBlock>

        <DemoBlock title="Horizontal Radio" className="lg:col-span-2">
          <RadioGroup defaultValue="monthly" className="flex gap-4">
            <div className="flex items-center gap-2"><RadioGroupItem value="monthly" id="m" /><Label htmlFor="m">Monthly</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="quarterly" id="q" /><Label htmlFor="q">Quarterly</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="yearly" id="y" /><Label htmlFor="y">Yearly (Save 20%)</Label></div>
          </RadioGroup>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessRadioGroupPage;
