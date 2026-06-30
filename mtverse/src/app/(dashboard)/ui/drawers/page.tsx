"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  PanelLeft, PanelRight, PanelTop, PanelBottom, Settings, Bell, Filter,
  Search, Mail, MessageCircle, User, Download, Star, Clock, Sparkles,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function DrawersPage() {
  const [notifPrefs, setNotifPrefs] = React.useState({
    email: true, push: true, mentions: true, weekly: false, marketing: false,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drawers"
        description="Sheets sliding in from each side with different content variants — settings, filters, notifications, and search."
        breadcrumbs={[{ label: "UI Library" }, { label: "Drawers" }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* LEFT — Settings */}
        <SectionCard title="From Left" description="Settings panel" className="h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-start"><PanelLeft className="size-4 mr-2" />Settings</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><Settings className="size-4" />Workspace settings</SheetTitle>
                <SheetDescription>Adjust preferences for this workspace.</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">General</p>
                  <div className="space-y-2">
                    <Label htmlFor="ws-name">Workspace name</Label>
                    <Input id="ws-name" defaultValue="MTVerse HQ" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ws-url">Workspace URL</Label>
                    <div className="flex items-center rounded-md border border-border overflow-hidden">
                      <span className="px-2 bg-muted text-xs text-muted-foreground border-r border-border">mtverse.io/</span>
                      <Input id="ws-url" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" defaultValue="mtverse-hq" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</p>
                  {[
                    { name: "Compact mode", desc: "Reduce padding and font size" },
                    { name: "Reduce motion", desc: "Disable non-essential animations" },
                    { name: "High contrast", desc: "Boost text and border contrast" },
                  ].map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                      <Switch defaultChecked={i === 0} />
                    </div>
                  ))}
                </div>
              </div>
              <SheetFooter>
                <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SectionCard>

        {/* RIGHT — Notifications */}
        <SectionCard title="From Right" description="Notifications feed" className="h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-start"><PanelRight className="size-4 mr-2" />Notifications</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><Bell className="size-4" />Notifications</SheetTitle>
                <SheetDescription>You have 5 unread items.</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-2 flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => toast.success("All marked as read")}>Mark all read</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs ml-auto" onClick={() => toast.info("Opening settings")}>Settings</Button>
              </div>
              <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
                {[
                  { icon: MessageCircle, title: "New comment", body: "Priya replied to your design review", time: "2m", color: "bg-primary/10 text-primary", unread: true },
                  { icon: User, title: "New team member", body: "Sarah Kim joined your workspace", time: "18m", color: "bg-success/10 text-success", unread: true },
                  { icon: Star, title: "Build passed", body: "main · commit a8f2c1 deployed", time: "1h", color: "bg-info/10 text-info", unread: true },
                  { icon: Mail, title: "Invoice paid", body: "Acme Corp paid $2,840", time: "3h", color: "bg-success/10 text-success", unread: true },
                  { icon: Sparkles, title: "New feature", body: "Try the new command palette (⌘K)", time: "5h", color: "bg-primary/10 text-primary", unread: true },
                  { icon: Clock, title: "Reminder", body: "Standup starts in 10 minutes", time: "1d", color: "bg-muted text-muted-foreground", unread: false },
                ].map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={i}
                      className={"flex items-start gap-3 w-full rounded-lg p-3 text-left hover:bg-accent transition-colors " + (n.unread ? "bg-primary/3" : "")}
                      onClick={() => toast.info(`Opened: ${n.title}`)}
                    >
                      <div className={"flex size-8 items-center justify-center rounded-md shrink-0 " + n.color}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </button>
                  );
                })}
              </div>
              <SheetFooter>
                <Button variant="outline" onClick={() => toast.info("Opening notification center")}>View all</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SectionCard>

        {/* TOP — Filter */}
        <SectionCard title="From Top" description="Filter bar" className="h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-start"><PanelTop className="size-4 mr-2" />Filters</Button>
            </SheetTrigger>
            <SheetContent side="top" className="flex flex-col" >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><Filter className="size-4" />Filter results</SheetTitle>
                <SheetDescription>Refine your view across 248 items.</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Status</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Active", "Pending", "Archived"].map((s, i) => (
                      <Badge key={s} variant="outline" className={"cursor-pointer font-normal " + (i === 0 ? "bg-primary/10 border-primary/30" : "")}>{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Department</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Eng", "Sales", "Design"].map((s, i) => (
                      <Badge key={s} variant="outline" className={"cursor-pointer font-normal " + (i === 1 ? "bg-primary/10 border-primary/30" : "")}>{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Joined</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {["7d", "30d", "90d"].map((s) => (
                      <Badge key={s} variant="outline" className="cursor-pointer font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Sort</Label>
                  <Badge variant="outline" className="cursor-pointer font-normal">Recent ↓</Badge>
                </div>
              </div>
              <SheetFooter className="flex !flex-row !justify-between gap-2">
                <Button variant="ghost" onClick={() => toast.info("Filters cleared")}>Clear all</Button>
                <Button onClick={() => toast.success("Filters applied", { description: "Showing 42 of 248 results." })}>Apply filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </SectionCard>

        {/* BOTTOM — Search */}
        <SectionCard title="From Bottom" description="Quick search" className="h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-start"><PanelBottom className="size-4 mr-2" />Search</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"><Search className="size-4" />Quick search</SheetTitle>
                <SheetDescription>Find anything across your workspace.</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input autoFocus placeholder="Type to search projects, files, members…" className="pl-9 h-11" />
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-xs text-muted-foreground mb-2">Recent</p>
                <div className="space-y-1">
                  {[
                    { icon: User, label: "Alex Morgan", sub: "Member · Engineering" },
                    { icon: Download, label: "Q4 OKRs.pdf", sub: "Document · Updated yesterday" },
                    { icon: Star, label: "MTVerse 2.0", sub: "Project · 18 collaborators" },
                    { icon: Mail, label: "INV-2024-0882", sub: "Invoice · Paid $2,840" },
                  ].map((r) => {
                    const Icon = r.icon;
                    return (
                      <button key={r.label} className="flex items-center gap-3 w-full rounded-md p-2 hover:bg-accent text-left" onClick={() => toast.info(`Opening ${r.label}`)}>
                        <Icon className="size-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{r.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{r.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </SectionCard>
      </div>

      <SectionCard title="Detail Drawer" description="Right-side sheet with member profile, stats, and quick actions.">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><User className="size-4 mr-2" />View member profile</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
            <SheetHeader>
              <SheetDescription className="sr-only">Member profile</SheetDescription>
              <SheetTitle className="text-base">Member details</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="flex flex-col items-center text-center py-6 border-b border-border">
                <Avatar className="size-20 mb-3"><AvatarFallback className="text-2xl bg-primary/10 text-primary">AM</AvatarFallback></Avatar>
                <h3 className="text-lg font-semibold">Alex Morgan</h3>
                <p className="text-sm text-muted-foreground">Design Engineer · MTVerse HQ</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">Admin</Badge>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Message sent")}><MessageCircle className="size-3.5 mr-1.5" />Message</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.info("Email composed")}><Mail className="size-3.5 mr-1.5" />Email</Button>
                </div>
              </div>

              <div className="py-4 border-b border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>alex@mtverse.io</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd>+1 (415) 555-0182</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>San Francisco, CA</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Timezone</dt><dd>PST (UTC−8)</dd></div>
                </dl>
              </div>

              <div className="py-4 border-b border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Activity (this week)</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Commits", value: 24 },
                    { label: "PRs", value: 6 },
                    { label: "Reviews", value: 12 },
                  ].map((s) => (
                    <div key={s.label} className="rounded-md border border-border p-3">
                      <p className="text-xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacity</p>
                  <span className="text-xs">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-[11px] text-muted-foreground mt-2">3 active projects · 32 hours logged this week</p>
              </div>
            </div>
            <div className="border-t border-border p-3 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => toast.info("Editing profile")}>Edit</Button>
              <Button variant="outline" className="flex-1 text-destructive hover:text-destructive" onClick={() => toast.error("Member removed")}>Remove</Button>
            </div>
          </SheetContent>
        </Sheet>
      </SectionCard>

      <SectionCard title="Notification Preferences" description="Bottom sheet of preference toggles persisted locally.">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><Bell className="size-4 mr-2" />Manage preferences</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Notification preferences</SheetTitle>
              <SheetDescription>Choose what you want to hear about.</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4 space-y-3">
              {[
                { key: "email" as const, label: "Email notifications", desc: "Receive updates by email" },
                { key: "push" as const, label: "Push notifications", desc: "Get alerts on your devices" },
                { key: "mentions" as const, label: "Mentions only", desc: "Only notify when @mentioned" },
                { key: "weekly" as const, label: "Weekly digest", desc: "Summary every Monday at 9am" },
                { key: "marketing" as const, label: "Product news", desc: "Occasional updates about new features" },
              ].map((p) => (
                <div key={p.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch
                    checked={notifPrefs[p.key]}
                    onCheckedChange={(v) => {
                      setNotifPrefs((s) => ({ ...s, [p.key]: v }));
                      toast.info(`${p.label} ${v ? "enabled" : "disabled"}`);
                    }}
                  />
                </div>
              ))}
            </div>
            <SheetFooter>
              <Button onClick={() => toast.success("Preferences saved")}>Save preferences</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </SectionCard>
    </div>
  );
}
