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
import {
  Settings, Upload, Palette, SlidersHorizontal, AlertTriangle,
  Globe, DollarSign, Calendar, Building2, Users, Plug, Crown,
  Trash2, ArrowRightLeft, Check, Monitor, Moon, Sun,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const TIMEZONES = ['(UTC-08:00) Pacific Time', '(UTC-05:00) Eastern Time', '(UTC+00:00) UTC', '(UTC+01:00) Central European Time', '(UTC+05:30) India Standard Time', '(UTC+08:00) China Standard Time'];
const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)', 'CAD ($)', 'AUD ($)'];
const FISCAL_START = ['January', 'April', 'July', 'October'];
const LANDING_PAGES = [
  { id: 'overview', label: 'Dashboard Overview' },
  { id: 'pipeline', label: 'Sales Pipeline' },
  { id: 'deals', label: 'Deals List' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'inbox', label: 'Inbox' },
];

const WORKSPACE_STATS = [
  { label: 'Members', value: 28, sub: '3 pending invites', icon: Users, color: 'var(--accent)' },
  { label: 'Integrations', value: 12, sub: '3 sync errors', icon: Plug, color: 'var(--chart-1)' },
  { label: 'Plan', value: 'Growth', sub: '$1,499 / mo', icon: Crown, color: 'var(--chart-5)' },
  { label: 'Created', value: 'Jan 2025', sub: '7 months ago', icon: Calendar, color: 'var(--chart-3)' },
];

const BRAND_COLORS = [
  { name: 'Emerald', value: 'oklch(0.7 0.18 145)' },
  { name: 'Ocean', value: 'oklch(0.7 0.18 220)' },
  { name: 'Sunset', value: 'oklch(0.7 0.18 30)' },
  { name: 'Rose', value: 'oklch(0.7 0.18 350)' },
  { name: 'Violet', value: 'oklch(0.7 0.18 290)' },
  { name: 'Amber', value: 'oklch(0.75 0.18 80)' },
];

