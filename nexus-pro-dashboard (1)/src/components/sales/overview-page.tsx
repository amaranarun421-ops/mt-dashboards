"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, DollarSign, Target, Briefcase, Users, Zap,
  AlertTriangle, ArrowUpRight, ArrowRight, Sparkles, Activity, Clock,
  Crown, ChevronRight, Plus, Filter, Download,
} from "lucide-react";
import {
  AreaSeriesChart, BarSeriesChart, DonutChart, FunnelChart, ChartCard,
} from "@/components/charts";
import { PageHero, StatBlock, SectionHeading, Panel, Callout, QuickLinkCard } from "@/components/common/page-blocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  salesReps, deals, leads, accounts, activities, salesOverview, pipelineStages,
} from "@/data/sales";
import { formatCurrency, formatCompactCurrency, formatCompactNumber, formatPercent } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";

const STAGE_COLORS: Record<string, string> = {
  prospecting: "#94a3b8",
  qualification: "#0ba5ec",
  proposal: "#7a5af8",
  negotiation: "#f79009",
  "closed-won": "#12b76a",
  "closed-lost": "#f04438",
};

export function SalesOverviewPage() {
  const k = salesOverview.kpis;

  const topReps = [...salesReps].sort((a, b) => b.attainmentRate - a.attainmentRate).slice(0, 5);
  const stalledDeals = deals
    .filter((d) => d.riskScore > 40)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  const nextBestActions = [
    { deal: deals[2], action: "Send final pricing — verbal commit received, time to close", priority: "high" },
    { deal: deals[6], action: "Schedule security review for compliance questionnaire", priority: "high" },
    { deal: deals[4], action: "Re-engage champion — last activity 14 days ago", priority: "medium" },
    { deal: deals[1], action: "Discovery call needed — competitor evaluating in parallel", priority: "medium" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title="Sales Overview"
        description="Pipeline value, weighted forecast, quota attainment, and rep performance — all in one view."
        breadcrumb={["Nexus Pro", "Sales Ops", "Overview"]}
        tone="brand"
        meta={[
          { label: "Period", value: "Q2 2026" },
          { label: "Currency", value: "USD" },
          { label: "Last sync", value: "2m ago" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filters</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="gap-1.5" asChild>
              <Link href="/sales/deals"><Plus className="h-4 w-4" /> New Deal</Link>
            </Button>
          </>
        }
      />

      {/* ====== KPI grid — gradient + card mix for variety ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock
          label="Pipeline Value"
          value={formatCurrency(k.pipelineValue)}
          delta={k.pipelineValueDelta}
          sublabel="vs last quarter"
          icon={DollarSign}
          variant="gradient"
          tone="brand"
          spark={[820, 940, 1080, 1240, 1180, 1320, 1480, 1620]}
        />
        <StatBlock
          label="Weighted Forecast"
          value={formatCurrency(k.weightedForecast)}
          delta={k.weightedForecastDelta}
          sublabel="vs last quarter"
          icon={TrendingUp}
          variant="gradient"
          tone="success"
          spark={[420, 480, 540, 580, 620, 680, 720, 786]}
        />
        <StatBlock
          label="Closed Won (MTD)"
          value={formatCurrency(k.closedWonMTD)}
          delta={k.closedWonMTDDelta}
          sublabel="vs last month"
          icon={Target}
          variant="card"
        />
        <StatBlock
          label="Quota Attainment"
          value={formatPercent(k.quotaAttainment, 1)}
          delta={k.quotaAttainmentDelta}
          sublabel="team-wide"
          icon={Crown}
          variant="card"
        />
      </div>

      {/* ====== Secondary KPIs — compact variant ====== */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatBlock label="Avg Deal Size" value={formatCompactCurrency(k.avgDealSize)} delta={k.avgDealSizeDelta} icon={Briefcase} variant="compact" />
        <StatBlock label="Sales Velocity" value={`$${formatCompactNumber(k.salesVelocity)}/day`} delta={k.salesVelocityDelta} icon={Zap} variant="compact" />
        <StatBlock label="Win Rate" value={formatPercent(k.winRate, 1)} delta={k.winRateDelta} icon={Target} variant="compact" />
        <StatBlock label="Deal Aging" value={`${k.dealAging}d`} delta={k.dealAgingDelta} icon={Clock} variant="compact" />
        <StatBlock label="Open Deals" value={deals.length.toString()} icon={Briefcase} variant="compact" />
        <StatBlock label="Active Leads" value={leads.filter((l) => l.status !== "converted" && l.status !== "unqualified").length.toString()} icon={Users} variant="compact" />
      </div>

      {/* ====== Main charts row ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Closed-Won vs Forecast vs Quota"
          description="Trailing 12 months · USD"
          className="lg:col-span-2"
          trend={{ value: k.closedWonMTDDelta, label: "MoM" }}
          legend={[
            { label: "Closed Won", color: "#465fff" },
            { label: "Forecast", color: "#7a5af8" },
            { label: "Quota", color: "#98a2b3" },
          ]}
        >
          <AreaSeriesChart
            data={salesOverview.monthly}
            series={[
              { key: "closedWon", label: "Closed Won", color: "#465fff" },
              { key: "forecast", label: "Forecast", color: "#7a5af8" },
              { key: "quota", label: "Quota", color: "#98a2b3" },
            ]}
            xKey="name"
            currency
            height={300}
          />
        </ChartCard>

        <ChartCard
          title="Pipeline by Stage"
          description="Weighted value funnel"
        >
          <DonutChart
            data={pipelineStages.filter((s) => s.id !== "closed-lost").map((s) => ({
              name: s.label,
              value: s.weightedValue,
              color: STAGE_COLORS[s.id],
            }))}
            centerLabel="Weighted"
            centerValue={formatCompactCurrency(salesOverview.kpis.weightedForecast)}
            height={260}
          />
        </ChartCard>
      </div>

      {/* ====== Funnel + Lead Sources ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Pipeline Funnel"
          description="Stage-by-stage conversion"
          fullscreen={false}
        >
          <FunnelChart data={salesOverview.funnel.map((f) => ({ stage: f.stage, value: f.value, pct: f.conversionRate * 100 }))} height={280} color="#465fff" />
        </ChartCard>

        <ChartCard
          title="Lead Source Attribution"
          description="Pipeline value by source · last 90 days"
          fullscreen={false}
        >
          <BarSeriesChart
            data={salesOverview.leadSources.map((s) => ({ name: s.source, value: s.value }))}
            series={[{ key: "value", label: "Pipeline", color: "#465fff" }]}
            xKey="name"
            currency
            horizontal
            height={280}
          />
        </ChartCard>
      </div>

      {/* ====== Rep leaderboard + Next-best-action ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leaderboard */}
        <Panel
          title="Rep Leaderboard"
          description="By quota attainment"
          className="lg:col-span-2"
          action={<Button variant="ghost" size="sm" asChild className="gap-1"><Link href="/sales/team-performance">View all <ArrowRight className="h-3 w-3" /></Link></Button>}
        >
          <div className="space-y-2">
            {topReps.map((rep, i) => (
              <Link
                key={rep.id}
                href={`/sales/rep/${rep.id}`}
                className="flex items-center gap-3 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02] p-3 transition group"
              >
                <div className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                  i === 0 ? "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400" :
                  i === 1 ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300" :
                  i === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" :
                  "bg-gray-100 text-gray-500 dark:bg-gray-800"
                )}>
                  {i + 1}
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                    {rep.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{rep.name}</p>
                    <span className="text-xs text-gray-400">· {rep.team}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{rep.region} · {rep.deals} deals · {formatPercent(rep.winRate, 0)} win rate</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{formatCompactCurrency(rep.attained)}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-20 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          rep.attainmentRate >= 1 ? "bg-success-500" : rep.attainmentRate >= 0.85 ? "bg-brand-500" : "bg-warning-500"
                        )}
                        style={{ width: `${Math.min(rep.attainmentRate * 100, 100)}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-xs font-semibold",
                      rep.attainmentRate >= 1 ? "text-success-600 dark:text-success-500" :
                      rep.attainmentRate >= 0.85 ? "text-brand-600 dark:text-brand-400" :
                      "text-warning-600 dark:text-warning-500"
                    )}>
                      {formatPercent(rep.attainmentRate, 0)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        {/* Next-best-action panel */}
        <Panel
          title={
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-500" /> Next Best Action
            </span>
          }
          description="AI-style recommendations for stalled deals"
        >
          <div className="space-y-3">
            {nextBestActions.map((nba, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border p-3 transition cursor-pointer hover:shadow-sm",
                  nba.priority === "high"
                    ? "border-error-200 bg-error-50/30 dark:border-error-500/30 dark:bg-error-500/[0.06]"
                    : "border-warning-200 bg-warning-50/30 dark:border-warning-500/30 dark:bg-warning-500/[0.06]"
                )}
              >
                <div className="flex items-start gap-2">
                  <div className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md shrink-0",
                    nba.priority === "high" ? "bg-error-500/15 text-error-600 dark:text-error-500" : "bg-warning-500/15 text-warning-600 dark:text-warning-500"
                  )}>
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{nba.deal.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{nba.action}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] capitalize">{nba.deal.stage}</Badge>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatCompactCurrency(nba.deal.value)}</span>
                      <Link href={`/sales/deals/${nba.deal.id}`} className="ml-auto text-[10px] font-semibold text-brand-500 hover:underline inline-flex items-center gap-0.5">
                        Open <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ====== Recent activity + Stalled deals ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel
          title="Recent Activity"
          description="Latest sales events across the team"
          action={<Button variant="ghost" size="sm" asChild className="gap-1"><Link href="/sales/activities">All activity <ArrowRight className="h-3 w-3" /></Link></Button>}
        >
          <ol className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200 dark:before:bg-gray-800">
            {activities.slice(0, 5).map((a) => {
              const iconMap: Record<string, { icon: typeof Activity; color: string }> = {
                call: { icon: Activity, color: "bg-blue-light-500/15 text-blue-light-600 dark:text-blue-light-400" },
                email: { icon: Activity, color: "bg-brand-500/15 text-brand-500" },
                meeting: { icon: Users, color: "bg-success-500/15 text-success-600 dark:text-success-500" },
                deal: { icon: Briefcase, color: "bg-purple-500/15 text-purple-500" },
                note: { icon: Activity, color: "bg-warning-500/15 text-warning-600 dark:text-warning-500" },
                task: { icon: Activity, color: "bg-gray-500/15 text-gray-600 dark:text-gray-400" },
              };
              const { icon: Icon, color } = iconMap[a.type] ?? iconMap.task;
              return (
                <li key={a.id} className="relative flex gap-3 pl-0">
                  <div className={cn("relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900", color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{a.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.description}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span className="font-medium">{a.actor}</span>
                      <span>·</span>
                      <span>{new Date(a.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Panel>

        <Panel
          title="Stalled Deals"
          description="High-risk deals that need attention"
          action={<Button variant="ghost" size="sm" asChild className="gap-1"><Link href="/sales/deals">All deals <ArrowRight className="h-3 w-3" /></Link></Button>}
        >
          <div className="space-y-2">
            {stalledDeals.map((deal) => (
              <Link
                key={deal.id}
                href={`/sales/deals/${deal.id}`}
                className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
              >
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                    deal.riskScore >= 60 ? "bg-error-500/15 text-error-600 dark:text-error-500" :
                    deal.riskScore >= 40 ? "bg-warning-500/15 text-warning-600 dark:text-warning-500" :
                    "bg-success-500/15 text-success-600 dark:text-success-500"
                  )}>
                    {deal.riskScore}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">risk</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{deal.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {deal.account} · {deal.owner} · {deal.age}d in pipeline
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{formatCompactCurrency(deal.value)}</p>
                  <p className="text-xs text-gray-400">{deal.stage}</p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* ====== Quick links to other Sales Ops pages ====== */}
      <div>
        <SectionHeading
          title="Explore Sales Ops"
          description="Jump to deeper views — pipeline, deals, accounts, territories, playbooks, and more."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickLinkCard title="Pipeline" description="Stage-by-stage board with weighted values." href="/sales/pipeline" icon={Briefcase} />
          <QuickLinkCard title="Forecasting" description="Weighted forecast, accuracy, and scenario planning." href="/sales/forecasting" icon={TrendingUp} />
          <QuickLinkCard title="Quota Attainment" description="Rep-by-rep quota tracking and variance." href="/sales/quota" icon={Target} />
          <QuickLinkCard title="Team Performance" description="Leaderboard, win rates, and activity metrics." href="/sales/team-performance" icon={Crown} />
          <QuickLinkCard title="Territories" description="Geo performance with attainment per region." href="/sales/territories" icon={Activity} />
          <QuickLinkCard title="Commissions" description="Estimator and payout schedule." href="/sales/commissions" icon={DollarSign} />
          <QuickLinkCard title="Playbooks" description="Repeatable sales plays and battle cards." href="/sales/playbooks" icon={Briefcase} />
          <QuickLinkCard title="Reports" description="Saved reports + export center." href="/sales/reports" icon={Download} />
        </div>
      </div>
    </div>
  );
}
