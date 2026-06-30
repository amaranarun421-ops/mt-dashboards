'use client';

import * as React from 'react';
import { MoreHorizontal, Eye, Download, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverItem } from '@/components/dashboards/analytics-interactions';

/**
 * CardHeader — consistent header layout for premium cards.
 *
 * Layout: [icon tile] [title + subtitle]  ............  [badge?] [action menu?]
 *
 * @example
 * <CardHeader
 *   icon={Activity}
 *   iconBg="bg-brand-50 text-brand-600"
 *   title="Relationship Timeline"
 *   subtitle="Touchpoints over time"
 *   action={<CardActionMenu cardName="Timeline" />}
 * />
 */
type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export function CardHeader({
  icon: Icon,
  iconBg,
  title,
  subtitle,
  action,
  badge,
}: {
  icon: IconType;
  iconBg: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn('inline-flex size-9 flex-shrink-0 items-center justify-center rounded-xl', iconBg)}>
          <Icon className="size-[18px]" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-[var(--text-strong)]">{title}</h3>
          {subtitle && <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        {badge}
        {action}
      </div>
    </div>
  );
}

/**
 * CardActionMenu — three-dot dropdown with View/Download/Copy actions.
 * Reusable across all dashboard cards.
 */
export function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  function handle(action: string) {
    setOpen(false);
    toast({ title: `${action} — ${cardName}` });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
        aria-label={`Actions for ${cardName}`}
      >
        <MoreHorizontal className="size-4" strokeWidth={2.2} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={200}>
        <div className="px-2 py-1.5">
          <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p>
        </div>
        <PopoverItem icon={Eye} onClick={() => handle('View details')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handle('Download')}>Download chart</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handle('Copy link')}>Copy report link</PopoverItem>
      </Popover>
    </div>
  );
}

export default CardHeader;
