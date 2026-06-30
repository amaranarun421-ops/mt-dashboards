"use client";

import * as React from "react";
import {
  Users, Briefcase, CalendarCheck, TrendingDown, Download, Plus, Filter,
  Calendar, Star, Check, X, Code, Megaphone, Palette, Server, Building2,
  Clock, UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, StatCard, SectionCard, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, DonutChart, RadialProgress, Sparkline } from "@/components/charts";

const headcountData = [
  { month: "Jan", headcount: 398 },
  { month: "Feb", headcount: 406 },
  { month: "Mar", headcount: 412 },
  { month: "Apr", headcount: 418 },
  { month: "May", headcount: 424 },
  { month: "Jun", headcount: 432 },
  { month: "Jul", headcount: 442 },
  { month: "Aug", headcount: 451 },
  { month: "Sep", headcount: 458 },
  { month: "Oct", headcount: 466 },
  { month: "Nov", headcount: 474 },
  { month: "Dec", headcount: 482 },
];

const departmentData = [
  { name: "Engineering", value: 34, color: "var(--chart-1)" },
  { name: "Sales", value: 18, color: "var(--chart-2)" },
  { name: "Marketing", value: 12, color: "var(--chart-3)" },
  { name: "Operations", value: 16, color: "var(--chart-4)" },
  { name: "Finance", value: 8, color: "var(--chart-5)" },
  { name: "HR & Admin", value: 12, color: "var(--chart-6)" },
];

const departmentMeta: Record<string, { icon: React.ReactNode; gradient: string }> = {
  "Engineering": { icon: <Code className="size-3.5" />, gradient: "from-chart-1 to-chart-2" },
  "Sales": { icon: <Megaphone className="size-3.5" />, gradient: "from-chart-2 to-chart-3" },
  "Marketing": { icon: <Palette className="size-3.5" />, gradient: "from-chart-3 to-chart-4" },
  "Operations": { icon: <Server className="size-3.5" />, gradient: "from-chart-4 to-chart-5" },
  "Finance": { icon: <Building2 className="size-3.5" />, gradient: "from-chart-5 to-chart-6" },
  "HR & Admin": { icon: <Briefcase className="size-3.5" />, gradient: "from-chart-6 to-chart-1" },
};

type Employee = {
  name: string;
  initials: string;
  role: string;
  department: keyof typeof departmentMeta;
  status: "online" | "away" | "offline";
  start: string;
  rating: number;
  gradient: string;
};

const employees: Employee[] = [
  { name: "Sarah Chen", initials: "SC", role: "Senior Engineer", department: "Engineering", status: "online", start: "Mar 2021", rating: 4.8, gradient: "from-chart-1 to-chart-2" },
  { name: "Marcus Lee", initials: "ML", role: "Account Executive", department: "Sales", status: "online", start: "Jul 2022", rating: 4.5, gradient: "from-chart-2 to-chart-3" },
  { name: "Priya Patel", initials: "PP", role: "Product Designer", department: "Marketing", status: "away", start: "Jan 2023", rating: 4.7, gradient: "from-chart-3 to-chart-4" },
  { name: "David Kim", initials: "DK", role: "DevOps Engineer", department: "Engineering", status: "online", start: "Sep 2020", rating: 4.6, gradient: "from-chart-4 to-chart-5" },
  { name: "Elena Rossi", initials: "ER", role: "Financial Analyst", department: "Finance", status: "online", start: "Apr 2023", rating: 4.4, gradient: "from-chart-5 to-chart-6" },
  { name: "James Wright", initials: "JW", role: "Operations Lead", department: "Operations", status: "offline", start: "Jan 2024", rating: 4.1, gradient: "from-chart-6 to-chart-1" },
  { name: "Aisha Khan", initials: "AK", role: "Marketing Manager", department: "Marketing", status: "online", start: "Aug 2021", rating: 4.9, gradient: "from-chart-1 to-chart-3" },
  { name: "Noah Bennett", initials: "NB", role: "Sales Engineer", department: "Sales", status: "away", start: "Feb 2023", rating: 4.3, gradient: "from-chart-2 to-chart-4" },
  { name: "Taylor Reed", initials: "TR", role: "Backend Engineer", department: "Engineering", status: "online", start: "Nov 2022", rating: 4.5, gradient: "from-chart-3 to-chart-5" },
  { name: "Morgan Quinn", initials: "MQ", role: "Recruiter", department: "HR & Admin", status: "online", start: "Jun 2023", rating: 4.6, gradient: "from-chart-4 to-chart-6" },
  { name: "Riley Foster", initials: "RF", role: "Operations Analyst", department: "Operations", status: "offline", start: "Oct 2022", rating: 4.2, gradient: "from-chart-5 to-chart-1" },
  { name: "Sam Delgado", initials: "SD", role: "Brand Strategist", department: "Marketing", status: "online", start: "May 2022", rating: 4.7, gradient: "from-chart-6 to-chart-2" },
];

