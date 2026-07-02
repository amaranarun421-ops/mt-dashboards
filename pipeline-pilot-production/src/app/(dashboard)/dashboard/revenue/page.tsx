'use client';

import * as React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, StageBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { revenueTrend, forecastData, accounts, deals } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Target, ArrowUpRight, Crown, Building2, Layers } from 'lucide-react';

// Revenue by segment
const segmentBreakdown = [
  { segment: 'Enterprise', value: 1840000, share: 58, accounts: 6, color: 'var(--accent)' },
  { segment: 'Growth', value: 980000, share: 31, accounts: 12, color: 'var(--chart-1)' },
  { segment: 'Starter', value: 340000, share: 11, accounts: 24, color: 'var(--chart-5)' },
];

// Revenue by industry
const industryRevenue = [
  { name: 'Technology', value: 845000, color: 'var(--accent)' },
  { name: 'Healthcare', value: 612000, color: 'var(--chart-1)' },
  { name: 'Manufacturing', value: 478000, color: 'var(--chart-3)' },
  { name: 'Finance', value: 412000, color: 'var(--chart-4)' },
  { name: 'Cloud Services', value: 285000, color: 'var(--chart-5)' },
  { name: 'Other', value: 188000, color: 'var(--muted-foreground)' },
];

// Monthly revenue table data with sparkline arrays
const monthlyTable = revenueTrend.map((r, i) => ({
  month: r.month,
  revenue: r.revenue,
  target: r.target,
  pipeline: r.pipeline,
  attainment: Math.round((r.revenue / r.target) * 100),
  sparkline: revenueTrend.slice(Math.max(0, i - 3), i + 4).map((d) => d.revenue),
  prevYear: Math.round(r.revenue * 0.82),
}));

// Top revenue accounts (compute from deals)
const topAccounts = [...accounts]
  .map((a) => ({
    name: a.name,
    arr: a.arr,
    tier: a.tier,
    owner: a.owner,
    ownerInitials: a.ownerInitials,
    deals: a.activeDeals,
    industry: a.industry,
    color: a.logoColor,
    change: [12, 8, -3, 15, 6, 22, -8, 11][Math.floor(Math.random() * 8)] || 7,
  }))
  .sort((a, b) => b.arr - a.arr)
  .slice(0, 6);

// Build a combined dataset of actual + target + forecast
const combinedRev = revenueTrend.map((r, i) => {
  const f = forecastData[i];
  return {
    month: r.month,
    actual: r.revenue,
    target: r.target,
    forecast: f ? f.forecast : null,
  };
});

