"use client";

import * as React from "react";
import {
  Users, Handshake, Trophy, DollarSign, Plus, Download, Filter,
  Mail, Phone, CalendarDays, Target, TrendingUp, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import {
  AreaTrend, DonutChart, RadialProgress, Sparkline,
} from "@/components/charts";

const customerTrend = [
  { month: "Jan", new: 412, churned: 68 },
  { month: "Feb", new: 468, churned: 72 },
  { month: "Mar", new: 524, churned: 81 },
  { month: "Apr", new: 489, churned: 76 },
  { month: "May", new: 562, churned: 84 },
  { month: "Jun", new: 648, churned: 92 },
  { month: "Jul", new: 712, churned: 98 },
  { month: "Aug", new: 768, churned: 104 },
  { month: "Sep", new: 684, churned: 96 },
  { month: "Oct", new: 742, churned: 102 },
  { month: "Nov", new: 824, churned: 108 },
  { month: "Dec", new: 912, churned: 114 },
];

const pipelineStages = [
  { stage: "Lead", count: 142, value: 1820000, color: "var(--chart-1)" },
  { stage: "Qualified", count: 98, value: 1240000, color: "var(--chart-2)" },
  { stage: "Proposal", count: 64, value: 820000, color: "var(--chart-3)" },
  { stage: "Negotiation", count: 38, value: 487000, color: "var(--chart-4)" },
  { stage: "Closed-Won", count: 28, value: 359000, color: "var(--chart-5)" },
];

const leadSources = [
  { name: "Referral", value: 34, color: "var(--chart-1)" },
  { name: "Website", value: 26, color: "var(--chart-2)" },
  { name: "Cold Outreach", value: 18, color: "var(--chart-3)" },
  { name: "Social", value: 14, color: "var(--chart-4)" },
  { name: "Events", value: 8, color: "var(--chart-5)" },
];

const salesReps = [
  { name: "Sarah Chen", deals: 28, revenue: 384200, winRate: 34.2, target: 92 },
  { name: "Marcus Webb", deals: 24, revenue: 312800, winRate: 31.8, target: 78 },
  { name: "Priya Patel", deals: 22, revenue: 286400, winRate: 30.1, target: 84 },
  { name: "James O'Connor", deals: 19, revenue: 248600, winRate: 28.6, target: 71 },
  { name: "Elena Rodriguez", deals: 17, revenue: 214200, winRate: 27.4, target: 65 },
  { name: "David Kim", deals: 14, revenue: 182400, winRate: 25.8, target: 58 },
];

const upcomingActivities = [
  { title: "Follow-up call with Acme Corp", time: "Today, 2:30 PM", type: "Call", icon: <Phone className="size-3.5" /> },
  { title: "Send proposal to Globex Inc", time: "Today, 4:00 PM", type: "Email", icon: <Mail className="size-3.5" /> },
  { title: "Demo session with Initech", time: "Tomorrow, 10:00 AM", type: "Meeting", icon: <CalendarDays className="size-3.5" /> },
  { title: "Quarterly review with Stark", time: "Tomorrow, 3:00 PM", type: "Meeting", icon: <CalendarDays className="size-3.5" /> },
];

const totalPipelineValue = pipelineStages.reduce((a, s) => a + s.value, 0);

export default function CRMDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="CRM Dashboard"
        description="Monitor customers, deals pipeline, sales performance, and revenue growth."
        breadcrumbs={[{ label: "Dashboards" }, { label: "CRM" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Deal</Button>
          </>
        }
      />

      {/* Compact stat row — h-20 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "8,247", delta: 6.8, icon: <Users className="size-4" />, spark: customerTrend.map((d) => ({ value: d.new })), color: "var(--chart-1)" },
          { label: "Active Deals", value: "342", delta: 14.2, icon: <Handshake className="size-4" />, spark: [{value:280},{value:298},{value:312},{value:324},{value:338},{value:342}], color: "var(--chart-2)" },
          { label: "Win Rate", value: "28.4%", delta: 2.1, icon: <Trophy className="size-4" />, spark: [{value:24.2},{value:25.1},{value:26.3},{value:27.0},{value:27.8},{value:28.4}], color: "var(--chart-3)" },
          { label: "Avg Deal Size", value: "$12,840", delta: 8.6, icon: <DollarSign className="size-4" />, spark: [{value:10800},{value:11200},{value:11600},{value:12100},{value:12400},{value:12840}], color: "var(--chart-4)" },
        ].map((s) => (
          <div key={s.label} className="h-20 flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex size-10 items-center justify-center rounded-lg shrink-0" style={{ background: `color-mix(in oklab, ${s.color} 14%, transparent)`, color: s.color }}>
              {s.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold leading-tight tabular-nums">{s.value}</p>
                <span className="text-[10px] text-success font-medium">+{s.delta}%</span>
              </div>
            </div>
            <div className="w-14 h-8 shrink-0">
              <Sparkline data={s.spark} color={s.color} height={32} />
            </div>
          </div>
        ))}
      </div>

      {/* PIPELINE SWIMLANE — hero with COLOR-CODED stage headers */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Sales Pipeline</h3>
            <p className="text-xs text-muted-foreground">Deals progressing through each stage of the funnel</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs"><Filter className="size-3.5 mr-1" /> Owner</Button>
            <CardMenuButton items={[{ label: "Pipeline view" }, { label: "Export" }]} />
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
            {pipelineStages.map((stage, i) => {
              const pct = (stage.value / totalPipelineValue) * 100;
              return (
                <React.Fragment key={stage.stage}>
                  <div className="flex-1 min-w-[170px] rounded-xl border border-border overflow-hidden bg-card">
                    {/* Color-coded stage header with tinted bg */}
                    <div
                      className="px-4 py-3 border-b border-border"
                      style={{
                        background: `color-mix(in oklab, ${stage.color} 16%, transparent)`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: stage.color }}>
                          <span className="size-1.5 rounded-full" style={{ background: stage.color }} />
                          {stage.stage}
                        </span>
                        <Badge variant="outline" className="font-mono text-[10px] bg-card/80" style={{ color: stage.color, borderColor: `color-mix(in oklab, ${stage.color} 30%, transparent)` }}>{stage.count} deals</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-2xl font-bold leading-tight tabular-nums">${(stage.value / 1000000).toFixed(2)}M</p>
                      <p className="text-[10px] text-muted-foreground">Total value</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">% of pipeline</span>
                          <span className="text-[10px] font-semibold tabular-nums">{pct.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: stage.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < pipelineStages.length - 1 && (
                    <div className="flex items-center justify-center px-1 self-center shrink-0">
                      <ChevronRight className="size-5 text-muted-foreground/60" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Total Pipeline: <span className="font-semibold text-foreground tabular-nums">${(totalPipelineValue / 1000000).toFixed(2)}M</span></span>
              <span className="text-muted-foreground">Weighted Forecast: <span className="font-semibold text-success tabular-nums">$2.41M</span></span>
            </div>
            <span className="flex items-center gap-1.5 text-muted-foreground"><Target className="size-3.5" /> Q4 target: $4.2M · 76% complete</span>
          </div>
        </div>
      </div>

      {/* 2-column: Lead Sources Donut + New vs Churned Area chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Lead Sources</h3>
              <p className="text-xs text-muted-foreground">Where qualified leads come from</p>
            </div>
            <CardMenuButton items={[{ label: "View all" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={leadSources} centerValue="34%" centerLabel="Referral" height={220} />
            <div className="mt-3 pt-3 border-t border-border grid grid-cols-5 gap-2 text-center">
              {leadSources.map((s) => (
                <div key={s.name} className="space-y-0.5">
                  <span className="block size-2 rounded-full mx-auto" style={{ background: s.color }} />
                  <p className="text-xs font-semibold tabular-nums">{s.value}%</p>
                  <p className="text-[9px] text-muted-foreground leading-tight">{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden lg:col-span-2">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Customer Growth</h3>
              <p className="text-xs text-muted-foreground">New customers vs churned (12 months)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={customerTrend}
              xKey="month"
              yKeys={[
                { key: "new", name: "New Customers", color: "var(--chart-1)" },
                { key: "churned", name: "Churned", color: "var(--chart-4)" },
              ]}
              height={260}
            />
          </div>
        </div>
      </div>

      {/* Sales Rep Leaderboard table — col-span-12 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Sales Rep Leaderboard</h3>
            <p className="text-xs text-muted-foreground">Top performers this quarter — ranked by closed-won revenue</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">Full ranking</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Rank</TableHead>
              <TableHead>Representative</TableHead>
              <TableHead className="text-right">Deals Won</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
              <TableHead className="pr-5">Quota Attainment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesReps.map((r, i) => (
              <TableRow key={r.name} className="hover:bg-accent/50">
                <TableCell className="pl-5">
                  <span className={
                    i === 0 ? "flex size-6 items-center justify-center rounded-full bg-warning/10 text-warning text-xs font-bold" :
                    i === 1 ? "flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold" :
                    i === 2 ? "flex size-6 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold" :
                    "flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold"
                  }>{i + 1}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{r.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">{r.deals}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">${(r.revenue / 1000).toFixed(1)}K</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={
                    r.winRate >= 30 ? "bg-success/10 text-success border-success/20" :
                    r.winRate >= 26 ? "bg-info/10 text-info border-info/20" :
                    "bg-warning/10 text-warning border-warning/20"
                  }>{r.winRate}%</Badge>
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex items-center gap-2">
                    <Progress value={r.target} className="h-1.5 flex-1" />
                    <span className="text-[10px] text-muted-foreground w-8 text-right tabular-nums">{r.target}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer: Quarterly Target + Pipeline metrics + Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col items-center justify-center">
          <RadialProgress value={76} label="of $4.2M goal" color="var(--chart-2)" height={180} />
          <p className="mt-2 text-xs text-muted-foreground">Quarterly Target Progress</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold tracking-tight">Pipeline Metrics</h3>
            <CardMenuButton items={[{ label: "Configure" }]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Pipeline Value", value: "$4.82M", icon: <TrendingUp className="size-4" />, trend: "+18.4%", color: "var(--chart-1)" },
              { label: "Avg Sales Cycle", value: "42 days", icon: <CalendarDays className="size-4" />, trend: "-6.2%", color: "var(--chart-2)" },
              { label: "Customer LTV", value: "$24,840", icon: <Users className="size-4" />, trend: "+9.8%", color: "var(--chart-3)" },
              { label: "NPS Score", value: "62", icon: <Trophy className="size-4" />, trend: "+8 pts", color: "var(--chart-4)" },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex size-8 items-center justify-center rounded-md" style={{ background: `color-mix(in oklab, ${m.color} 14%, transparent)`, color: m.color }}>
                    {m.icon}
                  </div>
                  <span className={
                    "text-[10px] font-medium " +
                    (m.trend.startsWith("+") ? "text-success" : "text-destructive")
                  }>{m.trend}</span>
                </div>
                <p className="text-base font-bold tabular-nums">{m.value}</p>
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Upcoming Activities</h3>
              <p className="text-xs text-muted-foreground">Today and tomorrow's schedule</p>
            </div>
            <CardMenuButton items={[{ label: "Calendar" }]} />
          </div>
          <div className="px-5 pb-5 space-y-2.5">
            {upcomingActivities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
                <Badge variant="outline" className={
                  a.type === "Call" ? "bg-info/10 text-info border-info/20" :
                  a.type === "Email" ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-success/10 text-success border-success/20"
                }>{a.type}</Badge>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5"><Target className="size-3.5" /> 12 tasks pending</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">View all</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
