'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { funnelData, stageConversion } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Filter, Download, Sparkles, TrendingDown, Clock, Zap, Lightbulb, ArrowRight } from 'lucide-react';

// Build funnel geometry — each stage centered horizontally with decreasing width
function FunnelStage({ stage, idx, total }: { stage: typeof funnelData[number]; idx: number; total: number }) {
  const maxValue = funnelData[0].value;
  const widthPct = (stage.value / maxValue) * 100;
  const prevValue = idx > 0 ? funnelData[idx - 1].value : stage.value;
  const convRate = idx === 0 ? 100 : Math.round((stage.value / prevValue) * 100);
  const dropoff = idx === 0 ? 0 : prevValue - stage.value;

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{stage.stage}</span>
          <span className="text-[11px] text-muted-foreground">{stage.value.toLocaleString()} leads</span>
        </div>
        {idx > 0 && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-muted-foreground">
              <span className="text-success font-semibold">{convRate}%</span> conv
            </span>
            <span className="text-destructive">−{dropoff.toLocaleString()}</span>
          </div>
        )}
      </div>
      <div className="relative h-12 bg-secondary/40 rounded-lg overflow-hidden">
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out flex items-center justify-center"
          style={{
            width: `${widthPct}%`,
            background: `linear-gradient(135deg, ${stage.color}, color-mix(in oklch, ${stage.color} 70%, transparent))`,
            transitionDelay: `${idx * 150}ms`,
            clipPath: idx < total - 1 ? 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <span className="text-xs font-bold text-white drop-shadow">{stage.value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// Stage-by-stage drop-off analysis
const dropoffAnalysis = stageConversion.map((s, i) => {
  const dropped = s.entered - s.converted;
  const avgTime = [12, 8, 14, 21, 18][i] || 0;
  return { ...s, dropped, avgTime };
});

const insights = [
  {
    icon: TrendingDown,
    color: 'var(--destructive)',
    title: 'Discovery → Proposal drop-off is high',
    description: '51% of opportunities are lost between Discovery and Proposal. Recommend tighter qualification criteria.',
    action: 'View playbook',
  },
  {
    icon: Zap,
    color: 'var(--accent)',
    title: 'Negotiation stage converts well',
    description: '71% conversion at Negotiation is above benchmark. Reps are closing effectively once pricing is agreed.',
    action: 'See rep breakdown',
  },
  {
    icon: Clock,
    color: 'var(--warning)',
    title: 'Avg time in Proposal is 21 days',
    description: 'Proposals sitting for 3+ weeks. Implement a 14-day follow-up SLA to accelerate velocity.',
    action: 'Set SLA rule',
  },
  {
    icon: Lightbulb,
    color: 'var(--chart-1)',
    title: 'Lead → Qualified is healthy',
    description: '62% conversion at top of funnel. Marketing-driven lead quality has improved 18% this quarter.',
    action: 'View sources',
  },
];

export default function FunnelAnalyticsPage() {
  const chartLoaded = useChartLoading(300);

  const totalLeads = funnelData[0].value;
  const totalWon = funnelData[funnelData.length - 1].value;
  const overallConv = Math.round((totalWon / totalLeads) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Funnel Analytics"
        description="Track conversion through every stage of your sales pipeline"
        icon={Filter}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              Last 90 days
            </Button>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* Top funnel visualization + summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-foreground">Pipeline Funnel</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Stage-by-stage conversion with drop-off</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Overall conversion</p>
              <p className="text-xl font-bold text-accent tabular-nums">{overallConv}%</p>
            </div>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {funnelData.map((stage, idx) => (
              <FunnelStage key={stage.stage} stage={stage} idx={idx} total={funnelData.length} />
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Top of funnel</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{totalLeads.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Bottom of funnel</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{totalWon.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg drop per stage</p>
              <p className="text-lg font-bold text-foreground tabular-nums">
                {Math.round((totalLeads - totalWon) / (funnelData.length - 1)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right summary panel */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Funnel health</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Conversion rate</span>
                  <span className="font-semibold text-foreground tabular-nums">{overallConv}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: chartLoaded ? `${overallConv}%` : '0%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Velocity (deals/wk)</span>
                  <span className="font-semibold text-foreground tabular-nums">18</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1 rounded-full transition-all duration-1000" style={{ width: chartLoaded ? '72%' : '0%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Bottleneck stage</span>
                  <span className="font-semibold text-warning">Discovery</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full transition-all duration-1000" style={{ width: chartLoaded ? '49%' : '0%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Top drop-off stages</h3>
            <div className="space-y-2">
              {dropoffAnalysis
                .slice()
                .sort((a, b) => b.dropped - a.dropped)
                .slice(0, 3)
                .map((s, i) => (
                  <div key={s.stage} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
                    <div className="w-7 h-7 rounded-md bg-destructive/15 flex items-center justify-center shrink-0">
                      <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{s.stage}</p>
                      <p className="text-[10px] text-muted-foreground">{s.dropped.toLocaleString()} dropped · {100 - s.rate}% loss</p>
                    </div>
                    <span className="text-xs font-bold text-destructive tabular-nums">−{s.dropped}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stage conversion bar chart */}
      <ChartCard
        title="Stage Conversion Rates"
        description="Conversion % by stage from entered to converted"
        height={340}
        trendBadge={{ value: '+4pp vs Q1', type: 'positive' }}
      >
        <div className={cn('h-[240px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageConversion} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="convBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `${v}%`} dx={-10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v, _name, props) => {
                  const item = props?.payload;
                  return [`${v}% converted (${item?.converted} of ${item?.entered})`, 'Conversion'];
                }}
              />
              <Bar dataKey="rate" radius={[6, 6, 0, 0]} barSize={48}>
                {stageConversion.map((s, i) => (
                  <Cell
                    key={s.stage}
                    fill={s.rate >= 65 ? 'var(--success)' : s.rate >= 55 ? 'var(--accent)' : 'var(--warning)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Bottom: drop-off analysis + insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Stage-by-stage drop-off analysis</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Entered vs converted vs dropped with avg time</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Stage</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Entered</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Converted</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Dropped</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Conv %</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {dropoffAnalysis.map((s, i) => (
                  <tr
                    key={s.stage}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: funnelData[i]?.color || 'var(--accent)' }} />
                        <span className="font-medium text-foreground">{s.stage}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{s.entered.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-success tabular-nums font-medium">{s.converted.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-destructive tabular-nums">{s.dropped.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tabular-nums',
                        s.rate >= 65 ? 'bg-success/15 text-success' : s.rate >= 55 ? 'bg-accent/15 text-accent' : 'bg-warning/15 text-warning'
                      )}>
                        {s.rate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{s.avgTime}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="lg:col-span-2 bg-gradient-to-br from-accent/5 via-transparent to-chart-1/5 border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Funnel insights</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">AI</span>
          </div>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div
                key={ins.title}
                className="bg-card/80 border border-border rounded-lg p-3 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `color-mix(in oklch, ${ins.color} 12%, transparent)` }}
                  >
                    <ins.icon className="w-3.5 h-3.5" style={{ color: ins.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{ins.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{ins.description}</p>
                    <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline">
                      {ins.action} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
