"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserPlus, Briefcase, Calendar, Plus, Filter, TrendingUp, Clock, Check, X, Search, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie } from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const headcountData = [
  { month: "Jan", hired: 8, left: 2 },
  { month: "Feb", hired: 12, left: 3 },
  { month: "Mar", hired: 6, left: 1 },
  { month: "Apr", hired: 14, left: 4 },
  { month: "May", hired: 10, left: 2 },
  { month: "Jun", hired: 16, left: 3 },
];

const departmentDist = [
  { name: "Engineering", value: 48, fill: "#465fff" },
  { name: "Design", value: 12, fill: "#0ba5ec" },
  { name: "Marketing", value: 14, fill: "#f79009" },
  { name: "Sales", value: 18, fill: "#ee46bc" },
  { name: "Operations", value: 8, fill: "#12b76a" },
];

const departments = ["All", "Engineering", "Design", "Marketing", "Sales", "Operations"];

const allCandidates = [
  { name: "Sarah Chen", role: "Senior Frontend Engineer", dept: "Engineering", stage: "Offer", score: 92, avatar: "https://i.pravatar.cc/40?img=11" },
  { name: "Marcus Lee", role: "Product Designer", dept: "Design", stage: "Final Interview", score: 87, avatar: "https://i.pravatar.cc/40?img=12" },
  { name: "Aria Patel", role: "DevOps Engineer", dept: "Engineering", stage: "Technical", score: 84, avatar: "https://i.pravatar.cc/40?img=13" },
  { name: "David Kim", role: "Backend Engineer", dept: "Engineering", stage: "Phone Screen", score: 78, avatar: "https://i.pravatar.cc/40?img=14" },
  { name: "Lisa Park", role: "Engineering Manager", dept: "Engineering", stage: "Final Interview", score: 89, avatar: "https://i.pravatar.cc/40?img=15" },
  { name: "Emma Wilson", role: "Brand Designer", dept: "Design", stage: "Offer", score: 90, avatar: "https://i.pravatar.cc/40?img=16" },
];

const initialLeaveRequests = [
  { id: 1, name: "Alex Kim", type: "Vacation", days: "5 days", status: "pending", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Riya Patel", type: "Sick Leave", days: "2 days", status: "pending", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "John Davis", type: "Personal", days: "1 day", status: "pending", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "Nora Lee", type: "Vacation", days: "3 days", status: "pending", avatar: "https://i.pravatar.cc/40?img=5" },
];

export function HrDashboard() {
  const [deptFilter, setDeptFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [leaveRequests, setLeaveRequests] = React.useState(initialLeaveRequests);

  const filteredCandidates = allCandidates.filter(c => {
    if (deptFilter !== "All" && c.dept !== deptFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleLeave = (id: number, action: "approved" | "rejected") => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
    toast.success(`Leave request ${action}`);
  };

  return (
    <div>
      <PageHeader
        breadcrumb={["Dashboards", "Human Resources"]}
        title="People Operations"
        description="Headcount growth, recruitment pipeline, attendance, and team well-being."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter <MoreHorizontal className="h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {departments.map(d => <DropdownMenuItem key={d} onClick={() => setDeptFilter(d)}>{d}</DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => toast.success("Opening employee form...")}><Plus className="h-4 w-4" /> Add Employee</Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { title: "Total Headcount", value: "142", change: 6.0, trend: "up", icon: Users, sub: "98 full-time · 44 contract", color: "bg-gray-100 dark:bg-gray-800", iconColor: "text-gray-800 dark:text-white/90" },
          { title: "Active Hires", value: "16", change: 14.2, trend: "up", icon: UserPlus, sub: "In onboarding", color: "bg-blue-light-50 dark:bg-blue-light-500/15", iconColor: "text-blue-light-500" },
          { title: "Attrition Rate", value: "2.1%", change: -0.8, trend: "down", icon: UserCheck, sub: "Below 3% target", color: "bg-success-50 dark:bg-success-500/15", iconColor: "text-success-600 dark:text-success-500" },
          { title: "Open Positions", value: "24", change: 8.4, trend: "up", icon: Briefcase, sub: "6 critical roles", color: "bg-warning-50 dark:bg-warning-500/15", iconColor: "text-warning-600 dark:text-orange-400" },
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
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-sm ${k.trend === "up" ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"}`}>{k.change > 0 ? "+" : ""}{k.change}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Headcount + Department */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Headcount Movement</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hires vs. departures</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={headcountData} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "#f2f4f7" }} />
                  <Bar dataKey="hired" fill="#12b76a" radius={[6, 6, 0, 0]} maxBarSize={28} name="Hired" />
                  <Bar dataKey="left" fill="#f04438" radius={[6, 6, 0, 0]} maxBarSize={28} name="Left" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Department Distribution</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Headcount by team</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                    {departmentDist.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1.5">
              {departmentDist.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{d.name}</span>
                  <span className="ml-auto font-bold text-gray-800 dark:text-white/90">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidates with working filter + search + Leave approvals */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recruitment Pipeline</h3>
              <div className="relative w-32 sm:w-44">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 h-9" />
              </div>
            </div>
            {/* Working department filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {departments.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${deptFilter === d ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[420px] overflow-y-auto">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                  <Avatar className="h-10 w-10"><AvatarImage src={c.avatar} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{c.name}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{c.role}</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-400">Stage</p>
                    <StatusBadge variant={c.stage === "Offer" ? "success" : c.stage === "Final Interview" ? "info" : c.stage === "Technical" ? "warning" : "neutral"}>{c.stage}</StatusBadge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Score</p>
                    <p className={`text-sm font-bold ${c.score > 85 ? "text-success-600 dark:text-success-500" : c.score > 75 ? "text-warning-600 dark:text-orange-400" : "text-gray-500"}`}>{c.score}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400"><Users className="h-10 w-10 mx-auto mb-2 text-gray-300" /><p className="text-sm">No candidates match your filters</p></div>
            )}
          </div>
        </div>

        {/* Leave Requests with working approve/reject */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Pending Leave Requests</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{leaveRequests.filter(l => l.status === "pending").length} awaiting approval</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {leaveRequests.map((l, i) => (
              <motion.div key={l.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-4">
                <Avatar className="h-10 w-10"><AvatarImage src={l.avatar} /><AvatarFallback>{l.name[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-white/90">{l.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{l.type} · {l.days}</p>
                </div>
                {l.status === "pending" ? (
                  <div className="flex gap-1.5">
                    <button onClick={() => handleLeave(l.id, "approved")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-50 text-success-600 transition hover:bg-success-100 dark:bg-success-500/15 dark:text-success-500" title="Approve"><Check className="h-4 w-4" /></button>
                    <button onClick={() => handleLeave(l.id, "rejected")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-error-50 text-error-600 transition hover:bg-error-100 dark:bg-error-500/15 dark:text-error-500" title="Reject"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <StatusBadge variant={l.status === "approved" ? "success" : "error"}>{l.status}</StatusBadge>
                )}
              </motion.div>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 p-3 text-center">
            <button onClick={() => toast.info("Viewing all requests...")} className="text-xs font-medium text-brand-500 hover:underline">View All Requests</button>
          </div>
        </div>
      </div>
    </div>
  );
}
