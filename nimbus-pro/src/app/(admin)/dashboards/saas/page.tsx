"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS } from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Repeat, TrendingUp, Users, Activity, Plus, Download, ArrowUpRight, ArrowDownRight,
  Sparkles, Zap, Crown, Rocket
} from "lucide-react";

const MRR_DATA = [42, 48, 52, 58, 64, 72, 78, 86, 94, 104, 118, 132];
const MRR_GOAL = MRR_DATA.map((_, i) => 40 + i * 9);

const PLANS = [
  { name: "Free", subs: 18420, color: "#94a3b8", icon: Users, mrr: 0 },
  { name: "Pro", subs: 4280, color: "#10b981", icon: Rocket, mrr: 209720 },
  { name: "Agency", subs: 842, color: "#8b5cf6", icon: Zap, mrr: 125658 },
  { name: "Enterprise", subs: 184, color: "#f59e0b", icon: Crown, mrr: 138000 },
];

const RETENTION_MATRIX = [
  // rows = cohort month, cols = months since signup
  { cohort: "Jan", size: 420, values: [100, 88, 82, 78, 74, 71] },
  { cohort: "Feb", size: 480, values: [100, 86, 80, 75, 71, 0] },
  { cohort: "Mar", size: 520, values: [100, 90, 84, 79, 0, 0] },
  { cohort: "Apr", size: 610, values: [100, 89, 83, 0, 0, 0] },
  { cohort: "May", size: 680, values: [100, 91, 0, 0, 0, 0] },
  { cohort: "Jun", size: 820, values: [100, 0, 0, 0, 0, 0] },
];

const RECENT_SUBS = [
  { customer: "Acme Corporation", plan: "Enterprise", status: "active", mrr: 750, started: "2026-06-26", period: "annual" },
  { customer: "Globex Industries", plan: "Agency", status: "active", mrr: 149, started: "2026-06-24", period: "monthly" },
  { customer: "Initech LLC", plan: "Pro", status: "trialing", mrr: 49, started: "2026-06-22", period: "monthly" },
  { customer: "Stark Enterprises", plan: "Enterprise", status: "active", mrr: 750, started: "2026-06-18", period: "annual" },
  { customer: "Wayne Foundation", plan: "Pro", status: "past_due", mrr: 49, started: "2026-06-12", period: "monthly" },
  { customer: "Umbrella Group", plan: "Agency", status: "active", mrr: 149, started: "2026-06-08", period: "monthly" },
];

function retentionColor(v: number): string {
  if (v === 0) return "bg-gray-50 dark:bg-gray-900/50";
  if (v >= 90) return "bg-brand-500 text-white";
  if (v >= 80) return "bg-brand-400/80 text-white";
  if (v >= 70) return "bg-accent-400/70 text-white";
  if (v >= 60) return "bg-warning-400/70 text-white";
  return "bg-error-400/60 text-white";
}

