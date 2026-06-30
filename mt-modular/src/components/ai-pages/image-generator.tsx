'use client';

import * as React from 'react';
import {
  Sparkles,
  Share2,
  Plus,
  Search,
  Mic,
  ChevronDown,
  Star,
  Image as ImageIcon,
  Download,
  Heart,
  RefreshCw,
  Maximize2,
  Check,
  Copy,
  Send,
  Proportions,
  Layers,
  Gauge,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ActionSelect } from './action-select';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  aspect: string;
  quality: string;
  time: string;
  favorite?: boolean;
  isExample?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  group: 'TODAY' | 'YESTERDAY' | 'EARLIER';
}

// Example images shown by default on page load (so the page never looks empty)
const EXAMPLE_IMAGES: GeneratedImage[] = [
  {
    id: 'ex-1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop',
    prompt: 'Snow-capped mountain peaks at golden hour with dramatic clouds and a lone hiker in red jacket',
    model: 'Nano Banana Pro',
    aspect: '3:4',
    quality: '2K',
    time: '2:14 PM',
    isExample: true,
  },
  {
    id: 'ex-2',
    url: 'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=900&h=900&fit=crop',
    prompt: 'Abstract iridescent liquid art with swirling blue and purple gradients',
    model: 'FLUX Pro',
    aspect: '1:1',
    quality: '4K',
    time: '11:42 AM',
    isExample: true,
  },
  {
    id: 'ex-3',
    url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&h=1200&fit=crop',
    prompt: 'Cozy minimalist coffee shop interior with warm lighting and plants',
    model: 'DALL-E 3',
    aspect: '3:4',
    quality: '2K',
    time: 'Yesterday',
    isExample: true,
  },
  {
    id: 'ex-4',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=900&fit=crop',
    prompt: 'Misty pine forest at dawn with sunbeams cutting through the trees',
    model: 'Midjourney v6',
    aspect: '1:1',
    quality: '4K',
    time: 'Yesterday',
    isExample: true,
  },
];

const HD_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=800&h=1000&fit=crop',
];

const SAMPLE_CONVERSATIONS: Conversation[] = [
  { id: 'c1', title: 'Generate responsive login', group: 'TODAY' },
  { id: 'c2', title: 'Write a follow-up email to client', group: 'TODAY' },
  { id: 'c3', title: 'Logo concept for fintech startup', group: 'TODAY' },
  { id: 'c4', title: 'Hero section for landing page', group: 'YESTERDAY' },
  { id: 'c5', title: 'Product mockup with packaging', group: 'YESTERDAY' },
  { id: 'c6', title: 'Abstract gradient background', group: 'YESTERDAY' },
  { id: 'c7', title: 'Brand color palette exploration', group: 'EARLIER' },
  { id: 'c8', title: '3D character design sketch', group: 'EARLIER' },
];

const MODELS = [
  { id: 'nano-banana-pro', label: 'Nano Banana Pro', icon: Star, badge: 'PRO' },
  { id: 'dall-e-3', label: 'DALL-E 3', icon: Sparkles },
  { id: 'flux-pro', label: 'FLUX Pro', icon: Sparkles },
  { id: 'midjourney-v6', label: 'Midjourney v6', icon: Sparkles },
];

const ASPECT_RATIOS = [
  { value: '1:1', label: 'Square', glyph: '□', hint: '1:1' },
  { value: '3:4', label: 'Portrait', glyph: '▯', hint: '3:4' },
  { value: '4:3', label: 'Classic', glyph: '▭', hint: '4:3' },
  { value: '16:9', label: 'Landscape', glyph: '▬', hint: '16:9' },
  { value: '9:16', label: 'Story', glyph: '▮', hint: '9:16' },
];

const QUALITIES = [
  { value: '1K', label: '1K', hint: 'Standard' },
  { value: '2K', label: '2K', hint: 'High' },
  { value: '4K', label: '4K', hint: 'Ultra' },
];

const COUNTS = [
  { value: 1, label: '1 image' },
  { value: 2, label: '2 images' },
  { value: 4, label: '4 images' },
  { value: 8, label: '8 images' },
];

