'use client';
import * as React from 'react';
import {
  Info, ChevronDown, Edit3, Copy, Share2, Trash2, Bell, User, Settings,
  X, ArrowRight, Check, Search, Filter, Download, Heart, Bookmark,
  Sparkles, Star,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Overlay & Interactive) ====================== */
function OiStyles() {
  return (
    <style jsx global>{`
      .oi-root {
        --oi-radius-sm: 8px;
        --oi-radius-md: 12px;
        --oi-radius-lg: 16px;
        --oi-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --oi-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --oi-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --oi-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --oi-shadow-xl: 0 20px 32px -8px rgba(15,23,42,0.12), 0 8px 16px -8px rgba(15,23,42,0.06);
      }
      .oi-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .oi-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .oi-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--oi-radius-md);
        font-size: 0.8125rem;
        font-weight: 600;
        transition: all 0.18s ease;
        cursor: pointer;
        white-space: nowrap;
      }
      .oi-btn-primary {
        background: linear-gradient(180deg, var(--color-brand-500), var(--color-brand-600));
        color: white;
        box-shadow: var(--oi-shadow-sm), inset 0 1px 0 rgba(255,255,255,0.18);
      }
      .oi-btn-primary:hover { transform: translateY(-1px); box-shadow: var(--oi-shadow-md); }
      .oi-btn-secondary {
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--oi-shadow-xs);
      }
      .oi-btn-secondary:hover { background: var(--surface-sunken); border-color: var(--border-strong); }
      .oi-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      @keyframes oi-fade-in {
        from { opacity: 0; transform: translateY(-4px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .oi-fade-in { animation: oi-fade-in 0.16s ease-out; transform-origin: top; }
      @keyframes oi-slide-up {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .oi-slide-up { animation: oi-slide-up 0.25s ease-out; }
    `}</style>
  );
}

