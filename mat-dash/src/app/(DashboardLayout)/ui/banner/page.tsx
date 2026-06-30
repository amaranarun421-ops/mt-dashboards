"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const BannerPage = () => (
  <PageContainer title="Banner" description="Promotional, alert, and CTA banners for dashboards and pages.">
    <div className="space-y-4">
      <DemoBlock title="Promotional Banners">
        <div className="space-y-3">
          <div className="rounded-xl bg-primary text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon icon="solar:gift-bold-duotone" width={28} />
              <div><h4 className="font-semibold">Refer a friend, get $50</h4><p className="text-sm opacity-90">Both you and your friend earn credits.</p></div>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90">Get Link</Button>
          </div>
          <div className="rounded-xl bg-dark text-white p-5 flex items-center justify-between">
            <div><h4 className="font-semibold">Upgrade to Pro</h4><p className="text-sm opacity-80">Unlock premium features today.</p></div>
            <Button>Upgrade</Button>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title="Alert Banners">
        <div className="space-y-3">
          {[
            { color: "success", icon: "solar:check-circle-bold-duotone", title: "Payment Successful", desc: "Your subscription has been renewed." },
            { color: "warning", icon: "solar:danger-triangle-bold-duotone", title: "Action Required", desc: "Your subscription expires in 3 days." },
            { color: "error", icon: "solar:danger-bold-duotone", title: "Payment Failed", desc: "Please update your payment method." },
            { color: "info", icon: "solar:bell-bing-bold-duotone", title: "New Feature", desc: "AI-powered insights are now available." },
          ].map((b) => (
            <div key={b.title} className={`rounded-xl bg-light${b.color} border border-${b.color}/30 p-4 flex items-start gap-3`}>
              <Icon icon={b.icon} width={24} className={`text-${b.color} shrink-0`} />
              <div className="flex-1"><h4 className={`font-semibold text-${b.color}`}>{b.title}</h4><p className="text-sm opacity-80">{b.desc}</p></div>
              <Button size="sm" variant={b.color as any}>{b.color === "success" ? "View" : b.color === "info" ? "Try" : "Renew"}</Button>
            </div>
          ))}
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default BannerPage;
