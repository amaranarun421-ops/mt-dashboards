"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  WalletIcon,
  CreditCardIcon,
  ActivityIcon,
  AlertIcon,
} from "@/components/Layouts/sidebar/icons";

type Tx = {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: string;
  value: number;
  status: "settled" | "pending" | "failed";
};

const transactions: Tx[] = [
  { id: "TX-88201", date: "Jan 14", description: "Stripe payout", category: "Revenue", type: "income", amount: "+$48,290.00", value: 48290, status: "settled" },
  { id: "TX-88198", date: "Jan 14", description: "AWS — production infra", category: "Cloud", type: "expense", amount: "-$8,420.00", value: -8420, status: "settled" },
  { id: "TX-88195", date: "Jan 13", description: "Payroll — Engineering", category: "Payroll", type: "expense", amount: "-$92,400.00", value: -92400, status: "settled" },
  { id: "TX-88192", date: "Jan 13", description: "Customer refund #R-2204", category: "Refund", type: "expense", amount: "-$1,890.00", value: -1890, status: "pending" },
  { id: "TX-88188", date: "Jan 12", description: "Helios Pro — annual upgrade", category: "Revenue", type: "income", amount: "+$12,800.00", value: 12800, status: "settled" },
  { id: "TX-88184", date: "Jan 12", description: "Notion + Linear", category: "Tools", type: "expense", amount: "-$640.00", value: -640, status: "settled" },
  { id: "TX-88180", date: "Jan 11", description: "Wire transfer — Vertex Mobility", category: "Revenue", type: "income", amount: "+$154,000.00", value: 154000, status: "settled" },
  { id: "TX-88177", date: "Jan 11", description: "Office lease", category: "Operations", type: "expense", amount: "-$18,200.00", value: -18200, status: "failed" },
];

const statusVariant = {
  settled: "success",
  pending: "warning",
  failed: "danger",
} as const;

// 20 days of OHLC candle data
const candleData = [
  { x: "Jan 02", y: [142.5, 148.2, 141.1, 146.8] },
  { x: "Jan 03", y: [146.8, 150.4, 145.2, 149.1] },
  { x: "Jan 04", y: [149.1, 151.2, 147.0, 148.4] },
  { x: "Jan 05", y: [148.4, 152.6, 146.8, 151.9] },
  { x: "Jan 08", y: [151.9, 154.2, 150.1, 152.7] },
  { x: "Jan 09", y: [152.7, 153.4, 148.9, 149.8] },
  { x: "Jan 10", y: [149.8, 153.0, 148.4, 152.1] },
  { x: "Jan 11", y: [152.1, 158.9, 151.6, 157.4] },
  { x: "Jan 12", y: [157.4, 161.2, 156.0, 160.2] },
  { x: "Jan 15", y: [160.2, 162.8, 158.4, 159.1] },
  { x: "Jan 16", y: [159.1, 160.4, 154.2, 155.6] },
  { x: "Jan 17", y: [155.6, 158.2, 153.8, 157.9] },
  { x: "Jan 18", y: [157.9, 163.4, 157.0, 162.8] },
  { x: "Jan 19", y: [162.8, 166.2, 161.4, 164.9] },
];

