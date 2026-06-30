"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { formatCurrency, formatCompact, formatNumber } from "@/lib/utils";
import {
  Cpu, Coins, Gauge, DollarSign, Plus, Download, ArrowUpRight, Sparkles, Zap,
  Activity, Brain, CheckCircle2, AlertCircle, TrendingUp, Bot
} from "lucide-react";

// 30-day request series with spikes
const REQUESTS_30D = [
  420, 482, 510, 478, 522, 580, 612, 540, 498, 530,
  620, 740, 880, 720, 610, 540, 588, 642, 720, 920,
  1080, 880, 690, 612, 690, 760, 820, 690, 740, 920,
];
const DAYS = Array.from({ length: 30 }, (_, i) => `D${i + 1}`);

const MODEL_USAGE = [
  { name: "GPT-4o", value: 42, color: "#10b981", tokens: 184_000_000 },
  { name: "Claude 3.5", value: 28, color: "#8b5cf6", tokens: 122_000_000 },
  { name: "Llama 3.1", value: 22, color: "#0ea5e9", tokens: 96_000_000 },
  { name: "Custom", value: 8, color: "#f59e0b", tokens: 35_000_000 },
];

const RECENT_REQUESTS = [
  { id: "req_8j2k4", user: "Priya Iyer", model: "GPT-4o", tokens: 2840, latency: 842, cost: 0.085, status: "success" },
  { id: "req_8j2k3", user: "Marcus Chen", model: "Claude 3.5", tokens: 1820, latency: 628, cost: 0.026, status: "success" },
  { id: "req_8j2k2", user: "Sofia García", model: "GPT-4o", tokens: 8420, latency: 1240, cost: 0.252, status: "success" },
  { id: "req_8j2k1", user: "Yuki Tanaka", model: "Llama 3.1", tokens: 1280, latency: 412, cost: 0.004, status: "success" },
  { id: "req_8j2k0", user: "Aaroh Sharma", model: "Custom", tokens: 620, latency: 380, cost: 0.001, status: "failed" },
  { id: "req_8j2j9", user: "Fatima Al-Rashid", model: "Claude 3.5", tokens: 3420, latency: 920, cost: 0.048, status: "success" },
  { id: "req_8j2j8", user: "Ethan Wright", model: "GPT-4o", tokens: 5640, latency: 1480, cost: 0.169, status: "success" },
  { id: "req_8j2j7", user: "Leo Romano", model: "Llama 3.1", tokens: 920, latency: 286, cost: 0.003, status: "success" },
];

const SPARKLINE_DATA = [42, 48, 44, 52, 58, 54, 62, 68, 64, 72, 78, 74, 82, 88, 92];

