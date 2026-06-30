'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  AlertTriangle,
  Bell,
  Bold,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Edit3,
  Eye,
  Heart,
  Info,
  Italic,
  Mail,
  MoreHorizontal,
  Plus,
  Settings,
  Share2,
  Trash2,
  Underline,
  X,
  XCircle,
  Star,
  Upload,
  File as FileIcon,
  Command as CommandIcon,
  Search,
  Loader2,
  Zap,
  Lock,
  ArrowUp,
  ArrowDown,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, UserAvatar, Tabs, ProgressBar, Sparkline } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { Tooltip, Popover, Breadcrumb, Chip, Divider } from '@/components/dashboard/extra-primitives';
import { cn } from '@/lib/utils';

export function UIElementsPage() {
  const [tab, setTab] = React.useState('overview');
  const [switchOn, setSwitchOn] = React.useState(true);
  const [slider, setSlider] = React.useState(60);
  const [input, setInput] = React.useState('Placeholder text');
  const [textarea, setTextarea] = React.useState('');
  const [checkbox, setCheckbox] = React.useState(true);
  const [radio, setRadio] = React.useState('option-a');
  const [selectVal, setSelectVal] = React.useState('a');
  const [chips, setChips] = React.useState(['React', 'Next.js', 'TypeScript', 'Tailwind']);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: 'Components' }, { label: 'UI Elements' }]}
        title="UI Elements"
        description="Comprehensive component library — 10 categories covering every UI element you need."
      />

      {/* Category headers — sidebar scrolls to these */}
      <div data-category-header="1" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">1</span>
        <h2 className="ds-section-title text-lg">Forms & Inputs</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Buttons, inputs, selects, switches, sliders, ratings, file upload</span>
      </div>

      {/* Buttons */}
      <SectionCard title="Buttons" description="Variants, sizes, and states with hover/focus polish">
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Variants</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="ds-btn ds-btn-primary"><Plus className="size-4" />Primary</button>
              <button type="button" className="ds-btn ds-btn-secondary">Secondary</button>
              <button type="button" className="ds-btn ds-btn-ghost">Ghost</button>
              <button type="button" className="ds-btn bg-[var(--color-success-600)] text-white hover:bg-[var(--color-success-700)]"><Check className="size-4" />Success</button>
              <button type="button" className="ds-btn bg-[var(--color-warning-600)] text-white hover:bg-[var(--color-warning-700)]"><AlertTriangle className="size-4" />Warning</button>
              <button type="button" className="ds-btn bg-[var(--color-error-600)] text-white hover:bg-[var(--color-error-700)]"><Trash2 className="size-4" />Destructive</button>
              <button type="button" className="ds-btn ds-btn-primary" disabled>Disabled</button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="ds-btn ds-btn-primary !h-9 !px-3 !text-xs">Small</button>
              <button type="button" className="ds-btn ds-btn-primary">Default</button>
              <button type="button" className="ds-btn ds-btn-primary !h-12 !px-6 !text-base">Large</button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Icon buttons</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="ds-btn-icon" aria-label="Notifications"><Bell className="size-4" /></button>
              <button type="button" className="ds-btn-icon" aria-label="Edit"><Edit3 className="size-4" /></button>
              <button type="button" className="ds-btn-icon" aria-label="Share"><Share2 className="size-4" /></button>
              <button type="button" className="ds-btn-icon" aria-label="Copy"><Copy className="size-4" /></button>
              <button type="button" className="ds-btn-icon" aria-label="Settings"><Settings className="size-4" /></button>
              <button type="button" className="ds-btn-icon" aria-label="Delete"><Trash2 className="size-4" /></button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Button with icon + loader</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="ds-btn ds-btn-primary">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Loading...
              </button>
              <button type="button" className="ds-btn ds-btn-secondary">
                <Download className="size-4" /> Download
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Badges & Chips */}
      <SectionCard title="Badges, Status & Chips" description="Tone variations for status, labels, and dismissible chips">
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Status badges</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="success" dot>Success</StatusBadge>
              <StatusBadge tone="warning" dot>Warning</StatusBadge>
              <StatusBadge tone="error" dot>Error</StatusBadge>
              <StatusBadge tone="info" dot>Info</StatusBadge>
              <StatusBadge tone="brand" dot>Brand</StatusBadge>
              <StatusBadge tone="neutral">Neutral</StatusBadge>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Status dots</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-body)]"><span className="ds-dot ds-dot-success" />Online</span>
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-body)]"><span className="ds-dot ds-dot-warning" />Away</span>
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-body)]"><span className="ds-dot ds-dot-error" />Busy</span>
              <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-body)]"><span className="ds-dot ds-dot-neutral" />Offline</span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Dismissible chips</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <Chip key={c} onDismiss={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>
              ))}
              {chips.length === 0 && <span className="text-sm text-[var(--text-muted)]">All chips removed. Refresh to restore.</span>}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Tone chips</p>
            <div className="flex flex-wrap gap-2">
              <Chip tone="brand">Brand</Chip>
              <Chip tone="success">Success</Chip>
              <Chip tone="warning">Warning</Chip>
              <Chip tone="error">Error</Chip>
              <Chip tone="info">Info</Chip>
              <Chip tone="neutral">Neutral</Chip>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Form inputs */}
      <SectionCard title="Form Inputs" description="Text fields, selects, checkboxes, radios, switches, sliders">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">Text input</span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="ds-input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">Email with icon</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
              <input type="email" placeholder="you@example.com" className="ds-input pl-9" />
            </div>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">Textarea</span>
            <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} rows={4} placeholder="Tell us more about your project..." className="ds-input resize-none py-2.5 leading-relaxed" />
          </label>
          <div className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">Select (custom)</span>
            <Select
              value={selectVal}
              onChange={setSelectVal}
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
                { value: 'c', label: 'Option C' },
              ]}
            />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">Disabled input</span>
            <input type="text" value="Read only" disabled className="ds-input opacity-60" />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-strong)]">Switch</p>
            <button
              type="button"
              role="switch"
              aria-checked={switchOn}
              onClick={() => setSwitchOn(!switchOn)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                switchOn ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--surface-sunken)]',
              )}
            >
              <span className={cn('inline-block size-5 transform rounded-full bg-white shadow transition-transform', switchOn ? 'translate-x-5' : 'translate-x-0.5')} />
            </button>
            <span className="ml-3 text-sm font-medium text-[var(--text-body)]">{switchOn ? 'On' : 'Off'}</span>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-strong)]">Slider: {slider}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(e) => setSlider(parseInt(e.target.value))}
              className="w-full accent-[var(--color-brand-500)]"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-strong)]">Checkbox</p>
            <label className="flex items-center gap-2.5 text-sm font-medium text-[var(--text-body)]">
              <input type="checkbox" checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} className="size-4 rounded border-[var(--border)] accent-[var(--color-brand-500)]" />
              Accept terms
            </label>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-strong)]">Radio group</p>
            <div className="space-y-2">
              {[
                { value: 'option-a', label: 'Option A' },
                { value: 'option-b', label: 'Option B' },
                { value: 'option-c', label: 'Option C' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 text-sm font-medium text-[var(--text-body)]">
                  <input
                    type="radio"
                    name="radio-group"
                    checked={radio === opt.value}
                    onChange={() => setRadio(opt.value)}
                    className="size-4 border-[var(--border)] accent-[var(--color-brand-500)]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Alerts */}
      <div data-category-header="3" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">3</span>
        <h2 className="ds-section-title text-lg">Feedback & Status</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Alerts, toasts, progress, skeletons</span>
      </div>
      <SectionCard title="Alerts" description="Inline contextual messages with dismiss button">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-success-100)] bg-[var(--color-success-50)] p-4 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
            <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Payment received</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">Invoice INV-2042 has been paid in full by Acme Corporation.</p>
            </div>
            <button type="button" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Dismiss"><X className="size-4" /></button>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-info-100)] bg-[var(--color-info-50)] p-4 dark:border-[rgba(11,165,236,0.18)] dark:bg-[rgba(11,165,236,0.06)]">
            <Info className="mt-0.5 size-5 flex-shrink-0 text-[var(--color-info-600)] dark:text-[var(--color-info-500)]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Scheduled maintenance</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">The dashboard will be read-only on Sunday, 2 AM – 4 AM UTC.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-warning-100)] bg-[var(--color-warning-50)] p-4 dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.06)]">
            <AlertTriangle className="mt-0.5 size-5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Storage 92% full</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">Dallas Hub is near capacity. Reroute incoming shipments to Newark DC.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-error-100)] bg-[var(--color-error-50)] p-4 dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
            <XCircle className="mt-0.5 size-5 flex-shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Payment failed</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">Invoice INV-2008 could not be charged. Customer card was declined.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Tooltips & Popovers */}
      <div data-category-header="8" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">8</span>
        <h2 className="ds-section-title text-lg">Overlay & Interactive</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Tooltips, popovers, modals</span>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Tooltips" description="Hover or focus to reveal">
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip label="Tooltip on top" side="top">
              <button type="button" className="ds-btn ds-btn-secondary">Top</button>
            </Tooltip>
            <Tooltip label="Tooltip on right" side="right">
              <button type="button" className="ds-btn ds-btn-secondary">Right</button>
            </Tooltip>
            <Tooltip label="Tooltip on bottom" side="bottom">
              <button type="button" className="ds-btn ds-btn-secondary">Bottom</button>
            </Tooltip>
            <Tooltip label="Tooltip on left" side="left">
              <button type="button" className="ds-btn ds-btn-secondary">Left</button>
            </Tooltip>
            <Tooltip label="Delete this item permanently" side="top">
              <button type="button" className="ds-btn-icon" aria-label="Delete"><Trash2 className="size-4" /></button>
            </Tooltip>
          </div>
        </SectionCard>

        <SectionCard title="Popovers" description="Click to open content panel">
          <div className="flex flex-wrap items-center gap-3">
            <Popover
              trigger={<button type="button" className="ds-btn ds-btn-secondary"><Calendar className="size-4" /> Schedule</button>}
              align="left"
            >
              <div className="w-56">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Pick a time</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'].map((t) => (
                    <button key={t} type="button" className="rounded-lg border border-[var(--border)] px-2 py-1.5 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">{t}</button>
                  ))}
                </div>
                <button type="button" className="ds-btn ds-btn-primary mt-3 w-full !h-9 !text-xs">Confirm</button>
              </div>
            </Popover>

            <Popover
              trigger={<button type="button" className="ds-btn ds-btn-secondary"><Share2 className="size-4" /> Share</button>}
              align="left"
            >
              <div className="w-56">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Share this</p>
                <div className="mt-2 space-y-0.5">
                  {['Copy link', 'Email', 'Twitter / X', 'LinkedIn', 'Slack'].map((opt) => (
                    <button key={opt} type="button" className="block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">{opt}</button>
                  ))}
                </div>
              </div>
            </Popover>

            <Popover
              trigger={<button type="button" className="ds-btn-icon" aria-label="More options"><MoreHorizontal className="size-4" /></button>}
              align="right"
            >
              <div className="w-48">
                <button type="button" className="block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Eye className="inline size-4 mr-2" />View details</button>
                <button type="button" className="block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Edit3 className="inline size-4 mr-2" />Edit</button>
                <button type="button" className="block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Copy className="inline size-4 mr-2" />Duplicate</button>
                <div className="my-1 h-px bg-[var(--border-subtle)]" />
                <button type="button" className="block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--color-error-600)] transition hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]"><Trash2 className="inline size-4 mr-2" />Delete</button>
              </div>
            </Popover>
          </div>
        </SectionCard>
      </div>

      {/* Accordion MOVED to Advanced UI page */}

      {/* Breadcrumbs */}
      <div data-category-header="2" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">2</span>
        <h2 className="ds-section-title text-lg">Navigation & Menus</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Dropdowns, tabs, breadcrumbs</span>
      </div>
      <SectionCard title="Breadcrumbs" description="Hierarchical navigation path">
        <div className="space-y-4">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Dashboards', href: '#' }, { label: 'Ecommerce', active: true }]} />
          <Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }, { label: 'Members', href: '#' }, { label: 'Sara Nguyen', active: true }]} />
          <Breadcrumb items={[{ label: 'Projects', href: '#' }, { label: 'mtverse', href: '#' }, { label: 'Issues', href: '#' }, { label: '#1428 — Login bug', active: true }]} />
        </div>
      </SectionCard>

      {/* Avatars & Progress & Sparklines */}
      <div data-category-header="4" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">4</span>
        <h2 className="ds-section-title text-lg">Data Display</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Cards, lists, avatars, badges</span>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Avatars" description="Initials-based avatars with deterministic colors">
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <UserAvatar name="Arun Pandian" size="xs" />
              <UserAvatar name="Sara Nguyen" size="sm" />
              <UserAvatar name="James Park" size="md" />
              <UserAvatar name="Maria Lopez" size="lg" />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Avatar group with overflow</p>
              <div className="flex -space-x-2">
                {['Arun Pandian', 'Sara Nguyen', 'James Park', 'Maria Lopez', 'Alex Chen'].map((n) => (
                  <UserAvatar key={n} name={n} size="sm" className="ring-2 ring-[var(--card)]" />
                ))}
                <span className="ml-3 inline-flex size-8 items-center justify-center rounded-full bg-[var(--surface-sunken)] text-xs font-medium text-[var(--text-muted)]">+12</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Avatar with status</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <UserAvatar name="Sara Nguyen" size="md" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-[var(--card)] bg-[var(--color-success-500)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">Sara Nguyen</p>
                  <p className="text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Active now</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Progress & Sparklines" description="Linear progress and inline trend lines">
          <div className="space-y-5">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-strong)]">Brand tone</span>
                <span className="font-medium text-[var(--text-strong)]">72%</span>
              </div>
              <ProgressBar value={72} tone="brand" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-strong)]">Success</span>
                <span className="font-medium text-[var(--text-strong)]">94%</span>
              </div>
              <ProgressBar value={94} tone="success" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-strong)]">Warning</span>
                <span className="font-medium text-[var(--text-strong)]">48%</span>
              </div>
              <ProgressBar value={48} tone="warning" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--text-strong)]">Error (over budget)</span>
                <span className="font-medium text-[var(--text-strong)]">128%</span>
              </div>
              <ProgressBar value={100} tone="error" />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-subtle)] pt-4">
              <div>
                <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Up trend</p>
                <Sparkline values={[12, 18, 14, 22, 28, 24, 32]} color="var(--color-success-500)" width={120} height={32} />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Down trend</p>
                <Sparkline values={[32, 28, 24, 22, 18, 14, 10]} color="var(--color-error-500)" width={120} height={32} />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Tabs */}
      <SectionCard title="Tabs" description="Inline tab navigation with active state">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { key: 'overview', label: 'Overview', count: 12 },
            { key: 'analytics', label: 'Analytics', count: 8 },
            { key: 'reports', label: 'Reports', count: 4 },
            { key: 'settings', label: 'Settings' },
          ]}
        />
        <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-5 text-sm font-medium text-[var(--text-muted)]">
          {tab === 'overview' && 'Overview tab content — high-level metrics and recent activity.'}
          {tab === 'analytics' && 'Analytics tab content — traffic, conversion, and audience insights.'}
          {tab === 'reports' && 'Reports tab content — saved and scheduled exports.'}
          {tab === 'settings' && 'Settings tab content — preferences, integrations, and API keys.'}
        </div>
      </SectionCard>

      {/* Carousel MOVED to Advanced UI page */}

      {/* Cards & Callouts MOVED to Extended UI page (Stat Cards section) */}

      {/* Divider */}
      <div data-category-header="9" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">9</span>
        <h2 className="ds-section-title text-lg">Utility</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Theme, color, language, dividers</span>
      </div>
      <SectionCard title="Dividers" description="Visual separators with optional labels, icons, and content">
        <div className="space-y-5">
          {/* Plain divider between sections */}
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Plus className="size-4" /></span>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Create new project</p>
              <p className="text-xs font-normal text-[var(--text-muted)]">Set up a new workspace</p>
            </div>
          </div>
          <Divider />
          {/* Divider with label */}
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Check className="size-4" /></span>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Configure settings</p>
              <p className="text-xs font-normal text-[var(--text-muted)]">Customize your workspace preferences</p>
            </div>
          </div>
          <Divider label="OR" />
          {/* Divider with social login context */}
          <div className="flex items-center gap-3">
            <button type="button" className="ds-btn ds-btn-secondary flex-1"><Share2 className="size-4" /> Continue with Google</button>
            <button type="button" className="ds-btn ds-btn-secondary flex-1"><Copy className="size-4" /> Continue with GitHub</button>
          </div>
          {/* Vertical divider */}
          <div className="flex items-center gap-4 py-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">Option A</span>
            <span className="h-4 w-px bg-[var(--border)]" />
            <span className="text-xs font-medium text-[var(--text-muted)]">Option B</span>
            <span className="h-4 w-px bg-[var(--border)]" />
            <span className="text-xs font-medium text-[var(--text-muted)]">Option C</span>
            <span className="h-4 w-px bg-[var(--border)]" />
            <span className="text-xs font-medium text-[var(--text-muted)]">Option D</span>
          </div>
        </div>
      </SectionCard>

      {/* Toast preview */}
      <SectionCard title="Toast Previews" description="Static preview of toast notification styles">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-success-200)] bg-[var(--card)] p-3 shadow-[var(--shadow-theme-md)]">
            <CheckCircle2 className="mt-0.5 size-5 text-[var(--color-success-500)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Order created</p>
              <p className="text-xs font-medium text-[var(--text-muted)]">OR-9082 · 1 item for $199.00</p>
            </div>
            <button type="button" aria-label="Dismiss" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]"><X className="size-4" /></button>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-error-200)] bg-[var(--card)] p-3 shadow-[var(--shadow-theme-md)]">
            <XCircle className="mt-0.5 size-5 text-[var(--color-error-500)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">Payment failed</p>
              <p className="text-xs font-medium text-[var(--text-muted)]">Card was declined. Please update your payment method.</p>
            </div>
            <button type="button" aria-label="Dismiss" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]"><X className="size-4" /></button>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-info-200)] bg-[var(--card)] p-3 shadow-[var(--shadow-theme-md)]">
            <Info className="mt-0.5 size-5 text-[var(--color-info-500)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-strong)]">New feature available</p>
              <p className="text-xs font-medium text-[var(--text-muted)]">Dark mode is now supported across all dashboards.</p>
            </div>
            <button type="button" aria-label="Dismiss" className="text-[var(--text-muted)] hover:text-[var(--text-strong)]"><X className="size-4" /></button>
          </div>
        </div>
      </SectionCard>

      {/* ============================================
          MODERN UI ELEMENTS — new variants below
          ============================================ */}

      {/* Segmented Control */}
      <SectionCard title="Segmented Control" description="Modern pill-style toggle for switching between options">
        <SegmentedControlDemo />
      </SectionCard>

      {/* Stepper */}
      <SectionCard title="Stepper" description="Multi-step progress indicator with active state">
        <StepperDemo />
      </SectionCard>

      {/* File Dropzone */}
      <SectionCard title="File Dropzone" description="Drag-and-drop file upload with hover state">
        <FileDropzoneDemo />
      </SectionCard>

      {/* Color Swatch Picker */}
      <SectionCard title="Color Swatch Picker" description="Compact color selection with active ring">
        <ColorSwatchDemo />
      </SectionCard>

      {/* Avatar Group */}
      <SectionCard title="Avatar Group" description="Stacked avatars with overflow count">
        <div className="flex flex-wrap items-center gap-6">
          <AvatarGroup names={['Arun Pandian', 'Sara Nguyen', 'Kristin Watson', 'Bessie Cooper', 'Albert Flores', 'Darlene Robertson']} max={4} />
          <AvatarGroup names={['Arun Pandian', 'Sara Nguyen']} max={4} size="sm" />
          <AvatarGroup names={['Arun Pandian', 'Sara Nguyen', 'Kristin Watson', 'Bessie Cooper', 'Albert Flores', 'Darlene Robertson', 'Tessa Reynolds', 'Jack Park']} max={6} size="xs" />
        </div>
      </SectionCard>

      {/* Tag Input */}
      <SectionCard title="Tag Input" description="Multi-value chip input with remove on click">
        <TagInputDemo />
      </SectionCard>

      {/* OTP Input */}
      <SectionCard title="OTP Input" description="6-digit one-time code entry with auto-advance">
        <OtpInputDemo />
      </SectionCard>

      {/* Command Input */}
      <div data-category-header="5" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">5</span>
        <h2 className="ds-section-title text-lg">Date & Search</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Pickers, search bars, filters</span>
      </div>
      <SectionCard title="Command Input" description="Search-style input with keyboard shortcut hint">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 shadow-[var(--shadow-theme-sm)] transition focus-within:border-[var(--color-brand-400)] focus-within:ring-[3px] focus-within:ring-[rgba(70,95,255,0.10)]">
          <Search className="size-4 text-[var(--text-subtle)]" />
          <input type="text" placeholder="Search components, pages, or type a command…" className="flex-1 bg-transparent text-sm font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
          <kbd className="inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
            <CommandIcon className="size-2.5" /> K
          </kbd>
        </div>
      </SectionCard>

      {/* Skeleton Loaders */}
      <SectionCard title="Skeleton Loaders" description="Real shimmer placeholders matching actual component layouts">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Card skeleton */}
          <div className="ds-card ds-card-pad space-y-3">
            <div className="flex items-start justify-between">
              <div className="ds-skeleton h-12 w-12 rounded-2xl" />
              <div className="ds-skeleton h-6 w-16 rounded-full" />
            </div>
            <div className="ds-skeleton h-4 w-3/4 rounded-md" />
            <div className="space-y-1.5">
              <div className="ds-skeleton h-3 w-full rounded-md" />
              <div className="ds-skeleton h-3 w-5/6 rounded-md" />
              <div className="ds-skeleton h-3 w-4/5 rounded-md" />
            </div>
            <div className="ds-skeleton h-9 w-full rounded-xl" />
          </div>
          {/* List item skeleton */}
          <div className="ds-card ds-card-pad space-y-3">
            <div className="flex items-center gap-3">
              <div className="ds-skeleton size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="ds-skeleton h-3 w-1/2 rounded-md" />
                <div className="ds-skeleton h-2.5 w-1/3 rounded-md" />
              </div>
              <div className="ds-skeleton h-6 w-12 rounded-full" />
            </div>
            <div className="ds-skeleton h-20 w-full rounded-lg" />
            <div className="flex gap-2">
              <div className="ds-skeleton h-8 w-16 rounded-lg" />
              <div className="ds-skeleton h-8 w-16 rounded-lg" />
              <div className="ds-skeleton h-8 w-16 rounded-lg" />
            </div>
          </div>
          {/* Table row skeleton */}
          <div className="ds-card ds-card-pad space-y-2.5">
            <div className="ds-skeleton h-4 w-24 rounded-md" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="ds-skeleton size-8 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <div className="ds-skeleton h-3 w-2/3 rounded-md" />
                  <div className="ds-skeleton h-2 w-1/3 rounded-md" />
                </div>
                <div className="ds-skeleton h-6 w-10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* KBD Shortcut Display */}
      <SectionCard title="Keyboard Shortcuts" description="Inline keyboard shortcut display">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { keys: ['⌘', 'K'], label: 'Command palette' },
            { keys: ['⌘', 'B'], label: 'Toggle sidebar' },
            { keys: ['⌘', '/'], label: 'Search' },
            { keys: ['G', 'D'], label: 'Go to dashboard' },
            { keys: ['?'], label: 'Show shortcuts' },
            { keys: ['Esc'], label: 'Close dialog' },
          ].map((sc) => (
            <div key={sc.label} className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 py-2">
              <div className="flex items-center gap-1">
                {sc.keys.map((k, i) => (
                  <kbd key={i} className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-1.5 text-[11px] font-medium text-[var(--text-strong)] shadow-sm">{k}</kbd>
                ))}
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">{sc.label}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Copy Field */}
      <SectionCard title="Copy Field" description="Inline copy-to-clipboard with feedback">
        <CopyFieldDemo />
      </SectionCard>

      {/* Rating Display — interactive + read-only */}
      <SectionCard title="Rating" description="Interactive and read-only star ratings">
        <div className="space-y-5">
          {/* Interactive rating */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">Interactive — click to rate</p>
            <InteractiveRating />
          </div>
          {/* Read-only ratings */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">Read-only</p>
            <div className="space-y-2">
              {[
                { rating: 5, count: 412, label: '5.0' },
                { rating: 4, count: 1284, label: '4.0' },
                { rating: 2, count: 38, label: '2.0' },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn('size-5', s <= r.rating ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-strong)]">{r.label}</span>
                  <span className="text-xs font-normal text-[var(--text-muted)]">· {r.count.toLocaleString()} reviews</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Pill Toggle Switch (modern) */}
      <SectionCard title="Pill Toggle Switch" description="Modern pill-style switch with icon swap">
        <PillToggleDemo />
      </SectionCard>

      {/* Loading Dots */}
      <SectionCard title="Loading Dots" description="Three-dot bouncing loader for inline loading">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-[var(--color-brand-500)]" style={{ animation: `uiDot 1.4s ease-in-out ${i * 0.16}s infinite` }} />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-3.5 rounded-full bg-[var(--color-success-500)]" style={{ animation: `uiDot 1.4s ease-in-out ${i * 0.16}s infinite` }} />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-2 rounded-full bg-[var(--color-warning-500)]" style={{ animation: `uiDot 1.4s ease-in-out ${i * 0.16}s infinite` }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[var(--color-brand-500)]" style={{ animation: `uiDot 1.4s ease-in-out 0s infinite` }} />
            <span className="text-xs font-medium text-[var(--text-muted)]">Loading data…</span>
          </div>
        </div>
        <style jsx>{`
          @keyframes uiDot {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </SectionCard>

      {/* Gradient Avatar */}
      <SectionCard title="Gradient Avatars" description="Deterministic gradient avatars from initials">
        <div className="flex flex-wrap items-center gap-4">
          {[
            { name: 'Arun Pandian', gradient: 'from-[#465fff] to-[#7a5af8]' },
            { name: 'Sara Nguyen', gradient: 'from-[#12b76a] to-[#0ba5ec]' },
            { name: 'Kristin Watson', gradient: 'from-[#f79009] to-[#f04438]' },
            { name: 'Bessie Cooper', gradient: 'from-[#ec4899] to-[#7a5af8]' },
            { name: 'Albert Flores', gradient: 'from-[#0ba5ec] to-[#465fff]' },
            { name: 'Darlene Robertson', gradient: 'from-[#10b981] to-[#12b76a]' },
          ].map((a) => (
            <div key={a.name} className="flex flex-col items-center gap-2">
              <span className={cn('inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-medium text-white shadow-md', a.gradient)}>
                {a.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
              <span className="max-w-[5.5rem] truncate text-[10px] font-medium text-[var(--text-muted)]">{a.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Slider with value */}
      <SectionCard title="Slider with Value" description="Range slider with live value badge">
        <SliderValueDemo />
      </SectionCard>

      {/* ============================================
          ADDITIONAL MODERN ELEMENTS
          ============================================ */}

      {/* Add to Cart Button */}
      <SectionCard title="Add to Cart Button" description="Modern button with add-to-cart → added animation">
        <AddToCartButtonDemo />
      </SectionCard>

      {/* Circular Progress */}
      <SectionCard title="Circular Progress" description="Animated ring progress indicator">
        <CircularProgressDemo />
      </SectionCard>

      {/* Spinners */}
      <SectionCard title="Spinners" description="Multiple modern loading spinner variants">
        <SpinnersDemo />
      </SectionCard>

      {/* Code Block */}
      <div data-category-header="6" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">6</span>
        <h2 className="ds-section-title text-lg">Media & Content</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Carousels, players, code blocks</span>
      </div>
      <SectionCard title="Code Block" description="Dark terminal-style code display with copy button">
        <CodeBlockDemo />
      </SectionCard>

      {/* Pagination */}
      <SectionCard title="Pagination" description="Modern page navigation with active state">
        <PaginationDemo />
      </SectionCard>

      {/* Glass Card */}
      <SectionCard title="Glass Card" description="Frosted glass effect with backdrop blur">
        <GlassCardDemo />
      </SectionCard>

      {/* KPI Card */}
      <SectionCard title="KPI Cards" description="Compact metric tiles with trend indicators">
        <KPICardDemo />
      </SectionCard>

      {/* Marquee */}
      <SectionCard title="Marquee" description="Infinite scrolling text strip">
        <MarqueeDemo />
      </SectionCard>

      {/* Theme Toggle */}
      <SectionCard title="Theme Toggle" description="Light / dark / system switcher">
        <ThemeToggleDemo />
      </SectionCard>

      {/* Floating Action Button */}
      <div data-category-header="7" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">7</span>
        <h2 className="ds-section-title text-lg">Communication</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— Chat, comments, reviews, share</span>
      </div>
      <SectionCard title="Chat Bubbles" description="User and AI chat message variants">
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-br-md bg-[var(--color-brand-500)] px-4 py-2.5 text-sm font-normal text-white">
              How do I add a new product to the catalog?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-[var(--surface-sunken)] px-4 py-2.5 text-sm font-normal text-[var(--text-body)]">
              Navigate to E-commerce → Add Product. Fill in the name, price, category, and upload images. Click Save when done.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-br-md bg-[var(--color-brand-500)] px-4 py-2.5 text-sm font-normal text-white">
              Can I bulk import products via CSV?
            </div>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <span className="size-2 rounded-full bg-[var(--text-muted)]" style={{ animation: 'dsPulse 1s ease-in-out infinite' }} />
            <span className="text-xs font-normal text-[var(--text-muted)]">AI is typing...</span>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Share Components" description="Social share and copy link variants">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
            <Share2 className="size-4" /> Share
          </button>
          <button type="button" className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
            <Copy className="size-4" /> Copy link
          </button>
          <div className="flex items-center gap-1.5">
            {['Twitter', 'LinkedIn', 'Reddit'].map((s) => (
              <button key={s} type="button" className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label={`Share on ${s}`}>
                <Share2 className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Floating Action Button */}
      <SectionCard title="Floating Action Button" description="Modern FAB variants with shadow and scale hover">
        <FloatingActionButtonDemo />
      </SectionCard>

      {/* Image Swiper */}
      <SectionCard title="Image Swiper" description="Modern touch-style image carousel with dots and arrows">
        <ImageSwiperDemo />
      </SectionCard>

      {/* Status Indicators */}
      <SectionCard title="Status & Presence Indicators" description="Online, away, busy, and offline presence dots">
        <StatusIndicatorsDemo />
      </SectionCard>

      {/* Expandable Search */}
      <SectionCard title="Expandable Search" description="Search input that expands on icon click">
        <ExpandableSearchDemo />
      </SectionCard>

      {/* Animated Counter */}
      <div data-category-header="10" className="flex items-center gap-3 pt-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-sm font-medium text-white">10</span>
        <h2 className="ds-section-title text-lg">Interactive</h2>
        <span className="text-xs font-normal text-[var(--text-muted)]">— KPIs, animations, counters</span>
      </div>
      <SectionCard title="Animated Counter" description="Numbers that count up on mount with easing">
        <AnimatedCounterDemo />
      </SectionCard>

      {/* Text Animations */}
      <SectionCard title="Text Animations" description="Rotating text, typing effect, gradient text, and shimmer text">
        <TextAnimationsDemo />
      </SectionCard>

      {/* Menu → Close Icon */}
      <SectionCard title="Menu / Close Icon" description="Animated hamburger-to-X transitions (3 variants)">
        <MenuCloseIconDemo />
      </SectionCard>

      {/* Animated Floating Icons */}
      <SectionCard title="Floating Icons" description="Icons with real floating motion animations">
        <FloatingIconsDemo />
      </SectionCard>

      {/* Dropdown Menu */}
      <SectionCard title="Dropdown Menu" description="Modern dropdown with icons, shortcuts, and dividers">
        <DropdownMenuDemo />
      </SectionCard>

      {/* Modal */}
      <SectionCard title="Modal" description="Dialog overlay with backdrop, header, body, and actions">
        <ModalPreviewDemo />
      </SectionCard>
    </div>
  );
}

function Download({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ========================================================================
   Modern UI element demo components
   ======================================================================== */

/* Segmented Control — modern pill-style segmented toggle */
function SegmentedControlDemo() {
  const [value, setValue] = React.useState('weekly');
  const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  return (
    <div className="flex w-fit items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setValue(o.value)}
          className={cn(
            'inline-flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 text-xs font-medium transition-all',
            value === o.value
              ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* Stepper — multi-step progress indicator */
function StepperDemo() {
  const [current, setCurrent] = React.useState(1);
  const steps = ['Account', 'Profile', 'Preferences', 'Review'];
  return (
    <div>
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                'inline-flex size-8 items-center justify-center rounded-full text-xs font-medium transition',
                idx < current && 'bg-[var(--color-success-500)] text-white',
                idx === current && 'bg-[var(--color-brand-500)] text-white shadow-md shadow-[var(--color-brand-500)]/25',
                idx > current && 'bg-[var(--surface-sunken)] text-[var(--text-subtle)]',
              )}>
                {idx < current ? <Check className="size-4" strokeWidth={3} /> : idx + 1}
              </div>
              <span className={cn('text-[10px] font-medium', idx === current ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={cn('mx-2 h-0.5 flex-1 rounded-full transition', idx < current ? 'bg-[var(--color-success-500)]' : 'bg-[var(--border)]')} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <button type="button" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="ds-btn ds-btn-secondary !h-8 !text-xs disabled:opacity-40">Back</button>
        <button type="button" onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1} className="ds-btn ds-btn-primary !h-8 !text-xs disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}

/* File Dropzone — drag-and-drop file upload */
function FileDropzoneDemo() {
  const [files, setFiles] = React.useState<string[]>([]);
  const [dragOver, setDragOver] = React.useState(false);
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
          setFiles((prev) => [...prev, ...dropped]);
        }}
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition',
          dragOver
            ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]'
            : 'border-[var(--border-strong)] bg-[var(--surface-sunken)] hover:border-[var(--color-brand-400)]',
        )}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--color-brand-600)] shadow-sm dark:text-[var(--color-brand-300)]">
          <Upload className="size-5" />
        </span>
        <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">Drop files here or click to upload</p>
        <p className="mt-1 text-xs font-normal text-[var(--text-muted)]">PNG, JPG, PDF up to 10MB</p>
        <button type="button" className="ds-btn ds-btn-secondary mt-3 !h-8 !text-xs">Browse files</button>
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] px-3 py-2">
              <FileIcon className="size-4 text-[var(--color-brand-500)]" />
              <span className="flex-1 truncate text-xs font-medium text-[var(--text-strong)]">{f}</span>
              <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} className="text-[var(--text-muted)] hover:text-[var(--color-error-600)]" aria-label="Remove file">
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Color Swatch Picker */
function ColorSwatchDemo() {
  const colors = ['#465fff', '#12b76a', '#f79009', '#f04438', '#0ba5ec', '#7a5af8', '#ec4899', '#10b981', '#0a0e1a', '#667085'];
  const [selected, setSelected] = React.useState('#465fff');
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelected(c)}
            className={cn(
              'size-9 cursor-pointer rounded-xl transition-all',
              selected === c ? 'ring-2 ring-offset-2 ring-offset-[var(--card)] scale-110' : 'hover:scale-105',
            )}
            style={{ backgroundColor: c, boxShadow: selected === c ? `0 0 0 2px ${c}` : undefined }}
            aria-label={`Select ${c}`}
          >
            {selected === c && <Check className="mx-auto size-4 text-white" strokeWidth={3} />}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex size-10 rounded-xl" style={{ backgroundColor: selected }} />
        <div>
          <p className="font-mono text-sm font-medium text-[var(--text-strong)]">{selected.toUpperCase()}</p>
          <p className="text-xs font-normal text-[var(--text-muted)]">Selected color</p>
        </div>
      </div>
    </div>
  );
}

/* Avatar Group — stacked avatars with overflow count */
function AvatarGroup({ names, max = 4, size = 'md' }: { names: string[]; max?: number; size?: 'xs' | 'sm' | 'md' }) {
  const sizeCls = { xs: 'size-6 text-[10px]', sm: 'size-8 text-xs', md: 'size-10 text-sm' }[size];
  const visible = names.slice(0, max);
  const overflow = names.length - max;
  return (
    <div className="flex items-center">
      {visible.map((name, idx) => {
        const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
        const gradients = [
          'from-[#465fff] to-[#7a5af8]',
          'from-[#12b76a] to-[#0ba5ec]',
          'from-[#f79009] to-[#f04438]',
          'from-[#ec4899] to-[#7a5af8]',
          'from-[#0ba5ec] to-[#465fff]',
          'from-[#10b981] to-[#12b76a]',
        ];
        const gradient = gradients[idx % gradients.length];
        return (
          <div
            key={name}
            className={cn('inline-flex items-center justify-center rounded-full bg-gradient-to-br font-medium text-white ring-2 ring-[var(--card)]', sizeCls, gradient)}
            style={{ marginLeft: idx === 0 ? 0 : -8, zIndex: visible.length - idx }}
            title={name}
          >
            {initials}
          </div>
        );
      })}
      {overflow > 0 && (
        <div className={cn('inline-flex items-center justify-center rounded-full bg-[var(--surface-sunken)] font-medium text-[var(--text-muted)] ring-2 ring-[var(--card)]', sizeCls)} style={{ marginLeft: -8 }}>
          +{overflow}
        </div>
      )}
    </div>
  );
}

/* Tag Input — multi-value chip input */
function TagInputDemo() {
  const [tags, setTags] = React.useState(['TypeScript', 'React', 'Next.js']);
  const [input, setInput] = React.useState('');
  function addTag() {
    const v = input.trim();
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setInput('');
  }
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 transition focus-within:border-[var(--color-brand-400)] focus-within:ring-[3px] focus-within:ring-[rgba(70,95,255,0.10)]">
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-brand-50)] px-2 py-1 text-xs font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
          {tag}
          <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))} className="cursor-pointer hover:text-[var(--color-error-600)]" aria-label={`Remove ${tag}`}>
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); addTag(); }
          if (e.key === 'Backspace' && !input && tags.length) setTags(tags.slice(0, -1));
        }}
        placeholder={tags.length === 0 ? 'Add a tag and press Enter…' : 'Add more…'}
        className="flex-1 bg-transparent px-1 py-1 text-sm font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
      />
    </div>
  );
}

/* OTP Input — 6-digit one-time code entry */
function OtpInputDemo() {
  const [code, setCode] = React.useState('');
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const length = 6;
  function handleChange(idx: number, v: string) {
    const digit = v.replace(/\D/g, '').slice(-1);
    const next = code.split('');
    next[idx] = digit;
    setCode(next.join('').slice(0, length));
    if (digit && idx < length - 1) refs.current[idx + 1]?.focus();
  }
  return (
    <div>
      <div className="flex justify-between gap-2">
        {Array.from({ length }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => { refs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={code[idx] ?? ''}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !code[idx] && idx > 0) refs.current[idx - 1]?.focus();
            }}
            className={cn(
              'ds-stat-value h-12 w-11 rounded-lg border bg-[var(--card)] text-center text-lg text-[var(--text-strong)] outline-none transition-all',
              code[idx]
                ? 'border-[var(--color-brand-500)] ring-[3px] ring-[rgba(70,95,255,0.10)]'
                : 'border-[var(--border)] focus:border-[var(--color-brand-400)] focus:ring-[3px] focus:ring-[rgba(70,95,255,0.10)]',
            )}
            aria-label={`Digit ${idx + 1}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-normal text-[var(--text-muted)]">Enter the 6-digit code sent to your phone</p>
    </div>
  );
}

/* Copy Field — inline copy-to-clipboard with feedback */
function CopyFieldDemo() {
  const [copied, setCopied] = React.useState(false);
  const value = 'sk-ant-api03-9a8b7c6d5e4f3g2h1i0j';
  function copy() {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-2">
      <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
        <Lock className="size-3.5 shrink-0 text-[var(--text-muted)]" />
        <span className="truncate font-mono text-sm font-medium text-[var(--text-body)]">{value}</span>
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition',
          copied
            ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]'
            : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]',
        )}
      >
        {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
      </button>
    </div>
  );
}

