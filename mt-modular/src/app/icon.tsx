import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Favicon — rendered as SVG via Next 16's app/icon.tsx convention.
 * Automatically served at /icon and used as the page favicon.
 *
 * Buyer customization: change `SITE_CONFIG.theme.brand` in site-config.ts.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${SITE_CONFIG.theme.brand} 0%, ${SITE_CONFIG.theme.accent} 100%)`,
          borderRadius: 8,
          color: "white",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
