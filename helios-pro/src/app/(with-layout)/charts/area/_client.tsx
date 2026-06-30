"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { HeliosChart } from "@/components/shared/helios-chart";

const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

export default function AreaChartsPage() {
  return (
    <div>
      <PageHeader
        title="Area Charts"
        description="Six area chart variants showing fills, gradients, stacking and range envelopes."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Area" },
        ]}
        actions={<Badge variant="primary">6 variants</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Basic area */}
        <ChartCard
          title="Basic Area"
          subtitle="Single series with solid fill"
          action={<Badge variant="success">+24%</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "straight", width: 2 },
              fill: { type: "solid", opacity: 0.18 },
              dataLabels: { enabled: false },
              markers: { size: 0 },
            }}
            series={[
              {
                name: "Signups",
                data: [120, 145, 160, 175, 190, 210, 240, 260, 290, 310, 340, 380],
              },
            ]}
          />
        </ChartCard>

        {/* 2. Gradient */}
        <ChartCard
          title="Gradient Area"
          subtitle="Smooth curve with vertical gradient"
          action={<Badge variant="info">gradient</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "smooth", width: 3 },
              fill: {
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.02, stops: [0, 100] },
              },
              dataLabels: { enabled: false },
              markers: { size: 0 },
            }}
            series={[
              {
                name: "Revenue ($K)",
                data: [38, 42, 47, 51, 58, 63, 71, 78, 85, 92, 104, 118],
              },
            ]}
          />
        </ChartCard>

        {/* 3. Stacked */}
        <ChartCard
          title="Stacked Area"
          subtitle="Two series contributing to a total"
          action={<Badge variant="violet">stacked</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "smooth", width: 1 },
              fill: { type: "solid", opacity: [0.55, 0.35] },
              dataLabels: { enabled: false },
              chart: { stacked: true },
              markers: { size: 0 },
              legend: { position: "top" },
            }}
            series={[
              { name: "Organic", data: [44, 55, 41, 67, 22, 43, 50, 58, 65, 72, 68, 79] },
              { name: "Paid", data: [13, 23, 20, 8, 13, 27, 33, 21, 18, 26, 28, 31] },
            ]}
          />
        </ChartCard>

        {/* 4. Spline */}
        <ChartCard
          title="Spline Area"
          subtitle="Soft curve with multi-series overlay"
          action={<Badge variant="primary">spline</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "monotoneCubic", width: 3 },
              fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              markers: { size: 0 },
              legend: { position: "top" },
            }}
            series={[
              { name: "Desktop", data: [30, 40, 35, 50, 49, 60, 70, 91, 84, 96, 110, 124] },
              { name: "Mobile", data: [12, 18, 25, 30, 38, 44, 52, 60, 68, 76, 84, 92] },
            ]}
          />
        </ChartCard>

        {/* 5. With negative */}
        <ChartCard
          title="Area with Negative Values"
          subtitle="Profit & loss showing zero baseline"
          action={<Badge variant="warning">+/-</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "straight", width: 2 },
              fill: { type: "solid", opacity: 0.25 },
              dataLabels: { enabled: false },
              markers: { size: 0 },
              plotOptions: { area: { fillTo: "origin" } },
              yaxis: { decimalsInFloat: 0 },
            }}
            series={[
              {
                name: "P&L ($K)",
                data: [12, -8, 18, 22, -4, 28, 14, -12, 24, 18, -6, 32],
              },
            ]}
          />
        </ChartCard>

        {/* 6. Range area */}
        <ChartCard
          title="Range Area"
          subtitle="Min/max band with average line"
          action={<Badge variant="info">range</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: weeks },
              stroke: { curve: "smooth", width: [2, 2, 3] },
              fill: { type: "solid", opacity: [0.2, 0.0, 0.0] },
              dataLabels: { enabled: false },
              markers: { size: 0 },
              legend: { position: "top" },
              tooltip: { shared: true },
            }}
            series={[
              { name: "High", data: [38, 41, 44, 48, 46, 52, 56, 60, 62, 66, 70, 74] },
              { name: "Low", data: [22, 25, 27, 30, 28, 32, 34, 36, 38, 40, 42, 44] },
              { name: "Average", data: [30, 33, 35, 38, 37, 42, 45, 48, 50, 53, 56, 59] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}