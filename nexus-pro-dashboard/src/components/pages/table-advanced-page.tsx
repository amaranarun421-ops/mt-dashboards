"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Download, Filter, Search, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";

const orders = Array.from({length: 8}, (_, i) => ({
  id: `#ORD-${8420+i}`, customer: ["Sarah Chen","Mark Park","Lisa Wang","David Liu","Nora Lee","Bruce Kim","Riya Patel","John Davis"][i],
  email: ["sarah@acme.com","mark@globex.com","lisa@initech.com","david@umbrella.com","nora@stark.com","bruce@wayne.com","riya@soylent.com","john@hooli.com"][i],
  avatar: `https://i.pravatar.cc/40?img=${i+1}`, date: `Jul ${i+1}, 2026`, items: Math.floor(Math.random()*5)+1,
  total: (Math.random()*500+50).toFixed(2), status: ["completed","processing","shipped","pending","completed","cancelled","completed","shipped"][i],
  payment: ["card","paypal","card","apple-pay","card","paypal","card","card"][i],
}));

export function TableAdvanced() {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [sortAsc, setSortAsc] = React.useState(true);
  const sorted = [...orders].sort((a,b) => sortAsc ? a.total.localeCompare(b.total) : b.total.localeCompare(a.total));

  return (
    <div>
      <PageHeader breadcrumb={["Tables", "Advanced"]} title="Advanced Data Table" description="Sortable, selectable, paginated data with bulk actions." actions={<><Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button><Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add Order</Button></>} />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-gray-800 p-4">
          <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Search orders..." className="pl-9 h-9" /></div>
          <div className="flex gap-2">
            {selected.length > 0 && <Button variant="outline" size="sm" className="text-error-600">{selected.length} selected · Delete</Button>}
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>
                <th className="w-12 px-5 py-3"><Checkbox checked={selected.length === orders.length} onCheckedChange={(v) => setSelected(v ? orders.map((_,i)=>i) : [])} /></th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer" onClick={()=>setSortAsc(!sortAsc)}>Total {sortAsc ? "↑" : "↓"}</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Payment</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sorted.map((o, i) => (
                <motion.tr key={o.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i*0.03}} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3"><Checkbox checked={selected.includes(i)} onCheckedChange={(v) => setSelected(prev => v ? [...prev, i] : prev.filter(x => x !== i))} /></td>
                  <td className="px-5 py-3 font-mono font-medium text-brand-500">{o.id}</td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarImage src={o.avatar} /><AvatarFallback className="text-[10px]">{o.customer[0]}</AvatarFallback></Avatar><div><p className="font-medium text-gray-800 dark:text-white/90">{o.customer}</p><p className="text-xs text-gray-400">{o.email}</p></div></div></td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{o.date}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{o.items}</td>
                  <td className="px-5 py-3 font-bold">${o.total}</td>
                  <td className="px-5 py-3"><span className="capitalize text-xs text-gray-500 dark:text-gray-400">{o.payment}</span></td>
                  <td className="px-5 py-3"><StatusBadge variant={o.status==="completed"?"success":o.status==="processing"?"warning":o.status==="shipped"?"info":"error"} dot>{o.status}</StatusBadge></td>
                  <td className="px-5 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing 1-8 of 1,284</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-3 text-sm font-medium">Page 1 of 161</span>
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronsRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
