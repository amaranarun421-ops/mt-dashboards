"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { ChartCard } from "@/components/shared/chart-card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { HeliosChart, heliosChartColors } from "@/components/shared/helios-chart";
import {
  FileBarIcon,
  WalletIcon,
  UsersIcon,
  GaugeIcon,
  RefreshCwIcon,
  GlobeIcon,
} from "@/components/Layouts/sidebar/icons";

type ReportKey = "revenue" | "users" | "conversion" | "retention" | "geography";

type Report = {
  key: ReportKey;
  name: string;
  description: string;
  icon: React.ReactNode;
  tone: "primary" | "accent" | "violet" | "info" | "rose";
  updatedAt: string;
  schedule: string;
};

const toneBg: Record<Report["tone"], string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
};

const reports: Report[] = [
  {
    key: "revenue",
    name: "Revenue Report",
    description: "Gross & net revenue, refunds, MRR trend",
    icon: <WalletIcon className="size-5" />,
    tone: "primary",
    updatedAt: "2 hours ago",
    schedule: "Daily · 06:00 UTC",
  },
  {
    key: "users",
    name: "Users Report",
    description: "Active, new, retained users by cohort",
    icon: <UsersIcon className="size-5" />,
    tone: "info",
    updatedAt: "1 hour ago",
    schedule: "Hourly",
  },
  {
    key: "conversion",
    name: "Conversion Report",
    description: "Funnel drop-off & conversion rate",
    icon: <GaugeIcon className="size-5" />,
    tone: "accent",
    updatedAt: "30 min ago",
    schedule: "Realtime",
  },
  {
    key: "retention",
    name: "Retention Report",
    description: "Cohort retention heatmap & churn",
    icon: <RefreshCwIcon className="size-5" />,
    tone: "violet",
    updatedAt: "4 hours ago",
    schedule: "Weekly · Mon 09:00",
  },
  {
    key: "geography",
    name: "Geography Report",
    description: "Revenue & users by country/region",
    icon: <GlobeIcon className="size-5" />,
    tone: "rose",
    updatedAt: "1 day ago",
    schedule: "Daily · 00:00 UTC",
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Row = { id: string; metric: string; current: number; previous: number; change: number; status: "up" | "down" | "flat" };

const reportData: Record<ReportKey, {
  subtitle: string;
  chart: { type: "line" | "area" | "bar" | "donut" | "radar"; series: ApexCharts.ApexOptions["series"]; options: ApexCharts.ApexOptions };
  rows: Row[];
}> = {
  revenue: {
    subtitle: "Gross revenue by month (current vs prior year)",
    chart: {
      type: "area",
      series: [
        { name: "2024", data: [180, 196, 215, 232, 248, 264, 282, 296, 312, 328, 344, 368] },
        { name: "2023", data: [142, 158, 168, 184, 198, 212, 224, 236, 248, 262, 278, 296] },
      ],
      options: {
        xaxis: { categories: months },
        stroke: { curve: "smooth", width: 2 },
        fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
        dataLabels: { enabled: false },
        markers: { size: 0 },
        legend: { position: "top" },
        tooltip: { y: { formatter: (v: number) => `$${v}K` } },
        colors: [heliosChartColors[0], heliosChartColors[1]],
      },
    },
    rows: [
      { id: "rev-1", metric: "Gross Revenue", current: 368000, previous: 296000, change: 24.3, status: "up" },
      { id: "rev-2", metric: "Refunds", current: 8420, previous: 9180, change: -8.3, status: "up" },
      { id: "rev-3", metric: "Net Revenue", current: 359580, previous: 286820, change: 25.4, status: "up" },
      { id: "rev-4", metric: "MRR", current: 94820, previous: 76840, change: 23.4, status: "up" },
      { id: "rev-5", metric: "ARPU", current: 148.2, previous: 140.9, change: 5.2, status: "up" },
      { id: "rev-6", metric: "Discount Burn", current: 12480, previous: 9840, change: 26.8, status: "down" },
    ],
  },
  users: {
    subtitle: "Active users, last 12 months",
    chart: {
      type: "line",
      series: [
        { name: "Active", data: [42, 48, 45, 52, 58, 55, 62, 68, 64, 72, 76, 82] },
        { name: "New", data: [12, 14, 16, 18, 22, 19, 24, 28, 26, 32, 34, 38] },
        { name: "Resurrected", data: [3, 4, 4, 5, 6, 6, 7, 8, 7, 9, 10, 11] },
      ],
      options: {
        xaxis: { categories: months },
        stroke: { curve: "smooth", width: 2, dashArray: [0, 0, 6] },
        markers: { size: 3 },
        dataLabels: { enabled: false },
        legend: { position: "top" },
        colors: [heliosChartColors[0], heliosChartColors[1], heliosChartColors[2]],
      },
    },
    rows: [
      { id: "usr-1", metric: "Total Users", current: 58420, previous: 42180, change: 38.5, status: "up" },
      { id: "usr-2", metric: "Active (DAU)", current: 18620, previous: 14280, change: 30.4, status: "up" },
      { id: "usr-3", metric: "New Signups", current: 3820, previous: 2980, change: 28.2, status: "up" },
      { id: "usr-4", metric: "Resurrected", current: 1100, previous: 820, change: 34.1, status: "up" },
      { id: "usr-5", metric: "Churned", current: 640, previous: 720, change: -11.1, status: "up" },
      { id: "usr-6", metric: "Stickiness (DAU/MAU)", current: 48.2, previous: 42.8, change: 12.6, status: "up" },
    ],
  },
  conversion: {
    subtitle: "Funnel conversion by stage",
    chart: {
      type: "bar",
      series: [
        { name: "Users", data: [18420, 12480, 8240, 5180, 3280, 2240] },
      ],
      options: {
        xaxis: { categories: ["Visited", "Signed Up", "Activated", "Trial", "Paid", "Renewed"] },
        plotOptions: { bar: { columnWidth: "55%", borderRadius: 6, borderRadiusApplication: "end", distributed: true } },
        stroke: { show: false },
        dataLabels: { enabled: false },
        legend: { show: false },
        colors: heliosChartColors,
        tooltip: { y: { formatter: (v: number) => `${v.toLocaleString()} users` } },
      },
    },
    rows: [
      { id: "cnv-1", metric: "Visitors", current: 18420, previous: 14820, change: 24.3, status: "up" },
      { id: "cnv-2", metric: "Signups", current: 12480, previous: 9820, change: 27.1, status: "up" },
      { id: "cnv-3", metric: "Activated", current: 8240, previous: 6480, change: 27.2, status: "up" },
      { id: "cnv-4", metric: "Trial Started", current: 5180, previous: 4280, change: 21.0, status: "up" },
      { id: "cnv-5", metric: "Paid Conversion", current: 3.84, previous: 3.21, change: 19.6, status: "up" },
      { id: "cnv-6", metric: "Renewal Rate", current: 86.4, previous: 82.1, change: 5.2, status: "up" },
    ],
  },
  retention: {
    subtitle: "Cohort retention radar (6 dimensions)",
    chart: {
      type: "radar",
      series: [
        { name: "Q3 Cohort", data: [92, 78, 64, 52, 44, 38] },
        { name: "Q4 Cohort", data: [94, 84, 72, 60, 52, 46] },
      ],
      options: {
        labels: ["W1", "W2", "W4", "W8", "W12", "W16"],
        stroke: { width: 2 },
        fill: { opacity: 0.25 },
        markers: { size: 4, strokeWidth: 0 },
        legend: { position: "top" },
        yaxis: { show: false },
        colors: [heliosChartColors[2], heliosChartColors[0]],
      },
    },
    rows: [
      { id: "ret-1", metric: "Week 1 Retention", current: 94.2, previous: 92.4, change: 1.9, status: "up" },
      { id: "ret-2", metric: "Week 4 Retention", current: 72.4, previous: 64.8, change: 11.7, status: "up" },
      { id: "ret-3", metric: "Week 8 Retention", current: 60.2, previous: 52.4, change: 14.9, status: "up" },
      { id: "ret-4", metric: "Net Revenue Retention", current: 118.4, previous: 108.2, change: 9.4, status: "up" },
      { id: "ret-5", metric: "Gross Revenue Retention", current: 92.8, previous: 88.4, change: 5.0, status: "up" },
      { id: "ret-6", metric: "Churn (Logo)", current: 2.8, previous: 3.4, change: -17.6, status: "up" },
    ],
  },
  geography: {
    subtitle: "Revenue share by region",
    chart: {
      type: "donut",
      series: [38, 28, 24, 10],
      options: {
        labels: ["Americas", "EMEA", "APAC", "Other"],
        legend: { position: "bottom" },
        stroke: { width: 0 },
        plotOptions: { pie: { donut: { size: "68%" } } },
        colors: heliosChartColors.slice(0, 4),
        tooltip: { y: { formatter: (v: number) => `${v}%` } },
      },
    },
    rows: [
      { id: "geo-1", metric: "Americas", current: 38.4, previous: 34.2, change: 12.3, status: "up" },
      { id: "geo-2", metric: "EMEA", current: 28.2, previous: 30.1, change: -6.3, status: "down" },
      { id: "geo-3", metric: "APAC", current: 24.1, previous: 22.4, change: 7.6, status: "up" },
      { id: "geo-4", metric: "Other", current: 9.3, previous: 13.3, change: -30.1, status: "down" },
      { id: "geo-5", metric: "Top Country", current: 0, previous: 0, change: 0, status: "flat" },
      { id: "geo-6", metric: "Countries Reached", current: 142, previous: 128, change: 10.9, status: "up" },
    ],
  },
};

const columns = [
  {
    key: "metric",
    header: "Metric",
    cell: (row: Row) => <span className="font-medium text-dark dark:text-white">{row.metric}</span>,
  },
  {
    key: "current",
    header: "Current",
    cell: (row: Row) => <span className="font-mono text-dark-7 dark:text-dark-7">{row.current.toLocaleString()}</span>,
  },
  {
    key: "previous",
    header: "Previous",
    cell: (row: Row) => <span className="font-mono text-dark-7 dark:text-dark-7">{row.previous.toLocaleString()}</span>,
  },
  {
    key: "change",
    header: "Change",
    sortable: true,
    sortAccessor: (row: Row) => row.change,
    cell: (row: Row) => {
      const tone =
        row.status === "up"
          ? "text-primary dark:text-primary-light"
          : row.status === "down"
            ? "text-red dark:text-red-light"
            : "text-dark-5 dark:text-dark-6";
      return (
        <span className={`inline-flex items-center gap-1 font-semibold ${tone}`}>
          {row.change > 0 ? "+" : ""}
          {row.change}%
        </span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    cell: (row: Row) => {
      const variant = row.status === "up" ? "success" : row.status === "down" ? "danger" : "neutral";
      const label = row.status === "up" ? "Improved" : row.status === "down" ? "Declined" : "Flat";
      return <Badge variant={variant as "success" | "danger" | "neutral"}>{label}</Badge>;
    },
  },
];

function DownloadIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIconSmall() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ReportsClient() {
  const [selected, setSelected] = useState<ReportKey>("revenue");
  const report = reports.find((r) => r.key === selected)!;
  const data = reportData[selected];

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Browse, view and export scheduled Helios Pro reports."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Charts" },
          { label: "Reports" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <MailIconSmall /> Email
            </Button>
            <Button variant="primary" size="sm">
              <DownloadIcon /> Export
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar: report list */}
        <Card padded={false} className="overflow-hidden">
          <div className="border-b border-stroke px-4 py-3 dark:border-dark-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark dark:text-white">Report Library</h3>
              <Badge variant="primary" size="sm">{reports.length}</Badge>
            </div>
            <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">Click a report to view</p>
          </div>
          <ul className="helios-scroll max-h-[640px] overflow-y-auto p-2">
            {reports.map((r) => {
              const active = r.key === selected;
              return (
                <li key={r.key}>
                  <button
                    type="button"
                    onClick={() => setSelected(r.key)}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all ${
                      active
                        ? "bg-primary-subtle dark:bg-primary/15"
                        : "hover:bg-gray-2 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${toneBg[r.tone]}`}>
                      {r.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`truncate text-sm font-semibold ${active ? "text-primary dark:text-primary-light" : "text-dark dark:text-white"}`}>
                          {r.name}
                        </p>
                        {active && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-dark-5 dark:text-dark-6">{r.description}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-dark-6 dark:text-dark-6">{r.updatedAt}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-stroke px-4 py-3 dark:border-dark-3">
            <div className="flex items-center gap-2 text-xs text-dark-5 dark:text-dark-6">
              <FileBarIcon className="size-4 text-primary" />
              <span>Schedule: {report.schedule}</span>
            </div>
          </div>
        </Card>

        {/* Main: selected report */}
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className={`grid size-11 place-items-center rounded-xl ${toneBg[report.tone]}`}>
                  {report.icon}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-dark dark:text-white">{report.name}</h2>
                  <p className="text-sm text-dark-5 dark:text-dark-6">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">Last 12 months</Badge>
                <Badge variant={report.tone === "rose" ? "danger" : report.tone === "info" ? "info" : report.tone === "accent" ? "warning" : report.tone === "violet" ? "violet" : "primary"}>
                  {report.schedule}
                </Badge>
              </div>
            </div>
          </Card>

          <ChartCard
            title={report.name}
            subtitle={data.subtitle}
            action={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <DownloadIcon /> CSV
                </Button>
                <Button variant="soft" size="sm">
                  <DownloadIcon /> PDF
                </Button>
              </div>
            }
          >
            <HeliosChart
              type={data.chart.type}
              height={360}
              options={data.chart.options}
              series={data.chart.series}
            />
          </ChartCard>

          <Card padded={false} className="overflow-hidden">
            <CardHeader
              title="Detailed Breakdown"
              subtitle="Per-metric current vs previous period"
              className="px-5 pt-5 md:px-6 md:pt-6"
            />
            <DataTable
              columns={columns}
              data={data.rows}
              rowKey={(row) => row.id}
              pageSize={10}
              hoverable
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
