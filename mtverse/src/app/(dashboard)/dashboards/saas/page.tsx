"use client";

import * as React from "react";
import {
  DollarSign, Users, TrendingDown, Heart, Plus, Download, Filter,
  ArrowUpRight, ArrowDownRight, UserPlus, ArrowUpCircle, ArrowDownCircle,
  AlertTriangle, Activity, Crown, Sparkles, Target,
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

const mrrGrowth = [
  { month: "Jan", mrr: 84200, nrr: 92400, churn: 3200 },
  { month: "Feb", mrr: 91800, nrr: 101200, churn: 3400 },
  { month: "Mar", mrr: 99400, nrr: 110800, churn: 3800 },
  { month: "Apr", mrr: 104200, nrr: 116400, churn: 4100 },
  { month: "May", mrr: 112800, nrr: 126400, churn: 4400 },
  { month: "Jun", mrr: 121400, nrr: 136800, churn: 4800 },
  { month: "Jul", mrr: 128600, nrr: 145200, churn: 5200 },
  { month: "Aug", mrr: 134200, nrr: 151400, churn: 5400 },
  { month: "Sep", mrr: 138800, nrr: 156800, churn: 5600 },
  { month: "Oct", mrr: 140400, nrr: 159200, churn: 5800 },
  { month: "Nov", mrr: 141800, nrr: 161400, churn: 5900 },
  { month: "Dec", mrr: 142800, nrr: 163200, churn: 5400 },
];

const customersByPlan = [
  { name: "Free", value: 42, color: "var(--chart-3)" },
  { name: "Starter", value: 28, color: "var(--chart-2)" },
  { name: "Pro", value: 22, color: "var(--chart-1)" },
  { name: "Enterprise", value: 8, color: "var(--chart-4)" },
];

// Cohort retention table — rows = cohort month, cols = Month 1-6 retention %
// null = future month (not yet measurable)
const cohorts = [
  { month: "Jan", size: 184, m1: 100, m2: 82, m3: 74, m4: 68, m5: 62, m6: 58 },
  { month: "Feb", size: 212, m1: 100, m2: 84, m3: 76, m4: 71, m5: 64, m6: 60 },
  { month: "Mar", size: 248, m1: 100, m2: 88, m3: 80, m4: 74, m5: 68, m6: 64 },
  { month: "Apr", size: 224, m1: 100, m2: 86, m3: 78, m4: 72, m5: 66, m6: null },
  { month: "May", size: 286, m1: 100, m2: 90, m3: 82, m4: 76, m5: null, m6: null },
  { month: "Jun", size: 312, m1: 100, m2: 92, m3: 84, m4: null, m5: null, m6: null },
  { month: "Jul", size: 268, m1: 100, m2: 88, m3: null, m4: null, m5: null, m6: null },
  { month: "Aug", size: 294, m1: 100, m2: null, m3: null, m4: null, m5: null, m6: null },
  { month: "Sep", size: 242, m1: 100, m2: null, m3: null, m4: null, m5: null, m6: null },
  { month: "Oct", size: 218, m1: null, m2: null, m3: null, m4: null, m5: null, m6: null },
  { month: "Nov", size: 196, m1: null, m2: null, m3: null, m4: null, m5: null, m6: null },
  { month: "Dec", size: 168, m1: null, m2: null, m3: null, m4: null, m5: null, m6: null },
];

const planDistribution = [
  { plan: "Free", customers: 2028, mrr: 0, color: "var(--chart-3)" },
  { plan: "Starter", customers: 1352, mrr: 40560, color: "var(--chart-2)" },
  { plan: "Pro", customers: 1062, mrr: 74340, color: "var(--chart-1)" },
  { plan: "Enterprise", customers: 387, mrr: 27900, color: "var(--chart-4)" },
];

const recentActivity = [
  { type: "signup", account: "Acme Corp", plan: "Pro", user: "Sarah Chen", time: "2 min ago" },
  { type: "upgrade", account: "Globex Inc", plan: "Enterprise", user: "Marcus Webb", time: "18 min ago" },
  { type: "signup", account: "Initech", plan: "Starter", user: "Priya Patel", time: "42 min ago" },
  { type: "cancel", account: "Umbrella Co", plan: "Pro", user: "James O'Connor", time: "1 hr ago" },
  { type: "upgrade", account: "Stark Industries", plan: "Enterprise", user: "Elena Rodriguez", time: "2 hr ago" },
  { type: "signup", account: "Wayne Ent", plan: "Pro", user: "David Kim", time: "3 hr ago" },
  { type: "cancel", account: "Hooli", plan: "Starter", user: "Lisa Park", time: "5 hr ago" },
  { type: "signup", account: "Pied Piper", plan: "Pro", user: "Richard Hendricks", time: "6 hr ago" },
];

const atRiskAccounts = [
  { name: "Soylent Corp", plan: "Enterprise", mrr: 1800, risk: "High", days: 14, health: 28 },
  { name: "Cyberdyne", plan: "Pro", mrr: 700, risk: "High", days: 9, health: 34 },
  { name: "Tyrell Corp", plan: "Pro", mrr: 700, risk: "Medium", days: 21, health: 52 },
  { name: "Weyland-Yutani", plan: "Enterprise", mrr: 1800, risk: "Medium", days: 28, health: 58 },
];

// Color helper: green (high) → amber (mid) → red (low) using color-mix
function cellStyle(value: number | null): React.CSSProperties {
  if (value === null) return { background: "transparent" };
  // Color interpolation: success (>=80) → warning (40-79) → destructive (<40)
  let baseColor: string;
  let intensity: number;
  if (value >= 80) {
    baseColor = "var(--success)";
    intensity = 30 + ((value - 80) / 20) * 35; // 30-65%
  } else if (value >= 60) {
    baseColor = "var(--chart-2)";
    intensity = 25 + ((value - 60) / 20) * 25; // 25-50%
  } else if (value >= 40) {
    baseColor = "var(--warning)";
    intensity = 25 + ((value - 40) / 20) * 25; // 25-50%
  } else {
    baseColor = "var(--destructive)";
    intensity = 30 + ((40 - value) / 40) * 40; // 30-70%
  }
  return {
    background: `color-mix(in oklab, ${baseColor} ${intensity}%, transparent)`,
    color: "var(--foreground)",
  };
}

const activityIcon = (type: string) => {
  switch (type) {
    case "signup": return { icon: UserPlus, color: "var(--success)", bg: "bg-success/10 text-success border-success/20", label: "Signup" };
    case "upgrade": return { icon: ArrowUpCircle, color: "var(--chart-1)", bg: "bg-primary/10 text-primary border-primary/20", label: "Upgrade" };
    case "cancel": return { icon: ArrowDownCircle, color: "var(--destructive)", bg: "bg-destructive/10 text-destructive border-destructive/20", label: "Cancellation" };
    default: return { icon: Activity, color: "var(--info)", bg: "bg-info/10 text-info border-info/20", label: "Activity" };
  }
};

const planBadge = (plan: string) => {
  switch (plan) {
    case "Free": return "bg-muted text-muted-foreground border-border";
    case "Starter": return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "Pro": return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    case "Enterprise": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function SaaSDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="SaaS Dashboard"
        description="Monitor MRR, retention cohorts, plan distribution, and subscription health at a glance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "SaaS" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Cohort</Button>
          </>
        }
      />

      {/* 4 stat cards with deltas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: "$142,800", delta: 12.4, icon: <DollarSign className="size-5" />, spark: mrrGrowth.map((d) => ({ value: d.mrr / 1000 })), color: "var(--chart-1)" },
          { label: "Active Subscriptions", value: "4,829", delta: 8.2, icon: <Users className="size-5" />, spark: mrrGrowth.map((d) => ({ value: d.mrr / 30 })), color: "var(--chart-2)" },
          { label: "Churn Rate", value: "2.4%", delta: -0.6, icon: <TrendingDown className="size-5" />, spark: mrrGrowth.map((d) => ({ value: d.churn / 1000 })), color: "var(--chart-4)" },
          { label: "Customer LTV", value: "$8,420", delta: 6.8, icon: <Heart className="size-5" />, spark: [{value:6800},{value:7100},{value:7400},{value:7800},{value:8100},{value:8420}], color: "var(--chart-3)" },
        ].map((s) => {
          const up = s.delta >= 0;
          const isChurn = s.label === "Churn Rate";
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${s.color} 14%, transparent)`, color: s.color }}>
                  {s.icon}
                </div>
                <Badge variant="outline" className={`gap-0.5 px-1.5 py-0 text-[10px] ${(up && !isChurn) || (!up && isChurn) ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                  {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(s.delta)}%
                </Badge>
              </div>
              <p className="text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              <div className="h-8 mt-2 -mx-1">
                <Sparkline data={s.spark} color={s.color} height={32} />
              </div>
            </div>
          );
        })}
      </div>

      {/* HERO: Cohort Retention Table — color-coded heatmap */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Cohort Retention Analysis</h3>
            <p className="text-xs text-muted-foreground">Monthly cohorts tracked over 6-month retention horizon — color intensity reflects retention %</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>Low</span>
              <div className="flex h-2.5 w-24 rounded-full overflow-hidden">
                <div className="flex-1" style={{ background: "color-mix(in oklab, var(--destructive) 70%, transparent)" }} />
                <div className="flex-1" style={{ background: "color-mix(in oklab, var(--warning) 50%, transparent)" }} />
                <div className="flex-1" style={{ background: "color-mix(in oklab, var(--chart-2) 50%, transparent)" }} />
                <div className="flex-1" style={{ background: "color-mix(in oklab, var(--success) 65%, transparent)" }} />
              </div>
              <span>High</span>
            </div>
            <CardMenuButton items={[{ label: "Export CSV" }, { label: "Configure" }]} />
          </div>
        </div>
        <div className="px-5 pb-5 overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 pr-3">Cohort</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Size</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Month 1</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Month 2</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Month 3</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Month 4</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 px-2">Month 5</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-1.5 pl-2">Month 6</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c) => (
                <tr key={c.month} className="hover:bg-accent/20">
                  <td className="py-1.5 pr-3 font-medium text-sm whitespace-nowrap">{c.month} 2024</td>
                  <td className="py-1.5 px-2 text-right text-xs text-muted-foreground tabular-nums whitespace-nowrap">{c.size}</td>
                  {[c.m1, c.m2, c.m3, c.m4, c.m5, c.m6].map((v, i) => (
                    <td key={i} className="text-center">
                      {v !== null ? (
                        <div
                          className="h-9 min-w-[56px] rounded-md flex items-center justify-center text-xs font-semibold tabular-nums"
                          style={cellStyle(v)}
                        >
                          {v}%
                        </div>
                      ) : (
                        <div className="h-9 min-w-[56px] rounded-md flex items-center justify-center text-muted-foreground/40 text-xs">
                          —
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Target className="size-3.5 text-success" /> Avg 6-month retention: <span className="font-semibold text-foreground tabular-nums">60.5%</span></span>
              <span className="flex items-center gap-1.5"><Crown className="size-3.5 text-warning" /> Best cohort: Mar (64%)</span>
            </div>
            <span className="flex items-center gap-1.5"><Activity className="size-3.5" /> 5 active cohorts in retention window</span>
          </div>
        </div>
      </div>

      {/* 2-col: MRR Growth Area (col-7) + Customers by Plan Donut (col-5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">MRR Growth</h3>
              <p className="text-xs text-muted-foreground">MRR vs Net Retention Revenue vs Churn MRR (12 months)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={mrrGrowth}
              xKey="month"
              yKeys={[
                { key: "nrr", name: "NRR", color: "var(--chart-2)" },
                { key: "mrr", name: "MRR", color: "var(--chart-1)" },
                { key: "churn", name: "Churn MRR", color: "var(--chart-4)" },
              ]}
              height={260}
            />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Customers by Plan</h3>
              <p className="text-xs text-muted-foreground">Distribution across tiers — 4,829 total</p>
            </div>
            <CardMenuButton items={[{ label: "Breakdown" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={customersByPlan} centerValue="4,829" centerLabel="Total Customers" height={210} />
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              {customersByPlan.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-semibold tabular-nums">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Plan Distribution with Progress bars — customers + MRR per plan */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Plan Distribution</h3>
            <p className="text-xs text-muted-foreground">Customer count and MRR contribution by plan tier</p>
          </div>
          <CardMenuButton items={[{ label: "Configure tiers" }]} />
        </div>
        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {planDistribution.map((p) => {
            const custShare = (p.customers / 4829) * 100;
            const mrrShare = (p.mrr / 142800) * 100;
            return (
              <div key={p.plan} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${p.color} 14%, transparent)`, color: p.color }}>
                      {p.plan === "Enterprise" ? <Crown className="size-4" /> : p.plan === "Free" ? <Sparkles className="size-4" /> : <Users className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{p.plan}</p>
                      <p className="text-[10px] text-muted-foreground tabular-nums">{p.customers.toLocaleString()} customers</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]" style={{ color: p.color, borderColor: `color-mix(in oklab, ${p.color} 30%, transparent)` }}>
                    ${p.mrr.toLocaleString()}/mo
                  </Badge>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[10px]">
                      <span className="text-muted-foreground">Customer share</span>
                      <span className="font-semibold tabular-nums">{custShare.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${custShare}%`, background: p.color }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[10px]">
                      <span className="text-muted-foreground">MRR contribution</span>
                      <span className="font-semibold tabular-nums">{mrrShare.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${mrrShare}%`, background: p.color }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity feed — col-span-12 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Signups, upgrades, and cancellations in the last 6 hours</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View audit log</Button>
        </div>
        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentActivity.map((a, i) => {
            const meta = activityIcon(a.type);
            const Icon = meta.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
                <div className="flex size-9 items-center justify-center rounded-lg shrink-0" style={{ background: `color-mix(in oklab, ${meta.color} 14%, transparent)`, color: meta.color }}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium truncate">{a.account}</span>
                    <Badge variant="outline" className={`font-normal text-[9px] h-4 px-1.5 py-0 ${planBadge(a.plan)}`}>{a.plan}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.user} · {a.time}</p>
                </div>
                <Badge variant="outline" className={`font-normal text-[10px] ${meta.bg}`}>{meta.label}</Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* At-Risk Accounts callout */}
      <div className="rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/10 via-destructive/5 to-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                <AlertTriangle className="size-4" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">At-Risk Accounts</h3>
            </div>
            <p className="text-xs text-muted-foreground ml-10">Accounts showing churn signals — contact within 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]">{atRiskAccounts.length} accounts</Badge>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Assign CSM</Button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/60">
                <TableHead className="pl-0">Account</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">MRR</TableHead>
                <TableHead className="text-right">Days Idle</TableHead>
                <TableHead className="pr-0">Health Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskAccounts.map((a) => (
                <TableRow key={a.name} className="hover:bg-accent/40 border-border/60">
                  <TableCell className="pl-0 font-medium text-sm">{a.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal text-[10px] ${planBadge(a.plan)}`}>{a.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">${a.mrr.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={a.days <= 14 ? "text-destructive text-xs font-semibold tabular-nums" : "text-warning text-xs font-semibold tabular-nums"}>{a.days}d</span>
                  </TableCell>
                  <TableCell className="pr-0">
                    <div className="flex items-center gap-2">
                      <Progress value={a.health} className="h-1.5 flex-1" />
                      <span className={`text-[10px] font-semibold w-8 text-right tabular-nums ${a.health < 40 ? "text-destructive" : "text-warning"}`}>{a.health}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
