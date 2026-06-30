'use client';

import * as React from 'react';
import {
  Play,
  Share2,
  ChevronDown,
  Mic,
  Video,
  Download,
  RefreshCw,
  Sparkles,
  Send,
  Volume2,
  Film,
  Proportions,
  Clock,
  Gauge,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ActionSelect } from './action-select';

interface GeneratedVideo {
  id: string;
  thumbnail: string;
  prompt: string;
  model: string;
  duration: string;
  aspect: string;
  quality: string;
  audio: boolean;
  time: string;
  isExample?: boolean;
}

// Example videos shown by default on page load
const EXAMPLE_VIDEOS: GeneratedVideo[] = [
  {
    id: 'ex-v1',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop',
    prompt: 'Cinematic drone shot flying over snow-capped mountains at sunset, golden light breaking through clouds',
    model: 'Google Veo 3.1',
    duration: '10s',
    aspect: '3:4',
    quality: '2K',
    audio: true,
    time: '2:14 PM',
    isExample: true,
  },
  {
    id: 'ex-v2',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&h=900&fit=crop',
    prompt: 'Slow motion ocean waves crashing against rocky cliffs at golden hour',
    model: 'OpenAI Sora',
    duration: '5s',
    aspect: '1:1',
    quality: '4K',
    audio: true,
    time: '11:42 AM',
    isExample: true,
  },
  {
    id: 'ex-v3',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=1200&fit=crop',
    prompt: 'Time-lapse of misty forest at dawn with sunbeams cutting through the trees',
    model: 'Runway Gen-3',
    duration: '15s',
    aspect: '3:4',
    quality: '2K',
    audio: false,
    time: 'Yesterday',
    isExample: true,
  },
];

const VIDEO_THUMBS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&h=1100&fit=crop',
];

