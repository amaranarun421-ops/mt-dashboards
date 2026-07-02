'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  subtext?: string;
  sparkline?: number[];
  accentColor?: string;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export function KPICard({
  title,
  value,
  delta,
  deltaType = 'neutral',
  icon: Icon,
  subtext,
  sparkline,
  accentColor = 'var(--accent)',
  delay = 0,
  className,
  children,
}: KPICardProps) {
  const DeltaIcon = deltaType === 'positive' ? TrendingUp : deltaType === 'negative' ? TrendingDown : Minus;
  const deltaColor =
    deltaType === 'positive'
      ? 'text-success'
      : deltaType === 'negative'
      ? 'text-destructive'
      : 'text-muted-foreground';

  // Sparkline path generator
  const sparkPath = React.useMemo(() => {
    if (!sparkline || sparkline.length < 2) return null;
    const max = Math.max(...sparkline);
    const min = Math.min(...sparkline);
    const range = max - min || 1;
    const w = 100;
    const h = 28;
    return sparkline
      .map((v, i) => {
        const x = (i / (sparkline.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [sparkline]);

  return (
    <div
      className={cn(
        'group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4',
        className
      )}
      style={{ animationDelay: `${delay * 80}ms`, animationFillMode: 'both' }}
    >
      {/* subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </span>
            {subtext && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{subtext}</p>}
          </div>
          {Icon && (
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
              style={{
                backgroundColor: `color-mix(in oklch, ${accentColor} 12%, transparent)`,
              }}
            >
              <Icon
                className="w-4 h-4 transition-colors duration-300"
                style={{ color: accentColor }}
              />
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight tabular-nums">
              {value}
            </span>
            {delta && (
              <div className={cn('flex items-center gap-1 text-xs font-medium mt-1.5', deltaColor)}>
                <DeltaIcon className="w-3 h-3" />
                <span>{delta}</span>
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            )}
          </div>

          {sparkPath && (
            <svg viewBox="0 0 100 28" className="w-20 h-7 shrink-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`spark-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d={`${sparkPath} L100,28 L0,28 Z`} fill={`url(#spark-${title.replace(/\s/g, '')})`} />
              <path d={sparkPath} stroke={accentColor} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
