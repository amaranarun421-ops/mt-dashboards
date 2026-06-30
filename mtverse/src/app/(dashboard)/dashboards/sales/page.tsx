"use client";

import * as React from "react";
import {
  TrendingUp, Target, Clock, Trophy, Download, Plus, Filter, Medal,
  Crown, DollarSign, ArrowUpRight, Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, BarTrend, RadialProgress, Sparkline } from "@/components/charts";

const revenueData = [
  { week: "W1", closed: 285, forecast: 310 },
  { week: "W2", closed: 320, forecast: 340 },
  { week: "W3", closed: 298, forecast: 330 },
  { week: "W4", closed: 412, forecast: 380 },
  { week: "W5", closed: 378, forecast: 390 },
  { week: "W6", closed: 445, forecast: 420 },
  { week: "W7", closed: 498, forecast: 460 },
  { week: "W8", closed: 532, forecast: 500 },
  { week: "W9", closed: 568, forecast: 540 },
  { week: "W10", closed: 612, forecast: 580 },
  { week: "W11", closed: 684, forecast: 620 },
  { week: "W12", closed: 742, forecast: 680 },
];

const stageData = [
  { stage: "Lead", deals: 248 },
  { stage: "Qualified", deals: 184 },
  { stage: "Proposal", deals: 96 },
  { stage: "Negotiation", deals: 52 },
  { stage: "Closed-Won", deals: 38 },
  { stage: "Closed-Lost", deals: 24 },
];

const topDeals = [
  { name: "Enterprise Platform Renewal", account: "Globex Inc", value: 480000, stage: "Negotiation", owner: "Sarah Chen", closeDate: "Mar 28", prob: 75 },
  { name: "Cloud Migration Suite", account: "Initech", value: 320000, stage: "Proposal", owner: "Marcus Lee", closeDate: "Apr 04", prob: 60 },
  { name: "Analytics Platform Expansion", account: "Umbrella Co", value: 268000, stage: "Qualified", owner: "Priya Patel", closeDate: "Apr 18", prob: 40 },
  { name: "Security Add-on Bundle", account: "Stark Industries", value: 184000, stage: "Negotiation", owner: "David Kim", closeDate: "Mar 21", prob: 80 },
  { name: "Annual License Upgrade", account: "Wayne Ent", value: 142000, stage: "Closed-Won", owner: "Elena Rossi", closeDate: "Mar 12", prob: 100 },
  { name: "Premium Support Plan", account: "Hooli", value: 98000, stage: "Proposal", owner: "James Wright", closeDate: "Apr 11", prob: 55 },
  { name: "Data Pipeline License", account: "Soylent Corp", value: 76400, stage: "Lead", owner: "Aisha Khan", closeDate: "May 02", prob: 25 },
  { name: "Identity Suite Bundle", account: "Cyberdyne", value: 64200, stage: "Negotiation", owner: "Noah Bennett", closeDate: "Apr 25", prob: 68 },
];

const leaderboard = [
  { name: "Sarah Chen", initials: "SC", deals: 18, revenue: 1240000, attainment: 142, winRate: 32, quota: 875000, gradient: "from-amber-500 to-orange-600" },
  { name: "Marcus Lee", initials: "ML", deals: 14, revenue: 986000, attainment: 128, winRate: 29, quota: 770000, gradient: "from-slate-400 to-slate-600" },
  { name: "Priya Patel", initials: "PP", deals: 12, revenue: 742000, attainment: 112, winRate: 27, quota: 660000, gradient: "from-orange-700 to-amber-800" },
  { name: "David Kim", initials: "DK", deals: 11, revenue: 684000, attainment: 98, winRate: 26, quota: 698000, gradient: "from-chart-1 to-chart-2" },
  { name: "Elena Rossi", initials: "ER", deals: 9, revenue: 528000, attainment: 88, winRate: 24, quota: 600000, gradient: "from-chart-2 to-chart-3" },
  { name: "James Wright", initials: "JW", deals: 8, revenue: 412000, attainment: 76, winRate: 22, quota: 540000, gradient: "from-chart-3 to-chart-4" },
  { name: "Aisha Khan", initials: "AK", deals: 7, revenue: 368000, attainment: 68, winRate: 21, quota: 540000, gradient: "from-chart-4 to-chart-5" },
  { name: "Noah Bennett", initials: "NB", deals: 6, revenue: 294000, attainment: 54, winRate: 19, quota: 540000, gradient: "from-chart-5 to-chart-6" },
];

