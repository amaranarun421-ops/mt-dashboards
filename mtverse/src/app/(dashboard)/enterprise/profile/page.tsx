"use client";

import * as React from "react";
import { useState } from "react";
import {
  Mail, Phone, MapPin, Calendar, Camera, Shield, Smartphone, Monitor,
  Tablet, Globe, Clock, LogOut, Bell, KeyRound, Check, Loader2,
  Lock, Eye, EyeOff, Save, Pencil, Plug, MessageSquare, FolderOpen,
  Rocket, CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

const activities: { action: string; time: string; icon: LucideIcon }[] = [
  { action: "Updated profile settings", time: "2 hours ago", icon: Pencil },
  { action: "Connected GitHub integration", time: "5 hours ago", icon: Plug },
  { action: "Commented on PR #1248", time: "1 day ago", icon: MessageSquare },
  { action: "Created project 'Q4 Marketing'", time: "2 days ago", icon: FolderOpen },
  { action: "Joined workspace 'MTVerse'", time: "1 week ago", icon: Rocket },
  { action: "Completed onboarding checklist", time: "1 week ago", icon: CheckCircle2 },
];

const sessions = [
  { device: "MacBook Pro", browser: "Chrome 130 · macOS 14", location: "San Francisco, US", ip: "192.168.1.24", lastActive: "Current session", current: true, icon: Monitor },
  { device: "iPhone 15 Pro", browser: "Safari Mobile · iOS 17", location: "San Francisco, US", ip: "10.0.4.91", lastActive: "1 hour ago", current: false, icon: Smartphone },
  { device: "iPad Air", browser: "Safari · iPadOS 17", location: "Oakland, US", ip: "10.0.4.122", lastActive: "Yesterday", current: false, icon: Tablet },
  { device: "Windows PC", browser: "Edge 130 · Windows 11", location: "New York, US", ip: "172.16.8.91", lastActive: "3 days ago", current: false, icon: Monitor },
];

export default function ProfilePage() {
  const [tab, setTab] = useState("overview");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@mtverse.io",
    phone: "+1 (415) 555-0182",
    timezone: "America/Los_Angeles",
    bio: "Product designer turned founder. Building MTVerse — the premium dashboard kit for modern teams. Previously at Stripe and Linear.",
    role: "Founder & CEO",
    location: "San Francisco, CA",
    website: "mtverse.io",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile updated successfully");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Profile"
        description="Manage your personal information, security settings, and notification preferences."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Profile" }]}
      />

      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/30 via-primary/20 to-chart-4/20" />
        <CardContent className="p-6 -mt-12">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="relative">
              <Avatar className="size-24 border-4 border-background">
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-chart-4 text-primary-foreground">
                  AM
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon" variant="secondary"
                className="absolute bottom-0 right-0 size-7 rounded-full shadow-sm"
                onClick={() => toast.info("Upload a new avatar")}
              >
                <Camera className="size-3.5" />
              </Button>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{profile.role}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">{profile.bio}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="size-3.5" /> {profile.email}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {profile.location}</span>
                <span className="flex items-center gap-1"><Globe className="size-3.5" /> {profile.website}</span>
                <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Joined Mar 2023</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-9" onClick={handleSave}>
              <Save className="size-4 mr-2" /> Edit profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-9">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <SectionCard title="Personal information" description="Update your personal details and contact information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={profile.timezone} onValueChange={(v) => setProfile((p) => ({ ...p, timezone: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">(GMT-8) Pacific Time</SelectItem>
                    <SelectItem value="America/Denver">(GMT-7) Mountain Time</SelectItem>
                    <SelectItem value="America/Chicago">(GMT-6) Central Time</SelectItem>
                    <SelectItem value="America/New_York">(GMT-5) Eastern Time</SelectItem>
                    <SelectItem value="Europe/London">(GMT+0) London</SelectItem>
                    <SelectItem value="Europe/Berlin">(GMT+1) Berlin</SelectItem>
                    <SelectItem value="Asia/Tokyo">(GMT+9) Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio" rows={3} value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">{profile.bio.length} / 280 characters</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-border">
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="activity" className="mt-4 space-y-4">
          <SectionCard title="Recent activity" description="Your actions across the workspace">
            <div className="relative">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-1">
                {activities.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="relative flex items-start gap-3 py-3">
                      <div className="size-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0 z-10">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-sm font-medium">{a.action}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="size-3" /> {a.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Stats" description="Your contribution this month">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Actions", value: "428", delta: "+12%" },
                { label: "Projects", value: "8", delta: "+2" },
                { label: "Comments", value: "94", delta: "+18" },
                { label: "Login days", value: "22", delta: "streak" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold tracking-tight mt-1">{s.value}</p>
                  <p className="text-xs text-success mt-0.5">{s.delta}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <SectionCard title="Password" description="Update your password regularly to keep your account secure">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <div className="relative">
                  <Input
                    id="current" type={showPassword ? "text" : "password"} placeholder="••••••••"
                    className="pr-10"
                  />
                  <Button
                    variant="ghost" size="icon" type="button"
                    className="absolute right-0 top-0 size-9"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" placeholder="At least 12 characters" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <Input id="confirm" type="password" placeholder="Re-enter password" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                <p className="text-xs text-muted-foreground">
                  <Lock className="size-3 inline mr-1" /> Use at least 12 characters with a mix of letters, numbers, and symbols.
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Password updated successfully")}>
                  <KeyRound className="size-4 mr-2" /> Update password
                </Button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Two-factor authentication" description="Add an extra layer of security to your account">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`flex size-10 items-center justify-center rounded-lg ${twoFA ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  <Shield className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    2FA is {twoFA ? "enabled" : "disabled"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-md">
                    {twoFA
                      ? "Your account is protected with an authenticator app. You'll need a 6-digit code at every login."
                      : "Protect your account with an additional verification step at login."}
                  </p>
                  {twoFA && (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 mt-2 gap-1">
                      <Check className="size-3" /> Authenticator app
                    </Badge>
                  )}
                </div>
              </div>
              <Switch checked={twoFA} onCheckedChange={(c) => { setTwoFA(c); toast.success(`2FA ${c ? "enabled" : "disabled"}`); }} />
            </div>
          </SectionCard>

          <SectionCard title="Active sessions" description="Devices currently signed in to your account" noBodyPadding>
            <div className="divide-y divide-border">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
                    <s.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{s.device}</p>
                      {s.current && (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Current</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.browser} · {s.location}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{s.ip} · {s.lastActive}</p>
                  </div>
                  {!s.current && (
                    <Button
                      variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive"
                      onClick={() => toast.success(`Session on ${s.device} revoked`)}
                    >
                      <LogOut className="size-3.5 mr-1.5" /> Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success("All other sessions signed out")}>
                Sign out all other sessions
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <SectionCard title="Notification preferences" description="Choose what you want to be notified about">
            <div className="space-y-6">
              {[
                { title: "Activity", items: [
                  { label: "Mentions", desc: "When someone @mentions you", enabled: true },
                  { label: "Comments", desc: "Replies to your content", enabled: true },
                  { label: "Task assignments", desc: "When a task is assigned to you", enabled: true },
                  { label: "Review requests", desc: "PRs and docs for review", enabled: false },
                ]},
                { title: "Workspace", items: [
                  { label: "Team changes", desc: "Members joining or leaving", enabled: true },
                  { label: "Billing & subscription", desc: "Invoices and payment issues", enabled: true },
                  { label: "System announcements", desc: "Product updates and maintenance", enabled: true },
                ]},
                { title: "Security", items: [
                  { label: "New device login", desc: "Sign-ins from new devices", enabled: true },
                  { label: "2FA changes", desc: "When 2FA is modified", enabled: true },
                  { label: "API key activity", desc: "Key creation or revocation", enabled: true },
                ]},
              ].map((cat) => (
                <div key={cat.title}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <Bell className="size-3.5" /> {cat.title}
                  </h4>
                  <Separator className="mb-3" />
                  <div className="space-y-3">
                    {cat.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={item.enabled} onCheckedChange={(c) => toast.success(`${item.label} ${c ? "enabled" : "disabled"}`)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-border">
              <Button onClick={() => toast.success("Notification preferences saved")}>
                <Save className="size-4 mr-2" /> Save preferences
              </Button>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
