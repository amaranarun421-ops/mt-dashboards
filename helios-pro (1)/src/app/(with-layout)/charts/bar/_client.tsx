"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";

const quarters = ["Q1", "Q2", "Q3", "Q4"];
const regions = ["North", "South", "East", "West", "Central"];

export default function BarChartsPage() {
  return (
    <div>
      <PageHeader
        title="Bar Charts"
        description="Six bar chart variants covering the most common comparison and composition use-cases."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Bar" },
        ]}
        actions={<Badge variant="primary">6 variants</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Vertical */}
        <ChartCard
          title="Vertical Bars"
          subtitle="Quarterly revenue by region"
          action={<Badge variant="success">+12%</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: quarters },
              plotOptions: { bar: { columnWidth: "55%", borderRadius: 6, borderRadiusApplication: "end" } },
              dataLabels: { enabled: false },
              stroke: { show: false },
              legend: { show: false },
              tooltip: { y: { formatter: (v: number) => `$${v}K` } },
            }}
            series={[
              { name: "Revenue", data: [142, 188, 214, 248] },
            ]}
          />
        </ChartCard>

        {/* 2. Horizontal */}
        <ChartCard
          title="Horizontal Bars"
          subtitle="Top 5 regions by customer count"
          action={<Badge variant="info">ranked</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              plotOptions: { bar: { horizontal: true, barHeight: "55%", borderRadius: 6, borderRadiusApplication: "end" } },
              xaxis: { categories: regions },
              dataLabels: { enabled: false },
              stroke: { show: false },
              legend: { show: false },
            }}
            series={[
              { name: "Customers", data: [1240, 980, 1560, 1420, 880] },
            ]}
          />
        </ChartCard>

        {/* 3. Stacked */}
        <ChartCard
          title="Stacked Bars"
          subtitle="Revenue split by product line"
          action={<Badge variant="violet">stacked</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: quarters },
              plotOptions: { bar: { columnWidth: "55%", borderRadius: 4, borderRadiusApplication: "end" } },
              chart: { stacked: true },
              dataLabels: { enabled: false },
              stroke: { width: 1, colors: ["transparent"] },
              legend: { position: "top" },
              fill: { opacity: 1 },
            }}
            series={[
              { name: "Aurora", data: [42, 55, 60, 72] },
              { name: "Helix", data: [28, 32, 38, 44] },
              { name: "Lumen", data: [12, 18, 22, 26] },
            ]}
          />
        </ChartCard>

        {/* 4. Grouped */}
        <ChartCard
          title="Grouped Bars"
          subtitle="Side-by-side comparison of 2 years"
          action={<Badge variant="primary">grouped</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
              plotOptions: { bar: { columnWidth: "65%", borderRadius: 6, borderRadiusApplication: "end" } },
              dataLabels: { enabled: false },
              stroke: { show: true, width: 2, colors: ["transparent"] },
              legend: { position: "top" },
              colors: [heliosChartColors[0], heliosChartColors[1]],
            }}
            series={[
              { name: "2023", data: [44, 55, 57, 56, 61, 58] },
              { name: "2024", data: [76, 85, 101, 98, 87, 105] },
            ]}
          />
        </ChartCard>

        {/* 5. 100% stacked */}
        <ChartCard
          title="100% Stacked Bars"
          subtitle="Share of channel by quarter"
          action={<Badge variant="warning">100%</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: quarters },
              plotOptions: { bar: { columnWidth: "55%", borderRadius: 4, borderRadiusApplication: "end" } },
              chart: { stacked: true, stackType: "100%" },
              dataLabels: { enabled: false },
              stroke: { width: 1, colors: ["transparent"] },
              legend: { position: "top" },
              yaxis: { labels: { formatter: (v: number) => `${Math.round(v)}%` } },
              tooltip: { y: { formatter: (v: number) => `${v}%` } },
            }}
            series={[
              { name: "Direct", data: [42, 38, 35, 32] },
              { name: "Organic", data: [28, 30, 32, 34] },
              { name: "Referral", data: [18, 20, 21, 22] },
              { name: "Paid", data: [12, 12, 12, 12] },
            ]}
          />
        </ChartCard>

        {/* 6. With patterns */}
        <ChartCard
          title="Bars with Patterns"
          subtitle="Custom image fills for accessibility"
          action={<Badge variant="info">a11y</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: ["Aurora", "Helix", "Lumen", "Nova", "Pulse"] },
              plotOptions: { bar: { columnWidth: "60%", borderRadius: 6, borderRadiusApplication: "end", distributed: true } },
              dataLabels: { enabled: false },
              stroke: { show: false },
              legend: { show: false },
              fill: {
                type: "pattern",
                pattern: {
                  style: ["slantedLines", "verticalLines", "horizontalLines", "circles", "squares"],
                  width: 4,
                  height: 4,
                  strokeWidth: 2,
                },
              },
              colors: heliosChartColors.slice(0, 5),
            }}
            series={[
              { name: "Units", data: [320, 280, 210, 180, 150] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}