const MODELS = [
  { id: 'veo-3.1', label: 'Google Veo 3.1', badge: 'NEW', isGoogle: true },
  { id: 'sora', label: 'OpenAI Sora', badge: '', isGoogle: false },
  { id: 'runway-gen3', label: 'Runway Gen-3', badge: '', isGoogle: false },
  { id: 'pika-1.5', label: 'Pika 1.5', badge: '', isGoogle: false },
  { id: 'kling', label: 'Kling AI', badge: '', isGoogle: false },
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

const DURATIONS = [
  { value: '5s', label: '5 seconds' },
  { value: '10s', label: '10 seconds' },
  { value: '15s', label: '15 seconds' },
  { value: '30s', label: '30 seconds' },
];

export function AIVideoGeneratorPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressStage, setProgressStage] = React.useState('');
  // Initialize with example videos so the page never looks empty
  const [gallery, setGallery] = React.useState<GeneratedVideo[]>(EXAMPLE_VIDEOS);
  const [model, setModel] = React.useState(MODELS[0]);
  const [duration, setDuration] = React.useState('10s');
  const [aspect, setAspect] = React.useState('3:4');
  const [quality, setQuality] = React.useState('2K');
  const [audio, setAudio] = React.useState(true);
  const [selectedVideo, setSelectedVideo] = React.useState<GeneratedVideo | null>(null);
  const [showModelMenu, setShowModelMenu] = React.useState(false);
  const modelMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) setShowModelMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleGenerate() {
    if (!prompt.trim()) {
      toast({ title: 'Enter a prompt', description: 'Describe the video you want to generate', variant: 'destructive' });
      return;
    }
    setGenerating(true);
    setProgress(0);
    const stages = ['Analyzing prompt...', 'Generating keyframes...', 'Rendering motion...', 'Adding audio...', 'Upscaling...', 'Finalizing...'];
    let stageIdx = 0;
    setProgressStage(stages[0]);

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
        const newStage = Math.floor((next / 100) * stages.length);
        if (newStage !== stageIdx && newStage < stages.length) {
          stageIdx = newStage;
          setProgressStage(stages[newStage]);
        }
        if (next >= 100) { clearInterval(interval); return 100; }
        return next;
      });
    }, 120);

    setTimeout(() => {
      setGenerating(false);
      const newVideo: GeneratedVideo = {
        id: Date.now().toString(),
        thumbnail: VIDEO_THUMBS[Math.floor(Math.random() * VIDEO_THUMBS.length)],
        prompt: prompt.trim(),
        model: model.label,
        duration, aspect, quality, audio,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setGallery((prev) => [newVideo, ...prev]);
      toast({ title: 'Video generated', description: `${duration} ${aspect} video with ${model.label}` });
    }, 120 * 50 + 100);
  }

  const aspectClass =
    aspect === '1:1' ? 'aspect-square' :
    aspect === '3:4' ? 'aspect-[3/4]' :
    aspect === '4:3' ? 'aspect-[4/3]' :
    aspect === '16:9' ? 'aspect-video' :
    'aspect-[9/16]';

  return (
    <div className="flex h-[calc(100vh-74px)] flex-col overflow-hidden bg-[var(--background)]">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--card)] px-4 sm:px-6">
        <div className="relative">
          <button type="button" className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--text-strong)] transition hover:bg-[var(--surface-sunken)]">
            Simple responsive login
            <ChevronDown className="size-4 text-[var(--text-muted)]" />
          </button>
        </div>
        <button type="button" onClick={() => toast({ title: 'Share link copied', description: 'Anyone with the link can view this video' })} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
          <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto modern-scrollbar">
        <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-start px-4 py-8 sm:px-6">
          {generating ? (
            <div className={cn('w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--surface-sunken)]', aspectClass)}>
              <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] dark:from-[rgba(70,95,255,0.1)] dark:to-[rgba(70,95,255,0.05)]">
                <Film className="size-8 animate-pulse text-[var(--color-brand-500)]" />
                <p className="text-sm font-medium text-[var(--text-body)]">{progressStage}</p>
                <p className="text-xs font-normal text-[var(--text-muted)]">{progress}% · {duration} · {quality}</p>
                <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-[var(--border-strong)]">
                  <div className="h-full rounded-full bg-[var(--color-brand-500)] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          ) : gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] text-[var(--color-brand-500)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(70,95,255,0.08)]">
                <Video className="size-7" strokeWidth={1.8} />
              </div>
              <p className="mt-5 text-lg font-semibold text-[var(--text-strong)]">Create your first video</p>
              <p className="mt-1.5 max-w-sm text-sm font-normal text-[var(--text-muted)]">Describe what you want to see and hit send. Your generated videos will appear here.</p>
            </div>
          ) : (
            /* Latest video — large preview */
            <div className="w-full max-w-sm">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-md)]">
                <div className={cn('overflow-hidden bg-black', aspectClass)}>
                  <img src={gallery[0].thumbnail} alt={gallery[0].prompt} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                {/* Play button overlay */}
                <button type="button" onClick={() => setSelectedVideo(gallery[0])} className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition group-hover:bg-black/20" aria-label="Play video">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-white/95 text-[var(--color-brand-600)] shadow-lg backdrop-blur transition group-hover:scale-110">
                    <Play className="size-7 translate-x-0.5 fill-current" />
                  </span>
                </button>
                {/* Top badges */}
                <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                  <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">{gallery[0].aspect}</span>
                  <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">{gallery[0].model}</span>
                  {gallery[0].isExample && (
                    <span className="rounded-md bg-[var(--color-brand-500)] px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">EXAMPLE</span>
                  )}
                </div>
                {/* Bottom info */}
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg-black/60 px-2.5 py-1 backdrop-blur">
                  <span className="text-[10px] font-medium text-white">{gallery[0].duration} · {gallery[0].quality}</span>
                  <div className="flex items-center gap-1.5">
                    {gallery[0].audio && <Volume2 className="size-3 text-white/80" />}
                    <span className="text-[10px] font-medium text-white/80">{gallery[0].time}</span>
                  </div>
                </div>
                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                  <span className="pointer-events-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" onClick={() => toast({ title: 'Downloading MP4...' })}>
                    <Download className="size-4" />
                  </span>
                  <span className="pointer-events-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-[var(--text-strong)] shadow-md transition hover:bg-white" onClick={() => { setPrompt(gallery[0].prompt); toast({ title: 'Prompt loaded' }); }}>
                    <RefreshCw className="size-4" />
                  </span>
                </div>
              </div>
              {/* Caption — consistent line-height */}
              <p className="mt-4 line-clamp-2 text-center text-sm font-normal leading-relaxed text-[var(--text-body)]">{gallery[0].prompt}</p>
              <p className="mt-1.5 text-center text-xs font-normal text-[var(--text-subtle)]">{gallery[0].time} · {gallery[0].duration}</p>
            </div>
          )}

          {/* Gallery strip — older videos */}
          {gallery.length > 1 && (
            <div className="mt-10 w-full max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">Earlier in this conversation</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.slice(1).map((vid) => (
                  <button key={vid.id} type="button" onClick={() => setSelectedVideo(vid)} className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:border-[var(--color-brand-400)]">
                    <img src={vid.thumbnail} alt={vid.prompt} className="size-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                      <Play className="size-5 fill-white text-white" />
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1 py-0.5 text-[9px] font-semibold text-white backdrop-blur">{vid.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom — Prompt input + action bar */}
      <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--card)] px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-2xl">
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
            {/* Action bar — single flex row, consistent gap-2 */}
            <div className="flex flex-wrap items-center gap-2 px-3 pb-2.5 pt-1">
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

              {/* Duration — dropdown */}
              <ActionSelect
                value={duration}
                options={DURATIONS}
                onChange={(v) => setDuration(v)}
                icon={Clock}
                ariaLabel="Duration"
                title="Video duration"
                menuWidth="w-40"
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

              {/* Audio toggle */}
              <button type="button" onClick={() => setAudio((p) => !p)} data-active={audio} className={cn('inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition', audio ? 'border-[var(--color-brand-400)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')} title="Toggle audio">
                <Volume2 className="size-3.5" />
                <span>Audio</span>
              </button>

              {/* Model dropdown — pushed to right with ml-auto */}
              <div className="relative ml-auto" ref={modelMenuRef}>
                <button type="button" onClick={() => setShowModelMenu((p) => !p)} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
                  {model.isGoogle ? <GoogleLogo className="size-3.5" /> : <Sparkles className="size-3.5 text-[var(--color-brand-500)]" />}
                  {model.label}
                  {model.badge && <span className="rounded bg-[var(--color-success-50)] px-1 py-0.5 text-[8px] font-semibold uppercase text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">{model.badge}</span>}
                  <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
                </button>
                {showModelMenu && (
                  <div className="absolute bottom-full right-0 z-50 mb-1 w-56 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
                    <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Video models</p>
                    {MODELS.map((m) => (
                      <button key={m.id} type="button" onClick={() => { setModel(m); setShowModelMenu(false); }} className={cn('flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition', model.id === m.id ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                        {m.isGoogle ? <GoogleLogo className="size-4" /> : <Sparkles className="size-4 text-[var(--color-brand-500)]" />}
                        <span className="flex-1">{m.label}</span>
                        {m.badge && <span className="rounded bg-[var(--color-success-50)] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">{m.badge}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Send button */}
              <button type="button" onClick={handleGenerate} disabled={generating || !prompt.trim()} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Generate video" title="Generate (Enter)">
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

      {/* Video player modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setSelectedVideo(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={cn('relative bg-black', aspectClass)}>
              <img src={selectedVideo.thumbnail} alt={selectedVideo.prompt} className="size-full object-cover" />
              <button type="button" className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex size-16 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[var(--color-brand-600)] shadow-lg">
                  <Play className="size-7 translate-x-0.5 fill-current" />
                </span>
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur">
                <Play className="size-3.5 text-white" />
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-0 rounded-full bg-[var(--color-brand-400)]" />
                </div>
                <span className="text-xs font-medium text-white">0:00 / 0:{selectedVideo.duration.replace('s', '')}</span>
              </div>
            </div>
            <div className="bg-[var(--card)] p-4">
              <p className="text-sm font-medium text-[var(--text-body)]">{selectedVideo.prompt}</p>
              <div className="mt-2 flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                <span>{selectedVideo.model}</span><span>·</span><span>{selectedVideo.duration}</span><span>·</span><span>{selectedVideo.aspect}</span><span>·</span><span>{selectedVideo.quality}</span><span>·</span><span>{selectedVideo.time}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => toast({ title: 'Downloading MP4...' })} className="ds-btn ds-btn-primary !h-9 !text-xs"><Download className="size-3.5" /> Download MP4</button>
                <button type="button" onClick={() => setSelectedVideo(null)} className="ds-btn ds-btn-secondary !h-9 !text-xs ml-auto">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Inline Google logo SVG ---------- */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
