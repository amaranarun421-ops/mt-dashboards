"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  CheckCircle2, Circle, Clock, GitCommit, MessageSquare, Upload, FileText,
  UserPlus, AlertTriangle, Rocket, Settings, Star, Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type Event = {
  title: string;
  desc: string;
  time: string;
  icon: React.ElementType;
  color: string;
};

const vertical: Event[] = [
  { title: "Project created", desc: "Aria M. created “Aurora Web App”", time: "2m ago", icon: Rocket, color: "bg-primary/10 text-primary" },
  { title: "Commit pushed", desc: "feat(charts): add radar chart support (#2841)", time: "12m ago", icon: GitCommit, color: "bg-success/10 text-success" },
  { title: "Member invited", desc: "Jordan L. invited devi@acme.io as Editor", time: "1h ago", icon: UserPlus, color: "bg-info/10 text-info" },
  { title: "Comment added", desc: "Sam K. on “Q4 roadmap”: Looks great, ship it", time: "3h ago", icon: MessageSquare, color: "bg-primary/10 text-primary" },
  { title: "File uploaded", desc: "design-system-v2.fig (4.2 MB)", time: "5h ago", icon: Upload, color: "bg-warning/10 text-warning" },
  { title: "Build warning", desc: "Build #2841 — 2 flaky tests detected", time: "8h ago", icon: AlertTriangle, color: "bg-warning/10 text-warning" },
  { title: "Settings updated", desc: "Aria M. changed workspace name to “Acme Studio”", time: "1d ago", icon: Settings, color: "bg-muted text-muted-foreground" },
];

const horizontal = [
  { label: "Jan", value: 12, status: "done" },
  { label: "Feb", value: 18, status: "done" },
  { label: "Mar", value: 24, status: "done" },
  { label: "Apr", value: 30, status: "done" },
  { label: "May", value: 28, status: "done" },
  { label: "Jun", value: 35, status: "active" },
  { label: "Jul", value: 22, status: "upcoming" },
  { label: "Aug", value: 18, status: "upcoming" },
];

const dense: Event[] = [
  { title: "Logged in", desc: "From iPhone 15 Pro · San Francisco", time: "09:14", icon: CheckCircle2, color: "bg-success/10 text-success" },
  { title: "Viewed dashboard", desc: "Analytics overview", time: "09:18", icon: Clock, color: "bg-muted text-muted-foreground" },
  { title: "Edited profile", desc: "Updated bio and timezone", time: "09:32", icon: Settings, color: "bg-muted text-muted-foreground" },
  { title: "Created project", desc: "Mobile SDK v3", time: "10:05", icon: Rocket, color: "bg-primary/10 text-primary" },
  { title: "Pushed commit", desc: "fix(api): rate limit race condition", time: "10:42", icon: GitCommit, color: "bg-success/10 text-success" },
  { title: "Received message", desc: "From Jordan L. via chat", time: "11:08", icon: MessageSquare, color: "bg-primary/10 text-primary" },
];

