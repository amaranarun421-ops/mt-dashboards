/**
 * Chart color palette + ApexCharts shared config.
 *
 * All dashboards import from here for consistent chart styling.
 * Buyer can rebrand by editing the `BRAND_COLORS` array.
 */

/** Primary chart palette — matches dashboard brand scale. */
export const BRAND_COLORS = [
  '#465FFF', // brand-500
  '#12B76A', // success-500
  '#F79009', // warning-500
  '#7A5AF8', // violet
  '#0BA5EC', // info-500
  '#EC4899', // pink
  '#F04438', // error-500
] as const;

/** Semantic chart colors for single-series charts. */
export const CHART_COLORS = {
  brand: '#465FFF',
  success: '#12B76A',
  warning: '#F79009',
  error: '#F04438',
  info: '#0BA5EC',
  violet: '#7A5AF8',
  pink: '#EC4899',
} as const;

/** Shared ApexCharts base options — dashboards spread this into their config. */
export const APEX_BASE_OPTIONS = {
  chart: {
    fontFamily: 'Outfit, sans-serif',
    toolbar: { show: false },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: { enabled: true, delay: 50 },
      dynamicAnimation: { enabled: true, speed: 350 },
    },
  },
  grid: {
    borderColor: 'var(--border)',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' as const, width: 2 },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'right' as const,
    fontSize: '12px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 500,
    labels: { colors: 'var(--text-body)' },
    markers: { size: 6, strokeWidth: 0, offsetX: -4, shape: 'circle' as const },
    itemMargin: { horizontal: 14, vertical: 4 },
  },
  tooltip: {
    enabled: true,
    theme: 'light' as const,
  },
} as const;

/** Standard axis label style — use in `xaxis.labels.style` / `yaxis.labels.style`. */
export const AXIS_LABEL_STYLE = {
  colors: 'var(--text-muted)',
  fontSize: '12px',
  fontFamily: 'Outfit, sans-serif',
  fontWeight: 500,
} as const;

/** Mobile axis label style — smaller font + rotation. */
export function mobileAxisStyle(isMobile: boolean) {
  return {
    colors: 'var(--text-muted)',
    fontSize: isMobile ? '11px' : '12px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 500,
  };
}

/** HTML tooltip wrapper — premium dark popover with shadow. */
export function tooltipWrapper(innerHtml: string, minWidth = 200): string {
  return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:14px;padding:14px 16px;box-shadow:0 16px 32px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:${minWidth}px;">${innerHtml}</div>`;
}
