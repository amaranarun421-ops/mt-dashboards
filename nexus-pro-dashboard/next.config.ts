import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
  },
  // NOTE: We do NOT set `typescript.ignoreBuildErrors`. All TS errors must be fixed properly.
  // NOTE: We do NOT set `eslint.ignoreDuringBuilds`. Lint errors must be fixed properly.
};

export default nextConfig;
