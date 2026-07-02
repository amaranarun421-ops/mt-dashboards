"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileBarChart, Download, Plus, Filter, Calendar, FileText, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reports = [
  { title: "Q2 2026 Performance Summary", category: "Executive", size: "2.4 MB", pages: 24, date: "Jul 1, 2026", author: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", status: "published", views: 142 },
  { title: "Customer Churn Analysis", category: "Analytics", size: "1.8 MB", pages: 18, date: "Jun 28, 2026", author: "Mark Park", avatar: "https://i.pravatar.cc/40?img=2", status: "published", views: 89 },
  { title: "Marketing Campaign ROI Report", category: "Marketing", size: "3.2 MB", pages: 32, date: "Jun 25, 2026", author: "Riya Patel", avatar: "https://i.pravatar.cc/40?img=3", status: "draft", views: 0 },
  { title: "Engineering Velocity Metrics", category: "Engineering", size: "1.2 MB", pages: 14, date: "Jun 22, 2026", author: "John Davis", avatar: "https://i.pravatar.cc/40?img=4", status: "published", views: 64 },
  { title: "Financial Statement — June", category: "Finance", size: "4.1 MB", pages: 42, date: "Jun 20, 2026", author: "Alex Kim", avatar: "https://i.pravatar.cc/40?img=12", status: "published", views: 28 },
  { title: "User Research Synthesis", category: "Research", size: "8.6 MB", pages: 56, date: "Jun 18, 2026", author: "Nora Lee", avatar: "https://i.pravatar.cc/40?img=5", status: "review", views: 12 },
];

const categories = [
  { name: "Executive", count: 8, color: "bg-brand-500/15 text-brand-500" },
  { name: "Finance", count: 14, color: "bg-success-500/15 text-success-600 dark:text-success-500" },
  { name: "Marketing", count: 22, color: "bg-warning-500/15 text-warning-600 dark:text-orange-400" },
  { name: "Analytics", count: 18, color: "bg-blue-light-500/15 text-blue-light-500" },
  { name: "Engineering", count: 12, color: "bg-error-500/15 text-error-600 dark:text-error-500" },
  { name: "Research", count: 6, color: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
];

export function ReportsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Reports"]}
        title="Reports & Insights"
        description="Generate, schedule, and share data-driven reports across teams."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Report</Button>
          </>
        }
      />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover cursor-pointer p-4">
              <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${c.color}`}><FileText className="h-4 w-4" /></div>
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.count} reports</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border/60 p-4">
          <h3 className="text-base font-semibold">Recent Reports</h3>
        </div>
        <div className="divide-y divide-border/50">
          {reports.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="group flex items-center gap-4 p-4 transition hover:bg-gray-100 dark:bg-gray-800/30">
              <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-error-500/10 text-error-600 dark:text-error-500">
                <FileBarChart className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.title}</p>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{r.category}</span>
                  <span>·</span>
                  <span>{r.pages} pages</span>
                  <span>·</span>
                  <span>{r.size}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">{r.date}</span>
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <Avatar className="h-7 w-7"><AvatarImage src={r.avatar} /><AvatarFallback className="text-[10px]">{r.author[0]}</AvatarFallback></Avatar>
                <span className="text-xs text-gray-500 dark:text-gray-400">{r.author}</span>
              </div>
              <div className="hidden text-right md:block">
                <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><TrendingUp className="h-3 w-3" />{r.views} views</p>
              </div>
              <StatusBadge variant={r.status === "published" ? "success" : r.status === "draft" ? "neutral" : "warning"}>{r.status}</StatusBadge>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100"><Download className="h-4 w-4" /></Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
