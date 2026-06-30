"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Link from "next/link";

const SidebarPage = () => (
  <PageContainer title="Sidebar" description="Navigation sidebar variants — light, dark, collapsed, and mini.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Light Sidebar">
        <div className="w-56 bg-background border border-defaultBorder rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 px-2 py-3 border-b border-defaultBorder mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">m</div>
            <span className="font-bold">mtverse</span>
          </div>
          {["Dashboard", "Analytics", "Users", "Settings"].map((l, i) => (
            <Link key={l} href="#" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${i === 0 ? "bg-lightprimary text-primary font-medium" : "hover:bg-lightgray dark:hover:bg-dark"}`}>
              <Icon icon={["solar:widget-bold", "solar:chart-bold", "solar:users-group-rounded-bold", "solar:settings-bold"][i]} width={16} /> {l}
            </Link>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Dark Sidebar">
        <div className="w-56 bg-dark text-white rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 px-2 py-3 border-b border-white/10 mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold">m</div>
            <span className="font-bold">mtverse</span>
          </div>
          {["Dashboard", "Analytics", "Users", "Settings"].map((l, i) => (
            <Link key={l} href="#" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${i === 0 ? "bg-primary text-white" : "hover:bg-white/10"}`}>
              <Icon icon={["solar:widget-bold", "solar:chart-bold", "solar:users-group-rounded-bold", "solar:settings-bold"][i]} width={16} /> {l}
            </Link>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Mini Sidebar (Icon-only)">
        <div className="w-16 bg-background border border-defaultBorder rounded-lg p-2 space-y-2 flex flex-col items-center">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold mb-2">m</div>
          {["solar:widget-bold", "solar:chart-bold", "solar:users-group-rounded-bold", "solar:cart-bold", "solar:settings-bold"].map((i, idx) => (
            <button key={i} className={`h-9 w-9 rounded-md flex items-center justify-center ${idx === 0 ? "bg-lightprimary text-primary" : "hover:bg-lightgray dark:hover:bg-dark"}`}>
              <Icon icon={i} width={18} />
            </button>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="With Badges">
        <div className="w-56 bg-background border border-defaultBorder rounded-lg p-3 space-y-1">
          {["Inbox", "Sent", "Drafts", "Spam"].map((l, i) => (
            <Link key={l} href="#" className="flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-lightgray dark:hover:bg-dark">
              <span className="flex items-center gap-2"><Icon icon={["solar:inbox-bold", "solar:letter-sent-bold", "solar:document-add-bold", "solar:danger-triangle-bold"][i]} width={16} /> {l}</span>
              <Badge variant={[0,2,3].includes(i) ? "lightPrimary" : i === 3 ? "error" : "lightWarning"} className="text-[10px]">{[12, 0, 3, 42][i]}</Badge>
            </Link>
          ))}
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default SidebarPage;