/* Pill Toggle Switch — modern pill-style switch with icon swap */
function PillToggleDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex flex-wrap items-center gap-6">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          'inline-flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-colors',
          on ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--border-strong)]',
        )}
      >
        <span className={cn('inline-flex size-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform', on ? 'translate-x-5' : 'translate-x-0')}>
          {on ? <Check className="size-3 text-[var(--color-brand-500)]" strokeWidth={3} /> : <X className="size-3 text-[var(--text-muted)]" strokeWidth={3} />}
        </span>
      </button>
      <span className="text-sm font-medium text-[var(--text-strong)]">{on ? 'Notifications on' : 'Notifications off'}</span>
    </div>
  );
}

/* Slider with Value — range slider with live value badge */
function SliderValueDemo() {
  const [value, setValue] = React.useState(60);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-strong)]">Storage quota</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-brand-50)] px-2 py-0.5 text-xs font-medium tabular-nums text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-[var(--color-brand-500)]"
      />
      <div className="mt-1.5 flex justify-between text-[10px] font-medium text-[var(--text-muted)]">
        <span>0 GB</span>
        <span>500 GB</span>
        <span>1 TB</span>
      </div>
    </div>
  );
}

/* ========================================================================
   Interactive Rating — clickable stars with hover preview
   ======================================================================== */
