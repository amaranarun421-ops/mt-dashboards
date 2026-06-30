'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ActionSelect — a compact dropup-style select menu used in the AI generator
 * action bars. Renders as a bordered pill button with the selected value,
 * and opens an upward-floating menu (so it doesn't get clipped by the
 * bottom of the page).
 *
 * Matches the visual style of the model dropdown in image/video/code generators.
 */

export interface ActionSelectOption<T extends string | number> {
  value: T;
  label: string;
  /** Optional small visual indicator (e.g., aspect-ratio icon character) */
  glyph?: string;
  /** Optional sub-label shown muted next to the label */
  hint?: string;
}

interface ActionSelectProps<T extends string | number> {
  value: T;
  options: ActionSelectOption<T>[];
  onChange: (value: T) => void;
  /** Icon prefix shown before the value */
  icon?: React.ComponentType<{ className?: string }>;
  /** Accessible label */
  ariaLabel?: string;
  /** Optional menu width override (Tailwind class) */
  menuWidth?: string;
  /** Optional title attribute on the trigger */
  title?: string;
}

export function ActionSelect<T extends string | number>({
  value,
  options,
  onChange,
  icon: Icon,
  ariaLabel,
  menuWidth = 'w-40',
  title,
}: ActionSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={title}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
      >
        {Icon && <Icon className="size-3.5 text-[var(--text-muted)]" />}
        {selected?.glyph && <span className="text-[10px] leading-none text-[var(--text-muted)]">{selected.glyph}</span>}
        <span>{selected?.label ?? 'Select'}</span>
        <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute bottom-full left-0 z-50 mb-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in',
            menuWidth,
          )}
        >
          <div className="max-h-60 overflow-y-auto modern-scrollbar">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium transition',
                    isSelected
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                  )}
                >
                  {opt.glyph && <span className="text-xs text-[var(--text-muted)]">{opt.glyph}</span>}
                  <span className="flex-1 truncate">{opt.label}</span>
                  {opt.hint && <span className="text-[10px] font-normal text-[var(--text-subtle)]">{opt.hint}</span>}
                  {isSelected && <Check className="size-3.5 shrink-0 text-[var(--color-brand-500)]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
