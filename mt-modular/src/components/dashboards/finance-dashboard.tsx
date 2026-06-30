'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, ChevronLeft, MoreHorizontal,
  Eye, Plus, X, Search, Filter, CreditCard, Wallet, TrendingUp, TrendingDown, Gauge, Receipt,
  Send, Snowflake, Sun, Building2, FileText, DollarSign, Landmark, PiggyBank, Briefcase,
  Plane, Megaphone, Code2, Users, Home as HomeIcon, Percent, CheckCircle2, Clock, AlertTriangle,
  Info, Link2, Bell, Shield, Zap, Activity, Banknote, ArrowRight, Snowflake as FreezeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './finance-data';
import type { CardItem, Invoice, Transaction, Recipient } from './finance-data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* ============================================================
   Brand icons (Netflix, Google Ads, AWS, Figma, PayPal, Stellar, Stripe)
   ============================================================ */
function BrandIcon({ brand, className }: { brand: Transaction['brand']; className?: string }) {
  const cls = cn('size-full', className);
  switch (brand) {
    case 'netflix':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path fill="#E50914" d="M14.5 3v18l-3.2-.05V12.6L8 20.95H5V3h3.2l.05 8.4L11.7 3h2.8z" />
          <path fill="#B20710" d="M5 3h3.2v18H5zM14.5 3H17v18h-3.2V12.6z" opacity="0.7" />
        </svg>
      );
    case 'google':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#fff" />
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#232F3E" />
          <path fill="#FF9900" d="M5 13.5c0 .25.05.43.13.55.04.06.08.1.13.13l.05.04v.04c-.04.06-.1.1-.18.1-.08 0-.18-.03-.3-.1-.12-.07-.22-.18-.31-.32-.18-.27-.27-.62-.27-1.04v-.02c0-.42.09-.77.27-1.04.09-.14.19-.25.31-.32.12-.07.22-.1.3-.1.08 0 .14.03.18.1v.04l-.05.04c-.05.03-.09.07-.13.13-.08.12-.13.3-.13.55z" />
          <path fill="#fff" d="M7.2 11.4c0-.06 0-.1-.04-.14-.03-.04-.07-.06-.12-.06-.06 0-.1.02-.14.06-.04.04-.06.08-.06.14v1.9l-1.5-2.04c-.04-.05-.08-.08-.13-.08h-.04c-.06 0-.1.02-.14.06-.04.04-.06.08-.06.14v2.84c0 .06.02.1.06.14.04.04.08.06.14.06.05 0 .1-.02.13-.06.04-.04.06-.08.06-.14v-1.94l1.5 2.06c.04.05.08.08.13.08h.04c.06 0 .1-.02.14-.06.04-.04.06-.08.06-.14v-2.84zM9.4 12.6c0-.06-.02-.1-.06-.14-.04-.04-.08-.06-.14-.06h-.86v-.86h1.06c.06 0 .1-.02.14-.06.04-.04.06-.08.06-.14 0-.05-.02-.1-.06-.13-.04-.04-.08-.06-.14-.06H8.16c-.06 0-.1.02-.14.06-.04.04-.06.08-.06.14v2.84c0 .06.02.1.06.14.04.04.08.06.14.06h1.18c.06 0 .1-.02.14-.06.04-.04.06-.08.06-.14 0-.05-.02-.1-.06-.13-.04-.04-.08-.06-.14-.06h-.96v-.94h.82c.06 0 .1-.02.14-.06.04-.04.06-.08.06-.14zM11.6 14.2c.4 0 .72-.14.96-.42.2-.24.3-.55.3-.92v-1.46c0-.06-.02-.1-.06-.14-.04-.04-.08-.06-.14-.06s-.1.02-.14.06c-.04.04-.06.08-.06.14v1.46c0 .25-.07.45-.22.6-.15.16-.35.24-.6.24s-.45-.08-.6-.24c-.15-.15-.22-.35-.22-.6v-1.46c0-.06-.02-.1-.06-.14-.04-.04-.08-.06-.14-.06s-.1.02-.14.06c-.04.04-.06.08-.06.14v1.46c0 .37.1.68.3.92.24.28.56.42.96.42zM14.6 14.18c.42 0 .76-.14 1.04-.42.04-.04.06-.08.06-.14 0-.06-.02-.1-.06-.14-.04-.04-.08-.06-.14-.06-.05 0-.1.02-.14.06-.2.18-.45.28-.74.28-.3 0-.55-.1-.76-.32-.2-.2-.3-.46-.3-.76s.1-.55.3-.76c.2-.21.46-.32.76-.32.27 0 .5.08.7.24.04.04.08.05.13.05.06 0 .1-.02.14-.06.04-.04.06-.08.06-.14 0-.06-.02-.1-.06-.14-.24-.2-.55-.3-.92-.3-.4 0-.74.14-1.02.42-.27.27-.4.62-.4 1.04 0 .42.13.77.4 1.04.28.28.62.42 1.02.42zM18.3 14.18c.4 0 .74-.14 1.02-.42.27-.27.4-.62.4-1.04 0-.42-.13-.77-.4-1.04-.28-.28-.62-.42-1.02-.42-.4 0-.74.14-1.02.42-.27.27-.4.62-.4 1.04 0 .42.13.77.4 1.04.28.28.62.42 1.02.42zm0-.42c-.3 0-.55-.1-.76-.32-.2-.2-.3-.46-.3-.72s.1-.52.3-.72c.2-.22.46-.32.76-.32s.55.1.76.32c.2.2.3.46.3.72s-.1.52-.3.72c-.2.22-.46.32-.76.32z" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#1E1E1E" />
          <path fill="#F24E1E" d="M8.4 12c0-1.1.9-2 2-2H12v4H10.4c-1.1 0-2-.9-2-2z" />
          <path fill="#FF7262" d="M12 2H10.4c-1.1 0-2 .9-2 2s.9 2 2 2H12V2z" />
          <path fill="#A259FF" d="M8.4 6c0-1.1.9-2 2-2H12v4H10.4c-1.1 0-2-.9-2-2z" />
          <path fill="#1ABCFE" d="M12 6h1.6c1.1 0 2-.9 2-2s-.9-2-2-2H12v4z" />
          <path fill="#0ACF83" d="M8.4 12c0 1.1.9 2 2 2H12v-2H8.4z" />
          <path fill="#FF7262" d="M12 12h1.6c1.1 0 2-.9 2-2s-.9-2-2-2H12v4z" />
          <path fill="#A259FF" d="M8.4 18c0-1.1.9-2 2-2H12v2c0 1.1-.9 2-2 2s-1.6-.9-1.6-2z" />
          <path fill="#0ACF83" d="M12 12h1.6c1.1 0 2 .9 2 2s-.9 2-2 2H12v-4z" />
        </svg>
      );
    case 'paypal':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#fff" />
          <path fill="#003087" d="M7.5 6.5h4.6c2 0 3.5 1.4 3.2 3.6-.3 2.2-2 3.6-4.1 3.6H9.7l-.4 2.4c-.05.3-.3.5-.6.5H7.1c-.15 0-.25-.1-.2-.25l1.1-7.4c.05-.3.3-.5.6-.5h-1c-.15 0-.25-.1-.2-.25z" />
          <path fill="#0070E0" d="M9.7 13.7h1.5c1.7 0 3.2-1.2 3.5-3.2.3-2-.9-3.6-2.7-3.6h-1.5l-.8 5.4z" />
          <path fill="#009CDE" d="M14.7 9.5c-.2 2-1.8 3.2-3.5 3.2h-1.5l-.4 2.7c-.05.3-.3.5-.6.5H7.1c-.15 0-.25-.1-.2-.25l1.1-7.4c.05-.3.3-.5.6-.5h2.1l-.6 4h1.5c1.7 0 3.2-1.2 3.5-3.2z" />
        </svg>
      );
    case 'stellar':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#7D00FF" />
          <path fill="#fff" d="M5 8.5l1.2.5 8.4 3.6 1.2.5c.4.2.4.6 0 .8l-1.2.5-8.4 3.6L5 18.5c-.4.2-.7-.1-.7-.5v-9c0-.4.3-.7.7-.5z" opacity="0.85" />
          <path fill="#fff" d="M16 8.5l1.2.5c.4.2.4.6 0 .8l-1.2.5-1.2-.5c-.4-.2-.4-.6 0-.8l1.2-.5zm0 6l1.2.5c.4.2.4.6 0 .8l-1.2.5-1.2-.5c-.4-.2-.4-.6 0-.8l1.2-.5z" opacity="0.65" />
          <path fill="#fff" d="M19 11.5l.4.2c.2.1.2.3 0 .4l-.4.2-.4-.2c-.2-.1-.2-.3 0-.4l.4-.2z" />
        </svg>
      );
    case 'stripe':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#635BFF" />
          <path fill="#fff" d="M13.5 9.9c-.7-.3-1.2-.4-1.7-.4-.7 0-1.1.3-1.1.7 0 .5.5.7 1.5 1.1 1.4.5 2.1 1.1 2.1 2.3 0 1.6-1.3 2.5-3 2.5-.9 0-1.7-.2-2.4-.5l.3-1.5c.6.3 1.5.6 2.2.6.8 0 1.2-.3 1.2-.8 0-.5-.4-.8-1.4-1.1-1.4-.5-2.2-1.1-2.2-2.3 0-1.4 1.2-2.4 2.8-2.4.8 0 1.5.2 2.1.4l-.4 1.4z" />
        </svg>
      );
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#fff" />
          <path fill="#E01E5A" d="M5 15.2a2 2 0 1 1 .5-3.9l1.2.4-.5 1.5-.4-.1a.5.5 0 1 0-.2 1l.4.1-.2 1.4-.8-.4z" />
          <path fill="#36C5F0" d="M8.8 5a2 2 0 1 1 3.9.5l-.4 1.2-1.5-.5.1-.4a.5.5 0 1 0-1-.2l-.1.4-1.4-.2.4-.8z" />
          <path fill="#2EB67D" d="M19 8.8a2 2 0 1 1-.5 3.9l-1.2-.4.5-1.5.4.1a.5.5 0 1 0 .2-1l-.4-.1.2-1.4.8.4z" />
          <path fill="#ECB22E" d="M15.2 19a2 2 0 1 1-3.9-.5l.4-1.2 1.5.5-.1.4a.5.5 0 1 0 1 .2l.1-.4 1.4.2-.4.8z" />
          <path fill="#E01E5A" d="M5 15.2a2 2 0 0 1 .5-3.9l3.3-.4.4 1.5-3.3.4a.5.5 0 0 0-.2 1l-.7 1.4z" opacity="0.9" />
          <path fill="#36C5F0" d="M8.8 5a2 2 0 0 1 3.9.5l.4 3.3-1.5.4-.4-3.3a.5.5 0 0 0-1-.2l-1.4-.7z" opacity="0.9" />
          <path fill="#2EB67D" d="M19 8.8a2 2 0 0 1-.5 3.9l-3.3.4-.4-1.5 3.3-.4a.5.5 0 0 0 .2-1l.7-1.4z" opacity="0.9" />
          <path fill="#ECB22E" d="M15.2 19a2 2 0 0 1-3.9-.5l-.4-3.3 1.5-.4.4 3.3a.5.5 0 0 0 1 .2l1.4.7z" opacity="0.9" />
        </svg>
      );
    case 'mercury':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <circle cx="12" cy="12" r="6" fill="none" stroke="#9FE870" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.4" fill="#9FE870" />
        </svg>
      );
    case 'chase':
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <rect width="24" height="24" rx="6" fill="#117ACA" />
          <path fill="#fff" d="M9 5h6v3.4H9V5zm0 4.3h6v3.4H9V9.3zm0 4.3h6V17H9v-3.4zM4.6 13.6h6V17h-6v-3.4zm8.8 0h6V17h-6v-3.4z" />
        </svg>
      );
  }
}

