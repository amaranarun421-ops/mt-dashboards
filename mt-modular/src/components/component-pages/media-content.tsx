'use client';
import * as React from 'react';
import {
  Play, Pause, Volume2, Copy, Check, ChevronLeft, ChevronRight, FileText,
  Image as ImageIcon, Film, Download, Share2, Terminal, Maximize2, Star,
  Quote, SkipForward, SkipBack, Heart,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Media & Content) ====================== */
function McStyles() {
  return (
    <style jsx global>{`
      .mc-root {
        --mc-radius-sm: 8px;
        --mc-radius-md: 12px;
        --mc-radius-lg: 16px;
        --mc-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --mc-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --mc-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --mc-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
      }
      .mc-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .mc-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .mc-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      .mc-card-hover {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .mc-card-hover:hover {
        transform: translateY(-2px);
        box-shadow: var(--mc-shadow-lg);
      }
    `}</style>
  );
}

export function MediaContentPage() {
  return (
    <div className="mc-root mc-bg space-y-6">
      <McStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Media & Content' }]} title="Media & Content" description="Carousels, media previews, audio/video players, link previews, code blocks, copy actions" />

      {/* ============================================ CAROUSELS ============================================ */}
      <SectionCard title="Carousels" description="4 variants — Image, Product, Testimonial, Fullscreen">
        <div className="space-y-6">
          <ImageCarouselDemo />
          <div className="mc-divider" />
          <ProductCarouselDemo />
          <div className="mc-divider" />
          <TestimonialCarouselDemo />
        </div>
      </SectionCard>

      {/* ============================================ MEDIA PREVIEW ============================================ */}
      <SectionCard title="Media Preview" description="4 variants — Image, Gallery, File, Video">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Image preview */}
          <div className="mc-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop" alt="" className="aspect-video w-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur"><ImageIcon className="mr-1 inline size-2.5" />IMG</span>
          </div>
          {/* Gallery preview */}
          <div className="mc-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=300&h=200&fit=crop" alt="" className="aspect-video w-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
              <span className="rounded-lg bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur">+12 photos</span>
            </div>
          </div>
          {/* File preview */}
          <div className="mc-card-hover flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] shadow-[var(--mc-shadow-xs)]">
            <FileText className="size-8 text-[var(--color-brand-500)]" strokeWidth={2.5} />
            <span className="text-[10px] font-bold text-[var(--text-muted)]">report.pdf</span>
            <span className="text-[9px] font-medium text-[var(--text-faint)]">2.4 MB</span>
          </div>
          {/* Video preview */}
          <div className="mc-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-xs)]">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop" alt="" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--color-brand-600)] shadow-lg backdrop-blur transition group-hover:scale-110"><Play className="size-4 translate-x-0.5 fill-current" /></span>
            </div>
            <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">3:42</span>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ AUDIO PLAYERS ============================================ */}
      <SectionCard title="Audio Players" description="3 variants — Minimal, Podcast, Waveform">
        <div className="space-y-5">
          {/* Minimal */}
          <div>
            <p className="mc-label mb-2">Minimal</p>
            <div className="flex max-w-md items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--mc-shadow-xs)]">
              <button className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-[var(--mc-shadow-sm)]"><Play className="size-4 translate-x-0.5 fill-current" /></button>
              <div className="flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-strong)]">Cosmic Ambient</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full w-[35%] rounded-full bg-[var(--color-brand-500)]" /></div>
              </div>
              <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--text-muted)]">1:24</span>
            </div>
          </div>
          <div className="mc-divider" />
          {/* Podcast */}
          <div>
            <p className="mc-label mb-2">Podcast</p>
            <div className="flex max-w-lg items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--mc-shadow-xs)]">
              <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=80&h=80&fit=crop" alt="" className="size-12 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text-strong)]">Tech Talk Ep. 42</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">The Future of AI</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold tabular-nums text-[var(--text-muted)]">12:30</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full w-[42%] rounded-full bg-[var(--color-brand-500)]" /></div>
                  <span className="text-[10px] font-bold tabular-nums text-[var(--text-muted)]">29:45</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)]"><SkipBack className="size-4" strokeWidth={2.5} /></button>
                <button className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-[var(--mc-shadow-sm)]"><Play className="size-4 translate-x-0.5 fill-current" /></button>
                <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)]"><SkipForward className="size-4" strokeWidth={2.5} /></button>
              </div>
            </div>
          </div>
          <div className="mc-divider" />
          {/* Waveform */}
          <div>
            <p className="mc-label mb-2">Waveform</p>
            <AudioPlayerDemo />
          </div>
        </div>
      </SectionCard>

      {/* ============================================ VIDEO PLAYERS ============================================ */}
      <SectionCard title="Video Players" description="3 variants — Minimal, Preview, Gallery">
        <div className="space-y-5">
          {/* Minimal */}
          <div>
            <p className="mc-label mb-2">Minimal Video Player</p>
            <div className="relative max-w-2xl overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-sm)]">
              <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=300&fit=crop" alt="Video" className="aspect-video w-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center"><span className="inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-[var(--color-brand-600)] shadow-lg backdrop-blur transition hover:scale-110"><Play className="size-7 translate-x-1 fill-current" /></span></button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white">0:00</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"><div className="h-full w-[15%] rounded-full bg-[var(--color-brand-500)]" /></div>
                  <span className="text-[10px] font-bold text-white">3:42</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mc-divider" />
          {/* Preview gallery */}
          <div>
            <p className="mc-label mb-2">Video Gallery</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=120&fit=crop',
                'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=120&fit=crop',
                'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=120&fit=crop',
              ].map((src, i) => (
                <div key={i} className="mc-card-hover group relative overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-xs)]">
                  <img src={src} alt="" className="aspect-video w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                    <Play className="size-6 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1 py-0.5 text-[9px] font-bold text-white backdrop-blur">{['3:42', '5:18', '2:09'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ CODE BLOCKS ============================================ */}
      <SectionCard title="Code Blocks" description="4 variants — Terminal, Glass, Syntax Highlight, Expandable">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Terminal */}
          <div>
            <p className="mc-label mb-2">Terminal</p>
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--mc-shadow-md)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[var(--color-error-500)]" /><span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" /><span className="size-2.5 rounded-full bg-[var(--color-success-500)]" /></div>
                <Terminal className="size-3.5 text-white/40" strokeWidth={2.5} />
                <span className="font-mono text-[10px] text-white/40">bash — 80x24</span>
              </div>
              <pre className="p-4 text-xs leading-relaxed"><code className="font-mono text-[#f8f8f2]"><span className="text-[#6B7280]">$</span> <span className="text-[#A78BFA]">npm</span> run dev{'\n'}<span className="text-[#6B7280]">→</span> Ready on http://localhost:3000{'\n'}<span className="text-[#6B7280]">→</span> Compiled successfully in 1.2s</code></pre>
            </div>
          </div>
          {/* Glass code block */}
          <div>
            <p className="mc-label mb-2">Glass</p>
            <div className="overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl shadow-[var(--mc-shadow-md)]" style={{ background: 'rgba(12,17,29,0.7)' }}>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="font-mono text-[10px] text-white/40">glass.tsx</span>
                <button className="inline-flex size-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"><Copy className="size-3.5" strokeWidth={2.5} /></button>
              </div>
              <pre className="p-4 text-xs leading-relaxed"><code className="font-mono text-[#f8f8f2]">{`export function Glass() {\n  return <div className="glass" />;\n}`}</code></pre>
            </div>
          </div>
          {/* Syntax highlight */}
          <div className="lg:col-span-2">
            <p className="mc-label mb-2">Syntax Highlight</p>
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--mc-shadow-md)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[var(--color-error-500)]" /><span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" /><span className="size-2.5 rounded-full bg-[var(--color-success-500)]" /></div><span className="font-mono text-[10px] text-white/40">example.tsx</span></div>
                <button className="inline-flex size-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/10 hover:text-white"><Copy className="size-3.5" strokeWidth={2.5} /></button>
              </div>
              <pre className="overflow-x-auto p-4 text-xs leading-relaxed"><code className="font-mono"><span className="text-[#C678DD]">import</span> <span className="text-[#E5C07B]">{'{ Button }'}</span> <span className="text-[#C678DD]">from</span> <span className="text-[#98C379]">'@mtverse/ui'</span>;{'\n\n'}<span className="text-[#C678DD]">export function</span> <span className="text-[#61AFEF]">Example</span>() {'{'}{'\n'}  <span className="text-[#C678DD]">return</span> <span className="text-[#E06C75]">&lt;Button</span> <span className="text-[#D19A66]">variant</span>=<span className="text-[#98C379]">"primary"</span><span className="text-[#E06C75]">&gt;</span>Click me<span className="text-[#E06C75]">&lt;/Button&gt;</span>;{'\n'}{'}'}</code></pre>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ COPY ACTIONS ============================================ */}
      <SectionCard title="Copy Actions" description="4 variants — Copy Button, Copy Input, Code Copy, Share Copy">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CopyButtonDemo />
          <CopyInputDemo />
          <CodeCopyDemo />
          <ShareCopyDemo />
        </div>
      </SectionCard>
    </div>
  );
}

