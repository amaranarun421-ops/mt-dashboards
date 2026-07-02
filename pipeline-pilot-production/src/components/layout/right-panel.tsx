'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn, formatCurrency, timeAgo } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Circle,
  Clock,
  Phone,
  Video,
  Mail,
  FileText,
  StickyNote,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  Flame,
  Trophy,
  Target,
  Bell,
} from 'lucide-react';
import { activities, tasks, notifications, reps, deals, meetings } from '@/lib/data';
import { repAvatarUrl, personAvatarUrl } from '@/lib/avatars';

type TabId = 'today' | 'activity' | 'deals' | 'team';

interface RightPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  call: Phone,
  meeting: Video,
  email: Mail,
  task: CheckCircle2,
  note: StickyNote,
  deal_update: TrendingUp,
};

const ACTIVITY_COLORS: Record<string, string> = {
  call: 'text-chart-1 bg-chart-1/10',
  meeting: 'text-chart-2 bg-chart-2/10',
  email: 'text-chart-3 bg-chart-3/10',
  task: 'text-accent bg-accent/10',
  note: 'text-chart-5 bg-chart-5/10',
  deal_update: 'text-warning bg-warning/10',
};

const PRIORITY_STYLES: Record<string, { dot: string; label: string }> = {
  high: { dot: 'bg-destructive', label: 'High' },
  medium: { dot: 'bg-warning', label: 'Medium' },
  low: { dot: 'bg-muted-foreground', label: 'Low' },
};

const NOTIF_STYLES: Record<string, { icon: React.ElementType; color: string }> = {
  deal: { icon: TrendingUp, color: 'text-chart-2 bg-chart-2/10' },
  achievement: { icon: Trophy, color: 'text-accent bg-accent/10' },
  risk: { icon: AlertTriangle, color: 'text-destructive bg-destructive/10' },
  lead: { icon: Target, color: 'text-chart-1 bg-chart-1/10' },
  meeting: { icon: Calendar, color: 'text-chart-3 bg-chart-3/10' },
  system: { icon: FileText, color: 'text-muted-foreground bg-muted' },
  forecast: { icon: TrendingUp, color: 'text-chart-2 bg-chart-2/10' },
  contact: { icon: Mail, color: 'text-chart-5 bg-chart-5/10' },
};

