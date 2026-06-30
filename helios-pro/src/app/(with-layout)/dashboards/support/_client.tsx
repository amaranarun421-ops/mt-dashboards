"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  TicketIcon,
  LifeBuoyIcon,
  ActivityIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";

type Ticket = {
  id: string;
  subject: string;
  customer: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "pending" | "resolved";
  channel: "Email" | "Chat" | "Phone" | "Social";
  updated: string;
};

const tickets: Ticket[] = [
  { id: "TK-9241", subject: "Billing discrepancy on annual plan", customer: "Maya Lindqvist", priority: "high", status: "open", channel: "Email", updated: "3 min ago" },
  { id: "TK-9240", subject: "Cannot connect Helios API key", customer: "Diego Fernández", priority: "urgent", status: "open", channel: "Chat", updated: "8 min ago" },
  { id: "TK-9239", subject: "Export to CSV missing columns", customer: "Aiko Mori", priority: "medium", status: "pending", channel: "Email", updated: "22 min ago" },
  { id: "TK-9238", subject: "Slack integration keeps disconnecting", customer: "Lucas Bauer", priority: "high", status: "open", channel: "Chat", updated: "35 min ago" },
  { id: "TK-9237", subject: "Refund request — duplicate charge", customer: "Priya Iyer", priority: "urgent", status: "pending", channel: "Phone", updated: "1 hr ago" },
  { id: "TK-9236", subject: "Feature request: dark mode export", customer: "Noah Kim", priority: "low", status: "resolved", channel: "Social", updated: "2 hr ago" },
];

const priorityVariant = {
  low: "neutral",
  medium: "info",
  high: "accent",
  urgent: "danger",
} as const;

const statusVariant = {
  open: "danger",
  pending: "warning",
  resolved: "success",
} as const;

const channelVariant = {
  Email: "info",
  Chat: "primary",
  Phone: "accent",
  Social: "violet",
} as const;

const leaderboard = [
  { name: "Layla Hassan", resolved: 184, csat: 4.9, target: 96 },
  { name: "Noah Kim", resolved: 168, csat: 4.8, target: 88 },
  { name: "Emma Reyes", resolved: 152, csat: 4.7, target: 82 },
  { name: "Marcus Bell", resolved: 138, csat: 4.6, target: 74 },
  { name: "Yuki Tanaka", resolved: 122, csat: 4.8, target: 68 },
];

