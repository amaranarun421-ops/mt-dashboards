"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Mail, MoreVertical, Search, Filter, Shield } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";

const team = [
  { name: "Sarah Chen", role: "Senior Designer", dept: "Design", email: "sarah@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=1", projects: 8 },
  { name: "Mark Park", role: "Product Manager", dept: "Product", email: "mark@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=2", projects: 12 },
  { name: "Riya Patel", role: "Lead Designer", dept: "Design", email: "riya@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=3", projects: 6 },
  { name: "John Davis", role: "Backend Engineer", dept: "Engineering", email: "john@nexuspro.app", status: "away", avatar: "https://i.pravatar.cc/80?img=4", projects: 4 },
  { name: "Nora Lee", role: "Frontend Engineer", dept: "Engineering", email: "nora@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=5", projects: 9 },
  { name: "David Liu", role: "DevOps Engineer", dept: "Engineering", email: "david@nexuspro.app", status: "offline", avatar: "https://i.pravatar.cc/80?img=6", projects: 3 },
  { name: "Lisa Wang", role: "QA Engineer", dept: "Engineering", email: "lisa@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=7", projects: 14 },
  { name: "Bruce Kim", role: "Sales Lead", dept: "Sales", email: "bruce@nexuspro.app", status: "active", avatar: "https://i.pravatar.cc/80?img=8", projects: 18 },
];

export function TeamPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "Team"]}
        title="Team Members"
        description="Manage your team, roles, and permissions."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Invite Member</Button>
          </>
        }
      />
      <div className="mb-4 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input placeholder="Search team members..." className="pl-9" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.map((m, i) => (
          <motion.div key={m.email} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover group p-5">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <Avatar className="h-14 w-14"><AvatarImage src={m.avatar} /><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
                  <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card ${m.status === "active" ? "bg-success-500" : m.status === "away" ? "bg-warning-500" : "bg-gray-100 dark:bg-gray-800-foreground"}`} />
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100"><MoreVertical className="h-4 w-4" /></Button>
              </div>
              <p className="mt-3 text-base font-bold">{m.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{m.role}</p>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge variant="primary">{m.dept}</StatusBadge>
                <StatusBadge variant={m.status === "active" ? "success" : m.status === "away" ? "warning" : "neutral"}>{m.status}</StatusBadge>
              </div>
              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="flex items-center gap-1.5 truncate text-xs text-gray-500 dark:text-gray-400"><Mail className="h-3 w-3" /> {m.email}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{m.projects} active projects</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
