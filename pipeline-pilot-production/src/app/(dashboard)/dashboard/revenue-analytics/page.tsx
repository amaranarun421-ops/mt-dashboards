'use client';

import * as React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { revenueTrend, forecastData, accounts } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DollarSign, TrendingUp, Target, Users, Calendar, Download, ArrowUpRight,
  ArrowDownRight, Layers, Plus, Minus,
} from 'lucide-react';

// Revenue by industry (synthesized from accounts)
const industryRevenue = [
  { name: 'Technology', value: 845000, color: 'var(--accent)' },
  { name: 'Healthcare', value: 612000, color: 'var(--chart-1)' },
  { name: 'Manufacturing', value: 478000, color: 'var(--chart-3)' },
  { name: 'Finance', value: 412000, color: 'var(--chart-4)' },
  { name: 'Cloud Services', value: 285000, color: 'var(--chart-5)' },
  { name: 'Logistics', value: 215000, color: 'var(--warning)' },
];

// Revenue by segment
const segmentRevenue = [
  { name: 'Enterprise', value: 1840000, color: 'var(--accent)' },
  { name: 'Growth', value: 980000, color: 'var(--chart-1)' },
  { name: 'Starter', value: 340000, color: 'var(--chart-5)' },
];

// Revenue waterfall data (Q2 actuals)
const waterfall = [
  { name: 'Starting ARR', value: 2180000, type: 'start' },
  { name: 'New Business', value: 540000, type: 'add' },
  { name: 'Expansion', value: 320000, type: 'add' },
  { name: 'Upsell', value: 180000, type: 'add' },
  { name: 'Churn', value: -240000, type: 'sub' },
  { name: 'Downgrade', value: -120000, type: 'sub' },
  { name: 'Ending ARR', value: 2860000, type: 'end' },
];

// Compute cumulative for waterfall visual
const waterfallCumulative = (() => {
  let cumulative = 0;
  return waterfall.map((w, i) => {
    let start: number;
    let end: number;
    if (w.type === 'start' || w.type === 'end') {
      start = 0;
      end = w.value;
      cumulative = w.value;
    } else if (w.type === 'add') {
      start = cumulative;
      end = cumulative + w.value;
      cumulative = end;
    } else {
      start = cumulative + w.value;
      end = cumulative;
      cumulative = start;
    }
    return {
      name: w.name,
      start,
      end,
      value: w.value,
      type: w.type,
      fill: w.type === 'add' ? 'var(--success)' : w.type === 'sub' ? 'var(--destructive)' : w.type === 'end' ? 'var(--accent)' : 'var(--chart-1)',
      isTotal: w.type === 'start' || w.type === 'end',
    };
  });
})();

const monthlyTable = revenueTrend.map((r, i) => ({
  month: r.month,
  revenue: r.revenue,
  target: r.target,
  growth: i === 0 ? 0 : Math.round(((r.revenue - revenueTrend[i - 1].revenue) / revenueTrend[i - 1].revenue) * 100),
  pipeline: r.pipeline,
}));

const combinedRev = revenueTrend.map((r, i) => {
  const f = forecastData[i];
  return {
    month: r.month,
    actual: r.revenue,
    target: r.target,
    forecast: f ? f.forecast : null,
  };
});

const RANGES = [
  { id: 'ytd', label: 'YTD' },
  { id: 'q2', label: 'Q2 2025' },
  { id: 'q3', label: 'Q3 2025' },
  { id: '12m', label: 'Last 12 months' },
];

const SEGMENTS = ['All Segments', 'Enterprise', 'Growth', 'Starter'];

