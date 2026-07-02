"use client";

import * as React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight, ArrowRight, Plus, Download, Filter, MoreHorizontal,
  TrendingUp, TrendingDown, DollarSign, Target, Crown, Briefcase,
  Building2, Users, Activity, MapPin, FileBarChart, Tags, Upload,
  AlertTriangle, Sparkles, Check, X, Phone, Mail, Calendar, FileText,
  Shield, Zap, Clock, ChevronRight, Eye, Pencil, Trash2,
} from "lucide-react";
import { DataTable, exportToCSV, exportToJSON } from "@/components/tables/data-table";
import { PageHero, StatBlock, SectionHeading, Panel, Callout, EmptyState, QuickLinkCard } from "@/components/common/page-blocks";
import {
  AreaSeriesChart, BarSeriesChart, DonutChart, FunnelChart, ChartCard, RadialProgressChart, CohortMatrix,
} from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deals, leads, accounts, contacts, salesReps, pipelineStages, activities, salesOverview,
} from "@/data/sales";
import { formatCurrency, formatCompactCurrency, formatPercent } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";
import type { Deal, Lead, Account, Contact } from "@/types";

const STAGE_COLORS: Record<string, string> = {
  prospecting: "#94a3b8",
  qualification: "#0ba5ec",
  proposal: "#7a5af8",
  negotiation: "#f79009",
  "closed-won": "#12b76a",
  "closed-lost": "#f04438",
};

// ============ Helper: stage badge ============
function StageBadge({ stage }: { stage: string }) {
  const color = STAGE_COLORS[stage] ?? "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {stage.replace("-", " ")}
    </span>
  );
}

function RiskBadge({ score }: { score: number }) {
  const tone = score >= 60 ? "error" : score >= 40 ? "warning" : "success";
  const cls = tone === "error" ? "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
    : tone === "warning" ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500"
    : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500";
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", cls)}>{score} risk</span>;
}

