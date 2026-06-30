"use client";
import { Card, CardHeader, CardBody, PageHeader, Badge, Button } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { Download, Radar as RadarIcon, Gauge, Target } from "lucide-react";
import { useState } from "react";

const SKILL_CATEGORIES = ["Speed", "Quality", "Communication", "Reliability", "Innovation", "Teamwork"];

export default function RadarChartsPage() {
  const [activeTeam, setActiveTeam] = useState<"priya" | "marcus" | "sofia">("priya");

  // V1 — Multi-series radar (skill assessments across team members)
  const radarOptions = {
    ...baseChartOptions("radar"),
    colors: ["#10b981", "#0ea5e9", "#8b5cf6"],
    stroke: { width: 2 },
    fill: { opacity: [0.2, 0.2, 0.2] },
    xaxis: {
      categories: SKILL_CATEGORIES,
      labels: { style: { fontSize: "12px", fontWeight: 500 } },
    },
    yaxis: { show: false, max: 100, min: 0 },
    legend: { show: true, position: "top" as const, horizontalAlign: "right" as const },
    markers: { size: 4, hover: { size: 6 } },
    tooltip: { y: { formatter: (v: number) => `${v}/100` } },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#e2e8f0",
          connectorColors: "#e2e8f0",
        },
      },
    },
  };
  const radarSeries = [
    { name: "Priya Iyer", data: [88, 92, 78, 95, 82, 90] },
    { name: "Marcus Chen", data: [76, 85, 88, 72, 90, 80] },
    { name: "Sofia García", data: [82, 78, 92, 88, 75, 94] },
  ];

  // V2 — Single radialBar (one big KPI gauge)
  const singleRadialOptions = {
    ...baseChartOptions("radialBar"),
    labels: ["Goal Completion"],
    colors: ["#10b981"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "55%" },
        track: { background: "#e2e8f0", strokeWidth: "100%", margin: 8 },
        dataLabels: {
          name: { fontSize: "13px", color: "#64748b", offsetY: 70 },
          value: { fontSize: "36px", fontWeight: 700, color: "#0f172a", offsetY: 20 },
        },
      },
    },
    legend: { show: false },
    stroke: { lineCap: "round" as const },
    fill: {
      type: "gradient",
      gradient: { shade: "dark", type: "horizontal", gradientToColors: ["#34d399"], stops: [0, 100] },
    },
  };

  // V3 — Multi radialBar (several KPIs)
  const multiRadialOptions = {
    ...baseChartOptions("radialBar"),
    labels: ["CPU", "Memory", "Disk", "Network"],
    colors: ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "32%" },
        track: { background: "#e2e8f0", strokeWidth: "100%", margin: 8 },
        dataLabels: {
          name: { fontSize: "13px", color: "#64748b", offsetY: 60 },
          value: { fontSize: "20px", fontWeight: 700, color: "#0f172a", offsetY: 20 },
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

  const teamBtnClass = (k: "priya" | "marcus" | "sofia") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      activeTeam === k ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  const focusMember = radarSeries.find((s) => s.name.startsWith(activeTeam[0].toUpperCase() + activeTeam.slice(1))) ?? radarSeries[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Radar & Radial Charts"
        description="Multi-dimensional comparisons with radar charts and KPI gauges with radial bars."
        breadcrumbs={[{ label: "Charts" }, { label: "Radar" }]}
        actions={
          <Button size="md">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Focus</span>
          {(["priya", "marcus", "sofia"] as const).map((k) => (
            <button key={k} onClick={() => setActiveTeam(k)} className={teamBtnClass(k)}>
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* V1 — Multi-series radar */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Team Skill Assessment"
            description="Six-axis radar across three team members"
            action={<Badge tone="brand" variant="soft">3 members</Badge>}
          />
          <CardBody>
            <NimbusChart options={radarOptions} series={radarSeries} type="radar" height={360} />
          </CardBody>
        </Card>

        {/* V2 — Single radial */}
        <Card>
          <CardHeader title="Goal Completion" description="Quarter OKR progress" />
          <CardBody>
            <NimbusChart options={singleRadialOptions} series={[78]} type="radialBar" height={360} />
            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Target</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">$1.5M</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Actual</p>
                <p className="text-sm font-bold text-brand-600 dark:text-brand-400">$1.17M</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* V3 — Multi radial */}
      <Card>
        <CardHeader
          title="System Resource Utilization"
          description="Live multi-radial gauges for infrastructure KPIs"
          action={<Badge tone="success" dot>Healthy</Badge>}
        />
        <CardBody>
          <NimbusChart options={multiRadialOptions} series={[62, 78, 45, 28]} type="radialBar" height={320} />
        </CardBody>
      </Card>

      {/* Focus member breakdown */}
      <Card>
        <CardHeader title={`${focusMember.name} — Skill Detail`} description="Per-axis score breakdown" />
        <CardBody>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SKILL_CATEGORIES.map((cat, i) => {
              const score = focusMember.data[i];
              const tone =
                score >= 90 ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400" :
                score >= 80 ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400" :
                score >= 70 ? "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400" :
                "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-400";
              return (
                <div key={cat} className="rounded-xl border border-gray-100 p-4 text-center dark:border-gray-800">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{cat}</p>
                  <p className={`mt-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${tone}`}>
                    {score}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">out of 100</p>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-500/10 dark:to-accent-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <RadarIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Radar</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Compare 3+ series across axes</p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Single radial</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">One KPI with focus</p>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-warning-50 dark:from-orange-500/10 dark:to-warning-500/10">
          <CardBody className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Multi radial</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Several gauges side by side</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
