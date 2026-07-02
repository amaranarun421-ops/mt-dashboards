'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { commissionEstimates } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign, Trophy, Zap, Download, TrendingUp } from 'lucide-react';

const PERIODS = ['This Month', 'This Quarter', 'This Year'];

// Donut breakdown data
const breakdown = [
  { name: 'Base commission', value: commissionEstimates.reduce((s, c) => s + c.baseCommission, 0), color: 'var(--chart-1)' },
  { name: 'Accelerator', value: commissionEstimates.reduce((s, c) => s + c.accelerator, 0), color: 'var(--accent)' },
  { name: 'Bonus (est.)', value: 48000, color: 'var(--chart-3)' },
];

export default function CommissionsPage() {
  const chartLoaded = useChartLoading(300);
  const [period, setPeriod] = React.useState('This Quarter');

  const totalCommission = commissionEstimates.reduce((s, c) => s + c.total, 0);
  const avgPerRep = Math.round(totalCommission / commissionEstimates.length);
  const topEarner = [...commissionEstimates].sort((a, b) => b.total - a.total)[0];
  const acceleratorPayouts = commissionEstimates.reduce((s, c) => s + c.accelerator, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commissions"
        description="Track commission estimates, accelerators, and team earnings"
        icon={Coins}
        actions={
          <>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
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
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Commission"
          value={formatCurrency(totalCommission, { compact: true })}
          delta="+14.2%"
          deltaType="positive"
          icon={Coins}
          accentColor="var(--accent)"
          subtext={`Across ${commissionEstimates.length} reps`}
          sparkline={[68, 72, 75, 78, 82, 86, 90, 96]}
          delay={0}
        />
        <KPICard
          title="Avg per Rep"
          value={formatCurrency(avgPerRep, { compact: true })}
          delta="+8.6%"
          deltaType="positive"
          icon={DollarSign}
          accentColor="var(--chart-1)"
          subtext="Including accelerators"
          sparkline={[18, 19, 21, 22, 23, 25, 26, 28]}
          delay={1}
        />
        <KPICard
          title="Top Earner"
          value={formatCurrency(topEarner.total, { compact: true })}
          delta={`${topEarner.rep.split(' ')[0]}`}
          deltaType="neutral"
          icon={Trophy}
          accentColor="var(--warning)"
          subtext={`${topEarner.attainment}% attainment`}
          sparkline={[42, 46, 50, 54, 58, 62, 68, 75]}
          delay={2}
        />
        <KPICard
          title="Accelerator Payouts"
          value={formatCurrency(acceleratorPayouts, { compact: true })}
          delta="+22.4%"
          deltaType="positive"
          icon={Zap}
          accentColor="var(--chart-3)"
          subtext="Reps above quota"
          sparkline={[8, 12, 16, 22, 28, 32, 38, 45]}
          delay={3}
        />
      </div>

      {/* Main: bar + donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Commission by Rep"
          description="Total commission earned (base + accelerator)"
          className="lg:col-span-2"
          height={400}
          legend={[
            { label: 'Base commission', color: 'var(--chart-1)' },
            { label: 'Accelerator', color: 'var(--accent)' },
          ]}
          trendBadge={{ value: '+14% vs Q1', type: 'positive' }}
        >
          <div className={cn('h-[290px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commissionEstimates} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="rep" axisLine={false} tickLine={false} tick={{ ...AXIS_TICK_STYLE, fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => [formatK(Number(v)), String(name)]}
                />
                <Bar dataKey="baseCommission" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} barSize={36} />
                <Bar dataKey="accelerator" stackId="a" fill="var(--accent)" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Commission Breakdown"
          description="By component"
          height={400}
        >
          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {breakdown.map((entry) => (
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
              <span className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(totalCommission + 48000, { compact: true })}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {breakdown.map((b) => (
              <div key={b.name} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/40 transition-colors">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: b.color }} />
                <span className="text-xs text-muted-foreground flex-1">{b.name}</span>
                <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(b.value, { compact: true })}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums w-9 text-right">
                  {Math.round((b.value / (totalCommission + 48000)) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Commission table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Commission detail by rep</h3>
            <span className="text-[11px] text-muted-foreground">({commissionEstimates.length} reps)</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Rep</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Quota</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Revenue</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Attainment</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Base commission</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Accelerator</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...commissionEstimates].sort((a, b) => b.total - a.total).map((c, i) => {
                const attainmentColor = c.attainment >= 100 ? 'var(--success)' : c.attainment >= 80 ? 'var(--accent)' : 'var(--warning)';
                return (
                  <tr
                    key={c.rep}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors group animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <AvatarBadge initials={c.initials} color="var(--accent)" size="md" />
                        <div>
                          <p className="font-medium text-foreground">{c.rep}</p>
                          <p className="text-[11px] text-muted-foreground">{Math.round(c.revenue / 18000)} deals closed</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(c.quota, { compact: true })}</td>
                    <td className="py-3 px-4 text-right font-medium text-foreground tabular-nums">{formatCurrency(c.revenue, { compact: true })}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[90px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${Math.min(c.attainment, 100)}%` : '0%',
                              transitionDelay: `${i * 40}ms`,
                              background: attainmentColor,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold tabular-nums w-9" style={{ color: attainmentColor }}>
                          {c.attainment}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(c.baseCommission, { compact: true })}</td>
                    <td className="py-3 px-4 text-right tabular-nums">
                      {c.accelerator > 0 ? (
                        <span className="inline-flex items-center gap-1 text-accent font-semibold">
                          <Zap className="w-3 h-3" />
                          {formatCurrency(c.accelerator, { compact: true })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-foreground tabular-nums">{formatCurrency(c.total, { compact: true })}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-secondary/40">
                <td className="py-3 px-4 font-semibold text-foreground">Total</td>
                <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">
                  {formatCurrency(commissionEstimates.reduce((s, c) => s + c.quota, 0), { compact: true })}
                </td>
                <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">
                  {formatCurrency(commissionEstimates.reduce((s, c) => s + c.revenue, 0), { compact: true })}
                </td>
                <td className="py-3 px-4" />
                <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">
                  {formatCurrency(commissionEstimates.reduce((s, c) => s + c.baseCommission, 0), { compact: true })}
                </td>
                <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">
                  {formatCurrency(acceleratorPayouts, { compact: true })}
                </td>
                <td className="py-3 px-4 text-right font-bold text-foreground tabular-nums">
                  {formatCurrency(totalCommission, { compact: true })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Footer accelerator insight */}
      <div className="bg-gradient-to-r from-accent/10 via-transparent to-chart-1/10 border border-accent/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Accelerator insight</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {commissionEstimates.filter((c) => c.accelerator > 0).length} reps are currently above quota and earning accelerator commission at 1.5× the base rate.
              Total accelerator payouts this period are {formatCurrency(acceleratorPayouts, { compact: true })} — a 22% increase over last period.
            </p>
          </div>
          <Button variant="outline" size="sm" className="bg-card border-border shrink-0">
            View plan
          </Button>
        </div>
      </div>
    </div>
  );
}
