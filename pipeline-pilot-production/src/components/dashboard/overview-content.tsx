'use client';

import * as React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { ChartCard } from '@/components/common/chart-card';
import { KPICard } from '@/components/common/kpi-card';
import { StatusBadge, AvatarBadge } from '@/components/common/status-badge';
import { repAvatarUrl } from '@/lib/avatars';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { revenueTrend, pipelineStages, sourceData, deals, activities } from '@/lib/data';
import { DollarSign, TrendingUp, Target, Users, ArrowUpRight, Activity, Sparkles, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stageLabels: Record<string, string> = {
  'Closed Won': 'Won',
  'Closed Lost': 'Lost',
  Negotiation: 'Negotiation',
  Proposal: 'Proposal',
  Discovery: 'Discovery',
  Qualified: 'Qualified',
  Lead: 'Lead',
};

export function OverviewContent() {
  const chartLoaded = useChartLoading(300);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border border-accent/20 p-6">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Welcome back, Jordan</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">You're tracking 16 open deals worth $1.7M this quarter</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pipeline is up <span className="text-success font-medium">+18%</span> vs last quarter. 3 deals need attention.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-card/50 border-border">View forecast</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Zap className="w-3.5 h-3.5 mr-1.5" /> Run AI analysis
            </Button>
          </div>
        </div>
        {/* Decorative chart line */}
        <svg className="absolute right-0 bottom-0 w-1/2 h-24 opacity-30" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path d="M0,40 Q40,30 80,32 T160,15 L200,5" stroke="var(--accent)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* KPI cards with sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="$2.4M"
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          subtext="Q2 2025 · vs Q1"
          sparkline={[186, 205, 237, 273, 309, 314, 352, 389, 421, 458, 492, 547]}
          accentColor="var(--accent)"
          delay={0}
        />
        <KPICard
          title="Pipeline Value"
          value="$4.8M"
          delta="+18.2%"
          deltaType="positive"
          icon={TrendingUp}
          subtext="147 open deals"
          sparkline={[380, 420, 460, 510, 540, 580, 620, 660, 700, 740, 780, 820]}
          accentColor="var(--chart-1)"
          delay={1}
        />
        <KPICard
          title="Win Rate"
          value="62.4%"
          delta="+3.2%"
          deltaType="positive"
          icon={Target}
          subtext="Last 90 days"
          sparkline={[58, 60, 57, 61, 60, 62, 63, 61, 62, 63, 62, 62]}
          accentColor="var(--chart-3)"
          delay={2}
        />
        <KPICard
          title="New Leads"
          value="892"
          delta="+18.3%"
          deltaType="positive"
          icon={Users}
          subtext="This month"
          sparkline={[620, 680, 710, 690, 740, 780, 820, 850, 830, 870, 880, 892]}
          accentColor="var(--chart-5)"
          delay={3}
        />
      </div>

      {/* Charts row — revenue + pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue Trend"
          description="Monthly performance vs target"
          className="lg:col-span-2"
          height={380}
          legend={[
            { label: 'Revenue', color: 'var(--chart-1)' },
            { label: 'Target', color: 'var(--accent)' },
          ]}
          trendBadge={{ value: '+12.5%', type: 'positive' }}
        >
          <div className={`h-[280px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, '']}
                />
                <Area type="monotone" dataKey="target" stroke="var(--accent)" strokeWidth={2} fill="url(#tgtGrad)" dot={false} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Pipeline Stages"
          description="Distribution by stage"
          height={380}
          trendBadge={{ value: '147 deals', type: 'neutral' }}
        >
          <div className="space-y-4 pt-2">
            {pipelineStages.map((stage, i) => (
              <div key={stage.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{stage.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{stage.count}</span>
                    <span className="text-sm font-semibold text-foreground tabular-nums">{stage.value}%</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: chartLoaded ? `${stage.value}%` : '0%',
                      transitionDelay: `${i * 120}ms`,
                      background: stage.color,
                    }}
                  />
                </div>
                <div className="text-xs text-muted-foreground tabular-nums">${(stage.value$ / 1000).toFixed(0)}k in stage</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Pipeline</span>
            <span className="text-xl font-bold text-foreground">$4.8M</span>
          </div>
        </ChartCard>
      </div>

      {/* Bottom row — recent deals, top performers, activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Deals */}
        <ChartCard title="Recent Deals" description="Latest pipeline activity" height="auto">
          <div className="space-y-1 -mx-2">
            {deals.slice(0, 6).map((deal, i) => (
              <Link
                key={deal.id}
                href={`/dashboard/deals/${deal.id}`}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <AvatarBadge initials={deal.ownerInitials} size="md" color="var(--accent)" src={deal.ownerId ? repAvatarUrl(deal.ownerId, 64) : undefined} alt={deal.owner} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{deal.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{deal.account} · {deal.owner}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground tabular-nums">${(deal.value / 1000).toFixed(0)}k</p>
                  <StatusBadge
                    status={deal.stage === 'Negotiation' ? 'pending' : deal.stage === 'Closed Won' ? 'won' : 'info'}
                    label={stageLabels[deal.stage] || deal.stage}
                  />
                </div>
              </Link>
            ))}
          </div>
          <Link href="/dashboard/deals" className="mt-3 flex items-center justify-center gap-1 text-xs text-accent hover:text-accent/80 font-medium transition-colors">
            View all deals <ArrowUpRight className="w-3 h-3" />
          </Link>
        </ChartCard>

        {/* Top Performers */}
        <ChartCard title="Top Performers" description="This month's leaders" height="auto">
          <div className="space-y-1 -mx-2">
            {[...deals].slice(0, 5).map((_, i) => {
              const reps = [
                { name: 'Sarah Chen', revenue: 487500, deals: 24, change: 15, initials: 'SC', color: 'var(--accent)', id: 'r1' },
                { name: 'Mike Johnson', revenue: 356200, deals: 19, change: 8, initials: 'MJ', color: 'var(--chart-1)', id: 'r2' },
                { name: 'Emily Davis', revenue: 312800, deals: 17, change: 12, initials: 'ED', color: 'var(--chart-3)', id: 'r3' },
                { name: 'James Wilson', revenue: 289400, deals: 15, change: -5, initials: 'JW', color: 'var(--chart-5)', id: 'r4' },
                { name: 'Lisa Park', revenue: 267100, deals: 14, change: 9, initials: 'LP', color: 'var(--chart-4)', id: 'r5' },
              ][i];
              return (
                <div key={reps.name} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="relative shrink-0">
                    <AvatarBadge initials={reps.initials} size="md" color={reps.color} src={repAvatarUrl(reps.id, 64)} alt={reps.name} />
                    {i < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning text-[10px] font-bold flex items-center justify-center text-background">
                        {i + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{reps.name}</p>
                    <p className="text-xs text-muted-foreground">{reps.deals} deals closed</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-foreground tabular-nums">${(reps.revenue / 1000).toFixed(0)}k</p>
                    <p className={`text-xs ${reps.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {reps.change >= 0 ? '+' : ''}{reps.change}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Activity feed */}
        <ChartCard title="Activity Feed" description="Real-time updates" height="auto">
          <div className="space-y-3">
            {activities.slice(0, 5).map((act) => {
              const iconMap = {
                call: '📞', meeting: '📅', email: '✉️', task: '✓', note: '📝', deal_update: '🔄',
              };
              return (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0 text-xs">
                    {iconMap[act.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground leading-tight">{act.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{act.description}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{act.owner} · {act.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* AI Insights row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-accent/20 rounded-xl p-5 bg-gradient-to-br from-accent/5 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">AI Insight</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">Acme renewal at risk</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">Champion engagement dropped 32% in last 14 days. Recommend executive intervention.</p>
        </div>
        <div className="bg-card border border-warning/20 rounded-xl p-5 bg-gradient-to-br from-warning/5 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-xs font-semibold uppercase tracking-wider text-warning">At Risk</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">3 deals stalled in Negotiation</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">Average age 14+ days. Consider re-engagement or revised pricing.</p>
        </div>
        <div className="bg-card border border-success/20 rounded-xl p-5 bg-gradient-to-br from-success/5 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-success" />
            <span className="text-xs font-semibold uppercase tracking-wider text-success">Opportunity</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">$580k expansion potential</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">3 enterprise accounts show expansion signals based on usage patterns.</p>
        </div>
      </div>
    </div>
  );
}
