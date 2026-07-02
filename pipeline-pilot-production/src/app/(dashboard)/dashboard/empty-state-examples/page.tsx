'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Handshake,
  Search,
  BarChart3,
  Inbox,
  Users,
  Plug,
  Activity,
  FileText,
  AlertTriangle,
  Lock,
  Sparkles,
  GraduationCap,
  Plus,
  FilterX,
  Database,
  Mail,
  UserPlus,
  RefreshCw,
  Upload,
  ArrowRight,
  CircleAlert,
  KeyRound,
  Rocket,
  CheckCircle2,
  Palette,
  type LucideIcon,
} from 'lucide-react';

type Variant = 'default' | 'accent' | 'warning' | 'destructive' | 'info' | 'muted';

const VARIANT_TONE: Record<Variant, string> = {
  default: 'var(--chart-1)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  info: 'var(--chart-2)',
  muted: 'var(--muted-foreground)',
};

interface EmptyStatePattern {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  variant: Variant;
  /** The empty-state content (title, body, actions) — rendered inside the demo card */
  state: {
    title: string;
    body: string;
    actions?: React.ReactNode;
    /** optional small extra element under body, e.g. search term recap */
    caption?: string;
  };
}

const notify = (msg: string) => toast.success(msg, { duration: 2400 });

const PATTERNS: EmptyStatePattern[] = [
  {
    id: 'no-deals',
    name: 'No deals yet',
    description: 'First-run empty state for a primary list view',
    icon: Handshake,
    variant: 'accent',
    state: {
      title: 'No deals yet',
      body: 'Create your first deal to start tracking pipeline and forecast.',
      actions: (
        <Button
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => notify('Opening new deal form…')}
        >
          <Plus className="w-4 h-4" /> Create deal
        </Button>
      ),
    },
  },
  {
    id: 'no-search-results',
    name: 'No search results',
    description: 'After a search/filter that returned nothing',
    icon: Search,
    variant: 'info',
    state: {
      title: 'No results for “xyz”',
      body: 'Try different keywords or remove some filters to widen your search.',
      caption: 'Searched 1,284 deals · 12 active filters',
      actions: (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" variant="outline" onClick={() => notify('Cleared all filters')}>
            <FilterX className="w-4 h-4" /> Clear filters
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => notify('Showing search tips')}
          >
            Search tips
          </Button>
        </div>
      ),
    },
  },
  {
    id: 'no-data',
    name: 'No data',
    description: 'Analytics view with no source connected',
    icon: BarChart3,
    variant: 'default',
    state: {
      title: 'No data available',
      body: 'Connect a data source to populate this chart and start tracking performance.',
      actions: (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" onClick={() => notify('Opening data source picker')}>
            <Database className="w-4 h-4" /> Connect data source
          </Button>
          <Button size="sm" variant="outline" onClick={() => notify('Opening import wizard')}>
            <Upload className="w-4 h-4" /> Import CSV
          </Button>
        </div>
      ),
    },
  },
  {
    id: 'empty-inbox',
    name: 'Empty inbox',
    description: 'Positive, motivational empty state',
    icon: Inbox,
    variant: 'accent',
    state: {
      title: 'You’re all caught up!',
      body: 'No unread messages right now. Take a breath — your pipeline will thank you.',
      actions: (
        <Button size="sm" variant="ghost" onClick={() => notify('Refreshing inbox')}>
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      ),
    },
  },
  {
    id: 'no-team',
    name: 'No team members',
    description: 'Collaborative onboarding nudge',
    icon: Users,
    variant: 'info',
    state: {
      title: 'Invite your team',
      body: 'Pipeline Pilot is better together. Add teammates to share pipeline, forecast, and reports.',
      actions: (
        <Button
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => notify('Opening invite dialog')}
        >
          <UserPlus className="w-4 h-4" /> Invite members
        </Button>
      ),
    },
  },
  {
    id: 'no-integrations',
    name: 'No integrations',
    description: 'Marketplace upsell empty state',
    icon: Plug,
    variant: 'default',
    state: {
      title: 'Connect your first integration',
      body: 'Sync Salesforce, HubSpot, Slack and 80+ tools to keep data flowing automatically.',
      actions: (
        <Button size="sm" onClick={() => notify('Browsing integration marketplace')}>
          Browse marketplace <ArrowRight className="w-4 h-4" />
        </Button>
      ),
    },
  },
  {
    id: 'no-activities',
    name: 'No activities',
    description: 'Quiet feed with explanatory hint',
    icon: Activity,
    variant: 'muted',
    state: {
      title: 'No recent activity',
      body: 'Activities will appear here as your team logs calls, meetings, and emails.',
    },
  },
  {
    id: 'no-reports',
    name: 'No saved reports',
    description: 'Creator nudge for the reports library',
    icon: FileText,
    variant: 'warning',
    state: {
      title: 'No saved reports',
      body: 'Build your first custom report to track metrics that matter to your team.',
      actions: (
        <Button
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => notify('Opening report builder')}
        >
          <Plus className="w-4 h-4" /> Create your first report
        </Button>
      ),
    },
  },
  {
    id: 'error-state',
    name: 'Error state',
    description: 'Recoverable failure with retry',
    icon: AlertTriangle,
    variant: 'destructive',
    state: {
      title: 'Failed to load',
      body: 'We couldn’t reach the server. Check your connection and try again.',
      caption: 'Error 503 · upstream timeout',
      actions: (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => notify('Retrying request…')}
        >
          <RefreshCw className="w-4 h-4" /> Try again
        </Button>
      ),
    },
  },
  {
    id: 'permission-denied',
    name: 'Permission denied',
    description: 'Locked resource with request flow',
    icon: Lock,
    variant: 'destructive',
    state: {
      title: 'Access restricted',
      body: 'You don’t have permission to view this pipeline. Request access from your workspace admin.',
      actions: (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" onClick={() => notify('Access request sent to admin')}>
            <KeyRound className="w-4 h-4" /> Request access
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => notify('Opening docs')}>
            Learn more
          </Button>
        </div>
      ),
    },
  },
  {
    id: 'coming-soon',
    name: 'Coming soon',
    description: 'Preview of an unreleased feature',
    icon: Sparkles,
    variant: 'accent',
    state: {
      title: 'Coming soon',
      body: 'This feature is in development. Join the early access list to be first in line.',
      actions: (
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => notify('Added you to early access list')}>
          <Rocket className="w-4 h-4" /> Join early access
        </Button>
      ),
    },
  },
  {
    id: 'onboarding-incomplete',
    name: 'Onboarding incomplete',
    description: 'Setup checklist nudge',
    icon: GraduationCap,
    variant: 'warning',
    state: {
      title: 'Finish setup',
      body: 'Complete your profile to unlock forecasting, quotas, and team analytics.',
      caption: '3 of 5 steps complete',
      actions: (
        <Button size="sm" onClick={() => notify('Resuming onboarding')}>
          <CheckCircle2 className="w-4 h-4" /> Complete your profile
        </Button>
      ),
    },
  },
];

