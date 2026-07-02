"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users, Eye, MousePointerClick, DollarSign, ArrowUpRight, ArrowDownRight,
  TrendingUp, Globe, Smartphone, Monitor, Tablet, Download, MoreHorizontal,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  LineChart, Line,
} from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const trafficByRange = {
  "7D": [
    { name: "Mon", visitors: 4200, pageviews: 9800, conversions: 320 },
    { name: "Tue", visitors: 4800, pageviews: 11200, conversions: 410 },
    { name: "Wed", visitors: 5600, pageviews: 13400, conversions: 480 },
    { name: "Thu", visitors: 5100, pageviews: 12100, conversions: 440 },
    { name: "Fri", visitors: 6200, pageviews: 14800, conversions: 560 },
    { name: "Sat", visitors: 7400, pageviews: 17900, conversions: 720 },
    { name: "Sun", visitors: 6800, pageviews: 16200, conversions: 650 },
  ],
  "30D": [
    { name: "W1", visitors: 28400, pageviews: 64200, conversions: 2480 },
    { name: "W2", visitors: 31200, pageviews: 71800, conversions: 3120 },
    { name: "W3", visitors: 34800, pageviews: 82400, conversions: 3840 },
    { name: "W4", visitors: 41200, pageviews: 96400, conversions: 4520 },
  ],
  "90D": [
    { name: "Month 1", visitors: 98400, pageviews: 228400, conversions: 9840 },
    { name: "Month 2", visitors: 124200, pageviews: 294800, conversions: 14200 },
    { name: "Month 3", visitors: 148200, pageviews: 342600, conversions: 17800 },
  ],
};

const channelData = [
  { name: "Organic", value: 38, color: "#465fff" },
  { name: "Direct", value: 26, color: "#0ba5ec" },
  { name: "Social", value: 18, color: "#f79009" },
  { name: "Referral", value: 12, color: "#ee46bc" },
  { name: "Email", value: 6, color: "#12b76a" },
];

const deviceData = [
  { name: "Desktop", value: 58, fill: "#465fff" },
  { name: "Mobile", value: 34, fill: "#0ba5ec" },
  { name: "Tablet", value: 8, fill: "#f79009" },
];

const funnelData = [
  { stage: "Visitors", value: 48200, pct: 100, color: "bg-brand-500" },
  { stage: "Sign-ups", value: 14200, pct: 29.5, color: "bg-brand-500/80" },
  { stage: "Activated", value: 8400, pct: 17.4, color: "bg-brand-500/60" },
  { stage: "Paid", value: 2840, pct: 5.9, color: "bg-brand-500/40" },
  { stage: "Retained", value: 1920, pct: 4.0, color: "bg-brand-500/20" },
];

const topPages = [
  { path: "/dashboard", views: 24820, change: 12.4, bounce: 32 },
  { path: "/pricing", views: 18420, change: 8.1, bounce: 41 },
  { path: "/blog/scaling-saas", views: 14210, change: -2.3, bounce: 28 },
  { path: "/features/analytics", views: 11890, change: 18.6, bounce: 35 },
  { path: "/docs/quickstart", views: 9240, change: 4.2, bounce: 22 },
];

const countries = [
  { country: "United States", code: "US", visitors: 18420, pct: 38 },
  { country: "United Kingdom", code: "GB", visitors: 9240, pct: 19 },
  { country: "Germany", code: "DE", visitors: 6890, pct: 14 },
  { country: "France", code: "FR", visitors: 4820, pct: 10 },
  { country: "Japan", code: "JP", visitors: 3840, pct: 8 },
  { country: "Australia", code: "AU", visitors: 2410, pct: 5 },
  { country: "Others", code: "—", visitors: 2590, pct: 6 },
];

