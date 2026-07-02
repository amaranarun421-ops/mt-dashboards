'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { KPICard } from '@/components/common/kpi-card';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { accounts, contacts, deals, activities, STAGE_COLORS, type Account } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, MapPin, Globe, Building2, Phone, Mail, Calendar, ChevronRight,
  DollarSign, TrendingUp, Handshake, AlertTriangle, Activity as ActivityIcon,
  RefreshCw, CheckCircle2, Clock, Sparkles, ExternalLink, Pencil, Plus,
} from 'lucide-react';

const TIER_COLOR: Record<Account['tier'], string> = {
  Enterprise: 'var(--accent)',
  Growth: 'var(--chart-1)',
  Starter: 'var(--chart-3)',
};

function healthColor(score: number): string {
  if (score >= 85) return 'var(--success)';
  if (score >= 70) return 'var(--warning)';
  return 'var(--destructive)';
}

// Synthesize 12 months of revenue history from account.revenue
function buildRevenueHistory(account: Account) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const base = account.arr / 12;
  // Pseudo-random but stable per account id
  const seed = parseInt(account.id.replace(/\D/g, ''), 10) || 1;
  return months.map((m, i) => {
    const variance = 0.85 + 0.3 * Math.abs(Math.sin(seed * (i + 1) * 0.7));
    return {
      month: m,
      revenue: Math.round(base * variance),
      target: Math.round(base * 0.95),
    };
  });
}

// Synthesize a health trend timeline
function buildHealthHistory(account: Account) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seed = parseInt(account.id.replace(/\D/g, ''), 10) || 1;
  return months.map((m, i) => {
    const drift = Math.sin(seed + i * 0.9) * 8;
    return {
      month: m,
      health: Math.max(40, Math.min(100, Math.round(account.healthScore + drift))),
    };
  });
}

