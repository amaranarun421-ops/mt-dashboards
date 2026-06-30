/**
 * Format utilities — currency, number, percent, date formatting.
 *
 * All functions are tree-shakeable and side-effect free.
 * Use these instead of inline `.toFixed()` / `.toLocaleString()` for
 * consistent formatting across the entire app.
 */

/** Format a number as USD currency with no decimals. `$1,234,567` */
export function formatCurrency(value: number, options: { decimals?: number } = {}): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options.decimals ?? 0,
    maximumFractionDigits: options.decimals ?? 0,
  }).format(value);
}

/** Format a number with thousands separators. `1,234,567` */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/** Format a number as compact. `1.2K`, `3.4M`, `5.6B` */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Format a decimal (0.12) as a percentage. `12%` or `12.4%` */
export function formatPercent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/** Format a percentage value that's already 0-100. `42%` */
export function formatPercentValue(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format a value with a sign. `+12%` / `-5%` */
export function formatSigned(value: number, suffix = '%'): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}${suffix}`;
}

/** Format a number of seconds as a duration. `2h 18m`, `45m`, `30s` */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  if (minutes < 60) return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/** Format an ISO date string as a short date. `Jun 23, 2026` */
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {}): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
}

/** Format an ISO date string as a relative time. `2h ago`, `3d ago` */
export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/** Truncate a string to `maxLength` chars with an ellipsis. */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

/** Format a bytes value as KB/MB/GB. `1.2 MB` */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
