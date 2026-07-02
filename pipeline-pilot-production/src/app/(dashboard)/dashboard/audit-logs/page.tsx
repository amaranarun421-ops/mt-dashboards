'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { DataTable, type Column } from '@/components/tables/data-table';
import { AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

import {
  ScrollText, Calendar, User, Activity, AlertTriangle, XCircle,
  ChevronDown, ChevronRight, Info, Shield, Filter, Download,
} from 'lucide-react';

type Severity = 'info' | 'warning' | 'critical';

// Extend audit logs with more entries + structured fields
interface AuditEntry {
  id: string;
  user: string;
  userInitials: string;
  action: string;
  target: string;
  ip: string;
  time: string;
  timeBucket: string; // for sorting
  severity: Severity;
  category: 'deal' | 'user' | 'system' | 'report' | 'security' | 'data';
  details?: string;
}

const AUDIT_ENTRIES: AuditEntry[] = [
  { id: 'log1', user: 'Sarah Chen', userInitials: 'SC', action: 'Updated deal stage', target: 'D-2041 → Negotiation', ip: '73.142.88.12', time: '2m ago', timeBucket: '0', severity: 'info', category: 'deal', details: 'Stage changed from "Proposal" to "Negotiation". Triggered Slack notification to deal team.' },
  { id: 'log2', user: 'System', userInitials: 'SY', action: 'CRM sync completed', target: 'Salesforce', ip: 'system', time: '4h ago', timeBucket: '1', severity: 'info', category: 'system', details: 'Synced 248 records from Salesforce in 1.4s. 0 conflicts, 0 errors.' },
  { id: 'log3', user: 'Mike Johnson', userInitials: 'MJ', action: 'Submitted forecast', target: 'Q3 Forecast — $1.8M', ip: '73.142.88.18', time: '5h ago', timeBucket: '2', severity: 'info', category: 'report', details: 'Q3 commit: $1.8M · Best case: $2.1M · Pipeline: $2.5M' },
  { id: 'log4', user: 'Admin', userInitials: 'AD', action: 'Updated permissions', target: 'James Wilson → AE role', ip: '10.0.1.4', time: '1d ago', timeBucket: '3', severity: 'warning', category: 'user', details: 'Role changed from "Senior AE" to "Account Executive". Affected 3 deals and 18 accounts.' },
  { id: 'log5', user: 'Emily Davis', userInitials: 'ED', action: 'Exported report', target: 'Pipeline Forecast.xlsx', ip: '73.142.88.21', time: '1d ago', timeBucket: '4', severity: 'info', category: 'report', details: 'Exported 156 records to XLSX. File size: 4.8 MB.' },
  { id: 'log6', user: 'System', userInitials: 'SY', action: 'Failed login attempt', target: 'unknown@external.com', ip: '188.42.91.7', time: '2d ago', timeBucket: '5', severity: 'critical', category: 'security', details: '5 consecutive failed attempts from suspicious IP. Account temporarily locked. Email alert sent to admin.' },
  { id: 'log7', user: 'Lisa Park', userInitials: 'LP', action: 'Created new lead', target: 'Eric Bauer — Pinnacle Retail', ip: '73.142.88.34', time: '2d ago', timeBucket: '6', severity: 'info', category: 'deal', details: 'Lead L-890 created via website form submission.' },
  { id: 'log8', user: 'Admin', userInitials: 'AD', action: 'Revoked API key', target: 'key_prod_8f3a2', ip: '10.0.1.4', time: '3d ago', timeBucket: '7', severity: 'warning', category: 'security', details: 'Legacy production API key revoked after audit. Last used 3 weeks ago.' },
  { id: 'log9', user: 'David Okafor', userInitials: 'DO', action: 'Imported leads', target: 'trade-show-leads.csv · 34 records', ip: '73.142.88.41', time: '3d ago', timeBucket: '8', severity: 'info', category: 'data', details: 'Bulk import of 34 leads from SaaStr trade show. 32 succeeded, 2 failed (duplicate emails).' },
  { id: 'log10', user: 'Sarah Chen', userInitials: 'SC', action: 'Closed deal won', target: 'D-2041 → $125,000', ip: '73.142.88.12', time: '3d ago', timeBucket: '9', severity: 'info', category: 'deal', details: 'Deal marked as Closed Won. Revenue attributed to Q3 2025.' },
  { id: 'log11', user: 'System', userInitials: 'SY', action: 'Backup completed', target: 'Daily database backup', ip: 'system', time: '4d ago', timeBucket: '10', severity: 'info', category: 'system', details: 'Automated daily backup completed. 4.2 GB stored in S3.' },
  { id: 'log12', user: 'Admin', userInitials: 'AD', action: 'Deleted user', target: 'james.wilson@pipelinepilot.io', ip: '10.0.1.4', time: '5d ago', timeBucket: '11', severity: 'critical', category: 'user', details: 'User account permanently deleted. Reassigned 15 deals and 8 accounts to other reps.' },
];

const SEVERITY_CONFIG: Record<Severity, { color: string; bg: string; border: string; label: string; icon: React.ElementType }> = {
  info: { color: 'var(--chart-1)', bg: 'bg-chart-1/10', border: 'border-chart-1/30', label: 'Info', icon: Info },
  warning: { color: 'var(--warning)', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Warning', icon: AlertTriangle },
  critical: { color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Critical', icon: XCircle },
};

const USER_COLORS: Record<string, string> = {
  'SC': 'var(--accent)',
  'MJ': 'var(--chart-1)',
  'ED': 'var(--chart-3)',
  'AD': 'var(--destructive)',
  'LP': 'var(--chart-2)',
  'DO': 'var(--chart-5)',
  'SY': 'var(--muted-foreground)',
};

// Activity by user (bar chart data)
const ACTIVITY_BY_USER = (() => {
  const counts: Record<string, { user: string; initials: string; count: number }> = {};
  AUDIT_ENTRIES.forEach((e) => {
    if (!counts[e.user]) {
      counts[e.user] = { user: e.user, initials: e.userInitials, count: 0 };
    }
    counts[e.user].count++;
  });
  return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 6);
})();

// Activity by severity (donut chart data)
const ACTIVITY_BY_SEVERITY = [
  { name: 'Info', value: AUDIT_ENTRIES.filter((e) => e.severity === 'info').length, color: 'var(--chart-1)' },
  { name: 'Warning', value: AUDIT_ENTRIES.filter((e) => e.severity === 'warning').length, color: 'var(--warning)' },
  { name: 'Critical', value: AUDIT_ENTRIES.filter((e) => e.severity === 'critical').length, color: 'var(--destructive)' },
];

function StatCard({
  label, value, sub, icon: Icon, color, delay,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <div
      className="relative bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 70}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-start justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="relative text-2xl lg:text-3xl font-bold text-foreground tabular-nums">{value}</p>
      <p className="relative text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

export default function AuditLogsPage() {
  const chartLoaded = useChartLoading(300);
  const [severity, setSeverity] = React.useState<'all' | Severity>('all');
  const [userFilter, setUserFilter] = React.useState<string>('all');
  const [actionFilter, setActionFilter] = React.useState<string>('all');
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    return AUDIT_ENTRIES.filter((e) => {
      if (severity !== 'all' && e.severity !== severity) return false;
      if (userFilter !== 'all' && e.user !== userFilter) return false;
      if (actionFilter !== 'all' && e.category !== actionFilter) return false;
      return true;
    });
  }, [severity, userFilter, actionFilter]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const columns: Column<AuditEntry>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      sortAccessor: (e) => e.timeBucket,
      cell: (e) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">{e.time}</span>
      ),
    },
    {
      key: 'user',
      header: 'User',
      sortable: true,
      sortAccessor: (e) => e.user,
      cell: (e) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={e.userInitials} size="sm" color={USER_COLORS[e.userInitials] || 'var(--accent)'} />
          <span className={cn('text-xs', e.user === 'System' ? 'text-muted-foreground italic' : 'text-foreground font-medium')}>
            {e.user}
          </span>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      sortAccessor: (e) => e.action,
      cell: (e) => <span className="text-xs font-medium text-foreground">{e.action}</span>,
    },
    {
      key: 'target',
      header: 'Target',
      sortable: true,
      sortAccessor: (e) => e.target,
      cell: (e) => <span className="text-xs text-muted-foreground truncate max-w-[220px] inline-block">{e.target}</span>,
    },
    {
      key: 'ip',
      header: 'IP Address',
      sortable: true,
      sortAccessor: (e) => e.ip,
      cell: (e) => (
        <span className={cn('text-xs font-mono', e.ip === 'system' ? 'text-muted-foreground italic' : 'text-muted-foreground')}>
          {e.ip}
        </span>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      sortable: true,
      sortAccessor: (e) => e.severity,
      cell: (e) => {
        const cfg = SEVERITY_CONFIG[e.severity];
        const Icon = cfg.icon;
        return (
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border', cfg.bg, cfg.border)} style={{ color: cfg.color }}>
            <Icon className="w-3 h-3" />
            {cfg.label}
          </span>
        );
      },
    },
    {
      key: 'details',
      header: 'Details',
      align: 'center',
      hideable: false,
      cell: (e) => (
        <button
          onClick={(ev) => { ev.stopPropagation(); toggleExpand(e.id); }}
          className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded.has(e.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      ),
    },
  ];

  const totalToday = AUDIT_ENTRIES.length;
  const criticalCount = AUDIT_ENTRIES.filter((e) => e.severity === 'critical').length;
  const uniqueUsers = new Set(AUDIT_ENTRIES.map((e) => e.user)).size;
  const failedCount = AUDIT_ENTRIES.filter((e) => e.action.toLowerCase().includes('failed') || e.action.toLowerCase().includes('delete') || e.action.toLowerCase().includes('revoke')).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Track every action across your Pipeline Pilot workspace for compliance and security"
        icon={ScrollText}
        actions={
          <>
            <Button size="sm" variant="outline" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export logs
            </Button>
          </>
        }
      />

      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Date range */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">Date range</label>
            <Select defaultValue="7d">
              <SelectTrigger className="h-9 bg-secondary border-border text-xs">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* User filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">User</label>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="h-9 bg-secondary border-border text-xs">
                <User className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All users</SelectItem>
                {Array.from(new Set(AUDIT_ENTRIES.map((e) => e.user))).map((u) => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Action filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">Action type</label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="h-9 bg-secondary border-border text-xs">
                <Activity className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                <SelectItem value="deal">Deal changes</SelectItem>
                <SelectItem value="user">User changes</SelectItem>
                <SelectItem value="report">Reports & exports</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System events</SelectItem>
                <SelectItem value="data">Data imports</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Severity filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">Severity</label>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 h-9">
              {(['all', 'info', 'warning', 'critical'] as const).map((s) => {
                const isActive = severity === s;
                const color = s === 'all' ? 'var(--accent)' : SEVERITY_CONFIG[s].color;
                return (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={cn(
                      'flex-1 inline-flex items-center justify-center px-2 py-1 rounded-md text-[11px] font-medium capitalize transition-colors',
                      isActive ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                    style={isActive ? { color } : undefined}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total events today" value={totalToday.toString()} sub="across all users" icon={Activity} color="var(--accent)" delay={0} />
        <StatCard label="Critical events" value={criticalCount.toString()} sub="require review" icon={XCircle} color="var(--destructive)" delay={1} />
        <StatCard label="Unique users" value={uniqueUsers.toString()} sub="active in audit trail" icon={User} color="var(--chart-3)" delay={2} />
        <StatCard label="Failed actions" value={failedCount.toString()} sub="deletes, revokes, failures" icon={AlertTriangle} color="var(--warning)" delay={3} />
      </div>

      {/* Main: table + side charts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Table */}
        <div className="lg:col-span-3">
          <DataTable<AuditEntry>
            data={filtered}
            columns={columns}
            getRowId={(e) => e.id}
            searchable
            searchKeys={['user', 'action', 'target', 'ip']}
            searchPlaceholder="Search audit logs by user, action, or target…"
            pageSize={8}
            emptyTitle="No audit logs found"
            emptyDescription="Try adjusting your filters."
            exportFilename="audit-logs.csv"
          />

          {/* Expanded details */}
          {filtered.some((e) => expanded.has(e.id)) && (
            <div className="mt-3 space-y-2">
              {filtered.filter((e) => expanded.has(e.id)).map((e) => {
                const cfg = SEVERITY_CONFIG[e.severity];
                const Icon = cfg.icon;
                return (
                  <div key={e.id} className="bg-card border border-border rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start gap-3">
                      <div className={cn('w-8 h-8 rounded-md flex items-center justify-center border shrink-0', cfg.bg, cfg.border)}>
                        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AvatarBadge initials={e.userInitials} size="sm" color={USER_COLORS[e.userInitials] || 'var(--accent)'} />
                          <p className="text-xs font-semibold text-foreground">{e.user}</p>
                          <span className="text-[11px] text-muted-foreground">· {e.time}</span>
                          <span className={cn('inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium border ml-auto', cfg.bg, cfg.border)} style={{ color: cfg.color }}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-foreground mb-1">
                          <span className="font-medium">{e.action}:</span>{' '}
                          <span className="text-muted-foreground">{e.target}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{e.details}</p>
                        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <span>IP:</span>
                            <span className="font-mono">{e.ip}</span>
                          </span>
                          <span>·</span>
                          <span className="capitalize">Category: {e.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right sidebar: charts */}
        <div className="space-y-4">
          {/* Activity by user */}
          <ChartCard
            title="Activity by user"
            description="Last 7 days"
            height={300}
          >
            <div className={`h-[220px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ACTIVITY_BY_USER}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="user"
                    axisLine={false}
                    tickLine={false}
                    tick={{ ...AXIS_TICK_STYLE, fontSize: 11 }}
                    width={80}
                    tickFormatter={(v: string) => v.split(' ').map((p) => p[0]).join('') + ' · ' + v.split(' ')[0]}
                  />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number) => [`${v} events`, 'Activity']}
                    cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
                    {ACTIVITY_BY_USER.map((u) => (
                      <Cell key={u.user} fill={USER_COLORS[u.initials] || 'var(--accent)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Activity by severity */}
          <ChartCard
            title="Activity by severity"
            description="Distribution by type"
            height={280}
            legend={[
              { label: 'Info', color: 'var(--chart-1)' },
              { label: 'Warning', color: 'var(--warning)' },
              { label: 'Critical', color: 'var(--destructive)' },
            ]}
          >
            <div className={`h-[180px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ACTIVITY_BY_SEVERITY}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    stroke="var(--card)"
                    strokeWidth={2}
                  >
                    {ACTIVITY_BY_SEVERITY.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number, name: string) => [`${v} events`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {ACTIVITY_BY_SEVERITY.map((s) => {
                const pct = Math.round((s.value / AUDIT_ENTRIES.length) * 100);
                return (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-semibold tabular-nums">{s.value}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          {/* Compliance card */}
          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <p className="text-xs font-semibold text-foreground">Compliance status</p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'SOC 2 retention', value: '7 days of 90', color: 'var(--success)' },
                { label: 'PII redaction', value: 'Enabled', color: 'var(--accent)' },
                { label: 'Export controls', value: 'Admin only', color: 'var(--chart-3)' },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground">{c.label}</span>
                  </div>
                  <span className="text-foreground font-medium">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
