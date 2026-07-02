'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge } from '@/components/common/status-badge';
import { DataTable, type Column } from '@/components/tables/data-table';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE,
} from '@/components/charts/chart-helpers';
import { reps, teamPerformanceData } from '@/lib/data';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target, DollarSign, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Trophy, Flame, Download,
} from 'lucide-react';

// ----- derived data -----
// Build quota rows per rep
type QuotaRow = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  territory: string;
  quota: number;
  revenue: number;
  attainment: number;
  gap: number;
  projected: number;
  projectedAttainment: number;
};

const QUOTA_ROWS: QuotaRow[] = reps
  .map((r) => {
    const attainment = Math.round((r.revenue / r.quota) * 100);
    const gap = r.revenue - r.quota;
    // Linear projection — assume 6 months elapsed, project to 12 months
    const monthsElapsed = 6;
    const monthlyRunRate = r.revenue / monthsElapsed;
    const projected = Math.round(monthlyRunRate * 12);
    const projectedAttainment = Math.round((projected / (r.quota * 2)) * 100);
    return {
      id: r.id,
      name: r.name,
      initials: r.initials,
      avatarColor: r.avatarColor,
      role: r.role,
      territory: r.territory,
      quota: r.quota,
      revenue: r.revenue,
      attainment,
      gap,
      projected,
      projectedAttainment,
    };
  })
  .sort((a, b) => b.attainment - a.attainment);

// Distribution tiers
const TIERS = [
  { label: '0 – 50%', min: 0, max: 50, color: 'var(--destructive)' },
  { label: '50 – 75%', min: 50, max: 75, color: 'var(--warning)' },
  { label: '75 – 100%', min: 75, max: 100, color: 'var(--chart-3)' },
  { label: '100 – 125%', min: 100, max: 125, color: 'var(--accent)' },
  { label: '125%+', min: 125, max: Infinity, color: 'var(--success)' },
];

const DISTRIBUTION = TIERS.map((tier) => ({
  ...tier,
  count: QUOTA_ROWS.filter((r) => r.attainment >= tier.min && r.attainment < tier.max).length,
})).map((d) => ({
  ...d,
  pct: Math.round((d.count / QUOTA_ROWS.length) * 100),
}));

const ATTAINMENT_BUCKETS = TIERS;

function tierColor(attainment: number): string {
  if (attainment < 50) return 'var(--destructive)';
  if (attainment < 75) return 'var(--warning)';
  if (attainment < 100) return 'var(--chart-3)';
  if (attainment < 125) return 'var(--accent)';
  return 'var(--success)';
}

function tierBg(attainment: number): string {
  if (attainment < 50) return 'bg-destructive/15 text-destructive';
  if (attainment < 75) return 'bg-warning/15 text-warning';
  if (attainment < 100) return 'bg-chart-3/15 text-chart-3';
  if (attainment < 125) return 'bg-accent/15 text-accent';
  return 'bg-success/15 text-success';
}

