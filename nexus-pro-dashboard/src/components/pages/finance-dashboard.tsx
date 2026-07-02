"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, CreditCard, PiggyBank, ArrowUpRight, ArrowDownRight, Plus, Download, Search, MoreHorizontal, Check, X, ArrowLeftRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line } from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

const cashflowByPeriod = {
  "6M": [
    { month: "Feb", income: 48000, expense: 31000 },
    { month: "Mar", income: 56000, expense: 34000 },
    { month: "Apr", income: 51000, expense: 30000 },
    { month: "May", income: 68000, expense: 38000 },
    { month: "Jun", income: 74000, expense: 42000 },
    { month: "Jul", income: 82000, expense: 45000 },
  ],
  "12M": [
    { month: "Jan", income: 42000, expense: 28000 },
    { month: "Feb", income: 48000, expense: 31000 },
    { month: "Mar", income: 56000, expense: 34000 },
    { month: "Apr", income: 51000, expense: 30000 },
    { month: "May", income: 68000, expense: 38000 },
    { month: "Jun", income: 74000, expense: 42000 },
    { month: "Jul", income: 82000, expense: 45000 },
    { month: "Aug", income: 78000, expense: 41000 },
    { month: "Sep", income: 88000, expense: 48000 },
    { month: "Oct", income: 94000, expense: 52000 },
    { month: "Nov", income: 102000, expense: 55000 },
    { month: "Dec", income: 112000, expense: 58000 },
  ],
};

const allTransactions = [
  { desc: "Stripe payout", cat: "Income", amount: 12840, type: "in", date: "Today, 2:14 PM", icon: TrendingUp },
  { desc: "AWS - Production", cat: "Infrastructure", amount: -1240, type: "out", date: "Today, 9:02 AM", icon: TrendingDown },
  { desc: "Figma Annual", cat: "Tools", amount: -480, type: "out", date: "Yesterday", icon: CreditCard },
  { desc: "Customer refund", cat: "Refund", amount: -284, type: "out", date: "Yesterday", icon: ArrowDownRight },
  { desc: "Payroll - Engineering", cat: "Salaries", amount: -18400, type: "out", date: "2 days ago", icon: Wallet },
  { desc: "Sponsorship revenue", cat: "Income", amount: 4200, type: "in", date: "3 days ago", icon: ArrowUpRight },
  { desc: "Office rent", cat: "Operations", amount: -4800, type: "out", date: "3 days ago", icon: Wallet },
  { desc: "Consulting fee", cat: "Income", amount: 8400, type: "in", date: "4 days ago", icon: TrendingUp },
];

const txCategories = ["All", "Income", "Infrastructure", "Tools", "Refund", "Salaries", "Operations"];

const budgets = [
  { name: "Engineering", spent: 84000, total: 120000, color: "bg-brand-500" },
  { name: "Marketing", spent: 32000, total: 50000, color: "bg-blue-light-500" },
  { name: "Sales", spent: 18000, total: 40000, color: "bg-warning-500" },
  { name: "Operations", spent: 12000, total: 30000, color: "bg-error-500" },
];

