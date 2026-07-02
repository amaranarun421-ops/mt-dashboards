'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, StageBadge, RankBadge, StatusBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK,
} from '@/components/charts/chart-helpers';
import { reps, deals, activities, leaderboard, STAGES, STAGE_COLORS, type Stage, type Deal } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Phone, Mail, MapPin, DollarSign, Trophy, Target, TrendingUp,
  CheckCircle2, Clock, AlertTriangle, Sparkles, Activity as ActivityIcon,
  Calendar, RefreshCw, ChevronRight, Award, Flame, Zap, Star, Quote,
} from 'lucide-react';

// ----- helpers -----
const ACTIVITY_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  call: { icon: Phone, color: 'var(--chart-1)' },
  meeting: { icon: Calendar, color: 'var(--chart-3)' },
  email: { icon: Mail, color: 'var(--chart-5)' },
  task: { icon: CheckCircle2, color: 'var(--warning)' },
  note: { icon: Quote, color: 'var(--chart-4)' },
  deal_update: { icon: RefreshCw, color: 'var(--accent)' },
};

function buildPerfTrend(rev: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const base = rev / 6;
  const seed = Math.floor(rev / 1000) % 10;
  return months.map((m, i) => {
    const variance = 0.7 + 0.4 * Math.abs(Math.sin(seed + i * 0.8));
    return {
      month: m,
      revenue: i <= 5 ? Math.round(base * variance) : null,
      target: Math.round(base * 0.9),
    };
  });
}

// Synthesize skill breakdown per rep (stable per rep id)
function buildSkills(repId: string) {
  const seed = parseInt(repId.replace(/\D/g, ''), 10) || 1;
  const skills = ['Discovery', 'Negotiation', 'Closing', 'Pipeline Mgmt', 'Forecasting', 'Account Mgmt'];
  return skills.map((s, i) => ({
    skill: s,
    value: Math.max(45, Math.min(98, Math.round(60 + (Math.sin(seed * (i + 1) * 0.7) + 1) * 18))),
  }));
}

function buildGoals(rev: number, quota: number) {
  const attainment = Math.round((rev / quota) * 100);
  return [
    { label: 'Hit 100% quota attainment', current: Math.min(100, attainment), target: 100, unit: '%', done: attainment >= 100, icon: Target },
    { label: 'Close 30 deals this year', current: 24, target: 30, unit: '', done: false, icon: Trophy },
    { label: 'Maintain 65%+ win rate', current: 68, target: 65, unit: '%', done: true, icon: Award },
    { label: 'Generate $600K new pipeline', current: 420, target: 600, unit: 'K', done: false, icon: TrendingUp },
  ];
}

const PIPELINE_STAGES: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation'];

