'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* PageHeader                                                          */
/* ------------------------------------------------------------------ */
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="min-w-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
              {breadcrumb.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-[var(--text-faint)]">/</span>}
                  <span
                    className={
                      idx === breadcrumb.length - 1
                        ? 'text-[var(--text-strong)]'
                        : 'text-[var(--text-muted)]'
                    }
                  >
                    {crumb.label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="ds-page-title truncate">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm font-medium text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MetricCard                                                          */
/* ------------------------------------------------------------------ */
export interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
  trend?: { direction: 'up' | 'down'; value: string };
  icon?: LucideIcon;
  accent?: 'brand' | 'success' | 'warning' | 'error' | 'info' | 'violet';
  index?: number;
  footer?: React.ReactNode;
}

const accentMap: Record<NonNullable<MetricCardProps['accent']>, string> = {
  brand: 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]',
  success: 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
  warning: 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
  error: 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
  info: 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]',
  violet: 'text-[#7a5af8]',
};

const accentTileMap: Record<NonNullable<MetricCardProps['accent']>, string> = {
  brand: 'bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]',
  success: 'bg-[var(--color-success-50)] dark:bg-[rgba(18,183,106,0.16)]',
  warning: 'bg-[var(--color-warning-50)] dark:bg-[rgba(247,144,9,0.16)]',
  error: 'bg-[var(--color-error-50)] dark:bg-[rgba(240,68,56,0.16)]',
  info: 'bg-[var(--color-info-50)] dark:bg-[rgba(11,165,236,0.16)]',
  violet: 'bg-[#f5f3ff] dark:bg-[rgba(122,90,248,0.16)]',
};