const timeOffRequests = [
  { name: "Sarah Chen", initials: "SC", type: "Vacation", dates: "Mar 18 - 22", days: 5, gradient: "from-chart-1 to-chart-2" },
  { name: "Marcus Lee", initials: "ML", type: "Sick Leave", dates: "Mar 14", days: 1, gradient: "from-chart-2 to-chart-3" },
  { name: "Priya Patel", initials: "PP", type: "Personal", dates: "Mar 25", days: 1, gradient: "from-chart-3 to-chart-4" },
  { name: "David Kim", initials: "DK", type: "Vacation", dates: "Apr 02 - 05", days: 4, gradient: "from-chart-4 to-chart-5" },
  { name: "Elena Rossi", initials: "ER", type: "Conference", dates: "Mar 28 - 29", days: 2, gradient: "from-chart-5 to-chart-6" },
];

const upcomingReviews = [
  { name: "James Wright", initials: "JW", role: "Operations Lead", type: "90-Day Review", date: "Mar 18", gradient: "from-chart-6 to-chart-1" },
  { name: "Aisha Khan", initials: "AK", role: "Marketing Manager", type: "Annual Review", date: "Mar 21", gradient: "from-chart-1 to-chart-3" },
  { name: "David Kim", initials: "DK", role: "DevOps Engineer", type: "Quarterly Review", date: "Mar 25", gradient: "from-chart-4 to-chart-5" },
  { name: "Marcus Lee", initials: "ML", role: "Account Executive", type: "Annual Review", date: "Apr 02", gradient: "from-chart-2 to-chart-3" },
  { name: "Sarah Chen", initials: "SC", role: "Senior Engineer", type: "Promotion Review", date: "Apr 08", gradient: "from-chart-1 to-chart-2" },
];

const statusDot: Record<Employee["status"], string> = {
  "online": "bg-success",
  "away": "bg-warning",
  "offline": "bg-muted-foreground/40",
};

const typeBadge: Record<string, string> = {
  "Vacation": "bg-info/10 text-info border-info/20",
  "Sick Leave": "bg-destructive/10 text-destructive border-destructive/20",
  "Personal": "bg-warning/10 text-warning border-warning/20",
  "Conference": "bg-primary/10 text-primary border-primary/20",
};

const reviewBadge: Record<string, string> = {
  "Promotion Review": "bg-success/10 text-success border-success/20",
  "90-Day Review": "bg-info/10 text-info border-info/20",
  "Annual Review": "bg-warning/10 text-warning border-warning/20",
  "Quarterly Review": "bg-muted text-muted-foreground border-border",
};

function EmployeeCard({ e }: { e: Employee }) {
  const dept = departmentMeta[e.department];
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden">
      <div className="absolute -top-6 -right-6 size-16 rounded-full bg-gradient-to-br opacity-10 blur-xl" style={{ background: "var(--accent)" }} />
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <Avatar className="size-12 ring-2 ring-background">
            <AvatarFallback className={"text-sm font-bold bg-gradient-to-br text-white " + e.gradient}>{e.initials}</AvatarFallback>
          </Avatar>
          <span className={"absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-card " + statusDot[e.status]} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{e.name}</p>
          <p className="text-xs text-muted-foreground truncate">{e.role}</p>
          <Badge variant="outline" className="mt-1 px-1.5 py-0 text-[10px] gap-1">
            <span className={"text-foreground"}>{dept.icon}</span>
            {e.department}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Calendar className="size-3" /> {e.start}
        </span>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold">
          <Star className="size-3 fill-warning text-warning" /> {e.rating}
        </span>
      </div>
    </div>
  );
}

