"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const HeadlessInputPage = () => {
  const [val, setVal] = useState("");
  return (
    <PageContainer title="Headless Input" description="Text inputs with variants, icons, and validation states.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Input">
          <div className="space-y-3">
            <div><Label>Default</Label><Input className="mt-1.5" placeholder="Enter text..." /></div>
            <div><Label>With Value</Label><Input className="mt-1.5" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type..." /></div>
            <p className="text-xs opacity-60">Value: {val || "(empty)"}</p>
          </div>
        </DemoBlock>

        <DemoBlock title="Input Types">
          <div className="space-y-3">
            <div><Label>Email</Label><Input type="email" className="mt-1.5" placeholder="you@example.com" /></div>
            <div><Label>Password</Label><Input type="password" className="mt-1.5" placeholder="••••••" /></div>
            <div><Label>Number</Label><Input type="number" className="mt-1.5" placeholder="0" /></div>
            <div><Label>Date</Label><Input type="date" className="mt-1.5" /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="With Icons">
          <div className="space-y-3">
            <div className="relative"><Icon icon="solar:letter-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" /><Input type="email" placeholder="Email" className="pl-9" /></div>
            <div className="relative"><Icon icon="solar:lock-password-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" /><Input type="password" placeholder="Password" className="pl-9" /></div>
            <div className="relative"><Icon icon="solar:dollar-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" /><Input type="number" placeholder="0.00" className="pl-9" /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Validation States">
          <div className="space-y-3">
            <div><Label className="text-success">Valid</Label><Input className="mt-1.5 border-success" defaultValue="john@example.com" /></div>
            <div><Label className="text-error">Error</Label><Input className="mt-1.5 border-error" defaultValue="invalid" /></div>
            <div><Label className="text-warning">Warning</Label><Input className="mt-1.5 border-warning" placeholder="Check value" /></div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessInputPage;
