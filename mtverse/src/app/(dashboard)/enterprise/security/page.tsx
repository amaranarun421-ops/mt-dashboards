"use client";

import * as React from "react";
import { useState } from "react";
import {
  Shield, ShieldCheck, ShieldAlert, Lock, KeyRound, Smartphone, Eye,
  AlertTriangle, CheckCircle2, XCircle, Clock, Activity, Globe, RefreshCw,
  Wrench, Zap, UserCog, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { RadialProgress } from "@/components/charts";
import { toast } from "sonner";

type Check = {
  id: string;
  title: string;
  description: string;
  status: "healthy" | "warning" | "critical";
  icon: React.ElementType;
  action: "Review" | "Fix";
  detail: string;
};

const securityChecks: Check[] = [
  { id: "c1", title: "Two-factor authentication", description: "2FA is enabled on your account via authenticator app", status: "healthy", icon: Smartphone, action: "Review", detail: "Enabled 3 months ago" },
  { id: "c2", title: "Password strength", description: "Your password is strong and hasn't been compromised", status: "healthy", icon: Lock, action: "Review", detail: "Last changed 24 days ago" },
  { id: "c3", title: "Recent login activity", description: "5 active sessions, 1 from a new location", status: "warning", icon: Activity, action: "Review", detail: "Review Berlin, DE login" },
  { id: "c4", title: "Connected apps", description: "3 third-party apps have access to your account", status: "healthy", icon: Eye, action: "Review", detail: "All scopes verified" },
  { id: "c5", title: "API key rotation", description: "2 admin-scope keys haven't been rotated in 90+ days", status: "critical", icon: KeyRound, action: "Fix", detail: "Rotate immediately" },
  { id: "c6", title: "SSO configuration", description: "SAML SSO is configured and verified with Okta", status: "healthy", icon: ShieldCheck, action: "Review", detail: "Last verified 2 days ago" },
  { id: "c7", title: "Recovery codes", description: "8 of 10 backup codes remaining", status: "warning", icon: RefreshCw, action: "Review", detail: "Generate new codes" },
  { id: "c8", title: "Data encryption", description: "All data is encrypted with customer-managed keys", status: "healthy", icon: Lock, action: "Review", detail: "AES-256 active" },
];

const securityEvents = [
  { id: "e1", event: "Failed login attempt", actor: "tom.henry@ext.com", ip: "45.227.89.12", location: "Unknown (VPN)", severity: "high", status: "blocked", timestamp: "2 hours ago" },
  { id: "e2", event: "New device login", actor: "alex.morgan@mtverse.io", ip: "192.168.1.24", location: "San Francisco, US", severity: "medium", status: "approved", timestamp: "5 hours ago" },
  { id: "e3", event: "API key created", actor: "admin@mtverse.io", ip: "192.168.1.24", location: "San Francisco, US", severity: "high", status: "approved", timestamp: "8 hours ago" },
  { id: "e4", event: "Password changed", actor: "marcus.chen@mtverse.io", ip: "172.16.8.91", location: "New York, US", severity: "medium", status: "approved", timestamp: "1 day ago" },
  { id: "e5", event: "2FA disabled", actor: "tom.henry@ext.com", ip: "192.168.1.24", location: "San Francisco, US", severity: "high", status: "approved", timestamp: "2 days ago" },
  { id: "e6", event: "Rate limit exceeded", actor: "system", ip: "45.227.89.12", location: "Unknown (VPN)", severity: "medium", status: "blocked", timestamp: "2 days ago" },
  { id: "e7", event: "Suspicious IP blocked", actor: "system", ip: "203.0.113.45", location: "Blocked", severity: "high", status: "blocked", timestamp: "3 days ago" },
  { id: "e8", event: "Recovery codes generated", actor: "alex.morgan@mtverse.io", ip: "192.168.1.24", location: "San Francisco, US", severity: "low", status: "approved", timestamp: "4 days ago" },
];

const statusConfig = {
  healthy: { color: "bg-success/10 text-success border-success/20", icon: CheckCircle2, label: "Healthy" },
  warning: { color: "bg-warning/10 text-warning border-warning/20", icon: AlertTriangle, label: "Needs attention" },
  critical: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle, label: "Critical" },
};

