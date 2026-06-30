"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Info, CheckCircle2, AlertTriangle, XCircle, BellRing, Loader2, Star,
  User, FileText, Inbox, Sparkles, Heart, Zap,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function FeedbackPage() {
  const [progress, setProgress] = React.useState(38);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setLoading(false); toast.success("Sync complete", { description: "1,284 records updated." }); return 100; }
        return p + 7;
      });
    }, 220);
    return () => clearInterval(t);
  }, [loading]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feedback Components"
        description="Alerts, toasts, progress bars, skeletons, spinners, empty states, badges, and avatars with status."
        breadcrumbs={[{ label: "UI Library" }, { label: "Feedback" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Alerts" description="Information, success, warning, and error variants.">
          <div className="space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                Your trial ends in 7 days. Add a payment method to keep your workspace active.
              </AlertDescription>
            </Alert>
            <Alert variant="default" className="border-success/30 bg-success/5">
              <CheckCircle2 className="size-4 text-success" />
              <AlertTitle>Payment received</AlertTitle>
              <AlertDescription>
                Your invoice #INV-2024-0882 for $2,840 has been paid successfully.
              </AlertDescription>
            </Alert>
            <Alert variant="default" className="border-warning/30 bg-warning/5">
              <AlertTriangle className="size-4 text-warning" />
              <AlertTitle>Storage almost full</AlertTitle>
              <AlertDescription>
                You&apos;ve used 92% of your 500 GB storage. Consider upgrading your plan.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="size-4" />
              <AlertTitle>Sync failed</AlertTitle>
              <AlertDescription>
                We couldn&apos;t sync 3 files from Google Drive. Check your connection and retry.
              </AlertDescription>
            </Alert>
          </div>
        </SectionCard>

        <SectionCard title="Toast Triggers" description="Fire off sonner toasts in different styles.">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => toast.info("System update available", { description: "Version 2.4.1 is ready to install." })}>
              <Info className="size-4 mr-2" />Info
            </Button>
            <Button variant="outline" onClick={() => toast.success("Profile saved", { description: "Your changes are now live." })}>
              <CheckCircle2 className="size-4 mr-2 text-success" />Success
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Approaching limit", { description: "You have 8% of API quota remaining." })}>
              <AlertTriangle className="size-4 mr-2 text-warning" />Warning
            </Button>
            <Button variant="outline" onClick={() => toast.error("Upload failed", { description: "File exceeds the 25 MB limit." })}>
              <XCircle className="size-4 mr-2 text-destructive" />Error
            </Button>
            <Button variant="outline" onClick={() => toast("Meeting reminder", { description: "Standup in 10 minutes — room: Aurora." })}>
              <BellRing className="size-4 mr-2" />Default
            </Button>
            <Button variant="outline" onClick={() => toast.success("Invitation sent", { description: "An email was sent to alex@mtverse.io.", action: { label: "Resend", onClick: () => toast.info("Invitation resent") } })}>
              <Sparkles className="size-4 mr-2 text-primary" />Action
            </Button>
          </div>
          <div className="mt-4 rounded-lg border border-border p-3 bg-muted/30 text-xs text-muted-foreground">
            Toasts auto-dismiss after a few seconds and stack at the bottom-right of the screen.
          </div>
        </SectionCard>

        <SectionCard title="Progress & Loading" description="Linear progress, indeterminate loading, and spinners.">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Upload progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" className="h-8" disabled={loading} onClick={() => { setProgress(0); setLoading(true); }}>
                  {loading ? <Loader2 className="size-3.5 mr-1.5 animate-spin" /> : null}
                  {loading ? "Syncing…" : "Start sync"}
                </Button>
                <Button size="sm" variant="ghost" className="h-8" disabled={!loading} onClick={() => { setLoading(false); toast.info("Sync paused"); }}>Pause</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Disk usage</span>
                <span className="font-medium">412 GB / 500 GB</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="flex items-center gap-6 pt-2 border-t border-border">
              <div className="flex flex-col items-center gap-1">
                <Loader2 className="size-5 animate-spin text-primary" />
                <span className="text-[10px] text-muted-foreground">Spinner</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="size-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-[10px] text-muted-foreground">Ring</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1.5">Dots</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="relative flex size-5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />
                  <span className="relative inline-flex size-5 rounded-full bg-primary/60" />
                </span>
                <span className="text-[10px] text-muted-foreground">Pulse</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Skeletons" description="Loading placeholders matching common layouts.">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-40" />
              </div>
              <Skeleton className="size-8 rounded-md" />
            </div>
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-5/6" />
            <Skeleton className="h-2 w-4/6" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Badges" description="Variants for every status and tone.">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
              <Badge variant="outline" className="bg-info/10 text-info border-info/20">Pending</Badge>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
              <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="gap-1"><span className="size-1.5 rounded-full bg-primary-foreground" />Live</Badge>
              <Badge variant="secondary" className="gap-1"><Star className="size-3" />4.8</Badge>
              <Badge variant="outline" className="gap-1"><Zap className="size-3 text-warning" />Fast</Badge>
              <Badge variant="outline" className="gap-1"><Heart className="size-3 text-destructive" />Liked</Badge>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Avatars with Status" description="Avatars with presence indicators.">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {[
                { name: "Alex Morgan", status: "online", color: "bg-success" },
                { name: "Priya Sharma", status: "away", color: "bg-warning" },
                { name: "Marcus Chen", status: "busy", color: "bg-destructive" },
                { name: "Sarah Kim", status: "offline", color: "bg-muted-foreground" },
              ].map((u) => (
                <div key={u.name} className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <Avatar className="size-10"><AvatarFallback className="text-xs bg-muted">{u.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                    <span className={"absolute bottom-0 right-0 size-3 rounded-full border-2 border-background " + u.color} />
                  </div>
                  <span className="text-[10px] text-muted-foreground capitalize">{u.status}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center -space-x-2">
              {["Alex Morgan", "Priya Sharma", "Marcus Chen", "Sarah Kim", "Diego Reyes"].map((n) => (
                <Avatar key={n} className="size-8 border-2 border-background">
                  <AvatarFallback className="text-[10px] bg-muted">{n.split(" ").map((p) => p[0]).join("")}</AvatarFallback>
                </Avatar>
              ))}
              <span className="size-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground">+8</span>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Empty States" description="Friendly placeholders for empty, error, or first-run views.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4 rounded-lg border border-dashed border-border">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-3">
              <Inbox className="size-6" />
            </div>
            <p className="text-sm font-semibold">No messages yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">When teammates message you, conversations will appear here.</p>
            <Button size="sm" className="h-7 mt-3" onClick={() => toast.success("Started new conversation")}>New message</Button>
          </div>
          <div className="flex flex-col items-center justify-center text-center py-8 px-4 rounded-lg border border-dashed border-border">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-warning/10 text-warning mb-3">
              <FileText className="size-6" />
            </div>
            <p className="text-sm font-semibold">No documents found</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Try adjusting your search or upload a new file to get started.</p>
            <Button size="sm" variant="outline" className="h-7 mt-3" onClick={() => toast.info("Opening file picker")}>Browse files</Button>
          </div>
          <div className="flex flex-col items-center justify-center text-center py-8 px-4 rounded-lg border border-dashed border-border">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-3">
              <User className="size-6" />
            </div>
            <p className="text-sm font-semibold">No team members</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Invite your first teammate to start collaborating on projects.</p>
            <Button size="sm" variant="outline" className="h-7 mt-3" onClick={() => toast.success("Invitation sent")}>Invite member</Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
