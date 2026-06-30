'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

/**
 * Lazy-loaded react-simple-maps wrapper.
 *
 * Why: react-simple-maps + d3-geo + topojson-client together ship ~150KB
 * of JS. Loading them eagerly on every dashboard hurts LCP and bundle size.
 * This wrapper code-splits the library — only loaded on pages that actually
 * render a simple-map (Analytics dashboard + Maps page).
 *
 * Usage:
 *   import { ComposableMap, Geographies, Geography, Marker } from '@/components/dashboard/lazy-maps';
 *
 * Falls back to a lightweight skeleton (no layout shift) while the chunk loads.
 *
 * Note: For @react-jvectormap (used by Logistics/Sales/Maps), it's already
 * tree-shaken via direct imports. Migrating those to lazy requires reworking
 * the jvectormap callback signatures (different from simple-maps).
 */

const ComposableMap = dynamic(
  () => import('react-simple-maps').then((mod) => mod.ComposableMap),
  { ssr: false, loading: () => <MapSkeleton /> },
);

const Geographies = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geographies),
  { ssr: false },
);

const Geography = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Geography),
  { ssr: false },
);

const Marker = dynamic(
  () => import('react-simple-maps').then((mod) => mod.Marker),
  { ssr: false },
);

export { ComposableMap, Geographies, Geography, Marker };

/**
 * Skeleton shown while map chunk loads (~80ms on fast connection).
 * Uses the same dimensions as the final map to prevent CLS.
 */
export function MapSkeleton({ height = 360 }: { height?: number }) {
  return (
    <div
      className="flex w-full animate-pulse items-center justify-center rounded-xl bg-[var(--surface-sunken)]"
      style={{ height }}
      aria-label="Loading map..."
      role="status"
    >
      <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <svg className="size-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-medium">Loading map...</span>
      </div>
    </div>
  );
}
