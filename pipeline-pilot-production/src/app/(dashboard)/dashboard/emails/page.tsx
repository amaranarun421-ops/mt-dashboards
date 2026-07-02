'use client';

import * as React from 'react';
import {
  Mail, Plus, Send, Eye, Clock,
  MousePointerClick, Reply, Forward, Archive, ChevronRight,
  Filter, X, FileText, TrendingUp, Calendar,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { emails, reps, type Rep } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const REP_LOOKUP: Record<string, Rep> = Object.fromEntries(reps.map((r) => [r.name, r]));

function repInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

type EmailRow = typeof emails[number] & { ownerInitials: string; ownerColor: string };
const EMAIL_ROWS: EmailRow[] = emails.map((e) => {
  const rep = REP_LOOKUP[e.owner];
  return {
    ...e,
    ownerInitials: rep?.initials ?? repInitials(e.owner),
    ownerColor: rep?.avatarColor ?? 'var(--accent)',
  };
});

type StatusFilter = 'all' | 'sent' | 'opened' | 'replied';

// Engagement funnel synthesized
const FUNNEL = [
  { label: 'Sent', value: 487, color: 'var(--chart-1)', icon: Send },
  { label: 'Opened', value: 312, color: 'var(--chart-3)', icon: Eye },
  { label: 'Replied', value: 96, color: 'var(--warning)', icon: Reply },
  { label: 'Meeting Booked', value: 28, color: 'var(--success)', icon: Calendar },
];

// Top performing templates synthesized
const TOP_TEMPLATES = [
  { name: 'Discovery Follow-up', sent: 124, openRate: 78, replyRate: 32, bookings: 14 },
  { name: 'Pricing Recap', sent: 86, openRate: 82, replyRate: 28, bookings: 11 },
  { name: 'QBR Invitation', sent: 64, openRate: 91, replyRate: 45, bookings: 18 },
  { name: 'Demo Recap + Next Steps', sent: 58, openRate: 73, replyRate: 22, bookings: 9 },
  { name: 'Renewal Reminder', sent: 47, openRate: 64, replyRate: 19, bookings: 4 },
];

// Avg response time synthesized
const RESPONSE_TIME_DATA = [
  { day: 'Mon', minutes: 42 },
  { day: 'Tue', minutes: 38 },
  { day: 'Wed', minutes: 51 },
  { day: 'Thu', minutes: 33 },
  { day: 'Fri', minutes: 28 },
  { day: 'Sat', minutes: 76 },
  { day: 'Sun', minutes: 92 },
];

const STATUS_FILTERS: { value: StatusFilter; label: string; count: number; color: string }[] = [
  { value: 'all', label: 'All', count: EMAIL_ROWS.length, color: 'var(--accent)' },
  { value: 'sent', label: 'Sent', count: EMAIL_ROWS.length, color: 'var(--chart-1)' },
  { value: 'opened', label: 'Opened', count: EMAIL_ROWS.filter((e) => e.opened).length, color: 'var(--chart-3)' },
  { value: 'replied', label: 'Replied', count: EMAIL_ROWS.filter((e) => e.replied).length, color: 'var(--warning)' },
];

function KpiCardMini({
  label, value, sub, icon: Icon, color, delay,
}: { label: string; value: string; sub: string; icon: React.ElementType; color: string; delay: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${delay * 70}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

// Calendar icon used by FUNNEL is imported with other lucide-react icons above

export default function EmailsPage() {
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [selected, setSelected] = React.useState<string | null>(EMAIL_ROWS[0]?.id ?? null);

  const filtered = React.useMemo(() => {
    if (status === 'all') return EMAIL_ROWS;
    if (status === 'sent') return EMAIL_ROWS;
    if (status === 'opened') return EMAIL_ROWS.filter((e) => e.opened);
    if (status === 'replied') return EMAIL_ROWS.filter((e) => e.replied);
    return EMAIL_ROWS;
  }, [status]);

  const selectedEmail = EMAIL_ROWS.find((e) => e.id === selected) ?? null;

  // KPIs
  const sentCount = 487; // synthesized weekly
  const openedCount = 312;
  const repliedCount = 96;
  const openRate = Math.round((openedCount / sentCount) * 100);
  const replyRate = Math.round((repliedCount / sentCount) * 100);
  const avgResponse = '38min';

  // Funnel max for width bars
  const funnelMax = Math.max(...FUNNEL.map((f) => f.value));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emails"
        description="Track outreach, engagement, and email-driven meeting bookings"
        icon={Mail}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Compose
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCardMini label="Sent (7d)" value={sentCount.toLocaleString()} sub="across all sequences" icon={Send} color="var(--chart-1)" delay={0} />
        <KpiCardMini label="Open Rate" value={`${openRate}%`} sub={`${openedCount} opened`} icon={Eye} color="var(--chart-3)" delay={1} />
        <KpiCardMini label="Reply Rate" value={`${replyRate}%`} sub={`${repliedCount} replies`} icon={Reply} color="var(--warning)" delay={2} />
        <KpiCardMini label="Avg Response" value={avgResponse} sub="time to first reply" icon={Clock} color="var(--accent)" delay={3} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: email list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status filter chips */}
          <div className="bg-card border border-border rounded-xl p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </div>
              {STATUS_FILTERS.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => setStatus(chip.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                    status === chip.value
                      ? 'text-foreground'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                  )}
                  style={status === chip.value ? {
                    background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                    borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
                  } : undefined}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
                  {chip.label}
                  <span className="text-[10px] text-muted-foreground">{chip.count}</span>
                </button>
              ))}
              {status !== 'all' && (
                <Button variant="ghost" size="sm" onClick={() => setStatus('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          {/* Email list (inbox-style) */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
              <h3 className="text-sm font-semibold text-foreground">Outbox</h3>
              <span className="text-[11px] text-muted-foreground">{filtered.length} emails</span>
            </div>
            <div className="divide-y divide-border max-h-[640px] overflow-y-auto">
              {filtered.map((e, i) => {
                const isSelected = selected === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelected(e.id)}
                    className={cn(
                      'w-full text-left p-4 transition-colors group animate-in fade-in slide-in-from-bottom-1',
                      isSelected ? 'bg-accent/5 border-l-2 border-l-accent' : 'hover:bg-secondary/40 border-l-2 border-l-transparent'
                    )}
                    style={{ animationDelay: `${Math.min(i, 8) * 30}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex items-start gap-3">
                      <AvatarBadge initials={e.ownerInitials} size="md" color={e.ownerColor} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs text-muted-foreground shrink-0">To:</span>
                            <span className="text-sm font-medium text-foreground truncate">{e.to}</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground shrink-0">{e.time}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate mb-0.5">{e.subject}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {e.account} · {e.owner}
                        </p>
                        {/* Engagement indicators */}
                        <div className="flex items-center gap-3 mt-2">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md',
                              e.opened ? 'bg-chart-3/15 text-chart-3' : 'bg-secondary text-muted-foreground'
                            )}
                          >
                            <Eye className="w-2.5 h-2.5" />
                            {e.opened ? 'Opened' : 'Unopened'}
                          </span>
                          {e.replied && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-warning/15 text-warning">
                              <Reply className="w-2.5 h-2.5" />
                              Replied
                            </span>
                          )}
                          {e.clicks > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-chart-1/15 text-chart-1">
                              <MousePointerClick className="w-2.5 h-2.5" />
                              {e.clicks} clicks
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar: funnel + templates */}
        <div className="space-y-4">
          {/* Engagement funnel */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Engagement Funnel</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Email → Meeting booked</p>
              </div>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-2.5">
              {FUNNEL.map((stage, i) => {
                const pct = (stage.value / funnelMax) * 100;
                const convRate = i === 0 ? 100 : Math.round((stage.value / FUNNEL[0].value) * 100);
                return (
                  <div key={stage.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <stage.icon className="w-3 h-3" style={{ color: stage.color }} />
                        <span className="font-medium text-foreground">{stage.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-foreground font-semibold tabular-nums">{stage.value}</span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{convRate}%</span>
                      </div>
                    </div>
                    <div className="h-7 bg-secondary rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md transition-all duration-1000 ease-out flex items-center justify-end px-2"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, color-mix(in oklch, ${stage.color} 70%, transparent), ${stage.color})`,
                          transitionDelay: `${i * 120 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Overall conv. rate</span>
              <span className="text-success font-semibold">5.7%</span>
            </div>
          </div>

          {/* Top performing templates */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Top Templates</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent h-7 text-xs">
                All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {TOP_TEMPLATES.map((t, i) => (
                <div
                  key={t.name}
                  className="p-3 rounded-lg border border-border hover:border-accent/40 transition-colors group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-accent/15 text-accent flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">{t.name}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{t.bookings} bookings</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div>
                      <p className="text-muted-foreground">Sent</p>
                      <p className="text-foreground font-semibold tabular-nums">{t.sent}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Open</p>
                      <p className="text-chart-3 font-semibold tabular-nums">{t.openRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reply</p>
                      <p className="text-warning font-semibold tabular-nums">{t.replyRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected email preview snippet */}
          {selectedEmail && (
            <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Email Preview</h3>
                <span className="text-[10px] text-muted-foreground">{selectedEmail.time}</span>
              </div>
              <div className="bg-secondary/40 border border-border rounded-lg p-3">
                <p className="text-[11px] text-muted-foreground mb-1">Subject</p>
                <p className="text-xs font-medium text-foreground mb-3">{selectedEmail.subject}</p>
                <p className="text-[11px] text-muted-foreground mb-1">To</p>
                <p className="text-xs text-foreground mb-3">{selectedEmail.to} · {selectedEmail.account}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Hi {selectedEmail.to.split(' ')[0]},<br /><br />
                  Following up on our recent conversation regarding {selectedEmail.account}'s platform requirements. Based on your team's feedback, we've prepared the revised proposal and pricing options…
                </p>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="h-7 text-xs flex-1">
                    <Reply className="w-3 h-3 mr-1" /> Reply
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Forward className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Archive className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
