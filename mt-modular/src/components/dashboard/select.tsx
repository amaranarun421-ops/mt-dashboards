'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Select — custom popover-based dropdown (no native <select>)         */
/* ------------------------------------------------------------------ */
export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  tone?: 'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export interface SelectProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

const sizeClass = {
  sm: { button: 'h-9 text-xs', icon: 'size-3.5' },
  md: { button: 'h-11 text-sm', icon: 'size-4' },
  lg: { button: 'h-12 text-base', icon: 'size-5' },
};

export function Select<T extends string = string>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
  buttonClassName,
  menuClassName,
  align = 'left',
  size = 'md',
  'aria-label': ariaLabel,
}: SelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value)),
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

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

  React.useEffect(() => {
    if (open) {
      setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
      // Scroll active item into view after opening
      setTimeout(() => {
        const active = listRef.current?.querySelector('[data-active="true"]');
        if (active && 'scrollIntoView' in active) {
          (active as HTMLElement).scrollIntoView({ block: 'nearest' });
        }
      }, 30);
    }
  }, [open, options, value]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
        buttonRef.current?.focus();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHighlight(options.length - 1);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={onKeyDown}
        className={cn(
          'group flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 font-medium transition',
          'text-[var(--text-strong)] hover:border-[var(--border-strong)] focus:border-[var(--color-brand-400)] focus:outline-none focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]',
          'disabled:cursor-not-allowed disabled:opacity-60',
          sizeClass[size].button,
          buttonClassName,
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {selected?.icon && <selected.icon className={cn('flex-shrink-0 text-[var(--text-muted)]', sizeClass[size].icon)} />}
          <span className={cn('truncate', !selected && 'text-[var(--text-subtle)] font-normal')}>
            {selected ? selected.label : (placeholder ?? 'Select...')}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'flex-shrink-0 text-[var(--text-muted)] transition-transform',
            sizeClass[size].icon,
            open && 'rotate-180 text-[var(--text-strong)]',
          )}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            'absolute z-50 mt-2 max-h-72 min-w-full overflow-y-auto modern-scrollbar rounded-xl border border-[var(--border)] bg-[var(--popover)] p-1.5 shadow-[var(--shadow-theme-lg)] ds-fade-in',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          {options.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm font-medium text-[var(--text-muted)]">
              No options
            </p>
          ) : (
            options.map((opt, idx) => {
              const Icon = opt.icon;
              const isActive = opt.value === value;
              const isHighlight = idx === highlight;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  data-active={isHighlight}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors',
                    isHighlight
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)]',
                    isActive && !isHighlight && 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]',
                  )}
                >
                  {Icon && (
                    <Icon className={cn('flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-strong)]', sizeClass[size].icon)} />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{opt.label}</p>
                    {opt.description && (
                      <p className="truncate text-xs font-medium text-[var(--text-muted)]">{opt.description}</p>
                    )}
                  </div>
                  {isActive && (
                    <Check className="flex-shrink-0 size-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