export default function SaaSDashboard() {
  const mrrOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981", "#94a3b8"],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 6] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] },
    },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${v}k` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 0, hover: { size: 6 } },
    annotations: {
      yaxis: [
        {
          y: 150,
          borderColor: "#f59e0b",
          strokeDashArray: 4,
          label: { text: "Year-end goal $150k", style: { color: "#fff", background: "#f59e0b" } },
        },
      ],
    },
    tooltip: { shared: true, y: { formatter: (v: number) => `$${v}k` } },
  };
  const mrrSeries = [
    { name: "MRR", data: MRR_DATA },
    { name: "Goal", data: MRR_GOAL },
  ];

  const planOptions = {
    ...baseChartOptions("bar"),
    colors: PLANS.map((p) => p.color),
    plotOptions: { bar: { borderRadius: 8, distributed: true, columnWidth: "55%" } },
    xaxis: { categories: PLANS.map((p) => p.name), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatNumber(v) } },
    legend: { show: false },
    tooltip: { y: { formatter: (v: number) => `${formatNumber(v)} subscribers` } },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="SaaS Dashboard"
        description="Subscription metrics, MRR growth, churn, and plan performance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "SaaS" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Plan</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR" value="$132k" delta="+12.4%" deltaTone="up" icon={TrendingUp} iconTone="brand" footer="$1.58M ARR" />
        <StatCard label="ARR" value="$1.58M" delta="+38.6%" deltaTone="up" icon={Repeat} iconTone="purple" footer="annualized run-rate" />
        <StatCard label="Active Subscriptions" value="23,726" delta="+6.2%" deltaTone="up" icon={Users} iconTone="orange" footer="across 4 plans" />
        <StatCard label="Churn Rate" value="2.4%" delta="-0.6%" deltaTone="up" icon={Activity} iconTone="pink" footer="below 3% target" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="MRR Growth"
            description="Monthly recurring revenue vs target trajectory"
            action={<Badge tone="success" dot>On track for $150k goal</Badge>}
          />
          <CardBody>
            <NimbusChart options={mrrOptions} series={mrrSeries} type="area" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Plan Distribution" description="Subscriber count by plan tier" />
          <CardBody>
            <NimbusChart options={planOptions} series={[{ name: "Subscribers", data: PLANS.map((p) => p.subs) }]} type="bar" height={260} />
            <div className="mt-4 space-y-2">
              {PLANS.map((p) => (
                <div key={p.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                  <span className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <p.icon className="h-3.5 w-3.5" style={{ color: p.color }} />
                    {p.name}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{formatNumber(p.subs)}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Retention Cohorts"
            description="% of subscribers retained by month since signup (cohort size = signups)"
            action={<Badge tone="brand" variant="soft">6 cohorts</Badge>}
          />
          <CardBody className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-center text-xs">
              <thead>
                <tr>
                  <th className="rounded-md bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">Cohort</th>
                  <th className="rounded-md bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">Size</th>
                  {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                    <th key={m} className="rounded-md bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RETENTION_MATRIX.map((row) => (
                  <tr key={row.cohort}>
                    <td className="rounded-md bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">{row.cohort}</td>
                    <td className="rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">{row.size}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className={`rounded-md px-3 py-2 text-xs font-bold ${retentionColor(v)}`}>
                        {v === 0 ? "—" : `${v}%`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Low</span>
              <div className="flex h-3 flex-1 overflow-hidden rounded-full">
                <div className="flex-1 bg-error-400/60" />
                <div className="flex-1 bg-warning-400/70" />
                <div className="flex-1 bg-accent-400/70" />
                <div className="flex-1 bg-brand-400/80" />
                <div className="flex-1 bg-brand-500" />
              </div>
              <span>High</span>
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-500 via-brand-500 to-accent-500 text-white">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Upgrade Opportunity</p>
            </div>
            <h3 className="mt-3 text-xl font-bold">Push Free → Pro</h3>
            <p className="mt-1 text-sm opacity-90">18,420 free users haven&apos;t upgraded. Convert just 3% and unlock +$27k MRR.</p>
            <div className="mt-4 rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Free → Pro conversion</span>
                <span className="font-bold">3% target</span>
              </div>
              <Progress value={2.1} tone="brand" size="lg" className="mt-2 bg-white/20" />
              <p className="mt-2 text-xs opacity-90">Currently at 2.1% — 553 users upgraded this quarter</p>
            </div>
            <Button variant="secondary" size="md" className="mt-4 w-full bg-white text-brand-700 hover:bg-white/90">
              <Zap className="h-4 w-4" /> Launch upgrade campaign
            </Button>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent Subscriptions"
          description="Latest sign-ups, renewals, and plan changes"
          action={<Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>}
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Status</th>
                <th>MRR</th>
                <th>Period</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SUBS.map((s) => (
                <tr key={s.customer}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.customer} size={32} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{s.customer}</span>
                    </div>
                  </td>
                  <td>
                    <Badge tone={s.plan === "Enterprise" ? "warning" : s.plan === "Agency" ? "purple" : s.plan === "Pro" ? "brand" : "gray"} variant="soft">
                      {s.plan}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      tone={s.status === "active" ? "success" : s.status === "trialing" ? "brand" : s.status === "past_due" ? "error" : "gray"}
                      variant="soft"
                      dot
                    >
                      {s.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(s.mrr)}/mo</td>
                  <td className="text-xs text-gray-500 dark:text-gray-400">{s.period}</td>
                  <td className="text-sm text-gray-500 dark:text-gray-400">{s.started}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Net Revenue Retention", value: "112%", delta: "+4pt", deltaCls: "text-success-600 dark:text-success-400", icon: TrendingUp, iconCls: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" },
          { label: "Trial → Paid Conversion", value: "31.4%", delta: "+2.1pt", deltaCls: "text-brand-600 dark:text-brand-400", icon: ArrowUpRight, iconCls: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400" },
          { label: "Logo Churn (Q2)", value: "1.8%", delta: "-0.4pt", deltaCls: "text-success-600 dark:text-success-400", icon: ArrowDownRight, iconCls: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{s.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.iconCls}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xs">
              <span className={`font-semibold ${s.deltaCls}`}>{s.delta}</span>
              <span className="text-gray-500 dark:text-gray-400"> vs last quarter</span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
