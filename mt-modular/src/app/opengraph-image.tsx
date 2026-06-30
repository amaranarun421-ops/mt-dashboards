import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Open Graph Image — auto-served at /opengraph-image.
 *
 * Used for social sharing (Facebook, Twitter/X, LinkedIn, Slack, Discord).
 * Auto-detected by Next 16 metadata system — no manual wiring needed.
 *
 * Dimensions: 1200×630 (universal OG standard).
 *
 * Buyer customization: edit SITE_CONFIG in site-config.ts.
 */
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `linear-gradient(135deg, ${SITE_CONFIG.theme.backgroundDark} 0%, #161950 50%, ${SITE_CONFIG.theme.brandDark} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Top row — logo + version badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: "1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${SITE_CONFIG.theme.brand} 0%, ${SITE_CONFIG.theme.accent} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              M
            </div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 600, opacity: 0.9 }}>{SITE_CONFIG.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            v{SITE_CONFIG.version}
          </div>
        </div>

        {/* Center — big title + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: "1" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {SITE_CONFIG.name}
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 400, opacity: 0.85, lineHeight: 1.3 }}>
            {SITE_CONFIG.tagline}
          </div>
        </div>

        {/* Bottom row — stats */}
        <div style={{ display: "flex", gap: 48, zIndex: "1" }}>
          <Stat value="60+" label="Pages" />
          <Stat value="250+" label="Components" />
          <Stat value="10" label="Dashboards" />
          <Stat value="9" label="Auth Flows" />
        </div>
      </div>
    ),
    { ...size },
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#7A5AF8" }}>{value}</div>
      <div style={{ display: "flex", fontSize: 16, opacity: 0.7, textTransform: "uppercase", letterSpacing: 1.5 }}>{label}</div>
    </div>
  );
}