/* Visa / Mastercard tiny marks */
function CardBrandMark({ type, className }: { type: 'visa' | 'mastercard'; className?: string }) {
  if (type === 'visa') {
    return (
      <svg viewBox="0 0 48 16" className={cn('h-3.5', className)} aria-hidden="true">
        <text x="0" y="13" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="700" fontStyle="italic" fill="#fff" letterSpacing="0.5">VISA</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 20" className={cn('h-4', className)} aria-hidden="true">
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" />
      <path d="M16 4.2a8 8 0 0 0 0 11.6 8 8 0 0 0 0-11.6z" fill="#FF5F00" />
    </svg>
  );
}

/* ============================================================
   Shared CardActionMenu — three-dot menu
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handle(action: string) { setOpen(false); toast({ title: `${action} — ${cardName}` }); }
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label={`Actions for ${cardName}`}><MoreHorizontal className="size-4" strokeWidth={2.2} /></button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={180}>
        <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p></div>
        <PopoverItem icon={Eye} onClick={() => handle('View details')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handle('Download report')}>Download report</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handle('Copy link')}>Copy link</PopoverItem>
      </Popover>
    </div>
  );
}

/* Mini sparkline for inline trends */
function MiniSparkline({ data, color = '#465FFF', height = 28, width = 70 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const id = React.useId();
  const max = Math.max(...data), min = Math.min(...data), rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs><linearGradient id={`fin-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={areaPath} fill={`url(#fin-${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray="100" strokeDashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur="900ms" fill="freeze" begin="100ms" /></polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2.2" fill={color}><animate attributeName="r" values="2.2;3.6;2.2" dur="2.4s" repeatCount="indefinite" /></circle>
    </svg>
  );
}

/* ============================================================
   Finance Header — breadcrumb + selectors + actions
   ============================================================ */
function FinanceHeader({ onAddTransaction }: { onAddTransaction: () => void }) {
  const { toast } = useToast();
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [yearOpen, setYearOpen] = React.useState(false);
  const [periodOpen, setPeriodOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [accountId, setAccountId] = React.useState(Data.accounts[0].id);
  const [year, setYear] = React.useState('2026');
  const [period, setPeriod] = React.useState('3 Month');

  const account = Data.accounts.find((a) => a.id === accountId)!;

  function closeAll(except?: string) {
    if (except !== 'account') setAccountOpen(false);
    if (except !== 'year') setYearOpen(false);
    if (except !== 'period') setPeriodOpen(false);
    if (except !== 'export') setExportOpen(false);
  }

  function handleExport(fmt: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    toast({ title: `${fmt.toUpperCase()} export prepared`, description: `Finance report for ${account.name} generated.` });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span><ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">Finance</span>
        </nav>
        <h1 className="ds-page-title">Finance Control Center</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Monitor cashflow, expenses, invoices, budgets, cards, and payment activity.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Account selector */}
        <div className="relative">
          <button type="button" onClick={() => { closeAll('account'); setAccountOpen((p) => !p); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="dialog" aria-expanded={accountOpen}>
            <Landmark className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline max-w-[160px] truncate">{account.name}</span>
            <span className="sm:hidden">Account</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', accountOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={accountOpen} onClose={() => setAccountOpen(false)} align="right" width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Linked accounts</p></div>
            {Data.accounts.map((a) => (
              <PopoverItem key={a.id} active={a.id === accountId} onClick={() => { setAccountId(a.id); setAccountOpen(false); toast({ title: 'Account switched', description: `${a.name} · ${a.bank} ··${a.last4}` }); }}>
                <span className="flex w-full items-center justify-between">
                  <span className="flex flex-col"><span className="text-xs font-medium">{a.name}</span><span className="text-[10px] text-[var(--text-muted)]">{a.bank} ··{a.last4}</span></span>
                  <span className="text-[10px] font-semibold tabular-nums text-[var(--text-muted)]">${(a.balance / 1000).toFixed(1)}K</span>
                </span>
              </PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Year selector */}
        <div className="relative">
          <button type="button" onClick={() => { closeAll('year'); setYearOpen((p) => !p); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="dialog" aria-expanded={yearOpen}>
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />{year}
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', yearOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={yearOpen} onClose={() => setYearOpen(false)} align="right" width={120}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Fiscal year</p></div>
            {Data.years.map((y) => (<PopoverItem key={y} active={y === year} onClick={() => { setYear(y); setYearOpen(false); toast({ title: 'Year updated', description: `Viewing fiscal year ${y}` }); }}>{y}</PopoverItem>))}
          </Popover>
        </div>
        {/* Period selector */}
        <div className="relative">
          <button type="button" onClick={() => { closeAll('period'); setPeriodOpen((p) => !p); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="dialog" aria-expanded={periodOpen}>
            <Clock className="size-4 text-[var(--text-muted)]" strokeWidth={2} />{period}
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', periodOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={periodOpen} onClose={() => setPeriodOpen(false)} align="right" width={200}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Period</p></div>
            {Data.periodPresets.map((p) => (<PopoverItem key={p.key} active={p.label === period} onClick={() => { setPeriod(p.label); setPeriodOpen(false); toast({ title: 'Period updated', description: p.range }); }}>{p.label}</PopoverItem>))}
          </Popover>
        </div>
        {/* Export */}
        <div className="relative">
          <button type="button" onClick={() => { closeAll('export'); setExportOpen((p) => !p); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="menu" aria-expanded={exportOpen}>
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />Export
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} align="right" width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
          </Popover>
        </div>
        {/* Add transaction */}
        <button type="button" onClick={onAddTransaction} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">
          <Plus className="size-4" strokeWidth={2.4} />Add transaction
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Cashflow Overview Hero — stacked bar + line overlay + tabs
   ============================================================ */
function CashflowHero({ tab, onTabChange }: { tab: 'monthly' | 'quarterly' | 'yearly'; onTabChange: (t: 'monthly' | 'quarterly' | 'yearly') => void }) {
  const series = Data.cashflowSeries[tab];

  const options: any = {
    chart: {
      type: 'line',
      height: 360,
      fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
      stacked: true,
      animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 60 }, dynamicAnimation: { enabled: true, speed: 350 } },
    },
    colors: ['#12B76A', '#F04438', '#465FFF'],
    plotOptions: {
      bar: {
        columnWidth: '52%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [0, 0, 3], lineCap: 'round' },
    fill: { opacity: [1, 1, 1] },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: {
      categories: series.map((p) => p.label),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, rotate: 0, trim: true, hideOverlappingLabels: true },
      axisBorder: { show: false }, axisTicks: { show: false },
      crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 }, fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.05 } },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => (Math.abs(v) >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`),
      },
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 12, vertical: 0 } },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      custom: ({ dataPointIndex, seriesIndex }: any) => {
        const p = series[dataPointIndex];
        // Determine which series triggered (0 = income, 1 = expense, 2 = net line)
        const isIncome = seriesIndex === 0;
        const isExpense = seriesIndex === 1;
        const isNet = seriesIndex === 2 || seriesIndex === undefined;
        const headline = isNet ? 'Net cashflow' : isIncome ? 'Income' : 'Expense';
        const headlineColor = isNet ? '#465FFF' : isIncome ? '#12B76A' : '#F04438';
        const headlineValue = isNet ? p.net : isIncome ? p.income : p.expense;
        const noteBlock = p.note ? `<div style="display:flex;align-items:center;gap:6px;margin-top:8px;padding:4px 8px;border-radius:6px;background:rgba(70,95,255,0.12);color:#465FFF;font-size:10px;font-weight:500;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 8V4M12 16v4M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4"/></svg>${p.note}</div>` : '';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;">
          <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.label}</div>
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;">
            <span style="font-size:11px;color:${headlineColor};font-weight:500;">${headline}</span>
            <span style="font-size:15px;color:${headlineColor};font-weight:600;font-variant-numeric:tabular-nums;">$${headlineValue.toLocaleString()}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:11px;border-top:1px solid var(--border-subtle);padding-top:8px;">
            <span style="color:var(--text-body);">Income</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">+$${p.income.toLocaleString()}</span>
            <span style="color:var(--text-body);">Expense</span><span style="color:#F04438;font-weight:600;font-variant-numeric:tabular-nums;">−$${p.expense.toLocaleString()}</span>
            <span style="color:var(--text-body);">Net cashflow</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.net >= 0 ? '+' : '−'}$${Math.abs(p.net).toLocaleString()}</span>
            <span style="color:var(--text-body);">Burn rate</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${p.burn.toLocaleString()}/mo</span>
          </div>${noteBlock}
        </div>`;
      },
    },
    markers: { size: 0, hover: { size: 6, sizeOffset: 3 }, strokeColors: 'var(--card)', strokeWidth: 2 },
  };

  const chartSeries = [
    { name: 'Income', type: 'bar', data: series.map((p) => p.income) },
    { name: 'Expense', type: 'bar', data: series.map((p) => -p.expense) },
    { name: 'Net cashflow', type: 'line', data: series.map((p) => p.net) },
  ];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Activity className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Cashflow Overview</h2>
            <p className="text-xs text-[var(--text-muted)]">Income vs expense by {tab === 'yearly' ? 'year' : tab === 'quarterly' ? 'quarter' : 'month'} · net cashflow overlay.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
            {(['monthly', 'quarterly', 'yearly'] as const).map((t) => (
              <button key={t} type="button" onClick={() => onTabChange(t)} data-active={tab === t} className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]">{t}</button>
            ))}
          </div>
          <CardActionMenu cardName="Cashflow Overview" />
        </div>
      </div>
      {/* Metric strip */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <MetricPill label="Total cash" value={`$${Data.cashflowOverview.totalCash.toLocaleString()}`} icon={Wallet} accent="#465FFF" sub="Across 3 accounts" />
        <MetricPill label="Income" value={`$${Data.cashflowOverview.income.toLocaleString()}`} icon={TrendingUp} accent="#12B76A" change={`+${Data.cashflowOverview.incomeChange}%`} />
        <MetricPill label="Expenses" value={`$${Data.cashflowOverview.expenses.toLocaleString()}`} icon={TrendingDown} accent="#F04438" change={`${Data.cashflowOverview.expensesChange}%`} />
        <MetricPill label="Net cashflow" value={`+$${Data.cashflowOverview.netCashflow.toLocaleString()}`} icon={ArrowUp} accent="#7A5AF8" change={`+${Data.cashflowOverview.netChange}%`} />
        <MetricPill label="Burn rate" value={`$${Data.cashflowOverview.burnRate.toLocaleString()}/mo`} icon={Gauge} accent="#F79009" sub={`${Data.cashflowOverview.runwayMonths} mo runway`} />
      </div>
      <Chart options={options} series={chartSeries} type="line" height={360} />
    </section>
  );
}

function MetricPill({ label, value, icon: Icon, accent, change, sub }: { label: string; value: string; icon: React.ElementType; accent: string; change?: string; sub?: string }) {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
        <span className="inline-flex size-6 items-center justify-center rounded-md" style={{ backgroundColor: `${accent}1a`, color: accent }}><Icon className="size-3.5" strokeWidth={2.2} /></span>
      </div>
      <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{value}</p>
      {change && <p className={cn('mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium', isPositive ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : isNegative ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-muted)]')}>{change} <span className="text-[var(--text-subtle)]">vs last</span></p>}
      {sub && !change && <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{sub}</p>}
    </div>
  );
}

/* ============================================================
   My Cards wallet — carousel with freeze/unfreeze
   ============================================================ */
function MyCardsRail({ cards, onAddCard, onToggleFreeze }: { cards: CardItem[]; onAddCard: () => void; onToggleFreeze: (id: string) => void }) {
  const { toast } = useToast();
  const [index, setIndex] = React.useState(0);
  const active = cards[index];

  React.useEffect(() => { if (index >= cards.length) setIndex(Math.max(0, cards.length - 1)); }, [cards.length, index]);

  function prev() { setIndex((p) => (p - 1 + cards.length) % cards.length); }
  function next() { setIndex((p) => (p + 1) % cards.length); }

  const usagePct = active ? Math.min(100, (active.spent / active.limit) * 100) : 0;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><CreditCard className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">My Cards</h3>
            <p className="text-[11px] text-[var(--text-muted)]">{cards.length} cards · swipe to switch</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={prev} disabled={cards.length <= 1} aria-label="Previous card" className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="size-3.5" strokeWidth={2.2} /></button>
          <button type="button" onClick={next} disabled={cards.length <= 1} aria-label="Next card" className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="size-3.5" strokeWidth={2.2} /></button>
        </div>
      </div>

      {/* Stylized card preview */}
      {active && (
        <div className="relative">
          <div
            key={active.id}
            className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl p-4 text-white shadow-lg"
            style={{ background: active.accent, animation: 'finCardIn 360ms cubic-bezier(0.32, 0.72, 0, 1)' }}
          >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 size-32 rounded-full bg-black/10 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">{active.name}</p>
                  <p className="mt-0.5 text-xs text-white/80">{active.category}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider', active.status === 'active' ? 'bg-white/20 text-white' : 'bg-black/30 text-white/80')}>
                    {active.status === 'active' ? <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-white" /></span> : <FreezeIcon className="size-2.5" strokeWidth={2.4} />}
                    {active.status === 'active' ? 'Active' : 'Frozen'}
                  </span>
                </div>
              </div>
              {/* Chip */}
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-500/80 shadow-inner" />
                <div className="h-5 w-7 rounded-sm border border-white/30 bg-white/5" />
              </div>
              <div className="flex items-end justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-sm tracking-[0.16em] text-white drop-shadow-sm sm:text-base sm:tracking-[0.18em]">•••• {active.last4}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-white/80 sm:gap-3">
                    <span className="shrink-0"><span className="opacity-60">EXP</span> {active.expiry}</span>
                    <span className="truncate uppercase">{active.holder}</span>
                  </div>
                </div>
                <CardBrandMark type={active.type} />
              </div>
            </div>
          </div>

          {/* Card meta + actions */}
          <div className="mt-3 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)]">Spent this cycle</span>
              <span className="font-medium tabular-nums text-[var(--text-strong)]">${active.spent.toLocaleString()} <span className="text-[var(--text-muted)]">/ ${active.limit.toLocaleString()}</span></span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${usagePct}%`, background: usagePct > 80 ? '#F04438' : usagePct > 60 ? '#F79009' : '#12B76A' }} />
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5 text-xs">
              <span className="text-[var(--text-muted)]">Available</span>
              <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">${(active.limit - active.spent).toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFreeze(active.id)}
              className={cn(
                'inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition',
                active.status === 'active'
                  ? 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]'
                  : 'border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]'
              )}
            >
              {active.status === 'active' ? <><FreezeIcon className="size-3.5" strokeWidth={2.2} />Freeze card</> : <><Sun className="size-3.5" strokeWidth={2.2} />Unfreeze card</>}
            </button>
            <button type="button" onClick={() => toast({ title: 'Card details', description: `${active.name} ··${active.last4} copied to clipboard` })} className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Eye className="size-3.5" strokeWidth={2.2} />Details</button>
          </div>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {cards.map((c, i) => (
              <button key={c.id} type="button" onClick={() => setIndex(i)} aria-label={`Card ${i + 1}`} className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-5 bg-[var(--color-brand-500)]' : 'w-1.5 bg-[var(--border-strong)] hover:bg-[var(--text-subtle)]')} />
            ))}
          </div>
        </div>
      )}

      <button type="button" onClick={onAddCard} className="mt-4 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-strong)] text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--color-brand-500)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-600)] dark:hover:bg-[rgba(70,95,255,0.08)] dark:hover:text-[var(--color-brand-300)]"><Plus className="size-3.5" strokeWidth={2.2} />Add new card</button>
    </section>
  );
}

/* ============================================================
   Runway Gauge — radial gauge with assumptions hover
   ============================================================ */
function RunwayGaugeCard() {
  const { toast } = useToast();
  const months = Data.runway.months;
  // Map runway (0–24 months) to a 0-100 gauge value, capped at 24
  const gaugePct = Math.min(100, (months / 24) * 100);

  const options: any = {
    chart: { type: 'radialBar', height: 220, fontFamily: 'Outfit, sans-serif', sparkline: { enabled: false }, animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 80 }, dynamicAnimation: { enabled: true, speed: 350 } } },
    plotOptions: {
      radialBar: {
        startAngle: -135, endAngle: 135,
        hollow: { size: '72%', background: 'transparent' },
        track: { background: 'var(--surface-sunken)', strokeWidth: '100%', margin: 4 },
        dataLabels: {
          name: { show: true, fontSize: '11px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, color: 'var(--text-muted)', offsetY: 38, formatter: () => 'MONTHS RUNWAY' },
          value: { show: true, fontSize: '34px', fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--text-strong)', offsetY: -8, formatter: () => `${months.toFixed(1)}` },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: { shade: 'light', type: 'horizontal', gradientToColors: ['#7A5AF8'], stops: [0, 100] },
    },
    colors: ['#465FFF'],
    stroke: { lineCap: 'round' },
    tooltip: {
      enabled: true,
      custom: () => `<div style="background:var(--popover);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-family:Outfit,sans-serif;font-size:11px;color:var(--text-body);box-shadow:0 8px 20px -6px rgba(15,23,42,0.18);">${months.toFixed(1)} months at current $${Data.runway.burnRate.toLocaleString()}/mo burn.</div>`,
    },
  };

  const riskColor = Data.runway.forecastRisk === 'Low' ? '#12B76A' : Data.runway.forecastRisk === 'Moderate' ? '#F79009' : '#F04438';

  return (
    <section className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Gauge className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Runway Gauge</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Cash runway forecast</p>
          </div>
        </div>
        <CardActionMenu cardName="Runway Gauge" />
      </div>

      <Chart options={options} series={[gaugePct]} type="radialBar" height={220} />

      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3 text-center">
        <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Burn rate</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">${(Data.runway.burnRate / 1000).toFixed(1)}K<span className="text-[10px] text-[var(--text-muted)]">/mo</span></p></div>
        <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Cash</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">${(Data.runway.cashBalance / 1000).toFixed(1)}K</p></div>
        <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Risk</p><p className="text-sm font-medium" style={{ color: riskColor }}>{Data.runway.forecastRisk}</p></div>
      </div>

      {/* Hover-revealed assumptions */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-3 space-y-1.5 border-t border-[var(--border-subtle)] pt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]"><Info className="size-3" strokeWidth={2.2} />Forecast assumptions</div>
            {Data.runway.assumptions.map((a) => (
              <div key={a.label} className="flex items-center justify-between text-xs"><span className="text-[var(--text-muted)]">{a.label}</span><span className="font-medium tabular-nums text-[var(--text-body)]">{a.value}</span></div>
            ))}
            <button type="button" onClick={() => toast({ title: 'Runway scenario planner', description: 'Detailed forecast model opened.' })} className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-[var(--border)] py-1.5 text-[10px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Open scenario planner <ArrowRight className="size-3" strokeWidth={2.2} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Budget Variance — variance bars (actual vs budget)
   ============================================================ */
function BudgetVarianceCard() {
  const { toast } = useToast();
  const iconMap = { payroll: Users, marketing: Megaphone, software: Code2, contractors: Briefcase, travel: Plane, office: HomeIcon, taxes: Percent };
  const maxBudget = Math.max(...Data.budgetVariance.map((c) => c.budget));

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Scale className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Budget Variance</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Actual vs budget by category · Q2 2026</p>
          </div>
        </div>
        <CardActionMenu cardName="Budget Variance" />
      </div>

      <div className="space-y-3.5">
        {Data.budgetVariance.map((cat) => {
          const Icon = iconMap[cat.icon];
          const actualPct = (cat.actual / maxBudget) * 100;
          const budgetPct = (cat.budget / maxBudget) * 100;
          const variance = cat.actual - cat.budget;
          const variancePct = (variance / cat.budget) * 100;
          const over = variance > 0;
          return (
            <div key={cat.name} className="group">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-md" style={{ backgroundColor: `${cat.color}1a`, color: cat.color }}><Icon className="size-3" strokeWidth={2.2} /></span>
                  <span className="text-xs font-medium text-[var(--text-strong)]">{cat.name}</span>
                </div>
                <div className="flex items-baseline gap-1.5 text-xs">
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">${(cat.actual / 1000).toFixed(1)}K</span>
                  <span className="text-[var(--text-subtle)]">/ ${(cat.budget / 1000).toFixed(1)}K</span>
                  <span className={cn('inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium', over ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]')}>
                    {over ? <ArrowUp className="size-2.5" strokeWidth={2.4} /> : <ArrowDown className="size-2.5" strokeWidth={2.4} />}{Math.abs(variancePct).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative h-2.5 w-full rounded-full bg-[var(--surface-sunken)]">
                {/* Budget ghost bar */}
                <div className="absolute inset-y-0 left-0 rounded-full border-2 border-dashed border-[var(--border-strong)] opacity-60" style={{ width: `${budgetPct}%` }} />
                {/* Actual bar */}
                <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-700" style={{ width: `${actualPct}%`, background: cat.color }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100">
                <span>{over ? 'Over' : 'Under'} by ${Math.abs(variance).toLocaleString()}</span>
                <button type="button" onClick={() => toast({ title: `${cat.name} budget`, description: `${over ? 'Over budget' : 'Under budget'} by $${Math.abs(variance).toLocaleString()} (${Math.abs(variancePct).toFixed(1)}%)` })} className="cursor-pointer text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">View ledger →</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--color-brand-500)]" /><span className="text-[var(--text-muted)]">Actual</span></span>
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full border border-dashed border-[var(--border-strong)]" /><span className="text-[var(--text-muted)]">Budget</span></span>
        </div>
        <span className="text-[var(--text-muted)]">Total: <span className="font-medium tabular-nums text-[var(--text-strong)]">${(Data.budgetVariance.reduce((s, c) => s + c.actual, 0) / 1000).toFixed(1)}K</span></span>
      </div>
    </section>
  );
}

/* Re-import Scale locally to avoid hoist confusion (used above) */
function Scale(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 16.5c0 .3-.2.5-.5.5h-7c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h7c.3 0 .5.2.5.5z" />
      <path d="M12 3v14" />
      <path d="M8 7l-4 6h8l-4-6z" />
      <path d="M16 7l-4 6h8l-4-6z" />
      <path d="M5 20h14" />
    </svg>
  );
}

/* ============================================================
   Expense Categories — treemap + side cards
   ============================================================ */
function ExpenseCategoriesCard() {
  const { toast } = useToast();
  const [hovered, setHovered] = React.useState<number | null>(null);
  const total = Data.expenseCategories.reduce((s, c) => s + c.amount, 0);

  const options: any = {
    chart: { type: 'treemap', height: 320, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 700 } },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        borderRadius: 8,
        dataLabels: { format: 'truncate' },
      },
    },
    colors: Data.expenseCategories.map((c) => c.color),
    dataLabels: {
      enabled: true,
      formatter: (val: string, opts: any) => {
        const cat = Data.expenseCategories[opts.dataPointIndex];
        if (!cat) return val;
        const pct = ((cat.amount / total) * 100).toFixed(1);
        return [cat.name, `$${(cat.amount / 1000).toFixed(1)}K · ${pct}%`];
      },
      style: { fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 600, colors: ['#fff'] },
      dropShadow: { enabled: false },
    },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const c = Data.expenseCategories[dataPointIndex];
        const pct = ((c.amount / total) * 100).toFixed(1);
        const varianceText = c.variancePct === 0 ? 'On budget' : c.variancePct > 0 ? `+${c.variancePct.toFixed(1)}% over budget` : `${c.variancePct.toFixed(1)}% under budget`;
        const varianceColor = c.variancePct > 0 ? '#F04438' : c.variancePct < 0 ? '#12B76A' : '#64748B';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:200px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="size:8px;width:8px;height:8px;border-radius:50%;background:${c.color};display:inline-block;"></span>
            <span style="font-size:12px;font-weight:600;color:var(--text-strong);">${c.name}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:3px 14px;font-size:11px;">
            <span style="color:var(--text-muted);">Amount</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${c.amount.toLocaleString()}</span>
            <span style="color:var(--text-muted);">Share</span><span style="color:var(--text-body);font-weight:500;">${pct}%</span>
            <span style="color:var(--text-muted);">Transactions</span><span style="color:var(--text-body);font-weight:500;">${c.transactions}</span>
            <span style="color:var(--text-muted);">Budget variance</span><span style="color:${varianceColor};font-weight:600;">${varianceText}</span>
          </div>
        </div>`;
      },
    },
    legend: { show: false },
    states: { normal: { filter: { type: 'none' } }, hover: { filter: { type: 'darken', value: 0.92 } } },
  };

  const chartSeries = [{ data: Data.expenseCategories.map((c) => ({ x: c.name, y: c.amount })) }];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><PieChart className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Expense Categories</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Treemap by spend · hover for variance</p>
          </div>
        </div>
        <CardActionMenu cardName="Expense Categories" />
      </div>
      <Chart options={options} series={chartSeries} type="treemap" height={320} />

      {/* Category mini cards */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {Data.expenseCategories.map((cat, i) => (
          <button
            key={cat.name}
            type="button"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => toast({ title: `${cat.name} ledger`, description: `${cat.transactions} transactions · $${cat.amount.toLocaleString()} · ${cat.variancePct > 0 ? '+' : ''}${cat.variancePct.toFixed(1)}% variance` })}
            className={cn('rounded-xl border bg-[var(--surface-sunken)]/40 p-2.5 text-left transition', hovered === i ? 'border-[var(--border-strong)] shadow-sm' : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]')}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="size-2 rounded-full" style={{ background: cat.color }} />
              {cat.trend === 'up' ? <ArrowUp className="size-2.5 text-[var(--color-error-500)]" strokeWidth={2.4} /> : cat.trend === 'down' ? <ArrowDown className="size-2.5 text-[var(--color-success-500)]" strokeWidth={2.4} /> : <span className="size-2.5" />}
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">{cat.name}</p>
            <p className="text-xs font-semibold tabular-nums text-[var(--text-strong)]">${(cat.amount / 1000).toFixed(1)}K</p>
            <p className="text-[9px] text-[var(--text-subtle)]">{cat.share.toFixed(1)}% · {cat.transactions} txns</p>
          </button>
        ))}
      </div>
    </section>
  );
}

/* PieChart icon (used above) */
function PieChart(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

/* ============================================================
   Invoice Aging — segmented bar that filters table on click
   ============================================================ */
function InvoiceAgingCard({ filter, onFilter }: { filter: string; onFilter: (f: string) => void }) {
  const total = Data.invoiceAging.reduce((s, b) => s + b.amount, 0);
  const { toast } = useToast();

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Receipt className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Invoice Aging</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Outstanding by bucket · click to filter invoices</p>
          </div>
        </div>
        <CardActionMenu cardName="Invoice Aging" />
      </div>

      {/* Segmented bar */}
      <div className="mb-4 flex h-12 w-full overflow-hidden rounded-xl border border-[var(--border)]">
        {Data.invoiceAging.map((b) => {
          const pct = (b.amount / total) * 100;
          const isActive = filter === b.label || (filter === 'All' && false);
          return (
            <button
              key={b.key}
              type="button"
              onClick={() => { onFilter(isActive ? 'All' : b.label); toast({ title: isActive ? 'Filter cleared' : 'Aging filter applied', description: isActive ? 'Showing all invoices' : `${b.label} · ${b.count} invoices · $${b.amount.toLocaleString()}` }); }}
              className={cn('group relative flex items-center justify-center transition-all', filter === b.label ? 'ring-2 ring-inset ring-white/40 dark:ring-white/30' : 'hover:brightness-110', pct < 8 ? 'min-w-[40px]' : '')}
              style={{ width: `${pct}%`, background: b.color }}
              title={`${b.label} · $${b.amount.toLocaleString()} · ${b.count} invoices`}
            >
              <span className="text-[10px] font-semibold text-white drop-shadow-sm">{pct >= 10 ? `$${(b.amount / 1000).toFixed(1)}K` : ''}</span>
            </button>
          );
        })}
      </div>

      {/* Buckets grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {Data.invoiceAging.map((b) => {
          const isActive = filter === b.label;
          return (
            <button
              key={b.key}
              type="button"
              onClick={() => { onFilter(isActive ? 'All' : b.label); toast({ title: isActive ? 'Filter cleared' : 'Aging filter applied', description: `${b.label} · ${b.count} invoices` }); }}
              className={cn('rounded-xl border p-2.5 text-left transition', isActive ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.12)]' : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 hover:border-[var(--border-strong)]')}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--text-muted)]"><span className="size-1.5 rounded-full" style={{ background: b.color }} />{b.label}</span>
                {b.severity === 'critical' && <AlertTriangle className="size-2.5 text-[var(--color-error-500)]" strokeWidth={2.4} />}
                {b.severity === 'risk' && <Clock className="size-2.5 text-[var(--color-warning-500)]" strokeWidth={2.4} />}
              </div>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">${(b.amount / 1000).toFixed(1)}K</p>
              <p className="text-[9px] text-[var(--text-subtle)]">{b.count} invoices</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Total outstanding</span>
        <span className="font-semibold tabular-nums text-[var(--text-strong)]">${total.toLocaleString()}</span>
      </div>
    </section>
  );
}

/* ============================================================
   Quick Send — payment form with recipient avatars
   ============================================================ */
function QuickSendCard({ onSent }: { onSent: (t: Transaction) => void }) {
  const { toast } = useToast();
  const [selected, setSelected] = React.useState<Recipient | null>(Data.recipients[0]);
  const [amount, setAmount] = React.useState('');
  const [purpose, setPurpose] = React.useState(Data.quickSendPurposes[0]);
  const [account, setAccount] = React.useState(Data.sendAccounts[0].name);
  const [sending, setSending] = React.useState(false);

  function handleSend() {
    const amt = parseFloat(amount);
    if (!selected) { toast({ title: 'Select a recipient', description: 'Choose a recipient to continue.' }); return; }
    if (!amt || amt <= 0) { toast({ title: 'Enter an amount', description: 'Amount must be greater than $0.' }); return; }
    setSending(true);
    setTimeout(() => {
      const newTxn: Transaction = {
        id: `t-${Date.now()}`,
        brand: selected.type === 'vendor' ? (selected.name === 'AWS' ? 'aws' : selected.name === 'Figma' ? 'figma' : 'stripe') : 'paypal',
        brandLabel: selected.name,
        title: `Payment to ${selected.name}`,
        subtitle: `${purpose} · ${account}`,
        amount: -amt,
        date: 'Jun 23',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        category: 'Other',
        card: account,
        status: 'completed',
        receipt: `RC-${Math.floor(7800 + Math.random() * 200)}`,
      };
      onSent(newTxn);
      toast({ title: 'Payment sent', description: `$${amt.toLocaleString()} sent to ${selected.name} · ${purpose}` });
      setAmount('');
      setSending(false);
    }, 700);
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Send className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Quick Send</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Send a payment in seconds</p>
          </div>
        </div>
        <CardActionMenu cardName="Quick Send" />
      </div>

      {/* Recipient avatars */}
      <div className="mb-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Recent recipients</p>
        <div className="flex gap-2 overflow-x-auto pb-1 modern-scrollbar">
          {Data.recipients.map((r) => {
            const active = selected?.id === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelected(r)}
                className={cn('flex flex-col items-center gap-1.5 rounded-xl border p-2 transition min-w-[64px]', active ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.12)]' : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]/40')}
                title={`${r.name} · ${r.detail}`}
              >
                {r.type === 'vendor' ? (
                  <span className="flex size-9 items-center justify-center rounded-full bg-[var(--surface-sunken)] text-[var(--text-strong)]"><Building2 className="size-4" strokeWidth={2} /></span>
                ) : (
                  <UserAvatar name={r.name} size="sm" />
                )}
                <span className="max-w-[64px] truncate text-[10px] font-medium text-[var(--text-body)]">{r.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">From account</label>
            <select value={account} onChange={(e) => setAccount(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(70,95,255,0.12)]">
              {Data.sendAccounts.map((a) => (<option key={a.id} value={a.name}>{a.name}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Purpose</label>
            <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[rgba(70,95,255,0.12)]">
              {Data.quickSendPurposes.map((p) => (<option key={p} value={p}>{p}</option>))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount</label>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm font-semibold tabular-nums text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)]" />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
              {['50', '100', '500'].map((q) => (<button key={q} type="button" onClick={() => setAmount(q)} className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-600)] dark:hover:bg-[rgba(70,95,255,0.16)]">${q}</button>))}
            </div>
          </div>
        </div>
        {selected && (
          <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 px-3 py-2 text-xs">
            <span className="text-[var(--text-muted)]">To</span>
            <span className="flex items-center gap-1.5 font-medium text-[var(--text-strong)]">{selected.type === 'vendor' ? <Building2 className="size-3" strokeWidth={2.2} /> : <UserAvatar name={selected.name} size="xs" />}{selected.name}</span>
          </div>
        )}
        <button type="button" onClick={handleSend} disabled={sending} className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-500)] text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? <><span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending…</> : <><Send className="size-4" strokeWidth={2.2} />Send payment</>}
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Recent Transactions — feed with brand icons + hover reveal
   ============================================================ */
function RecentTransactionsFeed({ transactions, onSelect }: { transactions: Transaction[]; onSelect: (t: Transaction) => void }) {
  const { toast } = useToast();
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Receipt className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Recent Transactions</h3>
            <p className="text-[11px] text-[var(--text-muted)]">Hover a row to reveal details · click to open</p>
          </div>
        </div>
        <CardActionMenu cardName="Recent Transactions" />
      </div>
      <ol className="space-y-1.5">
        {transactions.map((t) => {
          const positive = t.amount > 0;
          return (
            <li
              key={t.id}
              onClick={() => onSelect(t)}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-2 transition hover:border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)]/40"
            >
              <span className="size-9 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-[var(--border-subtle)]"><BrandIcon brand={t.brand} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-medium text-[var(--text-strong)]">{t.title}</p>
                  <p className={cn('flex-shrink-0 text-sm font-semibold tabular-nums', positive ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-strong)]')}>{positive ? '+' : '−'}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] text-[var(--text-muted)]">{t.subtitle}</p>
                  <p className="flex-shrink-0 text-[10px] text-[var(--text-subtle)]">{t.date} · {t.time}</p>
                </div>
                {/* Hover-reveal meta */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-body)]"><Tag className="size-2.5" strokeWidth={2.2} />{t.category}</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-body)]"><CreditCard className="size-2.5" strokeWidth={2.2} />{t.card}</span>
                      {t.receipt && <button type="button" onClick={(e) => { e.stopPropagation(); toast({ title: 'Receipt opened', description: `${t.receipt} · ${t.title}` }); }} className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-brand-600)] transition hover:bg-[var(--color-brand-100)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><FileText className="size-2.5" strokeWidth={2.2} />{t.receipt}</button>}
                      <ChevronRight className="ml-auto size-3 text-[var(--text-muted)]" strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* Tag icon (used above) */
function Tag(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

/* ============================================================
   Revenue Streams — radial chart with growth + margin hover
   ============================================================ */
function RevenueStreamsCard() {
  const { toast } = useToast();
  const total = Data.revenueStreams.reduce((s, r) => s + r.amount, 0);

  const options: any = {
    chart: { type: 'donut', height: 280, fontFamily: 'Outfit, sans-serif', animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 60 } } },
    labels: Data.revenueStreams.map((r) => r.name),
    colors: Data.revenueStreams.map((r) => r.color),
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '74%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: true, fontSize: '11px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, color: 'var(--text-muted)', offsetY: -8 },
            value: { show: true, fontSize: '22px', fontFamily: 'Outfit, sans-serif', fontWeight: 600, color: 'var(--text-strong)', offsetY: 4, formatter: () => `$${(total / 1000).toFixed(1)}K` },
            total: { show: true, showAlways: true, label: 'Total revenue', fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, color: 'var(--text-muted)', formatter: () => `$${(total / 1000).toFixed(1)}K` },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex }: any) => {
        const r = Data.revenueStreams[seriesIndex];
        const pct = ((r.amount / total) * 100).toFixed(1);
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:180px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="width:8px;height:8px;border-radius:50%;background:${r.color};display:inline-block;"></span><span style="font-size:12px;font-weight:600;color:var(--text-strong);">${r.name}</span></div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:3px 14px;font-size:11px;">
            <span style="color:var(--text-muted);">Revenue</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${r.amount.toLocaleString()}</span>
            <span style="color:var(--text-muted);">Share</span><span style="color:var(--text-body);font-weight:500;">${pct}%</span>
            <span style="color:var(--text-muted);">Growth</span><span style="color:#12B76A;font-weight:600;">+${r.growth}%</span>
            <span style="color:var(--text-muted);">Margin</span><span style="color:var(--text-body);font-weight:500;">${r.margin}%</span>
          </div>
        </div>`;
      },
    },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><TrendingUp className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Revenue Streams</h3>
            <p className="text-[11px] text-[var(--text-muted)]">By source · hover for growth & margin</p>
          </div>
        </div>
        <CardActionMenu cardName="Revenue Streams" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Chart options={options} series={Data.revenueStreams.map((r) => r.amount)} type="donut" height={240} />
        <div className="space-y-1.5">
          {Data.revenueStreams.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => toast({ title: `${r.name} stream`, description: `$${r.amount.toLocaleString()} · ${((r.amount / total) * 100).toFixed(1)}% share · +${r.growth}% growth · ${r.margin}% margin` })}
              className="group flex w-full items-center gap-2.5 rounded-lg border border-transparent p-1.5 text-left transition hover:border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)]/40"
            >
              <span className="size-2.5 flex-shrink-0 rounded-full" style={{ background: r.color }} />
              <span className="flex-1 text-xs font-medium text-[var(--text-body)]">{r.name}</span>
              <span className="text-xs font-semibold tabular-nums text-[var(--text-strong)]">${(r.amount / 1000).toFixed(1)}K</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-2.5" strokeWidth={2.4} />{r.growth}%</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Financial Health Score — radar + scorecard
   ============================================================ */
function FinancialHealthCard() {
  const { toast } = useToast();
  const score = Data.financialHealth.score;
  const scoreColor = score >= 85 ? '#12B76A' : score >= 70 ? '#F79009' : '#F04438';

  const options: any = {
    chart: { type: 'radar', height: 280, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 900 } },
    series: [{ name: 'Health', data: Data.financialHealth.dimensions.map((d) => d.score) }],
    labels: Data.financialHealth.dimensions.map((d) => d.name),
    colors: ['#465FFF'],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'var(--border-subtle)',
          connectorColors: 'var(--border-subtle)',
          fill: { colors: ['var(--surface-sunken)', 'var(--card)'] },
        },
        size: 6,
      },
    },
    stroke: { width: 2 },
    fill: { colors: ['#465FFF'], opacity: 0.18 },
    markers: { size: 4, colors: ['#465FFF'], strokeColors: '#fff', strokeWidth: 1.5 },
    dataLabels: { enabled: true, formatter: (val: number) => `${val}`, style: { colors: ['var(--text-strong)'], fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }, background: { enabled: true, borderRadius: 4, padding: 2, opacity: 0.85, dropShadow: { enabled: false } } },
    xaxis: { labels: { style: { colors: 'var(--text-muted)', fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 } } },
    yaxis: { show: false, min: 0, max: 100 },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex, dataPointIndex }: any) => {
        const d = Data.financialHealth.dimensions[dataPointIndex];
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:200px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;"><span style="font-size:12px;font-weight:600;color:var(--text-strong);">${d.name}</span><span style="font-size:13px;font-weight:600;color:${d.color};">${d.score}/100</span></div>
          <p style="font-size:11px;color:var(--text-body);line-height:1.4;">${d.note}</p>
          <p style="margin-top:6px;font-size:10px;color:var(--text-subtle);">Weight: ${d.weight}% of overall score</p>
        </div>`;
      },
    },
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Shield className="size-4" strokeWidth={2} /></span>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)]">Financial Health Score</h3>
            <p className="text-[11px] text-[var(--text-muted)]">5 weighted dimensions · hover to explore</p>
          </div>
        </div>
        <CardActionMenu cardName="Financial Health" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* Scorecard */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-4 text-center">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-sunken)" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 - (score / 100) * 2 * Math.PI * 50}>
                <animate attributeName="stroke-dashoffset" from={2 * Math.PI * 50} to={2 * Math.PI * 50 - (score / 100) * 2 * Math.PI * 50} dur="900ms" fill="freeze" />
              </circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{score}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">/ 100</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${scoreColor}1a`, color: scoreColor }}>
              <ArrowUp className="size-2.5" strokeWidth={2.4} />{Data.financialHealth.trend} this quarter
            </span>
          </div>
          <p className="mt-2 text-[10px] text-[var(--text-muted)]">Status: <span className="font-medium" style={{ color: scoreColor }}>{score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs attention'}</span></p>
        </div>

        {/* Radar */}
        <Chart options={options} series={options.series} type="radar" height={260} />
      </div>

      {/* Dimension mini-bars */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 sm:grid-cols-5">
        {Data.financialHealth.dimensions.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => toast({ title: d.name, description: `${d.score}/100 · ${d.note}` })}
            className="group rounded-lg border border-[var(--border-subtle)] p-2 text-left transition hover:border-[var(--border-strong)]"
          >
            <p className="mb-1 truncate text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{d.name}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{d.score}</p>
              <p className="text-[9px] text-[var(--text-subtle)]">/100</p>
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.score}%`, background: d.color }} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Invoices Table — search + filters + 3-dot menu + drawer
   ============================================================ */
function InvoicesTable({ invoices, onMarkPaid, onSelect, agingFilter, onAgingFilter }: {
  invoices: Invoice[];
  onMarkPaid: (id: string) => void;
  onSelect: (inv: Invoice) => void;
  agingFilter: string;
  onAgingFilter: (f: string) => void;
}) {
  const { toast } = useToast();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | Invoice['status']>('All');
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [agingOpen, setAgingOpen] = React.useState(false);
  const [menuFor, setMenuFor] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
      if (agingFilter !== 'All' && inv.aging !== agingFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!inv.id.toLowerCase().includes(q) && !inv.client.toLowerCase().includes(q) && !inv.owner.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [invoices, search, statusFilter, agingFilter]);

  const statusTone: Record<Invoice['status'], 'success' | 'info' | 'warning' | 'error' | 'neutral' | 'brand'> = {
    Paid: 'success', Sent: 'info', Pending: 'warning', Overdue: 'error', Draft: 'neutral',
  };
  const payMethodIcons: Record<Invoice['paymentMethod'], React.ElementType> = {
    'Bank transfer': Landmark, Card: CreditCard, PayPal: Wallet, Stripe: Zap, Wire: ArrowRight,
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><FileText className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Invoices</h2>
            <p className="text-xs text-[var(--text-muted)]">{filtered.length} of {invoices.length} · click a row to open</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoice, client, owner…" className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-64" />
          </div>
          {/* Status filter */}
          <div className="relative">
            <button type="button" onClick={() => { setStatusOpen((p) => !p); setAgingOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Filter className="size-3.5" strokeWidth={2.2} />Status{statusFilter !== 'All' && <span className="size-1.5 rounded-full bg-[var(--color-brand-500)]" />}<ChevronDown className={cn('size-3 transition-transform', statusOpen && 'rotate-180')} strokeWidth={2.2} /></button>
            <Popover open={statusOpen} onClose={() => setStatusOpen(false)} align="right" width={150}>
              <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Status</p></div>
              {Data.invoiceStatuses.map((s) => (<PopoverItem key={s} active={statusFilter === s} onClick={() => { setStatusFilter(s); setStatusOpen(false); }}>{s}</PopoverItem>))}
            </Popover>
          </div>
          {/* Aging filter */}
          <div className="relative">
            <button type="button" onClick={() => { setAgingOpen((p) => !p); setStatusOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Clock className="size-3.5" strokeWidth={2.2} />Aging{agingFilter !== 'All' && <span className="size-1.5 rounded-full bg-[var(--color-brand-500)]" />}<ChevronDown className={cn('size-3 transition-transform', agingOpen && 'rotate-180')} strokeWidth={2.2} /></button>
            <Popover open={agingOpen} onClose={() => setAgingOpen(false)} align="right" width={150}>
              <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Aging</p></div>
              {Data.agingFilters.map((a) => (<PopoverItem key={a} active={agingFilter === a} onClick={() => { onAgingFilter(a); setAgingOpen(false); }}>{a}</PopoverItem>))}
              <div className="my-1 h-px bg-[var(--border-subtle)]" />
              <PopoverItem icon={X} onClick={() => { onAgingFilter('All'); setAgingOpen(false); }}>Clear filter</PopoverItem>
            </Popover>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Invoice</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Client</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Due date</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Aging</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Method</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Owner</th>
              <th className="py-2.5 pl-2 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No invoices match</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p><button type="button" onClick={() => { setSearch(''); setStatusFilter('All'); onAgingFilter('All'); }} className="mt-3 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"><RefreshCw className="size-3" strokeWidth={2.2} />Reset filters</button></td></tr>
            ) : filtered.map((inv) => {
              const PayIcon = payMethodIcons[inv.paymentMethod];
              const agingColor = inv.agingDays === 0 ? 'text-[var(--text-muted)]' : inv.agingDays <= 15 ? 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]' : inv.agingDays <= 30 ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : inv.agingDays <= 60 ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]';
              return (
                <tr key={inv.id} onClick={() => onSelect(inv)} className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                  <td className="py-3 pl-1 pr-2"><code className="text-xs font-medium text-[var(--text-strong)]">{inv.id}</code>{inv.memo && <p className="mt-0.5 max-w-[180px] truncate text-[10px] text-[var(--text-muted)]">{inv.memo}</p>}</td>
                  <td className="py-3 px-2"><span className="text-xs font-medium text-[var(--text-strong)]">{inv.client}</span></td>
                  <td className="py-3 px-2 text-right"><span className="text-xs font-semibold tabular-nums text-[var(--text-strong)]">${inv.amount.toLocaleString()}</span></td>
                  <td className="py-3 px-2"><StatusBadge tone={statusTone[inv.status]} dot>{inv.status}</StatusBadge></td>
                  <td className="py-3 px-2"><span className="text-xs text-[var(--text-body)]">{inv.dueDate}</span></td>
                  <td className="py-3 px-2"><span className={cn('text-xs font-medium tabular-nums', agingColor)}>{inv.aging}{inv.agingDays > 0 && <span className="ml-1 text-[10px] text-[var(--text-subtle)]">({inv.agingDays}d)</span>}</span></td>
                  <td className="py-3 px-2"><span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]"><PayIcon className="size-3" strokeWidth={2.2} />{inv.paymentMethod}</span></td>
                  <td className="py-3 px-2"><div className="flex items-center gap-1.5"><UserAvatar name={inv.owner} size="xs" /><span className="text-xs text-[var(--text-body)]">{inv.owner.split(' ')[0]}</span></div></td>
                  <td className="py-3 pl-2 pr-1" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button type="button" onClick={() => setMenuFor(menuFor === inv.id ? null : inv.id)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label={`Actions for ${inv.id}`}><MoreHorizontal className="size-4" strokeWidth={2.2} /></button>
                      <Popover open={menuFor === inv.id} onClose={() => setMenuFor(null)} align="right" width={200}>
                        <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{inv.id}</p></div>
                        <PopoverItem icon={Eye} onClick={() => { onSelect(inv); setMenuFor(null); }}>Open invoice</PopoverItem>
                        {inv.status !== 'Paid' && <PopoverItem icon={CheckCircle2} onClick={() => { onMarkPaid(inv.id); setMenuFor(null); }}>Mark as paid</PopoverItem>}
                        <PopoverItem icon={Download} onClick={() => { toast({ title: 'Downloading PDF', description: `${inv.id} · ${inv.client}` }); setMenuFor(null); }}>Download PDF</PopoverItem>
                        <PopoverItem icon={Send} onClick={() => { toast({ title: 'Reminder sent', description: `Payment reminder for ${inv.id} sent to ${inv.client}` }); setMenuFor(null); }}>Send reminder</PopoverItem>
                        <div className="my-1 h-px bg-[var(--border-subtle)]" />
                        <PopoverItem icon={Link2} onClick={() => { toast({ title: 'Link copied', description: `${inv.id} shareable link copied to clipboard` }); setMenuFor(null); }}>Copy share link</PopoverItem>
                      </Popover>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {filtered.length} of {invoices.length} invoices</span>
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-muted)]">Outstanding: <span className="font-semibold tabular-nums text-[var(--text-strong)]">${filtered.filter(i => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</span></span>
          <span className="inline-flex items-center gap-1 text-[var(--text-muted)]"><RefreshCw className="size-3" strokeWidth={2.2} />Synced 2 min ago</span>
        </div>
      </div>
    </section>
  );
}

function RefreshCw(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

/* ============================================================
   Transaction Drawer
   ============================================================ */
function TransactionDrawer({ txn, onClose }: { txn: Transaction | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!txn) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [txn, onClose]);

  if (!txn || typeof document === 'undefined') return null;
  const positive = txn.amount > 0;

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Transaction detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="size-9 overflow-hidden rounded-lg ring-1 ring-[var(--border-subtle)]"><BrandIcon brand={txn.brand} /></span>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-strong)]">{txn.title}</h3>
              <p className="text-xs text-[var(--text-muted)]">{txn.id} · {txn.date} {txn.time}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Amount hero */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-4 text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount</p>
            <p className={cn('mt-1 text-3xl font-semibold tabular-nums', positive ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-strong)]')}>{positive ? '+' : '−'}${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <StatusBadge tone={txn.status === 'completed' ? 'success' : txn.status === 'pending' ? 'warning' : 'error'} dot className="mt-2">{txn.status}</StatusBadge>
          </div>
          {/* Meta */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Brand</p><p className="text-sm font-medium text-[var(--text-strong)]">{txn.brandLabel}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Category</p><p className="text-sm font-medium text-[var(--text-strong)]">{txn.category}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Card / source</p><p className="text-sm font-medium text-[var(--text-strong)]">{txn.card}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Date · time</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{txn.date} · {txn.time}</p></div>
            <div className="col-span-2 rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Description</p><p className="text-sm font-medium text-[var(--text-strong)]">{txn.subtitle}</p></div>
            {txn.receipt && <div className="col-span-2 rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Receipt</p><p className="text-sm font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{txn.receipt}</p></div>}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Close</button>
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><Download className="size-4" strokeWidth={2.2} />Download receipt</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Invoice Drawer
   ============================================================ */
function InvoiceDrawer({ invoice, onClose, onMarkPaid }: { invoice: Invoice | null; onClose: () => void; onMarkPaid: (id: string) => void }) {
  const { toast } = useToast();
  React.useEffect(() => {
    if (!invoice) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [invoice, onClose]);

  if (!invoice || typeof document === 'undefined') return null;
  const statusTone: Record<Invoice['status'], 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    Paid: 'success', Sent: 'info', Pending: 'warning', Overdue: 'error', Draft: 'neutral',
  };

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Invoice detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><FileText className="size-4" strokeWidth={2} /></span>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-strong)]">{invoice.id}</h3>
              <p className="text-xs text-[var(--text-muted)]">Issued {invoice.issued} · Due {invoice.dueDate}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Amount hero */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount due</p>
                <p className="mt-0.5 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">${invoice.amount.toLocaleString()}</p>
              </div>
              <StatusBadge tone={statusTone[invoice.status]} dot>{invoice.status}</StatusBadge>
            </div>
            {invoice.agingDays > 0 && invoice.status !== 'Paid' && (
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[var(--color-error-50)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
                <AlertTriangle className="size-3.5" strokeWidth={2.2} />{invoice.agingDays} days past due · {invoice.aging} bucket
              </div>
            )}
          </div>
          {/* Meta */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Client</p><p className="text-sm font-medium text-[var(--text-strong)]">{invoice.client}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Owner</p><div className="flex items-center gap-1.5"><UserAvatar name={invoice.owner} size="xs" /><p className="text-sm font-medium text-[var(--text-strong)]">{invoice.owner}</p></div></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Payment method</p><p className="text-sm font-medium text-[var(--text-strong)]">{invoice.paymentMethod}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Aging bucket</p><p className="text-sm font-medium text-[var(--text-strong)]">{invoice.aging}</p></div>
            {invoice.memo && <div className="col-span-2 rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Memo</p><p className="text-sm font-medium text-[var(--text-strong)]">{invoice.memo}</p></div>}
          </div>

          {/* Timeline */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Timeline</h4>
            <ol className="relative space-y-2.5 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-subtle)]">
              <li className="relative flex items-start gap-3">
                <span className="relative z-10 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><FileText className="size-3" strokeWidth={2.2} /></span>
                <div className="flex-1 rounded-lg border border-[var(--border-subtle)] p-2"><div className="flex items-center justify-between"><span className="text-xs font-medium text-[var(--text-strong)]">Invoice issued</span><span className="text-[10px] text-[var(--text-muted)]">{invoice.issued}</span></div></div>
              </li>
              <li className="relative flex items-start gap-3">
                <span className={cn('relative z-10 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full', invoice.status === 'Overdue' ? 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' : 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]')}><Clock className="size-3" strokeWidth={2.2} /></span>
                <div className="flex-1 rounded-lg border border-[var(--border-subtle)] p-2"><div className="flex items-center justify-between"><span className="text-xs font-medium text-[var(--text-strong)]">{invoice.status === 'Paid' ? 'Payment received' : 'Awaiting payment'}</span><span className="text-[10px] text-[var(--text-muted)]">{invoice.dueDate}</span></div></div>
              </li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={() => { toast({ title: 'PDF downloaded', description: `${invoice.id} · ${invoice.client}` }); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Download className="size-4" strokeWidth={2.2} />PDF</button>
          {invoice.status !== 'Paid' ? (
            <button type="button" onClick={() => { onMarkPaid(invoice.id); onClose(); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-success-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-success-600)]"><CheckCircle2 className="size-4" strokeWidth={2.2} />Mark as paid</button>
          ) : (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--color-success-50)] px-4 text-sm font-medium text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><CheckCircle2 className="size-4" strokeWidth={2.2} />Already paid</span>
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Add Transaction Drawer
   ============================================================ */
function AddTransactionDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (t: Transaction) => void }) {
  const { toast } = useToast();
  const [form, setForm] = React.useState({
    type: 'Expense' as 'Income' | 'Expense',
    category: Data.transactionCategories[1],
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    account: Data.transactionAccounts[0],
    vendor: '',
    notes: '',
  });

  React.useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function handleSubmit() {
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) { toast({ title: 'Amount required', description: 'Enter a valid amount.' }); return; }
    if (!form.vendor.trim()) { toast({ title: 'Vendor required', description: 'Enter a vendor or client name.' }); return; }
    const signed = form.type === 'Income' ? Math.abs(amt) : -Math.abs(amt);
    const newTxn: Transaction = {
      id: `t-${Date.now()}`,
      brand: form.type === 'Income' ? 'stripe' : 'mercury',
      brandLabel: form.vendor.trim(),
      title: form.type === 'Income' ? `Payment received — ${form.vendor.trim()}` : `${form.vendor.trim()} charge`,
      subtitle: `${form.category} · ${form.account}`,
      amount: signed,
      date: new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      category: form.category,
      card: form.account,
      status: 'completed',
      receipt: `RC-${Math.floor(7800 + Math.random() * 200)}`,
    };
    onCreate(newTxn);
    setForm({ ...form, amount: '', vendor: '', notes: '' });
    onClose();
  }

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Add transaction">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <h3 className="text-base font-medium text-[var(--text-strong)]">Add Transaction</h3>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Record a new income or expense entry.</p>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Type toggle */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Type</label>
            <div className="inline-flex w-full items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {Data.transactionTypes.map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, type: t, category: t === 'Income' ? Data.transactionCategories[0] : Data.transactionCategories[1] })} data-active={form.type === t} className={cn('flex-1 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]', t === 'Income' ? 'data-[active=true]:text-[var(--color-success-600)] dark:data-[active=true]:text-[var(--color-success-500)]' : 'data-[active=true]:text-[var(--color-error-600)] dark:data-[active=true]:text-[var(--color-error-500)]')}>
                  {t === 'Income' ? <TrendingUp className="mr-1 inline size-3.5" strokeWidth={2.2} /> : <TrendingDown className="mr-1 inline size-3.5" strokeWidth={2.2} />}{t}
                </button>
              ))}
            </div>
          </div>
          {/* Amount */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Amount <span className="text-[var(--color-error-600)]">*</span></label>
            <div className="relative">
              <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
              <input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm font-semibold tabular-nums text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)]" />
            </div>
          </div>
          {/* Category + Account */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]">
                {Data.transactionCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Account</label>
              <select value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]">
                {Data.transactionAccounts.map((a) => (<option key={a} value={a}>{a}</option>))}
              </select>
            </div>
          </div>
          {/* Date + Vendor */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">{form.type === 'Income' ? 'Client' : 'Vendor'} <span className="text-[var(--color-error-600)]">*</span></label>
              <input type="text" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} placeholder={form.type === 'Income' ? 'e.g. Stellar Rewards' : 'e.g. AWS'} className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)]" />
            </div>
          </div>
          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Optional memo for this transaction" className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)]" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><Plus className="size-4" strokeWidth={2.2} />Add transaction</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Add Card Drawer
   ============================================================ */
function AddCardDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (c: CardItem) => void }) {
  const { toast } = useToast();
  const [form, setForm] = React.useState({
    name: '',
    type: 'Visa' as 'Visa' | 'Mastercard' | 'Amex' | 'Virtual',
    limit: '10000',
    owner: Data.cardOwners[0],
    restrictions: [] as string[],
  });

  React.useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function toggleRestriction(cat: string) {
    setForm((f) => ({ ...f, restrictions: f.restrictions.includes(cat) ? f.restrictions.filter((c) => c !== cat) : [...f.restrictions, cat] }));
  }

  function handleSubmit() {
    if (!form.name.trim()) { toast({ title: 'Card name required', description: 'Enter a name for this card.' }); return; }
    const accentMap: Record<string, string> = {
      Visa: 'linear-gradient(135deg, #465FFF 0%, #7A5AF8 60%, #EC4899 100%)',
      Mastercard: 'linear-gradient(135deg, #F79009 0%, #F04438 60%, #EC4899 100%)',
      Amex: 'linear-gradient(135deg, #12B76A 0%, #0BA5EC 60%, #465FFF 100%)',
      Virtual: 'linear-gradient(135deg, #7A5AF8 0%, #465FFF 60%, #0BA5EC 100%)',
    };
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      name: form.name.trim(),
      type: form.type === 'Visa' ? 'visa' : form.type === 'Mastercard' ? 'mastercard' : 'visa',
      last4: String(Math.floor(1000 + Math.random() * 8999)),
      expiry: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/28`,
      balance: 0,
      limit: parseInt(form.limit, 10) || 10000,
      spent: 0,
      status: 'active',
      holder: form.owner,
      accent: accentMap[form.type],
      category: form.restrictions[0] || 'General',
    };
    onCreate(newCard);
    setForm({ name: '', type: 'Visa', limit: '10000', owner: Data.cardOwners[0], restrictions: [] });
    onClose();
  }

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Add card">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <h3 className="text-base font-medium text-[var(--text-strong)]">Add New Card</h3>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">Issue a virtual or physical card for your team.</p>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Card name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Card name <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Engineering Tools" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)]" />
          </div>
          {/* Type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Card type</label>
            <div className="grid grid-cols-4 gap-2">
              {Data.cardTypes.map((t) => (
                <button key={t} type="button" onClick={() => setForm({ ...form, type: t })} data-active={form.type === t} className="cursor-pointer rounded-lg border border-[var(--border)] px-2 py-2 text-xs font-medium text-[var(--text-muted)] transition data-[active=true]:border-[var(--color-brand-500)] data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)] hover:border-[var(--border-strong)]">{t}</button>
              ))}
            </div>
          </div>
          {/* Limit + Owner */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Spending limit</label>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
                <input type="number" min="0" step="100" value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm font-medium tabular-nums text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Owner</label>
              <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]">
                {Data.cardOwners.map((o) => (<option key={o} value={o}>{o}</option>))}
              </select>
            </div>
          </div>
          {/* Category restrictions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Category restrictions <span className="text-[var(--text-muted)]">(optional · card only works in these categories)</span></label>
            <div className="flex flex-wrap gap-1.5">
              {Data.cardCategoryRestrictions.map((c) => {
                const active = form.restrictions.includes(c);
                return (
                  <button key={c} type="button" onClick={() => toggleRestriction(c)} className={cn('inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition', active ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-body)]')}>
                    {active && <CheckCircle2 className="size-3" strokeWidth={2.2} />}{c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Preview */}
          <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)]/40 p-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Preview</p>
            <div className="aspect-[1.6/1] w-full overflow-hidden rounded-xl p-3 text-white shadow-md" style={{ background: form.type === 'Visa' ? 'linear-gradient(135deg, #465FFF 0%, #7A5AF8 60%, #EC4899 100%)' : form.type === 'Mastercard' ? 'linear-gradient(135deg, #F79009 0%, #F04438 60%, #EC4899 100%)' : form.type === 'Amex' ? 'linear-gradient(135deg, #12B76A 0%, #0BA5EC 60%, #465FFF 100%)' : 'linear-gradient(135deg, #7A5AF8 0%, #465FFF 60%, #0BA5EC 100%)' }}>
              <div className="flex h-full flex-col justify-between">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/80">{form.name || 'Card name'}</p>
                <div className="flex items-end justify-between">
                  <div><p className="font-mono text-sm tracking-[0.18em] text-white">•••• {String(Math.floor(1000 + Math.random() * 8999))}</p><p className="mt-0.5 text-[9px] uppercase text-white/80">{form.owner}</p></div>
                  <CardBrandMark type={form.type === 'Mastercard' ? 'mastercard' : 'visa'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><Plus className="size-4" strokeWidth={2.2} />Issue card</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Keyframe styles (injected once)
   ============================================================ */
const finKeyframes = `
@keyframes finCardIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
`;

/* ============================================================
   Main FinanceDashboard export
   ============================================================ */
export function FinanceDashboard() {
  const { toast } = useToast();
  const [tab, setTab] = React.useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [cards, setCards] = React.useState<CardItem[]>(Data.cards);
  const [transactions, setTransactions] = React.useState<Transaction[]>(Data.recentTransactions);
  const [invoices, setInvoices] = React.useState<Invoice[]>(Data.invoices);
  const [agingFilter, setAgingFilter] = React.useState<string>('All');

  const [addTxnOpen, setAddTxnOpen] = React.useState(false);
  const [addCardOpen, setAddCardOpen] = React.useState(false);
  const [selectedTxn, setSelectedTxn] = React.useState<Transaction | null>(null);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);

  function toggleFreeze(id: string) {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' } : c));
    const card = cards.find((c) => c.id === id);
    if (card) toast({ title: card.status === 'active' ? 'Card frozen' : 'Card unfrozen', description: `${card.name} ··${card.last4}` });
  }

  function handleAddCard(c: CardItem) {
    setCards((prev) => [c, ...prev]);
    toast({ title: 'Card issued', description: `${c.name} ··${c.last4} issued to ${c.holder}` });
  }

  function handleAddTransaction(t: Transaction) {
    setTransactions((prev) => [t, ...prev]);
    toast({ title: 'Transaction added', description: `${t.title} · ${t.amount < 0 ? '−' : '+'}$${Math.abs(t.amount).toLocaleString()}` });
  }

  function handleQuickSend(t: Transaction) {
    setTransactions((prev) => [t, ...prev]);
  }

  function handleMarkPaid(id: string) {
    setInvoices((prev) => prev.map((inv) => inv.id === id ? { ...inv, status: 'Paid' as const, aging: 'Current' as const, agingDays: 0 } : inv));
    const inv = invoices.find((i) => i.id === id);
    if (inv) toast({ title: 'Invoice marked as paid', description: `${inv.id} · ${inv.client} · $${inv.amount.toLocaleString()}` });
  }

  return (
    <div className="space-y-6">
      <style>{finKeyframes}</style>
      <FinanceHeader onAddTransaction={() => setAddTxnOpen(true)} />

      {/* Hero + right rail */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <CashflowHero tab={tab} onTabChange={setTab} />
        <div className="flex flex-col gap-5">
          <MyCardsRail cards={cards} onAddCard={() => setAddCardOpen(true)} onToggleFreeze={toggleFreeze} />
          <RunwayGaugeCard />
        </div>
      </div>

      {/* Budget Variance + Expense Categories */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BudgetVarianceCard />
        <ExpenseCategoriesCard />
      </div>

      {/* Invoice Aging (full width) */}
      <InvoiceAgingCard filter={agingFilter} onFilter={setAgingFilter} />

      {/* Quick Send + Recent Transactions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <QuickSendCard onSent={handleQuickSend} />
        <RecentTransactionsFeed transactions={transactions} onSelect={setSelectedTxn} />
      </div>

      {/* Revenue Streams + Financial Health */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RevenueStreamsCard />
        <FinancialHealthCard />
      </div>

      {/* Invoices table (full width) */}
      <InvoicesTable
        invoices={invoices}
        onMarkPaid={handleMarkPaid}
        onSelect={setSelectedInvoice}
        agingFilter={agingFilter}
        onAgingFilter={setAgingFilter}
      />

      {/* Drawers */}
      <TransactionDrawer txn={selectedTxn} onClose={() => setSelectedTxn(null)} />
      <InvoiceDrawer invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} onMarkPaid={handleMarkPaid} />
      <AddTransactionDrawer open={addTxnOpen} onClose={() => setAddTxnOpen(false)} onCreate={handleAddTransaction} />
      <AddCardDrawer open={addCardOpen} onClose={() => setAddCardOpen(false)} onCreate={handleAddCard} />
    </div>
  );
}
