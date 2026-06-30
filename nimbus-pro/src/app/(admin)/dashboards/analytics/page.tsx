"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { VISITORS_SERIES, COUNTRIES, ACTIVITY, MONTHS } from "@/data/mock";
import { formatCompact, formatNumber } from "@/lib/utils";
import {
  Users, Eye, MousePointerClick, Clock, Globe2, Monitor, Smartphone, Tablet,
  Download, Filter, ArrowUpRight, Activity as ActivityIcon, ShoppingCart, FileText, UserPlus
} from "lucide-react";
import { useState } from "react";

const PAGE_VIEWS = VISITORS_SERIES.map((v) => Math.round(v * 2.4));

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<"7d" | "30d" | "12m">("12m");

  const trafficTrendOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981", "#0ea5e9"],
    stroke: { curve: "smooth", width: [3, 3] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] },
    },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true },
  };
  const trafficTrendSeries = [
    { name: "Visitors", data: VISITORS_SERIES },
    { name: "Page Views", data: PAGE_VIEWS },
  ];

  const deviceOptions = {
    ...baseChartOptions("radialBar"),
    labels: ["Desktop", "Mobile", "Tablet"],
    colors: ["#10b981", "#0ea5e9", "#8b5cf6"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "32%" },
        track: { background: "#e2e8f0", strokeWidth: "100%", margin: 8 },
        dataLabels: {
          name: { fontSize: "13px", color: "#64748b", offsetY: 60 },
          value: { fontSize: "22px", fontWeight: 700, color: "#0f172a", offsetY: 20 },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          margin: 8,
          fontFamily: "Inter",
          fontSize: "11px",
          formatter: function (_seriesName: string, opts: { w: { globals: { series: number[] } }; seriesIndex: number }) {
            return `${opts.w.globals.series[opts.seriesIndex]}%`;
          },
        },
      },
    },
    legend: { show: false },
    stroke: { lineCap: "round" as const },
  };

  const funnelStages = [
    { name: "Visits", value: 48920, color: "#10b981", width: 100 },
    { name: "Signups", value: 14280, color: "#0ea5e9", width: 58 },
    { name: "Trial", value: 6840, color: "#8b5cf6", width: 38 },
    { name: "Paid", value: 2140, color: "#f59e0b", width: 18 },
  ];

  const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    shopping: ShoppingCart, package: FileText, card: ActivityIcon, ticket: FileText, file: FileText, user: UserPlus,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Web traffic, visitor behavior, and conversion funnels across regions."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Analytics" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="md"><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Visitors" value="48,920" delta="+14.6%" deltaTone="up" icon={Users} iconTone="brand" footer="vs last 30 days" />
        <StatCard label="Page Views" value="184,210" delta="+22.3%" deltaTone="up" icon={Eye} iconTone="purple" footer="3.8 per visit" />
        <StatCard label="Bounce Rate" value="38.2%" delta="-3.1%" deltaTone="up" icon={MousePointerClick} iconTone="orange" footer="improving" />
        <StatCard label="Avg. Session" value="4m 12s" delta="+18s" deltaTone="up" icon={Clock} iconTone="pink" footer="vs last 30 days" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Visitors vs Page Views"
            description="Monthly traffic across the past year"
            action={
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
                {(["7d", "30d", "12m"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            }
          />
          <CardBody>
            <NimbusChart options={trafficTrendOptions} series={trafficTrendSeries} type="area" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Traffic by Device" description="Visitor device breakdown" />
          <CardBody>
            <NimbusChart options={deviceOptions} series={[58, 34, 8]} type="radialBar" height={300} />
            <div className="mt-4 space-y-2">
              {[
                { name: "Desktop", value: 58, icon: Monitor, color: "text-brand-600" },
                { name: "Mobile", value: 34, icon: Smartphone, color: "text-accent-500" },
                { name: "Tablet", value: 8, icon: Tablet, color: "text-purple-500" },
              ].map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <d.icon className={`h-4 w-4 ${d.color}`} /> {d.name}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Top Countries"
            description="Geographic distribution of visitors"
            action={<Badge tone="brand" variant="soft">6 regions</Badge>}
          />
          <CardBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COUNTRIES.map((c, i) => {
                const max = COUNTRIES[0].orders;
                const pct = Math.round((c.orders / max) * 100);
                return (
                  <div key={c.code} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-xl dark:bg-gray-800">
                      {c.flag}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">#{i + 1}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Progress value={pct} size="sm" className="flex-1" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatNumber(c.orders)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Activity Feed" description="Latest visitor & site events" />
          <CardBody className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {ACTIVITY.map((a) => {
              const Icon = activityIcons[a.icon] ?? ActivityIcon;
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-gray-900 dark:text-white">{a.user}</span> {a.action}{" "}
                      <span className="font-medium text-brand-600 dark:text-brand-400">{a.target}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Conversion Funnel"
          description="Visit → Signup → Trial → Paid — stage drop-off and conversion"
          action={<Badge tone="success" dot>4.4% overall</Badge>}
        />
        <CardBody>
          <div className="space-y-3">
            {funnelStages.map((stage, i) => {
              const dropoff = i > 0 ? Math.round((1 - stage.value / funnelStages[i - 1].value) * 100) : 0;
              return (
                <div key={stage.name} className="flex items-center gap-4">
                  <div className="w-24 shrink-0 text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{stage.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatNumber(stage.value)}</p>
                  </div>
                  <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div
                      className="flex h-full items-center justify-end rounded-lg px-3 text-white transition-all"
                      style={{ width: `${stage.width}%`, backgroundColor: stage.color }}
                    >
                      <span className="text-xs font-semibold">{((stage.value / funnelStages[0].value) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-24 shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {i > 0 ? <span className="text-error-600 dark:text-error-400">↓ {dropoff}% drop</span> : <span className="text-success-600 dark:text-success-400">Entry</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Visit → Signup", value: "29.2%", tone: "text-brand-600" },
              { label: "Signup → Trial", value: "47.9%", tone: "text-accent-500" },
              { label: "Trial → Paid", value: "31.3%", tone: "text-purple-500" },
              { label: "Overall CVR", value: "4.4%", tone: "text-warning-600" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
                <p className={`mt-1 text-xl font-bold ${m.tone}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-r from-brand-600 via-accent-600 to-purple-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Live Traffic Snapshot</p>
            </div>
            <h3 className="mt-2 text-2xl font-bold">1,284 visitors active right now</h3>
            <p className="mt-1 text-sm opacity-90">Top page: /dashboards/ecommerce · 78% from organic search · 12 countries online</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">🇺🇸 412</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">🇮🇳 286</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">🇩🇪 184</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">🇬🇧 142</span>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-xs opacity-90">Last 5 min</p>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <p className="mt-1 text-3xl font-bold">+8.2%</p>
            <p className="text-xs opacity-90">vs previous 5 min</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
