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


export function FiStyles() {
  return (
    <style>{`
      .fi-root { --fi-shadow-xs: var(--shadow-theme-xs); --fi-shadow-sm: var(--shadow-theme-sm); --fi-shadow-md: var(--shadow-theme-md); --fi-shadow-lg: var(--shadow-theme-lg); --fi-shadow-xl: var(--shadow-theme-xl); --fi-shadow-glow: 0 0 0 4px rgba(70,95,255,0.18), 0 8px 24px -6px rgba(70,95,255,0.32); }
      .fi-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
      .fi-variant-title { font-size: 12px; font-weight: 600; letter-spacing: 0.02em; color: var(--text-body); }
      .fi-divider { height: 1px; background: var(--border-subtle); margin: 4px 0; }
      .fi-input { display: block; width: 100%; height: 44px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); padding: 0 14px; font-size: 14px; font-weight: 500; color: var(--text-strong); outline: none; transition: border-color 180ms ease, box-shadow 180ms ease; box-shadow: var(--fi-shadow-xs); }
      .fi-input::placeholder { color: var(--text-subtle); font-weight: 400; }
      .fi-input:hover { border-color: var(--border-strong); }
      .fi-input:focus { border-color: var(--color-brand-500); box-shadow: 0 0 0 4px rgba(70,95,255,0.12), var(--fi-shadow-xs); }
      .fi-input:disabled { opacity: 0.55; cursor: not-allowed; }
      .fi-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; padding: 0 18px; border-radius: 12px; font-size: 14px; font-weight: 600; letter-spacing: -0.005em; cursor: pointer; transition: all 180ms cubic-bezier(0.32, 0.72, 0, 1); white-space: nowrap; user-select: none; }
      .fi-btn:disabled { opacity: 0.55; cursor: not-allowed; }
      .fi-btn:active { transform: translateY(0); }
      .fi-btn-primary { background: var(--color-brand-500); color: white; box-shadow: 0 4px 14px -2px rgba(70,95,255,0.4), inset 0 1px 0 rgba(255,255,255,0.18); }
      .fi-btn-primary:hover { background: var(--color-brand-600); box-shadow: 0 6px 20px -2px rgba(70,95,255,0.5), inset 0 1px 0 rgba(255,255,255,0.18); transform: translateY(-1px); }
      .fi-btn-secondary { background: var(--card); color: var(--text-strong); border: 1px solid var(--border); box-shadow: var(--fi-shadow-xs); }
      .fi-btn-secondary:hover { background: var(--surface-sunken); border-color: var(--border-strong); transform: translateY(-1px); }
      .fi-btn-ghost { background: transparent; color: var(--text-body); border: 1px solid transparent; }
      .fi-btn-ghost:hover { background: var(--surface-sunken); color: var(--text-strong); }
      .fi-glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.4); box-shadow: var(--fi-shadow-sm); }
      .dark .fi-glass { background: rgba(20,28,42,0.6); border-color: rgba(255,255,255,0.08); }
      .fi-pulse-glow { animation: fiPulseGlow 2.4s ease-in-out infinite; }
      @keyframes fiPulseGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(70,95,255,0.4); } 50% { box-shadow: 0 0 0 8px rgba(70,95,255,0); } }
      .fi-bounce-in { animation: fiBounceIn 380ms cubic-bezier(0.34, 1.56, 0.64, 1); }
      @keyframes fiBounceIn { 0% { transform: scale(0.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      .fi-check-bounce { animation: fiCheckBounce 320ms cubic-bezier(0.34, 1.56, 0.64, 1); }
      @keyframes fiCheckBounce { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
      .fi-slide-up { animation: fiSlideUp 280ms cubic-bezier(0.16, 1, 0.3, 1); }
      @keyframes fiSlideUp { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
      .fi-card-hover { transition: all 200ms cubic-bezier(0.32, 0.72, 0, 1); }
      .fi-card-hover:hover { transform: translateY(-2px); box-shadow: var(--fi-shadow-md); }
      .fi-slider { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; outline: none; cursor: pointer; }
      .fi-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 999px; background: white; border: 2px solid var(--color-brand-500); box-shadow: 0 2px 8px rgba(16,24,40,0.18); cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease; }
      .fi-slider::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(70,95,255,0.18), 0 2px 8px rgba(16,24,40,0.18); }
      .fi-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 999px; background: white; border: 2px solid var(--color-brand-500); box-shadow: 0 2px 8px rgba(16,24,40,0.18); cursor: pointer; }

    `}</style>
  );
}
