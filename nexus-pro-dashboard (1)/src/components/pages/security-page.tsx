"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield, KeyRound, Smartphone, Lock, Eye, AlertTriangle, CheckCircle2, Fingerprint, Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge, StatusBadge } from "@/components/common/status-badge";

export function Security() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "Security"]} title="Security Settings" description="Protect your account with advanced security features." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Security Score", value: "92/100", icon: Shield, color: "bg-success-50 text-success-600 dark:bg-success-500/15" },
          { label: "Active Devices", value: "3", icon: Smartphone, color: "bg-brand-50 text-brand-500 dark:bg-brand-500/15" },
          { label: "Last Login", value: "2h ago", icon: KeyRound, color: "bg-warning-50 text-warning-600 dark:bg-warning-500/15" },
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

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Authentication</h3>
            <div className="space-y-1">
              {[
                { icon: Lock, title: "Password", desc: "Last changed 3 months ago", action: "Change", enabled: true },
                { icon: Smartphone, title: "Two-Factor Authentication", desc: "Add an extra layer of security", toggle: true, enabled: true },
                { icon: Fingerprint, title: "Biometric Login", desc: "Use fingerprint or face ID", toggle: true, enabled: false },
                { icon: KeyRound, title: "Passkeys", desc: "Passwordless authentication", action: "Setup", enabled: false },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} initial={{opacity:0, x:-8}} animate={{opacity:1, x:0}} transition={{delay: i*0.05}} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"><Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{s.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                    </div>
                    {s.toggle ? <Switch defaultChecked={s.enabled} /> : <Button variant="outline" size="sm">{s.action}</Button>}
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Login Alerts</h3>
            <div className="space-y-1">
              {[
                { title: "New device login", desc: "Email when a new device accesses your account", enabled: true },
                { title: "Suspicious activity", desc: "Alert on unusual login patterns", enabled: true },
                { title: "Password changes", desc: "Notify when password is changed", enabled: true },
                { title: "API key usage", desc: "Alert on new API key creation", enabled: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div><p className="text-sm font-medium text-gray-800 dark:text-white/90">{s.title}</p><p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p></div>
                  <Switch defaultChecked={s.enabled} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Download className="h-3.5 w-3.5" /> Export</Button>
            </div>
            <div className="space-y-3">
              {[
                { icon: CheckCircle2, color: "text-success-600 bg-success-50 dark:bg-success-500/15", title: "Successful login", desc: "Chrome on macOS · San Francisco, CA", time: "2 hours ago", ip: "192.168.1.42" },
                { icon: AlertTriangle, color: "text-warning-600 bg-warning-50 dark:bg-warning-500/15", title: "Failed login attempt", desc: "Unknown device · Lagos, Nigeria", time: "5 hours ago", ip: "41.58.12.90" },
                { icon: KeyRound, color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15", title: "API key created", desc: "Production API key generated", time: "Yesterday", ip: "192.168.1.42" },
                { icon: Lock, color: "text-info-500 bg-blue-light-50 dark:bg-blue-light-500/15", title: "Password changed", desc: "Password updated successfully", time: "3 days ago", ip: "192.168.1.42" },
                { icon: Smartphone, color: "text-gray-500 bg-gray-100 dark:bg-gray-800", title: "New device authorized", desc: "iPhone 15 Pro · Safari", time: "1 week ago", ip: "10.0.0.12" },
              ].map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{delay: i*0.04}} className="flex gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.color}`}><Icon className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{a.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.time} · IP: {a.ip}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-error-200 bg-error-50/50 dark:border-error-500/30 dark:bg-error-500/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-error-500" />
              <h3 className="text-lg font-semibold text-error-600 dark:text-error-500">Danger Zone</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Irreversible actions. Please proceed with caution.</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-error-600 border-error-200 hover:bg-error-50 dark:border-error-500/30">Sign out all devices</Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-error-600 border-error-200 hover:bg-error-50 dark:border-error-500/30">Delete account permanently</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
