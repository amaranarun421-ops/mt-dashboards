"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"],
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: false },
  legend: { position: "top" },
  tooltip: { theme: "dark" },
  grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
};

const LineChartPage = () => {
  return (
    <PageContainer
      title="Line Chart"
      description="Trend visualization across categories. Smooth, straight, and stepped variants with multi-series support."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Line">
          <Chart
            options={{ ...baseOptions, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] } }}
            series={[{ name: "Revenue", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Multi-series">
          <Chart
            options={{ ...baseOptions, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] } }}
            series={[
              { name: "2024", data: [30, 40, 35, 50, 49, 60, 70] },
              { name: "2023", data: [20, 30, 25, 40, 39, 50, 60] },
              { name: "2022", data: [10, 20, 15, 30, 29, 40, 50] },
            ]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Smooth Curves">
          <Chart
            options={{ ...baseOptions, stroke: { curve: "smooth", width: 4 }, xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] } }}
            series={[{ name: "Visitors", data: [120, 90, 150, 110, 180, 220, 200] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Straight Lines">
          <Chart
            options={{ ...baseOptions, stroke: { curve: "straight", width: 3 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] } }}
            series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="With Data Labels">
          <Chart
            options={{ ...baseOptions, dataLabels: { enabled: true }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] } }}
            series={[{ name: "Growth", data: [25, 40, 35, 50, 49, 60] }]}
            type="line"
            height={300}
          />
        </DemoBlock>

        <DemoBlock title="Stepped Line">
          <Chart
            options={{ ...baseOptions, stroke: { curve: "stepline", width: 3 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul"] } }}
            series={[{ name: "Steps", data: [30, 40, 35, 50, 49, 60, 70] }]}
            type="line"
            height={300}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default LineChartPage;