export default function WorkspaceSettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');
  const [selectedColor, setSelectedColor] = React.useState(BRAND_COLORS[0].value);
  const [compactMode, setCompactMode] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace Settings"
        description="Configure your workspace identity, branding, and preferences"
        icon={Settings}
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
              <TabsTrigger value="general" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-[11px]">General</span>
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <Palette className="w-4 h-4" />
                <span className="text-[11px]">Branding</span>
              </TabsTrigger>
              <TabsTrigger value="customization" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-[11px]">Customization</span>
              </TabsTrigger>
              <TabsTrigger value="danger" className="flex flex-col gap-1 h-auto py-2 data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[11px]">Danger Zone</span>
              </TabsTrigger>
            </TabsList>

            {/* General tab */}
            <TabsContent value="general" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">General information</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ws-name" className="text-xs font-medium">Workspace name</Label>
                  <Input id="ws-name" defaultValue="Pipeline Pilot HQ" className="bg-card border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ws-desc" className="text-xs font-medium">Description</Label>
                  <textarea
                    id="ws-desc"
                    rows={3}
                    defaultValue="Primary sales operations workspace for the global sales team at Pipeline Pilot."
                    className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-muted-foreground" /> Timezone
                    </Label>
                    <Select defaultValue="(UTC-08:00) Pacific Time">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-muted-foreground" /> Default currency
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
                      <Calendar className="w-3 h-3 text-muted-foreground" /> Fiscal year start
                    </Label>
                    <Select defaultValue="January">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {FISCAL_START.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-muted-foreground" /> Industry
                    </Label>
                    <Select defaultValue="SaaS / Software">
                      <SelectTrigger className="bg-card border-border h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SaaS / Software">SaaS / Software</SelectItem>
                        <SelectItem value="Financial Services">Financial Services</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Branding tab */}
            <TabsContent value="branding" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Palette className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Branding & identity</h3>
                </div>

                {/* Logo upload */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Workspace logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-secondary/40 flex items-center justify-center overflow-hidden shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-chart-1 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">PNG, JPG, or SVG. Max 1MB. Recommended 256×256px.</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border">
                          <Upload className="w-3 h-3 mr-1.5" /> Upload
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-3 h-3 mr-1.5" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary color */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Primary brand color</Label>
                  <div className="flex flex-wrap gap-3">
                    {BRAND_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedColor(c.value)}
                        className={cn(
                          'group relative w-12 h-12 rounded-lg transition-all hover:scale-110',
                          selectedColor === c.value && 'ring-2 ring-offset-2 ring-offset-background ring-foreground'
                        )}
                        style={{ background: c.value }}
                        title={c.name}
                      >
                        {selectedColor === c.value && (
                          <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">Selected: <span className="font-medium text-foreground">{BRAND_COLORS.find((c) => c.value === selectedColor)?.name}</span></p>
                </div>

                {/* Custom domain */}
                <div className="space-y-2">
                  <Label htmlFor="ws-domain" className="text-xs font-medium">Custom domain</Label>
                  <div className="flex gap-2">
                    <Input id="ws-domain" defaultValue="sales.pipelinepilot.io" className="bg-card border-border flex-1" />
                    <Button variant="outline" size="sm" className="bg-card border-border h-9 text-xs">
                      Verify
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-success/30 bg-success/10 text-success">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                    <span className="text-muted-foreground">SSL certificate active · expires Aug 2025</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="pt-4 border-t border-border">
                  <Label className="text-xs font-medium mb-2 block">Preview</Label>
                  <div className="rounded-lg p-4 bg-gradient-to-br from-secondary/40 to-secondary/10 border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: selectedColor }}>
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Pipeline Pilot HQ</p>
                        <p className="text-[10px] text-muted-foreground">sales.pipelinepilot.io</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-[10px] px-2 py-1 rounded-md text-white" style={{ background: selectedColor }}>Primary button</button>
                      <button className="text-[10px] px-2 py-1 rounded-md border border-border text-foreground">Secondary</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Customization tab */}
            <TabsContent value="customization" className="mt-4">
              <div className="bg-card border border-border rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Customization preferences</h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Default landing page</Label>
                  <p className="text-[11px] text-muted-foreground mb-2">Where users land after logging in</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LANDING_PAGES.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-accent/30 cursor-pointer transition-all"
                      >
                        <input type="radio" name="landing" defaultChecked={p.id === 'overview'} className="accent-[var(--accent)]" />
                        <span className="text-xs text-foreground">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Display preferences</h4>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">Compact mode</p>
                        <p className="text-[11px] text-muted-foreground">Reduce padding and density for power users</p>
                      </div>
                    </div>
                    <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-chart-1/10 flex items-center justify-center">
                        <SlidersHorizontal className="w-4 h-4 text-chart-1" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">Sidebar collapsed by default</p>
                        <p className="text-[11px] text-muted-foreground">Start with the sidebar collapsed to icon-only mode</p>
                      </div>
                    </div>
                    <Switch checked={sidebarCollapsed} onCheckedChange={setSidebarCollapsed} />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-chart-3/10 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-chart-3" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">Auto-refresh dashboard</p>
                        <p className="text-[11px] text-muted-foreground">Refresh KPI cards every 60 seconds</p>
                      </div>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-chart-5/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-chart-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">Email weekly digest</p>
                        <p className="text-[11px] text-muted-foreground">Send a Monday morning summary to all members</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Danger Zone */}
            <TabsContent value="danger" className="mt-4">
              <div className="bg-card border border-destructive/30 rounded-xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 pb-3 border-b border-destructive/30">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
                </div>

                <div className="rounded-lg border border-border bg-secondary/20 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Transfer workspace ownership</p>
                      <p className="text-xs text-muted-foreground mt-1">Transfer ownership to another admin. You will become a regular admin.</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-card border-border h-8 text-xs shrink-0">
                      <ArrowRightLeft className="w-3 h-3 mr-1.5" /> Transfer
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-destructive/30 bg-destructive/[0.04] p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Export workspace data</p>
                      <p className="text-xs text-muted-foreground mt-1">Download all data as a ZIP archive before deletion.</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-card border-border h-8 text-xs shrink-0">
                      Export data
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-destructive/40 bg-destructive/[0.06] p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-destructive">Delete workspace</p>
                      <p className="text-xs text-muted-foreground mt-1">Permanently delete this workspace and all associated data. This action cannot be undone.</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="h-8 text-xs shrink-0">
                          <Trash2 className="w-3 h-3 mr-1.5" /> Delete workspace
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete <span className="font-semibold text-foreground">Pipeline Pilot HQ</span>, including all deals, contacts, accounts, and 28 members. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-2">
                          <Label htmlFor="confirm-name" className="text-xs">Type the workspace name to confirm:</Label>
                          <Input id="confirm-name" placeholder="Pipeline Pilot HQ" className="mt-2 bg-card border-border" />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete forever
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar: Workspace stats */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Workspace stats</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-5">Pipeline Pilot HQ overview</p>

            {/* Logo block */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-accent/[0.06] to-transparent border border-border mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-chart-1 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Pipeline Pilot HQ</p>
                <p className="text-[10px] text-muted-foreground truncate">Workspace ID: pp_hq_2847</p>
              </div>
            </div>

            <div className="space-y-3">
              {WORKSPACE_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-semibold text-foreground tabular-nums truncate">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Storage</p>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">42 GB used</span>
                <span className="text-foreground font-medium">of 100 GB</span>
              </div>
              <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{ width: '42%', background: 'linear-gradient(90deg, var(--accent), var(--chart-1))' }}
                />
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full h-8 mt-4 text-xs bg-card border-border">
              View workspace analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
