'use client';

import * as React from 'react';
import {
  Code2,
  Copy,
  Check,
  Play,
  Download,
  Terminal,
  FileText,
  ChevronDown,
  Share2,
  Plus,
  Search,
  Mic,
  Send,
  Sparkles,
  Star,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface GeneratedCode {
  id: string;
  prompt: string;
  code: string;
  language: string;
  model: string;
  time: string;
  isExample?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  group: 'TODAY' | 'YESTERDAY' | 'EARLIER';
}

const SAMPLE_CODE = `import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions<T> {
  initialData?: T;
  onError?: (error: Error) => void;
  dependencies?: unknown[];
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * A custom hook for fetching data with loading and error states.
 * Supports automatic refetching when dependencies change.
 */
export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions<T> = {},
): UseFetchResult<T> {
  const { initialData, onError, dependencies = [] } = options;
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setRefetchKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let aborted = false;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        if (!aborted) { setData(json); setLoading(false); }
      })
      .catch((err: Error) => {
        if (aborted || err.name === 'AbortError') return;
        setError(err);
        setLoading(false);
        onError?.(err);
      });

    return () => { aborted = true; controller.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchKey, ...dependencies]);

  return { data, loading, error, refetch };
}`;

const SAMPLE_CODE_2 = `export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Usage:
// const debouncedSearch = debounce((q: string) => fetchResults(q), 300);
// input.addEventListener('input', (e) => debouncedSearch(e.target.value));`;

const SAMPLE_CODE_3 = `from typing import List, Optional
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Customer:
    id: int
    name: str
    email: str
    revenue: float
    created_at: datetime


def get_top_customers(
    customers: List[Customer],
    limit: int = 10,
    min_revenue: Optional[float] = None,
) -> List[Customer]:
    """
    Return the top N customers sorted by revenue.
    Optionally filter by minimum revenue threshold.
    """
    filtered = (
        [c for c in customers if c.revenue >= min_revenue]
        if min_revenue is not None
        else customers
    )
    return sorted(filtered, key=lambda c: c.revenue, reverse=True)[:limit]`;

// Example code shown by default on page load
const EXAMPLE_CODE: GeneratedCode[] = [
  {
    id: 'ex-c1',
    prompt: 'Create a React hook for fetching data with loading and error states',
    code: SAMPLE_CODE,
    language: 'typescript',
    model: 'Claude 3.5 Sonnet',
    time: '2:14 PM',
    isExample: true,
  },
  {
    id: 'ex-c2',
    prompt: 'Write a debounce function in TypeScript with generic support',
    code: SAMPLE_CODE_2,
    language: 'typescript',
    model: 'GPT-4 Turbo',
    time: '11:42 AM',
    isExample: true,
  },
  {
    id: 'ex-c3',
    prompt: 'Generate a Python function to find top N customers by revenue',
    code: SAMPLE_CODE_3,
    language: 'python',
    model: 'GPT-4o',
    time: 'Yesterday',
    isExample: true,
  },
];

const SAMPLE_CONVERSATIONS: Conversation[] = [
  { id: 'c1', title: 'React hook for fetching data', group: 'TODAY' },
  { id: 'c2', title: 'Debounce function in TypeScript', group: 'TODAY' },
  { id: 'c3', title: 'Express REST API for users', group: 'TODAY' },
  { id: 'c4', title: 'useIntersectionObserver hook', group: 'YESTERDAY' },
  { id: 'c5', title: 'Binary search in TypeScript', group: 'YESTERDAY' },
  { id: 'c6', title: 'PostgreSQL top 10 customers query', group: 'YESTERDAY' },
  { id: 'c7', title: 'Rust async HTTP client', group: 'EARLIER' },
  { id: 'c8', title: 'Go gin middleware for auth', group: 'EARLIER' },
];

const LANGUAGES = [
  { value: 'typescript', label: 'TypeScript', ext: 'ts' },
  { value: 'javascript', label: 'JavaScript', ext: 'js' },
  { value: 'python', label: 'Python', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'go', label: 'Go', ext: 'go' },
  { value: 'rust', label: 'Rust', ext: 'rs' },
  { value: 'php', label: 'PHP', ext: 'php' },
  { value: 'sql', label: 'SQL', ext: 'sql' },
];

const MODELS = [
  { id: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', icon: Star, badge: 'PRO' },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo', icon: Sparkles },
  { id: 'gpt-4o', label: 'GPT-4o', icon: Sparkles },
  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', icon: Sparkles },
  { id: 'llama-3.1', label: 'Llama 3.1', icon: Sparkles },
];

export function AICodeGeneratorPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  // Initialize with example code so the page never looks empty
  const [gallery, setGallery] = React.useState<GeneratedCode[]>(EXAMPLE_CODE);
  const [language, setLanguage] = React.useState('typescript');
  const [model, setModel] = React.useState(MODELS[0]);
  const [showModelMenu, setShowModelMenu] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const [showConversations, setShowConversations] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [selectedCode, setSelectedCode] = React.useState<GeneratedCode | null>(null);
  const modelMenuRef = React.useRef<HTMLDivElement>(null);
  const langMenuRef = React.useRef<HTMLDivElement>(null);
  const convMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) setShowModelMenu(false);
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setShowLangMenu(false);
      if (convMenuRef.current && !convMenuRef.current.contains(e.target as Node)) setShowConversations(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleGenerate() {
    if (!prompt.trim()) {
      toast({ title: 'Enter a prompt', description: 'Describe the code you want to generate', variant: 'destructive' });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const newCode: GeneratedCode = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        code: SAMPLE_CODE, // In production this would come from the AI API
        language,
        model: model.label,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setGallery((prev) => [newCode, ...prev]);
      setGenerating(false);
      toast({ title: 'Code generated', description: `${LANGUAGES.find((l) => l.value === language)?.label} · ${newCode.code.split('\n').length} lines` });
    }, 1800);
  }

  function copyCode(code: string) {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast({ title: 'Copied to clipboard' });
  }

  function downloadCode(code: GeneratedCode) {
    const ext = LANGUAGES.find((l) => l.value === code.language)?.ext ?? 'txt';
    const blob = new Blob([code.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'File downloaded', description: `generated.${ext}` });
  }

  const langMeta = LANGUAGES.find((l) => l.value === language) ?? LANGUAGES[0];
  const latestCode = gallery[0];

  return (
    <div className="flex h-[calc(100vh-74px)] overflow-hidden bg-[var(--background)]">
      {/* ============================================
          MAIN COLUMN
          ============================================ */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--card)] px-4 sm:px-6">
          <div className="relative" ref={convMenuRef}>
            <button type="button" onClick={() => setShowConversations((p) => !p)} className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--text-strong)] transition hover:bg-[var(--surface-sunken)]">
              React hook for fetching data
              <ChevronDown className="size-4 text-[var(--text-muted)]" />
            </button>
            {showConversations && (
              <div className="absolute left-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)]">
                <div className="border-b border-[var(--border-subtle)] p-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
                    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="ds-input !h-9 pl-9 text-sm" />
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto modern-scrollbar p-2">
                  {(['TODAY', 'YESTERDAY', 'EARLIER'] as const).map((group) => {
                    const items = SAMPLE_CONVERSATIONS.filter((c) => c.group === group && c.title.toLowerCase().includes(searchQuery.toLowerCase()));
                    if (items.length === 0) return null;
                    return (
                      <div key={group} className="mb-2">
                        <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">{group}</p>
                        <div className="space-y-0.5">
                          {items.map((c) => (
                            <button key={c.id} type="button" onClick={() => { setPrompt(c.title); setShowConversations(false); toast({ title: 'Conversation loaded' }); }} className="block w-full truncate rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                              {c.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-[var(--border-subtle)] p-2">
                  <button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--surface-sunken)]">
                    <ChevronDown className="size-3.5" /> Show more
                  </button>
                </div>
              </div>
            )}
          </div>

          <button type="button" onClick={() => toast({ title: 'Share link copied', description: 'Anyone with the link can view this code' })} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* ============================================
            Preview Area — Latest generated code
            ============================================ */}
        <div className="flex-1 overflow-y-auto modern-scrollbar">
          <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-start px-4 py-8 sm:px-6">
            {generating ? (
              <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--shadow-theme-md)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-[var(--color-error-500)]" />
                      <span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" />
                      <span className="size-2.5 rounded-full bg-[var(--color-success-500)]" />
                    </div>
                    <Terminal className="ml-2 size-3.5 text-white/50" />
                    <span className="font-mono text-xs font-medium text-white/50">generating.{langMeta.ext}</span>
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-4 animate-pulse rounded bg-white/5" style={{ width: `${40 + Math.random() * 60}%` }} />
                  ))}
                </div>
              </div>
            ) : gallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] text-[var(--color-brand-500)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(70,95,255,0.08)]">
                  <Code2 className="size-7" strokeWidth={1.8} />
                </div>
                <p className="mt-5 text-lg font-semibold text-[var(--text-strong)]">Generate your first code</p>
                <p className="mt-1.5 max-w-sm text-sm font-normal text-[var(--text-muted)]">Describe what you want to build and hit send. Generated code will appear here.</p>
              </div>
            ) : (
              /* Latest code — large preview */
              <div className="w-full max-w-2xl">
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--shadow-theme-md)]">
                  {/* Title bar — like macOS terminal */}
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-[var(--color-error-500)]" />
                        <span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" />
                        <span className="size-2.5 rounded-full bg-[var(--color-success-500)]" />
                      </div>
                      <Terminal className="ml-2 size-3.5 text-white/50" />
                      <span className="font-mono text-xs font-medium text-white/50">generated.{LANGUAGES.find((l) => l.value === latestCode.language)?.ext}</span>
                      {latestCode.isExample && (
                        <span className="ml-2 rounded bg-[var(--color-brand-500)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">EXAMPLE</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => toast({ title: 'Running code...' })} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Run"><Play className="size-3.5" /></button>
                      <button type="button" onClick={() => downloadCode(latestCode)} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Download"><Download className="size-3.5" /></button>
                      <button type="button" onClick={() => copyCode(latestCode.code)} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Copy">
                        {copied ? <Check className="size-3.5 text-[var(--color-success-400)]" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  </div>
                  {/* Code content */}
                  <pre className="max-h-[55vh] overflow-auto p-4 text-xs leading-relaxed modern-scrollbar">
                    <code className="font-mono text-[#f8f8f2]">{latestCode.code}</code>
                  </pre>
                </div>
                {/* Caption */}
                <p className="mt-4 line-clamp-2 text-center text-sm font-normal leading-relaxed text-[var(--text-body)]">{latestCode.prompt}</p>
                <p className="mt-1.5 text-center text-xs font-normal text-[var(--text-subtle)]">{latestCode.model} · {latestCode.time} · {latestCode.code.split('\n').length} lines</p>
              </div>
            )}

            {/* Gallery strip — older snippets */}
            {gallery.length > 1 && (
              <div className="mt-10 w-full max-w-2xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">Earlier in this conversation</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.slice(1).map((code) => (
                    <button key={code.id} type="button" onClick={() => { setPrompt(code.prompt); toast({ title: 'Prompt loaded' }); }} className="group flex aspect-[4/3] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] p-3 text-left transition hover:border-[var(--color-brand-400)]">
                      <div className="mb-2 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-[var(--color-error-500)]" />
                        <span className="size-1.5 rounded-full bg-[var(--color-warning-500)]" />
                        <span className="size-1.5 rounded-full bg-[var(--color-success-500)]" />
                        <span className="ml-1.5 font-mono text-[9px] text-white/40">{LANGUAGES.find((l) => l.value === code.language)?.ext}</span>
                      </div>
                      <pre className="flex-1 overflow-hidden font-mono text-[8px] leading-tight text-white/40"><code>{code.code.split('\n').slice(0, 8).join('\n')}</code></pre>
                      <p className="mt-2 truncate text-[10px] font-medium text-white/60">{code.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================
            Bottom — Prompt input + action bar
            ============================================ */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--card)] px-4 py-3 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-sm)] transition focus-within:border-[var(--color-brand-400)] focus-within:ring-[3px] focus-within:ring-[rgba(70,95,255,0.10)]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); }
                }}
                rows={1}
                placeholder="Type your prompt here..."
                className="block w-full resize-none bg-transparent px-4 pt-3.5 text-sm font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
                autoFocus
              />
              <div className="flex flex-wrap items-center gap-2 px-3 pb-2.5 pt-1">
                {/* Mic icon */}
                <button type="button" onClick={() => toast({ title: 'Voice input', description: 'Microphone permission required' })} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--text-strong)] text-white transition hover:opacity-90" aria-label="Voice input" title="Voice input">
                  <Mic className="size-4" />
                </button>

                {/* Language dropdown */}
                <div className="relative" ref={langMenuRef}>
                  <button type="button" onClick={() => setShowLangMenu((p) => !p)} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
                    <Code2 className="size-3.5 text-[var(--color-brand-500)]" />
                    {langMeta.label}
                    <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
                  </button>
                  {showLangMenu && (
                    <div className="absolute bottom-full left-0 z-50 mb-1 w-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
                      <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Languages</p>
                      <div className="max-h-60 overflow-y-auto modern-scrollbar">
                        {LANGUAGES.map((l) => (
                          <button key={l.value} type="button" onClick={() => { setLanguage(l.value); setShowLangMenu(false); }} className={cn('flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition', language === l.value ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                            <span className="font-mono text-[10px] uppercase text-[var(--text-subtle)]">{l.ext}</span>
                            <span className="flex-1">{l.label}</span>
                            {language === l.value && <Check className="size-3.5 text-[var(--color-brand-500)]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Model dropdown — pushed to right with ml-auto */}
                <div className="relative ml-auto" ref={modelMenuRef}>
                  <button type="button" onClick={() => setShowModelMenu((p) => !p)} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
                    <model.icon className={cn('size-3.5', model.id === 'claude-3.5-sonnet' && 'text-[var(--color-warning-500)]')} />
                    {model.label}
                    {model.badge && <span className="rounded bg-[var(--color-warning-50)] px-1 py-0.5 text-[8px] font-semibold uppercase text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{model.badge}</span>}
                    <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
                  </button>
                  {showModelMenu && (
                    <div className="absolute bottom-full right-0 z-50 mb-1 w-56 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
                      <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Code models</p>
                      {MODELS.map((m) => (
                        <button key={m.id} type="button" onClick={() => { setModel(m); setShowModelMenu(false); }} className={cn('flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition', model.id === m.id ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                          <m.icon className={cn('size-4', m.id === 'claude-3.5-sonnet' && 'text-[var(--color-warning-500)]')} />
                          <span className="flex-1">{m.label}</span>
                          {m.badge && <span className="rounded bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{m.badge}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Send button */}
                <button type="button" onClick={handleGenerate} disabled={generating || !prompt.trim()} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Generate code" title="Generate (Enter)">
                  {generating ? (
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" /><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] font-normal text-[var(--text-subtle)]">
              Press <kbd className="rounded bg-[var(--surface-sunken)] px-1 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">Enter</kbd> to generate · <kbd className="rounded bg-[var(--surface-sunken)] px-1 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>

      {/* ============================================
          Right Sidebar — Conversation history
          ============================================ */}
      <aside className="hidden w-72 shrink-0 border-l border-[var(--border-subtle)] bg-[var(--card)] xl:flex xl:flex-col">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-4">
          <p className="text-sm font-medium text-[var(--text-strong)]">Conversations</p>
          <button type="button" onClick={() => { setPrompt(''); setGallery(EXAMPLE_CODE); toast({ title: 'New chat started' }); }} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">
            <Plus className="size-3.5" /> New Chat
          </button>
        </div>

        <div className="border-b border-[var(--border-subtle)] p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="ds-input !h-9 pl-9 text-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto modern-scrollbar p-2">
          {(['TODAY', 'YESTERDAY', 'EARLIER'] as const).map((group) => {
            const items = SAMPLE_CONVERSATIONS.filter((c) => c.group === group && c.title.toLowerCase().includes(searchQuery.toLowerCase()));
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-3">
                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">{group}</p>
                <div className="space-y-0.5">
                  {items.map((c) => (
                    <button key={c.id} type="button" onClick={() => { setPrompt(c.title); toast({ title: 'Conversation loaded' }); }} className={cn('block w-full truncate rounded-lg px-2.5 py-2 text-left text-sm font-normal transition', c.title === prompt ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-[var(--border-subtle)] p-2">
          <button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <ChevronDown className="size-3.5" /> Show more
          </button>
        </div>
      </aside>

      {/* Code viewer modal */}
      {selectedCode && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setSelectedCode(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0c111d]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[var(--color-error-500)]" />
                  <span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" />
                  <span className="size-2.5 rounded-full bg-[var(--color-success-500)]" />
                </div>
                <span className="ml-2 font-mono text-xs font-medium text-white/60">generated.{LANGUAGES.find((l) => l.value === selectedCode.language)?.ext}</span>
              </div>
              <button type="button" onClick={() => setSelectedCode(null)} className="text-xs font-medium text-white/60 hover:text-white">Close</button>
            </div>
            <pre className="max-h-[80vh] overflow-auto p-4 text-xs leading-relaxed modern-scrollbar">
              <code className="font-mono text-[#f8f8f2]">{selectedCode.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
