"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  KanbanSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Users,
  MoreHorizontal,
  Search,
  Check,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ProjectStatus = "on-track" | "at-risk" | "delayed" | "completed";
type TaskStatus = "todo" | "in-progress" | "review" | "done";

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  deadline: string;
  team: string[];
  tasksDone: number;
  tasksTotal: number;
}

interface Task {
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  status: TaskStatus;
  assignee: string;
  avatar: string;
  due: string;
}

const velocityData = [
  { sprint: "S1", planned: 32, completed: 28 },
  { sprint: "S2", planned: 38, completed: 36 },
  { sprint: "S3", planned: 42, completed: 38 },
  { sprint: "S4", planned: 40, completed: 42 },
  { sprint: "S5", planned: 44, completed: 40 },
  { sprint: "S6", planned: 48, completed: 46 },
];

const initialProjects: Project[] = [
  { id: "PRJ-001", name: "Mobile App Redesign", client: "Acme Corp", progress: 78, status: "on-track", deadline: "Jul 15", team: ["https://i.pravatar.cc/32?img=1", "https://i.pravatar.cc/32?img=2", "https://i.pravatar.cc/32?img=3"], tasksDone: 28, tasksTotal: 36 },
  { id: "PRJ-002", name: "Marketing Website", client: "Globex Inc", progress: 45, status: "at-risk", deadline: "Jul 20", team: ["https://i.pravatar.cc/32?img=4", "https://i.pravatar.cc/32?img=5"], tasksDone: 12, tasksTotal: 28 },
  { id: "PRJ-003", name: "API Platform v2", client: "Internal", progress: 92, status: "on-track", deadline: "Jul 10", team: ["https://i.pravatar.cc/32?img=6", "https://i.pravatar.cc/32?img=7", "https://i.pravatar.cc/32?img=8", "https://i.pravatar.cc/32?img=9"], tasksDone: 46, tasksTotal: 50 },
  { id: "PRJ-004", name: "Analytics Dashboard", client: "Initech", progress: 32, status: "delayed", deadline: "Jul 28", team: ["https://i.pravatar.cc/32?img=10", "https://i.pravatar.cc/32?img=11"], tasksDone: 8, tasksTotal: 24 },
  { id: "PRJ-005", name: "Brand Refresh", client: "Stark Ind.", progress: 100, status: "completed", deadline: "Jul 1", team: ["https://i.pravatar.cc/32?img=12"], tasksDone: 20, tasksTotal: 20 },
  { id: "PRJ-006", name: "Customer Portal", client: "Wayne Ent.", progress: 56, status: "at-risk", deadline: "Jul 22", team: ["https://i.pravatar.cc/32?img=13", "https://i.pravatar.cc/32?img=14"], tasksDone: 18, tasksTotal: 32 },
];

const initialTasks: Task[] = [
  { id: "TSK-1284", title: "Implement dark mode toggle", project: "Mobile App Redesign", priority: "high", status: "in-progress", assignee: "Alex K", avatar: "https://i.pravatar.cc/40?img=1", due: "Today" },
  { id: "TSK-1283", title: "Design landing page hero", project: "Marketing Website", priority: "medium", status: "review", assignee: "Riya P", avatar: "https://i.pravatar.cc/40?img=2", due: "Tomorrow" },
  { id: "TSK-1282", title: "Refactor auth middleware", project: "API Platform v2", priority: "high", status: "in-progress", assignee: "John D", avatar: "https://i.pravatar.cc/40?img=3", due: "Jul 4" },
  { id: "TSK-1281", title: "Wire up charts library", project: "Analytics Dashboard", priority: "low", status: "todo", assignee: "Nora L", avatar: "https://i.pravatar.cc/40?img=5", due: "Jul 6" },
  { id: "TSK-1280", title: "QA: form validation states", project: "Mobile App Redesign", priority: "medium", status: "review", assignee: "Mark P", avatar: "https://i.pravatar.cc/40?img=6", due: "Jul 5" },
  { id: "TSK-1279", title: "Build CI/CD pipeline", project: "API Platform v2", priority: "high", status: "done", assignee: "John D", avatar: "https://i.pravatar.cc/40?img=3", due: "Jul 1" },
  { id: "TSK-1278", title: "Style guide components", project: "Brand Refresh", priority: "medium", status: "done", assignee: "Riya P", avatar: "https://i.pravatar.cc/40?img=2", due: "Jun 28" },
  { id: "TSK-1277", title: "User research interviews", project: "Customer Portal", priority: "low", status: "todo", assignee: "Nora L", avatar: "https://i.pravatar.cc/40?img=5", due: "Jul 8" },
];

