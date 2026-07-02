'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { deals, STAGES, STAGE_COLORS, type Stage, type Deal } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  Handshake, Plus, GripVertical, AlertCircle, Clock, Calendar, ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const BOARD_STAGES: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation'];

// WIP limits per stage
const WIP_LIMITS: Record<Stage, number> = {
  Lead: 30,
  Qualified: 20,
  Discovery: 12,
  Proposal: 8,
  Negotiation: 5,
  'Closed Won': 0,
  'Closed Lost': 0,
};

function ageBucket(days: number): { label: string; color: string; bg: string; border: string } {
  if (days > 14) return { label: `${days}d`, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' };
  if (days > 7) return { label: `${days}d`, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
  return { label: `${days}d`, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
}

function riskLabel(score: number): { label: string; color: string } {
  if (score > 40) return { label: 'High risk', color: 'var(--destructive)' };
  if (score > 25) return { label: 'Medium risk', color: 'var(--warning)' };
  return { label: 'Low risk', color: 'var(--success)' };
}

function KanbanDealCard({ deal, index }: { deal: Deal; index: number }) {
  const age = ageBucket(deal.daysInStage);
  const risk = riskLabel(deal.riskScore);
  const color = STAGE_COLORS[deal.stage];

  return (
    <div
      className="group relative bg-card border border-border rounded-lg shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200 cursor-grab active:cursor-grabbing animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      {/* Drag handle + age indicator */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-border/60 bg-secondary/30 rounded-t-lg">
        <div className="flex items-center gap-1.5">
          <GripVertical className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
          <span className="text-[10px] font-mono text-muted-foreground">{deal.id}</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn('inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold border', age.bg, age.color, age.border)}>
              <Clock className="w-2.5 h-2.5" />
              {age.label}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">{deal.daysInStage} days in current stage</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Link href={`/dashboard/deals/${deal.id}`} className="block p-3">
        <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">{deal.name}</p>
        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{deal.account}</p>

        {/* Value + risk indicator */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-bold text-foreground tabular-nums">{formatCurrency(deal.value, { compact: true })}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium" style={{ color: risk.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: risk.color }} />
                {deal.riskScore}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">{risk.label} · score {deal.riskScore}/100</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Probability bar with stage color */}
        <div className="mt-2.5">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-muted-foreground uppercase tracking-wider">Probability</span>
            <span className="font-semibold text-foreground tabular-nums">{deal.probability}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${deal.probability}%`, background: color }}
            />
          </div>
        </div>

        {/* Owner + close date */}
        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <AvatarBadge initials={deal.ownerInitials} size="sm" color={color} />
            <span className="text-[10px] text-muted-foreground truncate">{deal.owner.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="w-2.5 h-2.5" />
            <span className="truncate">{new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </Link>

      {/* Hover action — open deal */}
      <Link
        href={`/dashboard/deals/${deal.id}`}
        className="absolute top-2 right-9 w-6 h-6 rounded-md flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent/40 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Open deal"
      >
        <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );
}

export default function KanbanDealsPage() {
  const dealsByStage = React.useMemo(() => {
    const map: Record<Stage, Deal[]> = { Lead: [], Qualified: [], Discovery: [], Proposal: [], Negotiation: [], 'Closed Won': [], 'Closed Lost': [] };
    deals.forEach((d) => {
      if (map[d.stage]) map[d.stage].push(d);
    });
    return map;
  }, []);

  // Sort each stage by days-in-stage descending (oldest first)
  Object.values(dealsByStage).forEach((arr) => arr.sort((a, b) => b.daysInStage - a.daysInStage));

  const totalDeals = BOARD_STAGES.reduce((s, st) => s + dealsByStage[st].length, 0);
  const totalValue = BOARD_STAGES.reduce((s, st) => s + dealsByStage[st].reduce((sum, d) => sum + d.value, 0), 0);

  // Age stats
  const allAges = deals.map((d) => d.daysInStage);
  const stalled = allAges.filter((d) => d > 14).length;
  const aging = allAges.filter((d) => d > 7 && d <= 14).length;
  const fresh = allAges.filter((d) => d <= 7).length;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <PageHeader
          title="Kanban Deals"
          description="Visual deal board with WIP limits and age tracking"
          icon={Handshake}
          actions={
            <>
              <div className="hidden md:flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Fresh <span className="font-semibold text-foreground">{fresh}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-muted-foreground">Aging <span className="font-semibold text-foreground">{aging}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Stalled <span className="font-semibold text-foreground">{stalled}</span></span>
                </div>
              </div>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
              </Button>
            </>
          }
        />

        {/* Compact summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Deals</p>
            <p className="text-xl font-bold text-foreground tabular-nums">{totalDeals}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Value</p>
            <p className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(totalValue, { compact: true })}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Needs Attention</p>
            <p className="text-xl font-bold text-destructive tabular-nums">{stalled}</p>
          </div>
        </div>

        {/* Kanban board — simpler, more polished */}
        <div className="overflow-x-auto pb-4 -mx-2 px-2">
          <div className="flex gap-3 min-w-max">
            {BOARD_STAGES.map((stage, stageIdx) => {
              const stageDeals = dealsByStage[stage] || [];
              const limit = WIP_LIMITS[stage];
              const utilization = stageDeals.length / limit;
              const overWip = stageDeals.length > limit;
              const color = STAGE_COLORS[stage];
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);

              return (
                <div
                  key={stage}
                  className="w-[290px] shrink-0 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${stageIdx * 70}ms`, animationFillMode: 'both' }}
                >
                  {/* Stage header with WIP */}
                  <div
                    className="rounded-t-xl p-3 border border-border border-b-0"
                    style={{ background: `color-mix(in oklch, ${color} 6%, var(--card))` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        <span className="text-sm font-semibold text-foreground">{stage}</span>
                      </div>
                      <div className={cn(
                        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border',
                        overWip
                          ? 'bg-destructive/10 text-destructive border-destructive/30'
                          : utilization > 0.75
                          ? 'bg-warning/10 text-warning border-warning/30'
                          : 'bg-secondary text-muted-foreground border-border'
                      )}>
                        {overWip && <AlertCircle className="w-2.5 h-2.5" />}
                        {stageDeals.length}/{limit}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                      <span className="tabular-nums font-semibold text-foreground">{formatCurrency(stageValue, { compact: true })}</span>
                      <span>WIP limit: {limit}</span>
                    </div>
                    {/* WIP utilization bar */}
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, utilization * 100)}%`,
                          background: overWip ? 'var(--destructive)' : utilization > 0.75 ? 'var(--warning)' : color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Cards column */}
                  <div className="bg-secondary/20 border border-border rounded-b-xl p-2 space-y-2 flex-1 min-h-[300px] max-h-[calc(100vh-380px)] overflow-y-auto kanban-scroll">
                    {stageDeals.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-center border-2 border-dashed border-border rounded-lg">
                        <Plus className="w-5 h-5 text-muted-foreground/50 mb-1.5" />
                        <p className="text-[11px] text-muted-foreground">Drop deals here</p>
                      </div>
                    ) : (
                      <>
                        {stageDeals.map((deal, i) => (
                          <KanbanDealCard key={deal.id} deal={deal} index={i} />
                        ))}
                        <button className="w-full py-2 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors flex items-center justify-center gap-1">
                          <Plus className="w-3 h-3" /> Add deal
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age legend */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-medium text-muted-foreground uppercase tracking-wider">Age legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Fresh (≤7d)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">Aging (8–14d)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Stalled (&gt;14d)</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Drag cards to move between stages · Click to view details
          </div>
        </div>

        <style jsx global>{`
          .kanban-scroll::-webkit-scrollbar { width: 5px; }
          .kanban-scroll::-webkit-scrollbar-track { background: transparent; }
          .kanban-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
          .kanban-scroll::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
        `}</style>
      </div>
    </TooltipProvider>
  );
}
