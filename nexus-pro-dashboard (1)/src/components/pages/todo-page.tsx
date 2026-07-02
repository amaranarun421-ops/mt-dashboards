"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Calendar, Flag, MoreHorizontal, Trash2, Star, Clock, CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, StatusBadge } from "@/components/common/status-badge";

interface Todo { id: number; title: string; priority: "high"|"medium"|"low"; done: boolean; due: string; list: string; starred: boolean; }

export function TodoPage() {
  const [todos, setTodos] = React.useState<Todo[]>([
    { id: 1, title: "Review Q3 marketing campaign proposal", priority: "high", done: false, due: "Today", list: "Work", starred: true },
    { id: 2, title: "Schedule dentist appointment", priority: "medium", done: false, due: "Tomorrow", list: "Personal", starred: false },
    { id: 3, title: "Send invoice to Acme Corp", priority: "high", done: false, due: "Today", list: "Work", starred: true },
    { id: 4, title: "Buy groceries for the week", priority: "low", done: false, due: "Today", list: "Personal", starred: false },
    { id: 5, title: "Prepare presentation slides", priority: "high", done: true, due: "Yesterday", list: "Work", starred: false },
    { id: 6, title: "Call mom for her birthday", priority: "medium", done: true, due: "Yesterday", list: "Personal", starred: true },
    { id: 7, title: "Update project documentation", priority: "low", done: false, due: "Jul 5", list: "Work", starred: false },
    { id: 8, title: "Renew gym membership", priority: "medium", done: false, due: "Jul 8", list: "Personal", starred: false },
  ]);
  const [filter, setFilter] = React.useState<"all"|"today"|"starred"|"completed">("all");
  const [newTodo, setNewTodo] = React.useState("");

  const filtered = todos.filter(t => {
    if (filter === "today") return t.due === "Today" && !t.done;
    if (filter === "starred") return t.starred;
    if (filter === "completed") return t.done;
    return true;
  });

  const toggle = (id: number) => setTodos(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(prev => [{ id: Date.now(), title: newTodo, priority: "medium", done: false, due: "Today", list: "Work", starred: false }, ...prev]);
    setNewTodo("");
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.done).length,
    pending: todos.filter(t => !t.done).length,
    high: todos.filter(t => t.priority === "high" && !t.done).length,
  };

  return (
    <div>
      <PageHeader breadcrumb={["Applications", "To-Do List"]} title="My Tasks" description="Stay organized and track everything that needs your attention." actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Task</Button>} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: "Total Tasks", value: stats.total, icon: CheckCircle2, color: "bg-brand-50 text-brand-500 dark:bg-brand-500/15" },
          { label: "Completed", value: stats.completed, icon: Circle, color: "bg-success-50 text-success-600 dark:bg-success-500/15" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "bg-warning-50 text-warning-600 dark:bg-warning-500/15" },
          { label: "High Priority", value: stats.high, icon: Flag, color: "bg-error-50 text-error-600 dark:bg-error-500/15" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: i*0.05}}>
              <Card className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${s.color}`}><Icon className="h-5 w-5" /></div>
                <p className="font-bold text-gray-800 text-title-sm dark:text-white/90">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Sidebar lists */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">Lists</h3>
            <div className="space-y-1">
              {[
                { key: "all", label: "All Tasks", count: todos.length, color: "bg-brand-500" },
                { key: "today", label: "Today", count: todos.filter(t=>t.due==="Today"&&!t.done).length, color: "bg-warning-500" },
                { key: "starred", label: "Starred", count: todos.filter(t=>t.starred).length, color: "bg-orange-400" },
                { key: "completed", label: "Completed", count: stats.completed, color: "bg-success-500" },
              ].map(l => (
                <button key={l.key} onClick={() => setFilter(l.key as any)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${filter === l.key ? "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"}`}>
                  <span className={`h-2 w-2 rounded-full ${l.color}`} />{l.label}<span className="ml-auto text-xs">{l.count}</span>
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge color="primary">Work</Badge><Badge color="success">Personal</Badge><Badge color="warning">Urgent</Badge><Badge color="info">Ideas</Badge>
            </div>
          </Card>
        </div>

        {/* Task list */}
        <div className="lg:col-span-3">
          <Card className="rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 p-4">
              <Input placeholder="Add a new task..." value={newTodo} onChange={e=>setNewTodo(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTodo()} className="flex-1 h-10" />
              <Button onClick={addTodo} className="gap-1.5"><Plus className="h-4 w-4" /> Add</Button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {filtered.map((t, i) => (
                  <motion.div key={t.id} layout initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:10}} transition={{delay: i*0.03}}
                    className="group flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <button onClick={() => toggle(t.id)} className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${t.done ? "bg-success-500 border-success-500-500" : "border-gray-300 dark:border-gray-600 hover:border-brand-500"}`}>
                      {t.done && <Check className="h-3 w-3 text-white" />}
                    </button>
                    <button onClick={() => setTodos(prev=>prev.map(x=>x.id===t.id?{...x, starred:!x.starred}:x))}>
                      <Star className={`h-4 w-4 ${t.starred ? "fill-warning-500 text-warning-500" : "text-gray-300 dark:text-gray-600"}`} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${t.done ? "line-through text-gray-400" : "text-gray-800 dark:text-white/90"}`}>{t.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" />{t.due}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{t.list}</span>
                      </div>
                    </div>
                    <StatusBadge variant={t.priority==="high"?"error":t.priority==="medium"?"warning":"info"} size="sm">{t.priority}</StatusBadge>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-error-500"><Trash2 className="h-4 w-4" /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 p-3 text-center text-xs text-gray-400">
              {filtered.length} tasks · {stats.completed} completed
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