const alternating: Event[] = [
  { title: "Workspace created", desc: "Acme Studio founded with 3 members", time: "Aug 12, 2024", icon: Rocket, color: "bg-primary/10 text-primary" },
  { title: "First project shipped", desc: "Aurora Web App v1.0", time: "Sep 4, 2024", icon: CheckCircle2, color: "bg-success/10 text-success" },
  { title: "10 team members", desc: "Welcomed our 10th teammate, Devi P.", time: "Oct 18, 2024", icon: UserPlus, color: "bg-info/10 text-info" },
  { title: "Pro plan upgrade", desc: "Unlocked unlimited projects", time: "Nov 2, 2024", icon: Star, color: "bg-warning/10 text-warning" },
  { title: "1,000 commits", desc: "Reached our first thousand commits", time: "Dec 1, 2024", icon: GitCommit, color: "bg-success/10 text-success" },
];

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Timeline Components"
        description="Vertical, horizontal, dense and alternating timelines for activity feeds and history."
        breadcrumbs={[{ label: "UI Library" }, { label: "Timeline" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Vertical Timeline" description="Classic left-rail activity feed">
          <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {vertical.map((e, i) => {
              const Icon = e.icon;
              return (
                <div key={i} className="relative">
                  <div className={cn("absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full ring-4 ring-background", e.color)}>
                    <Icon className="size-3" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{e.time}</span>
                  </div>
                </div>
              );
            })}
            <div className="relative">
              <div className="absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground ring-4 ring-background">
                <Circle className="size-3" />
              </div>
              <p className="text-xs text-muted-foreground italic">Start of activity log</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Alternating Timeline" description="Left-right alternating milestones">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-6">
              {alternating.map((e, i) => {
                const Icon = e.icon;
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={cn("relative flex", isLeft ? "justify-start" : "justify-end")}>
                    <div className={cn("w-1/2 px-4", isLeft ? "text-right pr-8" : "text-left pl-8")}>
                      <div className={cn("inline-block rounded-lg border border-border p-3", isLeft ? "text-left" : "text-left")}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={cn("size-3.5", e.color.split(" ")[1])} />
                          <p className="text-sm font-medium">{e.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{e.desc}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{e.time}</p>
                      </div>
                    </div>
                    <div className={cn("absolute left-1/2 top-3 -translate-x-1/2 flex size-6 items-center justify-center rounded-full ring-4 ring-background", e.color)}>
                      <Icon className="size-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Dense Timeline" description="Compact hour-by-hour log" className="lg:col-span-2">
          <div className="relative pl-6 space-y-2 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {dense.map((e, i) => {
              const Icon = e.icon;
              return (
                <div key={i} className="relative flex items-center gap-3">
                  <div className={cn("absolute -left-6 flex size-4 items-center justify-center rounded-full ring-2 ring-background", e.color)}>
                    <Icon className="size-2" />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-mono text-muted-foreground w-12">{e.time}</span>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground flex-1 truncate">{e.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Horizontal Timeline" description="Monthly progress timeline" className="lg:col-span-2">
          <div className="relative pt-8 pb-4">
            <div className="absolute left-0 right-0 top-12 h-px bg-border" />
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 relative">
              {horizontal.map((h, i) => {
                const status = h.status;
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "text-xs font-medium",
                      status === "done" && "text-muted-foreground",
                      status === "active" && "text-primary",
                      status === "upcoming" && "text-muted-foreground/50"
                    )}>
                      {h.value}
                    </div>
                    <div className={cn(
                      "size-4 rounded-full ring-4 ring-background border-2",
                      status === "done" && "bg-success border-success",
                      status === "active" && "bg-primary border-primary animate-pulse",
                      status === "upcoming" && "bg-background border-border"
                    )} />
                    <span className={cn(
                      "text-xs",
                      status === "active" ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}>{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success" /> Completed (5 months)</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> Current month</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-border" /> Upcoming (2 months)</span>
          </div>
        </SectionCard>

        <SectionCard title="Activity Feed with Avatars" description="User-attributed timeline">
          <div className="space-y-4">
            {[
              { user: "Aria M.", action: "merged PR #2841", target: "feat(charts): radar support", time: "8m ago", color: "bg-primary/10 text-primary" },
              { user: "Jordan L.", action: "commented on", target: "Aurora design spec", time: "22m ago", color: "bg-info/10 text-info" },
              { user: "Sam K.", action: "uploaded file", target: "design-system-v2.fig", time: "1h ago", color: "bg-warning/10 text-warning" },
              { user: "Devi P.", action: "joined workspace", target: "Acme Studio", time: "3h ago", color: "bg-success/10 text-success" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <Avatar className="size-8"><AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{a.user.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => toast.info("Loading older activity…")}>
              Load older activity
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Status Timeline" description="Order/shipment tracking">
          <div className="space-y-1">
            {[
              { step: "Order placed", detail: "Dec 12, 9:42 AM", status: "done", icon: FileText },
              { step: "Payment confirmed", detail: "Dec 12, 9:43 AM · Visa •••• 4242", status: "done", icon: CheckCircle2 },
              { step: "Processing", detail: "Dec 12, 10:15 AM · Warehouse 04", status: "done", icon: Settings },
              { step: "Shipped", detail: "Tracking 1Z999AA10123456784", status: "active", icon: Rocket },
              { step: "Out for delivery", detail: "Expected by Dec 14", status: "upcoming", icon: Clock },
              { step: "Delivered", detail: "Pending", status: "upcoming", icon: Bell },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex gap-3 py-2">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      s.status === "done" && "bg-success/10 text-success",
                      s.status === "active" && "bg-primary text-primary-foreground",
                      s.status === "upcoming" && "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="size-4" />
                    </div>
                    {i < 5 && <div className={cn("w-px flex-1 my-1", s.status === "done" ? "bg-success/40" : "bg-border")} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm font-medium", s.status === "upcoming" && "text-muted-foreground")}>{s.step}</p>
                      {s.status === "active" && <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">In progress</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
