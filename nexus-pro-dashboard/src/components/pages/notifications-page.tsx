"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Info, Gift, MessageSquare, User, Settings, Trash2, Check } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const allNotifications = [
  { icon: CheckCircle2, color: "text-success-600 dark:text-success-500 bg-success-500/10", title: "Deployment successful", desc: "v2.4.1 is now live in production. All systems operational.", time: "2 minutes ago", category: "system", read: false },
  { icon: User, color: "text-blue-light-500 bg-blue-light-500/10", title: "New team member", desc: "Sarah Chen joined the Design team. Say hello!", time: "1 hour ago", category: "team", read: false },
  { icon: AlertCircle, color: "text-warning-600 dark:text-orange-400 bg-warning-500/10", title: "API rate limit at 80%", desc: "Consider upgrading your plan to avoid disruptions.", time: "3 hours ago", category: "system", read: false },
  { icon: MessageSquare, color: "text-brand-500 bg-brand-500/10", title: "New comment on your PR", desc: "Riya left a review on PR #284.", time: "5 hours ago", category: "mention", read: false },
  { icon: Gift, color: "text-brand-500 bg-brand-500/10", title: "Weekly report is ready", desc: "Your analytics summary for this week is available.", time: "6 hours ago", category: "report", read: true },
  { icon: Info, color: "text-blue-light-500 bg-blue-light-500/10", title: "Scheduled maintenance", desc: "Database maintenance window: Sat 2-4 AM PT.", time: "Yesterday", category: "system", read: true },
  { icon: Bell, color: "text-warning-600 dark:text-orange-400 bg-warning-500/10", title: "Password expires soon", desc: "Your password will expire in 7 days. Update it now.", time: "2 days ago", category: "security", read: true },
  { icon: User, color: "text-success-600 dark:text-success-500 bg-success-500/10", title: "Profile viewed 24 times", desc: "Your profile was viewed 24 times this week.", time: "3 days ago", category: "social", read: true },
];

const categories = [
  { id: "all", label: "All", count: 8 },
  { id: "mention", label: "Mentions", count: 1 },
  { id: "team", label: "Team", count: 1 },
  { id: "system", label: "System", count: 3 },
  { id: "security", label: "Security", count: 1 },
];

export function NotificationsPage() {
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? allNotifications : allNotifications.filter((n) => n.category === filter);
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "Notifications"]}
        title="Notifications"
        description="Stay updated on what matters most."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Check className="h-4 w-4" /> Mark all read</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Settings className="h-4 w-4" /> Preferences</Button>
          </>
        }
      />
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="mb-4">
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="gap-1.5">
              {c.label}
              <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-1.5 text-[10px] font-bold">{c.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={filter} className="mt-0">
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-border/50">
              {filtered.map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`group flex gap-3 p-4 transition hover:bg-gray-100 dark:bg-gray-800/30 ${!n.read ? "bg-brand-500/5" : ""}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${n.color}`}><Icon className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{n.title}</p>
                        {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{n.desc}</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500 dark:text-gray-400">Dismiss</Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
