'use client';
import * as React from 'react';
import {
  DollarSign, Users, Package, Sparkles, TrendingUp, TrendingDown,
  ExternalLink, ArrowUpRight, Clock, Activity, Zap, Eye,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Interactive) ====================== */
function IuStyles() {
  return (
    <style jsx global>{`
      .iu-root {
        --iu-radius-sm: 8px;
        --iu-radius-md: 12px;
        --iu-radius-lg: 16px;
        --iu-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --iu-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --iu-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --iu-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --iu-shadow-glow: 0 0 0 1px rgba(70,95,255,0.12), 0 8px 24px -8px rgba(70,95,255,0.35);
      }
      .iu-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .iu-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .iu-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      .iu-card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .iu-card-hover:hover {
        transform: translateY(-3px);
        box-shadow: var(--iu-shadow-lg);
      }
      @keyframes iu-text-rotate {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .iu-text-rotate { animation: iu-text-rotate 0.4s ease-out; }
      @keyframes iu-gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .iu-gradient-text {
        background-size: 200% 200%;
        animation: iu-gradient 3s ease infinite;
      }
      @keyframes iu-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .iu-shimmer {
        background: linear-gradient(90deg, var(--text-muted) 0%, var(--text-strong) 50%, var(--text-muted) 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: iu-shimmer 2s linear infinite;
      }
    `}</style>
  );
}

