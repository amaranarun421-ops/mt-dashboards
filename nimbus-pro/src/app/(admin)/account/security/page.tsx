"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Input, Label, Switch, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Shield, Smartphone, Monitor, Check, AlertTriangle, Lock, Eye, EyeOff,
  Download, Copy, RefreshCw, MapPin, Clock,
} from "lucide-react";

const SESSIONS = [
  { id: 1, device: "MacOS · Chrome 119", location: "Mumbai, IN", ip: "103.21.42.18", last: "Active now", current: true, icon: Monitor },
  { id: 2, device: "iOS · Safari", location: "Mumbai, IN", ip: "103.21.42.18", last: "2 hours ago", current: false, icon: Smartphone },
  { id: 3, device: "Windows · Edge", location: "Bengaluru, IN", ip: "49.36.82.4", last: "Yesterday", current: false, icon: Monitor },
  { id: 4, device: "Android · Chrome", location: "Pune, IN", ip: "157.32.14.91", last: "3 days ago", current: false, icon: Smartphone },
];

const LOGIN_HISTORY = [
  { id: 1, time: "2026-06-28 09:42", device: "MacOS · Chrome", location: "Mumbai, IN", ip: "103.21.42.18", status: "success" },
  { id: 2, time: "2026-06-28 08:11", device: "Unknown · Firefox", location: "Unknown", ip: "194.32.18.6", status: "failed" },
  { id: 3, time: "2026-06-27 18:24", device: "MacOS · Chrome", location: "Mumbai, IN", ip: "103.21.42.18", status: "success" },
  { id: 4, time: "2026-06-27 14:02", device: "MacOS · Chrome", location: "Mumbai, IN", ip: "103.21.42.18", status: "success" },
  { id: 5, time: "2026-06-26 22:18", device: "iOS · Safari", location: "Mumbai, IN", ip: "103.21.42.18", status: "success" },
  { id: 6, time: "2026-06-26 07:09", device: "Unknown · Curl", location: "Singapore", ip: "129.126.42.18", status: "failed" },
];

const CHECKLIST = [
  { id: 1, label: "Strong password", desc: "Use 12+ characters with mix of case, numbers, symbols", done: true, tone: "success" },
  { id: 2, label: "Two-factor authentication", desc: "Add an extra verification step", done: true, tone: "success" },
  { id: 3, label: "Backup recovery codes", desc: "Downloaded and stored securely", done: false, tone: "warning" },
  { id: 4, label: "Recent password review", desc: "Updated within the last 90 days", done: false, tone: "warning" },
  { id: 5, label: "Trusted devices audit", desc: "Revoke unused sessions", done: true, tone: "success" },
];

