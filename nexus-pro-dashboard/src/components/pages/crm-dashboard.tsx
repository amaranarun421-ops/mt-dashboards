"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Target, Trophy, Phone, Mail, Plus, Filter, TrendingUp, Search, MoreHorizontal, ChevronDown, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/common/status-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const pipelineStages = [
  { stage: "Lead", count: 248, value: 1240000, color: "#465fff" },
  { stage: "Qualified", count: 142, value: 890000, color: "#0ba5ec" },
  { stage: "Proposal", count: 86, value: 620000, color: "#f79009" },
  { stage: "Negotiation", count: 48, value: 410000, color: "#ee46bc" },
  { stage: "Won", count: 32, value: 284000, color: "#12b76a" },
];

const allDeals = [
  { company: "Acme Corp", contact: "Sarah Chen", value: 84000, stage: "Negotiation", owner: "Alex K", avatar: "https://i.pravatar.cc/40?img=1", prob: 80 },
  { company: "Globex Inc", contact: "Mark Park", value: 62000, stage: "Proposal", owner: "Riya P", avatar: "https://i.pravatar.cc/40?img=2", prob: 60 },
  { company: "Initech", contact: "Lisa Wang", value: 124000, stage: "Qualified", owner: "John D", avatar: "https://i.pravatar.cc/40?img=3", prob: 40 },
  { company: "Umbrella Co", contact: "David Liu", value: 48000, stage: "Won", owner: "Alex K", avatar: "https://i.pravatar.cc/40?img=4", prob: 100 },
  { company: "Stark Industries", contact: "Nora Lee", value: 210000, stage: "Lead", owner: "Riya P", avatar: "https://i.pravatar.cc/40?img=5", prob: 20 },
  { company: "Wayne Ent", contact: "Bruce Kim", value: 96000, stage: "Negotiation", owner: "John D", avatar: "https://i.pravatar.cc/40?img=6", prob: 75 },
  { company: "Soylent Corp", contact: "Emma Wilson", value: 54000, stage: "Proposal", owner: "Alex K", avatar: "https://i.pravatar.cc/40?img=7", prob: 55 },
  { company: "Hooli", contact: "James Brown", value: 168000, stage: "Qualified", owner: "Riya P", avatar: "https://i.pravatar.cc/40?img=8", prob: 45 },
];

const stages = ["All", "Lead", "Qualified", "Proposal", "Negotiation", "Won"];

