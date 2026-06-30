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


export function StarRatingDemo() {
  const [rating, setRating] = React.useState(4);
  const [hover, setHover] = React.useState(0);
  return (
    <div>
      <p className="fi-label mb-3.5">Star Rating (interactive)</p>
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(s => (
            <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="cursor-pointer transition-transform hover:scale-125" aria-label={`Rate ${s} stars`}>
              <Star className={cn('size-7 transition-colors', (hover || rating) >= s ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} strokeWidth={2.5} />
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-[var(--text-strong)]">{hover || rating}.0 / 5.0</span>
          <span className="text-[11px] font-medium text-[var(--text-muted)]">{(hover || rating) >= 4 ? 'Excellent' : (hover || rating) >= 3 ? 'Good' : (hover || rating) >= 2 ? 'Fair' : 'Poor'}</span>
        </div>
      </div>
    </div>
  );
}

export function EmojiRatingDemo() {
  const emojis = ['😞', '😕', '😐', '😊', '😄'];
  const labels = ['Terrible', 'Bad', 'OK', 'Good', 'Great'];
  const [rating, setRating] = React.useState(3);
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {emojis.map((emoji, i) => (
          <button key={i} onClick={() => setRating(i + 1)} className={cn('inline-flex size-12 cursor-pointer items-center justify-center rounded-xl text-2xl transition-all', rating === i + 1 ? 'scale-125 bg-[var(--color-brand-50)] shadow-[var(--fi-shadow-sm)] dark:bg-[rgba(70,95,255,0.16)]' : 'opacity-50 hover:opacity-100 hover:scale-110')} aria-label={labels[i]}>{emoji}</button>
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-[var(--text-strong)]">{labels[rating - 1]}</span>
        <span className="text-[11px] font-medium text-[var(--text-muted)]">{rating} / 5</span>
      </div>
    </div>
  );
}

export function ReactionRatingDemo() {
  const reactions = [
    { icon: ThumbsUp, label: 'Like', color: 'var(--color-brand-500)' },
    { icon: Heart, label: 'Love', color: 'var(--color-error-500)' },
    { icon: Sparkles, label: 'Amazing', color: 'var(--color-warning-500)' },
    { icon: MessageSquare, label: 'Comment', color: 'var(--color-success-500)' },
  ];
  const [selected, setSelected] = React.useState(0);
  return (
    <div className="flex flex-wrap gap-3">
      {reactions.map((r, i) => {
        const Icon = r.icon;
        return <button key={r.label} onClick={() => setSelected(i)} className={cn('inline-flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all', selected === i ? 'scale-110 border-[var(--color-brand-500)] bg-[var(--color-brand-50)] shadow-[var(--fi-shadow-md)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] opacity-50 hover:opacity-100 hover:scale-105 hover:border-[var(--color-brand-300)]')} aria-pressed={selected === i}><Icon className="size-6" strokeWidth={2.5} style={{ color: selected === i ? r.color : undefined }} /><span className="text-[11px] font-bold text-[var(--text-muted)]">{r.label}</span></button>;
      })}
    </div>
  );
}

export function ProgressRatingDemo() {
  const [rating, setRating] = React.useState(3);
  return (
    <div className="max-w-md space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-3.5 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-warning-500)] to-[var(--color-error-500)] transition-all duration-500" style={{ width: `${(rating / 5) * 100}%` }} />
          </div>
        </div>
        <span className="text-sm font-semibold tracking-tight text-[var(--text-strong)]">{rating}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setRating(n)} className={cn('inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition-all', rating >= n ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--fi-shadow-sm)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--card)]')}>{n}</button>)}
      </div>
    </div>
  );
}
