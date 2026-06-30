'use client';
import * as React from 'react';
import {
  Search, Sparkles, ChevronDown, Calendar, Clock, Filter, X, Plus,
  ArrowUpDown, TrendingUp, Star, Tag, SlidersHorizontal, Check,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { ReactCalendar } from '@/components/dashboard/date-picker';
import { PremiumSelect } from '@/components/dashboard/premium-controls';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Date & Search) ====================== */
function DsStyles() {
  return (
    <style jsx global>{`
      .ds2-root {
        --ds2-radius-sm: 8px;
        --ds2-radius-md: 12px;
        --ds2-radius-lg: 16px;
        --ds2-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --ds2-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --ds2-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --ds2-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
      }
      .ds2-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .ds2-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .ds2-variant-title {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--text-strong);
        letter-spacing: -0.01em;
      }
      .ds2-input {
        height: 2.75rem;
        width: 100%;
        max-width: 24rem;
        border-radius: var(--ds2-radius-md);
        border: 1px solid var(--border);
        background: var(--card);
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-strong);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-shadow: var(--ds2-shadow-xs);
      }
      .ds2-input::placeholder { color: var(--text-subtle); font-weight: 400; }
      .ds2-input:hover { border-color: var(--border-strong); }
      .ds2-input:focus {
        outline: none;
        border-color: var(--color-brand-500);
        box-shadow: 0 0 0 4px rgba(70,95,255,0.12), var(--ds2-shadow-xs);
      }
      .ds2-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--ds2-radius-md);
        font-size: 0.8125rem;
        font-weight: 600;
        transition: all 0.18s ease;
        cursor: pointer;
        white-space: nowrap;
      }
      .ds2-btn-primary {
        background: linear-gradient(180deg, var(--color-brand-500), var(--color-brand-600));
        color: white;
        box-shadow: var(--ds2-shadow-sm), inset 0 1px 0 rgba(255,255,255,0.18);
      }
      .ds2-btn-primary:hover { transform: translateY(-1px); box-shadow: var(--ds2-shadow-md); }
      .ds2-btn-secondary {
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--ds2-shadow-xs);
      }
      .ds2-btn-secondary:hover { background: var(--surface-sunken); border-color: var(--border-strong); }
      .ds2-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
    `}</style>
  );
}

