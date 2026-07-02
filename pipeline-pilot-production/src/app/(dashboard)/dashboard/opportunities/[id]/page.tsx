'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import { deals, contacts, activities, STAGES, STAGE_COLORS, type Deal, type Stage } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Pencil, ChevronRight, RefreshCw, CheckCircle2, Clock, Sparkles,
  Target, Zap, ArrowRight, Activity as ActivityIcon, Building2, Calendar, Phone,
  Mail, CheckSquare, StickyNote, Users, Trophy, AlertTriangle, Flame,
} from 'lucide-react';

const TYPE_COLOR: Record<Deal['type'], string> = {
  'New Business': 'var(--chart-1)',
  'Expansion': 'var(--accent)',
  'Renewal': 'var(--chart-3)',
  'Upsell': 'var(--chart-5)',
};

function buildStageHistory(deal: Deal) {
  const today = new Date('2025-07-02');
  const created = new Date(deal.created);
  const elapsed = Math.max(1, Math.round((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)));
  const stageOrder: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];
  const idx = stageOrder.indexOf(deal.stage);
  const stagesToShow = stageOrder.slice(0, idx + 1);
  const perStage = Math.max(3, Math.floor(elapsed / Math.max(1, stagesToShow.length)));
  return stagesToShow.map((s, i) => {
    const date = new Date(created);
    date.setDate(date.getDate() + perStage * i);
    return {
      stage: s,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      days: i === stagesToShow.length - 1 ? deal.daysInStage : perStage,
      current: i === stagesToShow.length - 1,
    };
  });
}

const ACTIVITY_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  call: { icon: Phone, color: 'var(--chart-1)' },
  meeting: { icon: Calendar, color: 'var(--chart-3)' },
  email: { icon: Mail, color: 'var(--chart-5)' },
  task: { icon: CheckSquare, color: 'var(--warning)' },
  note: { icon: StickyNote, color: 'var(--chart-4)' },
  deal_update: { icon: RefreshCw, color: 'var(--accent)' },
};

