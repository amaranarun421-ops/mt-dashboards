"use client";

import * as React from "react";
import { Rocket, Bell, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ComingSoon() {
  const [days, setDays] = React.useState(14);
  const [hours, setHours] = React.useState(6);
  const [mins, setMins] = React.useState(32);
  const [secs, setSecs] = React.useState(18);

  React.useEffect(() => {
    const t = setInterval(() => {
      setSecs(s => { if (s > 0) return s - 1; setMins(m => { if (m > 0) return m - 1; setHours(h => { if (h > 0) return h - 1; setDays(d => d - 1); return 23; }); return 59; }); return 59; });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8 text-center">
      <div className="mb-8"><Logo /></div>
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 mb-6">
        <Rocket className="h-12 w-12" />
      </div>
      <h1 className="font-bold text-4xl text-gray-800 dark:text-white/90 mb-3">Coming Soon</h1>
      <p className="max-w-md text-gray-500 dark:text-gray-400 mb-8">Something amazing is on the way. We're working hard to bring you an exciting new feature. Stay tuned!</p>
      <div className="flex gap-3 mb-8">
        {[{v: days, l: "Days"}, {v: hours, l: "Hours"}, {v: mins, l: "Minutes"}, {v: secs, l: "Seconds"}].map(t => (
          <div key={t.l} className="flex flex-col items-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] px-5 py-4 min-w-[80px]">
            <span className="font-bold text-3xl text-gray-800 dark:text-white/90">{String(t.v).padStart(2,"0")}</span>
            <span className="text-xs text-gray-400 mt-1">{t.l}</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md flex gap-2">
        <Input placeholder="Enter your email for updates" className="h-11" />
        <Button className="gap-1.5"><Bell className="h-4 w-4" /> Notify Me</Button>
      </div>
    </div>
  );
}