export default function AIDashboard() {
  const requestsOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981"],
    stroke: { curve: "smooth", width: 2.5 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    xaxis: { categories: DAYS, axisBorder: { show: false }, axisTicks: { show: false }, labels: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
    annotations: {
      points: [
        { x: "D21", y: 1080, marker: { size: 6, fillColor: "#f59e0b", strokeColor: "#fff", strokeWidth: 2 }, label: { text: "Launch spike", style: { color: "#fff", background: "#f59e0b" } } },
        { x: "D13", y: 880, marker: { size: 6, fillColor: "#f43f5e", strokeColor: "#fff", strokeWidth: 2 }, label: { text: "Marketing push", style: { color: "#fff", background: "#f43f5e" } } },
      ],
    },
    markers: { size: 0, hover: { size: 5 } },
    tooltip: { y: { formatter: (v: number) => `${formatNumber(v)} requests` } },
  };

  const modelUsageOptions = {
    ...baseChartOptions("donut"),
    labels: MODEL_USAGE.map((m) => m.name),
    colors: MODEL_USAGE.map((m) => m.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total Tokens", formatter: () => `${formatCompact(MODEL_USAGE.reduce((s, m) => s + m.tokens, 0))}` } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}% of calls` } },
  };

  const sparkOptions = {
    ...baseChartOptions("area"),
    chart: { ...baseChartOptions("area").chart, sparkline: { enabled: true }, animations: { enabled: false } },
    colors: ["#ffffff"],
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1, stops: [0, 100] } },
    tooltip: { theme: "dark" as const, x: { show: false } },
    grid: { show: false },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Dashboard"
        description="Model usage, token consumption, latency, and cost intelligence."
        breadcrumbs={[{ label: "Dashboards" }, { label: "AI" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Endpoint</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Requests" value="1.84M" delta="+24.8%" deltaTone="up" icon={Cpu} iconTone="brand" footer="last 30 days" />
        <StatCard label="Tokens Used" value="437M" delta="+18.2%" deltaTone="up" icon={Coins} iconTone="purple" footer="input + output" />
        <StatCard label="Avg. Latency" value="742ms" delta="-48ms" deltaTone="up" icon={Gauge} iconTone="orange" footer="p50 latency" />
        <StatCard label="Monthly Cost" value="$8,420" delta="+6.4%" deltaTone="down" icon={DollarSign} iconTone="pink" footer="across all models" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="AI Requests — Last 30 Days"
            description="Daily request volume with annotated spike events"
            action={<Badge tone="brand" dot>+24.8% MoM</Badge>}
          />
          <CardBody>
            <NimbusChart options={requestsOptions} series={[{ name: "Requests", data: REQUESTS_30D }]} type="area" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Model Usage" description="Calls & token distribution" />
          <CardBody>
            <NimbusChart options={modelUsageOptions} series={MODEL_USAGE.map((m) => m.value)} type="donut" height={240} />
            <div className="mt-4 space-y-2">
              {MODEL_USAGE.map((m) => (
                <div key={m.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                  <span className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                    {m.name}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{m.value}%</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{formatCompact(m.tokens)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Top Prompt", value: "Summarize ticket", sub: "used 14,820 times", icon: Brain, iconCls: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" },
          { label: "Avg Confidence", value: "94.2%", sub: "+2.1% vs last week", icon: CheckCircle2, iconCls: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400" },
          { label: "Error Rate", value: "1.8%", sub: "-0.4% improvement", icon: AlertCircle, iconCls: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
          { label: "Cache Hit Rate", value: "62.4%", sub: "$1,820 saved", icon: Zap, iconCls: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400" },
        ].map((c) => (
          <Card key={c.label} className="p-5" hover>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{c.label}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.iconCls}`}>
                <c.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{c.value}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{c.sub}</p>
          </Card>
        ))}
      </div>

      {/* AI Insights — distinctly AI-themed gradient card */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-brand-600 to-accent-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">AI Insights</p>
              <Badge className="bg-white/20 text-white">Live</Badge>
            </div>
            <h3 className="mt-4 text-2xl font-bold">Cache hit rate could save you $4,820/mo</h3>
            <p className="mt-2 text-sm opacity-90">
              Routing 38% of repeat GPT-4o calls through the semantic cache would reduce your monthly bill by ~57%.
              Detected 4 prompt patterns responsible for 62% of total cost.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="bg-white text-purple-700 hover:bg-white/90">
                <Zap className="h-3.5 w-3.5" /> Apply suggestion
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Dismiss</Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-90">Cost trajectory (15d)</p>
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="mt-2">
                <NimbusChart options={sparkOptions} series={[{ name: "Cost", data: SPARKLINE_DATA }]} type="area" height={90} />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="opacity-90">Projected next week</span>
                <span className="font-bold">$2,180</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent AI Requests"
          description="Latest model invocations across the platform"
          action={
            <div className="flex items-center gap-2">
              <Badge tone="brand" variant="soft"><Activity className="h-3 w-3" /> Live tail</Badge>
              <Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Model</th>
                <th>Tokens</th>
                <th>Latency</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_REQUESTS.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{r.id}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.user} size={28} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{r.user}</span>
                    </div>
                  </td>
                  <td>
                    <Badge tone={r.model === "GPT-4o" ? "brand" : r.model === "Claude 3.5" ? "purple" : r.model === "Llama 3.1" ? "gray" : "warning"} variant="soft">
                      <Bot className="h-3 w-3" /> {r.model}
                    </Badge>
                  </td>
                  <td className="text-sm text-gray-700 dark:text-gray-300">{formatNumber(r.tokens)}</td>
                  <td className="text-sm text-gray-700 dark:text-gray-300">{r.latency}ms</td>
                  <td className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(r.cost)}</td>
                  <td>
                    <Badge tone={r.status === "success" ? "success" : "error"} variant="soft" dot>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
