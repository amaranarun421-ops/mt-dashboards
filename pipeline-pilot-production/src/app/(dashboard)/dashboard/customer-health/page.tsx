'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Area, AreaChart,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { customerHealth, accounts } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartPulse, Activity, Users, AlertCircle, Download, Smile, Meh, Frown, TrendingUp } from 'lucide-react';

// Health score distribution buckets
const distribution = [
  { range: '0-40', count: 0, color: 'var(--destructive)' },
  { range: '41-55', count: 1, color: 'var(--chart-5)' },
  { range: '56-70', count: 1, color: 'var(--warning)' },
  { range: '71-85', count: 5, color: 'var(--accent)' },
  { range: '86-100', count: 5, color: 'var(--success)' },
];

// Health trend (6 months)
const healthTrend = [
  { month: 'Jan', avg: 76, healthy: 8, atRisk: 3, critical: 1 },
  { month: 'Feb', avg: 78, healthy: 9, atRisk: 2, critical: 1 },
  { month: 'Mar', avg: 80, healthy: 9, atRisk: 2, critical: 1 },
  { month: 'Apr', avg: 79, healthy: 9, atRisk: 3, critical: 0 },
  { month: 'May', avg: 82, healthy: 10, atRisk: 2, critical: 0 },
  { month: 'Jun', avg: 81, healthy: 9, atRisk: 3, critical: 0 },
];

// Build health matrix data — usage, engagement, support, NPS, payment
const matrix = accounts.slice(0, 10).map((a, i) => ({
  account: a.name,
  tier: a.tier,
  arr: a.arr,
  usage: [92, 85, 70, 45, 88, 95, 60, 82, 75, 89][i] || 75,
  engagement: [88, 76, 64, 38, 90, 92, 58, 70, 72, 86][i] || 70,
  support: [95, 88, 75, 50, 92, 98, 65, 80, 78, 90][i] || 80, // lower = more tickets
  nps: [9, 8, 6, 4, 9, 10, 5, 7, 7, 9][i] || 7,
  payment: [100, 100, 85, 60, 100, 100, 75, 95, 90, 100][i] || 95,
}));

function cellColor(value: number, max: number = 100) {
  const pct = (value / max) * 100;
  if (pct >= 85) return 'var(--success)';
  if (pct >= 70) return 'var(--accent)';
  if (pct >= 55) return 'var(--warning)';
  return 'var(--destructive)';
}

function cellLabel(value: number, max: number = 100) {
  const pct = (value / max) * 100;
  if (pct >= 85) return 'Healthy';
  if (pct >= 70) return 'Good';
  if (pct >= 55) return 'Watch';
  return 'Risk';
}

const INDICATORS = [
  { key: 'usage', label: 'Product Usage', icon: Activity, max: 100 },
  { key: 'engagement', label: 'Engagement', icon: Users, max: 100 },
  { key: 'support', label: 'Support Health', icon: HeartPulse, max: 100 },
  { key: 'nps', label: 'NPS Score', icon: Smile, max: 10 },
  { key: 'payment', label: 'Payment History', icon: TrendingUp, max: 100 },
] as const;

