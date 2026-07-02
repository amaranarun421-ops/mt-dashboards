'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { deals, type Deal } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Target, Plus, Download, DollarSign, TrendingUp, Flame, Filter, X, ChevronRight, Zap,
} from 'lucide-react';

type TypeFilter = 'all' | Deal['type'];

const TYPE_COLOR: Record<Deal['type'], string> = {
  'New Business': 'var(--chart-1)',
  'Expansion': 'var(--accent)',
  'Renewal': 'var(--chart-3)',
  'Upsell': 'var(--chart-5)',
};

const STAGE_COLOR_MAP: Record<string, string> = {
  'Lead': 'var(--chart-1)',
  'Qualified': 'var(--chart-2)',
  'Discovery': 'var(--chart-3)',
  'Proposal': 'var(--chart-5)',
  'Negotiation': 'var(--accent)',
  'Closed Won': 'var(--success)',
  'Closed Lost': 'var(--destructive)',
};

function dealInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function OpportunitiesPage() {
  const router = useRouter();
  const [type, setType] = React.useState<TypeFilter>('all');

  const filtered = React.useMemo(() => {
    return deals.filter((d) => type === 'all' || d.type === type);
  }, [type]);

  const totalValue = filtered.reduce((s, d) => s + d.value, 0);
  const weightedValue = filtered.reduce((s, d) => s + d.weightedValue, 0);
  const avgProb = filtered.length ? Math.round(filtered.reduce((s, d) => s + d.probability, 0) / filtered.length) : 0;

  const stats = [
    { label: 'Total Opportunities', value: filtered.length.toString(), icon: Target, color: 'var(--accent)', sub: 'in pipeline' },
    { label: 'Total Value', value: formatCurrency(totalValue, { compact: true }), icon: DollarSign, color: 'var(--chart-1)', sub: 'sum of open' },
    { label: 'Weighted Value', value: formatCurrency(weightedValue, { compact: true }), icon: TrendingUp, color: 'var(--chart-3)', sub: 'probability-adjusted' },
    { label: 'Avg Probability', value: `${avgProb}%`, icon: Zap, color: 'var(--success)', sub: 'across filtered set' },
  ];

  // Hot opportunities — top 5 by probability × value
  const hotOpps = [...deals]
    .map((d) => ({ ...d, heat: d.probability * d.value }))
    .sort((a, b) => b.heat - a.heat)
    .slice(0, 5);

  const typeChips: { value: TypeFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All', count: deals.length, color: 'var(--accent)' },
    ...(['New Business', 'Expansion', 'Renewal', 'Upsell'] as Deal['type'][]).map((t) => ({
      value: t,
      label: t,
      count: deals.filter((d) => d.type === t).length,
      color: TYPE_COLOR[t],
    })),
  ];

  const columns: Column<Deal>[] = [
    {
      key: 'name',
      header: 'Opportunity',
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
      cell: (d) => (
        <div className="flex items-center gap-2 min-w-0">
          <AvatarBadge initials={d.account.slice(0, 2).toUpperCase()} size="sm" color={TYPE_COLOR[d.type]} />
          <span className="text-xs font-medium text-foreground truncate">{d.account}</span>
        </div>
      ),
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
      cell: (d) => <StageBadge stage={d.stage} color={STAGE_COLOR_MAP[d.stage]} />,
    },
    {
      key: 'probability',
      header: 'Probability',
      sortable: true,
      align: 'center',
      sortAccessor: (d) => d.probability,
      cell: (d) => {
        const color = STAGE_COLOR_MAP[d.stage];
        return (
          <div className="flex items-center gap-2 min-w-[90px] justify-end">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-[60px]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${d.probability}%`, background: color }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground tabular-nums w-8 text-right">{d.probability}%</span>
          </div>
        );
      },
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      sortAccessor: (d) => d.type,
      cell: (d) => <StageBadge stage={d.type} color={TYPE_COLOR[d.type]} />,
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      sortAccessor: (d) => d.source,
      cell: (d) => <span className="text-xs text-muted-foreground">{d.source}</span>,
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (d) => d.owner,
      cell: (d) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={d.ownerInitials} size="sm" color={TYPE_COLOR[d.type]} />
          <span className="text-xs text-foreground">{d.owner}</span>
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
            {new Date(d.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="text-[10px] text-muted-foreground">{new Date(d.closeDate).getFullYear()}</span>
        </div>
      ),
    },
    {
      key: 'age',
      header: 'Days Open',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.age,
      cell: (d) => {
        const color = d.age > 45 ? 'var(--destructive)' : d.age > 30 ? 'var(--warning)' : 'var(--success)';
        return <span className="text-xs font-semibold tabular-nums" style={{ color }}>{d.age}d</span>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunities"
        description="Track opportunities through the pipeline with probability-weighted forecasting"
        icon={Target}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Opportunity
            </Button>
          </>
        }
      />

      {/* KPIs */}
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

      {/* Layout: table (2 cols) + hot opportunities side panel (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Type filter chips */}
          <div className="bg-card border border-border rounded-xl p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Type:</span>
              </div>
              {typeChips.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => setType(chip.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                    type === chip.value
                      ? 'text-foreground'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                  )}
                  style={type === chip.value ? {
                    background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                    borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
                  } : undefined}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                  {chip.label}
                  <span className="text-[10px] text-muted-foreground">{chip.count}</span>
                </button>
              ))}
              {type !== 'all' && (
                <Button variant="ghost" size="sm" onClick={() => setType('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          {/* Data table */}
          <DataTable<Deal>
            data={filtered}
            columns={columns}
            getRowId={(d) => d.id}
            onRowClick={(d) => router.push(`/dashboard/opportunities/${d.id}`)}
            searchable
            searchKeys={['name', 'account', 'owner']}
            searchPlaceholder="Search opportunities by name, account, or owner…"
            selectable
            pageSize={8}
            emptyTitle="No opportunities match your filters"
            emptyDescription="Try adjusting your search or clearing the type filter."
            emptyAction={
              <Button size="sm" variant="outline" onClick={() => setType('all')}>
                Clear filters
              </Button>
            }
            exportFilename="opportunities.csv"
            initialSort={{ key: 'value', dir: 'desc' }}
          />
        </div>

        {/* Hot opportunities side panel */}
        <div className="space-y-4">
          <div
            className="relative overflow-hidden rounded-xl border border-accent/30 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              background: 'linear-gradient(160deg, color-mix(in oklch, var(--accent) 8%, var(--card)) 0%, var(--card) 60%)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Hot Opportunities</h3>
                </div>
                <span className="text-[10px] text-muted-foreground">top 5 by P×V</span>
              </div>
              <div className="space-y-2">
                {hotOpps.map((opp, i) => (
                  <button
                    key={opp.id}
                    onClick={() => router.push(`/dashboard/opportunities/${opp.id}`)}
                    className="w-full group flex items-center gap-3 p-3 rounded-lg border border-border bg-card/60 hover:border-accent/40 hover:bg-accent/5 transition-all text-left animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-xs font-bold text-accent tabular-nums w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{opp.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{opp.account}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StageBadge stage={opp.stage} color={STAGE_COLOR_MAP[opp.stage]} />
                        <span className="text-[10px] text-muted-foreground tabular-nums">{opp.probability}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(opp.value, { compact: true })}</p>
                      <p className="text-[10px] text-accent tabular-nums">heat {(opp.heat / 1000).toFixed(0)}k</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Decorative flame glow */}
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'var(--accent)' }}
            />
          </div>

          {/* Type breakdown */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Value by Type</h3>
            </div>
            <div className="space-y-3">
              {(['New Business', 'Expansion', 'Renewal', 'Upsell'] as Deal['type'][]).map((t) => {
                const typeDeals = deals.filter((d) => d.type === t);
                const total = typeDeals.reduce((s, d) => s + d.value, 0);
                const pct = totalValue > 0 ? (total / totalValue) * 100 : 0;
                return (
                  <div key={t}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{t}</span>
                      <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(total, { compact: true })}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: TYPE_COLOR[t] }}
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
