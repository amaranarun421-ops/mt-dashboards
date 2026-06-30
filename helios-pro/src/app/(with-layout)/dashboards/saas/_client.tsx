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
  CloudIcon,
  UsersIcon,
  RefreshCwIcon,
  WalletIcon,
} from "@/components/Layouts/sidebar/icons";

type Plan = "Free" | "Starter" | "Pro" | "Enterprise";
type Account = {
  id: string;
  customer: string;
  plan: Plan;
  seats: number;
  mrr: string;
  mrrVal: number;
  usage: number;
  status: "active" | "trial" | "past_due" | "canceled";
};

const accounts: Account[] = [
  { id: "AC-1042", customer: "Northwind Labs", plan: "Enterprise", seats: 84, mrr: "$8,400", mrrVal: 8400, usage: 78, status: "active" },
  { id: "AC-1038", customer: "Atlas Robotics", plan: "Pro", seats: 32, mrr: "$1,600", mrrVal: 1600, usage: 62, status: "active" },
  { id: "AC-1031", customer: "Lumen Health", plan: "Starter", seats: 12, mrr: "$360", mrrVal: 360, usage: 41, status: "trial" },
  { id: "AC-1024", customer: "Vertex Mobility", plan: "Enterprise", seats: 120, mrr: "$12,000", mrrVal: 12000, usage: 92, status: "active" },
  { id: "AC-1018", customer: "Polaris Foods", plan: "Pro", seats: 28, mrr: "$1,400", mrrVal: 1400, usage: 88, status: "past_due" },
  { id: "AC-1011", customer: "Quanta Energy", plan: "Pro", seats: 40, mrr: "$2,000", mrrVal: 2000, usage: 54, status: "active" },
  { id: "AC-1004", customer: "Brightline Studios", plan: "Free", seats: 4, mrr: "$0", mrrVal: 0, usage: 18, status: "trial" },
  { id: "AC-0998", customer: "Solstice Media", plan: "Starter", seats: 8, mrr: "$240", mrrVal: 240, usage: 67, status: "canceled" },
];

const planVariant: Record<Plan, "neutral" | "info" | "violet" | "accent"> = {
  Free: "neutral",
  Starter: "info",
  Pro: "violet",
  Enterprise: "accent",
};

const statusVariant = {
  active: "success",
  trial: "info",
  past_due: "warning",
  canceled: "danger",
} as const;

export default function SaaSDashboard() {
  return (
    <div>
      <PageHeader
        title="SaaS Dashboard"
        description="Subscription health, MRR growth and trial-to-paid funnel for the Helios Pro platform."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "SaaS" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Last 30 days</Button>
            <Button variant="primary" size="sm">+ Invite customer</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR" value="$184,920" delta={{ value: "+8.4%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="primary" sublabel="net new $14.3k" />
        <StatCard label="ARR" value="$2.22M" delta={{ value: "+34.1%", trend: "up" }} icon={<CloudIcon className="size-5" />} tone="accent" sublabel="projected FY25" />
        <StatCard label="Churn Rate" value="2.4%" delta={{ value: "-0.6%", trend: "down" }} icon={<RefreshCwIcon className="size-5" />} tone="violet" sublabel="below 3% target" />
        <StatCard label="Active Accounts" value="1,284" delta={{ value: "+62", trend: "up" }} icon={<UsersIcon className="size-5" />} tone="info" sublabel="412 in trial" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="MRR Growth"
          subtitle="Net new + expansion, last 12 months"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+8.4% MoM</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"] },
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
            }}
            series={[
              { name: "MRR", data: [112, 122, 128, 134, 142, 148, 156, 162, 168, 172, 178, 185] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Trial Conversion" subtitle="7-day rolling" action={<Badge variant="success" size="sm">+4.2pp</Badge>} />
          <div className="grid place-items-center py-4">
            <HeliosChart
              type="radialBar"
              height={240}
              options={{
                labels: ["Conversion"],
                plotOptions: { radialBar: { hollow: { size: "60%" }, dataLabels: { value: { fontSize: "26px", fontWeight: 700 } } } },
                colors: ["#10b981"],
                fill: { type: "gradient", gradient: { shade: "light", shadeIntensity: 0.4, gradientToColors: ["#34d399"], stops: [0, 100] } },
              }}
              series={[42]}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">Trials</p>
              <p className="text-base font-bold text-dark dark:text-white">412</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">Converted</p>
              <p className="text-base font-bold text-primary dark:text-primary-light">173</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">Expired</p>
              <p className="text-base font-bold text-red dark:text-red-light">62</p>
            </div>
          </div>
        </Card>

        <ChartCard
          title="Churn by Cohort"
          subtitle="Monthly logo churn %"
          className="col-span-12 xl:col-span-6"
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
              xaxis: { categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"] },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `${v}%` } },
              colors: ["#f59e0b"],
            }}
            series={[{ name: "Churn", data: [4.2, 3.8, 3.4, 3.6, 3.1, 2.9, 2.8, 3.0, 2.6, 2.5, 2.4, 2.4] }]}
          />
        </ChartCard>

        <ChartCard
          title="Plan Distribution"
          subtitle="Active accounts by plan"
          className="col-span-12 xl:col-span-6"
        >
          <HeliosChart
            type="polarArea"
            height={300}
            options={{
              labels: ["Free", "Starter", "Pro", "Enterprise"],
              legend: { position: "bottom" },
            }}
            series={[560, 380, 286, 58]}
          />
        </ChartCard>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Customer Accounts" subtitle="Plan, seats, MRR and usage" action={<Badge variant="neutral" size="sm">8 of 1,284</Badge>} />
          </div>
          <DataTable<Account>
            data={accounts}
            rowKey={(a) => a.id}
            pageSize={6}
            columns={[
              { key: "customer", header: "Customer", cell: (a) => <span className="font-medium text-dark dark:text-white">{a.customer}</span> },
              { key: "id", header: "Account ID", cell: (a) => <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{a.id}</span> },
              { key: "plan", header: "Plan", cell: (a) => <Badge variant={planVariant[a.plan]}>{a.plan}</Badge> },
              { key: "seats", header: "Seats", sortable: true, sortAccessor: (a) => a.seats, cell: (a) => a.seats },
              { key: "mrr", header: "MRR", sortable: true, sortAccessor: (a) => a.mrrVal, cell: (a) => <span className="font-semibold">{a.mrr}</span> },
              {
                key: "usage",
                header: "Usage",
                cell: (a) => (
                  <div className="flex items-center gap-2">
                    <Progress value={a.usage} tone={a.usage > 85 ? "danger" : a.usage > 65 ? "accent" : "primary"} size="xs" className="w-24" />
                    <span className="text-xs font-semibold text-dark-5 dark:text-dark-6">{a.usage}%</span>
                  </div>
                ),
              },
              { key: "status", header: "Status", cell: (a) => <Badge variant={statusVariant[a.status]}>{a.status}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "SaaS" }]} />
      </div>
    </div>
  );
}