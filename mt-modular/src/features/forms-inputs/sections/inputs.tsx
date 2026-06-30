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


import { useToast } from '@/hooks/use-toast';

export function FloatingLabelInput({ label, placeholder }: { label: string; placeholder?: string }) {
  const [value, setValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  return (
    <label className="block">
      <span className="fi-variant-title mb-2 block">Floating Label</span>
      <div className={cn('relative h-11 rounded-xl border bg-[var(--card)] shadow-[var(--fi-shadow-xs)] transition-all', focused ? 'border-[var(--color-brand-500)] ring-4 ring-[rgba(70,95,255,0.12)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]')}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={focused ? placeholder : ''} className="h-full w-full bg-transparent px-4 pt-3 text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
        <span className={cn('pointer-events-none absolute left-4 transition-all', focused || value ? 'top-1 text-[11px] font-semibold text-[var(--color-brand-500)]' : 'top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--text-subtle)]')}>{label}</span>
      </div>
    </label>
  );
}

export function PasswordStrengthInput() {
  const [pwd, setPwd] = React.useState('');
  const [show, setShow] = React.useState(false);
  const checks = [
    { label: '8+ chars', test: (p: string) => p.length >= 8 },
    { label: 'Uppercase', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Number', test: (p: string) => /\d/.test(p) },
    { label: 'Special', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];
  const passed = checks.filter(c => c.test(pwd)).length;
  const colors = ['', 'var(--color-error-500)', 'var(--color-warning-500)', 'var(--color-info-500)', 'var(--color-success-500)'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <label className="block">
      <span className="fi-variant-title mb-2 block">Password Strength</span>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.25} />
        <input type={show ? 'text' : 'password'} value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter password" className="fi-input pl-12 pr-12" />
        <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Toggle password visibility">{show ? <EyeOff className="size-4" strokeWidth={2.25} /> : <Eye className="size-4" strokeWidth={2.25} />}</button>
      </div>
      {pwd && (
        <div className="mt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {checks.map((_, i) => <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border-strong)]"><div className="h-full rounded-full transition-all duration-300" style={{ width: i < passed ? '100%' : '0%', backgroundColor: colors[passed] }} /></div>)}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: colors[passed] }}>{labels[passed]}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {checks.map(c => <span key={c.label} className={cn('inline-flex items-center gap-1 text-[11px] font-medium', c.test(pwd) ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-muted)]')}>{c.test(pwd) ? <Check className="size-2.5" strokeWidth={3} /> : <span className="size-2.5 rounded-full border border-current" />}{c.label}</span>)}
          </div>
        </div>
      )}
    </label>
  );
}

export function OtpInputDemo() {
  const [code, setCode] = React.useState('');
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <input key={idx} ref={el => { refs.current[idx] = el; }} type="text" inputMode="numeric" maxLength={1} value={code[idx] ?? ''} onChange={(e) => { const d = e.target.value.replace(/\D/g, '').slice(-1); const n = code.split(''); n[idx] = d; setCode(n.join('').slice(0, 6)); if (d && idx < 5) refs.current[idx + 1]?.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !code[idx] && idx > 0) refs.current[idx - 1]?.focus(); }} className={cn('h-12 w-11 rounded-xl border bg-[var(--card)] text-center text-lg font-semibold tabular-nums outline-none transition-all', code[idx] ? 'border-[var(--color-brand-500)] ring-4 ring-[rgba(70,95,255,0.12)]' : 'border-[var(--border)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]')} />
        ))}
      </div>
      {code.length === 6 && <CheckCircle2 className="size-6 text-[var(--color-success-500)] fi-bounce-in" strokeWidth={2.5} />}
    </div>
  );
}

export function TagInputDemo() {
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'Next.js']);
  const [input, setInput] = React.useState('');
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2.5 shadow-[var(--fi-shadow-xs)] transition focus-within:border-[var(--color-brand-500)] focus-within:ring-4 focus-within:ring-[rgba(70,95,255,0.12)]">
      {tags.map(tag => <span key={tag} className="fi-slide-up inline-flex items-center gap-1 rounded-lg bg-[var(--color-brand-50)] px-2 py-1 text-xs font-semibold text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{tag}<button onClick={() => setTags(tags.filter(t => t !== tag))} className="cursor-pointer text-[var(--color-brand-400)] transition hover:text-[var(--color-error-600)]" aria-label={`Remove ${tag}`}><X className="size-3" strokeWidth={2.5} /></button></span>)}
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const v = input.trim(); if (v && !tags.includes(v)) setTags([...tags, v]); setInput(''); } if (e.key === 'Backspace' && !input && tags.length) setTags(tags.slice(0, -1)); }} placeholder={tags.length === 0 ? 'Add tag...' : 'Add more...'} className="flex-1 bg-transparent px-1 py-1 text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
    </div>
  );
}

export function ExpandableInputDemo() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <label className="block">
      <span className="fi-variant-title mb-2 block">Expandable Input</span>
      <div className={cn('flex items-center overflow-hidden rounded-xl border bg-[var(--card)] shadow-[var(--fi-shadow-xs)] transition-all duration-300', expanded ? 'w-full border-[var(--color-brand-500)] ring-4 ring-[rgba(70,95,255,0.12)]' : 'w-12 border-[var(--border)] cursor-pointer')}>
        <button onClick={() => setExpanded(!expanded)} className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Toggle search"><Search className={cn('size-4 transition-transform', expanded && 'rotate-90')} strokeWidth={2.5} /></button>
        <input type="text" placeholder="Search..." onBlur={() => setExpanded(false)} className={cn('h-11 flex-1 bg-transparent pr-4 text-sm font-medium text-[var(--text-strong)] outline-none transition-opacity', expanded ? 'opacity-100' : 'opacity-0 pointer-events-none')} />
      </div>
    </label>
  );
}

export function MentionInputDemo() {
  const [val, setVal] = React.useState('Hello @Sara, can you review this?');
  const [showMentions, setShowMentions] = React.useState(false);
  const users = [
    { name: 'Sara Nguyen', role: 'Designer', initials: 'SN', color: '#8B5CF6' },
    { name: 'James Park', role: 'Engineer', initials: 'JP', color: '#10B981' },
    { name: 'Maria Lopez', role: 'PM', initials: 'ML', color: '#EC4899' },
    { name: 'Alex Chen', role: 'Data Scientist', initials: 'AC', color: '#F79009' },
  ];
  return (
    <label className="block">
      <span className="fi-variant-title mb-2 block">Mention Input (@)</span>
      <div className="relative">
        <input type="text" value={val} onChange={e => { setVal(e.target.value); setShowMentions(e.target.value.endsWith('@')); }} className="fi-input" placeholder="Type @ to mention someone..." />
        {showMentions && (
          <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--fi-shadow-lg)] fi-slide-up">
            <p className="border-b border-[var(--border-subtle)] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Team Members</p>
            {users.map(u => <button key={u.name} onClick={() => { setVal(val.slice(0, -1) + '@' + u.name.split(' ')[0] + ' '); setShowMentions(false); }} className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition hover:bg-[var(--surface-sunken)]"><span className="inline-flex size-7 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: u.color }}>{u.initials}</span><div className="flex-1"><p className="text-sm font-semibold text-[var(--text-strong)]">{u.name}</p><p className="text-[11px] text-[var(--text-muted)]">{u.role}</p></div></button>)}
          </div>
        )}
      </div>
    </label>
  );
}
