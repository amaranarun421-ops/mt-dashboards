'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Lock, KeyRound, Smartphone, Monitor, Activity, Shield, ShieldCheck,
  Check, Copy, Eye, EyeOff, AlertTriangle, CheckCircle2, XCircle, MapPin,
  Clock, LogOut, Download, RefreshCw, Fingerprint, Mail, AlertCircle, Zap,
} from 'lucide-react';

const ACTIVE_SESSIONS = [
  { id: 's1', device: 'MacBook Pro 16"', browser: 'Chrome 131 · macOS', location: 'San Francisco, CA', ip: '73.142.88.12', lastActive: 'Current session', current: true, icon: Monitor },
  { id: 's2', device: 'iPhone 15 Pro', browser: 'Pipeline Pilot iOS app', location: 'San Francisco, CA', ip: '73.142.88.13', lastActive: '5 minutes ago', current: false, icon: Smartphone },
  { id: 's3', device: 'Windows Desktop', browser: 'Edge 130 · Windows 11', location: 'Austin, TX', ip: '208.67.222.18', lastActive: '2 hours ago', current: false, icon: Monitor },
  { id: 's4', device: 'iPad Pro 12.9"', browser: 'Safari 18 · iPadOS', location: 'San Francisco, CA', ip: '73.142.88.14', lastActive: '1 day ago', current: false, icon: Monitor },
];

const PERSONAL_TOKENS = [
  { id: 't1', name: 'Local Dev Token', scopes: ['read', 'write'], created: 'Jun 12, 2025', lastUsed: '1h ago', expires: 'Sep 12, 2025' },
  { id: 't2', name: 'CI/CD Pipeline', scopes: ['read'], created: 'May 4, 2025', lastUsed: '4h ago', expires: 'Aug 4, 2025' },
  { id: 't3', name: 'Data Export Script', scopes: ['read', 'admin'], created: 'Mar 22, 2025', lastUsed: '2d ago', expires: 'Jun 22, 2025' },
];

const SECURITY_EVENTS = [
  { id: 'se1', event: 'Successful login', device: 'MacBook Pro · Chrome', ip: '73.142.88.12', time: '2m ago', severity: 'info', icon: CheckCircle2 },
  { id: 'se2', event: 'API key created', device: 'pk_live_8f3a2...', ip: '73.142.88.12', time: '1h ago', severity: 'info', icon: KeyRound },
  { id: 'se3', event: '2FA verification', device: 'Authenticator app', ip: '73.142.88.12', time: '2h ago', severity: 'info', icon: ShieldCheck },
  { id: 'se4', event: 'Failed login attempt', device: 'Unknown · Chrome', ip: '188.42.91.7', time: '1d ago', severity: 'warning', icon: AlertTriangle },
  { id: 'se5', event: 'Password changed', device: 'MacBook Pro · Chrome', ip: '73.142.88.12', time: '3d ago', severity: 'info', icon: Lock },
  { id: 'se6', event: 'Session revoked', device: 'iPad Pro', ip: '73.142.88.14', time: '4d ago', severity: 'warning', icon: LogOut },
  { id: 'se7', event: 'Recovery code used', device: 'MacBook Pro', ip: '73.142.88.12', time: '1w ago', severity: 'warning', icon: AlertCircle },
];

