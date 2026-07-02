'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Check,
  X,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Quote,
} from 'lucide-react';

const STATS = [
  { icon: Users, value: '2,400+', label: 'teams trust Pipeline Pilot', color: 'var(--chart-1)' },
  { icon: TrendingUp, value: '32%', label: 'avg revenue lift in 90 days', color: 'var(--accent)' },
  { icon: DollarSign, value: '$2.4B+', label: 'pipeline managed monthly', color: 'var(--chart-4)' },
];

const TESTIMONIALS = [
  {
    quote:
      'We replaced four tools with Pipeline Pilot and our reps actually use it. Forecast accuracy jumped from 71% to 94% in one quarter.',
    name: 'Mara Whitfield',
    role: 'VP Sales, Northwind Labs',
    initials: 'MW',
    color: 'var(--chart-1)',
  },
  {
    quote:
      'The pipeline board alone pays for itself. Our team finally has a single source of truth across territories.',
    name: 'Diego Alvarez',
    role: 'CRO, Helios Cloud',
    initials: 'DA',
    color: 'var(--chart-2)',
  },
  {
    quote:
      'Onboarding took a weekend. By Monday every AE had their playbook, territory, and quota wired up.',
    name: 'Priya Nair',
    role: 'Head of RevOps, Brightside',
    initials: 'PN',
    color: 'var(--chart-4)',
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 11.1h-9.18v2.88h5.3c-.24 1.42-.94 2.62-1.99 3.42v2.85h3.22c1.88-1.74 2.97-4.3 2.97-7.34 0-.62-.05-1.18-.15-1.74z"
      />
      <path
        fill="#34A853"
        d="M12.17 22c2.7 0 4.96-.9 6.61-2.43l-3.22-2.85c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.27v2.94C4.91 19.96 8.27 22 12.17 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.58 13.56c-.2-.6-.31-1.24-.31-1.91s.11-1.31.31-1.91V6.8H3.27C2.59 8.15 2.2 9.66 2.2 11.24s.39 3.09 1.07 4.44l3.31-2.12z"
      />
      <path
        fill="#EA4335"
        d="M12.17 5.78c1.47 0 2.79.5 3.83 1.49l2.87-2.87C17.12 2.79 14.86 1.9 12.17 1.9 8.27 1.9 4.91 4.04 3.27 7.29l3.31 2.94c.79-2.36 2.99-4.45 5.59-4.45z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  );
}

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

export default function RegisterPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const strength = useMemo(() => calcStrength(password), [password]);
  const config = STRENGTH_CONFIG[strength.level];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/onboarding');
    }, 1200);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT PANEL — value proposition */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-chart-1/10 via-card to-background relative overflow-hidden border-r border-border">
        <div className="absolute -top-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-chart-1/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        {/* Top brand */}
        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <Logo className="w-10 h-10" />
          <div>
            <p className="text-base font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-xs text-muted-foreground">Premium sales operations platform</p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 my-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-8">
            Built for revenue
            <br />
            <span className="text-accent">teams that ship.</span>
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${s.color}20`, color: s.color }}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial carousel (static, clickable) */}
          <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-6">
            <Quote className="w-6 h-6 text-accent mb-3" />
            <p className="text-sm leading-relaxed mb-4 min-h-[4.5rem]">
              &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: TESTIMONIALS[activeTestimonial].color }}
                >
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{TESTIMONIALS[activeTestimonial].name}</p>
                  <p className="text-xs text-muted-foreground">{TESTIMONIALS[activeTestimonial].role}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === activeTestimonial ? 'w-6 bg-accent' : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70',
                    )}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Star rating row */}
        <div className="relative z-10 pt-6 border-t border-border/60 flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning text-warning" />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">4.9/5</span> from 1,200+ G2 reviews
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — register form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <Logo className="w-9 h-9" />
            <span className="font-semibold tracking-tight">Pipeline Pilot</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="Jordan" required autoComplete="given-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Rivera" required autoComplete="family-name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Inc." required autoComplete="organization" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Create a strong password"
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
                        style={{
                          background:
                            i <= config.bars ? config.color : 'var(--muted)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: config.color }}>
                    {config.label} password
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" required />
              <Label
                htmlFor="terms"
                className="text-xs text-muted-foreground cursor-pointer font-normal leading-relaxed"
              >
                I agree to the{' '}
                <Link href="#" className="text-accent hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating account…
                </>
              ) : (
                <>
                  Create account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              or sign up with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="h-10" onClick={() => router.push('/onboarding')}>
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline" type="button" className="h-10" onClick={() => router.push('/onboarding')}>
              <MicrosoftIcon />
              Microsoft
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
