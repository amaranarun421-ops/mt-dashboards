'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { targets } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Flag, Target, TrendingUp, Gauge, Download, Plus, CheckCircle2, Clock, AlertCircle, MinusCircle } from 'lucide-react';

const PERIODS = ['Quarterly', 'Annual'];

// Build targets vs actuals data — actuals are synthesized
const targetsVsActuals = targets.map((t, i) => ({
  period: t.period,
  target: t.revenue,
  actual: i === 0 ? Math.round(t.revenue * 1.08) :
          i === 1 ? Math.round(t.revenue * 0.96) :
          i === 2 ? Math.round(t.revenue * 0.42) :
          0,
}));

// Breakdown by metric — synthesized
const metricBreakdown = [
  { metric: 'Revenue', target: 1500000, actual: 1440000, color: 'var(--accent)' },
  { metric: 'New Deals', target: 56, actual: 49, color: 'var(--chart-1)' },
  { metric: 'New Accounts', target: 18, actual: 16, color: 'var(--chart-3)' },
  { metric: 'Pipeline', target: 2100000, actual: 2280000, color: 'var(--chart-5)' },
];

function statusConfig(status: string) {
  switch (status) {
    case 'exceeded': return { color: 'var(--success)', icon: CheckCircle2, label: 'Exceeded' };
    case 'on_track': return { color: 'var(--accent)', icon: Clock, label: 'On track' };
    case 'in_progress': return { color: 'var(--warning)', icon: AlertCircle, label: 'In progress' };
    case 'missed': return { color: 'var(--destructive)', icon: MinusCircle, label: 'Missed' };
    default: return { color: 'var(--muted-foreground)', icon: AlertCircle, label: status };
  }
}

export default function TargetsPage() {
  const chartLoaded = useChartLoading(300);
  const [period, setPeriod] = React.useState('Quarterly');

  const currentTarget = targets[1]; // Q2 2025
  const currentAttainment = currentTarget.attainment; // 96
  const gap = currentTarget.revenue - Math.round(currentTarget.revenue * (currentTarget.attainment / 100));
  const projected = Math.round(currentTarget.revenue * 1.02);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Targets"
        description="Track quarterly and annual targets across revenue, deals, and accounts"
        icon={Flag}
        actions={
          <>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    period === p ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Set target
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Q2 Target"
          value={formatCurrency(currentTarget.revenue, { compact: true })}
          delta={`${currentTarget.deals} deals`}
          deltaType="neutral"
          icon={Flag}
          accentColor="var(--chart-1)"
          subtext={`${currentTarget.newAccounts} new accounts`}
          sparkline={targets.map((t) => t.revenue)}
          delay={0}
        />
        <KPICard
          title="Current Attainment"
          value={`${currentAttainment}%`}
          delta="-4pp"
          deltaType="negative"
          icon={Gauge}
          accentColor="var(--accent)"
          subtext={formatCurrency(Math.round(currentTarget.revenue * (currentAttainment / 100)), { compact: true })}
          sparkline={[88, 92, 95, 96, 94, 96, 97, 96]}
          delay={1}
        />
        <KPICard
          title="Gap to Target"
          value={formatCurrency(gap, { compact: true })}
          delta={`${Math.round((gap / currentTarget.revenue) * 100)}% remaining`}
          deltaType="negative"
          icon={Target}
          accentColor="var(--warning)"
          subtext="3 weeks left in quarter"
          sparkline={[180, 160, 140, 120, 100, 80, 70, 60]}
          delay={2}
        />
        <KPICard
          title="Projected Attainment"
          value={`${Math.round((projected / currentTarget.revenue) * 100)}%`}
          delta="+6pp"
          deltaType="positive"
          icon={TrendingUp}
          accentColor="var(--success)"
          subtext={formatCurrency(projected, { compact: true })}
          sparkline={[90, 93, 95, 97, 98, 100, 101, 102]}
          delay={3}
        />
      </div>

      {/* Main: bar chart + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Targets vs Actuals"
          description="Quarterly revenue target vs actual attainment"
          className="lg:col-span-2"
          height={380}
          legend={[
            { label: 'Target', color: 'var(--chart-1)' },
            { label: 'Actual', color: 'var(--accent)' },
          ]}
          trendBadge={{ value: 'Q1: +8% over', type: 'positive' }}
        >
          <div className={cn('h-[270px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={targetsVsActuals} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000000}M`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => (v === 0 ? ['—', String(name)] : [formatK(Number(v)), String(name)])}
                />
                <Bar dataKey="target" fill="var(--chart-1)" radius={[4, 4, 0, 0]} barSize={32} opacity={0.5} />
                <Bar dataKey="actual" radius={[4, 4, 0, 0]} barSize={32}>
                  {targetsVsActuals.map((entry, i) => {
                    const pct = entry.target > 0 ? (entry.actual / entry.target) * 100 : 0;
                    const color = pct >= 100 ? 'var(--success)' : pct >= 80 ? 'var(--accent)' : pct > 0 ? 'var(--warning)' : 'var(--muted-foreground)';
                    return <Cell key={i} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Target Breakdown"
          description="By metric (current quarter)"
          height={380}
        >
          <div className="space-y-5 pt-2">
            {metricBreakdown.map((m, i) => {
              const pct = Math.min(100, Math.round((m.actual / m.target) * 100));
              const isRevenue = m.metric === 'Revenue';
              return (
                <div key={m.metric} className="space-y-2 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{m.metric}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {isRevenue ? formatCurrency(m.actual, { compact: true }) : m.actual} / {isRevenue ? formatCurrency(m.target, { compact: true }) : m.target}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn('text-sm font-bold tabular-nums', pct >= 100 ? 'text-success' : pct >= 80 ? 'text-accent' : 'text-warning')}>
                        {pct}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">attainment</p>
                    </div>
                  </div>
                  <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: chartLoaded ? `${pct}%` : '0%',
                        transitionDelay: `${i * 120}ms`,
                        background: `linear-gradient(90deg, ${m.color}, color-mix(in oklch, ${m.color} 70%, transparent))`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Quarter progress</span>
              <span className="text-xs text-muted-foreground">Week 11 of 13</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 transition-colors',
                    i < 11 ? 'bg-accent' : 'bg-secondary'
                  )}
                  style={{ marginRight: i < 12 ? '2px' : 0 }}
                />
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Target history table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Target history</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Quarterly targets vs actuals with attainment status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Period</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Revenue target</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Deals target</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">New accounts</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Actual</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Attainment</th>
                <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((t, i) => {
                const actual = targetsVsActuals[i].actual;
                const attainment = t.attainment || (actual > 0 ? Math.round((actual / t.revenue) * 100) : 0);
                const cfg = statusConfig(t.status);
                const Icon = cfg.icon;
                return (
                  <tr
                    key={t.period}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{t.period}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(t.revenue, { compact: true })}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{t.deals}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{t.newAccounts}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">
                      {actual > 0 ? formatCurrency(actual, { compact: true }) : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${Math.min(attainment, 100)}%` : '0%',
                              transitionDelay: `${i * 60}ms`,
                              background: cfg.color,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums w-9">{attainment}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${cfg.color} 12%, transparent)`,
                          color: cfg.color,
                          borderColor: `color-mix(in oklch, ${cfg.color} 25%, transparent)`,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
