"use client";

import * as React from "react";
import {
  DollarSign, ShoppingCart, Users, Activity, ArrowUpRight, Sparkles,
  TrendingUp, Zap, Globe, Clock, MoreHorizontal, Plus, Download,
  CheckCircle2, AlertCircle, Info, FileText, CheckSquare, KanbanSquare,
  Calendar, UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader, StatCard, SectionCard, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, BarTrend, DonutChart, RadialProgress, Sparkline } from "@/components/charts";

const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000, last: 36000 },
  { month: "Feb", revenue: 48000, target: 45000, last: 41000 },
  { month: "Mar", revenue: 53000, target: 50000, last: 46000 },
  { month: "Apr", revenue: 49000, target: 52000, last: 44000 },
  { month: "May", revenue: 61000, target: 55000, last: 52000 },
  { month: "Jun", revenue: 67000, target: 60000, last: 58000 },
  { month: "Jul", revenue: 72000, target: 65000, last: 61000 },
  { month: "Aug", revenue: 78000, target: 70000, last: 65000 },
  { month: "Sep", revenue: 84000, target: 75000, last: 70000 },
  { month: "Oct", revenue: 91000, target: 80000, last: 75000 },
  { month: "Nov", revenue: 98000, target: 85000, last: 80000 },
  { month: "Dec", revenue: 112000, target: 90000, last: 88000 },
];

const channelData = [
  { name: "Organic", value: 38, color: "var(--chart-1)" },
  { name: "Paid", value: 27, color: "var(--chart-2)" },
  { name: "Social", value: 19, color: "var(--chart-3)" },
  { name: "Email", value: 16, color: "var(--chart-4)" },
];

const activityData = [
  { day: "Mon", sessions: 2400, conversions: 320 },
  { day: "Tue", sessions: 3100, conversions: 410 },
  { day: "Wed", sessions: 2800, conversions: 380 },
  { day: "Thu", sessions: 3600, conversions: 520 },
  { day: "Fri", sessions: 4200, conversions: 680 },
  { day: "Sat", sessions: 3800, conversions: 540 },
  { day: "Sun", sessions: 2900, conversions: 410 },
];

const recentOrders = [
  { id: "#MTV-7821", customer: "Acme Corporation", email: "billing@acme.com", amount: 4280, status: "Completed", date: "2m ago" },
  { id: "#MTV-7820", customer: "Globex Industries", email: "ap@globex.io", amount: 1240, status: "Processing", date: "8m ago" },
  { id: "#MTV-7819", customer: "Initech LLC", email: "contact@initech.com", amount: 8650, status: "Completed", date: "23m ago" },
  { id: "#MTV-7818", customer: "Umbrella Inc", email: "ops@umbrella.co", amount: 320, status: "Pending", date: "41m ago" },
  { id: "#MTV-7817", customer: "Stark Industries", email: "finance@stark.com", amount: 18900, status: "Completed", date: "1h ago" },
  { id: "#MTV-7816", customer: "Wayne Enterprises", email: "lucius@wayne.com", amount: 5640, status: "Refunded", date: "2h ago" },
];

const topProducts = [
  { name: "MTVerse Pro License", sales: 1284, revenue: 192600, progress: 92 },
  { name: "Enterprise Add-on", sales: 856, revenue: 128400, progress: 78 },
  { name: "Analytics Module", sales: 642, revenue: 96300, progress: 64 },
  { name: "AI Assistant Pack", sales: 423, revenue: 63450, progress: 48 },
  { name: "Support Tier Premium", sales: 318, revenue: 47700, progress: 36 },
];

