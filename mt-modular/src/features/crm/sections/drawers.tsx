'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Phone, Mail, MessageSquare, Building2, Target, TrendingUp,
  TrendingDown, AlertTriangle, AlertCircle, Info, Star, CheckCircle2, XCircle,
  Plus, X, Search, Filter, Bell, Link2, Video, FileText, UserPlus, Briefcase,
  Zap, Activity, Calendar, Check, Linkedin, MessagesSquare, RefreshCw, Shield,
  Flame, Sparkles, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from '@/components/dashboards/analytics-interactions';
import { PremiumCard, CardHeader, CardActionMenu, Sparkline } from '@/shared';
import * as Data from '../data/mock-data';

import type { Contact, Deal, Conversation } from '../types';

export function NewContactDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (c: Contact) => void }) {
  const [form, setForm] = React.useState({ name: '', company: '', email: '', phone: '', owner: 'Darlene Robertson', stage: 'New Lead', value: '', notes: '' });
  React.useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open || typeof document === 'undefined') return null;
  function handleSubmit() {
    if (!form.name.trim() || !form.company.trim()) return;
    const newContact: Contact = {
      id: `ct${Date.now()}`,
      account: form.company.trim(),
      contact: form.name.trim(),
      owner: form.owner,
      stage: form.stage,
      value: form.value ? `$${form.value}` : '$0',
      health: 'healthy',
      lastTouch: 'Just now',
      nextAction: 'Initial outreach',
      status: 'Active',
    };
    onCreate(newContact);
    setForm({ name: '', company: '', email: '', phone: '', owner: 'Darlene Robertson', stage: 'New Lead', value: '', notes: '' });
    onClose();
  }
  const inputCls = 'h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]';
  const labelCls = 'mb-1.5 block text-xs font-semibold text-[var(--text-body)]';
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 220ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)]"
        style={{ animation: 'ecomDrawerIn 320ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="New contact"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-[0_4px_14px_-2px_rgba(70,95,255,0.45)]">
              <UserPlus className="size-5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-strong)]">New Contact</h3>
              <p className="text-xs text-[var(--text-muted)]">Add a new contact to CRM.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-6">
          <div>
            <label className={labelCls}>Contact name <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Cooper" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Company <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Acme Studio" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@acme.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0000" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Owner</label>
              <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className={cn(inputCls, 'cursor-pointer')}>
                <option>Darlene Robertson</option>
                <option>Kristin Watson</option>
                <option>Albert Flores</option>
                <option>Jane Cooper</option>
                <option>Devon Lane</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stage</label>
              <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className={cn(inputCls, 'cursor-pointer')}>
                <option>New Lead</option>
                <option>Qualified</option>
                <option>Demo</option>
                <option>Proposal</option>
                <option>Negotiation</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Estimated value ($)</label>
            <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="e.g. 84000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="Internal notes (optional)"
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.name.trim() || !form.company.trim()}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-[0_4px_14px_-2px_rgba(70,95,255,0.45)] transition hover:bg-[var(--color-brand-600)] hover:shadow-[0_6px_20px_-2px_rgba(70,95,255,0.55)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            Create contact
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

export function DealDetailDrawer({ deal, onClose }: { deal: Deal | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!deal) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [deal, onClose]);
  if (!deal || typeof document === 'undefined') return null;
  const riskTone = { low: 'success' as const, medium: 'warning' as const, high: 'error' as const };
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 220ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)]"
        style={{ animation: 'ecomDrawerIn 320ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="Deal detail"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--text-muted)]">
              <Building2 className="size-5" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-strong)]">{deal.account}</h3>
              <p className="text-xs text-[var(--text-muted)]">${(deal.value / 1000).toFixed(0)}K · {deal.stage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Owner</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)]">
                <UserAvatar name={deal.owner} size="xs" />
                {deal.owner}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Value</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--text-strong)]">${(deal.value / 1000).toFixed(0)}K</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Probability</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--text-strong)]">{deal.probability}%</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Risk</p>
              <div className="mt-1"><StatusBadge tone={riskTone[deal.risk]} dot>{deal.risk}</StatusBadge></div>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Days in stage</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--text-strong)]">{deal.daysInStage}d</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Stage</p>
              <p className="mt-1 text-sm font-semibold capitalize text-[var(--text-strong)]">{deal.stage}</p>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Next action</p>
            <p className="mt-1 text-sm text-[var(--text-body)]">{deal.nextAction}</p>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}

export function ConversationDetailDrawer({ conv, onClose }: { conv: Data.Conversation | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!conv) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [conv, onClose]);
  if (!conv || typeof document === 'undefined') return null;
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 220ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)]"
        style={{ animation: 'ecomDrawerIn 320ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="Conversation detail"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <UserAvatar name={conv.contact} size="sm" />
            <div>
              <h3 className="text-base font-semibold text-[var(--text-strong)]">{conv.contact}</h3>
              <p className="text-xs text-[var(--text-muted)]">{conv.account} · {conv.channel}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-6">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Message</p>
            <p className="mt-1.5 text-sm text-[var(--text-body)]">{conv.preview}</p>
            <p className="mt-2 text-[11px] text-[var(--text-muted)]">{conv.time}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-xl bg-[var(--color-brand-500)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-2px_rgba(70,95,255,0.45)] transition hover:bg-[var(--color-brand-600)]">Reply</button>
            <button className="flex-1 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Snooze</button>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}
