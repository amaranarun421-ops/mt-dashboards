"use client";

import * as React from "react";
import {
  FolderKanban, CheckCircle2, AlertTriangle, Trophy, Download, Plus, Filter,
  Calendar, Users, Clock, Gauge, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, DonutChart, Sparkline } from "@/components/charts";

const hoursData = [
  { week: "W1", hours: 1280 },
  { week: "W2", hours: 1420 },
  { week: "W3", hours: 1380 },
  { week: "W4", hours: 1640 },
  { week: "W5", hours: 1520 },
  { week: "W6", hours: 1720 },
  { week: "W7", hours: 1680 },
  { week: "W8", hours: 1840 },
  { week: "W9", hours: 1780 },
  { week: "W10", hours: 1920 },
  { week: "W11", hours: 2040 },
  { week: "W12", hours: 2180 },
];

const timeAllocation = [
  { name: "Engineering", value: 38, color: "var(--chart-1)" },
  { name: "Design", value: 18, color: "var(--chart-2)" },
  { name: "Marketing", value: 16, color: "var(--chart-3)" },
  { name: "Research", value: 14, color: "var(--chart-4)" },
  { name: "Operations", value: 14, color: "var(--chart-5)" },
];

type Project = {
  name: string;
  client: string;
  clientInit: string;
  progress: number;
  status: "On Track" | "At Risk" | "Delayed" | "Completed";
  deadlineDays: number;
  tasksDone: number;
  tasksTotal: number;
  team: { initials: string; gradient: string }[];
  hoursSpark: { value: number }[];
  accent: string;
};

const projects: Project[] = [
  {
    name: "Mobile App v2.0", client: "Globex Inc", clientInit: "GI", progress: 78, status: "On Track",
    deadlineDays: 18, tasksDone: 47, tasksTotal: 60,
    team: [
      { initials: "SC", gradient: "from-chart-1 to-chart-2" },
      { initials: "ML", gradient: "from-chart-2 to-chart-3" },
      { initials: "PP", gradient: "from-chart-3 to-chart-4" },
      { initials: "DK", gradient: "from-chart-4 to-chart-5" },
    ],
    hoursSpark: [{ value: 32 }, { value: 38 }, { value: 44 }, { value: 41 }, { value: 48 }, { value: 52 }],
    accent: "var(--chart-1)",
  },
  {
    name: "Website Redesign", client: "Initech", clientInit: "IN", progress: 42, status: "At Risk",
    deadlineDays: 34, tasksDone: 18, tasksTotal: 42,
    team: [
      { initials: "ER", gradient: "from-chart-2 to-chart-3" },
      { initials: "JW", gradient: "from-chart-5 to-chart-6" },
      { initials: "AK", gradient: "from-chart-4 to-chart-5" },
    ],
    hoursSpark: [{ value: 24 }, { value: 28 }, { value: 22 }, { value: 30 }, { value: 26 }, { value: 34 }],
    accent: "var(--chart-2)",
  },
  {
    name: "API Platform Migration", client: "Umbrella Co", clientInit: "UC", progress: 88, status: "On Track",
    deadlineDays: 4, tasksDone: 71, tasksTotal: 80,
    team: [
      { initials: "DK", gradient: "from-chart-4 to-chart-5" },
      { initials: "SC", gradient: "from-chart-1 to-chart-2" },
      { initials: "NB", gradient: "from-chart-5 to-chart-6" },
      { initials: "TR", gradient: "from-chart-6 to-chart-1" },
    ],
    hoursSpark: [{ value: 52 }, { value: 56 }, { value: 62 }, { value: 58 }, { value: 64 }, { value: 68 }],
    accent: "var(--chart-3)",
  },
  {
    name: "Brand Refresh", client: "Stark Industries", clientInit: "SI", progress: 25, status: "Delayed",
    deadlineDays: 62, tasksDone: 8, tasksTotal: 32,
    team: [
      { initials: "PP", gradient: "from-chart-3 to-chart-4" },
      { initials: "AK", gradient: "from-chart-4 to-chart-5" },
    ],
    hoursSpark: [{ value: 12 }, { value: 16 }, { value: 14 }, { value: 18 }, { value: 16 }, { value: 22 }],
    accent: "var(--chart-4)",
  },
  {
    name: "Analytics Dashboard", client: "Wayne Ent", clientInit: "WE", progress: 96, status: "On Track",
    deadlineDays: 2, tasksDone: 48, tasksTotal: 50,
    team: [
      { initials: "SC", gradient: "from-chart-1 to-chart-2" },
      { initials: "ML", gradient: "from-chart-2 to-chart-3" },
      { initials: "ER", gradient: "from-chart-5 to-chart-6" },
    ],
    hoursSpark: [{ value: 48 }, { value: 52 }, { value: 58 }, { value: 64 }, { value: 68 }, { value: 72 }],
    accent: "var(--chart-5)",
  },
  {
    name: "Cloud Infrastructure", client: "Hooli", clientInit: "HO", progress: 64, status: "On Track",
    deadlineDays: 42, tasksDone: 32, tasksTotal: 50,
    team: [
      { initials: "DK", gradient: "from-chart-4 to-chart-5" },
      { initials: "NB", gradient: "from-chart-5 to-chart-6" },
      { initials: "TR", gradient: "from-chart-6 to-chart-1" },
      { initials: "JW", gradient: "from-chart-2 to-chart-3" },
    ],
    hoursSpark: [{ value: 36 }, { value: 42 }, { value: 38 }, { value: 46 }, { value: 44 }, { value: 50 }],
    accent: "var(--chart-6)",
  },
];

