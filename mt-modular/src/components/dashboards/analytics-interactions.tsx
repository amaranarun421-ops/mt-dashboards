'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Popover as EcomPopover, PopoverItem as EcomPopoverItem } from './ecommerce-interactions';
import * as Data from './analytics-data';

// Re-export Popover and PopoverItem so analytics sections have a single import path
export const Popover = EcomPopover;
export const PopoverItem = EcomPopoverItem;

/* Date range presets for analytics */
export const DATE_PRESETS = [
  { key: 'today', label: 'Today', range: 'Jun 23, 2026' },
  { key: '7d', label: 'Last 7 days', range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24 – Jun 23, 2026' },
  { key: '90d', label: 'Last 90 days', range: 'Mar 25 – Jun 23, 2026' },
  { key: 'custom', label: 'Custom range', range: 'May 24 – Jun 23, 2026' },
];

/* Export sessions as CSV */
export function exportAnalyticsCsv(sessions: Data.Session[], filename = 'analytics-sessions') {
  const headers = ['Visitor', 'Location', 'Source', 'Current Page', 'Device', 'Duration', 'Status'];
  const rows = sessions.map((s) => [s.visitor, s.location, s.source, s.currentPage, s.device, s.duration, s.status]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* Card action menu items (shared across all analytics cards) */
export const CARD_ACTIONS = [
  { label: 'View details', action: 'view' },
  { label: 'Download chart', action: 'download' },
  { label: 'Copy report link', action: 'copy' },
] as const;
