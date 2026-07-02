"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, Plus, Check, TrendingUp, DollarSign, Receipt, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/common/status-badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const spendData = [{m:"Jan",v:2400},{m:"Feb",v:2800},{m:"Mar",v:3200},{m:"Apr",v:2900},{m:"May",v:3800},{m:"Jun",v:4200},{m:"Jul",v:4800}];

const invoices = [
  { id: "INV-2026-0042", date: "Jul 1, 2026", amount: 299, status: "paid", plan: "Enterprise" },
  { id: "INV-2026-0041", date: "Jun 1, 2026", amount: 299, status: "paid", plan: "Enterprise" },
  { id: "INV-2026-0040", date: "May 1, 2026", amount: 99, status: "paid", plan: "Business" },
  { id: "INV-2026-0039", date: "Apr 1, 2026", amount: 99, status: "paid", plan: "Business" },
  { id: "INV-2026-0038", date: "Mar 1, 2026", amount: 29, status: "paid", plan: "Pro" },
];

const paymentMethods = [
  { type: "Visa", last4: "4242", exp: "08/27", primary: true, brand: "bg-blue-600" },
  { type: "Mastercard", last4: "8888", exp: "11/26", primary: false, brand: "bg-orange-500" },
];

export function Billing() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "Billing"]} title="Billing & Subscription" description="Manage your plan, payment methods, and invoice history." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Current Plan", value: "Enterprise", icon: CreditCard, color: "bg-brand-50 text-brand-500 dark:bg-brand-500/15" },
          { label: "Monthly Cost", value: "$299", icon: DollarSign, color: "bg-success-50 text-success-600 dark:bg-success-500/15" },
          { label: "Next Billing", value: "Aug 1", icon: Receipt, color: "bg-warning-50 text-warning-600 dark:bg-warning-500/15" },
          { label: "YTD Spend", value: "$1,845", icon: TrendingUp, color: "bg-info-50 text-blue-light-500 dark:bg-blue-light-500/15" },
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

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-6">
        <Card className="xl:col-span-2 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendData} margin={{left:-20, right:8, top:8}}>
                <defs><linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#465fff" stopOpacity={0.35}/><stop offset="100%" stopColor="#465fff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="m" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Area type="monotone" dataKey="v" stroke="#465fff" strokeWidth={2.5} fill="url(#billGrad)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-transparent dark:border-brand-500/30 dark:from-brand-500/10">
          <div className="flex items-center justify-between mb-2">
            <Badge color="primary">Current Plan</Badge>
            <StatusBadge variant="success" dot>Active</StatusBadge>
          </div>
          <h3 className="font-bold text-gray-800 text-2xl dark:text-white/90">Enterprise</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">$299/month · renews Aug 1</p>
          <div className="mt-4 space-y-2">
            {["Unlimited projects", "Dedicated manager", "SSO & SAML", "24/7 support", "Custom SLAs"].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success-500" /><span className="text-gray-700 dark:text-gray-300">{f}</span></div>
            ))}
          </div>
          <Button className="w-full mt-4">Upgrade Plan</Button>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Payment Methods</h3>
          <Button variant="outline" size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add Card</Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {paymentMethods.map(p => (
            <div key={p.last4} className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <div className={`flex h-8 w-12 items-center justify-center rounded text-[10px] font-bold text-white ${p.brand}`}>{p.type === "Visa" ? "VISA" : "MC"}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">•••• {p.last4}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Expires {p.exp}</p>
              </div>
              {p.primary && <Badge color="primary">Primary</Badge>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800"><h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Invoice History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>{["Invoice", "Date", "Plan", "Amount", "Status", ""].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {invoices.map((inv, i) => (
                <motion.tr key={inv.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i*0.04}} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono font-medium text-brand-500">{inv.id}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{inv.date}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{inv.plan}</td>
                  <td className="px-5 py-3 font-bold">${inv.amount}.00</td>
                  <td className="px-5 py-3"><StatusBadge variant="success">Paid</StatusBadge></td>
                  <td className="px-5 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
