'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge } from '@/components/common/status-badge';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK,
} from '@/components/charts/chart-helpers';
import { territories } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Map, Building2, DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight,
  ChevronRight, Layers, Award, Crown,
} from 'lucide-react';

// ----- derived data -----
// Revenue by territory broken down by segment
const SEGMENT_BREAKDOWN = territories.map((t) => ({
  name: t.name,
  Enterprise: Math.round(t.revenue * 0.55),
  Growth: Math.round(t.revenue * 0.30),
  Starter: Math.round(t.revenue * 0.15),
  total: t.revenue,
}));

function attainmentColor(att: number): string {
  if (att >= 100) return 'var(--success)';
  if (att >= 85) return 'var(--accent)';
  if (att >= 70) return 'var(--warning)';
  return 'var(--destructive)';
}

function attainmentRing(attainment: number, size = 56, stroke = 5) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, attainment) / 100) * c;
  return { r, c, offset, size, stroke };
}

export default function TerritoriesPage() {
  const chartLoaded = useChartLoading(300);

  // Aggregate stats
  const totalTerritories = territories.length;
  const totalAccounts = territories.reduce((s, t) => s + t.accounts, 0);
  const totalPipeline = territories.reduce((s, t) => s + t.pipelineValue, 0);
  const totalRevenue = territories.reduce((s, t) => s + t.revenue, 0);
  const topTerritory = [...territories].sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Territories"
        description="Geographic performance breakdown across all sales territories"
        icon={Map}
        actions={
          <Button variant="outline" size="sm" className="bg-card border-border">
            <Layers className="w-3.5 h-3.5 mr-1.5" /> Manage territories
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Territories"
          value={totalTerritories.toString()}
          delta="across 4 regions"
          deltaType="neutral"
          icon={Map}
          subtext="active assignments"
          accentColor="var(--accent)"
          delay={0}
        />
        <KPICard
          title="Total Accounts"
          value={totalAccounts.toString()}
          delta="+24"
          deltaType="positive"
          icon={Building2}
          subtext="under management"
          accentColor="var(--chart-1)"
          sparkline={[140, 152, 158, 168, 175, 185]}
          delay={1}
        />
        <KPICard
          title="Total Pipeline"
          value={formatCurrency(totalPipeline, { compact: true })}
          delta="+18%"
          deltaType="positive"
          icon={TrendingUp}
          subtext="open opportunities"
          accentColor="var(--chart-3)"
          sparkline={[2.8, 3.1, 3.3, 3.5, 3.9, 4.2]}
          delay={2}
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue, { compact: true })}
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          subtext="H1 2025 closed"
          accentColor="var(--chart-5)"
          sparkline={[1.8, 2.1, 2.4, 2.6, 2.7, 2.8]}
          delay={3}
        />
      </div>

      {/* Territories grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">Territory Cards</h3>
            <p className="text-sm text-muted-foreground">{territories.length} territories — click to drill in</p>
          </div>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View all <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...territories]
            .sort((a, b) => b.revenue - a.revenue)
            .map((t, i) => {
              const ring = attainmentRing(t.attainment);
              const isTop = t.id === topTerritory.id;
              return (
                <Link
                  key={t.id}
                  href={`/dashboard/territories/${t.id}`}
                  className="group block bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  {isTop && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/15 border border-warning/30 text-warning text-[10px] font-semibold uppercase tracking-wider">
                      <Crown className="w-2.5 h-2.5" /> Top
                    </div>
                  )}
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <AvatarBadge initials={t.ownerInitials} size="lg" color="var(--accent)" />
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-foreground truncate group-hover:text-accent transition-colors">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{t.region} region</p>
                      <p className="text-[11px] text-muted-foreground truncate">Owner: {t.owner}</p>
                    </div>
                  </div>

                  {/* Body: ring + metrics */}
                  <div className="flex items-center gap-4 mb-4">
                    {/* Attainment ring */}
                    <div className="relative shrink-0" style={{ width: ring.size, height: ring.size }}>
                      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${ring.size} ${ring.size}`}>
                        <circle cx={ring.size / 2} cy={ring.size / 2} r={ring.r} fill="none" stroke="var(--secondary)" strokeWidth={ring.stroke} />
                        <circle
                          cx={ring.size / 2}
                          cy={ring.size / 2}
                          r={ring.r}
                          fill="none"
                          stroke={attainmentColor(t.attainment)}
                          strokeWidth={ring.stroke}
                          strokeDasharray={ring.c}
                          strokeDashoffset={ring.offset}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-foreground tabular-nums">{t.attainment}%</span>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 flex-1">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Accounts</p>
                        <p className="text-sm font-bold text-foreground tabular-nums">{t.accounts}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Open Deals</p>
                        <p className="text-sm font-bold text-foreground tabular-nums">{t.openDeals}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Pipeline</p>
                        <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(t.pipelineValue, { compact: true })}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Revenue</p>
                        <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(t.revenue, { compact: true })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Growth bar */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">YoY Growth</span>
                      <span className={cn(
                        'inline-flex items-center gap-0.5 text-[11px] font-semibold',
                        t.growth >= 0 ? 'text-success' : 'text-destructive'
                      )}>
                        {t.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(t.growth)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: chartLoaded ? `${Math.min(100, Math.abs(t.growth) * 4)}%` : '0%',
                          transitionDelay: `${i * 60 + 200}ms`,
                          background: t.growth >= 0
                            ? 'linear-gradient(90deg, var(--accent), var(--success))'
                            : 'linear-gradient(90deg, var(--warning), var(--destructive))',
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Territory comparison stacked bar */}
      <ChartCard
        title="Territory Revenue Comparison"
        description="Revenue per territory broken down by segment"
        height={420}
        legend={[
          { label: 'Enterprise', color: 'var(--accent)' },
          { label: 'Growth', color: 'var(--chart-3)' },
          { label: 'Starter', color: 'var(--chart-5)' },
        ]}
        trendBadge={{ value: '+12.5% team', type: 'positive' }}
      >
        <div className={cn('h-[320px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SEGMENT_BREAKDOWN} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barCategoryGap="22%">
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} dx={-10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                formatter={(v, name) => [formatK(Number(v)), String(name)]}
                cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
              />
              <Bar dataKey="Enterprise" stackId="a" fill="var(--accent)" maxBarSize={56} />
              <Bar dataKey="Growth" stackId="a" fill="var(--chart-3)" maxBarSize={56} />
              <Bar dataKey="Starter" stackId="a" fill="var(--chart-5)" radius={[6, 6, 0, 0]} maxBarSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Footer summary table */}
        <div className="mt-4 pt-4 border-t border-border overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Territory</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Enterprise</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Growth</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Starter</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {SEGMENT_BREAKDOWN.map((row, i) => (
                <tr
                  key={row.name}
                  className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <td className="py-2 px-2 font-medium text-foreground">{row.name}</td>
                  <td className="py-2 px-2 text-right tabular-nums text-foreground">{formatCurrency(row.Enterprise, { compact: true })}</td>
                  <td className="py-2 px-2 text-right tabular-nums text-muted-foreground">{formatCurrency(row.Growth, { compact: true })}</td>
                  <td className="py-2 px-2 text-right tabular-nums text-muted-foreground">{formatCurrency(row.Starter, { compact: true })}</td>
                  <td className="py-2 px-2 text-right tabular-nums font-bold text-foreground">{formatCurrency(row.total, { compact: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
