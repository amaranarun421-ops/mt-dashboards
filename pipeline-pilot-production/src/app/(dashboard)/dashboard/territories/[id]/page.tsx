'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, StageBadge, StatusBadge } from '@/components/common/status-badge';
import { DataTable, type Column } from '@/components/tables/data-table';
import { ErrorState } from '@/components/common/states';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK,
} from '@/components/charts/chart-helpers';
import { territories, accounts, reps, deals, type Account } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Map, Building2, DollarSign, TrendingUp, Target, Users,
  Phone, Mail, Sparkles, ChevronRight, ArrowUpRight, ArrowDownRight,
  Lightbulb, AlertTriangle, CheckCircle2, Activity,
} from 'lucide-react';

// ----- helpers -----
const TIER_COLOR: Record<Account['tier'], string> = {
  Enterprise: 'var(--accent)',
  Growth: 'var(--chart-1)',
  Starter: 'var(--chart-3)',
};

function buildRevenueTrend(rev: number, seedNum: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const base = rev / 6;
  return months.map((m, i) => {
    const variance = 0.7 + 0.4 * Math.abs(Math.sin(seedNum + i * 0.7));
    return {
      month: m,
      revenue: i <= 5 ? Math.round(base * variance) : null,
      target: Math.round(base * 0.95),
    };
  });
}

