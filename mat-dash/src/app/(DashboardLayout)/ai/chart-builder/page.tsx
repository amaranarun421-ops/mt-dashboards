"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AiChartBuilderPage = () => {
  const [prompt, setPrompt] = useState("Show monthly sales for 2024 as an area chart");
  const [chartType, setChartType] = useState("area");
  const [generated, setGenerated] = useState(true);

  const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" }, colors: ["var(--color-primary)"], grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 } };

  const renderChart = () => {
    if (chartType === "area") return <Chart options={{ ...base, stroke: { curve: "smooth", width: 2 }, fill: { type: "solid", opacity: 0.15 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] } }} series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70, 91, 80, 100, 90, 120] }]} type="area" height={350} />;
    if (chartType === "bar") return <Chart options={{ ...base, plotOptions: { bar: { columnWidth: "50%", borderRadius: 6 } }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] } }} series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70, 91, 80, 100, 90, 120] }]} type="bar" height={350} />;
    if (chartType === "line") return <Chart options={{ ...base, stroke: { curve: "smooth", width: 3 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] } }} series={[{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70, 91, 80, 100, 90, 120] }]} type="line" height={350} />;
    if (chartType === "donut") return <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-secondary)", "var(--color-success)", "var(--color-warning)"], labels: ["Q1","Q2","Q3","Q4"], legend: { position: "bottom" }, stroke: { width: 0 } }} series={[25, 30, 20, 25]} type="donut" height={350} />;
    return null;
  };

  return (
    <PageContainer title="AI Chart Builder" description="Describe the chart you want. AI picks the right type and visualizes your data.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemoBlock title="Prompt" className="lg:col-span-1">
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} placeholder="Describe your chart..." />
          <div className="mt-3">
            <Label className="text-xs">Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="donut">Donut Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-3 gap-1.5" onClick={() => setGenerated(true)}>
            <Icon icon="solar:magic-stick-3-bold-duotone" width={16} /> Generate Chart
          </Button>

          <div className="mt-4 p-3 rounded-lg bg-lightprimary">
            <p className="text-xs font-medium text-primary flex items-center gap-1.5"><Icon icon="solar:lightbulb-bolt-bold-duotone" width={16} /> AI Suggestion</p>
            <div className="text-xs opacity-80 mt-1">Based on your prompt, an <Badge variant="lightPrimary" className="text-[10px]">area chart</Badge> would best show monthly trends over time.</div>
          </div>
        </DemoBlock>

        <div className="lg:col-span-2">
          {generated && (
            <DemoBlock title="Generated Chart" description={prompt}>
              {renderChart()}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:download-minimalistic-bold" width={14} /> Export PNG</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:code-bold" width={14} /> View Code</Button>
                <Button variant="outline" size="sm" className="gap-1.5 ml-auto"><Icon icon="solar:refresh-bold" width={14} /> Regenerate</Button>
              </div>
            </DemoBlock>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AiChartBuilderPage;
