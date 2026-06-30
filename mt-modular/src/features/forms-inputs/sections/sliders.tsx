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


export function SliderDemo({ label, min, max, defaultVal, prefix, gradient }: { label: string; min: number; max: number; defaultVal: number; prefix?: string; gradient?: boolean }) {
  const [val, setVal] = React.useState(defaultVal);
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="fi-variant-title">{label}</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-brand-50)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{prefix}{val}{prefix ? '' : '%'}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="fi-slider w-full"
        style={{
          background: gradient
            ? `linear-gradient(90deg, var(--color-brand-500) 0%, #7a5af8 ${pct}%, var(--surface-sunken) ${pct}%)`
            : `linear-gradient(90deg, var(--color-brand-500) ${pct}%, var(--surface-sunken) ${pct}%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-[11px] font-semibold text-[var(--text-muted)]"><span>{prefix}{min}</span><span>{prefix}{max}</span></div>
    </div>
  );
}