export default function TerritoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const chartLoaded = useChartLoading(300);

  const territory = territories.find((t) => t.id === (params?.id as string));

  if (!territory) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/territories')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to territories
        </button>
        <ErrorState
          title="Territory not found"
          description={`We couldn't find a territory with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/territories')}
        />
      </div>
    );
  }

  // Synthesize data
  const seedNum = parseInt(territory.id.replace(/\D/g, ''), 10) || 1;
  const revenueTrend = buildRevenueTrend(territory.revenue, seedNum);

  // Find reps in this territory
  const territoryReps = reps.filter((r) => r.territory === territory.name);

  // Find accounts in this territory — use accounts whose owner is in territoryReps, or simulate by territory
  const territoryAccountIds = new Set<string>();
  territoryReps.forEach((r) => {
    deals.filter((d) => d.ownerId === r.id).forEach((d) => territoryAccountIds.add(d.accountId));
  });
  let territoryAccounts = accounts.filter((a) => territoryAccountIds.has(a.id));
  // If empty (e.g. territory has no direct deals), simulate by slicing
  if (territoryAccounts.length === 0) {
    const startIdx = (seedNum - 1) * 2 % accounts.length;
    territoryAccounts = accounts.slice(startIdx, startIdx + Math.min(6, accounts.length));
  }

  // Tier composition
  const tierComposition = (['Enterprise', 'Growth', 'Starter'] as Account['tier'][]).map((tier) => ({
    name: tier,
    value: territoryAccounts.filter((a) => a.tier === tier).length,
    color: TIER_COLOR[tier],
  })).filter((t) => t.value > 0);

  const totalAccountsCount = territoryAccounts.length;
  const avgDealSize = territory.openDeals > 0 ? Math.round(territory.pipelineValue / territory.openDeals) : 0;

  // Insights
  const insights = [
    {
      icon: TrendingUp,
      color: 'var(--accent)',
      title: 'Strong Momentum',
      description: `${territory.name} is growing ${territory.growth >= 0 ? '+' : ''}${territory.growth}% YoY — ${territory.growth >= 15 ? 'outpacing' : 'in line with'} the team average.`,
    },
    {
      icon: territory.attainment >= 90 ? CheckCircle2 : AlertTriangle,
      color: territory.attainment >= 90 ? 'var(--success)' : 'var(--warning)',
      title: territory.attainment >= 90 ? 'Quota On Track' : 'Quota At Risk',
      description: `${territory.attainment}% attainment of ${formatCurrency(territory.quota, { compact: true })} quota — ${territory.attainment >= 100 ? 'overachieved' : territory.attainment >= 85 ? 'on pace to hit' : 'needs acceleration'}.`,
    },
    {
      icon: Building2,
      color: 'var(--chart-1)',
      title: 'Account Concentration',
      description: `${totalAccountsCount} accounts across ${territoryReps.length} reps — avg ${Math.round(totalAccountsCount / Math.max(1, territoryReps.length))} accounts per rep.`,
    },
    {
      icon: Lightbulb,
      color: 'var(--chart-3)',
      title: 'Expansion Opportunity',
      description: `${territory.openDeals} open deals worth ${formatCurrency(territory.pipelineValue, { compact: true })} in pipeline — focus on Negotiation-stage acceleration.`,
    },
  ];

  // Account table columns
  const columns: Column<Account>[] = [
    {
      key: 'name',
      header: 'Account',
      sortable: true,
      sortAccessor: (a) => a.name,
      cell: (a) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: a.logoColor }}>
            {a.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{a.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{a.industry}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      cell: (a) => <StageBadge stage={a.tier} color={TIER_COLOR[a.tier]} />,
    },
    {
      key: 'location',
      header: 'Location',
      cell: (a) => <span className="text-xs text-muted-foreground">{a.location}</span>,
    },
    {
      key: 'arr',
      header: 'ARR',
      sortable: true,
      align: 'right',
      sortAccessor: (a) => a.arr,
      cell: (a) => <span className="tabular-nums font-semibold text-foreground">{formatCurrency(a.arr, { compact: true })}</span>,
    },
    {
      key: 'healthScore',
      header: 'Health',
      align: 'center',
      cell: (a) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${a.healthScore}%`,
                background: a.healthScore >= 85 ? 'var(--success)' : a.healthScore >= 70 ? 'var(--warning)' : 'var(--destructive)',
              }}
            />
          </div>
          <span className="text-xs tabular-nums text-muted-foreground w-6">{a.healthScore}</span>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      cell: (a) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={a.ownerInitials} size="sm" color={a.logoColor} />
          <span className="text-xs text-muted-foreground hidden sm:inline">{a.owner}</span>
        </div>
      ),
    },
    {
      key: 'renewalDate',
      header: 'Renewal',
      cell: (a) => {
        const date = new Date(a.renewalDate);
        const today = new Date('2025-07-02');
        const days = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <div className="flex flex-col items-end">
            <span className="text-xs text-foreground tabular-nums">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className={cn(
              'text-[10px]',
              days < 60 ? 'text-warning' : days < 30 ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {days > 0 ? `${days} days` : 'overdue'}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Territory Details"
        description="Drill into a single territory's accounts, reps, and performance metrics"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/territories">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to territories
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border border-border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklch, var(--accent) 8%, var(--card)) 0%, var(--card) 65%)`,
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left: identity */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Map className="w-8 h-8 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <StageBadge stage={territory.region} color="var(--accent)" />
                <StatusBadge
                  status={territory.attainment >= 100 ? 'success' : territory.attainment >= 85 ? 'info' : 'warning'}
                  label={territory.attainment >= 100 ? 'Above Quota' : territory.attainment >= 85 ? 'On Track' : 'At Risk'}
                />
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Activity className="w-3 h-3" /> {territory.repCount} reps · {territory.openDeals} open deals
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{territory.name} Territory</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {territory.accounts} accounts
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> {formatCurrency(territory.revenue, { compact: true })} revenue
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> Owner: {territory.owner}
                </span>
              </div>
            </div>
          </div>
          {/* Right: quick stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-card/60 backdrop-blur border border-border rounded-lg px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Attainment</p>
              <p className="text-base font-bold text-foreground tabular-nums">{territory.attainment}%</p>
            </div>
            <div className="bg-card/60 backdrop-blur border border-border rounded-lg px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Growth</p>
              <p className={cn('text-base font-bold tabular-nums', territory.growth >= 0 ? 'text-success' : 'text-destructive')}>
                {territory.growth >= 0 ? '+' : ''}{territory.growth}%
              </p>
            </div>
          </div>
        </div>

        {/* Decorative orb */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none bg-accent" />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Revenue"
          value={formatCurrency(territory.revenue, { compact: true })}
          delta={`+${territory.growth}%`}
          deltaType={territory.growth >= 0 ? 'positive' : 'negative'}
          icon={DollarSign}
          subtext="H1 2025 closed-won"
          accentColor="var(--accent)"
          sparkline={revenueTrend.slice(0, 6).map((p) => p.revenue ?? 0)}
          delay={0}
        />
        <KPICard
          title="Pipeline Value"
          value={formatCurrency(territory.pipelineValue, { compact: true })}
          delta={`${territory.openDeals} deals`}
          deltaType="neutral"
          icon={TrendingUp}
          subtext="open opportunities"
          accentColor="var(--chart-1)"
          delay={1}
        />
        <KPICard
          title="Quota Attainment"
          value={`${territory.attainment}%`}
          delta={territory.attainment >= 100 ? 'Above quota' : `${formatCurrency(territory.quota - territory.revenue, { compact: true })} gap`}
          deltaType={territory.attainment >= 100 ? 'positive' : 'neutral'}
          icon={Target}
          subtext={`of ${formatCurrency(territory.quota, { compact: true })}`}
          accentColor={territory.attainment >= 100 ? 'var(--success)' : 'var(--warning)'}
          delay={2}
        />
        <KPICard
          title="Avg Deal Size"
          value={formatCurrency(avgDealSize, { compact: true })}
          delta="+8%"
          deltaType="positive"
          icon={Building2}
          subtext="across open deals"
          accentColor="var(--chart-3)"
          delay={3}
        />
      </div>

      {/* Mid: revenue trend + tier pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue Trend"
          description="Monthly revenue vs target — 12-month view"
          className="lg:col-span-2"
          height={340}
          legend={[
            { label: 'Revenue', color: 'var(--accent)' },
            { label: 'Target', color: 'var(--chart-1)' },
          ]}
          trendBadge={{ value: `+${territory.growth}%`, type: territory.growth >= 0 ? 'positive' : 'negative' }}
        >
          <div className={cn('h-[260px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="terrRevGrad" x1="0" y1="0" x2="0" y2="1">
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
                <ReferenceLine y={territory.quota / 6} stroke="var(--chart-1)" strokeDasharray="4 4" strokeWidth={1.5} />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2.5} fill="url(#terrRevGrad)" dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }} activeDot={{ r: 5 }} connectNulls={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Tier composition pie */}
        <ChartCard
          title="Account Composition"
          description="Accounts by tier"
          height={340}
        >
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierComposition}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                >
                  {tierComposition.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, _name, entry) => {
                    const e = entry?.payload as typeof tierComposition[number] | undefined;
                    return [`${v} accounts`, e?.name ?? ''];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground tabular-nums">{totalAccountsCount}</span>
              <span className="text-[11px] text-muted-foreground">accounts</span>
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 space-y-1.5">
            {tierComposition.map((t) => {
              const pct = Math.round((t.value / totalAccountsCount) * 100);
              return (
                <div key={t.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: t.color }} />
                    <span className="text-muted-foreground">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground tabular-nums">{t.value}</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* Bottom: 2 columns + insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Accounts table */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Accounts in Territory"
            description={`${territoryAccounts.length} accounts owned by ${territory.name} reps`}
            height="auto"
            actions={
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                <ChevronRight className="w-3.5 h-3.5" /> View all
              </Button>
            }
          >
            <DataTable
              data={territoryAccounts}
              columns={columns}
              getRowId={(a) => a.id}
              searchable
              searchKeys={['name', 'industry', 'location', 'owner']}
              searchPlaceholder="Search accounts…"
              selectable={false}
              pageSize={6}
              initialSort={{ key: 'arr', dir: 'desc' }}
              exportFilename={`territory-${territory.id}-accounts.csv`}
            />
          </ChartCard>
        </div>

        {/* Right column: reps + insights */}
        <div className="space-y-4">
          {/* Reps in territory */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">Reps in Territory</h3>
                <p className="text-[11px] text-muted-foreground">{territoryReps.length} assigned reps</p>
              </div>
              <Users className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-2.5">
              {territoryReps.length === 0 ? (
                <p className="text-[11px] text-muted-foreground/60 italic text-center py-4">No reps assigned</p>
              ) : (
                territoryReps.map((r, i) => {
                  const att = Math.round((r.revenue / r.quota) * 100);
                  return (
                    <Link
                      key={r.id}
                      href={`/dashboard/team/${r.id}`}
                      className="block group bg-secondary/40 border border-border rounded-lg p-3 hover:bg-secondary/60 hover:border-accent/40 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <AvatarBadge initials={r.initials} size="md" color={r.avatarColor} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">{r.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{r.role}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">#{r.rank}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Rev</p>
                          <p className="text-[11px] font-bold text-foreground tabular-nums">{formatCurrency(r.revenue, { compact: true })}</p>
                        </div>
                        <div className="border-x border-border">
                          <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Deals</p>
                          <p className="text-[11px] font-bold text-foreground tabular-nums">{r.dealsClosed}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Att</p>
                          <p className="text-[11px] font-bold tabular-nums" style={{ color: att >= 100 ? 'var(--success)' : att >= 75 ? 'var(--accent)' : 'var(--warning)' }}>{att}%</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Territory insights card */}
          <div className="bg-gradient-to-br from-accent/8 via-chart-1/4 to-transparent border border-accent/20 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '150ms' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Territory Insights</h3>
                <p className="text-[11px] text-muted-foreground">AI-generated recommendations</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {insights.map((ins, i) => (
                <div
                  key={ins.title}
                  className="bg-card/60 backdrop-blur border border-border rounded-lg p-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${ins.color} 14%, transparent)` }}
                    >
                      <ins.icon className="w-3.5 h-3.5" style={{ color: ins.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-foreground">{ins.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{ins.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
