import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel auto-detects Next.js; standalone output is harmless on Vercel
  // and useful for self-hosted Docker deploys.
  output: "standalone",
  reactStrictMode: false,
  // Allow preview domains used by sandbox environments (harmless in prod).
  allowedDevOrigins: [
    "*.space-z.ai",
    "preview-chat-*.space-z.ai",
    "preview-*.space-z.ai",
    "localhost",
    "127.0.0.1",
  ],
  // External image domains for Unsplash avatars / cover images.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
