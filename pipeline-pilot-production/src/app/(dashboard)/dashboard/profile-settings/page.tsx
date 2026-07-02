'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { AvatarBadge } from '@/components/common/status-badge';
import { repAvatarUrl } from '@/lib/avatars';
import {
  User, Upload, Palette, Bell, Plug, Check, Camera, Moon, Sun, Monitor,
  Globe, Calendar, DollarSign, Mail, Smartphone,
  Github, Slack, Figma, Chrome, AtSign, Sparkles, Trophy, Award, Shield, Zap,
} from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文 (简体)' },
];

const DATE_FORMATS = [
  { id: 'MDY', label: 'MM/DD/YYYY (US)' },
  { id: 'DMY', label: 'DD/MM/YYYY (EU)' },
  { id: 'YMD', label: 'YYYY-MM-DD (ISO)' },
];

const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'];

const NOTIFICATION_GROUPS = [
  {
    id: 'deals',
    label: 'Deal activity',
    icon: Trophy,
    color: 'var(--accent)',
    events: [
      { id: 'deal-won', label: 'Deal won', email: true, push: true, inApp: true },
      { id: 'deal-lost', label: 'Deal lost', email: true, push: false, inApp: true },
      { id: 'deal-stage', label: 'Deal stage changed', email: false, push: false, inApp: true },
      { id: 'deal-assigned', label: 'Deal assigned to me', email: true, push: true, inApp: true },
    ],
  },
  {
    id: 'team',
    label: 'Team & mentions',
    icon: User,
    color: 'var(--chart-1)',
    events: [
      { id: 'mention', label: '@mentions in comments', email: true, push: true, inApp: true },
      { id: 'assignment', label: 'Task / lead assignment', email: true, push: false, inApp: true },
      { id: 'comment', label: 'Comments on my deals', email: false, push: false, inApp: true },
    ],
  },
  {
    id: 'system',
    label: 'System & alerts',
    icon: Shield,
    color: 'var(--chart-3)',
    events: [
      { id: 'sync-error', label: 'Integration sync errors', email: true, push: true, inApp: true },
      { id: 'quota-threshold', label: 'Quota threshold reached', email: true, push: false, inApp: true },
      { id: 'security', label: 'Security alerts', email: true, push: true, inApp: true },
    ],
  },
];

const CONNECTED_ACCOUNTS = [
  { id: 'google', name: 'Google Workspace', description: 'Gmail, Calendar, Drive', icon: Chrome, color: 'oklch(0.65 0.18 250)', connected: true, account: 'sarah.chen@pipelinepilot.io' },
  { id: 'slack', name: 'Slack', description: 'Team messaging & notifications', icon: Slack, color: 'oklch(0.65 0.18 290)', connected: true, account: 'Pipeline Pilot workspace' },
  { id: 'github', name: 'GitHub', description: 'Code repository & version control', icon: Github, color: 'oklch(0.6 0.02 270)', connected: false, account: null },
  { id: 'figma', name: 'Figma', description: 'Design files & prototypes', icon: Figma, color: 'oklch(0.7 0.18 320)', connected: false, account: null },
  { id: 'outlook', name: 'Microsoft 365', description: 'Outlook email & calendar', icon: Mail, color: 'oklch(0.6 0.15 220)', connected: false, account: null },
];