const teamWorkload = [
  { name: "Sarah Chen", initials: "SC", projects: 5, hours: 168, capacity: 84, gradient: "from-chart-1 to-chart-2" },
  { name: "Marcus Lee", initials: "ML", projects: 4, hours: 184, capacity: 92, gradient: "from-chart-2 to-chart-3" },
  { name: "Priya Patel", initials: "PP", projects: 6, hours: 192, capacity: 96, gradient: "from-chart-3 to-chart-4" },
  { name: "David Kim", initials: "DK", projects: 3, hours: 142, capacity: 71, gradient: "from-chart-4 to-chart-5" },
  { name: "Elena Rossi", initials: "ER", projects: 4, hours: 156, capacity: 78, gradient: "from-chart-5 to-chart-6" },
  { name: "James Wright", initials: "JW", projects: 2, hours: 108, capacity: 54, gradient: "from-chart-6 to-chart-1" },
];

const statusBadge: Record<Project["status"], string> = {
  "On Track": "bg-success/10 text-success border-success/20",
  "At Risk": "bg-warning/10 text-warning border-warning/20",
  "Delayed": "bg-destructive/10 text-destructive border-destructive/20",
  "Completed": "bg-info/10 text-info border-info/20",
};

function ProgressRing({ value, size = 64, stroke = 6, color }: { value: number; size?: number; stroke?: number; color: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold tabular-nums">{value}%</span>
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const deadlineTone =
    p.deadlineDays <= 4 ? "bg-destructive/10 text-destructive border-destructive/20" :
      p.deadlineDays <= 14 ? "bg-warning/10 text-warning border-warning/20" :
        "bg-muted text-muted-foreground border-border";
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="size-2 rounded-full" style={{ background: p.accent }} />
            <h4 className="text-sm font-semibold truncate">{p.name}</h4>
          </div>
          <div className="flex items-center gap-1.5">
            <Avatar className="size-4">
              <AvatarFallback className="text-[8px] bg-muted text-muted-foreground font-medium">{p.clientInit}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate">{p.client}</span>
          </div>
        </div>
        <Badge variant="outline" className={"px-1.5 py-0 text-[10px] shrink-0 " + statusBadge[p.status]}>{p.status}</Badge>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <ProgressRing value={p.progress} color={p.accent} />
        <div className="flex-1 space-y-1.5">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Tasks</p>
            <p className="text-sm font-semibold tabular-nums">
              {p.tasksDone}<span className="text-muted-foreground font-normal">/{p.tasksTotal}</span>
              <span className="ml-1.5 text-[10px] text-success">+{Math.round((p.tasksDone / p.tasksTotal) * 100) - p.progress > 0 ? Math.round((p.tasksDone / p.tasksTotal) * 100) - p.progress : 0}%</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Deadline</p>
            <Badge variant="outline" className={"px-1.5 py-0 text-[10px] " + deadlineTone}>
              <Clock className="size-2.5 mr-1" /> {p.deadlineDays}d left
            </Badge>
          </div>
        </div>
      </div>

      <div className="h-8 -mx-1 mb-3">
        <Sparkline data={p.hoursSpark} color={p.accent} height={32} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex -space-x-2">
          {p.team.slice(0, 4).map((m, i) => (
            <Avatar key={i} className="size-6 ring-2 ring-background">
              <AvatarFallback className={"text-[9px] font-semibold bg-gradient-to-br text-white " + m.gradient}>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
          {p.team.length > 4 && (
            <div className="flex size-6 items-center justify-center rounded-full ring-2 ring-background bg-muted text-[9px] font-semibold text-muted-foreground">
              +{p.team.length - 4}
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-[11px] px-2 text-muted-foreground hover:text-foreground">
          Open <ArrowRight className="size-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default function ProjectsDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Portfolio Dashboard"
        description="Card-driven portfolio view with progress rings, team capacity, and deadline visibility."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Projects" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Project</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Projects"
          value="42"
          delta={6}
          deltaLabel="vs last month"
          icon={<FolderKanban className="size-5" />}
          spark={<Sparkline data={[{ value: 32 }, { value: 34 }, { value: 36 }, { value: 38 }, { value: 40 }, { value: 42 }]} />}
        />
        <StatCard
          label="On Track"
          value="32"
          delta={4}
          deltaLabel="vs last month"
          icon={<CheckCircle2 className="size-5" />}
          spark={<Sparkline data={[{ value: 24 }, { value: 26 }, { value: 28 }, { value: 30 }, { value: 31 }, { value: 32 }]} color="var(--chart-2)" />}
        />
        <StatCard
          label="At Risk"
          value="7"
          delta={2}
          deltaLabel="vs last month"
          icon={<AlertTriangle className="size-5" />}
          spark={<Sparkline data={[{ value: 3 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 6 }, { value: 7 }]} color="var(--chart-3)" type="bar" />}
        />
        <StatCard
          label="Completed"
          value="18"
          delta={5}
          deltaLabel="vs last month"
          icon={<Trophy className="size-5" />}
          spark={<Sparkline data={[{ value: 8 }, { value: 10 }, { value: 12 }, { value: 13 }, { value: 15 }, { value: 18 }]} color="var(--chart-4)" />}
        />
      </div>

      <SectionCard
        title="Active Projects"
        description="Portfolio cards with progress rings, team, deadline & burn"
        actions={<CardMenuButton items={[{ label: "Board view" }, { label: "Timeline" }]} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Hours Logged"
          description="Trailing 12 weeks total"
          className="lg:col-span-7"
          actions={<CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />}
        >
          <AreaTrend
            data={hoursData}
            xKey="week"
            yKeys={[{ key: "hours", name: "Hours Logged", color: "var(--chart-1)" }]}
            height={260}
          />
        </SectionCard>

        <SectionCard
          title="Time Allocation"
          description="Hours by project type"
          className="lg:col-span-5"
          actions={<CardMenuButton items={[{ label: "View all" }]} />}
        >
          <DonutChart data={timeAllocation} centerValue="2,180" centerLabel="Hours / wk" height={260} />
        </SectionCard>
      </div>

      <SectionCard
        title="Team Workload"
        description="Capacity & billable hours per team member"
        className="lg:col-span-12"
        actions={<Button variant="ghost" size="sm" className="h-8 text-xs">Balance</Button>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Team Member</TableHead>
              <TableHead className="text-right">Active Projects</TableHead>
              <TableHead className="text-right">Hours Logged</TableHead>
              <TableHead className="text-right">Capacity</TableHead>
              <TableHead className="pr-5 text-right w-1/3">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamWorkload.map((m) => (
              <TableRow key={m.name} className="hover:bg-accent/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 ring-2 ring-background">
                      <AvatarFallback className={"text-[10px] font-semibold bg-gradient-to-br text-white " + m.gradient}>{m.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-tight">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">Active contributor</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm tabular-nums">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <FolderKanban className="size-3.5" /> {m.projects}
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm font-semibold tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-muted-foreground" /> {m.hours}h
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={
                    m.capacity >= 90 ? "text-xs font-semibold text-destructive tabular-nums" :
                      m.capacity >= 75 ? "text-xs font-semibold text-warning tabular-nums" :
                        "text-xs font-semibold text-success tabular-nums"
                  }>{m.capacity}%</span>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <div className="inline-flex items-center gap-2 w-full max-w-[260px]">
                    <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className={
                          m.capacity >= 90 ? "h-full bg-gradient-to-r from-destructive/80 to-destructive" :
                            m.capacity >= 75 ? "h-full bg-gradient-to-r from-warning/80 to-warning" :
                              "h-full bg-gradient-to-r from-success/80 to-success"
                        }
                        style={{ width: `${m.capacity}%` }}
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground w-12 justify-end">
                      <Gauge className="size-3" /> {m.capacity > 90 ? "Over" : m.capacity > 75 ? "High" : "OK"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Users className="size-3.5" /> 6 active team members</span>
          <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> 79% avg utilization · 1,284h logged</span>
        </div>
      </SectionCard>
    </div>
  );
}