function Sparkline({ data, color = 'var(--accent)' }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const id = `spark-${color.replace(/[^a-z0-9]/gi, '')}-${data[0]}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-6" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={path} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RevenuePage() {
  const chartLoaded = useChartLoading(300);
  const [range, setRange] = React.useState<'12m' | '6m' | '3m'>('12m');

  const totalYTD = revenueTrend.reduce((s, r) => s + r.revenue, 0);
  const totalTarget = revenueTrend.reduce((s, r) => s + r.target, 0);
  const attainment = Math.round((totalYTD / totalTarget) * 100);

  const filteredRev = React.useMemo(() => {
    if (range === '6m') return combinedRev.slice(-6);
    if (range === '3m') return combinedRev.slice(-3);
    return combinedRev;
  }, [range]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue"
        description="Track revenue performance against targets and forecasts"
        icon={DollarSign}
        actions={
          <>
            <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="3m" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">3M</TabsTrigger>
                <TabsTrigger value="6m" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">6M</TabsTrigger>
                <TabsTrigger value="12m" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">12M</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* Revenue Hero — full width multi-series area chart with right rail segment breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue Performance"
          description="Actual vs target vs forecast"
          className="lg:col-span-2"
          height={420}
          legend={[
            { label: 'Actual', color: 'var(--accent)' },
            { label: 'Target', color: 'var(--chart-1)' },
            { label: 'Forecast', color: 'var(--chart-3)' },
          ]}
          trendBadge={{ value: `+${attainment - 100}% vs target`, type: attainment >= 100 ? 'positive' : 'negative' }}
        >
          <div className={cn('h-[300px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredRev} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.22} />
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
                <Area type="monotone" dataKey="target" stroke="var(--chart-1)" strokeWidth={2} fill="url(#targetGrad)" dot={false} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="forecast" stroke="var(--chart-3)" strokeWidth={2} fill="url(#forecastGrad)" dot={false} strokeDasharray="2 4" />
                <Area type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2.5} fill="url(#actualGrad)" dot={{ r: 2.5, fill: 'var(--accent)', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Footer metrics */}
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">YTD Revenue</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(totalYTD, { compact: true })}</p>
              <p className="text-xs text-success mt-0.5">+12.5% YoY</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Target Attainment</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{attainment}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">of {formatCurrency(totalTarget, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Q4 Forecast</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(2800000, { compact: true })}</p>
              <p className="text-xs text-success mt-0.5">+18% vs Q3</p>
            </div>
          </div>
        </ChartCard>

        {/* Revenue by segment — horizontal bars */}
        <ChartCard
          title="Revenue by Segment"
          description="Enterprise · Growth · Starter"
          height={420}
        >
          <div className="space-y-5 pt-2">
            {segmentBreakdown.map((seg, i) => {
              const maxVal = Math.max(...segmentBreakdown.map((s) => s.value));
              return (
                <div key={seg.segment} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
                        <span className="text-sm font-semibold text-foreground">{seg.segment}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{seg.accounts} accounts · {seg.share}% of revenue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(seg.value, { compact: true })}</p>
                    </div>
                  </div>
                  <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: chartLoaded ? `${(seg.value / maxVal) * 100}%` : '0%',
                        transitionDelay: `${i * 150}ms`,
                        background: `linear-gradient(90deg, ${seg.color}, color-mix(in oklch, ${seg.color} 70%, transparent))`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ARR Mix</span>
              <span className="text-xs text-muted-foreground">Total {formatCurrency(3160000, { compact: true })}</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden">
              {segmentBreakdown.map((seg) => (
                <div
                  key={seg.segment}
                  className="h-full transition-all duration-700"
                  style={{
                    width: chartLoaded ? `${seg.share}%` : '0%',
                    background: seg.color,
                  }}
                />
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Monthly revenue table with sparklines + Industry donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Monthly Revenue Detail"
          description="Performance with year-over-year comparison"
          className="lg:col-span-2"
          height="auto"
        >
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Month</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Revenue</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Target</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">YoY</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Attain</th>
                  <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTable.slice().reverse().map((row, i) => (
                  <tr
                    key={row.month}
                    className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-2.5 px-2 font-medium text-foreground">{row.month}</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-foreground tabular-nums">{formatCurrency(row.revenue, { compact: true })}</td>
                    <td className="py-2.5 px-2 text-right text-muted-foreground tabular-nums">{formatCurrency(row.target, { compact: true })}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      <span className={row.revenue >= row.prevYear ? 'text-success' : 'text-destructive'}>
                        {row.revenue >= row.prevYear ? '+' : ''}
                        {Math.round(((row.revenue - row.prevYear) / row.prevYear) * 100)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tabular-nums',
                        row.attainment >= 100 ? 'bg-success/15 text-success' : row.attainment >= 90 ? 'bg-warning/15 text-warning' : 'bg-destructive/15 text-destructive'
                      )}>
                        {row.attainment}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex justify-center">
                        <Sparkline data={row.sparkline} color={row.attainment >= 100 ? 'var(--accent)' : 'var(--chart-1)'} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Industry donut */}
        <ChartCard
          title="Revenue by Industry"
          description="Top revenue-generating sectors"
          height="auto"
        >
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryRevenue}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  stroke="none"
                >
                  {industryRevenue.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => [formatK(Number(v)), String(name)]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(2820000, { compact: true })}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {industryRevenue.map((ind) => (
              <div key={ind.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: ind.color }} />
                <span className="text-xs text-muted-foreground truncate flex-1">{ind.name}</span>
                <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(ind.value, { compact: true })}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Top revenue-generating accounts leaderboard */}
      <ChartCard
        title="Top Revenue Accounts"
        description="Highest ARR contributors this period"
        height="auto"
        actions={
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View all <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topAccounts.map((acct, i) => (
            <div
              key={acct.name}
              className="group relative bg-secondary/40 border border-border rounded-xl p-4 hover:border-accent/40 hover:bg-secondary/60 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-white" style={{ background: acct.color }}>
                    {acct.name.slice(0, 2).toUpperCase()}
                  </div>
                  {i < 3 && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-warning/20 border border-warning/40 flex items-center justify-center">
                      <Crown className="w-3 h-3 text-warning" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{acct.name}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{acct.industry} · {acct.tier}</p>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(acct.arr, { compact: true })}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={cn('text-[11px] font-medium', acct.change >= 0 ? 'text-success' : 'text-destructive')}>
                      {acct.change >= 0 ? '+' : ''}{acct.change}%
                    </span>
                    <span className="text-[10px] text-muted-foreground">vs last quarter</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <AvatarBadge initials={acct.ownerInitials} size="sm" color={acct.color} />
                  <span className="text-[10px] text-muted-foreground">{acct.deals} deals</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Bottom row: quick metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Net New ARR', value: '$486k', delta: '+24%', icon: TrendingUp, color: 'var(--accent)' },
          { label: 'Avg Deal Size', value: '$128k', delta: '+8%', icon: Target, color: 'var(--chart-1)' },
          { label: 'Expansion Rate', value: '34%', delta: '+5pp', icon: Layers, color: 'var(--chart-3)' },
          { label: 'Logo Retention', value: '94%', delta: '+2pp', icon: Building2, color: 'var(--chart-5)' },
        ].map((m, i) => (
          <div
            key={m.label}
            className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</span>
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${m.color} 12%, transparent)` }}>
                <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">{m.value}</p>
            <p className="text-[11px] text-success mt-0.5">{m.delta} vs last period</p>
          </div>
        ))}
      </div>
    </div>
  );
}
