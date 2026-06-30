"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { formatCompact } from "@/lib/utils";
import {
  DollarSign, ShoppingCart, Users, TrendingUp, Activity, Clock,
  Zap, Star, Download, RefreshCw, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { useState } from "react";

// 12-week sparkline data per card
const SPARKS: Record<string, number[]> = {
  revenue: [42, 48, 45, 56, 52, 68, 72, 65, 78, 84, 92, 108],
  orders: [180, 220, 195, 240, 215, 280, 295, 270, 320, 345, 360, 410],
  visitors: [1240, 1580, 1380, 1820, 1690, 2140, 2280, 2090, 2480, 2810, 2940, 3210],
  conversion: [2.4, 2.8, 2.6, 3.1, 2.9, 3.4, 3.6, 3.3, 3.8, 4.1, 4.2, 4.6],
  aov: [148, 152, 149, 156, 154, 162, 165, 161, 168, 172, 174, 178],
  refund: [4.2, 3.8, 4.1, 3.6, 3.9, 3.2, 3.0, 3.4, 2.9, 2.6, 2.4, 2.2],
  uptime: [99.2, 99.5, 99.4, 99.7, 99.8, 99.9, 99.9, 99.8, 99.95, 99.97, 99.98, 99.99],
  nps: [42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64],
};

function Sparkline({ data, color, height = 50 }: { data: number[]; color: string; height?: number }) {
  const options = {
    ...baseChartOptions("area"),
    chart: { ...baseChartOptions("area").chart, sparkline: { enabled: true }, animations: { enabled: false } },
    colors: [color],
    stroke: { curve: "smooth" as const, width: 2 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] } },
    grid: { show: false, padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: false },
    legend: { show: false },
    dataLabels: { enabled: false },
  };
  return <NimbusChart options={options} series={[{ name: "spark", data }]} type="area" height={height} />;
}

type ToneKey = "brand" | "success" | "warning" | "error" | "purple" | "pink" | "orange";
const TONE_HEX: Record<ToneKey, string> = {
  brand: "#10b981",
  success: "#12b76a",
  warning: "#f79009",
  error: "#f04438",
  purple: "#9e77ed",
  pink: "#ee46bc",
  orange: "#f97316",
};

interface Kpi {
  key: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  iconTone: ToneKey;
  footer: string;
}

const KPIS: Kpi[] = [
  { key: "revenue", label: "Total Revenue", value: "$1.42M", delta: "+18.2%", deltaTone: "up", icon: DollarSign, iconTone: "brand", footer: "vs last 12 weeks" },
  { key: "orders", label: "Orders", value: "3,824", delta: "+12.4%", deltaTone: "up", icon: ShoppingCart, iconTone: "purple", footer: "vs last 12 weeks" },
  { key: "visitors", label: "Visitors", value: "48,920", delta: "+14.6%", deltaTone: "up", icon: Users, iconTone: "orange", footer: "3.8 per visit" },
  { key: "conversion", label: "Conversion", value: "4.62%", delta: "+0.4pp", deltaTone: "up", icon: TrendingUp, iconTone: "pink", footer: "above target" },
  { key: "aov", label: "Avg. Order Value", value: "$178.42", delta: "-2.4%", deltaTone: "down", icon: Activity, iconTone: "warning", footer: "vs last 12 weeks" },
  { key: "refund", label: "Refund Rate", value: "2.2%", delta: "-0.4pp", deltaTone: "up", icon: RefreshCw, iconTone: "success", footer: "improving" },
  { key: "uptime", label: "Uptime", value: "99.99%", delta: "+0.04pp", deltaTone: "up", icon: Zap, iconTone: "brand", footer: "30d rolling" },
  { key: "nps", label: "NPS Score", value: "+64", delta: "+8", deltaTone: "up", icon: Star, iconTone: "purple", footer: "promoter-heavy" },
];