export default function QuotaTrackingPage() {
  const chartLoaded = useChartLoading(300);
  const [view, setView] = React.useState<'attainment' | 'gap'>('attainment');

  // Aggregate stats
  const totalQuota = reps.reduce((s, r) => s + r.quota, 0);
  const totalRevenue = reps.reduce((s, r) => s + r.revenue, 0);
  const teamAttainment = Math.round((totalRevenue / totalQuota) * 100);
  const repsAbove = reps.filter((r) => r.revenue >= r.quota).length;
  const repsAtRisk = reps.filter((r) => r.revenue / r.quota < 0.85).length;

  // Build chart data — combine quota + revenue for side-by-side bars
  const chartData = teamPerformanceData.map((t, i) => ({
    name: t.name,
    revenue: t.revenue,
    quota: t.quota,
    attainment: Math.round((t.revenue / t.quota) * 100),
    color: reps[i]?.avatarColor ?? 'var(--accent)',
  }));

  const columns: Column<QuotaRow>[] = [
    {
      key: 'rep',
      header: 'Representative',
      sortable: true,
      sortAccessor: (d) => d.name,
      cell: (d) => (
        <div className="flex items-center gap-2.5">
          <AvatarBadge initials={d.initials} size="md" color={d.avatarColor} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{d.role} · {d.territory}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'quota',
      header: 'Quota',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.quota,
      cell: (d) => <span className="tabular-nums text-muted-foreground">{formatCurrency(d.quota, { compact: true })}</span>,
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.revenue,
      cell: (d) => <span className="tabular-nums font-semibold text-foreground">{formatCurrency(d.revenue, { compact: true })}</span>,
    },
    {
      key: 'attainment',
      header: 'Attainment',
      sortable: true,
      align: 'center',
      sortAccessor: (d) => d.attainment,
      cell: (d) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, d.attainment)}%`,
                background: tierColor(d.attainment),
              }}
            />
          </div>
          <span className="text-xs font-semibold tabular-nums w-10 text-right" style={{ color: tierColor(d.attainment) }}>
            {d.attainment}%
          </span>
        </div>
      ),
    },
    {
      key: 'gap',
      header: 'Gap to Quota',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.gap,
      cell: (d) => (
        <span className={cn(
          'tabular-nums font-medium inline-flex items-center gap-1',
          d.gap >= 0 ? 'text-success' : 'text-destructive'
        )}>
          {d.gap >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {formatCurrency(Math.abs(d.gap), { compact: true })}
        </span>
      ),
    },
    {
      key: 'projected',
      header: 'Projected Attainment',
      align: 'right',
      sortable: true,
      sortAccessor: (d) => d.projectedAttainment,
      cell: (d) => (
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs font-semibold text-foreground tabular-nums">{d.projectedAttainment}%</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">{formatCurrency(d.projected, { compact: true })} FY</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (d) => (
        <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border', tierBg(d.attainment))}>
          {d.attainment >= 100 ? 'On Target' : d.attainment >= 75 ? 'On Track' : 'At Risk'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quota Tracking"
        description="Monitor rep and team progress toward quarterly quota targets"
        icon={Target}
        actions={
          <>
            <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="attainment" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Attainment</TabsTrigger>
                <TabsTrigger value="gap" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Gap View</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Team Attainment"
          value={`${teamAttainment}%`}
          delta="+4pp"
          deltaType="positive"
          icon={Target}
          subtext="H1 vs H1 quota"
          accentColor="var(--accent)"
          sparkline={[78, 82, 80, 85, 88, 91]}
          delay={0}
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue, { compact: true })}
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          subtext={`vs ${formatCurrency(totalQuota, { compact: true })} quota`}
          accentColor="var(--chart-1)"
          sparkline={[280, 320, 360, 410, 460, 520]}
          delay={1}
        />
        <KPICard
          title="Reps Above Quota"
          value={`${repsAbove}/${reps.length}`}
          delta={`${Math.round((repsAbove / reps.length) * 100)}%`}
          deltaType="positive"
          icon={Trophy}
          subtext="meeting or exceeding"
          accentColor="var(--chart-3)"
          sparkline={[2, 3, 3, 4, 4, 5]}
          delay={2}
        />
        <KPICard
          title="Reps At Risk"
          value={repsAtRisk.toString()}
          delta={repsAtRisk > 2 ? 'attention needed' : 'manageable'}
          deltaType={repsAtRisk > 2 ? 'negative' : 'neutral'}
          icon={AlertTriangle}
          subtext="below 85% attainment"
          accentColor="var(--destructive)"
          sparkline={[3, 2, 3, 2, 2, 2]}
          delay={3}
        />
      </div>

      {/* Main: attainment chart + distribution donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Quota Attainment by Rep"
          description="Revenue vs quota — side-by-side comparison"
          className="lg:col-span-2"
          height={400}
          legend={[
            { label: 'Revenue', color: 'var(--accent)' },
            { label: 'Quota', color: 'var(--chart-1)' },
          ]}
          trendBadge={{ value: `${teamAttainment}% team`, type: teamAttainment >= 90 ? 'positive' : 'negative' }}
        >
          <div className={cn('h-[300px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4} barCategoryGap="22%">
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v}k`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v, name) => [`$${Number(v)}k`, String(name)]}
                  cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                />
                <ReferenceLine y={0} stroke="transparent" />
                <Bar dataKey="quota" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={28}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.attainment >= 100 ? 'var(--accent)' : entry.attainment >= 75 ? 'var(--chart-3)' : 'var(--warning)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Footer mini stats */}
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Top Performer</p>
              <p className="text-sm font-bold text-foreground">{QUOTA_ROWS[0].name.split(' ')[0]}</p>
              <p className="text-[11px] text-success">{QUOTA_ROWS[0].attainment}% attained</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg Deal Size</p>
              <p className="text-sm font-bold text-foreground tabular-nums">$28k</p>
              <p className="text-[11px] text-muted-foreground">across team</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Coverage Needed</p>
              <p className="text-sm font-bold text-foreground tabular-nums">2.8x</p>
              <p className="text-[11px] text-warning">to hit FY quota</p>
            </div>
          </div>
        </ChartCard>

        {/* Distribution donut */}
        <ChartCard
          title="Quota Distribution"
          description="Reps by attainment tier"
          height={400}
        >
          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DISTRIBUTION}
                  dataKey="count"
                  nameKey="label"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={3}
                  stroke="none"
                >
                  {DISTRIBUTION.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, _name, entry) => {
                    const e = entry?.payload as typeof DISTRIBUTION[number] | undefined;
                    return [`${v} reps (${e?.pct}%)`, e?.label ?? ''];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground tabular-nums">{reps.length}</span>
              <span className="text-[11px] text-muted-foreground">reps</span>
            </div>
          </div>
          {/* Legend with counts */}
          <div className="mt-4 space-y-1.5">
            {DISTRIBUTION.map((d) => (
              <div key={d.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground tabular-nums">{d.count}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">{d.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Quota attainment table */}
      <ChartCard
        title="Rep Quota Attainment"
        description="Per-rep quota, revenue, attainment %, gap, and linear projected FY attainment"
        height="auto"
        actions={
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
          </Button>
        }
      >
        <DataTable
          data={QUOTA_ROWS}
          columns={columns}
          getRowId={(d) => d.id}
          searchable={false}
          selectable={false}
          pageSize={10}
          initialSort={{ key: 'attainment', dir: 'desc' }}
          exportFilename="quota-attainment.csv"
        />
      </ChartCard>

      {/* Tier breakdown summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {ATTAINMENT_BUCKETS.map((tier, i) => {
          const tierReps = QUOTA_ROWS.filter((r) => r.attainment >= tier.min && r.attainment < tier.max);
          return (
            <div
              key={tier.label}
              className="bg-card border border-border rounded-xl p-4 hover:border-accent/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{tier.label}</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: tier.color }} />
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{tierReps.length}</p>
              <p className="text-[11px] text-muted-foreground">reps in tier</p>
              {tierReps.length > 0 ? (
                <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1">
                  {tierReps.slice(0, 3).map((r) => (
                    <AvatarBadge key={r.id} initials={r.initials} size="sm" color={r.avatarColor} />
                  ))}
                  {tierReps.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center">+{tierReps.length - 3}</span>
                  )}
                </div>
              ) : (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-[10px] text-muted-foreground/60">— no reps</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
