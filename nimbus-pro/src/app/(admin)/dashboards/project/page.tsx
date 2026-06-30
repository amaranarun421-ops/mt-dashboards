"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar, AvatarGroup, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { PROJECTS, CALENDAR_EVENTS } from "@/data/mock";
import {
  FolderKanban, CheckCircle2, AlertTriangle, Zap, Plus, Download, ArrowUpRight,
  Calendar, Clock, GitBranch, MessageSquare, CheckCheck, Circle, Loader, Eye
} from "lucide-react";

const TASK_DIST = [
  { name: "To Do", value: 48, color: "#94a3b8" },
  { name: "In Progress", value: 32, color: "#f59e0b" },
  { name: "Review", value: 18, color: "#8b5cf6" },
  { name: "Done", value: 124, color: "#10b981" },
];

const TEAM_WORKLOAD = [
  { name: "Aaroh Sharma", active: 12, capacity: 16, projects: 3 },
  { name: "Priya Iyer", active: 9, capacity: 14, projects: 2 },
  { name: "Marcus Chen", active: 14, capacity: 12, projects: 2 },
  { name: "Sofia García", active: 7, capacity: 14, projects: 2 },
  { name: "Yuki Tanaka", active: 11, capacity: 12, projects: 3 },
  { name: "Leo Romano", active: 4, capacity: 10, projects: 1 },
];

const statusTone = (s: string) =>
  s === "on_track" ? "success" : s === "at_risk" ? "warning" : "error";

const statusLabel = (s: string) =>
  s === "on_track" ? "On Track" : s === "at_risk" ? "At Risk" : "Off Track";

const PROJECT_ACTIVITIES = [
  { user: "Priya Iyer", action: "completed task", target: "Optimize data tables", project: "Nimbus Pro v3.0", time: "12m ago", icon: CheckCheck },
  { user: "Sofia García", action: "opened PR", target: "#824 AI widgets", project: "AI Insights Module", time: "1h ago", icon: GitBranch },
  { user: "Yuki Tanaka", action: "commented on", target: "Fix flaky e2e tests", project: "Mobile App Refresh", time: "2h ago", icon: MessageSquare },
  { user: "Marcus Chen", action: "moved task to Review", target: "Enterprise SSO flow", project: "Enterprise SSO", time: "3h ago", icon: Eye },
  { user: "Aaroh Sharma", action: "created milestone", target: "v3.0 RC cut", project: "Nimbus Pro v3.0", time: "5h ago", icon: Calendar },
];

export default function ProjectDashboard() {
  const taskDistOptions = {
    ...baseChartOptions("donut"),
    labels: TASK_DIST.map((t) => t.name),
    colors: TASK_DIST.map((t) => t.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "72%", labels: { show: true, total: { show: true, label: "Tasks", formatter: () => "222" } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v} tasks` } },
  };

  // For Gantt-style horizontal bars — we render manually rather than with chart lib to keep full control.

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Management Dashboard"
        description="Active projects, team velocity, milestones, and task distribution."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Projects" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Project</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Projects" value="12" delta="+2" deltaTone="up" icon={FolderKanban} iconTone="brand" footer="3 closing this week" />
        <StatCard label="Tasks Completed" value="124" delta="+18.4%" deltaTone="up" icon={CheckCircle2} iconTone="success" footer="this week" />
        <StatCard label="Overdue Tasks" value="9" delta="+3" deltaTone="down" icon={AlertTriangle} iconTone="error" footer="needs attention" />
        <StatCard label="Team Velocity" value="42 pts/wk" delta="+6.5%" deltaTone="up" icon={Zap} iconTone="purple" footer="avg per sprint" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Project Timelines"
            description="Gantt-style progress with due dates and team assignments"
            action={<Badge tone="brand" variant="soft">4 active</Badge>}
          />
          <CardBody className="space-y-5">
            {PROJECTS.map((p) => (
              <div key={p.id} className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                      <FolderKanban className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Lead: {p.lead} · {p.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={statusTone(p.status)} variant="soft" dot>{statusLabel(p.status)}</Badge>
                    <Badge tone="gray" variant="soft"><Clock className="h-3 w-3" /> Due {p.due}</Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{p.done}/{p.tasks} tasks complete</span>
                    <span className="font-bold text-gray-900 dark:text-white">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} tone={p.status === "on_track" ? "brand" : p.status === "at_risk" ? "warning" : "error"} size="lg" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <AvatarGroup users={p.team.map((t) => ({ name: t }))} max={4} size={26} />
                  <Button variant="ghost" size="sm">Open <ArrowUpRight className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Task Distribution" description="All tasks by status" />
          <CardBody>
            <NimbusChart options={taskDistOptions} series={TASK_DIST.map((t) => t.value)} type="donut" height={260} />
            <div className="mt-4 space-y-2">
              {TASK_DIST.map((t) => {
                const icon = t.name === "To Do" ? Circle : t.name === "In Progress" ? Loader : t.name === "Review" ? Eye : CheckCheck;
                const Icon = icon;
                return (
                  <div key={t.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Icon className="h-4 w-4" style={{ color: t.color }} />
                      {t.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{t.value}</span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Team Workload"
            description="Active tasks vs capacity — flag overloaded members"
            action={<Badge tone="warning" variant="soft">1 overloaded</Badge>}
          />
          <CardBody className="space-y-4">
            {TEAM_WORKLOAD.map((m) => {
              const pct = Math.round((m.active / m.capacity) * 100);
              const over = m.active > m.capacity;
              return (
                <div key={m.name} className="flex items-center gap-3">
                  <Avatar name={m.name} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{m.name}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{m.projects} projects</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Progress value={pct} size="sm" className="flex-1" tone={over ? "error" : pct > 80 ? "warning" : "brand"} />
                      <span className={`text-xs font-bold ${over ? "text-error-600 dark:text-error-400" : "text-gray-700 dark:text-gray-300"}`}>
                        {m.active}/{m.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Project Activity" description="Latest team updates" />
          <CardBody className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {PROJECT_ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">{a.user}</span> {a.action}{" "}
                    <span className="font-medium text-brand-600 dark:text-brand-400">{a.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{a.project} · {a.time}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Upcoming Milestones"
          description="Vertical timeline of next key dates"
          action={<Button variant="ghost" size="sm">Calendar <Calendar className="h-3 w-3" /></Button>}
        />
        <CardBody>
          <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gray-200 dark:before:bg-gray-700">
            {CALENDAR_EVENTS.map((e) => {
              const toneClass: Record<string, string> = {
                brand: "bg-brand-500",
                purple: "bg-purple-500",
                warning: "bg-warning-500",
                success: "bg-success-500",
                pink: "bg-pink-500",
                orange: "bg-orange-500",
              };
              const badgeTone = e.tone as "brand" | "purple" | "warning" | "success" | "pink" | "orange";
              return (
                <div key={e.id} className="relative flex items-start gap-4 pl-10">
                  <span className={`absolute left-2 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900 ${toneClass[e.tone]}`} />
                  <div className="flex-1 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{e.title}</p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {e.date} · {e.start} – {e.end}
                        </p>
                      </div>
                      <Badge tone={badgeTone} variant="soft">Scheduled</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
