'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command, ChevronDown, Plus, Handshake, Calendar, FileText, RefreshCw,
  TrendingUp, Users, DollarSign, Activity, Zap, AlertCircle, CheckCircle2,
  Sparkles, ArrowUp, ArrowDown, Globe, Server, Clock, Bell, Wifi,
  Building2, Target, Trophy, AlertTriangle,
} from 'lucide-react';
import { deals, reps, activities, integrations } from '@/lib/data';

const WORKSPACES = [
  { id: 'ws-1', name: 'Pipeline Pilot HQ', plan: 'Enterprise', color: 'var(--accent)' },
  { id: 'ws-2', name: 'EMEA Sales', plan: 'Business', color: 'var(--chart-1)' },
  { id: 'ws-3', name: 'APAC Expansion', plan: 'Business', color: 'var(--chart-3)' },
];

const QUICK_ACTIONS = [
  { label: 'Create deal', icon: Handshake, color: 'var(--accent)', href: '/dashboard/deals' },
  { label: 'Schedule meeting', icon: Calendar, color: 'var(--chart-1)', href: '/dashboard/calendar' },
  { label: 'Run report', icon: FileText, color: 'var(--chart-3)', href: '/dashboard/reports' },
  { label: 'Sync CRM', icon: RefreshCw, color: 'var(--chart-5)', href: '/dashboard/crm-sync' },
];

const AI_ALERTS = [
  { id: 'ai-1', title: '3 deals stalled in Negotiation', detail: 'No activity in 7+ days — recommend outreach', severity: 'warning' as const, icon: AlertCircle, href: '/dashboard/pipeline' },
  { id: 'ai-2', title: 'Sarah Chen trending above quota', detail: 'On pace for 115% attainment this quarter', severity: 'success' as const, icon: TrendingUp, href: '/dashboard/team/r1' },
  { id: 'ai-3', title: 'DataStream churn risk rising', detail: 'Health score dropped 12 points in 7 days', severity: 'destructive' as const, icon: AlertTriangle, href: '/dashboard/accounts/a4' },
  { id: 'ai-4', title: 'Forecast gap detected', detail: 'Q3 commit is $180k below target — explore best case', severity: 'warning' as const, icon: Target, href: '/dashboard/forecasting' },
];

const SYSTEM_SERVICES = [
  { name: 'API Gateway', status: 'operational', latency: '124ms', uptime: '99.99%' },
  { name: 'CRM Sync', status: 'operational', latency: '892ms', uptime: '99.98%' },
  { name: 'Database', status: 'operational', latency: '23ms', uptime: '100.00%' },
  { name: 'Webhooks', status: 'degraded', latency: '1.2s', uptime: '98.42%' },
  { name: 'Email sync', status: 'operational', latency: '340ms', uptime: '99.95%' },
  { name: 'Reports engine', status: 'operational', latency: '210ms', uptime: '99.97%' },
];

const RECENT_ERRORS = [
  { time: '4m ago', service: 'Webhooks', message: 'Timeout to https://api.legacy.com/incoming', severity: 'warning' },
  { time: '2h ago', service: 'CRM Sync', message: 'Salesforce API rate limit (recovered)', severity: 'warning' },
  { time: '6h ago', service: 'Email sync', message: 'Outlook auth token refresh failed (recovered)', severity: 'warning' },
];

const SERVICE_STATUS_CONFIG: Record<string, { color: string; label: string; icon: React.ElementType }> = {
  operational: { color: 'var(--success)', label: 'Operational', icon: CheckCircle2 },
  degraded: { color: 'var(--warning)', label: 'Degraded', icon: AlertCircle },
  down: { color: 'var(--destructive)', label: 'Down', icon: AlertCircle },
};

function useLiveCounter(initial: number, intervalMs: number, min: number, max: number, step = 1) {
  const [val, setVal] = React.useState(initial);
  React.useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => {
        const delta = (Math.random() - 0.5) * 2 * step;
        const next = v + delta;
        if (next < min) return min;
        if (next > max) return max;
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, min, max, step]);
  return val;
}

