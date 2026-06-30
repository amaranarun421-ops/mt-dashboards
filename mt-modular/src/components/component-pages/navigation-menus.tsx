'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronDown, ChevronRight, ChevronLeft, ChevronUp, MoreHorizontal, Plus, Check, X,
  Search, Bell, User, Settings, LogOut, Share2, Copy, Edit3, Trash2,
  MessageSquare, Download, Home, Folder, File, FileText, Zap, Sparkles,
  Clock, Star, Tag, ArrowUpRight, ExternalLink, CornerDownLeft,
  CreditCard, Users, Building2, FolderKanban, LayoutGrid, Inbox,
  Hash, AtSign, Link2, Image as ImageIcon, FileCode, GitBranch,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge, UserAvatar } from '@/components/dashboard/primitives';
import { Tooltip, Accordion, Breadcrumb } from '@/components/dashboard/extra-primitives';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

/* Shared menu item type — used by all dropdown demos to satisfy TS */
type MenuItem = {
  label?: string;
  icon?: LucideIcon;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
  nested?: MenuItem[];
};
type CommandResult = {
  label: string;
  icon: LucideIcon;
  group: string;
};

/* ====================== PREMIUM DESIGN SYSTEM (Navigation & Menus) ====================== */
function NmStyles() {
  return (
    <style jsx global>{`
      .nm-root {
        --nm-radius-sm: 8px;
        --nm-radius-md: 12px;
        --nm-radius-lg: 16px;
        --nm-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --nm-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --nm-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --nm-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --nm-shadow-xl: 0 20px 32px -8px rgba(15,23,42,0.12), 0 8px 16px -8px rgba(15,23,42,0.06);
      }

      .nm-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }

      .nm-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--nm-radius-md);
        font-size: 0.875rem;
        font-weight: 600;
        transition: background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        position: relative;
        cursor: pointer;
        user-select: none;
      }
      .nm-btn:active { transform: scale(0.97); }
      .nm-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--color-brand-500);
      }
      .nm-btn-primary {
        background: linear-gradient(180deg, var(--color-brand-500), var(--color-brand-600));
        color: white;
        box-shadow: var(--nm-shadow-sm), inset 0 1px 0 rgba(255,255,255,0.18);
      }
      .nm-btn-primary:hover {
        background: linear-gradient(180deg, var(--color-brand-600), var(--color-brand-700));
        box-shadow: var(--nm-shadow-md), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 20px -4px rgba(70,95,255,0.4);
        transform: translateY(-1px);
      }
      .nm-btn-secondary {
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--nm-shadow-xs);
      }
      .nm-btn-secondary:hover {
        background: var(--surface-sunken);
        border-color: var(--border-strong);
        box-shadow: var(--nm-shadow-sm);
      }

      .nm-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .nm-menu {
        background: var(--popover);
        border: 1px solid var(--border);
        border-radius: var(--nm-radius-md);
        box-shadow: var(--nm-shadow-lg);
        overflow: hidden;
      }
      .nm-menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.5rem 0.75rem;
        text-align: left;
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--text-body);
        transition: background-color 0.12s ease, color 0.12s ease;
        cursor: pointer;
      }
      .nm-menu-item:hover {
        background: var(--surface-sunken);
        color: var(--text-strong);
      }
      .nm-menu-item-danger { color: var(--color-error-600); }
      .nm-menu-item-danger:hover {
        background: var(--color-error-50);
        color: var(--color-error-700);
      }
      .dark .nm-menu-item-danger { color: var(--color-error-500); }
      .dark .nm-menu-item-danger:hover { background: rgba(240,68,56,0.16); }

      .nm-menu-divider {
        height: 1px;
        background: var(--border-subtle);
        margin: 0.25rem 0;
      }

      .nm-menu-shortcut {
        margin-left: auto;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--text-muted);
        font-family: ui-monospace, monospace;
      }

      @keyframes nm-fade-in {
        from { opacity: 0; transform: translateY(-4px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .nm-fade-in { animation: nm-fade-in 0.16s ease-out; transform-origin: top; }

      @keyframes nm-slide-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .nm-slide-up { animation: nm-slide-up 0.2s ease-out; }

      @keyframes nm-bounce-in {
        0% { transform: scale(0.7); opacity: 0; }
        60% { transform: scale(1.08); }
        100% { transform: scale(1); opacity: 1; }
      }
      .nm-bounce-in { animation: nm-bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }

      .nm-glass {
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.10);
      }

      .nm-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
    `}</style>
  );
}

