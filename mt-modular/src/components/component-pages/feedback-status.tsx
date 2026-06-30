'use client';
import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2, XCircle, AlertTriangle, Info, X, Bell, Sparkles, Search, Zap,
  Loader2, Package, Wifi, Lock, Wrench, Clock, TrendingUp, FileText,
  ArrowRight, RefreshCw, Home, Inbox, FolderOpen,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, ProgressBar } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Feedback & Status) ====================== */
function FsStyles() {
  return (
    <style jsx global>{`
      .fs-root {
        --fs-radius-sm: 8px;
        --fs-radius-md: 12px;
        --fs-radius-lg: 16px;
        --fs-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --fs-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --fs-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --fs-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --fs-shadow-glow: 0 0 0 1px rgba(70,95,255,0.12), 0 8px 24px -8px rgba(70,95,255,0.35);
      }
      .fs-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .fs-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .fs-variant-title {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--text-strong);
        letter-spacing: -0.01em;
      }
      .fs-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--fs-radius-md);
        font-size: 0.8125rem;
        font-weight: 600;
        transition: background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        cursor: pointer;
        white-space: nowrap;
      }
      .fs-btn:active { transform: scale(0.97); }
      .fs-btn-primary {
        background: linear-gradient(180deg, var(--color-brand-500), var(--color-brand-600));
        color: white;
        box-shadow: var(--fs-shadow-sm), inset 0 1px 0 rgba(255,255,255,0.18);
      }
      .fs-btn-primary:hover {
        background: linear-gradient(180deg, var(--color-brand-600), var(--color-brand-700));
        box-shadow: var(--fs-shadow-md), inset 0 1px 0 rgba(255,255,255,0.22);
        transform: translateY(-1px);
      }
      .fs-btn-secondary {
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--fs-shadow-xs);
      }
      .fs-btn-secondary:hover {
        background: var(--surface-sunken);
        border-color: var(--border-strong);
      }
      @keyframes fs-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .fs-skeleton {
        background: linear-gradient(90deg, var(--surface-sunken) 25%, var(--border) 50%, var(--surface-sunken) 75%);
        background-size: 200% 100%;
        animation: fs-shimmer 1.5s ease-in-out infinite;
      }
      @keyframes fs-fade-up {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fs-fade-up { animation: fs-fade-up 0.3s ease-out; }
      @keyframes fs-slide-in {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
      }
      .fs-slide-in { animation: fs-slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      @keyframes fs-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .fs-pulse { animation: fs-pulse 1.5s ease-in-out infinite; }
      .fs-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
    `}</style>
  );
}

