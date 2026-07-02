'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { accounts, type Account } from '@/lib/data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Building2, Plus, Download, DollarSign, Users, TrendingUp, HeartPulse, Filter, X,
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

export default function AccountsPage() {
  const router = useRouter();
  const [tier, setTier] = React.useState<TierFilter>('all');

  const filtered = React.useMemo(() => {
    return accounts.filter((a) => tier === 'all' || a.tier === tier);
  }, [tier]);

  const totalARR = accounts.reduce((s, a) => s + a.arr, 0);
  const enterpriseCount = accounts.filter((a) => a.tier === 'Enterprise').length;
  const avgHealth = Math.round(accounts.reduce((s, a) => s + a.healthScore, 0) / accounts.length);

  const stats = [
    { label: 'Total Accounts', value: formatNumber(accounts.length), icon: Building2, color: 'var(--accent)', sub: 'across all industries' },
    { label: 'Total ARR', value: formatCurrency(totalARR, { compact: true }), icon: DollarSign, color: 'var(--chart-1)', sub: 'annualized' },
    { label: 'Enterprise', value: enterpriseCount.toString(), icon: Users, color: 'var(--chart-3)', sub: 'high-value tier' },
    { label: 'Avg Health', value: `${avgHealth}`, icon: HeartPulse, color: 'var(--success)', sub: 'health score / 100' },
  ];

  const tierChips: { value: TierFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All Tiers', count: accounts.length, color: 'var(--accent)' },
    { value: 'Enterprise', label: 'Enterprise', count: accounts.filter((a) => a.tier === 'Enterprise').length, color: TIER_COLOR.Enterprise },
    { value: 'Growth', label: 'Growth', count: accounts.filter((a) => a.tier === 'Growth').length, color: TIER_COLOR.Growth },
    { value: 'Starter', label: 'Starter', count: accounts.filter((a) => a.tier === 'Starter').length, color: TIER_COLOR.Starter },
  ];

  const columns: Column<Account>[] = [
    {
      key: 'name',
      header: 'Account',
      sortable: true,
      sortAccessor: (a) => a.name,
      cell: (a) => (
        <div className="flex items-center gap-3 min-w-0">
          <AvatarBadge initials={a.name.slice(0, 2).toUpperCase()} size="md" color={a.logoColor} />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{a.name}</span>
            <span className="text-[10px] text-muted-foreground truncate">{a.website}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'industry',
      header: 'Industry',
      sortable: true,
      sortAccessor: (a) => a.industry,
      cell: (a) => <span className="text-xs text-foreground">{a.industry}</span>,
    },
    {
      key: 'tier',
      header: 'Tier',
      sortable: true,
      sortAccessor: (a) => a.tier,
      cell: (a) => <StageBadge stage={a.tier} color={TIER_COLOR[a.tier]} />,
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      sortAccessor: (a) => a.location,
      cell: (a) => <span className="text-xs text-muted-foreground">{a.location}</span>,
    },
    {
      key: 'employees',
      header: 'Employees',
      sortable: true,
      align: 'right',
      sortAccessor: (a) => a.employees,
      cell: (a) => <span className="text-xs text-foreground tabular-nums">{formatNumber(a.employees)}</span>,
    },
    {
      key: 'arr',
      header: 'ARR',
      sortable: true,
      align: 'right',
      sortAccessor: (a) => a.arr,
      cell: (a) => <span className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(a.arr, { compact: true })}</span>,
    },
    {
      key: 'activeDeals',
      header: 'Active Deals',
      sortable: true,
      align: 'center',
      sortAccessor: (a) => a.activeDeals,
      cell: (a) => (
        <span className={cn(
          'inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-md text-xs font-semibold tabular-nums',
          a.activeDeals > 2 ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'
        )}>
          {a.activeDeals}
        </span>
      ),
    },
    {
      key: 'healthScore',
      header: 'Health',
      sortable: true,
      sortAccessor: (a) => a.healthScore,
      cell: (a) => {
        const color = healthColor(a.healthScore);
        return (
          <div className="flex items-center gap-2 min-w-[100px]">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${a.healthScore}%`, background: color }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground tabular-nums w-8 text-right">{a.healthScore}</span>
          </div>
        );
      },
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (a) => a.owner,
      cell: (a) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={a.ownerInitials} size="sm" color={TIER_COLOR[a.tier]} />
          <span className="text-xs font-medium text-foreground">{a.owner}</span>
        </div>
      ),
    },
    {
      key: 'renewalDate',
      header: 'Renewal',
      sortable: true,
      sortAccessor: (a) => a.renewalDate,
      cell: (a) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">
            {new Date(a.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="text-[10px] text-muted-foreground">{new Date(a.renewalDate).getFullYear()}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts"
        description="All customer accounts with health, ARR, and renewal tracking"
        icon={Building2}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Account
            </Button>
          </>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tier filter chips */}
      <div className="bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Tier:</span>
          </div>
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
          {tier !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setTier('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3 mr-1" /> Clear filter
            </Button>
          )}
        </div>
      </div>

      {/* Data table */}
      <DataTable<Account>
        data={filtered}
        columns={columns}
        getRowId={(a) => a.id}
        onRowClick={(a) => router.push(`/dashboard/accounts/${a.id}`)}
        searchable
        searchKeys={['name', 'industry', 'location', 'owner']}
        searchPlaceholder="Search accounts by name, industry, or owner…"
        selectable
        pageSize={10}
        emptyTitle="No accounts match your filters"
        emptyDescription="Try adjusting your search or clearing the tier filter."
        emptyAction={
          <Button size="sm" variant="outline" onClick={() => setTier('all')}>
            Clear filters
          </Button>
        }
        exportFilename="accounts.csv"
        initialSort={{ key: 'arr', dir: 'desc' }}
      />
    </div>
  );
}
