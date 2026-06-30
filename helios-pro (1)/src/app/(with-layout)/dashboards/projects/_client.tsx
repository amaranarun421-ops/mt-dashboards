"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  KanbanIcon,
  CheckSquareIcon,
  UsersIcon,
  AlertIcon,
} from "@/components/Layouts/sidebar/icons";

type Column = "Backlog" | "In Progress" | "Review" | "Done";
type ProjectCard = {
  id: string;
  title: string;
  column: Column;
  priority: "low" | "medium" | "high" | "urgent";
  assignees: string[];
  due: string;
  progress: number;
};

const cards: ProjectCard[] = [
  { id: "T-401", title: "Migrate billing to Stripe v3", column: "In Progress", priority: "high", assignees: ["Aarav Sharma", "Priya Patel"], due: "Jan 24", progress: 62 },
  { id: "T-402", title: "Mobile onboarding redesign", column: "In Progress", priority: "urgent", assignees: ["Sofia Mendes"], due: "Jan 22", progress: 48 },
  { id: "T-403", title: "Q1 security audit", column: "Review", priority: "high", assignees: ["Daniel Chen", "Yuki Tanaka"], due: "Jan 28", progress: 88 },
  { id: "T-404", title: "Marketing site v4 launch", column: "Review", priority: "medium", assignees: ["Emma Reyes"], due: "Jan 30", progress: 74 },
  { id: "T-405", title: "Customer analytics v2", column: "Backlog", priority: "medium", assignees: ["Liam Walsh"], due: "Feb 06", progress: 12 },
  { id: "T-406", title: "AI inference cost refactor", column: "Backlog", priority: "low", assignees: ["Marcus Bell", "Noah Kim"], due: "Feb 12", progress: 5 },
  { id: "T-407", title: "SSO + SCIM provisioning", column: "Done", priority: "high", assignees: ["Daniel Chen"], due: "Jan 18", progress: 100 },
  { id: "T-408", title: "Help center search", column: "Done", priority: "low", assignees: ["Layla Hassan"], due: "Jan 16", progress: 100 },
];

const columns: { key: Column; tone: "neutral" | "info" | "accent" | "success" }[] = [
  { key: "Backlog", tone: "neutral" },
  { key: "In Progress", tone: "info" },
  { key: "Review", tone: "accent" },
  { key: "Done", tone: "success" },
];

const priorityVariant = {
  low: "neutral",
  medium: "info",
  high: "accent",
  urgent: "danger",
} as const;

const activity = [
  { id: "a1", user: "Aarav Sharma", action: "moved task", target: "T-401 → In Progress", time: "8 min ago", tone: "info" as const },
  { id: "a2", user: "Daniel Chen", action: "closed", target: "T-407 SSO + SCIM", time: "1 hr ago", tone: "success" as const },
  { id: "a3", user: "Sofia Mendes", action: "uploaded design for", target: "T-402 Onboarding", time: "3 hr ago", tone: "violet" as const },
  { id: "a4", user: "Layla Hassan", action: "commented on", target: "T-408 Help search", time: "Yesterday", tone: "primary" as const },
  { id: "a5", user: "Marcus Bell", action: "flagged risk on", target: "T-406 AI refactor", time: "Yesterday", tone: "danger" as const },
];

const teamLoad = [
  { name: "Aarav Sharma", load: 88 },
  { name: "Priya Patel", load: 72 },
  { name: "Daniel Chen", load: 64 },
  { name: "Sofia Mendes", load: 94 },
  { name: "Liam Walsh", load: 42 },
];

