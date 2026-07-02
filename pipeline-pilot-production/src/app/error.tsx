'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  ArrowLeft,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Bug,
} from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const [expanded, setExpanded] = useState(false);
  const [retrying, setRetrying] = useState(false);

  // Surface the error to the browser console for debugging
  useEffect(() => {
    console.error('[Pipeline Pilot] route error:', error);
  }, [error]);

  const handleReset = () => {
    setRetrying(true);
    // small delay so the spinner is visible, then call reset
    setTimeout(() => {
      reset();
      setRetrying(false);
    }, 600);
  };

  const errorDigest = error?.digest ?? 'N/A';
  const errorMessage = error?.message || 'An unknown error occurred.';
  const errorStack = error?.stack || error?.cause?.toString() || 'No stack trace available.';

  return (
    <div className="min-h-screen relative flex flex-col bg-background overflow-hidden">
      {/* Ambient decorative background */}
      <div className="absolute -top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-destructive/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-44 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/25 text-[11px] font-medium text-destructive">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
          Service incident
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 pb-16 -mt-8">
        <div className="w-full max-w-3xl text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Decorative broken chart */}
          <div className="relative mx-auto w-full max-w-md h-44 sm:h-52 mb-8">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="err-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--destructive)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--destructive)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* trendline that rises then plummets */}
              <path
                d="M20 150 L60 130 L100 140 L140 100 L180 110 L220 70 L240 60 L255 140 L255 200 L20 200 Z"
                fill="url(#err-area)"
              />
              <path
                d="M20 150 L60 130 L100 140 L140 100 L180 110 L220 70 L240 60"
                fill="none"
                stroke="var(--chart-1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* sharp drop */}
              <path
                d="M240 60 L255 140"
                fill="none"
                stroke="var(--destructive)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              {/* x marker on the crash point */}
              <g>
                <circle cx="247" cy="100" r="14" fill="var(--destructive)" opacity="0.15" />
                <path
                  d="M241 94 L253 106 M253 94 L241 106"
                  stroke="var(--destructive)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
              {/* ghost target line */}
              <line
                x1="20"
                y1="50"
                x2="380"
                y2="50"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </svg>
          </div>

          {/* 500 display */}
          <div className="relative inline-block mb-4">
            <h1 className="text-[7rem] sm:text-[9rem] font-bold leading-none tracking-tighter bg-gradient-to-br from-foreground via-foreground to-destructive bg-clip-text text-transparent tabular-nums">
              500
            </h1>
            <span className="absolute -top-2 -right-8 sm:-right-12 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/15 border border-destructive/30 text-[10px] font-semibold text-destructive uppercase tracking-wider animate-in fade-in zoom-in duration-500" style={{ animationDelay: '250ms' }}>
              <AlertTriangle className="w-3 h-3" />
              blocked
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Pipeline blocked
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Something went wrong on our side. Our team has been notified and is already on it —
            no deals were harmed in the making of this error.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
              onClick={handleReset}
              disabled={retrying}
            >
              {retrying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Retrying…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Try again
                </>
              )}
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                Back to dashboard
              </Link>
            </Button>
          </div>

          {/* Collapsible error details */}
          <div className="text-left bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '350ms' }}>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 hover:bg-accent/[0.04] transition-colors"
              aria-expanded={expanded}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-md bg-destructive/10 border border-destructive/20 flex items-center justify-center shrink-0">
                  <Bug className="w-3.5 h-3.5 text-destructive" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">Error details</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    Incident ID: <span className="font-mono">{errorDigest}</span>
                  </p>
                </div>
              </div>
              {expanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>

            {expanded && (
              <div className="border-t border-border px-4 sm:px-5 py-4 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Message
                  </p>
                  <pre className="font-mono text-xs text-destructive bg-destructive/[0.06] border border-destructive/15 rounded-lg p-3 whitespace-pre-wrap break-words leading-relaxed">
{errorMessage}
                  </pre>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Stack trace
                  </p>
                  <pre className="font-mono text-[11px] text-muted-foreground bg-muted/40 border border-border rounded-lg p-3 overflow-x-auto max-h-48 leading-relaxed">
{errorStack}
                  </pre>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  If the issue persists, contact{' '}
                  <a
                    href="mailto:support@pipelinepilot.io?subject=Pipeline%20Pilot%20Error%20-%20"
                    className="text-accent hover:underline"
                  >
                    support@pipelinepilot.io
                  </a>{' '}
                  and include the Incident ID above.
                </p>
              </div>
            )}
          </div>

          {/* quick links */}
          <div className="flex items-center justify-center gap-4 mt-8 text-xs text-muted-foreground">
            <Link href="/dashboard" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" /> Dashboard
            </Link>
            <span className="text-border">·</span>
            <Link href="/maintenance" className="hover:text-foreground transition-colors">
              Status page
            </Link>
            <span className="text-border">·</span>
            <Link href="/dashboard/reports" className="hover:text-foreground transition-colors">
              Reports
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 sm:px-10 py-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pipeline Pilot. All rights reserved.</p>
          <p className="font-mono">err/{errorDigest}</p>
        </div>
      </footer>
    </div>
  );
}
