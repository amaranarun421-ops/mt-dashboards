"use client";

import * as React from "react";
import {
  Megaphone, Eye, MousePointerClick, Target, Plus, Download, Filter,
  TrendingUp, ArrowUpRight, ArrowDownRight, Facebook, Instagram, Twitter,
  Youtube, Mail, Radio, Users, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import {
  AreaTrend, DonutChart, Sparkline,
} from "@/components/charts";

const campaignTrend = [
  { week: "W1", impressions: 184, engagements: 24, conversions: 8 },
  { week: "W2", impressions: 212, engagements: 28, conversions: 10 },
  { week: "W3", impressions: 248, engagements: 32, conversions: 12 },
  { week: "W4", impressions: 284, engagements: 38, conversions: 14 },
  { week: "W5", impressions: 312, engagements: 42, conversions: 16 },
  { week: "W6", impressions: 358, engagements: 48, conversions: 19 },
  { week: "W7", impressions: 382, engagements: 54, conversions: 22 },
  { week: "W8", impressions: 418, engagements: 58, conversions: 24 },
  { week: "W9", impressions: 452, engagements: 64, conversions: 27 },
  { week: "W10", impressions: 486, engagements: 68, conversions: 29 },
  { week: "W11", impressions: 512, engagements: 72, conversions: 31 },
  { week: "W12", impressions: 548, engagements: 78, conversions: 34 },
];

const budgetAllocation = [
  { name: "Social", value: 38, color: "var(--chart-1)" },
  { name: "Search", value: 24, color: "var(--chart-2)" },
  { name: "Display", value: 18, color: "var(--chart-3)" },
  { name: "Email", value: 12, color: "var(--chart-4)" },
  { name: "Video", value: 8, color: "var(--chart-5)" },
];

const activeSpotlights = [
  {
    name: "Summer Launch 2024",
    channel: "Social",
    channelIcon: Instagram,
    budget: 48000,
    spent: 32400,
    roas: 4.8,
    gradient: "from-chart-1/20 via-chart-1/5 to-card",
    accent: "var(--chart-1)",
    spark: [12, 18, 22, 28, 34, 42],
  },
  {
    name: "Black Friday Teaser",
    channel: "Search",
    channelIcon: Target,
    budget: 32000,
    spent: 18900,
    roas: 5.2,
    gradient: "from-chart-2/20 via-chart-2/5 to-card",
    accent: "var(--chart-2)",
    spark: [8, 14, 19, 24, 31, 38],
  },
  {
    name: "Brand Awareness Q4",
    channel: "Video",
    channelIcon: Youtube,
    budget: 56000,
    spent: 41200,
    roas: 3.4,
    gradient: "from-chart-5/20 via-chart-5/5 to-card",
    accent: "var(--chart-5)",
    spark: [20, 24, 28, 30, 33, 36],
  },
];

const funnelStages = [
  { stage: "Awareness", value: 548000, pct: 100, color: "var(--chart-1)" },
  { stage: "Interest", value: 218000, pct: 39.8, color: "var(--chart-2)" },
  { stage: "Consideration", value: 84200, pct: 15.4, color: "var(--chart-3)" },
  { stage: "Conversion", value: 28600, pct: 5.2, color: "var(--chart-4)" },
  { stage: "Retention", value: 12400, pct: 2.3, color: "var(--chart-5)" },
];

const topCampaigns = [
  { name: "Summer Launch 2024", channel: "Social", budget: 48000, spent: 32400, conversions: 1248, roas: 4.8, status: "Active" },
  { name: "Black Friday Teaser", channel: "Search", budget: 32000, spent: 18900, conversions: 980, roas: 5.2, status: "Active" },
  { name: "Brand Awareness Q4", channel: "Video", budget: 56000, spent: 41200, conversions: 720, roas: 3.4, status: "Active" },
  { name: "Email Drip — Onboarding", channel: "Email", budget: 12000, spent: 9200, conversions: 642, roas: 6.1, status: "Paused" },
  { name: "Display Retargeting", channel: "Display", budget: 24000, spent: 18400, conversions: 412, roas: 2.8, status: "Active" },
  { name: "Influencer Collab Series", channel: "Social", budget: 38000, spent: 38000, conversions: 1080, roas: 4.2, status: "Ended" },
  { name: "Holiday Gift Guide", channel: "Search", budget: 18000, spent: 12400, conversions: 528, roas: 3.8, status: "Active" },
];

const demographics = [
  { group: "18-24", value: 22, color: "var(--chart-1)" },
  { group: "25-34", value: 38, color: "var(--chart-2)" },
  { group: "35-44", value: 24, color: "var(--chart-3)" },
  { group: "45-54", value: 11, color: "var(--chart-4)" },
  { group: "55+", value: 5, color: "var(--chart-5)" },
];

const channelBadge = (channel: string) => {
  switch (channel) {
    case "Social": return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    case "Search": return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "Display": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    case "Email": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    case "Video": return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function MarketingDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Marketing Dashboard"
        description="Track campaign performance, budget allocation, audience funnel, and ROAS in real time."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Marketing" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Campaign</Button>
          </>
        }
      />

      {/* Compact stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Campaigns", value: "24", delta: 4, icon: <Megaphone className="size-4" />, spark: [{value:18},{value:20},{value:21},{value:22},{value:23},{value:24}], color: "var(--chart-1)" },
          { label: "Total Reach", value: "2.4M", delta: 14.2, icon: <Eye className="size-4" />, spark: campaignTrend.map((d) => ({ value: d.impressions })), color: "var(--chart-2)" },
          { label: "Engagement Rate", value: "8.4%", delta: 2.1, icon: <MousePointerClick className="size-4" />, spark: campaignTrend.map((d) => ({ value: d.engagements })), color: "var(--chart-3)" },
          { label: "Avg ROAS", value: "4.2x", delta: 0.6, icon: <Target className="size-4" />, spark: [{value:3.4},{value:3.6},{value:3.8},{value:4.0},{value:4.1},{value:4.2}], color: "var(--chart-4)" },
        ].map((s) => {
          const up = s.delta >= 0;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex size-8 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${s.color} 14%, transparent)`, color: s.color }}>
                  {s.icon}
                </div>
                <Badge variant="outline" className={`gap-0.5 px-1 py-0 text-[10px] ${up ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                  {up ? <ArrowUpRight className="size-2.5" /> : <ArrowDownRight className="size-2.5" />}
                  {Math.abs(s.delta)}{s.label === "Avg ROAS" ? "pt" : "%"}
                </Badge>
              </div>
              <p className="text-xl font-bold tabular-nums leading-tight">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
              <div className="h-6 mt-1 -mx-1">
                <Sparkline data={s.spark} color={s.color} height={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* HERO: 3 Active Campaign Spotlight cards with gradient bgs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {activeSpotlights.map((c) => {
          const ChannelIcon = c.channelIcon;
          const progress = (c.spent / c.budget) * 100;
          return (
            <div key={c.name} className={`rounded-2xl bg-gradient-to-br ${c.gradient} border border-border overflow-hidden relative shadow-sm`}>
              <div className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: c.accent }} />
              <div className="p-5 relative flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="outline" className={`gap-1 mb-2 ${channelBadge(c.channel)}`}>
                      <ChannelIcon className="size-3" /> {c.channel}
                    </Badge>
                    <h3 className="text-base font-semibold tracking-tight leading-tight">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Live · syncing every 5 min</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl shrink-0" style={{ background: `color-mix(in oklab, ${c.accent} 18%, transparent)`, color: c.accent }}>
                    <Radio className="size-5" />
                  </div>
                </div>

                {/* Budget + Progress */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Budget</span>
                    <span className="text-xs font-medium tabular-nums">${(c.spent / 1000).toFixed(1)}K / ${(c.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${progress}%`, background: c.accent }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">{progress.toFixed(0)}% spent</p>
                </div>

                {/* ROAS + Sparkline */}
                <div className="mt-auto pt-3 border-t border-border/60 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ROAS</p>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-2xl font-bold tabular-nums" style={{ color: c.accent }}>{c.roas}x</p>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-0.5 px-1 py-0 text-[9px]">
                        <ArrowUpRight className="size-2.5" /> {((c.roas - 3.5) / 3.5 * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-24 h-10">
                    <Sparkline data={c.spark.map((v) => ({ value: v }))} color={c.accent} height={40} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-col: Campaign Trend Area (col-7) + Budget Donut (col-5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Campaign Performance</h3>
              <p className="text-xs text-muted-foreground">Impressions, engagements & conversions (12 weeks, in K)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={campaignTrend}
              xKey="week"
              yKeys={[
                { key: "impressions", name: "Impressions", color: "var(--chart-1)" },
                { key: "engagements", name: "Engagements", color: "var(--chart-2)" },
                { key: "conversions", name: "Conversions", color: "var(--chart-4)" },
              ]}
              height={280}
            />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Budget Allocation</h3>
              <p className="text-xs text-muted-foreground">Spend by channel — $268K total</p>
            </div>
            <CardMenuButton items={[{ label: "Reallocate" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={budgetAllocation} centerValue="$268K" centerLabel="Total Spend" height={210} />
            <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
              {budgetAllocation.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-semibold tabular-nums">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN FUNNEL — horizontal shrinking bars with conversion % */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Campaign Funnel</h3>
            <p className="text-xs text-muted-foreground">Audience journey from awareness to retention</p>
          </div>
          <CardMenuButton items={[{ label: "Breakdown" }, { label: "Export" }]} />
        </div>
        <div className="px-5 pb-5 space-y-2.5">
          {funnelStages.map((stage, i) => {
            const prev = i > 0 ? funnelStages[i - 1] : null;
            const convFromPrev = prev ? ((stage.value / prev.value) * 100).toFixed(1) : null;
            return (
              <div key={stage.stage}>
                {prev && (
                  <div className="flex items-center justify-center gap-2 py-1 text-[10px] text-muted-foreground">
                    <ArrowDownRight className="size-3" />
                    <span className="font-semibold text-foreground tabular-nums">{convFromPrev}%</span>
                    <span>conversion from {prev.stage}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-28 shrink-0 text-xs font-medium text-right">{stage.stage}</div>
                  <div className="flex-1 relative">
                    <div
                      className="h-12 rounded-lg flex items-center justify-between px-4 transition-all hover:scale-[1.01] origin-left"
                      style={{
                        width: `${Math.max(stage.pct, 18)}%`,
                        background: `linear-gradient(90deg, color-mix(in oklab, ${stage.color} 80%, transparent), color-mix(in oklab, ${stage.color} 40%, transparent))`,
                        borderLeft: `3px solid ${stage.color}`,
                      }}
                    >
                      <span className="text-xs font-semibold text-white drop-shadow">{stage.value.toLocaleString()}</span>
                      <span className="text-[10px] font-medium text-white/90 tabular-nums">{stage.pct}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><TrendingUp className="size-3.5 text-success" /> Overall funnel conversion: 5.2%</span>
            <span className="flex items-center gap-1.5"><Target className="size-3.5" /> Target: 6.5% — 80% attained</span>
          </div>
        </div>
      </div>

      {/* Top Campaigns table — col-span-12 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Top Campaigns</h3>
            <p className="text-xs text-muted-foreground">All active and recently completed campaigns</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Campaign</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Spent</TableHead>
              <TableHead className="text-right">Conversions</TableHead>
              <TableHead className="text-right">ROAS</TableHead>
              <TableHead className="pr-5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCampaigns.map((c, i) => (
              <TableRow key={c.name} className="hover:bg-accent/50">
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground font-semibold">C{i + 1}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal ${channelBadge(c.channel)}`}>{c.channel}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">${(c.budget / 1000).toFixed(0)}K</TableCell>
                <TableCell className="text-right text-muted-foreground tabular-nums">${(c.spent / 1000).toFixed(1)}K</TableCell>
                <TableCell className="text-right tabular-nums">{c.conversions.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className={c.roas >= 4 ? "text-success text-sm font-semibold tabular-nums" : c.roas >= 3 ? "text-warning text-sm font-semibold tabular-nums" : "text-destructive text-sm font-semibold tabular-nums"}>
                    {c.roas}x
                  </span>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Badge variant="outline" className={
                    c.status === "Active" ? "bg-success/10 text-success border-success/20" :
                    c.status === "Paused" ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-muted text-muted-foreground border-border"
                  }>{c.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Audience Demographics + Channel mix footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Audience Demographics</h3>
              <p className="text-xs text-muted-foreground">Age distribution of reached users</p>
            </div>
            <CardMenuButton items={[{ label: "Segment" }]} />
          </div>
          <div className="px-5 pb-5 space-y-4">
            {demographics.map((d) => (
              <div key={d.group}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-2">
                    <Users className="size-3.5" />
                    {d.group}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">{d.value}%</span>
                </div>
                <Progress value={d.value * 2.5} className="h-2" />
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5"><Users className="size-3.5" /> Top segment: 25-34 (38%)</span>
              <span className="text-muted-foreground flex items-center gap-1.5"><DollarSign className="size-3.5 text-success" /> Highest LTV: 35-44</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold tracking-tight">Channel Mix</h3>
            <CardMenuButton items={[{ label: "Optimize" }]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Social", value: "$102K", share: "38%", icon: Instagram, color: "var(--chart-1)" },
              { label: "Search", value: "$64K", share: "24%", icon: Target, color: "var(--chart-2)" },
              { label: "Display", value: "$48K", share: "18%", icon: Radio, color: "var(--chart-3)" },
              { label: "Email", value: "$32K", share: "12%", icon: Mail, color: "var(--chart-4)" },
              { label: "Video", value: "$22K", share: "8%", icon: Youtube, color: "var(--chart-5)" },
              { label: "Other", value: "$0K", share: "0%", icon: Twitter, color: "var(--chart-6)" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex size-7 items-center justify-center rounded-md" style={{ background: `color-mix(in oklab, ${c.color} 14%, transparent)`, color: c.color }}>
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{c.share}</span>
                  </div>
                  <p className="text-sm font-bold tabular-nums">{c.value}</p>
                  <p className="text-[10px] text-muted-foreground">{c.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
