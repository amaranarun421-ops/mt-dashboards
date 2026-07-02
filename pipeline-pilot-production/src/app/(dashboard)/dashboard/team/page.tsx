'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, ReferenceLine,
} from 'recharts';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, RankBadge } from '@/components/common/status-badge';
import { repAvatarUrl } from '@/lib/avatars';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE,
} from '@/components/charts/chart-helpers';
import { reps, teamPerformanceData, activityVolume } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users, DollarSign, Target, TrendingUp, Phone, Mail, Search, ArrowUpRight,
  ArrowDownRight, Activity, Zap, Award, Flame, Crown, ChevronRight, Sparkles,
} from 'lucide-react';

// ----- derived data -----
// Activity metrics per rep (synthesized from data)
const REP_ACTIVITY = reps.map((r) => {
  const seed = parseInt(r.id.replace(/\D/g, ''), 10) || 1;
  const calls = 30 + (seed * 7) % 60;
  const meetings = 8 + (seed * 3) % 18;
  const emails = 120 + (seed * 11) % 200;
  const dealsOpened = 4 + (seed * 2) % 8;
  return {
    ...r,
    calls,
    meetings,
    emails,
    dealsOpened,
    activities: calls + meetings + emails,
  };
});

// Team radar — average skill profile
const TEAM_RADAR = [
  { skill: 'Discovery', value: 82 },
  { skill: 'Negotiation', value: 75 },
  { skill: 'Closing', value: 78 },
  { skill: 'Pipeline Mgmt', value: 86 },
  { skill: 'Forecasting', value: 71 },
  { skill: 'Account Mgmt', value: 80 },
];

