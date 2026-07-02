'use client';

import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { DataTable, type Column } from '@/components/tables/data-table';
import {
  useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE,
} from '@/components/charts/chart-helpers';
import { deals, STAGE_COLORS, reps, type Stage } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Layers, TrendingUp, Activity, ListChecks, BookOpen, AlertTriangle,
  CheckCircle2, Clock, Info, ArrowUpRight,
} from 'lucide-react';

// ----- derived data -----
const FORECAST_STAGES: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation'];

function categorize(stage: Stage): 'committed' | 'bestCase' | 'pipeline' {
  if (stage === 'Negotiation') return 'committed';
  if (stage === 'Proposal') return 'bestCase';
  return 'pipeline';
}

// Build stacked stage breakdown — each stage's value decomposed into commit/bestCase/pipeline buckets
const STAGE_BREAKDOWN = FORECAST_STAGES.map((stage) => {
  const stageDeals = deals.filter((d) => d.stage === stage);
  const committed = stageDeals
    .filter((d) => categorize(d.stage) === 'committed')
    .reduce((s, d) => s + d.value, 0);
  const bestCase = stageDeals
    .filter((d) => categorize(d.stage) === 'bestCase')
    .reduce((s, d) => s + d.value, 0);
  const pipeline = stageDeals
    .filter((d) => categorize(d.stage) === 'pipeline')
    .reduce((s, d) => s + d.value, 0);
  return {
    stage,
    color: STAGE_COLORS[stage],
    committed,
    bestCase,
    pipeline,
    total: committed + bestCase + pipeline,
    deals: stageDeals.length,
  };
});

// 6-month accuracy trend: predicted vs actual
const ACCURACY_TREND = [
  { month: 'Jan', predicted: 410, actual: 420, accuracy: 97 },
  { month: 'Feb', predicted: 465, actual: 480, accuracy: 96 },
  { month: 'Mar', predicted: 495, actual: 510, accuracy: 97 },
  { month: 'Apr', predicted: 525, actual: 485, accuracy: 92 },
  { month: 'May', predicted: 555, actual: 560, accuracy: 99 },
  { month: 'Jun', predicted: 600, actual: 620, accuracy: 96 },
];

// Commit list — deals in Negotiation + Proposal + Discovery (weighted forecast)
const COMMIT_LIST = deals
  .filter((d) => ['Negotiation', 'Proposal', 'Discovery'].includes(d.stage))
  .map((d) => {
    const rep = reps.find((r) => r.id === d.ownerId);
    const flags: string[] = [];
    if (d.riskScore > 30) flags.push('High Risk');
    if (d.daysInStage > 14) flags.push('Stalled');
    if (d.probability < 50) flags.push('Low Probability');
    return {
      ...d,
      ownerInitials: rep?.initials ?? d.ownerInitials,
      ownerColor: rep?.avatarColor ?? 'var(--accent)',
      category: categorize(d.stage),
      weighted: Math.round(d.value * (d.probability / 100)),
      flags,
    };
  })
  .sort((a, b) => b.weighted - a.weighted);

type CommitRow = (typeof COMMIT_LIST)[number];

const PERIODS = [
  { value: 'q2-2025', label: 'Q2 2025 (Apr – Jun)' },
  { value: 'q3-2025', label: 'Q3 2025 (Jul – Sep)' },
  { value: 'q4-2025', label: 'Q4 2025 (Oct – Dec)' },
];

const METHODOLOGY_STEPS = [
  {
    icon: Layers,
    title: 'Stage Weighting',
    description: 'Each open deal is multiplied by its stage-based probability (Lead 10%, Qualified 25%, Discovery 40%, Proposal 60%, Negotiation 80%).',
    color: 'var(--chart-1)',
  },
  {
    icon: TrendingUp,
    title: 'Historical Adjustment',
    description: 'Stage probabilities are adjusted by rep win rate and historical close-rate by source.',
    color: 'var(--chart-3)',
  },
  {
    icon: Activity,
    title: 'Pipeline Categorization',
    description: 'Negotiation = Committed, Proposal = Best Case, Lead/Qualified/Discovery = Pipeline. Weighted value drives the model.',
    color: 'var(--accent)',
  },
  {
    icon: ListChecks,
    title: 'Risk Adjustment',
    description: 'Deals with risk score > 30 or days-in-stage > 14 receive a 15–25% forecast penalty.',
    color: 'var(--destructive)',
  },
];

const CATEGORY_COLOR: Record<string, string> = {
  committed: 'var(--accent)',
  bestCase: 'var(--chart-3)',
  pipeline: 'var(--chart-1)',
};

const CATEGORY_LABEL: Record<string, string> = {
  committed: 'Committed',
  bestCase: 'Best Case',
  pipeline: 'Pipeline',
};

