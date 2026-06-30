"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import { ActivityIcon } from "@/components/Layouts/sidebar/icons";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function LineChartsPage() {
  return (
    <div>
      <PageHeader
        title="Line Charts"
        description="Six line chart variants for trend visualisation across time, categories and series."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Line" },
        ]}
        actions={<Badge variant="primary">6 variants</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Basic line */}
        <ChartCard
          title="Basic Line"
          subtitle="Single series, monthly active users"
          action={<Badge variant="success">+18.2%</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "straight", width: 3 },
              markers: { size: 0 },
              dataLabels: { enabled: false },
              tooltip: { y: { formatter: (v: number) => `${v.toLocaleString()} users` } },
            }}
            series={[
              {
                name: "Active Users",
                data: [4200, 4680, 5120, 4980, 5640, 6210, 6890, 7320, 7860, 8240, 8980, 9640],
              },
            ]}
          />
        </ChartCard>

        {/* 2. Multi-series */}
        <ChartCard
          title="Multi-Series Line"
          subtitle="Comparing three product lines"
          action={<Badge variant="info">3 series</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "smooth", width: 2 },
              markers: { size: 3, strokeWidth: 0 },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Aurora", data: [120, 145, 160, 175, 190, 210, 240, 260, 290, 310, 340, 380] },
              { name: "Helix", data: [80, 92, 104, 118, 130, 144, 165, 178, 196, 212, 232, 258] },
              { name: "Lumen", data: [40, 52, 60, 72, 84, 96, 108, 120, 134, 148, 162, 178] },
            ]}
          />
        </ChartCard>

        {/* 3. Smoothed */}
        <ChartCard
          title="Smoothed Line"
          subtitle="Curved spline interpolation"
          action={<Badge variant="violet">smooth</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "smooth", width: 4 },
              markers: { size: 0 },
              dataLabels: { enabled: false },
            }}
            series={[
              {
                name: "Latency (ms)",
                data: [142, 138, 134, 130, 128, 122, 118, 124, 116, 112, 108, 104],
              },
            ]}
          />
        </ChartCard>

        {/* 4. Dashed */}
        <ChartCard
          title="Dashed Lines"
          subtitle="Forecast vs actual with stroke dash"
          action={<Badge variant="warning">forecast</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { width: 3, dashArray: [0, 8] },
              markers: { size: 4, strokeWidth: 0 },
              dataLabels: { enabled: false },
              legend: { position: "top" },
            }}
            series={[
              { name: "Actual", data: [320, 410, 380, 510, 580, 640, 720, 690, 810, 880, 920, 1010] },
              { name: "Forecast", data: [340, 390, 410, 470, 540, 610, 690, 740, 800, 860, 920, 980] },
            ]}
          />
        </ChartCard>

        {/* 5. With markers */}
        <ChartCard
          title="Line with Markers"
          subtitle="Points highlighted for emphasis"
          action={<Badge variant="primary">markers</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "straight", width: 2 },
              markers: {
                size: 6,
                strokeWidth: 2,
                strokeColors: ["#ffffff"],
                fillOpacity: 1,
                hover: { size: 8 },
              },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "North", data: [44, 55, 41, 67, 22, 43, 50, 58, 65, 72, 68, 79] },
              { name: "South", data: [28, 35, 41, 32, 45, 52, 48, 60, 55, 68, 62, 74] },
            ]}
          />
        </ChartCard>

        {/* 6. With annotations */}
        <ChartCard
          title="Line with Annotations"
          subtitle="Launch and incident markers"
          action={
            <span className="inline-flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
              <ActivityIcon className="size-3.5 text-primary" /> annotated
            </span>
          }
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "smooth", width: 3 },
              markers: { size: 3 },
              dataLabels: { enabled: false },
              annotations: {
                xaxis: [
                  {
                    x: "Apr",
                    borderColor: heliosChartColors[1],
                    label: { text: "v2.0 launch", style: { color: "#fff", background: heliosChartColors[1] } },
                  },
                  {
                    x: "Sep",
                    borderColor: heliosChartColors[4],
                    label: { text: "Incident", style: { color: "#fff", background: heliosChartColors[4] } },
                  },
                ],
                yaxis: [
                  {
                    y: 8500,
                    borderColor: heliosChartColors[0],
                    label: { text: "Target", style: { color: "#fff", background: heliosChartColors[0] } },
                  },
                ],
              },
            }}
            series={[
              {
                name: "Sessions",
                data: [4200, 4680, 5120, 6740, 7280, 6620, 7040, 7520, 4180, 7860, 8980, 9640],
              },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}