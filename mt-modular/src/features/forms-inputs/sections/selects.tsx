'use client';

import * as React from 'react';
import {
  Plus, Check, X, Trash2, Download, Lock, Search, Eye, EyeOff,
  Loader2, Sparkles, Zap, ArrowRight, ChevronDown, Upload, Star,
  Mic, Command as CommandIcon, DollarSign, AlertCircle, Heart,
  MessageSquare, Copy, Bell, Settings, User,
  Cloud, Image as ImageIcon, ThumbsUp, Volume2,
  Bold, Italic, Underline, List, Link2, Code, Heading, Quote, Strikethrough,
  Play, FileText, File, CheckCircle2,
  TrendingUp, Eye as EyeIcon, Type,
} from 'lucide-react';
import { cn } from '@/lib/utils';


import { useToast } from '@/hooks/use-toast';

export function SearchableSelectDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('React');
  const [search, setSearch] = React.useState('');
  const options = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik'];
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="fi-input flex cursor-pointer items-center justify-between">{value}<ChevronDown className={cn('size-4 text-[var(--text-muted)] transition', open && 'rotate-180')} strokeWidth={2.5} /></button>
      {open && (
        <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--fi-shadow-lg)] fi-slide-up">
          <div className="border-b border-[var(--border-subtle)] p-2"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.25} /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm font-medium outline-none focus:border-[var(--color-brand-500)]" autoFocus /></div></div>
          <ul className="max-h-40 overflow-y-auto modern-scrollbar p-1">
            {filtered.map(o => <li key={o}><button onClick={() => { setValue(o); setOpen(false); }} className={cn('flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition', value === o ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>{o}{value === o && <Check className="size-3.5" strokeWidth={3} />}</button></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function MultiSelectDemo() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['React', 'TypeScript']));
  const options = ['React', 'Vue', 'Svelte', 'TypeScript', 'Python', 'Go', 'Rust'];
  function toggle(opt: string) { setSelected(prev => { const n = new Set(prev); if (n.has(opt)) n.delete(opt); else n.add(opt); return n; }); }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => <button key={o} onClick={() => toggle(o)} className={cn('inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all', selected.has(o) ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-sm)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)] hover:bg-[var(--surface-sunken)]')}>{selected.has(o) && <Check className="size-3" strokeWidth={3} />}{o}</button>)}
    </div>
  );
}

export function ComboboxDemo() {
  const [val, setVal] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const filtered = options.filter(o => o.toLowerCase().includes(val.toLowerCase()));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <input type="text" value={val} onChange={e => { setVal(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder="Type to filter..." className="fi-input pr-12" />
        <ChevronDown className={cn('pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)] transition', open && 'rotate-180')} strokeWidth={2.25} />
      </div>
      {open && filtered.length > 0 && <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--fi-shadow-lg)] fi-slide-up p-1">{filtered.map(o => <button key={o} onClick={() => { setVal(o); setOpen(false); }} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">{o}{val === o && <Check className="size-3.5 ml-auto text-[var(--color-brand-500)]" strokeWidth={3} />}</button>)}</div>}
    </div>
  );
}

export function AsyncSelectDemo() {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<{ name: string; role: string }[]>([]);
  const [open, setOpen] = React.useState(false);
  function load() { setLoading(true); setOpen(true); setTimeout(() => { setOptions([{ name: 'Sara Nguyen', role: 'Designer' }, { name: 'James Park', role: 'Engineer' }, { name: 'Maria Lopez', role: 'PM' }, { name: 'Alex Chen', role: 'Data Scientist' }]); setLoading(false); }, 1200); }
  return (
    <div className="relative">
      <button onClick={load} className="fi-input flex cursor-pointer items-center justify-between">
        <span>{loading ? 'Loading users...' : 'Load users...'}</span>
        {loading ? <Loader2 className="size-4 animate-spin text-[var(--color-brand-500)]" strokeWidth={2.5} /> : <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition', open && 'rotate-180')} strokeWidth={2.5} />}
      </button>
      {open && !loading && <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--fi-shadow-lg)] fi-slide-up p-1">{options.map(o => <button key={o.name} onClick={() => setOpen(false)} className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left transition hover:bg-[var(--surface-sunken)]"><User className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><div className="flex-1"><p className="text-sm font-semibold text-[var(--text-strong)]">{o.name}</p><p className="text-[11px] text-[var(--text-muted)]">{o.role}</p></div></button>)}</div>}
    </div>
  );
}

export function TagSelectDemo() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['Design']));
  const options = ['Design', 'Development', 'Marketing', 'Sales', 'Support'];
  function toggle(t: string) { setSelected(prev => { const n = new Set(prev); if (n.has(t)) n.delete(t); else n.add(t); return n; }); }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => <button key={o} onClick={() => toggle(o)} className={cn('inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all', selected.has(o) ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-1 ring-[var(--color-brand-200)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)] dark:ring-[var(--color-brand-500)]' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)] hover:bg-[var(--surface-sunken)]')}>{selected.has(o) && <Check className="size-3" strokeWidth={3} />}{o}</button>)}
    </div>
  );
}

export function AISuggestionSelectDemo() {
  const [open, setOpen] = React.useState(false);
  const suggestions = [
    { label: 'Based on your history: React', desc: 'You used React in 12 projects' },
    { label: 'Trending: TypeScript', desc: 'Up 34% this month' },
    { label: 'Recommended: Next.js', desc: 'Best fit for your stack' },
  ];
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="fi-input flex cursor-pointer items-center justify-between gap-2">
        <span className="flex items-center gap-2"><Sparkles className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} /><span className="font-semibold">AI suggestions</span></span>
        <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition', open && 'rotate-180')} strokeWidth={2.5} />
      </button>
      {open && <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--color-brand-200)] bg-[var(--popover)] shadow-[var(--fi-shadow-glow)] fi-slide-up p-1 dark:border-[rgba(70,95,255,0.3)]">
        <p className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-500)]"><Sparkles className="size-3" strokeWidth={2.5} /> AI Recommendations</p>
        {suggestions.map(s => <button key={s.label} onClick={() => setOpen(false)} className="flex w-full cursor-pointer items-start gap-2.5 rounded-lg px-3 py-2 text-left transition hover:bg-[var(--surface-sunken)]"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-[var(--color-brand-500)]" strokeWidth={2.5} /><div className="flex-1"><p className="text-sm font-semibold text-[var(--text-strong)]">{s.label}</p><p className="text-[11px] text-[var(--text-muted)]">{s.desc}</p></div></button>)}
      </div>}
    </div>
  );
}
