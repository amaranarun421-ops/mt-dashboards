/**
 * Chart theme tokens — dark/light aware.
 * Use these instead of hardcoded colors in Recharts components.
 */
export const chartTokens = {
  // Brand-aligned series palette (works in both themes)
  series: [
    "#465fff", // brand-500
    "#0ba5ec", // blue-light-500
    "#12b76a", // success-500
    "#f79009", // warning-500
    "#ee46bc", // pink-500
    "#7a5af8", // purple-500
    "#f04438", // error-500
    "#039855", // success-600
  ],
  // Stage / status colors
  status: {
    success: "#12b76a",
    warning: "#f79009",
    error: "#f04438",
    info: "#0ba5ec",
    brand: "#465fff",
    neutral: "#98a2b3",
  },
  // Grid / axis colors by theme
  grid: {
    light: "#e4e7ec",
    dark: "#1d2939",
  },
  axis: {
    light: "#667085",
    dark: "#98a2b3",
  },
  tooltip: {
    light: {
      bg: "#ffffff",
      border: "#e4e7ec",
      label: "#1d2939",
      item: "#475467",
    },
    dark: {
      bg: "#1a2231",
      border: "#344054",
      label: "#ffffff",
      item: "#d0d5dd",
    },
  },
};

// Helper to format currency compactly (e.g. $1.2M, $84K)
export function formatCompactCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

// Tooltip component that adapts to theme via CSS classes (no JS theme hook needed)
export function chartTooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: "var(--color-card, #ffffff)",
      border: "1px solid var(--color-border, #e4e7ec)",
      borderRadius: "0.5rem",
      boxShadow: "0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06)",
      padding: "0.75rem",
      fontSize: "0.75rem",
    },
    labelStyle: {
      color: "var(--color-foreground, #1d2939)",
      fontWeight: 600,
      marginBottom: "0.25rem",
    },
    itemStyle: {
      color: "var(--color-muted-foreground, #475467)",
    },
  } as const;
}