function EmptyStateCard({ pattern, index }: { pattern: EmptyStatePattern; index: number }) {
  const tone = VARIANT_TONE[pattern.variant];
  const Icon = pattern.icon;

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/[0.04] transition-all"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      {/* Pattern label header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: tone }}
          />
          <p className="text-xs font-semibold text-foreground truncate">{pattern.name}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Description row */}
      <p className="px-4 pt-3 text-[11px] text-muted-foreground leading-relaxed">
        {pattern.description}
      </p>

      {/* Demo area */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8 min-h-[16rem]">
        {/* Subtle dotted backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] text-foreground pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-xs mx-auto">
          {/* Icon block */}
          <div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border animate-in zoom-in-50 duration-500"
            style={{
              backgroundColor: `color-mix(in oklch, ${tone} 12%, transparent)`,
              borderColor: `color-mix(in oklch, ${tone} 25%, transparent)`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: tone }} strokeWidth={2} />
            {/* For destructive, add a small floating accent dot */}
            {pattern.variant === 'destructive' && (
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: tone }}
              />
            )}
            {/* For accent / coming-soon, add a sparkle */}
            {pattern.variant === 'accent' && (
              <Sparkles
                className="absolute -top-2 -right-2 w-3.5 h-3.5 animate-pulse"
                style={{ color: 'var(--warning)' }}
              />
            )}
          </div>

          <h3 className="text-sm font-semibold text-foreground">{pattern.state.title}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-[18rem]">
            {pattern.state.body}
          </p>

          {pattern.state.caption && (
            <p className="text-[10px] mt-2 font-mono text-muted-foreground/80">
              {pattern.state.caption}
            </p>
          )}

          {pattern.state.actions && (
            <div className="mt-5 flex items-center justify-center flex-wrap gap-2">
              {pattern.state.actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const VARIANT_LEGEND: { variant: Variant; label: string }[] = [
  { variant: 'accent', label: 'Primary' },
  { variant: 'info', label: 'Informational' },
  { variant: 'warning', label: 'Caution' },
  { variant: 'destructive', label: 'Error / Locked' },
  { variant: 'default', label: 'Neutral brand' },
  { variant: 'muted', label: 'Quiet' },
];

export default function EmptyStateExamplesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Empty State Examples"
        description="A library of empty state patterns used across Pipeline Pilot — reference for designers and developers."
        icon={Palette}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast('Empty state library v1.2', {
                description: '12 patterns · last updated June 2025',
              })
            }
          >
            View changelog
          </Button>
        }
      />

      {/* Quick intro + variant legend */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold mb-1.5">Why empty states matter</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every empty state is an opportunity to teach, motivate, or unblock the user. The
              patterns below cover the most common scenarios — match the variant to the user&apos;s
              emotional context: <span className="text-accent font-medium">accent</span> for primary
              CTAs, <span className="text-warning font-medium">warning</span> for caution,{' '}
              <span className="text-destructive font-medium">destructive</span> for failures or
              locked resources.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 shrink-0">
            {VARIANT_LEGEND.map((v) => (
              <div
                key={v.variant}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: VARIANT_TONE[v.variant] }}
                />
                <span className="text-[11px] text-muted-foreground truncate">{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patterns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PATTERNS.map((p, i) => (
          <EmptyStateCard key={p.id} pattern={p} index={i} />
        ))}
      </div>

      {/* Best practices footer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
            <CircleAlert className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-sm font-semibold mb-1.5">Always offer a next step</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every empty state should give the user a clear, single primary action — even if
            it&apos;s just &quot;learn more&quot; or &quot;refresh&quot;.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="w-9 h-9 rounded-lg bg-chart-2/10 border border-chart-2/20 flex items-center justify-center mb-3">
            <Mail className="w-4 h-4" style={{ color: 'var(--chart-2)' }} />
          </div>
          <h3 className="text-sm font-semibold mb-1.5">Match the tone to the context</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use playful copy for first-runs (&quot;you&apos;re all caught up!&quot;) but stay
            clinical for errors (&quot;failed to load&quot;).
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="w-9 h-9 rounded-lg bg-chart-5/10 border border-chart-5/20 flex items-center justify-center mb-3">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--chart-5)' }} />
          </div>
          <h3 className="text-sm font-semibold mb-1.5">Show progress where possible</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Captions like &quot;3 of 5 steps complete&quot; or &quot;error 503&quot; reduce
            uncertainty and give users something concrete to act on.
          </p>
        </div>
      </div>
    </div>
  );
}
