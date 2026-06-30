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


export function CheckboxDemo({ label, defaultChecked, disabled }: { label: string; defaultChecked?: boolean; disabled?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <label className={cn('flex cursor-pointer items-center gap-2.5', disabled && 'cursor-not-allowed opacity-50')}>
      <button type="button" role="checkbox" aria-checked={checked} disabled={disabled} onClick={() => !disabled && setChecked(!checked)} className={cn('inline-flex size-5 items-center justify-center rounded-md border-2 transition-all', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-sm)]' : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]')}>
        {checked && <Check className="size-3 fi-check-bounce" strokeWidth={3} />}
      </button>
      <span className="text-sm font-medium text-[var(--text-body)]">{label}</span>
    </label>
  );
}

export function CheckboxCard({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <button type="button" onClick={() => setChecked(!checked)} className={cn('fi-card-hover flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] hover:border-[var(--color-brand-300)]')}>
      <span className={cn('inline-flex size-5 items-center justify-center rounded-md border-2 transition-all', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border-strong)]')}>{checked && <Check className="size-3 fi-check-bounce" strokeWidth={3} />}</span>
      <span className="text-sm font-semibold text-[var(--text-strong)]">{label}</span>
    </button>
  );
}

export function AnimatedCheckbox({ label }: { label: string }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <button type="button" onClick={() => setChecked(!checked)} className={cn('inline-flex size-5 items-center justify-center rounded-md border-2 transition-all', checked ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-sm)]' : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]')}>
        {checked && <Check className="size-3 fi-check-bounce" strokeWidth={3} />}
      </button>
      <span className="text-sm font-medium text-[var(--text-body)]">{label}</span>
    </label>
  );
}

export function GradientCheckbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(!!defaultChecked);
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <button type="button" onClick={() => setChecked(!checked)} className={cn('inline-flex size-5 items-center justify-center rounded-md border-2 transition-all', checked ? 'border-transparent bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--fi-shadow-sm)]' : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]')}>
        {checked && <Check className="size-3 fi-check-bounce" strokeWidth={3} />}
      </button>
      <span className="text-sm font-medium text-[var(--text-body)]">{label}</span>
    </label>
  );
}

export function IndeterminateCheckboxDemo() {
  const items = ['Option A', 'Option B', 'Option C'];
  const [checked, setChecked] = React.useState<boolean[]>([true, false, false]);
  const allChecked = checked.every(Boolean);
  const noneChecked = checked.every(v => !v);
  const indeterminate = !allChecked && !noneChecked;
  function toggleAll() { setChecked(checked.map(() => !allChecked)); }
  function toggleOne(i: number) { setChecked(prev => prev.map((v, idx) => idx === i ? !v : v)); }
  return (
    <div className="max-w-xs space-y-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--fi-shadow-xs)]">
      <label className="flex cursor-pointer items-center gap-2.5 border-b border-[var(--border-subtle)] pb-2.5">
        <button type="button" onClick={toggleAll} className={cn('inline-flex size-5 items-center justify-center rounded-md border-2 transition-all', allChecked || indeterminate ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]')}>
          {allChecked ? <Check className="size-3 fi-check-bounce" strokeWidth={3} /> : indeterminate ? <span className="h-0.5 w-2.5 rounded-full bg-white" /> : null}
        </button>
        <span className="text-sm font-semibold text-[var(--text-strong)]">Select All</span>
      </label>
      <div className="space-y-2 pl-1">
        {items.map((item, i) => (
          <label key={item} className="flex cursor-pointer items-center gap-2.5">
            <button type="button" onClick={() => toggleOne(i)} className={cn('inline-flex size-4 items-center justify-center rounded border-2 transition-all', checked[i] ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]')}>{checked[i] && <Check className="size-2.5 fi-check-bounce" strokeWidth={3} />}</button>
            <span className="text-sm font-medium text-[var(--text-body)]">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
