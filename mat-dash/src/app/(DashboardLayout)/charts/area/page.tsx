"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"],
  dataLabels: { enabled: false },
  legend: { position: "top" },
  tooltip: { theme: "dark" },
  grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
};

const AreaChartPage = () => {
  return (
    <PageContainer
      title="Area Chart"
      description="Volume-based trends with filled regions. Gradient fills and stacked variants for cohort analysis."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Area">
          <Chart
            options={{ ...baseOptions, stroke: { curve: "smooth" }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] }, fill: { type: "solid", opacity: [0.15] } }}
            series={[{ name: "Revenue", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Gradient Fill">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth" },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
              fill: { type: "solid", opacity: 0.15 },
            }}
            series={[{ name: "Users", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Multi-series Area">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth" },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
              fill: { type: "solid", opacity: 0.15 },
            }}
            series={[
              { name: "Desktop", data: [30, 40, 35, 50, 49, 60, 70] },
              { name: "Mobile", data: [20, 30, 25, 40, 39, 50, 60] },
            ]}
            type="area"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Stacked Area">
          <Chart
            options={{
              ...baseOptions,
              stroke: { curve: "smooth" },
              xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] },
              fill: { type: "solid", opacity: 0.15 },
              chart: { ...baseOptions.chart, stacked: true },
            }}
            series={[
              { name: "Product A", data: [30, 40, 35, 50, 49, 60, 70] },
              { name: "Product B", data: [20, 30, 25, 40, 39, 50, 60] },
              { name: "Product C", data: [10, 20, 15, 30, 29, 40, 50] },
            ]}
            type="area"
            height={300}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default AreaChartPage;