// Sparkline generator (mini chart per rep)
function MiniSparkline({ data, color = 'var(--accent)' }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 20;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-16 h-5" preserveAspectRatio="none">
      <path d={path} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Synthesize per-rep revenue sparkline
function repSparkline(rev: number): number[] {
  const base = rev / 6;
  const seed = Math.floor(rev / 1000) % 10;
  return [0, 1, 2, 3, 4, 5].map((i) => Math.round(base * (0.7 + 0.3 * Math.sin(seed + i * 0.7))));
}

export default function TeamPage() {
  const chartLoaded = useChartLoading(300);
  const [query, setQuery] = React.useState('');

  const filteredReps = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return REP_ACTIVITY;
    return REP_ACTIVITY.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.territory.toLowerCase().includes(q)
    );
  }, [query]);

  // Aggregate
  const totalRevenue = reps.reduce((s, r) => s + r.revenue, 0);
  const totalDeals = reps.reduce((s, r) => s + r.dealsClosed, 0);
  const avgWinRate = Math.round(reps.reduce((s, r) => s + r.winRate, 0) / reps.length);
  const avgDealSize = Math.round(totalRevenue / totalDeals);

  // Activity totals
  const totalCalls = REP_ACTIVITY.reduce((s, r) => s + r.calls, 0);
  const totalMeetings = REP_ACTIVITY.reduce((s, r) => s + r.meetings, 0);
  const totalEmails = REP_ACTIVITY.reduce((s, r) => s + r.emails, 0);

  // Chart data
  const perfData = teamPerformanceData.map((t, i) => ({
    ...t,
    attainment: Math.round((t.revenue / t.quota) * 100),
    color: reps[i]?.avatarColor ?? 'var(--accent)',
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Performance"
        description="Track activities, metrics, and outcomes across your sales team"
        icon={Users}
        actions={
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reps…"
              className="pl-8 w-[220px] bg-card border-border h-9"
            />
          </div>
        }
      />

      {/* Header summary stats bar */}
      <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Team Size</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{reps.length} reps</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-chart-1/10 border border-chart-1/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-chart-1" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Revenue</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(totalRevenue, { compact: true })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-chart-3/10 border border-chart-3/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-chart-3" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Deals Closed</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{totalDeals}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Win Rate</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{avgWinRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Team Revenue"
          value={formatCurrency(totalRevenue, { compact: true })}
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          subtext="H1 2025"
          accentColor="var(--accent)"
          sparkline={[280, 320, 360, 410, 460, 520]}
          delay={0}
        />
        <KPICard
          title="Total Deals"
          value={totalDeals.toString()}
          delta="+8"
          deltaType="positive"
          icon={Activity}
          subtext="closed won"
          accentColor="var(--chart-1)"
          sparkline={[12, 15, 13, 18, 17, 21]}
          delay={1}
        />
        <KPICard
          title="Avg Win Rate"
          value={`${avgWinRate}%`}
          delta="+4pp"
          deltaType="positive"
          icon={Target}
          subtext="across team"
          accentColor="var(--chart-3)"
          sparkline={[58, 60, 62, 59, 63, 65]}
          delay={2}
        />
        <KPICard
          title="Avg Deal Size"
          value={formatCurrency(avgDealSize, { compact: true })}
          delta="+6.2%"
          deltaType="positive"
          icon={TrendingUp}
          subtext="per closed deal"
          accentColor="var(--chart-5)"
          sparkline={[22, 24, 23, 25, 26, 28]}
          delay={3}
        />
      </div>

      {/* Mid: perf chart + activity radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue vs Quota"
          description="Per-rep H1 2025 attainment"
          className="lg:col-span-2"
          height={380}
          legend={[
            { label: 'Revenue', color: 'var(--accent)' },
            { label: 'Quota', color: 'var(--chart-1)' },
          ]}
          trendBadge={{ value: '+12.5% team', type: 'positive' }}
        >
          <div className={cn('h-[280px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={2} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v}k`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v, name) => [`$${Number(v)}k`, String(name)]}
                  cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                />
                <ReferenceLine y={0} stroke="transparent" />
                <Bar dataKey="quota" fill="var(--chart-1)" radius={[3, 3, 0, 0]} maxBarSize={20} opacity={0.5} />
                <Bar dataKey="revenue" radius={[3, 3, 0, 0]} maxBarSize={20}>
                  {perfData.map((entry, i) => (
                    <Cell key={i} fill={entry.attainment >= 100 ? 'var(--accent)' : entry.attainment >= 75 ? 'var(--chart-3)' : 'var(--warning)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Activity badge row */}
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-chart-1/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-chart-1" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground tabular-nums">{totalCalls}</p>
                <p className="text-[10px] text-muted-foreground">calls (week)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-chart-3/10 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-chart-3" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground tabular-nums">{totalMeetings}</p>
                <p className="text-[10px] text-muted-foreground">meetings (week)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-chart-5/10 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-chart-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground tabular-nums">{totalEmails.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">emails (week)</p>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Activity radar */}
        <ChartCard
          title="Team Skill Profile"
          description="Average competency across core skills"
          height={380}
          trendBadge={{ value: 'Strong', type: 'positive' }}
        >
          <div className={cn('h-[300px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={TEAM_RADAR} outerRadius="72%">
                <PolarGrid stroke={GRID_STROKE} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }} stroke="transparent" />
                <Radar
                  name="Skill"
                  dataKey="value"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="var(--accent)"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v) => [`${v}%`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Rep cards grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">Sales Representatives</h3>
            <p className="text-sm text-muted-foreground">{filteredReps.length} reps · ranked by revenue</p>
          </div>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
            View leaderboard <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredReps
            .slice()
            .sort((a, b) => b.revenue - a.revenue)
            .map((r, i) => {
              const attainment = Math.round((r.revenue / r.quota) * 100);
              const spark = repSparkline(r.revenue);
              return (
                <Link
                  key={r.id}
                  href={`/dashboard/team/${r.id}`}
                  className="group block bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  {/* Header: rank + avatar + name */}
                  <div className="flex items-start gap-3 mb-4">
                    <RankBadge rank={r.rank} />
                    <AvatarBadge initials={r.initials} size="lg" color={r.avatarColor} src={repAvatarUrl(r.id, 96)} alt={r.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">{r.name}</p>
                        {r.rank <= 3 && <Crown className={cn('w-3.5 h-3.5', r.rank === 1 ? 'text-warning' : r.rank === 2 ? 'text-chart-1' : 'text-chart-3')} />}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{r.role} · {r.territory}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-muted-foreground">Last active</span>
                        <span className="text-[10px] text-foreground font-medium">{r.lastActivity}</span>
                      </div>
                    </div>
                    {/* Quick actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                        title="Send email"
                      >
                        <Mail className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                        title="Call"
                      >
                        <Phone className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Revenue + sparkline */}
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue</p>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(r.revenue, { compact: true })}</p>
                        <span className={cn(
                          'inline-flex items-center text-[10px] font-medium',
                          r.changePct >= 0 ? 'text-success' : 'text-destructive'
                        )}>
                          {r.changePct >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(r.changePct)}%
                        </span>
                      </div>
                    </div>
                    <MiniSparkline data={spark} color={r.avatarColor} />
                  </div>

                  {/* Quota progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Quota Attainment</span>
                      <span className="text-[11px] font-semibold tabular-nums" style={{
                        color: attainment >= 100 ? 'var(--success)' : attainment >= 75 ? 'var(--accent)' : 'var(--warning)',
                      }}>
                        {attainment}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: chartLoaded ? `${Math.min(100, attainment)}%` : '0%',
                          transitionDelay: `${i * 60 + 200}ms`,
                          background: attainment >= 100
                            ? 'linear-gradient(90deg, var(--accent), var(--success))'
                            : attainment >= 75
                            ? 'linear-gradient(90deg, var(--chart-3), var(--accent))'
                            : 'linear-gradient(90deg, var(--warning), var(--chart-3))',
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Deals</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{r.dealsClosed}</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Win Rate</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{r.winRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Calls</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{r.calls}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Footer: AI insights */}
      <div className="bg-gradient-to-br from-accent/8 via-chart-1/4 to-transparent border border-accent/20 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Team Insights</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              AI-generated recommendations based on activity, attainment, and pipeline trends.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-card/60 backdrop-blur border border-border rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-warning" />
                  <span className="text-[11px] font-semibold text-foreground">Hot Rep</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">David Okafor</span> opened 8 new deals this week — highest activity velocity on the team.
                </p>
              </div>
              <div className="bg-card/60 backdrop-blur border border-border rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[11px] font-semibold text-foreground">Top Closer</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Sarah Chen</span> hit 108% quota with 68% win rate — benchmark performance for the team.
                </p>
              </div>
              <div className="bg-card/60 backdrop-blur border border-border rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-chart-3" />
                  <span className="text-[11px] font-semibold text-foreground">Needs Attention</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Marcus Bell</span> at 57% attainment — 3 stalled deals in Negotiation need exec support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
