'use client';

import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu } from './primitives';

/* ------------------------------------------------------------------ */
/* Calendar value type — react-calendar uses [Date, Date] | Date      */
/* ------------------------------------------------------------------ */
export type CalendarValue = Date | [Date | null, Date | null] | null;

/* ------------------------------------------------------------------ */
/* Calendar — thin wrapper around react-calendar with our design system */
/* ------------------------------------------------------------------ */
export function ReactCalendar({
  value,
  onChange,
  selectRange = false,
  className,
}: {
  value?: CalendarValue;
  onChange: (value: CalendarValue) => void;
  selectRange?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('rc-wrap', className)}>
      <Calendar
        onChange={onChange as never}
        value={value ?? null}
        selectRange={selectRange}
        nextLabel={<span aria-hidden="true">›</span>}
        prevLabel={<span aria-hidden="true">‹</span>}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        minDetail="year"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DateRangePicker - dropdown with calendar + preset ranges           */
/* ------------------------------------------------------------------ */
export interface DateRangeValue {
  from: Date;
  to: Date;
  label: string;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysAgo(n: number): DateRangeValue {
  const to = startOfDay(new Date());
  const from = startOfDay(new Date());
  from.setDate(from.getDate() - n);
  return { from, to, label: `Last ${n} days` };
}

function monthsAgo(n: number, label: string): DateRangeValue {
  const to = startOfDay(new Date());
  const from = startOfDay(new Date());
  from.setMonth(from.getMonth() - n);
  return { from, to, label };
}

export const DATE_RANGE_PRESETS: { key: string; label: string; build: () => DateRangeValue }[] = [
  { key: '7d', label: 'Last 7 days', build: () => daysAgo(7) },
  { key: '30d', label: 'Last 30 days', build: () => daysAgo(30) },
  { key: '90d', label: 'Last 90 days', build: () => daysAgo(90) },
  { key: '6m', label: 'Last 6 months', build: () => monthsAgo(6, 'Last 6 months') },
  { key: '12m', label: 'Last 12 months', build: () => monthsAgo(12, 'Last 12 months') },
  {
    key: 'qtd',
    label: 'Quarter to date',
    build: () => {
      const to = startOfDay(new Date());
      const from = startOfDay(new Date());
      from.setMonth(Math.floor(from.getMonth() / 3) * 3, 1);
      return { from, to, label: 'Quarter to date' };
    },
  },
  {
    key: 'ytd',
    label: 'Year to date',
    build: () => {
      const to = startOfDay(new Date());
      const from = startOfDay(new Date());
      from.setMonth(0, 1);
      return { from, to, label: 'Year to date' };
    },
  },
];

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatRange(r: DateRangeValue) {
  const sameYear = r.from.getFullYear() === r.to.getFullYear();
  const sameMonth = sameYear && r.from.getMonth() === r.to.getMonth();
  if (sameMonth) {
    return `${r.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${r.to.getDate()}, ${r.to.getFullYear()}`;
  }
  return `${formatDate(r.from)} – ${formatDate(r.to)}`;
}

export function DateRangePicker({
  value,
  onChange,
  align = 'left',
  className,
}: {
  value: DateRangeValue;
  onChange: (next: DateRangeValue) => void;
  align?: 'left' | 'right';
  className?: string;
}) {
  function handlePreset(preset: DateRangeValue) {
    onChange(preset);
  }

  function handleCalendarChange(next: CalendarValue) {
    if (Array.isArray(next) && next[0] && next[1]) {
      onChange({ from: next[0], to: next[1], label: 'Custom range' });
    }
  }

  return (
    <DropdownMenu
      align={align}
      className={className}
      trigger={
        <span className="ds-btn ds-btn-secondary">
          <CalendarIcon className="size-4" />
          <span className="truncate max-w-[180px]">{formatRange(value)}</span>
        </span>
      }
      menuClassName="w-[340px] sm:w-[480px] p-0"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr]">
        {/* Presets */}
        <div className="border-b border-[var(--border-subtle)] p-2 sm:border-b-0 sm:border-r">
          <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Presets
          </p>
          <div className="space-y-0.5">
            {DATE_RANGE_PRESETS.map((preset) => {
              const presetValue = preset.build();
              const isActive =
                presetValue.from.getTime() === value.from.getTime() &&
                presetValue.to.getTime() === value.to.getTime();
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePreset(presetValue)}
                  className={cn(
                    'block w-full cursor-pointer rounded-lg px-2.5 py-2 text-left text-sm font-medium transition',
                    isActive
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar */}
        <div className="p-2">
          <ReactCalendar
            value={[value.from, value.to]}
            onChange={handleCalendarChange}
            selectRange
          />
          <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] px-2 pt-3 text-xs font-medium text-[var(--text-muted)]">
            <span>
              <span className="font-medium text-[var(--text-strong)]">{formatDate(value.from)}</span>
              {' → '}
              <span className="font-medium text-[var(--text-strong)]">{formatDate(value.to)}</span>
            </span>
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}
