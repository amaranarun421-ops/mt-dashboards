'use client';

import * as React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, StatusBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { reports, conversionData, sourceData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart3, Plus, Search, FileText, TrendingUp, Filter, DollarSign,
  Download, Clock, MoreHorizontal, FileBarChart, PieChart as PieIcon,
  Calendar, ChevronRight,
} from 'lucide-react';

const TYPE_ICONS: Record<string, React.ElementType> = {
  Sales: DollarSign,
  Performance: TrendingUp,
  Forecast: TrendingUp,
  Team: BarChart3,
  Marketing: PieIcon,
  Customer: FileBarChart,
};

const TYPE_COLORS: Record<string, string> = {
  Sales: 'var(--accent)',
  Performance: 'var(--chart-1)',
  Forecast: 'var(--chart-3)',
  Team: 'var(--chart-2)',
  Marketing: 'var(--chart-4)',
  Customer: 'var(--chart-5)',
};

const CATEGORIES = ['All', 'Sales', 'Performance', 'Forecast', 'Team', 'Marketing', 'Customer'];

const quickAccess = [
  { id: 'qa1', title: 'Sales Summary', description: 'Period revenue, deals & attainment', icon: DollarSign, color: 'var(--accent)', count: 24 },
  { id: 'qa2', title: 'Conversion Rates', description: 'Funnel velocity by stage', icon: TrendingUp, color: 'var(--chart-1)', count: 18 },
  { id: 'qa3', title: 'Lead Sources', description: 'Attribution by channel', icon: PieIcon, color: 'var(--chart-3)', count: 12 },
  { id: 'qa4', title: 'Forecast', description: 'Quarterly projections & scenarios', icon: FileBarChart, color: 'var(--chart-5)', count: 9 },
];

export default function ReportsPage() {
  const chartLoaded = useChartLoading(300);
  const [category, setCategory] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    return reports.filter((r) => {
      const catMatch = category === 'All' || r.type === category;
      const q = search.toLowerCase().trim();
      const qMatch = !q || r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [category, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, manage, and share sales operation reports"
        icon={BarChart3}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> Last 30 days
            </Button>
            <Button size="sm">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Generate report
            </Button>
          </>
        }
      />

      {/* Quick-access report type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccess.map((qa, i) => (
          <button
            key={qa.id}
            onClick={() => setCategory(qa.title.split(' ')[0])}
            className="group relative bg-card border border-border rounded-xl p-5 text-left hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `color-mix(in oklch, ${qa.color} 12%, transparent)` }}
              >
                <qa.icon className="w-5 h-5" style={{ color: qa.color }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                {qa.count} saved
              </span>
            </div>
            <h3 className="relative text-sm font-semibold text-foreground mt-4">{qa.title}</h3>
            <p className="relative text-xs text-muted-foreground mt-1 leading-relaxed">{qa.description}</p>
            <div className="relative flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className="text-[11px] text-accent font-medium flex items-center gap-1">
                Open builder <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Mid row: conversion trend + lead sources pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Conversion Rate Trend"
          description="Lead-to-customer conversion % over the last 12 months"
          className="lg:col-span-2"
          height={340}
          legend={[{ label: 'Conversion %', color: 'var(--accent)' }]}
          trendBadge={{ value: '+8.2pp', type: 'positive' }}
        >
          <div className={cn('h-[230px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `${v}%`} dx={-10} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  formatter={(v) => [`${v}%`, 'Conversion']}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--accent)"
                  strokeWidth={2.5}
                  fill="url(#convGrad)"
                  dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Lead Sources"
          description="Distribution by channel"
          height={340}
        >
          <div className="relative h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  stroke="none"
                >
                  {sourceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, name) => [`${v}%`, String(name)]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Sources</span>
              <span className="text-xl font-bold text-foreground tabular-nums">{sourceData.length}</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-muted-foreground flex-1">{s.name}</span>
                <span className="font-semibold text-foreground tabular-nums">{s.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent reports table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Recent reports</h3>
            <span className="text-[11px] text-muted-foreground">({filtered.length})</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search reports…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-44 h-8 bg-secondary border-border text-xs"
              />
            </div>
            <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    'px-2.5 py-1 text-[11px] font-medium rounded transition-colors',
                    category === c
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[480px] overflow-y-auto custom-scroll">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-secondary/95 backdrop-blur z-10">
              <tr className="border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Name</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Type</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Owner</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Date</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Status</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Size</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const Icon = TYPE_ICONS[r.type] || FileText;
                const color = TYPE_COLORS[r.type] || 'var(--accent)';
                return (
                  <tr
                    key={r.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors group animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${Math.min(i, 8) * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{r.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{r.id.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                          color: color,
                          borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                        }}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground">{r.owner}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{r.date}</td>
                    <td className="py-3 px-4">
                      {r.status === 'ready' ? (
                        <StatusBadge status="success" label="Ready" />
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-warning/30 bg-warning/15 text-warning text-[11px] font-medium">
                          <Clock className="w-3 h-3 animate-pulse" /> Generating
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{r.size}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={r.status !== 'ready'}
                          className="text-accent hover:text-accent"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
