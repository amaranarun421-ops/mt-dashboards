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


export function AutoResizeTextarea() {
  const [val, setVal] = React.useState('');
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => { if (ref.current) { ref.current.style.height = 'auto'; ref.current.style.height = ref.current.scrollHeight + 'px'; } }, [val]);
  return <textarea ref={ref} value={val} onChange={(e) => setVal(e.target.value)} rows={2} placeholder="This textarea grows as you type..." className="fi-input h-auto resize-none overflow-hidden py-3 leading-relaxed" />;
}

export const AutoTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function AutoTextarea({ rows = 3, className, onChange, ...rest }, forwardedRef) {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const resize = React.useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = 'auto';
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
      const minHeight = lineHeight * rows + parseFloat(getComputedStyle(el).paddingTop) + parseFloat(getComputedStyle(el).paddingBottom);
      const newHeight = Math.max(el.scrollHeight, minHeight);
      el.style.height = `${newHeight}px`;
    }, [rows]);
    React.useEffect(() => { resize(); }, [resize]);
    React.useEffect(() => {
      if (typeof ResizeObserver !== 'undefined' && innerRef.current) {
        const ro = new ResizeObserver(resize);
        ro.observe(innerRef.current);
        return () => ro.disconnect();
      }
    }, [resize]);
    return (
      <textarea
        ref={(node) => { innerRef.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; }}
        rows={rows}
        onChange={(e) => { onChange?.(e); resize(); }}
        onInput={resize}
        className={cn('resize-none overflow-hidden', className)}
        {...rest}
      />
    );
  }
);

export function FloatingLabelTextarea() {
  const [val, setVal] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  return (
    <label className="block">
      <span className="fi-variant-title mb-2 block">Floating Label Textarea</span>
      <div className={cn('relative rounded-xl border bg-[var(--card)] shadow-[var(--fi-shadow-xs)] transition-all', focused ? 'border-[var(--color-brand-500)] ring-4 ring-[rgba(70,95,255,0.12)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]')}>
        <AutoTextarea value={val} onChange={e => setVal(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={3} placeholder={focused ? 'Type here...' : ''} className="w-full bg-transparent px-4 pt-5 text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
        <span className={cn('pointer-events-none absolute left-4 transition-all', focused || val ? 'top-2 text-[11px] font-semibold text-[var(--color-brand-500)]' : 'top-4 text-sm font-medium text-[var(--text-subtle)]')}>Your message</span>
      </div>
    </label>
  );
}
