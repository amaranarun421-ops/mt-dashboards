"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import { PieChart } from "@/components/Layouts/sidebar/icons";

export default function PieDoughnutChartsPage() {
  return (
    <div>
      <PageHeader
        title="Pie & Doughnut Charts"
        description="Six variants showing part-to-whole composition across categorical data."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Pie & Doughnut" },
        ]}
        actions={
          <Badge variant="primary">
            <PieChart className="size-3.5" /> 6 variants
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* 1. Classic pie */}
        <ChartCard
          title="Classic Pie"
          subtitle="Traffic by source"
          action={<Badge variant="success">5 slices</Badge>}
        >
          <HeliosChart
            type="pie"
            height={300}
            options={{
              labels: ["Organic", "Direct", "Referral", "Social", "Paid"],
              legend: { position: "bottom" },
              stroke: { show: true, width: 2, colors: ["#ffffff"] },
              tooltip: { y: { formatter: (v: number) => `${v}%` } },
            }}
            series={[42, 24, 14, 12, 8]}
          />
        </ChartCard>

        {/* 2. Donut */}
        <ChartCard
          title="Donut"
          subtitle="Revenue by category"
          action={<Badge variant="info">donut</Badge>}
        >
          <HeliosChart
            type="donut"
            height={300}
            options={{
              labels: ["Audio", "Wearables", "Video", "Smart Home", "Peripherals"],
              legend: { position: "bottom" },
              stroke: { width: 0 },
              plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total", fontSize: "16px", fontWeight: 700, color: undefined } } } } },
              tooltip: { y: { formatter: (v: number) => `$${v}K` } },
            }}
            series={[148, 96, 72, 56, 44]}
          />
        </ChartCard>

        {/* 3. Custom colors */}
        <ChartCard
          title="Custom Color Palette"
          subtitle="Brand-aligned categorical palette"
          action={<Badge variant="violet">palette</Badge>}
        >
          <HeliosChart
            type="donut"
            height={300}
            options={{
              labels: ["Pro", "Team", "Starter", "Enterprise", "Legacy"],
              legend: { position: "bottom" },
              stroke: { width: 0 },
              colors: ["#10b981", "#f59e0b", "#8b5cf6", "#0ea5e9", "#94a3b8"],
              plotOptions: { pie: { donut: { size: "60%" } } },
              tooltip: { y: { formatter: (v: number) => `${v} accounts` } },
            }}
            series={[420, 280, 180, 96, 64]}
          />
        </ChartCard>

        {/* 4. With legend right */}
        <ChartCard
          title="Pie with Side Legend"
          subtitle="Legend positioned to the right"
          action={<Badge variant="primary">legend</Badge>}
        >
          <HeliosChart
            type="pie"
            height={300}
            options={{
              labels: ["Americas", "EMEA", "APAC", "Other"],
              legend: { position: "right", fontSize: "13px", markers: { size: 7 } },
              stroke: { show: true, width: 2, colors: ["#ffffff"] },
              tooltip: { y: { formatter: (v: number) => `${v}%` } },
            }}
            series={[38, 28, 24, 10]}
          />
        </ChartCard>

        {/* 5. Monochrome */}
        <ChartCard
          title="Monochrome"
          subtitle="Single-hue shaded donut"
          action={<Badge variant="warning">mono</Badge>}
        >
          <HeliosChart
            type="donut"
            height={300}
            options={{
              labels: ["Platinum", "Gold", "Silver", "Bronze", "Trial"],
              legend: { position: "bottom" },
              stroke: { width: 0 },
              colors: ["#065f46", "#047857", "#10b981", "#34d399", "#a7f3d0"],
              plotOptions: { pie: { donut: { size: "68%" } } },
            }}
            series={[180, 240, 320, 460, 620]}
          />
        </ChartCard>

        {/* 6. Gradient */}
        <ChartCard
          title="Gradient Pie"
          subtitle="Slices filled with gradients"
          action={<Badge variant="info">gradient</Badge>}
        >
          <HeliosChart
            type="pie"
            height={300}
            options={{
              labels: ["Q1", "Q2", "Q3", "Q4"],
              legend: { position: "bottom" },
              stroke: { show: true, width: 3, colors: ["#ffffff"] },
              colors: heliosChartColors.slice(0, 4),
              fill: {
                type: "gradient",
                gradient: { shade: "dark", shadeIntensity: 0.5, type: "vertical", opacityFrom: 1, opacityTo: 0.7 },
              },
              tooltip: { y: { formatter: (v: number) => `$${v}K` } },
            }}
            series={[142, 188, 214, 248]}
          />
        </ChartCard>
      </div>
    </div>
  );
}