'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { deals, STAGES, STAGE_COLORS, type Deal } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Handshake, Plus, Download, CheckCircle2, DollarSign, TrendingUp, Target, Filter, X,
} from 'lucide-react';

type StageFilter = 'all' | Deal['stage'];
type StatusFilter = 'all' | 'open' | 'won' | 'lost';

function dealStatus(d: Deal): 'open' | 'won' | 'lost' {
  if (d.stage === 'Closed Won') return 'won';
  if (d.stage === 'Closed Lost') return 'lost';
  return 'open';
}

export default function DealsListPage() {
  const router = useRouter();
  const [stageFilter, setStageFilter] = React.useState<StageFilter>('all');
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');

  // Filtered data based on chips
  const filteredDeals = React.useMemo(() => {
    return deals.filter((d) => {
      if (stageFilter !== 'all' && d.stage !== stageFilter) return false;
      if (statusFilter !== 'all' && dealStatus(d) !== statusFilter) return false;
      return true;
    });
  }, [stageFilter, statusFilter]);

  // Summary stats
  const totalDeals = filteredDeals.length;
  const totalValue = filteredDeals.reduce((s, d) => s + d.value, 0);
  const avgValue = totalDeals ? totalValue / totalDeals : 0;
  const wonDeals = filteredDeals.filter((d) => dealStatus(d) === 'won').length;
  const closedDeals = filteredDeals.filter((d) => dealStatus(d) !== 'open').length;
  const winRate = closedDeals ? Math.round((wonDeals / closedDeals) * 100) : 0;

  const stats = [
    { label: 'Total Deals', value: totalDeals.toString(), icon: Handshake, color: 'var(--accent)', sub: `${deals.length} total in pipeline` },
    { label: 'Total Value', value: formatCurrency(totalValue, { compact: true }), icon: DollarSign, color: 'var(--chart-1)', sub: 'sum of filtered deals' },
    { label: 'Avg Deal Size', value: formatCurrency(avgValue, { compact: true }), icon: Target, color: 'var(--chart-3)', sub: 'across filtered set' },
    { label: 'Win Rate', value: `${winRate}%`, icon: CheckCircle2, color: 'var(--success)', sub: `${wonDeals} won of ${closedDeals} closed` },
  ];

  // Stage filter chips with counts
  const stageChips = React.useMemo(() => {
    const counts: Record<string, number> = {};
    deals.forEach((d) => {
      counts[d.stage] = (counts[d.stage] || 0) + 1;
    });
    return STAGES.map((s) => ({ stage: s, count: counts[s] || 0, color: STAGE_COLORS[s] }));
  }, []);

  const statusChips: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: deals.length },
    { value: 'open', label: 'Open', count: deals.filter((d) => dealStatus(d) === 'open').length },
    { value: 'won', label: 'Won', count: deals.filter((d) => dealStatus(d) === 'won').length },
    { value: 'lost', label: 'Lost', count: deals.filter((d) => dealStatus(d) === 'lost').length },
  ];

  const columns: Column<Deal>[] = [
    {
      key: 'name',
      header: 'Deal',
      sortable: true,
      sortAccessor: (d) => d.name,
      cell: (d) => (
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">{d.name}</span>
          <span className="text-[10px] font-mono text-muted-foreground">{d.id}</span>
        </div>
      ),
    },
    {
      key: 'account',
      header: 'Account',
      sortable: true,
      sortAccessor: (d) => d.account,
      cell: (d) => {
        const acct = deals.find((x) => x.accountId === d.accountId);
        const color = STAGE_COLORS[d.stage];
        return (
          <div className="flex items-center gap-2 min-w-0">
            <AvatarBadge initials={d.account.slice(0, 2).toUpperCase()} size="sm" color={color} />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-foreground truncate">{d.account}</span>
              <span className="text-[10px] text-muted-foreground truncate">{acct?.type || 'New Business'}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'value',
      header: 'Value',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.value,
      cell: (d) => (
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">weighted {formatCurrency(d.weightedValue, { compact: true })}</span>
        </div>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      sortable: true,
      sortAccessor: (d) => d.stage,
      cell: (d) => <StageBadge stage={d.stage} color={STAGE_COLORS[d.stage]} />,
    },
    {
      key: 'probability',
      header: 'Probability',
      sortable: true,
      sortAccessor: (d) => d.probability,
      cell: (d) => (
        <div className="flex items-center gap-2 min-w-[100px]">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${d.probability}%`, background: STAGE_COLORS[d.stage] }}
            />
          </div>
          <span className="text-xs font-semibold text-foreground tabular-nums w-8 text-right">{d.probability}%</span>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (d) => d.owner,
      cell: (d) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={d.ownerInitials} size="sm" color={STAGE_COLORS[d.stage]} />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-foreground">{d.owner}</span>
            <span className="text-[10px] text-muted-foreground">{d.source}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'closeDate',
      header: 'Close Date',
      sortable: true,
      sortAccessor: (d) => d.closeDate,
      cell: (d) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">
            {new Date(d.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-[10px] text-muted-foreground">{d.age}d old</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortAccessor: (d) => dealStatus(d),
      cell: (d) => {
        const s = dealStatus(d);
        if (s === 'won') return <StatusBadge status="won" label="Won" />;
        if (s === 'lost') return <StatusBadge status="lost" label="Lost" />;
        // Open: show risk-based label
        if (d.riskScore > 40) return <StatusBadge status="high" label="At risk" />;
        if (d.daysInStage > 14) return <StatusBadge status="warning" label="Stalled" />;
        return <StatusBadge status="active" label="Active" />;
      },
    },
    {
      key: 'nextStep',
      header: 'Next Step',
      hideable: true,
      cell: (d) => (
        <span className="text-xs text-muted-foreground truncate block max-w-[180px]">{d.nextStep}</span>
      ),
    },
  ];

  const activeFilters = (stageFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setStageFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deals"
        description="All your deals in one place — search, filter, and manage"
        icon={Handshake}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
            </Button>
          </>
        }
      />

      {/* Summary stats banner */}
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

      {/* Filter chips bar */}
      <div className="bg-card border border-border rounded-xl p-3 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          {statusChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setStatusFilter(chip.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                statusFilter === chip.value
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
              )}
            >
              {chip.label}
              <span className={cn(
                'text-[10px] px-1 rounded-sm',
                statusFilter === chip.value ? 'bg-accent-foreground/15' : 'bg-background'
              )}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-accent" />
            </span>
            <span>Stage:</span>
          </div>
          <button
            onClick={() => setStageFilter('all')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
              stageFilter === 'all'
                ? 'bg-accent text-accent-foreground border-accent'
                : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
            )}
          >
            All stages
          </button>
          {stageChips.map((chip) => (
            <button
              key={chip.stage}
              onClick={() => setStageFilter(chip.stage as StageFilter)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                stageFilter === chip.stage
                  ? 'text-foreground'
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
              )}
              style={stageFilter === chip.stage ? {
                background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
              } : undefined}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
              {chip.stage}
              <span className="text-[10px] text-muted-foreground">{chip.count}</span>
            </button>
          ))}
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3 mr-1" /> Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Data table */}
      <DataTable<Deal>
        data={filteredDeals}
        columns={columns}
        getRowId={(d) => d.id}
        onRowClick={(d) => router.push(`/dashboard/deals/${d.id}`)}
        searchable
        searchKeys={['name', 'account', 'owner']}
        searchPlaceholder="Search by deal, account, or owner…"
        selectable
        pageSize={10}
        emptyTitle="No deals match your filters"
        emptyDescription="Try adjusting your search or clearing filters to see more deals."
        emptyAction={
          <Button size="sm" variant="outline" onClick={clearAllFilters}>
            Clear filters
          </Button>
        }
        exportFilename="deals.csv"
        initialSort={{ key: 'value', dir: 'desc' }}
      />
    </div>
  );
}
