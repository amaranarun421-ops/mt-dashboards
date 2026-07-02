'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { notifications } from '@/lib/data';
import {
  Bell, CheckCheck, Filter, Handshake, Trophy, AlertTriangle, UserPlus,
  Calendar, RefreshCw, Mail, Settings, Check, MoreHorizontal, AtSign,
  Sparkles, MessageSquare, Webhook,
} from 'lucide-react';

type FilterType = 'all' | 'unread' | 'mentions' | 'deals' | 'system';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  deal: { icon: Handshake, color: 'var(--accent)', bg: 'bg-accent/10', border: 'border-accent/30' },
  achievement: { icon: Trophy, color: 'var(--warning)', bg: 'bg-warning/10', border: 'border-warning/30' },
  risk: { icon: AlertTriangle, color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  lead: { icon: UserPlus, color: 'var(--chart-3)', bg: 'bg-chart-3/10', border: 'border-chart-3/30' },
  meeting: { icon: Calendar, color: 'var(--chart-1)', bg: 'bg-chart-1/10', border: 'border-chart-1/30' },
  system: { icon: RefreshCw, color: 'var(--chart-5)', bg: 'bg-chart-5/10', border: 'border-chart-5/30' },
  forecast: { icon: CheckCheck, color: 'var(--chart-4)', bg: 'bg-chart-4/10', border: 'border-chart-4/30' },
  contact: { icon: AtSign, color: 'var(--chart-2)', bg: 'bg-chart-2/10', border: 'border-chart-2/30' },
};

const FILTERS: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: Bell },
  { value: 'unread', label: 'Unread', icon: Mail },
  { value: 'mentions', label: 'Mentions', icon: AtSign },
  { value: 'deals', label: 'Deals', icon: Handshake },
  { value: 'system', label: 'System', icon: Settings },
];

const PREFERENCES = [
  {
    category: 'Deals',
    icon: Handshake,
    color: 'var(--accent)',
    items: [
      { label: 'Deal stage changes', desc: 'When a deal moves between stages', enabled: true },
      { label: 'High-value deal alerts', desc: 'Deals over $100k', enabled: true },
      { label: 'Stalled deals', desc: 'Deals with no activity for 14+ days', enabled: true },
      { label: 'Deal won', desc: 'When a deal is closed won', enabled: false },
    ],
  },
  {
    category: 'Achievements',
    icon: Trophy,
    color: 'var(--warning)',
    items: [
      { label: 'Quota milestones', desc: 'When reps hit 50%, 75%, 100% of quota', enabled: true },
      { label: 'Win streaks', desc: '3+ wins in a row', enabled: false },
      { label: 'Team records', desc: 'New monthly or quarterly records', enabled: true },
    ],
  },
  {
    category: 'Risk & Alerts',
    icon: AlertTriangle,
    color: 'var(--destructive)',
    items: [
      { label: 'High churn risk', desc: 'Customer health drops below 60', enabled: true },
      { label: 'Deal at risk', desc: 'Risk score above 50', enabled: true },
      { label: 'Quota shortfall', desc: 'Reps tracking below 70% attainment', enabled: true },
    ],
  },
  {
    category: 'System',
    icon: Settings,
    color: 'var(--chart-5)',
    items: [
      { label: 'CRM sync status', desc: 'Sync completions and failures', enabled: true },
      { label: 'API key activity', desc: 'New keys created or revoked', enabled: false },
      { label: 'Failed login attempts', desc: 'Security alerts', enabled: true },
    ],
  },
];

