'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CreditCard, Download, Sparkles, CheckCircle2, Calendar,
  TrendingUp, Zap, HardDrive, Activity, ArrowUpRight, Receipt, RefreshCw,
} from 'lucide-react';

// Current plan config
const CURRENT_PLAN = {
  name: 'Growth',
  price: 1499,
  cycle: 'month',
  renewalDate: 'Aug 15, 2025',
  seatsUsed: 28,
  seatsTotal: 35,
  status: 'Active',
};

const INVOICES = [
  { id: 'INV-2025-008', date: 'Jul 15, 2025', amount: 1499, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-007', date: 'Jun 15, 2025', amount: 1499, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-006', date: 'May 15, 2025', amount: 1499, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-005', date: 'Apr 15, 2025', amount: 1249, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-004', date: 'Mar 15, 2025', amount: 1249, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-003', date: 'Feb 15, 2025', amount: 999, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2025-002', date: 'Jan 15, 2025', amount: 999, status: 'Paid', method: 'Visa ••4242' },
  { id: 'INV-2024-013', date: 'Dec 15, 2024', amount: 999, status: 'Refunded', method: 'Visa ••4242' },
];

const RECENT_CHARGES = [
  { id: 'c1', description: 'Additional seat × 3', amount: 132, date: 'Jul 18, 2025', icon: TrendingUp, color: 'var(--accent)' },
  { id: 'c2', description: 'AI Insights add-on', amount: 199, date: 'Jul 15, 2025', icon: Sparkles, color: 'var(--chart-1)' },
  { id: 'c3', description: 'API overage (50k calls)', amount: 45, date: 'Jul 12, 2025', icon: Zap, color: 'var(--chart-3)' },
  { id: 'c4', description: 'Storage upgrade', amount: 89, date: 'Jul 5, 2025', icon: HardDrive, color: 'var(--chart-5)' },
  { id: 'c5', description: 'Additional seat × 2', amount: 88, date: 'Jun 22, 2025', icon: TrendingUp, color: 'var(--accent)' },
];

const USAGE_STATS = [
  { label: 'Seats', used: 28, total: 35, unit: '', color: 'var(--accent)', icon: TrendingUp },
  { label: 'API calls', used: 184000, total: 500000, unit: '', color: 'var(--chart-1)', icon: Zap },
  { label: 'Storage', used: 42, total: 100, unit: 'GB', color: 'var(--chart-3)', icon: HardDrive },
  { label: 'Active integrations', used: 12, total: 25, unit: '', color: 'var(--chart-5)', icon: Activity },
];