function ImageCarouselDemo() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=250&fit=crop', label: 'Mountains' },
    { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&h=250&fit=crop', label: 'Cats' },
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=250&fit=crop', label: 'Forest' },
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div>
      <p className="mc-label mb-2">Image Carousel</p>
      <div className="relative max-w-2xl overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--mc-shadow-sm)]">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {images.map(img => (
            <div key={img.label} className="relative w-full shrink-0">
              <img src={img.url} alt={img.label} className="h-56 w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-medium text-white">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setIdx((idx - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--text-strong)] shadow-md backdrop-blur transition hover:scale-110"><ChevronLeft className="size-4" strokeWidth={2.5} /></button>
        <button onClick={() => setIdx((idx + 1) % images.length)} className="absolute right-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--text-strong)] shadow-md backdrop-blur transition hover:scale-110"><ChevronRight className="size-4" strokeWidth={2.5} /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">{images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={cn('h-1.5 rounded-full transition-all', i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50')} />)}</div>
      </div>
    </div>
  );
}

function ProductCarouselDemo() {
  const products = [
    { name: 'Headphones', price: '$349', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { name: 'Watch', price: '$299', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { name: 'Camera', price: '$899', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop' },
    { name: 'Speaker', price: '$199', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop' },
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div>
      <p className="mc-label mb-2">Product Carousel</p>
      <div className="relative max-w-2xl">
        <div className="flex gap-3 overflow-hidden">
          {products.map((p, i) => (
            <div key={p.name} className={cn('mc-card-hover w-44 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--mc-shadow-xs)] transition-all', i < idx && '-translate-x-full opacity-0 pointer-events-none', i > idx + 1 && 'translate-x-full opacity-0 pointer-events-none')}>
              <img src={p.img} alt={p.name} className="aspect-square w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium text-[var(--text-strong)]">{p.name}</p>
                <p className="text-sm font-semibold text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex size-8 items-center justify-center rounded-full bg-[var(--card)] text-[var(--text-strong)] shadow-md border border-[var(--border)] transition hover:scale-110 disabled:opacity-40"><ChevronLeft className="size-4" strokeWidth={2.5} /></button>
        <button onClick={() => setIdx(Math.min(products.length - 2, idx + 1))} disabled={idx >= products.length - 2} className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex size-8 items-center justify-center rounded-full bg-[var(--card)] text-[var(--text-strong)] shadow-md border border-[var(--border)] transition hover:scale-110 disabled:opacity-40"><ChevronRight className="size-4" strokeWidth={2.5} /></button>
      </div>
    </div>
  );
}

function TestimonialCarouselDemo() {
  const testimonials = [
    { quote: 'This product transformed our workflow. We ship 3x faster now.', name: 'Sara Nguyen', role: 'CTO, Acme', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50' },
    { quote: 'The best UI library we have ever used. Premium quality out of the box.', name: 'James Park', role: 'Lead Dev, TechCorp', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50' },
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div>
      <p className="mc-label mb-2">Testimonial Carousel</p>
      <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--mc-shadow-sm)]">
        <Quote className="size-8 text-[var(--color-brand-500)]/30" strokeWidth={2.5} />
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {testimonials.map(t => (
            <div key={t.name} className="w-full shrink-0">
              <p className="mt-3 text-base font-medium text-[var(--text-strong)]">{t.quote}</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={t.avatar} alt="" className="size-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{t.name}</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-1.5">{testimonials.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={cn('h-1.5 rounded-full transition-all', i === idx ? 'w-6 bg-[var(--color-brand-500)]' : 'w-1.5 bg-[var(--border-strong)]')} />)}</div>
      </div>
    </div>
  );
}

function AudioPlayerDemo() {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(35);
  React.useEffect(() => { if (!playing) return; const i = setInterval(() => setProgress(p => p >= 100 ? (setPlaying(false), 0) : p + 0.5), 100); return () => clearInterval(i); }, [playing]);
  return (
    <div className="flex max-w-lg items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--mc-shadow-xs)]">
      <button onClick={() => setPlaying(!playing)} className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-md transition hover:scale-105">
        {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 translate-x-0.5 fill-current" />}
      </button>
      <div className="flex-1">
        <p className="truncate text-sm font-medium text-[var(--text-strong)]">Cosmic Ambient — Track 03</p>
        <div className="mt-2 flex items-center gap-1">{Array.from({ length: 40 }).map((_, i) => { const isPast = (i / 40) * 100 < progress; const h = 4 + Math.abs(Math.sin(i * 0.5)) * 12; return <div key={i} className={cn('flex-1 rounded-full transition-colors', isPast ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--border-strong)]')} style={{ height: `${h}px` }} />; })}</div>
      </div>
      <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--text-muted)]">{Math.floor(progress * 0.03)}:{String(Math.floor(progress * 1.8) % 60).padStart(2, '0')}</span>
    </div>
  );
}

function CopyButtonDemo() {
  const [copied, setCopied] = React.useState(false);
  return (
    <div>
      <p className="mc-label mb-2">Copy Button</p>
      <button onClick={() => { navigator.clipboard?.writeText('Hello World'); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={cn('inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium transition', copied ? 'bg-[var(--color-success-500)] text-white' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]')}>
        {copied ? <><Check className="size-4" strokeWidth={2.5} /> Copied!</> : <><Copy className="size-4" strokeWidth={2.5} /> Copy text</>}
      </button>
    </div>
  );
}

function CopyInputDemo() {
  const [copied, setCopied] = React.useState(false);
  return (
    <div>
      <p className="mc-label mb-2">Copy Input</p>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-2 shadow-[var(--mc-shadow-xs)]">
        <span className="flex-1 truncate px-2 font-mono text-sm text-[var(--text-body)]">sk-ant-api03-9a8b7c6d</span>
        <button onClick={() => { navigator.clipboard?.writeText('sk-ant-api03-9a8b7c6d'); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={cn('inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition', copied ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]')}>
          {copied ? <><Check className="size-3.5" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3.5" strokeWidth={2.5} /> Copy</>}
        </button>
      </div>
    </div>
  );
}

function CodeCopyDemo() {
  const [copied, setCopied] = React.useState(false);
  const code = 'npm install @mtverse/ui';
  return (
    <div>
      <p className="mc-label mb-2">Code Copy</p>
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--mc-shadow-xs)]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <span className="font-mono text-[10px] text-white/40">terminal</span>
          <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-1 rounded text-[10px] font-bold text-white/60 transition hover:text-white">
            {copied ? <><Check className="size-3" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3" strokeWidth={2.5} /> Copy</>}
          </button>
        </div>
        <pre className="px-3 py-2.5"><code className="font-mono text-xs text-[#f8f8f2]"><span className="text-[#6B7280]">$</span> {code}</code></pre>
      </div>
    </div>
  );
}

function ShareCopyDemo() {
  const [copied, setCopied] = React.useState(false);
  const url = 'mtverse.io/p/1428';
  return (
    <div>
      <p className="mc-label mb-2">Share Copy</p>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--mc-shadow-xs)]">
        <Share2 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
        <span className="flex-1 truncate text-sm font-medium text-[var(--text-body)]">{url}</span>
        <button onClick={() => { navigator.clipboard?.writeText('https://' + url); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={cn('inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition', copied ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]')}>
          {copied ? <><Check className="size-3.5" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3.5" strokeWidth={2.5} /> Copy link</>}
        </button>
      </div>
    </div>
  );
}
