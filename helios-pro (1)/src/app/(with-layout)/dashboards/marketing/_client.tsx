"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  MegaphoneIcon,
  ActivityIcon,
  WalletIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";

type Campaign = {
  id: string;
  name: string;
  channel: "Email" | "Social" | "Search" | "Display" | "Affiliate";
  impressions: string;
  clicks: string;
  ctr: number;
  spend: string;
  spendVal: number;
  roas: number;
  status: "live" | "paused" | "ended";
};

const campaigns: Campaign[] = [
  { id: "C-2204", name: "Helios Q1 Launch", channel: "Search", impressions: "2.4M", clicks: "84.2k", ctr: 3.51, spend: "$48,200", spendVal: 48200, roas: 4.2, status: "live" },
  { id: "C-2201", name: "Aurora Headphones Push", channel: "Display", impressions: "3.1M", clicks: "62.4k", ctr: 2.01, spend: "$32,800", spendVal: 32800, roas: 2.8, status: "live" },
  { id: "C-2198", name: "Newsletter — Jan 2025", channel: "Email", impressions: "412k", clicks: "38.1k", ctr: 9.24, spend: "$4,200", spendVal: 4200, roas: 8.6, status: "ended" },
  { id: "C-2195", name: "Founder LinkedIn series", channel: "Social", impressions: "1.8M", clicks: "44.6k", ctr: 2.48, spend: "$18,400", spendVal: 18400, roas: 3.4, status: "live" },
  { id: "C-2192", name: "Affiliate partner Q1", channel: "Affiliate", impressions: "920k", clicks: "22.8k", ctr: 2.48, spend: "$12,200", spendVal: 12200, roas: 5.1, status: "live" },
  { id: "C-2188", name: "Holiday clearance", channel: "Display", impressions: "1.2M", clicks: "18.4k", ctr: 1.53, spend: "$9,800", spendVal: 9800, roas: 1.4, status: "paused" },
];

const channelVariant = {
  Email: "info",
  Social: "violet",
  Search: "primary",
  Display: "accent",
  Affiliate: "danger",
} as const;

const statusVariant = {
  live: "success",
  paused: "warning",
  ended: "neutral",
} as const;

export default function MarketingDashboard() {
  return (
    <div>
      <PageHeader
        title="Marketing Dashboard"
        description="Campaign performance, channel ROI and conversion funnel across all active spend."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Marketing" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Last 30 days</Button>
            <Button variant="primary" size="sm">+ New campaign</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Spend" value="$125,600" delta={{ value: "+8.4%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="primary" sublabel="across 6 campaigns" />
        <StatCard label="Impressions" value="9.83M" delta={{ value: "+22.1%", trend: "up" }} icon={<MegaphoneIcon className="size-5" />} tone="accent" sublabel="brand + perf" />
        <StatCard label="Avg. ROAS" value="4.2x" delta={{ value: "+0.4x", trend: "up" }} icon={<ActivityIcon className="size-5" />} tone="violet" sublabel="target 3.5x" />
        <StatCard label="Conversions" value="18,420" delta={{ value: "+12.6%", trend: "up" }} icon={<StarIcon className="size-5" />} tone="info" sublabel="$6.82 cost/conv" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Campaign Performance"
          subtitle="Spend vs. revenue, by campaign"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="primary">6 active</Badge>}
        >
          <HeliosChart
            type="bar"
            height={320}
            options={{
              plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
              xaxis: { categories: ["Q1 Launch", "Aurora", "Newsletter", "LinkedIn", "Affiliate", "Holiday"] },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
              colors: ["#10b981", "#f59e0b"],
            }}
            series={[
              { name: "Spend", data: [48.2, 32.8, 4.2, 18.4, 12.2, 9.8] },
              { name: "Revenue", data: [202.4, 91.8, 36.1, 62.6, 62.2, 13.7] },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Channel Mix"
          subtitle="Budget allocation"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={320}
            options={{
              labels: ["Search", "Display", "Social", "Email", "Affiliate"],
              legend: { position: "bottom" },
              plotOptions: { pie: { donut: { size: "70%" } } },
            }}
            series={[38, 26, 18, 12, 6]}
          />
        </ChartCard>

        <ChartCard
          title="Conversion Funnel"
          subtitle="Impressions → Revenue"
          className="col-span-12 xl:col-span-7"
          action={<Badge variant="info">Smooth area</Badge>}
        >
          <HeliosChart
            type="area"
            height={300}
            options={{
              xaxis: { categories: ["Impressions", "Clicks", "Visits", "Sign-ups", "Trials", "Paid"] },
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}` } },
            }}
            series={[{ name: "Users", data: [9820, 1240, 980, 412, 248, 142] }]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-5">
          <CardHeader title="Top Campaigns" subtitle="Ranked by ROAS" action={<Badge variant="success" size="sm">3 over target</Badge>} />
          <ul className="space-y-3">
            {campaigns
              .slice()
              .sort((a, b) => b.roas - a.roas)
              .slice(0, 5)
              .map((c, i) => (
                <li key={c.id} className="flex items-center gap-3 rounded-xl border border-stroke p-3 dark:border-dark-3">
                  <span className={`grid size-7 place-items-center rounded-lg text-xs font-bold ${i === 0 ? "bg-primary-subtle text-primary dark:bg-primary/15" : "bg-gray-2 text-dark-5 dark:bg-white/5"}`}>
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{c.name}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{c.channel} · {c.spend}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary dark:text-primary-light">{c.roas}x</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">ROAS</p>
                  </div>
                </li>
              ))}
          </ul>
        </Card>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="All Campaigns" subtitle="Detailed performance table" action={<Badge variant="neutral" size="sm">6 of 28</Badge>} />
          </div>
          <DataTable<Campaign>
            data={campaigns}
            rowKey={(c) => c.id}
            pageSize={6}
            columns={[
              { key: "name", header: "Campaign", cell: (c) => (
                <div>
                  <p className="font-medium text-dark dark:text-white">{c.name}</p>
                  <p className="font-mono text-xs text-dark-5 dark:text-dark-6">{c.id}</p>
                </div>
              ) },
              { key: "channel", header: "Channel", cell: (c) => <Badge variant={channelVariant[c.channel]}>{c.channel}</Badge> },
              { key: "impressions", header: "Impr.", cell: (c) => c.impressions },
              { key: "clicks", header: "Clicks", cell: (c) => c.clicks },
              {
                key: "ctr",
                header: "CTR",
                sortable: true,
                sortAccessor: (c) => c.ctr,
                cell: (c) => (
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min(100, c.ctr * 10)} tone="primary" size="xs" className="w-20" />
                    <span className="text-xs font-semibold">{c.ctr}%</span>
                  </div>
                ),
              },
              { key: "spend", header: "Spend", sortable: true, sortAccessor: (c) => c.spendVal, cell: (c) => <span className="font-semibold">{c.spend}</span> },
              {
                key: "roas",
                header: "ROAS",
                sortable: true,
                sortAccessor: (c) => c.roas,
                cell: (c) => <Badge variant={c.roas >= 4 ? "success" : c.roas >= 2.5 ? "warning" : "danger"}>{c.roas}x</Badge>,
              },
              { key: "status", header: "Status", cell: (c) => <Badge variant={statusVariant[c.status]}>{c.status}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Marketing" }]} />
      </div>
    </div>
  );
}