const ACTIVITY_FEED = [
  { id: 1, type: "success", title: "New enterprise customer signed up", desc: "Hooli Inc. chose the Scale plan", time: "2m ago", user: "AM" },
  { id: 2, type: "info", title: "Quarterly report generated", desc: "Q4 analytics digest is ready for review", time: "23m ago", user: "JR" },
  { id: 3, type: "warning", title: "API rate limit approaching", desc: "Production key has used 87% of monthly quota", time: "1h ago", user: "SK" },
  { id: 4, type: "success", title: "Deployment succeeded", desc: "v2.4.1 rolled out to all regions", time: "2h ago", user: "TL" },
  { id: 5, type: "info", title: "New team member invited", desc: "Sarah Chen invited as Product Designer", time: "3h ago", user: "AM" },
  { id: 6, type: "warning", title: "Payment failed", desc: "Wayne Enterprises invoice #4421 needs attention", time: "5h ago", user: "JR" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Alex"
        description="Here's what's happening across your MTVerse workspace today."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="size-4 mr-2" /> Export
            </Button>
            <Button size="sm" className="h-9 bg-primary hover:bg-primary/90">
              <Plus className="size-4 mr-2" /> New Report
            </Button>
          </>
        }
      />

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value="$112,480"
          delta={12.4}
          deltaLabel="vs last month"
          icon={<DollarSign className="size-5" />}
          spark={<Sparkline data={revenueData.map((d) => ({ value: d.revenue }))} />}
        />
        <StatCard
          label="Active Orders"
          value="1,847"
          delta={8.2}
          deltaLabel="vs last week"
          icon={<ShoppingCart className="size-5" />}
          spark={<Sparkline data={activityData.map((d) => ({ value: d.sessions }))} color="var(--chart-2)" />}
        />
        <StatCard
          label="New Customers"
          value="324"
          delta={-2.1}
          deltaLabel="vs last month"
          icon={<Users className="size-5" />}
          spark={<Sparkline data={activityData.map((d) => ({ value: d.conversions }))} color="var(--chart-3)" type="bar" />}
        />
        <StatCard
          label="Conversion Rate"
          value="4.86%"
          delta={1.3}
          deltaLabel="vs last week"
          icon={<Activity className="size-5" />}
          spark={<Sparkline data={[{value:3.8},{value:4.1},{value:4.0},{value:4.5},{value:4.3},{value:4.7},{value:4.86}]} color="var(--chart-4)" />}
        />
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Revenue Overview"
          description="Monthly revenue against target"
          className="lg:col-span-2"
          actions={
            <>
              <Tabs defaultValue="year" className="hidden sm:block">
                <TabsList className="h-8">
                  <TabsTrigger value="month" className="text-xs h-6">Month</TabsTrigger>
                  <TabsTrigger value="quarter" className="text-xs h-6">Quarter</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs h-6">Year</TabsTrigger>
                </TabsList>
              </Tabs>
              <CardMenuButton items={[{ label: "Export CSV" }, { label: "Print" }, { label: "Schedule" }]} />
            </>
          }
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold tracking-tight">$112,480</span>
            <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/20">
              <ArrowUpRight className="size-3" /> 12.4%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last year</span>
          </div>
          <AreaTrend
            data={revenueData}
            xKey="month"
            yKeys={[
              { key: "revenue", name: "Revenue", color: "var(--chart-1)" },
              { key: "target", name: "Target", color: "var(--chart-3)" },
              { key: "last", name: "Last Year", color: "var(--chart-2)" },
            ]}
            height={280}
          />
        </SectionCard>

        <SectionCard
          title="Traffic Sources"
          description="Channels breakdown"
          actions={<CardMenuButton items={[{ label: "View report" }, { label: "Export" }]} />}
        >
          <DonutChart
            data={channelData}
            centerValue="38%"
            centerLabel="Organic"
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {channelData.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-xs text-muted-foreground flex-1">{c.name}</span>
                <span className="text-xs font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Weekly Sessions"
          description="Sessions vs conversions"
          className="lg:col-span-2"
          actions={<CardMenuButton items={[{ label: "Details" }]} />}
        >
          <BarTrend
            data={activityData}
            xKey="day"
            yKeys={[
              { key: "sessions", name: "Sessions", color: "var(--chart-1)" },
              { key: "conversions", name: "Conversions", color: "var(--chart-2)" },
            ]}
            height={260}
          />
        </SectionCard>

        <SectionCard
          title="Goal Completion"
          description="Monthly target progress"
          actions={<CardMenuButton items={[{ label: "Adjust" }]} />}
        >
          <RadialProgress value={78} label="of $144K" />
          <div className="mt-4 space-y-2.5">
            {[
              { label: "New MRR", value: 84 },
              { label: "Activation", value: 67 },
              { label: "Retention", value: 92 },
            ].map((g) => (
              <div key={g.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{g.label}</span>
                  <span className="font-semibold">{g.value}%</span>
                </div>
                <Progress value={g.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Recent Orders"
          description="Latest transactions"
          className="lg:col-span-2"
          noBodyPadding
          actions={
            <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
              <Link href="/dashboards/ecommerce">View all <ArrowUpRight className="size-3 ml-1" /></Link>
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id} className="hover:bg-accent/50">
                  <TableCell className="pl-5 font-mono text-xs font-medium">{o.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                          {o.customer.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{o.customer}</p>
                        <p className="text-xs text-muted-foreground truncate">{o.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">${o.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        o.status === "Completed" ? "bg-success/10 text-success border-success/20" :
                        o.status === "Processing" ? "bg-info/10 text-info border-info/20" :
                        o.status === "Pending" ? "bg-warning/10 text-warning border-warning/20" :
                        "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-5 text-right text-xs text-muted-foreground">{o.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard
          title="Top Products"
          description="By revenue this month"
          actions={<CardMenuButton items={[{ label: "All products" }]} />}
        >
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="size-6 rounded-md bg-primary/10 text-primary text-xs font-semibold grid place-items-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium truncate">{p.name}</span>
                  </div>
                  <span className="text-sm font-semibold ml-2">${(p.revenue / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={p.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-16 text-right">{p.sales} sales</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Activity feed + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Activity Feed"
          description="Latest events across your workspace"
          className="lg:col-span-2"
          noBodyPadding
        >
          <div className="divide-y divide-border">
            {ACTIVITY_FEED.map((a) => (
              <div key={a.id} className="flex gap-3 px-5 py-3.5 hover:bg-accent/40 transition-colors">
                <div className={`mt-0.5 flex size-8 items-center justify-center rounded-full shrink-0 ${
                  a.type === "success" ? "bg-success/10 text-success" :
                  a.type === "warning" ? "bg-warning/10 text-warning" :
                  "bg-info/10 text-info"
                }`}>
                  {a.type === "success" ? <CheckCircle2 className="size-4" /> :
                   a.type === "warning" ? <AlertCircle className="size-4" /> :
                   <Info className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                </div>
                <Avatar className="size-7 shrink-0">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{a.user}</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Quick Actions"
          description="Jump to common workflows"
        >
          <div className="grid grid-cols-2 gap-3">
            {([
              { label: "New Invoice", href: "/apps/invoice", icon: FileText, color: "var(--chart-1)" },
              { label: "Add Task", href: "/apps/tasks", icon: CheckSquare, color: "var(--chart-2)" },
              { label: "New Board", href: "/apps/kanban", icon: KanbanSquare, color: "var(--chart-3)" },
              { label: "Schedule", href: "/apps/calendar", icon: Calendar, color: "var(--chart-4)" },
              { label: "Invite User", href: "/enterprise/team", icon: UserPlus, color: "var(--chart-5)" },
              { label: "Ask AI", href: "/apps/ai-assistant", icon: Sparkles, color: "var(--chart-6)" },
            ] as { label: string; href: string; icon: LucideIcon; color: string }[]).map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group flex flex-col items-start gap-2 p-3 rounded-xl border border-border bg-background hover:border-ring/40 hover:shadow-sm transition-all"
                >
                  <div
                    className="flex size-9 items-center justify-center rounded-lg group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `color-mix(in oklab, ${a.color} 12%, transparent)`, color: a.color }}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-medium">{a.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">MTVerse AI Insight</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Revenue is trending 12% above forecast. Consider expanding paid social budget.
                </p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                  View analysis <ArrowUpRight className="size-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* KPI footer row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg. Session", value: "4m 32s", icon: Clock, color: "var(--chart-1)" },
          { label: "Active Regions", value: "24", icon: Globe, color: "var(--chart-2)" },
          { label: "API Calls / hr", value: "1.2M", icon: Zap, color: "var(--chart-3)" },
          { label: "Uptime (30d)", value: "99.98%", icon: TrendingUp, color: "var(--chart-4)" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{k.label}</span>
                <div
                  className="size-7 rounded-md grid place-items-center"
                  style={{ backgroundColor: `color-mix(in oklab, ${k.color} 12%, transparent)`, color: k.color }}
                >
                  <Icon className="size-3.5" />
                </div>
              </div>
              <p className="text-xl font-bold mt-2">{k.value}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
