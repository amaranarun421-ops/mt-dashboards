"use client";

import * as React from "react";
import {
  DollarSign, Receipt, TrendingUp, Percent, Plus, Download, Filter,
  ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Building2, PiggyBank, Target, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import {
  AreaTrend, BarTrend, DonutChart, RadialProgress, Sparkline,
} from "@/components/charts";

const revenueData = [
  { month: "Jan", revenue: 82, expenses: 38, profit: 44 },
  { month: "Feb", revenue: 88, expenses: 40, profit: 48 },
  { month: "Mar", revenue: 94, expenses: 42, profit: 52 },
  { month: "Apr", revenue: 91, expenses: 39, profit: 52 },
  { month: "May", revenue: 102, expenses: 41, profit: 61 },
  { month: "Jun", revenue: 108, expenses: 38, profit: 70 },
  { month: "Jul", revenue: 116, expenses: 42, profit: 74 },
  { month: "Aug", revenue: 122, expenses: 40, profit: 82 },
  { month: "Sep", revenue: 118, expenses: 39, profit: 79 },
  { month: "Oct", revenue: 128, expenses: 41, profit: 87 },
  { month: "Nov", revenue: 134, expenses: 43, profit: 91 },
  { month: "Dec", revenue: 142, expenses: 44, profit: 98 },
];

const expensesByCategory = [
  { category: "Salaries", amount: 218 },
  { category: "Marketing", amount: 96 },
  { category: "Operations", amount: 72 },
  { category: "R&D", amount: 64 },
  { category: "Admin", amount: 37 },
];

const revenueStreams = [
  { name: "Subscriptions", value: 58, color: "var(--chart-1)" },
  { name: "Services", value: 24, color: "var(--chart-2)" },
  { name: "Licensing", value: 12, color: "var(--chart-3)" },
  { name: "Other", value: 6, color: "var(--chart-4)" },
];

const transactions = [
  { date: "Dec 18", description: "Acme Corp — Annual License", category: "Licensing", type: "Income", amount: 48200, status: "Completed" },
  { date: "Dec 17", description: "AWS Cloud Infrastructure", category: "Operations", type: "Expense", amount: 18420, status: "Completed" },
  { date: "Dec 17", description: "Globex Inc — Consulting", category: "Services", type: "Income", amount: 24800, status: "Completed" },
  { date: "Dec 16", description: "Q4 Payroll Run", category: "Salaries", type: "Expense", amount: 218400, status: "Completed" },
  { date: "Dec 16", description: "Stark Industries — Renewal", category: "Subscriptions", type: "Income", amount: 32600, status: "Completed" },
  { date: "Dec 15", description: "Google Ads Campaign", category: "Marketing", type: "Expense", amount: 12480, status: "Completed" },
  { date: "Dec 15", description: "Initech — Custom Integration", category: "Services", type: "Income", amount: 18400, status: "Pending" },
  { date: "Dec 14", description: "Office Lease — January", category: "Admin", type: "Expense", amount: 24800, status: "Completed" },
];

const cashFlowIndicators = [
  { label: "Operating Cash", value: 1842000, total: 2400000, color: "var(--chart-1)" },
  { label: "Investing Cash", value: 482000, total: 800000, color: "var(--chart-2)" },
  { label: "Financing Cash", value: 324000, total: 600000, color: "var(--chart-3)" },
  { label: "Cash Reserves", value: 2648000, total: 3200000, color: "var(--chart-4)" },
];

export default function FinanceDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Finance Dashboard"
        description="Track revenue, expenses, profitability, cash flow, and budget utilization in real time."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Finance" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Transaction</Button>
          </>
        }
      />

      {/* HERO NUMBERS — 2 large cards side-by-side, HUGE text-5xl numbers, CFO feel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-success/15 via-success/5 to-card border-success/20 overflow-hidden relative shadow-sm">
          <div className="absolute -right-12 -top-12 size-48 rounded-full bg-success/15 blur-3xl pointer-events-none" />
          <div className="p-6 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <DollarSign className="size-3.5" /> Total Revenue
                </div>
                <p className="mt-3 text-5xl md:text-6xl font-bold tracking-tight tabular-nums">$1.24M</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20 gap-1 px-2 py-0.5">
                    <ArrowUpRight className="size-3" /> 18.2%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month · $1.05M</span>
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success ring-1 ring-success/20">
                <DollarSign className="size-6" />
              </div>
            </div>
            <div className="mt-4 h-10 -mx-1">
              <Sparkline data={revenueData.map((d) => ({ value: d.revenue }))} color="var(--chart-1)" height={40} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-card border-primary/20 overflow-hidden relative shadow-sm">
          <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="p-6 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="size-3.5" /> Net Profit
                </div>
                <p className="mt-3 text-5xl md:text-6xl font-bold tracking-tight tabular-nums">$753K</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20 gap-1 px-2 py-0.5">
                    <ArrowUpRight className="size-3" /> 24.6%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month · $604K</span>
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/20">
                <TrendingUp className="size-6" />
              </div>
            </div>
            <div className="mt-4 h-10 -mx-1">
              <Sparkline data={revenueData.map((d) => ({ value: d.profit }))} color="var(--chart-2)" height={40} />
            </div>
          </div>
        </div>
      </div>

      {/* 2 smaller stat cards: Expenses + Profit Margin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Receipt className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold tabular-nums">$487K</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-0.5 px-1 py-0 text-[10px]">
                  <ArrowUpRight className="size-2.5" /> 4.1%
                </Badge>
                <span className="text-[10px] text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
          <div className="w-24 h-10">
            <Sparkline data={revenueData.map((d) => ({ value: d.expenses }))} color="var(--chart-4)" height={40} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-info/10 text-info">
              <Percent className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Profit Margin</p>
              <p className="text-2xl font-bold tabular-nums">60.8%</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-0.5 px-1 py-0 text-[10px]">
                  <ArrowUpRight className="size-2.5" /> 3.2%
                </Badge>
                <span className="text-[10px] text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>
          <div className="w-24 h-10">
            <Sparkline data={[{value:54.2},{value:56.1},{value:57.8},{value:58.9},{value:59.8},{value:60.8}]} color="var(--chart-3)" type="bar" height={40} />
          </div>
        </div>
      </div>

      {/* 3-column breakdown: Revenue vs Expenses Area (col-5) + Expenses Vertical Bar (col-3) + Revenue Streams Donut (col-4) */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Revenue vs Expenses</h3>
              <p className="text-xs text-muted-foreground">Trailing 12 months (in $K)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={revenueData}
              xKey="month"
              yKeys={[
                { key: "revenue", name: "Revenue", color: "var(--chart-1)" },
                { key: "expenses", name: "Expenses", color: "var(--chart-4)" },
                { key: "profit", name: "Profit", color: "var(--chart-2)" },
              ]}
              height={280}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Expenses by Category</h3>
              <p className="text-xs text-muted-foreground">Top spending ($K)</p>
            </div>
            <CardMenuButton items={[{ label: "Audit trail" }]} />
          </div>
          <div className="px-5 pb-5">
            <BarTrend
              data={expensesByCategory}
              xKey="category"
              yKeys={[{ key: "amount", name: "Amount ($K)", color: "var(--chart-1)" }]}
              height={280}
              layout="vertical"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Revenue Streams</h3>
              <p className="text-xs text-muted-foreground">Income by source</p>
            </div>
            <CardMenuButton items={[{ label: "Breakdown" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={revenueStreams} centerValue="$1.24M" centerLabel="Total Revenue" height={200} />
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              {revenueStreams.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-semibold tabular-nums">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2-col: Cash Flow Indicators (col-6) + Budget Utilization RadialProgress (col-6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Cash Flow Indicators</h3>
              <p className="text-xs text-muted-foreground">Real-time cash position by category</p>
            </div>
            <CardMenuButton items={[{ label: "Statement" }]} />
          </div>
          <div className="px-5 pb-5 space-y-4">
            {cashFlowIndicators.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">${(c.value / 1000).toFixed(0)}K</span>
                </div>
                <Progress value={(c.value / c.total) * 100} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                  {((c.value / c.total) * 100).toFixed(0)}% of ${(c.total / 1000).toFixed(0)}K capacity
                </p>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Net Cash Position</p>
                <p className="text-xl font-bold text-success tabular-nums">$2.65M</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-success/10 text-success">
                <Wallet className="size-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Budget Utilization</h3>
              <p className="text-xs text-muted-foreground">FY2024 annual budget</p>
            </div>
            <CardMenuButton items={[{ label: "Configure" }]} />
          </div>
          <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <RadialProgress value={72} label="of $2.4M budget" color="var(--chart-1)" height={180} />
            <div className="space-y-3">
              {[
                { label: "Q1 Spend", value: 412, total: 600, color: "var(--chart-2)" },
                { label: "Q2 Spend", value: 528, total: 600, color: "var(--chart-3)" },
                { label: "Q3 Spend", value: 486, total: 600, color: "var(--chart-4)" },
                { label: "Q4 Spend", value: 312, total: 600, color: "var(--chart-5)" },
              ].map((q) => (
                <div key={q.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">{q.label}</span>
                    <span className="text-xs font-semibold tabular-nums">${q.value}K / ${q.total}K</span>
                  </div>
                  <Progress value={(q.value / q.total) * 100} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions table — full width */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Recent Transactions</h3>
            <p className="text-xs text-muted-foreground">Latest income and expense activity</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View ledger</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="pr-5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t, i) => (
              <TableRow key={i} className="hover:bg-accent/50">
                <TableCell className="pl-5 text-xs text-muted-foreground font-mono">{t.date}</TableCell>
                <TableCell className="font-medium text-sm">{t.description}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">{t.category}</Badge>
                </TableCell>
                <TableCell>
                  <span className={
                    t.type === "Income"
                      ? "inline-flex items-center gap-1 text-xs font-medium text-success"
                      : "inline-flex items-center gap-1 text-xs font-medium text-destructive"
                  }>
                    {t.type === "Income" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {t.type}
                  </span>
                </TableCell>
                <TableCell className={
                  "text-right font-medium tabular-nums " + (t.type === "Income" ? "text-success" : "text-foreground")
                }>
                  {t.type === "Income" ? "+" : "-"}${t.amount.toLocaleString()}
                </TableCell>
                <TableCell className="pr-5">
                  <Badge variant="outline" className={
                    t.status === "Completed" ? "bg-success/10 text-success border-success/20" :
                    "bg-warning/10 text-warning border-warning/20"
                  }>{t.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CFO Footer strip — 4 financial KPIs + Bank accounts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Accounts Receivable", value: "$284K", icon: <CreditCard className="size-4" />, trend: "+8.4%", color: "var(--chart-1)" },
          { label: "Accounts Payable", value: "$148K", icon: <Receipt className="size-4" />, trend: "-3.2%", color: "var(--chart-4)" },
          { label: "Operating Margin", value: "32.4%", icon: <BarChart3 className="size-4" />, trend: "+2.1%", color: "var(--chart-2)" },
          { label: "Runway", value: "18 months", icon: <PiggyBank className="size-4" />, trend: "+2 mo", color: "var(--chart-3)" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex size-9 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${m.color} 14%, transparent)`, color: m.color }}>
                {m.icon}
              </div>
              <span className={
                "text-[10px] font-medium " +
                (m.trend.startsWith("+") ? "text-success" : "text-destructive")
              }>{m.trend}</span>
            </div>
            <p className="text-xl font-bold tabular-nums">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Bank Accounts row */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Bank Accounts</h3>
            <p className="text-xs text-muted-foreground">Connected accounts and balances</p>
          </div>
          <CardMenuButton items={[{ label: "Add account" }, { label: "Sync" }]} />
        </div>
        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Operating Account", bank: "Chase Business", balance: 1842000, last: "2 min ago", color: "var(--chart-1)", icon: <Building2 className="size-4" /> },
            { name: "Reserve Account", bank: "Mercury", balance: 648000, last: "5 min ago", color: "var(--chart-2)", icon: <PiggyBank className="size-4" /> },
            { name: "Payroll Account", bank: "Chase Business", balance: 158000, last: "1 hr ago", color: "var(--chart-3)", icon: <Wallet className="size-4" /> },
          ].map((a) => (
            <div key={a.name} className="rounded-xl border border-border p-4 hover:shadow-md transition-shadow bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-9 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${a.color} 14%, transparent)`, color: a.color }}>
                  {a.icon}
                </div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-success" /> Synced {a.last}
                </span>
              </div>
              <p className="text-sm font-semibold">{a.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{a.bank}</p>
              <p className="text-lg font-bold tabular-nums">${a.balance.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