function InteractiveRating() {
  const [rating, setRating] = React.useState(4);
  const [hover, setHover] = React.useState(0);
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRating(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer transition-transform hover:scale-110"
            aria-label={`Rate ${s} stars`}
          >
            <Star className={cn('size-6 transition-colors', (hover || rating) >= s ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} />
          </button>
        ))}
      </div>
      <span className="text-sm font-medium text-[var(--text-strong)]">{hover || rating}.0</span>
    </div>
  );
}

/* ========================================================================
   Add to Cart Button — modern animation from "Add to cart" to "Added!"
   ======================================================================== */
function AddToCartButtonDemo() {
  const [added, setAdded] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
      className={cn(
        'inline-flex h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-medium transition-all duration-300',
        added
          ? 'bg-[var(--color-success-500)] text-white'
          : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]',
      )}
    >
      {added ? (
        <>
          <Check className="size-4" style={{ animation: 'cartCheck 0.3s ease-out' }} />
          <span style={{ animation: 'cartText 0.3s ease-out' }}>Added to cart!</span>
        </>
      ) : (
        <>
          <Plus className="size-4" />
          <span>Add to cart</span>
        </>
      )}
      <style jsx>{`
        @keyframes cartCheck { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes cartText { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </button>
  );
}

/* ========================================================================
   Circular Progress — animated ring progress
   ======================================================================== */
function CircularProgressDemo() {
  const [value, setValue] = React.useState(72);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-24">
        <svg className="size-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--color-brand-500)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="ds-stat-value text-xl text-[var(--text-strong)]">{value}%</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button type="button" onClick={() => setValue(Math.max(0, value - 10))} className="ds-btn ds-btn-secondary !h-8 !text-xs">− 10%</button>
        <button type="button" onClick={() => setValue(Math.min(100, value + 10))} className="ds-btn ds-btn-primary !h-8 !text-xs">+ 10%</button>
      </div>
    </div>
  );
}

/* ========================================================================
   Spinners — multiple modern spinner variants
   ======================================================================== */
function SpinnersDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {/* Ring spinner */}
      <div className="flex flex-col items-center gap-2">
        <svg className="size-8 animate-spin text-[var(--color-brand-500)]" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" /><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
        <span className="text-[10px] font-medium text-[var(--text-muted)]">Ring</span>
      </div>
      {/* Dot spinner */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (<span key={i} className="size-2 rounded-full bg-[var(--color-success-500)]" style={{ animation: 'spinDot 1.4s ease-in-out infinite', animationDelay: `${i * 0.16}s` }} />))}
        </div>
        <span className="text-[10px] font-medium text-[var(--text-muted)]">Dots</span>
      </div>
      {/* Pulse spinner */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative size-8">
          <span className="absolute inset-0 rounded-full bg-[var(--color-warning-500)] opacity-40" style={{ animation: 'spinPulse 1.5s ease-in-out infinite' }} />
          <span className="absolute inset-1 rounded-full bg-[var(--color-warning-500)]" />
        </div>
        <span className="text-[10px] font-medium text-[var(--text-muted)]">Pulse</span>
      </div>
      {/* Bars spinner */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (<span key={i} className="w-1 rounded-full bg-[var(--color-info-500)]" style={{ height: '12px', animation: 'spinBar 1s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />))}
        </div>
        <span className="text-[10px] font-medium text-[var(--text-muted)]">Bars</span>
      </div>
      {/* Loader2 icon */}
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-[var(--color-brand-500)]" />
        <span className="text-[10px] font-medium text-[var(--text-muted)]">Icon</span>
      </div>
      <style jsx>{`
        @keyframes spinDot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        @keyframes spinPulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.3); opacity: 0.1; } }
        @keyframes spinBar { 0%, 100% { height: 6px; } 50% { height: 20px; } }
      `}</style>
    </div>
  );
}

/* ========================================================================
   Code Block — dark terminal-style with copy button
   ======================================================================== */
function CodeBlockDemo() {
  const [copied, setCopied] = React.useState(false);
  const code = `import { Button } from '@mtverse/ui';