export function NavigationMenusPage() {
  const [tab, setTab] = React.useState('overview');
  const [pillTab, setPillTab] = React.useState('all');
  const [segTab, setSegTab] = React.useState('week');
  const [wsTab, setWsTab] = React.useState('inbox');
  const [page, setPage] = React.useState(1);
  const [pageStyle, setPageStyle] = React.useState<'minimal' | 'rounded' | 'floating' | 'compact'>('rounded');

  return (
    <div className="nm-root nm-bg space-y-6">
      <NmStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Navigation & Menus' }]} title="Navigation & Menus" description="Dropdowns, menus, tabs, accordions, breadcrumbs, pagination — all variants." />

      {/* ============================================ DROPDOWNS ============================================ */}
      <SectionCard title="Dropdowns" description="6 variants — Action, Profile, Workspace Switcher, Search, Nested, Rich Media">
        <div className="space-y-7">
          <div className="flex flex-wrap items-start gap-6">
            <DropdownDemo label="Action Dropdown" items={[
              { label: 'Edit', icon: Edit3, shortcut: '⌘E' },
              { label: 'Duplicate', icon: Copy, shortcut: '⌘D' },
              { label: 'Share', icon: Share2, shortcut: '⌘S' },
              { divider: true },
              { label: 'Delete', icon: Trash2, danger: true, shortcut: '⌫' },
            ]} />
            <ProfileDropdownDemo />
            <WorkspaceSwitcherDemo />
          </div>
          <div className="nm-divider" />
          <div className="flex flex-wrap items-start gap-6">
            <SearchDropdownDemo />
            <NestedDropdownDemo />
            <RichMediaDropdownDemo />
          </div>
        </div>
      </SectionCard>

      {/* ============================================ MENUS ============================================ */}
      <SectionCard title="Menus" description="5 variants — Context Menu, Command Menu, Action Menu, Profile Menu, Workspace Menu">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ContextMenuDemo />
          <CommandMenuDemo />
          <ActionMenuDemo />
          <ProfileMenuDemo />
          <WorkspaceMenuDemo />
        </div>
      </SectionCard>

      {/* ============================================ TABS ============================================ */}
      <SectionCard title="Tabs" description="6 variants — Underline, Pills, Segmented, Workspace, Floating, Animated">
        <div className="space-y-7">
          {/* Underline tabs */}
          <div>
            <p className="nm-label mb-3.5">Underline Tabs</p>
            <div className="relative flex gap-8 border-b border-[var(--border)]">
              {['Overview', 'Analytics', 'Reports', 'Settings'].map((t) => (
                <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn('relative pb-3.5 pt-1 text-sm font-medium transition-colors', tab === t.toLowerCase() ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
                  {t}
                  <span className={cn('absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-brand-500)] transition-opacity', tab === t.toLowerCase() ? 'opacity-100' : 'opacity-0')} />
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--text-body)]">Current: <span className="font-medium capitalize text-[var(--text-strong)]">{tab}</span> — content area updates instantly on tab change.</p>
          </div>
          <div className="nm-divider" />
          {/* Pills tabs */}
          <div>
            <p className="nm-label mb-3.5">Pills Tabs</p>
            <div className="inline-flex gap-1.5">
              {['All', 'Active', 'Paused', 'Archived'].map((t) => (
                <button key={t} onClick={() => setPillTab(t.toLowerCase())} className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all', pillTab === t.toLowerCase() ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--nm-shadow-sm)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--card)]')}>{t}</button>
              ))}
            </div>
          </div>
          <div className="nm-divider" />
          {/* Segmented tabs */}
          <div>
            <p className="nm-label mb-3.5">Segmented Tabs</p>
            <div className="inline-flex gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {['Day', 'Week', 'Month', 'Year'].map((t) => (
                <button key={t} onClick={() => setSegTab(t.toLowerCase())} className={cn('h-8 rounded-lg px-4 text-xs font-medium transition-all', segTab === t.toLowerCase() ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--nm-shadow-sm)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{t}</button>
              ))}
            </div>
          </div>
          <div className="nm-divider" />
          {/* Workspace tabs */}
          <div>
            <p className="nm-label mb-3.5">Workspace Tabs (icon + label + badge)</p>
            <div className="flex flex-wrap gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-[var(--nm-shadow-xs)]">
              {[
                { id: 'inbox', label: 'Inbox', icon: Inbox, badge: '12' },
                { id: 'tasks', label: 'Tasks', icon: Check, badge: '3' },
                { id: 'calendar', label: 'Calendar', icon: Clock, badge: null },
                { id: 'files', label: 'Files', icon: Folder, badge: null },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => setWsTab(t.id)} className={cn('inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-all', wsTab === t.id ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]')}>
                    <Icon className="size-4" strokeWidth={2.5} />
                    {t.label}
                    {t.badge && <span className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold', wsTab === t.id ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>{t.badge}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="nm-divider" />
          {/* Floating tabs */}
          <div>
            <p className="nm-label mb-3.5">Floating Tabs (pill with elevation)</p>
            <div className="inline-flex gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--nm-shadow-md)]">
              {['Design', 'Code', 'Preview'].map((t, i) => (
                <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn('rounded-xl px-5 py-2 text-sm font-medium transition-all', i === 0 ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--nm-shadow-sm)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]')}>{t}</button>
              ))}
            </div>
          </div>
          <div className="nm-divider" />
          {/* Animated tabs */}
          <div>
            <p className="nm-label mb-3.5">Animated Tabs (sliding indicator)</p>
            <div className="relative inline-flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {['Dashboard', 'Analytics', 'Settings'].map((t, i) => (
                <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn('relative z-10 rounded-lg px-4 py-2 text-xs font-medium transition-colors', tab === t.toLowerCase() ? 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
                  {t}
                  {tab === t.toLowerCase() && <span className="absolute inset-0 -z-10 rounded-lg bg-[var(--card)] shadow-[var(--nm-shadow-sm)] nm-bounce-in" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ ACCORDIONS ============================================ */}
      <SectionCard title="Accordions" description="5 variants — Minimal, FAQ, Nested, Glass, Animated">
        <div className="space-y-7">
          {/* Minimal */}
          <div>
            <p className="nm-label mb-3.5">Minimal Accordion</p>
            <MinimalAccordion />
          </div>
          <div className="nm-divider" />
          {/* FAQ */}
          <div>
            <p className="nm-label mb-3.5">FAQ Accordion</p>
            <Accordion defaultOpen={['faq-1']} items={[
              { id: 'faq-1', title: 'What is included in the Pro plan?', description: 'Pricing and features', content: <p className="text-sm text-[var(--text-body)]">The Pro plan includes 25 team members, 500K API calls, 50GB storage, custom domain, audit logs, and priority support. Perfect for growing teams that need more power.</p> },
              { id: 'faq-2', title: 'Can I change my plan later?', description: 'Upgrades and downgrades', content: <p className="text-sm text-[var(--text-body)]">Yes, you can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.</p> },
              { id: 'faq-3', title: 'Do you offer a free trial?', description: '14-day trial', content: <p className="text-sm text-[var(--text-body)]">Yes, every paid plan includes a 14-day free trial with no credit card required. You can explore all features before committing.</p> },
            ]} />
          </div>
          <div className="nm-divider" />
          {/* Nested */}
          <div>
            <p className="nm-label mb-3.5">Nested Accordion</p>
            <NestedAccordion />
          </div>
          <div className="nm-divider" />
          {/* Glass */}
          <div>
            <p className="nm-label mb-3.5">Glass Accordion</p>
            <GlassAccordion />
          </div>
          <div className="nm-divider" />
          {/* Animated */}
          <div>
            <p className="nm-label mb-3.5">Animated Accordion (with icon rotation + content fade)</p>
            <AnimatedAccordion />
          </div>
        </div>
      </SectionCard>

      {/* ============================================ BREADCRUMBS ============================================ */}
      <SectionCard title="Breadcrumbs" description="4 variants — Minimal, SaaS Style, Icon Breadcrumbs, Gradient Breadcrumbs">
        <div className="space-y-6">
          <div>
            <p className="nm-label mb-3">Minimal</p>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Dashboards', href: '#' }, { label: 'Ecommerce', active: true }]} />
          </div>
          <div className="nm-divider" />
          <div>
            <p className="nm-label mb-3">SaaS Style</p>
            <Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }, { label: 'Members', href: '#' }, { label: 'Sara Nguyen', active: true }]} />
          </div>
          <div className="nm-divider" />
          <div>
            <p className="nm-label mb-3">Icon Breadcrumbs</p>
            <div className="flex items-center gap-1.5 text-sm">
              <a href="#" className="inline-flex items-center gap-1.5 text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><Home className="size-3.5" strokeWidth={2.5} /> Home</a>
              <ChevronRight className="size-3.5 text-[var(--text-faint)]" strokeWidth={2.5} />
              <a href="#" className="inline-flex items-center gap-1.5 text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><FolderKanban className="size-3.5" strokeWidth={2.5} /> Projects</a>
              <ChevronRight className="size-3.5 text-[var(--text-faint)]" strokeWidth={2.5} />
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-strong)]"><File className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.5} /> Issue 1428</span>
            </div>
          </div>
          <div className="nm-divider" />
          <div>
            <p className="nm-label mb-3">Gradient Breadcrumbs</p>
            <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] p-1 shadow-[var(--nm-shadow-xs)]">
              <a href="#" className="rounded-full px-3 py-1 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Home</a>
              <ChevronRight className="size-3 text-[var(--text-faint)]" strokeWidth={2.5} />
              <a href="#" className="rounded-full px-3 py-1 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Settings</a>
              <ChevronRight className="size-3 text-[var(--text-faint)]" strokeWidth={2.5} />
              <span className="rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-3 py-1 text-xs font-medium text-white shadow-[var(--nm-shadow-sm)]">Profile</span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ PAGINATION ============================================ */}
      <SectionCard title="Pagination" description="4 variants — Minimal, Rounded, Floating, Compact">
        <div className="space-y-7">
          {/* Style switcher */}
          <div className="inline-flex gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
            {(['minimal', 'rounded', 'floating', 'compact'] as const).map((s) => (
              <button key={s} onClick={() => setPageStyle(s)} className={cn('h-8 rounded-lg px-3 text-xs font-medium capitalize transition-all', pageStyle === s ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--nm-shadow-sm)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{s}</button>
            ))}
          </div>

          {/* Minimal */}
          {pageStyle === 'minimal' && (
            <div>
              <p className="nm-label mb-3.5">Minimal</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40 disabled:hover:bg-transparent"><ChevronLeft className="size-4" strokeWidth={2.5} /></button>
                {[1, 2, 3, 4, 5].map(p => <button key={p} onClick={() => setPage(p)} className={cn('inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition', page === p ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)] underline underline-offset-4 decoration-2' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{p}</button>)}
                <span className="px-1 text-sm text-[var(--text-faint)]">…</span>
                <button onClick={() => setPage(10)} className="inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-strong)]">10</button>
                <button onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40 disabled:hover:bg-transparent"><ChevronRight className="size-4" strokeWidth={2.5} /></button>
              </div>
            </div>
          )}

          {/* Rounded */}
          {pageStyle === 'rounded' && (
            <div>
              <p className="nm-label mb-3.5">Rounded</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--nm-shadow-xs)] transition hover:border-[var(--color-brand-400)] hover:text-[var(--color-brand-500)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-muted)]"><ChevronLeft className="size-4" strokeWidth={2.5} /></button>
                {[1, 2, 3, 4, 5].map(p => <button key={p} onClick={() => setPage(p)} className={cn('inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-all', page === p ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--nm-shadow-sm)]' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--color-brand-400)] hover:text-[var(--text-strong)]')}>{p}</button>)}
                <span className="px-2 text-sm font-medium text-[var(--text-faint)]">…</span>
                <button onClick={() => setPage(10)} className={cn('inline-flex size-10 items-center justify-center rounded-full text-sm font-medium transition-all', page === 10 ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--nm-shadow-sm)]' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--color-brand-400)] hover:text-[var(--text-strong)]')}>10</button>
                <button onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--nm-shadow-xs)] transition hover:border-[var(--color-brand-400)] hover:text-[var(--color-brand-500)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-muted)]"><ChevronRight className="size-4" strokeWidth={2.5} /></button>
              </div>
            </div>
          )}

          {/* Floating */}
          {pageStyle === 'floating' && (
            <div>
              <p className="nm-label mb-3.5">Floating</p>
              <div className="inline-flex items-center gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--nm-shadow-lg)]">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40"><ChevronLeft className="size-4" strokeWidth={2.5} /> Prev</button>
                <div className="h-6 w-px bg-[var(--border)]" />
                {[1, 2, 3, 4, 5].map(p => <button key={p} onClick={() => setPage(p)} className={cn('inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all', page === p ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--nm-shadow-sm)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>{p}</button>)}
                <div className="h-6 w-px bg-[var(--border)]" />
                <span className="px-2 text-xs font-medium text-[var(--text-muted)]">of 10</span>
                <button onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40">Next <ChevronRight className="size-4" strokeWidth={2.5} /></button>
              </div>
            </div>
          )}

          {/* Compact */}
          {pageStyle === 'compact' && (
            <div>
              <p className="nm-label mb-3.5">Compact</p>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1 shadow-[var(--nm-shadow-xs)]">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex size-7 items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40"><ChevronLeft className="size-3.5" strokeWidth={2.5} /></button>
                <span className="text-xs font-medium tabular-nums text-[var(--text-strong)]">Page {page} of 10</span>
                <button onClick={() => setPage(Math.min(10, page + 1))} disabled={page === 10} className="inline-flex size-7 items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40"><ChevronRight className="size-3.5" strokeWidth={2.5} /></button>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

/* ====================== DROPDOWN IMPLEMENTATIONS ====================== */

function DropdownDemo({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="nm-btn nm-btn-secondary h-10 px-4">{label}<ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} /></button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-56 p-1">
          {items.map((item, i) => item.divider ? <div key={i} className="nm-menu-divider" /> : <button key={i} onClick={() => setOpen(false)} className={cn('nm-menu-item', item.danger && 'nm-menu-item-danger')}>{item.icon && <item.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />}<span className="flex-1">{item.label}</span>{item.shortcut && <span className="nm-menu-shortcut">{item.shortcut}</span>}</button>)}
        </div>
      )}
    </div>
  );
}

function ProfileDropdownDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] py-1 pl-1 pr-3 shadow-[var(--nm-shadow-xs)] transition hover:bg-[var(--surface-sunken)]">
        <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-8 rounded-lg object-cover" />
        <span className="text-sm font-medium text-[var(--text-strong)]">Arun</span>
        <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} />
      </button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-64">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] p-3">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-10 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--text-strong)]">Arun Pandian</p>
              <p className="truncate text-xs text-[var(--text-muted)]">arun@mtverse.io</p>
            </div>
          </div>
          <div className="p-1">
            <button className="nm-menu-item"><User className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Profile</button>
            <button className="nm-menu-item"><Settings className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Settings <span className="nm-menu-shortcut">⌘,</span></button>
            <button className="nm-menu-item"><CreditCard className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Billing</button>
            <div className="nm-menu-divider" />
            <button className="nm-menu-item"><Sparkles className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} /> Upgrade to Pro</button>
            <div className="nm-menu-divider" />
            <button className="nm-menu-item nm-menu-item-danger"><LogOut className="size-4" strokeWidth={2.5} /> Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkspaceSwitcherDemo() {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState({ name: 'Acme Inc.', plan: 'Pro', icon: Building2, color: 'var(--color-brand-500)' });
  const workspaces = [
    { name: 'Acme Inc.', plan: 'Pro', icon: Building2, color: 'var(--color-brand-500)' },
    { name: 'Personal', plan: 'Free', icon: User, color: 'var(--color-success-500)' },
    { name: 'Side Project', plan: 'Pro', icon: FolderKanban, color: 'var(--color-warning-500)' },
  ];
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const CurrentIcon = current.icon;
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-2.5 shadow-[var(--nm-shadow-xs)] transition hover:bg-[var(--surface-sunken)]">
        <span className="inline-flex size-6 items-center justify-center rounded-lg text-white" style={{ backgroundColor: current.color }}><CurrentIcon className="size-3.5" strokeWidth={2.5} /></span>
        <span className="text-sm font-medium text-[var(--text-strong)]">{current.name}</span>
        <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} />
      </button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-64">
          <p className="nm-label px-3 py-2">Workspaces</p>
          <div className="px-1 pb-1">
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              return (
                <button key={ws.name} onClick={() => { setCurrent(ws); setOpen(false); }} className={cn('nm-menu-item', current.name === ws.name && 'bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]')}>
                  <span className="inline-flex size-6 items-center justify-center rounded-lg text-white" style={{ backgroundColor: ws.color }}><Icon className="size-3.5" strokeWidth={2.5} /></span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{ws.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{ws.plan} plan</p>
                  </div>
                  {current.name === ws.name && <Check className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
                </button>
              );
            })}
            <div className="nm-menu-divider" />
            <button className="nm-menu-item"><Plus className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Create workspace</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchDropdownDemo() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const results: CommandResult[] = [
    { label: 'Dashboard', icon: LayoutGrid, group: 'Pages' },
    { label: 'Analytics Report', icon: FileText, group: 'Reports' },
    { label: 'Team Members', icon: Users, group: 'Settings' },
    { label: 'API Keys', icon: Hash, group: 'Settings' },
    { label: 'Billing & Invoice', icon: CreditCard, group: 'Settings' },
  ].filter(r => r.label.toLowerCase().includes(query.toLowerCase()));
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="nm-btn nm-btn-secondary h-10 px-4"><Search className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Search Dropdown</button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-72">
          <div className="border-b border-[var(--border-subtle)] p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-8 pr-3 text-sm font-medium outline-none focus:border-[var(--color-brand-500)]" autoFocus />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto p-1">
            {results.length === 0 ? <p className="px-3 py-4 text-center text-xs text-[var(--text-muted)]">No results found</p> : results.map((r) => <button key={r.label} onClick={() => setOpen(false)} className="nm-menu-item"><r.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="flex-1">{r.label}</span><span className="nm-menu-shortcut">{r.group}</span></button>)}
          </div>
        </div>
      )}
    </div>
  );
}

