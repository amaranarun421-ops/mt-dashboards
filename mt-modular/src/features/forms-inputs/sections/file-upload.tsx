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

export function FileUploadDemo() {
  const [files, setFiles] = React.useState<string[]>([]);
  const [dragOver, setDragOver] = React.useState(false);
  return (
    <div>
      <p className="fi-label mb-3.5">Drag & Drop Upload</p>
      <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }} className={cn('flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all', dragOver ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] scale-[1.01] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border-strong)] bg-[var(--surface-sunken)] hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)]/40 dark:hover:bg-[rgba(70,95,255,0.04)]')}>
        <span className={cn('inline-flex size-14 items-center justify-center rounded-2xl shadow-[var(--fi-shadow-sm)] transition-transform', dragOver ? 'bg-[var(--color-brand-500)] text-white scale-110' : 'bg-[var(--card)] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]')}><Upload className="size-6" strokeWidth={2.5} /></span>
        <p className="mt-3 text-sm font-semibold text-[var(--text-strong)]">{dragOver ? 'Drop files to upload' : 'Drop files here or click to upload'}</p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">PNG, JPG, PDF up to 10MB · Max 20 files</p>
        <button className="fi-btn fi-btn-secondary mt-4 h-8 px-4 text-xs">Browse files</button>
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="fi-slide-up flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 shadow-[var(--fi-shadow-xs)]">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-500)] dark:bg-[rgba(70,95,255,0.16)]"><FileText className="size-4" strokeWidth={2.5} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-[var(--text-strong)]">{f}</p>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-[var(--color-success-500)]" style={{ width: '100%' }} /></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Done</span>
              <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="cursor-pointer text-[var(--text-muted)] transition hover:text-[var(--color-error-600)]" aria-label={`Remove ${f}`}><X className="size-4" strokeWidth={2.5} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