export default function RepDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const chartLoaded = useChartLoading(300);

  const rep = reps.find((r) => r.id === (params?.id as string));

  if (!rep) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/team')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to team
        </button>
        <ErrorState
          title="Rep not found"
          description={`We couldn't find a rep with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/team')}
        />
      </div>
    );
  }

  const attainment = Math.round((rep.revenue / rep.quota) * 100);
  const perfTrend = buildPerfTrend(rep.revenue);
  const skills = buildSkills(rep.id);
  const goals = buildGoals(rep.revenue, rep.quota);

  // Rep's deals grouped by stage for mini kanban
  const repDeals = deals.filter((d) => d.ownerId === rep.id);
  const pipelineByStage = PIPELINE_STAGES.map((stage) => ({
    stage,
    deals: repDeals.filter((d) => d.stage === stage),
    color: STAGE_COLORS[stage],
  }));

  // Activity log filtered by owner
  const repActivities = activities.filter((a) => a.owner === rep.name);
  const displayedActivities = repActivities.length > 0 ? repActivities.slice(0, 6) : activities.slice(0, 5);

  // Leaderboard context — reps above and below
  const sortedBoard = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const repRank = sortedBoard.findIndex((r) => r.id === rep.id);
  const repsAbove = sortedBoard.slice(Math.max(0, repRank - 2), repRank);
  const repsBelow = sortedBoard.slice(repRank + 1, repRank + 3);

  // Circular progress SVG
  const circumference = 2 * Math.PI * 56;
  const attainmentOffset = circumference - (Math.min(100, attainment) / 100) * circumference;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rep Details"
        description="Comprehensive performance profile and pipeline for a single rep"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/team">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to team
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          borderColor: `color-mix(in oklch, ${rep.avatarColor} 30%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklch, ${rep.avatarColor} 10%, var(--card)) 0%, var(--card) 65%)`,
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left: avatar + identity */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ background: rep.avatarColor }}
            >
              {rep.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <RankBadge rank={rep.rank} />
                <StageBadge stage={rep.role} color={rep.avatarColor} />
                <StatusBadge
                  status={attainment >= 100 ? 'success' : attainment >= 75 ? 'info' : 'warning'}
                  label={attainment >= 100 ? 'On Target' : attainment >= 75 ? 'On Track' : 'At Risk'}
                />
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <ActivityIcon className="w-3 h-3" /> Last active {rep.lastActivity}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{rep.name}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {rep.territory}
                </span>
                <a href={`mailto:${rep.email}`} className="flex items-center gap-1 text-accent hover:underline">
                  <Mail className="w-3 h-3" /> {rep.email}
                </a>
                <a href={`tel:${rep.phone}`} className="flex items-center gap-1 text-accent hover:underline">
                  <Phone className="w-3 h-3" /> {rep.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="bg-card/60 border-border">
              <Mail className="w-3.5 h-3.5 mr-1.5" /> Message
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
            </Button>
          </div>
        </div>

        {/* Decorative orb */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: rep.avatarColor }}
        />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Revenue"
          value={formatCurrency(rep.revenue, { compact: true })}
          delta={`+${rep.changePct}%`}
          deltaType={rep.changePct >= 0 ? 'positive' : 'negative'}
          icon={DollarSign}
          subtext="H1 2025 closed-won"
          accentColor="var(--accent)"
          sparkline={perfTrend.slice(0, 6).map((p) => p.revenue ?? 0)}
          delay={0}
        />
        <KPICard
          title="Deals Closed"
          value={rep.dealsClosed.toString()}
          delta={`${rep.dealsOpen} open`}
          deltaType="neutral"
          icon={Trophy}
          subtext="this period"
          accentColor="var(--chart-1)"
          delay={1}
        />
        <KPICard
          title="Win Rate"
          value={`${rep.winRate}%`}
          delta="+4pp"
          deltaType="positive"
          icon={Target}
          subtext="vs team avg 62%"
          accentColor="var(--chart-3)"
          delay={2}
        />
        <KPICard
          title="Quota Attainment"
          value={`${attainment}%`}
          delta={attainment >= 100 ? 'Above quota' : `${formatCurrency(rep.quota - rep.revenue, { compact: true })} to go`}
          deltaType={attainment >= 100 ? 'positive' : 'neutral'}
          icon={TrendingUp}
          subtext={`of ${formatCurrency(rep.quota, { compact: true })} quota`}
          accentColor={attainment >= 100 ? 'var(--success)' : 'var(--warning)'}
          delay={3}
        />
      </div>

      {/* Main grid — 2/3 + 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Performance trend chart */}
          <ChartCard
            title="Performance Trend"
            description="Monthly revenue vs quota — 12-month view"
            height={340}
            legend={[
              { label: 'Revenue', color: 'var(--accent)' },
              { label: 'Quota', color: 'var(--chart-1)' },
            ]}
            trendBadge={{ value: `+${rep.changePct}%`, type: rep.changePct >= 0 ? 'positive' : 'negative' }}
          >
            <div className={cn('h-[260px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={perfTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="repPerfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => v ? `$${v / 1000}k` : ''} dx={-10} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                    formatter={(v, name) => (v == null ? ['—', String(name)] : [formatK(Number(v)), String(name)])}
                  />
                  <ReferenceLine y={rep.quota / 6} stroke="var(--chart-1)" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2.5} fill="url(#repPerfGrad)" dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }} activeDot={{ r: 5 }} connectNulls={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Deal pipeline mini-kanban */}
          <ChartCard
            title="Deal Pipeline"
            description={`${repDeals.length} active deals by stage`}
            height="auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
              {pipelineByStage.map((col, i) => (
                <div
                  key={col.stage}
                  className="bg-secondary/40 border border-border rounded-lg p-2.5 min-h-[140px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col.color }} />
                      <span className="text-[11px] font-semibold text-foreground truncate">{col.stage}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{col.deals.length}</span>
                  </div>
                  <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[180px] custom-scroll">
                    {col.deals.length === 0 ? (
                      <p className="text-[10px] text-muted-foreground/60 italic text-center py-4">No deals</p>
                    ) : (
                      col.deals.map((d) => (
                        <Link
                          key={d.id}
                          href={`/dashboard/deals/${d.id}`}
                          className="block bg-card border border-border rounded-md p-2 hover:border-accent/40 transition-colors cursor-pointer"
                        >
                          <p className="text-[11px] font-medium text-foreground truncate leading-tight">{d.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-muted-foreground truncate">{d.account.split(' ')[0]}</span>
                            <span className="text-[10px] font-semibold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</span>
                          </div>
                          {d.daysInStage > 10 && (
                            <div className="flex items-center gap-0.5 mt-1 text-[9px] text-warning">
                              <Clock className="w-2.5 h-2.5" /> {d.daysInStage}d in stage
                            </div>
                          )}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Activity log */}
          <ChartCard
            title="Activity Log"
            description="Recent calls, meetings, and emails"
            height="auto"
            actions={
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                View all <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            }
          >
            <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scroll pr-1">
              {displayedActivities.map((act, i) => {
                const meta = ACTIVITY_ICON_MAP[act.type] ?? ACTIVITY_ICON_MAP.task;
                const Icon = meta.icon;
                return (
                  <div
                    key={act.id}
                    className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `color-mix(in oklch, ${meta.color} 14%, transparent)` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />
                      </div>
                      {i < displayedActivities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-2 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground leading-tight">{act.title}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{act.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{act.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-muted-foreground bg-secondary border border-border rounded px-1.5 py-0.5">
                          {act.relatedType}: {act.relatedTo}
                        </span>
                        {act.duration && (
                          <span className="text-[10px] text-muted-foreground">{act.duration}min</span>
                        )}
                        {act.outcome && (
                          <span className={cn(
                            'text-[10px] px-1.5 py-0.5 rounded border',
                            act.outcome === 'Successful' || act.outcome === 'Connected'
                              ? 'bg-success/10 text-success border-success/30'
                              : 'bg-secondary text-muted-foreground border-border'
                          )}>
                            {act.outcome}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        {/* Right (1/3) */}
        <div className="space-y-4">
          {/* Quota progress card — circular */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Quota Progress</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary border border-border rounded-md px-2 py-1">
                H1 2025
              </span>
            </div>
            {/* Circular progress */}
            <div className="relative w-[140px] h-[140px] mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="56"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="10"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="56"
                  fill="none"
                  stroke={attainment >= 100 ? 'var(--success)' : attainment >= 75 ? 'var(--accent)' : 'var(--warning)'}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={attainmentOffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground tabular-nums">{attainment}%</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">attained</span>
              </div>
            </div>
            {/* Stats below */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(rep.revenue, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Quota</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(rep.quota, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Gap</p>
                <p className={cn(
                  'text-sm font-bold tabular-nums',
                  rep.revenue >= rep.quota ? 'text-success' : 'text-destructive'
                )}>
                  {rep.revenue >= rep.quota ? '+' : '−'}{formatCurrency(Math.abs(rep.revenue - rep.quota), { compact: true })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pace</p>
                <p className="text-sm font-bold text-foreground tabular-nums">On track</p>
              </div>
            </div>
          </div>

          {/* Leaderboard rank card */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Leaderboard Position</h3>
              <Trophy className="w-4 h-4 text-warning" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <RankBadge rank={rep.rank} />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground tabular-nums">#{rep.rank}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">of {reps.length} reps</p>
              </div>
            </div>
            {/* Reps above */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Above</p>
              {repsAbove.length === 0 ? (
                <p className="text-[11px] text-muted-foreground/60 italic">— Top of the leaderboard —</p>
              ) : (
                repsAbove.map((r) => (
                  <Link
                    key={r.id}
                    href={`/dashboard/team/${r.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <RankBadge rank={r.rank} />
                      <AvatarBadge initials={r.initials} size="sm" color={r.avatarColor} />
                      <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">{r.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(r.revenue, { compact: true })}</span>
                  </Link>
                ))
              )}
              {/* Current rep */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-accent/10 border border-accent/30">
                <div className="flex items-center gap-2">
                  <RankBadge rank={rep.rank} />
                  <AvatarBadge initials={rep.initials} size="sm" color={rep.avatarColor} />
                  <span className="text-xs font-bold text-foreground">{rep.name} (you)</span>
                </div>
                <span className="text-xs font-bold text-accent tabular-nums">{formatCurrency(rep.revenue, { compact: true })}</span>
              </div>
              {/* Reps below */}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 mb-1">Below</p>
              {repsBelow.length === 0 ? (
                <p className="text-[11px] text-muted-foreground/60 italic">— Bottom of the leaderboard —</p>
              ) : (
                repsBelow.map((r) => (
                  <Link
                    key={r.id}
                    href={`/dashboard/team/${r.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <RankBadge rank={r.rank} />
                      <AvatarBadge initials={r.initials} size="sm" color={r.avatarColor} />
                      <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">{r.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(r.revenue, { compact: true })}</span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Skill breakdown */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">Skill Breakdown</h3>
                <p className="text-[11px] text-muted-foreground">Synthesized competency profile</p>
              </div>
              <Star className="w-4 h-4 text-chart-1" />
            </div>
            <div className={cn('h-[200px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skills} outerRadius="70%">
                  <PolarGrid stroke={GRID_STROKE} />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 8 }} stroke="transparent" />
                  <Radar
                    name="Skill"
                    dataKey="value"
                    stroke={rep.avatarColor}
                    strokeWidth={2}
                    fill={rep.avatarColor}
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* Skill bars */}
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {skills.slice(0, 4).map((s) => (
                <div key={s.skill} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-20 shrink-0">{s.skill}</span>
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: chartLoaded ? `${s.value}%` : '0%',
                        background: rep.avatarColor,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-foreground tabular-nums w-7 text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & targets card */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">Goals & Targets</h3>
                <p className="text-[11px] text-muted-foreground">2025 annual objectives</p>
              </div>
              <Target className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-3">
              {goals.map((g, i) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div key={g.label} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                          g.done ? 'bg-success/15' : 'bg-secondary border border-border'
                        )}>
                          {g.done ? (
                            <CheckCircle2 className="w-3 h-3 text-success" />
                          ) : (
                            <g.icon className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <span className={cn('text-[11px] truncate', g.done ? 'text-foreground font-medium line-through opacity-60' : 'text-foreground font-medium')}>{g.label}</span>
                      </div>
                      <span className={cn(
                        'text-[10px] font-semibold tabular-nums shrink-0',
                        g.done ? 'text-success' : pct >= 75 ? 'text-accent' : 'text-muted-foreground'
                      )}>
                        {g.current}{g.unit}/{g.target}{g.unit}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: chartLoaded ? `${pct}%` : '0%',
                          transitionDelay: `${i * 100 + 200}ms`,
                          background: g.done ? 'var(--success)' : pct >= 75 ? 'var(--accent)' : 'var(--warning)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
