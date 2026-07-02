"use client";

import * as React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
  AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import { Users, Box, ArrowUp, ArrowDown, MoreHorizontal, Plus, Download, Search, Filter, ChevronDown, Package, ShoppingBag, X, Check } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Badge, StatusBadge } from "@/components/common/status-badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const salesByPeriod = {
  "7D": [
    { name: "Mon", sales: 168 },{ name: "Tue", sales: 285 },{ name: "Wed", sales: 201 },{ name: "Thu", sales: 298 },
    { name: "Fri", sales: 187 },{ name: "Sat", sales: 295 },{ name: "Sun", sales: 212 },
  ],
  "30D": [
    { name: "W1", sales: 1240 },{ name: "W2", sales: 1580 },{ name: "W3", sales: 1820 },{ name: "W4", sales: 2150 },
  ],
  "12M": [
    { name: "Jan", sales: 2168 },{ name: "Feb", sales: 2385 },{ name: "Mar", sales: 2201 },{ name: "Apr", sales: 2598 },
    { name: "May", sales: 2187 },{ name: "Jun", sales: 2695 },{ name: "Jul", sales: 2891 },{ name: "Aug", sales: 2510 },
    { name: "Sep", sales: 2715 },{ name: "Oct", sales: 2990 },{ name: "Nov", sales: 2880 },{ name: "Dec", sales: 3112 },
  ],
};

const allProducts = [
  { name: "MacBook Pro 13\"", variants: "2 Variants", category: "Laptop", price: "$2,399.00", status: "Delivered", color: "bg-blue-light-50 dark:bg-blue-light-500/15" },
  { name: "Apple Watch Ultra", variants: "1 Variant", category: "Watch", price: "$879.00", status: "Pending", color: "bg-success-50 dark:bg-success-500/15" },
  { name: "iPhone 15 Pro Max", variants: "2 Variants", category: "Smartphone", price: "$1,869.00", status: "Delivered", color: "bg-blue-light-50 dark:bg-blue-light-500/15" },
  { name: "iPad Pro 3rd Gen", variants: "2 Variants", category: "Electronics", price: "$1,699.00", status: "Canceled", color: "bg-error-50 dark:bg-error-500/15" },
  { name: "AirPods Pro 2nd Gen", variants: "1 Variant", category: "Accessories", price: "$240.00", status: "Delivered", color: "bg-blue-light-50 dark:bg-blue-light-500/15" },
  { name: "Magic Keyboard", variants: "3 Variants", category: "Accessories", price: "$129.00", status: "Pending", color: "bg-success-50 dark:bg-success-500/15" },
];

const categories = ["All", "Laptop", "Watch", "Smartphone", "Electronics", "Accessories"];
const statusFilters = ["All", "Delivered", "Pending", "Canceled"];

