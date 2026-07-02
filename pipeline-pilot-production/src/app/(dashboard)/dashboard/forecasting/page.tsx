'use client';

import * as React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ReferenceLine,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, RankBadge } from '@/components/common/status-badge';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK,
} from '@/components/charts/chart-helpers';
import { forecastData, quarterlyForecast, leaderboard, deals } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp, Target, Gauge, AlertTriangle, RefreshCw, ChevronRight,
  ShieldAlert, ArrowUpRight, ArrowDownRight, Zap,
} from 'lucide-react';

// ---------- derived data ----------
const SCENARIOS = [
  {
    name: 'Conservative',
    probability: 85,
    value: 6_200_000,
    color: 'var(--chart-1)',
    description: 'Closed-won deals + commit-stage only',
  },
  {
    name: 'Base Case',
    probability: 65,
    value: 7_400_000,
    color: 'var(--accent)',
    description: 'Commit + best-case weighted by probability',
  },
  {
    name: 'Optimistic',
    probability: 40,
    value: 8_600_000,
    color: 'var(--chart-3)',
    description: 'Full pipeline incl. upside scenarios',
  },
] as const;

const RISK_FACTORS = [
  {
    severity: 'high' as const,
    title: 'Acme Multi-Year Renewal Slippage',
    description: 'Executive sponsor change at Acme may delay Q3 renewal close.',
    impact: '$320K at risk',
    deals: ['D-2054', 'D-2041'],
    mitigation: 'Engage exec sponsor mapping + contingency pricing',
  },
  {
    severity: 'medium' as const,
    title: 'DataStream Analytics Churn Signal',
    description: 'Low product engagement + 58% churn risk score on renewal.',
    impact: '$92K at risk',
    deals: ['D-2045'],
    mitigation: 'Schedule QBR + CSM escalation plan',
  },
  {
    severity: 'low' as const,
    title: 'Pipeline Coverage Gap in Q4',
    description: 'Current pipeline coverage at 2.4x — below 3.0x target for Q4.',
    impact: '$180K gap',
    deals: ['D-2052', 'D-2053'],
    mitigation: 'Increase outbound motion + accelerate discovery stage',
  },
];

const FORECAST_BY_REP = leaderboard
  .slice(0, 6)
  .map((r) => {
    const repDeals = deals.filter((d) => d.ownerId === r.id);
    const committed = repDeals
      .filter((d) => d.stage === 'Negotiation')
      .reduce((s, d) => s + d.weightedValue, 0);
    const bestCase = repDeals
      .filter((d) => d.stage === 'Proposal')
      .reduce((s, d) => s + d.weightedValue, 0);
    const pipeline = repDeals
      .filter((d) => ['Lead', 'Qualified', 'Discovery'].includes(d.stage))
      .reduce((s, d) => s + d.weightedValue, 0);
    return {
      ...r,
      committed,
      bestCase,
      pipeline,
      total: committed + bestCase + pipeline,
    };
  })
  .sort((a, b) => b.total - a.total);

type ForecastPoint = {
  month: string;
  actual: number | null;
  forecast: number;
  target: number;
};

// Chart data per timeframe
const FORECAST_RANGES: Record<'monthly' | 'quarterly' | 'annual', ForecastPoint[]> = {
  monthly: forecastData.map((d) => ({ ...d })),
  quarterly: [
    { month: 'Q1', actual: 1410000, forecast: 1350000, target: 1350000 },
    { month: 'Q2', actual: 1965000, forecast: 1900000, target: 1800000 },
    { month: 'Q3', actual: null, forecast: 2200000, target: 2000000 },
    { month: 'Q4', actual: null, forecast: 2600000, target: 2200000 },
  ],
  annual: [
    { month: '2023', actual: 4800000, forecast: 4700000, target: 4600000 },
    { month: '2024', actual: 6200000, forecast: 6100000, target: 6000000 },
    { month: '2025', actual: null, forecast: 7400000, target: 7000000 },
  ],
};

type RangeKey = keyof typeof FORECAST_RANGES;