export function AnalyticsDashboard() {
  const [range, setRange] = React.useState<"7D" | "30D" | "90D">("7D");
  const [chartType, setChartType] = React.useState<"area" | "bar" | "line">("area");
  const [sortBy, setSortBy] = React.useState<"views" | "change" | "bounce">("views");
  const [deviceFilter, setDeviceFilter] = React.useState("all");

  const currentData = trafficByRange[range];
  const sortedPages = [...topPages].sort((a, b) => {
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "change") return b.change - a.change;
    return a.bounce - b.bounce;
  });

  return (
    <div>
      <PageHeader
        title="Analytics Overview"
        description="Real-time visitor insights, conversion funnels, and engagement metrics."
        breadcrumb={["Dashboards", "Analytics"]}
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Exporting PDF...")}>PDF Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting CSV...")}>CSV Data</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting Excel...")}>Excel File</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" onClick={() => toast.success("Report scheduled!")} className="gap-1.5">
              <TrendingUp className="h-4 w-4" /> Schedule Report
            </Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { title: "Total Visitors", value: "48,210", change: 12.4, trend: "up", icon: Users, color: "bg-gray-100 dark:bg-gray-800", iconColor: "text-gray-800 dark:text-white/90", sub: "vs. 42,890 last week" },
          { title: "Page Views", value: "94,820", change: 8.2, trend: "up", icon: Eye, color: "bg-blue-light-50 dark:bg-blue-light-500/15", iconColor: "text-blue-light-500", sub: "1.97 pages per visit" },
          { title: "Conversion Rate", value: "5.91%", change: -0.8, trend: "down", icon: MousePointerClick, color: "bg-warning-50 dark:bg-warning-500/15", iconColor: "text-warning-600 dark:text-orange-400", sub: "2,840 conversions" },
          { title: "Revenue", value: "$84,210", change: 18.6, trend: "up", icon: DollarSign, color: "bg-success-50 dark:bg-success-500/15", iconColor: "text-success-600 dark:text-success-500", sub: "Avg. $29.65 per user" },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${k.color}`}>
                  <Icon className={`size-6 ${k.iconColor}`} />
                </div>
                <div className="flex items-end justify-between mt-5">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{k.title}</span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{k.value}</h4>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{k.sub}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-sm ${k.trend === "up" ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}`}>
                    {k.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {Math.abs(k.change)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart + Channels */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Traffic Overview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Visitors and page views</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Working chart type toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                {(["area", "bar", "line"] as const).map(t => (
                  <button key={t} onClick={() => setChartType(t)} className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${chartType === t ? "bg-white text-gray-800 shadow-theme-xs dark:bg-gray-900 dark:text-white/90" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>{t}</button>
                ))}
              </div>
              {/* Working date range tabs */}
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                {(["7D", "30D", "90D"] as const).map(r => (
                  <button key={r} onClick={() => setRange(r)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${range === r ? "bg-white text-gray-800 shadow-theme-xs dark:bg-gray-900 dark:text-white/90" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>{r}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={currentData} margin={{ left: -20, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#465fff" stopOpacity={0.4} /><stop offset="100%" stopColor="#465fff" stopOpacity={0} /></linearGradient>
                      <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ba5ec" stopOpacity={0.3} /><stop offset="100%" stopColor="#0ba5ec" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="pageviews" stroke="#0ba5ec" strokeWidth={2} fill="url(#pvGrad)" name="Page Views" />
                    <Area type="monotone" dataKey="visitors" stroke="#465fff" strokeWidth={2.5} fill="url(#visGrad)" name="Visitors" />
                  </AreaChart>
                ) : chartType === "bar" ? (
                  <BarChart data={currentData} margin={{ left: -20, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "#f2f4f7" }} />
                    <Bar dataKey="visitors" fill="#465fff" radius={[6, 6, 0, 0]} maxBarSize={32} name="Visitors" />
                    <Bar dataKey="pageviews" fill="#0ba5ec" radius={[6, 6, 0, 0]} maxBarSize={32} name="Page Views" />
                  </BarChart>
                ) : (
                  <LineChart data={currentData} margin={{ left: -20, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="visitors" stroke="#465fff" strokeWidth={2.5} dot={{ r: 4 }} name="Visitors" />
                    <Line type="monotone" dataKey="pageviews" stroke="#0ba5ec" strokeWidth={2.5} dot={{ r: 4 }} name="Page Views" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Traffic Sources</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">By acquisition channel</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {channelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {channelData.map(c => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{c.name}</span>
                  <span className="ml-auto font-semibold text-gray-800 dark:text-white/90">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Funnel + Devices */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Conversion Funnel</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Visitor to retained user journey</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><MoreHorizontal className="h-5 w-5" /></button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => toast.info("Viewing details...")}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exported funnel data")}>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            {funnelData.map((stage, i) => (
              <motion.div key={stage.stage} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 dark:text-white/90">{stage.value.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">{stage.pct}%</span>
                  </div>
                </div>
                <div className="h-9 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className={`flex h-full items-center justify-end rounded-lg px-2 ${stage.color}`}>
                    <span className="text-[10px] font-bold text-white">{stage.pct}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            <div className="mt-4 rounded-lg border border-success-500-200 bg-success-50 p-3 dark:border-success-500-500/30 dark:bg-success-500/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success-600 dark:text-success-500" />
                <span className="text-xs font-semibold text-success-600 dark:text-success-500">+2.4% improvement</span>
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Funnel conversion improved vs. last week. Sign-ups to Activated step shows the biggest gain.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Device Breakdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visitors by device type</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="h-40 w-40 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="55%" outerRadius="100%" data={deviceData} startAngle={90} endAngle={-270}>
                    <RadialBar background dataKey="value" cornerRadius={8} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { label: "Desktop", value: 58, icon: Monitor, color: "text-gray-600 dark:text-gray-300" },
                  { label: "Mobile", value: 34, icon: Smartphone, color: "text-gray-600 dark:text-gray-300" },
                  { label: "Tablet", value: 8, icon: Tablet, color: "text-gray-600 dark:text-gray-300" },
                ].map(d => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label} className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${d.color}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{d.label}</span>
                      <span className="ml-auto font-semibold text-gray-800 dark:text-white/90">{d.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div><p className="text-xs text-gray-500 dark:text-gray-400">Avg. Session</p><p className="font-bold text-gray-800 text-lg dark:text-white/90">4m 32s</p></div>
              <div><p className="text-xs text-gray-500 dark:text-gray-400">Bounce Rate</p><p className="font-bold text-gray-800 text-lg dark:text-white/90">31.8%</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages with working sort + Geographic */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top Pages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Most viewed this week</p>
            </div>
            {/* Working sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">Sort: {sortBy}<MoreHorizontal className="h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("views")}>Page Views</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("change")}>Change %</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("bounce")}>Bounce Rate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedPages.map((p, i) => (
              <motion.div key={p.path} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm font-medium text-gray-800 dark:text-white/90">{p.path}</p>
                  <p className="text-xs text-gray-400">{p.views.toLocaleString()} views</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-gray-400">Bounce</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{p.bounce}%</p>
                </div>
                <div className={`flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-bold ${p.change > 0 ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"}`}>
                  {p.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(p.change)}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Geographic Distribution</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Top countries by visitors</p>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            {countries.map((c, i) => (
              <motion.div key={c.country} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-9 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">{c.code}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{c.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{c.visitors.toLocaleString()}</span>
                    <span className="font-semibold text-gray-800 dark:text-white/90">{c.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-brand-500/70 to-brand-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
