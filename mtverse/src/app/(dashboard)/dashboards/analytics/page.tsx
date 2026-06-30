"use client";

import * as React from "react";
import {
  Activity, Eye, MousePointerClick, Clock, Download, Plus, Filter,
  Globe, Smartphone, Monitor, Tablet, Search, TrendingUp, Target, ArrowUpRight, ArrowDownRight,
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
  AreaTrend, BarTrend, DonutChart, RadarChartTrend, RadialProgress, Sparkline,
} from "@/components/charts";

const trafficData = [
  { month: "Jan", sessions: 9420, visitors: 6840 },
  { month: "Feb", sessions: 10180, visitors: 7320 },
  { month: "Mar", sessions: 11240, visitors: 8190 },
  { month: "Apr", sessions: 9870, visitors: 7260 },
  { month: "May", sessions: 12150, visitors: 8940 },
  { month: "Jun", sessions: 13980, visitors: 10240 },
  { month: "Jul", sessions: 15640, visitors: 11480 },
  { month: "Aug", sessions: 16820, visitors: 12310 },
  { month: "Sep", sessions: 14760, visitors: 10890 },
  { month: "Oct", sessions: 16240, visitors: 11920 },
  { month: "Nov", sessions: 17980, visitors: 13240 },
  { month: "Dec", sessions: 19820, visitors: 14680 },
];

const deviceData = [
  { name: "Desktop", value: 48, color: "var(--chart-1)" },
  { name: "Mobile", value: 38, color: "var(--chart-2)" },
  { name: "Tablet", value: 14, color: "var(--chart-3)" },
];

const topPages = [
  { page: "/home", views: 184320 },
  { page: "/pricing", views: 142840 },
  { page: "/features", views: 118290 },
  { page: "/blog/launch", views: 96420 },
  { page: "/docs/getting-started", views: 78510 },
  { page: "/integrations", views: 64280 },
  { page: "/about", views: 48160 },
];

const engagementData = [
  { channel: "Organic", engagement: 82, retention: 74 },
  { channel: "Social", engagement: 68, retention: 58 },
  { channel: "Direct", engagement: 76, retention: 81 },
  { channel: "Referral", engagement: 71, retention: 65 },
  { channel: "Email", engagement: 88, retention: 79 },
  { channel: "Paid", engagement: 54, retention: 49 },
];

const trafficSources = [
  { source: "Google", medium: "Organic", sessions: 58240, bounce: 38.4, duration: "5m 12s", icon: "G" },
  { source: "Direct", medium: "Direct", sessions: 32480, bounce: 28.1, duration: "6m 48s", icon: "D" },
  { source: "Twitter / X", medium: "Social", sessions: 18620, bounce: 52.6, duration: "2m 14s", icon: "X" },
  { source: "Newsletter", medium: "Email", sessions: 14920, bounce: 22.8, duration: "7m 32s", icon: "N" },
  { source: "LinkedIn", medium: "Social", sessions: 12480, bounce: 41.2, duration: "3m 58s", icon: "L" },
  { source: "Reddit", medium: "Referral", sessions: 9240, bounce: 48.9, duration: "2m 47s", icon: "R" },
  { source: "Bing", medium: "Organic", sessions: 7820, bounce: 44.6, duration: "3m 22s", icon: "B" },
];

