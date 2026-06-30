"use client";
import { useEffect, useState } from "react";
import { Card, Badge, Button, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Wrench, Clock, ExternalLink, Bell, Bird, Code2, Mail } from "lucide-react";

const UPDATES = [
  { time: "12 min ago", text: "Database migration in progress — 62% complete" },
  { time: "1 hour ago", text: "Maintenance window started as scheduled" },
  { time: "2 hours ago", text: "Pre-maintenance backup completed successfully" },
];

export default function MaintenancePage() {
  const [progress, setProgress] = useState(38);
  const [eta, setEta] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return Math.min(95, p + Math.random() * 3);
      });
      setEta((e) => Math.max(2, e - 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <Card className="relative overflow-hidden p-8 text-center sm:p-10">
          {/* Decorative top gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 gradient-bg" />
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-100/60 blur-3xl dark:bg-accent-500/10" />

          <div className="relative">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <Wrench className="h-10 w-10 animate-pulse" />
            </div>

            <Badge tone="warning" variant="soft" className="mt-6">
              <Clock className="h-3 w-3" /> Scheduled maintenance
            </Badge>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              We&apos;ll be right back
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-gray-600 dark:text-gray-400">
              Nimbus Pro is undergoing scheduled maintenance to bring you a faster, more reliable
              experience. Thanks for your patience — we&apos;re working on it.
            </p>

            {/* Progress */}
            <div className="mt-8 text-left">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Restoring services
                </span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} tone="brand" size="lg" />
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>ETA: ~{Math.round(eta)} min</span>
                <span>Started at 02:00 UTC</span>
              </div>
            </div>

            {/* Updates */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-gray-800 dark:bg-gray-900/60">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Live updates
              </p>
              <ul className="space-y-3">
                {UPDATES.map((u, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      i === 0 ? "bg-brand-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"
                    )} />
                    <div className="min-w-0">
                      <p className="text-gray-700 dark:text-gray-300">{u.text}</p>
                      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{u.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="outline" className="w-full sm:w-auto">
                <Bell className="h-4 w-4" /> Notify me when back
              </Button>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:text-gray-300 dark:hover:text-brand-400 sm:w-auto"
              >
                <ExternalLink className="h-4 w-4" /> Status page
              </a>
            </div>

            {/* Socials */}
            <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400">Follow for updates:</span>
              {[Bird, Code2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-brand-500/15 dark:hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          Need urgent help? Email{" "}
          <a href="mailto:status@nimbuspro.io" className="font-semibold text-brand-600 dark:text-brand-400">
            status@nimbuspro.io
          </a>
        </p>
      </div>
    </div>
  );
}
