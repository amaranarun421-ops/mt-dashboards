"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Copy, Eye, EyeOff, Trash2, Key, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const keys = [
  { name: "Production API", key: "nx_prod_8a4f2c9b1e3d7f6a", created: "Jun 12, 2026", lastUsed: "2 min ago", requests: "1.2M", status: "active" },
  { name: "Staging API", key: "nx_stg_3b7e9d1c4f2a8b6e", created: "Jun 8, 2026", lastUsed: "1 hour ago", requests: "284K", status: "active" },
  { name: "Development", key: "nx_dev_5c2f8a1b9e3d4f7c", created: "May 28, 2026", lastUsed: "Yesterday", requests: "42K", status: "active" },
  { name: "Legacy Mobile App", key: "nx_legacy_9d4e2b1c8a3f5e7d", created: "Jan 15, 2026", lastUsed: "3 months ago", requests: "8.4K", status: "revoked" },
];

export function ApiKeysPage() {
  const [visible, setVisible] = React.useState<Record<number, boolean>>({});
  return (
    <div>
      <PageHeader
        breadcrumb={["Account", "API Keys"]}
        title="API Keys"
        description="Manage authentication keys for programmatic access to the API."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Generate Key</Button>}
      />
      <Card className="mb-4 border-2 border-brand-500/20 bg-gradient-to-br from-primary/5 to-transparent p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500"><Key className="h-6 w-6" /></div>
          <div className="flex-1">
            <p className="text-base font-bold">API Usage This Month</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">1.5M / 5M requests · 30% of quota used</p>
          </div>
          <Button variant="outline">View Docs</Button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-full rounded-full bg-brand-500" style={{ width: "30%" }} /></div>
      </Card>
      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-border/50">
          {keys.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group flex flex-wrap items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500"><Key className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{k.name}</p>
                  <StatusBadge variant={k.status === "active" ? "success" : "error"} dot>{k.status}</StatusBadge>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 font-mono text-xs">{visible[i] ? k.key : k.key.slice(0, 8) + "•".repeat(20)}</code>
                  <button onClick={() => setVisible((v) => ({ ...v, [i]: !v[i] }))} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:text-white/90">{visible[i] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:text-white/90"><Copy className="h-3.5 w-3.5" /></button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Created {k.created} · Last used {k.lastUsed} · {k.requests} requests</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-error-600 dark:text-error-500"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
