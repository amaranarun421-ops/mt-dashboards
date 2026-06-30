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


export function SwitchDemo({ label, variant }: { label: string; variant: 'ios' | 'gradient' | 'icon' | 'ai' | 'loading' | 'label' }) {
  const [on, setOn] = React.useState(variant === 'ai' || variant === 'label');
  const bgClass = variant === 'gradient' ? 'bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8]' : 'bg-[var(--color-brand-500)]';
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--fi-shadow-xs)] transition hover:shadow-[var(--fi-shadow-sm)]">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[var(--text-strong)]">{label}</span>
        <span className="text-[11px] font-medium text-[var(--text-muted)]">{on ? 'Enabled' : 'Disabled'}</span>
      </div>
      <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className={cn('relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300', on ? bgClass : 'bg-[var(--border-strong)]')}>
        <span className={cn('inline-flex size-5 items-center justify-center rounded-full bg-white shadow-[var(--fi-shadow-sm)] transition-transform duration-300', on ? 'translate-x-5' : 'translate-x-0')}>
          {variant === 'icon' && (on ? <Check className="size-3 text-[var(--color-brand-500)]" strokeWidth={3} /> : <X className="size-3 text-[var(--text-muted)]" strokeWidth={3} />)}
          {variant === 'ai' && <Sparkles className="size-3 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
          {variant === 'loading' && on && <Loader2 className="size-3 animate-spin text-[var(--color-brand-500)]" strokeWidth={2.5} />}
        </span>
      </button>
    </div>
  );
}
