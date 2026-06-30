"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const BadgePage = () => {
  const variants = [
    "primary","secondary","success","warning","info","error","gray",
  ] as const;

  return (
    <PageContainer
      title="Badge"
      description="Small status descriptors for UI elements. 14+ variants including solid, outline, light, and dot styles."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Solid Badges">
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <Badge key={v} variant={v as any} className="uppercase">{v}</Badge>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Light / Soft Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="lightPrimary">Primary</Badge>
            <Badge variant="lightSecondary">Secondary</Badge>
            <Badge variant="lightSuccess">Success</Badge>
            <Badge variant="lightWarning">Warning</Badge>
            <Badge variant="lightInfo">Info</Badge>
            <Badge variant="lightError">Error</Badge>
          </div>
        </DemoBlock>

        <DemoBlock title="Outline Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline">Primary</Badge>
            <Badge variant="outlineSecondary">Secondary</Badge>
            <Badge variant="outlineSuccess">Success</Badge>
            <Badge variant="outlineWarning">Warning</Badge>
            <Badge variant="outlineError">Error</Badge>
            <Badge variant="outlineInfo">Info</Badge>
          </div>
        </DemoBlock>

        <DemoBlock title="With Icons">
          <div className="flex flex-wrap gap-3">
            <Badge variant="lightSuccess" className="gap-1"><Icon icon="solar:check-circle-bold" width={14} /> Verified</Badge>
            <Badge variant="lightError" className="gap-1"><Icon icon="solar:close-circle-bold" width={14} /> Rejected</Badge>
            <Badge variant="lightWarning" className="gap-1"><Icon icon="solar:clock-circle-bold" width={14} /> Pending</Badge>
            <Badge variant="lightInfo" className="gap-1"><Icon icon="solar:info-circle-bold" width={14} /> Info</Badge>
            <Badge variant="primary" className="gap-1"><Icon icon="solar:fire-bold" width={14} /> Hot</Badge>
          </div>
        </DemoBlock>

        <DemoBlock title="Status Dot">
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Online", color: "bg-success" },
              { label: "Away", color: "bg-warning" },
              { label: "Busy", color: "bg-error" },
              { label: "Offline", color: "bg-gray-400" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`relative flex h-2.5 w-2.5`}>
                  <span className={`absolute inline-flex h-full w-full rounded-full ${s.color} opacity-60 animate-ping`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${s.color}`} />
                </span>
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Counter Badges" description="Useful for notifications & counts">
          <div className="flex flex-wrap gap-6">
            <div className="relative inline-block">
              <Icon icon="solar:bell-bing-bold-duotone" width={32} />
              <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">8</span>
            </div>
            <div className="relative inline-block">
              <Icon icon="solar:letter-unread-bold-duotone" width={32} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">24</span>
            </div>
            <div className="relative inline-block">
              <Icon icon="solar:cart-large-2-bold-duotone" width={32} />
              <span className="absolute -top-1 -right-1 bg-success text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">3</span>
            </div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default BadgePage;
