'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/common/states';
import { accounts, type Account } from '@/lib/data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {
  Users, DollarSign, HeartPulse, Handshake, Search, Plus, Download,
  MapPin, Calendar, ChevronRight, Mail, ArrowUpRight, Filter, X,
} from 'lucide-react';

type TierFilter = 'all' | Account['tier'];

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

function healthLabel(score: number): string {
  if (score >= 85) return 'Healthy';
  if (score >= 70) return 'At Risk';
  return 'Critical';
}

export default function CustomersPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [tier, setTier] = React.useState<TierFilter>('all');

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    return accounts.filter((a) => {
      if (tier !== 'all' && a.tier !== tier) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q)
      );
    });
  }, [query, tier]);

  const totals = React.useMemo(() => {
    const totalRevenue = filtered.reduce((s, a) => s + a.revenue, 0);
    const avgHealth = filtered.length
      ? Math.round(filtered.reduce((s, a) => s + a.healthScore, 0) / filtered.length)
      : 0;
    const activeDeals = filtered.reduce((s, a) => s + a.activeDeals, 0);
    return { totalRevenue, avgHealth, activeDeals };
  }, [filtered]);

  const tierChips: { value: TierFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All Tiers', count: accounts.length, color: 'var(--accent)' },
    { value: 'Enterprise', label: 'Enterprise', count: accounts.filter((a) => a.tier === 'Enterprise').length, color: TIER_COLOR.Enterprise },
    { value: 'Growth', label: 'Growth', count: accounts.filter((a) => a.tier === 'Growth').length, color: TIER_COLOR.Growth },
    { value: 'Starter', label: 'Starter', count: accounts.filter((a) => a.tier === 'Starter').length, color: TIER_COLOR.Starter },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Your customer accounts at a glance — health, value, and engagement"
        icon={Users}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Customer
            </Button>
          </>
        }
      />

      {/* Summary tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Customers"
          value={formatNumber(accounts.length)}
          delta="+3 this quarter"
          deltaType="positive"
          icon={Users}
          subtext="across all tiers"
          accentColor="var(--accent)"
          delay={0}
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(accounts.reduce((s, a) => s + a.revenue, 0), { compact: true })}
          delta="+8.4%"
          deltaType="positive"
          icon={DollarSign}
          subtext="lifetime + ARR"
          accentColor="var(--chart-1)"
          delay={1}
        />
        <KPICard
          title="Avg Health"
          value={`${totals.avgHealth}`}
          delta="+2 pts"
          deltaType="positive"
          icon={HeartPulse}
          subtext="health score / 100"
          accentColor="var(--chart-3)"
          delay={2}
        />
        <KPICard
          title="Active Deals"
          value={formatNumber(accounts.reduce((s, a) => s + a.activeDeals, 0))}
          delta="+5"
          deltaType="positive"
          icon={Handshake}
          subtext="in-flight across customers"
          accentColor="var(--chart-5)"
          delay={3}
        />
      </div>

      {/* Search + tier filter */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, industry, or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Tier:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {tierChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setTier(chip.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                  tier === chip.value
                    ? 'text-foreground'
                    : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                )}
                style={tier === chip.value ? {
                  background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                  borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
                } : undefined}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                {chip.label}
                <span className="text-[10px] text-muted-foreground">{chip.count}</span>
              </button>
            ))}
            {(tier !== 'all' || query) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setTier('all'); setQuery(''); }}
                className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3 mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Customer card grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers match your filters"
          description="Try adjusting your search or clearing the tier filter to see all customers."
          action={
            <Button variant="outline" size="sm" onClick={() => { setTier('all'); setQuery(''); }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((account, i) => {
            const hColor = healthColor(account.healthScore);
            return (
              <div
                key={account.id}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* Top color stripe */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${TIER_COLOR[account.tier]}, transparent)` }} />

                <div className="p-5 space-y-4">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <AvatarBadge
                        initials={account.name.slice(0, 2).toUpperCase()}
                        size="lg"
                        color={account.logoColor}
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">{account.name}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{account.industry}</p>
                      </div>
                    </div>
                    <StageBadge stage={account.tier} color={TIER_COLOR[account.tier]} />
                  </div>

                  {/* Location + last contact */}
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {account.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {account.lastContact}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(account.revenue, { compact: true })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Deals</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{account.activeDeals}</p>
                    </div>
                  </div>

                  {/* Health score bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Health Score</span>
                      <StatusBadge
                        status={account.healthScore >= 85 ? 'success' : account.healthScore >= 70 ? 'warning' : 'destructive'}
                        label={healthLabel(account.healthScore)}
                      />
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${account.healthScore}%`, background: hColor }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">Churn risk {account.churnRisk}%</span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: hColor }}>{account.healthScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* Hover quick actions */}
                <div className="absolute inset-x-0 bottom-0 bg-card/95 backdrop-blur border-t border-border translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="grid grid-cols-3 divide-x divide-border">
                    <button
                      onClick={() => router.push(`/dashboard/customers/${account.id}`)}
                      className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      View
                    </button>
                    <button className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </button>
                    <button className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer link */}
      {filtered.length > 0 && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent">
            <a href="/dashboard/accounts">
              View all accounts as table <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
