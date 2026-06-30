'use client';

import * as React from 'react';
import {
  Plus, Check, X, Trash2, Download, Lock, Search, Eye, EyeOff,
  Loader2, Sparkles, Zap, ArrowRight, ChevronDown, Upload, Star,
  Mic, Command as CommandIcon, DollarSign, AlertCircle, Heart,
  MessageSquare, Copy,
  Cloud, Image as ImageIcon, ThumbsUp, Volume2,
  Bold, Italic, Underline, List, Link2, Code, Heading, Quote, Strikethrough,
  Play, FileText, File, CheckCircle2,
  TrendingUp, Eye as EyeIcon, Type,
} from 'lucide-react';
import { cn } from '@/lib/utils';


export function AnimatedButton() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)} className="fi-btn fi-btn-primary">
      <span key={count} className="fi-bounce-in inline-flex items-center gap-2">
        <Zap className="size-4" strokeWidth={2.5} /> Clicked {count}×
      </span>
    </button>
  );
}

export function FabPreview() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const actions = [
    { icon: FileText, label: 'New Document' },
    { icon: ImageIcon, label: 'New Image' },
    { icon: Sparkles, label: 'AI Generate' },
  ];
  return (
    <div ref={ref} className="absolute bottom-5 right-5 flex flex-col items-end gap-2">
      {open && actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <button key={a.label} onClick={() => setOpen(false)} className="fi-slide-up inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--text-strong)] shadow-[var(--fi-shadow-md)] transition hover:bg-[var(--surface-sunken)]" style={{ animationDelay: `${i * 40}ms` }}>
            <Icon className="size-3.5" strokeWidth={2.5} />{a.label}
          </button>
        );
      })}
      <button onClick={() => setOpen(!open)} className="fi-btn fi-btn-primary fi-pulse-glow size-12 rounded-2xl p-0 shadow-[var(--fi-shadow-xl)] transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }} aria-label="Toggle FAB">
        <Plus className="size-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function AddToCartButton() {
  const [added, setAdded] = React.useState(false);
  return (
    <button
      onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
      className={cn('fi-btn transition-all duration-300', added ? 'bg-[var(--color-success-500)] text-white shadow-[var(--fi-shadow-md)]' : 'fi-btn-primary')}
    >
      {added ? (
        <><Check className="size-4 fi-bounce-in" strokeWidth={2.5} /><span className="fi-slide-up">Added!</span></>
      ) : (
        <><Plus className="size-4" strokeWidth={2.5} /> Add to Cart</>
      )}
    </button>
  );
}

export function SocialButton({ provider }: { provider: 'google' | 'github' | 'apple' | 'x' }) {
  const icons: Record<string, React.ReactNode> = {
    google: <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" /></svg>,
    github: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
    apple: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>,
    x: <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  };
  const labels: Record<string, string> = { google: 'Google', github: 'GitHub', apple: 'Apple', x: 'X' };
  return (
    <button className="fi-btn fi-btn-secondary px-4">
      {icons[provider]} <span className="font-semibold">{labels[provider]}</span>
    </button>
  );
}
