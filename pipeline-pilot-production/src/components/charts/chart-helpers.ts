'use client';

// Shared chart tooltip and helpers for premium chart appearance
import * as React from 'react';

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'var(--popover)',
  border: '1px solid var(--border)',
  borderRadius: '0.5rem',
  fontSize: '12px',
  padding: '8px 12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

export const CHART_LABEL_STYLE = {
  color: 'var(--foreground)',
  fontWeight: 600,
  marginBottom: '4px',
};

export const CHART_ITEM_STYLE = {
  color: 'var(--muted-foreground)',
  padding: '2px 0',
};

export const AXIS_TICK_STYLE = {
  fill: 'var(--muted-foreground)',
  fontSize: 12,
};

export const GRID_STROKE = 'var(--border)';

export function useChartLoading(delay = 300) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return loaded;
}

// Format helpers
export function formatK(value: number) {
  if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

export function formatPct(value: number) {
  return `${value}%`;
}
