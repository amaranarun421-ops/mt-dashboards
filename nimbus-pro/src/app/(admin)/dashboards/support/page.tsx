"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { TICKETS } from "@/data/mock";
import {
  Ticket, Clock, Smile, CheckCircle2, Plus, Download, ArrowUpRight,
  AlertTriangle, ShieldCheck, Zap, MessageSquare, Mail, Headphones
} from "lucide-react";

const CREATED = [42, 38, 45, 52, 48, 56, 62, 58, 64, 72, 68, 78, 82, 76];
const RESOLVED = [38, 41, 42, 48, 50, 52, 58, 54, 62, 68, 64, 72, 78, 74];
const DAYS14 = Array.from({ length: 14 }, (_, i) => `D${i + 1}`);

const PRIORITY_DIST = [
  { name: "Urgent", value: 8, color: "#f43f5e" },
  { name: "High", value: 22, color: "#f59e0b" },
  { name: "Medium", value: 48, color: "#0ea5e9" },
  { name: "Low", value: 32, color: "#10b981" },
];

const AGENTS = [
  { name: "Aaroh Sharma", open: 12, resolved: 84, avgResponse: "4m 12s", csat: 4.8 },
  { name: "Ethan Wright", open: 8, resolved: 92, avgResponse: "3m 48s", csat: 4.9 },
  { name: "Priya Iyer", open: 15, resolved: 76, avgResponse: "5m 24s", csat: 4.7 },
  { name: "Sofia García", open: 6, resolved: 68, avgResponse: "4m 56s", csat: 4.6 },
  { name: "Marcus Chen", open: 9, resolved: 58, avgResponse: "6m 02s", csat: 4.5 },
];

const priorityTone = (p: string) =>
  p === "urgent" ? "error" : p === "high" ? "warning" : p === "medium" ? "brand" : "gray";

const statusTone = (s: string) =>
  s === "open" ? "brand" : s === "in_progress" ? "warning" : s === "resolved" ? "success" : s === "pending" ? "purple" : "gray";

const statusLabel = (s: string) =>
  s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1);

const channelIcon = (c: string) => (c === "email" ? Mail : c === "chat" ? MessageSquare : Headphones);

