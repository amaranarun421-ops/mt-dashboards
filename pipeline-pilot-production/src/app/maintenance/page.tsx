import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { UpdatesForm } from './updates-form';
import {
  Wrench,
  Server,
  LayoutDashboard,
  RefreshCw,
  Cloud,
  Database,
  LifeBuoy,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Under maintenance',
  description: 'Pipeline Pilot is undergoing scheduled maintenance.',
  robots: { index: false, follow: false },
};

type ServiceStatus = 'degraded' | 'maintenance' | 'operational';

interface ServiceEntry {
  name: string;
  description: string;
  icon: typeof Server;
  status: ServiceStatus;
}

const SERVICES: ServiceEntry[] = [
  {
    name: 'API',
    description: 'REST & GraphQL endpoints, webhooks',
    icon: Server,
    status: 'maintenance',
  },
  {
    name: 'Dashboard',
    description: 'Web app, charts, deals UI',
    icon: LayoutDashboard,
    status: 'degraded',
  },
  {
    name: 'Sync',
    description: 'CRM integrations & data pipeline',
    icon: RefreshCw,
    status: 'maintenance',
  },
  {
    name: 'Edge cache',
    description: 'CDN & static asset delivery',
    icon: Cloud,
    status: 'operational',
  },
  {
    name: 'Analytics store',
    description: 'Historical queries & exports',
    icon: Database,
    status: 'degraded',
  },
];

const STATUS_META: Record<
  ServiceStatus,
  { label: string; tone: string; icon: typeof CheckCircle2 }
> = {
  operational: {
    label: 'Operational',
    tone: 'var(--success)',
    icon: CheckCircle2,
  },
  degraded: {
    label: 'Degraded',
    tone: 'var(--warning)',
    icon: AlertTriangle,
  },
  maintenance: {
    label: 'Maintenance',
    tone: 'var(--accent)',
    icon: Loader2,
  },
};

// Estimated completion — 2h 15m from server render time
const TARGET_OFFSET_MS = 2 * 60 * 60 * 1000 + 15 * 60 * 1000;
const START_ISO = new Date('2025-06-15T08:00:00Z').toISOString();
const TARGET_ISO = new Date(
  new Date(START_ISO).getTime() + TARGET_OFFSET_MS
).toISOString();

const CHANGELOG = [
  {
    time: '08:00 UTC',
    title: 'Maintenance window started',
    description: 'Engineering team began rolling out the v4.2 release.',
  },
  {
    time: '08:14 UTC',
    title: 'Sync service paused',
    description: 'CRM sync queued — no data loss, jobs will resume automatically.',
  },
  {
    time: '08:42 UTC',
    title: 'API upgrade in progress',
    description: 'Rolling deploy across 12 regions, currently at 6/12 complete.',
  },
];

export default function MaintenancePage() {
  return (
    <div className="min-h-screen relative flex flex-col bg-background overflow-hidden">
      {/* Ambient decorative background */}
      <div className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-accent/12 blur-3xl pointer-events-none" />
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 border border-warning/25 text-[11px] font-medium text-warning">
          <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
          Scheduled maintenance
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT — message + animated icon */}
          <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Animated wrench/cog */}
            <div className="relative mx-auto lg:mx-0 w-28 h-28 mb-8">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border border-accent/20" />
              {/* Rotating cog */}
              <svg
                viewBox="0 0 96 96"
                className="absolute inset-0 w-full h-full"
                fill="none"
                aria-hidden="true"
                style={{
                  animation: 'pp-spin-slow 12s linear infinite',
                  transformOrigin: 'center',
                }}
              >
                <path
                  d="M48 28 a20 20 0 1 0 0.001 0 Z"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  opacity="0.6"
                />
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8;
                  return (
                    <rect
                      key={i}
                      x="46"
                      y="6"
                      width="4"
                      height="10"
                      rx="1"
                      fill="var(--accent)"
                      opacity="0.7"
                      transform={`rotate(${angle} 48 48)`}
                    />
                  );
                })}
              </svg>
              {/* Bouncing wrench */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: 'pp-wrench 2.2s ease-in-out infinite',
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-chart-1 flex items-center justify-center shadow-lg shadow-accent/30">
                  <Wrench className="w-6 h-6 text-accent-foreground" strokeWidth={2.4} />
                </div>
              </div>
              <style>{`
                @keyframes pp-spin-slow { to { transform: rotate(360deg); } }
                @keyframes pp-wrench {
                  0%, 100% { transform: translateY(0) rotate(-12deg); }
                  50% { transform: translateY(-6%) rotate(12deg); }
                }
              `}</style>
            </div>

            <p className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-[11px] font-semibold text-accent uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              v4.2 release in progress
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
              We&apos;ll be right back
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Pipeline Pilot is undergoing scheduled maintenance to bring you a faster pipeline
              board, smarter forecasting, and 14 new reporting widgets.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="bg-card border border-border rounded-xl p-3 text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Started</p>
                <p className="text-sm font-semibold mt-1 tabular-nums">08:00 UTC</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-3 text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</p>
                <p className="text-sm font-semibold mt-1">Global</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-3 text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Window</p>
                <p className="text-sm font-semibold mt-1 tabular-nums">~2h 15m</p>
              </div>
            </div>
          </div>

          {/* RIGHT — countdown + subscribe + changelog */}
          <div
            className="animate-in fade-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: '120ms' }}
          >
            <UpdatesForm targetIso={TARGET_ISO} />

            {/* Service status list */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 mt-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold">Affected services</p>
                <span className="text-[11px] text-muted-foreground">live status</span>
              </div>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => {
                  const meta = STATUS_META[s.status];
                  return (
                    <li
                      key={s.name}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/[0.03] transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center border shrink-0"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${meta.tone} 12%, transparent)`,
                          borderColor: `color-mix(in oklch, ${meta.tone} 25%, transparent)`,
                        }}
                      >
                        <s.icon className="w-4 h-4" style={{ color: meta.tone }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {s.description}
                        </p>
                      </div>
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${meta.tone} 12%, transparent)`,
                          color: meta.tone,
                        }}
                      >
                        <meta.icon
                          className={`w-2.5 h-2.5 ${s.status === 'maintenance' ? 'animate-spin' : ''}`}
                        />
                        {meta.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Changelog */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 mt-5">
              <p className="text-sm font-semibold mb-4">Maintenance log</p>
              <ol className="relative border-l border-border ml-2 space-y-4">
                {CHANGELOG.map((c, i) => (
                  <li key={c.time} className="pl-4 relative">
                    <span
                      className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-background"
                      style={{
                        backgroundColor:
                          i === CHANGELOG.length - 1 ? 'var(--accent)' : 'var(--muted-foreground)',
                      }}
                    />
                    <p className="text-[11px] text-muted-foreground font-mono">{c.time}</p>
                    <p className="text-sm font-medium mt-0.5">{c.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {c.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 sm:px-10 py-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo className="w-7 h-7" />
            <span className="text-sm font-medium">Pipeline Pilot</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a
              href="mailto:support@pipelinepilot.io"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              support@pipelinepilot.io
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              Status page
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
