"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label, Progress } from "@/components/ui";
import { Wrench, Bell, Clock, CheckCircle2, Activity } from "lucide-react";

const UPDATES = [
  { time: "2 min ago", text: "Database failover in progress — 82% complete", live: true },
  { time: "18 min ago", text: "Maintenance window started as scheduled", live: false },
  { time: "1 hour ago", text: "Pre-maintenance snapshot completed", live: false },
];

export default function Error503Page() {
  const [progress, setProgress] = useState(68);
  const [eta, setEta] = useState(18);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 96 ? p : Math.min(96, p + Math.random() * 1.5)));
      setEta((e) => Math.max(2, e - 0.4));
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-warning-200/40 blur-3xl dark:bg-warning-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-xl">
        {/* Logo */}
        <Link href="/" className="mb-6 flex items-center justify-center gap-2.5">
          <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Nimbus<span className="text-brand-500"> Pro</span>
          </span>
        </Link>

        {/* Card */}
        <div className="surface-card animate-slide-up relative overflow-hidden p-8 text-center sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 gradient-bg" />

          {/* Illustration */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400">
            <Wrench className="h-10 w-10 animate-pulse" />
          </div>

          {/* Status badge */}
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-warning-200 bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-400">
            <Clock className="h-3 w-3" /> Scheduled maintenance
          </div>

          {/* Error code */}
          <h1 className="mt-4 select-none text-6xl font-extrabold leading-none tracking-tighter sm:text-7xl">
            <span className="gradient-text">503</span>
          </h1>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Under Maintenance
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            We&apos;re performing scheduled maintenance to bring you a faster, more reliable
            experience. We&apos;ll be back shortly.
          </p>

          {/* Progress */}
          <div className="mt-6 text-left">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-700 dark:text-gray-300">Restoring services</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} tone="brand" size="lg" />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>ETA: ~{Math.round(eta)} min</span>
              <span>Started 02:00 UTC</span>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-gray-800 dark:bg-gray-900/60">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Live updates
            </p>
            <ul className="space-y-3">
              {UPDATES.map((u, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${u.live ? "bg-brand-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"}`} />
                  <div className="min-w-0">
                    <p className="text-gray-700 dark:text-gray-300">{u.text}</p>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{u.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="mt-6">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm font-semibold text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-400">
                <CheckCircle2 className="h-4 w-4" /> You&apos;ll be notified at {email}
              </div>
            ) : (
              <form onSubmit={onSubscribe} className="space-y-2">
                <Label htmlFor="err-503-email" className="mb-0 text-center">
                  Get notified when we&apos;re back
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="err-503-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="shrink-0">
                    <Bell className="h-4 w-4" /> Subscribe to Updates
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <a href="#" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400">
            <Activity className="h-3.5 w-3.5" /> Status page
          </a>
          <span className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
          <a href="mailto:status@nimbuspro.io" className="hover:text-brand-600 dark:hover:text-brand-400">
            status@nimbuspro.io
          </a>
        </div>
      </div>
    </div>
  );
}
