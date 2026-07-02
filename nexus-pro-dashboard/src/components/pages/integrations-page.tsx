"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Settings, Check, ExternalLink, MessageSquare, Github, CreditCard, BarChart3, Zap, FileText, Square, Palette, Link2, Mail, Gamepad2, Triangle, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const integrations: { name: string; desc: string; icon: LucideIcon; color: string; iconColor: string; connected: boolean; category: string }[] = [
  { name: "Slack", desc: "Get notifications in your team channels", icon: MessageSquare, color: "bg-purple-500/10", iconColor: "text-purple-500", connected: true, category: "Communication" },
  { name: "GitHub", desc: "Sync commits, PRs, and issues", icon: Github, color: "bg-zinc-500/10", iconColor: "text-zinc-700 dark:text-zinc-300", connected: true, category: "Development" },
  { name: "Stripe", desc: "Accept payments and manage subscriptions", icon: CreditCard, color: "bg-blue-500/10", iconColor: "text-blue-500", connected: true, category: "Payments" },
  { name: "Google Analytics", desc: "Track website traffic and conversions", icon: BarChart3, color: "bg-orange-500/10", iconColor: "text-orange-500", connected: false, category: "Analytics" },
  { name: "Zapier", desc: "Automate workflows with 5,000+ apps", icon: Zap, color: "bg-orange-500/10", iconColor: "text-orange-500", connected: false, category: "Automation" },
  { name: "Notion", desc: "Sync docs and project pages", icon: FileText, color: "bg-zinc-500/10", iconColor: "text-zinc-700 dark:text-zinc-300", connected: true, category: "Productivity" },
  { name: "Linear", desc: "Two-way issue sync with your projects", icon: Square, color: "bg-indigo-500/10", iconColor: "text-indigo-500", connected: false, category: "Development" },
  { name: "Figma", desc: "Embed design files and prototypes", icon: Palette, color: "bg-pink-500/10", iconColor: "text-pink-500", connected: true, category: "Design" },
  { name: "Webhook", desc: "Send custom events to any URL", icon: Link2, color: "bg-emerald-500/10", iconColor: "text-emerald-500", connected: false, category: "Developer" },
  { name: "Mailchimp", desc: "Sync contacts and send campaigns", icon: Mail, color: "bg-yellow-500/10", iconColor: "text-yellow-500", connected: false, category: "Marketing" },
  { name: "Discord", desc: "Bot notifications for your server", icon: Gamepad2, color: "bg-indigo-500/10", iconColor: "text-indigo-500", connected: false, category: "Communication" },
  { name: "Vercel", desc: "Auto-deploy on every push", icon: Triangle, color: "bg-zinc-500/10", iconColor: "text-zinc-700 dark:text-zinc-300", connected: true, category: "Development" },
];

export function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "Integrations"]}
        title="Integrations"
        description="Connect your favorite tools and supercharge your workflow."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((it, i) => {
          const IconComp = it.icon;
          return (
          <motion.div key={it.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="card-hover group flex h-full flex-col p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${it.color}`}><IconComp className={`h-6 w-6 ${it.iconColor}`} /></div>
                {it.connected && <StatusBadge variant="success" dot>Connected</StatusBadge>}
              </div>
              <p className="mt-3 text-base font-bold">{it.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{it.category}</p>
              <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-gray-400">{it.desc}</p>
              <div className="mt-4 flex gap-2">
                {it.connected ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Settings className="h-3.5 w-3.5" /> Configure</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-3.5 w-3.5" /></Button>
                  </>
                ) : (
                  <Button size="sm" className="flex-1 gap-1.5"><Plus className="h-3.5 w-3.5" /> Connect</Button>
                )}
              </div>
            </Card>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