const SECURITY_CHECKS = [
  { id: 'pw', label: 'Strong password', done: true, hint: 'Last changed 3d ago' },
  { id: '2fa', label: 'Two-factor authentication', done: true, hint: 'Authenticator app' },
  { id: 'backup', label: 'Backup codes generated', done: true, hint: '10 of 10 unused' },
  { id: 'recovery', label: 'Recovery email set', done: true, hint: 'sarah.c@personal.io' },
  { id: 'sessions', label: 'Reviewed active sessions', done: false, hint: '4 active sessions' },
  { id: 'tokens', label: 'Reviewed API tokens', done: false, hint: '3 active tokens' },
];

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = React.useState('password');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showTokens, setShowTokens] = React.useState<Record<string, boolean>>({});
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  // Password strength calc
  const strength = React.useMemo(() => {
    let s = 0;
    if (password.length >= 8) s += 25;
    if (password.length >= 12) s += 15;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s += 20;
    if (/[0-9]/.test(password)) s += 20;
    if (/[^A-Za-z0-9]/.test(password)) s += 20;
    return Math.min(s, 100);
  }, [password]);

  const strengthLabel = strength < 40 ? 'Weak' : strength < 70 ? 'Fair' : strength < 90 ? 'Good' : 'Strong';
  const strengthColor = strength < 40 ? 'var(--destructive)' : strength < 70 ? 'var(--warning)' : strength < 90 ? 'var(--chart-1)' : 'var(--success)';

  const securityScore = Math.round((SECURITY_CHECKS.filter((c) => c.done).length / SECURITY_CHECKS.length) * 100);

  const handleCopyToken = (id: string) => {
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Settings"
        description="Manage your password, two-factor authentication, sessions, and security activity"
        icon={Lock}
        actions={
          <Button size="sm" variant="outline" className="bg-card border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Security report
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: tabbed settings (2/3) */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto grid grid-cols-2 sm:grid-cols-5 gap-1 bg-card border border-border rounded-xl p-1 overflow-x-auto">
              <TabsTrigger value="password" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Lock className="w-4 h-4" />
                <span className="text-[11px]">Password</span>
              </TabsTrigger>
              <TabsTrigger value="twofactor" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px]">Two-Factor</span>
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Monitor className="w-4 h-4" />
                <span className="text-[11px]">Sessions</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <KeyRound className="w-4 h-4" />
                <span className="text-[11px]">API Access</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Activity className="w-4 h-4" />
                <span className="text-[11px]">Activity</span>
              </TabsTrigger>
            </TabsList>

            {/* Password tab */}
            <TabsContent value="password" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Lock className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Change password</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cur-pw" className="text-xs font-medium">Current password</Label>
                  <div className="relative">
                    <Input
                      id="cur-pw"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      className="bg-card border-border pr-10"
                    />
                    <button
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-pw" className="text-xs font-medium">New password</Label>
                    <Input
                      id="new-pw"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 12 characters"
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-pw" className="text-xs font-medium">Confirm new password</Label>
                    <Input
                      id="confirm-pw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className={cn(
                        'bg-card border-border',
                        confirmPassword && password !== confirmPassword && 'border-destructive focus-visible:ring-destructive/30'
                      )}
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-[10px] text-destructive mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>

                {/* Strength meter */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Password strength</Label>
                      <span className="text-xs font-semibold" style={{ color: strengthColor }}>{strengthLabel}</span>
                    </div>
                    <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{ width: `${strength}%`, background: `linear-gradient(90deg, ${strengthColor}, color-mix(in oklch, ${strengthColor} 70%, transparent))` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {[
                        { label: '12+ chars', ok: password.length >= 12 },
                        { label: 'Upper & lower', ok: /[A-Z]/.test(password) && /[a-z]/.test(password) },
                        { label: 'Number', ok: /[0-9]/.test(password) },
                        { label: 'Symbol', ok: /[^A-Za-z0-9]/.test(password) },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center gap-1.5 text-[10px]">
                          {r.ok ? <Check className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground/40" />}
                          <span className={r.ok ? 'text-foreground' : 'text-muted-foreground'}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Log out of all devices after changing</p>
                      <p className="text-[11px] text-muted-foreground">Force all active sessions to re-authenticate</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button size="sm" className="h-8 text-xs" disabled={!password || password !== confirmPassword}>
                    <Lock className="w-3 h-3 mr-1.5" /> Update password
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border">
                    Forgot password?
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Two-Factor tab */}
            <TabsContent value="twofactor" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">Two-factor authentication</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3" /> Enabled
                  </span>
                </div>

                {/* 2FA status banner */}
                <div className="rounded-lg p-4 bg-gradient-to-br from-success/[0.08] to-transparent border border-success/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Two-factor authentication is active</p>
                      <p className="text-xs text-muted-foreground mt-1">Your account is protected with an authenticator app. Enabled on Mar 8, 2025.</p>
                    </div>
                  </div>
                </div>

                {/* 2FA methods */}
                <div className="space-y-3">
                  {[
                    { id: 'auth', name: 'Authenticator app', desc: 'Google Authenticator, 1Password, Authy', icon: Smartphone, color: 'var(--accent)', primary: true, status: 'Active' },
                    { id: 'sms', name: 'SMS backup', desc: '+1 (415) ••• •148', icon: Smartphone, color: 'var(--chart-1)', primary: false, status: 'Backup' },
                    { id: 'bio', name: 'Biometric unlock', desc: 'Touch ID / Face ID for desktop app', icon: Fingerprint, color: 'var(--chart-3)', primary: false, status: 'Active' },
                  ].map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30">
                      <div
                        className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `color-mix(in oklch, ${m.color} 12%, transparent)` }}
                      >
                        <m.icon className="w-4 h-4" style={{ color: m.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-foreground">{m.name}</p>
                          {m.primary && <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/30 font-medium">Primary</span>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded bg-card border border-border">{m.status}</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Configure</Button>
                    </div>
                  ))}
                </div>

                {/* Backup codes */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground">Backup codes</p>
                      <p className="text-[11px] text-muted-foreground">Use these one-time codes if you lose access to your authenticator</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
                      <RefreshCw className="w-3 h-3 mr-1.5" /> Regenerate
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['8f3a-2b9c', '4d7e-1a8f', '9c2b-5e6d', '1a8f-3c7b', '6e2d-9f4a', '7b3c-1d8e', '2a9f-5c4d', '8e1b-6a3c', '4d7c-9e2b', '3f8a-1c5d'].map((code, i) => (
                      <code
                        key={i}
                        className="text-[11px] font-mono text-center py-1.5 px-2 rounded bg-zinc-950 text-zinc-300 border border-border"
                      >
                        {i < 2 ? <span className="text-muted-foreground/40 line-through">{code}</span> : code}
                      </code>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">8 of 10 codes remaining · Last regenerated 2 weeks ago</p>
                </div>

                {/* Recovery email */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-chart-1/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-chart-1" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Recovery email</p>
                        <p className="text-[11px] text-muted-foreground">sarah.c@personal.io · Verified</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Change</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Sessions tab */}
            <TabsContent value="sessions" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">Active sessions</h3>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="w-3 h-3 mr-1.5" /> Revoke all others
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">{ACTIVE_SESSIONS.length} active sessions · Review and revoke any you don't recognize</p>

                <div className="space-y-2">
                  {ACTIVE_SESSIONS.map((s, i) => (
                    <div
                      key={s.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border transition-all animate-in fade-in slide-in-from-bottom-2 duration-500',
                        s.current ? 'border-accent/30 bg-accent/[0.04]' : 'border-border bg-secondary/30 hover:bg-secondary/60'
                      )}
                      style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                    >
                      <div className={cn('w-10 h-10 rounded-md flex items-center justify-center shrink-0', s.current ? 'bg-accent/15' : 'bg-secondary')}>
                        <s.icon className={cn('w-5 h-5', s.current ? 'text-accent' : 'text-muted-foreground')} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-semibold text-foreground">{s.device}</p>
                          {s.current && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-accent/30 bg-accent/10 text-accent">
                              <Check className="w-2.5 h-2.5" /> Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{s.browser}</p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{s.location}</span>
                          <span className="flex items-center gap-1"><Activity className="w-2.5 h-2.5" />{s.ip}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
                          <Clock className="w-2.5 h-2.5" /> {s.lastActive}
                        </p>
                        {!s.current && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 mt-1">
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* API Access tab */}
            <TabsContent value="api" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Personal access tokens</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">For scripts and integrations using your identity</p>
                    </div>
                  </div>
                  <Button size="sm" className="h-8 text-xs">
                    <KeyRound className="w-3 h-3 mr-1.5" /> New token
                  </Button>
                </div>

                <div className="space-y-3">
                  {PERSONAL_TOKENS.map((t, i) => (
                    <div
                      key={t.id}
                      className="rounded-lg border border-border bg-secondary/30 p-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
                      style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold text-foreground">{t.name}</p>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-success/30 bg-success/10 text-success">
                              <Check className="w-2.5 h-2.5" /> Active
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Created {t.created} · Expires {t.expires}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0">
                          Revoke
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-[11px] font-mono text-foreground bg-zinc-950 px-2.5 py-1.5 rounded truncate">
                          {showTokens[t.id] ? `pp_pat_${t.id}_8f3a2b9c4d7e1a8f9c2b5e6d` : `pp_pat_${t.id}_••••••••••••••••••••`}
                        </code>
                        <button
                          onClick={() => setShowTokens((p) => ({ ...p, [t.id]: !p[t.id] }))}
                          className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          {showTokens[t.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleCopyToken(t.id)}
                          className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-accent hover:bg-accent/10"
                        >
                          {copiedToken === t.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60">
                        <div className="flex flex-wrap gap-1">
                          {t.scopes.map((s) => (
                            <span
                              key={s}
                              className={cn(
                                'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                                s === 'admin' ? 'border-destructive/30 bg-destructive/10 text-destructive' : 'border-accent/30 bg-accent/10 text-accent'
                              )}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground">Last used {t.lastUsed}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg border border-warning/30 bg-warning/[0.04]">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Security best practices</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Use the principle of least privilege when assigning scopes. Rotate tokens every 90 days. Never commit tokens to version control.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Activity tab */}
            <TabsContent value="activity" className="mt-4">
              <div className="bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Security activity log</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Recent security-related events on your account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">Export</Button>
                </div>
                <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                  {SECURITY_EVENTS.map((e, i) => {
                    const sevColor = e.severity === 'warning' ? 'var(--warning)' : e.severity === 'critical' ? 'var(--destructive)' : 'var(--chart-1)';
                    return (
                      <div
                        key={e.id}
                        className="flex items-start gap-3 p-4 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-500"
                        style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                      >
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `color-mix(in oklch, ${sevColor} 14%, transparent)` }}
                        >
                          <e.icon className="w-4 h-4" style={{ color: sevColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{e.event}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{e.device}</p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Activity className="w-2.5 h-2.5" />{e.ip}</span>
                            <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{e.time}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs shrink-0">
                          Details
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar: Security score */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Security score</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-5">Your account's security posture</p>

            {/* Circular score */}
            <div className="flex justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--secondary)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={securityScore >= 80 ? 'var(--success)' : securityScore >= 50 ? 'var(--warning)' : 'var(--destructive)'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(securityScore / 100) * (2 * Math.PI * 42)} ${2 * Math.PI * 42}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground tabular-nums">{securityScore}</span>
                  <span className="text-[10px] text-muted-foreground">out of 100</span>
                </div>
              </div>
            </div>

            {/* Status banner */}
            <div className={cn(
              'rounded-lg p-3 mb-4 border text-center',
              securityScore >= 80 ? 'border-success/30 bg-success/[0.06]' : 'border-warning/30 bg-warning/[0.06]'
            )}>
              <p className={cn('text-xs font-semibold', securityScore >= 80 ? 'text-success' : 'text-warning')}>
                {securityScore >= 80 ? 'Excellent security posture' : 'Room for improvement'}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {securityScore >= 80 ? 'Your account is well-protected' : `Complete ${SECURITY_CHECKS.filter((c) => !c.done).length} remaining checks`}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {SECURITY_CHECKS.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-500"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  {c.done ? (
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-warning shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs', c.done ? 'text-muted-foreground line-through' : 'text-foreground font-medium')}>{c.label}</p>
                    <p className="text-[10px] text-muted-foreground">{c.hint}</p>
                  </div>
                  {!c.done && (
                    <button className="text-[10px] text-accent font-medium hover:underline shrink-0">Fix</button>
                  )}
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full h-8 mt-5 text-xs bg-card border-border">
              <Shield className="w-3 h-3 mr-1.5" /> Run security audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
