"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" }, grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 } };

const AnalyticsDashboard = () => (
  <PageContainer title="Analytics Dashboard" description="Deep-dive analytics with traffic sources, conversion funnels, and cohort retention.">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Sessions", value: "48,250", change: "+15.3%", icon: "solar:eye-bold-duotone", color: "primary" },
        { label: "Bounce Rate", value: "32.4%", change: "-2.1%", icon: "solar:logout-3-bold-duotone", color: "warning" },
        { label: "Avg Duration", value: "4m 32s", change: "+8.2%", icon: "solar:clock-circle-bold-duotone", color: "success" },
        { label: "Pages/Session", value: "5.8", change: "+0.4", icon: "solar:document-bold-duotone", color: "info" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl bg-background p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div className={`h-11 w-11 rounded-xl bg-light${s.color} text-${s.color} flex items-center justify-center`}>
              <Icon icon={s.icon} width={24} />
            </div>
            <Badge variant={s.change.startsWith("+") ? "lightSuccess" : "lightError"}>{s.change}</Badge>
          </div>
          <p className="text-2xl font-bold mt-3">{s.value}</p>
          <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <DemoBlock title="Traffic Overview" className="lg:col-span-2">
        <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-secondary)"], stroke: { curve: "smooth", width: 2 }, xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }, legend: { position: "top" }, fill: { type: "solid", opacity: 0.15 } }} series={[{ name: "Organic", data: [3200, 4100, 3800, 5100, 4900, 6200, 5800] }, { name: "Paid", data: [1200, 1800, 1500, 2200, 1900, 2500, 2300] }]} type="area" height={300} />
      </DemoBlock>

      <DemoBlock title="Traffic Sources">
        <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)", "var(--color-error)"], labels: ["Direct","Organic","Social","Email","Paid"], legend: { position: "bottom" }, stroke: { width: 0 }, plotOptions: { pie: { donut: { size: "65%" } } } }} series={[35, 28, 18, 12, 7]} type="donut" height={300} />
      </DemoBlock>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Top Pages">
        <div className="space-y-3">
          {[
            { page: "/dashboard", views: 12400, change: "+12%" },
            { page: "/products", views: 8200, change: "+8%" },
            { page: "/blog/launch", views: 6100, change: "+45%" },
            { page: "/pricing", views: 4800, change: "-3%" },
            { page: "/about", views: 3200, change: "+5%" },
          ].map((p) => (
            <div key={p.page} className="flex items-center justify-between py-2 border-b border-defaultBorder last:border-b-0">
              <div className="flex items-center gap-3">
                <Icon icon="solar:document-text-bold-duotone" width={20} className="text-primary" />
                <span className="text-sm font-mono">{p.page}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{p.views.toLocaleString()}</span>
                <Badge variant={p.change.startsWith("+") ? "lightSuccess" : "lightError"}>{p.change}</Badge>
              </div>
            </div>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Active Users by Country">
        <Chart options={{ ...base, colors: ["var(--color-primary)"], plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "60%" } }, xaxis: { categories: ["USA","UK","Canada","Germany","India","Australia"] } }} series={[{ name: "Users", data: [12400, 8200, 5100, 4300, 3800, 2100] }]} type="bar" height={300} />
      </DemoBlock>
    </div>
  </PageContainer>
);

export default AnalyticsDashboard;
