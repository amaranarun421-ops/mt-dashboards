"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, Search, Calendar, Flag, MoreVertical, CheckCircle2, Circle, Clock,
  ListTodo, Star, Inbox, CalendarDays, CheckSquare, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Task = {
  id: number; title: string; completed: boolean; priority: "low" | "medium" | "high" | "urgent";
  due: string; dueGroup: "today" | "tomorrow" | "this-week" | "next-week" | "overdue";
  project: string; projectColor: string; assignee: string; assigneeColor: string;
  tags: string[]; subtasks?: { done: number; total: number };
};

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info border-info/20",
  high: "bg-warning/10 text-warning border-warning/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

const projects: Record<string, string> = {
  "MTVerse 2.0": "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Marketing: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Engineering: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Customer: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Internal: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const people: Record<string, string> = {
  AM: "bg-primary/15 text-primary",
  MH: "bg-emerald-500/15 text-emerald-600",
  SC: "bg-rose-500/15 text-rose-600",
  JR: "bg-sky-500/15 text-sky-600",
  PS: "bg-amber-500/15 text-amber-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
  DK: "bg-violet-500/15 text-violet-600",
};

const initialTasks: Task[] = [
  { id: 1, title: "Finalize Q4 OKR draft and circulate to leadership", completed: false, priority: "urgent", due: "Today", dueGroup: "today", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Strategy"], subtasks: { done: 4, total: 6 } },
  { id: 2, title: "Review Sarah's sidebar wireframes and leave comments", completed: false, priority: "high", due: "Today", dueGroup: "today", project: "MTVerse 2.0", projectColor: projects["MTVerse 2.0"], assignee: "AM", assigneeColor: people.AM, tags: ["Design"] },
  { id: 3, title: "Approve marketing launch timeline", completed: false, priority: "high", due: "Today", dueGroup: "today", project: "Marketing", projectColor: projects.Marketing, assignee: "AM", assigneeColor: people.AM, tags: ["Sign-off"] },
  { id: 4, title: "1:1 with Marcus — career growth conversation", completed: true, priority: "medium", due: "Today", dueGroup: "today", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["People"] },
  { id: 5, title: "Send Acme Corp proposal revision", completed: false, priority: "high", due: "Tomorrow", dueGroup: "tomorrow", project: "Customer", projectColor: projects.Customer, assignee: "AM", assigneeColor: people.AM, tags: ["Sales"], subtasks: { done: 2, total: 3 } },
  { id: 6, title: "Prep board deck for Oct 7 meeting", completed: false, priority: "urgent", due: "Thu", dueGroup: "this-week", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Board"] },
  { id: 7, title: "Review PR #2841 — OAuth2 PKCE flow", completed: false, priority: "medium", due: "Fri", dueGroup: "this-week", project: "Engineering", projectColor: projects.Engineering, assignee: "MH", assigneeColor: people.MH, tags: ["Code review"] },
  { id: 8, title: "Hiring loop: Senior PD take-home review", completed: false, priority: "medium", due: "Fri", dueGroup: "this-week", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Hiring"] },
  { id: 9, title: "Customer interview synthesis (12 sessions)", completed: false, priority: "medium", due: "Next Mon", dueGroup: "next-week", project: "Customer", projectColor: projects.Customer, assignee: "LP", assigneeColor: people.LP, tags: ["Research"], subtasks: { done: 6, total: 12 } },
  { id: 10, title: "Quarterly self-review write-up", completed: false, priority: "low", due: "Next Mon", dueGroup: "next-week", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Review"] },
  { id: 11, title: "Plan design system v2 token migration", completed: false, priority: "medium", due: "Next Tue", dueGroup: "next-week", project: "MTVerse 2.0", projectColor: projects["MTVerse 2.0"], assignee: "SC", assigneeColor: people.SC, tags: ["Design system"] },
  { id: 12, title: "Audit log S3 export — verify retention policy", completed: false, priority: "high", due: "Next Wed", dueGroup: "next-week", project: "Engineering", projectColor: projects.Engineering, assignee: "DK", assigneeColor: people.DK, tags: ["Compliance"] },
  { id: 13, title: "Ship invoice PDF generator v2 to production", completed: true, priority: "high", due: "Yesterday", dueGroup: "today", project: "MTVerse 2.0", projectColor: projects["MTVerse 2.0"], assignee: "MH", assigneeColor: people.MH, tags: ["Release"] },
  { id: 14, title: "Sprint 24 retro action items — assign owners", completed: true, priority: "medium", due: "2 days ago", dueGroup: "today", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Process"] },
  { id: 15, title: "Update hiring rubric for Senior PD role", completed: true, priority: "low", due: "3 days ago", dueGroup: "today", project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: ["Hiring"] },
];

export default function TasksApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState<"project" | "due">("due");
  const [newTitle, setNewTitle] = useState("");

  const filtered = tasks.filter((t) => {
    if (query && !t.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter === "today") return t.dueGroup === "today" || t.dueGroup === "overdue";
    if (filter === "upcoming") return ["tomorrow", "this-week", "next-week"].includes(t.dueGroup);
    if (filter === "completed") return t.completed;
    return true;
  });

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
    const t = tasks.find((x) => x.id === id);
    if (t) toast.message(t.completed ? "Marked incomplete" : "Task completed", { description: t.title });
  };

  const addTask = () => {
    const title = newTitle.trim();
    if (!title) return;
    const t: Task = {
      id: Date.now(), title, completed: false, priority: "medium", due: "Today", dueGroup: "today",
      project: "Internal", projectColor: projects.Internal, assignee: "AM", assigneeColor: people.AM, tags: [],
    };
    setTasks([t, ...tasks]);
    setNewTitle("");
    toast.success("Task added");
  };

  const groups: Record<string, Task[]> = {};
  filtered.forEach((t) => {
    const key = groupBy === "project" ? t.project : t.dueGroup;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  const groupOrder = groupBy === "project"
    ? Object.keys(projects)
    : ["today", "tomorrow", "this-week", "next-week", "overdue"];
  const groupLabels: Record<string, string> = {
    today: "Today", tomorrow: "Tomorrow", "this-week": "This Week", "next-week": "Next Week", overdue: "Overdue",
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    today: tasks.filter((t) => !t.completed && (t.dueGroup === "today" || t.dueGroup === "overdue")).length,
    upcoming: tasks.filter((t) => !t.completed && ["tomorrow", "this-week", "next-week"].includes(t.dueGroup)).length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Capture, prioritize, and complete work across all your projects."
        breadcrumbs={[{ label: "Apps" }, { label: "Tasks" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New task</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={stats.total} icon={<ListTodo className="size-5" />} footer="Across all projects" />
        <StatCard label="Due Today" value={stats.today} icon={<Calendar className="size-5" />} footer="Needs attention" />
        <StatCard label="Upcoming" value={stats.upcoming} icon={<CalendarDays className="size-5" />} footer="Next 2 weeks" />
        <StatCard label="Completed" value={stats.completed} icon={<CheckSquare className="size-5" />} footer="This week" />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Add task input */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Plus className="size-4 text-muted-foreground shrink-0" />
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
              placeholder="Add a task… (press Enter)"
              className="border-0 shadow-none focus-visible:ring-0 h-9"
            />
            <Select value={groupBy} onValueChange={(v) => setGroupBy(v as "project" | "due")}>
              <SelectTrigger className="h-9 w-32 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="due">Group by due</SelectItem>
                <SelectItem value="project">Group by project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs + search */}
        <div className="flex items-center justify-between p-3 border-b border-border gap-2 flex-wrap">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs"><Inbox className="size-3.5 mr-1.5" />All <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{stats.total}</Badge></TabsTrigger>
              <TabsTrigger value="today" className="text-xs"><Calendar className="size-3.5 mr-1.5" />Today <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{stats.today}</Badge></TabsTrigger>
              <TabsTrigger value="upcoming" className="text-xs"><CalendarDays className="size-3.5 mr-1.5" />Upcoming <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{stats.upcoming}</Badge></TabsTrigger>
              <TabsTrigger value="completed" className="text-xs"><CheckCircle2 className="size-3.5 mr-1.5" />Done <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{stats.completed}</Badge></TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks…" className="pl-9 h-9 w-56" />
          </div>
        </div>

        <ScrollArea className="max-h-[calc(100vh-460px)]">
          <div className="divide-y divide-border">
            {groupOrder.map((g) => {
              const list = groups[g];
              if (!list || list.length === 0) return null;
              return (
                <div key={g} className="p-3">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {groupBy === "project" ? g : groupLabels[g]}
                    </span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1">{list.length}</Badge>
                    <Separator className="flex-1" />
                  </div>
                  <div className="space-y-0.5">
                    {list.map((t) => (
                      <div key={t.id} className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors">
                        <Checkbox checked={t.completed} onCheckedChange={() => toggle(t.id)} className="size-4" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm ${t.completed ? "line-through text-muted-foreground" : "font-medium"}`}>{t.title}</span>
                            {t.subtasks && t.subtasks.total > 0 && (
                              <Badge variant="outline" className="text-[9px] h-4 px-1 font-normal">{t.subtasks.done}/{t.subtasks.total}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className={`text-[9px] h-4 px-1 font-normal ${t.projectColor}`}>{t.project}</Badge>
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Calendar className="size-2.5" />{t.due}</span>
                            {t.tags.map((tag) => <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <Flag className={`size-3 ${t.priority === "urgent" ? "text-destructive fill-destructive/30" : t.priority === "high" ? "text-warning fill-warning/30" : "text-muted-foreground/50"}`} />
                          </span>
                          <Badge variant="outline" className={`text-[9px] h-4 px-1 capitalize font-normal ${priorityStyles[t.priority]}`}>{t.priority}</Badge>
                          <Avatar className="size-6"><AvatarFallback className={`text-[9px] font-semibold ${t.assigneeColor}`}>{t.assignee}</AvatarFallback></Avatar>
                          <Button variant="ghost" size="icon" className="size-7 text-muted-foreground opacity-0 group-hover:opacity-100"><MoreVertical className="size-3.5" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="size-10 text-muted-foreground/40 mb-2" />
                <p className="text-sm font-medium">All clear</p>
                <p className="text-xs text-muted-foreground mt-1">No tasks match this filter.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