function NestedDropdownDemo() {
  const [open, setOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setNestedOpen(null); } } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const menu: MenuItem[] = [
    { label: 'New File', icon: FileText, shortcut: '⌘N' },
    { label: 'New Folder', icon: Folder, shortcut: '⌘⇧N' },
    { label: 'Open Recent', icon: Clock, nested: [
      { label: 'dashboard.tsx', icon: FileCode },
      { label: 'sidebar.tsx', icon: FileCode },
      { label: 'header.tsx', icon: FileCode },
    ]},
    { label: 'Import from', icon: Download, nested: [
      { label: 'GitHub', icon: GitBranch },
      { label: 'Local File', icon: FileText },
      { label: 'URL', icon: Link2 },
    ]},
    { divider: true },
    { label: 'Export', icon: Download, shortcut: '⌘E' },
  ];
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="nm-btn nm-btn-secondary h-10 px-4">Nested Dropdown<ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} /></button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-56 p-1">
          {menu.map((item, i) => item.divider ? <div key={i} className="nm-menu-divider" /> : (
            <div key={i} className="relative">
              <button
                onClick={() => item.nested ? setNestedOpen(nestedOpen === item.label ? null : (item.label ?? null)) : setOpen(false)}
                className="nm-menu-item"
              >
                {item.icon && <item.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && <span className="nm-menu-shortcut">{item.shortcut}</span>}
                {item.nested && <ChevronRight className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.5} />}
              </button>
              {item.nested && nestedOpen === item.label && (
                <div className="nm-menu nm-fade-in absolute left-full top-0 ml-1 w-44 p-1">
                  {item.nested.map((n) => <button key={n.label} onClick={() => { setNestedOpen(null); setOpen(false); }} className="nm-menu-item">{n.icon && <n.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />}{n.label}</button>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RichMediaDropdownDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="nm-btn nm-btn-secondary h-10 px-4">Rich Media<ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} /></button>
      {open && (
        <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden">
          <div className="relative h-24 bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8]">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=100&fit=crop" alt="" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-between p-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/80">Team</p>
                <p className="text-sm font-medium text-white">Acme Inc.</p>
              </div>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">12 members</span>
            </div>
          </div>
          <div className="p-1">
            <button className="nm-menu-item"><User className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Invite members</button>
            <button className="nm-menu-item"><Settings className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Team settings</button>
            <button className="nm-menu-item"><CreditCard className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Billing &amp; plans</button>
            <div className="nm-menu-divider" />
            <button className="nm-menu-item"><ArrowUpRight className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> View team page</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ====================== MENU IMPLEMENTATIONS ====================== */

function ContextMenuDemo() {
  const [pos, setPos] = React.useState({ x: 0, y: 0, show: false });
  const items: MenuItem[] = [
    { label: 'Edit', icon: Edit3, shortcut: '⌘E' },
    { label: 'Copy', icon: Copy, shortcut: '⌘C' },
    { label: 'Share', icon: Share2, shortcut: '⌘S' },
    { divider: true },
    { label: 'Delete', icon: Trash2, danger: true, shortcut: '⌫' },
  ];
  return (
    <div>
      <p className="nm-label mb-3">Context Menu (right-click)</p>
      <div onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY, show: true }); }} className="flex h-36 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] text-center transition hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)]/40 dark:hover:bg-[rgba(70,95,255,0.04)]">
        <MoreHorizontal className="size-6 text-[var(--text-muted)]" strokeWidth={2} />
        <p className="text-sm font-medium text-[var(--text-body)]">Right-click anywhere here</p>
        <p className="text-xs text-[var(--text-muted)]">Opens a context-aware menu</p>
      </div>
      {pos.show && typeof document !== 'undefined' && createPortal(
        <><div className="fixed inset-0 z-[2000]" onClick={() => setPos(p => ({ ...p, show: false }))} /><div className="nm-menu nm-fade-in fixed z-[2001] w-56 p-1" style={{ top: pos.y, left: pos.x }}>{items.map((item, i) => item.divider ? <div key={i} className="nm-menu-divider" /> : <button key={i} onClick={() => setPos(p => ({ ...p, show: false }))} className={cn('nm-menu-item', item.danger && 'nm-menu-item-danger')}>{item.icon && <item.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />}<span className="flex-1">{item.label}</span>{item.shortcut && <span className="nm-menu-shortcut">{item.shortcut}</span>}</button>)}</div></>, document.body)}
    </div>
  );
}

function CommandMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const commands: CommandResult[] = [
    { label: 'Go to Dashboard', icon: LayoutGrid, group: 'Navigation' },
    { label: 'New Project', icon: Plus, group: 'Actions' },
    { label: 'Search Files', icon: Search, group: 'Navigation' },
    { label: 'Open Settings', icon: Settings, group: 'Navigation' },
    { label: 'Invite Team Member', icon: User, group: 'Actions' },
    { label: 'Toggle Theme', icon: Sparkles, group: 'Actions' },
  ];
  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <p className="nm-label mb-3">Command Menu (⌘K)</p>
      <button onClick={() => setOpen(true)} className="nm-btn nm-btn-secondary h-10 w-full justify-between px-4"><span className="inline-flex items-center gap-2"><Search className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Search commands…</span><kbd className="inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">⌘K</kbd></button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[2000] flex items-start justify-center p-4 pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="nm-slide-up relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--nm-shadow-xl)]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5"><Search className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type a command or search…" className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" autoFocus /><kbd className="rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">ESC</kbd></div>
            <div className="max-h-72 overflow-y-auto modern-scrollbar p-2">
              {filtered.length === 0 ? <p className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">No commands found for "{query}"</p> : filtered.map(c => <button key={c.label} onClick={() => setOpen(false)} className="nm-menu-item"><c.icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="flex-1">{c.label}</span><span className="nm-menu-shortcut">{c.group}</span></button>)}
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2.5 text-[10px] font-medium text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1"><CornerDownLeft className="size-3" strokeWidth={2.5} /> to select</span>
              <span className="inline-flex items-center gap-1"><ChevronDown className="size-3" strokeWidth={2.5} /><ChevronUp className="size-3" strokeWidth={2.5} /> to navigate</span>
            </div>
          </div>
        </div>, document.body)}
    </div>
  );
}

function ActionMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div>
      <p className="nm-label mb-3">Action Menu (kebab)</p>
      <div className="flex h-36 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--nm-shadow-xs)]">
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(!open)} className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><MoreHorizontal className="size-4" strokeWidth={2.5} /></button>
          {open && (
            <div className="nm-menu nm-fade-in absolute right-0 top-full z-50 mt-1.5 w-52 p-1">
              <button className="nm-menu-item"><Edit3 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Rename</button>
              <button className="nm-menu-item"><Copy className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Duplicate</button>
              <button className="nm-menu-item"><Share2 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Share</button>
              <button className="nm-menu-item"><Download className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Download</button>
              <div className="nm-menu-divider" />
              <button className="nm-menu-item nm-menu-item-danger"><Trash2 className="size-4" strokeWidth={2.5} /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div>
      <p className="nm-label mb-3">Profile Menu (avatar)</p>
      <div className="flex h-36 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--nm-shadow-xs)]">
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(!open)} className="rounded-full transition hover:ring-4 hover:ring-[rgba(70,95,255,0.12)]"><img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="" className="size-10 rounded-full object-cover" /></button>
          {open && (
            <div className="nm-menu nm-fade-in absolute right-0 top-full z-50 mt-1.5 w-60">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] p-3">
                <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="" className="size-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-[var(--text-strong)]">James Park</p><p className="truncate text-xs text-[var(--text-muted)]">james@mtverse.io</p></div>
              </div>
              <div className="p-1">
                <button className="nm-menu-item"><User className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> View Profile</button>
                <button className="nm-menu-item"><Settings className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Account Settings</button>
                <div className="nm-menu-divider" />
                <button className="nm-menu-item nm-menu-item-danger"><LogOut className="size-4" strokeWidth={2.5} /> Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkspaceMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div>
      <p className="nm-label mb-3">Workspace Menu</p>
      <div className="flex h-36 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--nm-shadow-xs)]">
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] py-1.5 pl-1.5 pr-3 transition hover:bg-[var(--surface-sunken)]">
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white"><Building2 className="size-4" strokeWidth={2.5} /></span>
            <span className="text-sm font-medium text-[var(--text-strong)]">Acme Inc.</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} strokeWidth={2.5} />
          </button>
          {open && (
            <div className="nm-menu nm-fade-in absolute left-0 top-full z-50 mt-1.5 w-60 p-1">
              <p className="nm-label px-2.5 py-1.5">Switch workspace</p>
              <button className="nm-menu-item"><span className="inline-flex size-6 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white"><Building2 className="size-3.5" strokeWidth={2.5} /></span><div className="flex-1"><p className="text-sm font-medium text-[var(--text-strong)]">Acme Inc.</p><p className="text-[10px] text-[var(--text-muted)]">Pro · 12 members</p></div><Check className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} /></button>
              <button className="nm-menu-item"><span className="inline-flex size-6 items-center justify-center rounded-lg bg-[var(--color-success-500)] text-white"><User className="size-3.5" strokeWidth={2.5} /></span><div className="flex-1"><p className="text-sm font-medium text-[var(--text-strong)]">Personal</p><p className="text-[10px] text-[var(--text-muted)]">Free · 1 member</p></div></button>
              <div className="nm-menu-divider" />
              <button className="nm-menu-item"><Plus className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Create new workspace</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ====================== ACCORDION IMPLEMENTATIONS ====================== */

function MinimalAccordion() {
  const [open, setOpen] = React.useState<string | null>('item-1');
  const items = [
    { id: 'item-1', title: 'Getting Started', content: 'Welcome to the platform. Here you can manage your projects, teams, and settings all in one place.' },
    { id: 'item-2', title: 'Account Settings', content: 'Configure your profile, password, two-factor authentication, and notification preferences.' },
    { id: 'item-3', title: 'Billing & Plans', content: 'View your current plan, upgrade or downgrade, manage payment methods, and download invoices.' },
  ];
  return (
    <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--nm-shadow-xs)]">
      {items.map((item) => (
        <div key={item.id}>
          <button onClick={() => setOpen(open === item.id ? null : item.id)} className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-[var(--surface-sunken)]">
            <span className="text-sm font-medium text-[var(--text-strong)]">{item.title}</span>
            <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open === item.id && 'rotate-180')} strokeWidth={2.5} />
          </button>
          {open === item.id && <div className="nm-slide-up px-4 pb-4 text-sm text-[var(--text-body)]">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

function NestedAccordion() {
  const [open, setOpen] = React.useState<string | null>('section-1');
  const [subOpen, setSubOpen] = React.useState<string | null>(null);
  const sections = [
    { id: 'section-1', title: 'Frontend', count: 12, children: [
      { id: 'sub-1', title: 'React Components', count: 8 },
      { id: 'sub-2', title: 'Vue Directives', count: 4 },
    ]},
    { id: 'section-2', title: 'Backend', count: 8, children: [
      { id: 'sub-3', title: 'API Routes', count: 5 },
      { id: 'sub-4', title: 'Database Models', count: 3 },
    ]},
  ];
  return (
    <div className="space-y-1.5">
      {sections.map((s) => (
        <div key={s.id} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--nm-shadow-xs)]">
          <button onClick={() => setOpen(open === s.id ? null : s.id)} className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-[var(--surface-sunken)]">
            <ChevronRight className={cn('size-4 text-[var(--text-muted)] transition-transform', open === s.id && 'rotate-90')} strokeWidth={2.5} />
            <span className="flex-1 text-sm font-medium text-[var(--text-strong)]">{s.title}</span>
            <span className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">{s.count}</span>
          </button>
          {open === s.id && (
            <div className="nm-slide-up border-t border-[var(--border-subtle)] py-1">
              {s.children.map((c) => (
                <div key={c.id}>
                  <button onClick={() => setSubOpen(subOpen === c.id ? null : c.id)} className="flex w-full items-center gap-2 py-2 pl-10 pr-4 text-left transition hover:bg-[var(--surface-sunken)]">
                    <ChevronRight className={cn('size-3.5 text-[var(--text-muted)] transition-transform', subOpen === c.id && 'rotate-90')} strokeWidth={2.5} />
                    <span className="flex-1 text-sm font-medium text-[var(--text-body)]">{c.title}</span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">{c.count}</span>
                  </button>
                  {subOpen === c.id && <p className="nm-slide-up py-2 pl-16 pr-4 text-xs text-[var(--text-muted)]">Explore the {c.count} items in this category.</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GlassAccordion() {
  const [open, setOpen] = React.useState<string | null>('glass-1');
  const items = [
    { id: 'glass-1', title: 'Glass Effect 1', content: 'This accordion uses backdrop-blur for a frosted glass effect.' },
    { id: 'glass-2', title: 'Glass Effect 2', content: 'Perfect for overlay UIs and modern dashboard designs.' },
    { id: 'glass-3', title: 'Glass Effect 3', content: 'Combine with gradients for stunning visual depth.' },
  ];
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl" style={{ backgroundImage: 'linear-gradient(135deg, rgba(70,95,255,0.08), rgba(122,90,248,0.06))' }}>
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <button onClick={() => setOpen(open === item.id ? null : item.id)} className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-white/5">
            <span className="text-sm font-medium text-[var(--text-strong)]">{item.title}</span>
            <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform', open === item.id && 'rotate-180')} strokeWidth={2.5} />
          </button>
          {open === item.id && <div className="nm-slide-up px-4 pb-3 text-sm text-[var(--text-body)]">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

function AnimatedAccordion() {
  const [open, setOpen] = React.useState<string | null>('anim-1');
  const items = [
    { id: 'anim-1', title: 'Smooth Animation', icon: Zap, content: 'The chevron rotates 180° while content fades and slides in. Pure CSS transitions keep it buttery smooth.' },
    { id: 'anim-2', title: 'Accessible', icon: Check, content: 'Keyboard navigable with proper ARIA attributes. Press Enter or Space to toggle.' },
    { id: 'anim-3', title: 'Production Ready', icon: Sparkles, content: 'Battle-tested in production. Works in all modern browsers without polyfills.' },
  ];
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={cn('overflow-hidden rounded-xl border bg-[var(--card)] shadow-[var(--nm-shadow-xs)] transition-all', open === item.id ? 'border-[var(--color-brand-300)] dark:border-[rgba(70,95,255,0.24)]' : 'border-[var(--border)]')}>
            <button onClick={() => setOpen(open === item.id ? null : item.id)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[var(--surface-sunken)]">
              <span className={cn('inline-flex size-8 items-center justify-center rounded-lg transition-colors', open === item.id ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}><Icon className="size-4" strokeWidth={2.5} /></span>
              <span className="flex-1 text-sm font-medium text-[var(--text-strong)]">{item.title}</span>
              <ChevronDown className={cn('size-4 text-[var(--text-muted)] transition-transform duration-300', open === item.id && 'rotate-180')} strokeWidth={2.5} />
            </button>
            {open === item.id && (
              <div className="nm-slide-up px-4 pb-4 pl-15 text-sm text-[var(--text-body)]" style={{ paddingLeft: '3.5rem' }}>
                <div className="border-l-2 border-[var(--color-brand-200)] pl-3 dark:border-[rgba(70,95,255,0.24)]">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
