import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { MoreHorizontal, ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const rows = [
  { name: "Sarah Chen", email: "sarah@example.com", role: "Designer", status: "active", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Mark Park", email: "mark@example.com", role: "Manager", status: "active", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Riya Patel", email: "riya@example.com", role: "Designer", status: "away", avatar: "https://i.pravatar.cc/40?img=3" },
  { name: "John Davis", email: "john@example.com", role: "Engineer", status: "offline", avatar: "https://i.pravatar.cc/40?img=4" },
  { name: "Nora Lee", email: "nora@example.com", role: "Engineer", status: "active", avatar: "https://i.pravatar.cc/40?img=5" },
];

export function UiTablesPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Tables"]} title="Tables" description="Data tables with sorting, selection, and actions." />
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/60 p-4">
          <h3 className="text-base font-semibold">Team Members</h3>
          <div className="flex gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" /><Input placeholder="Search..." className="h-9 w-48 pl-9" /></div><Button size="sm" variant="outline">Filter</Button></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/60 bg-gray-100 dark:bg-gray-800/30 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <tr><th className="w-10 px-4 py-3"><Checkbox /></th><th className="px-4 py-3 text-left font-semibold"><button className="flex items-center gap-1 hover:text-gray-800 dark:text-white/90">Name <ArrowUpDown className="h-3 w-3" /></button></th><th className="px-4 py-3 text-left font-semibold">Email</th><th className="px-4 py-3 text-left font-semibold">Role</th><th className="px-4 py-3 text-center font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {rows.map((r, i) => (
                <tr key={i} className="text-sm transition hover:bg-gray-100 dark:bg-gray-800/30">
                  <td className="px-4 py-3"><Checkbox /></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar className="h-8 w-8"><AvatarImage src={r.avatar} /><AvatarFallback className="text-[10px]">{r.name[0]}</AvatarFallback></Avatar><span className="font-semibold">{r.name}</span></div></td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.email}</td>
                  <td className="px-4 py-3">{r.role}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge variant={r.status === "active" ? "success" : r.status === "away" ? "warning" : "neutral"} dot>{r.status}</StatusBadge></td>
                  <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border/60 p-4 text-sm">
          <p className="text-gray-500 dark:text-gray-400">Showing 1-5 of 42</p>
          <div className="flex gap-1"><Button variant="outline" size="sm">Previous</Button><Button variant="outline" size="sm">Next</Button></div>
        </div>
      </Card>
    </div>
  );
}
