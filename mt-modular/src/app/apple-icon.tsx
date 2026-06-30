import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Apple Touch Icon — 180×180 PNG, used for iOS home screen bookmarks.
 * Auto-served at /apple-icon when this file exists.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          color: "white",
          fontSize: 120,
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
