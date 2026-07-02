"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Download, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/common/status-badge";

const employees = [
  { name: "Sarah Chen", role: "Senior Designer", dept: "Design", email: "sarah@nexuspro.app", status: "active", salary: 95000, avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Mark Park", role: "Product Manager", dept: "Product", email: "mark@nexuspro.app", status: "active", salary: 110000, avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Riya Patel", role: "Lead Designer", dept: "Design", email: "riya@nexuspro.app", status: "away", salary: 105000, avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "John Davis", role: "Backend Engineer", dept: "Engineering", email: "john@nexuspro.app", status: "active", salary: 120000, avatar: "https://i.pravatar.cc/40?img=4" },
  { name: "Nora Lee", role: "Frontend Engineer", dept: "Engineering", email: "nora@nexuspro.app", status: "offline", salary: 98000, avatar: "https://i.pravatar.cc/40?img=5" },
  { name: "David Liu", role: "DevOps Engineer", dept: "Engineering", email: "david@nexuspro.app", status: "active", salary: 115000, avatar: "https://i.pravatar.cc/40?img=6" },
];

export function TableBasic() {
  return (
    <div>
      <PageHeader breadcrumb={["Tables", "Basic Tables"]} title="Basic Tables" description="Clean, readable data tables with sorting and selection." actions={<><Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button><Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add</Button></>} />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-4">
          <div className="relative w-64"><Input placeholder="Search employees..." className="h-9" /></div>
          <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>
                <th className="w-12 px-5 py-3"><Checkbox /></th>
                {["Employee", "Email", "Department", "Salary", "Status", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {h === "Employee" || h === "Salary" ? <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">{h}<ArrowUpDown className="h-3 w-3" /></button> : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {employees.map((e, i) => (
                <motion.tr key={e.email} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i*0.04}} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3"><Checkbox /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={e.avatar} /><AvatarFallback className="text-xs">{e.name[0]}</AvatarFallback></Avatar>
                      <div><p className="font-medium text-gray-800 dark:text-white/90">{e.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{e.role}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{e.email}</td>
                  <td className="px-5 py-3"><Badge color="light">{e.dept}</Badge></td>
                  <td className="px-5 py-3 font-medium">${e.salary.toLocaleString()}</td>
                  <td className="px-5 py-3"><StatusBadge variant={e.status==="active"?"success":e.status==="away"?"warning":"neutral"} dot>{e.status}</StatusBadge></td>
                  <td className="px-5 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 p-4 text-sm">
          <p className="text-gray-500 dark:text-gray-400">Showing 6 of 142 employees</p>
          <div className="flex gap-1"><Button variant="outline" size="sm">Previous</Button><Button variant="outline" size="sm">Next</Button></div>
        </div>
      </Card>
    </div>
  );
}
