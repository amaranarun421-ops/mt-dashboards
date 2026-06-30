"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  LayoutGrid, List, Star, Clock, Bell, User, Settings, Lock,
  CreditCard, Mail, Phone, Globe, FileText, Folder,
  Sparkles, TrendingUp, AlertCircle, CheckCircle2,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function TabsPage() {
  const [vertical, setVertical] = React.useState("overview");
  const [underline, setUnderline] = React.useState("activity");
  const [segmented, setSegmented] = React.useState("week");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tabs"
        description="Tab variants — default, pills, underline, segmented, vertical, with icons, and with badges."
        breadcrumbs={[{ label: "UI Library" }, { label: "Tabs" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Default Tabs" description="Standard background-filled tab strip.">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">
              Your workspace overview: 14 active projects, 284 commits this week, and 12 team members.
            </TabsContent>
            <TabsContent value="projects" className="mt-3 text-sm text-muted-foreground">
              All projects across the workspace, sortable by recent activity or owner.
            </TabsContent>
            <TabsContent value="reports" className="mt-3 text-sm text-muted-foreground">
              Build and schedule reports — choose from 12 templates or start from scratch.
            </TabsContent>
            <TabsContent value="activity" className="mt-3 text-sm text-muted-foreground">
              Live feed of every action across your workspace in the past 30 days.
            </TabsContent>
          </Tabs>
        </SectionCard>

        <SectionCard title="Pills" description="Rounded pill-style tabs with bordered background.">
          <Tabs defaultValue="all">
            <TabsList className="bg-transparent gap-1 p-0 h-auto">
              {["all", "active", "archived", "drafts"].map((v) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="rounded-full px-3.5 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border capitalize"
                >
                  {v}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-3 text-sm text-muted-foreground">Showing all 248 projects across the workspace.</TabsContent>
            <TabsContent value="active" className="mt-3 text-sm text-muted-foreground">42 active projects in progress right now.</TabsContent>
            <TabsContent value="archived" className="mt-3 text-sm text-muted-foreground">206 archived projects kept for reference.</TabsContent>
            <TabsContent value="drafts" className="mt-3 text-sm text-muted-foreground">3 draft projects not yet started.</TabsContent>
          </Tabs>
        </SectionCard>

        <SectionCard title="Underline Tabs" description="Borderless tabs with bottom underline indicator.">
          <div className="border-b border-border">
            <div className="flex gap-4">
              {[
                { id: "activity", label: "Activity" },
                { id: "timeline", label: "Timeline" },
                { id: "comments", label: "Comments" },
                { id: "files", label: "Files" },
              ].map((t) => (
                <button
                  key={t.id}
                  className={cn(
                    "relative pb-2 pt-1 text-sm font-medium transition-colors -mb-px border-b-2",
                    underline === t.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setUnderline(t.id)}
                >
                  {t.label}
                  {underline === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            {underline === "activity" && "Recent actions across this project — commits, comments, status changes."}
            {underline === "timeline" && "Chronological view of milestones and key events."}
            {underline === "comments" && "12 threaded comments from 4 team members."}
            {underline === "files" && "8 attached files totaling 24.6 MB."}
          </div>
        </SectionCard>

        <SectionCard title="Segmented Control" description="Compact alternative for switching between few options.">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Time range</p>
              <div className="inline-flex rounded-md border border-border p-0.5 bg-muted/40">
                {["day", "week", "month", "year"].map((v) => (
                  <button
                    key={v}
                    className={cn(
                      "px-3 h-7 text-xs font-medium rounded-[5px] transition-colors capitalize",
                      segmented === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setSegmented(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">View mode</p>
              <div className="inline-flex rounded-md border border-border p-0.5 bg-muted/40">
                {[
                  { id: "grid", icon: LayoutGrid, label: "Grid" },
                  { id: "list", icon: List, label: "List" },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button key={m.id} className="px-3 h-7 text-xs font-medium rounded-[5px] flex items-center gap-1.5 transition-colors text-muted-foreground hover:text-foreground">
                      <Icon className="size-3.5" /> {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="With Icons" description="Tabs with leading icons for clearer scannability.">
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox"><Mail className="size-3.5 mr-1.5" />Inbox</TabsTrigger>
              <TabsTrigger value="starred"><Star className="size-3.5 mr-1.5" />Starred</TabsTrigger>
              <TabsTrigger value="sent"><Globe className="size-3.5 mr-1.5" />Sent</TabsTrigger>
              <TabsTrigger value="drafts"><FileText className="size-3.5 mr-1.5" />Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="mt-3 text-sm text-muted-foreground">14 unread messages from your team.</TabsContent>
            <TabsContent value="starred" className="mt-3 text-sm text-muted-foreground">8 messages you&apos;ve starred for later.</TabsContent>
            <TabsContent value="sent" className="mt-3 text-sm text-muted-foreground">Your last 5 outbound emails were all delivered.</TabsContent>
            <TabsContent value="drafts" className="mt-3 text-sm text-muted-foreground">2 drafts waiting to be sent.</TabsContent>
          </Tabs>
        </SectionCard>

        <SectionCard title="With Badges" description="Tabs showing counts for notifications or items.">
          <Tabs defaultValue="open">
            <TabsList>
              <TabsTrigger value="open" className="gap-1.5">
                Open
                <Badge variant="secondary" className="h-4 px-1 text-[10px]">12</Badge>
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="gap-1.5">
                In Progress
                <Badge variant="outline" className="h-4 px-1 text-[10px] bg-info/10 text-info border-info/20">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="waiting" className="gap-1.5">
                Waiting
                <Badge variant="outline" className="h-4 px-1 text-[10px] bg-warning/10 text-warning border-warning/20">5</Badge>
              </TabsTrigger>
              <TabsTrigger value="closed" className="gap-1.5">
                Closed
                <Badge variant="outline" className="h-4 px-1 text-[10px] bg-success/10 text-success border-success/20">142</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="open" className="mt-3 text-sm text-muted-foreground">12 open tickets awaiting triage.</TabsContent>
            <TabsContent value="in-progress" className="mt-3 text-sm text-muted-foreground">3 tickets actively being worked on.</TabsContent>
            <TabsContent value="waiting" className="mt-3 text-sm text-muted-foreground">5 tickets blocked waiting on customer reply.</TabsContent>
            <TabsContent value="closed" className="mt-3 text-sm text-muted-foreground">142 tickets resolved in the last 30 days.</TabsContent>
          </Tabs>
        </SectionCard>
      </div>

      <SectionCard title="Vertical Tabs" description="Side-by-side navigation with content rendered to the right.">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-border pb-2 md:pb-0 md:pr-2">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "security", label: "Security", icon: Lock },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "billing", label: "Billing", icon: CreditCard },
              { id: "advanced", label: "Advanced", icon: Settings },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  className={cn(
                    "flex items-center gap-2 px-3 h-9 rounded-md text-sm font-medium transition-colors shrink-0",
                    vertical === t.id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setVertical(t.id)}
                >
                  <Icon className="size-3.5" />{t.label}
                </button>
              );
            })}
          </div>
          <div className="space-y-4">
            {vertical === "overview" && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <h4 className="text-sm font-semibold">Workspace overview</h4>
                  <p className="text-xs text-muted-foreground">Basic information about your workspace.</p>
                </div>
                <Separator />
                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                  <dt className="text-muted-foreground">Name</dt><dd>MTVerse HQ</dd>
                  <dt className="text-muted-foreground">Plan</dt><dd>Pro · 18 / 25 seats</dd>
                  <dt className="text-muted-foreground">Created</dt><dd>March 14, 2021</dd>
                  <dt className="text-muted-foreground">Owner</dt><dd>Alex Morgan</dd>
                </dl>
              </div>
            )}
            {vertical === "security" && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2"><Lock className="size-4" />Security settings</h4>
                  <p className="text-xs text-muted-foreground">Protect your workspace and member access.</p>
                </div>
                <Separator />
                {[
                  { label: "Require 2FA for all members", on: true },
                  { label: "Single sign-on (SSO)", on: false },
                  { label: "Restrict by IP allowlist", on: false },
                  { label: "Session timeout after 30 min", on: true },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center justify-between rounded-md border border-border p-3">
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-[11px] text-muted-foreground">{s.on ? "Enabled" : "Disabled"}</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info(`${s.label} ${s.on ? "disabled" : "enabled"}`)}>
                      {s.on ? "Disable" : "Enable"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {vertical === "notifications" && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2"><Bell className="size-4" />Notification preferences</h4>
                  <p className="text-xs text-muted-foreground">Choose what to be notified about.</p>
                </div>
                <Separator />
                {[
                  { label: "Email notifications", desc: "Receive updates by email", icon: Mail },
                  { label: "Push notifications", desc: "Get alerts on your devices", icon: Bell },
                  { label: "Weekly digest", desc: "Summary every Monday", icon: FileText },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.label} className="flex items-center gap-3 rounded-md border border-border p-3">
                      <Icon className="size-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-[11px] text-muted-foreground">{p.desc}</p>
                      </div>
                      <button className="text-xs text-primary hover:underline" onClick={() => toast.info(`Toggled ${p.label}`)}>Configure</button>
                    </div>
                  );
                })}
              </div>
            )}
            {vertical === "billing" && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2"><CreditCard className="size-4" />Billing & plan</h4>
                  <p className="text-xs text-muted-foreground">Manage your subscription and payment method.</p>
                </div>
                <Separator />
                <div className="rounded-md border border-border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pro plan</span>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20">$29 / mo</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Next invoice on Jan 14, 2025 · $580.00</p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info("Opening plans")}>Change plan</Button>
                    <Button size="sm" variant="ghost" className="h-7" onClick={() => toast.info("Updating card")}>Update card</Button>
                  </div>
                </div>
              </div>
            )}
            {vertical === "advanced" && (
              <div className="space-y-3 animate-fade-in">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2"><Settings className="size-4" />Advanced</h4>
                  <p className="text-xs text-muted-foreground">Power-user settings and integrations.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  {[
                    { label: "Export workspace data", desc: "Download all data as JSON", icon: FileText, action: "Export" },
                    { label: "API access", desc: "Generate API keys", icon: Globe, action: "Manage" },
                    { label: "Delete workspace", desc: "Permanently remove this workspace", icon: AlertCircle, action: "Delete", danger: true },
                  ].map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.label} className="flex items-center gap-3 rounded-md border border-border p-3">
                        <Icon className={"size-4 " + (a.danger ? "text-destructive" : "text-muted-foreground")} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{a.label}</p>
                          <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                        </div>
                        <Button size="sm" variant="outline" className={cn("h-7", a.danger && "text-destructive hover:text-destructive")} onClick={() => toast.info(`${a.action} clicked`)}>
                          {a.action}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Status Tabs" description="Color-coded status tabs that change content tone.">
        <Tabs defaultValue="healthy">
          <TabsList>
            <TabsTrigger value="healthy" className="gap-1.5 data-[state=active]:bg-success/10 data-[state=active]:text-success">
              <CheckCircle2 className="size-3.5" />Healthy
            </TabsTrigger>
            <TabsTrigger value="warning" className="gap-1.5 data-[state=active]:bg-warning/10 data-[state=active]:text-warning">
              <AlertCircle className="size-3.5" />Warnings
            </TabsTrigger>
            <TabsTrigger value="critical" className="gap-1.5 data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">
              <AlertCircle className="size-3.5" />Critical
            </TabsTrigger>
            <TabsTrigger value="improving" className="gap-1.5 data-[state=active]:bg-info/10 data-[state=active]:text-info">
              <TrendingUp className="size-3.5" />Improving
            </TabsTrigger>
          </TabsList>
          <TabsContent value="healthy" className="mt-3">
            <div className="flex items-center gap-3 rounded-md border border-success/20 bg-success/5 p-3">
              <CheckCircle2 className="size-5 text-success" />
              <div>
                <p className="text-sm font-medium">All systems operational</p>
                <p className="text-xs text-muted-foreground">All 8 services are responding normally. Last incident: 14 days ago.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="warning" className="mt-3">
            <div className="flex items-center gap-3 rounded-md border border-warning/20 bg-warning/5 p-3">
              <AlertCircle className="size-5 text-warning" />
              <div>
                <p className="text-sm font-medium">2 services degraded</p>
                <p className="text-xs text-muted-foreground">Webhooks and Search are slower than usual. Investigating.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="critical" className="mt-3">
            <div className="flex items-center gap-3 rounded-md border border-destructive/20 bg-destructive/5 p-3">
              <AlertCircle className="size-5 text-destructive" />
              <div>
                <p className="text-sm font-medium">1 service down</p>
                <p className="text-xs text-muted-foreground">API gateway is returning 503 errors. Engineering is engaged.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="improving" className="mt-3">
            <div className="flex items-center gap-3 rounded-md border border-info/20 bg-info/5 p-3">
              <TrendingUp className="size-5 text-info" />
              <div>
                <p className="text-sm font-medium">Performance improving</p>
                <p className="text-xs text-muted-foreground">Average response time dropped 22% after the latest optimization.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SectionCard>
    </div>
  );
}
