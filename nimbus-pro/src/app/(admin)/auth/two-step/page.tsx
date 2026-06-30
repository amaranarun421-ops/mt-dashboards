"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ShieldCheck, ArrowLeft, ArrowRight, Smartphone, KeyRound } from "lucide-react";

const CODE_LENGTH = 6;

export default function TwoStepPage() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seconds, setSeconds] = useState(45);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setDigit = (i: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    setError(false);
    setDigits((prev) => {
      const next = [...prev];
      // If pasting multiple chars, fill across
      if (clean.length > 1) {
        for (let k = 0; k < clean.length && i + k < CODE_LENGTH; k++) {
          next[i + k] = clean[k];
        }
        const focusIdx = Math.min(i + clean.length, CODE_LENGTH - 1);
        inputs.current[focusIdx]?.focus();
        return next;
      }
      next[i] = clean.slice(-1);
      if (clean && i < CODE_LENGTH - 1) inputs.current[i + 1]?.focus();
      return next;
    });
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < CODE_LENGTH - 1) inputs.current[i + 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!text) return;
    const next = Array(CODE_LENGTH).fill("");
    for (let k = 0; k < text.length; k++) next[k] = text[k];
    setDigits(next);
    inputs.current[Math.min(text.length, CODE_LENGTH - 1)]?.focus();
  };

  const code = digits.join("");
  const complete = code.length === CODE_LENGTH;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo: code 000000 triggers an error
      if (code === "000000") setError(true);
    }, 1200);
  };

  const resend = () => {
    setSeconds(45);
    setDigits(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-[480px]">
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
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Two-factor authentication
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              Enter the 6-digit code from your authenticator app to continue.
            </p>
          </div>

          {/* Device hint */}
          <div className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
            <Smartphone className="h-3.5 w-3.5 text-brand-500" />
            Code sent to your authenticator on <span className="font-semibold text-gray-700 dark:text-gray-300">iPhone 15 Pro</span>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* OTP boxes */}
            <div className="flex items-center justify-between gap-2" onPaste={onPaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  autoFocus={i === 0}
                  aria-label={`Digit ${i + 1}`}
                  className={`h-14 w-full rounded-xl border bg-white text-center text-xl font-bold tabular-nums text-gray-900 outline-none transition-all dark:bg-gray-900 dark:text-white ${
                    error
                      ? "border-error-400 focus:border-error-500"
                      : d
                      ? "border-brand-400 focus:border-brand-500"
                      : "border-gray-200 focus:border-brand-500 dark:border-gray-700"
                  } focus:shadow-theme-focus`}
                />
              ))}
            </div>

            {error && (
              <p className="text-center text-sm font-medium text-error-600 dark:text-error-400">
                Invalid code. Please try again.
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={!complete || loading}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer links */}
          <div className="mt-6 flex flex-col items-center gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {seconds > 0 ? (
                <>Resend code in <span className="font-semibold text-gray-700 dark:text-gray-300">{seconds}s</span></>
              ) : (
                <button
                  type="button"
                  onClick={resend}
                  className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  Resend code
                </button>
              )}
            </div>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
            >
              <KeyRound className="h-3.5 w-3.5" /> Use a backup code
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
