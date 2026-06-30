"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  colors: ["var(--color-primary)", "var(--color-secondary)"],
  dataLabels: { enabled: false },
  tooltip: { theme: "dark" },
  grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
};

const GradientChartPage = () => {
  return (
    <PageContainer
      title="Gradient Chart"
      description="Charts with gradient fills — line+area, multi-stop gradients, and dual-axis combinations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Gradient Line">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "solid", opacity: 0.15 },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
            }}
            series={[{ name: "Growth", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Gradient Area">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth", width: 2 },
              fill: {
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.05, stops: [0, 90, 100] },
              },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
            }}
            series={[{ name: "Revenue", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Multi-gradient">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth", width: 2 },
              fill: {
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1 },
              },
              xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
              legend: { position: "top" },
            }}
            series={[
              { name: "Organic", data: [30, 40, 35, 50, 49, 60, 70] },
              { name: "Paid", data: [20, 30, 25, 40, 39, 50, 60] },
            ]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Dual Color Gradient" description="Line color shifts across values">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth", width: 4 },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["var(--color-error)"], stops: [0, 100], type: "vertical" },
              },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
            }}
            series={[{ name: "Volatility", data: [30, 50, 35, 60, 49, 70, 90] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Filled Gradient + Markers">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "solid", opacity: 0.15 },
              markers: { size: 5, colors: ["var(--background)"], strokeColors: "var(--color-primary)", strokeWidth: 2 },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
            }}
            series={[{ name: "Conversions", data: [10, 40, 25, 50, 39, 70, 65] }]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Sparkline Gradient" description="Minimal compact chart for stat cards">
          <Chart
            options={{
              ...baseOptions,
              chart: { ...baseOptions.chart, sparkline: { enabled: true } },
              stroke: { curve: "smooth", width: 2 },
              fill: { type: "solid", opacity: 0.15 },
              tooltip: { theme: "dark", fixed: { enabled: false }, x: { show: false } },
              grid: { show: false },
            }}
            series={[{ name: "Trend", data: [25, 35, 30, 50, 45, 65, 70, 60, 80] }]}
            type="area"
            height={120}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default GradientChartPage;
