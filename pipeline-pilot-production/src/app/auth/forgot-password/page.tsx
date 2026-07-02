'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resending, setResending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1100);
  };

  const resend = () => {
    setResending(true);
    setTimeout(() => setResending(false), 1100);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT PANEL — minimal brand */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-accent/10 via-card to-background relative overflow-hidden border-r border-border">
        <div className="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 -left-20 w-96 h-96 rounded-full bg-chart-3/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <Logo className="w-10 h-10" />
          <div>
            <p className="text-base font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-xs text-muted-foreground">Premium sales operations platform</p>
          </div>
        </div>

        <div className="relative z-10 my-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Account recovery</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Lost your password?
            <br />
            <span className="text-accent">We&apos;ve got you.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            Reset instructions are sent instantly. The link expires in 60 minutes for your security.
          </p>
        </div>

        <div className="relative z-10 pt-6 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="w-3.5 h-3.5" />
          Need help? Email{' '}
          <a href="mailto:support@pipelinepilot.io" className="text-accent hover:underline">
            support@pipelinepilot.io
          </a>
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <Logo className="w-9 h-9" />
            <span className="font-semibold tracking-tight">Pipeline Pilot</span>
          </div>

          {!sent ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending link…
                    </>
                  ) : (
                    <>
                      Send reset link <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <Link
                href="/auth/login"
                className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </>
          ) : (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Check your email</h2>
              <p className="text-sm text-muted-foreground mb-1">
                We sent a reset link to
              </p>
              <p className="text-sm font-medium text-foreground mb-6 break-all">
                {email || 'your inbox'}
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Didn&apos;t receive it? Check your spam folder or try again in a minute.
              </p>

              <Button
                variant="outline"
                className="w-full h-10"
                onClick={resend}
                disabled={resending}
              >
                {resending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Resending…
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" /> Resend reset link
                  </>
                )}
              </Button>

              <Link
                href="/auth/login"
                className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
