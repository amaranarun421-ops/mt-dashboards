import { NextResponse } from "next/server";

// Health check endpoint — used by monitoring / deployment platforms.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "nexus-pro-dashboard",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