const stageBadge: Record<string, string> = {
  "Lead": "bg-muted text-muted-foreground border-border",
  "Qualified": "bg-info/10 text-info border-info/20",
  "Proposal": "bg-warning/10 text-warning border-warning/20",
  "Negotiation": "bg-primary/10 text-primary border-primary/20",
  "Closed-Won": "bg-success/10 text-success border-success/20",
  "Closed-Lost": "bg-destructive/10 text-destructive border-destructive/20",
};

const keyMetrics = [
  { label: "Avg Deal Size", value: "$184K", delta: "+6.4%", color: "var(--chart-1)" },
  { label: "Sales Cycle", value: "42 days", delta: "-3 days", color: "var(--chart-2)" },
  { label: "Pipeline Coverage", value: "3.2x", delta: "+0.4x", color: "var(--chart-3)" },
  { label: "Win Rate", value: "28.4%", delta: "+2.1%", color: "var(--chart-4)" },
];

function rankBadge(index: number) {
  if (index === 0) {
    return {
      ring: "ring-amber-400/60 bg-gradient-to-br from-amber-400/20 to-orange-500/20",
      icon: <Crown className="size-3.5 text-amber-500" />,
      label: "text-amber-600 dark:text-amber-400",
    };
  }
  if (index === 1) {
    return {
      ring: "ring-slate-400/60 bg-gradient-to-br from-slate-300/20 to-slate-500/20",
      icon: <Medal className="size-3.5 text-slate-400" />,
      label: "text-slate-500 dark:text-slate-300",
    };
  }
  if (index === 2) {
    return {
      ring: "ring-orange-600/60 bg-gradient-to-br from-orange-600/20 to-amber-700/20",
      icon: <Medal className="size-3.5 text-orange-700 dark:text-orange-500" />,
      label: "text-orange-700 dark:text-orange-400",
    };
  }
  return {
    ring: "ring-border bg-muted",
    icon: null,
    label: "text-muted-foreground",
  };
}

