import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Search,
  LayoutDashboard,
  Handshake,
  GitBranch,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

const SUGGESTED_PAGES = [
  {
    label: 'Overview',
    href: '/dashboard',
    description: 'Your at-a-glance home base — KPIs, recent deals and AI insights.',
    icon: LayoutDashboard,
    accent: 'var(--accent)',
  },
  {
    label: 'Deals',
    href: '/dashboard/deals',
    description: 'Track every active opportunity from qualified to closed won.',
    icon: Handshake,
    accent: 'var(--chart-1)',
  },
  {
    label: 'Pipeline',
    href: '/dashboard/pipeline',
    description: 'Stage-by-stage view of revenue flowing through your funnel.',
    icon: GitBranch,
    accent: 'var(--chart-3)',
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    description: 'Saved analytics, dashboards and exports in one library.',
    icon: BarChart3,
    accent: 'var(--chart-5)',
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex flex-col bg-background overflow-hidden">
      {/* Ambient decorative background */}
      <div className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-44 -left-24 w-[28rem] h-[28rem] rounded-full bg-chart-1/10 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] text-foreground pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top brand bar */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Logo className="w-9 h-9 transition-transform group-hover:scale-105" />
          <div>
            <p className="text-sm font-semibold tracking-tight">Pipeline Pilot</p>
            <p className="text-[11px] text-muted-foreground">Sales operations platform</p>
          </div>
        </Link>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4" /> Back to app
          </Link>
        </Button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 pb-16 -mt-8">
        <div className="w-full max-w-3xl text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Decorative disconnected pipeline SVG */}
          <div className="relative mx-auto w-full max-w-md h-44 sm:h-52 mb-8">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="nf-grad-left" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="nf-grad-right" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* left segment of pipeline */}
              <path
                d="M20 100 L130 100 L150 100 L170 95"
                stroke="url(#nf-grad-left)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="20" cy="100" r="6" fill="var(--chart-1)" />
              <circle cx="170" cy="95" r="6" fill="var(--chart-1)" opacity="0.5" />

              {/* broken gap with sparks */}
              <g className="animate-pulse">
                <path
                  d="M178 88 L186 80 M186 100 L196 100 M182 108 L190 116"
                  stroke="var(--warning)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* right segment of pipeline */}
              <path
                d="M210 95 L230 100 L260 100 L380 100"
                stroke="url(#nf-grad-right)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="210" cy="95" r="6" fill="var(--accent)" opacity="0.5" />
              <circle cx="380" cy="100" r="6" fill="var(--accent)" />

              {/* small floating broken chart-line above */}
              <path
                d="M60 50 L100 36 L140 56 L180 30"
                stroke="var(--chart-3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
                strokeDasharray="4 4"
              />
              <path
                d="M220 60 L260 36 L300 56 L340 30"
                stroke="var(--chart-5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
                strokeDasharray="4 4"
              />

              {/* ground dashed */}
              <line
                x1="20"
                y1="140"
                x2="380"
                y2="140"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </svg>
          </div>

          {/* 404 display */}
          <div className="relative inline-block mb-4">
            <h1 className="text-[7rem] sm:text-[9rem] font-bold leading-none tracking-tighter bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent tabular-nums">
              404
            </h1>
            <span className="absolute -top-2 -right-6 sm:-right-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/25 text-[10px] font-semibold text-accent uppercase tracking-wider animate-in fade-in zoom-in duration-500" style={{ animationDelay: '250ms' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              off-pipeline
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            This page wandered off the pipeline
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
              <Link href="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                Back to dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard?focus=search">
                <Search className="w-4 h-4" />
                Search
              </Link>
            </Button>
          </div>

          {/* Suggested pages */}
          <div className="border-t border-border/60 pt-8">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">
              Suggested destinations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SUGGESTED_PAGES.map((page, i) => (
                <Link
                  key={page.label}
                  href={page.href}
                  className="group relative bg-card border border-border rounded-xl p-4 text-left hover:border-accent/40 hover:bg-accent/[0.04] transition-all animate-in fade-in slide-in-from-bottom-3 duration-500"
                  style={{ animationDelay: `${300 + i * 70}ms` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 border"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${page.accent} 12%, transparent)`,
                      borderColor: `color-mix(in oklch, ${page.accent} 25%, transparent)`,
                    }}
                  >
                    <page.icon className="w-4 h-4" style={{ color: page.accent }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{page.label}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 sm:px-10 py-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pipeline Pilot. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/maintenance" className="hover:text-foreground transition-colors">
              Status
            </Link>
            <a
              href="mailto:support@pipelinepilot.io"
              className="hover:text-foreground transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
