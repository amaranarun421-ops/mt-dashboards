"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  UsersIcon,
  WalletIcon,
  BriefcaseIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";

type Deal = {
  id: string;
  company: string;
  owner: string;
  stage: "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  value: string;
  amount: number;
  probability: number;
};

const deals: Deal[] = [
  { id: "D-2014", company: "Northwind Labs", owner: "Aarav Sharma", stage: "Negotiation", value: "$48,200", amount: 48200, probability: 78 },
  { id: "D-2013", company: "Atlas Robotics", owner: "Priya Patel", stage: "Proposal", value: "$92,400", amount: 92400, probability: 52 },
  { id: "D-2012", company: "Lumen Health", owner: "Daniel Chen", stage: "Qualified", value: "$28,900", amount: 28900, probability: 32 },
  { id: "D-2011", company: "Vertex Mobility", owner: "Sofia Mendes", stage: "Closed Won", value: "$154,000", amount: 154000, probability: 100 },
  { id: "D-2010", company: "Polaris Foods", owner: "Liam Walsh", stage: "Negotiation", value: "$67,800", amount: 67800, probability: 64 },
  { id: "D-2009", company: "Quanta Energy", owner: "Emma Reyes", stage: "Proposal", value: "$112,500", amount: 112500, probability: 48 },
  { id: "D-2008", company: "Brightline Studios", owner: "Marcus Bell", stage: "Qualified", value: "$19,300", amount: 19300, probability: 22 },
];

const stageVariant = {
  Qualified: "info",
  Proposal: "violet",
  Negotiation: "accent",
  "Closed Won": "success",
  "Closed Lost": "danger",
} as const;

const activity = [
  { id: "a1", user: "Aarav Sharma", action: "moved deal", target: "Northwind Labs → Negotiation", time: "12 min ago", tone: "accent" as const },
  { id: "a2", user: "Sofia Mendes", action: "closed won", target: "Vertex Mobility $154k", time: "1 hr ago", tone: "success" as const },
  { id: "a3", user: "Priya Patel", action: "sent proposal to", target: "Atlas Robotics", time: "3 hr ago", tone: "violet" as const },
  { id: "a4", user: "Daniel Chen", action: "added new lead", target: "Lumen Health", time: "5 hr ago", tone: "primary" as const },
  { id: "a5", user: "Liam Walsh", action: "scheduled call with", target: "Polaris Foods", time: "Yesterday", tone: "info" as const },
];

const topReps = [
  { name: "Sofia Mendes", won: "$154k", deals: 8, target: 92 },
  { name: "Aarav Sharma", won: "$128k", deals: 11, target: 84 },
  { name: "Priya Patel", won: "$96k", deals: 9, target: 71 },
  { name: "Liam Walsh", won: "$74k", deals: 6, target: 58 },
];

