'use client';

import * as React from 'react';
import {
  LineChart, Line, Area, AreaChart, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, RankBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { conversionData, sourceData, reps } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Percent, TrendingUp, Clock, Gauge, Download, Trophy } from 'lucide-react';

// Synthesized source conversion rates
const sourceConversion = sourceData.map((s, i) => ({
  name: s.name,
  rate: [38, 32, 28, 22, 18][i] || 20,
  deals: Math.round(s.value * 0.8),
  color: s.color,
}));

// Conversion leaderboard by rep (synthesized from reps)
const repLeaderboard = reps.slice().map((r, i) => ({
  ...r,
  entered: Math.round(r.dealsClosed / (r.winRate / 100)),
  won: r.dealsClosed,
  convRate: r.winRate,
  rank: i + 1,
  color: r.avatarColor,
})).sort((a, b) => b.convRate - a.convRate).map((r, i) => ({ ...r, rank: i + 1 }));

const trend12 = conversionData.map((c) => ({
  month: c.month,
  rate: c.rate,
  prevYear: Math.max(8, c.rate - 8 - Math.round(Math.random() * 4)),
}));

export default function ConversionAnalyticsPage() {
  const chartLoaded = useChartLoading(300);

  const leadToWin = Math.round((62 / 892) * 100 * 10) / 10;
  const stageToStage = Math.round(stageToStageAvg() * 10) / 10;
  const timeToClose = 41;
  const velocity = 18;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conversion Analytics"
        description="Measure lead-to-customer conversion performance"
        icon={Percent}
        actions={
          <Button variant="outline" size="sm" className="bg-card border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Lead-to-Win %"
          value={`${leadToWin}%`}
          delta="+2.1pp"
          deltaType="positive"
          icon={TrendingUp}
          accentColor="var(--accent)"
          subtext="892 leads → 62 won"
          sparkline={conversionData.map((c) => c.rate)}
          delay={0}
        />
        <KPICard
          title="Stage-to-Stage %"
          value={`${stageToStage}%`}
          delta="+1.4pp"
          deltaType="positive"
          icon={Percent}
          accentColor="var(--chart-1)"
          subtext="Avg across 5 stages"
          sparkline={[58, 60, 62, 61, 64, 63, 66, 65, 67, 68, 70, 72]}
          delay={1}
        />
        <KPICard
          title="Time to Close"
          value={`${timeToClose}d`}
          delta="-3d"
          deltaType="positive"
          icon={Clock}
          accentColor="var(--chart-3)"
          subtext="Avg sales cycle"
          sparkline={[52, 50, 48, 47, 45, 44, 43, 42, 42, 41, 41, 41]}
          delay={2}
        />
        <KPICard
          title="Conversion Velocity"
          value={`${velocity}/wk`}
          delta="+12%"
          deltaType="positive"
          icon={Gauge}
          accentColor="var(--chart-5)"
          subtext="Deals converted per week"
          sparkline={[12, 14, 13, 15, 14, 16, 15, 17, 16, 17, 18, 18]}
          delay={3}
        />
      </div>

      {/* Main: trend + source bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Conversion Rate Trend"
          description="Monthly lead-to-customer conversion % over 12 months"
          className="lg:col-span-2"
          height={380}
          legend={[
            { label: 'This year', color: 'var(--accent)' },
            { label: 'Last year', color: 'var(--chart-3)' },
          ]}
          trendBadge={{ value: '+8.2pp YoY', type: 'positive' }}
        >
          <div className={cn('h-[270px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend12} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="convTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="prevTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `${v}%`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v, name) => [`${v}%`, String(name)]}
                />
                <Area type="monotone" dataKey="prevYear" stroke="var(--chart-3)" strokeWidth={1.5} fill="url(#prevTrendGrad)" dot={false} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="rate" stroke="var(--accent)" strokeWidth={2.5} fill="url(#convTrendGrad)" dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Conversion by Source"
          description="Lead-to-customer % by channel"
          height={380}
          trendBadge={{ value: 'Referral leads', type: 'neutral' }}
        >
          <div className={cn('h-[270px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceConversion} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} width={70} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, _name, props) => [`${v}% (${props?.payload?.deals} deals)`, 'Conversion']}
                />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
                  {sourceConversion.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Conversion leaderboard by rep */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Conversion leaderboard by rep</h3>
            <span className="text-[11px] text-muted-foreground">({repLeaderboard.length} reps)</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            View all reps
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Rank</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Rep</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Deals entered</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Deals won</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Conversion</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Δ vs avg</th>
              </tr>
            </thead>
            <tbody>
              {repLeaderboard.map((r, i) => {
                const deltaFromAvg = r.convRate - 60;
                return (
                  <tr
                    key={r.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <RankBadge rank={r.rank} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <AvatarBadge initials={r.initials} color={r.color} size="md" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{r.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{r.role} · {r.territory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{r.entered}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">{r.won}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[120px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${r.convRate}%` : '0%',
                              transitionDelay: `${i * 60}ms`,
                              background: r.convRate >= 65 ? 'var(--success)' : r.convRate >= 55 ? 'var(--accent)' : 'var(--warning)',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums w-10">{r.convRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={cn(
                        'inline-flex items-center text-xs font-medium tabular-nums',
                        deltaFromAvg >= 0 ? 'text-success' : 'text-destructive'
                      )}>
                        {deltaFromAvg >= 0 ? '+' : ''}{deltaFromAvg}pp
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

function stageToStageAvg() {
  const stages = [
    { entered: 892, converted: 556 },
    { entered: 556, converted: 357 },
    { entered: 357, converted: 179 },
    { entered: 179, converted: 87 },
    { entered: 87, converted: 62 },
  ];
  const rates = stages.map((s) => (s.converted / s.entered) * 100);
  return rates.reduce((a, b) => a + b, 0) / rates.length;
}
