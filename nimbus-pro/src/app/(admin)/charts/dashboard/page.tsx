"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions, PALETTE } from "@/components/charts/NimbusChart";
import {
  MONTHS, REVENUE_SERIES, ORDERS_SERIES, VISITORS_SERIES, CONVERSION_SERIES,
  TRAFFIC_SOURCES, SALES_BY_CATEGORY,
} from "@/data/mock";
import { formatCompact, formatCurrency } from "@/lib/utils";
import {
  DollarSign, ShoppingCart, Users, TrendingUp, Download, Filter,
  Activity, Cpu, Star,
} from "lucide-react";
import { useState } from "react";

// Heatmap data — weeks × days
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function buildHeatmap() {
  const series: { name: string; data: { x: string; y: number }[] }[] = [];
  let seed = 13;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let w = 0; w < 5; w++) {
    const data = HEATMAP_DAYS.map((d) => ({
      x: d,
      y: Math.round(20 + rand() * 180),
    }));
    series.push({ name: `W${w + 1}`, data });
  }
  return series;
}

export default function ChartDashboardPage() {
  const [range, setRange] = useState<"7d" | "30d" | "12m">("12m");

  // 1. Revenue area
  const revenueOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981", "#0ea5e9"],
    stroke: { curve: "smooth" as const, width: [3, 2.5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true },
  };
  const revenueSeries = [
    { name: "Revenue", data: REVENUE_SERIES.map((p) => p.y) },
    { name: "Target", data: REVENUE_SERIES.map((p) => Math.round(p.y * 0.9)) },
  ];

  // 2. Orders bar
  const ordersOptions = {
    ...baseChartOptions("bar"),
    colors: ["#8b5cf6"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%", endingShape: "rounded" } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
  };

  // 3. Conversion line
  const conversionOptions = {
    ...baseChartOptions("line"),
    colors: ["#f59e0b"],
    stroke: { curve: "smooth" as const, width: 3 },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}%` } },
    markers: { size: 4, hover: { size: 7 } },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  // 4. Traffic donut
  const trafficOptions = {
    ...baseChartOptions("donut"),
    labels: TRAFFIC_SOURCES.map((t) => t.name),
    colors: TRAFFIC_SOURCES.map((t) => t.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total", formatter: () => "100%" } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  // 5. Category polarArea
  const polarOptions = {
    ...baseChartOptions("polarArea"),
    labels: SALES_BY_CATEGORY.map((c) => c.category),
    colors: PALETTE,
    stroke: { width: 1, colors: ["#fff"] },
    fill: { opacity: 0.78 },
    legend: { show: false },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
  };

  // 6. Device radialBar
  const radialOptions = {
    ...baseChartOptions("radialBar"),
    labels: ["Desktop", "Mobile", "Tablet"],
    colors: ["#10b981", "#0ea5e9", "#8b5cf6"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "35%" },
        track: { background: "#e2e8f0", strokeWidth: "100%", margin: 8 },
        dataLabels: {
          name: { fontSize: "12px", color: "#64748b", offsetY: 60 },
          value: { fontSize: "20px", fontWeight: 700, color: "#0f172a", offsetY: 20 },
        },
      },
    },
    legend: { show: false },
    stroke: { lineCap: "round" as const },
  };

  // 7. Visitors vs PageViews multi-line
  const visitorsOptions = {
    ...baseChartOptions("line"),
    colors: ["#10b981", "#f43f5e"],
    stroke: { curve: "smooth" as const, width: [3, 2.5], dashArray: [0, 5] },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true },
  };
  const visitorsSeries = [
    { name: "Visitors", data: VISITORS_SERIES },
    { name: "Page Views", data: VISITORS_SERIES.map((v) => Math.round(v * 2.4)) },
  ];

  // 8. Activity heatmap
  const heatmapOptions = {
    ...baseChartOptions("heatmap"),
    colors: ["#10b981"],
    plotOptions: {
      heatmap: {
        radius: 4,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 50, name: "low", color: "#ccfbef" },
            { from: 51, to: 100, name: "med", color: "#4fdabd" },
            { from: 101, to: 150, name: "high", color: "#10b981" },
            { from: 151, to: 250, name: "peak", color: "#047857" },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    xaxis: { type: "category" as const },
    legend: { show: false },
    grid: { padding: { right: 20 } },
  };
  const heatmapSeries = buildHeatmap();

  const rangeBtnClass = (r: "7d" | "30d" | "12m") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Charts Dashboard"
        description="Eight chart types in one composite analytics overview — area, bar, line, donut, polar, radial, multi-line, heatmap."
        breadcrumbs={[{ label: "Charts" }, { label: "Dashboard" }]}
        actions={
          <>
            <Button variant="secondary" size="md">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button size="md">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value="$1.42M" delta="+18.2%" deltaTone="up" icon={DollarSign} iconTone="brand" footer="vs last year" />
        <StatCard label="Orders" value="3,824" delta="+12.4%" deltaTone="up" icon={ShoppingCart} iconTone="purple" footer="vs last year" />
        <StatCard label="Visitors" value="48,920" delta="+14.6%" deltaTone="up" icon={Users} iconTone="orange" footer="3.8 per visit" />
        <StatCard label="Conversion" value="4.6%" delta="+0.4pp" deltaTone="up" icon={TrendingUp} iconTone="pink" footer="above target" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Range</span>
          {(["7d", "30d", "12m"] as const).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={rangeBtnClass(r)}>{r}</button>
          ))}
        </div>
        <Badge tone="brand" variant="soft" dot>{range} · live snapshot</Badge>
      </div>

      {/* Row 1 — Revenue (2/3) + Traffic (1/3) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue vs Target" description="Monthly revenue against plan" action={<Badge tone="success" variant="soft" dot>+18.2%</Badge>} />
          <CardBody>
            <NimbusChart options={revenueOptions} series={revenueSeries} type="area" height={300} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Traffic Sources" description="Channel split" />
          <CardBody>
            <NimbusChart options={trafficOptions} series={TRAFFIC_SOURCES.map((t) => t.value)} type="donut" height={300} />
          </CardBody>
        </Card>
      </div>

      {/* Row 2 — Orders (1/2) + Visitors multi-line (1/2) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Orders Volume" description="Monthly orders" action={<Badge tone="purple" variant="soft">Bars</Badge>} />
          <CardBody>
            <NimbusChart options={ordersOptions} series={[{ name: "Orders", data: ORDERS_SERIES }]} type="bar" height={280} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Visitors vs Page Views" description="Multi-line with dashed comparison" action={<Badge tone="brand" variant="soft">Lines</Badge>} />
          <CardBody>
            <NimbusChart options={visitorsOptions} series={visitorsSeries} type="line" height={280} />
          </CardBody>
        </Card>
      </div>

      {/* Row 3 — Conversion line + Polar area + Radial */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Conversion Rate" description="Monthly CVR %" action={<Badge tone="warning" variant="soft">Line</Badge>} />
          <CardBody>
            <NimbusChart options={conversionOptions} series={[{ name: "CVR", data: CONVERSION_SERIES }]} type="line" height={260} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Sales by Category" description="Polar area" action={<Badge tone="purple" variant="soft">Polar</Badge>} />
          <CardBody>
            <NimbusChart options={polarOptions} series={SALES_BY_CATEGORY.map((c) => c.sales)} type="polarArea" height={260} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Devices" description="Radial gauges" action={<Badge tone="brand" variant="soft">Radial</Badge>} />
          <CardBody>
            <NimbusChart options={radialOptions} series={[58, 34, 8]} type="radialBar" height={260} />
          </CardBody>
        </Card>
      </div>

      {/* Row 4 — Heatmap */}
      <Card>
        <CardHeader
          title="Activity Heatmap"
          description="Sessions by week × day of week (last 5 weeks)"
          action={<Badge tone="success" variant="soft" dot>4 intensity bands</Badge>}
        />
        <CardBody>
          <NimbusChart options={heatmapOptions} series={heatmapSeries} type="heatmap" height={260} />
          <div className="mt-3 flex items-center justify-end gap-3 text-[11px] text-gray-500 dark:text-gray-400">
            <span>Low</span>
            <span className="h-3 w-3 rounded" style={{ backgroundColor: "#ccfbef" }} />
            <span className="h-3 w-3 rounded" style={{ backgroundColor: "#4fdabd" }} />
            <span className="h-3 w-3 rounded" style={{ backgroundColor: "#10b981" }} />
            <span className="h-3 w-3 rounded" style={{ backgroundColor: "#047857" }} />
            <span>Peak</span>
          </div>
        </CardBody>
      </Card>

      {/* Footer summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">8 chart types</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">All ApexCharts primitives</p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Theme-aware</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Light + dark ready</p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-warning-50 dark:from-orange-500/10 dark:to-warning-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Production-ready</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Drop-in for analytics</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
