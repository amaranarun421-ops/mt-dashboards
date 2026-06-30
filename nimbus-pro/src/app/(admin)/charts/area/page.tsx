"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS, REVENUE_SERIES, VISITORS_SERIES } from "@/data/mock";
import { formatCompact } from "@/lib/utils";
import { Download, AreaChart as AreaChartIcon, Layers } from "lucide-react";
import { useState } from "react";

export default function AreaChartsPage() {
  const [seriesKey, setSeriesKey] = useState<"revenue" | "visitors">("revenue");
  const [range, setRange] = useState<"6m" | "12m" | "ytd">("12m");

  const sliceCount = range === "6m" ? 6 : range === "ytd" ? 9 : 12;
  const labels = MONTHS.slice(0, sliceCount);
  const primaryData = REVENUE_SERIES.slice(0, sliceCount).map((p) => p.y);
  const visitorData = VISITORS_SERIES.slice(0, sliceCount);
  const isRevenue = seriesKey === "revenue";
  const mainData = isRevenue ? primaryData : visitorData;
  const fmt = (v: number) => (isRevenue ? `$${formatCompact(v)}` : formatCompact(v));

  // V1 — Basic area
  const basicOptions = {
    ...baseChartOptions("area"),
    colors: [isRevenue ? "#10b981" : "#8b5cf6"],
    stroke: { curve: "smooth" as const, width: 3 },
    fill: { type: "solid", opacity: [0.18] },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => fmt(v) } },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { y: { formatter: (v: number) => fmt(v) } },
  };

  // V2 — Gradient area
  const gradientOptions = {
    ...baseChartOptions("area"),
    colors: [isRevenue ? "#10b981" : "#8b5cf6", "#0ea5e9"],
    stroke: { curve: "smooth" as const, width: [3, 2.5] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: [0.45, 0.25], opacityTo: [0.05, 0.02], stops: [0, 100] },
    },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => fmt(v) } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true, y: { formatter: (v: number) => fmt(v) } },
  };
  const gradientSeries = [
    { name: isRevenue ? "Revenue" : "Visitors", data: mainData },
    { name: "Trend", data: mainData.map((v, i) => Math.round(v * (0.85 + 0.025 * i))) },
  ];

  // V3 — Stacked area
  const stackedOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b"],
    stroke: { curve: "smooth" as const, width: 1.5 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.25, stops: [0, 100] },
    },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    dataLabels: { enabled: false },
    tooltip: { shared: true, y: { formatter: (v: number) => `$${formatCompact(v)}` } },
  };
  const stackedSeries = [
    { name: "Subscription", data: primaryData.map((v) => Math.round(v * 0.5)) },
    { name: "One-time", data: primaryData.map((v) => Math.round(v * 0.3)) },
    { name: "Services", data: primaryData.map((v) => Math.round(v * 0.15)) },
    { name: "Other", data: primaryData.map((v) => Math.round(v * 0.05)) },
  ];

  const seriesBtnClass = (k: "revenue" | "visitors") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      seriesKey === k ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;
  const rangeBtnClass = (r: "6m" | "12m" | "ytd") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Area Charts"
        description="Cumulative volume and trends with solid, gradient, and stacked variations."
        breadcrumbs={[{ label: "Charts" }, { label: "Area" }]}
        actions={
          <Button size="md">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Source</span>
          <button onClick={() => setSeriesKey("revenue")} className={seriesBtnClass("revenue")}>Revenue</button>
          <button onClick={() => setSeriesKey("visitors")} className={seriesBtnClass("visitors")}>Visitors</button>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Range</span>
          {(["6m", "12m", "ytd"] as const).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={rangeBtnClass(r)}>{r}</button>
          ))}
        </div>
      </div>

      {/* V1 — Basic area */}
      <Card>
        <CardHeader
          title="Basic Area"
          description={`Solid fill · ${seriesKey}`}
          action={<Badge tone="brand" variant="soft" dot>Single series</Badge>}
        />
        <CardBody>
          <NimbusChart
            options={basicOptions}
            series={[{ name: seriesKey === "revenue" ? "Revenue" : "Visitors", data: mainData }]}
            type="area"
            height={320}
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* V2 — Gradient area */}
        <Card>
          <CardHeader
            title="Gradient Area"
            description="Actual vs smoothed trend"
            action={<Badge tone="purple" variant="soft">Multi-series</Badge>}
          />
          <CardBody>
            <NimbusChart options={gradientOptions} series={gradientSeries} type="area" height={320} />
          </CardBody>
        </Card>

        {/* V3 — Stacked area */}
        <Card>
          <CardHeader
            title="Stacked Area"
            description="Revenue split by stream"
            action={<Badge tone="warning" variant="soft">Stacked</Badge>}
          />
          <CardBody>
            <NimbusChart options={stackedOptions} series={stackedSeries} type="area" height={320} />
          </CardBody>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-brand-50 dark:from-purple-500/10 dark:to-brand-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white">
            <Layers className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Area vs line, when to choose</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Use area charts when cumulative volume matters more than precise values. Gradients add depth without
              noise; stacked areas reveal composition over time.
            </p>
          </div>
          <AreaChartIcon className="hidden h-8 w-8 text-purple-300 sm:block" />
        </CardBody>
      </Card>
    </div>
  );
}