const COMPLETION_ITEMS = [
  { id: 'avatar', label: 'Profile photo', done: true },
  { id: 'bio', label: 'Add a bio', done: true },
  { id: 'phone', label: 'Phone number', done: true },
  { id: 'title', label: 'Job title', done: true },
  { id: 'timezone', label: 'Set timezone', done: true },
  { id: 'social', label: 'Connect social accounts', done: false },
  { id: 'twofa', label: 'Enable 2FA', done: false },
  { id: 'preferences', label: 'Set preferences', done: false },
];

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('dark');
  const [notifStates, setNotifStates] = React.useState(() => {
    const map: Record<string, { email: boolean; push: boolean; inApp: boolean }> = {};
    NOTIFICATION_GROUPS.forEach((g) => g.events.forEach((e) => { map[e.id] = { email: e.email, push: e.push, inApp: e.inApp }; }));
    return map;
  });

  const toggleNotif = (eventId: string, channel: 'email' | 'push' | 'inApp') => {
    setNotifStates((prev) => ({ ...prev, [eventId]: { ...prev[eventId], [channel]: !prev[eventId][channel] } }));
  };

  const completionPct = Math.round((COMPLETION_ITEMS.filter((c) => c.done).length / COMPLETION_ITEMS.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        description="Manage your personal profile, preferences, notifications, and connected accounts"
        icon={User}
        actions={
          <Button size="sm">
            <Check className="w-3.5 h-3.5 mr-1.5" /> Save changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: tabbed settings (2/3) */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto grid grid-cols-2 sm:grid-cols-4 gap-1 bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="profile" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <User className="w-4 h-4" />
                <span className="text-[11px]">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Palette className="w-4 h-4" />
                <span className="text-[11px]">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Bell className="w-4 h-4" />
                <span className="text-[11px]">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="connected" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Plug className="w-4 h-4" />
                <span className="text-[11px]">Connected</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile tab */}
            <TabsContent value="profile" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <User className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Profile information</h3>
                </div>

                {/* Avatar upload */}
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <AvatarBadge initials="SC" color="var(--accent)" size="lg" className="!w-20 !h-20 !text-2xl" src={repAvatarUrl('r1', 200)} alt="Sarah Chen" />
                    <button className="absolute inset-0 rounded-full bg-black/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">JPG, PNG, or GIF. Max 2MB. Square images recommended.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border">
                        <Upload className="w-3 h-3 mr-1.5" /> Upload new
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-name" className="text-xs font-medium">Full name</Label>
                    <Input id="p-name" defaultValue="Sarah Chen" className="bg-card border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-title" className="text-xs font-medium">Job title</Label>
                    <Input id="p-title" defaultValue="VP of Sales" className="bg-card border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-email" className="text-xs font-medium flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-muted-foreground" /> Email
                    </Label>
                    <Input id="p-email" type="email" defaultValue="sarah.chen@pipelinepilot.io" className="bg-card border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p-phone" className="text-xs font-medium flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-muted-foreground" /> Phone
                    </Label>
                    <Input id="p-phone" defaultValue="+1 (415) 555-0148" className="bg-card border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="p-bio" className="text-xs font-medium">Bio</Label>
                  <textarea
                    id="p-bio"
                    rows={3}
                    defaultValue="VP of Sales at Pipeline Pilot. 12+ years building high-performing revenue teams in SaaS. Passionate about data-driven forecasting and coach-powered sales processes."
                    className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                  />
                  <p className="text-[10px] text-muted-foreground">Brief description for your team profile. Max 280 characters.</p>
                </div>
              </div>
            </TabsContent>

            {/* Preferences tab */}
            <TabsContent value="preferences" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Palette className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Appearance & preferences</h3>
                </div>

                {/* Theme selector */}
                <div>
                  <Label className="text-xs font-medium mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ] as const).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={cn(
                          'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all',
                          theme === t.id
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                        )}
                      >
                        <t.icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-muted-foreground" /> Language
                    </Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((l) => <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-muted-foreground" /> Date format
                    </Label>
                    <Select defaultValue="MDY">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {DATE_FORMATS.map((d) => <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-muted-foreground" /> Currency display
                    </Label>
                    <Select defaultValue="USD ($)">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-muted-foreground" /> Timezone
                    </Label>
                    <Select defaultValue="(UTC-08:00) Pacific Time">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="(UTC-08:00) Pacific Time">(UTC-08:00) Pacific Time</SelectItem>
                        <SelectItem value="(UTC-05:00) Eastern Time">(UTC-05:00) Eastern Time</SelectItem>
                        <SelectItem value="(UTC+00:00) UTC">(UTC+00:00) UTC</SelectItem>
                        <SelectItem value="(UTC+05:30) IST">(UTC+05:30) IST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick toggles */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Quick preferences</h4>
                  {[
                    { label: 'Show weekend in calendar', desc: 'Display Sat & Sun in calendar views', checked: false },
                    { label: 'Start week on Monday', desc: 'Use Monday as the first day of the week', checked: true },
                    { label: 'Show keyboard shortcuts', desc: 'Display a shortcuts panel in the corner', checked: true },
                    { label: 'Beta features', desc: 'Enable experimental features before general release', checked: false },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div>
                        <p className="text-xs font-medium text-foreground">{p.label}</p>
                        <p className="text-[11px] text-muted-foreground">{p.desc}</p>
                      </div>
                      <Switch defaultChecked={p.checked} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Notifications tab */}
            <TabsContent value="notifications" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Bell className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Notification preferences</h3>
                </div>

                <p className="text-xs text-muted-foreground">Choose how you want to be notified about different types of events.</p>

                <div className="space-y-5">
                  {NOTIFICATION_GROUPS.map((g, gi) => (
                    <div
                      key={g.id}
                      className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                      style={{ animationDelay: `${gi * 80}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `color-mix(in oklch, ${g.color} 12%, transparent)` }}
                        >
                          <g.icon className="w-3.5 h-3.5" style={{ color: g.color }} />
                        </div>
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">{g.label}</h4>
                      </div>

                      {/* Header row */}
                      <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-3 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <span>Event</span>
                        <span className="w-12 text-center">Email</span>
                        <span className="w-12 text-center">Push</span>
                        <span className="w-12 text-center">In-app</span>
                      </div>

                      <div className="space-y-1">
                        {g.events.map((e) => {
                          const state = notifStates[e.id];
                          return (
                            <div key={e.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-4 items-center p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-foreground truncate">{e.label}</p>
                              </div>
                              <div className="flex gap-3 sm:contents">
                                <div className="flex items-center justify-center w-12">
                                  <Switch checked={state.email} onCheckedChange={() => toggleNotif(e.id, 'email')} />
                                </div>
                                <div className="flex items-center justify-center w-12">
                                  <Switch checked={state.push} onCheckedChange={() => toggleNotif(e.id, 'push')} />
                                </div>
                                <div className="flex items-center justify-center w-12">
                                  <Switch checked={state.inApp} onCheckedChange={() => toggleNotif(e.id, 'inApp')} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border">
                    <Bell className="w-3 h-3 mr-1.5" /> Send test notification
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                    Reset to defaults
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Connected accounts tab */}
            <TabsContent value="connected" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Plug className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Connected accounts</h3>
                </div>

                <p className="text-xs text-muted-foreground">Connect your accounts to sync data and unlock integrations.</p>

                <div className="space-y-3">
                  {CONNECTED_ACCOUNTS.map((a, i) => (
                    <div
                      key={a.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border transition-all animate-in fade-in slide-in-from-bottom-2 duration-500',
                        a.connected ? 'border-border bg-secondary/30' : 'border-dashed border-border bg-secondary/10'
                      )}
                      style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `color-mix(in oklch, ${a.color} 14%, transparent)` }}
                      >
                        <a.icon className="w-5 h-5" style={{ color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{a.name}</p>
                          {a.connected && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border border-success/30 bg-success/10 text-success">
                              <Check className="w-2.5 h-2.5" /> Connected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{a.connected ? a.account : a.description}</p>
                      </div>
                      <Button
                        variant={a.connected ? 'outline' : 'default'}
                        size="sm"
                        className="h-8 text-xs shrink-0"
                      >
                        {a.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar: Profile completion */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Profile completion</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Boost your profile visibility</p>

            {/* Circular progress */}
            <div className="flex justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--secondary)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="url(#completionGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(completionPct / 100) * (2 * Math.PI * 42)} ${2 * Math.PI * 42}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="completionGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--chart-1)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground tabular-nums">{completionPct}%</span>
                  <span className="text-[10px] text-muted-foreground">complete</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {COMPLETION_ITEMS.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-1 duration-500"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  {c.done ? (
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-border shrink-0" />
                  )}
                  <span className={cn('text-xs', c.done ? 'text-muted-foreground line-through' : 'text-foreground font-medium')}>{c.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-warning" />
                <p className="text-xs font-semibold text-foreground">Achievements</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10 text-warning text-[10px] font-medium border border-warning/30">
                  <Trophy className="w-3 h-3" /> Top Performer
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-medium border border-accent/30">
                  <Zap className="w-3 h-3" /> 100-day streak
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-chart-1/10 text-chart-1 text-[10px] font-medium border border-chart-1/30">
                  <AtSign className="w-3 h-3" /> Power user
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
