"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Badge } from "@/components/shared/badge";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  CpuIcon,
  ActivityIcon,
  GaugeIcon,
  WalletIcon,
} from "@/components/Layouts/sidebar/icons";

type Model = {
  id: string;
  name: string;
  provider: string;
  calls: string;
  callsVal: number;
  tokens: string;
  tokensVal: number;
  avgLatency: string;
  cost: string;
  costVal: number;
  health: "healthy" | "degraded" | "down";
};

const models: Model[] = [
  { id: "M-helios-2", name: "Helios-2 Turbo", provider: "Helios Labs", calls: "2.4M", callsVal: 2400000, tokens: "1.2B", tokensVal: 1200, avgLatency: "184ms", cost: "$8,420", costVal: 8420, health: "healthy" },
  { id: "M-gpt-4o", name: "GPT-4o", provider: "OpenAI", calls: "1.8M", callsVal: 1800000, tokens: "920M", tokensVal: 920, avgLatency: "412ms", cost: "$12,400", costVal: 12400, health: "healthy" },
  { id: "M-claude", name: "Claude 3.5 Sonnet", provider: "Anthropic", calls: "940k", callsVal: 940000, tokens: "480M", tokensVal: 480, avgLatency: "396ms", cost: "$6,820", costVal: 6820, health: "degraded" },
  { id: "M-llama", name: "Llama 3.1 70B", provider: "Self-hosted", calls: "620k", callsVal: 620000, tokens: "320M", tokensVal: 320, avgLatency: "248ms", cost: "$1,240", costVal: 1240, health: "healthy" },
  { id: "M-mistral", name: "Mistral Large", provider: "Mistral AI", calls: "410k", callsVal: 410000, tokens: "180M", tokensVal: 180, avgLatency: "322ms", cost: "$2,180", costVal: 2180, health: "down" },
  { id: "M-gemini", name: "Gemini 1.5 Pro", provider: "Google", calls: "280k", callsVal: 280000, tokens: "140M", tokensVal: 140, avgLatency: "288ms", cost: "$1,840", costVal: 1840, health: "healthy" },
];

const healthVariant = {
  healthy: "success",
  degraded: "warning",
  down: "danger",
} as const;

const inference = [
  { id: "i1", user: "Aarav Sharma", action: "ran inference on", target: "Helios-2 Turbo (4.2k tokens)", time: "12 sec ago", tone: "primary" as const },
  { id: "i2", user: "Priya Patel", action: "fine-tuned", target: "Llama 3.1 70B", time: "2 min ago", tone: "violet" as const },
  { id: "i3", user: "Daniel Chen", action: "deployed", target: "Mistral Large v3", time: "8 min ago", tone: "success" as const },
  { id: "i4", user: "Sofia Mendes", action: "hit rate limit on", target: "Claude 3.5 Sonnet", time: "14 min ago", tone: "danger" as const },
  { id: "i5", user: "Marcus Bell", action: "optimized prompt for", target: "GPT-4o", time: "26 min ago", tone: "accent" as const },
];

export default function AIDashboard() {
  return (
    <div>
      <PageHeader
        title="AI Dashboard"
        description="Model usage, token economics and inference health across the Helios Pro AI gateway."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "AI" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Last 24h</Button>
            <Button variant="primary" size="sm">+ Deploy model</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Calls" value="6.45M" delta={{ value: "+18.2%", trend: "up" }} icon={<ActivityIcon className="size-5" />} tone="primary" sublabel="24h window" />
        <StatCard label="Tokens Processed" value="3.24B" delta={{ value: "+22.4%", trend: "up" }} icon={<CpuIcon className="size-5" />} tone="accent" sublabel="input + output" />
        <StatCard label="Avg. Latency" value="284ms" delta={{ value: "-38ms", trend: "down" }} icon={<GaugeIcon className="size-5" />} tone="violet" sublabel="p50 across models" />
        <StatCard label="Inference Cost" value="$32,900" delta={{ value: "+4.1%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="info" sublabel="$0.0051 / 1k tokens" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Model Usage"
          subtitle="Daily calls, last 14 days"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+18.2%</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: Array.from({ length: 14 }, (_, i) => `D${i + 1}`) },
              stroke: { curve: "smooth", width: 2 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}` } },
            }}
            series={[
              { name: "Helios-2", data: [180, 198, 210, 224, 240, 256, 268, 284, 302, 318, 326, 340, 362, 384] },
              { name: "GPT-4o", data: [120, 132, 148, 156, 168, 174, 188, 196, 208, 214, 226, 234, 244, 256] },
              { name: "Claude", data: [60, 64, 72, 78, 84, 88, 92, 98, 104, 108, 112, 118, 122, 128] },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Tokens by Category"
          subtitle="Where tokens are spent"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={320}
            options={{
              labels: ["Chat", "Embeddings", "Fine-tune", "RAG", "Vision", "Other"],
              legend: { position: "bottom" },
              plotOptions: { pie: { donut: { size: "70%" } } },
            }}
            series={[42, 22, 14, 10, 8, 4]}
          />
        </ChartCard>

        <ChartCard
          title="Latency Trend"
          subtitle="p50 / p95 / p99 (ms)"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success" size="sm">-38ms p50</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: Array.from({ length: 12 }, (_, i) => `H${i + 1}`) },
              stroke: { curve: "smooth", width: 2 },
              markers: { size: 3 },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `${v}ms` } },
              colors: ["#10b981", "#f59e0b", "#ef4444"],
            }}
            series={[
              { name: "p50", data: [322, 318, 308, 296, 288, 282, 278, 272, 268, 264, 262, 258] },
              { name: "p95", data: [620, 612, 598, 584, 572, 564, 552, 548, 542, 538, 532, 524] },
              { name: "p99", data: [920, 912, 894, 872, 858, 842, 828, 818, 802, 792, 784, 772] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Live Inference" subtitle="Gateway event stream" action={<Badge variant="success" size="sm">Live</Badge>} />
          <ActivityFeed items={inference} compact />
        </Card>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Model Performance" subtitle="Calls, tokens, latency, cost & health" action={<Badge variant="neutral" size="sm">6 models</Badge>} />
          </div>
          <DataTable<Model>
            data={models}
            rowKey={(m) => m.id}
            pageSize={6}
            columns={[
              { key: "name", header: "Model", cell: (m) => (
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15">
                    <CpuIcon className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium text-dark dark:text-white">{m.name}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{m.provider}</p>
                  </div>
                </div>
              ) },
              { key: "calls", header: "Calls", sortable: true, sortAccessor: (m) => m.callsVal, cell: (m) => m.calls },
              { key: "tokens", header: "Tokens", sortable: true, sortAccessor: (m) => m.tokensVal, cell: (m) => <span className="font-medium">{m.tokens}</span> },
              { key: "avgLatency", header: "Latency", cell: (m) => <span className="font-mono text-xs">{m.avgLatency}</span> },
              {
                key: "cost",
                header: "Cost",
                sortable: true,
                sortAccessor: (m) => m.costVal,
                cell: (m) => (
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min(100, (m.costVal / 12400) * 100)} tone="accent" size="xs" className="w-20" />
                    <span className="font-semibold">{m.cost}</span>
                  </div>
                ),
              },
              { key: "health", header: "Health", cell: (m) => <Badge variant={healthVariant[m.health]}>{m.health}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "AI" }]} />
      </div>
    </div>
  );
}