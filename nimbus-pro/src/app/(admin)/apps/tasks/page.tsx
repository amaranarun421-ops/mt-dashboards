"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, Button, IconButton, Avatar, SearchInput, Tabs, Checkbox, Progress } from "@/components/ui";
import { TASKS_LIST, PROJECTS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Filter, Calendar, MoreHorizontal, Inbox, CheckCircle2, Clock, CalendarDays,
  FolderKanban, Star, ChevronDown, GripVertical, Tags
} from "lucide-react";

const PRIORITY_TONE: Record<string, "error" | "warning" | "brand" | "gray"> = {
  high: "error",
  medium: "warning",
  low: "gray",
};

const TAG_BG: Record<string, string> = {
  frontend: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  backend: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
  auth: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-300",
  docs: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-300",
  qa: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  research: "bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
};

const PROJECT_COLOR: Record<string, string> = {
  "Nimbus Pro v3.0": "bg-brand-500",
  "AI Insights Module": "bg-purple-500",
  "Mobile App Refresh": "bg-pink-500",
  "Enterprise SSO": "bg-warning-500",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(TASKS_LIST);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");

  const toggleDone = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t)));
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const id = `t${Date.now()}`;
    setTasks((prev) => [
      { id, title: text, priority: "medium", status: "todo", due: "Today", assignee: "Aaroh Sharma", project: "Nimbus Pro v3.0", tags: ["frontend"] },
      ...prev,
    ]);
    setNewTask("");
  };

  const counts = {
    all: tasks.length,
    mine: tasks.filter((t) => t.assignee === "Aaroh Sharma").length,
    today: tasks.filter((t) => t.due === "Today").length,
    upcoming: tasks.filter((t) => !["Today", "Yesterday"].includes(t.due)).length,
    completed: tasks.filter((t) => t.status === "done").length,
  };

  const visible = tasks.filter((t) => {
    const matchesSearch = !search.trim() ? true : t.title.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      tab === "all" ? true :
      tab === "mine" ? t.assignee === "Aaroh Sharma" :
      tab === "today" ? t.due === "Today" :
      tab === "upcoming" ? !["Today", "Yesterday"].includes(t.due) :
      tab === "completed" ? t.status === "done" : true;
    return matchesSearch && matchesTab;
  });

  const completionPct = Math.round((counts.completed / counts.all) * 100);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Tasks"
        description="Track everything on your plate — organized by project and priority."
        breadcrumbs={[{ label: "Apps" }, { label: "Tasks" }]}
        actions={
          <>
            <Button variant="secondary"><Filter className="h-4 w-4" /> Filter</Button>
            <Button><Plus className="h-4 w-4" /> New task</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Projects</p>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-2.5 rounded-lg bg-brand-50 px-2.5 py-2 text-sm font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                <FolderKanban className="h-4 w-4" />
                <span className="flex-1 text-left">All Projects</span>
                <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{tasks.length}</span>
              </button>
              {PROJECTS.map((p) => {
                const count = tasks.filter((t) => t.project === p.name).length;
                return (
                  <button key={p.id} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                    <span className={cn("h-2 w-2 rounded-full", PROJECT_COLOR[p.name] ?? "bg-gray-400")} />
                    <span className="flex-1 truncate text-left">{p.name}</span>
                    <span className="text-[10px] font-bold text-gray-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {["frontend", "backend", "auth", "docs", "qa", "research"].map((t) => (
                <span key={t} className={cn("rounded-md px-2 py-1 text-[11px] font-semibold capitalize", TAG_BG[t] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300")}>
                  {t}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Completion</p>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{completionPct}%</span>
            </div>
            <Progress value={completionPct} className="mt-2" tone="brand" />
            <p className="mt-2 text-[11px] text-gray-500">{counts.completed} of {counts.all} tasks done</p>
          </Card>
        </aside>

        {/* Main */}
        <div className="space-y-4">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: "all", label: "All", icon: Inbox, count: counts.all },
              { value: "mine", label: "My Tasks", icon: Star, count: counts.mine },
              { value: "today", label: "Today", icon: Clock, count: counts.today },
              { value: "upcoming", label: "Upcoming", icon: CalendarDays, count: counts.upcoming },
              { value: "completed", label: "Completed", icon: CheckCircle2, count: counts.completed },
            ]}
          />

          <Card className="p-0">
            {/* Add task input */}
            <div className="flex items-center gap-2 border-b border-gray-100 p-3 dark:border-gray-800">
              <div className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600" />
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
                placeholder="Add a task and press Enter..."
                className="flex-1 border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-300"
              />
              <Button size="sm" onClick={addTask}><Plus className="h-3.5 w-3.5" /> Add</Button>
            </div>

            {/* Search */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 p-3 dark:border-gray-800">
              <SearchInput value={search} onChange={setSearch} placeholder="Search tasks..." className="flex-1 sm:max-w-xs" />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">Priority <ChevronDown className="h-3 w-3" /></Button>
                <Button variant="ghost" size="sm">Due <ChevronDown className="h-3 w-3" /></Button>
              </div>
            </div>

            {/* Tasks list */}
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {visible.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                  <Inbox className="h-6 w-6 text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">No tasks here</p>
                  <p className="text-xs text-gray-400">Try a different filter or add a new task.</p>
                </div>
              ) : (
                visible.map((t) => {
                  const done = t.status === "done";
                  return (
                    <div key={t.id} className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-gray-300 opacity-0 group-hover:opacity-100" />
                      <Checkbox checked={done} onChange={() => toggleDone(t.id)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm font-medium", done ? "text-gray-400 line-through dark:text-gray-500" : "text-gray-900 dark:text-white")}>
                            {t.title}
                          </p>
                          {!done && t.status === "in_progress" && (
                            <Badge tone="warning" variant="soft" className="text-[10px]">In progress</Badge>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className={cn("h-1.5 w-1.5 rounded-full", PROJECT_COLOR[t.project] ?? "bg-gray-400")} />
                            {t.project}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {t.due}</span>
                          {t.tags.map((tag) => (
                            <span key={tag} className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold capitalize", TAG_BG[tag] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300")}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Badge tone={PRIORITY_TONE[t.priority]} variant="soft" className="hidden capitalize sm:inline-flex">{t.priority}</Badge>
                      <Avatar name={t.assignee} size={26} />
                      <IconButton aria-label="More" className="h-8 w-8 opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></IconButton>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 p-3 dark:border-gray-800">
              <p className="text-xs text-gray-500">{visible.length} tasks · {visible.filter((t) => t.status !== "done").length} pending</p>
              <Button variant="ghost" size="sm"><Tags className="h-3.5 w-3.5" /> Bulk edit</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
