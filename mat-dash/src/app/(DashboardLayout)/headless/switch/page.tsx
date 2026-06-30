"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const HeadlessSwitchPage = () => {
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(false);

  return (
    <PageContainer title="Headless Switch" description="Toggle switches with accessible on/off states.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Switch">
          <div className="space-y-4">
            <div className="flex items-center justify-between"><Label>Default</Label><Switch /></div>
            <div className="flex items-center justify-between"><Label>Checked</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label className="opacity-50">Disabled</Label><Switch disabled /></div>
            <div className="flex items-center justify-between"><Label className="opacity-50">Disabled + Checked</Label><Switch disabled defaultChecked /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="With Labels">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-defaultBorder">
              <div><p className="text-sm font-medium">Email Notifications</p><p className="text-xs opacity-60">Receive emails about activity</p></div>
              <Switch checked={s1} onCheckedChange={setS1} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-defaultBorder">
              <div><p className="text-sm font-medium">Push Notifications</p><p className="text-xs opacity-60">Get push alerts on devices</p></div>
              <Switch checked={s2} onCheckedChange={setS2} />
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Settings List" className="lg:col-span-2">
          <div className="divide-y divide-defaultBorder">
            {[
              { label: "Auto-save drafts", desc: "Save changes automatically", on: true },
              { label: "Two-factor auth", desc: "Require 2FA on login", on: true },
              { label: "Weekly digest", desc: "Summary every Monday", on: false },
              { label: "Marketing emails", desc: "Product updates and news", on: false },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div><p className="text-sm font-medium">{s.label}</p><p className="text-xs opacity-60">{s.desc}</p></div>
                <Switch key={i} defaultChecked={s.on} />
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessSwitchPage;