export default function ProjectsDashboard() {
  return (
    <div>
      <PageHeader
        title="Projects Dashboard"
        description="Active sprints, team capacity and burndown across the Helios Pro engineering org."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Projects" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Sprint 24</Button>
            <Button variant="primary" size="sm">+ New project</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Projects" value="18" delta={{ value: "+3", trend: "up" }} icon={<KanbanIcon className="size-5" />} tone="primary" sublabel="across 4 teams" />
        <StatCard label="Tasks Completed" value="284" delta={{ value: "+18.2%", trend: "up" }} icon={<CheckSquareIcon className="size-5" />} tone="accent" sublabel="this sprint" />
        <StatCard label="At-Risk" value="6" delta={{ value: "+2", trend: "up" }} icon={<AlertIcon className="size-5" />} tone="rose" sublabel="need attention" />
        <StatCard label="Team Utilization" value="78%" delta={{ value: "+4.1%", trend: "up" }} icon={<UsersIcon className="size-5" />} tone="violet" sublabel="22 contributors" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <Card className="col-span-12">
          <CardHeader
            title="Sprint Kanban"
            subtitle="Sprint 24 — 8 of 64 tasks shown"
            action={<Badge variant="primary" size="sm">Live</Badge>}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((col) => {
              const items = cards.filter((c) => c.column === col.key);
              return (
                <div key={col.key} className="rounded-xl border border-stroke bg-gray-2/40 p-3 dark:border-dark-3 dark:bg-white/[0.02]">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-current text-dark-5 dark:text-dark-6" />
                      <span className="text-sm font-semibold text-dark dark:text-white">{col.key}</span>
                    </div>
                    <Badge variant={col.tone} size="sm">{items.length}</Badge>
                  </div>
                  <ul className="space-y-3">
                    {items.map((c) => (
                      <li key={c.id} className="rounded-xl border border-stroke bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{c.id}</span>
                          <Badge variant={priorityVariant[c.priority]} size="sm">{c.priority}</Badge>
                        </div>
                        <p className="mt-2 text-sm font-medium text-dark dark:text-white">{c.title}</p>
                        <div className="mt-3">
                          <Progress value={c.progress} tone={c.progress === 100 ? "success" : c.progress > 60 ? "primary" : "accent"} size="xs" />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <AvatarGroup names={c.assignees} max={2} size="xs" />
                          <span className="text-xs text-dark-5 dark:text-dark-6">Due {c.due}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Card>

        <ChartCard
          title="Sprint Burndown"
          subtitle="Ideal vs. actual remaining story points"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">On track</Badge>}
        >
          <HeliosChart
            type="line"
            height={300}
            options={{
              xaxis: { categories: Array.from({ length: 14 }, (_, i) => `D${i + 1}`) },
              stroke: { curve: "straight", width: 2, dashArray: [0, 6] },
              markers: { size: 3 },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `${v}pt` } },
              colors: ["#10b981", "#94a3b8"],
            }}
            series={[
              { name: "Actual", data: [180, 168, 162, 150, 138, 124, 112, 102, 88, 74, 62, 48, 36, 22] },
              { name: "Ideal", data: [180, 167, 154, 141, 128, 115, 102, 89, 76, 64, 51, 38, 25, 12] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Team Load" subtitle="Capacity this sprint" action={<Badge variant="warning" size="sm">2 over</Badge>} />
          <ul className="space-y-4">
            {teamLoad.map((m) => (
              <li key={m.name}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={m.name} size="sm" />
                    <span className="text-sm font-medium text-dark dark:text-white">{m.name}</span>
                  </div>
                  <span className={`text-xs font-semibold ${m.load > 90 ? "text-red dark:text-red-light" : m.load > 70 ? "text-accent-dark dark:text-accent-light" : "text-primary dark:text-primary-light"}`}>
                    {m.load}%
                  </span>
                </div>
                <Progress className="mt-2" value={m.load} tone={m.load > 90 ? "danger" : m.load > 70 ? "accent" : "primary"} size="xs" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-12">
          <CardHeader title="Recent Activity" subtitle="Cross-team task updates" />
          <ActivityFeed items={activity} />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Projects" }]} />
      </div>
    </div>
  );
}