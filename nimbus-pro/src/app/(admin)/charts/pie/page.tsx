"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { TRAFFIC_SOURCES } from "@/data/mock";
import { Download, PieChart as PieChartIcon, Donut } from "lucide-react";
import { useState } from "react";

type Variant = "pie" | "donut" | "mono";

export default function PieChartsPage() {
  const [variant, setVariant] = useState<Variant>("donut");
  const [showLabels, setShowLabels] = useState(true);

  const labels = TRAFFIC_SOURCES.map((t) => t.name);
  const values = TRAFFIC_SOURCES.map((t) => t.value);
  const colors = TRAFFIC_SOURCES.map((t) => t.color);

  // V1 — Basic pie
  const pieOptions = {
    ...baseChartOptions("pie"),
    labels,
    colors,
    legend: { show: showLabels, position: "bottom" as const, fontSize: "12px" },
    dataLabels: { enabled: showLabels, formatter: (v: number) => `${v.toFixed(0)}%` },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
    stroke: { width: 2, colors: ["#ffffff"] },
  };

  // V2 — Donut with center label
  const donutOptions = {
    ...baseChartOptions("donut"),
    labels,
    colors,
    legend: { show: showLabels, position: "bottom" as const, fontSize: "12px" },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: { show: true, fontSize: "13px", color: "#64748b", offsetY: -8 },
            value: {
              show: true,
              fontSize: "26px",
              fontWeight: 700,
              color: "#0f172a",
              offsetY: 6,
              formatter: () => "100%",
            },
            total: {
              show: true,
              label: "Total traffic",
              fontSize: "13px",
              color: "#64748b",
              fontWeight: 500,
              formatter: () => "100%",
            },
          },
        },
      },
    },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  // V3 — Monochrome pie (shades of brand)
  const monoShades = ["#064e3b", "#047857", "#10b981", "#34d399", "#a7f3d0"];
  const monoOptions = {
    ...baseChartOptions("pie"),
    labels,
    colors: monoShades,
    legend: { show: showLabels, position: "bottom" as const, fontSize: "12px" },
    dataLabels: { enabled: showLabels, formatter: (v: number) => `${v.toFixed(0)}%`, style: { colors: ["#fff"] } },
    stroke: { width: 2, colors: ["#ffffff"] },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  const variantOptions =
    variant === "pie" ? pieOptions : variant === "donut" ? donutOptions : monoOptions;
  const chartType = variant === "pie" ? "pie" : "donut";

  const variantBtnClass = (v: Variant) =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      variant === v ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  const topSource = TRAFFIC_SOURCES[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pie & Doughnut Charts"
        description="Composition and proportion with pie, donut (center label), and monochrome variations."
        breadcrumbs={[{ label: "Charts" }, { label: "Pie" }]}
        actions={
          <Button size="md">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Variant</span>
          {(["pie", "donut", "mono"] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={variantBtnClass(v)}>
              {v === "pie" ? "Pie" : v === "donut" ? "Donut" : "Monochrome"}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowLabels((s) => !s)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Labels: <span className="text-brand-600 dark:text-brand-400">{showLabels ? "On" : "Off"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Main chart */}
        <Card className="lg:col-span-3">
          <CardHeader
            title={variant === "pie" ? "Basic Pie" : variant === "donut" ? "Donut with Center Label" : "Monochrome Pie"}
            description="Traffic sources distribution"
            action={<Badge tone="brand" variant="soft" dot>{TRAFFIC_SOURCES.length} sources</Badge>}
          />
          <CardBody>
            <NimbusChart options={variantOptions} series={values} type={chartType as "pie" | "donut"} height={360} />
          </CardBody>
        </Card>

        {/* Legend breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader title="Breakdown" description="Channel distribution detail" />
          <CardBody className="space-y-3">
            {TRAFFIC_SOURCES.map((s) => {
              const pct = s.value;
              return (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full rounded-full" style={{ width: `${pct * 2}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              );
            })}
            <div className="mt-4 rounded-xl bg-brand-50 p-4 dark:bg-brand-500/10">
              <p className="text-xs text-brand-700 dark:text-brand-300">Top channel</p>
              <p className="mt-1 text-lg font-bold text-brand-700 dark:text-brand-300">{topSource.name} · {topSource.value}%</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Side-by-side all three variations */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Pie" description="Solid pie with labels" />
          <CardBody>
            <NimbusChart options={pieOptions} series={values} type="pie" height={260} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Donut" description="Donut with center total" />
          <CardBody>
            <NimbusChart options={donutOptions} series={values} type="donut" height={260} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Monochrome" description="Single-hue shades" />
          <CardBody>
            <NimbusChart options={monoOptions} series={values} type="pie" height={260} />
          </CardBody>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-500/10 dark:to-purple-500/10">
        <CardBody className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500 text-white">
            <PieChartIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Proportions at a glance</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Pie and donut charts work best with 3–6 categories. Donut centers can display totals; monochrome palettes
              keep the eye on the largest slice.
            </p>
          </div>
          <Donut className="hidden h-8 w-8 text-pink-300 sm:block" />
        </CardBody>
      </Card>
    </div>
  );
}
