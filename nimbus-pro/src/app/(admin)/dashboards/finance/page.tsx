"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { FINANCE_KPI, TRANSACTIONS, MONTHS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import {
  Wallet, ArrowDownLeft, ArrowUpRight, Flame, Plus, Download, TrendingUp,
  PiggyBank, Building2, Landmark, Receipt
} from "lucide-react";

const INFLOW = [38, 42, 36, 48, 52, 44, 58, 62, 54, 68, 72, 48];
const OUTFLOW = [32, 38, 34, 42, 46, 52, 48, 54, 50, 58, 62, 51];

const EXPENSE_CATEGORIES = [
  { name: "Salaries", value: 48200, color: "#10b981" },
  { name: "Infrastructure", value: 8400, color: "#0ea5e9" },
  { name: "Marketing", value: 6200, color: "#8b5cf6" },
  { name: "SaaS", value: 3200, color: "#f59e0b" },
  { name: "Refunds", value: 1840, color: "#f43f5e" },
  { name: "Other", value: 1480, color: "#94a3b8" },
];

const ACCOUNTS = [
  { name: "Operating", balance: 124250, icon: Building2, tone: "brand" as const, color: "#10b981" },
  { name: "Payroll", balance: 38400, icon: Receipt, tone: "purple" as const, color: "#8b5cf6" },
  { name: "Savings", balance: 18400, icon: PiggyBank, tone: "success" as const, color: "#12b76a" },
  { name: "Tax", balance: 3200, icon: Landmark, tone: "warning" as const, color: "#f59e0b" },
];
const TOTAL_BALANCE = ACCOUNTS.reduce((s, a) => s + a.balance, 0);

export default function FinanceDashboard() {
  const cashflowOptions = {
    ...baseChartOptions("line"),
    colors: ["#10b981", "#f43f5e"],
    stroke: { curve: "smooth", width: [3, 3] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: [
      { seriesName: "Inflow", labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` }, title: { text: "Inflow", style: { color: "#10b981", fontSize: "12px" } } },
      { seriesName: "Outflow", opposite: true, labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` }, title: { text: "Outflow", style: { color: "#f43f5e", fontSize: "12px" } } },
    ],
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 4, hover: { size: 7 } },
    tooltip: { shared: true, y: { formatter: (v: number) => formatCurrency(v * 1000) } },
  };
  const cashflowSeries = [
    { name: "Inflow", data: INFLOW, type: "line" },
    { name: "Outflow", data: OUTFLOW, type: "line" },
  ];

  const expenseOptions = {
    ...baseChartOptions("donut"),
    labels: EXPENSE_CATEGORIES.map((c) => c.name),
    colors: EXPENSE_CATEGORIES.map((c) => c.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "68%", labels: { show: true, total: { show: true, label: "Total", formatter: () => formatCurrency(EXPENSE_CATEGORIES.reduce((s, c) => s + c.value, 0)) } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Dashboard"
        description="Cash flow, expenses, accounts, and burn rate — at a glance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Finance" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Statement</Button>
            <Button size="md"><Plus className="h-4 w-4" /> Record Txn</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Balance" value={formatCurrency(FINANCE_KPI.balance)} delta="+4.8%" deltaTone="up" icon={Wallet} iconTone="brand" footer="across 4 accounts" />
        <StatCard label="Monthly Inflow" value={formatCurrency(FINANCE_KPI.inflow)} delta="+12.1%" deltaTone="up" icon={ArrowDownLeft} iconTone="success" footer="this month" />
        <StatCard label="Monthly Outflow" value={formatCurrency(FINANCE_KPI.outflow)} delta="+6.4%" deltaTone="down" icon={ArrowUpRight} iconTone="error" footer="this month" />
        <StatCard label="Burn Rate" value={formatCurrency(FINANCE_KPI.burn) + "/mo"} delta="-8.2%" deltaTone="up" icon={Flame} iconTone="warning" footer="trending down" />
      </div>

      <Card className="overflow-hidden border-0 bg-gradient-to-r from-brand-600 to-accent-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-90">Runway</p>
            <p className="mt-1 text-3xl font-bold">{FINANCE_KPI.runway} months</p>
            <p className="mt-1 text-sm opacity-90">At current burn rate of {formatCurrency(FINANCE_KPI.burn)}/mo</p>
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="opacity-90">Cash on hand vs 24-month runway target</span>
              <span className="font-semibold">{Math.round((FINANCE_KPI.runway / 24) * 100)}%</span>
            </div>
            <Progress value={(FINANCE_KPI.runway / 24) * 100} tone="brand" size="lg" className="bg-white/20" />
            <div className="mt-2 flex items-center justify-between text-xs opacity-90">
              <span>0 months</span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 font-semibold">Now: {FINANCE_KPI.runway}mo</span>
              <span>24 months</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Cash Flow — Inflow vs Outflow"
            description="Dual-axis monthly cash movement"
            action={<Badge tone="success" dot>Net positive 8 of 12 months</Badge>}
          />
          <CardBody>
            <NimbusChart options={cashflowOptions} series={cashflowSeries} type="line" height={340} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Account Balances" description="Distribution across accounts" />
          <CardBody className="space-y-4">
            {ACCOUNTS.map((a) => {
              const pct = Math.round((a.balance / TOTAL_BALANCE) * 100);
              return (
                <div key={a.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      <a.icon className="h-4 w-4 text-gray-400" />
                      {a.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(a.balance)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: a.color }} />
                    </div>
                    <span className="w-10 text-right text-xs text-gray-500 dark:text-gray-400">{pct}%</span>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Cash</span>
                <span className="text-lg font-bold text-brand-600 dark:text-brand-400">{formatCurrency(TOTAL_BALANCE)}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Expense Breakdown" description="June spending by category" />
          <CardBody>
            <NimbusChart options={expenseOptions} series={EXPENSE_CATEGORIES.map((c) => c.value)} type="donut" height={260} />
            <div className="mt-4 space-y-2">
              {EXPENSE_CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(c.value)}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader
            title="Recent Transactions"
            description="Latest movements across all accounts"
            action={<Button variant="ghost" size="sm">View all <TrendingUp className="h-3 w-3" /></Button>}
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t) => (
                  <tr key={t.id}>
                    <td className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{t.id}</td>
                    <td className="text-sm font-medium text-gray-900 dark:text-white">{t.desc}</td>
                    <td className="text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                    <td><Badge tone="gray" variant="soft">{t.category}</Badge></td>
                    <td>
                      <span className={`text-sm font-bold ${t.type === "credit" ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"}`}>
                        {t.type === "credit" ? "+" : ""}{formatCurrency(t.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
