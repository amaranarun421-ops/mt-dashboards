"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" }, grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 } };

const ModernDashboard = () => (
  <PageContainer title="Modern Dashboard" description="Bold, gradient-rich layout focused on visual storytelling.">
    {/* Hero stat */}
    <div className="rounded-2xl bg-primary p-8 text-white mb-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-30"><Icon icon="solar:rocket-bold-duotone" width={120} /></div>
      <div className="relative">
        <p className="opacity-90">Total Revenue</p>
        <h1 className="text-4xl font-bold mt-1">$148,920.50</h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge className="bg-white text-primary text-white border-white/50">↑ 12.5% vs last month</Badge>
          <span className="text-sm opacity-80">Goal: $200,000</span>
        </div>
        <div className="h-2 bg-white text-primary rounded-full overflow-hidden mt-4 max-w-md">
          <div className="h-full bg-white rounded-full" style={{ width: "74%" }} />
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Orders", value: "1,284", icon: "solar:cart-large-2-bold-duotone", color: "primary" },
        { label: "Customers", value: "8,432", icon: "solar:users-group-rounded-bold-duotone", color: "success" },
        { label: "Products", value: "248", icon: "solar:box-bold-duotone", color: "warning" },
        { label: "Refunds", value: "32", icon: "solar:undo-left-round-bold-duotone", color: "error" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl bg-background p-5 shadow-xs flex items-center gap-4">
          <div className={`h-12 w-12 rounded-2xl bg-light${s.color} text-${s.color} flex items-center justify-center`}>
            <Icon icon={s.icon} width={26} />
          </div>
          <div>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs opacity-70">{s.label}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DemoBlock title="Sales Trend" className="lg:col-span-2">
        <Chart options={{ ...base, colors: ["var(--color-primary)"], stroke: { curve: "smooth", width: 3 }, fill: { type: "solid", opacity: 0.15 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] } }} series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70, 91, 80, 100, 90, 120] }]} type="area" height={300} />
      </DemoBlock>

      <DemoBlock title="Sales by Category">
        <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)"], labels: ["Electronics","Clothing","Books","Other"], legend: { position: "bottom" }, stroke: { width: 0 }, plotOptions: { pie: { donut: { size: "70%" } } } }} series={[45, 25, 15, 15]} type="donut" height={300} />
      </DemoBlock>
    </div>
  </PageContainer>
);

export default ModernDashboard;
