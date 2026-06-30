"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, Badge, Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Rocket, Sparkles, CheckCircle2, Bell, Bird, Code2 } from "lucide-react";

const FEATURES_PREVIEW = [
  "AI Insights dashboard (GA)",
  "Realtime collaboration",
  "Plugin marketplace",
  "Mobile companion app",
];

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function ComingSoonPage() {
  // Target date: a fixed future point that will always render meaningfully
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 24);
    d.setHours(d.getHours() + 7);
    d.setMinutes(d.getMinutes() + 32);
    return d;
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  };

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Badge */}
        <Badge tone="brand" variant="soft" className="mb-5">
          <Sparkles className="h-3 w-3" /> Something big is coming
        </Badge>

        {/* Hero */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Nimbus Pro <span className="gradient-text">v3.5</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 dark:text-gray-300">
          Our biggest release yet — AI Insights, realtime collaboration, a plugin marketplace,
          and a brand new mobile companion. Be the first to know when we launch.
        </p>

        {/* Countdown */}
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map((u) => (
            <Card key={u.label} className="relative overflow-hidden p-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 gradient-bg" />
              <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {u.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Email signup */}
        <Card className="mt-8 p-6 sm:p-8">
          {subscribed ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                You&apos;re on the list!
              </h3>
              <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                We&apos;ll email <span className="font-semibold text-gray-700 dark:text-gray-300">{email}</span> the
                moment Nimbus Pro v3.5 ships. No spam, pinky promise.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 text-left">
              <div>
                <Label htmlFor="launch-email">Get notified at launch</Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="launch-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1"
                  />
                  <Button type="submit" className="shrink-0">
                    <Bell className="h-4 w-4" /> Notify me
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Join 4,200+ builders on the early access list.
                </p>
              </div>
            </form>
          )}
        </Card>

        {/* Features preview */}
        <div className="mt-8 text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            What&apos;s inside v3.5
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES_PREVIEW.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <Rocket className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">Follow the build:</span>
          {[Bird, Code2].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-brand-500/15 dark:hover:text-brand-400"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className={cn("mt-8 text-xs text-gray-400 dark:text-gray-500")}>
          Launching soon · ETA {target.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
