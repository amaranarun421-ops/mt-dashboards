'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { campaignAttribution } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Megaphone, DollarSign, TrendingUp, Target, Calendar, Download,
  ArrowUpRight, ArrowDownRight, Sparkles, Radio,
} from 'lucide-react';

// Channel mix donut data (synthesized from campaign names)
const channelMix = [
  { name: 'Outbound', value: 1240000, color: 'var(--accent)' },
  { name: 'Webinar/Event', value: 680000, color: 'var(--chart-1)' },
  { name: 'Referral', value: 540000, color: 'var(--chart-3)' },
  { name: 'Paid Ads', value: 320000, color: 'var(--chart-4)' },
  { name: 'ABM', value: 410000, color: 'var(--chart-5)' },
];

// Attribution model comparison data
const attributionModels = [
  { model: 'First-touch', revenue: 1482000, color: 'var(--chart-1)' },
  { model: 'Last-touch', revenue: 1282000, color: 'var(--chart-3)' },
  { model: 'Multi-touch (W)', revenue: 1382000, color: 'var(--accent)' },
  { model: 'Linear', revenue: 1348000, color: 'var(--chart-5)' },
];

// Per-campaign details
const enriched = campaignAttribution.map((c, i) => ({
  ...c,
  status: i < 3 ? 'Active' : i < 5 ? 'Paused' : 'Completed',
  costPerDeal: Math.round(c.cost / c.deals),
  channel: ['Outbound', 'Webinar', 'Referral', 'Paid Ads', 'ABM', 'Event'][i] || 'Other',
}));