export default function BillingPage() {
  const seatUsagePct = Math.round((CURRENT_PLAN.seatsUsed / CURRENT_PLAN.seatsTotal) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription, payment methods, and view invoices"
        icon={CreditCard}
        actions={
          <Button variant="outline" size="sm" className="bg-card border-border">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Download invoices
          </Button>
        }
      />

      {/* Current plan card — large */}
      <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-chart-1/[0.04] to-transparent" />
        {/* decorative orbs */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-8 -bottom-12 w-48 h-48 rounded-full bg-chart-1/5 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: plan identity */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{CURRENT_PLAN.name} plan</h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3" /> {CURRENT_PLAN.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Annual subscription · renews automatically</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-foreground tabular-nums">{formatCurrency(CURRENT_PLAN.price, { compact: false })}</span>
              <span className="text-sm text-muted-foreground">/ {CURRENT_PLAN.cycle}</span>
              <span className="text-xs text-muted-foreground ml-2">billed monthly</span>
            </div>

            {/* Seats usage */}
            <div className="max-w-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">Seats used</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {CURRENT_PLAN.seatsUsed} / {CURRENT_PLAN.seatsTotal}
                  </span>
                </div>
                <span className={cn('text-xs font-medium', seatUsagePct > 85 ? 'text-warning' : 'text-muted-foreground')}>
                  {seatUsagePct}% used
                </span>
              </div>
              <div className="relative h-2.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 animate-in fade-in"
                  style={{
                    width: `${seatUsagePct}%`,
                    background: 'linear-gradient(90deg, var(--accent), var(--chart-1))',
                  }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {CURRENT_PLAN.seatsTotal - CURRENT_PLAN.seatsUsed} seats remaining ·{' '}
                <button className="text-accent hover:underline">Add more seats</button>
              </p>
            </div>
          </div>

          {/* Right: renewal + actions */}
          <div className="flex flex-col gap-3 lg:w-64 lg:items-end">
            <div className="bg-card/60 backdrop-blur border border-border rounded-lg p-3 w-full">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                <Calendar className="w-3 h-3" /> Next renewal
              </div>
              <p className="text-base font-semibold text-foreground">{CURRENT_PLAN.renewalDate}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{formatCurrency(CURRENT_PLAN.price)} will be charged</p>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" className="flex-1 bg-card border-border h-8 text-xs">
                <RefreshCw className="w-3 h-3 mr-1.5" /> Change plan
              </Button>
              <Button size="sm" className="flex-1 h-8 text-xs">
                <Receipt className="w-3 h-3 mr-1.5" /> View invoices
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main: billing history + right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Billing history */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Billing history</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{INVOICES.length} invoices · Last 8 months</p>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Invoice</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden sm:table-cell">Date</th>
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 hidden md:table-cell">Method</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Amount</th>
                  <th className="text-center text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4">Status</th>
                  <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2.5 px-4 w-20">Download</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv, i) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-medium text-foreground">{inv.id}</span>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground tabular-nums">{inv.date}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CreditCard className="w-3 h-3" />
                        {inv.method}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(inv.amount)}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {inv.status === 'Paid' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-warning/30 bg-warning/10 text-warning">
                          <RefreshCw className="w-3 h-3" /> Refunded
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar: payment method + usage cycle */}
        <div className="lg:col-span-1 space-y-4">
          {/* Payment method */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Payment method</h3>
              </div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border border-accent/30 bg-accent/10 text-accent">
                Default
              </span>
            </div>

            {/* Card visual */}
            <div
              className="relative rounded-xl p-4 mb-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, color-mix(in oklch, var(--accent) 25%, #1a1a1a), color-mix(in oklch, var(--chart-1) 20%, #0a0a0a))',
              }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -right-12 -bottom-8 w-32 h-32 rounded-full bg-white/3" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-7 rounded-md bg-yellow-400/80 backdrop-blur" />
                  <CreditCard className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-sm font-mono text-white tracking-widest mb-3">•••• •••• •••• 4242</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-wider">Card holder</p>
                    <p className="text-xs text-white font-medium">Sarah Chen</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider">Expires</p>
                    <p className="text-xs text-white font-medium tabular-nums">08/27</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Card type</span>
                <span className="font-medium text-foreground">Visa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 text-success font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-card border-border">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-card border-border">
                Add new
              </Button>
            </div>
          </div>

          {/* Usage this cycle */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-chart-3" />
                <h3 className="text-sm font-semibold text-foreground">Usage this cycle</h3>
              </div>
              <span className="text-[10px] text-muted-foreground">Resets Aug 15</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Current billing period utilization</p>

            <div className="space-y-4">
              {USAGE_STATS.map((u, i) => {
                const pct = Math.round((u.used / u.total) * 100);
                return (
                  <div
                    key={u.label}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <u.icon className="w-3 h-3" style={{ color: u.color }} />
                        <span className="text-xs text-muted-foreground">{u.label}</span>
                      </div>
                      <span className="text-xs font-semibold text-foreground tabular-nums">
                        {u.used.toLocaleString()}{u.unit && ` ${u.unit}`} <span className="text-muted-foreground font-normal">/ {u.total.toLocaleString()}{u.unit && ` ${u.unit}`}</span>
                      </span>
                    </div>
                    <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${u.color}, color-mix(in oklch, ${u.color} 70%, transparent))`,
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 text-right tabular-nums">{pct}% used</p>
                  </div>
                );
              })}
            </div>

            <Button variant="ghost" size="sm" className="w-full h-8 mt-4 text-xs">
              View detailed usage <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recent charges list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent charges</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Add-ons, overages, and seat additions</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
            Export statement
          </Button>
        </div>
        <div className="divide-y divide-border">
          {RECENT_CHARGES.map((c, i) => (
            <div
              key={c.id}
              className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-500"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `color-mix(in oklch, ${c.color} 12%, transparent)` }}
              >
                <c.icon className="w-4 h-4" style={{ color: c.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-foreground tabular-nums">+{formatCurrency(c.amount)}</p>
                <p className="text-[10px] text-muted-foreground">Charged</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs shrink-0">
                Receipt
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