export default function SecurityPage() {
  const [checks, setChecks] = useState(securityChecks);

  const score = Math.round(
    (checks.filter((c) => c.status === "healthy").length * 100 +
      checks.filter((c) => c.status === "warning").length * 60 +
      checks.filter((c) => c.status === "critical").length * 20) / checks.length
  );

  const healthyCount = checks.filter((c) => c.status === "healthy").length;
  const warningCount = checks.filter((c) => c.status === "warning").length;
  const criticalCount = checks.filter((c) => c.status === "critical").length;

  const handleAction = (check: Check) => {
    if (check.action === "Fix") {
      setChecks((prev) => prev.map((c) => (c.id === check.id ? { ...c, status: "healthy", action: "Review", detail: "Resolved just now" } : c)));
      toast.success(`"${check.title}" resolved`, { description: "Security posture improved." });
    } else {
      toast.info(`Reviewing ${check.title.toLowerCase()}...`);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Center"
        description="Monitor your account security posture, review alerts, and take action on potential threats."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Security" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast.success("Security report downloaded")}>
            <Download className="size-4 mr-2" /> Export report
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Security score" description="Overall security posture" className="lg:col-span-1">
          <div className="flex flex-col items-center py-4">
            <RadialProgress
              value={score}
              height={200}
              color={score >= 80 ? "var(--success)" : score >= 60 ? "var(--warning)" : "var(--destructive)"}
              label="Security score"
            />
            <div className="flex items-center gap-1.5 mt-3">
              {score >= 80 ? (
                <ShieldCheck className="size-4 text-success" />
              ) : score >= 60 ? (
                <ShieldAlert className="size-4 text-warning" />
              ) : (
                <ShieldAlert className="size-4 text-destructive" />
              )}
              <span className="text-sm font-medium">
                {score >= 80 ? "Strong security posture" : score >= 60 ? "Moderate — improve to reach 80+" : "At risk — fix critical issues"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full mt-5">
              <div className="text-center p-2 rounded-lg bg-success/5">
                <p className="text-lg font-bold text-success">{healthyCount}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Healthy</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-warning/5">
                <p className="text-lg font-bold text-warning">{warningCount}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Warning</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-destructive/5">
                <p className="text-lg font-bold text-destructive">{criticalCount}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Critical</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Security checks"
          description="Review and resolve potential issues"
          className="lg:col-span-2"
        >
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {checks.map((c) => {
              const cfg = statusConfig[c.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={c.id} className={`p-4 rounded-lg border ${cfg.color}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-background/80 shrink-0">
                      <c.icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{c.title}</p>
                        <Badge variant="outline" className={`gap-1 font-normal ${cfg.color}`}>
                          <StatusIcon className="size-3" /> {cfg.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                      <p className="text-xs mt-1.5">{c.detail}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={c.action === "Fix" ? "default" : "outline"}
                      className="h-7 text-xs shrink-0"
                      onClick={() => handleAction(c)}
                    >
                      {c.action === "Fix" ? <><Wrench className="size-3 mr-1" /> Fix</> : <><Eye className="size-3 mr-1" /> Review</>}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Active Sessions" value="5" icon={<Smartphone className="size-5" />} deltaLabel="across 3 devices" />
        <StatCard label="Failed Logins (24h)" value="3" icon={<XCircle className="size-5" />} delta={-2} deltaLabel="vs yesterday" />
        <StatCard label="Blocked IPs" value="42" icon={<ShieldAlert className="size-5" />} delta={8} deltaLabel="this week" />
        <StatCard label="Days Since Breach" value="0" icon={<ShieldCheck className="size-5" />} deltaLabel="no known breaches" />
      </div>

      <SectionCard
        title="Recent security events"
        description="Suspicious or noteworthy activity in the last 7 days"
        noBodyPadding
        actions={<Badge variant="outline" className="bg-info/10 text-info border-info/20">{securityEvents.length} events</Badge>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Event</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>IP / Location</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityEvents.map((e) => (
              <TableRow key={e.id} className="hover:bg-accent/50">
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${
                      e.severity === "high" ? "bg-destructive" :
                      e.severity === "medium" ? "bg-warning" : "bg-muted-foreground"
                    }`} />
                    <span className="text-sm font-medium">{e.event}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {e.actor === "system" ? (
                      <div className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Shield className="size-3" />
                      </div>
                    ) : (
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[9px] bg-muted text-muted-foreground">
                          {e.actor.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="text-xs">{e.actor === "system" ? "System" : e.actor.split("@")[0]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="font-mono text-muted-foreground">{e.ip}</div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Globe className="size-3" /> {e.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    e.severity === "high" ? "bg-destructive/10 text-destructive border-destructive/20" :
                    e.severity === "medium" ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-muted text-muted-foreground border-border"
                  }>{e.severity}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    e.status === "blocked" ? "bg-destructive/10 text-destructive border-destructive/20 gap-1" : "bg-success/10 text-success border-success/20 gap-1"
                  }>
                    {e.status === "blocked" ? <XCircle className="size-3" /> : <CheckCircle2 className="size-3" />}
                    {e.status === "blocked" ? "Blocked" : "Approved"}
                  </Badge>
                </TableCell>
                <TableCell className="pr-5 text-xs text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3" /> {e.timestamp}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Active sessions" description="Devices currently signed in">
          <div className="space-y-3">
            {[
              { device: "MacBook Pro · Chrome", location: "San Francisco, US", ip: "192.168.1.24", current: true, time: "Now" },
              { device: "iPhone 15 Pro · Safari", location: "San Francisco, US", ip: "10.0.4.91", current: false, time: "1h ago" },
              { device: "Windows PC · Edge", location: "New York, US", ip: "172.16.8.91", current: false, time: "3d ago" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Smartphone className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{s.device}</p>
                    {s.current && <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px] h-4 px-1">Current</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.location} · {s.ip} · {s.time}</p>
                </div>
                {!s.current && (
                  <Button variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive" onClick={() => toast.success("Session revoked")}>
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recommended actions" description="Steps to improve your security score">
          <div className="space-y-3">
            {[
              { icon: KeyRound, title: "Rotate 2 admin API keys", desc: "Keys over 90 days old should be rotated.", priority: "Critical" },
              { icon: UserCog, title: "Review 2FA on team members", desc: "3 members haven't enabled 2FA yet.", priority: "High" },
              { icon: RefreshCw, title: "Generate new recovery codes", desc: "8 of 10 codes remaining.", priority: "Medium" },
              { icon: Zap, title: "Enable IP whitelist", desc: "Restrict access to known IP ranges only.", priority: "Low" },
            ].map((r) => (
              <div key={r.title} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <r.icon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{r.title}</p>
                    <Badge variant="outline" className={
                      r.priority === "Critical" ? "bg-destructive/10 text-destructive border-destructive/20 text-[10px] h-4 px-1" :
                      r.priority === "High" ? "bg-warning/10 text-warning border-warning/20 text-[10px] h-4 px-1" :
                      "bg-muted text-muted-foreground border-border text-[10px] h-4 px-1"
                    }>{r.priority}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs shrink-0" onClick={() => toast.info(`Resolving: ${r.title}`)}>
                  Resolve
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
