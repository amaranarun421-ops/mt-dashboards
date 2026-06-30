"use client";

import * as React from "react";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  RocketIcon,
  BellIcon,
  CheckIcon,
  MailIcon,
  BookIcon,
  HelpCircleIcon,
} from "@/components/Layouts/sidebar/icons";

const TARGET = new Date("2026-12-31T17:00:00Z").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(): Remaining {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const socials = [
  {
    label: "X",
    href: "#",
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function ComingSoonClient() {
  const [remaining, setRemaining] = React.useState<Remaining>(getRemaining());
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubscribed(true);
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] grid place-items-center">
      <div className="w-full max-w-3xl px-4">
        {/* LOGO + BADGE */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
              <RocketIcon className="size-8" />
            </span>
          </div>
          <Badge variant="primary" size="lg">
            <BellIcon className="size-3.5" /> Coming soon · v5.0
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark dark:text-white md:text-5xl md:leading-tight">
            Something brilliant is{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              on the way
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            We are putting the finishing touches on Helios Pro v5.0 — realtime
            streaming charts, the AI Insights panel, embedded analytics SDK and
            a brand-new mobile companion. Be the first to know when we ship.
          </p>
        </div>

        {/* COUNTDOWN */}
        <Card>
          <div className="mb-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6">
              Launching in
            </p>
            <p className="text-xs text-dark-5 dark:text-dark-6">
              Target: 31 December 2026 · 17:00 UTC
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-xl border border-stroke bg-gradient-to-br from-gray-2 to-white p-3 text-center dark:border-dark-3 dark:from-white/5 dark:to-gray-dark sm:p-4"
              >
                <p className="font-mono text-3xl font-bold tabular-nums tracking-tight text-dark dark:text-white sm:text-4xl">
                  {String(u.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6 sm:text-xs">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* EMAIL SIGNUP */}
        <Card className="mt-5">
          {subscribed ? (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="mb-3 grid size-12 place-items-center rounded-full bg-primary text-white">
                <CheckIcon className="size-6" />
              </div>
              <h2 className="text-lg font-bold text-dark dark:text-white">
                You&rsquo;re on the list!
              </h2>
              <p className="mt-1 max-w-md text-sm text-dark-5 dark:text-dark-6">
                We&rsquo;ll email{" "}
                <strong className="text-dark dark:text-white">{email}</strong>{" "}
                the moment v5.0 ships. No spam — just the launch announcement
                and a 24-hour early-bird discount.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setEmail("");
                  setSubscribed(false);
                }}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-center">
                <h2 className="text-lg font-bold text-dark dark:text-white">
                  Get launch day in your inbox
                </h2>
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                  Join 8,400+ developers on the early-bird list — get 25% off
                  on launch day.
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
                noValidate
              >
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6">
                    <MailIcon className="size-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-dark-6"
                    aria-label="Email address"
                  />
                </div>
                <Button type="submit" className="shrink-0">
                  <BellIcon className="size-4" /> Notify me
                </Button>
              </form>
              {error && (
                <p className="mt-2 text-center text-xs text-red">{error}</p>
              )}
              <p className="mt-3 text-center text-xs text-dark-5 dark:text-dark-6">
                We care about your privacy. Unsubscribe anytime with one click.
              </p>
            </>
          )}
        </Card>

        {/* PROGRESS TEASER */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Realtime charts", status: "Shipped to beta" },
            { label: "AI Insights", status: "Internal alpha" },
            { label: "Mobile app", status: "In design" },
          ].map((p) => (
            <Card key={p.label} className="py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                  <CheckIcon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-dark dark:text-white">
                    {p.label}
                  </p>
                  <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                    {p.status}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* SOCIALS */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6">
            Follow along
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-xl border border-stroke bg-white text-dark-5 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6 dark:hover:border-primary/30 dark:hover:text-primary-light"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-dark-5 dark:text-dark-6">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 transition hover:text-primary dark:hover:text-primary-light"
          >
            <BookIcon className="size-3.5" /> Read the changelog
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 transition hover:text-primary dark:hover:text-primary-light"
          >
            <HelpCircleIcon className="size-3.5" /> Visit help center
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 transition hover:text-primary dark:hover:text-primary-light"
          >
            <MailIcon className="size-3.5" /> Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