export function AIImageGeneratorPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  // Initialize gallery with example images so the page never looks empty
  const [gallery, setGallery] = React.useState<GeneratedImage[]>(EXAMPLE_IMAGES);
  const [model, setModel] = React.useState(MODELS[0]);
  const [aspect, setAspect] = React.useState('3:4');
  const [quality, setQuality] = React.useState('2K');
  const [count, setCount] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState<GeneratedImage | null>(null);
  const [showModelMenu, setShowModelMenu] = React.useState(false);
  const [showConversations, setShowConversations] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const modelMenuRef = React.useRef<HTMLDivElement>(null);
  const convMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) setShowModelMenu(false);
      if (convMenuRef.current && !convMenuRef.current.contains(e.target as Node)) setShowConversations(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleGenerate() {
    if (!prompt.trim()) {
      toast({ title: 'Enter a prompt', description: 'Describe the image you want to generate', variant: 'destructive' });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const newImages: GeneratedImage[] = Array.from({ length: count }).map((_, i) => ({
        id: `${Date.now()}-${i}`,
        url: HD_IMAGES[Math.floor(Math.random() * HD_IMAGES.length)],
        prompt: prompt.trim(),
        model: model.label,
        aspect,
        quality,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }));
      setGallery((prev) => [...newImages, ...prev]);
      setGenerating(false);
      toast({ title: 'Image generated', description: `${count} ${aspect} image${count > 1 ? 's' : ''} created with ${model.label}` });
    }, 1800);
  }

  function toggleFavorite(id: string) {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, favorite: !g.favorite } : g)));
  }

  const aspectClass =
    aspect === '1:1' ? 'aspect-square' :
    aspect === '3:4' ? 'aspect-[3/4]' :
    aspect === '4:3' ? 'aspect-[4/3]' :
    aspect === '16:9' ? 'aspect-video' :
    'aspect-[9/16]';

  return (
    <div className="flex h-[calc(100vh-74px)] overflow-hidden bg-[var(--background)]">
      {/* ============================================
          MAIN COLUMN — Centered, chat-style image gen
          ============================================ */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — conversation title dropdown + Share */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--card)] px-4 sm:px-6">
          <div className="relative" ref={convMenuRef}>
            <button
              type="button"
              onClick={() => setShowConversations((p) => !p)}
              className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--text-strong)] transition hover:bg-[var(--surface-sunken)]"
            >
              Generate responsive login
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
                        {items.map((c) => (
                          <button key={c.id} type="button" onClick={() => { setPrompt(c.title); setShowConversations(false); toast({ title: 'Conversation loaded' }); }} className="block w-full truncate rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                            {c.title}
                          </button>
                        ))}
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

          <button type="button" onClick={() => toast({ title: 'Share link copied', description: 'Anyone with the link can view this conversation' })} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* ============================================
            Preview Area — Centered single image
            ============================================ */}
        <div className="flex-1 overflow-y-auto modern-scrollbar">
          <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-start px-4 py-8 sm:px-6">
            {/* Generating state */}
            {generating ? (
              <div className={cn('w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--surface-sunken)]', aspectClass)}>
                <div className="flex size-full animate-pulse flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] dark:from-[rgba(70,95,255,0.1)] dark:to-[rgba(70,95,255,0.05)]">
                  <Sparkles className="size-8 animate-pulse text-[var(--color-brand-500)]" />
                  <p className="text-sm font-medium text-[var(--text-body)]">Generating image...</p>
                  <p className="text-xs font-normal text-[var(--text-muted)]">{model.label} · {quality} · {aspect}</p>
                </div>
              </div>
            ) : gallery.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] text-[var(--color-brand-500)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(70,95,255,0.08)]">
                  <ImageIcon className="size-7" strokeWidth={1.8} />
                </div>
                <p className="mt-5 text-lg font-semibold text-[var(--text-strong)]">Create your first image</p>
                <p className="mt-1.5 max-w-sm text-sm font-normal text-[var(--text-muted)]">Describe what you want to see and hit send. Your generated images will appear here.</p>
              </div>
            ) : (
              /* Latest image — large preview */
              <div className="w-full max-w-sm">
                <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-md)]">
                  <div className={cn('overflow-hidden', aspectClass)}>
                    <img src={gallery[0].url} alt={gallery[0].prompt} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  {/* Top badges */}
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">{gallery[0].aspect}</span>
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">{gallery[0].model}</span>
                    {gallery[0].isExample && (
                      <span className="rounded-md bg-[var(--color-brand-500)] px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">EXAMPLE</span>
                    )}
                  </div>
                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" onClick={() => setSelectedImage(gallery[0])} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" aria-label="Expand"><Maximize2 className="size-4" /></button>
                    <button type="button" onClick={() => toggleFavorite(gallery[0].id)} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" aria-label="Favorite"><Heart className={cn('size-4', gallery[0].favorite && 'fill-[var(--color-error-500)] text-[var(--color-error-500)]')} /></button>
                    <button type="button" onClick={() => toast({ title: 'Downloading...' })} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" aria-label="Download"><Download className="size-4" /></button>
                    <button type="button" onClick={() => { setPrompt(gallery[0].prompt); toast({ title: 'Prompt loaded' }); }} className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" aria-label="Reuse prompt"><RefreshCw className="size-4" /></button>
                  </div>
                </div>
                {/* Caption — fixed line-height for consistent spacing */}
                <p className="mt-4 line-clamp-2 text-center text-sm font-normal leading-relaxed text-[var(--text-body)]">{gallery[0].prompt}</p>
                <p className="mt-1.5 text-center text-xs font-normal text-[var(--text-subtle)]">{gallery[0].time} · {gallery[0].quality}</p>
              </div>
            )}

            {/* Gallery strip — older images */}
            {gallery.length > 1 && (
              <div className="mt-10 w-full max-w-2xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">Earlier in this conversation</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {gallery.slice(1).map((img) => (
                    <button key={img.id} type="button" onClick={() => setSelectedImage(img)} className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--color-brand-400)]">
                      <img src={img.url} alt={img.prompt} className="size-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                      {img.favorite && (
                        <span className="absolute right-1.5 top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
                          <Heart className="size-3 fill-current" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================
            Bottom — Prompt input + action bar (FIXED alignment)
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
              {/* Action bar — single flex row, consistent gap-2, items-center for proper vertical alignment */}
              <div className="flex flex-wrap items-center gap-2 px-3 pb-2.5 pt-1">
                {/* Mic icon */}
                <button type="button" onClick={() => toast({ title: 'Voice input', description: 'Microphone permission required' })} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--text-strong)] text-white transition hover:opacity-90" aria-label="Voice input" title="Voice input">
                  <Mic className="size-4" />
                </button>

                {/* Aspect ratio — dropdown */}
                <ActionSelect
                  value={aspect}
                  options={ASPECT_RATIOS}
                  onChange={(v) => setAspect(v)}
                  icon={Proportions}
                  ariaLabel="Aspect ratio"
                  title="Aspect ratio"
                />

                {/* Count — dropdown */}
                <ActionSelect
                  value={count}
                  options={COUNTS}
                  onChange={(v) => setCount(v)}
                  icon={Layers}
                  ariaLabel="Image count"
                  title="Number of images"
                  menuWidth="w-36"
                />

                {/* Quality — dropdown */}
                <ActionSelect
                  value={quality}
                  options={QUALITIES}
                  onChange={(v) => setQuality(v)}
                  icon={Gauge}
                  ariaLabel="Quality"
                  title="Output quality"
                  menuWidth="w-40"
                />

                {/* Model dropdown — pushed to right with ml-auto */}
                <div className="relative ml-auto" ref={modelMenuRef}>
                  <button type="button" onClick={() => setShowModelMenu((p) => !p)} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
                    <model.icon className={cn('size-3.5', model.id === 'nano-banana-pro' && 'text-[var(--color-warning-500)]')} />
                    {model.label}
                    {model.badge && <span className="rounded bg-[var(--color-warning-50)] px-1 py-0.5 text-[8px] font-semibold uppercase text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{model.badge}</span>}
                    <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
                  </button>
                  {showModelMenu && (
                    <div className="absolute bottom-full right-0 z-50 mb-1 w-56 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
                      <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Models</p>
                      {MODELS.map((m) => (
                        <button key={m.id} type="button" onClick={() => { setModel(m); setShowModelMenu(false); }} className={cn('flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition', model.id === m.id ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                          <m.icon className={cn('size-4', m.id === 'nano-banana-pro' && 'text-[var(--color-warning-500)]')} />
                          <span className="flex-1">{m.label}</span>
                          {m.badge && <span className="rounded bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{m.badge}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Send button — aligned with action bar via items-center */}
                <button type="button" onClick={handleGenerate} disabled={generating || !prompt.trim()} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Generate" title="Generate (Enter)">
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
          <button type="button" onClick={() => { setPrompt(''); setGallery(EXAMPLE_IMAGES); toast({ title: 'New chat started' }); }} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)] dark:bg-[var(--color-brand-500)] dark:hover:bg-[var(--color-brand-400)]">
            <Plus className="size-3.5" /> New Chat
          </button>
        </div>

        <div className="border-b border-[var(--border-subtle)] p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="ds-input !h-9 pl-9 text-sm" />
          </div>
        </div>

        {/* Conversation list — consistent vertical spacing (space-y-0.5) */}
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

      {/* Lightbox modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.prompt} className="max-h-[70vh] w-full object-contain" />
            <div className="bg-[var(--card)] p-4">
              <p className="text-sm font-medium text-[var(--text-body)]">{selectedImage.prompt}</p>
              <div className="mt-2 flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                <span>{selectedImage.model}</span><span>·</span><span>{selectedImage.aspect}</span><span>·</span><span>{selectedImage.quality}</span><span>·</span><span>{selectedImage.time}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => toast({ title: 'Downloaded' })} className="ds-btn ds-btn-primary !h-9 !text-xs"><Download className="size-3.5" /> Download</button>
                <button type="button" onClick={() => { navigator.clipboard?.writeText(selectedImage.prompt); toast({ title: 'Prompt copied' }); }} className="ds-btn ds-btn-secondary !h-9 !text-xs"><Copy className="size-3.5" /> Copy prompt</button>
                <button type="button" onClick={() => setSelectedImage(null)} className="ds-btn ds-btn-secondary !h-9 !text-xs ml-auto">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
