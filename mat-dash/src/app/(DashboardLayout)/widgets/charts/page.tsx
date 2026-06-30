"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" } };

const WidgetsChartsPage = () => (
  <PageContainer title="Widget Charts" description="Compact chart widgets for embedding in stat cards, sidebars, and dashboards.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <DemoBlock title="Revenue Sparkline">
        <Chart options={{ ...base, chart: { ...base.chart, sparkline: { enabled: true } }, colors: ["var(--color-primary)"], stroke: { curve: "smooth", width: 2 }, fill: { type: "solid", opacity: 0.15 } }} series={[{ data: [25, 35, 30, 50, 45, 65, 70, 60, 80] }]} type="area" height={80} />
        <p className="text-2xl font-bold mt-2">$48,920</p>
        <p className="text-xs text-success flex items-center gap-1"><span>↑ 12.5%</span> <span className="opacity-60">vs last month</span></p>
      </DemoBlock>

      <DemoBlock title="Users Radial">
        <Chart options={{ ...base, colors: ["var(--color-success)"], labels: ["Active"], plotOptions: { radialBar: { hollow: { size: "65%" }, dataLabels: { value: { fontSize: "24px", fontWeight: 700, color: "var(--color-link)" } } } } }} series={[78]} type="radialBar" height={180} />
      </DemoBlock>

      <DemoBlock title="Donut Mini">
        <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"], labels: ["A","B","C"], legend: { position: "bottom" }, stroke: { width: 0 }, plotOptions: { pie: { donut: { size: "70%" } } } }} series={[60, 25, 15]} type="donut" height={180} />
      </DemoBlock>

      <DemoBlock title="Bar Sparkline">
        <Chart options={{ ...base, chart: { ...base.chart, sparkline: { enabled: true } }, colors: ["var(--color-warning)"], plotOptions: { bar: { columnWidth: "60%", borderRadius: 4 } } }} series={[{ data: [40, 30, 50, 35, 60, 45, 70] }]} type="bar" height={80} />
        <p className="text-2xl font-bold mt-2">8,420</p>
        <p className="text-xs text-warning flex items-center gap-1"><span>↓ 2.3%</span> <span className="opacity-60">vs last week</span></p>
      </DemoBlock>

      <DemoBlock title="Trend Line">
        <Chart options={{ ...base, chart: { ...base.chart, sparkline: { enabled: true } }, colors: ["var(--color-info)"], stroke: { curve: "smooth", width: 3 } }} series={[{ data: [10, 30, 20, 50, 35, 60, 55, 80] }]} type="line" height={80} />
        <p className="text-2xl font-bold mt-2">94.2%</p>
        <p className="text-xs text-info flex items-center gap-1"><span>↑ 5.1%</span> <span className="opacity-60">uptime this week</span></p>
      </DemoBlock>

      <DemoBlock title="Gauge">
        <Chart options={{ ...base, colors: ["var(--color-error)"], labels: ["Load"], plotOptions: { radialBar: { startAngle: -135, endAngle: 135, hollow: { size: "60%" }, dataLabels: { value: { fontSize: "20px", fontWeight: 700, color: "var(--color-link)" } } } }, stroke: { lineCap: "round" } }} series={[67]} type="radialBar" height={180} />
      </DemoBlock>
    </div>
  </PageContainer>
);

export default WidgetsChartsPage;
