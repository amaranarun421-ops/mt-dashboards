"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  MousePointerClick,
  Eye,
  Mail,
  Plus,
  Download,
  TrendingUp,
  Share2,
  MoreHorizontal,
  Search,
  Check,
  BarChart3,
  AreaChart as AreaChartIcon,
  Pencil,
  Pause,
  Play,
  Copy,
  Trash2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type CampaignStatus = "active" | "paused" | "completed";
type ChartType = "area" | "bar";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  budget: number;
  spent: number;
  status: CampaignStatus;
  impressions: string;
  clicks: number;
  ctr: number;
}

const campaignPerf = [
  { name: "Mon", clicks: 1240, impressions: 24000, conversions: 84 },
  { name: "Tue", clicks: 1820, impressions: 32000, conversions: 124 },
  { name: "Wed", clicks: 1640, impressions: 28000, conversions: 102 },
  { name: "Thu", clicks: 2120, impressions: 38000, conversions: 148 },
  { name: "Fri", clicks: 2840, impressions: 48000, conversions: 192 },
  { name: "Sat", clicks: 3240, impressions: 54000, conversions: 224 },
  { name: "Sun", clicks: 2680, impressions: 46000, conversions: 184 },
];

const channelRoi = [
  { channel: "Google Ads", roi: 320, spend: 8400, revenue: 26880 },
  { channel: "Facebook", roi: 280, spend: 6200, revenue: 17360 },
  { channel: "LinkedIn", roi: 410, spend: 4200, revenue: 17220 },
  { channel: "Twitter", roi: 180, spend: 2800, revenue: 5040 },
  { channel: "TikTok", roi: 240, spend: 3200, revenue: 7680 },
  { channel: "Email", roi: 520, spend: 800, revenue: 4160 },
];

const initialCampaigns: Campaign[] = [
  { id: "CMP-001", name: "Summer Launch 2026", channel: "Multi-channel", budget: 24000, spent: 18400, status: "active", impressions: "1.2M", clicks: 32400, ctr: 2.7 },
  { id: "CMP-002", name: "Black Friday Teaser", channel: "Email + Social", budget: 18000, spent: 9200, status: "active", impressions: "840K", clicks: 18600, ctr: 2.2 },
  { id: "CMP-003", name: "Brand Awareness Q3", channel: "Display", budget: 12000, spent: 12000, status: "completed", impressions: "2.4M", clicks: 14200, ctr: 0.6 },
  { id: "CMP-004", name: "Retargeting Pool", channel: "Google", budget: 8000, spent: 6400, status: "paused", impressions: "420K", clicks: 8400, ctr: 2.0 },
  { id: "CMP-005", name: "Holiday Bundle Push", channel: "Multi-channel", budget: 16000, spent: 4200, status: "active", impressions: "320K", clicks: 7800, ctr: 2.4 },
  { id: "CMP-006", name: "Spring Refresh", channel: "Instagram", budget: 10000, spent: 10000, status: "completed", impressions: "920K", clicks: 11800, ctr: 1.3 },
];

const engagementRadar = [
  { metric: "Reach", value: 85 },
  { metric: "Engagement", value: 72 },
  { metric: "CTR", value: 68 },
  { metric: "Conversion", value: 54 },
  { metric: "Retention", value: 78 },
  { metric: "Sentiment", value: 88 },
];

const statusFilters: Array<"all" | CampaignStatus> = ["all", "active", "paused", "completed"];

const statusVariant: Record<CampaignStatus, "success" | "warning" | "neutral"> = {
  active: "success",
  paused: "warning",
  completed: "neutral",
};

