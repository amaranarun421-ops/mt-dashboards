"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { TEAM_PERFORMANCE, MONTHS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import {
  UserPlus, Handshake, Trophy, DollarSign, Plus, Download, ArrowUpRight, ArrowDownRight,
  Target, Phone, Mail, Calendar, Users as UsersIcon
} from "lucide-react";

const LEAD_SOURCES = [
  { name: "Referral", value: 38, color: "#10b981" },
  { name: "Inbound", value: 28, color: "#0ea5e9" },
  { name: "Outbound", value: 18, color: "#8b5cf6" },
  { name: "Event", value: 10, color: "#f59e0b" },
  { name: "Partner", value: 6, color: "#f43f5e" },
];

const STAGE_DATA: Record<string, number[]> = {
  Prospect: [12, 15, 18, 14, 20, 22, 19, 24, 26, 23, 28, 30],
  Qualified: [8, 10, 12, 11, 14, 16, 15, 18, 19, 17, 21, 23],
  Proposal: [5, 6, 8, 7, 9, 10, 9, 12, 11, 10, 13, 15],
  Negotiation: [3, 4, 5, 4, 6, 7, 6, 8, 7, 7, 9, 11],
  Won: [2, 3, 4, 4, 5, 6, 5, 7, 7, 8, 9, 11],
};

const PIPELINE_STAGES = [
  { name: "Prospect", count: 142, value: 710000, color: "bg-gray-400" },
  { name: "Qualified", count: 98, value: 588000, color: "bg-accent-500" },
  { name: "Proposal", count: 64, value: 512000, color: "bg-purple-500" },
  { name: "Negotiation", count: 38, value: 380000, color: "bg-warning-500" },
  { name: "Won", count: 24, value: 312000, color: "bg-brand-500" },
];

export default function CRMDashboard() {
  const dealsByStageOptions = {
    ...baseChartOptions("bar"),
    colors: ["#94a3b8", "#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981"],
    chart: { ...baseChartOptions("bar").chart, stacked: true, type: "bar" },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    tooltip: { shared: true, y: { formatter: (v: number) => `${v} deals` } },
  };
  const dealsByStageSeries = Object.entries(STAGE_DATA).map(([name, data]) => ({ name, data }));

  const leadSourceOptions = {
    ...baseChartOptions("donut"),
    labels: LEAD_SOURCES.map((s) => s.name),
    colors: LEAD_SOURCES.map((s) => s.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Leads", formatter: () => "1,284" } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  const maxPipeline = Math.max(...PIPELINE_STAGES.map((s) => s.value));

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM Dashboard"
        description="Pipeline health, lead sources, and sales team performance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "CRM" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Lead</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="New Leads" value="1,284" delta="+18.4%" deltaTone="up" icon={UserPlus} iconTone="brand" footer="this month" />
        <StatCard label="Open Deals" value="366" delta="+6.2%" deltaTone="up" icon={Handshake} iconTone="purple" footer="$2.49M pipeline" />
        <StatCard label="Won (Q2)" value="78" delta="+12.5%" deltaTone="up" icon={Trophy} iconTone="success" footer="$612k closed" />
        <StatCard label="Revenue" value="$1.84M" delta="+9.1%" deltaTone="up" icon={DollarSign} iconTone="orange" footer="vs last quarter" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Deals by Stage"
            description="Monthly deal count broken down by pipeline stage"
            action={<Badge tone="brand" dot>+24% YoY</Badge>}
          />
          <CardBody>
            <NimbusChart options={dealsByStageOptions} series={dealsByStageSeries} type="bar" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Lead Sources" description="Where new leads originate" />
          <CardBody>
            <NimbusChart options={leadSourceOptions} series={LEAD_SOURCES.map((s) => s.value)} type="donut" height={240} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {LEAD_SOURCES.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                  <span className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Pipeline Overview"
            description="Deal value by stage across the active pipeline"
            action={<Button variant="ghost" size="sm">View deals <ArrowUpRight className="h-3 w-3" /></Button>}
          />
          <CardBody>
            <div className="space-y-4">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{stage.name}</span>
                      <Badge tone="gray" variant="soft">{stage.count} deals</Badge>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(stage.value)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full ${stage.color} transition-all duration-700`}
                        style={{ width: `${(stage.value / maxPipeline) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs text-gray-500 dark:text-gray-400">
                      {Math.round((stage.value / maxPipeline) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Pipeline</p>
                <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(2502000)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weighted Forecast</p>
                <p className="mt-1 text-xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(842000)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Win Rate</p>
                <p className="mt-1 text-xl font-bold text-success-600 dark:text-success-400">28.4%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Activity" description="Sales team updates" />
          <CardBody className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {[
              { icon: Trophy, color: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400", text: "Priya Iyer closed deal with Acme Corp — $48,000", time: "12m ago" },
              { icon: Phone, color: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400", text: "Marcus Chen logged a call with Globex Industries", time: "1h ago" },
              { icon: Mail, color: "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400", text: "Sofia García sent proposal to Initech LLC", time: "2h ago" },
              { icon: UserPlus, color: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400", text: "New lead from event: Wayne Foundation", time: "4h ago" },
              { icon: Calendar, color: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400", text: "Demo scheduled with Stark Enterprises", time: "6h ago" },
              { icon: Target, color: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400", text: "Yuki Tanaka moved 3 deals to Negotiation", time: "Yesterday" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-gray-700 dark:text-gray-300">{a.text}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{a.time}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Sales Leaderboard"
          description="Individual rep performance this quarter"
          action={
            <div className="flex items-center gap-2">
              <Badge tone="brand" variant="soft"><UsersIcon className="h-3 w-3" /> 4 reps</Badge>
              <Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Rep</th>
                <th>Role</th>
                <th>Deals</th>
                <th>Revenue</th>
                <th>Conversion</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {TEAM_PERFORMANCE.map((rep, i) => (
                <tr key={rep.name}>
                  <td>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={rep.name} size={32} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{rep.name}</span>
                    </div>
                  </td>
                  <td className="text-sm text-gray-600 dark:text-gray-400">{rep.role}</td>
                  <td className="text-sm font-semibold text-gray-900 dark:text-white">{rep.deals}</td>
                  <td className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(rep.revenue)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Progress value={rep.conversion} size="sm" className="w-20" tone={rep.conversion >= 60 ? "success" : rep.conversion >= 45 ? "brand" : "warning"} />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{rep.conversion}%</span>
                    </div>
                  </td>
                  <td>
                    <Badge tone={rep.trend === "up" ? "success" : "error"} variant="soft">
                      {rep.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {rep.trend === "up" ? "Up" : "Down"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-brand-600 to-accent-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
          {[
            { label: "Quota Attainment", value: "84%", icon: Target },
            { label: "Avg. Deal Size", value: "$24.8k", icon: DollarSign },
            { label: "Sales Cycle", value: "32 days", icon: Calendar },
            { label: "Active Reps", value: "12", icon: UsersIcon },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs font-medium opacity-90">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
