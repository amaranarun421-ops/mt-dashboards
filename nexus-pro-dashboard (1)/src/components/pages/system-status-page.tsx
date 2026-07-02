"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, XCircle, Activity, Server, Database, Cloud } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";

const services = [
  { name: "Web Application", status: "operational", uptime: 99.99, desc: "Main dashboard and UI", icon: Cloud },
  { name: "API Gateway", status: "operational", uptime: 99.98, desc: "REST and GraphQL endpoints", icon: Server },
  { name: "Authentication", status: "operational", uptime: 99.95, desc: "Login, OAuth, and 2FA", icon: Server },
  { name: "Database Cluster", status: "operational", uptime: 99.99, desc: "Primary read/write replicas", icon: Database },
  { name: "CDN", status: "operational", uptime: 100, desc: "Global asset delivery", icon: Cloud },
  { name: "Background Jobs", status: "degraded", uptime: 98.42, desc: "Async task processing", icon: Activity },
  { name: "Webhooks", status: "operational", uptime: 99.91, desc: "Outbound event delivery", icon: Server },
  { name: "Email Service", status: "operational", uptime: 99.88, desc: "Transactional emails", icon: Cloud },
];

const incidents = [
  { date: "Jun 28, 2026", title: "Background Job Delays", status: "resolved", duration: "1h 24m", desc: "Job queue experienced delays due to increased load. Scaled workers to resolve." },
  { date: "Jun 15, 2026", title: "API Gateway Brief Outage", status: "resolved", duration: "8m", desc: "Configuration error caused 5xx errors. Rolled back and verified." },
  { date: "May 30, 2026", title: "Database Maintenance", status: "resolved", duration: "32m", desc: "Scheduled maintenance to apply security patches. No customer impact." },
];

const uptimeHistory = Array.from({ length: 90 }, () => Math.random() > 0.95 ? "degraded" : "operational");

export function SystemStatusPage() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "System Status"]} title="System Status" description="Real-time status and historical uptime for all services." />
      <Card className="mb-4 overflow-hidden p-0">
        <div className="flex items-center gap-4 bg-success-500/5 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-500/15 text-success-600 dark:text-success-500"><CheckCircle2 className="h-6 w-6" /></div>
          <div>
            <p className="text-lg font-bold">All Systems Operational</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: just now · 99.94% uptime over last 90 days</p>
          </div>
        </div>
        <div className="border-t border-border p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Last 90 days</p>
          <div className="flex gap-0.5">
            {uptimeHistory.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }} className={`h-8 flex-1 rounded-sm ${s === "operational" ? "bg-success-500" : "bg-warning-500"}`} title={`Day ${i + 1}: ${s}`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>90 days ago</span><span>Today</span>
          </div>
        </div>
      </Card>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.status === "operational" ? "bg-success-500/10 text-success-600 dark:text-success-500" : "bg-warning-500/10 text-warning-600 dark:text-orange-400"}`}><Icon className="h-4 w-4" /></div>
                    <div><p className="text-sm font-semibold">{s.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p></div>
                  </div>
                  {s.status === "operational" ? <CheckCircle2 className="h-5 w-5 text-success-600 dark:text-success-500" /> : <AlertCircle className="h-5 w-5 text-warning-600 dark:text-orange-400" />}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Uptime (90d)</span>
                  <span className="text-sm font-bold">{s.uptime}%</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="border-b border-border/60 p-4"><h3 className="text-base font-semibold">Past Incidents</h3></div>
        <div className="divide-y divide-border/50">
          {incidents.map((inc, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="p-4">
              <div className="flex items-center gap-2">
                <StatusBadge variant="success">{inc.status}</StatusBadge>
                <p className="text-sm font-semibold">{inc.title}</p>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{inc.date} · {inc.duration}</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{inc.desc}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
