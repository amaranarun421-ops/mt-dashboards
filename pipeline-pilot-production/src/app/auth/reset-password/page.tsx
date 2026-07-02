'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from 'lucide-react';

type Strength = 'weak' | 'medium' | 'strong';

function calcStrength(pwd: string): { score: number; level: Strength } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const level: Strength = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
  return { score, level };
}

const STRENGTH_CONFIG: Record<Strength, { label: string; color: string; bars: number }> = {
  weak: { label: 'Weak', color: 'var(--destructive)', bars: 1 },
  medium: { label: 'Medium', color: 'var(--warning)', bars: 3 },
  strong: { label: 'Strong', color: 'var(--success)', bars: 5 },
};

const REQUIREMENTS = [
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { key: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { key: 'symbol', label: 'One symbol', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const strength = useMemo(() => calcStrength(password), [password]);
  const config = STRENGTH_CONFIG[strength.level];
  const matched = password.length > 0 && password === confirm;
  const allMet = REQUIREMENTS.every((r) => r.test(password));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matched || !allMet) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT PANEL — security visual */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-chart-3/10 via-card to-background relative overflow-hidden border-r border-border">
        <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-chart-3/15 blur-3xl pointer-events-none" />
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
            <Lock className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Securing your account</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Choose a password
            <br />
            <span className="text-accent">you&apos;ll actually remember.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md mb-8">
            Use a passphrase or a password manager. Strong passwords protect your pipeline, deals, and customer data.
          </p>

          {/* Security checklist card */}
          <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <p className="text-sm font-medium">Password best practices</p>
            </div>
            <ul className="space-y-2.5">
              {[
                'Use 12+ characters when possible',
                'Mix letters, numbers and symbols',
                'Avoid reusing passwords across sites',
                'Enable two-factor authentication after',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          Tip: a passphrase like{' '}
          <span className="font-mono text-foreground">purple-tuesday-42!</span> beats{' '}
          <span className="font-mono text-foreground">P@ssw0rd</span> every time.
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

          {!done ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Set new password</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a strong password to secure your account.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPwd ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{ background: i <= config.bars ? config.color : 'var(--muted)' }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: config.color }}>
                        {config.label} password
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter new password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      autoComplete="new-password"
                      className={cn(
                        'pr-10',
                        confirm.length > 0 && (matched ? 'border-success' : 'border-destructive'),
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirm.length > 0 && (
                    <p
                      className={cn(
                        'text-xs flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300',
                        matched ? 'text-success' : 'text-destructive',
                      )}
                    >
                      {matched ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Passwords match
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5" /> Passwords don&apos;t match
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* Requirements checklist */}
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-xs font-medium mb-2">Password requirements</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {REQUIREMENTS.map((r) => {
                      const met = r.test(password);
                      return (
                        <div
                          key={r.key}
                          className="flex items-center gap-2 text-xs transition-colors"
                          style={{ color: met ? 'var(--success)' : 'var(--muted-foreground)' }}
                        >
                          <div
                            className={cn(
                              'w-4 h-4 rounded-full flex items-center justify-center transition-colors',
                              met ? 'bg-success/15' : 'bg-muted',
                            )}
                          >
                            {met ? <Check className="w-3 h-3 text-success" /> : <X className="w-2.5 h-2.5 text-muted-foreground" />}
                          </div>
                          {r.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={loading || !matched || !allMet}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Updating password…
                    </>
                  ) : (
                    <>
                      Update password <ArrowRight className="w-4 h-4" />
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
              <h2 className="text-2xl font-bold tracking-tight mb-2">Password updated</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Your password has been changed successfully. You can now sign in with your new credentials.
              </p>
              <Button
                className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => router.push('/auth/login')}
              >
                Continue to sign in <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
