'use client';

import * as React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

/**
 * Real geographic world map using react-simple-maps + Natural Earth 1:110m
 * topojson (served from /public/world-110m.json).
 *
 * This is the same library used by production dashboards (Stripe, Vercel, etc.)
 * for accurate, recognizable world maps.
 */

const WORLD_TOPO_JSON_URL = '/world-110m.json';

export interface WorldMapPin {
  /** Longitude (-180 to 180) */
  lon: number;
  /** Latitude (-90 to 90) */
  lat: number;
  /** Pin color (CSS color string) */
  color: string;
  /** Pin radius — defaults to 6 */
  radius?: number;
  /** Optional label rendered next to the pin */
  label?: string;
  /** Optional value shown in label */
  value?: string;
}

interface WorldMapProps {
  pins?: WorldMapPin[];
  className?: string;
  children?: React.ReactNode;
}

/**
 * Real-world lat/long for major countries (used to position pins accurately).
 */
export const COUNTRY_COORDS: Record<string, { lon: number; lat: number }> = {
  US: { lon: -95.71, lat: 37.09 },
  GB: { lon: -1.54, lat: 52.36 },
  DE: { lon: 10.45, lat: 51.17 },
  FR: { lon: 2.21, lat: 46.23 },
  AU: { lon: 133.78, lat: -25.27 },
  JP: { lon: 138.25, lat: 36.2 },
  CA: { lon: -106.35, lat: 56.13 },
  IN: { lon: 78.96, lat: 20.59 },
  BR: { lon: -51.93, lat: -14.24 },
  NL: { lon: 5.29, lat: 52.13 },
  ES: { lon: -3.75, lat: 40.46 },
  IT: { lon: 12.57, lat: 41.87 },
  SG: { lon: 103.82, lat: 1.35 },
  AE: { lon: 53.85, lat: 23.42 },
  KR: { lon: 127.77, lat: 35.91 },
  MX: { lon: -102.55, lat: 23.63 },
  ZA: { lon: 22.94, lat: -30.56 },
  EG: { lon: 30.8, lat: 26.82 },
  NG: { lon: 8.68, lat: 9.08 },
  RU: { lon: 105.32, lat: 61.52 },
  CN: { lon: 104.2, lat: 35.86 },
  ID: { lon: 113.92, lat: -0.79 },
};

/** Backwards-compatible pin alias: COUNTRY_PINS (now uses lat/lon) */
export const COUNTRY_PINS: Record<string, { lon: number; lat: number }> = COUNTRY_COORDS;

export function WorldMap({ pins = [], className, children }: WorldMapProps) {
  return (
    <div className={className}>
      <ComposableMap
        viewBox="0 0 800 400"
        style={{ width: '100%', height: '100%' }}
        projectionConfig={{
          scale: 120,
          center: [0, 0],
        }}
      >
        {/* Ocean background — subtle gradient via defs */}
        <defs>
          <linearGradient id="worldmap-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-50)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-info-50)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="worldmap-land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-300)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Subtle ocean rect */}
        <rect x={0} y={0} width={800} height={400} fill="url(#worldmap-ocean)" rx={0} />

        {/* All countries from the world-atlas topojson */}
        <Geographies geography={WORLD_TOPO_JSON_URL}>
          {({ geographies }: { geographies: React.ComponentProps<typeof Geography>[] }) =>
            geographies.map((geo, idx) => (
              <Geography
                key={(geo as any).rsmKey ?? `${geo.id ?? 'geo'}-${idx}`}
                geography={geo}
                fill="url(#worldmap-land)"
                stroke="var(--color-brand-500)"
                strokeWidth={0.4}
                strokeOpacity={0.6}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: 'var(--color-brand-500)', outline: 'none', cursor: 'pointer' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Pins — rendered as Markers with halo + dot + label */}
        {pins.map((pin, idx) => {
          const r = pin.radius ?? 5;
          const labelWidth = (pin.label?.length ?? 0) * 5.5 + (pin.value ? (pin.value.length + 2) * 5 : 0) + 10;
          return (
            <Marker key={`pin-${idx}`} coordinates={[pin.lon, pin.lat]}>
              {/* Outer halo */}
              <circle r={r * 2.6} fill={pin.color} opacity={0.16} />
              <circle r={r * 1.6} fill={pin.color} opacity={0.32} />
              {/* Inner dot */}
              <circle r={r} fill={pin.color} opacity={0.95} />
              <circle r={r * 0.42} fill="#ffffff" opacity={0.95} />
              {/* Label */}
              {pin.label && (
                <g transform={`translate(${r + 4}, 0)`}>
                  <rect
                    x={0}
                    y={-8}
                    width={labelWidth}
                    height={16}
                    rx={4}
                    fill="var(--card)"
                    stroke="var(--border)"
                    strokeWidth={0.5}
                  />
                  <text
                    x={4}
                    y={3}
                    fontSize={9}
                    fontWeight={600}
                    fill="var(--text-strong)"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {pin.label}
                    {pin.value && (
                      <tspan fill="var(--text-muted)" fontWeight={500}>
                        {'  '}
                        {pin.value}
                      </tspan>
                    )}
                  </text>
                </g>
              )}
            </Marker>
          );
        })}
      </ComposableMap>
      {children}
    </div>
  );
}