export default function SupportDashboard() {
  const ticketTrendOptions = {
    ...baseChartOptions("line"),
    colors: ["#0ea5e9", "#10b981"],
    stroke: { curve: "smooth", width: [3, 3] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: DAYS14, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 4, hover: { size: 7 } },
    tooltip: { shared: true, y: { formatter: (v: number) => `${v} tickets` } },
  };
  const ticketTrendSeries = [
    { name: "Created", data: CREATED },
    { name: "Resolved", data: RESOLVED },
  ];

  const priorityOptions = {
    ...baseChartOptions("donut"),
    labels: PRIORITY_DIST.map((p) => p.name),
    colors: PRIORITY_DIST.map((p) => p.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Open", formatter: () => "110" } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v} tickets` } },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Dashboard"
        description="Tickets, response times, agent performance, and customer satisfaction."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Support" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Ticket</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Tickets" value="110" delta="+8" deltaTone="down" icon={Ticket} iconTone="brand" footer="22 unassigned" />
        <StatCard label="Avg. Response Time" value="4m 38s" delta="-32s" deltaTone="up" icon={Clock} iconTone="purple" footer="p50 across channels" />
        <StatCard label="CSAT Score" value="4.7 / 5" delta="+0.2" deltaTone="up" icon={Smile} iconTone="success" footer="from 1,842 ratings" />
        <StatCard label="Resolved Today" value="74" delta="+18" deltaTone="up" icon={CheckCircle2} iconTone="orange" footer="vs yesterday" />
      </div>

      <Card className="overflow-hidden border-0 bg-gradient-to-r from-warning-500 via-error-500 to-pink-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">SLA Status</p>
              <Badge className="bg-white/20 text-white">At Risk</Badge>
            </div>
            <h3 className="mt-2 text-2xl font-bold">3 tickets breaching SLA in the next hour</h3>
            <p className="mt-1 text-sm opacity-90">2 urgent, 1 high priority. Reassign or escalate now to avoid breaches.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="bg-white text-warning-700 hover:bg-white/90">
                <Zap className="h-3.5 w-3.5" /> Escalate at-risk
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">View queue</Button>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs opacity-90">SLA Compliance (30d)</p>
            <p className="mt-1 text-3xl font-bold">96.4%</p>
            <Progress value={96.4} tone="brand" size="md" className="mt-3 bg-white/20" />
            <p className="mt-2 text-xs opacity-90">Target: 98%</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Tickets: Created vs Resolved"
            description="Daily volume over the last 14 days"
            action={<Badge tone="success" dot>Resolution catching up</Badge>}
          />
          <CardBody>
            <NimbusChart options={ticketTrendOptions} series={ticketTrendSeries} type="line" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Priority Breakdown" description="Open tickets by priority" />
          <CardBody>
            <NimbusChart options={priorityOptions} series={PRIORITY_DIST.map((p) => p.value)} type="donut" height={240} />
            <div className="mt-4 space-y-2">
              {PRIORITY_DIST.map((p) => (
                <div key={p.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                  <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{p.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader
            title="Agent Performance"
            description="Top support reps this week"
            action={<Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>}
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Open</th>
                  <th>Resolved</th>
                  <th>Avg. Response</th>
                  <th>CSAT</th>
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a) => (
                  <tr key={a.name}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={a.name} size={32} />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{a.name}</span>
                      </div>
                    </td>
                    <td>
                      <Badge tone={a.open > 12 ? "warning" : "gray"} variant="soft">{a.open}</Badge>
                    </td>
                    <td className="text-sm font-bold text-success-600 dark:text-success-400">{a.resolved}</td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{a.avgResponse}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{a.csat}</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Smile key={i} className={`h-3 w-3 ${i < Math.round(a.csat) ? "text-warning-500" : "text-gray-300 dark:text-gray-700"}`} />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Channel Mix" description="Tickets by source channel" />
          <CardBody className="space-y-4">
            {[
              { name: "Email", count: 48, icon: Mail, tone: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" },
              { name: "Live Chat", count: 38, icon: MessageSquare, tone: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400" },
              { name: "Phone", count: 14, icon: Headphones, tone: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400" },
              { name: "Web Form", count: 10, icon: Ticket, tone: "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400" },
            ].map((c) => {
              const pct = Math.round((c.count / 110) * 100);
              return (
                <div key={c.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.tone}`}>
                        <c.icon className="h-3.5 w-3.5" />
                      </span>
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.count} · {pct}%</span>
                  </div>
                  <Progress value={pct} size="sm" tone="brand" />
                </div>
              );
            })}
            <div className="mt-4 rounded-xl bg-error-50 p-4 dark:bg-error-500/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-error-600 dark:text-error-400" />
                <p className="text-sm font-semibold text-error-700 dark:text-error-300">SLA at risk</p>
              </div>
              <p className="mt-1 text-xs text-error-600 dark:text-error-400">3 urgent tickets need a response within 1 hour.</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent Tickets"
          description="Latest activity in the support queue"
          action={<Button variant="ghost" size="sm">Open inbox <ArrowUpRight className="h-3 w-3" /></Button>}
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Assignee</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {TICKETS.map((t) => {
            const ChannelIcon = channelIcon(t.channel);
            return (
              <tr key={t.id}>
                <td className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{t.id}</td>
                <td>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.subject}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.requester}</p>
                  </div>
                </td>
                <td>
                  <Badge tone={priorityTone(t.priority) as "error" | "warning" | "brand" | "gray"} variant="soft" dot>
                    {t.priority}
                  </Badge>
                </td>
                <td>
                  <Badge tone={statusTone(t.status) as "brand" | "warning" | "success" | "purple" | "gray"} variant="soft">
                    {statusLabel(t.status)}
                  </Badge>
                </td>
                <td>
                  <span className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <ChannelIcon className="h-3.5 w-3.5" />
                    {t.channel}
                  </span>
                </td>
                <td className="text-sm text-gray-700 dark:text-gray-300">{t.assigned}</td>
                <td className="text-xs text-gray-500 dark:text-gray-400">{t.updated} ago</td>
              </tr>
            );
          })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