export default function SupportDashboard() {
  return (
    <div>
      <PageHeader
        title="Support Dashboard"
        description="Ticket queue health, response times and agent performance for the Helios Pro support org."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Support" }]}
        actions={
          <>
            <Button variant="outline" size="sm">All queues</Button>
            <Button variant="primary" size="sm">+ New ticket</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Tickets" value="142" delta={{ value: "+18", trend: "up" }} icon={<TicketIcon className="size-5" />} tone="rose" sublabel="12 urgent" />
        <StatCard label="Avg. First Response" value="2m 48s" delta={{ value: "-22s", trend: "down" }} icon={<LifeBuoyIcon className="size-5" />} tone="primary" sublabel="target &lt; 3m" />
        <StatCard label="Resolved Today" value="284" delta={{ value: "+12.4%", trend: "up" }} icon={<ActivityIcon className="size-5" />} tone="accent" sublabel="across 6 agents" />
        <StatCard label="CSAT Score" value="4.7 / 5" delta={{ value: "+0.1", trend: "up" }} icon={<StarIcon className="size-5" />} tone="violet" sublabel="from 1,820 ratings" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Ticket Volume"
          subtitle="Daily inbound tickets, last 14 days"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="warning">+12 peak</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: Array.from({ length: 14 }, (_, i) => `D${i + 1}`) },
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Inbound", data: [82, 78, 92, 88, 104, 96, 112, 108, 124, 118, 132, 128, 142, 138] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Satisfaction" subtitle="CSAT distribution" action={<Badge variant="success" size="sm">94%</Badge>} />
          <div className="grid place-items-center py-4">
            <HeliosChart
              type="radialBar"
              height={240}
              options={{
                labels: ["CSAT"],
                plotOptions: { radialBar: { hollow: { size: "62%" }, dataLabels: { value: { fontSize: "26px", fontWeight: 700, formatter: (v: number) => `${Math.round(v)}%` } } } },
                colors: ["#10b981"],
                fill: { type: "gradient", gradient: { shade: "light", shadeIntensity: 0.4, gradientToColors: ["#34d399"], stops: [0, 100] } },
              }}
              series={[94]}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">5★</p>
              <p className="text-base font-bold text-primary dark:text-primary-light">1,420</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">4★</p>
              <p className="text-base font-bold text-accent-dark dark:text-accent-light">284</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">≤3★</p>
              <p className="text-base font-bold text-red dark:text-red-light">116</p>
            </div>
          </div>
        </Card>

        <ChartCard
          title="Response Time Trend"
          subtitle="First response (min), last 12 weeks"
          className="col-span-12 xl:col-span-7"
          action={<Badge variant="success">-22s</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: Array.from({ length: 12 }, (_, i) => `W${i + 1}`) },
              stroke: { curve: "smooth", width: 3 },
              markers: { size: 4 },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `${v}m` } },
            }}
            series={[
              { name: "Email", data: [8.4, 8.2, 7.8, 7.4, 7.0, 6.6, 6.2, 5.8, 5.4, 5.0, 4.6, 4.2] },
              { name: "Chat", data: [3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-5">
          <CardHeader title="Agent Leaderboard" subtitle="By resolved tickets this week" action={<Badge variant="primary" size="sm">Top 5</Badge>} />
          <ul className="space-y-3">
            {leaderboard.map((a, i) => (
              <li key={a.name} className="flex items-center gap-3 rounded-xl border border-stroke p-3 dark:border-dark-3">
                <span className={`grid size-7 place-items-center rounded-lg text-xs font-bold ${i === 0 ? "bg-accent-subtle text-accent-dark dark:bg-accent/15" : "bg-gray-2 text-dark-5 dark:bg-white/5"}`}>
                  {i + 1}
                </span>
                <Avatar name={a.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-dark dark:text-white">{a.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={a.target} tone={a.target > 85 ? "success" : a.target > 70 ? "accent" : "rose"} size="xs" className="w-24" />
                    <span className="text-xs text-dark-5 dark:text-dark-6">{a.target}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-dark dark:text-white">{a.resolved}</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">★ {a.csat}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Recent Tickets" subtitle="Live queue" action={<Badge variant="neutral" size="sm">6 of 142</Badge>} />
          </div>
          <DataTable<Ticket>
            data={tickets}
            rowKey={(t) => t.id}
            pageSize={6}
            columns={[
              { key: "id", header: "Ticket", cell: (t) => <span className="font-mono text-xs text-primary dark:text-primary-light">{t.id}</span> },
              { key: "subject", header: "Subject", cell: (t) => <span className="font-medium text-dark dark:text-white">{t.subject}</span> },
              { key: "customer", header: "Customer", cell: (t) => (
                <div className="flex items-center gap-2">
                  <Avatar name={t.customer} size="xs" />
                  <span className="text-dark-7">{t.customer}</span>
                </div>
              ) },
              { key: "channel", header: "Channel", cell: (t) => <Badge variant={channelVariant[t.channel]}>{t.channel}</Badge> },
              { key: "priority", header: "Priority", cell: (t) => <Badge variant={priorityVariant[t.priority]}>{t.priority}</Badge> },
              { key: "status", header: "Status", cell: (t) => <Badge variant={statusVariant[t.status]}>{t.status}</Badge> },
              { key: "updated", header: "Updated", cell: (t) => <span className="text-dark-5 dark:text-dark-6">{t.updated}</span> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Support" }]} />
      </div>
    </div>
  );
}