export function DateSearchPage() {
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('recent');

  return (
    <div className="ds2-root ds2-bg space-y-6">
      <DsStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Date & Search' }]} title="Date & Search" description="Date pickers, time pickers, search bars, filter bars, sort controls" />

      {/* ============================================ DATE PICKERS ============================================ */}
      <SectionCard title="Date Pickers" description="4 variants — Single Date, Range Picker, Inline Calendar, Event Picker">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Single Date */}
          <div>
            <p className="ds2-variant-title mb-2 block">Single Date</p>
            <div className="relative max-w-sm">
              <Calendar className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input type="date" className="ds2-input pl-10 cursor-pointer" />
            </div>
          </div>
          {/* Date Range */}
          <div>
            <p className="ds2-variant-title mb-2 block">Date Range</p>
            <div className="flex max-w-sm items-center gap-2">
              <input type="date" className="ds2-input flex-1 cursor-pointer" />
              <span className="text-[var(--text-muted)]">→</span>
              <input type="date" className="ds2-input flex-1 cursor-pointer" />
            </div>
          </div>
          {/* Inline Calendar */}
          <div className="lg:col-span-2">
            <p className="ds2-variant-title mb-3 block">Inline Calendar</p>
            <div className="inline-block rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--ds2-shadow-xs)]">
              <ReactCalendar value={selectedDate} onChange={(v) => setSelectedDate(Array.isArray(v) ? v[0] : v)} />
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">Selected: {selectedDate ? selectedDate.toDateString() : 'None'}</p>
          </div>
          {/* Event Picker */}
          <div className="lg:col-span-2">
            <p className="ds2-variant-title mb-3 block">Event Picker</p>
            <div className="flex flex-wrap gap-2 max-w-2xl">
              {[
                { label: 'Today', date: 'Jun 22' },
                { label: 'Tomorrow', date: 'Jun 23' },
                { label: 'This Weekend', date: 'Jun 24-25' },
                { label: 'Next Week', date: 'Jun 27-Jul 1' },
                { label: 'Custom...', date: 'Pick a date' },
              ].map((slot, i) => (
                <button key={slot.label} className={cn('flex flex-col items-start gap-0.5 rounded-xl border-2 p-3 text-left transition', i === 0 ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                  <span className={cn('text-xs font-medium', i === 0 ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-strong)]')}>{slot.label}</span>
                  <span className="text-[10px] font-medium text-[var(--text-muted)]">{slot.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ SEARCH BARS ============================================ */}
      <SectionCard title="Search Bars" description="5 variants — Minimal, AI, Command, Floating, Expandable">
        <div className="space-y-5">
          {/* Minimal */}
          <div className="max-w-md">
            <p className="ds2-label mb-2">Minimal</p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input type="search" placeholder="Search..." className="ds2-input pl-10" />
            </div>
          </div>
          <div className="ds2-divider" />
          {/* AI Search */}
          <div className="max-w-md">
            <p className="ds2-label mb-2">AI Search</p>
            <div className="relative">
              <Sparkles className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-brand-500)]" strokeWidth={2.5} />
              <input type="search" placeholder="Ask AI anything..." className="ds2-input pl-10 pr-14" />
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">AI</kbd>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Command */}
          <div className="max-w-lg">
            <p className="ds2-label mb-2">Command</p>
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--ds2-shadow-sm)] transition focus-within:border-[var(--color-brand-500)] focus-within:ring-4 focus-within:ring-[rgba(70,95,255,0.12)]">
              <Search className="size-4 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input type="text" placeholder="Search or type a command..." className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
              <kbd className="inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">⌘K</kbd>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Floating */}
          <div className="max-w-md">
            <p className="ds2-label mb-2">Floating</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--ds2-shadow-lg)]">
              <div className="flex items-center gap-2 rounded-xl bg-[var(--surface-sunken)] px-3 py-2">
                <Search className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                <input type="text" placeholder="Floating search..." className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
                <button className="ds2-btn ds2-btn-primary h-7 px-3 text-xs">Search</button>
              </div>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Expandable */}
          <div>
            <p className="ds2-label mb-2">Expandable</p>
            <div className={cn('flex items-center overflow-hidden rounded-xl border bg-[var(--card)] shadow-[var(--ds2-shadow-xs)] transition-all duration-300', searchExpanded ? 'w-full max-w-md border-[var(--color-brand-500)]' : 'w-11 border-[var(--border)]')}>
              <button onClick={() => setSearchExpanded(!searchExpanded)} className="inline-flex size-11 shrink-0 items-center justify-center text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                <Search className={cn('size-4 transition-transform', searchExpanded && 'rotate-90')} strokeWidth={2.5} />
              </button>
              <input type="text" placeholder="Search..." onBlur={() => setSearchExpanded(false)} className={cn('h-11 flex-1 bg-transparent pr-4 text-sm font-medium text-[var(--text-strong)] outline-none transition-opacity', searchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none')} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ FILTER BARS ============================================ */}
      <SectionCard title="Filter Bars" description="4 variants — Ecommerce, Dashboard, Advanced, Floating">
        <div className="space-y-5">
          {/* Ecommerce filter */}
          <div>
            <p className="ds2-label mb-2">Ecommerce Filter</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-body)]"><Tag className="size-3.5" strokeWidth={2.5} /> Category: Electronics <X className="size-3 cursor-pointer text-[var(--text-muted)] hover:text-[var(--color-error-600)]" strokeWidth={2.5} /></span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-body)]"><Star className="size-3.5" strokeWidth={2.5} /> 4+ Stars <X className="size-3 cursor-pointer text-[var(--text-muted)] hover:text-[var(--color-error-600)]" strokeWidth={2.5} /></span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-body)]">$50 - $200 <X className="size-3 cursor-pointer text-[var(--text-muted)] hover:text-[var(--color-error-600)]" strokeWidth={2.5} /></span>
              <button className="ds2-btn ds2-btn-secondary h-8 px-3 text-xs"><Plus className="size-3.5" strokeWidth={2.5} /> Add filter</button>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Dashboard filter */}
          <div>
            <p className="ds2-label mb-2">Dashboard Filter</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All data' },
                { id: 'revenue', label: 'Revenue' },
                { id: 'users', label: 'Users' },
                { id: 'orders', label: 'Orders' },
              ].map(f => (
                <button key={f.id} onClick={() => setActiveFilter(f.id)} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition', activeFilter === f.id ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--ds2-shadow-xs)]' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>
                  {activeFilter === f.id && <Check className="size-3" strokeWidth={2.5} />}{f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Advanced filter */}
          <div>
            <p className="ds2-label mb-2">Advanced Filter</p>
            <div className="flex flex-wrap items-center gap-2">
              <button className="ds2-btn ds2-btn-secondary h-9 px-4 text-xs"><SlidersHorizontal className="size-3.5" strokeWidth={2.5} /> Filters <span className="ml-1 rounded-full bg-[var(--color-brand-500)] px-1.5 text-[10px] text-white">3</span></button>
              <PremiumSelect size="sm" maxWidth="sm" placeholder="Status" options={[{ value: 'active', label: 'Active' }, { value: 'paused', label: 'Paused' }, { value: 'archived', label: 'Archived' }]} />
              <PremiumSelect size="sm" maxWidth="sm" placeholder="Date" options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This week' }, { value: 'month', label: 'This month' }]} />
              <PremiumSelect size="sm" maxWidth="sm" placeholder="Source" options={[{ value: 'all', label: 'All sources' }, { value: 'direct', label: 'Direct' }, { value: 'referral', label: 'Referral' }]} />
              <button className="text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--color-error-600)]">Clear all</button>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Floating filter */}
          <div>
            <p className="ds2-label mb-2">Floating Filter Bar</p>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--ds2-shadow-lg)]">
              <div className="flex items-center gap-2 rounded-xl bg-[var(--surface-sunken)] px-3 py-1.5">
                <Filter className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.5} />
                <span className="text-xs font-medium text-[var(--text-body)]">3 filters active</span>
              </div>
              <div className="h-6 w-px bg-[var(--border)]" />
              <button className="ds2-btn ds2-btn-secondary h-8 px-3 text-xs">Sort</button>
              <button className="ds2-btn ds2-btn-primary h-8 px-3 text-xs">Apply</button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ SORT CONTROLS ============================================ */}
      <SectionCard title="Sort Controls" description="4 variants — Dropdown, Toggle, Chip, Compact">
        <div className="space-y-5">
          {/* Dropdown */}
          <div>
            <p className="ds2-label mb-2">Dropdown Sort</p>
            <div className="flex flex-wrap gap-3">
              <PremiumSelect
                maxWidth="md"
                placeholder="Newest first"
                options={[
                  { value: 'newest', label: 'Newest first' },
                  { value: 'oldest', label: 'Oldest first' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'popular', label: 'Most popular' },
                ]}
              />
              <button className="ds2-btn ds2-btn-secondary h-10 px-4 text-xs">Sort by: Recent <ChevronDown className="size-4" strokeWidth={2.5} /></button>
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Toggle sort */}
          <div>
            <p className="ds2-label mb-2">Toggle Sort</p>
            <div className="inline-flex gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {[
                { id: 'recent', label: 'Recent', icon: Clock },
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'rating', label: 'Rating', icon: Star },
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button key={opt.id} onClick={() => setSortBy(opt.id)} className={cn('inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition', sortBy === opt.id ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--ds2-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
                    <Icon className="size-3.5" strokeWidth={2.5} />{opt.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Chip sort */}
          <div>
            <p className="ds2-label mb-2">Chip Sort</p>
            <div className="flex flex-wrap gap-2">
              {['Newest', 'Oldest', 'A-Z', 'Z-A', 'Popular'].map((s, i) => (
                <button key={s} className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition', i === 0 ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--ds2-shadow-xs)]' : 'border border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)]')}>
                  {i === 0 && <Check className="size-3" strokeWidth={2.5} />}{s}
                </button>
              ))}
            </div>
          </div>
          <div className="ds2-divider" />
          {/* Compact sort */}
          <div>
            <p className="ds2-label mb-2">Compact Sort</p>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-body)] shadow-[var(--ds2-shadow-xs)] transition hover:bg-[var(--surface-sunken)]">
              <ArrowUpDown className="size-3.5" strokeWidth={2.5} /> Sort
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
