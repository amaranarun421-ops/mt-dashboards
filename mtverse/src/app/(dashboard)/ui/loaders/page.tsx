"use client";

import * as React from "react";
import { Loader2, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function LoadersPage() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 4)), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loaders"
        description="Spinner, dots, bars, pulse, progress and shimmer loaders with custom CSS animations."
        breadcrumbs={[{ label: "UI Library" }, { label: "Loaders" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Circle Spinners" description="Standard rotating circle loaders">
          <div className="grid grid-cols-4 gap-4">
            {[
              { size: "size-4", label: "sm" },
              { size: "size-6", label: "md" },
              { size: "size-8", label: "lg" },
              { size: "size-12", label: "xl" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <Loader2 className={`${s.size} animate-spin text-primary`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
              <Loader2 className="size-6 animate-spin text-success" />
              <span className="text-xs text-muted-foreground">success</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
              <Loader2 className="size-6 animate-spin text-warning" />
              <span className="text-xs text-muted-foreground">warning</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
              <Loader2 className="size-6 animate-spin text-destructive" />
              <span className="text-xs text-muted-foreground">error</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">muted</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Dots" description="Bouncing and pulsing dot loaders">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Bouncing dots</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Pulsing dots</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="size-2 rounded-full bg-primary/40 animate-ping" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Ping dots</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="relative flex items-center justify-center size-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="absolute size-1.5 rounded-full bg-primary" style={{
                    transform: `rotate(${i * 60}deg) translateY(-12px)`,
                    opacity: 0.2 + (i / 6) * 0.8,
                    animation: `pulse 1.2s ${i * 0.1}s infinite`,
                  }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Orbit dots</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Bars" description="Vertical and horizontal bar loaders">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex items-end gap-1 h-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="w-1.5 bg-primary animate-pulse rounded-full" style={{
                    height: `${40 + Math.sin(i) * 30 + 20}%`,
                    animationDelay: `${i * 0.12}s`,
                    animationDuration: "0.8s",
                  }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Equalizer</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 w-1/3 bg-primary rounded-full" style={{ animation: "loadbar 1.2s ease-in-out infinite" }} />
              </div>
              <span className="text-xs text-muted-foreground">Indeterminate bar</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="w-1 h-8 bg-primary rounded-full" style={{
                    animation: `pulse 0.9s ${i * 0.15}s infinite ease-in-out`,
                  }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Pulse bars</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="flex gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-0.5 h-8 bg-primary rounded-full" style={{
                    animation: `pulse 1s ${i * 0.05}s infinite ease-in-out`,
                    opacity: 0.3 + (i / 12) * 0.7,
                  }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Wave bars</span>
            </div>
          </div>
          <style jsx>{`
            @keyframes loadbar {
              0% { left: -33%; }
              100% { left: 100%; }
            }
          `}</style>
        </SectionCard>

        <SectionCard title="Pulse & Ring" description="Pulsing and ring loaders">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="size-10 rounded-full bg-primary/20 animate-ping" />
              <span className="text-xs text-muted-foreground">Ping</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="size-10 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Pulse</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="relative size-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <span className="text-xs text-muted-foreground">Ring spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border">
              <div className="relative size-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" style={{ animationDuration: "1.5s" }} />
              </div>
              <span className="text-xs text-muted-foreground">Half ring</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Progress Bars" description="Linear progress with values">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Uploading data.csv (1.2 MB)</span>
                <span className="font-mono">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Syncing 1,284 records</span>
                <span className="font-mono">42%</span>
              </div>
              <Progress value={42} className="h-1.5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Building project</span>
                <span className="font-mono">78%</span>
              </div>
              <Progress value={78} className="h-3" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Indeterminate</span>
                <Badge variant="outline" className="text-[10px]">loading</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 w-1/3 bg-primary rounded-full animate-pulse" style={{ animation: "loadbar2 1.5s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes loadbar2 {
              0% { left: -33%; }
              50% { left: 50%; }
              100% { left: 100%; }
            }
          `}</style>
        </SectionCard>

        <SectionCard title="Shimmer" description="Skeleton shimmer effect">
          <div className="space-y-3">
            {[
              { w: "w-2/3", h: "h-4" },
              { w: "w-full", h: "h-3" },
              { w: "w-5/6", h: "h-3" },
              { w: "w-1/2", h: "h-3" },
            ].map((s, i) => (
              <div key={i} className="relative overflow-hidden rounded bg-muted">
                <div className={`${s.h} ${s.w} bg-muted`} />
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative overflow-hidden rounded-md bg-muted h-20">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes shimmer {
              100% { transform: translateX(100%); }
            }
          `}</style>
        </SectionCard>

        <SectionCard title="Inline Loaders" description="Small loaders for inline use">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="size-3.5 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading comments…</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="size-3.5 text-success animate-pulse" />
              <span className="text-muted-foreground">Streaming live data…</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
              <span className="text-muted-foreground">Connecting to server…</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="size-3 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Awaiting response…</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-primary" style={{ animation: "loadbar3 1.2s ease-in-out infinite" }} />
              </div>
              <span className="text-muted-foreground">Saving…</span>
            </div>
            <style jsx>{`
              @keyframes loadbar3 {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
            `}</style>
          </div>
        </SectionCard>

        <SectionCard title="Page Loader" description="Full-area centered loader">
          <div className="relative rounded-lg border border-border bg-muted/30 h-48 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative size-12">
                <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              </div>
              <p className="text-xs text-muted-foreground">Loading dashboard…</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
