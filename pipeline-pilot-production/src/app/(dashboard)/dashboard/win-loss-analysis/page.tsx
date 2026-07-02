'use client';

import * as React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Area, AreaChart,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { winLossData, winLossReasons } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BarChart3, Trophy, XCircle, Target, DollarSign, Download, Swords, ArrowRight } from 'lucide-react';

// Synthesized win/loss trend (12 months)
const winLossTrend = [
  { month: 'Jan', wins: 12, losses: 7 },
  { month: 'Feb', wins: 15, losses: 9 },
  { month: 'Mar', wins: 13, losses: 6 },
  { month: 'Apr', wins: 18, losses: 8 },
  { month: 'May', wins: 17, losses: 10 },
  { month: 'Jun', wins: 21, losses: 11 },
  { month: 'Jul', wins: 19, losses: 9 },
  { month: 'Aug', wins: 24, losses: 12 },
  { month: 'Sep', wins: 22, losses: 10 },
  { month: 'Oct', wins: 25, losses: 13 },
  { month: 'Nov', wins: 28, losses: 11 },
  { month: 'Dec', wins: 31, losses: 14 },
];

// Synthesized competitor win/loss breakdown
const competitorBreakdown = [
  { competitor: 'Salesforce', wins: 28, losses: 18, winRate: 61, avgDeal: 142000, color: 'var(--chart-1)' },
  { competitor: 'HubSpot', wins: 32, losses: 14, winRate: 70, avgDeal: 88000, color: 'var(--chart-3)' },
  { competitor: 'Pipedrive', wins: 24, losses: 9, winRate: 73, avgDeal: 64000, color: 'var(--chart-4)' },
  { competitor: 'Zendesk Sell', wins: 18, losses: 22, winRate: 45, avgDeal: 54000, color: 'var(--chart-5)' },
  { competitor: 'Freshsales', wins: 21, losses: 12, winRate: 64, avgDeal: 48000, color: 'var(--warning)' },
  { competitor: 'No decision', wins: 0, losses: 14, winRate: 0, avgDeal: 0, color: 'var(--muted-foreground)' },
];

