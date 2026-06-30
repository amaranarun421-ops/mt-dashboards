"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS, REVENUE_SERIES, COUNTRIES } from "@/data/mock";
import { formatCompact, formatCurrency, formatNumber } from "@/lib/utils";
import {
  Download, Calendar, FileText, DollarSign, TrendingUp, TrendingDown,
  Wallet, Send, ArrowUpRight, Printer,
} from "lucide-react";
import { useState } from "react";

// Build revenue / expenses / profit datasets
const REVENUE = REVENUE_SERIES.map((p) => p.y);
const EXPENSES = REVENUE.map((v, i) => Math.round(v * (0.62 + Math.sin(i) * 0.05)));
const PROFIT = REVENUE.map((v, i) => v - EXPENSES[i]);

const TABLE_ROWS = MONTHS.map((m, i) => ({
  month: m,
  revenue: REVENUE[i],
  expenses: EXPENSES[i],
  profit: PROFIT[i],
  margin: ((PROFIT[i] / REVENUE[i]) * 100).toFixed(1),
  orders: [180, 220, 195, 280, 245, 320, 340, 312, 380, 410, 425, 480][i],
}));

export default function ReportsPage() {
  const [period, setPeriod] = useState<"q1" | "q2" | "q3" | "q4" | "ytd">("ytd");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const totalRev = REVENUE.reduce((a, b) => a + b, 0);
  const totalExp = EXPENSES.reduce((a, b) => a + b, 0);
  const totalProfit = totalRev - totalExp;
  const margin = ((totalProfit / totalRev) * 100).toFixed(1);

  // Revenue area
  const revenueOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981"],
    stroke: { curve: "smooth" as const, width: 3 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
  };

  // Expenses bar
  const expensesOptions = {
    ...baseChartOptions("bar"),
    colors: ["#f43f5e"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%", endingShape: "rounded" } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
  };

  // Profit line
  const profitOptions = {
    ...baseChartOptions("line"),
    colors: ["#8b5cf6"],
    stroke: { curve: "smooth" as const, width: 3 },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    markers: { size: 4, hover: { size: 7 }, colors: ["#8b5cf6"], strokeColors: "#fff", strokeWidth: 2 },
    tooltip: { y: { formatter: (v: number) => formatCurrency(v) } },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0, stops: [0, 100] },
    },
  };

  const periodBtnClass = (p: "q1" | "q2" | "q3" | "q4" | "ytd") =>
    `rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
      period === p ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Report"
        description="Quarterly P&L summary with revenue, expenses, profit, and regional breakdown."
        breadcrumbs={[{ label: "Reports" }, { label: "Financial Summary" }]}
        actions={
          <>
            <Button variant="secondary" size="md">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <div className="relative">
              <Button variant="secondary" size="md" onClick={() => setScheduleOpen((s) => !s)}>
                <Calendar className="h-4 w-4" /> Schedule
              </Button>
              {scheduleOpen && (
                <div className="absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
                  <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Repeat</p>
                  {["Daily · 9:00 AM", "Weekly · Monday", "Monthly · 1st", "Quarterly · End of quarter"].map((s) => (
                    <button key={s} onClick={() => setScheduleOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                      <Send className="h-3.5 w-3.5" /> {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button size="md">
              <Download className="h-4 w-4" /> Export
            </Button>
          </>
        }
      />

      {/* Report header / meta */}
      <Card>
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Q2 2026 Financial Summary</h2>
                <Badge tone="success" variant="soft" dot>Finalized</Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Prepared by Finance Team · Reviewed by Aaroh Sharma · Generated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
            <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Period</span>
            {(["q1", "q2", "q3", "q4", "ytd"] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={periodBtnClass(p)}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRev)} delta="+18.2%" deltaTone="up" icon={DollarSign} iconTone="brand" footer="vs previous period" />
        <StatCard label="Total Expenses" value={formatCurrency(totalExp)} delta="+9.4%" deltaTone="down" icon={Wallet} iconTone="error" footer="vs previous period" />
        <StatCard label="Net Profit" value={formatCurrency(totalProfit)} delta="+24.8%" deltaTone="up" icon={TrendingUp} iconTone="success" footer="vs previous period" />
        <StatCard label="Profit Margin" value={`${margin}%`} delta="+1.8pp" deltaTone="up" icon={TrendingDown} iconTone="purple" footer="above target" />
      </div>

      {/* Revenue / Expenses / Profit charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Revenue Trend" description="Monthly gross revenue" action={<Badge tone="brand" variant="soft">Area</Badge>} />
          <CardBody>
            <NimbusChart options={revenueOptions} series={[{ name: "Revenue", data: REVENUE }]} type="area" height={300} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Operating Expenses" description="Monthly cost basis" action={<Badge tone="error" variant="soft">Bars</Badge>} />
          <CardBody>
            <NimbusChart options={expensesOptions} series={[{ name: "Expenses", data: EXPENSES }]} type="bar" height={300} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Net Profit" description="Revenue minus expenses — monthly" action={<Badge tone="purple" variant="soft">Line</Badge>} />
        <CardBody>
          <NimbusChart options={profitOptions} series={[{ name: "Profit", data: PROFIT }]} type="line" height={300} />
        </CardBody>
      </Card>

      {/* Regional breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader title="Monthly P&L Detail" description="Full monthly breakdown with margin %" action={<Badge tone="gray" variant="soft">{TABLE_ROWS.length} rows</Badge>} />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Profit</th>
                  <th>Margin</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((r) => (
                  <tr key={r.month}>
                    <td className="font-semibold text-gray-900 dark:text-white">{r.month}</td>
                    <td className="font-medium text-success-700 dark:text-success-400">{formatCurrency(r.revenue)}</td>
                    <td className="text-error-700 dark:text-error-400">{formatCurrency(r.expenses)}</td>
                    <td className="font-semibold text-gray-900 dark:text-white">{formatCurrency(r.profit)}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold ${Number(r.margin) >= 30 ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400" : "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400"}`}>
                        {r.margin}%
                      </span>
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">{formatNumber(r.orders)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                  <td className="font-bold text-gray-900 dark:text-white">Total</td>
                  <td className="font-bold text-success-700 dark:text-success-400">{formatCurrency(totalRev)}</td>
                  <td className="font-bold text-error-700 dark:text-error-400">{formatCurrency(totalExp)}</td>
                  <td className="font-bold text-gray-900 dark:text-white">{formatCurrency(totalProfit)}</td>
                  <td className="font-bold text-purple-700 dark:text-purple-400">{margin}%</td>
                  <td className="font-bold text-gray-900 dark:text-white">{formatNumber(TABLE_ROWS.reduce((a, r) => a + r.orders, 0))}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Top Regions" description="Revenue by country" />
          <CardBody className="space-y-3">
            {COUNTRIES.map((c, i) => {
              const max = COUNTRIES[0].revenue;
              const pct = Math.round((c.revenue / max) * 100);
              return (
                <div key={c.code} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-xl dark:bg-gray-800">
                    {c.flag}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">#{i + 1}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatCurrency(c.revenue)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mt-2 flex items-center justify-between rounded-xl bg-brand-50 p-3 dark:bg-brand-500/10">
              <div className="flex items-center gap-2">
                <Avatar name="Aaroh Sharma" size={28} />
                <span className="text-xs text-brand-700 dark:text-brand-300">Reviewed by Aaroh S.</span>
              </div>
              <Badge tone="brand" variant="soft" dot>Signed off</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Footer summary */}
      <Card className="border-0 bg-gradient-to-r from-brand-500 via-accent-500 to-purple-500 text-white">
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Bottom line</p>
              <p className="text-xl font-bold">{formatCurrency(totalProfit)} net profit · {margin}% margin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button size="md" className="bg-white text-brand-700 hover:bg-white/90">
              <Send className="h-4 w-4" /> Share
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
