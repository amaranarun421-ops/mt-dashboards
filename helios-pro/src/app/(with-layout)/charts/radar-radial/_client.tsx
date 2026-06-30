"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import { GaugeIcon } from "@/components/Layouts/sidebar/icons";

export default function RadarRadialChartsPage() {
  return (
    <div>
      <PageHeader
        title="Radar & Radial Charts"
        description="Radar multi-series, single & multi radialBars, and a circular gauge for KPIs."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Radar & Radial" },
        ]}
        actions={
          <Badge variant="primary">
            <GaugeIcon className="size-3.5" /> 5 variants
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Radar multi-series */}
        <ChartCard
          title="Radar — Multi-series"
          subtitle="Skill coverage across 6 dimensions"
          action={<Badge variant="success">2 series</Badge>}
        >
          <HeliosChart
            type="radar"
            height={320}
            options={{
              labels: ["Design", "Code", "QA", "Docs", "Support", "DevOps"],
              stroke: { width: 2 },
              fill: { opacity: [0.25, 0.15] },
              markers: { size: 4, strokeWidth: 0 },
              legend: { position: "top" },
              xaxis: { categories: ["Design", "Code", "QA", "Docs", "Support", "DevOps"] },
              yaxis: { show: false },
              plotOptions: { radar: { polygons: { strokeColors: ["#e6ebf1"], connectorColors: ["#e6ebf1"] } } },
            }}
            series={[
              { name: "Team A", data: [82, 90, 74, 60, 68, 78] },
              { name: "Team B", data: [70, 64, 88, 80, 56, 90] },
            ]}
          />
        </ChartCard>

        {/* 2. Radar single */}
        <ChartCard
          title="Radar — Single Series"
          subtitle="Product fit score"
          action={<Badge variant="info">1 series</Badge>}
        >
          <HeliosChart
            type="radar"
            height={320}
            options={{
              labels: ["Speed", "Reliability", "Cost", "Support", "Features", "Security"],
              stroke: { width: 2 },
              fill: { opacity: 0.35, colors: [heliosChartColors[1]] },
              markers: { size: 5, strokeWidth: 0 },
              legend: { show: false },
              yaxis: { show: false },
              colors: [heliosChartColors[1]],
            }}
            series={[
              { name: "Score", data: [88, 92, 74, 80, 86, 94] },
            ]}
          />
        </ChartCard>

        {/* 3. RadialBar single */}
        <ChartCard
          title="RadialBar — Single"
          subtitle="Conversion rate"
          action={<Badge variant="violet">single</Badge>}
        >
          <HeliosChart
            type="radialBar"
            height={320}
            options={{
              labels: ["Conversion"],
              legend: { show: false },
              plotOptions: {
                radialBar: {
                  hollow: { size: "62%" },
                  track: { background: "rgba(148,163,184,0.18)" },
                  dataLabels: {
                    name: { fontSize: "13px", color: undefined, offsetY: 80 },
                    value: { fontSize: "32px", fontWeight: 700, offsetY: 30 },
                    total: { show: false },
                  },
                },
              },
              fill: { type: "gradient", gradient: { shade: "dark", type: "horizontal", stops: [0, 100], gradientToColors: [heliosChartColors[1]], opacityFrom: 1, opacityTo: 1 } },
              colors: [heliosChartColors[0]],
            }}
            series={[74]}
          />
        </ChartCard>

        {/* 4. RadialBar multi */}
        <ChartCard
          title="RadialBar — Multi"
          subtitle="Onboarding completion by stage"
          action={<Badge variant="primary">3 metrics</Badge>}
        >
          <HeliosChart
            type="radialBar"
            height={320}
            options={{
              labels: ["Profile", "Verify", "Connect"],
              legend: { position: "bottom" },
              plotOptions: {
                radialBar: {
                  hollow: { size: "32%" },
                  track: { background: "rgba(148,163,184,0.18)" },
                  dataLabels: {
                    name: { fontSize: "12px" },
                    value: { fontSize: "16px", fontWeight: 600 },
                    total: {
                      show: true,
                      label: "Avg",
                      formatter: () => "72%",
                    },
                  },
                },
              },
              colors: [heliosChartColors[0], heliosChartColors[1], heliosChartColors[2]],
            }}
            series={[86, 72, 58]}
          />
        </ChartCard>

        {/* 5. Circular gauge */}
        <ChartCard
          title="Circular Gauge"
          subtitle="Single-value KPI dial"
          action={<Badge variant="warning">gauge</Badge>}
        >
          <HeliosChart
            type="radialBar"
            height={320}
            options={{
              labels: ["SLA"],
              legend: { show: false },
              plotOptions: {
                radialBar: {
                  startAngle: -135,
                  endAngle: 135,
                  hollow: { size: "68%" },
                  track: { background: "rgba(148,163,184,0.15)", startAngle: -135, endAngle: 135 },
                  dataLabels: {
                    name: { fontSize: "12px", color: undefined, offsetY: 90 },
                    value: { fontSize: "36px", fontWeight: 700, offsetY: 30, formatter: (v: number) => `${Math.round(v)}%` },
                  },
                },
              },
              fill: { type: "gradient", gradient: { shade: "dark", type: "horizontal", stops: [0, 100], gradientToColors: [heliosChartColors[4]] } },
              colors: [heliosChartColors[0]],
              stroke: { lineCap: "round" },
            }}
            series={[92]}
          />
        </ChartCard>

        {/* 6. RadialBar custom shapes summary */}
        <ChartCard
          title="Goal Attainment"
          subtitle="Quarterly targets vs achievement"
          action={<Badge variant="info">summary</Badge>}
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Revenue", value: 84, tone: heliosChartColors[0] },
              { label: "Active Users", value: 72, tone: heliosChartColors[1] },
              { label: "Retention", value: 91, tone: heliosChartColors[2] },
              { label: "NPS", value: 64, tone: heliosChartColors[3] },
            ].map((g) => (
              <div key={g.label} className="rounded-xl border border-stroke p-3 dark:border-dark-3">
                <HeliosChart
                  type="radialBar"
                  height={140}
                  options={{
                    labels: [g.label],
                    legend: { show: false },
                    plotOptions: {
                      radialBar: {
                        hollow: { size: "60%" },
                        track: { background: "rgba(148,163,184,0.18)" },
                        dataLabels: {
                          name: { fontSize: "11px", offsetY: 50 },
                          value: { fontSize: "18px", fontWeight: 700, offsetY: 10 },
                          total: { show: false },
                        },
                      },
                    },
                    colors: [g.tone],
                  }}
                  series={[g.value]}
                />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}