export function MetricCard({
  label,
  value,
  helper,
  trend,
  icon: Icon,
  accent = 'brand',
  index = 0,
  footer,
}: MetricCardProps) {
  return (
    <div
      className="ds-card ds-card-pad ds-interactive ds-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <span
            className={cn(
              'inline-flex size-12 items-center justify-center rounded-2xl',
              accentTileMap[accent],
              accentMap[accent],
            )}
          >
            <Icon className="size-5.5" strokeWidth={2} />
          </span>
        )}
        {trend && (
          <span
            className={trend.direction === 'up' ? 'ds-trend-up' : 'ds-trend-down'}
            title={`Change: ${trend.direction === 'up' ? '+' : '-'}${trend.value}`}
          >
            {trend.direction === 'up' ? (
              <ArrowUp className="size-3.5" strokeWidth={2.5} />
            ) : (
              <ArrowDown className="size-3.5" strokeWidth={2.5} />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-5">
        <p className="ds-muted-label">{label}</p>
        <p className="ds-stat-value mt-1.5 text-[28px] leading-tight">
          {value}
        </p>
        {helper && <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{helper}</p>}
      </div>
      {footer && <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">{footer}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionCard                                                         */
/* ------------------------------------------------------------------ */
interface SectionCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noBodyPadding?: boolean;
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  noBodyPadding,
}: SectionCardProps) {
  return (
    <section className={cn('ds-card', className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-5 sm:px-6">
          <div className="min-w-0">
            {title && (
              <h2 className="ds-section-title truncate">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn(!noBodyPadding && 'p-5 sm:p-6', bodyClassName)}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* StatusBadge                                                         */
/* ------------------------------------------------------------------ */
export type BadgeTone =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'brand';

interface StatusBadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ tone = 'neutral', children, dot, className }: StatusBadgeProps) {
  const cls = {
    success: 'ds-badge-success',
    warning: 'ds-badge-warning',
    error: 'ds-badge-error',
    info: 'ds-badge-info',
    neutral: 'ds-badge-neutral',
    brand: 'ds-badge-brand',
  }[tone];
  const dotCls = {
    success: 'ds-dot-success',
    warning: 'ds-dot-warning',
    error: 'ds-dot-error',
    info: 'ds-dot-info',
    neutral: 'ds-dot-neutral',
    brand: 'ds-dot-brand',
  }[tone];
  return (
    <span className={cn('ds-badge', cls, className)}>
      {dot && <span className={cn('ds-dot', dotCls)} />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ChartCard                                                           */
/* ------------------------------------------------------------------ */
interface ChartCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  actions,
  children,
  className,
  footer,
}: ChartCardProps) {
  return (
    <section className={cn('ds-card flex flex-col', className)}>
      <header className="flex items-start justify-between gap-3 px-5 pb-3 pt-5 sm:px-6">
        <div className="min-w-0">
          <h2 className="ds-section-title truncate">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
      </header>
      <div className="flex-1 px-2 pb-2 sm:px-3">{children}</div>
      {footer && (
        <footer className="border-t border-[var(--border-subtle)] px-5 py-3 sm:px-6">
          {footer}
        </footer>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EmptyState                                                          */
/* ------------------------------------------------------------------ */
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      {Icon && (
        <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--surface-sunken)] text-[var(--text-subtle)]">
          <Icon className="size-6" strokeWidth={1.8} />
        </div>
      )}
      <p className="ds-section-title">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm font-medium text-[var(--text-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LoadingSkeleton                                                     */
/* ------------------------------------------------------------------ */
interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={cn('ds-skeleton rounded-lg', className)}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="ds-card ds-card-pad">
      <div className="flex items-start justify-between">
        <LoadingSkeleton className="h-12 w-12 rounded-2xl" />
        <LoadingSkeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="mt-5">
        <LoadingSkeleton className="h-4 w-24" />
        <LoadingSkeleton className="mt-2 h-7 w-32" />
        <LoadingSkeleton className="mt-2 h-3 w-20" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UserAvatar                                                          */
/* ------------------------------------------------------------------ */
interface UserAvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
};

// portraitImages array removed — UserAvatar now uses initials to avoid
// external Unsplash hotlinking. Keeps the dashboard production-safe.

const colorPalette = [
  'bg-[var(--color-brand-100)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.24)] dark:text-[var(--color-brand-300)]',
  'bg-[var(--color-success-100)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.24)] dark:text-[var(--color-success-500)]',
  'bg-[var(--color-warning-100)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.24)] dark:text-[var(--color-warning-500)]',
  'bg-[var(--color-info-100)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.24)] dark:text-[var(--color-info-500)]',
  'bg-[#f5f3ff] text-[#6d28d9] dark:bg-[rgba(122,90,248,0.24)] dark:text-[#a78bfa]',
];

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export function UserAvatar({ name, size = 'md', className }: UserAvatarProps) {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const color = colorPalette[hash % colorPalette.length];
  // Use initials instead of external Unsplash portraits — production-safe
  // (no external image dependency, no rate-limit risk, no broken images).
  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full font-medium uppercase select-none',
        sizeMap[size],
        color,
        className,
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* FilterBar                                                           */
/* ------------------------------------------------------------------ */
interface FilterBarProps {
  children: React.ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SearchInput                                                         */
/* ------------------------------------------------------------------ */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <svg
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search...'}
        className="ds-input pl-9"
        aria-label={placeholder ?? 'Search'}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DropdownMenu                                                        */
/* ------------------------------------------------------------------ */
interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  menuClassName?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = 'right',
  className,
  menuClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function escHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('keydown', escHandler);
    }
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escHandler);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center"
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            'ds-popover mt-2 min-w-[200px]',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  icon: Icon,
  children,
  onClick,
  danger,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'ds-popover-item w-full',
        danger && 'text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]',
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* ConfirmDialog                                                       */
/* ------------------------------------------------------------------ */
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  tone?: 'danger' | 'default';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  tone = 'default',
}: ConfirmDialogProps) {
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onOpenChange(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="ds-card relative z-10 w-full max-w-md ds-fade-up p-6">
        <h3 id="confirm-title" className="text-lg font-semibold text-[var(--text-strong)]">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="ds-btn ds-btn-secondary" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={
              tone === 'danger'
                ? 'ds-btn bg-[var(--color-error-600)] text-white hover:bg-[var(--color-error-700)]'
                : 'ds-btn ds-btn-primary'
            }
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ActivityFeed                                                        */
/* ------------------------------------------------------------------ */
export interface ActivityFeedItem {
  id: string;
  user: string;
  action: string;
  target?: string;
  time: string;
  tone?: BadgeTone;
}

interface ActivityFeedProps {
  items: ActivityFeedItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <ol className={cn('relative space-y-5', className)}>
      {items.map((item, idx) => (
        <li key={item.id} className="relative flex gap-3.5">
          {idx < items.length - 1 && (
            <span
              className="absolute left-[15px] top-9 h-[calc(100%-12px)] w-px bg-[var(--border-subtle)]"
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              'mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full',
              item.tone === 'success' &&
                'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.18)] dark:text-[var(--color-success-500)]',
              item.tone === 'warning' &&
                'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.18)] dark:text-[var(--color-warning-500)]',
              item.tone === 'error' &&
                'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.18)] dark:text-[var(--color-error-500)]',
              item.tone === 'info' &&
                'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.18)] dark:text-[var(--color-info-500)]',
              (!item.tone || item.tone === 'neutral') &&
                'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
              item.tone === 'brand' &&
                'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.18)] dark:text-[var(--color-brand-300)]',
            )}
          >
            <UserAvatar name={item.user} size="xs" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[var(--text-strong)]">
              <span className="font-semibold">{item.user}</span>{' '}
              <span className="text-[var(--text-muted)]">{item.action}</span>{' '}
              {item.target && <span className="font-semibold text-[var(--text-strong)]">{item.target}</span>}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[var(--text-subtle)]">{item.time}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs (simple)                                                       */
/* ------------------------------------------------------------------ */
interface TabsProps {
  tabs: { key: string; label: string; count?: number }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1',
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          type="button"
          aria-selected={active === tab.key}
          data-active={active === tab.key}
          className="ds-tab inline-flex items-center gap-2"
          onClick={() => onChange(tab.key)}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                active === tab.key
                  ? 'bg-[var(--color-brand-500)] text-white'
                  : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sparkline (inline SVG)                                              */
/* ------------------------------------------------------------------ */
interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function Sparkline({
  values,
  width = 80,
  height = 28,
  color = 'var(--color-brand-500)',
  className,
}: SparklineProps) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* ProgressBar                                                         */
/* ------------------------------------------------------------------ */
interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: 'brand' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  tone = 'brand',
  size = 'md',
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, (value / max) * 100);
  const colorClass = {
    brand: 'bg-[var(--color-brand-500)]',
    success: 'bg-[var(--color-success-500)]',
    warning: 'bg-[var(--color-warning-500)]',
    error: 'bg-[var(--color-error-500)]',
    info: 'bg-[var(--color-info-500)]',
  }[tone];
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={0}
      className={cn(
        'w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]',
        size === 'sm' ? 'h-1.5' : 'h-2',
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', colorClass)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