export default function FinanceDashboard() {
  return (
    <div>
      <PageHeader
        title="Finance Dashboard"
        description="Cash flow, market positions and operating expenses across all Helios Pro accounts."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Finance" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Jan 2025</Button>
            <Button variant="primary" size="sm">Download statement</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Net Income" value="$482,920" delta={{ value: "+18.4%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="primary" sublabel="Q4 vs. Q3" />
        <StatCard label="Operating Expenses" value="$284,180" delta={{ value: "-4.2%", trend: "down" }} icon={<CreditCardIcon className="size-5" />} tone="accent" sublabel="lower run-rate" />
        <StatCard label="Cash on Hand" value="$1.92M" delta={{ value: "+6.1%", trend: "up" }} icon={<ActivityIcon className="size-5" />} tone="violet" sublabel="3 accounts" />
        <StatCard label="Outstanding" value="$48,200" delta={{ value: "+2 invoices", trend: "neutral" }} icon={<AlertIcon className="size-5" />} tone="rose" sublabel="avg. 14 days late" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Helios Pro (HLPX) — 14d"
          subtitle="Daily OHLC candlestick"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+9.8% MTD</Badge>}
        >
          <HeliosChart
            type="candlestick"
            height={340}
            options={{
              chart: { type: "candlestick" },
              plotOptions: { candlestick: { colors: { upward: "#10b981", downward: "#ef4444" }, wick: { useFillColor: true } } },
              xaxis: { type: "category", labels: { rotate: -45 } },
              yaxis: { tooltip: { enabled: true }, labels: { formatter: (v: number) => `$${v.toFixed(0)}` } },
            }}
            series={[{ name: "HLPX", data: candleData }]}
          />
        </ChartCard>

        <ChartCard
          title="Expense Breakdown"
          subtitle="By category, this month"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={340}
            options={{
              labels: ["Payroll", "Cloud", "Operations", "Marketing", "Tools", "Other"],
              legend: { position: "bottom" },
              plotOptions: { pie: { donut: { size: "68%" } } },
            }}
            series={[92400, 8420, 18200, 12400, 640, 3400]}
          />
        </ChartCard>

        <ChartCard
          title="Revenue vs. Expenses"
          subtitle="Trailing 12 months"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="info">12mo</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"] },
              stroke: { curve: "smooth", width: 2 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
            }}
            series={[
              { name: "Revenue", data: [322, 338, 354, 372, 388, 412, 428, 446, 452, 468, 472, 482] },
              { name: "Expenses", data: [252, 258, 262, 268, 274, 276, 282, 286, 289, 282, 285, 284] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="KPI Tiles" subtitle="Key financial ratios" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gross Margin", value: "62.4%", tone: "text-primary dark:text-primary-light" },
              { label: "Burn Rate", value: "$94k/mo", tone: "text-accent-dark dark:text-accent-light" },
              { label: "Runway", value: "20 mo", tone: "text-primary dark:text-primary-light" },
              { label: "Quick Ratio", value: "1.84", tone: "text-violet dark:text-violet-light" },
              { label: "DSO", value: "31 days", tone: "text-blue-dark dark:text-blue-light" },
              { label: "Current Ratio", value: "2.62", tone: "text-primary dark:text-primary-light" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-stroke p-3 dark:border-dark-3">
                <p className="text-xs text-dark-5 dark:text-dark-6">{k.label}</p>
                <p className={`mt-1 text-xl font-bold ${k.tone}`}>{k.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Recent Transactions" subtitle="Settlement, payroll and refunds" action={<Badge variant="neutral" size="sm">8 of 142</Badge>} />
          </div>
          <DataTable<Tx>
            data={transactions}
            rowKey={(t) => t.id}
            pageSize={6}
            columns={[
              { key: "id", header: "Tx ID", cell: (t) => <span className="font-mono text-xs text-primary dark:text-primary-light">{t.id}</span> },
              { key: "date", header: "Date", cell: (t) => <span className="text-dark-7">{t.date}</span> },
              { key: "description", header: "Description", cell: (t) => <span className="font-medium text-dark dark:text-white">{t.description}</span> },
              { key: "category", header: "Category", cell: (t) => <Badge variant="neutral">{t.category}</Badge> },
              {
                key: "amount",
                header: "Amount",
                sortable: true,
                sortAccessor: (t) => t.value,
                cell: (t) => (
                  <span className={t.type === "income" ? "font-semibold text-primary dark:text-primary-light" : "font-semibold text-red dark:text-red-light"}>
                    {t.amount}
                  </span>
                ),
              },
              { key: "status", header: "Status", cell: (t) => <Badge variant={statusVariant[t.status]}>{t.status}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Finance" }]} />
      </div>
    </div>
  );
}