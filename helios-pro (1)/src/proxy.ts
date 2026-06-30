// Helios Pro — middleware disabled in demo mode.
// The original middleware redirected unauthenticated users to /auth/sign-in.
// In demo mode (no BETTER_AUTH_SECRET / DATABASE_URL), we let all pages render.
// To re-enable auth middleware, set the env vars and restore the original logic.

import { NextRequest, NextResponse } from "next/server";

export async function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
