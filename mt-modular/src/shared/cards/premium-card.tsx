'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * PremiumCard — unified card primitive used across all dashboards and pages.
 *
 * Provides consistent elevation, border, radius, and hover behavior.
 * Every premium-upgraded page should wrap its content in this component.
 *
 * Features:
 *  - shadow-theme-xs default elevation (Vercel/Stripe-style layered)
 *  - hover: border-strong + shadow-md + -translate-y-0.5 lift
 *  - subtle top gradient line that fades in on hover
 *  - 300ms cubic-bezier transition
 *  - dark-mode aware (uses CSS variables)
 *
 * @example
 * <PremiumCard>
 *   <CardHeader title="Revenue" icon={DollarSign} />
 *   <div className="p-5">...</div>
 * </PremiumCard>
 */
export function PremiumCard({
  children,
  className,
  hover = true,
  as: As = 'section',
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-theme-xs)] transition-all duration-300',
        hover && 'hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-theme-md)] hover:-translate-y-0.5',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </As>
  );
}

export default PremiumCard;
