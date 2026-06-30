"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Inbox, Search, AlertTriangle, BellOff, Lock, Sparkles, Wrench, CheckCircle2,
  CloudOff, RefreshCw, Plus, Mail, ArrowRight, FileQuestion, Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function EmptyStatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Empty States"
        description="Eight common empty state variants with appropriate icon, copy and action."
        breadcrumbs={[{ label: "UI Library" }, { label: "Empty States" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionCard title="No Data" description="First-time empty state">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <Inbox className="size-7" />
            </div>
            <p className="text-sm font-semibold">No projects yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              You haven’t created any projects. Start your first one to begin collaborating with your team.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.success("Project wizard started")}>
              <Plus className="size-4 mr-1.5" /> Create project
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="No Search Results" description="After empty search">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <Search className="size-7" />
            </div>
            <p className="text-sm font-semibold">No matches for “radar chart”</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Try different keywords, check spelling, or remove some filters to broaden your search.
            </p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={() => toast.info("Filters cleared")}>Clear filters</Button>
              <Button size="sm" variant="ghost" onClick={() => toast.info("Browsing docs")}>Browse docs</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Error State" description="Failed to load">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
              <AlertTriangle className="size-7" />
            </div>
            <p className="text-sm font-semibold">Failed to load dashboard</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              We couldn’t fetch your analytics data. Check your connection and try again.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.success("Retrying…")}>
              <RefreshCw className="size-4 mr-1.5" /> Try again
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="No Notifications" description="Caught-up inbox">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-success/10 text-success mb-4">
              <BellOff className="size-7" />
            </div>
            <p className="text-sm font-semibold">You’re all caught up</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              No new notifications. We’ll let you know when something important happens.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => toast.info("Adjusting preferences")}>
              Notification settings
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="No Permission" description="Access denied">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-warning/10 text-warning mb-4">
              <Lock className="size-7" />
            </div>
            <p className="text-sm font-semibold">Access restricted</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              You don’t have permission to view this page. Request access from your workspace admin.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.success("Request sent to admin")}>
              Request access
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="First-Time Use" description="Onboarding prompt">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Sparkles className="size-7" />
            </div>
            <p className="text-sm font-semibold">Welcome to MTVerse!</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Let’s set up your workspace in 3 quick steps. It takes about 2 minutes.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.success("Starting onboarding")}>
              <Rocket className="size-4 mr-1.5" /> Start setup
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Maintenance" description="System unavailable">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-warning/10 text-warning mb-4">
              <Wrench className="size-7" />
            </div>
            <p className="text-sm font-semibold">Under maintenance</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              We’re performing scheduled maintenance. Expected back online by 6:00 PM PT.
            </p>
            <Badge variant="outline" className="mt-4 bg-warning/10 text-warning border-warning/20">
              ETA: 2h 14m
            </Badge>
          </div>
        </SectionCard>

        <SectionCard title="Success" description="Empty after action">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-success/10 text-success mb-4">
              <CheckCircle2 className="size-7" />
            </div>
            <p className="text-sm font-semibold">Inbox zero!</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              You’ve handled every message. Take a breath — you’re all done for today.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => toast.info("Viewing archive")}>
              View archived
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Offline" description="No connection">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <CloudOff className="size-7" />
            </div>
            <p className="text-sm font-semibold">You’re offline</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Changes you make will sync automatically once your connection is restored.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={() => toast.success("Back online")}>
              <RefreshCw className="size-4 mr-1.5" /> Retry connection
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="404 — Not Found" description="Missing resource">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <FileQuestion className="size-7" />
            </div>
            <p className="text-sm font-semibold">Page not found</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              The page you’re looking for has moved or no longer exists.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.info("Going home")}>
              <ArrowRight className="size-4 mr-1.5 rotate-180" /> Back to dashboard
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Empty Cart" description="Commerce empty state">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <Inbox className="size-7" />
            </div>
            <p className="text-sm font-semibold">Your cart is empty</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Browse our template marketplace and find the perfect dashboard for your team.
            </p>
            <Button size="sm" className="mt-4" onClick={() => toast.info("Browsing marketplace")}>
              Browse templates
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Custom Illustration" description="Empty state with action input">
          <div className="flex flex-col items-center justify-center text-center py-8 px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Mail className="size-7" />
            </div>
            <p className="text-sm font-semibold">Subscribe to changelog</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mb-4">
              Get an email when we ship new features. No spam, unsubscribe anytime.
            </p>
            <div className="flex gap-2 w-full max-w-xs">
              <Input placeholder="you@email.com" className="text-xs h-8" />
              <Button size="sm" className="h-8" onClick={() => toast.success("Subscribed!")}>Subscribe</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
