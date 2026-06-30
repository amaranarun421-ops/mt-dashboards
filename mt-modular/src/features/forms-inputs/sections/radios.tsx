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


export function RadioGroupDemo() {
  const [val, setVal] = React.useState('monthly');
  return (
    <div>
      <p className="fi-label mb-3.5">Default Radio Group</p>
      <div className="flex flex-wrap gap-5">
        {['daily', 'weekly', 'monthly', 'yearly'].map(opt => (
          <label key={opt} className="flex cursor-pointer items-center gap-2">
            <button type="button" onClick={() => setVal(opt)} className={cn('inline-flex size-5 items-center justify-center rounded-full border-2 transition-all', val === opt ? 'border-[var(--color-brand-500)]' : 'border-[var(--border-strong)] hover:border-[var(--color-brand-400)]')}>
              {val === opt && <span className="size-2.5 rounded-full bg-[var(--color-brand-500)] fi-bounce-in" />}
            </button>
            <span className="text-sm font-medium capitalize text-[var(--text-body)]">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function RadioPill({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <button type="button" onClick={() => setChecked(true)} className={cn('inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-sm)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)] hover:bg-[var(--surface-sunken)]')}>
      {checked && <Check className="size-3.5" strokeWidth={3} />}{label}
    </button>
  );
}

export function SegmentedRadioDemo() {
  const [val, setVal] = React.useState('monthly');
  const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  return (
    <div className="inline-flex w-full max-w-md items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setVal(opt.value)}
          className={cn('flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all', val === opt.value ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--fi-shadow-sm)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function RadioCard({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <button type="button" onClick={() => setChecked(true)} className={cn('fi-card-hover flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left transition', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] hover:border-[var(--color-brand-300)]')}>
      <span className={cn('inline-flex size-5 items-center justify-center rounded-full border-2 transition', checked ? 'border-[var(--color-brand-500)]' : 'border-[var(--border-strong)]')}>{checked && <span className="size-2.5 rounded-full bg-[var(--color-brand-500)] fi-bounce-in" />}</span>
      <div><p className="text-sm font-semibold text-[var(--text-strong)]">{label}</p><p className="text-xs text-[var(--text-muted)]">{desc}</p></div>
    </button>
  );
}

export function ImageRadio({ url, label, defaultChecked }: { url: string; label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <button type="button" onClick={() => setChecked(true)} className={cn('group relative overflow-hidden rounded-xl border-2 shadow-[var(--fi-shadow-sm)] transition', checked ? 'border-[var(--color-brand-500)] ring-4 ring-[rgba(70,95,255,0.12)]' : 'border-[var(--border)] hover:border-[var(--color-brand-300)] hover:shadow-[var(--fi-shadow-md)]')} aria-pressed={checked}>
      <img src={url} alt={label} className="h-24 w-40 object-cover transition group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-2.5">
        {checked && <span className="inline-flex size-6 items-center justify-center self-end rounded-full bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-md)] fi-bounce-in"><Check className="size-3.5" strokeWidth={3} /></span>}
        <span className="text-xs font-semibold text-white drop-shadow-lg">{label}</span>
      </div>
    </button>
  );
}