export default function ForecastDetailsPage() {
  const chartLoaded = useChartLoading(300);
  const [period, setPeriod] = React.useState('q3-2025');

  const totalCommitted = STAGE_BREAKDOWN.reduce((s, x) => s + x.committed, 0);
  const totalBestCase = STAGE_BREAKDOWN.reduce((s, x) => s + x.bestCase, 0);
  const totalPipeline = STAGE_BREAKDOWN.reduce((s, x) => s + x.pipeline, 0);
  const grandTotal = totalCommitted + totalBestCase + totalPipeline;

  const columns: Column<CommitRow>[] = [
    {
      key: 'deal',
      header: 'Deal',
      sortable: true,
      sortAccessor: (d) => d.name,
      cell: (d) => (
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{d.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{d.account}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      sortAccessor: (d) => d.category,
      cell: (d) => (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border"
          style={{
            backgroundColor: `color-mix(in oklch, ${CATEGORY_COLOR[d.category]} 12%, transparent)`,
            color: CATEGORY_COLOR[d.category],
            borderColor: `color-mix(in oklch, ${CATEGORY_COLOR[d.category]} 30%, transparent)`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLOR[d.category] }} />
          {CATEGORY_LABEL[d.category]}
        </span>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      cell: (d) => <StageBadge stage={d.stage} color={STAGE_COLORS[d.stage]} />,
    },
    {
      key: 'value',
      header: 'Value',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.value,
      cell: (d) => <span className="tabular-nums font-semibold text-foreground">{formatCurrency(d.value, { compact: true })}</span>,
    },
    {
      key: 'probability',
      header: 'Probability',
      align: 'center',
      cell: (d) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${d.probability}%`,
                background: d.probability >= 70 ? 'var(--success)' : d.probability >= 50 ? 'var(--warning)' : 'var(--destructive)',
              }}
            />
          </div>
          <span className="text-xs tabular-nums text-muted-foreground w-8">{d.probability}%</span>
        </div>
      ),
    },
    {
      key: 'weighted',
      header: 'Weighted',
      sortable: true,
      align: 'right',
      sortAccessor: (d) => d.weighted,
      cell: (d) => <span className="tabular-nums text-foreground font-medium">{formatCurrency(d.weighted, { compact: true })}</span>,
    },
    {
      key: 'owner',
      header: 'Owner',
      cell: (d) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={d.ownerInitials} size="sm" color={d.ownerColor} />
          <span className="text-xs text-muted-foreground hidden sm:inline">{d.owner}</span>
        </div>
      ),
    },
    {
      key: 'flags',
      header: 'Flags',
      cell: (d) =>
        d.flags.length === 0 ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-success">
            <CheckCircle2 className="w-3 h-3" /> Clean
          </span>
        ) : (
          <div className="flex flex-wrap gap-1 justify-end">
            {d.flags.map((f) => {
              const isHigh = f === 'High Risk';
              const isStalled = f === 'Stalled';
              return (
                <span
                  key={f}
                  className={cn(
                    'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border',
                    isHigh && 'bg-destructive/10 text-destructive border-destructive/30',
                    isStalled && 'bg-warning/10 text-warning border-warning/30',
                    !isHigh && !isStalled && 'bg-secondary text-muted-foreground border-border'
                  )}
                >
                  {isHigh && <AlertTriangle className="w-2.5 h-2.5" />}
                  {isStalled && <Clock className="w-2.5 h-2.5" />}
                  {f}
                </span>
              );
            })}
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Forecast Details"
        description="Deep-dive into weighted forecast methodology and deal-level commit list"
        icon={Layers}
        actions={
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[210px] bg-card border-border h-9">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {/* Top: weighted forecast breakdown — horizontal stacked bars per stage */}
      <ChartCard
        title="Weighted Forecast by Stage"
        description="Each stage's contribution split by commit / best case / pipeline buckets"
        height="auto"
        legend={[
          { label: 'Committed', color: 'var(--accent)' },
          { label: 'Best Case', color: 'var(--chart-3)' },
          { label: 'Pipeline', color: 'var(--chart-1)' },
        ]}
      >
        <div className="space-y-4 pt-2">
          {STAGE_BREAKDOWN.map((s, i) => {
            const maxTotal = Math.max(...STAGE_BREAKDOWN.map((x) => x.total));
            return (
              <div
                key={s.stage}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm font-semibold text-foreground">{s.stage}</span>
                    <span className="text-[11px] text-muted-foreground">· {s.deals} deals</span>
                  </div>
                  <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(s.total, { compact: true })}</span>
                </div>
                <div className="h-7 bg-secondary rounded-md overflow-hidden flex">
                  {s.committed > 0 && (
                    <div
                      className="h-full transition-all duration-1000 ease-out flex items-center justify-center"
                      style={{
                        width: chartLoaded ? `${(s.committed / maxTotal) * 100}%` : '0%',
                        transitionDelay: `${i * 80 + 200}ms`,
                        background: 'var(--accent)',
                      }}
                      title={`Committed: ${formatCurrency(s.committed, { compact: true })}`}
                    >
                      {s.committed / maxTotal > 0.15 && (
                        <span className="text-[10px] font-semibold text-accent-foreground px-1.5 truncate">
                          {formatCurrency(s.committed, { compact: true })}
                        </span>
                      )}
                    </div>
                  )}
                  {s.bestCase > 0 && (
                    <div
                      className="h-full transition-all duration-1000 ease-out flex items-center justify-center"
                      style={{
                        width: chartLoaded ? `${(s.bestCase / maxTotal) * 100}%` : '0%',
                        transitionDelay: `${i * 80 + 350}ms`,
                        background: 'var(--chart-3)',
                      }}
                      title={`Best Case: ${formatCurrency(s.bestCase, { compact: true })}`}
                    >
                      {s.bestCase / maxTotal > 0.15 && (
                        <span className="text-[10px] font-semibold text-foreground px-1.5 truncate">
                          {formatCurrency(s.bestCase, { compact: true })}
                        </span>
                      )}
                    </div>
                  )}
                  {s.pipeline > 0 && (
                    <div
                      className="h-full transition-all duration-1000 ease-out flex items-center justify-center"
                      style={{
                        width: chartLoaded ? `${(s.pipeline / maxTotal) * 100}%` : '0%',
                        transitionDelay: `${i * 80 + 500}ms`,
                        background: 'var(--chart-1)',
                      }}
                      title={`Pipeline: ${formatCurrency(s.pipeline, { compact: true })}`}
                    >
                      {s.pipeline / maxTotal > 0.15 && (
                        <span className="text-[10px] font-semibold text-foreground px-1.5 truncate">
                          {formatCurrency(s.pipeline, { compact: true })}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Totals */}
        <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Committed</p>
            <p className="text-base font-bold text-foreground tabular-nums">{formatCurrency(totalCommitted, { compact: true })}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Best Case</p>
            <p className="text-base font-bold text-foreground tabular-nums">{formatCurrency(totalBestCase, { compact: true })}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pipeline</p>
            <p className="text-base font-bold text-foreground tabular-nums">{formatCurrency(totalPipeline, { compact: true })}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Forecast</p>
            <p className="text-base font-bold text-accent tabular-nums">{formatCurrency(grandTotal, { compact: true })}</p>
          </div>
        </div>
      </ChartCard>

      {/* Mid: accuracy trend */}
      <ChartCard
        title="Forecast Accuracy Trend"
        description="Predicted vs actual revenue — last 6 months"
        height={340}
        legend={[
          { label: 'Predicted', color: 'var(--chart-3)' },
          { label: 'Actual', color: 'var(--accent)' },
          { label: 'Accuracy %', color: 'var(--chart-1)' },
        ]}
        trendBadge={{ value: 'Avg 96%', type: 'positive' }}
      >
        <div className={cn('h-[260px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ACCURACY_TREND} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v}k`} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} domain={[80, 100]} tickFormatter={(v) => `${v}%`} dx={10} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                formatter={(v, name) => {
                  if (name === 'Accuracy') return [`${v}%`, String(name)];
                  return [`$${Number(v)}k`, String(name)];
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="predicted" stroke="var(--chart-3)" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3, fill: 'var(--chart-3)' }} />
              <Line yAxisId="left" type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--accent)' }} activeDot={{ r: 5 }} />
              <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="var(--chart-1)" strokeWidth={1.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Deal-by-deal commit list + methodology card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard
            title="Deal-by-Deal Commit List"
            description={`${COMMIT_LIST.length} deals in current forecast — sorted by weighted value`}
            height="auto"
            actions={
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                <ListChecks className="w-3.5 h-3.5 mr-1" /> Export
              </Button>
            }
          >
            <DataTable
              data={COMMIT_LIST}
              columns={columns}
              getRowId={(d) => d.id}
              searchable
              searchKeys={['name', 'account', 'owner']}
              searchPlaceholder="Search deals…"
              selectable={false}
              pageSize={8}
              initialSort={{ key: 'weighted', dir: 'desc' }}
              exportFilename="forecast-commit-list.csv"
            />
          </ChartCard>
        </div>

        {/* Methodology card */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Forecast Methodology</h3>
                  <p className="text-[11px] text-muted-foreground">How the model calculates commit</p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {METHODOLOGY_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `color-mix(in oklch, ${step.color} 14%, transparent)` }}
                    >
                      <step.icon className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                    {i < METHODOLOGY_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: '14px' }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inline info callout */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-start gap-2.5 bg-secondary/50 rounded-lg p-3 border border-border">
                <Info className="w-4 h-4 text-chart-1 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-foreground mb-0.5">AI Forecast Confidence</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Model confidence is <span className="text-accent font-semibold">94%</span> for Q3 forecast based on 6-month rolling accuracy and stable pipeline composition.
                  </p>
                </div>
              </div>
            </div>

            {/* Formula card */}
            <div className="mt-3 bg-secondary/40 border border-border rounded-lg p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Forecast Formula</p>
              <code className="text-[11px] text-foreground font-mono leading-relaxed block">
                Σ(deal.value × stage_weight × rep_factor) − risk_penalty
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
