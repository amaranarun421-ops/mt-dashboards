'use client';

import * as React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { ChartCard } from '@/components/common/chart-card';
import { AvatarBadge, StageBadge } from '@/components/common/status-badge';
import { useChartLoading, CHART_TOOLTIP_STYLE } from '@/components/charts/chart-helpers';
import { churnRiskData, accounts } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle, DollarSign, Gauge, TrendingDown, ShieldAlert,
  Download, MoreHorizontal, ArrowUpRight, Mail, Phone, Sparkles,
} from 'lucide-react';

// Filter at-risk accounts (churnRisk > 15)
const atRiskAccounts = accounts
  .filter((a) => a.churnRisk > 15)
  .sort((a, b) => b.churnRisk - a.churnRisk);

const topAtRisk = atRiskAccounts.slice(0, 5);

const ACTIONS = [
  { action: 'Schedule executive QBR', priority: 'high', color: 'var(--destructive)' },
  { action: 'Deploy customer success team', priority: 'high', color: 'var(--destructive)' },
  { action: 'Renewal pricing review', priority: 'medium', color: 'var(--warning)' },
  { action: 'Product training session', priority: 'medium', color: 'var(--warning)' },
  { action: 'Send re-engagement campaign', priority: 'low', color: 'var(--accent)' },
  { action: 'Conduct health check call', priority: 'high', color: 'var(--destructive)' },
];

function riskColor(risk: number) {
  if (risk >= 30) return 'var(--destructive)';
  if (risk >= 20) return 'var(--warning)';
  return 'var(--chart-5)';
}

function riskLabel(risk: number) {
  if (risk >= 30) return 'Critical';
  if (risk >= 20) return 'High';
  if (risk >= 15) return 'Elevated';
  return 'Low';
}

function healthColor(score: number) {
  if (score >= 85) return 'var(--success)';
  if (score >= 70) return 'var(--accent)';
  if (score >= 60) return 'var(--warning)';
  return 'var(--destructive)';
}

export default function ChurnRiskPage() {
  const chartLoaded = useChartLoading(300);

  const totalAtRisk = atRiskAccounts.length;
  const atRiskRevenue = atRiskAccounts.reduce((s, a) => s + a.arr, 0);
  const avgRisk = Math.round(atRiskAccounts.reduce((s, a) => s + a.churnRisk, 0) / atRiskAccounts.length);
  const predictedChurn = Math.round((atRiskRevenue * avgRisk) / 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Churn Risk"
        description="Identify at-risk accounts and trigger retention plays"
        icon={AlertTriangle}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export watchlist
            </Button>
            <Button size="sm" variant="destructive">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5" /> Trigger retention
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="At-Risk Accounts"
          value={totalAtRisk}
          delta="+2"
          deltaType="negative"
          icon={AlertTriangle}
          accentColor="var(--destructive)"
          subtext="Churn risk > 15%"
          sparkline={[3, 4, 5, 6, 5, 6, 7, 6]}
          delay={0}
        />
        <KPICard
          title="At-Risk Revenue"
          value={formatCurrency(atRiskRevenue, { compact: true })}
          delta="+$48k"
          deltaType="negative"
          icon={DollarSign}
          accentColor="var(--warning)"
          subtext="ARR exposed to churn"
          sparkline={[420, 460, 510, 560, 600, 640, 680, 715]}
          delay={1}
        />
        <KPICard
          title="Avg Churn Risk Score"
          value={`${avgRisk}%`}
          delta="+3pp"
          deltaType="negative"
          icon={Gauge}
          accentColor="var(--chart-5)"
          subtext="Across at-risk accounts"
          sparkline={[18, 19, 21, 22, 23, 24, 25, 27]}
          delay={2}
        />
        <KPICard
          title="Predicted Churn Rate"
          value={`${(avgRisk / 4).toFixed(1)}%`}
          delta="+0.4pp"
          deltaType="negative"
          icon={TrendingDown}
          accentColor="var(--chart-3)"
          subtext={`$${(predictedChurn / 1000).toFixed(0)}k projected loss`}
          sparkline={[3.8, 4.0, 4.4, 5.1, 5.6, 6.2, 6.5, 6.8]}
          delay={3}
        />
      </div>

      {/* Top: donut + leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Churn Risk Distribution"
          description="Accounts grouped by risk tier"
          height={360}
        >
          <div className="relative h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={churnRiskData}
                  dataKey="accounts"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {churnRiskData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v, _name, props) => {
                    const item = props?.payload;
                    return [`${v} accounts · ${formatCurrency(item?.value, { compact: true })} ARR`, String(item?.name)];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground tabular-nums">{churnRiskData.reduce((s, c) => s + c.accounts, 0)}</span>
              <span className="text-[10px] text-muted-foreground">accounts</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {churnRiskData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/40 transition-colors">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
                <span className="text-xs text-muted-foreground flex-1">{c.name}</span>
                <span className="text-xs font-semibold text-foreground tabular-nums">{c.accounts}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums w-14 text-right">{formatCurrency(c.value, { compact: true })}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">Top at-risk accounts</h3>
              <span className="text-[11px] text-muted-foreground">Highest churn risk</span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-accent">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {topAtRisk.map((a, i) => {
              const color = riskColor(a.churnRisk);
              return (
                <div
                  key={a.id}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-border transition-colors animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: a.logoColor }}
                  >
                    {a.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{a.name}</p>
                      <StageBadge stage={a.tier} color={color} />
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{a.industry} · {a.owner}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(a.arr, { compact: true })}</p>
                    <p className="text-[10px] text-muted-foreground">ARR</p>
                  </div>
                  <div className="text-right shrink-0 w-16">
                    <p className="text-sm font-bold tabular-nums" style={{ color }}>{a.churnRisk}%</p>
                    <p className="text-[10px] text-muted-foreground">churn risk</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full at-risk accounts table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">At-risk accounts watchlist</h3>
            <span className="text-[11px] text-muted-foreground">({atRiskAccounts.length} accounts with churn risk &gt; 15%)</span>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[560px] overflow-y-auto custom-scroll">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-secondary/95 backdrop-blur z-10">
              <tr className="border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Account</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Tier</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">ARR</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Churn risk</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Health</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Owner</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Recommended action</th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {atRiskAccounts.map((a, i) => {
                const color = riskColor(a.churnRisk);
                const action = ACTIONS[i % ACTIONS.length];
                const hColor = healthColor(a.healthScore);
                return (
                  <tr
                    key={a.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors group animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${Math.min(i, 10) * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: a.logoColor }}
                        >
                          {a.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{a.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{a.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StageBadge stage={a.tier} color={color} />
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">
                      {formatCurrency(a.arr, { compact: true })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${a.churnRisk * 2}%` : '0%',
                              transitionDelay: `${i * 40}ms`,
                              background: color,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold tabular-nums w-9" style={{ color }}>{a.churnRisk}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${a.healthScore}%` : '0%',
                              transitionDelay: `${i * 40 + 100}ms`,
                              background: hColor,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold tabular-nums w-7" style={{ color: hColor }}>{a.healthScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <AvatarBadge initials={a.ownerInitials} size="sm" color={a.logoColor} />
                        <span className="text-xs text-muted-foreground">{a.owner}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${action.color} 12%, transparent)`,
                          color: action.color,
                          borderColor: `color-mix(in oklch, ${action.color} 25%, transparent)`,
                        }}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {action.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="w-7 h-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