// Stakeholder roles for the relationship map
const STAKEHOLDER_ROLES = [
  { role: 'Champion', color: 'var(--accent)', icon: Trophy, description: 'Internal advocate pushing the deal forward' },
  { role: 'Decision Maker', color: 'var(--destructive)', icon: Target, description: 'Final authority on the purchase' },
  { role: 'Influencer', color: 'var(--chart-1)', icon: Users, description: 'Shapes the decision with technical input' },
  { role: 'Gatekeeper', color: 'var(--chart-3)', icon: AlertTriangle, description: 'Controls access to stakeholders' },
];

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const deal = deals.find((d) => d.id === (params?.id as string));

  const [steps, setSteps] = React.useState([
    { id: 's1', text: 'Send revised proposal to procurement', done: false, due: 'Today · 5:00 PM', owner: 'SC' },
    { id: 's2', text: 'Schedule executive briefing', done: true, due: 'Completed', owner: 'SC' },
    { id: 's3', text: 'Finalize pricing terms', done: false, due: 'Tomorrow', owner: 'MJ' },
    { id: 's4', text: 'Security review sign-off', done: false, due: 'Jul 8', owner: 'SC' },
    { id: 's5', text: 'Submit for closed-won', done: false, due: 'Jul 12', owner: 'SC' },
  ]);

  if (!deal) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/opportunities')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to opportunities
        </button>
        <ErrorState
          title="Opportunity not found"
          description={`We couldn't find an opportunity with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/opportunities')}
        />
      </div>
    );
  }

  const stageColor = STAGE_COLORS[deal.stage];
  const typeColor = TYPE_COLOR[deal.type];
  const stageHistory = buildStageHistory(deal);
  const accountContacts = contacts.filter((c) => c.accountId === deal.accountId).slice(0, 4);
  const dealActivities = activities.slice(0, 5);
  const currentStageIdx = STAGES.indexOf(deal.stage);
  const stageProgress = Math.round((currentStageIdx / (STAGES.length - 1)) * 100);

  // Stakeholder map — distribute contacts across roles
  const stakeholders = STAKEHOLDER_ROLES.map((role, i) => {
    const contact = accountContacts[i % Math.max(1, accountContacts.length)];
    return {
      ...role,
      contact: contact || { name: 'Unassigned', title: 'No contact mapped', email: '', id: `placeholder-${i}` },
    };
  });

  // Competitor analysis — synthesized based on deal type
  const competitors = [
    { name: 'Salesforce Sales Cloud', winRate: 42, deals: 28, threat: 'high', color: 'var(--destructive)' },
    { name: 'HubSpot CRM', winRate: 58, deals: 19, threat: 'medium', color: 'var(--warning)' },
    { name: 'Pipedrive', winRate: 71, deals: 12, threat: 'low', color: 'var(--success)' },
    { name: 'Zoho CRM', winRate: 65, deals: 9, threat: 'low', color: 'var(--success)' },
  ];

  const toggleStep = (id: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const completedSteps = steps.filter((s) => s.done).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunity Details"
        description="Comprehensive view of a single opportunity"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/opportunities">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          borderColor: `color-mix(in oklch, ${stageColor} 30%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklch, ${stageColor} 8%, var(--card)) 0%, var(--card) 60%)`,
        }}
      >
        <div className="relative z-10 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground">{deal.id}</span>
                <StageBadge stage={deal.stage} color={stageColor} />
                <StageBadge stage={deal.type} color={typeColor} />
                <StatusBadge
                  status={deal.riskScore > 40 ? 'high' : deal.riskScore > 25 ? 'warning' : 'success'}
                  label={deal.riskScore > 40 ? 'At risk' : deal.riskScore > 25 ? 'Watch' : 'Healthy'}
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{deal.name}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                <Link href={`/dashboard/accounts/${deal.accountId}`} className="text-sm text-accent hover:underline">
                  {deal.account}
                </Link>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{deal.source} source</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Move stage
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Zap className="w-3.5 h-3.5 mr-1.5" /> Convert
              </Button>
            </div>
          </div>

          {/* Value + stage progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Opportunity Value</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">{formatCurrency(deal.value)}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">Weighted: <span className="font-semibold text-foreground tabular-nums">{formatCurrency(deal.weightedValue, { compact: true })}</span></span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">Probability: <span className="font-semibold text-foreground">{deal.probability}%</span></span>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Stage Progression</p>
                <span className="text-[11px] text-muted-foreground">{stageProgress}% through pipeline</span>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  {STAGES.slice(0, 5).map((s, i) => {
                    const isActive = i <= currentStageIdx;
                    const isCurrent = i === currentStageIdx;
                    return (
                      <React.Fragment key={s}>
                        <div
                          className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all',
                            isActive ? 'text-white' : 'bg-card text-muted-foreground border-border',
                            isCurrent && 'ring-4'
                          )}
                          style={{
                            background: isActive ? STAGE_COLORS[s] : undefined,
                            borderColor: isActive ? STAGE_COLORS[s] : undefined,
                            // @ts-expect-error css var
                            '--tw-ring-color': isCurrent ? `color-mix(in oklch, ${STAGE_COLORS[s]} 25%, transparent)` : undefined,
                          }}
                        >
                          {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        {i < 4 && (
                          <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-border">
                            <div
                              className="h-full transition-all duration-700"
                              style={{ width: i < currentStageIdx ? '100%' : '0%', background: STAGE_COLORS[s] }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between mt-1.5">
                {STAGES.slice(0, 5).map((s) => (
                  <span key={s} className="text-[9px] uppercase tracking-wider text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2.5">
              <AvatarBadge initials={deal.ownerInitials} size="md" color={stageColor} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Owner</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.owner}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Close Date</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Days Open</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.age}d · {deal.daysInStage}d in stage</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Activity</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.lastActivity}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: stageColor }}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Summary</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Value</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(deal.value, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{deal.probability}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Weighted</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(deal.weightedValue, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk Score</p>
                <p className="text-sm font-bold tabular-nums" style={{ color: deal.riskScore > 40 ? 'var(--destructive)' : deal.riskScore > 25 ? 'var(--warning)' : 'var(--success)' }}>
                  {deal.riskScore}/100
                </p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next Step</p>
              <p className="text-sm text-foreground flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {deal.nextStep}
              </p>
            </div>
          </section>

          {/* Stage history */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Stage History</h3>
            </div>
            <div className="space-y-3">
              {stageHistory.map((h, i) => {
                const color = STAGE_COLORS[h.stage as Stage];
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border transition-colors animate-in fade-in slide-in-from-left-2 duration-300',
                      h.current ? 'border-accent/40 bg-accent/5' : 'border-border bg-secondary/30'
                    )}
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{h.stage}</span>
                        {h.current && <StatusBadge status="active" label="Current" size="sm" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground">Entered on {h.date} · {h.days} day{h.days === 1 ? '' : 's'} in stage</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-foreground tabular-nums">{h.days}d</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Activity timeline */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Activity Timeline</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {dealActivities.map((act, i) => {
                  const cfg = ACTIVITY_ICON_MAP[act.type] || ACTIVITY_ICON_MAP.note;
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={act.id}
                      className="relative pl-10 animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-card shadow-sm"
                        style={{ background: `color-mix(in oklch, ${cfg.color} 15%, var(--card))` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{act.title}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{act.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{act.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Stakeholder map */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Stakeholder Map</h3>
            </div>
            <div className="space-y-3">
              {stakeholders.map((sh, i) => {
                const Icon = sh.icon;
                const isAssigned = sh.contact.id !== `placeholder-${i}`;
                return (
                  <div
                    key={sh.role}
                    className="relative p-3 rounded-lg border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{
                      borderColor: `color-mix(in oklch, ${sh.color} 25%, var(--border))`,
                      background: `color-mix(in oklch, ${sh.color} 5%, var(--card))`,
                      animationDelay: `${i * 60}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `color-mix(in oklch, ${sh.color} 15%, transparent)` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: sh.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-xs font-semibold text-foreground">{sh.role}</p>
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                            style={{
                              color: sh.color,
                              background: `color-mix(in oklch, ${sh.color} 12%, transparent)`,
                            }}
                          >
                            {isAssigned ? 'Mapped' : 'Open'}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">
                          {isAssigned ? sh.contact.name : 'Unassigned'}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {isAssigned ? `${sh.contact.title} · ${sh.contact.account}` : sh.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Competitor analysis */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Competitor Analysis</h3>
            </div>
            <div className="space-y-3">
              {competitors.map((comp, i) => (
                <div
                  key={comp.name}
                  className="p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-xs font-medium text-foreground truncate">{comp.name}</p>
                    <StatusBadge
                      status={comp.threat === 'high' ? 'high' : comp.threat === 'medium' ? 'medium' : 'low'}
                      label={`${comp.threat} threat`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Win Rate</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{comp.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Deals</p>
                      <p className="text-sm font-bold text-foreground tabular-nums">{comp.deals}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Loss Rate</p>
                      <p className="text-sm font-bold tabular-nums" style={{ color: comp.color }}>{100 - comp.winRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next steps */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Next Steps</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{completedSteps}/{steps.length} done</span>
            </div>
            <div className="space-y-2">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => toggleStep(s.id)}
                  className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                    s.done ? 'bg-accent border-accent' : 'border-border'
                  )}>
                    {s.done && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs', s.done ? 'text-muted-foreground line-through' : 'text-foreground font-medium')}>{s.text}</p>
                    <p className="text-[10px] text-muted-foreground">{s.due} · {s.owner}</p>
                  </div>
                </button>
              ))}
            </div>
            <Separator className="my-3" />
            <Button variant="outline" size="sm" className="w-full bg-card border-border">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate next steps with AI
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