export function Example() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}`;
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[var(--color-error-500)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-success-500)]" />
          </div>
          <span className="ml-2 font-mono text-xs font-medium text-white/50">example.tsx</span>
        </div>
        <button type="button" onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-white/50 transition hover:bg-white/10 hover:text-white" aria-label="Copy code">
          {copied ? <Check className="size-3.5 text-[var(--color-success-400)]" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="max-h-48 overflow-auto p-4 text-xs leading-relaxed modern-scrollbar"><code className="font-mono text-[#f8f8f2]">{code}</code></pre>
    </div>
  );
}

/* ========================================================================
   Pagination — modern page navigation
   ======================================================================== */
function PaginationDemo() {
  const [page, setPage] = React.useState(3);
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40" aria-label="Previous page">
        <ChevronDown className="size-4 rotate-90" />
      </button>
      {pages.map((p) => (
        <button key={p} type="button" onClick={() => setPage(p)} className={cn('inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition', page === p ? 'bg-[var(--color-brand-500)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
          {p}
        </button>
      ))}
      <span className="px-2 text-sm font-normal text-[var(--text-muted)]">…</span>
      <button type="button" onClick={() => setPage(10)} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">10</button>
      <button type="button" onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40" aria-label="Next page">
        <ChevronDown className="size-4 -rotate-90" />
      </button>
    </div>
  );
}

/* ========================================================================
   Glass Card — frosted glass effect
   ======================================================================== */
function GlassCardDemo() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl" style={{ backgroundImage: 'linear-gradient(135deg, rgba(70,95,255,0.12), rgba(122,90,248,0.08))' }}>
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-[var(--color-brand-500)] opacity-20 blur-2xl" />
      <div className="relative">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
          <Sparkles className="size-5" />
        </span>
        <p className="mt-3 text-sm font-medium text-white">Glass Card</p>
        <p className="mt-1 text-xs font-normal text-white/60">Frosted glass effect with backdrop blur and subtle gradient. Perfect for overlay UIs.</p>
      </div>
    </div>
  );
}

/* ========================================================================
   KPI Card — compact metric with trend
   ======================================================================== */
function KPICardDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[
        { label: 'Revenue', value: '$48.2K', trend: '+12.4%', tone: 'success', icon: TrendingUp },
        { label: 'Active Users', value: '12,840', trend: '+8.2%', tone: 'success', icon: Users },
        { label: 'Churn Rate', value: '2.1%', trend: '-0.4%', tone: 'error', icon: TrendingUp },
      ].map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.label} className="ds-card ds-card-pad">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                <Icon className="size-4" />
              </span>
              <span className={cn('inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium', kpi.tone === 'success' ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]')}>
                {kpi.trend}
              </span>
            </div>
            <p className="ds-stat-value mt-3 text-2xl">{kpi.value}</p>
            <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================
   Marquee — infinite scrolling text
   ======================================================================== */
function MarqueeDemo() {
  const items = ['Next.js 16', 'Tailwind v4', 'shadcn/ui', 'TypeScript', 'Framer Motion', 'Prisma ORM', 'Zustand', 'Recharts'];
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] py-3">
      <div className="flex gap-8 whitespace-nowrap" style={{ animation: 'uiMarquee 20s linear infinite' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-body)]">
            <span className="size-1.5 rounded-full bg-[var(--color-brand-500)]" />
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes uiMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

/* ========================================================================
   Theme Toggle — light/dark/system switcher
   ======================================================================== */
function ThemeToggleDemo() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('light');
  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5">
      {(['light', 'dark', 'system'] as const).map((t) => (
        <button key={t} type="button" onClick={() => setTheme(t)} className={cn('inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-medium capitalize transition', theme === t ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
          {t === 'light' && <Eye className="size-3.5" />}
          {t === 'dark' && <Lock className="size-3.5" />}
          {t === 'system' && <Settings className="size-3.5" />}
          {t}
        </button>
      ))}
    </div>
  );
}

/* ========================================================================
   Floating Action Button — modern FAB with icon
   ======================================================================== */
function FloatingActionButtonDemo() {
  const [expanded, setExpanded] = React.useState(false);
  const actions = [
    { icon: Plus, label: 'New project', color: 'bg-[var(--color-brand-500)]' },
    { icon: MessageSquare, label: 'New message', color: 'bg-[var(--color-success-500)]' },
    { icon: Zap, label: 'Quick action', color: 'bg-[var(--color-warning-500)]' },
  ];
  return (
    <div className="flex items-end gap-8">
      <div className="relative flex flex-col items-center gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={action.label} type="button" className={cn('inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all duration-300', action.color)} style={{ transform: expanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)', opacity: expanded ? 1 : 0, transitionDelay: expanded ? `${i * 50}ms` : '0ms' }} aria-label={action.label} title={action.label}>
              <Icon className="size-5" />
            </button>
          );
        })}
        <button type="button" onClick={() => setExpanded(!expanded)} className="inline-flex size-14 cursor-pointer items-center justify-center rounded-2xl bg-[var(--color-brand-500)] text-white shadow-lg shadow-[var(--color-brand-500)]/30 transition-all hover:scale-110 hover:bg-[var(--color-brand-600)] hover:shadow-xl" aria-label={expanded ? 'Close actions' : 'Open actions'}>
          <Plus className={cn('size-6 transition-transform duration-300', expanded && 'rotate-45')} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-[var(--color-success-500)] text-white shadow-lg shadow-[var(--color-success-500)]/30 transition-all hover:scale-110" aria-label="Chat">
          <MessageSquare className="size-5" />
        </button>
        <button type="button" className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white shadow-lg transition-all hover:scale-110" aria-label="Action">
          <Zap className="size-5" />
        </button>
      </div>
      <span className="text-xs font-normal text-[var(--text-muted)]">{expanded ? 'Click + to collapse' : 'Click + to expand actions'}</span>
    </div>
  );
}

/* ========================================================================
   Image Swiper — modern touch-style image carousel
   ======================================================================== */
function ImageSwiperDemo() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', label: 'Mountains' },
    { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=250&fit=crop', label: 'Cats' },
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop', label: 'Forest' },
    { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop', label: 'Misty' },
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((img) => (
          <div key={img.label} className="relative w-full shrink-0">
            <img src={img.url} alt={img.label} className="h-48 w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-sm font-medium text-white">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Arrows */}
      <button type="button" onClick={() => setIdx((idx - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[var(--text-strong)] shadow-md backdrop-blur transition hover:bg-white" aria-label="Previous">
        <ChevronDown className="size-4 rotate-90" />
      </button>
      <button type="button" onClick={() => setIdx((idx + 1) % images.length)} className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[var(--text-strong)] shadow-md backdrop-blur transition hover:bg-white" aria-label="Next">
        <ChevronDown className="size-4 -rotate-90" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)} className={cn('h-1.5 rounded-full transition-all', i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50')} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ========================================================================
   Status & Presence Indicators
   ======================================================================== */
function StatusIndicatorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {[
        { label: 'Online', color: 'bg-[var(--color-success-500)]', ring: 'bg-[var(--color-success-500)]' },
        { label: 'Away', color: 'bg-[var(--color-warning-500)]', ring: 'bg-[var(--color-warning-500)]' },
        { label: 'Busy', color: 'bg-[var(--color-error-500)]', ring: 'bg-[var(--color-error-500)]' },
        { label: 'Offline', color: 'bg-[var(--text-subtle)]', ring: 'bg-[var(--text-subtle)]' },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-[var(--surface-sunken)]">
            <span className={cn('absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-[var(--card)]', s.color)} />
            {s.label === 'Online' && <span className={cn('absolute bottom-0 right-0 size-3 animate-ping rounded-full opacity-75', s.ring)} />}
            <span className="text-xs font-medium text-[var(--text-muted)]">A</span>
          </span>
          <span className="text-sm font-medium text-[var(--text-body)]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ========================================================================
   Expandable Search
   ======================================================================== */
function ExpandableSearchDemo() {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <div className="flex items-center gap-3">
      <div className={cn('relative flex items-center overflow-hidden rounded-xl border bg-[var(--card)] transition-all duration-300', expanded ? 'h-11 w-80 border-[var(--color-brand-400)] shadow-[var(--shadow-theme-sm)]' : 'h-11 w-11 border-[var(--border)] cursor-pointer')}>
        <button type="button" onClick={() => setExpanded(!expanded)} className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Toggle search">
          <Search className={cn('size-4 transition-transform duration-300', expanded && 'rotate-90')} />
        </button>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search anything..." onBlur={() => { if (!value) setExpanded(false); }} className={cn('h-full flex-1 bg-transparent pr-4 text-sm font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)] transition-opacity duration-300', expanded ? 'opacity-100' : 'opacity-0 pointer-events-none')} />
      </div>
      <span className="text-xs font-normal text-[var(--text-muted)]">{expanded ? 'Click the icon to collapse' : 'Click the icon to expand'}</span>
    </div>
  );
}

/* ========================================================================
   Animated Counter
   ======================================================================== */
function AnimatedCounterDemo() {
  const [value, setValue] = React.useState(0);
  const target = 12480;
  React.useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-8">
      <div>
        <p className="ds-stat-value text-4xl tabular-nums text-[var(--text-strong)]">{value.toLocaleString()}</p>
        <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">Active users (counted up on mount)</p>
      </div>
    </div>
  );
}

/* ========================================================================
   Text Animations
   ======================================================================== */
function TextAnimationsDemo() {
  const words = ['beautiful', 'modern', 'premium', 'fast', 'accessible'];
  const [wordIdx, setWordIdx] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(interval);
  }, []);
  const [typed, setTyped] = React.useState('');
  const typeText = 'Build faster with MTVerse UI';
  React.useEffect(() => {
    let charIdx = 0; let typing = true; let timeoutId: ReturnType<typeof setTimeout>;
    function tick() {
      if (typing) {
        if (charIdx <= typeText.length) { setTyped(typeText.slice(0, charIdx)); charIdx++; timeoutId = setTimeout(tick, 80); }
        else { typing = false; timeoutId = setTimeout(tick, 2000); }
      } else {
        if (charIdx > 0) { charIdx--; setTyped(typeText.slice(0, charIdx)); timeoutId = setTimeout(tick, 40); }
        else { typing = true; timeoutId = setTimeout(tick, 500); }
      }
    }
    tick();
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Rotating text</p>
        <p className="text-xl font-medium text-[var(--text-strong)]">Design that is{' '}
          <span key={wordIdx} className="inline-block text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" style={{ animation: 'textRotate 0.5s ease-out' }}>{words[wordIdx]}</span>
        </p>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Typing effect</p>
        <p className="text-lg font-medium text-[var(--text-strong)]">{typed}<span className="ml-0.5 inline-block w-0.5 bg-[var(--color-brand-500)]" style={{ height: '1em', verticalAlign: 'text-bottom', animation: 'dsPulse 1s ease-in-out infinite' }} /></p>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Gradient text</p>
        <p className="bg-gradient-to-r from-[var(--color-brand-500)] via-[#7a5af8] to-[var(--color-brand-400)] bg-clip-text text-2xl font-semibold text-transparent" style={{ backgroundSize: '200% 100%', animation: 'textGradient 3s ease infinite' }}>Premium SaaS UI Library</p>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-[var(--text-muted)]">Shimmer text</p>
        <p className="text-2xl font-semibold" style={{ background: 'linear-gradient(90deg, var(--text-subtle) 0%, var(--text-strong) 50%, var(--text-subtle) 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'textShimmer 2s linear infinite' }}>Loading experience...</p>
      </div>
    </div>
  );
}

/* ========================================================================
   Menu → Close Icon
   ======================================================================== */
function MenuCloseIconDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-8">
      {[1, 2, 3].map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-3">
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex size-12 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-strong)] transition hover:bg-[var(--surface-sunken)]" aria-label={open ? 'Close menu' : 'Open menu'}>
            {variant === 1 && (
              <div className="flex w-5 flex-col gap-1">
                <span className={cn('h-0.5 rounded-full bg-current transition-all duration-300', open && 'translate-y-[6px] rotate-45')} />
                <span className={cn('h-0.5 rounded-full bg-current transition-all duration-300', open && 'opacity-0')} />
                <span className={cn('h-0.5 rounded-full bg-current transition-all duration-300', open && '-translate-y-[6px] -rotate-45')} />
              </div>
            )}
            {variant === 2 && (
              <div className="relative size-5">
                <span className={cn('absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-all duration-300', open && 'top-1/2 -translate-y-1/2 rotate-45')} />
                <span className={cn('absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300', open && 'w-0 opacity-0')} />
                <span className={cn('absolute bottom-1 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300', open && 'bottom-1/2 translate-y-1/2 -rotate-45')} />
              </div>
            )}
            {variant === 3 && (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" className={cn('transition-all duration-300', open && 'opacity-0')} />
                <line x1="3" y1="12" x2="21" y2="12" className={cn('transition-all duration-300', open && 'rotate-45')} />
                <line x1="3" y1="18" x2="21" y2="18" className={cn('transition-all duration-300', open && 'opacity-0')} />
                <line x1="3" y1="6" x2="21" y2="18" className={cn('transition-all duration-300', !open && 'opacity-0')} />
              </svg>
            )}
          </button>
          <span className="text-[10px] font-medium text-[var(--text-muted)]">Variant {variant}</span>
        </div>
      ))}
      <span className="text-xs font-normal text-[var(--text-muted)]">{open ? 'Click to close' : 'Click to open'}</span>
    </div>
  );
}

/* ========================================================================
   Floating Icons
   ======================================================================== */
function FloatingIconsDemo() {
  const icons = [
    { Icon: Sparkles, color: '#465fff', delay: 0, duration: 3 },
    { Icon: Zap, color: '#f79009', delay: 0.5, duration: 3.5 },
    { Icon: Heart, color: '#f04438', delay: 1, duration: 2.8 },
    { Icon: Check, color: '#12b76a', delay: 1.5, duration: 3.2 },
    { Icon: Star, color: '#7a5af8', delay: 2, duration: 3 },
    { Icon: Bell, color: '#0ba5ec', delay: 0.3, duration: 3.8 },
  ];
  return (
    <div className="flex flex-wrap items-center gap-6">
      {icons.map(({ Icon, color, delay, duration }, i) => (
        <div key={i} className="inline-flex size-12 items-center justify-center rounded-2xl text-white shadow-lg" style={{ backgroundColor: color, animation: `floatIcon ${duration}s ease-in-out ${delay}s infinite`, boxShadow: `0 8px 24px ${color}33` }}>
          <Icon className="size-5" />
        </div>
      ))}
      <style jsx>{`
        @keyframes floatIcon { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(-3deg); } 75% { transform: translateY(4px) rotate(3deg); } }
      `}</style>
    </div>
  );
}

/* ========================================================================
   Dropdown Menu
   ======================================================================== */
function DropdownMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  type DropdownItem = { label: string; icon?: LucideIcon; shortcut?: string; danger?: boolean };
  const items: DropdownItem[] = [
    { label: 'Profile', icon: Heart, shortcut: '⌘P' },
    { label: 'Settings', icon: Settings, shortcut: '⌘,' },
    { label: 'Billing', icon: Plus, shortcut: '⌘B' },
    { label: 'Divider' },
    { label: 'Sign out', icon: X, danger: true },
  ];
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
        Options <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
          {items.map((item, i) => (
            item.label === 'Divider' ? (
              <div key={i} className="my-1 h-px bg-[var(--border-subtle)]" />
            ) : (
              <button key={i} type="button" onClick={() => setOpen(false)} className={cn('flex w-full items-center gap-3 px-3 py-2 text-left text-sm font-medium transition', item.danger ? 'text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                {item.icon && <item.icon className="size-4" />}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && <kbd className="text-[10px] font-medium text-[var(--text-subtle)]">{item.shortcut}</kbd>}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================================================================
   Modal Preview (uses createPortal for proper centering)
   ======================================================================== */
function ModalPreviewDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} className="ds-btn ds-btn-primary !h-10">
        <Plus className="size-4" /> Open Modal
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-xl)] ds-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4">
              <h3 className="text-base font-medium text-[var(--text-strong)]">Delete project</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" /></button>
            </div>
            <div className="p-5">
              <p className="text-sm font-normal text-[var(--text-muted)]">Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed.</p>
            </div>
            <div className="flex justify-end gap-2 border-t border-[var(--border-subtle)] px-5 py-4">
              <button type="button" onClick={() => setOpen(false)} className="ds-btn ds-btn-secondary !h-9 !text-sm">Cancel</button>
              <button type="button" onClick={() => setOpen(false)} className="ds-btn !h-9 !text-sm !bg-[var(--color-error-500)] !text-white hover:!bg-[var(--color-error-600)]">Delete</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
