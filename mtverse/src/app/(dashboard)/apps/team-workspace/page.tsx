"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, Search, MoreVertical, Hash, Users, Activity, Clock, TrendingUp,
  GitCommit, MessageSquare, CheckCircle2, Bell, Circle, Zap, Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Member = {
  id: string; name: string; initials: string; color: string; role: string;
  status: "online" | "away" | "offline" | "busy"; project: string; hoursThisWeek: number;
  capacity: number; timezone: string;
};

const memberColors: Record<string, string> = {
  AM: "bg-primary/15 text-primary",
  MH: "bg-emerald-500/15 text-emerald-600",
  SC: "bg-rose-500/15 text-rose-600",
  JR: "bg-sky-500/15 text-sky-600",
  PS: "bg-amber-500/15 text-amber-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
  DK: "bg-violet-500/15 text-violet-600",
  TN: "bg-teal-500/15 text-teal-600",
};

const statusMeta: Record<Member["status"], { label: string; color: string; dot: string }> = {
  online: { label: "Online", color: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  away: { label: "Away", color: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning" },
  busy: { label: "Do not disturb", color: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
  offline: { label: "Offline", color: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
};

const members: Member[] = [
  { id: "m1", name: "Alex Morgan", initials: "AM", color: memberColors.AM, role: "Head of Product", status: "online", project: "MTVerse 2.0 Launch", hoursThisWeek: 42, capacity: 40, timezone: "PT" },
  { id: "m2", name: "Marcus Holloway", initials: "MH", color: memberColors.MH, role: "Staff Engineer", status: "busy", project: "Auth Refactor", hoursThisWeek: 46, capacity: 40, timezone: "PT" },
  { id: "m3", name: "Sarah Chen", initials: "SC", color: memberColors.SC, role: "Senior Designer", status: "online", project: "Dashboard v3", hoursThisWeek: 38, capacity: 40, timezone: "PT" },
  { id: "m4", name: "Jordan Reyes", initials: "JR", color: memberColors.JR, role: "Marketing Lead", status: "online", project: "Launch Campaign", hoursThisWeek: 35, capacity: 40, timezone: "ET" },
  { id: "m5", name: "Priya Sharma", initials: "PS", color: memberColors.PS, role: "Account Manager", status: "away", project: "Acme Partnership", hoursThisWeek: 28, capacity: 40, timezone: "ET" },
  { id: "m6", name: "Lena Park", initials: "LP", color: memberColors.LP, role: "UX Researcher", status: "online", project: "Customer Interviews", hoursThisWeek: 32, capacity: 40, timezone: "PT" },
  { id: "m7", name: "Daniel Kim", initials: "DK", color: memberColors.DK, role: "Backend Engineer", status: "online", project: "Audit Log API", hoursThisWeek: 40, capacity: 40, timezone: "CT" },
  { id: "m8", name: "Tara Nguyen", initials: "TN", color: memberColors.TN, role: "Customer Success", status: "offline", project: "Onboarding Flow", hoursThisWeek: 22, capacity: 40, timezone: "ET" },
];

const channels = [
  { id: "general", name: "general", members: 8, unread: 0, active: true },
  { id: "design", name: "design", members: 4, unread: 2, active: false },
  { id: "engineering", name: "engineering", members: 5, unread: 5, active: false },
  { id: "product", name: "product", members: 6, unread: 0, active: false },
  { id: "marketing", name: "marketing", members: 3, unread: 1, active: false },
  { id: "random", name: "random", members: 8, unread: 0, active: false },
];

const activities = [
  { id: 1, type: "commit", actor: "MH", text: "Pushed 4 commits to main", detail: "feat: implement PKCE token rotation + revoke endpoint", time: "12 min ago", color: memberColors.MH },
  { id: 2, type: "mention", actor: "SC", text: "Mentioned you in #design", detail: "@alex can you review the sidebar collapse animation?", time: "38 min ago", color: memberColors.SC },
  { id: 3, type: "decision", actor: "AM", text: "Logged a decision", detail: "Adopt PKCE flow for all SPA + mobile clients. Refresh token TTL: 30 days.", time: "1 hour ago", color: memberColors.AM },
  { id: 4, type: "merge", actor: "DK", text: "Merged PR #2841 into main", detail: "feat: add OAuth2 PKCE flow — 412 additions, 28 deletions", time: "2 hours ago", color: memberColors.DK },
  { id: 5, type: "comment", actor: "LP", text: "Commented on Customer Research doc", detail: "Pattern: 7/12 enterprise customers asked for white-label.", time: "3 hours ago", color: memberColors.LP },
  { id: 6, type: "complete", actor: "JR", text: "Completed launch timeline", detail: "MTVerse 2.0 launch locked for Oct 15. Press embargo Oct 14.", time: "5 hours ago", color: memberColors.JR },
  { id: 7, type: "commit", actor: "SC", text: "Pushed 2 commits to feature/sidebar-v3", detail: "polish: sidebar collapse animation + keyboard shortcut", time: "6 hours ago", color: memberColors.SC },
  { id: 8, type: "decision", actor: "AM", text: "Approved marketing budget", detail: "$48K allocated to Q4 launch campaign across 6 channels.", time: "Yesterday", color: memberColors.AM },
];

const activityMeta: Record<string, { icon: any; color: string; label: string }> = {
  commit: { icon: GitCommit, color: "bg-violet-500/15 text-violet-600", label: "Commit" },
  mention: { icon: MessageSquare, color: "bg-rose-500/15 text-rose-600", label: "Mention" },
  decision: { icon: CheckCircle2, color: "bg-amber-500/15 text-amber-600", label: "Decision" },
  merge: { icon: GitCommit, color: "bg-emerald-500/15 text-emerald-600", label: "Merge" },
  comment: { icon: MessageSquare, color: "bg-sky-500/15 text-sky-600", label: "Comment" },
  complete: { icon: CheckCircle2, color: "bg-success/15 text-success", label: "Complete" },
};

export default function TeamWorkspaceApp() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredMembers = members.filter((m) => {
    if (query && !`${m.name} ${m.role} ${m.project}`.toLowerCase().includes(query.toLowerCase())) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    total: members.length,
    online: members.filter((m) => m.status === "online").length,
    projects: new Set(members.map((m) => m.project)).size,
    weeklyHours: members.reduce((a, m) => a + m.hoursThisWeek, 0),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Workspace"
        description="See who's working on what, stay in sync across channels and projects."
        breadcrumbs={[{ label: "Apps" }, { label: "Team Workspace" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => toast.message("Invitation link copied")}><Users className="size-4 mr-2" /> Invite</Button>
            <Button size="sm" className="h-9" onClick={() => toast.message("New channel opened")}><Plus className="size-4 mr-2" /> New channel</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Team Members" value={stats.total} icon={<Users className="size-5" />} footer={`${stats.online} online now`} />
        <StatCard label="Active Projects" value={stats.projects} icon={<Activity className="size-5" />} footer="In flight this quarter" />
        <StatCard label="Weekly Hours" value={stats.weeklyHours} delta={6.2} deltaLabel="vs last week" icon={<Clock className="size-5" />} footer="Logged across team" />
        <StatCard label="Channels" value={channels.length} icon={<Hash className="size-5" />} footer={`${channels.reduce((a, c) => a + c.unread, 0)} unread`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        {/* Channels sidebar */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Channels</p>
            <div className="space-y-0.5">
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveChannel(c.id); if (c.unread > 0) { /* mark read */ } }}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors ${activeChannel === c.id ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
                >
                  <Hash className="size-3.5 shrink-0" />
                  <span className="flex-1 text-left truncate">{c.name}</span>
                  {c.unread > 0 ? <Badge className="bg-primary text-primary-foreground text-[9px] h-4 min-w-4 px-1 justify-center">{c.unread}</Badge> : <span className="text-[10px] text-muted-foreground">{c.members}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Direct Messages</p>
            <div className="space-y-0.5">
              {members.filter((m) => m.status !== "offline").slice(0, 5).map((m) => (
                <button key={m.id} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                  <div className="relative">
                    <Avatar className="size-5"><AvatarFallback className={`text-[8px] font-semibold ${m.color}`}>{m.initials}</AvatarFallback></Avatar>
                    <span className={`absolute -bottom-0.5 -right-0.5 size-2 rounded-full border border-card ${statusMeta[m.status].dot}`} />
                  </div>
                  <span className="flex-1 text-left truncate text-xs">{m.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
          <Separator />
          <div className="p-3 space-y-2">
            <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start" onClick={() => toast.message("Starting huddle")}><Video className="size-3.5 mr-2" /> Start huddle</Button>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start" onClick={() => toast.message("Schedule opened")}><Bell className="size-3.5 mr-2" /> Set status</Button>
          </div>
        </div>

        {/* Main */}
        <div className="space-y-4">
          {/* Members grid */}
          <SectionCard
            title="Team members"
            description={`${filteredMembers.length} of ${members.length} members`}
            actions={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="pl-9 h-8 w-44 text-xs" />
                </div>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground"><MoreVertical className="size-4" /></Button>
              </div>
            }
          >
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              {(["all", "online", "away", "busy", "offline"] as const).map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors capitalize ${statusFilter === s ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border hover:bg-accent"}`}>
                  {s === "all" ? "All" : statusMeta[s as Member["status"]].label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredMembers.map((m) => {
                const sm = statusMeta[m.status];
                const load = Math.min((m.hoursThisWeek / m.capacity) * 100, 120);
                const overloaded = load > 100;
                return (
                  <div key={m.id} className="group rounded-lg border border-border bg-background p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-2.5">
                      <div className="relative shrink-0">
                        <Avatar className="size-10"><AvatarFallback className={`text-xs font-semibold ${m.color}`}>{m.initials}</AvatarFallback></Avatar>
                        <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background ${sm.dot}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{m.role}</p>
                      </div>
                      <Badge variant="outline" className={`text-[9px] ${sm.color}`}>{sm.label}</Badge>
                    </div>
                    <div className="space-y-1.5 mb-2.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Current project</span>
                        <span className="font-medium">{m.timezone}</span>
                      </div>
                      <p className="text-xs font-medium truncate">{m.project}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Weekly load</span>
                        <span className={overloaded ? "text-destructive font-medium" : "text-muted-foreground"}>{m.hoursThisWeek}h / {m.capacity}h</span>
                      </div>
                      <Progress value={Math.min(load, 100)} className={`h-1.5 ${overloaded ? "[&>div]:bg-destructive" : load > 80 ? "[&>div]:bg-warning" : ""}`} />
                    </div>
                  </div>
                );
              })}
              {filteredMembers.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Users className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No members match</p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Activity feed */}
          <SectionCard title="Team activity" description="Recent commits, mentions, and decisions" actions={<Badge variant="outline" className="text-[10px]">Live</Badge>}>
            <ScrollArea className="max-h-[420px]">
              <div className="space-y-1">
                {activities.map((a, i) => {
                  const meta = activityMeta[a.type];
                  const Icon = meta.icon;
                  return (
                    <div key={a.id}>
                      <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-accent/50">
                        <Avatar className="size-8 shrink-0"><AvatarFallback className={`text-[10px] font-semibold ${a.color}`}>{a.actor}</AvatarFallback></Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-medium">{a.actor}</span>
                            <span className="text-xs text-muted-foreground">{a.text}</span>
                            <Badge variant="outline" className={`text-[9px] h-4 px-1 font-normal ${meta.color}`}><Icon className="size-2.5 mr-1" />{meta.label}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{a.detail}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1 flex items-center gap-1"><Clock className="size-2.5" />{a.time}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0"><MoreVertical className="size-3.5" /></Button>
                      </div>
                      {i < activities.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </SectionCard>
        </div>
      </div>

      {/* Bottom quick stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Project distribution" description="Where the team is focused">
          <div className="space-y-2.5">
            {Object.entries(
              members.reduce((acc, m) => { acc[m.project] = (acc[m.project] || 0) + 1; return acc; }, {} as Record<string, number>)
            ).sort((a, b) => b[1] - a[1]).map(([project, count]) => (
              <div key={project}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium truncate">{project}</span>
                  <span className="text-muted-foreground">{count} {count === 1 ? "person" : "people"}</span>
                </div>
                <Progress value={(count / members.length) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Capacity overview" description="Team utilization this week">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total logged</span>
              <span className="font-bold text-lg">{stats.weeklyHours}h</span>
            </div>
            <Progress value={(stats.weeklyHours / (members.length * 40)) * 100} className="h-2" />
            <Separator />
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><p className="text-[10px] text-muted-foreground">Utilization</p><p className="text-base font-bold text-success">{Math.round((stats.weeklyHours / (members.length * 40)) * 100)}%</p></div>
              <div><p className="text-[10px] text-muted-foreground">Overloaded</p><p className="text-base font-bold text-destructive">{members.filter((m) => m.hoursThisWeek > m.capacity).length}</p></div>
              <div><p className="text-[10px] text-muted-foreground">Underused</p><p className="text-base font-bold text-info">{members.filter((m) => m.hoursThisWeek < m.capacity * 0.7).length}</p></div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Quick actions" description="Common team workflows">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Scheduling meeting")}><Video className="size-4 mr-2 text-violet-600" /> Start team huddle</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Standup template opened")}><Zap className="size-4 mr-2 text-amber-600" /> Run async standup</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Retro board created")}><Activity className="size-4 mr-2 text-emerald-600" /> Start sprint retro</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Survey sent to team")}><TrendingUp className="size-4 mr-2 text-sky-600" /> Send pulse survey</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
