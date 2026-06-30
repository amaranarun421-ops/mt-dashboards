"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  legend: { position: "bottom" },
  tooltip: { theme: "dark" },
  dataLabels: { enabled: true },
};

const DoughnutPiePage = () => {
  return (
    <PageContainer
      title="Doughnut & Pie"
      description="Part-to-whole composition. Doughnut, pie, and semi-circle variants with custom labels."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Doughnut">
          <Chart
            options={{
              ...baseOptions,
              colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)", "var(--color-error)"],
              labels: ["Direct","Referral","Organic","Paid","Email"],
              plotOptions: { pie: { donut: { size: "65%" } } },
              stroke: { width: 0 },
            }}
            series={[44, 25, 15, 10, 6]}
            type="donut"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Pie">
          <Chart
            options={{
              ...baseOptions,
              colors: ["#237DD9", "#0EA5E9", "#10B981", "#F97316", "#EF4444"],
              labels: ["Mobile","Desktop","Tablet","Smart TV","Other"],
              stroke: { width: 2, colors: ["var(--background)"] },
            }}
            series={[55, 30, 8, 4, 3]}
            type="pie"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Semi Donut">
          <Chart
            options={{
              ...baseOptions,
              colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)"],
              labels: ["Completed","In Progress","To Do"],
              plotOptions: { pie: { startAngle: -90, endAngle: 90, donut: { size: "70%" } } },
              stroke: { width: 0 },
            }}
            series={[60, 25, 15]}
            type="donut"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="With Legend Info" description="Center label shows total">
          <Chart
            options={{
              ...baseOptions,
              colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)"],
              labels: ["USA","UK","Canada","Germany"],
              plotOptions: {
                pie: {
                  donut: {
                    size: "75%",
                    labels: {
                      show: true,
                      total: { show: true, label: "Total Users", color: "var(--color-link)", formatter: () => "12,543" },
                    },
                  },
                },
              },
              stroke: { width: 0 },
            }}
            series={[5000, 4000, 2500, 1043]}
            type="donut"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Monochrome" description="Single color shades">
          <Chart
            options={{
              ...baseOptions,
              colors: ["#237DD9","#0D9488","#14B8A6","#5EEAD4","#FCD34D","#FBBF24"],
              labels: ["A","B","C","D","E","F"],
              plotOptions: { pie: { donut: { size: "60%" } } },
              stroke: { width: 0 },
            }}
            series={[35, 25, 18, 12, 6, 4]}
            type="donut"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Gradient Pie" description="Gradient fill per slice">
          <Chart
            options={{
              ...baseOptions,
              colors: ["#237DD9","#0EA5E9","#10B981"],
              labels: ["Active","Trial","Churned"],
              fill: { type: "solid", opacity: 0.15 },
              stroke: { width: 2, colors: ["var(--background)"] },
            }}
            series={[65, 25, 10]}
            type="pie"
            height={320}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default DoughnutPiePage;