const activities = [
  { icon: Phone, color: "text-blue-light-500 bg-blue-light-50 dark:bg-blue-light-500/15", text: "Called Sarah Chen (Acme Corp)", time: "2m ago", who: "Alex K" },
  { icon: Mail, color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15", text: "Sent proposal to Globex Inc", time: "1h ago", who: "Riya P" },
  { icon: Trophy, color: "text-success-600 bg-success-50 dark:bg-success-500/15", text: "Closed deal with Umbrella Co ($48k)", time: "3h ago", who: "Alex K" },
  { icon: Target, color: "text-warning-600 bg-warning-50 dark:bg-warning-500/15", text: "Moved Stark Industries to Lead", time: "5h ago", who: "Riya P" },
  { icon: Users, color: "text-blue-light-500 bg-blue-light-50 dark:bg-blue-light-500/15", text: "Added 12 new contacts from event", time: "Yesterday", who: "John D" },
];

export function CrmDashboard() {
  const [stageFilter, setStageFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"value" | "prob" | "company">("value");
  const [newDealOpen, setNewDealOpen] = React.useState(false);

  const filteredDeals = allDeals
    .filter(d => (stageFilter === "All" || d.stage === stageFilter) && (!search || d.company.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "value") return b.value - a.value;
      if (sortBy === "prob") return b.prob - a.prob;
      return a.company.localeCompare(b.company);
    });

  return (
    <div>
      <PageHeader
        breadcrumb={["Dashboards", "CRM"]}
        title="Customer Relationships"
        description="Pipeline health, deal velocity, and team performance across your sales organization."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter <ChevronDown className="h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Filter Deals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {stages.map(s => (
                  <DropdownMenuItem key={s} onClick={() => setStageFilter(s)} className="justify-between">
                    {s}
                    {stageFilter === s && <Check className="h-3.5 w-3.5 text-brand-500" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setNewDealOpen(true)}><Plus className="h-4 w-4" /> New Deal</Button>
          </>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {[
          { title: "Pipeline Value", value: "$3.44M", change: 14.2, trend: "up", icon: Target, sub: "556 active deals", color: "bg-gray-100 dark:bg-gray-800", iconColor: "text-gray-800 dark:text-white/90" },
          { title: "Won This Month", value: "$284K", change: 22.4, trend: "up", icon: Trophy, sub: "32 deals closed", color: "bg-success-50 dark:bg-success-500/15", iconColor: "text-success-600 dark:text-success-500" },
          { title: "Avg. Deal Size", value: "$8,875", change: -3.1, trend: "down", icon: TrendingUp, sub: "Down from $9.2k", color: "bg-warning-50 dark:bg-warning-500/15", iconColor: "text-warning-600 dark:text-orange-400" },
          { title: "Win Rate", value: "28.4%", change: 4.2, trend: "up", icon: Users, sub: "Up 4.2% MoM", color: "bg-blue-light-50 dark:bg-blue-light-500/15", iconColor: "text-blue-light-500" },
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

      {/* Pipeline Chart + Lead Sources */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Pipeline by Stage</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Deals and value at each stage</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><MoreHorizontal className="h-5 w-5" /></button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => toast.info("Viewing details...")}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exported pipeline data")}>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineStages} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "#f2f4f7" }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={64}>
                    {pipelineStages.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Lead Sources</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Where opportunities originate</p>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            {[
              { source: "Website", value: 142, pct: 32 },
              { source: "Referral", value: 96, pct: 22 },
              { source: "LinkedIn", value: 78, pct: 18 },
              { source: "Cold Email", value: 54, pct: 12 },
              { source: "Events", value: 42, pct: 10 },
              { source: "Other", value: 28, pct: 6 },
            ].map((s, i) => (
              <motion.div key={s.source} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{s.source}</span>
                  <span className="font-semibold text-gray-800 dark:text-white/90">{s.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct * 3}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full bg-brand-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Trend + Activity */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Leads vs. Won</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly conversion trend</p>
          </div>
          <div className="p-5 sm:p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: "Jan", leads: 180, won: 22 },
                  { month: "Feb", leads: 210, won: 28 },
                  { month: "Mar", leads: 240, won: 31 },
                  { month: "Apr", leads: 280, won: 35 },
                  { month: "May", leads: 320, won: 42 },
                  { month: "Jun", leads: 380, won: 48 },
                ]} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="leads" stroke="#0ba5ec" strokeWidth={2.5} dot={{ r: 4 }} name="Leads" />
                  <Line type="monotone" dataKey="won" stroke="#465fff" strokeWidth={2.5} dot={{ r: 4 }} name="Won" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Team updates</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3 p-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.color}`}><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90 leading-snug">{a.text}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{a.who} · {a.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Deals Table with working search, stage filter, sort */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Active Deals</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{filteredDeals.length} deals · sorted by {sortBy}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." className="pl-9 h-9" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">Sort<MoreHorizontal className="h-3 w-3" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setSortBy("value")}>By Value</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("prob")}>By Probability</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("company")}>By Company</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Working stage filter chips */}
        <div className="px-5 sm:px-6 pb-3 flex flex-wrap gap-2">
          {stages.map(s => (
            <button key={s} onClick={() => setStageFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium transition ${stageFilter === s ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{s}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>{["Company", "Contact", "Owner", "Stage", "Probability", "Value"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((d, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                    <td className="px-5 py-3 font-semibold text-gray-800 dark:text-white/90">{d.company}</td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{d.contact}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarImage src={d.avatar} /><AvatarFallback className="text-[10px]">{d.owner.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><span className="text-xs text-gray-600 dark:text-gray-400">{d.owner}</span></div></td>
                    <td className="px-5 py-3"><StatusBadge variant={d.stage === "Won" ? "success" : d.stage === "Negotiation" ? "info" : d.stage === "Proposal" ? "primary" : d.stage === "Qualified" ? "warning" : "neutral"}>{d.stage}</StatusBadge></td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-full rounded-full bg-brand-500" style={{ width: `${d.prob}%` }} /></div><span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{d.prob}%</span></div></td>
                    <td className="px-5 py-3 text-right font-bold text-gray-800 dark:text-white/90">${d.value.toLocaleString()}</td>
                  </motion.tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">No deals match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Deal Modal */}
      <Dialog open={newDealOpen} onOpenChange={setNewDealOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Deal</DialogTitle>
            <DialogDescription>Add a new opportunity to your sales pipeline.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div><Label>Company Name</Label><Input placeholder="e.g. Acme Corporation" className="mt-1.5" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Contact Person</Label><Input placeholder="John Doe" className="mt-1.5" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="john@acme.com" className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Deal Value ($)</Label><Input type="number" placeholder="50000" className="mt-1.5" /></div>
              <div><Label>Stage</Label>
                <select className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900">
                  <option>Lead</option><option>Qualified</option><option>Proposal</option><option>Negotiation</option><option>Won</option>
                </select>
              </div>
            </div>
            <div><Label>Win Probability (%)</Label><Input type="number" placeholder="50" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={() => { toast.success("Deal created successfully!"); setNewDealOpen(false); }} className="gap-1.5"><Check className="h-4 w-4" /> Create Deal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
