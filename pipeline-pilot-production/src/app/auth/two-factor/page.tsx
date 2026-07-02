'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Logo } from '@/components/layout/logo';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Smartphone,
  KeyRound,
  Lock,
  RefreshCw,
  Fingerprint,
  Bell,
} from 'lucide-react';

const COUNTDOWN_SECONDS = 60;

const SECURITY_TIPS = [
  {
    icon: Smartphone,
    title: 'Use an authenticator app',
    desc: 'Apps like 1Password, Authy, or Google Authenticator are more secure than SMS.',
  },
  {
    icon: KeyRound,
    title: 'Save your backup codes',
    desc: 'Store one-time backup codes in a secure password manager in case you lose your device.',
  },
  {
    icon: Bell,
    title: 'Watch for suspicious logins',
    desc: 'We email you whenever a new device signs into your Pipeline Pilot account.',
  },
];

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1100);
  };

  const resend = () => {
    setSeconds(COUNTDOWN_SECONDS);
    setCode('');
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeLabel = `${minutes}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT PANEL — security tips */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-chart-2/10 via-card to-background relative overflow-hidden border-r border-border">
        <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-chart-2/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <Logo className="w-10 h-10" />
          <div>
            <p className="text-base font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-xs text-muted-foreground">Premium sales operations platform</p>
          </div>
        </div>

        <div className="relative z-10 my-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Fingerprint className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Two-factor authentication</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            One extra step,
            <br />
            <span className="text-accent">a lot more security.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md mb-8">
            Two-factor authentication keeps your pipeline safe — even if someone guesses your password.
          </p>

          <div className="space-y-3">
            {SECURITY_TIPS.map((tip, i) => (
              <div
                key={tip.title}
                className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <tip.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5">{tip.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          Protected by end-to-end encryption · SOC 2 Type II
        </div>
      </div>

      {/* RIGHT PANEL — OTP form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <Logo className="w-9 h-9" />
            <span className="font-semibold tracking-tight">Pipeline Pilot</span>
          </div>

          <div className="mb-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">Two-factor authentication</h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Enter the 6-digit code from your authenticator app to continue.
            </p>
          </div>

          <form onSubmit={onVerify} className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(v) => setCode(v)}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12 text-lg" />
                  <InputOTPSlot index={1} className="size-12 text-lg" />
                  <InputOTPSlot index={2} className="size-12 text-lg" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="size-12 text-lg" />
                  <InputOTPSlot index={4} className="size-12 text-lg" />
                  <InputOTPSlot index={5} className="size-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-muted-foreground">
                Code expires in{' '}
                <span className="font-mono text-foreground tabular-nums">{timeLabel}</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={loading || code.length !== 6}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying…
                </>
              ) : (
                <>
                  Verify <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Didn&apos;t receive a code?</span>
              <button
                type="button"
                onClick={resend}
                disabled={seconds > 0}
                className="text-accent font-medium hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
              >
                {seconds > 0 ? (
                  <span className="tabular-nums">Resend in {timeLabel}</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Resend code
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <div className="h-px bg-border" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                or
              </span>
            </div>

            <Link
              href="/auth/login"
              className="block text-center text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Use a backup code instead
            </Link>
          </div>

          <Link
            href="/auth/login"
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
