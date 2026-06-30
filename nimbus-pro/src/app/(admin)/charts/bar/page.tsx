"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS, ORDERS_SERIES, SALES_BY_CATEGORY } from "@/data/mock";
import { formatCompact, formatCurrency } from "@/lib/utils";
import { Download, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function BarChartsPage() {
  const [dataset, setDataset] = useState<"orders" | "categories">("orders");
  const [range, setRange] = useState<"6m" | "12m">("12m");

  const sliceCount = range === "6m" ? 6 : 12;
  const labels = MONTHS.slice(0, sliceCount);
  const ordersData = ORDERS_SERIES.slice(0, sliceCount);
  const categories = SALES_BY_CATEGORY;
  const isOrders = dataset === "orders";

  // V1 — Vertical bars
  const verticalOptions = {
    ...baseChartOptions("bar"),
    colors: isOrders ? ["#10b981"] : ["#8b5cf6"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%", endingShape: "rounded" } },
    xaxis: isOrders
      ? { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } }
      : { categories: categories.map((c) => c.category), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: {
      labels: {
        formatter: (v: number) => (isOrders ? formatCompact(v) : `$${formatCompact(v)}`),
      },
    },
    tooltip: {
      y: {
        formatter: (v: number) => (isOrders ? `${v} orders` : formatCurrency(v)),
      },
    },
  };
  const verticalSeries = [
    {
      name: isOrders ? "Orders" : "Sales",
      data: isOrders ? ordersData : categories.map((c) => c.sales),
    },
  ];

  // V2 — Horizontal bars
  const horizontalOptions = {
    ...baseChartOptions("bar"),
    colors: ["#0ea5e9"],
    plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: "60%", endingShape: "rounded" } },
    xaxis: { categories: categories.map((c) => c.category), axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
    grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
  };
  const horizontalSeries = [{ name: "Sales", data: categories.map((c) => c.sales) }];

  // V3 — Stacked bars (channel split)
  const stackedOptions = {
    ...baseChartOptions("bar"),
    colors: ["#10b981", "#0ea5e9", "#8b5cf6"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%", endingShape: "rounded" } },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    tooltip: { shared: true, y: { formatter: (v: number) => `${v} orders` } },
  };
  const stackedSeries = [
    { name: "Web", data: ordersData.map((v) => Math.round(v * 0.62)) },
    { name: "Mobile", data: ordersData.map((v) => Math.round(v * 0.28)) },
    { name: "POS", data: ordersData.map((v) => Math.round(v * 0.1)) },
  ];

  const datasetBtnClass = (k: "orders" | "categories") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      dataset === k ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;
  const rangeBtnClass = (r: "6m" | "12m") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  const topCategory = [...categories].sort((a, b) => b.growth - a.growth)[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bar Charts"
        description="Compare quantities across categories with vertical, horizontal, and stacked variations."
        breadcrumbs={[{ label: "Charts" }, { label: "Bar" }]}
        actions={
          <Button size="md">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Dataset</span>
          <button onClick={() => setDataset("orders")} className={datasetBtnClass("orders")}>Orders</button>
          <button onClick={() => setDataset("categories")} className={datasetBtnClass("categories")}>Categories</button>
        </div>
        {isOrders && (
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
            <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Range</span>
            {(["6m", "12m"] as const).map((r) => (
              <button key={r} onClick={() => setRange(r)} className={rangeBtnClass(r)}>{r}</button>
            ))}
          </div>
        )}
      </div>

      {/* V1 — Vertical bars */}
      <Card>
        <CardHeader
          title="Vertical Bars"
          description={isOrders ? "Monthly orders volume" : "Sales by category"}
          action={<Badge tone="brand" variant="soft" dot>{isOrders ? "Orders" : "Sales"}</Badge>}
        />
        <CardBody>
          <NimbusChart options={verticalOptions} series={verticalSeries} type="bar" height={320} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* V2 — Horizontal bars */}
        <Card>
          <CardHeader
            title="Horizontal Bars"
            description="Sales by category — easier label reading"
            action={<Badge tone="purple" variant="soft">Horizontal</Badge>}
          />
          <CardBody>
            <NimbusChart options={horizontalOptions} series={horizontalSeries} type="bar" height={320} />
          </CardBody>
        </Card>

        {/* V3 — Stacked bars */}
        <Card>
          <CardHeader
            title="Stacked Bars"
            description="Orders by channel"
            action={<Badge tone="warning" variant="soft">3 channels</Badge>}
          />
          <CardBody>
            <NimbusChart options={stackedOptions} series={stackedSeries} type="bar" height={320} />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 3).map((c) => (
          <Card key={c.category} hover className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{c.category}</p>
                <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(c.sales)}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.growth >= 0 ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400"}`}>
                {c.growth >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold ${c.growth >= 0 ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400" : "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400"}`}>
                {c.growth >= 0 ? "+" : ""}{c.growth}%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs last quarter</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Top performer: <span className="text-brand-600 dark:text-brand-400">{topCategory.category}</span> grew {topCategory.growth}% this quarter
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Use vertical bars for time series, horizontal for long category labels, and stacked to show composition.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