export default function RevenueAnalyticsPage() {
  const chartLoaded = useChartLoading(300);
  const [range, setRange] = React.useState('ytd');
  const [segment, setSegment] = React.useState('All Segments');

  const totalRevenue = revenueTrend.reduce((s, r) => s + r.revenue, 0);
  const arr = accounts.reduce((s, a) => s + a.arr, 0);
  const avgDealSize = Math.round(totalRevenue / 187);
  const revenuePerRep = Math.round(totalRevenue / 8);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Analytics"
        description="Deep dive into revenue performance, segments, and motion"
        icon={DollarSign}
        actions={
          <>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-36 h-9 bg-card border-border">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger className="w-40 h-9 bg-card border-border">
                <Layers className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEGMENTS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={`$${(totalRevenue / 1_000_000).toFixed(2)}M`}
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          accentColor="var(--accent)"
          subtext="YTD 2025"
          sparkline={revenueTrend.slice(0, 8).map((r) => r.revenue)}
          delay={0}
        />
        <KPICard
          title="ARR"
          value={`$${(arr / 1_000_000).toFixed(2)}M`}
          delta="+8.4%"
          deltaType="positive"
          icon={TrendingUp}
          accentColor="var(--chart-1)"
          subtext="Annual recurring revenue"
          sparkline={[1.9, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.16]}
          delay={1}
        />
        <KPICard
          title="Avg Deal Size"
          value={`$${(avgDealSize / 1000).toFixed(0)}k`}
          delta="+6.2%"
          deltaType="positive"
          icon={Target}
          accentColor="var(--chart-3)"
          subtext="Across 187 closed deals"
          sparkline={[112, 118, 124, 121, 128, 132, 138, 142]}
          delay={2}
        />
        <KPICard
          title="Revenue per Rep"
          value={`$${(revenuePerRep / 1000).toFixed(0)}k`}
          delta="+11.3%"
          deltaType="positive"
          icon={Users}
          accentColor="var(--chart-5)"
          subtext="8 active reps"
          sparkline={[280, 295, 310, 325, 340, 360, 375, 395]}
          delay={3}
        />
      </div>

      {/* Top row: Revenue trend multi-line */}
      <ChartCard
        title="Revenue Trend"
        description="Actual vs target vs forecast (12 months)"
        height={400}
        legend={[
          { label: 'Actual', color: 'var(--accent)' },
          { label: 'Target', color: 'var(--chart-1)' },
          { label: 'Forecast', color: 'var(--chart-3)' },
        ]}
        trendBadge={{ value: '+18% YoY', type: 'positive' }}
      >
        <div className={cn('h-[290px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={combinedRev} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="actualGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad2" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="target" stroke="var(--chart-1)" strokeWidth={2} fill="url(#targetGrad2)" dot={false} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="forecast" stroke="var(--chart-3)" strokeWidth={2} fill="url(#forecastGrad2)" dot={false} strokeDasharray="2 4" />
              <Area type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2.5} fill="url(#actualGrad2)" dot={{ r: 2.5, fill: 'var(--accent)', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Mid row: industry + segment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Revenue by Industry"
          description="Top sectors driving revenue"
          height={380}
        >
          <div className={cn('h-[280px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryRevenue} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} width={100} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v) => [formatK(Number(v)), 'Revenue']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {industryRevenue.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Revenue by Segment"
          description="Enterprise · Growth · Starter"
          height={380}
        >
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentRevenue}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {segmentRevenue.map((entry) => (
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
              <span className="text-xl font-bold text-foreground tabular-nums">$3.16M</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {segmentRevenue.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground flex-1">{s.name}</span>
                <span className="text-xs font-semibold text-foreground tabular-nums">{formatK(s.value)}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {Math.round((s.value / 3160000) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Below: revenue table + waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <ChartCard
          title="Revenue by Month"
          description="Growth rate vs previous month"
          className="lg:col-span-3"
          height="auto"
        >
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Month</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Revenue</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Target</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Pipeline</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTable.map((row, i) => (
                  <tr
                    key={row.month}
                    className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 25}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-2.5 px-2 font-medium text-foreground">{row.month}</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-foreground tabular-nums">{formatK(row.revenue)}</td>
                    <td className="py-2.5 px-2 text-right text-muted-foreground tabular-nums">{formatK(row.target)}</td>
                    <td className="py-2.5 px-2 text-right text-muted-foreground tabular-nums">{formatK(row.pipeline)}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">
                      {row.growth === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', row.growth >= 0 ? 'text-success' : 'text-destructive')}>
                          {row.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(row.growth)}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard
          title="Revenue Waterfall"
          description="Q2 net ARR movement"
          className="lg:col-span-2"
          height="auto"
        >
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallCumulative} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ ...AXIS_TICK_STYLE, fontSize: 9 }} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000000}M`} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, _name, props) => {
                    const item = props?.payload;
                    const numVal = Number(v);
                    if (item?.isTotal) return [formatK(numVal), 'Total'];
                    return [`${numVal >= 0 ? '+' : ''}${formatK(numVal)}`, item?.type === 'add' ? 'Gain' : 'Loss'];
                  }}
                />
                <Bar dataKey="start" stackId="a" fill="transparent" />
                <Bar dataKey="end" stackId="a" radius={[4, 4, 0, 0]} barSize={32}>
                  {waterfallCumulative.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-success/10 border border-success/20 rounded-md p-2">
              <div className="flex items-center gap-1">
                <Plus className="w-3 h-3 text-success" />
                <span className="text-[10px] uppercase tracking-wider text-success font-semibold">Additions</span>
              </div>
              <p className="text-sm font-bold text-foreground tabular-nums mt-1">$1.04M</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2">
              <div className="flex items-center gap-1">
                <Minus className="w-3 h-3 text-destructive" />
                <span className="text-[10px] uppercase tracking-wider text-destructive font-semibold">Losses</span>
              </div>
              <p className="text-sm font-bold text-foreground tabular-nums mt-1">$360k</p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