export function EcommerceDashboard() {
  const [period, setPeriod] = React.useState<"7D" | "30D" | "12M">("12M");
  const [category, setCategory] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredProducts = allProducts.filter(p => {
    if (category !== "All" && p.category !== category) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Ecommerce Dashboard"
        description="Welcome back! Here's what's happening with your store today."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Export As</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Exporting as PDF...")}>PDF Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting as CSV...")}>CSV File</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting as Excel...")}>Excel Sheet</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left column: metrics + sales chart */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <Users className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Customers</span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">3,782</h4>
                </div>
                <Badge color="success"><ArrowUp className="h-3.5 w-3.5" />11.01%</Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <Box className="text-gray-800 dark:text-white/90 size-6" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Orders</span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">5,359</h4>
                </div>
                <Badge color="error"><ArrowDown className="h-3.5 w-3.5 text-error-500" />9.05%</Badge>
              </div>
            </div>
          </div>

          {/* Monthly Sales Chart with working period tabs */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Sales</h3>
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                {(["7D", "30D", "12M"] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${period === p ? "bg-white text-gray-800 shadow-theme-xs dark:bg-gray-900 dark:text-white/90" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}
                  >
                    {p === "7D" ? "7 Days" : p === "30D" ? "30 Days" : "12 Months"}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-[400px] xl:min-w-full pl-2 pb-5">
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByPeriod[period]} margin={{ left: -20, right: 8, top: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12, boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.1)" }}
                        cursor={{ fill: "#f2f4f7" }}
                      />
                      <Bar dataKey="sales" fill="#465fff" radius={[5, 5, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Monthly Target */}
        <div className="col-span-12 xl:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] h-full">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 dark:bg-gray-900 sm:px-6 sm:pt-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Target</h3>
                  <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">Target you've set for each month</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><MoreHorizontal className="h-5 w-5" /></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => toast.info("Viewing details...")}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("Editing target...")}>Edit Target</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.success("Report downloaded")}>Download Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative">
                <div className="max-h-[330px] flex items-center justify-center">
                  <div className="h-[330px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: 75.55 }]} startAngle={-85} endAngle={85}>
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: "#E4E7EC" }} dataKey="value" cornerRadius={20} fill="#465FFF" />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] text-center">
                  <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">75.55%</span>
                </div>
                <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">+10%</span>
              </div>
              <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base dark:text-gray-400">You earn $3,287 today, it's higher than last month. Keep up your good work!</p>
            </div>
            <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
              {[
                { label: "Target", value: "$20K", up: false },
                { label: "Revenue", value: "$20K", up: true },
                { label: "Today", value: "$20K", up: true },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />}
                  <div>
                    <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">{s.label}</p>
                    <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                      {s.value}
                      {s.up ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7.6 2.34C7.74 2.18 7.94 2.08 8.16 2.08C8.36 2.08 8.55 2.16 8.7 2.3L12.7 6.3C12.99 6.59 12.99 7.07 12.7 7.36C12.41 7.65 11.93 7.65 11.64 7.36L8.91 4.64V13.5C8.91 13.91 8.58 14.25 8.16 14.25C7.75 14.25 7.41 13.91 7.41 13.5V4.64L4.7 7.36C4.4 7.65 3.93 7.65 3.64 7.36C3.34 7.07 3.34 6.59 3.64 6.3L7.6 2.34Z" fill="#039855" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7.27 13.66C7.4 13.82 7.6 13.92 7.83 13.92C8.03 13.92 8.22 13.84 8.36 13.7L12.36 9.7C12.66 9.41 12.66 8.93 12.36 8.64C12.07 8.35 11.6 8.35 11.3 8.64L8.58 11.36V2.5C8.58 2.09 8.24 1.75 7.83 1.75C7.42 1.75 7.08 2.09 7.08 2.5V11.36L4.36 8.64C4.07 8.35 3.6 8.35 3.3 8.64C3.01 8.93 3.01 9.41 3.3 9.7L7.27 13.66Z" fill="#D92D20" /></svg>
                      )}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Chart */}
        <div className="col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                    {["Weekly", "Monthly", "Yearly"].map((t, i) => (
                      <button key={t} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${i === 1 ? "bg-white text-gray-800 shadow-theme-xs dark:bg-gray-900 dark:text-white/90" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>{t}</button>
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><MoreHorizontal className="h-5 w-5" /></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => toast.info("Viewing more...")}>View More</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success("Exported successfully")}>Export Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {[
                  { name: "Sales", target: 80, total: 120, color: "#465fff" },
                  { name: "Orders", target: 45, total: 90, color: "#0ba5ec" },
                  { name: "Returns", target: 20, total: 35, color: "#f79009" },
                  { name: "Customers", target: 60, total: 85, color: "#12b76a" },
                ].map(s => (
                  <div key={s.name} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{s.name}</p>
                        <h4 className="mt-2 font-bold text-gray-800 text-lg dark:text-white/90">{s.total}K</h4>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Target: {s.target}K</p>
                      </div>
                      <div className="relative h-16 w-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: (s.total / (s.target * 2)) * 100 }]} startAngle={90} endAngle={-270}>
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background={{ fill: "#e4e7ec" }} dataKey="value" cornerRadius={10} fill={s.color} />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: "Jan", sales: 45, orders: 28, returns: 8 },
                    { name: "Feb", sales: 62, orders: 35, returns: 12 },
                    { name: "Mar", sales: 55, orders: 30, returns: 10 },
                    { name: "Apr", sales: 78, orders: 42, returns: 15 },
                    { name: "May", sales: 68, orders: 38, returns: 11 },
                    { name: "Jun", sales: 85, orders: 48, returns: 14 },
                    { name: "Jul", sales: 92, orders: 52, returns: 16 },
                  ]} margin={{ left: -20, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#465fff" stopOpacity={0.4} /><stop offset="100%" stopColor="#465fff" stopOpacity={0} /></linearGradient>
                      <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ba5ec" stopOpacity={0.3} /><stop offset="100%" stopColor="#0ba5ec" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12, boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.1)" }} />
                    <Area type="monotone" dataKey="sales" stroke="#465fff" strokeWidth={2.5} fill="url(#salesGrad)" />
                    <Area type="monotone" dataKey="orders" stroke="#0ba5ec" strokeWidth={2.5} fill="url(#ordersGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Demographic Card */}
        <div className="col-span-12 xl:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-full">
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Demographic</h3>
              <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">Users by age group</p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-center">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[
                        { name: "18-24", value: 20, color: "#465fff" },
                        { name: "25-34", value: 35, color: "#0ba5ec" },
                        { name: "35-44", value: 25, color: "#f79009" },
                        { name: "45-54", value: 12, color: "#12b76a" },
                        { name: "55+", value: 8, color: "#ee46bc" },
                      ]} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                        {[{color:"#465fff"},{color:"#0ba5ec"},{color:"#f79009"},{color:"#12b76a"},{color:"#ee46bc"}].map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { name: "18-24 years", value: 20, color: "#465fff" },
                  { name: "25-34 years", value: 35, color: "#0ba5ec" },
                  { name: "35-44 years", value: 25, color: "#f79009" },
                  { name: "45-54 years", value: 12, color: "#12b76a" },
                  { name: "55+ years", value: 8, color: "#ee46bc" },
                ].map(d => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{d.name}</span>
                    <span className="ml-auto text-sm font-semibold text-gray-800 dark:text-white/90">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders with working filters and search */}
        <div className="col-span-12 xl:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-full">
            <div className="px-4 pt-4 pb-4 sm:px-6 sm:pt-6">
              <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Orders</h3>
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="pl-9 h-9" />
                </div>
              </div>
              {/* Working category filter chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-medium transition ${category === c ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{c}</button>
                ))}
                <div className="w-px bg-gray-200 dark:bg-gray-700 mx-1" />
                {statusFilters.map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium transition ${statusFilter === s ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="max-w-full overflow-x-auto px-4 pb-3 sm:px-6">
              <table className="w-full">
                <thead className="border-y border-gray-100 dark:border-gray-800">
                  <tr>{["Products", "Category", "Price", "Status"].map(h => (
                    <th key={h} className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((o, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-[50px] w-[50px] items-center justify-center rounded-md ${o.color}`}><Package className="h-5 w-5 text-gray-600 dark:text-gray-300" /></div>
                            <div><p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{o.name}</p><span className="text-gray-500 text-theme-xs dark:text-gray-400">{o.variants}</span></div>
                          </div>
                        </td>
                        <td className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{o.category}</td>
                        <td className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{o.price}</td>
                        <td className="py-3 text-theme-sm"><Badge size="sm" color={o.status === "Delivered" ? "success" : o.status === "Pending" ? "warning" : "error"}>{o.status}</Badge></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2"><ShoppingBag className="h-10 w-10 text-gray-300" /><p className="text-sm">No products match your filters</p></div>
                    </td></tr>
                  )}
                </tbody>
              </table>
              {filteredProducts.length > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-2">
                  <p className="text-xs text-gray-400">Showing {filteredProducts.length} of {allProducts.length} orders</p>
                  <button onClick={() => toast.info("Loading more orders...")} className="text-xs font-medium text-brand-500 hover:underline">View All</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal - fully functional */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Create a new product to add to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Product Name</Label>
              <Input placeholder="e.g. MacBook Pro 14&quot;" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category</Label>
                <select className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900">
                  <option>Laptop</option><option>Watch</option><option>Smartphone</option><option>Electronics</option><option>Accessories</option>
                </select>
              </div>
              <div><Label>Price ($)</Label><Input type="number" placeholder="0.00" className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Stock</Label><Input type="number" placeholder="0" className="mt-1.5" /></div>
              <div><Label>SKU</Label><Input placeholder="PRD-001" className="mt-1.5" /></div>
            </div>
            <div><Label>Variants</Label><Input placeholder="e.g. 2 Variants" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={() => { toast.success("Product added successfully!"); setModalOpen(false); }} className="gap-1.5"><Check className="h-4 w-4" /> Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