export default function WinLossAnalysisPage() {
  const chartLoaded = useChartLoading(300);

  const won = winLossData.find((d) => d.name === 'Won')?.value || 187;
  const lost = winLossData.find((d) => d.name === 'Lost')?.value || 89;
  const inProgress = winLossData.find((d) => d.name === 'In Progress')?.value || 134;
  const total = won + lost;
  const winRate = Math.round((won / total) * 100);
  const lossRate = 100 - winRate;
  const avgWon = 142000;
  const avgLost = 64000;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Win/Loss Analysis"
        description="Understand why deals are won or lost to improve close rates"
        icon={BarChart3}
        actions={
          <Button variant="outline" size="sm" className="bg-card border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Win Rate"
          value={`${winRate}%`}
          delta="+4.2pp"
          deltaType="positive"
          icon={Trophy}
          accentColor="var(--success)"
          subtext={`${won} deals won`}
          sparkline={winLossTrend.map((d) => d.wins)}
          delay={0}
        />
        <KPICard
          title="Loss Rate"
          value={`${lossRate}%`}
          delta="-2.1pp"
          deltaType="positive"
          icon={XCircle}
          accentColor="var(--destructive)"
          subtext={`${lost} deals lost`}
          sparkline={winLossTrend.map((d) => d.losses)}
          delay={1}
        />
        <KPICard
          title="Avg Won Deal Size"
          value={`$${(avgWon / 1000).toFixed(0)}k`}
          delta="+8.4%"
          deltaType="positive"
          icon={DollarSign}
          accentColor="var(--accent)"
          subtext="Across 187 wins"
          sparkline={[118, 124, 128, 132, 136, 138, 140, 142]}
          delay={2}
        />
        <KPICard
          title="Avg Lost Deal Size"
          value={`$${(avgLost / 1000).toFixed(0)}k`}
          delta="-3.6%"
          deltaType="positive"
          icon={Target}
          accentColor="var(--chart-3)"
          subtext="Across 89 losses"
          sparkline={[78, 74, 72, 70, 68, 66, 65, 64]}
          delay={3}
        />
      </div>

      {/* Top row: pie + trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Win/Loss Distribution"
          description="Closed deals split by outcome"
          height={340}
        >
          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {winLossData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => [`${v} deals (${Math.round((Number(v) / (won + lost + inProgress)) * 100)}%)`, String(name)]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground tabular-nums">{won + lost + inProgress}</span>
              <span className="text-[10px] text-muted-foreground">deals</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-success/10 border border-success/20 rounded-md p-2">
              <p className="text-[10px] uppercase tracking-wider text-success font-semibold">Won</p>
              <p className="text-base font-bold text-foreground tabular-nums">{won}</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2">
              <p className="text-[10px] uppercase tracking-wider text-destructive font-semibold">Lost</p>
              <p className="text-base font-bold text-foreground tabular-nums">{lost}</p>
            </div>
            <div className="bg-chart-3/10 border border-chart-3/20 rounded-md p-2">
              <p className="text-[10px] uppercase tracking-wider text-chart-3 font-semibold">Open</p>
              <p className="text-base font-bold text-foreground tabular-nums">{inProgress}</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Win/Loss Trend"
          description="Wins vs losses over 12 months"
          className="lg:col-span-2"
          height={340}
          legend={[
            { label: 'Wins', color: 'var(--success)' },
            { label: 'Losses', color: 'var(--destructive)' },
          ]}
          trendBadge={{ value: 'Streak: 5mo', type: 'positive' }}
        >
          <div className={cn('h-[240px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={winLossTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="winsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lossesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v, name) => [`${v} deals`, String(name)]}
                />
                <Area type="monotone" dataKey="wins" stroke="var(--success)" strokeWidth={2.5} fill="url(#winsGrad)" dot={{ r: 2.5, fill: 'var(--success)', strokeWidth: 0 }} />
                <Area type="monotone" dataKey="losses" stroke="var(--destructive)" strokeWidth={2} fill="url(#lossesGrad)" dot={{ r: 2.5, fill: 'var(--destructive)', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Loss reasons bar chart */}
      <ChartCard
        title="Loss Reasons"
        description="Why deals are lost — top reasons by frequency"
        height={340}
        trendBadge={{ value: 'Price-sensitive', type: 'negative' }}
      >
        <div className={cn('h-[240px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={winLossReasons} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lossBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--destructive)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="reason" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dx={-10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v) => [`${v} deals lost`, 'Count']}
              />
              <Bar dataKey="lost" radius={[6, 6, 0, 0]} barSize={56}>
                {winLossReasons.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          {winLossReasons.map((r) => (
            <div key={r.reason} className="bg-secondary/30 rounded-md p-2.5 border border-border">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="text-[11px] text-muted-foreground truncate">{r.reason}</span>
              </div>
              <p className="text-base font-bold text-foreground tabular-nums">{r.lost}</p>
              <p className="text-[10px] text-muted-foreground">{Math.round((r.lost / 89) * 100)}% of losses</p>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Win/loss by competitor */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Win/Loss by competitor</h3>
            <span className="text-[11px] text-muted-foreground">({competitorBreakdown.length} competitors)</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-accent">
            Detailed analysis <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Competitor</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Wins</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Losses</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Win rate</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Avg deal size</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Threat level</th>
              </tr>
            </thead>
            <tbody>
              {competitorBreakdown.map((c, i) => {
                const totalDeals = c.wins + c.losses;
                const threat = c.winRate === 0 ? 'No decision' : c.winRate >= 70 ? 'Low' : c.winRate >= 55 ? 'Medium' : 'High';
                const threatColor = threat === 'Low' ? 'var(--success)' : threat === 'Medium' ? 'var(--warning)' : threat === 'High' ? 'var(--destructive)' : 'var(--muted-foreground)';
                return (
                  <tr
                    key={c.competitor}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `color-mix(in oklch, ${c.color} 12%, transparent)` }}
                        >
                          <Swords className="w-3.5 h-3.5" style={{ color: c.color }} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{c.competitor}</p>
                          <p className="text-[11px] text-muted-foreground">{totalDeals} competitive deals</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-success font-semibold tabular-nums">{c.wins}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-destructive font-semibold tabular-nums">{c.losses}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${c.winRate}%` : '0%',
                              transitionDelay: `${i * 50}ms`,
                              background: c.winRate >= 65 ? 'var(--success)' : c.winRate >= 50 ? 'var(--warning)' : 'var(--destructive)',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums w-10">{c.winRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground tabular-nums">
                      {c.avgDeal > 0 ? formatK(c.avgDeal) : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${threatColor} 12%, transparent)`,
                          color: threatColor,
                          borderColor: `color-mix(in oklch, ${threatColor} 25%, transparent)`,
                        }}
                      >
                        {threat}
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