// Synthesize a few more notifications to make grouping visible
const EXTENDED_NOTIFICATIONS = [
  ...notifications,
  { id: 'n9', title: 'New comment on deal', message: 'Marcus Bell commented on Robotics Vision Stack: "Pricing approval expected Friday"', type: 'contact', time: '8h ago', read: false, priority: 'low' },
  { id: 'n10', title: 'Daily summary ready', message: 'Yesterday\'s performance summary is available for review', type: 'system', time: 'Yesterday', read: true, priority: 'low' },
  { id: 'n11', title: 'Deal closed won', message: 'CloudFirst Multi-Region Expansion closed for $178,000', type: 'achievement', time: 'Yesterday', read: true, priority: 'medium' },
  { id: 'n12', title: 'Lead score increased', message: 'Rebecca Lin from Northwind Trading is now hot (score: 88)', type: 'lead', time: 'Yesterday', read: true, priority: 'medium' },
  { id: 'n13', title: 'Weekly pipeline digest', message: 'Your weekly pipeline summary is ready', type: 'system', time: '2 days ago', read: true, priority: 'low' },
  { id: 'n14', title: 'New mention in comment', message: 'You were mentioned by Emily Davis on Pulse Health Systems deal', type: 'contact', time: '3 days ago', read: true, priority: 'medium' },
];

const CHANNELS: { channel: string; icon: React.ElementType; desc: string; enabled: boolean; color: string }[] = [
  { channel: 'In-app', icon: Bell, desc: 'Browser + mobile app', enabled: true, color: 'var(--accent)' },
  { channel: 'Email', icon: Mail, desc: 'sarah.chen@pipelinepilot.io', enabled: true, color: 'var(--chart-1)' },
  { channel: 'Slack', icon: MessageSquare, desc: '#sales-alerts channel', enabled: true, color: 'var(--chart-3)' },
  { channel: 'Webhook', icon: Webhook, desc: '2 active webhooks', enabled: false, color: 'var(--chart-5)' },
];

