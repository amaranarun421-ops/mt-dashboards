"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: { toolbar: { show: false }, fontFamily: "inherit" },
  legend: { position: "top" },
  tooltip: { theme: "dark" },
};

const singleRadial: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-primary)"],
  labels: ["Completion"],
  plotOptions: {
    radialBar: {
      hollow: { size: "60%" },
      dataLabels: {
        name: { show: true, fontSize: "14px" },
        value: { fontSize: "32px", fontWeight: 700, color: "var(--color-link)" },
      },
    },
  },
};

const multiRadial: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)"],
  labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
  plotOptions: {
    radialBar: {
      hollow: { size: "40%" },
      dataLabels: {
        name: { fontSize: "12px" },
        value: { fontSize: "16px", fontWeight: 600 },
        total: { show: true, label: "Avg", formatter: () => "62%" },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: { shade: "dark", type: "vertical", gradientToColors: ["#0D9488", "#0EA5E9", "#10B981", "#F97316"], stops: [0, 100] },
  },
};

const multiRadar: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-primary)", "var(--color-secondary)"],
  xaxis: { categories: ["Strategy", "UX", "Visual", "Code", "SEO", "Content"] },
  yaxis: { show: false },
  dataLabels: { enabled: true },
  fill: { opacity: 0.2 },
  stroke: { width: 2 },
};

const singleRadar: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-success)"],
  xaxis: { categories: ["Speed", "Power", "Agility", "Endurance", "Recovery", "Focus"] },
  yaxis: { show: false, max: 100 },
  dataLabels: { enabled: true },
  fill: { opacity: 0.3 },
  stroke: { width: 2 },
};

const circleGauge: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-primary)"],
  labels: ["Progress"],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: "65%" },
      dataLabels: {
        name: { show: false },
        value: { fontSize: "30px", fontWeight: 700, color: "var(--color-link)", offsetY: 10 },
      },
      track: { background: "rgba(133, 146, 173, 0.15)" },
    },
  },
  fill: {
    type: "gradient",
    gradient: { shade: "dark", type: "horizontal", gradientToColors: ["#0EA5E9"], stops: [0, 100] },
  },
  stroke: { lineCap: "round" },
};

const semiGauge: ApexOptions = {
  ...baseOptions,
  colors: ["var(--color-warning)"],
  labels: ["Speed"],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: "55%" },
      dataLabels: {
        name: { show: false },
        value: { fontSize: "28px", fontWeight: 700, color: "var(--color-link)" },
      },
    },
  },
  stroke: { lineCap: "round" },
};

const RadialRadarPage = () => {
  return (
    <PageContainer
      title="Radialbar & Radar"
      description="Radial progress indicators and multi-axis radar for skill/proficiency scoring."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Radialbar (Single)">
          <Chart options={singleRadial} series={[72]} type="radialBar" height={320} />
        </DemoBlock>

        <DemoBlock title="Multi Radialbar">
          <Chart options={multiRadial} series={[44, 55, 67, 83]} type="radialBar" height={320} />
        </DemoBlock>

        <DemoBlock title="Radar — Multi-series">
          <Chart
            options={multiRadar}
            series={[
              { name: "Team A", data: [80, 50, 30, 70, 60, 90] },
              { name: "Team B", data: [60, 70, 50, 40, 80, 65] },
            ]}
            type="radar"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Radar — Single">
          <Chart
            options={singleRadar}
            series={[{ name: "Athlete", data: [88, 75, 92, 80, 65, 95] }]}
            type="radar"
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Circle Gauge">
          <Chart options={circleGauge} series={[75]} type="radialBar" height={320} />
        </DemoBlock>

        <DemoBlock title="Semi Circle Gauge">
          <Chart options={semiGauge} series={[65]} type="radialBar" height={320} />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default RadialRadarPage;
