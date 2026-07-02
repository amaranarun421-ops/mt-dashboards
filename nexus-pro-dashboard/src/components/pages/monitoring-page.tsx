"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity, Server, Cpu, HardDrive, Wifi, AlertCircle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { KpiCard } from "@/components/common/kpi-card";
import { ChartCard } from "@/components/common/chart-card";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const cpuData = Array.from({ length: 24 }, (_, i) => ({ time: `${i}h`, cpu: 30 + Math.sin(i / 3) * 25 + Math.random() * 10, mem: 45 + Math.cos(i / 4) * 15 + Math.random() * 8 }));
const latencyData = Array.from({ length: 24 }, (_, i) => ({ time: `${i}h`, p50: 80 + Math.random() * 20, p95: 180 + Math.random() * 60, p99: 320 + Math.random() * 120 }));

const services = [
  { name: "API Gateway", status: "operational", uptime: 99.98, latency: 84, color: "success" },
  { name: "Auth Service", status: "operational", uptime: 99.95, latency: 42, color: "success" },
  { name: "Payment Service", status: "degraded", uptime: 99.42, latency: 380, color: "warning" },
  { name: "Notification Queue", status: "operational", uptime: 99.91, latency: 12, color: "success" },
  { name: "Search Index", status: "operational", uptime: 99.99, latency: 28, color: "success" },
  { name: "Analytics Pipeline", status: "outage", uptime: 92.18, latency: 0, color: "error" },
];

const incidents = [
  { title: "Analytics Pipeline — Elevated Error Rate", severity: "critical", time: "Active · 14m ago", desc: "Error rate spiked to 12% on ingestion workers. Investigating." },
  { title: "Payment Service — Slow Response", severity: "warning", time: "Resolved · 2h ago", desc: "P95 latency exceeded 500ms threshold for 18 minutes. Auto-scaled." },
  { title: "Database — Connection Pool Warning", severity: "info", time: "Resolved · 6h ago", desc: "Connection pool reached 80% capacity. Increased pool size." },
];

export function MonitoringPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Monitoring"]}
        title="System Monitoring"
        description="Real-time health, performance metrics, and incident tracking for all services."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Uptime (30d)" value="99.94%" change={0.02} trend="up" icon={CheckCircle2} iconColor="text-success-600 dark:text-success-500 bg-success-500/10" subtitle="SLA: 99.9%" sparkline={[98, 99, 99, 99, 99, 99, 99]} delay={0.05} />
        <KpiCard title="Avg Response" value="84ms" change={-12} trend="down" icon={Activity} iconColor="text-blue-light-500 bg-blue-light-500/10" subtitle="P50 latency" sparkline={[100, 95, 90, 88, 86, 85, 84]} delay={0.1} />
        <KpiCard title="Error Rate" value="0.08%" change={0.02} trend="up" icon={AlertCircle} iconColor="text-warning-600 dark:text-orange-400 bg-warning-500/10" subtitle="Below 0.1% threshold" sparkline={[5, 6, 7, 8, 9, 8, 8]} delay={0.15} />
        <KpiCard title="Active Incidents" value="2" change={1} trend="up" icon={Server} iconColor="text-error-600 dark:text-error-500 bg-error-500/10" subtitle="1 critical" sparkline={[1, 2, 1, 1, 2, 3, 2]} delay={0.2} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="CPU & Memory Usage" description="Last 24 hours" delay={0.25}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="cpuG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.14 165)" stopOpacity={0.35} /><stop offset="100%" stopColor="oklch(0.55 0.14 165)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="memG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.62 0.14 240)" stopOpacity={0.3} /><stop offset="100%" stopColor="oklch(0.62 0.14 240)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="cpu" stroke="oklch(0.55 0.14 165)" strokeWidth={2} fill="url(#cpuG)" />
                <Area type="monotone" dataKey="mem" stroke="oklch(0.62 0.14 240)" strokeWidth={2} fill="url(#memG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="API Latency" description="P50 · P95 · P99 percentiles" delay={0.3}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="p50" stroke="oklch(0.62 0.16 150)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="oklch(0.75 0.16 75)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p99" stroke="oklch(0.65 0.20 350)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Service Health" description="All microservices" className="xl:col-span-2" delay={0.35} bodyClassName="p-0">
          <div className="divide-y divide-border/50">
            {services.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color === "success" ? "bg-success-500/10 text-success-600 dark:text-success-500" : s.color === "warning" ? "bg-warning-500/10 text-warning-600 dark:text-orange-400" : "bg-error-500/10 text-error-600 dark:text-error-500"}`}>
                  <Server className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Uptime: {s.uptime}% · Latency: {s.latency}ms</p>
                </div>
                <StatusBadge variant={s.color as any} dot pulse={s.color !== "success"}>{s.status}</StatusBadge>
              </motion.div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Recent Incidents" description="Last 24 hours" delay={0.4} bodyClassName="p-0">
          <div className="divide-y divide-border/50">
            {incidents.map((inc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.08 }} className="p-4">
                <div className="flex items-start gap-2">
                  <StatusBadge variant={inc.severity === "critical" ? "error" : inc.severity === "warning" ? "warning" : "info"}>{inc.severity}</StatusBadge>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{inc.time}</p>
                </div>
                <p className="mt-1.5 text-sm font-semibold">{inc.title}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{inc.desc}</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
