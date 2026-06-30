"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MTVLogo } from "@/components/mtv/logo";
import {
  AlertTriangle,
  Clock,
  Mail,
  MessageCircle,
  Twitter,
  Wrench,
} from "lucide-react";

export default function MaintenancePage() {
  const [progress, setProgress] = React.useState(28);

  // Animate the progress bar slightly for a live feel
  React.useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 72 ? p : Math.min(72, p + 1)));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const eta = new Date(Date.now() + 1000 * 60 * 47);

  return (
    <div className="w-full max-w-lg mx-auto text-center py-8 animate-fade-in">
      <div className="flex justify-center mb-8">
        <MTVLogo />
      </div>

      {/* Hero icon */}
      <div className="relative mx-auto mb-6 size-24">
        <div className="absolute inset-0 rounded-full bg-warning/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-warning/15 text-warning ring-1 ring-warning/30">
            <Wrench className="size-10" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 flex size-8 items-center justify-center rounded-full bg-background ring-1 ring-border">
          <AlertTriangle className="size-4 text-warning" />
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Under Maintenance
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          We&apos;re performing scheduled upgrades to make MTVerse faster and more reliable.
          Some features may be temporarily unavailable. Thanks for your patience!
        </p>
      </div>

      {/* Progress card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium text-left space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-warning animate-pulse" />
            <span className="text-sm font-semibold">Maintenance in progress</span>
          </div>
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2.5" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            Estimated completion
          </span>
          <span className="font-medium text-foreground">
            {eta.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        {[
          { label: "API", status: "Operational", color: "success" },
          { label: "Dashboard", status: "Maintenance", color: "warning" },
          { label: "Webhooks", status: "Operational", color: "success" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-3 text-center"
          >
            <div
              className={`mx-auto size-2 rounded-full mb-2 ${
                s.color === "success" ? "bg-success" : "bg-warning animate-pulse"
              }`}
            />
            <p className="text-xs font-semibold">{s.label}</p>
            <p className="text-[11px] text-muted-foreground">{s.status}</p>
          </div>
        ))}
      </div>

      {/* Contact + socials */}
      <div className="mt-8 space-y-4">
        <p className="text-xs text-muted-foreground">
          Need urgent help?{" "}
          <a
            href="mailto:support@mtverse.io"
            className="font-medium text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Opening support chat...");
            }}
          >
            Contact support
          </a>
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Email us"
            onClick={() => toast.info("support@mtverse.io")}
          >
            <Mail className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Chat with us"
            onClick={() => toast.info("Live chat coming soon")}
          >
            <MessageCircle className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Follow on X"
            onClick={() => toast.info("Follow @mtverse")}
          >
            <Twitter className="size-4" />
          </Button>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} MTVerse. All rights reserved. ·{" "}
        <Link href="/signin" className="hover:text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
