'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { deals, territories, reps, STAGE_COLORS, type Stage, type Deal } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Trello, Layers, Grid3x3, List, DollarSign, Hash, ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const BOARD_STAGES: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation'];

type ViewMode = 'value' | 'count' | 'deals';

// Helper to map a deal's owner → territory name
function dealTerritory(deal: Deal): string {
  const rep = reps.find((r) => r.name === deal.owner);
  return rep?.territory || 'Unassigned';
}

// Compute matrix
function usePipelineMatrix() {
  return React.useMemo(() => {
    const matrix: Record<string, Record<Stage, Deal[]>> = {};
    territories.forEach((t) => {
      matrix[t.name] = { Lead: [], Qualified: [], Discovery: [], Proposal: [], Negotiation: [], 'Closed Won': [], 'Closed Lost': [] };
    });
    deals.forEach((d) => {
      const terr = dealTerritory(d);
      if (!matrix[terr]) {
        matrix[terr] = { Lead: [], Qualified: [], Discovery: [], Proposal: [], Negotiation: [], 'Closed Won': [], 'Closed Lost': [] };
      }
      if (matrix[terr][d.stage]) matrix[terr][d.stage].push(d);
    });
    return matrix;
  }, []);
}

function intensityColor(intensity: number, color: string): string {
  // 0..1 → opacity 0.08 to 0.55
  const alpha = 0.08 + intensity * 0.47;
  return `color-mix(in oklch, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

export default function PipelineBoardPage() {
  const matrix = usePipelineMatrix();
  const [viewMode, setViewMode] = React.useState<ViewMode>('value');
  const [activeCell, setActiveCell] = React.useState<string | null>(null);

  // Compute max value per column for intensity scaling
  const columnMax: Record<Stage, number> = React.useMemo(() => {
    const max: Record<string, number> = {};
    BOARD_STAGES.forEach((s) => {
      const vals = territories.map((t) => (matrix[t.name]?.[s] || []).reduce((sum, d) => sum + d.value, 0));
      max[s] = Math.max(1, ...vals);
    });
    return max as Record<Stage, number>;
  }, [matrix]);

  const columnTotals: Record<Stage, { count: number; value: number }> = React.useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {};
    BOARD_STAGES.forEach((s) => {
      let count = 0, value = 0;
      territories.forEach((t) => {
        const cell = matrix[t.name]?.[s] || [];
        count += cell.length;
        value += cell.reduce((sum, d) => sum + d.value, 0);
      });
      totals[s] = { count, value };
    });
    return totals as Record<Stage, { count: number; value: number }>;
  }, [matrix]);

  const grandTotal = Object.values(columnTotals).reduce((s, t) => s + t.value, 0);
  const grandCount = Object.values(columnTotals).reduce((s, t) => s + t.count, 0);

  const viewModes: { mode: ViewMode; label: string; icon: React.ElementType }[] = [
    { mode: 'value', label: 'Value', icon: DollarSign },
    { mode: 'count', label: 'Count', icon: Hash },
    { mode: 'deals', label: 'Deals', icon: List },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline Board"
        description="Swimlane view of pipeline by territory and stage"
        icon={Trello}
        actions={
          <div className="flex items-center gap-1 bg-secondary border border-border rounded-lg p-1">
            {viewModes.map((vm) => (
              <button
                key={vm.mode}
                onClick={() => setViewMode(vm.mode)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors',
                  viewMode === vm.mode
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card'
                )}
              >
                <vm.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{vm.label}</span>
              </button>
            ))}
          </div>
        }
      />

      {/* Top summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Layers className="w-3 h-3" /> Territories
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{territories.length}</p>
          <p className="text-[11px] text-muted-foreground">active regions</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <DollarSign className="w-3 h-3" /> Total Pipeline
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatCurrency(grandTotal, { compact: true })}</p>
          <p className="text-[11px] text-success">+18% vs last quarter</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Hash className="w-3 h-3" /> Open Deals
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{grandCount}</p>
          <p className="text-[11px] text-muted-foreground">across all stages</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '180ms', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <Grid3x3 className="w-3 h-3" /> Avg per Cell
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{Math.round(grandCount / (territories.length * BOARD_STAGES.length) * 10) / 10}</p>
          <p className="text-[11px] text-muted-foreground">deals per stage</p>
        </div>
      </div>

      {/* Swimlane board */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4 sticky left-0 bg-secondary/40 z-10 min-w-[180px]">
                  Territory
                </th>
                {BOARD_STAGES.map((stage) => {
                  const total = columnTotals[stage];
                  const color = STAGE_COLORS[stage];
                  return (
                    <th key={stage} className="py-3 px-3 min-w-[150px]">
                      <div className="flex items-center gap-2 mb-1 justify-center">
                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <span className="text-xs font-semibold text-foreground">{stage}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(total.value, { compact: true })}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">· {total.count}</span>
                      </div>
                    </th>
                  );
                })}
                <th className="py-3 px-3 min-w-[120px] text-right">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Territory Total</div>
                  <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(grandTotal, { compact: true })}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {territories.map((terr, rowIdx) => {
                const rowDeals = BOARD_STAGES.reduce((s, st) => s + (matrix[terr.name]?.[st] || []).length, 0);
                const rowValue = BOARD_STAGES.reduce((s, st) => s + (matrix[terr.name]?.[st] || []).reduce((sum, d) => sum + d.value, 0), 0);
                return (
                  <tr
                    key={terr.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${rowIdx * 50}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4 sticky left-0 bg-card z-10 border-r border-border">
                      <div className="flex items-center gap-2">
                        <AvatarBadge initials={terr.ownerInitials} size="md" color="var(--accent)" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{terr.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{terr.owner}</p>
                        </div>
                      </div>
                    </td>
                    {BOARD_STAGES.map((stage) => {
                      const cell = matrix[terr.name]?.[stage] || [];
                      const value = cell.reduce((s, d) => s + d.value, 0);
                      const intensity = value / columnMax[stage];
                      const color = STAGE_COLORS[stage];
                      const cellKey = `${terr.name}-${stage}`;
                      const isActive = activeCell === cellKey;

                      return (
                        <td key={stage} className="p-2 align-top">
                          <Popover onOpenChange={(open) => setActiveCell(open ? cellKey : null)}>
                            <PopoverTrigger asChild>
                              <button
                                className={cn(
                                  'w-full min-h-[72px] rounded-lg p-2.5 text-left transition-all duration-200 border',
                                  cell.length > 0
                                    ? 'hover:scale-[1.03] hover:shadow-md cursor-pointer'
                                    : 'opacity-60 hover:opacity-100 cursor-pointer',
                                  isActive ? 'border-accent ring-2 ring-accent/20' : 'border-transparent'
                                )}
                                style={{
                                  background: cell.length > 0 ? intensityColor(intensity, color) : 'var(--secondary)',
                                }}
                              >
                                {cell.length === 0 ? (
                                  <div className="flex items-center justify-center h-[52px]">
                                    <span className="text-[11px] text-muted-foreground/60">—</span>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: color }}>
                                        {cell.length} {cell.length === 1 ? 'deal' : 'deals'}
                                      </span>
                                    </div>
                                    {viewMode === 'value' && (
                                      <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(value, { compact: true })}</p>
                                    )}
                                    {viewMode === 'count' && (
                                      <p className="text-lg font-bold text-foreground tabular-nums">{cell.length}</p>
                                    )}
                                    {viewMode === 'deals' && (
                                      <div className="space-y-0.5">
                                        {cell.slice(0, 2).map((d) => (
                                          <p key={d.id} className="text-[10px] text-foreground truncate">{d.name}</p>
                                        ))}
                                        {cell.length > 2 && (
                                          <p className="text-[10px] text-muted-foreground">+{cell.length - 2} more</p>
                                        )}
                                      </div>
                                    )}
                                    {viewMode !== 'deals' && (
                                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{cell[0]?.account}</p>
                                    )}
                                  </div>
                                )}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="center">
                              <div className="p-3 border-b border-border bg-secondary/40">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                                  <span className="text-sm font-semibold text-foreground">{terr.name} · {stage}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {cell.length} deals · {formatCurrency(value, { compact: true })}
                                </p>
                              </div>
                              <div className="max-h-72 overflow-y-auto p-1">
                                {cell.length === 0 ? (
                                  <div className="py-6 text-center text-xs text-muted-foreground">No deals in this cell</div>
                                ) : (
                                  cell.map((d) => (
                                    <Link
                                      key={d.id}
                                      href={`/dashboard/deals/${d.id}`}
                                      className="block p-2 rounded-md hover:bg-secondary transition-colors"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs font-semibold text-foreground truncate">{d.name}</p>
                                          <p className="text-[10px] text-muted-foreground truncate">{d.account} · {d.owner}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                          <p className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</p>
                                          <p className="text-[10px] text-muted-foreground">{d.probability}%</p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))
                                )}
                              </div>
                              <div className="p-2 border-t border-border">
                                <Button variant="ghost" size="sm" className="w-full text-accent hover:text-accent" asChild>
                                  <Link href={`/dashboard/deals`}>
                                    View all deals <ArrowUpRight className="w-3 h-3 ml-1" />
                                  </Link>
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                      );
                    })}
                    <td className="py-3 px-3 text-right">
                      <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(rowValue, { compact: true })}</p>
                      <p className="text-[11px] text-muted-foreground">{rowDeals} deals</p>
                      <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(rowValue / grandTotal) * 100}%`, background: 'var(--accent)' }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap legend */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Heatmap intensity</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">Low</span>
            <div className="flex">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((i) => (
                <div key={i} className="w-8 h-3" style={{ background: intensityColor(i, 'var(--accent)') }} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">High</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Click any cell to view deals</span>
        </div>
      </div>
    </div>
  );
}