export function OverlayInteractivePage() {
  return (
    <div className="oi-root oi-bg space-y-6">
      <OiStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Overlay & Interactive' }]} title="Overlay & Interactive" description="Tooltips, popovers, scroll areas, sticky bars" />

      {/* ============================================ TOOLTIPS ============================================ */}
      <SectionCard title="Tooltips" description="4 variants — Minimal, Rich, Interactive, Command">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <TooltipDemo label="Minimal" content="Simple tooltip" variant="minimal" />
            <TooltipDemo label="Rich" content="Rich tooltip with icon and description" variant="rich" />
            <TooltipDemo label="Interactive" content="Hover to see details" variant="interactive" />
            <TooltipDemo label="Command" content="Press ⌘K to open" variant="command" />
          </div>
        </div>
      </SectionCard>

      {/* ============================================ POPOVERS ============================================ */}
      <SectionCard title="Popovers" description="4 variants — Action, Profile, Share, Rich Content">
        <div className="flex flex-wrap gap-6">
          <PopoverDemo label="Action Popover" content={
            <div className="p-1 w-48">
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><Edit3 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Edit</button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><Copy className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Duplicate</button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><Share2 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Share</button>
              <div className="my-1 h-px bg-[var(--border-subtle)]" />
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--color-error-600)] transition hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]"><Trash2 className="size-4" strokeWidth={2.5} /> Delete</button>
            </div>
          } />
          <PopoverDemo label="Profile Popover" content={
            <div className="w-64">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] p-3">
                <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">Sara Nguyen</p>
                  <p className="truncate text-xs font-medium text-[var(--text-muted)]">sara@mtverse.io</p>
                </div>
              </div>
              <div className="p-1">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><User className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> View Profile</button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><Settings className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Settings</button>
              </div>
            </div>
          } />
          <PopoverDemo label="Share Popover" content={
            <div className="w-64 p-3">
              <p className="oi-label mb-2">Share to</p>
              <div className="grid grid-cols-4 gap-2">
                {['Twitter', 'LinkedIn', 'Facebook', 'Copy'].map(s => (
                  <button key={s} className="flex flex-col items-center gap-1 rounded-lg p-2 transition hover:bg-[var(--surface-sunken)]">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Share2 className="size-4" strokeWidth={2.5} /></span>
                    <span className="text-[9px] font-bold text-[var(--text-muted)]">{s}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] p-1.5">
                <span className="flex-1 truncate px-1 text-xs font-medium text-[var(--text-body)]">mtverse.io/p/1428</span>
                <button className="oi-btn oi-btn-primary h-7 px-2 text-[10px]">Copy</button>
              </div>
            </div>
          } />
          <PopoverDemo label="Rich Content" content={
            <div className="w-72">
              <div className="relative h-20 bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8]">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=80&fit=crop" alt="" className="h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 flex items-center p-3">
                  <p className="text-sm font-medium text-white">Team Acme</p>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-[var(--text-muted)]">12 members · Pro plan</p>
                <button className="oi-btn oi-btn-primary mt-2 w-full h-8 text-xs">View Team</button>
              </div>
            </div>
          } />
        </div>
      </SectionCard>

      {/* ============================================ SCROLL AREAS ============================================ */}
      <SectionCard title="Scroll Areas" description="3 variants — Custom Scroll, Glass, Chat">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Custom scroll */}
          <div>
            <p className="oi-label mb-2">Custom Scroll</p>
            <div className="h-40 overflow-y-auto modern-scrollbar rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-4 shadow-[var(--oi-shadow-xs)]">
              {Array.from({ length: 12 }).map((_, i) => <p key={i} className="mb-2 text-sm font-medium text-[var(--text-body)]">Item #{i + 1} — Custom scrollbar</p>)}
            </div>
          </div>
          {/* Glass scroll */}
          <div>
            <p className="oi-label mb-2">Glass Scroll</p>
            <div className="h-40 overflow-y-auto modern-scrollbar rounded-xl border border-white/10 p-4 backdrop-blur-xl shadow-[var(--oi-shadow-xs)]" style={{ background: 'linear-gradient(135deg, rgba(70,95,255,0.06), rgba(122,90,248,0.04))' }}>
              {Array.from({ length: 12 }).map((_, i) => <p key={i} className="mb-2 text-sm font-medium text-[var(--text-body)]">Item #{i + 1} — Glass background</p>)}
            </div>
          </div>
          {/* Chat scroll */}
          <div>
            <p className="oi-label mb-2">Chat Scroll</p>
            <div className="flex h-40 flex-col overflow-y-auto modern-scrollbar rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--oi-shadow-xs)]">
              {[
                { from: 'them', text: 'Hey there!' },
                { from: 'me', text: 'Hi! How are you?' },
                { from: 'them', text: 'Doing great. Working on the new UI.' },
                { from: 'me', text: 'Awesome! Can\'t wait to see it.' },
                { from: 'them', text: 'Almost done. Will share soon.' },
              ].map((msg, i) => (
                <div key={i} className={cn('mb-2 flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                  <span className={cn('max-w-[80%] rounded-xl px-2.5 py-1 text-xs font-medium', msg.from === 'me' ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-body)]')}>{msg.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ STICKY BARS ============================================ */}
      <SectionCard title="Sticky Bars" description="3 variants — Action Bar, Mobile, Floating Bottom">
        <div className="space-y-4">
          {/* Action bar */}
          <div>
            <p className="oi-label mb-2">Action Bar (bulk actions)</p>
            <div className="rounded-xl border border-[var(--color-brand-300)] bg-[var(--color-brand-50)] p-4 shadow-[var(--oi-shadow-md)] dark:border-[rgba(70,95,255,0.24)] dark:bg-[rgba(70,95,255,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white text-sm font-medium">3</span>
                  <p className="text-sm font-medium text-[var(--text-strong)]">3 items selected</p>
                </div>
                <div className="flex gap-2">
                  <button className="oi-btn oi-btn-secondary h-8 px-3 text-xs"><Download className="size-3.5" strokeWidth={2.5} /> Export</button>
                  <button className="oi-btn oi-btn-secondary h-8 px-3 text-xs"><Share2 className="size-3.5" strokeWidth={2.5} /> Share</button>
                  <button className="oi-btn h-8 px-3 text-xs bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)]"><Trash2 className="size-3.5" strokeWidth={2.5} /> Delete</button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile sticky bar */}
          <div>
            <p className="oi-label mb-2">Mobile Bottom Bar</p>
            <div className="mx-auto flex max-w-sm items-center justify-around rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--oi-shadow-lg)]">
              {[
                { icon: Search, label: 'Search', active: false },
                { icon: Heart, label: 'Saved', active: true },
                { icon: Bell, label: 'Alerts', active: false },
                { icon: User, label: 'Profile', active: false },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i} className={cn('flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 transition', item.active ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-muted)]')}>
                    <Icon className="size-5" strokeWidth={2.5} />
                    <span className="text-[9px] font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Floating bottom bar */}
          <div>
            <p className="oi-label mb-2">Floating Bottom Bar</p>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--oi-shadow-xl)]">
              <button className="oi-btn oi-btn-secondary h-9 px-4 text-xs"><Check className="size-3.5" strokeWidth={2.5} /> Accept</button>
              <button className="oi-btn oi-btn-secondary h-9 px-4 text-xs"><X className="size-3.5" strokeWidth={2.5} /> Decline</button>
              <div className="h-6 w-px bg-[var(--border)]" />
              <button className="oi-btn oi-btn-primary h-9 px-4 text-xs">Next <ArrowRight className="size-3.5" strokeWidth={2.5} /></button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function TooltipDemo({ label, content, variant }: { label: string; content: string; variant: 'minimal' | 'rich' | 'interactive' | 'command' }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button className="oi-btn oi-btn-secondary h-10 px-4">{label}</button>
      {show && (
        <div className="oi-fade-in absolute bottom-full left-1/2 mb-2 -translate-x-1/2 z-50">
          {variant === 'minimal' && (
            <div className="whitespace-nowrap rounded-lg bg-[#1d2939] px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-[var(--gray-900)]">{content}</div>
          )}
          {variant === 'rich' && (
            <div className="w-56 rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 shadow-[var(--oi-shadow-lg)]">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-[var(--color-brand-500)]" strokeWidth={2.5} />
                <div>
                  <p className="text-xs font-medium text-[var(--text-strong)]">{label} Tooltip</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{content}</p>
                </div>
              </div>
            </div>
          )}
          {variant === 'interactive' && (
            <div className="w-60 rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 shadow-[var(--oi-shadow-lg)]">
              <p className="text-xs font-medium text-[var(--text-strong)]">Interactive Tip</p>
              <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{content}</p>
              <button className="mt-2 text-[10px] font-bold text-[var(--color-brand-500)] hover:underline">Learn more →</button>
            </div>
          )}
          {variant === 'command' && (
            <div className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--popover)] px-3 py-2 shadow-[var(--oi-shadow-lg)]">
              <kbd className="rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">⌘K</kbd>
              <span className="text-xs font-medium text-[var(--text-strong)]">{content}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PopoverDemo({ label, content }: { label: string; content: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="oi-btn oi-btn-secondary h-10 px-4">{label}<ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} strokeWidth={2.5} /></button>
      {open && <div className="oi-fade-in absolute top-full left-0 z-50 mt-1.5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--oi-shadow-lg)]">{content}</div>}
    </div>
  );
}