export default function HRDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Directory Dashboard"
        description="People-focused view across the org — directory, hiring goals, time-off, and reviews."
        breadcrumbs={[{ label: "Dashboards" }, { label: "HR" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> Add Employee</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value="482"
          delta={12}
          deltaLabel="vs last month"
          icon={<Users className="size-5" />}
          spark={<Sparkline data={headcountData.map((d) => ({ value: d.headcount }))} />}
        />
        <StatCard
          label="Open Positions"
          value="24"
          delta={-3}
          deltaLabel="vs last month"
          icon={<Briefcase className="size-5" />}
          spark={<Sparkline data={[{ value: 32 }, { value: 30 }, { value: 29 }, { value: 28 }, { value: 26 }, { value: 24 }]} color="var(--chart-2)" type="bar" />}
        />
        <StatCard
          label="Attendance Rate"
          value="96.4%"
          delta={1.2}
          deltaLabel="vs last month"
          icon={<CalendarCheck className="size-5" />}
          spark={<Sparkline data={[{ value: 94.1 }, { value: 94.8 }, { value: 95.2 }, { value: 95.8 }, { value: 96.1 }, { value: 96.4 }]} color="var(--chart-3)" />}
        />
        <StatCard
          label="Turnover Rate"
          value="8.2%"
          delta={-1.4}
          deltaLabel="vs last month"
          icon={<TrendingDown className="size-5" />}
          spark={<Sparkline data={[{ value: 11.8 }, { value: 10.6 }, { value: 10.2 }, { value: 9.6 }, { value: 8.9 }, { value: 8.2 }]} color="var(--chart-4)" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Employee Directory"
          description="12 active team members across departments"
          className="lg:col-span-8"
          actions={
            <>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                <UserCheck className="size-3 mr-1" /> 8 online
              </Badge>
              <CardMenuButton items={[{ label: "View all" }, { label: "Export" }]} />
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {employees.map((e) => (
              <EmployeeCard key={e.name} e={e} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Annual Hiring Goal"
          description="Progress to target · 220 hires"
          className="lg:col-span-4"
          actions={<CardMenuButton items={[{ label: "Configure" }]} />}
        >
          <RadialProgress value={68} label="of 220 hires" color="var(--chart-2)" height={180} />
          <div className="mt-2 pt-3 border-t border-border space-y-2">
            {[
              { label: "Hired YTD", value: "150", color: "var(--success)" },
              { label: "In Interview", value: "84", color: "var(--info)" },
              { label: "Open Roles", value: "24", color: "var(--warning)" },
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
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Department Headcount</p>
            <div className="space-y-1.5">
              {departmentData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-24 text-xs text-muted-foreground truncate">{d.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.value * 2.4}%`, background: d.color }} />
                  </div>
                  <span className="text-xs font-semibold tabular-nums w-9 text-right">{Math.round((d.value / 100) * 482)}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Headcount Growth"
          description="Trailing 12 months"
          className="lg:col-span-7"
          actions={<CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />}
        >
          <AreaTrend
            data={headcountData}
            xKey="month"
            yKeys={[{ key: "headcount", name: "Headcount", color: "var(--chart-1)" }]}
            height={260}
          />
        </SectionCard>

        <SectionCard
          title="Employees by Department"
          description="Distribution across teams"
          className="lg:col-span-5"
          actions={<CardMenuButton items={[{ label: "View all" }]} />}
        >
          <DonutChart data={departmentData} centerValue="482" centerLabel="Employees" height={260} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Pending Time Off"
          description="Approvals awaiting review"
          className="lg:col-span-6"
          actions={<CardMenuButton items={[{ label: "Manage" }]} />}
        >
          <div className="space-y-2.5">
            {timeOffRequests.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 pb-2.5 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-9 ring-2 ring-background">
                    <AvatarFallback className={"text-xs font-semibold bg-gradient-to-br text-white " + r.gradient}>{r.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">{r.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="outline" className={"px-1.5 py-0 text-[10px] " + typeBadge[r.type]}>{r.type}</Badge>
                      <span className="text-[11px] text-muted-foreground">{r.dates}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border px-1.5 py-0 text-[10px] tabular-nums">{r.days}d</Badge>
                  <Button size="icon" variant="outline" className="size-7 bg-success/10 text-success border-success/20 hover:bg-success/20">
                    <Check className="size-3.5" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button size="icon" variant="outline" className="size-7 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                    <X className="size-3.5" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> 13 days pending</span>
            <span className="flex items-center gap-1.5"><CalendarCheck className="size-3.5" /> 68% approval rate</span>
          </div>
        </SectionCard>

        <SectionCard
          title="Upcoming Reviews"
          description="Performance reviews scheduled"
          className="lg:col-span-6"
          actions={<Button variant="ghost" size="sm" className="h-8 text-xs">Calendar</Button>}
        >
          <div className="space-y-2.5">
            {upcomingReviews.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-9 ring-2 ring-background">
                    <AvatarFallback className={"text-xs font-semibold bg-gradient-to-br text-white " + r.gradient}>{r.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground">{r.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <Badge variant="outline" className={"px-1.5 py-0 text-[10px] " + (reviewBadge[r.type] ?? "bg-muted text-muted-foreground border-border")}>{r.type}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                    <Clock className="size-3.5" /> {r.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> 5 reviews this quarter</span>
            <span className="flex items-center gap-1.5"><UserCheck className="size-3.5" /> 1 promotion pending</span>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
