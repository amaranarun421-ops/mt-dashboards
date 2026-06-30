"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  dataLabels: { enabled: false },
  tooltip: { theme: "dark" },
  grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
};

const ColumnChartPage = () => {
  return (
    <PageContainer
      title="Column / Bar Chart"
      description="Discrete value comparison across categories. Vertical, horizontal, stacked, and grouped variants."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Column">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-primary)"], xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] }, plotOptions: { bar: { columnWidth: "40%", borderRadius: 6 } } }}
            series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60] }]}
            type="bar"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Multi-series Grouped">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-primary)", "var(--color-secondary)"], xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] }, plotOptions: { bar: { columnWidth: "60%", borderRadius: 4 } }, legend: { position: "top" } }}
            series={[
              { name: "2024", data: [30, 40, 35, 50, 49, 60] },
              { name: "2023", data: [20, 30, 25, 40, 39, 50] },
            ]}
            type="bar"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Stacked">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"], xaxis: { categories: ["Q1","Q2","Q3","Q4"] }, plotOptions: { bar: { columnWidth: "50%", borderRadius: 6 } }, chart: { ...baseOptions.chart, stacked: true }, legend: { position: "top" } }}
            series={[
              { name: "Product A", data: [44, 55, 41, 67] },
              { name: "Product B", data: [13, 23, 20, 8] },
              { name: "Product C", data: [11, 17, 15, 22] },
            ]}
            type="bar"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Horizontal Bar">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-primary)"], xaxis: { categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] }, plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "60%" } } }}
            series={[{ name: "Activity", data: [60, 40, 35, 50, 49, 70, 80] }]}
            type="bar"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="With Rounded Corners" description="Pill-shaped bars">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-secondary)"], xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] }, plotOptions: { bar: { columnWidth: "30%", borderRadius: 50, borderRadiusApplication: "end" } } }}
            series={[{ name: "Growth", data: [30, 40, 35, 50, 49, 60] }]}
            type="bar"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Multi-color Bars" description="Each bar gets its own color">
          <Chart
            options={{ ...baseOptions, colors: ["var(--color-primary)"], xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] }, plotOptions: { bar: { columnWidth: "50%", borderRadius: 6, distributed: true } }, fill: { colors: ["#237DD9","#0EA5E9","#10B981","#F97316","#EF4444","#3B82F6"] }, legend: { show: false } }}
            series={[{ name: "Value", data: [30, 40, 35, 50, 49, 60] }]}
            type="bar"
            height={300}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default ColumnChartPage;