const kpiStrip = [
  { label: "Total Sessions", value: "148,392", delta: 12.4, icon: <Activity className="size-4" />, color: "var(--chart-1)", spark: trafficData.map((d) => ({ value: d.sessions })) },
  { label: "Page Views", value: "1.2M", delta: 8.1, icon: <Eye className="size-4" />, color: "var(--chart-2)", spark: trafficData.map((d) => ({ value: d.visitors * 2.1 })) },
  { label: "Bounce Rate", value: "42.3%", delta: -3.2, icon: <MousePointerClick className="size-4" />, color: "var(--chart-3)", spark: [{value:48},{value:46},{value:45},{value:44},{value:43},{value:42.3}] },
  { label: "Avg Duration", value: "4m 32s", delta: 5.6, icon: <Clock className="size-4" />, color: "var(--chart-4)", spark: [{value:245},{value:258},{value:262},{value:268},{value:272},{value:272}] },
  { label: "Active Users", value: "1,284", delta: 8.4, icon: <TrendingUp className="size-4" />, color: "var(--chart-5)", spark: [{value:980},{value:1040},{value:1120},{value:1180},{value:1240},{value:1284}] },
  { label: "Conv. Rate", value: "3.42%", delta: 0.6, icon: <Target className="size-4" />, color: "var(--chart-6)", spark: [{value:3.1},{value:3.2},{value:3.3},{value:3.35},{value:3.4},{value:3.42}] },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Analytics Dashboard"
        description="Track sessions, visitor behavior, traffic sources, and engagement across all channels."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Analytics" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Report</Button>
          </>
        }
      />

      {/* HERO CHART — full width, NO card chrome, bg gradient panel */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-muted/30 to-background border border-border/60 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 p-5 pb-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="flex items-center gap-1.5 text-success">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-success" />
                </span>
                Live
              </span>
              <span className="text-muted-foreground/60">·</span>
              <span>Trailing 12 months · Updated 2 min ago</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Sessions vs Unique Visitors</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Traffic volume and deduplicated reach across all properties</p>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Peak sessions</p>
              <p className="text-lg font-bold tabular-nums leading-tight">19,820</p>
            </div>
            <div className="h-9 w-px bg-border" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Peak visitors</p>
              <p className="text-lg font-bold tabular-nums leading-tight">14,680</p>
            </div>
            <div className="h-9 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--chart-1)" }} /> <span className="text-muted-foreground">Sessions</span></div>
              <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: "var(--chart-2)" }} /> <span className="text-muted-foreground">Visitors</span></div>
            </div>
          </div>
        </div>
        <div className="px-2 pb-4">
          <AreaTrend
            data={trafficData}
            xKey="month"
            yKeys={[
              { key: "sessions", name: "Sessions", color: "var(--chart-1)" },
              { key: "visitors", name: "Unique Visitors", color: "var(--chart-2)" },
            ]}
            height={320}
            showAxis={true}
          />
        </div>
      </div>

      {/* KPI STRIP — horizontal row of 6 small tiles with dividers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 rounded-xl border border-border/60 bg-card overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border">
        {kpiStrip.map((k) => {
          const up = k.delta >= 0;
          return (
            <div key={k.label} className="p-4 flex flex-col gap-2 hover:bg-accent/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex size-7 items-center justify-center rounded-md" style={{ background: `color-mix(in oklab, ${k.color} 14%, transparent)`, color: k.color }}>
                  {k.icon}
                </div>
                <Badge variant="outline" className={`gap-0.5 px-1 py-0 text-[10px] ${up ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                  {up ? <ArrowUpRight className="size-2.5" /> : <ArrowDownRight className="size-2.5" />}
                  {Math.abs(k.delta)}%
                </Badge>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight tabular-nums">{k.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{k.label}</p>
              </div>
              <div className="h-6 -mx-1">
                <Sparkline data={k.spark} color={k.color} height={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3-column: Device Donut + Top Pages Bar + Traffic Sources Table — minimal chrome */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Device Breakdown</h3>
              <p className="text-xs text-muted-foreground">Sessions by device type</p>
            </div>
            <CardMenuButton items={[{ label: "View all" }]} />
          </div>
          <DonutChart data={deviceData} centerValue="48%" centerLabel="Desktop" height={180} />
          <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <Monitor className="size-4 mx-auto text-muted-foreground" />
              <p className="text-sm font-semibold tabular-nums">48%</p>
              <p className="text-[10px] text-muted-foreground">Desktop</p>
            </div>
            <div className="space-y-1">
              <Smartphone className="size-4 mx-auto text-muted-foreground" />
              <p className="text-sm font-semibold tabular-nums">38%</p>
              <p className="text-[10px] text-muted-foreground">Mobile</p>
            </div>
            <div className="space-y-1">
              <Tablet className="size-4 mx-auto text-muted-foreground" />
              <p className="text-sm font-semibold tabular-nums">14%</p>
              <p className="text-[10px] text-muted-foreground">Tablet</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Top Pages by Views</h3>
              <p className="text-xs text-muted-foreground">Most visited URLs</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
          </div>
          <BarTrend
            data={topPages}
            xKey="page"
            yKeys={[{ key: "views", name: "Page Views", color: "var(--chart-1)" }]}
            height={260}
            layout="vertical"
            showGrid
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Traffic Sources</h3>
              <p className="text-xs text-muted-foreground">By acquisition channel</p>
            </div>
            <CardMenuButton items={[{ label: "Configure" }]} />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Source</TableHead>
                <TableHead className="text-right">Sessions</TableHead>
                <TableHead className="pr-5 text-right">Bounce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trafficSources.slice(0, 6).map((s) => (
                <TableRow key={s.source} className="hover:bg-accent/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[9px] bg-muted text-muted-foreground font-semibold">{s.icon}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{s.source}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm tabular-nums">{(s.sessions / 1000).toFixed(1)}K</TableCell>
                  <TableCell className="pr-5 text-right">
                    <span className={s.bounce < 30 ? "text-success text-xs font-medium" : s.bounce > 45 ? "text-destructive text-xs font-medium" : "text-warning text-xs font-medium"}>
                      {s.bounce}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 2-column: Radar Engagement + Radial Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Engagement Score by Channel</h3>
              <p className="text-xs text-muted-foreground">Engagement & retention comparison</p>
            </div>
            <CardMenuButton items={[{ label: "Insights" }]} />
          </div>
          <RadarChartTrend
            data={engagementData}
            xKey="channel"
            yKeys={[
              { key: "engagement", name: "Engagement", color: "var(--chart-1)" },
              { key: "retention", name: "Retention", color: "var(--chart-2)" },
            ]}
            height={280}
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold tracking-tight">Goal Completion</h3>
              <p className="text-xs text-muted-foreground">Conversion funnel target</p>
            </div>
            <CardMenuButton items={[{ label: "Configure" }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <RadialProgress value={68} label="of target" color="var(--chart-1)" height={180} />
            <div className="space-y-2">
              {[
                { label: "Sign-ups", value: "68%", color: "var(--chart-2)" },
                { label: "Demo requests", value: "54%", color: "var(--chart-3)" },
                { label: "Pricing views", value: "82%", color: "var(--chart-4)" },
                { label: "Trial starts", value: "41%", color: "var(--chart-5)" },
              ].map((g) => (
                <div key={g.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: g.color }} />
                    {g.label}
                  </span>
                  <span className="font-semibold tabular-nums">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Top Traffic Sources table — chart-focused */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Top Traffic Sources</h3>
            <p className="text-xs text-muted-foreground">Performance by acquisition channel — detailed breakdown</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Source</TableHead>
              <TableHead>Medium</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">Bounce Rate</TableHead>
              <TableHead className="pr-5 text-right">Avg Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trafficSources.map((s) => (
              <TableRow key={s.source} className="hover:bg-accent/50">
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground font-semibold">{s.icon}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{s.source}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    s.medium === "Organic" ? "bg-success/10 text-success border-success/20" :
                    s.medium === "Social" ? "bg-info/10 text-info border-info/20" :
                    s.medium === "Email" ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-muted text-muted-foreground border-border"
                  }>{s.medium}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">{s.sessions.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className={s.bounce < 30 ? "text-success text-xs font-medium" : s.bounce > 45 ? "text-destructive text-xs font-medium" : "text-warning text-xs font-medium"}>
                    {s.bounce}%
                  </span>
                </TableCell>
                <TableCell className="pr-5 text-right text-sm text-muted-foreground tabular-nums">{s.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer strip — Monthly target progress, minimal */}
      <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Monthly Sessions Target</p>
            <p className="text-xs text-muted-foreground">Top country: United States (28% share) · Top source: Google (42%)</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1 md:max-w-md">
          <span className="text-xs font-semibold whitespace-nowrap tabular-nums">148,392 / 180,000</span>
          <Progress value={(148392 / 180000) * 100} className="h-2 flex-1" />
          <span className="text-xs text-muted-foreground tabular-nums">82%</span>
        </div>
      </div>
    </div>
  );
}
