'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
  Phone, Plus, Play, FileText, Filter, X,
  Clock, CheckCircle2, PhoneCall,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { ChartCard } from '@/components/common/chart-card';
import { StatusBadge, AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { calls, reps, type Rep } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Extend the call shape with synthesized fields used by the table
type CallRow = typeof calls[number] & { ownerInitials: string; ownerColor: string };

const REP_LOOKUP: Record<string, Rep> = Object.fromEntries(reps.map((r) => [r.name, r]));

const CALL_ROWS: CallRow[] = calls.map((c) => {
  const rep = REP_LOOKUP[c.owner];
  return {
    ...c,
    ownerInitials: rep?.initials ?? c.owner.split(' ').map((n) => n[0]).join(''),
    ownerColor: rep?.avatarColor ?? 'var(--accent)',
  };
});

type OutcomeFilter = 'all' | 'Connected' | 'Voicemail' | 'No Answer';

const OUTCOME_BADGE: Record<string, { status: 'success' | 'warning' | 'destructive' }> = {
  'Connected': { status: 'success' },
  'Voicemail': { status: 'warning' },
  'No Answer': { status: 'destructive' },
};

const OUTCOME_COLORS: Record<string, string> = {
  'Connected': 'var(--success)',
  'Voicemail': 'var(--warning)',
  'No Answer': 'var(--destructive)',
};

// Format seconds/minutes to mm:ss
function formatDuration(minutes: number): string {
  if (minutes <= 0) return '—';
  const m = Math.floor(minutes);
  const s = Math.floor((minutes - m) * 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function callInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

// Synthesize outcome distribution
const OUTCOME_DISTRIBUTION = (() => {
  const counts: Record<string, number> = { Connected: 0, Voicemail: 0, 'No Answer': 0 };
  CALL_ROWS.forEach((c) => { counts[c.outcome] = (counts[c.outcome] || 0) + 1; });
  // add some history
  counts.Connected += 28;
  counts.Voicemail += 14;
  counts['No Answer'] += 9;
  return [
    { name: 'Connected', value: counts.Connected, color: OUTCOME_COLORS.Connected },
    { name: 'Voicemail', value: counts.Voicemail, color: OUTCOME_COLORS.Voicemail },
    { name: 'No Answer', value: counts['No Answer'], color: OUTCOME_COLORS['No Answer'] },
  ];
})();

// Synthesize calls over last 7 days
const CALLS_OVER_TIME = [
  { day: 'Mon', calls: 18, connected: 12 },
  { day: 'Tue', calls: 22, connected: 15 },
  { day: 'Wed', calls: 19, connected: 13 },
  { day: 'Thu', calls: 27, connected: 19 },
  { day: 'Fri', calls: 16, connected: 11 },
  { day: 'Sat', calls: 4, connected: 2 },
  { day: 'Sun', calls: 2, connected: 1 },
];

function KPICardMini({
  label, value, sub, icon: Icon, color, delay,
}: { label: string; value: string; sub: string; icon: React.ElementType; color: string; delay: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 70}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

export default function CallsPage() {
  const chartLoaded = useChartLoading(300);
  const [outcome, setOutcome] = React.useState<OutcomeFilter>('all');

  const filtered = React.useMemo(() => {
    return CALL_ROWS.filter((c) => outcome === 'all' || c.outcome === outcome);
  }, [outcome]);

  // KPIs
  const totalCalls = CALL_ROWS.length;
  const connectedCount = CALL_ROWS.filter((c) => c.outcome === 'Connected').length;
  const connectedRate = Math.round((connectedCount / totalCalls) * 100);
  const durations = CALL_ROWS.filter((c) => c.duration > 0);
  const avgDuration = durations.length > 0 ? Math.round(durations.reduce((s, c) => s + c.duration, 0) / durations.length) : 0;
  const scheduledCount = 4; // synthesized

  const columns: Column<CallRow>[] = [
    {
      key: 'contact',
      header: 'Contact',
      sortable: true,
      sortAccessor: (c) => c.contact,
      cell: (c) => (
        <div className="flex items-center gap-3 min-w-0">
          <AvatarBadge initials={callInitials(c.contact)} size="md" color={OUTCOME_COLORS[c.outcome]} />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{c.contact}</span>
            <span className="text-[10px] text-muted-foreground truncate">{c.account}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'account',
      header: 'Account',
      sortable: true,
      sortAccessor: (c) => c.account,
      cell: (c) => <span className="text-xs text-muted-foreground">{c.account}</span>,
    },
    {
      key: 'duration',
      header: 'Duration',
      sortable: true,
      align: 'right',
      sortAccessor: (c) => c.duration,
      cell: (c) => (
        <span className={cn(
          'inline-flex items-center gap-1 text-xs font-medium tabular-nums',
          c.duration > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}>
          <Clock className="w-3 h-3" />
          {formatDuration(c.duration)}
        </span>
      ),
    },
    {
      key: 'outcome',
      header: 'Outcome',
      sortable: true,
      sortAccessor: (c) => c.outcome,
      cell: (c) => {
        const cfg = OUTCOME_BADGE[c.outcome];
        return <StatusBadge status={cfg.status} label={c.outcome} />;
      },
    },
    {
      key: 'time',
      header: 'Time',
      sortable: true,
      sortAccessor: (c) => c.time,
      cell: (c) => <span className="text-xs text-muted-foreground">{c.time}</span>,
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (c) => c.owner,
      cell: (c) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={c.ownerInitials} size="sm" color={c.ownerColor} />
          <span className="text-xs text-foreground">{c.owner}</span>
        </div>
      ),
    },
    {
      key: 'recording',
      header: 'Recording',
      align: 'center',
      cell: (c) => c.recording ? (
        <button
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-chart-1/10 text-chart-1 hover:bg-chart-1/20 transition-colors text-[11px] font-medium"
        >
          <Play className="w-3 h-3 fill-current" />
          Play
        </button>
      ) : (
        <span className="text-[10px] text-muted-foreground">—</span>
      ),
    },
    {
      key: 'notes',
      header: 'Notes',
      align: 'center',
      sortable: true,
      sortAccessor: (c) => c.notes,
      cell: (c) => (
        <span className={cn(
          'inline-flex items-center gap-1 text-xs tabular-nums',
          c.notes > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}>
          <FileText className="w-3 h-3" />
          {c.notes}
        </span>
      ),
    },
  ];

  const outcomeChips: { value: OutcomeFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All', count: CALL_ROWS.length, color: 'var(--accent)' },
    ...(['Connected', 'Voicemail', 'No Answer'] as const).map((o) => ({
      value: o,
      label: o,
      count: CALL_ROWS.filter((c) => c.outcome === o).length,
      color: OUTCOME_COLORS[o],
    })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calls"
        description="Track outbound and inbound calls — outcomes, recordings, and call notes"
        icon={Phone}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Log Call
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICardMini label="Calls Today" value={totalCalls.toString()} sub="vs 16 yesterday" icon={PhoneCall} color="var(--accent)" delay={0} />
        <KPICardMini label="Connected Rate" value={`${connectedRate}%`} sub={`${connectedCount} of ${totalCalls} connected`} icon={CheckCircle2} color="var(--success)" delay={1} />
        <KPICardMini label="Avg Duration" value={formatDuration(avgDuration)} sub="across connected calls" icon={Clock} color="var(--chart-3)" delay={2} />
        <KPICardMini label="Scheduled" value={scheduledCount.toString()} sub="calls queued for today" icon={Phone} color="var(--chart-5)" delay={3} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Filter chips */}
          <div className="bg-card border border-border rounded-xl p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Outcome:</span>
              </div>
              {outcomeChips.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => setOutcome(chip.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                    outcome === chip.value
                      ? 'text-foreground'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                  )}
                  style={outcome === chip.value ? {
                    background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                    borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
                  } : undefined}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                  {chip.label}
                  <span className="text-[10px] text-muted-foreground">{chip.count}</span>
                </button>
              ))}
              {outcome !== 'all' && (
                <Button variant="ghost" size="sm" onClick={() => setOutcome('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          <DataTable<CallRow>
            data={filtered}
            columns={columns}
            getRowId={(c) => c.id}
            searchable
            searchKeys={['contact', 'account', 'owner']}
            searchPlaceholder="Search calls by contact, account, owner…"
            selectable
            pageSize={8}
            emptyTitle="No calls found"
            emptyDescription="Try adjusting the outcome filter or search query."
            emptyAction={
              <Button size="sm" variant="outline" onClick={() => setOutcome('all')}>
                Clear filters
              </Button>
            }
            exportFilename="calls.csv"
          />
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Outcome distribution donut */}
          <ChartCard
            title="Call Outcome Distribution"
            description="Last 7 days · 108 total"
            height={300}
            trendBadge={{ value: '63% connect', type: 'positive' }}
          >
            <div className={`transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height={210}>
                <PieChart>
                  <Pie
                    data={OUTCOME_DISTRIBUTION}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    stroke="var(--card)"
                    strokeWidth={2}
                  >
                    {OUTCOME_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number, name: string) => [`${v} calls`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {OUTCOME_DISTRIBUTION.map((o) => (
                <div key={o.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: o.color }} />
                    <span className="text-muted-foreground">{o.name}</span>
                  </div>
                  <span className="text-foreground font-semibold tabular-nums">{o.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Calls over time bar chart */}
          <ChartCard
            title="Calls Over Time"
            description="Daily call volume · last 7 days"
            height={280}
            legend={[
              { label: 'Total calls', color: 'var(--chart-1)' },
              { label: 'Connected', color: 'var(--success)' },
            ]}
          >
            <div className={`h-[200px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CALLS_OVER_TIME} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={2} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} allowDecimals={false} dx={-10} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v: number, name: string) => [`${v} calls`, name]}
                    cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                  />
                  <Bar dataKey="calls" fill="var(--chart-1)" radius={[3, 3, 0, 0]} maxBarSize={20} opacity={0.6} />
                  <Bar dataKey="connected" fill="var(--success)" radius={[3, 3, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
