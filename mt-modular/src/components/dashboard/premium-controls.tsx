'use client';

import * as React from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Premium Input — consistent height, icon alignment, focus ring       */
/* ------------------------------------------------------------------ */
export interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon shown on the left inside the input */
  leftIcon?: LucideIcon;
  /** Icon/element shown on the right inside the input */
  rightIcon?: React.ReactNode;
  /** Preset variant styling */
  variant?: 'default' | 'filled' | 'underline' | 'glass';
  /** Constrain max width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthMap = {
  sm: 'max-w-[16rem]',
  md: 'max-w-[24rem]',
  lg: 'max-w-[32rem]',
  xl: 'max-w-[40rem]',
  full: 'max-w-full',
};

export function PremiumInput({
  leftIcon: LeftIcon,
  rightIcon,
  variant = 'default',
  maxWidth = 'full',
  className,
  ...props
}: PremiumInputProps) {
  const base = 'h-11 w-full rounded-xl text-sm font-medium text-[var(--text-strong)] outline-none transition-all';
  const variants = {
    default: 'border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[var(--border-strong)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]',
    filled: 'border-0 bg-[var(--surface-sunken)] hover:bg-[var(--surface-sunken)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]',
    underline: 'border-0 border-b-2 border-[var(--border-strong)] bg-transparent rounded-none px-1 focus:border-[var(--color-brand-500)] focus:ring-0',
    glass: 'border border-white/10 bg-white/5 backdrop-blur-xl focus:border-[var(--color-brand-400)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]',
  };

  if (variant === 'underline') {
    return (
      <div className={cn('relative', maxWidthMap[maxWidth], className)}>
        <input className={cn(base, variants[variant], 'h-11 px-1')} {...props} />
      </div>
    );
  }

  return (
    <div className={cn('relative', maxWidthMap[maxWidth], className)}>
      {LeftIcon && (
        <LeftIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
      )}
      <input
        className={cn(
          base,
          variants[variant],
          LeftIcon && 'pl-10',
          rightIcon && 'pr-10',
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightIcon}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Premium Select — replaces ALL native <select> with custom dropdown   */
/* ------------------------------------------------------------------ */
export interface PremiumSelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface PremiumSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: PremiumSelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  size?: 'sm' | 'md';
}

const selectMaxWidth = {
  sm: 'max-w-[12rem]',
  md: 'max-w-[16rem]',
  lg: 'max-w-[20rem]',
  xl: 'max-w-[24rem]',
  full: 'max-w-full',
};

