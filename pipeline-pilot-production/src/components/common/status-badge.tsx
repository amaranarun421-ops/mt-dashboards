'use client';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Circle,
  Flame,
  Trophy,
} from 'lucide-react';

type StatusType =
  | 'won'
  | 'pending'
  | 'lost'
  | 'active'
  | 'inactive'
  | 'high'
  | 'medium'
  | 'low'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  icon?: LucideIcon;
  className?: string;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<StatusType, { bg: string; text: string; border: string; icon: LucideIcon }> = {
  won: { bg: 'bg-success/15', text: 'text-success', border: 'border-success/30', icon: CheckCircle2 },
  pending: { bg: 'bg-warning/15', text: 'text-warning', border: 'border-warning/30', icon: Clock },
  lost: { bg: 'bg-destructive/15', text: 'text-destructive', border: 'border-destructive/30', icon: XCircle },
  active: { bg: 'bg-success/15', text: 'text-success', border: 'border-success/30', icon: CheckCircle2 },
  inactive: { bg: 'bg-secondary', text: 'text-muted-foreground', border: 'border-border', icon: Circle },
  high: { bg: 'bg-destructive/15', text: 'text-destructive', border: 'border-destructive/30', icon: Flame },
  medium: { bg: 'bg-warning/15', text: 'text-warning', border: 'border-warning/30', icon: AlertTriangle },
  low: { bg: 'bg-success/15', text: 'text-success', border: 'border-success/30', icon: CheckCircle2 },
  success: { bg: 'bg-success/15', text: 'text-success', border: 'border-success/30', icon: CheckCircle2 },
  warning: { bg: 'bg-warning/15', text: 'text-warning', border: 'border-warning/30', icon: AlertTriangle },
  destructive: { bg: 'bg-destructive/15', text: 'text-destructive', border: 'border-destructive/30', icon: XCircle },
  info: { bg: 'bg-chart-1/15', text: 'text-chart-1', border: 'border-chart-1/30', icon: Circle },
  neutral: { bg: 'bg-secondary', text: 'text-muted-foreground', border: 'border-border', icon: Circle },
};

export function StatusBadge({ status, label, icon, className, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.neutral;
  const Icon = icon || config.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border font-medium',
        config.bg,
        config.text,
        config.border,
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-1 text-xs',
        className
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {label || status}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return <StatusBadge status={priority} label={priority.charAt(0).toUpperCase() + priority.slice(1)} className={className} />;
}

interface StageBadgeProps {
  stage: string;
  color?: string;
  className?: string;
}

export function StageBadge({ stage, color, className }: StageBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border',
        className
      )}
      style={{
        backgroundColor: color ? `color-mix(in oklch, ${color} 12%, transparent)` : 'var(--secondary)',
        color: color || 'var(--foreground)',
        borderColor: color ? `color-mix(in oklch, ${color} 30%, transparent)` : 'var(--border)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color || 'var(--muted-foreground)' }} />
      {stage}
    </span>
  );
}

interface AvatarBadgeProps {
  initials: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  src?: string;
  alt?: string;
}

export function AvatarBadge({ initials, color = 'var(--accent)', size = 'sm', className, src, alt }: AvatarBadgeProps) {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };
  if (src) {
    return (
      <img
        src={src}
        alt={alt || initials}
        width={size === 'lg' ? 40 : size === 'md' ? 32 : 24}
        height={size === 'lg' ? 40 : size === 'md' ? 32 : 24}
        loading="lazy"
        className={cn('rounded-full object-cover shrink-0 ring-1 ring-border', sizes[size], className)}
      />
    );
  }
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white shrink-0',
        sizes[size],
        className
      )}
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

interface RankBadgeProps {
  rank: number;
  className?: string;
}

export function RankBadge({ rank, className }: RankBadgeProps) {
  if (rank <= 3) {
    return (
      <div
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
          rank === 1 && 'bg-warning/20 text-warning',
          rank === 2 && 'bg-chart-1/20 text-chart-1',
          rank === 3 && 'bg-chart-3/20 text-chart-3',
          className
        )}
      >
        <Trophy className="w-3 h-3" />
      </div>
    );
  }
  return (
    <div className={cn('w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0', className)}>
      {rank}
    </div>
  );
}
