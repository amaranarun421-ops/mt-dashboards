'use client';

import * as React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { ChartCard } from '@/components/common/chart-card';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE } from '@/components/charts/chart-helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { integrations } from '@/lib/data';
import {
  Plug, Plus, RefreshCw, CheckCircle2, ArrowRight, Sparkles,
  Search, Zap, Database, Activity, AlertCircle, Clock,
} from 'lucide-react';

const CATEGORIES = ['All', 'CRM', 'Email', 'Communication', 'Calendar', 'Video', 'Data', 'Billing', 'Support'];

const CATEGORY_COLOR: Record<string, string> = {
  CRM: 'var(--accent)',
  Email: 'var(--chart-1)',
  Communication: 'var(--chart-3)',
  Calendar: 'var(--chart-2)',
  Video: 'var(--chart-5)',
  Data: 'var(--chart-4)',
  Billing: 'var(--warning)',
  Support: 'var(--chart-3)',
};

const SYNC_HEALTH = [
  { day: 'Mon', success: 248, failed: 4 },
  { day: 'Tue', success: 312, failed: 1 },
  { day: 'Wed', success: 287, failed: 8 },
  { day: 'Thu', success: 341, failed: 0 },
  { day: 'Fri', success: 398, failed: 3 },
  { day: 'Sat', success: 124, failed: 2 },
  { day: 'Sun', success: 86, failed: 0 },
];

const RECENTLY_ADDED = [
  { name: 'Stripe Billing', category: 'Billing', addedAt: '2 days ago', logo: 'ST', color: 'oklch(0.7 0.18 220)', description: 'Subscription billing + usage tracking' },
  { name: 'Segment CDP', category: 'Data', addedAt: '5 days ago', logo: 'SG', color: 'oklch(0.7 0.18 145)', description: 'Unified customer data pipeline' },
  { name: 'Zoom Video', category: 'Video', addedAt: '1 week ago', logo: 'ZM', color: 'oklch(0.6 0.18 220)', description: 'Recorded meetings auto-transcribed' },
  { name: 'Outlook Mail', category: 'Email', addedAt: '2 weeks ago', logo: 'OL', color: 'oklch(0.6 0.18 220)', description: 'Microsoft 365 email + calendar' },
];