export default function CustomerHealthPage() {
  const chartLoaded = useChartLoading(300);

  const avgHealth = Math.round(customerHealth.reduce((s, a) => s + a.healthScore, 0) / customerHealth.length);
  const healthy = customerHealth.filter((a) => a.healthScore >= 85).length;
  const atRisk = customerHealth.filter((a) => a.healthScore >= 60 && a.healthScore < 85).length;
  const critical = customerHealth.filter((a) => a.healthScore < 60).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Health"
        description="Holistic view of account health across usage, engagement, and sentiment"
        icon={HeartPulse}
        actions={
          <Button variant="outline" size="sm" className="bg-card border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export matrix
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Avg Health Score"
          value={avgHealth}
          delta="+3"
          deltaType="positive"
          icon={HeartPulse}
          accentColor="var(--accent)"
          subtext={`Across ${customerHealth.length} accounts`}
          sparkline={healthTrend.map((h) => h.avg)}
          delay={0}
        />
        <KPICard
          title="Healthy Accounts"
          value={healthy}
          delta="+2"
          deltaType="positive"
          icon={Smile}
          accentColor="var(--success)"
          subtext="Score ≥ 85"
          sparkline={[6, 7, 8, 7, 9, 10, 9, 9]}
          delay={1}
        />
        <KPICard
          title="At-Risk Accounts"
          value={atRisk}
          delta="+1"
          deltaType="negative"
          icon={Meh}
          accentColor="var(--warning)"
          subtext="Score 60–84"
          sparkline={[4, 3, 3, 4, 3, 2, 3, 3]}
          delay={2}
        />
        <KPICard
          title="Critical Accounts"
          value={critical}
          delta="-1"
          deltaType="positive"
          icon={Frown}
          accentColor="var(--destructive)"
          subtext="Score < 60"
          sparkline={[2, 2, 1, 1, 0, 0, 0, 0]}
          delay={3}
        />
      </div>

      {/* Main: distribution + trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Health Score Distribution"
          description="Accounts grouped by score range"
          height={360}
        >
          <div className={cn('h-[260px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v) => [`${v} accounts`, 'Count']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Healthiest</p>
              <p className="text-lg font-bold text-success tabular-nums">95</p>
              <p className="text-[10px] text-muted-foreground">CloudFirst Inc</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Median</p>
              <p className="text-lg font-bold text-foreground tabular-nums">80</p>
              <p className="text-[10px] text-muted-foreground">Quantum Logistics</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lowest</p>
              <p className="text-lg font-bold text-destructive tabular-nums">65</p>
              <p className="text-[10px] text-muted-foreground">DataStream</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Health Trend"
          description="Avg health score over 6 months"
          className="lg:col-span-2"
          height={360}
          legend={[{ label: 'Avg health score', color: 'var(--accent)' }]}
          trendBadge={{ value: '+5pts', type: 'positive' }}
        >
          <div className={cn('h-[260px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} domain={[60, 100]} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => [`${v}`, String(name)]}
                />
                <Area type="monotone" dataKey="avg" stroke="var(--accent)" strokeWidth={2.5} fill="url(#healthTrendGrad)" dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3">
            {[
              { label: 'Healthy', value: healthTrend[5].healthy, color: 'var(--success)', icon: Smile },
              { label: 'At-risk', value: healthTrend[5].atRisk, color: 'var(--warning)', icon: Meh },
              { label: 'Critical', value: healthTrend[5].critical, color: 'var(--destructive)', icon: Frown },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-base font-bold text-foreground tabular-nums">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Health matrix */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Customer health matrix</h3>
            <span className="text-[11px] text-muted-foreground">({matrix.length} accounts × {INDICATORS.length} indicators)</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--success)' }} /><span className="text-muted-foreground">Healthy</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--accent)' }} /><span className="text-muted-foreground">Good</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--warning)' }} /><span className="text-muted-foreground">Watch</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--destructive)' }} /><span className="text-muted-foreground">Risk</span></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4 sticky left-0 bg-secondary/95 backdrop-blur z-10">Account</th>
                {INDICATORS.map((ind) => (
                  <th key={ind.key} className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-3 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <ind.icon className="w-3.5 h-3.5" />
                      <span>{ind.label}</span>
                    </div>
                  </th>
                ))}
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">ARR</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr
                  key={row.account}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                  style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                >
                  <td className="py-3 px-4 sticky left-0 bg-card z-10">
                    <p className="font-medium text-foreground truncate max-w-[180px]">{row.account}</p>
                    <p className="text-[10px] text-muted-foreground">{row.tier}</p>
                  </td>
                  {INDICATORS.map((ind) => {
                    const val = row[ind.key as keyof typeof row] as number;
                    const color = cellColor(val, ind.max);
                    const label = cellLabel(val, ind.max);
                    return (
                      <td key={ind.key} className="py-3 px-3 text-center">
                        <div
                          className="inline-flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-md min-w-[80px] transition-all hover:scale-105"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                            border: `1px solid color-mix(in oklch, ${color} 25%, transparent)`,
                          }}
                        >
                          <span className="text-sm font-bold tabular-nums" style={{ color }}>{val}</span>
                          <span className="text-[9px] uppercase tracking-wider font-medium" style={{ color }}>{label}</span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">
                    {formatCurrency(row.arr, { compact: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
