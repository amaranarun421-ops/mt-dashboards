'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while loading this content.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}

interface LoadingStateProps {
  rows?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, className }: LoadingStateProps) {
  return (
    <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="h-9 w-48 shimmer rounded-lg" />
        <div className="h-9 w-24 shimmer rounded-lg" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="w-5 h-5 shimmer rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 shimmer rounded" />
              <div className="h-2.5 w-1/2 shimmer rounded" />
            </div>
            <div className="w-20 h-6 shimmer rounded-md" />
            <div className="w-16 h-3 shimmer rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ className, height = 320 }: { className?: string; height?: number }) {
  return (
    <div
      className={cn('bg-card border border-border rounded-xl p-5', className)}
      style={{ height: `${height}px` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="h-4 w-32 shimmer rounded" />
          <div className="h-3 w-24 shimmer rounded" />
        </div>
        <div className="h-6 w-16 shimmer rounded-md" />
      </div>
      <div className="w-full shimmer rounded-lg" style={{ height: `${height - 100}px` }} />
    </div>
  );
}

export function KPISkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-5 h-32">
          <div className="flex items-start justify-between mb-3">
            <div className="h-3 w-24 shimmer rounded" />
            <div className="w-9 h-9 shimmer rounded-lg" />
          </div>
          <div className="h-7 w-20 shimmer rounded" />
          <div className="h-3 w-32 shimmer rounded mt-2" />
        </div>
      ))}
    </div>
  );
}