export function RightPanel({ open, onOpenChange, mobileOpen, onMobileOpenChange }: RightPanelProps) {
  const [tab, setTab] = React.useState<TabId>('today');

  const tabs: { id: TabId; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'today', label: 'Today', icon: Clock },
    { id: 'activity', label: 'Activity', icon: Flame, badge: activities.length },
    { id: 'deals', label: 'Hot Deals', icon: TrendingUp },
    { id: 'team', label: 'Team', icon: Trophy },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => onMobileOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300 ease-out flex flex-col',
          open ? 'w-[340px]' : 'w-0 lg:w-[60px]',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border shrink-0 gap-2">
          {open ? (
            <>
              <span className="font-semibold text-base text-sidebar-foreground flex-1 truncate">
                Workspace
              </span>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onOpenChange(false)}
                      className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      aria-label="Collapse panel"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left" sideOffset={8}>
                    Collapse panel
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <button
              onClick={() => onOpenChange(true)}
              className="w-full h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              aria-label="Expand panel"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
            onClick={() => onMobileOpenChange(false)}
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {open && (
          <>
            {/* Tabs */}
            <div className="px-3 pt-3 pb-2 shrink-0">
              <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={cn(
                        'relative flex flex-col items-center gap-0.5 py-1.5 rounded-md text-[10px] font-medium transition-all',
                        active
                          ? 'bg-sidebar text-sidebar-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-sidebar-foreground'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                      {t.badge && (
                        <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0 px-3 pb-3">
              <div className="space-y-3">
                {tab === 'today' && <TodayTab />}
                {tab === 'activity' && <ActivityTab />}
                {tab === 'deals' && <DealsTab />}
                {tab === 'team' && <TeamTab />}
              </div>
            </ScrollArea>

            {/* Footer summary */}
            <div className="p-3 border-t border-sidebar-border shrink-0 hidden lg:block">
              <div className="rounded-lg bg-sidebar-accent/50 border border-sidebar-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Quarter progress
                  </span>
                  <span className="text-[10px] font-semibold text-accent">68%</span>
                </div>
                <Progress value={68} className="h-1.5" />
                <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>$2.38M / $3.5M</span>
                  <span className="text-accent flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    12% vs Q2
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ---------------- Today Tab ---------------- */

function TodayTab() {
  const upcomingMeetings = meetings.slice(0, 2);
  const urgentTasks = tasks.filter((t) => t.priority === 'high').slice(0, 3);
  const unreadNotifs = notifications.filter((n) => !n.read).slice(0, 4);

  return (
    <>
      {/* Upcoming meetings */}
      <PanelSection title="Up next" icon={Calendar} accent="text-chart-2">
        <div className="space-y-2">
          {upcomingMeetings.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-sidebar-border bg-sidebar p-2.5 hover:border-accent/40 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-chart-2/10 flex items-center justify-center shrink-0">
                  <Video className="w-3.5 h-3.5 text-chart-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-sidebar-foreground truncate">
                    {m.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{m.account}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{m.time}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>{m.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Urgent tasks */}
      <PanelSection title="Priority tasks" icon={CheckCircle2} accent="text-destructive">
        <div className="space-y-1.5">
          {urgentTasks.map((t) => {
            const style = PRIORITY_STYLES[t.priority];
            return (
              <div
                key={t.id}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer group"
              >
                <Circle className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent mt-0.5 shrink-0 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-sidebar-foreground line-clamp-2">
                    {t.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} />
                    <span className="text-[10px] text-muted-foreground">{t.due}</span>
                    {t.related && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 font-mono">
                        {t.related}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PanelSection>

      {/* Recent notifications */}
      <PanelSection title="Alerts" icon={Bell} accent="text-warning" badge={unreadNotifs.length}>
        <div className="space-y-1.5">
          {unreadNotifs.map((n) => {
            const style = NOTIF_STYLES[n.type] || NOTIF_STYLES.system;
            const Icon = style.icon;
            return (
              <div
                key={n.id}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer"
              >
                <div className={cn('w-6 h-6 rounded-md flex items-center justify-center shrink-0', style.color)}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-sidebar-foreground line-clamp-1">
                    {n.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                    {n.message}
                  </div>
                  <div className="text-[10px] text-muted-foreground/70 mt-0.5">{n.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </PanelSection>
    </>
  );
}

/* ---------------- Activity Tab ---------------- */

function ActivityTab() {
  return (
    <PanelSection title="Live feed" icon={Flame} accent="text-accent">
      <div className="relative">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-sidebar-border" />
        <div className="space-y-3">
          {activities.map((a) => {
            const Icon = ACTIVITY_ICONS[a.type] || FileText;
            const colorClass = ACTIVITY_COLORS[a.type] || 'text-muted-foreground bg-muted';
            return (
              <div key={a.id} className="relative flex items-start gap-3">
                <div
                  className={cn(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4 ring-sidebar',
                    colorClass
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-sidebar-foreground truncate">
                      {a.owner}
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
                      {a.timestamp}
                    </span>
                  </div>
                  <div className="text-xs text-sidebar-foreground line-clamp-2">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                    {a.description}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">
                      {a.relatedTo}
                    </Badge>
                    {a.outcome && (
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[9px] px-1.5 py-0 h-4',
                          a.outcome === 'Successful' && 'border-success/40 text-success',
                          a.outcome === 'No Answer' && 'border-destructive/40 text-destructive',
                          a.outcome === 'Awaiting reply' && 'border-warning/40 text-warning'
                        )}
                      >
                        {a.outcome}
                      </Badge>
                    )}
                    {a.duration && (
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {a.duration}m
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PanelSection>
  );
}

/* ---------------- Deals Tab ---------------- */

function DealsTab() {
  const hotDeals = [...deals]
    .filter((d) => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost')
    .sort((a, b) => b.value * b.probability - a.value * a.probability)
    .slice(0, 6);

  return (
    <PanelSection title="Hot pipeline" icon={TrendingUp} accent="text-chart-2">
      <div className="space-y-2">
        {hotDeals.map((d, i) => {
          const weighted = d.value * d.probability;
          return (
            <Link
              key={d.id}
              href={`/dashboard/deals/${d.id}`}
              className="block p-2.5 rounded-lg border border-sidebar-border bg-sidebar hover:border-accent/40 hover:bg-sidebar-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    #{i + 1}
                  </span>
                  <span className="text-xs font-medium text-sidebar-foreground truncate">
                    {d.account}
                  </span>
                </div>
                <span className="text-xs font-semibold text-sidebar-foreground shrink-0">
                  {formatCurrency(d.value, { compact: true })}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground mb-1.5 line-clamp-1">
                {d.name}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex-1 h-1 rounded-full bg-sidebar-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-chart-2"
                    style={{ width: `${d.probability}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                  {d.probability}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">{d.stage}</span>
                <span className="text-accent font-medium">
                  {formatCurrency(weighted, { compact: true })} weighted
                </span>
              </div>
              {d.riskScore > 30 && (
                <div className="flex items-center gap-1 mt-1 text-[10px] text-destructive">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Risk score {d.riskScore}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </PanelSection>
  );
}

/* ---------------- Team Tab ---------------- */

function TeamTab() {
  const topReps = [...reps].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  return (
    <PanelSection title="Leaderboard" icon={Trophy} accent="text-warning">
      <div className="space-y-2">
        {topReps.map((r, i) => {
          const attainment = Math.min(150, Math.round((r.revenue / r.quota) * 100));
          return (
            <div
              key={r.id}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
            >
              <div
                className={cn(
                  'w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0',
                  i === 0 && 'bg-warning/20 text-warning',
                  i === 1 && 'bg-muted-foreground/20 text-muted-foreground',
                  i === 2 && 'bg-chart-5/20 text-chart-5',
                  i > 2 && 'bg-sidebar-accent text-muted-foreground'
                )}
              >
                {i + 1}
              </div>
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarImage src={repAvatarUrl(r.id, 80)} alt={r.name} />
                <AvatarFallback
                  className="text-[10px] font-semibold text-white"
                  style={{ backgroundColor: r.avatarColor }}
                >
                  {r.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-medium text-sidebar-foreground truncate">
                    {r.name}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-semibold shrink-0',
                      r.changePct >= 0 ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {r.changePct >= 0 ? '+' : ''}
                    {r.changePct}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-sidebar-border overflow-hidden">
                    <div
                      className={cn(
                        'h-full',
                        attainment >= 100 ? 'bg-success' : 'bg-accent'
                      )}
                      style={{ width: `${Math.min(100, attainment)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    {attainment}%
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5 text-[10px] text-muted-foreground">
                  <span>{formatCurrency(r.revenue, { compact: true })}</span>
                  <span>{r.dealsClosed} deals · {r.winRate}% win</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PanelSection>
  );
}

/* ---------------- Shared Section ---------------- */

function PanelSection({
  title,
  icon: Icon,
  accent,
  badge,
  children,
}: {
  title: string;
  icon: React.ElementType;
  accent: string;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-1">
        <Icon className={cn('w-3.5 h-3.5', accent)} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        {badge !== undefined && badge > 0 && (
          <Badge variant="accent" className="ml-auto text-[9px] px-1.5 py-0 h-4">
            {badge}
          </Badge>
        )}
      </div>
      {children}
      <Separator className="mt-3 opacity-0" />
    </div>
  );
}
