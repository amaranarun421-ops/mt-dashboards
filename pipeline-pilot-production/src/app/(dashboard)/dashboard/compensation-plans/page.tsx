'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { KPICard } from '@/components/common/kpi-card';
import { useChartLoading } from '@/components/charts/chart-helpers';
import { compensationPlans } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Receipt, DollarSign, Percent, Users, Plus, MoreHorizontal,
  Edit, Copy, Calendar, Zap, TrendingUp, CheckCircle2,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ROLE_COLORS: Record<string, string> = {
  'Senior AE': 'var(--accent)',
  'Account Executive': 'var(--chart-1)',
  'Sales Development Rep': 'var(--chart-3)',
  'Enterprise AE': 'var(--chart-5)',
};

export default function CompensationPlansPage() {
  const chartLoaded = useChartLoading(300);

  const activePlans = compensationPlans.filter((p) => p.status === 'Active').length;
  const totalOTE = compensationPlans.reduce((s, p) => s + p.onTargetEarnings * p.reps, 0);
  const avgCommissionRate = Math.round(compensationPlans.reduce((s, p) => s + p.commissionRate, 0) / compensationPlans.length);
  const totalPayoutsYTD = 1840000;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compensation Plans"
        description="Design, manage, and compare commission structures across roles"
        icon={Receipt}
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New plan
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Plans"
          value={activePlans}
          delta="+1"
          deltaType="positive"
          icon={Receipt}
          accentColor="var(--accent)"
          subtext="Currently in effect"
          sparkline={[2, 3, 3, 4, 4, 4, 4, 4]}
          delay={0}
        />
        <KPICard
          title="Total OTE"
          value={formatCurrency(totalOTE, { compact: true })}
          delta="+8.4%"
          deltaType="positive"
          icon={DollarSign}
          accentColor="var(--chart-1)"
          subtext={`Across ${compensationPlans.reduce((s, p) => s + p.reps, 0)} reps`}
          sparkline={[1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1]}
          delay={1}
        />
        <KPICard
          title="Avg Commission Rate"
          value={`${avgCommissionRate}%`}
          delta="+0.5pp"
          deltaType="positive"
          icon={Percent}
          accentColor="var(--chart-3)"
          subtext="Weighted by plan"
          sparkline={[9, 9.5, 10, 10.2, 10.5, 10.8, 11, 11.2]}
          delay={2}
        />
        <KPICard
          title="Total Payouts YTD"
          value={formatCurrency(totalPayoutsYTD, { compact: true })}
          delta="+18.2%"
          deltaType="positive"
          icon={TrendingUp}
          accentColor="var(--chart-5)"
          subtext="Base + commission + accel"
          sparkline={[180, 240, 320, 480, 620, 820, 1100, 1380]}
          delay={3}
        />
      </div>

      {/* Plan cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
        {compensationPlans.map((p, i) => {
          const color = ROLE_COLORS[p.role] || 'var(--accent)';
          const totalOTEForPlan = p.onTargetEarnings * p.reps;
          return (
            <div
              key={p.id}
              className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${color} 4%, transparent), transparent)` }} />

              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                  >
                    <Receipt className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" /> Edit plan
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="w-4 h-4 mr-2" /> View history
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="relative grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Base salary</p>
                  <p className="text-lg font-bold text-foreground tabular-nums mt-1">{formatCurrency(p.baseSalary, { compact: true })}</p>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">OTE</p>
                  <p className="text-lg font-bold text-foreground tabular-nums mt-1" style={{ color }}>{formatCurrency(p.onTargetEarnings, { compact: true })}</p>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Commission rate</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-foreground tabular-nums">{p.commissionRate}%</span>
                    <span className="text-[10px] text-muted-foreground">of revenue</span>
                  </div>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Accelerator</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    <span className="text-lg font-bold text-foreground tabular-nums">{p.accelerators}×</span>
                    <span className="text-[10px] text-muted-foreground">over quota</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{p.reps} reps on plan</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Total OTE: {formatCurrency(totalOTEForPlan, { compact: true })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Effective</p>
                    <p className="text-xs font-medium text-foreground">{p.effectiveDate}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)`,
                      color: color,
                      borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" /> {p.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan comparison table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Plan comparison</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Side-by-side view of all compensation plans</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Plan</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Role</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Base</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">OTE</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Commission %</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Accelerator</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Reps</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Total OTE</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4">Commission/OTE ratio</th>
              </tr>
            </thead>
            <tbody>
              {compensationPlans.map((p, i) => {
                const color = ROLE_COLORS[p.role] || 'var(--accent)';
                const variablePct = Math.round(((p.onTargetEarnings - p.baseSalary) / p.onTargetEarnings) * 100);
                return (
                  <tr
                    key={p.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}
                        >
                          <Receipt className="w-3.5 h-3.5" style={{ color }} />
                        </div>
                        <span className="font-medium text-foreground">{p.name}</span>
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
                        {p.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{formatCurrency(p.baseSalary, { compact: true })}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">{formatCurrency(p.onTargetEarnings, { compact: true })}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-foreground font-medium tabular-nums">
                        <Percent className="w-3 h-3 text-muted-foreground" />
                        {p.commissionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-accent font-medium tabular-nums">
                        <Zap className="w-3 h-3" />
                        {p.accelerators}×
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground tabular-nums">{p.reps}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground tabular-nums">
                      {formatCurrency(p.onTargetEarnings * p.reps, { compact: true })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[80px] h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: chartLoaded ? `${variablePct}%` : '0%',
                              transitionDelay: `${i * 50}ms`,
                              background: `linear-gradient(90deg, ${color}, color-mix(in oklch, ${color} 70%, transparent))`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums w-9">{variablePct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