const RECOVERY_CODES = ["H7K2-9P4Q", "M8N3-X1ZR", "B5L6-J2VW", "T9Y4-K7DC", "F2A8-E3MN", "P6G1-S5HO", "Q4R9-W8UK", "L3X7-V2BT"];

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [newPass, setNewPass] = useState("");

  const strength = (() => {
    if (!newPass) return 0;
    let s = 0;
    if (newPass.length >= 8) s += 25;
    if (newPass.length >= 12) s += 15;
    if (/[A-Z]/.test(newPass)) s += 15;
    if (/[a-z]/.test(newPass)) s += 15;
    if (/[0-9]/.test(newPass)) s += 15;
    if (/[^A-Za-z0-9]/.test(newPass)) s += 15;
    return Math.min(100, s);
  })();

  const strengthTone = strength < 40 ? "error" : strength < 70 ? "warning" : "success";
  const strengthLabel = strength < 40 ? "Weak" : strength < 70 ? "Fair" : "Strong";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Security"
        description="Protect your account with strong authentication and audit your sign-in activity."
        breadcrumbs={[{ label: "Account" }, { label: "Security" }]}
        actions={<Button variant="secondary"><Download className="h-4 w-4" /> Export audit log</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Password */}
        <Card className="lg:col-span-2">
          <CardHeader title="Change Password" description="Choose a strong, unique password" action={<Lock className="h-4 w-4 text-gray-400" />} />
          <CardBody className="space-y-4">
            <div>
              <Label required>Current password</Label>
              <div className="relative">
                <Input type={showCurrent ? "text" : "password"} placeholder="••••••••" />
                <button onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle visibility">
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label required>New password</Label>
                <div className="relative">
                  <Input type={showNew ? "text" : "password"} placeholder="••••••••" value={newPass} onChange={(e) => setNewPass(e.target.value)} error={strength < 40 && newPass.length > 0} />
                  <button onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle visibility">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label required>Confirm new password</Label>
                <div className="relative">
                  <Input type={showConfirm ? "text" : "password"} placeholder="••••••••" />
                  <button onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle visibility">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            {newPass && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Password strength</span>
                  <span className={cn("font-semibold", strengthTone === "success" && "text-success-600 dark:text-success-400", strengthTone === "warning" && "text-warning-600 dark:text-warning-400", strengthTone === "error" && "text-error-600 dark:text-error-400")}>{strengthLabel}</span>
                </div>
                <Progress value={strength} tone={strengthTone as "success" | "warning" | "error"} />
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className={cn(newPass.length >= 8 ? "text-success-600 dark:text-success-400" : "")}>≥ 8 chars</span>
                  <span className={cn(/[A-Z]/.test(newPass) ? "text-success-600 dark:text-success-400" : "")}>Uppercase</span>
                  <span className={cn(/[0-9]/.test(newPass) ? "text-success-600 dark:text-success-400" : "")}>Number</span>
                  <span className={cn(/[^A-Za-z0-9]/.test(newPass) ? "text-success-600 dark:text-success-400" : "")}>Symbol</span>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button>Update password</Button>
            </div>
          </CardBody>
        </Card>

        {/* Checklist */}
        <Card>
          <CardHeader title="Security Checklist" description="Complete these to harden your account" action={<Shield className="h-4 w-4 text-gray-400" />} />
          <CardBody className="space-y-3">
            {CHECKLIST.map((c) => (
              <div key={c.id} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  c.done ? "bg-success-100 text-success-600 dark:bg-success-500/15 dark:text-success-400" : "bg-warning-100 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400"
                )}>
                  {c.done ? <Check className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* 2FA */}
      <Card>
        <CardHeader title="Two-Factor Authentication" description="Require a verification code in addition to your password" action={<Badge tone={twoFactor ? "success" : "gray"} variant="soft" dot>{twoFactor ? "Enabled" : "Disabled"}</Badge>} />
        <CardBody className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Authenticator app</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Use Google Authenticator, 1Password, or Authy</p>
              </div>
            </div>
            <Switch checked={twoFactor} onChange={setTwoFactor} />
          </div>
          {twoFactor && (
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Recovery codes</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Save these one-time codes in case you lose access to your authenticator.</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Download</Button>
                  <Button variant="outline" size="sm"><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-700 dark:bg-gray-800/40 dark:text-gray-300">
                {RECOVERY_CODES.map((c) => (
                  <div key={c} className="flex items-center justify-between">
                    <span>{c}</span>
                    <button aria-label="Copy code" className="text-gray-400 hover:text-brand-500"><Copy className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Active sessions */}
      <Card>
        <CardHeader title="Active Sessions" description="Devices currently signed in to your account" action={<Button variant="outline" size="sm">Sign out all</Button>} />
        <CardBody className="space-y-3">
          {SESSIONS.map((s) => (
            <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {s.device}
                    {s.current && <Badge tone="success" variant="soft" className="ml-2">This device</Badge>}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="h-3 w-3" /> {s.location} · <span className="font-mono">{s.ip}</span> · <Clock className="h-3 w-3" /> {s.last}
                  </p>
                </div>
              </div>
              {!s.current && <Button variant="outline" size="sm">Revoke</Button>}
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Login history */}
      <Card className="p-0">
        <CardHeader title="Login History" description="Recent sign-in attempts" className="border-b" action={<Button variant="ghost" size="sm">View all</Button>} />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Device</th>
                <th>Location</th>
                <th>IP Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOGIN_HISTORY.map((l) => (
                <tr key={l.id}>
                  <td className="font-mono text-xs text-gray-700 dark:text-gray-300">{l.time}</td>
                  <td className="text-sm text-gray-700 dark:text-gray-300">{l.device}</td>
                  <td className="text-sm text-gray-700 dark:text-gray-300">{l.location}</td>
                  <td className="font-mono text-xs text-gray-500 dark:text-gray-400">{l.ip}</td>
                  <td>
                    {l.status === "success" ? (
                      <Badge tone="success" variant="soft" dot>Success</Badge>
                    ) : (
                      <Badge tone="error" variant="soft" dot>Failed</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
