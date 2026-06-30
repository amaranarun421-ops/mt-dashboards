"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label, Avatar } from "@/components/ui";
import { Lock, Eye, EyeOff, ArrowRight, Fingerprint, Clock } from "lucide-react";

export default function LockScreenPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={40} height={40} priority />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Nimbus<span className="text-brand-500"> Pro</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="surface-card animate-slide-up relative overflow-hidden p-8 text-center">
          {/* Top gradient stripe */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 gradient-bg" />

          {/* Time chip */}
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
            <Clock className="h-3 w-3" /> {time} · {date}
          </div>

          {/* Avatar */}
          <div className="relative mx-auto mb-4 h-24 w-24">
            <Avatar name="Aaroh Sharma" size={96} className="ring-4 ring-white dark:ring-gray-900" />
            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-success-500 dark:border-gray-900" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hi, Aaroh
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Enter your password to unlock your workspace
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <Label htmlFor="lock-password" required>Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="lock-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Unlocking…
                </>
              ) : (
                <>
                  Unlock <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Biometric hint */}
          <button
            type="button"
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition-all hover:border-brand-300 hover:text-brand-600 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:text-brand-400"
          >
            <Fingerprint className="h-4 w-4" /> Unlock with Touch ID
          </button>

          {/* Footer */}
          <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
            >
              Sign in with a different account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