export function FinanceDashboard() {
  const [period, setPeriod] = React.useState<"6M" | "12M">("6M");
  const [txFilter, setTxFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredTx = allTransactions.filter(t => {
    if (txFilter !== "All" && t.cat !== txFilter) return false;
    if (search && !t.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        breadcrumb={["Dashboards", "Finance"]}
        title="Financial Overview"
        description="Cash flow, expense breakdown, and budget utilization across departments."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Statement <MoreHorizontal className="h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Download Statement</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating PDF statement...")}>PDF Statement</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting CSV...")}>CSV Export</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting Excel...")}>Excel Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> New Transaction</Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { title: "Total Balance", value: "$284,920", change: 8.4, trend: "up", icon: Wallet, sub: "Across 4 accounts", color: "bg-gray-100 dark:bg-gray-800", iconColor: "text-gray-800 dark:text-white/90" },
          { title: "Income (MTD)", value: "$82,420", change: 18.6, trend: "up", icon: TrendingUp, sub: "vs. $69.5k last month", color: "bg-success-50 dark:bg-success-500/15", iconColor: "text-success-600 dark:text-success-500" },
          { title: "Expenses (MTD)", value: "$45,200", change: -4.2, trend: "down", icon: TrendingDown, sub: "Reduced spending", color: "bg-warning-50 dark:bg-warning-500/15", iconColor: "text-warning-600 dark:text-orange-400" },
          { title: "Savings Rate", value: "45.1%", change: 6.2, trend: "up", icon: PiggyBank, sub: "Above 40% target", color: "bg-blue-light-50 dark:bg-blue-light-500/15", iconColor: "text-blue-light-500" },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${k.color}`}><Icon className={`size-6 ${k.iconColor}`} /></div>
                <div className="flex items-end justify-between mt-5">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{k.title}</span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{k.value}</h4>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{k.sub}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-sm ${k.trend === "up" ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}`}>
                    {k.trend === "up" ? "+" : ""}{k.change}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cash Flow + Expense Breakdown */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Cash Flow</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Income vs. expenses over time</p>
            </div>
            {/* Working period toggle */}
            <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
              {(["6M", "12M"] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${period === p ? "bg-white text-gray-800 shadow-theme-xs dark:bg-gray-900 dark:text-white/90" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashflowByPeriod[period]} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12b76a" stopOpacity={0.35} /><stop offset="100%" stopColor="#12b76a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f04438" stopOpacity={0.25} /><stop offset="100%" stopColor="#f04438" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="income" stroke="#12b76a" strokeWidth={2.5} fill="url(#incGrad)" name="Income" />
                  <Area type="monotone" dataKey="expense" stroke="#f04438" strokeWidth={2.5} fill="url(#expGrad)" name="Expense" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Expense Breakdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">By category this month</p>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            {[
              { category: "Salaries", amount: 24000, pct: 53, color: "bg-brand-500" },
              { category: "Marketing", amount: 8400, pct: 19, color: "bg-blue-light-500" },
              { category: "Infrastructure", amount: 6200, pct: 14, color: "bg-warning-500" },
              { category: "Tools", amount: 3800, pct: 8, color: "bg-error-500" },
              { category: "Other", amount: 2600, pct: 6, color: "bg-gray-400" },
            ].map((c, i) => (
              <motion.div key={c.category} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{c.category}</span>
                  <span className="font-semibold text-gray-800 dark:text-white/90">${c.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className={`h-full rounded-full ${c.color}`} />
                </div>
                <p className="mt-0.5 text-xs text-gray-400">{c.pct}% of total</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Utilization + Transactions */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Budget with interactive approve actions */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Budget Utilization</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Department spend vs. allocation</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info("Opening budget editor...")}>Edit Budgets</Button>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
            {budgets.map((b, i) => {
              const pct = Math.round((b.spent / b.total) * 100);
              const over = pct > 90;
              return (
                <motion.div key={b.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white/90">{b.name}</span>
                      <span className="ml-2 text-xs text-gray-400">${(b.spent / 1000).toFixed(0)}k / ${(b.total / 1000).toFixed(0)}k</span>
                    </div>
                    <StatusBadge variant={over ? "error" : pct > 75 ? "warning" : "success"}>{pct}%</StatusBadge>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className={`h-full rounded-full ${over ? "bg-error-500" : b.color}`} />
                  </div>
                </motion.div>
              );
            })}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div><p className="text-xs text-gray-400">Total Budget</p><p className="font-bold text-gray-800 text-lg dark:text-white/90">$240k</p></div>
              <div><p className="text-xs text-gray-400">Spent</p><p className="font-bold text-gray-800 text-lg dark:text-white/90">$146k</p></div>
              <div><p className="text-xs text-gray-400">Remaining</p><p className="font-bold text-success-600 dark:text-success-500 text-lg">$94k</p></div>
            </div>
          </div>
        </div>

        {/* Transactions with working filters and search */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Transactions</h3>
              <div className="relative w-32 sm:w-44">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 h-9" />
              </div>
            </div>
            {/* Working category filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {txCategories.slice(0, 5).map(c => (
                <button key={c} onClick={() => setTxFilter(c)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${txFilter === c ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[400px] overflow-y-auto">
            {filteredTx.length > 0 ? (
              filteredTx.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.type === "in" ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}`}><Icon className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{t.desc}</p>
                      <p className="text-xs text-gray-400">{t.cat} · {t.date}</p>
                    </div>
                    <p className={`text-sm font-bold ${t.type === "in" ? "text-success-600 dark:text-success-500" : "text-gray-800 dark:text-white/90"}`}>{t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}</p>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-12 text-center text-gray-400"><ArrowLeftRight className="h-10 w-10 mx-auto mb-2 text-gray-300" /><p className="text-sm">No transactions found</p></div>
            )}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>Record a new income or expense transaction.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Description</Label><Input placeholder="e.g. Stripe payout" className="mt-1.5" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Amount ($)</Label><Input type="number" placeholder="0.00" className="mt-1.5" /></div>
              <div><Label>Category</Label>
                <select className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900">
                  <option>Income</option><option>Infrastructure</option><option>Tools</option><option>Salaries</option><option>Operations</option><option>Refund</option>
                </select>
              </div>
            </div>
            <div><Label>Type</Label>
              <div className="mt-1.5 flex gap-2">
                <button className="flex-1 rounded-lg border-2 border-success-500-500 bg-success-50 py-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"><TrendingUp className="mr-1.5 inline h-4 w-4" />Income</button>
                <button className="flex-1 rounded-lg border-2 border-gray-200 py-2.5 text-sm font-medium text-gray-500 hover:border-gray-300 dark:border-gray-700"><TrendingDown className="mr-1.5 inline h-4 w-4" />Expense</button>
              </div>
            </div>
            <div><Label>Date</Label><Input type="date" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={() => { toast.success("Transaction added!"); setModalOpen(false); }} className="gap-1.5"><Check className="h-4 w-4" /> Save Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