// ============ Pipeline page ============
export function SalesPipelinePage() {
  const stages = pipelineStages.filter((s) => s.id !== "closed-lost");
  const dealsByStage = stages.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage.id),
  }));

  const totalValue = stages.reduce((sum, s) => sum + s.value, 0);
  const totalWeighted = stages.reduce((sum, s) => sum + s.weightedValue, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Pipeline"
        description="Drag deals across stages. Each stage shows count, value, weighted value, and conversion rate."
        breadcrumb={["Nexus Pro", "Sales Ops", "Pipeline"]}
        tone="brand"
        meta={[
          { label: "Open value", value: formatCurrency(totalValue) },
          { label: "Weighted", value: formatCurrency(totalWeighted) },
          { label: "Stages", value: stages.length.toString() },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Deal</Button>
          </>
        }
      />

      {/* Kanban-style board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {dealsByStage.map(({ stage, deals: stageDeals }) => (
          <div
            key={stage.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.01] p-3"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STAGE_COLORS[stage.id] }} />
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{stage.label}</h3>
                <span className="text-xs text-gray-400">({stageDeals.length})</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreHorizontal className="h-4 w-4" /></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Collapse stage</DropdownMenuItem>
                  <DropdownMenuItem>Edit stage</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Value</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCompactCurrency(stage.value)}</span>
              </div>
              <div className="flex justify-between mt-0.5">
                <span>Weighted</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">{formatCompactCurrency(stage.weightedValue)}</span>
              </div>
              <div className="flex justify-between mt-0.5">
                <span>Avg days</span>
                <span>{stage.avgDaysInStage}d</span>
              </div>
            </div>
            <div className="space-y-2">
              {stageDeals.map((deal) => (
                <Link
                  key={deal.id}
                  href={`/sales/deals/${deal.id}`}
                  className="block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-3 hover:border-brand-500/40 hover:shadow-sm transition group"
                >
                  <p className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-2">{deal.title}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{deal.account}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{formatCompactCurrency(deal.value)}</span>
                    {deal.riskScore >= 40 && <RiskBadge score={deal.riskScore} />}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-semibold">
                        {deal.owner.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">{deal.age}d</span>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-gray-300 group-hover:text-brand-500" />
                  </div>
                </Link>
              ))}
              {stageDeals.length === 0 && (
                <button className="w-full text-xs text-gray-400 hover:text-brand-500 py-3 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg hover:border-brand-500/40 transition">
                  + Add deal
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Conversion funnel + forecast vs closed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Stage Conversion Funnel" description="Conversion rate from each stage to the next">
          <FunnelChart
            data={stages.map((s) => ({ stage: s.label, value: s.value, pct: s.conversionRate * 100 }))}
            height={280}
          />
        </ChartCard>
        <ChartCard title="Forecast vs Closed-Won" description="Last 12 months · USD">
          <AreaSeriesChart
            data={salesOverview.monthly}
            series={[
              { key: "forecast", label: "Forecast", color: "#7a5af8" },
              { key: "closedWon", label: "Closed Won", color: "#465fff" },
            ]}
            xKey="name"
            currency
            height={280}
          />
        </ChartCard>
      </div>
    </div>
  );
}

// ============ Deals table page ============
const dealColumns: ColumnDef<Deal>[] = [
  {
    accessorKey: "title",
    header: "Deal",
    cell: ({ row }) => (
      <Link href={`/sales/deals/${row.original.id}`} className="font-medium text-gray-800 dark:text-white hover:text-brand-500 line-clamp-1">
        {row.original.title}
      </Link>
    ),
  },
  { accessorKey: "account", header: "Account", cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.original.account}</span> },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.original.owner}</span> },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <span className="font-semibold text-gray-800 dark:text-white">{formatCurrency(row.original.value)}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "weightedValue",
    header: "Weighted",
    cell: ({ row }) => <span className="text-brand-600 dark:text-brand-400 font-medium">{formatCurrency(row.original.weightedValue)}</span>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => <StageBadge stage={row.original.stage} />,
  },
  {
    accessorKey: "riskScore",
    header: "Risk",
    cell: ({ row }) => <RiskBadge score={row.original.riskScore} />,
  },
  {
    accessorKey: "expectedClose",
    header: "Close Date",
    cell: ({ row }) => <span className="text-gray-500 dark:text-gray-400 text-xs">{new Date(row.original.expectedClose).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-auto block"><MoreHorizontal className="h-4 w-4" /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild><Link href={`/sales/deals/${row.original.id}`}>Open</Link></DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Convert to project</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-error-600 dark:text-error-500">Mark closed-lost</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function SalesDealsPage() {
  const totalValue = deals.reduce((s, d) => s + d.value, 0);
  const totalWeighted = deals.reduce((s, d) => s + d.weightedValue, 0);
  const avgSize = totalValue / deals.length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Deals"
        description="All open deals across the team. Use bulk actions to update stages, assign owners, or export."
        breadcrumb={["Nexus Pro", "Sales Ops", "Deals"]}
        tone="default"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Deal</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Total Pipeline" value={formatCompactCurrency(totalValue)} icon={DollarSign} variant="compact" />
        <StatBlock label="Weighted" value={formatCompactCurrency(totalWeighted)} icon={TrendingUp} variant="compact" />
        <StatBlock label="Avg Deal Size" value={formatCompactCurrency(avgSize)} icon={Briefcase} variant="compact" />
        <StatBlock label="Open Deals" value={deals.length.toString()} icon={Target} variant="compact" />
      </div>

      <DataTable
        columns={dealColumns}
        data={deals}
        enableRowSelection
        pageSize={10}
        searchPlaceholder="Search deals by title, account, owner..."
        bulkActions={(rows) => (
          <>
            <Button size="sm" variant="outline">Change stage</Button>
            <Button size="sm" variant="outline">Assign</Button>
            <Button size="sm" variant="outline">Export selected</Button>
          </>
        )}
        onExport={(rows, fmt) => {
          if (fmt === "csv") exportToCSV(rows, "nexus-deals");
          else exportToJSON(rows, "nexus-deals");
        }}
      />
    </div>
  );
}

// ============ Leads table page ============
const leadColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Lead",
    cell: ({ row }) => (
      <Link href={`/sales/leads/${row.original.id}`} className="font-medium text-gray-800 dark:text-white hover:text-brand-500">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "source", header: "Source", cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.original.source}</Badge> },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.original.score;
      const tone = score >= 75 ? "success" : score >= 50 ? "warning" : "error";
      const cls = tone === "success" ? "bg-success-500/15 text-success-600 dark:text-success-500"
        : tone === "warning" ? "bg-warning-500/15 text-warning-600 dark:text-warning-500"
        : "bg-error-500/15 text-error-600 dark:text-error-500";
      return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", cls)}>{score}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const tone = status === "qualified" ? "success" : status === "converted" ? "brand" : status === "unqualified" ? "error" : "neutral";
      const cls = tone === "success" ? "bg-success-500/15 text-success-600 dark:text-success-500"
        : tone === "brand" ? "bg-brand-500/15 text-brand-500"
        : tone === "error" ? "bg-error-500/15 text-error-600 dark:text-error-500"
        : "bg-gray-500/15 text-gray-600 dark:text-gray-400";
      return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize", cls)}>{status}</span>;
    },
  },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.original.owner}</span> },
  { accessorKey: "estimatedValue", header: "Est. Value", cell: ({ row }) => <span className="font-medium">{formatCurrency(row.original.estimatedValue)}</span> },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(row.original.lastActivity).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>,
  },
];

export function SalesLeadsPage() {
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const totalEst = leads.reduce((s, l) => s + l.estimatedValue, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Leads"
        description="Scored, source-tagged leads ready for outreach. Convert qualified leads to deals in one click."
        breadcrumb={["Nexus Pro", "Sales Ops", "Leads"]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Lead</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Total Leads" value={leads.length.toString()} icon={Users} variant="compact" />
        <StatBlock label="Qualified" value={qualified.toString()} icon={Check} variant="compact" />
        <StatBlock label="Converted" value={converted.toString()} icon={TrendingUp} variant="compact" />
        <StatBlock label="Est. Pipeline" value={formatCompactCurrency(totalEst)} icon={DollarSign} variant="compact" />
      </div>
      <DataTable
        columns={leadColumns}
        data={leads}
        enableRowSelection
        searchPlaceholder="Search leads by name, company, source..."
        onExport={(rows, fmt) => {
          if (fmt === "csv") exportToCSV(rows, "nexus-leads");
          else exportToJSON(rows, "nexus-leads");
        }}
      />
    </div>
  );
}

// ============ Accounts page ============
const accountColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Account",
    cell: ({ row }) => (
      <Link href={`/sales/accounts/${row.original.id}`} className="font-medium text-gray-800 dark:text-white hover:text-brand-500">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "industry", header: "Industry" },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => {
      const tier = row.original.tier;
      const cls = tier === "enterprise" ? "bg-brand-500/15 text-brand-600 dark:text-brand-400"
        : tier === "mid-market" ? "bg-purple-500/15 text-purple-600 dark:text-purple-400"
        : "bg-gray-500/15 text-gray-600 dark:text-gray-400";
      return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize", cls)}>{tier.replace("-", " ")}</span>;
    },
  },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "openDeals", header: "Open Deals", cell: ({ row }) => <span className="font-medium">{row.original.openDeals}</span> },
  { accessorKey: "totalPipeline", header: "Pipeline", cell: ({ row }) => <span className="font-semibold">{formatCompactCurrency(row.original.totalPipeline)}</span> },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => {
      const h = row.original.health;
      const cls = h === "green" ? "bg-success-500/15 text-success-600 dark:text-success-500"
        : h === "yellow" ? "bg-warning-500/15 text-warning-600 dark:text-warning-500"
        : "bg-error-500/15 text-error-600 dark:text-error-500";
      return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold capitalize", cls)}>{h}</span>;
    },
  },
];

export function SalesAccountsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Accounts"
        description="Tier-keyed accounts with pipeline value, health, and ownership."
        breadcrumb={["Nexus Pro", "Sales Ops", "Accounts"]}
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Account</Button>}
      />
      <DataTable
        columns={accountColumns}
        data={accounts}
        searchPlaceholder="Search accounts..."
        onExport={(rows, fmt) => {
          if (fmt === "csv") exportToCSV(rows, "nexus-accounts");
          else exportToJSON(rows, "nexus-accounts");
        }}
      />
    </div>
  );
}

// ============ Contacts page ============
const contactColumns: ColumnDef<Contact>[] = [
  { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="font-medium text-gray-800 dark:text-white">{row.original.name}</span> },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "accountName", header: "Account" },
  { accessorKey: "email", header: "Email", cell: ({ row }) => <a href={`mailto:${row.original.email}`} className="text-brand-500 hover:underline">{row.original.email}</a> },
  { accessorKey: "phone", header: "Phone", cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">{row.original.phone}</span> },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "lastContacted", header: "Last Contacted", cell: ({ row }) => <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(row.original.lastContacted).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> },
];

export function SalesContactsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Contacts"
        description="Every contact, tied to an account, with owner and last-contacted timestamp."
        breadcrumb={["Nexus Pro", "Sales Ops", "Contacts"]}
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Contact</Button>}
      />
      <DataTable
        columns={contactColumns}
        data={contacts}
        searchPlaceholder="Search contacts by name, title, account..."
      />
    </div>
  );
}

// ============ Forecasting page ============
export function SalesForecastingPage() {
  const accuracy = 0.923;
  const forecastData = salesOverview.monthly.map((m) => ({
    name: m.name,
    actual: m.closedWon,
    forecast: m.forecast,
    variance: ((m.closedWon - m.forecast) / m.forecast) * 100,
  }));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Forecasting"
        description="Weighted forecast with accuracy tracking and scenario planning."
        breadcrumb={["Nexus Pro", "Sales Ops", "Forecasting"]}
        tone="brand"
        meta={[
          { label: "Method", value: "Weighted pipeline" },
          { label: "Accuracy", value: formatPercent(accuracy, 1) },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock label="Q3 Forecast" value={formatCompactCurrency(2_840_000)} delta={0.087} sublabel="vs Q2" icon={TrendingUp} variant="gradient" tone="brand" />
        <StatBlock label="Committed" value={formatCompactCurrency(1_920_000)} delta={0.124} sublabel="vs last quarter" icon={Check} variant="gradient" tone="success" />
        <StatBlock label="Best Case" value={formatCompactCurrency(3_640_000)} delta={0.063} sublabel="upside" icon={Target} variant="card" />
        <StatBlock label="Forecast Accuracy" value={formatPercent(accuracy, 1)} delta={0.024} sublabel="trailing 4Q" icon={Zap} variant="card" />
      </div>
      <ChartCard
        title="Forecast vs Actual"
        description="Monthly forecast vs closed-won · last 12 months"
        legend={[
          { label: "Forecast", color: "#7a5af8" },
          { label: "Actual", color: "#465fff" },
        ]}
      >
        <AreaSeriesChart
          data={forecastData}
          series={[
            { key: "forecast", label: "Forecast", color: "#7a5af8" },
            { key: "actual", label: "Actual", color: "#465fff" },
          ]}
          xKey="name"
          currency
          height={320}
        />
      </ChartCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Scenario Planner" description="Adjust win rate and see the impact on Q3 forecast">
          <ScenarioPlanner />
        </Panel>
        <Panel title="Forecast by Segment" description="Breakdown by territory">
          <BarSeriesChart
            data={salesOverview.territories.map((t) => ({ name: t.name, pipeline: t.pipeline, closed: t.closed }))}
            series={[
              { key: "pipeline", label: "Pipeline", color: "#465fff" },
              { key: "closed", label: "Closed", color: "#12b76a" },
            ]}
            xKey="name"
            currency
            height={260}
          />
        </Panel>
      </div>
    </div>
  );
}

function ScenarioPlanner() {
  const [winRate, setWinRate] = React.useState(63);
  const baseForecast = 2_840_000;
  const adjusted = baseForecast * (winRate / 63);
  const delta = (adjusted - baseForecast) / baseForecast;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Win rate assumption</label>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{winRate}%</span>
        </div>
        <input
          type="range"
          min={40}
          max={80}
          value={winRate}
          onChange={(e) => setWinRate(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>40%</span>
          <span>80%</span>
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">Adjusted Q3 forecast</p>
        <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(adjusted)}</p>
        <p className={cn("mt-1 text-xs font-semibold", delta >= 0 ? "text-success-600 dark:text-success-500" : "text-error-600 dark:text-error-500")}>
          {delta >= 0 ? "+" : ""}{(delta * 100).toFixed(1)}% vs baseline
        </p>
      </div>
      <Callout tone="info" title="Sensitivity">
        <p>Each 1% change in win rate moves the forecast by ~${Math.round(baseForecast / 63).toLocaleString()}.</p>
      </Callout>
    </div>
  );
}

// ============ Quota page ============
export function SalesQuotaPage() {
  const teamQuota = salesReps.reduce((s, r) => s + r.quota, 0);
  const teamAttained = salesReps.reduce((s, r) => s + r.attained, 0);
  const attainmentRate = teamAttained / teamQuota;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Quota & Attainment"
        description="Per-rep quota tracking with attainment rates, variance, and projected overage/shortfall."
        breadcrumb={["Nexus Pro", "Sales Ops", "Quota"]}
        tone="brand"
        meta={[
          { label: "Team quota", value: formatCurrency(teamQuota) },
          { label: "Attained", value: formatCurrency(teamAttained) },
          { label: "Rate", value: formatPercent(attainmentRate, 1) },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock label="Team Quota" value={formatCompactCurrency(teamQuota)} icon={Target} variant="card" />
        <StatBlock label="Attained" value={formatCompactCurrency(teamAttained)} delta={0.045} sublabel="vs target" icon={TrendingUp} variant="card" />
        <StatBlock label="Over Quota" value={salesReps.filter((r) => r.attainmentRate >= 1).length.toString()} icon={Crown} variant="compact" />
        <StatBlock label="At Risk" value={salesReps.filter((r) => r.attainmentRate < 0.85).length.toString()} icon={AlertTriangle} variant="compact" />
      </div>
      <Panel title="Rep-by-rep attainment" description="Sorted by attainment rate">
        <div className="space-y-3">
          {[...salesReps].sort((a, b) => b.attainmentRate - a.attainmentRate).map((rep, i) => (
            <div key={rep.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-400 w-6">#{i + 1}</span>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">{rep.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{rep.name}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{formatCompactCurrency(rep.attained)} / {formatCompactCurrency(rep.quota)}</p>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Progress value={rep.attainmentRate * 100} className="h-1.5" />
                  <span className={cn(
                    "text-xs font-semibold w-12 text-right",
                    rep.attainmentRate >= 1 ? "text-success-600 dark:text-success-500" :
                    rep.attainmentRate >= 0.85 ? "text-brand-600 dark:text-brand-400" :
                    "text-warning-600 dark:text-warning-500"
                  )}>
                    {formatPercent(rep.attainmentRate, 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ============ Team Performance page ============
export function SalesTeamPerformancePage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Team Performance"
        description="Leaderboard, win rates, deal velocity, and activity metrics per rep."
        breadcrumb={["Nexus Pro", "Sales Ops", "Team Performance"]}
        tone="brand"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock label="Top Performer" value="Daniel Sørensen" sublabel="104.5% of quota" icon={Crown} variant="gradient" tone="warning" />
        <StatBlock label="Team Win Rate" value={formatPercent(0.631, 1)} delta={0.024} icon={Target} variant="card" />
        <StatBlock label="Avg Velocity" value="$42K/day" delta={0.094} icon={Zap} variant="card" />
        <StatBlock label="Deals Closed" value="118" delta={0.082} icon={Check} variant="card" />
      </div>
      <Panel title="Rep Leaderboard" description="Comprehensive per-rep breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
                <th className="text-left p-3 font-semibold">Rank</th>
                <th className="text-left p-3 font-semibold">Rep</th>
                <th className="text-left p-3 font-semibold">Team / Region</th>
                <th className="text-right p-3 font-semibold">Quota</th>
                <th className="text-right p-3 font-semibold">Attained</th>
                <th className="text-right p-3 font-semibold">Deals</th>
                <th className="text-right p-3 font-semibold">Win Rate</th>
                <th className="text-right p-3 font-semibold">Pipeline</th>
                <th className="text-right p-3 font-semibold">Attainment</th>
              </tr>
            </thead>
            <tbody>
              {[...salesReps].sort((a, b) => b.attainmentRate - a.attainmentRate).map((rep, i) => (
                <tr key={rep.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-gray-400">{i + 1}</td>
                  <td className="p-3">
                    <Link href={`/sales/rep/${rep.id}`} className="flex items-center gap-2 group">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">{rep.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800 dark:text-white group-hover:text-brand-500">{rep.name}</span>
                    </Link>
                  </td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">{rep.team} · {rep.region}</td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{formatCompactCurrency(rep.quota)}</td>
                  <td className="p-3 text-right font-semibold text-gray-800 dark:text-white">{formatCompactCurrency(rep.attained)}</td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{rep.deals}</td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{formatPercent(rep.winRate, 0)}</td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{formatCompactCurrency(rep.pipeline)}</td>
                  <td className="p-3 text-right">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                      rep.attainmentRate >= 1 ? "bg-success-500/15 text-success-600 dark:text-success-500" :
                      rep.attainmentRate >= 0.85 ? "bg-brand-500/15 text-brand-600 dark:text-brand-400" :
                      "bg-warning-500/15 text-warning-600 dark:text-warning-500"
                    )}>
                      {formatPercent(rep.attainmentRate, 0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

// ============ Territories page ============
export function SalesTerritoriesPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Territories"
        description="Geographic performance breakdown with attainment per region."
        breadcrumb={["Nexus Pro", "Sales Ops", "Territories"]}
        tone="brand"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {salesOverview.territories.map((t) => (
          <div key={t.name} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{t.name}</span>
              </div>
              <span className={cn(
                "text-xs font-semibold",
                t.attainment >= 1 ? "text-success-600 dark:text-success-500" :
                t.attainment >= 0.85 ? "text-brand-600 dark:text-brand-400" :
                "text-warning-600 dark:text-warning-500"
              )}>
                {formatPercent(t.attainment, 0)}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pipeline</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{formatCompactCurrency(t.pipeline)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Closed</span>
                <span className="font-medium text-success-600 dark:text-success-500">{formatCompactCurrency(t.closed)}</span>
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div
                className={cn("h-full", t.attainment >= 1 ? "bg-success-500" : t.attainment >= 0.85 ? "bg-brand-500" : "bg-warning-500")}
                style={{ width: `${Math.min(t.attainment * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <ChartCard title="Territory comparison" description="Pipeline vs closed by region">
        <BarSeriesChart
          data={salesOverview.territories.map((t) => ({ name: t.name, pipeline: t.pipeline, closed: t.closed }))}
          series={[
            { key: "pipeline", label: "Pipeline", color: "#465fff" },
            { key: "closed", label: "Closed", color: "#12b76a" },
          ]}
          xKey="name"
          currency
          height={300}
        />
      </ChartCard>
    </div>
  );
}

// ============ Activities page ============
export function SalesActivitiesPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Activities"
        description="Calls, emails, meetings, notes, and deal events — all filterable."
        breadcrumb={["Nexus Pro", "Sales Ops", "Activities"]}
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Log Activity</Button>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBlock label="Calls" value={activities.filter((a) => a.type === "call").length.toString()} icon={Phone} variant="compact" />
        <StatBlock label="Emails" value={activities.filter((a) => a.type === "email").length.toString()} icon={Mail} variant="compact" />
        <StatBlock label="Meetings" value={activities.filter((a) => a.type === "meeting").length.toString()} icon={Calendar} variant="compact" />
        <StatBlock label="Notes" value={activities.filter((a) => a.type === "note").length.toString()} icon={FileText} variant="compact" />
      </div>
      <Panel title="Activity timeline" description="Most recent first">
        <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200 dark:before:bg-gray-800">
          {activities.map((a) => {
            const iconMap: Record<string, { icon: typeof Activity; color: string }> = {
              call: { icon: Phone, color: "bg-blue-light-500/15 text-blue-light-600 dark:text-blue-light-400" },
              email: { icon: Mail, color: "bg-brand-500/15 text-brand-500" },
              meeting: { icon: Users, color: "bg-success-500/15 text-success-600 dark:text-success-500" },
              deal: { icon: Briefcase, color: "bg-purple-500/15 text-purple-500" },
              note: { icon: FileText, color: "bg-warning-500/15 text-warning-600 dark:text-warning-500" },
              task: { icon: Check, color: "bg-gray-500/15 text-gray-600 dark:text-gray-400" },
            };
            const { icon: Icon, color } = iconMap[a.type] ?? iconMap.task;
            return (
              <li key={a.id} className="relative flex gap-3">
                <div className={cn("relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900", color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 pb-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{a.title}</p>
                    {a.outcome && (
                      <Badge variant="outline" className={cn(
                        "text-[10px] capitalize",
                        a.outcome === "positive" ? "text-success-600 dark:text-success-500" :
                        a.outcome === "negative" ? "text-error-600 dark:text-error-500" : ""
                      )}>{a.outcome}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{a.description}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{a.actor}</span>
                    <span>·</span>
                    <span>{new Date(a.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Panel>
    </div>
  );
}

// ============ Commissions page ============
export function SalesCommissionsPage() {
  const commissionRate = 0.08;
  const repsWithCommissions = salesReps.map((r) => ({
    ...r,
    commission: Math.round(r.attained * commissionRate),
    accelerator: r.attainmentRate >= 1 ? Math.round((r.attained - r.quota) * 0.03) : 0,
  }));

  const totalCommission = repsWithCommissions.reduce((s, r) => s + r.commission + r.accelerator, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Commissions"
        description="Estimator for the current quarter. Base rate + accelerators for over-quota attainment."
        breadcrumb={["Nexus Pro", "Sales Ops", "Commissions"]}
        tone="brand"
        meta={[
          { label: "Base rate", value: `${(commissionRate * 100).toFixed(0)}%` },
          { label: "Accelerator", value: "+3% over quota" },
          { label: "Total est.", value: formatCurrency(totalCommission) },
        ]}
      />
      <Panel title="Estimated Q2 commissions" description="Sorted by total commission">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
                <th className="text-left p-3 font-semibold">Rep</th>
                <th className="text-right p-3 font-semibold">Attained</th>
                <th className="text-right p-3 font-semibold">Base (8%)</th>
                <th className="text-right p-3 font-semibold">Accelerator</th>
                <th className="text-right p-3 font-semibold">Total Est.</th>
              </tr>
            </thead>
            <tbody>
              {repsWithCommissions.sort((a, b) => (b.commission + b.accelerator) - (a.commission + a.accelerator)).map((rep) => (
                <tr key={rep.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">{rep.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800 dark:text-white">{rep.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{formatCompactCurrency(rep.attained)}</td>
                  <td className="p-3 text-right text-gray-600 dark:text-gray-400">{formatCurrency(rep.commission)}</td>
                  <td className="p-3 text-right">
                    {rep.accelerator > 0 ? (
                      <span className="font-semibold text-success-600 dark:text-success-500">+{formatCurrency(rep.accelerator)}</span>
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="p-3 text-right font-bold text-gray-800 dark:text-white">{formatCurrency(rep.commission + rep.accelerator)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold" colSpan={3}>Total estimated payout</td>
                <td className="p-3 text-right font-bold text-success-600 dark:text-success-500" colSpan={2}>{formatCurrency(totalCommission)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Panel>
    </div>
  );
}

// ============ Playbooks page ============
export function SalesPlaybooksPage() {
  const playbooks = [
    { title: "Discovery call framework", desc: "30-min discovery call template with qualification questions, pain-point mapping, and next-step alignment.", plays: 142, lastUpdated: "2026-06-22", category: "Discovery" },
    { title: "Multi-threading enterprise deals", desc: "How to expand from a single champion to 5+ stakeholders across legal, finance, and engineering.", plays: 88, lastUpdated: "2026-06-15", category: "Enterprise" },
    { title: "Price objection handling", desc: "Scripts for de-escalating price pushback and reframing value in terms of cost-of-inaction.", plays: 215, lastUpdated: "2026-06-30", category: "Objection" },
    { title: "Security review preparation", desc: "Pre-emptive security questionnaire responses, SOC2 evidence, and references for IT buyers.", plays: 64, lastUpdated: "2026-05-28", category: "Compliance" },
    { title: "Competitive battlecard: Vertex CRM", desc: "Win-rate against Vertex, key differentiators, and trap-setting questions for the buyer.", plays: 38, lastUpdated: "2026-06-10", category: "Competitive" },
    { title: "Closed-won handoff to CS", desc: "Smooth handoff from sales to customer success with context, risks, and success criteria.", plays: 52, lastUpdated: "2026-06-05", category: "Handoff" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Playbooks"
        description="Repeatable sales plays, battle cards, and discovery templates — curated by the team."
        breadcrumb={["Nexus Pro", "Sales Ops", "Playbooks"]}
        tone="brand"
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Playbook</Button>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playbooks.map((p) => (
          <div key={p.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-5 card-hover cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="outline" className="text-xs">{p.category}</Badge>
              <span className="text-xs text-gray-400">{p.plays} plays</span>
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">{p.title}</h3>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{p.desc}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between text-xs text-gray-400">
              <span>Updated {new Date(p.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              <span className="inline-flex items-center gap-1 text-brand-500 font-semibold">Open <ChevronRight className="h-3 w-3" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Reports page ============
export function SalesReportsPage() {
  const reports = [
    { name: "Q2 Pipeline Summary", schedule: "Weekly · Mondays 8am", lastRun: "2026-06-30 08:00", format: "PDF", recipients: 12 },
    { name: "Rep Performance Leaderboard", schedule: "Daily · 7am", lastRun: "2026-06-30 07:00", format: "CSV", recipients: 8 },
    { name: "Win/Loss Analysis", schedule: "Monthly · 1st", lastRun: "2026-06-01 09:00", format: "XLSX", recipients: 5 },
    { name: "Forecast Accuracy Tracker", schedule: "Weekly · Fridays 5pm", lastRun: "2026-06-27 17:00", format: "PDF", recipients: 6 },
    { name: "Territory Breakdown", schedule: "Monthly · 1st", lastRun: "2026-06-01 09:00", format: "PDF", recipients: 4 },
    { name: "Stalled Deals Alert", schedule: "Real-time trigger", lastRun: "2026-06-30 14:32", format: "Email", recipients: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Reports"
        description="Saved reports, scheduled exports, and one-off report builder."
        breadcrumb={["Nexus Pro", "Sales Ops", "Reports"]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><FileBarChart className="h-4 w-4" /> Report Builder</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Report</Button>
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.name} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                <FileBarChart className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-xs">{r.format}</Badge>
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">{r.name}</h3>
            <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <p><span className="font-medium">Schedule:</span> {r.schedule}</p>
              <p><span className="font-medium">Last run:</span> {r.lastRun}</p>
              <p><span className="font-medium">Recipients:</span> {r.recipients}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-8">Run now</Button>
              <Button variant="ghost" size="sm" className="h-8 px-2"><Download className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Import / Export pages ============
export function SalesImportPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Import"
        description="Bulk import leads, contacts, or accounts from CSV. Map columns and preview before commit."
        breadcrumb={["Nexus Pro", "Sales Ops", "Import"]}
        actions={<Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" /> Choose file</Button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Panel title="Upload CSV" description="Drag a file here or click to browse. Max 10MB.">
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-12 text-center hover:border-brand-500/40 transition cursor-pointer">
              <Upload className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop a CSV file here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Supports .csv, .xlsx — max 10MB</p>
              <Button size="sm" className="mt-4">Choose file</Button>
            </div>
          </Panel>
        </div>
        <Panel title="Recent imports" description="Last 5">
          <div className="space-y-2">
            {[
              { name: "leads-q2-import.csv", date: "2026-06-28", rows: 248, status: "success" },
              { name: "accounts-bulk.xlsx", date: "2026-06-22", rows: 42, status: "success" },
              { name: "contacts-april.csv", date: "2026-04-15", rows: 184, status: "partial" },
            ].map((imp) => (
              <div key={imp.name} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-xs">
                <p className="font-medium text-gray-800 dark:text-white truncate">{imp.name}</p>
                <div className="mt-1 flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span>{imp.rows} rows · {imp.date}</span>
                  <span className={cn(
                    "font-semibold",
                    imp.status === "success" ? "text-success-600 dark:text-success-500" : "text-warning-600 dark:text-warning-500"
                  )}>{imp.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function SalesExportPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Export"
        description="One-click exports of deals, leads, accounts, activities, and pipeline snapshots."
        breadcrumb={["Nexus Pro", "Sales Ops", "Export"]}
        tone="brand"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Deals", desc: "All open + closed deals with weighted values and risk scores.", rows: deals.length, icon: Briefcase },
          { name: "Leads", desc: "All leads with source, score, and qualification status.", rows: leads.length, icon: Users },
          { name: "Accounts", desc: "All accounts with tier, region, and pipeline.", rows: accounts.length, icon: Building2 },
          { name: "Contacts", desc: "All contacts with title, account, and last contacted.", rows: contacts.length, icon: Users },
          { name: "Activities", desc: "All sales activities with type and outcome.", rows: activities.length, icon: Activity },
          { name: "Pipeline snapshot", desc: "Stage-by-stage pipeline summary.", rows: pipelineStages.length, icon: Target },
        ].map((exp) => {
          const Icon = exp.icon;
          return (
            <Panel key={exp.name} title={exp.name} description={`${exp.rows} rows`}>
              <p className="text-sm text-gray-500 dark:text-gray-400">{exp.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 flex-1" onClick={() => exportToCSV([], `nexus-${exp.name.toLowerCase()}`)}>
                  <Download className="h-3.5 w-3.5" /> CSV
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1" onClick={() => exportToJSON([], `nexus-${exp.name.toLowerCase()}`)}>
                  <Download className="h-3.5 w-3.5" /> JSON
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

// ============ Revenue page ============
export function SalesRevenuePage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Revenue"
        description="Closed-won revenue by month, segment, and territory."
        breadcrumb={["Nexus Pro", "Sales Ops", "Revenue"]}
        tone="brand"
        meta={[
          { label: "YTD", value: formatCompactCurrency(15_280_000) },
          { label: "Q2", value: formatCompactCurrency(4_180_000) },
          { label: "MoM", value: "+18.2%" },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock label="Revenue (YTD)" value={formatCompactCurrency(15_280_000)} delta={0.182} sublabel="vs last year" icon={DollarSign} variant="gradient" tone="success" />
        <StatBlock label="Avg Deal Size" value={formatCompactCurrency(88_250)} delta={0.063} icon={Briefcase} variant="card" />
        <StatBlock label="Largest Deal" value={formatCompactCurrency(612_000)} icon={Crown} variant="card" />
        <StatBlock label="Repeat Revenue" value="34%" delta={0.042} icon={TrendingUp} variant="card" />
      </div>
      <ChartCard
        title="Monthly revenue"
        description="Closed-won · last 12 months"
        trend={{ value: 0.182, label: "MoM" }}
      >
        <BarSeriesChart
          data={salesOverview.monthly.map((m) => ({ name: m.name, value: m.closedWon }))}
          series={[{ key: "value", label: "Revenue", color: "#465fff" }]}
          xKey="name"
          currency
          height={320}
        />
      </ChartCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue by Territory" description="Closed-won">
          <DonutChart
            data={salesOverview.territories.map((t, i) => ({
              name: t.name,
              value: t.closed,
              color: ["#465fff", "#0ba5ec", "#12b76a", "#f79009", "#7a5af8", "#ee46bc", "#f04438", "#039855"][i],
            }))}
            centerLabel="Total"
            centerValue={formatCompactCurrency(salesOverview.territories.reduce((s, t) => s + t.closed, 0))}
            height={280}
          />
        </ChartCard>
        <ChartCard title="Win / Loss reasons" description="Last 90 days">
          <BarSeriesChart
            data={salesOverview.winLossReasons.map((r) => ({ name: r.reason, won: r.won, lost: r.lost }))}
            series={[
              { key: "won", label: "Won", color: "#12b76a" },
              { key: "lost", label: "Lost", color: "#f04438" },
            ]}
            xKey="name"
            height={280}
            stacked
          />
        </ChartCard>
      </div>
    </div>
  );
}
