"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const HeadlessCheckboxPage = () => {
  const [items, setItems] = useState<string[]>(["apple"]);
  const fruits = ["apple", "banana", "cherry", "date"];
  const toggle = (f: string) => setItems(s => s.includes(f) ? s.filter(x => x !== f) : [...s, f]);

  return (
    <PageContainer title="Headless Checkbox" description="Accessible checkboxes with indeterminate state support.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Checkboxes">
          <div className="space-y-3">
            <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1">Checked by default</Label></div>
            <div className="flex items-center gap-2"><Checkbox id="c2" /><Label htmlFor="c2">Unchecked</Label></div>
            <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3" className="opacity-50">Disabled</Label></div>
            <div className="flex items-center gap-2"><Checkbox id="c4" disabled defaultChecked /><Label htmlFor="c4" className="opacity-50">Disabled + Checked</Label></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Group with Select All">
          <div className="space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-defaultBorder">
              <Checkbox
                checked={fruits.every(f => items.includes(f))}
                onCheckedChange={() => setItems(items.length === fruits.length ? [] : fruits)}
              />
              <Label className="font-medium">Select All</Label>
            </div>
            {fruits.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Checkbox checked={items.includes(f)} onCheckedChange={() => toggle(f)} id={`f-${f}`} />
                <Label htmlFor={`f-${f}`} className="capitalize text-sm">{f}</Label>
              </div>
            ))}
            <p className="text-xs opacity-60 mt-2">{items.length} of {fruits.length} selected</p>
          </div>
        </DemoBlock>

        <DemoBlock title="Card Checkbox" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Basic", "Pro", "Enterprise"].map((plan, i) => (
              <label key={plan} className={`cursor-pointer rounded-xl border p-4 transition-colors ${i === 1 ? "border-primary bg-lightprimary" : "border-defaultBorder hover:border-primary/40"}`}>
                <div className="flex items-center justify-between mb-2">
                  <Checkbox checked={i === 1} />
                  <Icon icon="solar:check-circle-bold" className={i === 1 ? "text-primary" : "text-muted-foreground"} width={20} />
                </div>
                <p className="font-semibold text-sm">{plan}</p>
                <p className="text-xs opacity-70">${[0, 29, 99][i]}/mo</p>
              </label>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessCheckboxPage;
