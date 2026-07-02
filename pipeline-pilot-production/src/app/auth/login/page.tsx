'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/layout/logo';
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  BarChart3,
  Zap,
  ShieldCheck,
  Fingerprint,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Pipeline forecasting',
    desc: 'AI-driven projections with 94% accuracy across territories.',
  },
  {
    icon: Zap,
    title: 'Workflow automation',
    desc: 'Cut manual data entry by up to 80% with smart routing.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-grade security',
    desc: 'SOC 2 Type II, GDPR & HIPAA compliant by default.',
  },
];

const CUSTOMERS = [
  { name: 'Acme', color: 'var(--chart-1)' },
  { name: 'Globex', color: 'var(--chart-2)' },
  { name: 'Initech', color: 'var(--chart-3)' },
  { name: 'Umbrella', color: 'var(--chart-4)' },
  { name: 'Stark', color: 'var(--chart-5)' },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('jordan.river@pipelinepilot.io');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1100);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT PANEL — brand showcase */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-accent/10 via-card to-background relative overflow-hidden border-r border-border">
        {/* Decorative orbs */}
        <div className="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 -left-20 w-96 h-96 rounded-full bg-chart-1/15 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] text-foreground pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Top brand */}
        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <Logo className="w-10 h-10" />
          <div>
            <p className="text-base font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-xs text-muted-foreground">Premium sales operations platform</p>
          </div>
        </div>

        {/* Center hero with abstract chart */}
        <div className="relative z-10 my-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Where revenue teams
            <br />
            <span className="text-accent">find their wings.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md mb-8">
            Pipeline, forecasting, deals, customers and team performance — unified in a single, beautiful workspace.
          </p>

          {/* Abstract pipeline chart */}
          <div className="relative h-48 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 overflow-hidden">
            <div className="absolute top-3 left-4 flex flex-col gap-1 z-10">
              <p className="text-xs text-muted-foreground">Pipeline value</p>
              <p className="text-xl font-semibold tabular-nums">$2.4B</p>
            </div>
            <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-success z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </div>
            <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 130 L40 110 L80 118 L120 84 L160 96 L200 62 L240 74 L280 42 L320 54 L360 22 L400 32 L400 160 L0 160 Z"
                fill="url(#lg-area)"
              />
              <path
                d="M0 130 L40 110 L80 118 L120 84 L160 96 L200 62 L240 74 L280 42 L320 54 L360 22 L400 32"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[...Array(8)].map((_, i) => (
                <rect
                  key={i}
                  x={20 + i * 48}
                  y={140 - (i * 5 + 10)}
                  width="12"
                  height={i * 5 + 10}
                  rx="2"
                  fill="var(--chart-1)"
                  opacity="0.35"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '120ms' }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <f.icon className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer logos strip */}
        <div className="relative z-10 pt-8 mt-8 border-t border-border/60">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
            Trusted by revenue teams at
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {CUSTOMERS.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: c.color }}
                >
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
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

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your workspace to continue.
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              or
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            className="w-full h-10"
            type="button"
            onClick={() => router.push('/auth/two-factor')}
          >
            <Fingerprint className="w-4 h-4" />
            Continue with SSO
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-accent font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