export default function SalesDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Dashboard"
        description="Competitive leaderboard, pipeline velocity, and the deals shaping this quarter."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Sales" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Deal</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Pipeline"
          value="$4.2M"
          delta={18.4}
          deltaLabel="vs last month"
          icon={<TrendingUp className="size-5" />}
          spark={<Sparkline data={revenueData.map((d) => ({ value: d.closed }))} />}
        />
        <StatCard
          label="Quota Attainment"
          value="87%"
          delta={12}
          deltaLabel="vs last month"
          icon={<Target className="size-5" />}
          spark={<Sparkline data={revenueData.map((d) => ({ value: d.closed * 0.6 }))} color="var(--chart-2)" />}
        />
        <StatCard
          label="Avg Deal Cycle"
          value="42 days"
          delta={-3}
          deltaLabel="vs last month"
          icon={<Clock className="size-5" />}
          spark={<Sparkline data={[{ value: 48 }, { value: 46 }, { value: 45 }, { value: 44 }, { value: 43 }, { value: 42 }]} color="var(--chart-3)" type="bar" />}
        />
        <StatCard
          label="Win Rate"
          value="28.4%"
          delta={2.1}
          deltaLabel="vs last month"
          icon={<Trophy className="size-5" />}
          spark={<Sparkline data={[{ value: 24.1 }, { value: 25.8 }, { value: 26.4 }, { value: 27.2 }, { value: 27.9 }, { value: 28.4 }]} color="var(--chart-4)" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Sales Leaderboard"
          description="Top 8 reps ranked by revenue · Q1 podium"
          className="lg:col-span-7"
          actions={<CardMenuButton items={[{ label: "View full board" }, { label: "Export" }]} />}
        >
          <div className="space-y-2.5">
            {leaderboard.map((r, i) => {
              const rb = rankBadge(i);
              return (
                <div
                  key={r.name}
                  className={
                    "relative flex items-center gap-3 rounded-xl border p-3 transition-all hover:shadow-sm " +
                    (i < 3 ? "border-border/80 bg-gradient-to-r from-muted/60 to-transparent" : "border-border bg-card/50")
                  }
                >
                  <div className={"flex size-9 shrink-0 items-center justify-center rounded-full ring-2 " + rb.ring}>
                    <span className={"text-sm font-bold " + rb.label}>{i + 1}</span>
                  </div>
                  <Avatar className="size-10 shrink-0 ring-2 ring-background">
                    <AvatarFallback className={"text-xs font-semibold bg-gradient-to-br text-white " + r.gradient}>{r.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{r.name}</p>
                      {rb.icon}
                      {i === 0 && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 px-1.5 py-0 text-[10px]">
                          <Flame className="size-3" /> TOP
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-chart-1 to-chart-2"
                          style={{ width: `${Math.min(r.attainment, 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{r.deals} deals</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end shrink-0 w-24">
                    <span className="text-sm font-bold tabular-nums">${(r.revenue / 1000).toFixed(0)}K</span>
                    <span className="text-[10px] text-muted-foreground">revenue</span>
                  </div>
                  <div className="hidden md:flex flex-col items-end shrink-0 w-16">
                    <Badge variant="outline" className="bg-info/10 text-info border-info/20 px-1.5 py-0 text-[10px]">{r.winRate}%</Badge>
                    <span className="text-[10px] text-muted-foreground mt-0.5">win rate</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0 w-14">
                    <span className={
                      "text-sm font-bold tabular-nums " +
                      (r.attainment >= 100 ? "text-success" : r.attainment >= 80 ? "text-info" : "text-warning")
                    }>{r.attainment}%</span>
                    <span className="text-[10px] text-muted-foreground">quota</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Trophy className="size-3.5 text-amber-500" /> 5 reps above 80% attainment</span>
            <span className="flex items-center gap-1.5"><ArrowUpRight className="size-3.5 text-success" /> Team revenue $5.24M</span>
          </div>
        </SectionCard>

        <SectionCard
          title="Quarterly Quota"
          description="Team attainment progress"
          className="lg:col-span-5"
          actions={<CardMenuButton items={[{ label: "Configure" }]} />}
        >
          <RadialProgress value={87} label="of $4.8M target" color="var(--chart-1)" height={180} />
          <div className="mt-2 pt-3 border-t border-border space-y-2">
            {[
              { label: "Closed-Won", value: "$4.18M", pct: "87%", color: "var(--success)" },
              { label: "In Pipeline", value: "$2.94M", pct: "61%", color: "var(--info)" },
              { label: "Best Case", value: "$1.42M", pct: "30%", color: "var(--warning)" },
            ].map((g) => (
              <div key={g.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: g.color }} />
                  {g.label}
                </span>
                <span className="font-semibold tabular-nums">{g.value} <span className="text-muted-foreground font-normal">· {g.pct}</span></span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {keyMetrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{m.label}</span>
                  <span className="size-2 rounded-full" style={{ background: m.color }} />
                </div>
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-[10px] text-success">{m.delta}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Closed-Won vs Forecast"
          description="Trailing 12 weeks revenue"
          className="lg:col-span-7"
          actions={<CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />}
        >
          <AreaTrend
            data={revenueData}
            xKey="week"
            yKeys={[
              { key: "closed", name: "Closed-Won", color: "var(--chart-1)" },
              { key: "forecast", name: "Forecast", color: "var(--chart-2)" },
            ]}
            height={260}
          />
        </SectionCard>

        <SectionCard
          title="Deals by Stage"
          description="Pipeline funnel distribution"
          className="lg:col-span-5"
          actions={<CardMenuButton items={[{ label: "View funnel" }]} />}
        >
          <BarTrend
            data={stageData}
            xKey="stage"
            yKeys={[{ key: "deals", name: "Deals", color: "var(--chart-1)" }]}
            height={260}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Deal Flow Timeline"
        description="Open opportunities ordered by close date"
        className="lg:col-span-12"
        noBodyPadding
        actions={<Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Deal</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Close Date</TableHead>
              <TableHead className="pr-5 text-right">Probability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDeals.map((d) => (
              <TableRow key={d.name} className="hover:bg-accent/50">
                <TableCell className="pl-5 font-medium text-sm">{d.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{d.account}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">${(d.value / 1000).toFixed(0)}K</TableCell>
                <TableCell>
                  <Badge variant="outline" className={stageBadge[d.stage]}>{d.stage}</Badge>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{d.owner.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{d.owner}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{d.closeDate}</TableCell>
                <TableCell className="pr-5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                      <div
                        className={
                          d.prob >= 80 ? "h-full bg-success" :
                            d.prob >= 50 ? "h-full bg-info" : "h-full bg-warning"
                        }
                        style={{ width: `${d.prob}%` }}
                      />
                    </div>
                    <span className={
                      d.prob >= 80 ? "text-success text-xs font-semibold tabular-nums w-9 text-right" :
                        d.prob >= 50 ? "text-info text-xs font-semibold tabular-nums w-9 text-right" :
                          "text-muted-foreground text-xs font-semibold tabular-nums w-9 text-right"
                    }>{d.prob}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
