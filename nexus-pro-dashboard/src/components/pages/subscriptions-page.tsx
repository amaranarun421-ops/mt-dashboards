"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CreditCard, Plus, Download, TrendingUp, Users, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { KpiCard } from "@/components/common/kpi-card";
import { ChartCard } from "@/components/common/chart-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const mrrData = [
  { month: "Feb", mrr: 42000 },
  { month: "Mar", mrr: 48000 },
  { month: "Apr", mrr: 54000 },
  { month: "May", mrr: 62000 },
  { month: "Jun", mrr: 72000 },
  { month: "Jul", mrr: 84000 },
];

const plans = [
  { name: "Free", price: 0, subs: 1240, color: "bg-gray-100 dark:bg-gray-800-foreground", pct: 52, mrr: 0 },
  { name: "Pro", price: 29, subs: 720, color: "bg-brand-500", pct: 30, mrr: 20880 },
  { name: "Business", price: 99, subs: 320, color: "bg-blue-light-500", pct: 13, mrr: 31680 },
  { name: "Enterprise", price: 299, subs: 120, color: "bg-success-500", pct: 5, mrr: 35880 },
];

const recent = [
  { customer: "Acme Corp", plan: "Enterprise", amount: 299, status: "active", date: "Today", avatar: "https://i.pravatar.cc/40?img=1" },
  { customer: "Globex Inc", plan: "Business", amount: 99, status: "active", date: "Today", avatar: "https://i.pravatar.cc/40?img=2" },
  { customer: "Sarah Chen", plan: "Pro", amount: 29, status: "active", date: "Yesterday", avatar: "https://i.pravatar.cc/40?img=3" },
  { customer: "Initech", plan: "Enterprise", amount: 299, status: "canceled", date: "2 days ago", avatar: "https://i.pravatar.cc/40?img=4" },
  { customer: "Mark Park", plan: "Pro", amount: 29, status: "active", date: "3 days ago", avatar: "https://i.pravatar.cc/40?img=5" },
  { customer: "Umbrella Co", plan: "Business", amount: 99, status: "trialing", date: "5 days ago", avatar: "https://i.pravatar.cc/40?img=6" },
];

export function SubscriptionsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Subscriptions"]}
        title="Subscription Plans"
        description="Recurring revenue, plan distribution, and subscriber activity."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Plan</Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="MRR" value="$84.4K" change={16.8} trend="up" icon={TrendingUp} iconColor="text-success-600 dark:text-success-500 bg-success-500/10" subtitle="+$12k MoM" sparkline={[20, 28, 32, 38, 42, 48, 55]} delay={0.05} />
        <KpiCard title="Active Subs" value="2,400" change={8.4} trend="up" icon={Users} subtitle="142 new this month" sparkline={[40, 42, 45, 48, 52, 55, 58]} delay={0.1} />
        <KpiCard title="Churn Rate" value="2.1%" change={-0.8} trend="down" icon={RotateCcw} iconColor="text-warning-600 dark:text-orange-400 bg-warning-500/10" subtitle="Below 3% target" sparkline={[40, 38, 35, 32, 28, 25, 22]} delay={0.15} />
        <KpiCard title="ARR" value="$1.01M" change={22.4} trend="up" icon={CreditCard} iconColor="text-blue-light-500 bg-blue-light-500/10" subtitle="Crossed $1M!" sparkline={[20, 28, 35, 42, 48, 55, 62]} delay={0.2} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="MRR Growth" description="Monthly recurring revenue" className="xl:col-span-2" delay={0.25}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0.01 250)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "oklch(0.7 0.01 250 / 0.08)" }} />
                <Bar dataKey="mrr" radius={[8, 8, 0, 0]} maxBarSize={48}>
                  {mrrData.map((_, i) => <Cell key={i} fill={`oklch(0.55 0.14 165 / ${0.5 + i * 0.08})`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Plan Distribution" description="Subscribers by tier" delay={0.3}>
          <div className="space-y-3">
            {plans.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">${p.price}/mo</span>
                  </div>
                  <span className="text-sm font-bold">{p.subs}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct * 2}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.05 }} className={`h-full rounded-full ${p.color}`} />
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{p.pct}% · ${p.mrr.toLocaleString()}/mo</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Recent Subscriptions" description="Latest customer activity" className="mt-4" delay={0.4} bodyClassName="p-0">
        <div className="divide-y divide-border/50">
          {recent.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.04 }} className="flex items-center gap-3 p-4 transition hover:bg-gray-100 dark:bg-gray-800/30">
              <Avatar className="h-9 w-9"><AvatarImage src={r.avatar} /><AvatarFallback>{r.customer[0]}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.customer}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{r.plan} plan · {r.date}</p>
              </div>
              <StatusBadge variant={r.status === "active" ? "success" : r.status === "trialing" ? "info" : "error"}>{r.status}</StatusBadge>
              <p className="ml-2 text-sm font-bold">${r.amount}/mo</p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
