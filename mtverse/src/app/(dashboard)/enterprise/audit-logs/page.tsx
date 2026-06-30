"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Search, Download, Shield, ShieldAlert, ShieldCheck, AlertTriangle,
  CheckCircle2, XCircle, Filter, Lock, KeyRound, UserCog, FileText,
  Globe, Clock, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  status: "success" | "failed";
  severity: "low" | "medium" | "high";
  ip: string;
  location: string;
  timestamp: string;
  category: "auth" | "config" | "data" | "admin" | "api";
};

const entries: AuditEntry[] = [
  { id: "e1", actor: "admin@mtverse.io", action: "User role escalated to Admin", resource: "user: priya.sharma", status: "success", severity: "high", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 14:32:18", category: "admin" },
  { id: "e2", actor: "system", action: "Failed login attempt", resource: "user: tom.henry@ext.com", status: "failed", severity: "high", ip: "45.227.89.12", location: "Unknown (VPN)", timestamp: "2024-10-22 14:28:42", category: "auth" },
  { id: "e3", actor: "alex.morgan@mtverse.io", action: "API key created with admin scope", resource: "key: Production API", status: "success", severity: "high", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 14:15:09", category: "api" },
  { id: "e4", actor: "marcus.chen@mtverse.io", action: "Password changed", resource: "account: marcus.chen", status: "success", severity: "medium", ip: "172.16.8.91", location: "New York, US", timestamp: "2024-10-22 14:02:55", category: "auth" },
  { id: "e5", actor: "system", action: "MFA verification failed", resource: "user: sarah.williams", status: "failed", severity: "medium", ip: "10.0.4.78", location: "Austin, US", timestamp: "2024-10-22 13:48:11", category: "auth" },
  { id: "e6", actor: "priya.sharma@mtverse.io", action: "Exported audit log (CSV)", resource: "audit_logs.csv (8,432 rows)", status: "success", severity: "medium", ip: "10.0.4.112", location: "London, UK", timestamp: "2024-10-22 13:34:22", category: "data" },
  { id: "e7", actor: "admin@mtverse.io", action: "Modified SSO configuration", resource: "SAML: Okta integration", status: "success", severity: "high", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 13:21:48", category: "config" },
  { id: "e8", actor: "system", action: "Suspicious IP blocked", resource: "ip: 203.0.113.45", status: "failed", severity: "high", ip: "203.0.113.45", location: "Blocked (Brute force)", timestamp: "2024-10-22 13:08:33", category: "auth" },
  { id: "e9", actor: "daniel.kim@mtverse.io", action: "Revoked API key", resource: "key: Legacy Integration", status: "success", severity: "medium", ip: "10.0.4.203", location: "Toronto, CA", timestamp: "2024-10-22 12:55:19", category: "api" },
  { id: "e10", actor: "lena.park@mtverse.io", action: "Accessed sensitive report", resource: "report: Q4 financial summary", status: "success", severity: "medium", ip: "192.168.1.55", location: "Berlin, DE", timestamp: "2024-10-22 12:42:07", category: "data" },
  { id: "e11", actor: "admin@mtverse.io", action: "Disabled 2FA for user", resource: "user: tom.henry", status: "success", severity: "high", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 12:28:54", category: "config" },
  { id: "e12", actor: "system", action: "Rate limit exceeded", resource: "ip: 45.227.89.12", status: "failed", severity: "medium", ip: "45.227.89.12", location: "Unknown (VPN)", timestamp: "2024-10-22 12:15:38", category: "api" },
  { id: "e13", actor: "jordan.reyes@mtverse.io", action: "Updated role permissions", resource: "role: Manager", status: "success", severity: "high", ip: "10.0.4.78", location: "Austin, US", timestamp: "2024-10-22 12:02:14", category: "admin" },
  { id: "e14", actor: "alex.morgan@mtverse.io", action: "Granted data export access", resource: "user: marcus.chen", status: "success", severity: "medium", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 11:48:51", category: "admin" },
  { id: "e15", actor: "system", action: "Session expired and revoked", resource: "user: sarah.williams", status: "success", severity: "low", ip: "10.0.4.78", location: "Austin, US", timestamp: "2024-10-22 11:35:29", category: "auth" },
  { id: "e16", actor: "priya.sharma@mtverse.io", action: "Updated retention policy", resource: "Data retention: 365 days", status: "success", severity: "medium", ip: "10.0.4.112", location: "London, UK", timestamp: "2024-10-22 11:22:18", category: "config" },
  { id: "e17", actor: "admin@mtverse.io", action: "Created compliance export", resource: "GDPR data request #4821", status: "success", severity: "high", ip: "192.168.1.24", location: "San Francisco, US", timestamp: "2024-10-22 11:08:44", category: "data" },
  { id: "e18", actor: "system", action: "Failed token refresh", resource: "user: lena.park", status: "failed", severity: "low", ip: "192.168.1.55", location: "Berlin, DE", timestamp: "2024-10-22 10:55:32", category: "auth" },
];

const filterChips = [
  { key: "all", label: "All events", icon: Shield },
  { key: "success", label: "Successful", icon: CheckCircle2 },
  { key: "failed", label: "Failed", icon: XCircle },
  { key: "high", label: "High severity", icon: ShieldAlert },
];

const categoryStyles: Record<AuditEntry["category"], string> = {
  auth: "bg-primary/10 text-primary border-primary/20",
  config: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  data: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  admin: "bg-destructive/10 text-destructive border-destructive/20",
  api: "bg-sky-500/10 text-sky-600 border-sky-500/20",
};

export default function AuditLogsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (activeFilter === "success" && e.status !== "success") return false;
      if (activeFilter === "failed" && e.status !== "failed") return false;
      if (activeFilter === "high" && e.severity !== "high") return false;
      if (categoryFilter && e.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.actor.toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q) ||
          e.resource.toLowerCase().includes(q) ||
          e.ip.includes(q) ||
          e.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilter, categoryFilter, search]);

  const successCount = entries.filter((e) => e.status === "success").length;
  const failedCount = entries.filter((e) => e.status === "failed").length;
  const highCount = entries.filter((e) => e.severity === "high").length;

  const handleExport = () => {
    toast.success("Audit log export queued", {
      description: `${filtered.length} entries will be emailed to compliance@mtverse.io as a signed PDF.`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Immutable security and compliance audit trail. Every privileged action across the workspace is recorded here."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Audit Logs" }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="size-4 mr-2" /> Advanced
            </Button>
            <Button size="sm" className="h-9" onClick={handleExport}>
              <Download className="size-4 mr-2" /> Export signed PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Events (30d)" value={entries.length.toLocaleString()} icon={<Shield className="size-5" />} deltaLabel="all categories" />
        <StatCard label="Successful" value={successCount} icon={<ShieldCheck className="size-5" />} deltaLabel="audited actions" />
        <StatCard label="Failed Attempts" value={failedCount} icon={<XCircle className="size-5" />} delta={-2} deltaLabel="vs last week" />
        <StatCard label="High Severity" value={highCount} icon={<ShieldAlert className="size-5" />} delta={1} deltaLabel="requires review" />
      </div>

      <SectionCard
        title="Security event log"
        description="Tamper-evident record of all privileged operations"
        noBodyPadding
        actions={
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1">
            <Lock className="size-3" /> Hash-verified
          </Badge>
        }
      >
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => {
              const active = activeFilter === chip.key;
              return (
                <button
                  key={chip.key}
                  onClick={() => setActiveFilter(chip.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:bg-accent"
                  }`}
                >
                  <chip.icon className="size-3.5" /> {chip.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search actor, action, resource, IP, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(["auth", "config", "data", "admin", "api"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border capitalize transition-colors ${
                    categoryFilter === c
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>IP / Location</TableHead>
              <TableHead className="pr-5">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-12">
                  No audit entries match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((e) => (
                <TableRow key={e.id} className="hover:bg-accent/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2.5">
                      {e.actor === "system" ? (
                        <div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Shield className="size-3.5" />
                        </div>
                      ) : (
                        <Avatar className="size-7">
                          <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                            {e.actor.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-sm font-medium">{e.actor === "system" ? "System" : e.actor.split("@")[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{e.action}</TableCell>
                  <TableCell className="text-sm font-mono text-xs text-muted-foreground">{e.resource}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize ${categoryStyles[e.category]}`}>{e.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {e.status === "success" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1">
                        <CheckCircle2 className="size-3" /> Success
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
                        <XCircle className="size-3" /> Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      e.severity === "high" ? "bg-destructive/10 text-destructive border-destructive/20" :
                      e.severity === "medium" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-muted text-muted-foreground border-border"
                    }>
                      {e.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-mono text-muted-foreground">{e.ip}</div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Globe className="size-3" /> {e.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="pr-5 text-xs text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3" /> {e.timestamp}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Compliance status" description="Certifications and standards we maintain">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "SOC 2 Type II", status: "Certified", date: "Aug 2024" },
              { name: "ISO 27001", status: "Certified", date: "Jul 2024" },
              { name: "GDPR", status: "Compliant", date: "Ongoing" },
              { name: "HIPAA", status: "Ready", date: "Sep 2024" },
              { name: "PCI DSS", status: "Level 1", date: "Jun 2024" },
              { name: "CCPA", status: "Compliant", date: "Ongoing" },
            ].map((c) => (
              <div key={c.name} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{c.name}</span>
                  <CheckCircle2 className="size-4 text-success" />
                </div>
                <p className="text-xs text-muted-foreground">{c.status} · {c.date}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Security recommendations" description="Items requiring your attention">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold">3 failed login attempts from unknown IP</p>
                <p className="text-xs text-muted-foreground mt-0.5">IP 45.227.89.12 attempted to access tom.henry@ext.com 3 times. IP has been auto-blocked.</p>
                <Button variant="outline" size="sm" className="h-7 mt-2 text-xs" onClick={() => toast.info("Reviewing blocked IP list")}>
                  Review blocked IPs
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
              <KeyRound className="size-4 text-warning mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold">2 admin-scope API keys unrotated for 90+ days</p>
                <p className="text-xs text-muted-foreground mt-0.5">Rotate keys to maintain security posture. Last rotation: 96 days ago.</p>
                <Button variant="outline" size="sm" className="h-7 mt-2 text-xs" onClick={() => toast.info("Open API keys page")}>
                  Rotate keys
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-info/5 border border-info/20">
              <UserCog className="size-4 text-info mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold">SSO configuration modified</p>
                <p className="text-xs text-muted-foreground mt-0.5">Okta SAML integration was updated by admin@mtverse.io. Verify changes with your IdP.</p>
                <Button variant="outline" size="sm" className="h-7 mt-2 text-xs" onClick={() => toast.info("Opening SSO settings")}>
                  View SSO settings
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <FileText className="size-4 text-success mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold">Monthly compliance report ready</p>
                <p className="text-xs text-muted-foreground mt-0.5">October SOC 2 evidence pack is available for download.</p>
                <Button variant="outline" size="sm" className="h-7 mt-2 text-xs" onClick={() => toast.success("Report downloaded")}>
                  Download report
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