export default function KpiChartsPage() {
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  const densityBtnClass = (d: "comfortable" | "compact") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      density === d ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  // Aggregate trend (sum of revenue sparkline)
  const revenueSpark = SPARKS.revenue;
  const totalRev = revenueSpark.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="KPI Cards"
        description="Eight StatCard variations with sparklines, deltas, icons, and tone variations."
        breadcrumbs={[{ label: "Charts" }, { label: "KPI" }]}
        actions={
          <>
            <Button variant="secondary" size="md">
              <Clock className="h-4 w-4" /> Last 12 weeks
            </Button>
            <Button size="md">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Density</span>
          <button onClick={() => setDensity("comfortable")} className={densityBtnClass("comfortable")}>Comfortable</button>
          <button onClick={() => setDensity("compact")} className={densityBtnClass("compact")}>Compact</button>
        </div>
        <Badge tone="brand" variant="soft" dot>{KPIS.length} KPIs tracked</Badge>
      </div>

      {/* 8 StatCards with sparklines */}
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${density === "compact" ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}>
        {KPIS.map((kpi) => {
          const data = SPARKS[kpi.key];
          const color = TONE_HEX[kpi.iconTone];
          const DeltaIcon = kpi.deltaTone === "up" ? ArrowUpRight : kpi.deltaTone === "down" ? ArrowDownRight : null;
          return (
            <Card key={kpi.key} hover className={density === "compact" ? "p-4" : "p-5"}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{kpi.value}</p>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                    color: color,
                  }}
                >
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="-mx-2 -mb-1 mt-2">
                <Sparkline data={data} color={color} height={56} />
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold"
                  style={{
                    backgroundColor: kpi.deltaTone === "up" ? "color-mix(in srgb, #12b76a 14%, transparent)" : kpi.deltaTone === "down" ? "color-mix(in srgb, #f04438 14%, transparent)" : "color-mix(in srgb, #64748b 14%, transparent)",
                    color: kpi.deltaTone === "up" ? "#039855" : kpi.deltaTone === "down" ? "#d92d20" : "#475569",
                  }}
                >
                  {DeltaIcon && <DeltaIcon className="h-3 w-3" />}
                  {kpi.delta}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{kpi.footer}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Combined trend with all sparklines */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue Trend"
            description="12-week aggregate revenue trajectory"
            action={<Badge tone="success" dot>Upward</Badge>}
          />
          <CardBody>
            <NimbusChart
              options={{
                ...baseChartOptions("area"),
                colors: ["#10b981"],
                stroke: { curve: "smooth" as const, width: 3 },
                fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
                xaxis: {
                  categories: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                },
                yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v * 1000)}` } },
                markers: { size: 4, hover: { size: 7 } },
                tooltip: { y: { formatter: (v: number) => `$${(v * 1000).toLocaleString()}` } },
              }}
              series={[{ name: "Revenue", data: revenueSpark }]}
              type="area"
              height={300}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Sparkline Legend" description="Color mapping per KPI" />
          <CardBody className="space-y-3">
            {KPIS.slice(0, 6).map((kpi) => (
              <div key={kpi.key} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TONE_HEX[kpi.iconTone] }} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{kpi.label}</p>
                  <p className="text-[11px] text-gray-400">{kpi.footer}</p>
                </div>
                <div className="w-20">
                  <Sparkline data={SPARKS[kpi.key]} color={TONE_HEX[kpi.iconTone]} height={28} />
                </div>
                <span className="w-12 text-right text-xs font-semibold text-gray-900 dark:text-white">{kpi.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Activity className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {KPIS.length} KPIs tracked · {KPIS.filter((k) => k.deltaTone === "up").length} improving
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Aggregate revenue across the last 12 weeks is <span className="font-semibold text-brand-600 dark:text-brand-400">${(totalRev * 1000).toLocaleString()}</span>.
              Sparklines keep context tight — every card has 12 weeks of trend at a glance.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