export function MarketingDashboard() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>(initialCampaigns);
  const [statusFilter, setStatusFilter] = React.useState<"all" | CampaignStatus>("all");
  const [chartType, setChartType] = React.useState<ChartType>("area");
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    channel: "Multi-channel",
    budget: "",
    objective: "Awareness",
  });

  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    paused: campaigns.filter((c) => c.status === "paused").length,
    completed: campaigns.filter((c) => c.status === "completed").length,
  };

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast.error("Campaign name is required");
      return;
    }
    const newCampaign: Campaign = {
      id: `CMP-${String(campaigns.length + 1).padStart(3, "0")}`,
      name: form.name,
      channel: form.channel,
      budget: Number(form.budget) || 5000,
      spent: 0,
      status: "active",
      impressions: "0",
      clicks: 0,
      ctr: 0,
    };
    setCampaigns([newCampaign, ...campaigns]);
    toast.success(`Campaign "${form.name}" created`);
    setForm({ name: "", channel: "Multi-channel", budget: "", objective: "Awareness" });
    setModalOpen(false);
  };

  const updateStatus = (id: string, status: CampaignStatus) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success(`Campaign marked as ${status}`);
  };

  return (
    <div>
      <PageHeader
        title="Campaign Performance"
        description="Cross-channel attribution, audience engagement, and content ROI in one view."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" /> Export <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Download Report</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Generating PDF report...")}>
                  <Download className="h-4 w-4" /> PDF Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting CSV...")}>
                  <Download className="h-4 w-4" /> CSV Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exporting Excel...")}>
                  <Download className="h-4 w-4" /> Excel Workbook
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Campaign
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Impressions (WTD)", value: "1.28M", change: 22.4, trend: "up" as const, icon: Eye, subtitle: "Across 6 channels", color: "text-blue-light-500" },
          { title: "Click-through Rate", value: "2.8%", change: 0.4, trend: "up" as const, icon: MousePointerClick, subtitle: "Above 2.5% benchmark", color: "text-brand-500" },
          { title: "Conversions", value: "1,058", change: 18.2, trend: "up" as const, icon: TrendingUp, subtitle: "$84.2k attributed revenue", color: "text-success-500" },
          { title: "Email Open Rate", value: "42.8%", change: -2.1, trend: "down" as const, icon: Mail, subtitle: "Slight dip this week", color: "text-warning-500" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</span>
                <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">{kpi.value}</h4>
                {kpi.subtitle && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{kpi.subtitle}</p>}
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                  kpi.trend === "up"
                    ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                    : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                }`}
              >
                {kpi.trend === "up" ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Campaign Performance</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Daily clicks and impressions</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              <button
                onClick={() => { setChartType("area"); toast.info("Switched to area chart"); }}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  chartType === "area" ? "bg-brand-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-800 dark:text-gray-400"
                }`}
              >
                <AreaChartIcon className="h-3.5 w-3.5" /> Area
              </button>
              <button
                onClick={() => { setChartType("bar"); toast.info("Switched to bar chart"); }}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  chartType === "bar" ? "bg-brand-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-800 dark:text-gray-400"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" /> Bar
              </button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart data={campaignPerf} margin={{ left: -16, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#465fff" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#465fff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ba5ec" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0ba5ec" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="impressions" stroke="#0ba5ec" strokeWidth={2} fill="url(#impGrad)" />
                  <Area type="monotone" dataKey="clicks" stroke="#465fff" strokeWidth={2.5} fill="url(#clickGrad)" />
                </AreaChart>
              ) : (
                <BarChart data={campaignPerf} margin={{ left: -16, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "#f2f4f7" }} />
                  <Bar dataKey="impressions" fill="#0ba5ec" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="clicks" fill="#465fff" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Engagement Radar</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Multi-metric performance</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={engagementRadar} outerRadius={90}>
                <PolarGrid stroke="#e4e7ec" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#667085" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#667085" }} />
                <Radar dataKey="value" stroke="#465fff" fill="#465fff" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Channel ROI Chart */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Channel ROI</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Return on ad spend by channel</p>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelRoi} layout="vertical" margin={{ left: 20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="channel" type="category" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip cursor={{ fill: "#f2f4f7" }} />
              <Bar dataKey="roi" radius={[0, 6, 6, 0]} maxBarSize={24}>
                {channelRoi.map((_, i) => (
                  <Cell key={i} fill="#465fff" fillOpacity={0.5 + i * 0.08} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Active Campaigns</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Budget utilization and live metrics</p>
          </div>
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="h-9 pl-9" />
          </div>
        </div>

        {/* Status filter chips */}
        <div className="flex flex-wrap gap-2 px-5 py-4 dark:px-6">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); toast.info(`Filtered: ${s === "all" ? "All campaigns" : s}`); }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                statusFilter === s
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {s === "all" ? "All" : s} <span className="ml-1 opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-y border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Campaign</th>
                <th className="px-5 py-3 text-left font-semibold">Channel</th>
                <th className="px-5 py-3 text-left font-semibold">Budget Used</th>
                <th className="px-5 py-3 text-right font-semibold">Impressions</th>
                <th className="px-5 py-3 text-right font-semibold">Clicks</th>
                <th className="px-5 py-3 text-right font-semibold">CTR</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((c, i) => {
                  const pct = c.budget > 0 ? (c.spent / c.budget) * 100 : 0;
                  return (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="text-sm transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3">
                        <p className="font-semibold text-gray-800 dark:text-white/90">{c.name}</p>
                        <p className="font-mono text-xs text-gray-400">{c.id}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{c.channel}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            ${(c.spent / 1000).toFixed(1)}k / ${(c.budget / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{c.impressions}</td>
                      <td className="px-5 py-3 text-right font-mono text-xs text-gray-700 dark:text-gray-300">{c.clicks.toLocaleString()}</td>
                      <td className="px-5 py-3 text-right font-bold text-gray-800 dark:text-white/90">{c.ctr}%</td>
                      <td className="px-5 py-3 text-center">
                        <StatusBadge variant={statusVariant[c.status]} dot pulse={c.status === "active"}>
                          {c.status}
                        </StatusBadge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>{c.id}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.success(`Editing "${c.name}"`)}>
                              <Pencil className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Duplicating "${c.name}"`)}>
                              <Copy className="h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(c.id, c.status === "paused" ? "active" : "paused")}>
                              {c.status === "paused" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                              {c.status === "paused" ? "Resume" : "Pause"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => {
                                setCampaigns((prev) => prev.filter((x) => x.id !== c.id));
                                toast.success(`Campaign "${c.name}" deleted`);
                              }}
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                    <Megaphone className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No campaigns match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Campaign Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>New Campaign</DialogTitle>
            <DialogDescription>Create a new marketing campaign. Fields marked * are required.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Campaign Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Summer Launch 2026"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Channel</Label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <option>Multi-channel</option>
                  <option>Google Ads</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                  <option>TikTok</option>
                  <option>Email</option>
                  <option>Display</option>
                </select>
              </div>
              <div>
                <Label>Budget ($)</Label>
                <Input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="5000"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label>Objective</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {["Awareness", "Conversion", "Engagement", "Traffic"].map((o) => (
                  <button
                    key={o}
                    onClick={() => { setForm({ ...form, objective: o }); toast.info(`Objective: ${o}`); }}
                    className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition ${
                      form.objective === o
                        ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreate} className="gap-1.5">
              <Check className="h-4 w-4" /> Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
