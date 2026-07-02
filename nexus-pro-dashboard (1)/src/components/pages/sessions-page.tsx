"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, Globe, Clock, X, Shield } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/common/status-badge";

const sessions = [
  { device: "MacBook Pro", browser: "Chrome 126", os: "macOS Sonoma", location: "San Francisco, CA", ip: "192.168.1.42", lastActive: "Active now", current: true, icon: Monitor },
  { device: "iPhone 15 Pro", browser: "Safari", os: "iOS 17.5", location: "San Francisco, CA", ip: "10.0.0.12", lastActive: "2 hours ago", current: false, icon: Smartphone },
  { device: "iPad Air", browser: "Safari", os: "iPadOS 17.5", location: "San Francisco, CA", ip: "10.0.0.18", lastActive: "1 day ago", current: false, icon: Tablet },
  { device: "Windows PC", browser: "Edge 126", os: "Windows 11", location: "New York, NY", ip: "68.42.10.90", lastActive: "3 days ago", current: false, icon: Monitor },
  { device: "Android Phone", browser: "Chrome", os: "Android 14", location: "Austin, TX", ip: "24.28.90.12", lastActive: "1 week ago", current: false, icon: Smartphone },
];

export function Sessions() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "Active Sessions"]} title="Active Sessions" description="Manage devices currently signed in to your account." actions={<Button variant="outline" size="sm" className="gap-1.5 text-error-600"><X className="h-4 w-4" /> Revoke All</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Sessions", value: "5", icon: Shield, color: "bg-brand-50 text-brand-500 dark:bg-brand-500/15" },
          { label: "Active Now", value: "1", icon: Globe, color: "bg-success-50 text-success-600 dark:bg-success-500/15" },
          { label: "This Month", value: "12", icon: Clock, color: "bg-warning-50 text-warning-600 dark:bg-warning-500/15" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: i*0.05}}>
              <Card className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${s.color}`}><Icon className="h-5 w-5" /></div>
                <p className="font-bold text-gray-800 text-lg dark:text-white/90">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="space-y-3">
        {sessions.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay: i*0.04}}>
              <Card className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.current ? "bg-success-50 text-success-600 dark:bg-success-500/15" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 dark:text-white/90">{s.device}</p>
                      {s.current && <StatusBadge variant="success" dot pulse>This device</StatusBadge>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{s.browser} · {s.os}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{s.location}</span>
                      <span>·</span>
                      <span>IP: {s.ip}</span>
                      <span>·</span>
                      <span>{s.lastActive}</span>
                    </div>
                  </div>
                  {!s.current && <Button variant="outline" size="sm" className="text-error-600 border-error-200 hover:bg-error-50 dark:border-error-500/30">Revoke</Button>}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
