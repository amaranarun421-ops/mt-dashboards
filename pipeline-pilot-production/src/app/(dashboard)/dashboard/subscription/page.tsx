'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Receipt, Check, Crown, Sparkles, Brain, BarChart3,
  Plug, Headphones, Zap, ArrowUpRight, ArrowRight, History, TrendingUp, TrendingDown, Minus, Plus,
} from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'For individuals getting started',
    color: 'var(--muted-foreground)',
    current: false,
    cta: 'Downgrade',
    features: {
      users: 'Up to 3 users',
      deals: '50 deals / month',
      storage: '1 GB storage',
      integrations: '3 integrations',
      api: '100 API calls / day',
      reports: 'Basic reports',
      forecasting: false,
      aiInsights: false,
      customDashboards: false,
      prioritySupport: false,
      sso: false,
      auditLogs: false,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    period: 'month',
    description: 'For growing sales teams',
    color: 'var(--chart-1)',
    current: false,
    cta: 'Upgrade',
    features: {
      users: 'Up to 15 users',
      deals: 'Unlimited deals',
      storage: '25 GB storage',
      integrations: '10 integrations',
      api: '10k API calls / day',
      reports: 'Advanced reports',
      forecasting: true,
      aiInsights: false,
      customDashboards: false,
      prioritySupport: false,
      sso: false,
      auditLogs: true,
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 1499,
    period: 'month',
    description: 'For scaling organizations',
    color: 'var(--accent)',
    current: true,
    cta: 'Current plan',
    features: {
      users: 'Up to 50 users',
      deals: 'Unlimited deals',
      storage: '100 GB storage',
      integrations: '25 integrations',
      api: '100k API calls / day',
      reports: 'Advanced + custom',
      forecasting: true,
      aiInsights: true,
      customDashboards: true,
      prioritySupport: false,
      sso: false,
      auditLogs: true,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'custom',
    description: 'For large enterprises',
    color: 'var(--chart-5)',
    current: false,
    cta: 'Contact sales',
    features: {
      users: 'Unlimited users',
      deals: 'Unlimited deals',
      storage: '1 TB+ storage',
      integrations: 'Unlimited',
      api: 'Unlimited API calls',
      reports: 'All + white-label',
      forecasting: true,
      aiInsights: true,
      customDashboards: true,
      prioritySupport: true,
      sso: true,
      auditLogs: true,
    },
  },
];

const FEATURE_MATRIX: { label: string; key: keyof typeof PLANS[0]['features']; group: string }[] = [
  { label: 'Users', key: 'users', group: 'Core' },
  { label: 'Deals', key: 'deals', group: 'Core' },
  { label: 'Storage', key: 'storage', group: 'Core' },
  { label: 'Integrations', key: 'integrations', group: 'Core' },
  { label: 'API limits', key: 'api', group: 'Core' },
  { label: 'Reports', key: 'reports', group: 'Analytics' },
  { label: 'Forecasting', key: 'forecasting', group: 'Analytics' },
  { label: 'AI Insights', key: 'aiInsights', group: 'Analytics' },
  { label: 'Custom dashboards', key: 'customDashboards', group: 'Analytics' },
  { label: 'Audit logs', key: 'auditLogs', group: 'Security' },
  { label: 'SSO / SAML', key: 'sso', group: 'Security' },
  { label: 'Priority support', key: 'prioritySupport', group: 'Support' },
];

const ADDONS = [
  { id: 'ao1', name: 'AI Insights', description: 'GPT-powered deal insights, next-best-actions, and forecast accuracy', price: 199, period: 'month', icon: Brain, color: 'var(--accent)', added: true },
  { id: 'ao2', name: 'Advanced Analytics', description: 'Custom dashboards, cohort analysis, and benchmarking against industry peers', price: 299, period: 'month', icon: BarChart3, color: 'var(--chart-1)', added: false },
  { id: 'ao3', name: 'Custom Integrations', description: 'Build private integrations with our API and dedicated webhook infrastructure', price: 149, period: 'month', icon: Plug, color: 'var(--chart-3)', added: false },
  { id: 'ao4', name: 'Priority Support', description: '24/7 priority support, dedicated CSM, and 99.99% uptime SLA', price: 399, period: 'month', icon: Headphones, color: 'var(--chart-5)', added: false },
];

const TIMELINE = [
  { id: 't1', date: 'Jul 15, 2025', event: 'Upgraded from Starter → Growth', amount: '+$500/mo', type: 'upgrade', icon: TrendingUp, color: 'var(--success)' },
  { id: 't2', date: 'Jul 15, 2025', event: 'Added AI Insights add-on', amount: '+$199/mo', type: 'addon', icon: Sparkles, color: 'var(--accent)' },
  { id: 't3', date: 'Apr 15, 2025', event: 'Added 3 seats to Starter plan', amount: '+$132/mo', type: 'addon', icon: Plus, color: 'var(--chart-1)' },
  { id: 't4', date: 'Jan 15, 2025', event: 'Upgraded from Free → Starter', amount: '+$999/mo', type: 'upgrade', icon: TrendingUp, color: 'var(--success)' },
  { id: 't5', date: 'Dec 15, 2024', event: 'Invoice refunded (billing error)', amount: '-$999', type: 'refund', icon: TrendingDown, color: 'var(--warning)' },
  { id: 't6', date: 'Dec 1, 2024', event: 'Subscribed to Pipeline Pilot (Free)', amount: '$0', type: 'subscribe', icon: Receipt, color: 'var(--muted-foreground)' },
];

export default function SubscriptionPage() {
  const currentPlan = PLANS.find((p) => p.current)!;
  const addedAddons = ADDONS.filter((a) => a.added);
  const planPrice = currentPlan.price ?? 0;
  const monthlyTotal = planPrice + addedAddons.reduce((s, a) => s + a.price, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription"
        description="Compare plans, manage add-ons, and review your subscription history"
        icon={Receipt}
        actions={
          <Button size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Manage subscription
          </Button>
        }
      />

      {/* Current plan summary card */}
      <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent" />
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-accent/8 blur-3xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-foreground">{currentPlan.name}</h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                    Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{currentPlan.description}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Your subscription renews on <span className="font-medium text-foreground">Aug 15, 2025</span>. You can change or cancel anytime.
            </p>
          </div>

          <div className="bg-secondary/40 rounded-lg p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Base plan</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{formatCurrency(planPrice, { compact: false })}</p>
            <p className="text-[11px] text-muted-foreground">per month</p>
          </div>
          <div className="bg-secondary/40 rounded-lg p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Add-ons ({addedAddons.length})</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{formatCurrency(addedAddons.reduce((s, a) => s + a.price, 0))}</p>
            <p className="text-[11px] text-muted-foreground">per month</p>
          </div>

          <div className="md:col-span-4 flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total monthly cost</p>
              <p className="text-3xl font-bold text-accent tabular-nums">{formatCurrency(monthlyTotal, { compact: false })}<span className="text-sm text-muted-foreground font-normal"> /mo</span></p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-card border-border h-8 text-xs">Cancel plan</Button>
              <Button size="sm" className="h-8 text-xs">Upgrade to Enterprise</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main: plan comparison + add-ons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Plan comparison table (2/3) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Compare plans</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Choose the right plan for your team size and needs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-3 px-4 sticky left-0 bg-card">Features</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="text-center py-3 px-3 min-w-[140px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${p.color} 14%, transparent)` }}>
                          {p.id === 'free' && <Minus className="w-3.5 h-3.5" style={{ color: p.color }} />}
                          {p.id === 'starter' && <Zap className="w-3.5 h-3.5" style={{ color: p.color }} />}
                          {p.id === 'growth' && <Sparkles className="w-3.5 h-3.5" style={{ color: p.color }} />}
                          {p.id === 'enterprise' && <Crown className="w-3.5 h-3.5" style={{ color: p.color }} />}
                        </span>
                        <span className="text-xs font-semibold text-foreground">{p.name}</span>
                        {p.current && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-accent/30 bg-accent/10 text-accent">
                            Current
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price row */}
                <tr className="border-b border-border bg-secondary/20">
                  <td className="py-3 px-4 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Price</td>
                  {PLANS.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-base font-bold text-foreground tabular-nums">
                          {p.price === null ? 'Custom' : formatCurrency(p.price, { compact: false })}
                        </span>
                        <span className="text-[10px] text-muted-foreground">/ {p.period}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Feature rows grouped */}
                {Array.from(new Set(FEATURE_MATRIX.map((f) => f.group))).map((group) => (
                  <React.Fragment key={group}>
                    <tr className="bg-secondary/40">
                      <td colSpan={5} className="py-1.5 px-4 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                        {group}
                      </td>
                    </tr>
                    {FEATURE_MATRIX.filter((f) => f.group === group).map((feature) => (
                      <tr key={feature.key} className="border-b border-border/60 hover:bg-secondary/30 transition-colors">
                        <td className="py-2.5 px-4 text-xs text-foreground">{feature.label}</td>
                        {PLANS.map((p) => {
                          const value = p.features[feature.key];
                          return (
                            <td key={p.id} className="py-2.5 px-3 text-center">
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <Check className="w-4 h-4 text-success inline-block" />
                                ) : (
                                  <Minus className="w-4 h-4 text-muted-foreground/40 inline-block" />
                                )
                              ) : (
                                <span className="text-xs text-foreground tabular-nums">{value}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* CTA row */}
                <tr className="border-t border-border bg-secondary/20">
                  <td className="py-3 px-4"></td>
                  {PLANS.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-center">
                      <Button
                        size="sm"
                        variant={p.current ? 'outline' : 'default'}
                        disabled={p.current}
                        className={cn(
                          'h-8 text-xs w-full',
                          p.current && 'bg-card border-border',
                          p.id === 'free' && !p.current && 'bg-card border-border text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {p.current ? 'Current plan' : p.cta}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons (1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Add-ons</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Premium features available on any plan</p>

            <div className="space-y-3">
              {ADDONS.map((a, i) => (
                <div
                  key={a.id}
                  className={cn(
                    'group relative rounded-lg p-3 border transition-all animate-in fade-in slide-in-from-bottom-2 duration-500',
                    a.added
                      ? 'border-accent/30 bg-accent/[0.04]'
                      : 'border-border bg-secondary/30 hover:border-accent/30 hover:bg-secondary/60'
                  )}
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `color-mix(in oklch, ${a.color} 14%, transparent)` }}
                    >
                      <a.icon className="w-4 h-4" style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-foreground">{a.name}</h4>
                        {a.added && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-accent/30 bg-accent/10 text-accent">
                            <Check className="w-2.5 h-2.5" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{a.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(a.price)}<span className="text-[10px] text-muted-foreground font-normal">/mo</span></p>
                        <Button
                          size="sm"
                          variant={a.added ? 'outline' : 'default'}
                          className="h-6 text-[10px] px-2"
                        >
                          {a.added ? 'Remove' : <><Plus className="w-3 h-3 mr-1" /> Add</>}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription timeline */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Subscription timeline</h3>
              <p className="text-xs text-muted-foreground mt-0.5">All plan changes, upgrades, and add-on activity</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-card border-border">
            Export history
          </Button>
        </div>
        <div className="p-5">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-4">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.id}
                  className="relative flex items-start gap-4 animate-in fade-in slide-in-from-left-2 duration-500"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-card border-2"
                    style={{ borderColor: t.color }}
                  >
                    <t.icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{t.event}</p>
                      <span
                        className="text-xs font-semibold tabular-nums"
                        style={{ color: t.color }}
                      >
                        {t.amount}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
