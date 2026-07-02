"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, Filter, Search, Activity, LogIn, LogOut, Edit, Trash2, Settings, UserPlus, FileText, Upload } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";

const logs = [
  { user: "Alex Kim", avatar: "https://i.pravatar.cc/40?img=12", action: "Logged in", target: "—", ip: "192.168.1.42", time: "2 min ago", type: "auth", icon: LogIn, color: "text-success-600 dark:text-success-500 bg-success-500/10" },
  { user: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", action: "Updated", target: "Project: Mobile App Redesign", ip: "192.168.1.84", time: "8 min ago", type: "update", icon: Edit, color: "text-blue-light-500 bg-blue-light-500/10" },
  { user: "John Davis", avatar: "https://i.pravatar.cc/40?img=4", action: "Deleted", target: "File: old-logs.tar.gz", ip: "10.0.0.12", time: "22 min ago", type: "delete", icon: Trash2, color: "text-error-600 dark:text-error-500 bg-error-500/10" },
  { user: "Riya Patel", avatar: "https://i.pravatar.cc/40?img=3", action: "Invited user", target: "mark@nexuspro.app", ip: "192.168.1.34", time: "1 hour ago", type: "admin", icon: UserPlus, color: "text-brand-500 bg-brand-500/10" },
  { user: "Alex Kim", avatar: "https://i.pravatar.cc/40?img=12", action: "Changed settings", target: "Two-factor authentication enabled", ip: "192.168.1.42", time: "2 hours ago", type: "settings", icon: Settings, color: "text-warning-600 dark:text-orange-400 bg-warning-500/10" },
  { user: "Nora Lee", avatar: "https://i.pravatar.cc/40?img=5", action: "Uploaded", target: "design-v2.fig (8.2 MB)", ip: "192.168.1.91", time: "3 hours ago", type: "upload", icon: Upload, color: "text-blue-light-500 bg-blue-light-500/10" },
  { user: "Mark Park", avatar: "https://i.pravatar.cc/40?img=2", action: "Logged out", target: "—", ip: "192.168.1.34", time: "5 hours ago", type: "auth", icon: LogOut, color: "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800" },
  { user: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", action: "Created report", target: "Q2 Performance Summary", ip: "192.168.1.84", time: "Yesterday", type: "create", icon: FileText, color: "text-brand-500 bg-brand-500/10" },
];

export function AuditLogsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "Audit Logs"]}
        title="Audit Logs"
        description="Track all user activity and system events for compliance."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />
      <div className="mb-4 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input placeholder="Search logs..." className="pl-9" />
        </div>
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-border/50">
          {logs.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="group flex items-center gap-3 p-4 transition hover:bg-gray-100 dark:bg-gray-800/30">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${l.color}`}><Icon className="h-4 w-4" /></div>
                <Avatar className="h-7 w-7"><AvatarImage src={l.avatar} /><AvatarFallback className="text-[10px]">{l.user[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm"><span className="font-semibold">{l.user}</span> <span className="text-gray-500 dark:text-gray-400">{l.action.toLowerCase()}</span> <span className="font-medium">{l.target}</span></p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">IP: {l.ip} · {l.time}</p>
                </div>
                <StatusBadge variant={l.type === "delete" ? "error" : l.type === "auth" ? "success" : l.type === "admin" ? "primary" : l.type === "settings" ? "warning" : "info"}>{l.type}</StatusBadge>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