export default function CampaignAttributionPage() {
  const chartLoaded = useChartLoading(300);

  const totalPipeline = campaignAttribution.reduce((s, c) => s + c.pipeline, 0);
  const totalRevenue = campaignAttribution.reduce((s, c) => s + c.revenue, 0);
  const totalCost = campaignAttribution.reduce((s, c) => s + c.cost, 0);
  const avgROI = Math.round(campaignAttribution.reduce((s, c) => s + c.roi, 0) / campaignAttribution.length);
  const activeCount = enriched.filter((c) => c.status === 'Active').length;

  // Sortable
  const [sortKey, setSortKey] = React.useState<keyof typeof enriched[number]>('roi');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');

  const sortedCampaigns = React.useMemo(() => {
    const list = [...enriched];
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [sortKey, sortDir]);

  const toggleSort = (key: keyof typeof enriched[number]) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const renderSortHeader = (k: keyof typeof enriched[number], label: string, align: 'left' | 'right' | 'center' = 'right') => (
    <th
      key={k}
      className={cn(
        'text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4 cursor-pointer hover:text-foreground transition-colors',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left'
      )}
      onClick={() => toggleSort(k)}
    >
      <span className={cn('inline-flex items-center gap-1', align === 'right' && 'flex-row-reverse')}>
        {label}
        {sortKey === k && (
          <span className="text-accent">
            {sortDir === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </span>
    </th>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaign Attribution"
        description="Measure how marketing campaigns influence pipeline and revenue"
        icon={Megaphone}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> Q2 2025
            </Button>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Pipeline Influenced"
          value={formatCurrency(totalPipeline, { compact: true })}
          delta="+24.8%"
          deltaType="positive"
          icon={Target}
          accentColor="var(--accent)"
          subtext={`${campaignAttribution.length} campaigns`}
          sparkline={[620, 740, 820, 940, 1080, 1240, 1380, 1470]}
          delay={0}
        />
        <KPICard
          title="Revenue Attributed"
          value={formatCurrency(totalRevenue, { compact: true })}
          delta="+18.4%"
          deltaType="positive"
          icon={DollarSign}
          accentColor="var(--chart-1)"
          subtext="Closed-won revenue"
          sparkline={[280, 340, 410, 480, 580, 720, 980, 1280]}
          delay={1}
        />
        <KPICard
          title="Avg ROI"
          value={`${avgROI}%`}
          delta="+12pp"
          deltaType="positive"
          icon={TrendingUp}
          accentColor="var(--chart-3)"
          subtext={`Spend: ${formatCurrency(totalCost, { compact: true })}`}
          sparkline={[420, 580, 720, 880, 1040, 1180, 1280, 1304]}
          delay={2}
        />
        <KPICard
          title="Active Campaigns"
          value={activeCount}
          delta={`+${activeCount - 2}`}
          deltaType="positive"
          icon={Radio}
          accentColor="var(--chart-5)"
          subtext={`of ${campaignAttribution.length} total`}
          sparkline={[2, 3, 3, 4, 4, 5, 5, 6]}
          delay={3}
        />
      </div>

      {/* Top row: table + charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Campaign performance table */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Campaign performance</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Click headers to sort · {sortedCampaigns.length} campaigns</p>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[460px] overflow-y-auto custom-scroll">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-secondary/95 backdrop-blur z-10">
                <tr className="border-b border-border">
                  {renderSortHeader('campaign', 'Campaign', 'left')}
                  {renderSortHeader('deals', 'Deals')}
                  {renderSortHeader('pipeline', 'Pipeline')}
                  {renderSortHeader('revenue', 'Revenue')}
                  {renderSortHeader('cost', 'Cost')}
                  {renderSortHeader('roi', 'ROI')}
                  <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedCampaigns.map((c, i) => {
                  const roiColor = c.roi >= 1000 ? 'var(--success)' : c.roi >= 500 ? 'var(--accent)' : c.roi >= 200 ? 'var(--warning)' : 'var(--destructive)';
                  const statusColor = c.status === 'Active' ? 'var(--success)' : c.status === 'Paused' ? 'var(--warning)' : 'var(--muted-foreground)';
                  return (
                    <tr
                      key={c.campaign}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: roiColor }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate max-w-[200px]">{c.campaign}</p>
                            <p className="text-[10px] text-muted-foreground">{c.channel}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{c.deals}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(c.pipeline, { compact: true })}</td>
                      <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">{formatCurrency(c.revenue, { compact: true })}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(c.cost, { compact: true })}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold tabular-nums"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${roiColor} 12%, transparent)`,
                            color: roiColor,
                          }}
                        >
                          {c.roi}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${statusColor} 12%, transparent)`,
                            color: statusColor,
                            borderColor: `color-mix(in oklch, ${statusColor} 25%, transparent)`,
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: ROI bar + channel donut */}
        <div className="lg:col-span-2 space-y-4">
          <ChartCard
            title="ROI by Campaign"
            description="Return on investment"
            height={240}
          >
            <div className={cn('h-[160px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enriched} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="campaign" axisLine={false} tickLine={false} tick={{ ...AXIS_TICK_STYLE, fontSize: 9 }} width={110} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v) => [`${v}%`, 'ROI']}
                  />
                  <Bar dataKey="roi" radius={[0, 4, 4, 0]} barSize={14}>
                    {enriched.map((c, i) => {
                      const color = c.roi >= 1000 ? 'var(--success)' : c.roi >= 500 ? 'var(--accent)' : c.roi >= 200 ? 'var(--warning)' : 'var(--destructive)';
                      return <Cell key={i} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Channel Mix"
            description="Pipeline by channel"
            height={240}
          >
            <div className="relative h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {channelMix.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE}
                    formatter={(v, name) => [formatK(Number(v)), String(name)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Pipeline</span>
                <span className="text-base font-bold text-foreground tabular-nums">{formatCurrency(totalPipeline, { compact: true })}</span>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {channelMix.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: c.color }} />
                  <span className="text-muted-foreground truncate flex-1">{c.name}</span>
                  <span className="font-semibold text-foreground tabular-nums">{formatCurrency(c.value, { compact: true })}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Attribution model comparison */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Attribution model comparison</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Same campaigns, different revenue attribution</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {attributionModels.map((m, i) => {
            const maxRev = Math.max(...attributionModels.map((x) => x.revenue));
            const widthPct = (m.revenue / maxRev) * 100;
            const isRecommended = m.model === 'Multi-touch (W)';
            return (
              <div
                key={m.model}
                className={cn(
                  'relative bg-secondary/40 border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-500',
                  isRecommended ? 'border-accent/40 bg-accent/5' : 'border-border'
                )}
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                {isRecommended && (
                  <span className="absolute -top-2 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[9px] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5" /> Recommended
                  </span>
                )}
                <p className="text-xs font-semibold text-foreground mb-1">{m.model}</p>
                <p className="text-xl font-bold text-foreground tabular-nums">{formatCurrency(m.revenue, { compact: true })}</p>
                <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: chartLoaded ? `${widthPct}%` : '0%',
                      transitionDelay: `${i * 100}ms`,
                      background: `linear-gradient(90deg, ${m.color}, color-mix(in oklch, ${m.color} 70%, transparent))`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {Math.round((m.revenue / totalRevenue) * 100)}% of attributed revenue
                </p>
              </div>
            );
          })}
        </div>

        <div className="px-5 pb-5">
          <div className="bg-gradient-to-r from-accent/8 via-transparent to-chart-1/8 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-accent/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Multi-touch attribution insights</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  The multi-touch (W-shaped) model credits 30% to first-touch, 30% to lead conversion, and 30% to opportunity creation, with the remaining 10% distributed evenly.
                  It shows {formatCurrency(attributionModels[2].revenue - attributionModels[1].revenue, { compact: true })} more revenue than last-touch, indicating mid-funnel campaigns are undervalued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: var(--secondary); }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }
      `}</style>
    </div>
  );
}
