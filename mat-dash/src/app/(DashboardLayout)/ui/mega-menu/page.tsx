"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

const MegaMenuPage = () => (
  <PageContainer title="Mega Menu" description="Large dropdown menus for navigating complex category structures.">
    <DemoBlock title="Mega Menu">
      <div className="relative inline-block">
        <Button variant="outline" className="gap-2">Browse Categories <Icon icon="solar:alt-arrow-down-linear" width={16} /></Button>
      </div>
    </DemoBlock>

    <DemoBlock title="Static Mega Menu Panel" className="mt-6">
      <div className="rounded-xl border border-defaultBorder p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Dashboards", icon: "solar:widget-bold-duotone", color: "primary", items: ["Analytics", "Modern", "Minimal", "CRM"] },
            { title: "Apps", icon: "solar:cart-large-2-bold-duotone", color: "success", items: ["Ecommerce", "Kanban", "Chat", "Calendar"] },
            { title: "UI Components", icon: "solar:widget-5-bold-duotone", color: "warning", items: ["Buttons", "Cards", "Tables", "Forms"] },
            { title: "Charts", icon: "solar:chart-2-bold-duotone", color: "info", items: ["Line", "Area", "Bar", "Donut"] },
          ].map((cat) => (
            <div key={cat.title}>
              <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-defaultBorder`}>
                <Icon icon={cat.icon} width={20} className={`text-${cat.color}`} />
                <h5 className="font-semibold text-sm">{cat.title}</h5>
              </div>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item}><Link href="#" className="text-sm opacity-70 hover:text-primary hover:opacity-100 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DemoBlock>
  </PageContainer>
);

export default MegaMenuPage;
