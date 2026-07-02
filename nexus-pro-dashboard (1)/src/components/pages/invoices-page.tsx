"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Download, Eye, Send, Filter, DollarSign, FileText, CheckCircle2, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { KpiCard } from "@/components/common/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const invoices = [
  { id: "INV-2026-0142", client: "Acme Corp", avatar: "https://i.pravatar.cc/40?img=1", amount: 12400, status: "paid", due: "Jul 1, 2026", issued: "Jun 1, 2026" },
  { id: "INV-2026-0141", client: "Globex Inc", avatar: "https://i.pravatar.cc/40?img=2", amount: 8200, status: "pending", due: "Jul 5, 2026", issued: "Jun 5, 2026" },
  { id: "INV-2026-0140", client: "Initech", avatar: "https://i.pravatar.cc/40?img=3", amount: 24800, status: "overdue", due: "Jun 28, 2026", issued: "May 28, 2026" },
  { id: "INV-2026-0139", client: "Umbrella Co", avatar: "https://i.pravatar.cc/40?img=4", amount: 4800, status: "paid", due: "Jun 25, 2026", issued: "May 25, 2026" },
  { id: "INV-2026-0138", client: "Stark Industries", avatar: "https://i.pravatar.cc/40?img=5", amount: 38400, status: "paid", due: "Jun 20, 2026", issued: "May 20, 2026" },
  { id: "INV-2026-0137", client: "Wayne Ent", avatar: "https://i.pravatar.cc/40?img=6", amount: 16800, status: "pending", due: "Jul 10, 2026", issued: "Jun 10, 2026" },
  { id: "INV-2026-0136", client: "Soylent Corp", avatar: "https://i.pravatar.cc/40?img=7", amount: 6200, status: "draft", due: "—", issued: "—" },
];

export function InvoicesPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Invoices"]}
        title="Invoices"
        description="Manage billing, track payments, and send professional invoices."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Invoice</Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Revenue" value="$284K" change={12.4} trend="up" icon={DollarSign} iconColor="text-success-600 dark:text-success-500 bg-success-500/10" subtitle="This quarter" sparkline={[20, 28, 32, 38, 42, 48, 55]} delay={0.05} />
        <KpiCard title="Paid" value="$184K" change={8.2} trend="up" icon={CheckCircle2} subtitle="64.8% of total" sparkline={[40, 42, 45, 48, 52, 55, 58]} delay={0.1} />
        <KpiCard title="Pending" value="$82K" change={-4.2} trend="down" icon={Clock} iconColor="text-warning-600 dark:text-orange-400 bg-warning-500/10" subtitle="12 invoices" sparkline={[60, 55, 52, 48, 45, 42, 40]} delay={0.15} />
        <KpiCard title="Overdue" value="$24.8K" change={2.1} trend="up" icon={FileText} iconColor="text-error-600 dark:text-error-500 bg-error-500/10" subtitle="3 invoices" sparkline={[10, 12, 14, 16, 18, 20, 22]} delay={0.2} />
      </div>
      <Card className="mt-4 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/60 bg-gray-100 dark:bg-gray-800/30 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Invoice</th>
                <th className="px-5 py-3 text-left font-semibold">Client</th>
                <th className="px-5 py-3 text-left font-semibold">Issued</th>
                <th className="px-5 py-3 text-left font-semibold">Due Date</th>
                <th className="px-5 py-3 text-right font-semibold">Amount</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoices.map((inv, i) => (
                <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.04 }} className="text-sm transition hover:bg-gray-100 dark:bg-gray-800/30">
                  <td className="px-5 py-3 font-mono font-semibold text-brand-500">{inv.id}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarImage src={inv.avatar} /><AvatarFallback className="text-[10px]">{inv.client[0]}</AvatarFallback></Avatar>
                      <span className="font-medium">{inv.client}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{inv.issued}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{inv.due}</td>
                  <td className="px-5 py-3 text-right font-bold">${inv.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <StatusBadge variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : inv.status === "overdue" ? "error" : "neutral"} dot>{inv.status}</StatusBadge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Send className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
