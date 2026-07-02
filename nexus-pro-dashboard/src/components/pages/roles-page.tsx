"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Shield, Users, MoreVertical, Check, X } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const roles = [
  { name: "Super Admin", members: 2, desc: "Full access to all features and settings", color: "bg-error-500/15 text-error-600 dark:text-error-500", permissions: { users: true, billing: true, api: true, audit: true, delete: true } },
  { name: "Admin", members: 8, desc: "Manage team, projects, and most settings", color: "bg-warning-500/15 text-warning-600 dark:text-orange-400", permissions: { users: true, billing: true, api: true, audit: true, delete: false } },
  { name: "Manager", members: 14, desc: "Manage projects and view reports", color: "bg-blue-light-500/15 text-blue-light-500", permissions: { users: true, billing: false, api: true, audit: false, delete: false } },
  { name: "Editor", members: 32, desc: "Create and edit content", color: "bg-brand-500/15 text-brand-500", permissions: { users: false, billing: false, api: false, audit: false, delete: false } },
  { name: "Viewer", members: 86, desc: "Read-only access to dashboards", color: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400", permissions: { users: false, billing: false, api: false, audit: false, delete: false } },
];

const permLabels = { users: "Manage Users", billing: "Billing Access", api: "API Access", audit: "View Audit Logs", delete: "Delete Data" };

export function RolesPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "Roles & Permissions"]}
        title="Roles & Permissions"
        description="Define what each team member can do in your workspace."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Role</Button>}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {roles.map((r, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${r.color}`}><Shield className="h-5 w-5" /></div>
                  <div>
                    <p className="text-base font-bold">{r.name}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><Users className="h-3 w-3" /> {r.members} members</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-4 w-4" /></Button>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{r.desc}</p>
              <div className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                {Object.entries(r.permissions).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{permLabels[k as keyof typeof permLabels]}</span>
                    {v ? <Check className="h-4 w-4 text-success-600 dark:text-success-500" /> : <X className="h-4 w-4 text-gray-500 dark:text-gray-400/40" />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
