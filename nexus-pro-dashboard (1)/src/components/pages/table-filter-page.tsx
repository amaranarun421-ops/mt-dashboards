"use client";

import * as React from "react";
import { Filter, Search, X } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";

const allTasks = [
  { id: 1, title: "Design new landing page", assignee: "Sarah Chen", priority: "high", status: "in-progress", due: "Today" },
  { id: 2, title: "Fix authentication bug", assignee: "John Davis", priority: "high", status: "completed", due: "Yesterday" },
  { id: 3, title: "Write API documentation", assignee: "Riya Patel", priority: "medium", status: "pending", due: "Tomorrow" },
  { id: 4, title: "Update dependencies", assignee: "David Liu", priority: "low", status: "in-progress", due: "Jul 5" },
  { id: 5, title: "Customer onboarding flow", assignee: "Nora Lee", priority: "medium", status: "completed", due: "Yesterday" },
  { id: 6, title: "Q3 roadmap planning", assignee: "Mark Park", priority: "high", status: "pending", due: "Jul 8" },
];

export function TableFilter() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [priorityFilter, setPriorityFilter] = React.useState("all");

  const filtered = allTasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader breadcrumb={["Tables", "Filterable"]} title="Filterable Table" description="Filter data using multiple criteria simultaneously." />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-800 p-4 space-y-3">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 h-9" /></div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Status:</span>
              {["all","pending","in-progress","completed"].map(s => (
                <button key={s} onClick={()=>setStatusFilter(s)} className={`rounded-md px-3 py-1 text-xs font-medium transition ${statusFilter===s?"bg-brand-500 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{s}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Priority:</span>
              {["all","high","medium","low"].map(p => (
                <button key={p} onClick={()=>setPriorityFilter(p)} className={`rounded-md px-3 py-1 text-xs font-medium transition ${priorityFilter===p?"bg-brand-500 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>{["Task","Assignee","Priority","Status","Due"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(t => (
                <tr key={t.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-gray-800 dark:text-white/90">{t.title}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{t.assignee}</td>
                  <td className="px-5 py-3"><StatusBadge variant={t.priority==="high"?"error":t.priority==="medium"?"warning":"info"}>{t.priority}</StatusBadge></td>
                  <td className="px-5 py-3"><StatusBadge variant={t.status==="completed"?"success":t.status==="in-progress"?"info":"warning"} dot>{t.status}</StatusBadge></td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{t.due}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">No tasks match your filters</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 p-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>Showing {filtered.length} of {allTasks.length} tasks</span>
          {(search || statusFilter !== "all" || priorityFilter !== "all") && <Button variant="ghost" size="sm" className="gap-1.5" onClick={()=>{setSearch("");setStatusFilter("all");setPriorityFilter("all");}}><X className="h-3.5 w-3.5" /> Clear filters</Button>}
        </div>
      </Card>
    </div>
  );
}