export default function CRMDashboard() {
  return (
    <div>
      <PageHeader
        title="CRM Dashboard"
        description="Pipeline velocity, deal health and revenue forecast for the Helios Pro sales team."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "CRM" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Pipeline report</Button>
            <Button variant="primary" size="sm">+ New deal</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pipeline Value" value="$1.84M" delta={{ value: "+8.2%", trend: "up" }} icon={<BriefcaseIcon className="size-5" />} tone="primary" sublabel="42 open deals" />
        <StatCard label="Closed This Month" value="$412,800" delta={{ value: "+22.4%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="accent" sublabel="9 deals won" />
        <StatCard label="New Leads" value="284" delta={{ value: "+14.6%", trend: "up" }} icon={<UsersIcon className="size-5" />} tone="violet" sublabel="62 from inbound" />
        <StatCard label="Avg. Win Score" value="68.4" delta={{ value: "+3.1", trend: "up" }} icon={<StarIcon className="size-5" />} tone="info" sublabel="weighted by deal size" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Sales Pipeline Funnel"
          subtitle="Deals by stage (count)"
          className="col-span-12 xl:col-span-7"
          action={<Badge variant="primary">5 stages</Badge>}
        >
          <HeliosChart
            type="bar"
            height={320}
            options={{
              plotOptions: { bar: { borderRadius: 8, columnWidth: "55%", distributed: true } },
              xaxis: { categories: ["Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"] },
              dataLabels: { enabled: true, style: { colors: ["#fff"] }, formatter: (v: number) => `${v} deals` },
              legend: { show: false },
            }}
            series={[{ name: "Deals", data: [42, 28, 19, 12, 6] }]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-5">
          <CardHeader title="Lead Score" subtitle="Average quality of inbound leads" action={<Badge variant="success">Healthy</Badge>} />
          <div className="grid place-items-center py-2">
            <HeliosChart
              type="radialBar"
              height={260}
              options={{
                labels: ["Score"],
                plotOptions: { radialBar: { hollow: { size: "62%" }, track: { background: "#e6ebf1" }, dataLabels: { value: { fontSize: "28px", fontWeight: 700, formatter: (v: number) => `${Math.round(v)}` } } } },
                colors: ["#10b981"],
                fill: { type: "gradient", gradient: { shade: "light", shadeIntensity: 0.4, gradientToColors: ["#34d399"], stops: [0, 100] } },
              }}
              series={[68]}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-primary-subtle p-2 dark:bg-primary/15">
              <p className="text-xs text-dark-5 dark:text-dark-6">Hot</p>
              <p className="text-base font-bold text-primary dark:text-primary-light">42</p>
            </div>
            <div className="rounded-lg bg-accent-subtle p-2 dark:bg-accent/15">
              <p className="text-xs text-dark-5 dark:text-dark-6">Warm</p>
              <p className="text-base font-bold text-accent-dark dark:text-accent-light">118</p>
            </div>
            <div className="rounded-lg bg-gray-2 p-2 dark:bg-white/5">
              <p className="text-xs text-dark-5 dark:text-dark-6">Cold</p>
              <p className="text-base font-bold text-dark dark:text-white">124</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 xl:col-span-8" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Deals by Stage" subtitle="Pipeline inventory" action={<Badge variant="neutral" size="sm">7 deals</Badge>} />
          </div>
          <DataTable<Deal>
            data={deals}
            rowKey={(d) => d.id}
            pageSize={6}
            columns={[
              { key: "company", header: "Company", cell: (d) => <span className="font-medium text-dark dark:text-white">{d.company}</span> },
              { key: "owner", header: "Owner", cell: (d) => (
                <div className="flex items-center gap-2">
                  <Avatar name={d.owner} size="xs" />
                  <span className="text-dark-7">{d.owner}</span>
                </div>
              ) },
              { key: "stage", header: "Stage", cell: (d) => <Badge variant={stageVariant[d.stage]}>{d.stage}</Badge> },
              { key: "value", header: "Value", sortable: true, sortAccessor: (d) => d.amount, cell: (d) => <span className="font-semibold">{d.value}</span> },
              {
                key: "probability",
                header: "Probability",
                cell: (d) => (
                  <div className="flex items-center gap-2">
                    <Progress value={d.probability} tone={d.probability > 70 ? "success" : d.probability > 40 ? "accent" : "rose"} size="xs" className="w-24" />
                    <span className="text-xs font-semibold text-dark-5 dark:text-dark-6">{d.probability}%</span>
                  </div>
                ),
              },
            ]}
          />
        </Card>

        <div className="col-span-12 grid gap-6 xl:col-span-4">
          <Card>
            <CardHeader title="Recent Activity" subtitle="Team actions" action={<Badge variant="success" size="sm">Live</Badge>} />
            <ActivityFeed items={activity} />
          </Card>
        </div>

        <Card className="col-span-12">
          <CardHeader title="Top Sales Reps" subtitle="Performance vs. quarterly target" action={<Button variant="ghost" size="sm">View all</Button>} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topReps.map((r, i) => (
              <div key={r.name} className="rounded-xl border border-stroke p-4 dark:border-dark-3">
                <div className="flex items-center gap-3">
                  <Avatar name={r.name} size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-dark dark:text-white">{r.name}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{r.deals} deals closed</p>
                  </div>
                  {i === 0 && <Badge variant="success" size="sm" className="ml-auto">#1</Badge>}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-dark dark:text-white">{r.won}</span>
                  <span className="text-dark-5 dark:text-dark-6">{r.target}% of target</span>
                </div>
                <Progress className="mt-2" value={r.target} tone={r.target > 80 ? "success" : r.target > 60 ? "accent" : "rose"} size="xs" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "CRM" }]} />
      </div>
    </div>
  );
}