const ACTIVITY_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  call: { icon: Phone, color: 'var(--chart-1)' },
  meeting: { icon: Calendar, color: 'var(--chart-3)' },
  email: { icon: Mail, color: 'var(--chart-5)' },
  task: { icon: CheckCircle2, color: 'var(--warning)' },
  note: { icon: Pencil, color: 'var(--chart-4)' },
  deal_update: { icon: RefreshCw, color: 'var(--accent)' },
};

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const account = accounts.find((a) => a.id === (params?.id as string));
  const chartLoaded = useChartLoading(300);

  if (!account) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/customers')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to customers
        </button>
        <ErrorState
          title="Customer not found"
          description={`We couldn't find a customer with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/customers')}
        />
      </div>
    );
  }

  const tierColor = TIER_COLOR[account.tier];
  const hColor = healthColor(account.healthScore);
  const revenueHistory = buildRevenueHistory(account);
  const healthHistory = buildHealthHistory(account);

  const accountContacts = contacts.filter((c) => c.accountId === account.id);
  const accountDeals = deals.filter((d) => d.accountId === account.id);
  const accountActivities = activities.filter(
    (a) => a.relatedTo === account.name || a.relatedType === 'account'
  );
  // Fallback: show some activities if none match
  const displayedActivities = accountActivities.length > 0 ? accountActivities : activities.slice(0, 5);

  const renewalDate = new Date(account.renewalDate);
  const today = new Date('2025-07-02');
  const daysToRenewal = Math.max(0, Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const supportRiskLevel = account.churnRisk > 30 ? 'high' : account.churnRisk > 15 ? 'medium' : 'low';
  const supportColor = supportRiskLevel === 'high' ? 'var(--destructive)' : supportRiskLevel === 'medium' ? 'var(--warning)' : 'var(--success)';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Details"
        description="Comprehensive view of a single customer relationship"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/customers">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          borderColor: `color-mix(in oklch, ${tierColor} 30%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklch, ${tierColor} 8%, var(--card)) 0%, var(--card) 60%)`,
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left: identity */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ background: account.logoColor }}
            >
              {account.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <StageBadge stage={account.tier} color={tierColor} />
                <StatusBadge
                  status={account.healthScore >= 85 ? 'success' : account.healthScore >= 70 ? 'warning' : 'destructive'}
                  label={account.healthScore >= 85 ? 'Healthy' : account.healthScore >= 70 ? 'At Risk' : 'Critical'}
                />
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {account.industry}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{account.name}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {account.location}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <a href={`https://${account.website}`} className="text-accent hover:underline flex items-center gap-0.5">
                    {account.website} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Last contact {account.lastContact}
                </span>
              </div>
            </div>
          </div>

          {/* Right: health + actions */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Log activity
              </Button>
            </div>
            <div className="flex items-center gap-3 bg-card/60 backdrop-blur border border-border rounded-lg px-3 py-2">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Owner</p>
                <p className="text-xs font-semibold text-foreground">{account.owner}</p>
              </div>
              <AvatarBadge initials={account.ownerInitials} size="md" color={tierColor} />
            </div>
          </div>
        </div>

        {/* Decorative orb */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: tierColor }}
        />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(account.revenue, { compact: true })}
          delta="+12.5%"
          deltaType="positive"
          icon={DollarSign}
          subtext="lifetime value"
          accentColor="var(--chart-1)"
          delay={0}
        />
        <KPICard
          title="Annual Recurring"
          value={formatCurrency(account.arr, { compact: true })}
          delta="+5.8%"
          deltaType="positive"
          icon={TrendingUp}
          subtext="current ARR"
          accentColor="var(--accent)"
          delay={1}
        />
        <KPICard
          title="Active Deals"
          value={account.activeDeals.toString()}
          delta={`${accountDeals.length} total`}
          deltaType="neutral"
          icon={Handshake}
          subtext="in-flight opportunities"
          accentColor="var(--chart-3)"
          delay={2}
        />
        <KPICard
          title="Churn Risk"
          value={`${account.churnRisk}%`}
          delta={account.churnRisk > 20 ? 'elevated' : 'low'}
          deltaType={account.churnRisk > 20 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          subtext="90-day outlook"
          accentColor={supportColor}
          delay={3}
        />
      </div>

      {/* Middle row — Revenue + Health charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Revenue History"
          description="Last 12 months vs target"
          height={340}
          legend={[
            { label: 'Revenue', color: 'var(--chart-1)' },
            { label: 'Target', color: 'var(--accent)' },
          ]}
          trendBadge={{ value: '+12.5%', type: 'positive' }}
        >
          <div className={`h-[260px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="custRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
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
                <Area type="monotone" dataKey="target" stroke="var(--accent)" strokeWidth={2} fill="none" strokeDasharray="4 4" dot={false} />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#custRevGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Customer Health Timeline"
          description="Health score trend over 12 months"
          height={340}
          legend={[{ label: 'Health Score', color: hColor }]}
          trendBadge={{ value: `${account.healthScore}/100`, type: account.healthScore >= 85 ? 'positive' : 'negative' }}
        >
          <div className={`h-[260px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} domain={[40, 100]} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v: number) => [`${v}`, 'Health']}
                />
                <Line
                  type="monotone"
                  dataKey="health"
                  stroke={hColor}
                  strokeWidth={2.5}
                  dot={{ fill: hColor, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Lower row — 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Contacts at this account */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Contacts</h3>
                <span className="text-[11px] text-muted-foreground">({accountContacts.length})</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                Add contact <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {accountContacts.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">No contacts linked to this account yet.</p>
              ) : (
                accountContacts.map((c, i) => (
                  <Link
                    key={c.id}
                    href={`/dashboard/contacts`}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <AvatarBadge initials={c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()} size="md" color={tierColor} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{c.title} · {c.email}</p>
                    </div>
                    <StatusBadge
                      status={c.status === 'Decision Maker' ? 'high' : c.status === 'Champion' ? 'success' : c.status === 'Influencer' ? 'info' : 'neutral'}
                      label={c.status}
                    />
                    <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">{c.lastContact}</span>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Deals for this account */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Deals</h3>
                <span className="text-[11px] text-muted-foreground">({accountDeals.length})</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                View all <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-2">
              {accountDeals.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">No active deals for this account.</p>
              ) : (
                accountDeals.slice(0, 5).map((d, i) => (
                  <Link
                    key={d.id}
                    href={`/dashboard/deals/${d.id}`}
                    className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:border-accent/30 hover:bg-secondary/50 transition-all animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">{d.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{d.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StageBadge stage={d.stage} color={STAGE_COLORS[d.stage]} />
                        <span className="text-[11px] text-muted-foreground">{d.type}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</p>
                      <p className="text-[10px] text-muted-foreground">{d.owner}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-4">
          {/* Activity timeline */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Activity</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-3">
                {displayedActivities.slice(0, 5).map((act, i) => {
                  const cfg = ACTIVITY_ICON_MAP[act.type] || ACTIVITY_ICON_MAP.note;
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={act.id}
                      className="relative pl-10 animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-card shadow-sm"
                        style={{ background: `color-mix(in oklch, ${cfg.color} 15%, var(--card))` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-medium text-foreground line-clamp-1">{act.title}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{act.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{act.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Renewal status card */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Renewal Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next Renewal</p>
                  <p className="text-sm font-semibold text-foreground">
                    {renewalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Days</p>
                  <p className={cn('text-sm font-bold tabular-nums', daysToRenewal < 60 ? 'text-warning' : 'text-foreground')}>
                    {daysToRenewal}d
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Renewal Value</p>
                  <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(account.arr, { compact: true })}</p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability</p>
                  <p className="text-sm font-bold text-foreground tabular-nums">{100 - account.churnRisk}%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Support risk indicator */}
          <section
            className="rounded-xl border p-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              borderColor: `color-mix(in oklch, ${supportColor} 30%, var(--border))`,
              background: `linear-gradient(135deg, color-mix(in oklch, ${supportColor} 8%, var(--card)) 0%, var(--card) 60%)`,
              animationDelay: '100ms',
              animationFillMode: 'both',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4" style={{ color: supportColor }} />
              <h3 className="text-base font-semibold text-foreground">Support Risk</h3>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--secondary)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke={supportColor} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(account.churnRisk / 100) * 88} 88`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold tabular-nums" style={{ color: supportColor }}>{account.churnRisk}%</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Churn risk over next 90 days</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {supportRiskLevel === 'high' ? 'High risk — immediate action recommended' : supportRiskLevel === 'medium' ? 'Moderate risk — monitor closely' : 'Low risk — healthy account'}
                </p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {supportRiskLevel === 'high'
                  ? 'Schedule an executive QBR and review product adoption metrics with the customer success team.'
                  : supportRiskLevel === 'medium'
                  ? 'Send a check-in email and confirm next quarter goals with the champion.'
                  : 'Account is healthy. Identify expansion opportunities during the next renewal cycle.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
