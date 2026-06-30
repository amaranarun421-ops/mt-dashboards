'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Tooltip — lightweight, appears on hover/focus                      */
/* ------------------------------------------------------------------ */
export function Tooltip({
  label,
  side = 'top',
  children,
  className,
}: {
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  function handleEnter() {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let top = 0;
    let left = 0;
    if (side === 'top') {
      top = rect.top - 8;
      left = rect.left + rect.width / 2;
    } else if (side === 'bottom') {
      top = rect.bottom + 8;
      left = rect.left + rect.width / 2;
    } else if (side === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - 8;
    } else {
      top = rect.top + rect.height / 2;
      left = rect.right + 8;
    }
    setCoords({ top, left });
    setShow(true);
  }

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        onFocus={handleEnter}
        onBlur={() => setShow(false)}
        className={cn('inline-flex', className)}
      >
        {children}
      </div>
      {show &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            className={cn(
              'pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1d2939] px-2.5 py-1.5 text-xs font-medium text-white shadow-lg ds-fade-in dark:bg-white dark:text-[var(--gray-900)]',
              side === 'top' && '-translate-y-full',
              side === 'bottom' && '',
              side === 'left' && '-translate-x-full',
              side === 'right' && '',
            )}
            style={{
              top: coords.top,
              left: coords.left,
              transform:
                side === 'top'
                  ? 'translate(-50%, -100%)'
                  : side === 'bottom'
                    ? 'translate(-50%, 0)'
                    : side === 'left'
                      ? 'translate(-100%, -50%)'
                      : 'translate(0, -50%)',
            }}
          >
            {label}
          </div>,
          document.body,
        )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Popover — clickable popover with content                            */
/* ------------------------------------------------------------------ */
export function Popover({
  trigger,
  children,
  align = 'center',
  side = 'bottom',
  className,
  contentClassName,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  side?: 'top' | 'bottom';
  className?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((p) => !p);
          }
        }}
        aria-expanded={open}
        className="inline-flex cursor-pointer outline-none"
      >
        {trigger}
      </div>
      {open && (
        <div
          role="dialog"
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 shadow-[var(--shadow-theme-lg)] ds-fade-in',
            side === 'top' && 'bottom-full mt-0 mb-2',
            align === 'left' && 'left-0',
            align === 'right' && 'right-0',
            align === 'center' && 'left-1/2 -translate-x-1/2',
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion — collapsible sections                                    */
/* ------------------------------------------------------------------ */
export interface AccordionItem {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export function Accordion({
  items,
  defaultOpen,
  multiple = false,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState<Set<string>>(() => new Set(defaultOpen ?? []));

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn('divide-y divide-[var(--border-subtle)] rounded-xl border border-[var(--border)]', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[var(--surface-sunken)]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-strong)]">{item.title}</p>
                {item.description && (
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{item.description}</p>
                )}
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn('size-4 flex-shrink-0 text-[var(--text-muted)] transition-transform', isOpen && 'rotate-180')}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 text-sm font-medium text-[var(--text-body)]">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumb                                                          */
/* ------------------------------------------------------------------ */
export function Breadcrumb({
  items,
  className,
}: {
  items: { label: string; href?: string; active?: boolean }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-sm', className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-[var(--text-faint)]" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {item.active ? (
            <span className="font-medium text-[var(--text-strong)]">{item.label}</span>
          ) : (
            <a
              href={item.href ?? '#'}
              className="font-medium text-[var(--text-muted)] transition hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-300)]"
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Chip / Tag — dismissible or static                                  */
/* ------------------------------------------------------------------ */
export function Chip({
  children,
  onDismiss,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  onDismiss?: () => void;
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}) {
  const toneClass = {
    neutral: 'bg-[var(--surface-sunken)] text-[var(--text-body)]',
    brand: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    success: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    error: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    info: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
  }[tone];

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium', toneClass, className)}>
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-current opacity-60 transition hover:opacity-100"
          aria-label="Remove"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Divider with label                                                  */
/* ------------------------------------------------------------------ */
export function Divider({ label, className }: { label?: string; className?: string }) {
  if (!label) return <hr className={cn('border-[var(--border-subtle)]', className)} />;
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-px flex-1 bg-[var(--border-subtle)]" />
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
      <div className="h-px flex-1 bg-[var(--border-subtle)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */
export function Carousel({
  slides,
  className,
}: {
  slides: { title: string; description: string; accent: string }[];
  className?: string;
}) {
  const [active, setActive] = React.useState(0);

  return (
    <div className={cn('overflow-hidden rounded-2xl', className)}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            <div
              className="flex h-44 items-center justify-center rounded-2xl p-6 text-center"
              style={{ backgroundColor: slide.accent }}
            >
              <div>
                <p className="text-lg font-medium text-white">{slide.title}</p>
                <p className="mt-1.5 text-sm font-medium text-white/80">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all',
                idx === active ? 'w-6 bg-[var(--color-brand-500)]' : 'w-1.5 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]',
              )}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActive((p) => (p - 1 + slides.length) % slides.length)}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setActive((p) => (p + 1) % slides.length)}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
