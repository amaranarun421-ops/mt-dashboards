"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MTVLogo } from "@/components/mtv/logo";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-powered insights",
    desc: "Generate dashboards, reports, and forecasts with natural language prompts.",
  },
  {
    icon: Zap,
    title: "Real-time collaboration",
    desc: "Co-author dashboards with your team and share insights in seconds.",
  },
  {
    icon: Rocket,
    title: "100+ integrations",
    desc: "Connect your stack — Postgres, Snowflake, Stripe, HubSpot, and more.",
  },
];

function useCountdown(target: number) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function ComingSoonPage() {
  // 14 days from now, fixed for the session
  const target = React.useMemo(() => Date.now() + 1000 * 60 * 60 * 24 * 14, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're on the list! We'll be in touch soon.");
    }, 1200);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto text-center py-6 animate-fade-in">
      <div className="flex justify-center mb-6">
        <MTVLogo />
      </div>

      <Badge variant="outline" className="mb-4 gap-1.5 bg-primary/5 border-primary/20 text-primary">
        <Sparkles className="size-3" />
        Coming soon
      </Badge>

      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
        MTVerse{" "}
        <span className="text-gradient-mtv">AI Studio</span>
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
        The next generation of analytics — chat with your data, generate dashboards
        instantly, and let AI surface insights before you even ask.
      </p>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-8 max-w-md mx-auto">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-xl border border-border bg-card p-3 sm:p-4 shadow-sm"
          >
            <div className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
              {pad(u.value)}
            </div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
              {u.label}
            </div>
          </div>
        ))}
      </div>

      {/* Early access email signup */}
      <form onSubmit={onSubmit} className="max-w-md mx-auto mb-8">
        <div className="text-left space-y-2">
          <Label htmlFor="early-email" className="text-sm font-medium">
            Get early access
          </Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="early-email"
                type="email"
                placeholder="you@company.com"
                className="pl-9"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join the waitlist"
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Be the first to know when we launch. No spam, ever.
          </p>
        </div>
      </form>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8 text-left">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
              <f.icon className="size-5" />
            </div>
            <p className="text-sm font-semibold mb-1">{f.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Dev progress */}
      <div className="rounded-xl border border-border bg-card p-5 text-left max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-success" />
            <span className="text-sm font-semibold">Development status</span>
          </div>
          <span className="text-sm font-semibold text-foreground">82%</span>
        </div>
        <Progress value={82} className="h-2 mb-3" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            Beta starts in 14 days
          </span>
          <span>1,248 on waitlist</span>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} MTVerse. All rights reserved.
      </p>
    </div>
  );
}
