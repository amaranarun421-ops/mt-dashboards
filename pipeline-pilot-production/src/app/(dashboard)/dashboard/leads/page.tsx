'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { ChartCard } from '@/components/common/chart-card';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { leads, type Lead } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  UserPlus, Plus, Download, Flame, CheckCircle2, Target, TrendingUp, Filter, X,
} from 'lucide-react';

type StatusFilter = 'all' | Lead['status'];

const STATUS_COLOR: Record<Lead['status'], string> = {
  'New': 'var(--chart-1)',
  'Working': 'var(--chart-3)',
  'Nurturing': 'var(--chart-5)',
  'Qualified': 'var(--success)',
  'Disqualified': 'var(--destructive)',
};

const INTENT_COLOR: Record<Lead['intent'], string> = {
  'High': 'var(--destructive)',
  'Medium': 'var(--warning)',
  'Low': 'var(--success)',
};

function scoreColor(score: number): string {
  if (score >= 75) return 'var(--success)';
  if (score >= 50) return 'var(--warning)';
  return 'var(--muted-foreground)';
}

function leadInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function LeadsPage() {
  const router = useRouter();
  const chartLoaded = useChartLoading(300);
  const [status, setStatus] = React.useState<StatusFilter>('all');

  const filtered = React.useMemo(() => {
    return leads.filter((l) => status === 'all' || l.status === status);
  }, [status]);

  // KPIs
  const totalLeads = leads.length;
  const qualifiedCount = leads.filter((l) => l.status === 'Qualified').length;
  const avgScore = Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length);
  // New this week (created Jun 29+)
  const newThisWeek = leads.filter((l) => new Date(l.created) >= new Date('2025-06-29')).length;

  const stats = [
    { label: 'Total Leads', value: totalLeads.toString(), icon: UserPlus, color: 'var(--accent)', sub: 'in pipeline' },
    { label: 'New This Week', value: newThisWeek.toString(), icon: Flame, color: 'var(--chart-1)', sub: 'last 7 days' },
    { label: 'Qualified', value: qualifiedCount.toString(), icon: CheckCircle2, color: 'var(--success)', sub: 'ready for sales' },
    { label: 'Avg Score', value: `${avgScore}`, icon: Target, color: 'var(--chart-3)', sub: 'lead score / 100' },
  ];

  // Score distribution chart
  const scoreBuckets = [
    { range: '90-100', min: 90, max: 100, color: 'var(--success)' },
    { range: '75-89', min: 75, max: 89, color: 'var(--accent)' },
    { range: '50-74', min: 50, max: 74, color: 'var(--warning)' },
    { range: '25-49', min: 25, max: 49, color: 'var(--chart-3)' },
    { range: '0-24', min: 0, max: 24, color: 'var(--destructive)' },
  ].map((b) => ({
    range: b.range,
    count: leads.filter((l) => l.score >= b.min && l.score <= b.max).length,
    color: b.color,
  }));

  const statusChips: { value: StatusFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All', count: leads.length, color: 'var(--accent)' },
    ...(['New', 'Working', 'Nurturing', 'Qualified', 'Disqualified'] as Lead['status'][]).map((s) => ({
      value: s,
      label: s,
      count: leads.filter((l) => l.status === s).length,
      color: STATUS_COLOR[s],
    })),
  ];

  const columns: Column<Lead>[] = [
    {
      key: 'name',
      header: 'Lead',
      sortable: true,
      sortAccessor: (l) => l.name,
      cell: (l) => (
        <div className="flex items-center gap-3 min-w-0">
          <AvatarBadge initials={leadInitials(l.name)} size="md" color={STATUS_COLOR[l.status]} />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{l.name}</span>
            <span className="text-[10px] text-muted-foreground truncate">{l.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      sortable: true,
      sortAccessor: (l) => l.company,
      cell: (l) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">{l.company}</span>
          <span className="text-[10px] text-muted-foreground">{l.phone}</span>
        </div>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      sortAccessor: (l) => l.source,
      cell: (l) => <span className="text-xs text-muted-foreground">{l.source}</span>,
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      align: 'center',
      sortAccessor: (l) => l.score,
      cell: (l) => {
        const color = scoreColor(l.score);
        return (
          <span
            className="inline-flex items-center justify-center w-10 h-7 rounded-md text-xs font-bold tabular-nums"
            style={{
              color,
              background: `color-mix(in oklch, ${color} 12%, transparent)`,
            }}
          >
            {l.score}
          </span>
        );
      },
    },
    {
      key: 'intent',
      header: 'Intent',
      sortable: true,
      sortAccessor: (l) => l.intent,
      cell: (l) => <StatusBadge status={l.intent === 'High' ? 'high' : l.intent === 'Medium' ? 'medium' : 'low'} label={l.intent} />,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortAccessor: (l) => l.status,
      cell: (l) => <StageBadge stage={l.status} color={STATUS_COLOR[l.status]} />,
    },
    {
      key: 'estimatedValue',
      header: 'Est. Value',
      sortable: true,
      align: 'right',
      sortAccessor: (l) => l.estimatedValue,
      cell: (l) => <span className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(l.estimatedValue, { compact: true })}</span>,
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (l) => l.owner,
      cell: (l) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={leadInitials(l.owner)} size="sm" color="var(--chart-3)" />
          <span className="text-xs text-foreground">{l.owner}</span>
        </div>
      ),
    },
    {
      key: 'created',
      header: 'Created',
      sortable: true,
      sortAccessor: (l) => l.created,
      cell: (l) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">
            {new Date(l.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="text-[10px] text-muted-foreground">{l.lastActivity}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Inbound and outbound leads — qualify, score, and route to sales"
        icon={UserPlus}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Lead
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Layout: table on left (2 cols), chart on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Status filter chips */}
          <div className="bg-card border border-border rounded-xl p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </div>
              {statusChips.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => setStatus(chip.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                    status === chip.value
                      ? 'text-foreground'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                  )}
                  style={status === chip.value ? {
                    background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                    borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
                  } : undefined}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                  {chip.label}
                  <span className="text-[10px] text-muted-foreground">{chip.count}</span>
                </button>
              ))}
              {status !== 'all' && (
                <Button variant="ghost" size="sm" onClick={() => setStatus('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          {/* Data table */}
          <DataTable<Lead>
            data={filtered}
            columns={columns}
            getRowId={(l) => l.id}
            onRowClick={(l) => router.push(`/dashboard/leads/${l.id}`)}
            searchable
            searchKeys={['name', 'company', 'email']}
            searchPlaceholder="Search leads by name, company, or email…"
            selectable
            pageSize={8}
            emptyTitle="No leads match your filters"
            emptyDescription="Try adjusting your search or clearing the status filter."
            emptyAction={
              <Button size="sm" variant="outline" onClick={() => setStatus('all')}>
                Clear filters
              </Button>
            }
            exportFilename="leads.csv"
            initialSort={{ key: 'score', dir: 'desc' }}
          />
        </div>

        {/* Right side panel — score distribution chart */}
        <div className="space-y-4">
          <ChartCard
            title="Lead Score Distribution"
            description="Bucketed by score range"
            height={320}
            trendBadge={{ value: `${avgScore} avg`, type: 'positive' }}
          >
            <div className={`h-[220px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreBuckets} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} allowDecimals={false} dx={-10} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                    formatter={(v: number) => [`${v} leads`, '']}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {scoreBuckets.map((bucket, i) => (
                      <Cell key={i} fill={bucket.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Top leads panel */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Hottest Leads</h3>
            </div>
            <div className="space-y-2">
              {[...leads].sort((a, b) => b.score - a.score).slice(0, 5).map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => router.push(`/dashboard/leads/${l.id}`)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                >
                  <span className="text-xs font-bold text-muted-foreground tabular-nums w-4">{i + 1}</span>
                  <AvatarBadge initials={leadInitials(l.name)} size="sm" color={STATUS_COLOR[l.status]} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{l.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{l.company}</p>
                  </div>
                  <span
                    className="text-xs font-bold tabular-nums px-1.5 py-0.5 rounded"
                    style={{ color: scoreColor(l.score), background: `color-mix(in oklch, ${scoreColor(l.score)} 12%, transparent)` }}
                  >
                    {l.score}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