export default function ForecastingPage() {
  const chartLoaded = useChartLoading(300);
  const [range, setRange] = React.useState<RangeKey>('monthly');
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const chartData = FORECAST_RANGES[range];
  const isMonthly = range === 'monthly';

  const maxScenario = Math.max(...SCENARIOS.map((s) => s.value));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Forecasting"
        description="Predict revenue outcomes with weighted pipeline scenarios"
        icon={TrendingUp}
        actions={
          <>
            <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Quarterly</TabsTrigger>
                <TabsTrigger value="annual" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="sm"
              className="bg-card border-border"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn('w-3.5 h-3.5 mr-1.5', refreshing && 'animate-spin')} />
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Q2 Forecast"
          value="$2.1M"
          delta="+18.4%"
          deltaType="positive"
          icon={TrendingUp}
          subtext="weighted pipeline"
          accentColor="var(--accent)"
          sparkline={[1.45, 1.62, 1.78, 1.95, 2.05, 2.10]}
          delay={0}
        />
        <KPICard
          title="Forecast Accuracy"
          value="94%"
          delta="+3pp"
          deltaType="positive"
          icon={Target}
          subtext="trailing 90 days"
          accentColor="var(--chart-1)"
          sparkline={[88, 90, 89, 91, 93, 94]}
          delay={1}
        />
        <KPICard
          title="Pipeline Coverage"
          value="3.2x"
          delta="+0.4x"
          deltaType="positive"
          icon={Gauge}
          subtext="vs target 3.0x"
          accentColor="var(--chart-3)"
          sparkline={[2.6, 2.8, 2.7, 2.9, 3.1, 3.2]}
          delay={2}
        />
        <KPICard
          title="At-Risk Revenue"
          value="$395K"
          delta="−$45K"
          deltaType="positive"
          icon={AlertTriangle}
          subtext="3 risk factors"
          accentColor="var(--destructive)"
          sparkline={[520, 480, 460, 420, 410, 395]}
          delay={3}
        />
      </div>

      {/* Main Forecast vs Actual area chart */}
      <ChartCard
        title="Forecast vs Actual Revenue"
        description={`${isMonthly ? '12-month' : range === 'quarterly' ? '4-quarter' : '3-year'} trend — actual solid, forecast dashed`}
        height={400}
        legend={[
          { label: 'Actual', color: 'var(--accent)' },
          { label: 'Forecast', color: 'var(--chart-3)' },
          { label: 'Target', color: 'var(--chart-1)' },
        ]}
        trendBadge={{ value: '+18.4% vs forecast', type: 'positive' }}
      >
        <div className={cn('h-[300px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fcActualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fcForecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} dx={-10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                formatter={(v, name) => (v == null ? ['—', String(name)] : [formatK(Number(v)), String(name)])}
              />
              <Area type="monotone" dataKey="target" stroke="var(--chart-1)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false} />
              <Area type="monotone" dataKey="forecast" stroke="var(--chart-3)" strokeWidth={2.5} fill="url(#fcForecastGrad)" strokeDasharray="6 4" dot={false} />
              <Area type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2.5} fill="url(#fcActualGrad)" dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <ReferenceLine y={0} stroke="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Footer summary */}
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">YTD Actual</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(3375000, { compact: true })}</p>
            <p className="text-xs text-success mt-0.5">+12% YoY</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">FY Forecast</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(7400000, { compact: true })}</p>
            <p className="text-xs text-muted-foreground mt-0.5">base case</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Variance</p>
            <p className="text-lg font-bold text-foreground tabular-nums">+6.2%</p>
            <p className="text-xs text-success mt-0.5">vs target</p>
          </div>
        </div>
      </ChartCard>

      {/* Two-column: quarterly breakdown bars + scenario cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Quarterly Forecast Breakdown"
          description="Committed vs best-case vs pipeline"
          height={380}
          legend={[
            { label: 'Committed', color: 'var(--accent)' },
            { label: 'Best Case', color: 'var(--chart-3)' },
            { label: 'Pipeline', color: 'var(--chart-1)' },
          ]}
        >
          <div className={cn('h-[280px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1_000_000}M`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v, name) => [formatK(Number(v)), String(name)]}
                  cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                />
                <Bar dataKey="committed" stackId="a" fill="var(--accent)" radius={[0, 0, 0, 0]} maxBarSize={56} />
                <Bar dataKey="bestCase" stackId="a" fill="var(--chart-3)" maxBarSize={56} />
                <Bar dataKey="pipeline" stackId="a" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Scenario analysis cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Scenario Analysis</h3>
              <p className="text-sm text-muted-foreground">Probability-weighted outcomes for FY2025</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary border border-border rounded-md px-2 py-1">
              {SCENARIOS.length} scenarios
            </span>
          </div>
          {SCENARIOS.map((s, i) => (
            <div
              key={s.name}
              className="group relative bg-card border border-border rounded-xl p-4 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${s.color} 6%, transparent), transparent 60%)` }} />
              <div className="relative flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in oklch, ${s.color} 14%, transparent)` }}
                  >
                    <Zap className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground">{s.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(s.value, { compact: true })}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{Math.round((s.value / maxScenario) * 100)}% of max</p>
                </div>
              </div>
              {/* Probability bar */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability</span>
                  <span className="text-xs font-semibold" style={{ color: s.color }}>{s.probability}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: chartLoaded ? `${s.probability}%` : '0%',
                      transitionDelay: `${i * 150 + 200}ms`,
                      background: `linear-gradient(90deg, ${s.color}, color-mix(in oklch, ${s.color} 60%, transparent))`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk factors card */}
      <ChartCard
        title="Forecast Risk Factors"
        description="Active risks impacting current quarter forecast"
        height="auto"
        actions={
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View all <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RISK_FACTORS.map((risk, i) => (
            <div
              key={risk.title}
              className={cn(
                'relative bg-secondary/40 border rounded-xl p-4 hover:bg-secondary/60 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500',
                risk.severity === 'high' && 'border-destructive/30',
                risk.severity === 'medium' && 'border-warning/30',
                risk.severity === 'low' && 'border-border'
              )}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className={cn(
                    'w-4 h-4',
                    risk.severity === 'high' && 'text-destructive',
                    risk.severity === 'medium' && 'text-warning',
                    risk.severity === 'low' && 'text-muted-foreground'
                  )} />
                  <span className={cn(
                    'inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold border uppercase tracking-wider',
                    risk.severity === 'high' && 'bg-destructive/15 text-destructive border-destructive/30',
                    risk.severity === 'medium' && 'bg-warning/15 text-warning border-warning/30',
                    risk.severity === 'low' && 'bg-secondary text-muted-foreground border-border'
                  )}>
                    {risk.severity}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-foreground tabular-nums">{risk.impact}</span>
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug mb-1.5">{risk.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{risk.description}</p>
              {/* Impacted deals */}
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Impacted deals</p>
                <div className="flex flex-wrap gap-1.5">
                  {risk.deals.map((d) => (
                    <span key={d} className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-card border border-border text-[10px] font-mono text-muted-foreground">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              {/* Mitigation */}
              <div className="pt-3 border-t border-border">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Mitigation</p>
                <button className="text-[11px] text-accent hover:underline text-left flex items-start gap-1">
                  {risk.mitigation}
                  <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Forecast by rep leaderboard */}
      <ChartCard
        title="Forecast by Rep"
        description="Weighted forecast contribution per rep (committed + best case + pipeline)"
        height="auto"
        actions={
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View leaderboard <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        }
      >
        <div className="space-y-2.5">
          {FORECAST_BY_REP.map((r, i) => {
            const maxTotal = Math.max(...FORECAST_BY_REP.map((x) => x.total));
            const committedPct = (r.committed / maxTotal) * 100;
            const bestCasePct = (r.bestCase / maxTotal) * 100;
            const pipelinePct = (r.pipeline / maxTotal) * 100;
            return (
              <div
                key={r.id}
                className="group grid grid-cols-12 items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* rank + avatar */}
                <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
                  <RankBadge rank={i + 1} />
                  <AvatarBadge initials={r.initials} size="md" color={r.avatarColor} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{r.role} · {r.territory}</p>
                  </div>
                </div>
                {/* stacked bar */}
                <div className="col-span-12 sm:col-span-5">
                  <div className="h-6 bg-secondary rounded-md overflow-hidden flex">
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: chartLoaded ? `${committedPct}%` : '0%',
                        transitionDelay: `${i * 80 + 200}ms`,
                        background: 'var(--accent)',
                      }}
                      title={`Committed: ${formatCurrency(r.committed, { compact: true })}`}
                    />
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: chartLoaded ? `${bestCasePct}%` : '0%',
                        transitionDelay: `${i * 80 + 350}ms`,
                        background: 'var(--chart-3)',
                      }}
                      title={`Best Case: ${formatCurrency(r.bestCase, { compact: true })}`}
                    />
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: chartLoaded ? `${pipelinePct}%` : '0%',
                        transitionDelay: `${i * 80 + 500}ms`,
                        background: 'var(--chart-1)',
                      }}
                      title={`Pipeline: ${formatCurrency(r.pipeline, { compact: true })}`}
                    />
                  </div>
                </div>
                {/* total + delta */}
                <div className="col-span-12 sm:col-span-3 flex sm:flex-col items-end gap-1">
                  <span className="text-base font-bold text-foreground tabular-nums">{formatCurrency(r.total, { compact: true })}</span>
                  <span className={cn(
                    'inline-flex items-center gap-0.5 text-[11px] font-medium',
                    r.changePct >= 0 ? 'text-success' : 'text-destructive'
                  )}>
                    {r.changePct >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(r.changePct)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--accent)' }} />
            <span className="text-muted-foreground">Committed</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--chart-3)' }} />
            <span className="text-muted-foreground">Best Case</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--chart-1)' }} />
            <span className="text-muted-foreground">Pipeline</span>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