function StatCard({
  label, value, delta, deltaType, icon: Icon, color, delay,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  const deltaColor =
    deltaType === 'positive' ? 'text-success' : deltaType === 'negative' ? 'text-destructive' : 'text-muted-foreground';
  return (
    <div
      className="relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-start justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <p className="relative text-2xl lg:text-3xl font-bold text-foreground tabular-nums">{value}</p>
      {delta && (
        <p className={cn('relative text-xs mt-1.5 font-medium', deltaColor)}>{delta}</p>
      )}
    </div>
  );
}

export default function IntegrationsPage() {
  const chartLoaded = useChartLoading(300);
  const [category, setCategory] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [syncing, setSyncing] = React.useState<Record<string, boolean>>({});

  const filtered = React.useMemo(() => {
    return integrations.filter((i) => {
      const catMatch = category === 'All' || i.category === category;
      const q = search.toLowerCase().trim();
      const qMatch = !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [category, search]);

  const connectedCount = integrations.filter((i) => i.connected).length;
  const availableCount = integrations.length - connectedCount;
  const syncErrors = 3;
  const dataSyncedToday = 1284;

  const handleSync = (id: string) => {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSyncing((prev) => ({ ...prev, [id]: false })), 2200);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect Pipeline Pilot to your sales stack and keep data in sync"
        icon={Plug}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Search className="w-3.5 h-3.5 mr-1.5" /> Browse marketplace
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Custom integration
            </Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Connected" value={connectedCount.toString()} delta="+2 this week" deltaType="positive" icon={CheckCircle2} color="var(--success)" delay={0} />
        <StatCard label="Available" value={availableCount.toString()} delta="Browse marketplace" deltaType="neutral" icon={Plug} color="var(--accent)" delay={1} />
        <StatCard label="Sync Errors" value={syncErrors.toString()} delta="2 need attention" deltaType="negative" icon={AlertCircle} color="var(--destructive)" delay={2} />
        <StatCard label="Data Synced Today" value={dataSyncedToday.toLocaleString()} delta="+18% vs yesterday" deltaType="positive" icon={Database} color="var(--chart-3)" delay={3} />
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 overflow-x-auto">
        {CATEGORIES.map((c) => {
          const isActive = category === c;
          const color = c === 'All' ? 'var(--accent)' : CATEGORY_COLOR[c];
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
              style={isActive ? { color } : undefined}
            >
              {c !== 'All' && <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />}
              {c}
            </button>
          );
        })}
      </div>

      {/* Main: integration cards grid + right sync health */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Integration cards grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((i, idx) => {
              const catColor = CATEGORY_COLOR[i.category] || 'var(--accent)';
              const isSyncing = syncing[i.id];
              return (
                <div
                  key={i.id}
                  className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md transition-transform group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${i.color}, color-mix(in oklch, ${i.color} 70%, transparent))` }}
                    >
                      {i.logo}
                    </div>
                    {i.connected ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-success/30 bg-success/10 text-success">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-border bg-secondary text-muted-foreground">
                        Available
                      </span>
                    )}
                  </div>

                  <div className="relative mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{i.name}</h3>
                    </div>
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${catColor} 10%, transparent)`,
                        color: catColor,
                        borderColor: `color-mix(in oklch, ${catColor} 25%, transparent)`,
                      }}
                    >
                      {i.category}
                    </span>
                  </div>

                  <p className="relative text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                    {i.description}
                  </p>

                  {i.connected && (
                    <div className="relative flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      Last sync: <span className="text-foreground font-medium">{i.lastSync}</span>
                    </div>
                  )}

                  <div className="relative flex items-center gap-2 pt-3 border-t border-border">
                    {i.connected ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs bg-card border-border flex-1"
                          disabled={isSyncing}
                          onClick={() => handleSync(i.id)}
                        >
                          <RefreshCw className={cn('w-3 h-3 mr-1', isSyncing && 'animate-spin')} />
                          {isSyncing ? 'Syncing…' : 'Sync now'}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                        onClick={() => handleSync(i.id)}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recently added list */}
          <div className="mt-6 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Recently added</h3>
              </div>
              <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto -mx-5 px-5 pb-1">
              <div className="flex gap-3 min-w-max">
                {RECENTLY_ADDED.map((r, i) => {
                  const color = CATEGORY_COLOR[r.category] || 'var(--accent)';
                  return (
                    <div
                      key={r.name}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-accent/30 transition-all min-w-[280px] animate-in fade-in slide-in-from-bottom-2 duration-500"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-[10px] shrink-0"
                        style={{ background: r.color }}
                      >
                        {r.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-foreground truncate">{r.name}</p>
                          <span
                            className="text-[9px] px-1 py-0.5 rounded font-medium border"
                            style={{
                              backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                              color: color,
                              borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                            }}
                          >
                            {r.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">{r.description}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">Added {r.addedAt}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-accent shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sync health summary */}
        <div className="space-y-4">
          <ChartCard
            title="Sync Health"
            description="Successful syncs · last 7 days"
            height={320}
            trendBadge={{ value: '+12%', type: 'positive' }}
            legend={[
              { label: 'Successful', color: 'var(--success)' },
              { label: 'Failed', color: 'var(--destructive)' },
            ]}
          >
            <div className={`h-[210px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SYNC_HEALTH} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="syncSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dx={-4} />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="success" stroke="var(--success)" strokeWidth={2} fill="url(#syncSuccess)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Sync summary</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Records synced', value: '1,284', sub: 'today', color: 'var(--accent)' },
                { label: 'Avg sync time', value: '1.2s', sub: 'p95: 3.4s', color: 'var(--chart-3)' },
                { label: 'Uptime (30d)', value: '99.98%', sub: '4m downtime', color: 'var(--success)' },
                { label: 'Failed syncs', value: '3', sub: '2 need attention', color: 'var(--destructive)' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button size="sm" variant="outline" className="w-full bg-card border-border h-8 text-xs">
                <RefreshCw className="w-3 h-3 mr-1.5" />
                Sync all integrations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