export function InteractiveUtilitiesPage() {
  return (
    <div className="iu-root iu-bg space-y-6">
      <IuStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Interactive Utilities' }]} title="Interactive Utilities" description="KPI widgets, link preview components" />

      {/* ============================================ KPI WIDGETS ============================================ */}
      <SectionCard title="KPI Widgets" description="4 variants — Revenue, Analytics, Realtime, AI">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiWidget label="Revenue" value="$48.2K" trend="+12.4%" icon={DollarSign} color="var(--color-success-500)" bg="var(--color-success-50)" />
          <KpiWidget label="Active Users" value="12,840" trend="+8.2%" icon={Users} color="var(--color-brand-500)" bg="var(--color-brand-50)" />
          <KpiWidget label="Orders" value="1,284" trend="-3.1%" trendDown icon={Package} color="var(--color-warning-500)" bg="var(--color-warning-50)" />
          <KpiWidget label="AI Calls" value="84.2K" trend="+24.8%" icon={Sparkles} color="#7a5af8" bg="rgba(122,90,248,0.1)" />
        </div>
      </SectionCard>

      {/* ============================================ LINK PREVIEW ============================================ */}
      <SectionCard title="Link Preview" description="3 variants — URL Preview, Rich Link Card, Media Link">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* URL preview */}
          <div className="iu-card-hover overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--iu-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=200&fit=crop" alt="" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]"><span className="size-3 rounded-full bg-[var(--color-brand-500)]" /> mtverse.io</div>
              <p className="mt-1.5 text-sm font-medium text-[var(--text-strong)]">Premium SaaS UI Library</p>
              <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Build faster with 49+ pages and 10 dashboards.</p>
            </div>
          </div>
          {/* Rich link card */}
          <div className="iu-card-hover overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--iu-shadow-xs)]">
            <div className="flex">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop" alt="" className="h-auto w-28 shrink-0 object-cover" />
              <div className="flex-1 p-3">
                <p className="text-[10px] font-bold text-[var(--text-muted)]">mtverse.io/blog</p>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-strong)]">10 Design Trends for 2025</p>
                <p className="mt-1 text-[11px] font-medium text-[var(--text-muted)]">Explore the latest UI patterns.</p>
              </div>
            </div>
          </div>
          {/* Media link */}
          <div className="iu-card-hover relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--iu-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop" alt="" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-brand-600)] shadow-lg backdrop-blur"><Eye className="size-5" strokeWidth={2.5} /></span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-[var(--text-strong)]">Watch Demo</p>
              <p className="text-[11px] font-medium text-[var(--text-muted)]">2:45 · 12K views</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ ANIMATED COUNTER ============================================ */}
      <SectionCard title="Animated Counter" description="Count-up on mount with easing">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <AnimatedCounter target={12480} label="Active Users" prefix="" suffix="" />
          <AnimatedCounter target={48240} label="Total Revenue" prefix="$" suffix="" />
          <AnimatedCounter target={98} label="Satisfaction" prefix="" suffix="%" />
        </div>
      </SectionCard>

      {/* ============================================ TEXT ANIMATIONS ============================================ */}
      <SectionCard title="Text Animations" description="4 variants — Rotating, Typing, Gradient, Shimmer">
        <div className="space-y-6 max-w-2xl">
          {/* Rotating text */}
          <div>
            <p className="iu-label mb-2">Rotating Text</p>
            <p className="text-xl font-medium text-[var(--text-strong)]">Design that is <RotatingText /></p>
          </div>
          <div className="iu-divider" />
          {/* Gradient text */}
          <div>
            <p className="iu-label mb-2">Gradient Text</p>
            <p className="iu-gradient-text bg-gradient-to-r from-[var(--color-brand-500)] via-[#7a5af8] to-[var(--color-brand-400)] bg-clip-text text-2xl font-semibold text-transparent">Premium SaaS UI Library</p>
          </div>
          <div className="iu-divider" />
          {/* Shimmer text */}
          <div>
            <p className="iu-label mb-2">Shimmer Text</p>
            <p className="iu-shimmer text-2xl font-semibold">Loading premium content...</p>
          </div>
          <div className="iu-divider" />
          {/* Typing text */}
          <div>
            <p className="iu-label mb-2">Typing Text</p>
            <TypingText />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function KpiWidget({ label, value, trend, trendDown, icon: Icon, color, bg }: { label: string; value: string; trend: string; trendDown?: boolean; icon: any; color: string; bg: string }) {
  return (
    <div className="iu-card-hover rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--iu-shadow-xs)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: bg, color }}><Icon className="size-5" strokeWidth={2.5} /></span>
        <span className={cn('inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold', trendDown ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]')}>
          {trendDown ? <TrendingDown className="size-2.5" strokeWidth={2.5} /> : <TrendingUp className="size-2.5" strokeWidth={2.5} />}{trend}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{value}</p>
      <p className="text-xs font-medium text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

function AnimatedCounter({ target, label, prefix, suffix }: { target: number; label: string; prefix: string; suffix: string }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const d = 2000; const s = Date.now();
    const i = setInterval(() => {
      const e = Date.now() - s; const p = Math.min(e / d, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) clearInterval(i);
    }, 16);
    return () => clearInterval(i);
  }, [target]);
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--iu-shadow-xs)]">
      <p className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{prefix}{val.toLocaleString()}{suffix}</p>
      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

function RotatingText() {
  const words = ['beautiful', 'modern', 'premium', 'fast'];
  const [wi, setWi] = React.useState(0);
  React.useEffect(() => { const i = setInterval(() => setWi(w => (w + 1) % words.length), 2000); return () => clearInterval(i); }, []);
  return <span key={wi} className="iu-text-rotate inline-block text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{words[wi]}</span>;
}

function TypingText() {
  const fullText = 'Build premium UIs at lightning speed.';
  const [text, setText] = React.useState('');
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (idx < fullText.length) {
      const t = setTimeout(() => { setText(fullText.slice(0, idx + 1)); setIdx(idx + 1); }, 50);
      return () => clearTimeout(t);
    } else {
      const r = setTimeout(() => { setText(''); setIdx(0); }, 2000);
      return () => clearTimeout(r);
    }
  }, [idx]);
  return <p className="text-xl font-medium text-[var(--text-strong)]">{text}<span className="inline-block w-0.5 h-5 bg-[var(--color-brand-500)] ml-0.5 align-middle animate-pulse" /></p>;
}