const teamMembers = [
  { name: "Alex Kim", role: "Lead Engineer", load: 92, avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Riya Patel", role: "Designer", load: 78, avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "John Davis", role: "Backend", load: 64, avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "Nora Lee", role: "Frontend", load: 88, avatar: "https://i.pravatar.cc/40?img=5" },
  { name: "Mark Park", role: "QA", load: 42, avatar: "https://i.pravatar.cc/40?img=6" },
];

const statusFilters: Array<"all" | ProjectStatus> = ["all", "on-track", "at-risk", "delayed", "completed"];

const projectStatusVariant: Record<ProjectStatus, "info" | "warning" | "error" | "success"> = {
  "on-track": "info",
  "at-risk": "warning",
  delayed: "error",
  completed: "success",
};

const priorityColors: Record<string, "error" | "warning" | "info"> = {
  high: "error",
  medium: "warning",
  low: "info",
};

export function ProjectsDashboard() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = React.useState<"all" | ProjectStatus>("all");
  const [search, setSearch] = React.useState("");
  const [taskTab, setTaskTab] = React.useState<TaskStatus | "all">("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", project: "Mobile App Redesign", priority: "medium", assignee: "Alex K", due: "" });

  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.client.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredTasks = tasks.filter((t) => (taskTab === "all" ? true : t.status === taskTab));

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const counts = {
    all: projects.length,
    "on-track": projects.filter((p) => p.status === "on-track").length,
    "at-risk": projects.filter((p) => p.status === "at-risk").length,
    delayed: projects.filter((p) => p.status === "delayed").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  const handleCreateTask = () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    const newTask: Task = {
      id: `TSK-${String(1285 + tasks.length).padStart(4, "0")}`,
      title: form.title,
      project: form.project,
      priority: form.priority as Task["priority"],
      status: "todo",
      assignee: form.assignee,
      avatar: `https://i.pravatar.cc/40?u=${form.assignee}`,
      due: form.due || "Today",
    };
    setTasks([newTask, ...tasks]);
    toast.success(`Task "${form.title}" created`);
    setForm({ title: "", project: "Mobile App Redesign", priority: "medium", assignee: "Alex K", due: "" });
    setModalOpen(false);
  };

  const advanceTask = (id: string) => {
    const order: TaskStatus[] = ["todo", "in-progress", "review", "done"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = order[Math.min(order.indexOf(t.status) + 1, order.length - 1)];
        toast.success(`Task moved to ${next}`);
        return { ...t, status: next };
      })
    );
  };

  return (
    <div>
      <PageHeader
        title="Project Workspace"
        description="Track active projects, manage tasks, and monitor team velocity across all initiatives."
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Filter className="h-4 w-4" /> Filter <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Exporting project report...")}>Export Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Opening archived projects...")}>View Archived</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Opening team settings...")}>Team Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Task
            </Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Projects", value: "12", change: 3, trend: "up" as const, icon: KanbanSquare, subtitle: "4 due this month", color: "text-brand-500" },
          { title: "Tasks Completed", value: "284", change: 18.4, trend: "up" as const, icon: CheckCircle2, subtitle: "This week", color: "text-success-500" },
          { title: "In Progress", value: "42", change: -4.2, trend: "down" as const, icon: Clock, subtitle: "8 due soon", color: "text-blue-light-500" },
          { title: "Blocked", value: "6", change: 2, trend: "up" as const, icon: AlertCircle, subtitle: "Needs attention", color: "text-warning-500" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</span>
                <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">{kpi.value}</h4>
                {kpi.subtitle && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{kpi.subtitle}</p>}
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium ${
                  kpi.trend === "up"
                    ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                    : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                }`}
              >
                {kpi.trend === "up" ? "↑" : "↓"} {Math.abs(kpi.change)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Team Velocity</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Planned vs completed story points per sprint</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f2f4f7" }} />
                <Bar dataKey="planned" fill="#e4e7ec" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="completed" fill="#465fff" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Burndown</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sprint progress trajectory</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false} />
                <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="planned" stroke="#98a2b3" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="completed" stroke="#465fff" strokeWidth={2.5} dot={{ r: 3, fill: "#465fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects + Team Load */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Projects list */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Active Projects</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Progress and team allocation</p>
            </div>
            <div className="relative w-44 sm:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="h-9 pl-9" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-5 dark:px-6">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); toast.info(`Filtered: ${s === "all" ? "All projects" : s}`); }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                  statusFilter === s
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {s === "all" ? "All" : s.replace("-", " ")} <span className="ml-1 opacity-70">({counts[s]})</span>
              </button>
            ))}
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 p-5 transition hover:bg-gray-50 dark:hover:bg-white/[0.02] dark:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white/90">{p.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.client} · Due {p.deadline}</p>
                      </div>
                      <StatusBadge variant={projectStatusVariant[p.status]} dot>
                        {p.status.replace("-", " ")}
                      </StatusBadge>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">{p.tasksDone} / {p.tasksTotal} tasks</span>
                          <span className="font-bold text-gray-800 dark:text-white/90">{p.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.progress}%` }}
                            transition={{ duration: 0.8, delay: i * 0.04 }}
                            className={`h-full rounded-full ${
                              p.progress > 90 ? "bg-success-500" : p.progress > 60 ? "bg-brand-500" : p.progress > 30 ? "bg-warning-500" : "bg-error-500"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {p.team.map((a, idx) => (
                          <Avatar key={idx} className="h-7 w-7 border-2 border-white dark:border-gray-900">
                            <AvatarImage src={a} />
                            <AvatarFallback className="text-[10px]">U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>{p.id}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Opening "${p.name}"`)}>
                            <ArrowRight className="h-4 w-4" /> Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing "${p.name}"`)}>
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setProjects((prev) => prev.filter((x) => x.id !== p.id));
                              toast.success(`Project "${p.name}" removed`);
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-sm text-gray-400">
                <KanbanSquare className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                No projects match your filters
              </div>
            )}
          </div>
        </div>

        {/* Team Load */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Team Load</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Current allocation</p>
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {teamMembers.map((m, i) => (
              <motion.button
                key={m.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toast.info(`${m.name}: ${m.load}% allocated — click to view tasks`)}
                className="block w-full text-left"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={m.avatar} />
                    <AvatarFallback className="text-[10px]">{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-800 dark:text-white/90">{m.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{m.role}</p>
                  </div>
                  <span className={`text-xs font-bold ${m.load > 85 ? "text-error-500" : m.load > 70 ? "text-warning-500" : "text-success-500"}`}>
                    {m.load}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.load}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className={`h-full rounded-full ${m.load > 85 ? "bg-error-500" : m.load > 70 ? "bg-warning-500" : "bg-success-500"}`}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Queue with Tabs */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-100 p-5 dark:border-gray-800 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Task Queue</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Filter tasks by status</p>
          <Tabs value={taskTab} onValueChange={(v) => setTaskTab(v as TaskStatus | "all")} className="mt-4">
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">All ({taskCounts.all})</TabsTrigger>
              <TabsTrigger value="todo">Todo ({taskCounts.todo})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({taskCounts["in-progress"]})</TabsTrigger>
              <TabsTrigger value="review">Review ({taskCounts.review})</TabsTrigger>
              <TabsTrigger value="done">Done ({taskCounts.done})</TabsTrigger>
            </TabsList>
            <TabsContent value={taskTab} className="mt-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-brand-500">{t.id}</span>
                        <StatusBadge variant={priorityColors[t.priority]}>{t.priority}</StatusBadge>
                        <span className="ml-auto text-xs text-gray-400">{t.due}</span>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-gray-800 dark:text-white/90">{t.title}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{t.project}</span>
                        <div className="flex items-center gap-2">
                          <StatusBadge variant={t.status === "done" ? "success" : t.status === "review" ? "warning" : t.status === "in-progress" ? "info" : "neutral"}>
                            {t.status}
                          </StatusBadge>
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="text-[9px]">{t.assignee[0]}</AvatarFallback>
                          </Avatar>
                          <button
                            onClick={() => advanceTask(t.id)}
                            disabled={t.status === "done"}
                            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-brand-500 disabled:opacity-30 dark:hover:bg-gray-800"
                            title="Advance status"
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 p-12 text-center text-sm text-gray-400">
                    <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    No tasks in this category
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* New Task Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create a new task and assign it to a team member.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Task Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Implement dark mode toggle"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Project</Label>
                <select
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {projects.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Assignee</Label>
                <select
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {teamMembers.map((m) => (
                    <option key={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Priority</Label>
                <div className="mt-1.5 flex gap-2">
                  {(["low", "medium", "high"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-medium capitalize transition ${
                        form.priority === p
                          ? p === "high"
                            ? "border-error-500 bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                            : p === "medium"
                            ? "border-warning-500-500 bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
                            : "border-blue-light-500 bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15"
                          : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="mt-1.5" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateTask} className="gap-1.5">
              <Check className="h-4 w-4" /> Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
