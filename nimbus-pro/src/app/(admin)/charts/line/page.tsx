"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS, REVENUE_SERIES, ORDERS_SERIES, VISITORS_SERIES, CONVERSION_SERIES } from "@/data/mock";
import { Download, LineChart as LineChartIcon, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";

type DatasetKey = "revenue" | "orders" | "visitors" | "conversion";

const DATASETS: Record<DatasetKey, { label: string; data: number[]; color: string; formatter: (v: number) => string }> = {
  revenue: { label: "Revenue", data: REVENUE_SERIES.map((p) => p.y), color: "#10b981", formatter: (v) => `$${(v / 1000).toFixed(1)}k` },
  orders: { label: "Orders", data: ORDERS_SERIES, color: "#0ea5e9", formatter: (v) => v.toLocaleString() },
  visitors: { label: "Visitors", data: VISITORS_SERIES, color: "#8b5cf6", formatter: (v) => v.toLocaleString() },
  conversion: { label: "Conversion %", data: CONVERSION_SERIES, color: "#f59e0b", formatter: (v) => `${v}%` },
};

export default function LineChartsPage() {
  const [dataset, setDataset] = useState<DatasetKey>("revenue");
  const [smooth, setSmooth] = useState(true);
  const [range, setRange] = useState<"6m" | "12m" | "ytd">("12m");

  const sliceCount = range === "6m" ? 6 : range === "ytd" ? 9 : 12;
  const active = DATASETS[dataset];
  const labels = useMemo(() => MONTHS.slice(0, sliceCount), [sliceCount]);
  const data = useMemo(() => active.data.slice(0, sliceCount), [active, sliceCount]);

  // V1 — Basic single line
  const basicOptions = {
    ...baseChartOptions("line"),
    colors: [active.color],
    stroke: { curve: smooth ? ("smooth" as const) : ("straight" as const), width: 3 },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => active.formatter(v) } },
    markers: { size: 4, hover: { size: 7 }, colors: [active.color], strokeColors: "#fff", strokeWidth: 2 },
    tooltip: { y: { formatter: (v: number) => active.formatter(v) } },
  };

  // V2 — Multi-line with legend
  const multiOptions = {
    ...baseChartOptions("line"),
    colors: ["#10b981", "#0ea5e9", "#8b5cf6"],
    stroke: { curve: "smooth" as const, width: [3, 3, 2] },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${(v / 1000).toFixed(0)}k` } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true },
  };
  const multiSeries = [
    { name: "Revenue", data: REVENUE_SERIES.slice(0, sliceCount).map((p) => p.y) },
    { name: "Target", data: REVENUE_SERIES.slice(0, sliceCount).map((p) => Math.round(p.y * 0.9)) },
    { name: "Last Year", data: REVENUE_SERIES.slice(0, sliceCount).map((p) => Math.round(p.y * 0.72)) },
  ];

  // V3 — Smooth / dashed comparison
  const dashedOptions = {
    ...baseChartOptions("line"),
    colors: ["#10b981", "#f59e0b"],
    stroke: { curve: "smooth" as const, width: [3, 2.5], dashArray: [0, 6] },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => active.formatter(v) } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 3, hover: { size: 6 } },
    tooltip: { shared: true, y: { formatter: (v: number) => active.formatter(v) } },
  };
  const dashedSeries = [
    { name: "Actual", data },
    { name: "Forecast", data: data.map((v, i) => Math.round(v * (1 + 0.04 * (i + 1)))) },
  ];

  const datasetBtnClass = (key: DatasetKey) =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      dataset === key ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;
  const rangeBtnClass = (r: "6m" | "12m" | "ytd") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Line Charts"
        description="Trend visualization across time with single, multi-series, and dashed forecast variations."
        breadcrumbs={[{ label: "Charts" }, { label: "Line" }]}
        actions={
          <>
            <Button variant="secondary" size="md">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button size="md">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Dataset</span>
          {(Object.keys(DATASETS) as DatasetKey[]).map((k) => (
            <button key={k} onClick={() => setDataset(k)} className={datasetBtnClass(k)}>
              {DATASETS[k].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Range</span>
          {(["6m", "12m", "ytd"] as const).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={rangeBtnClass(r)}>
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSmooth((s) => !s)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Curve: <span className="text-brand-600 dark:text-brand-400">{smooth ? "Smooth" : "Straight"}</span>
        </button>
      </div>

      {/* V1 — Basic line */}
      <Card>
        <CardHeader
          title="Basic Line"
          description={`Single-series trend · ${active.label.toLowerCase()} · ${range}`}
          action={<Badge tone="brand" variant="soft" dot>Single series</Badge>}
        />
        <CardBody>
          <NimbusChart options={basicOptions} series={[{ name: active.label, data }]} type="line" height={320} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* V2 — Multi-line */}
        <Card>
          <CardHeader
            title="Multi-line with Legend"
            description="Revenue vs Target vs Last Year"
            action={<Badge tone="purple" variant="soft">3 series</Badge>}
          />
          <CardBody>
            <NimbusChart options={multiOptions} series={multiSeries} type="line" height={320} />
          </CardBody>
        </Card>

        {/* V3 — Smooth/dashed */}
        <Card>
          <CardHeader
            title="Smooth & Dashed Forecast"
            description="Actual solid vs forecast dashed"
            action={<Badge tone="warning" variant="soft">Forecast</Badge>}
          />
          <CardBody>
            <NimbusChart options={dashedOptions} series={dashedSeries} type="line" height={320} />
          </CardBody>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            <LineChartIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">When to use line charts</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Line charts excel at showing trends over continuous intervals. Use single-line for focus, multi-line for
              comparison, and dashed lines to distinguish actual vs forecast data.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
