"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { Badge } from "@/components/shared/badge";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  ActivityIcon,
  UsersIcon,
  GaugeIcon,
  GlobeIcon,
} from "@/components/Layouts/sidebar/icons";

const topPages = [
  { path: "/", views: 184220, rate: 38.2, change: "+4.1%" },
  { path: "/pricing", views: 92840, rate: 32.7, change: "+2.4%" },
  { path: "/products/aurora", views: 68220, rate: 41.8, change: "+8.6%" },
  { path: "/blog/helios-launch", views: 54910, rate: 24.1, change: "-1.2%" },
  { path: "/docs/getting-started", views: 41830, rate: 28.9, change: "+1.8%" },
  { path: "/changelog", views: 28410, rate: 22.4, change: "+0.6%" },
];

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

export default function AnalyticsDashboard() {
  return (
    <div>
      <PageHeader
        title="Analytics Dashboard"
        description="Visitor behavior, traffic sources and conversion performance."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Analytics" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Last 30 days</Button>
            <Button variant="primary" size="sm">Export report</Button>
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
          sublabel="186k unique users"
        />
        <StatCard
          label="Bounce Rate"
          value="32.8%"
          delta={{ value: "-2.1%", trend: "down" }}
          icon={<GaugeIcon className="size-5" />}
          tone="accent"
          sublabel="below industry avg"
        />
        <StatCard
          label="Pages / Session"
          value="4.62"
          delta={{ value: "+0.4", trend: "up" }}
          icon={<GlobeIcon className="size-5" />}
          tone="violet"
          sublabel="vs. 4.22 last week"
        />
        <StatCard
          label="Conversion Rate"
          value="3.84%"
          delta={{ value: "+0.6%", trend: "up" }}
          icon={<UsersIcon className="size-5" />}
          tone="info"
          sublabel="22,478 conversions"
        />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Sessions Over Time"
          subtitle="Daily sessions, last 14 days"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+12.4%</Badge>}
        >
          <HeliosChart
            type="line"
            height={320}
            options={{
              xaxis: { categories: Array.from({ length: 14 }, (_, i) => `D${i + 1}`) },
              stroke: { curve: "smooth", width: 3 },
              markers: { size: 4, strokeWidth: 0 },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Sessions", data: [38200, 41200, 39800, 42500, 46800, 44100, 41900, 48200, 51600, 49800, 53200, 56400, 54800, 58200] },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Traffic by Source"
          subtitle="Where your visitors come from"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={320}
            options={{
              labels: ["Organic", "Direct", "Referral", "Social", "Paid"],
              legend: { position: "bottom" },
              plotOptions: { pie: { donut: { size: "70%" } } },
            }}
            series={[42, 24, 14, 12, 8]}
          />
        </ChartCard>

        <ChartCard
          title="Pageviews vs. Unique Visitors"
          subtitle="Stacked area, last 12 weeks"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="info">12w</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: Array.from({ length: 12 }, (_, i) => `W${i + 1}`) },
              stroke: { curve: "smooth", width: 2 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Pageviews", data: [120, 145, 160, 175, 190, 210, 240, 260, 290, 310, 340, 380] },
              { name: "Unique", data: [82, 96, 108, 118, 130, 144, 165, 178, 196, 212, 232, 258] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Top Pages" subtitle="By pageviews (last 7d)" />
          <ul className="space-y-3">
            {topPages.map((p) => (
              <li key={p.path} className="rounded-xl border border-stroke p-3 dark:border-dark-3">
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-medium text-dark dark:text-white">{p.path}</code>
                  <span className={`text-xs font-semibold ${p.change.startsWith("-") ? "text-red dark:text-red-light" : "text-primary dark:text-primary-light"}`}>
                    {p.change}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-dark-5 dark:text-dark-6">
                  <span>{p.views.toLocaleString()} views</span>
                  <span>{p.rate}% engaged</span>
                </div>
                <Progress className="mt-2" value={p.rate} tone="primary" size="xs" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-12">
          <CardHeader
            title="Engagement Heatmap"
            subtitle="Visitor activity by day-of-week × hour-of-day (UTC)"
            action={<Badge variant="primary" size="sm">7×6 grid</Badge>}
          />
          <div className="helios-scroll overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[64px_repeat(6,1fr)] gap-2">
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
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Analytics" }]} />
      </div>
    </div>
  );
}