function ChannelRow({ channel, icon: Icon, desc, enabled: initialEnabled, color }: {
  channel: string;
  icon: React.ElementType;
  desc: string;
  enabled: boolean;
  color: string;
}) {
  const [on, setOn] = React.useState(initialEnabled);
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-secondary/30">
      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${color} 12%, transparent)` }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground">{channel}</p>
        <p className="text-[10px] text-muted-foreground truncate">{desc}</p>
      </div>
      <Switch checked={on} onCheckedChange={setOn} className="scale-90 shrink-0" />
    </div>
  );
}

function groupByDate(items: typeof EXTENDED_NOTIFICATIONS) {
  const groups: { label: string; items: typeof EXTENDED_NOTIFICATIONS }[] = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'This week', items: [] },
    { label: 'Earlier', items: [] },
  ];
  items.forEach((n) => {
    const t = n.time.toLowerCase();
    if (t.includes('m ago') || t.includes('h ago') || t === 'today') groups[0].items.push(n);
    else if (t.includes('yesterday') || t === '1 day ago') groups[1].items.push(n);
    else if (t.includes('days ago') && parseInt(t) <= 6) groups[2].items.push(n);
    else groups[3].items.push(n);
  });
  return groups.filter((g) => g.items.length > 0);
}

export default function NotificationsPage() {
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [readState, setReadState] = React.useState<Record<string, boolean>>(
    Object.fromEntries(EXTENDED_NOTIFICATIONS.map((n) => [n.id, n.read]))
  );
  const [prefs, setPrefs] = React.useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    PREFERENCES.forEach((cat) => cat.items.forEach((item) => { map[item.label] = item.enabled; }));
    return map;
  });

  const filtered = React.useMemo(() => {
    return EXTENDED_NOTIFICATIONS.filter((n) => {
      if (filter === 'unread') return !readState[n.id];
      if (filter === 'mentions') return n.type === 'contact';
      if (filter === 'deals') return n.type === 'deal' || n.type === 'achievement' || n.type === 'risk';
      if (filter === 'system') return n.type === 'system' || n.type === 'forecast';
      return true;
    });
  }, [filter, readState]);

  const grouped = groupByDate(filtered);
  const unreadCount = EXTENDED_NOTIFICATIONS.filter((n) => !readState[n.id]).length;

  const markAllRead = () => {
    setReadState(Object.fromEntries(EXTENDED_NOTIFICATIONS.map((n) => [n.id, true])));
  };

  const toggleRead = (id: string) => {
    setReadState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay on top of every deal change, achievement, and system event"
        icon={Bell}
        actions={
          <>
            <Button size="sm" variant="outline" className="bg-card border-border" onClick={markAllRead}>
              <CheckCheck className="w-3.5 h-3.5 mr-1.5" /> Mark all read
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Settings className="w-3.5 h-3.5 mr-1.5" /> Preferences
            </Button>
          </>
        }
      />

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 overflow-x-auto">
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            const count = f.value === 'all'
              ? EXTENDED_NOTIFICATIONS.length
              : f.value === 'unread'
              ? unreadCount
              : EXTENDED_NOTIFICATIONS.filter((n) => {
                  if (f.value === 'mentions') return n.type === 'contact';
                  if (f.value === 'deals') return n.type === 'deal' || n.type === 'achievement' || n.type === 'risk';
                  if (f.value === 'system') return n.type === 'system' || n.type === 'forecast';
                  return false;
                }).length;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                  isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <f.icon className="w-3 h-3" />
                {f.label}
                <span className={cn(
                  'text-[10px] tabular-nums px-1 rounded',
                  isActive ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main: notification list + preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Notification list */}
        <div className="lg:col-span-3 space-y-5">
          {grouped.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">You're all caught up</h3>
              <p className="text-xs text-muted-foreground mt-1">No notifications match this filter.</p>
            </div>
          ) : (
            grouped.map((group, gi) => (
              <div key={group.label}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.label}</h3>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] text-muted-foreground">{group.items.length}</span>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  {group.items.map((n, i) => {
                    const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.system;
                    const Icon = cfg.icon;
                    const isRead = readState[n.id];
                    return (
                      <div
                        key={n.id}
                        className={cn(
                          'group relative flex items-start gap-3 p-4 border-b border-border last:border-0 transition-colors hover:bg-secondary/30 animate-in fade-in slide-in-from-bottom-2 duration-500',
                          !isRead && 'bg-accent/[0.03]'
                        )}
                        style={{ animationDelay: `${(gi * 4 + i) * 40}ms`, animationFillMode: 'both' }}
                      >
                        {/* Unread indicator */}
                        {!isRead && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full bg-accent" />
                        )}

                        {/* Icon */}
                        <div className={cn('relative w-9 h-9 rounded-lg flex items-center justify-center border shrink-0', cfg.bg, cfg.border)}>
                          <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <h4 className={cn('text-sm truncate', isRead ? 'font-medium text-foreground' : 'font-semibold text-foreground')}>
                                {n.title}
                              </h4>
                              {n.priority === 'high' && !isRead && (
                                <span className="inline-flex items-center gap-0.5 px-1 py-0 rounded text-[9px] font-bold border border-destructive/30 bg-destructive/10 text-destructive shrink-0">
                                  HIGH
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          {!isRead && (
                            <button
                              onClick={() => toggleRead(n.id)}
                              className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: preferences */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Choose what you want to be notified about</p>

            <div className="space-y-5">
              {PREFERENCES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.category}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${cat.color} 12%, transparent)` }}>
                        <Icon className="w-3 h-3" style={{ color: cat.color }} />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{cat.category}</span>
                    </div>
                    <div className="space-y-1 pl-1">
                      {cat.items.map((item) => (
                        <div key={item.label} className="flex items-start justify-between gap-2 p-2 rounded-md hover:bg-secondary/40 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground">{item.label}</p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                          <Switch
                            checked={prefs[item.label]}
                            onCheckedChange={(checked) => setPrefs((p) => ({ ...p, [item.label]: checked }))}
                            className="scale-90 shrink-0 mt-0.5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Channels */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Delivery channels</h3>
            </div>
            <div className="space-y-2">
              {CHANNELS.map((ch) => (
                <ChannelRow key={ch.channel} {...ch} />
              ))}
            </div>
          </div>

          {/* AI smart summary */}
          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <p className="text-xs font-semibold text-foreground">Smart digest</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Get a daily AI-summarized digest of all important notifications at 8:00 AM.
            </p>
            <Button size="sm" variant="outline" className="w-full bg-card border-accent/30 text-accent hover:bg-accent/10 h-8 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" /> Enable smart digest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
