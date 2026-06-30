"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import {
  ActivityIcon,
  WalletIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// heatmap data: 7 days × 6 hour buckets
const heatRows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatCols = ["00", "04", "08", "12", "16", "20"];
const heatData: number[][] = [
  [12, 8, 28, 64, 72, 40],
  [10, 9, 32, 70, 80, 44],
  [14, 10, 30, 78, 84, 48],
  [18, 12, 36, 82, 90, 52],
  [22, 14, 34, 76, 86, 58],
  [28, 16, 26, 58, 64, 38],
  [20, 11, 22, 48, 52, 30],
];

function heatColor(v: number) {
  if (v > 80) return "bg-primary text-white";
  if (v > 60) return "bg-primary/70 text-white";
  if (v > 40) return "bg-primary/45 text-dark";
  if (v > 20) return "bg-primary/20 text-dark-7 dark:text-dark-6";
  return "bg-primary/10 text-dark-5 dark:text-dark-6";
}

export default function ChartDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Chart Dashboard"
        description="Eight chart types composed into a single executive overview."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Dashboard" },
        ]}
        actions={
          <>
            <Badge variant="info">8 chart types</Badge>
            <Badge variant="primary">Q4 2024</Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Sessions"
          value="584,920"
          delta={{ value: "+12.4%", trend: "up" }}
          icon={<ActivityIcon className="size-5" />}
          tone="primary"
          sublabel="186k unique"
        />
        <StatCard
          label="Revenue"
          value="$284,920"
          delta={{ value: "+18.2%", trend: "up" }}
          icon={<WalletIcon className="size-5" />}
          tone="accent"
          sublabel="net of refunds"
        />
        <StatCard
          label="Orders"
          value="1,284"
          delta={{ value: "-2.1%", trend: "down" }}
          icon={<ShoppingCartIcon className="size-5" />}
          tone="violet"
          sublabel="AOV $148.20"
        />
        <StatCard
          label="Avg Rating"
          value="4.82"
          delta={{ value: "+0.12", trend: "up" }}
          icon={<StarIcon className="size-5" />}
          tone="info"
          sublabel="1,204 reviews"
        />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* 1. Area: revenue trend */}
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue, current year"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+18.2%</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              markers: { size: 0 },
              tooltip: { y: { formatter: (v: number) => `$${v.toLocaleString()}` } },
            }}
            series={[
              { name: "Revenue", data: [180, 196, 215, 232, 248, 264, 282, 296, 312, 328, 344, 368] },
            ]}
          />
        </ChartCard>

        {/* 2. Donut: traffic sources */}
        <ChartCard
          title="Traffic Sources"
          subtitle="Channel mix"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={320}
            options={{
              labels: ["Organic", "Direct", "Referral", "Social", "Paid"],
              legend: { position: "bottom" },
              stroke: { width: 0 },
              plotOptions: { pie: { donut: { size: "70%" } } },
            }}
            series={[42, 24, 14, 12, 8]}
          />
        </ChartCard>

        {/* 3. Bar: monthly sales by region */}
        <ChartCard
          title="Sales by Region"
          subtitle="Quarterly grouped comparison"
          className="col-span-12 xl:col-span-6"
          action={<Badge variant="primary">grouped</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
              plotOptions: { bar: { columnWidth: "60%", borderRadius: 6, borderRadiusApplication: "end" } },
              stroke: { show: true, width: 2, colors: ["transparent"] },
              dataLabels: { enabled: false },
              legend: { position: "top" },
              colors: [heliosChartColors[0], heliosChartColors[1], heliosChartColors[2]],
            }}
            series={[
              { name: "North", data: [42, 55, 60, 72] },
              { name: "South", data: [28, 32, 38, 44] },
              { name: "East", data: [12, 18, 22, 26] },
            ]}
          />
        </ChartCard>

        {/* 4. Radar: product fit */}
        <ChartCard
          title="Product Fit"
          subtitle="Multi-dimensional scorecard"
          className="col-span-12 xl:col-span-6"
          action={<Badge variant="violet">radar</Badge>}
        >
          <HeliosChart
            type="radar"
            height={300}
            options={{
              labels: ["Speed", "Reliability", "Cost", "Support", "Features", "Security"],
              stroke: { width: 2 },
              fill: { opacity: 0.25 },
              markers: { size: 4, strokeWidth: 0 },
              legend: { position: "top" },
              yaxis: { show: false },
            }}
            series={[
              { name: "Helios Pro", data: [88, 92, 74, 80, 86, 94] },
              { name: "Industry Avg", data: [72, 78, 80, 68, 70, 76] },
            ]}
          />
        </ChartCard>

        {/* 5. RadialBar: goal attainment */}
        <ChartCard
          title="Goal Attainment"
          subtitle="KPI progress dials"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="radialBar"
            height={300}
            options={{
              labels: ["Revenue", "Users", "NPS"],
              legend: { position: "bottom" },
              plotOptions: {
                radialBar: {
                  hollow: { size: "32%" },
                  track: { background: "rgba(148,163,184,0.18)" },
                  dataLabels: {
                    name: { fontSize: "12px" },
                    value: { fontSize: "16px", fontWeight: 600 },
                    total: {
                      show: true,
                      label: "Avg",
                      formatter: () => "76%",
                    },
                  },
                },
              },
              colors: [heliosChartColors[0], heliosChartColors[1], heliosChartColors[2]],
            }}
            series={[84, 72, 71]}
          />
        </ChartCard>

        {/* 6. Line: latency p50/p95/p99 */}
        <ChartCard
          title="API Latency"
          subtitle="p50 / p95 / p99 (ms)"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="info">line</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: months },
              stroke: { curve: "smooth", width: 2, dashArray: [0, 4, 8] },
              markers: { size: 3 },
              dataLabels: { enabled: false },
              legend: { position: "top" },
              yaxis: { labels: { formatter: (v: number) => `${v}ms` } },
            }}
            series={[
              { name: "p50", data: [142, 138, 134, 130, 128, 122, 118, 124, 116, 112, 108, 104] },
              { name: "p95", data: [320, 312, 305, 298, 290, 284, 272, 280, 268, 260, 254, 248] },
              { name: "p99", data: [640, 628, 612, 596, 580, 568, 544, 560, 536, 520, 508, 496] },
            ]}
          />
        </ChartCard>

        {/* 7. Polar area: market share */}
        <ChartCard
          title="Market Share"
          subtitle="By segment"
          className="col-span-12 xl:col-span-4"
          action={<Badge variant="primary">polar</Badge>}
        >
          <HeliosChart
            type="polarArea"
            height={300}
            options={{
              labels: ["Pro", "Team", "Starter", "Enterprise", "Legacy"],
              stroke: { width: 1, colors: ["#ffffff"] },
              legend: { position: "bottom" },
              fill: { opacity: 0.85 },
              colors: heliosChartColors.slice(0, 5),
            }}
            series={[42, 28, 18, 8, 4]}
          />
        </ChartCard>

        {/* 8. Heatmap (custom) + top products */}
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader
            title="Engagement Heatmap"
            subtitle="Sessions by day × hour"
            action={<Badge variant="violet" size="sm">7×6</Badge>}
          />
          <div className="helios-scroll overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[56px_repeat(6,1fr)] gap-2">
                <div />
                {heatCols.map((c) => (
                  <div key={c} className="text-center text-xs font-medium text-dark-5 dark:text-dark-6">{c}:00</div>
                ))}
                {heatRows.map((r, ri) => (
                  <div key={`row-${r}`} className="contents">
                    <div className="flex items-center text-xs font-medium text-dark-5 dark:text-dark-6">{r}</div>
                    {heatData[ri].map((v, ci) => (
                      <div
                        key={`${r}-${ci}`}
                        className={`grid h-12 place-items-center rounded-md text-xs font-semibold transition-transform hover:scale-105 ${heatColor(v)}`}
                        title={`${r} ${heatCols[ci]}:00 — ${v} sessions`}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Top Products" subtitle="By revenue this quarter" action={<Badge variant="success">Top 5</Badge>} />
          <ul className="space-y-3">
            {[
              { name: "Aurora Pro Headset", rev: "$84,200", pct: 92 },
              { name: "Helix Smart Watch", rev: "$62,840", pct: 78 },
              { name: "Lumen Desk Lamp", rev: "$48,920", pct: 64 },
              { name: "Nova Webcam 4K", rev: "$34,180", pct: 52 },
              { name: "Pulse Power Bank", rev: "$22,840", pct: 36 },
            ].map((p) => (
              <li key={p.name} className="rounded-xl border border-stroke p-3 dark:border-dark-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-dark dark:text-white">{p.name}</span>
                  <span className="text-sm font-semibold text-primary dark:text-primary-light">{p.rev}</span>
                </div>
                <Progress className="mt-2" value={p.pct} tone="primary" size="xs" />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}