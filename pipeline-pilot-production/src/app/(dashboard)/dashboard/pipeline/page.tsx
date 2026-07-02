'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { deals, reps, territories, STAGES, STAGE_COLORS, type Deal, type Stage } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  GitBranch, DollarSign, TrendingUp, Target, Gauge, Filter, Plus, Search, Clock,
} from 'lucide-react';
import Link from 'next/link';

// Open pipeline stages only (exclude closed)
const PIPELINE_STAGES: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation'];

// Days-in-stage color coding
function ageColor(days: number): { bg: string; text: string; bar: string } {
  if (days > 14) return { bg: 'bg-destructive/10', text: 'text-destructive', bar: 'var(--destructive)' };
  if (days > 7) return { bg: 'bg-warning/10', text: 'text-warning', bar: 'var(--warning)' };
  return { bg: 'bg-success/10', text: 'text-success', bar: 'var(--success)' };
}

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  const a = ageColor(deal.daysInStage);
  return (
    <Link
      href={`/dashboard/deals/${deal.id}`}
      className="group block bg-card border border-border rounded-xl p-3 hover:border-accent/40 hover:shadow-md transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">{deal.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{deal.account}</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/70 shrink-0">{deal.id}</span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-bold text-foreground tabular-nums">{formatCurrency(deal.value, { compact: true })}</span>
        <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium', a.bg, a.text)}>
          <Clock className="w-2.5 h-2.5" />
          {deal.daysInStage}d
        </span>
      </div>

      {/* Probability bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability</span>
          <span className="text-[10px] font-semibold text-foreground tabular-nums">{deal.probability}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${deal.probability}%`,
              background: `linear-gradient(90deg, ${STAGE_COLORS[deal.stage]}, ${a.bar})`,
            }}
          />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <AvatarBadge initials={deal.ownerInitials} size="sm" color={STAGE_COLORS[deal.stage]} />
          <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{deal.owner.split(' ')[0]}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">{deal.source}</span>
      </div>
    </Link>
  );
}

export default function PipelinePage() {
  const [repFilter, setRepFilter] = React.useState<string>('all');
  const [territoryFilter, setTerritoryFilter] = React.useState<string>('all');
  const [sourceFilter, setSourceFilter] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');

  const sources = React.useMemo(() => Array.from(new Set(deals.map((d) => d.source))), []);

  const filteredDeals = React.useMemo(() => {
    return deals.filter((d) => {
      if (repFilter !== 'all') {
        const rep = reps.find((r) => r.id === repFilter);
        if (!rep || d.owner !== rep.name) return false;
      }
      if (territoryFilter !== 'all') {
        const rep = reps.find((r) => r.name === d.owner);
        const terr = territories.find((t) => t.name === territoryFilter);
        if (!terr || !rep || rep.territory !== terr.name) return false;
      }
      if (sourceFilter !== 'all' && d.source !== sourceFilter) return false;
      if (search && !`${d.name} ${d.account} ${d.owner}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [repFilter, territoryFilter, sourceFilter, search]);

  // Group by stage
  const dealsByStage = React.useMemo(() => {
    const map: Record<Stage, Deal[]> = { Lead: [], Qualified: [], Discovery: [], Proposal: [], Negotiation: [], 'Closed Won': [], 'Closed Lost': [] };
    filteredDeals.forEach((d) => {
      if (map[d.stage]) map[d.stage].push(d);
    });
    return map;
  }, [filteredDeals]);

  // Pipeline metrics
  const totalValue = filteredDeals.reduce((s, d) => s + d.value, 0);
  const weightedValue = filteredDeals.reduce((s, d) => s + d.weightedValue, 0);
  const avgDealSize = filteredDeals.length ? totalValue / filteredDeals.length : 0;
  const avgCycleDays = filteredDeals.length ? Math.round(filteredDeals.reduce((s, d) => s + d.age, 0) / filteredDeals.length) : 0;

  const activeFilters = (repFilter !== 'all' ? 1 : 0) + (territoryFilter !== 'all' ? 1 : 0) + (sourceFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setRepFilter('all');
    setTerritoryFilter('all');
    setSourceFilter('all');
    setSearch('');
  };

  const metrics = [
    { label: 'Total Pipeline', value: formatCurrency(totalValue, { compact: true }), icon: DollarSign, color: 'var(--accent)', sub: `${filteredDeals.length} deals` },
    { label: 'Weighted Value', value: formatCurrency(weightedValue, { compact: true }), icon: TrendingUp, color: 'var(--chart-1)', sub: `${Math.round((weightedValue / Math.max(1, totalValue)) * 100)}% of total` },
    { label: 'Avg Deal Size', value: formatCurrency(avgDealSize, { compact: true }), icon: Target, color: 'var(--chart-3)', sub: 'open pipeline' },
    { label: 'Avg Cycle', value: `${avgCycleDays}d`, icon: Gauge, color: 'var(--chart-5)', sub: 'days to close' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Pipeline"
        description="Manage deals across every stage of your sales funnel"
        icon={GitBranch}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
          </Button>
        }
      />

      {/* Pipeline metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{m.label}</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${m.color} 12%, transparent)` }}>
                <m.icon className="w-4 h-4" style={{ color: m.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{m.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-card border border-border rounded-xl p-3 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilters > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
              {activeFilters}
            </span>
          )}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search deals, accounts, owners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-secondary border-border"
          />
        </div>
        <Select value={repFilter} onValueChange={setRepFilter}>
          <SelectTrigger className="h-9 w-full lg:w-[180px] bg-secondary border-border">
            <SelectValue placeholder="All reps" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All reps</SelectItem>
            {reps.map((r) => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={territoryFilter} onValueChange={setTerritoryFilter}>
          <SelectTrigger className="h-9 w-full lg:w-[160px] bg-secondary border-border">
            <SelectValue placeholder="All territories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All territories</SelectItem>
            {territories.map((t) => (
              <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="h-9 w-full lg:w-[140px] bg-secondary border-border">
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {sources.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {activeFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
            Clear
          </Button>
        )}
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto pb-4 -mx-2 px-2">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map((stage, stageIdx) => {
            const stageDeals = dealsByStage[stage] || [];
            const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
            const stageWeighted = stageDeals.reduce((s, d) => s + d.weightedValue, 0);
            const color = STAGE_COLORS[stage];

            return (
              <div
                key={stage}
                className="w-[300px] shrink-0 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${stageIdx * 80}ms`, animationFillMode: 'both' }}
              >
                {/* Column header */}
                <div className="bg-card border border-border rounded-t-xl p-3 border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-sm font-semibold text-foreground">{stage}</span>
                      <span className="text-xs text-muted-foreground">({stageDeals.length})</span>
                    </div>
                    <button className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-foreground tabular-nums">{formatCurrency(stageValue, { compact: true })}</span>
                    <span className="text-[10px] text-muted-foreground">weighted {formatCurrency(stageWeighted, { compact: true })}</span>
                  </div>
                  {/* Stage progress */}
                  <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (stageDeals.length / Math.max(1, filteredDeals.length)) * 100)}%`, background: color }}
                    />
                  </div>
                </div>

                {/* Deal cards */}
                <div className="bg-secondary/30 border border-border rounded-b-xl p-2 space-y-2 flex-1 min-h-[200px] max-h-[calc(100vh-340px)] overflow-y-auto custom-scroll">
                  {stageDeals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-[11px] text-muted-foreground">No deals in this stage</p>
                    </div>
                  ) : (
                    stageDeals.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
      `}</style>
    </div>
  );
}