function LiveMetric({
  label, value, prefix, suffix, icon: Icon, color, decimals = 0, trend, delay,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  color: string;
  decimals?: number;
  trend?: 'up' | 'down';
  delay: number;
}) {
  // Re-render every tick to reflect the changing value
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
  return (
    <div
      className="relative bg-card border border-border rounded-xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: color }} />
      <div className="relative flex items-start justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="relative flex items-end gap-2">
        <p className="text-2xl lg:text-3xl font-bold text-foreground tabular-nums">
          {prefix}{display}{suffix}
        </p>
        {trend && (
          <span className={cn('inline-flex items-center text-[11px] font-medium mb-1.5', trend === 'up' ? 'text-success' : 'text-destructive')}>
            {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          </span>
        )}
        <span className="inline-flex items-center gap-1 ml-auto mb-1.5 text-[10px] text-success">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Live
        </span>
      </div>
    </div>
  );
}

function Widget({
  title, icon: Icon, color, delay, children, action,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  delay: number;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 70}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
            <Icon className="w-3.5 h-3.5" style={{ color }} />
          </div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function CommandCenterPage() {
  const [workspace, setWorkspace] = React.useState(WORKSPACES[0]);
  const [wsOpen, setWsOpen] = React.useState(false);

  // Live updating metrics via setInterval
  const activeDeals = useLiveCounter(16, 2500, 14, 19);
  const pipelineValue = useLiveCounter(2480000, 3500, 2400000, 2560000, 12000);
  const todayRevenue = useLiveCounter(84500, 2000, 80000, 88000, 1500);
  const repsOnline = useLiveCounter(7, 5000, 6, 8);

  // Top 4 deals by value
  const topDeals = [...deals].sort((a, b) => b.value - a.value).slice(0, 4);
  const onlineReps = reps.slice(0, 5);
  const recentActivities = activities.slice(0, 4);
  const connectedIntegrations = integrations.filter((i) => i.connected).slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Command Center"
        description="Real-time control room for your entire sales operation"
        icon={Command}
        actions={
          <>
            {/* Workspace switcher */}
            <div className="relative">
              <button
                onClick={() => setWsOpen((o) => !o)}
                className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-card text-xs font-medium hover:border-accent/40 transition-colors"
              >
                <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold" style={{ background: workspace.color }}>
                  {workspace.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <span className="hidden sm:block">{workspace.name}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              {wsOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-lg shadow-lg z-20 p-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {WORKSPACES.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => { setWorkspace(ws); setWsOpen(false); }}
                      className={cn(
                        'w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs transition-colors text-left',
                        workspace.id === ws.id ? 'bg-accent/10 text-accent' : 'hover:bg-secondary'
                      )}
                    >
                      <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold" style={{ background: ws.color }}>
                        {ws.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{ws.name}</p>
                        <p className="text-[10px] text-muted-foreground">{ws.plan} plan</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button size="sm" variant="outline" className="bg-card border-border">
              <Bell className="w-3.5 h-3.5 mr-1.5" /> Alerts
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold bg-destructive text-white">3</span>
            </Button>
          </>
        }
      />

      {/* Live metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <LiveMetric label="Active deals" value={activeDeals} icon={Handshake} color="var(--accent)" trend="up" delay={0} />
        <LiveMetric label="Pipeline value" value={pipelineValue} prefix="$" icon={TrendingUp} color="var(--chart-1)" delay={1} />
        <LiveMetric label="Today's revenue" value={todayRevenue} prefix="$" icon={DollarSign} color="var(--success)" trend="up" delay={2} />
        <LiveMetric label="Reps online" value={repsOnline} suffix="/8" icon={Users} color="var(--chart-3)" delay={3} />
      </div>

      {/* Multi-panel widget grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline snapshot */}
        <Widget title="Pipeline snapshot" icon={Globe} color="var(--accent)" delay={0} action={<Link href="/dashboard/pipeline" className="text-[11px] text-muted-foreground hover:text-accent">View →</Link>}>
          <div className="space-y-3">
            {[
              { stage: 'Negotiation', count: 4, value: 581200, color: 'var(--accent)' },
              { stage: 'Proposal', count: 5, value: 543000, color: 'var(--chart-5)' },
              { stage: 'Discovery', count: 3, value: 528000, color: 'var(--chart-3)' },
              { stage: 'Qualified', count: 3, value: 143000, color: 'var(--chart-2)' },
            ].map((s) => {
              const max = 581200;
              const pct = (s.value / max) * 100;
              return (
                <div key={s.stage}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                      <span className="text-muted-foreground">{s.stage}</span>
                    </div>
                    <span className="text-foreground font-semibold tabular-nums">${(s.value / 1000).toFixed(0)}k · {s.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total pipeline</span>
              <span className="text-foreground font-bold tabular-nums">$2.48M</span>
            </div>
          </div>
        </Widget>

        {/* Today's activities */}
        <Widget title="Today's activities" icon={Activity} color="var(--chart-3)" delay={1} action={<Link href="/dashboard/activities" className="text-[11px] text-muted-foreground hover:text-accent">View →</Link>}>
          <div className="space-y-2.5">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-2.5">
                <AvatarBadge initials={a.ownerInitials} size="sm" color="var(--chart-3)" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">{a.relatedTo} · {a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* Forecast status */}
        <Widget title="Forecast status" icon={Target} color="var(--chart-5)" delay={2} action={<Link href="/dashboard/forecasting" className="text-[11px] text-muted-foreground hover:text-accent">View →</Link>}>
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Q3 commit</p>
                <p className="text-xl font-bold text-foreground tabular-nums">$1.8M</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Coverage</p>
                <p className="text-sm font-semibold text-success">3.1×</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Committed', value: 60, color: 'var(--success)' },
                { label: 'Best case', value: 80, color: 'var(--chart-3)' },
                { label: 'Pipeline', value: 100, color: 'var(--chart-1)' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-16 shrink-0">{b.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.value}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-border text-xs flex items-center justify-between">
              <span className="text-muted-foreground">Forecast accuracy</span>
              <span className="text-foreground font-semibold">94%</span>
            </div>
          </div>
        </Widget>

        {/* Team performance mini */}
        <Widget title="Team performance" icon={Users} color="var(--chart-1)" delay={3} action={<Link href="/dashboard/team" className="text-[11px] text-muted-foreground hover:text-accent">View →</Link>}>
          <div className="space-y-2">
            {onlineReps.slice(0, 4).map((r) => {
              const attainment = Math.round((r.revenue / r.quota) * 100);
              return (
                <div key={r.id} className="flex items-center gap-2.5">
                  <AvatarBadge initials={r.initials} size="sm" color={r.avatarColor} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{r.name.split(' ')[0]}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', attainment >= 100 ? 'bg-success' : attainment >= 80 ? 'bg-accent' : 'bg-warning')}
                          style={{ width: `${Math.min(attainment, 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">{attainment}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Widget>

        {/* Recent deals */}
        <Widget title="Recent deals" icon={Handshake} color="var(--chart-4)" delay={4} action={<Link href="/dashboard/deals" className="text-[11px] text-muted-foreground hover:text-accent">View →</Link>}>
          <div className="space-y-2">
            {topDeals.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground">{d.account} · {d.stage}</p>
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums shrink-0">${(d.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Widget>

        {/* AI alerts */}
        <Widget title="AI alerts" icon={Sparkles} color="var(--accent)" delay={5} action={<span className="text-[10px] text-accent font-medium">4 active</span>}>
          <div className="space-y-2">
            {AI_ALERTS.map((a) => {
              const Icon = a.icon;
              const color =
                a.severity === 'success' ? 'var(--success)' :
                a.severity === 'warning' ? 'var(--warning)' :
                'var(--destructive)';
              return (
                <Link
                  key={a.id}
                  href={a.href}
                  className="block p-2 rounded-md hover:bg-secondary/40 transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">{a.title}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{a.detail}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Widget>
      </div>

      {/* Quick actions + system status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Quick actions panel */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Quick actions</h3>
          </div>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-accent/40 hover:bg-secondary/40 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: `color-mix(in oklch, ${a.color} 12%, transparent)` }}>
                    <Icon className="w-4 h-4" style={{ color: a.color }} />
                  </div>
                  <span className="text-xs font-medium text-foreground flex-1">{a.label}</span>
                  <Plus className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">AI suggestion</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Schedule a QBR with <span className="text-accent font-medium">Acme Corporation</span> — multi-year renewal is approaching.
              </p>
              <Button size="sm" variant="outline" className="w-full mt-2.5 bg-card border-accent/30 text-accent hover:bg-accent/10 h-7 text-xs">
                Schedule now
              </Button>
            </div>
          </div>
        </div>

        {/* System status (spans 3 cols) */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">System status</h3>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-warning/30 bg-warning/10 text-warning">
                <span className="w-1 h-1 rounded-full bg-warning animate-pulse" /> 1 degraded
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Wifi className="w-3 h-3 text-success" />
              <span>Updated <Clock className="w-3 h-3 inline ml-0.5 mr-0.5" />just now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mb-5">
            {SYSTEM_SERVICES.map((s) => {
              const cfg = SERVICE_STATUS_CONFIG[s.status];
              const Icon = cfg.icon;
              return (
                <div key={s.name} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30">
                  <Icon className="w-4 h-4 shrink-0" style={{ color: cfg.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground tabular-nums">{s.latency} · {s.uptime} uptime</p>
                  </div>
                  <span className="text-[10px] font-medium shrink-0" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
              );
            })}
          </div>

          {/* Integration health */}
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Integration health</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {connectedIntegrations.map((i) => (
                <div key={i.id} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-secondary/30">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                    style={{ background: i.color }}
                  >
                    {i.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{i.name}</p>
                    <p className="text-[10px] text-success flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-success" /> Healthy
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent errors */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Recent errors</p>
            <div className="space-y-1.5">
              {RECENT_ERRORS.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-md bg-secondary/30">
                  <AlertCircle className="w-3.5 h-3.5 text-warning shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">
                      <span className="font-medium">{e.service}:</span> <span className="text-muted-foreground">{e.message}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{e.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
