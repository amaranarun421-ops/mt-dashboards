'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Users,
  Handshake,
  Building2,
  Mail,
  Sparkles,
  Check,
} from 'lucide-react';

const INVITER = {
  name: 'Sarah Chen',
  role: 'VP of Sales',
  company: 'Pipeline Pilot HQ',
  initials: 'SC',
  color: 'var(--accent)',
};

const ACCESS_CARDS = [
  {
    icon: Users,
    title: 'Your team',
    desc: '12 teammates in the Sales pod',
    color: 'var(--chart-1)',
    items: ['Sarah Chen — VP of Sales', 'Marcus Patel — Sales Manager', '9 fellow Account Execs'],
  },
  {
    icon: Handshake,
    title: 'Active deals',
    desc: '37 open deals across territories',
    color: 'var(--accent)',
    items: ['Northwind Labs · $84k', 'Helios Cloud · $127k', 'Brightside · $56k'],
  },
  {
    icon: Building2,
    title: 'Key accounts',
    desc: '18 named accounts in your book',
    color: 'var(--chart-4)',
    items: ['Acme Corp · Enterprise', 'Globex · Mid-Market', 'Initech · SMB'],
  },
];

export default function InviteTeamPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

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
      {/* LEFT PANEL — welcome + access cards */}
      <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-gradient-to-br from-accent/10 via-card to-background relative overflow-hidden border-r border-border">
        <div className="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 -left-20 w-96 h-96 rounded-full bg-chart-1/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
          <Logo className="w-10 h-10" />
          <div>
            <p className="text-base font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-xs text-muted-foreground">Premium sales operations platform</p>
          </div>
        </div>

        <div className="relative z-10 my-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">You&apos;re invited</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            Welcome to the
            <br />
            <span className="text-accent">Pipeline Pilot team.</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md mb-8">
            Here&apos;s what you&apos;ll get access to once you accept Sarah&apos;s invitation.
          </p>

          <div className="space-y-3">
            {ACCESS_CARDS.map((c, i) => (
              <div
                key={c.title}
                className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}20`, color: c.color }}
                  >
                    <c.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
                <ul className="space-y-1 pl-12">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-success shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="w-3.5 h-3.5" />
          Invitation sent to{' '}
          <span className="font-mono text-foreground">you@pipelinepilot.io</span>
        </div>
      </div>

      {/* RIGHT PANEL — accept invite form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <Logo className="w-9 h-9" />
            <span className="font-semibold tracking-tight">Pipeline Pilot</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">You&apos;re invited!</h2>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: INVITER.color }}
              >
                {INVITER.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {INVITER.name} invited you to join
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {INVITER.company} · {INVITER.role}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Jordan Rivera" required autoComplete="name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="you@pipelinepilot.io"
                readOnly
                className="bg-muted/30 text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Create a password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Choose a strong password"
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
              <p className="text-xs text-muted-foreground">
                Use 8+ characters with a mix of letters, numbers and symbols.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Accepting invite…
                </>
              ) : (
                <>
                  Accept invitation <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Not interested?{' '}
            <Link href="/auth/login" className="text-muted-foreground hover:text-destructive transition-colors">
              Decline
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