export function FeedbackStatusPage() {
  const [toasts, setToasts] = React.useState<{ id: number; type: string; title: string; desc: string }[]>([]);
  function addToast(type: string, title: string, desc: string) {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, type, title, desc }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4500);
  }
  return (
    <div className="fs-root fs-bg space-y-6">
      <FsStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Feedback & Status' }]} title="Feedback & Status" description="Alerts, toasts, notifications, progress bars, skeletons, empty/error states — all variants." />

      {/* ============================================ ALERTS ============================================ */}
      <SectionCard title="Alerts" description="8 variants — Success, Error, Warning, Info, Gradient, Glass, AI, Action">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Success */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Payment received</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Your invoice INV-2024 has been paid successfully.</p>
            </div>
            <button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><X className="size-4" strokeWidth={2.5} /></button>
          </div>
          {/* Error */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-error-200)] bg-[var(--color-error-50)] p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
            <XCircle className="mt-0.5 size-5 shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Payment failed</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Your card was declined. Please update your payment method.</p>
            </div>
          </div>
          {/* Warning */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.06)]">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Storage 92% full</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Consider upgrading your plan or deleting old files.</p>
            </div>
          </div>
          {/* Info */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-info-200)] bg-[var(--color-info-50)] p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(11,165,236,0.18)] dark:bg-[rgba(11,165,236,0.06)]">
            <Info className="mt-0.5 size-5 shrink-0 text-[var(--color-info-600)] dark:text-[var(--color-info-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Scheduled maintenance</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">The platform will be unavailable on Sunday 2-4 AM UTC.</p>
            </div>
          </div>
          {/* Gradient */}
          <div className="flex items-start gap-3 rounded-xl border-0 bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] p-4 text-white shadow-[var(--fs-shadow-md)]">
            <Sparkles className="mt-0.5 size-5 shrink-0" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium">Premium Feature</p>
              <p className="mt-0.5 text-xs font-medium text-white/80">Upgrade to Pro to unlock advanced analytics and AI insights.</p>
            </div>
            <button className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/30">Upgrade</button>
          </div>
          {/* Glass */}
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl" style={{ backgroundImage: 'linear-gradient(135deg, rgba(70,95,255,0.08), rgba(122,90,248,0.06))' }}>
            <Bell className="mt-0.5 size-5 shrink-0 text-[var(--color-brand-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Glass Notification</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Frosted glass effect with backdrop blur for overlay UIs.</p>
            </div>
          </div>
          {/* AI */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-brand-200)] bg-gradient-to-r from-[var(--color-brand-50)] to-[#7a5af8]/10 p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(122,90,248,0.08)]">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-[var(--color-brand-500)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">AI Insight</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">Your revenue is trending 23% higher this week. Consider scaling your infrastructure.</p>
            </div>
          </div>
          {/* Action */}
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] p-4 shadow-[var(--fs-shadow-xs)] dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-success-600)]" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Deployment complete</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">v2.4.1 is now live. View the changelog.</p>
            </div>
            <button className="fs-btn fs-btn-secondary h-7 px-3 text-xs">View</button>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ TOASTS ============================================ */}
      <SectionCard title="Toasts" description="7 variants — Minimal, Glass, Progress, Action, Stack, Realtime, AI Notification — click to trigger">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addToast('success', 'Saved!', 'Your changes have been saved.')} className="fs-btn fs-btn-primary h-9 px-4 text-xs">Success Toast</button>
          <button onClick={() => addToast('error', 'Error', 'Something went wrong.')} className="fs-btn fs-btn-secondary h-9 px-4 text-xs">Error Toast</button>
          <button onClick={() => addToast('warning', 'Warning', 'Storage almost full.')} className="fs-btn fs-btn-secondary h-9 px-4 text-xs">Warning Toast</button>
          <button onClick={() => addToast('info', 'Info', 'New feature available.')} className="fs-btn fs-btn-secondary h-9 px-4 text-xs">Info Toast</button>
          <button onClick={() => addToast('ai', 'AI Complete', 'Your image was generated.')} className="fs-btn h-9 px-4 text-xs bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--fs-shadow-sm)]"><Sparkles className="size-3.5" strokeWidth={2.5} /> AI Toast</button>
        </div>
        <p className="mt-3 text-xs font-medium text-[var(--text-muted)]">Click any button to trigger a toast notification. Toasts auto-dismiss after 4.5 seconds.</p>
        {toasts.length > 0 && typeof document !== 'undefined' && createPortal(
          <div className="fixed bottom-6 right-6 z-[2000] flex flex-col gap-2">
            {toasts.map(t => (
              <div key={t.id} className={cn('fs-slide-in flex items-start gap-3 rounded-xl border bg-[var(--card)] p-4 shadow-[var(--fs-shadow-lg)] max-w-sm', t.type === 'success' ? 'border-[var(--color-success-200)]' : t.type === 'error' ? 'border-[var(--color-error-200)]' : t.type === 'warning' ? 'border-[var(--color-warning-200)]' : t.type === 'info' ? 'border-[var(--color-info-200)]' : 'border-[var(--color-brand-200)]')}>
                <span className={cn('mt-0.5 size-5 shrink-0', t.type === 'success' ? 'text-[var(--color-success-500)]' : t.type === 'error' ? 'text-[var(--color-error-500)]' : t.type === 'warning' ? 'text-[var(--color-warning-500)]' : t.type === 'info' ? 'text-[var(--color-info-500)]' : 'text-[var(--color-brand-500)]')}>
                  {t.type === 'success' ? <CheckCircle2 className="size-5" strokeWidth={2.5} /> : t.type === 'error' ? <XCircle className="size-5" strokeWidth={2.5} /> : t.type === 'warning' ? <AlertTriangle className="size-5" strokeWidth={2.5} /> : t.type === 'info' ? <Info className="size-5" strokeWidth={2.5} /> : <Sparkles className="size-5" strokeWidth={2.5} />}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-strong)]">{t.title}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{t.desc}</p>
                </div>
                <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><X className="size-4" strokeWidth={2.5} /></button>
              </div>
            ))}
          </div>, document.body)}
      </SectionCard>

      {/* ============================================ PROGRESS BARS ============================================ */}
      <SectionCard title="Progress Bars" description="5 variants — Minimal, Gradient, Animated, Multi-segment, KPI">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <p className="fs-label mb-3">Minimal</p>
            <div className="mb-1.5 flex justify-between text-xs font-medium"><span className="text-[var(--text-body)]">Upload progress</span><span className="text-[var(--text-muted)]">72%</span></div>
            <ProgressBar value={72} tone="brand" size="sm" />
          </div>
          <div>
            <p className="fs-label mb-3">Gradient</p>
            <div className="mb-1.5 flex justify-between text-xs font-medium"><span className="text-[var(--text-body)]">Gradient progress</span><span className="text-[var(--text-muted)]">85%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8]" style={{ width: '85%' }} /></div>
          </div>
          <div>
            <p className="fs-label mb-3">Animated</p>
            <div className="mb-1.5 flex justify-between text-xs font-medium"><span className="text-[var(--text-body)]">Animated progress</span><span className="text-[var(--text-muted)] fs-pulse">Loading...</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-[var(--color-brand-500)] fs-pulse" style={{ width: '60%' }} /></div>
          </div>
          <div>
            <p className="fs-label mb-3">Multi-segment</p>
            <div className="mb-1.5 flex justify-between text-xs font-medium"><span className="text-[var(--text-body)]">Project phases</span><span className="text-[var(--text-muted)]">3 / 4 done</span></div>
            <div className="flex h-2 gap-0.5 overflow-hidden rounded-full">
              <div className="h-full bg-[var(--color-success-500)]" style={{ width: '30%' }} />
              <div className="h-full bg-[var(--color-brand-500)]" style={{ width: '25%' }} />
              <div className="h-full bg-[var(--color-info-500)]" style={{ width: '20%' }} />
              <div className="h-full bg-[var(--surface-sunken)]" style={{ width: '25%' }} />
            </div>
            <div className="mt-2 flex gap-3 text-[10px] font-bold">
              <span className="text-[var(--color-success-600)]">Design</span>
              <span className="text-[var(--color-brand-600)]">Build</span>
              <span className="text-[var(--color-info-600)]">Test</span>
              <span className="text-[var(--text-muted)]">Deploy</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="fs-label mb-3">KPI Progress</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Revenue', val: 84, target: '$84K / $100K', tone: 'var(--color-success-500)' },
                { label: 'Users', val: 62, target: '6.2K / 10K', tone: 'var(--color-brand-500)' },
                { label: 'Tasks', val: 45, target: '9 / 20', tone: 'var(--color-warning-500)' },
              ].map(kpi => (
                <div key={kpi.label} className="min-w-48 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--fs-shadow-xs)]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-body)]">{kpi.label}</span>
                    <span className="text-xs font-medium text-[var(--text-muted)]">{kpi.target}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full" style={{ width: `${kpi.val}%`, backgroundColor: kpi.tone }} /></div>
                  <p className="mt-1.5 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{kpi.val}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ CIRCULAR PROGRESS ============================================ */}
      <SectionCard title="Circular Progress" description="4 variants — Radial, KPI Circle, Animated, Gradient">
        <div className="flex flex-wrap gap-8">
          {[{ val: 72, label: 'CPU', color: 'var(--color-brand-500)' }, { val: 45, label: 'RAM', color: 'var(--color-success-500)' }, { val: 88, label: 'Disk', color: 'var(--color-warning-500)' }, { val: 30, label: 'Network', color: 'var(--color-info-500)' }].map(c => <CircularProgress key={c.label} value={c.val} label={c.label} color={c.color} />)}
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-24">
              <svg className="size-full -rotate-90" viewBox="0 0 80 80">
                <defs><linearGradient id="fs-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="var(--color-brand-500)" /><stop offset="100%" stopColor="#7a5af8" /></linearGradient></defs>
                <circle cx="40" cy="40" r="36" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="url(#fs-grad)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - 0.65)} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-medium tabular-nums text-[var(--text-strong)]">65%</span></div>
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)]">Gradient</span>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ SKELETONS ============================================ */}
      <SectionCard title="Skeleton Loaders" description="5 variants — Card, Table, Dashboard, Profile, Chart">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-3">
            <p className="fs-label mb-2">Card</p>
            <div className="flex items-start justify-between">
              <div className="fs-skeleton h-12 w-12 rounded-2xl" />
              <div className="fs-skeleton h-6 w-16 rounded-full" />
            </div>
            <div className="fs-skeleton h-4 w-3/4 rounded" />
            <div className="fs-skeleton h-3 w-full rounded" />
            <div className="fs-skeleton h-9 w-full rounded-xl" />
          </div>
          {/* Table skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-2.5">
            <p className="fs-label mb-2">Table</p>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="fs-skeleton size-8 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <div className="fs-skeleton h-3 w-2/3 rounded" />
                  <div className="fs-skeleton h-2 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* Dashboard skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-3">
            <p className="fs-label mb-2">Dashboard</p>
            <div className="fs-skeleton h-4 w-24 rounded" />
            <div className="fs-skeleton h-32 w-full rounded-xl" />
          </div>
          {/* Profile skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-3">
            <p className="fs-label mb-2">Profile</p>
            <div className="flex items-center gap-3">
              <div className="fs-skeleton size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="fs-skeleton h-4 w-24 rounded" />
                <div className="fs-skeleton h-3 w-32 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="fs-skeleton h-12 rounded-lg" />
              <div className="fs-skeleton h-12 rounded-lg" />
              <div className="fs-skeleton h-12 rounded-lg" />
            </div>
          </div>
          {/* Chart skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-3">
            <p className="fs-label mb-2">Chart</p>
            <div className="flex items-end gap-1.5 h-32">
              {[40, 65, 50, 80, 60, 90, 70, 55, 75].map((h, i) => (
                <div key={i} className="fs-skeleton flex-1 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="fs-skeleton h-2 w-6 rounded" />
              ))}
            </div>
          </div>
          {/* Notification skeleton */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--fs-shadow-xs)] space-y-3">
            <p className="fs-label mb-2">Activity</p>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="fs-skeleton size-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <div className="fs-skeleton h-3 w-full rounded" />
                  <div className="fs-skeleton h-2 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ============================================ EMPTY STATES ============================================ */}
      <SectionCard title="Empty States" description="4 variants — Search, AI, Dashboard, Workspace">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Search */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] p-8 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--text-subtle)] shadow-[var(--fs-shadow-xs)]"><Search className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">No results found</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Try a different search query or adjust filters</p>
            <button className="fs-btn fs-btn-secondary mt-4 h-8 px-4 text-xs">Clear filters</button>
          </div>
          {/* AI */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-brand-300)] bg-gradient-to-br from-[var(--color-brand-50)] to-[#7a5af8]/5 p-8 text-center dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.08)]">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--fs-shadow-md)]"><Sparkles className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">Ask AI to generate</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">No data yet — let AI create it for you</p>
            <button className="fs-btn fs-btn-primary mt-4 h-8 px-4 text-xs"><Sparkles className="size-3.5" strokeWidth={2.5} /> Generate with AI</button>
          </div>
          {/* Dashboard */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] p-8 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--text-subtle)] shadow-[var(--fs-shadow-xs)]"><TrendingUp className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">No data to display</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Connect a data source to see your dashboard</p>
            <button className="fs-btn fs-btn-primary mt-4 h-8 px-4 text-xs">Connect source</button>
          </div>
          {/* Workspace */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] p-8 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--text-subtle)] shadow-[var(--fs-shadow-xs)]"><FolderOpen className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">No projects yet</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Create your first project to get started</p>
            <button className="fs-btn fs-btn-primary mt-4 h-8 px-4 text-xs">New project</button>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ ERROR STATES ============================================ */}
      <SectionCard title="Error States" description="4 variants — 404, Permission, Network, Maintenance">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 404 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-error-200)] bg-[var(--color-error-50)]/50 p-8 text-center dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.04)]">
            <p className="text-5xl font-semibold tabular-nums text-[var(--color-error-500)]">404</p>
            <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">Page not found</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">The page you're looking for doesn't exist.</p>
            <button className="fs-btn fs-btn-secondary mt-4 h-8 px-4 text-xs"><Home className="size-3.5" strokeWidth={2.5} /> Go home</button>
          </div>
          {/* Permission */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-warning-200)] bg-[var(--color-warning-50)]/50 p-8 text-center dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.04)]">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-warning-500)] shadow-[var(--fs-shadow-xs)]"><Lock className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">Access denied</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">You don't have permission to view this resource.</p>
            <button className="fs-btn fs-btn-secondary mt-4 h-8 px-4 text-xs">Request access</button>
          </div>
          {/* Network */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-warning-200)] bg-[var(--color-warning-50)]/50 p-8 text-center dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.04)]">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-warning-500)] shadow-[var(--fs-shadow-xs)]"><Wifi className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">Network error</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Check your connection and try again.</p>
            <button className="fs-btn fs-btn-secondary mt-4 h-8 px-4 text-xs"><RefreshCw className="size-3.5" strokeWidth={2.5} /> Retry</button>
          </div>
          {/* Maintenance */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-info-200)] bg-[var(--color-info-50)]/50 p-8 text-center dark:border-[rgba(11,165,236,0.18)] dark:bg-[rgba(11,165,236,0.04)]">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-info-500)] shadow-[var(--fs-shadow-xs)]"><Wrench className="size-6" strokeWidth={2.5} /></div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">Under maintenance</p>
            <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">We'll be back online shortly. Thank you for your patience.</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[var(--color-info-600)] dark:text-[var(--color-info-500)]"><Clock className="size-3.5 fs-pulse" strokeWidth={2.5} /> Estimated: 15 minutes</div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function CircularProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-24">
        <svg className="size-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-medium tabular-nums text-[var(--text-strong)]">{value}%</span></div>
      </div>
      <span className="text-xs font-medium text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
