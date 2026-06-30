"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label } from "@/components/ui";
import { Lock, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_TONES = [
  "bg-error-500",
  "bg-error-500",
  "bg-warning-500",
  "bg-brand-500",
  "bg-success-500",
];

function scorePassword(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(5, score);
}

const CHECKS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Upper & lower case", test: (p: string) => /[A-Z]/.test(p) && /[a-z]/.test(p) },
  { label: "A number", test: (p: string) => /\d/.test(p) },
  { label: "A symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => scorePassword(password), [password]);
  const match = confirm.length > 0 && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!match) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-[460px]">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={40} height={40} priority />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Nimbus<span className="text-brand-500"> Pro</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="surface-card animate-slide-up p-6 sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Set new password
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Choose a strong password — you&apos;ll use it to sign in next time.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reset-password" required>New password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Enter new password"
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

              {/* Strength meter */}
              {password && (
                <div className="mt-2.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < score ? STRENGTH_TONES[score] : "bg-gray-200 dark:bg-gray-800"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Password strength</span>
                    <span className={`font-semibold ${score >= 4 ? "text-success-600 dark:text-success-400" : score >= 3 ? "text-brand-600 dark:text-brand-400" : score >= 2 ? "text-warning-600 dark:text-warning-400" : "text-error-600 dark:text-error-400"}`}>
                      {STRENGTH_LABELS[score] ?? STRENGTH_LABELS[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="reset-confirm" required>Confirm password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="px-9"
                  error={mismatch}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {mismatch && (
                <p className="mt-1.5 text-xs font-medium text-error-600 dark:text-error-400">
                  Passwords don&apos;t match
                </p>
              )}
              {match && (
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-success-600 dark:text-success-400">
                  <Check className="h-3.5 w-3.5" /> Passwords match
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/60">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Requirements
              </p>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {CHECKS.map((c) => {
                  const ok = c.test(password);
                  return (
                    <li key={c.label} className="flex items-center gap-1.5 text-xs">
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${ok ? "bg-success-500 text-white" : "bg-gray-200 text-gray-400 dark:bg-gray-700"}`}>
                        {ok && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className={ok ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"}>
                        {c.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading || !match}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Resetting…
                </>
              ) : (
                <>
                  Reset password <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <Link
            href="/auth/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
