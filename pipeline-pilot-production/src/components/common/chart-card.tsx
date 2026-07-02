'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Download, RefreshCw, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  height?: number | string;
  loading?: boolean;
  actions?: React.ReactNode;
  legend?: { label: string; color: string }[];
  trendBadge?: { value: string; type: 'positive' | 'negative' | 'neutral' };
  onExport?: () => void;
  onRefresh?: () => void;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  height,
  loading,
  actions,
  legend,
  trendBadge,
  onExport,
  onRefresh,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        'group relative bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500',
        className
      )}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground truncate">{title}</h3>
            {trendBadge && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold',
                  trendBadge.type === 'positive' && 'bg-success/15 text-success',
                  trendBadge.type === 'negative' && 'bg-destructive/15 text-destructive',
                  trendBadge.type === 'neutral' && 'bg-secondary text-muted-foreground'
                )}
              >
                {trendBadge.value}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
          {legend && legend.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {actions}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <Download className="w-4 h-4 mr-2" /> Export
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Maximize2 className="w-4 h-4 mr-2" /> Expand
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {loading ? (
        <div className="w-full shimmer rounded-lg" style={{ height: typeof height === 'number' ? `${height - 100}px` : '300px' }} />
      ) : (
        children
      )}
    </div>
  );
}