export function PremiumSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className,
  buttonClassName,
  maxWidth = 'full',
  size = 'md',
}: PremiumSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string | undefined>(value);
  const [highlight, setHighlight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const currentValue = value ?? internalValue;
  const selected = options.find(o => o.value === currentValue);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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

  React.useEffect(() => {
    if (open) {
      setHighlight(Math.max(0, options.findIndex(o => o.value === currentValue)));
      setTimeout(() => {
        const active = listRef.current?.querySelector('[data-active="true"]');
        if (active && 'scrollIntoView' in active) {
          (active as HTMLElement).scrollIntoView({ block: 'nearest' });
        }
      }, 30);
    }
  }, [open, options, currentValue]);

  function select(val: string) {
    setInternalValue(val);
    onChange?.(val);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); const opt = options[highlight]; if (opt) select(opt.value); }
    else if (e.key === 'Tab') setOpen(false);
  }

  const sizeClass = size === 'sm' ? 'h-9 text-xs' : 'h-11 text-sm';

  return (
    <div ref={ref} className={cn('relative', selectMaxWidth[maxWidth], className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(p => !p)}
        onKeyDown={onKeyDown}
        className={cn(
          'group flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 font-medium transition shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
          'text-[var(--text-strong)] hover:border-[var(--border-strong)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]',
          sizeClass,
          buttonClassName,
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {selected?.icon && <selected.icon className="size-4 flex-shrink-0 text-[var(--text-muted)]" />}
          <span className={cn('truncate', !selected && 'text-[var(--text-subtle)] font-normal')}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <ChevronDown className={cn('size-4 flex-shrink-0 text-[var(--text-muted)] transition-transform', open && 'rotate-180 text-[var(--text-strong)]')} strokeWidth={2.5} />
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className={cn(
            'absolute left-0 z-50 mt-1.5 max-h-72 min-w-full overflow-y-auto modern-scrollbar rounded-xl border border-[var(--border)] bg-[var(--popover)] p-1.5 shadow-[0_12px_20px_-4px_rgba(15,23,42,0.08),0_4px_8px_-4px_rgba(15,23,42,0.04)]',
          )}
          style={{ animation: 'premFadeIn 0.16s ease-out', transformOrigin: 'top' }}
        >
          {options.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm font-medium text-[var(--text-muted)]">No options</p>
          ) : (
            options.map((opt, idx) => {
              const Icon = opt.icon;
              const isActive = opt.value === currentValue;
              const isHighlight = idx === highlight;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  data-active={isHighlight}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => select(opt.value)}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors',
                    isHighlight
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)]',
                  )}
                >
                  {Icon && <Icon className={cn('size-4 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-strong)]')} />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{opt.label}</p>
                    {opt.description && <p className="truncate text-xs font-medium text-[var(--text-muted)]">{opt.description}</p>}
                  </div>
                  {isActive && <Check className="size-4 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.5} />}
                </button>
              );
            })
          )}
        </div>
      )}
      <style jsx>{`
        @keyframes premFadeIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Premium Textarea — auto-resize, consistent styling                  */
/* ------------------------------------------------------------------ */
export const PremiumTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>(
  function PremiumTextarea({ className, maxWidth = 'full', rows = 3, onChange, ...rest }, forwardedRef) {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const resize = React.useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = 'auto';
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
      const paddingTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
      const paddingBottom = parseFloat(getComputedStyle(el).paddingBottom) || 0;
      const minHeight = lineHeight * rows + paddingTop + paddingBottom;
      el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
    }, [rows]);

    React.useEffect(() => { resize(); }, [resize]);
    React.useEffect(() => {
      if (typeof ResizeObserver !== 'undefined' && innerRef.current) {
        const ro = new ResizeObserver(resize);
        ro.observe(innerRef.current);
        return () => ro.disconnect();
      }
    }, [resize]);

    const mw = { sm: 'max-w-[16rem]', md: 'max-w-[24rem]', lg: 'max-w-[32rem]', xl: 'max-w-[40rem]', full: 'max-w-full' }[maxWidth];

    return (
      <textarea
        ref={(node) => { innerRef.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; }}
        rows={rows}
        onChange={(e) => { onChange?.(e); resize(); }}
        onInput={resize}
        className={cn('resize-none overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm font-medium text-[var(--text-strong)] outline-none transition-all shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[var(--border-strong)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)] placeholder:font-normal', mw, className)}
        {...rest}
      />
    );
  }
);

/* ------------------------------------------------------------------ */
/* Premium Button — consistent across pages                            */
/* ------------------------------------------------------------------ */
export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...props
}: PremiumButtonProps) {
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };
  const variants = {
    primary: 'bg-gradient-to-b from-[var(--color-brand-500)] to-[var(--color-brand-600)] text-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.18)] hover:from-[var(--color-brand-600)] hover:to-[var(--color-brand-700)] hover:-translate-y-0.5',
    secondary: 'bg-[var(--card)] text-[var(--text-strong)] border border-[var(--border)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[var(--surface-sunken)] hover:border-[var(--border-strong)]',
    ghost: 'bg-transparent text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
    danger: 'bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)] shadow-[0_1px_3px_rgba(15,23,42,0.06)]',
    success: 'bg-[var(--color-success-500)] text-white hover:bg-[var(--color-success-600)] shadow-[0_1px_3px_rgba(15,23,42,0.06)]',
    gradient: 'bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(70,95,255,0.35)] hover:-translate-y-0.5',
    glass: 'bg-white/5 border border-white/10 text-[var(--text-strong)] backdrop-blur-xl hover:bg-white/10',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(70,95,255,0.12)] whitespace-nowrap',
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={cn(size === 'sm' ? 'size-3.5' : 'size-4')} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* SearchInput — premium search with icon                              */
/* ------------------------------------------------------------------ */
export function PremiumSearchInput({ placeholder = 'Search...', className, maxWidth = 'full' }: { placeholder?: string; className?: string; maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) {
  const mw = { sm: 'max-w-[16rem]', md: 'max-w-[24rem]', lg: 'max-w-[32rem]', xl: 'max-w-[40rem]', full: 'max-w-full' }[maxWidth];
  return (
    <div className={cn('relative', mw, className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
      <input
        type="search"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 text-sm font-medium text-[var(--text-strong)] outline-none transition-all shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[var(--border-strong)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)] placeholder:font-normal"
      />
    </div>
  );
}
