"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label } from "@/components/ui";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-500/15" />
      <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />

      <div className="relative w-full max-w-[440px]">
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
          {sent ? (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                <MailCheck className="h-8 w-8" />
              </div>
              <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Check your inbox
              </h1>
              <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">{email}</span>.
                The link will expire in 60 minutes.
              </p>
              <div className="mt-6 flex w-full flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setSent(false); setEmail(""); }}
                >
                  Use a different email
                </Button>
                <Link
                  href="/auth/login"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </Link>
              </div>
              <p className="mt-4 inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-success-500" />
                Didn&apos;t get it? Check your spam folder.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <Mail className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Forgot password?
                </h1>
                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500 dark:text-gray-400">
                  No worries — enter your email below and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="forgot-email" required>Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="forgot-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending link…
                    </>
                  ) : (
                    <>
                      Send reset link <ArrowRight className="h-4 w-4" />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
