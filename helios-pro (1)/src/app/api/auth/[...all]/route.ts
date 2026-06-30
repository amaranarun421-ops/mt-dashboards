// Helios Pro — auth API route.
// In demo mode, returns a 503 telling the caller auth is not configured.
// When BETTER_AUTH_SECRET + DATABASE_URL are set, mounts the real better-auth handler.

import { ensureAuth } from "@/lib/auth";

type Handler = (req: Request) => Promise<Response>;

const demoHandler: Handler = async () =>
  new Response(
    JSON.stringify({ error: "Auth not configured in demo mode" }),
    { status: 503, headers: { "Content-Type": "application/json" } },
  );

const isConfigured = Boolean(
  process.env.BETTER_AUTH_SECRET && process.env.DATABASE_URL,
);

async function resolveHandler(method: "GET" | "POST"): Promise<Handler> {
  if (!isConfigured) return demoHandler;
  try {
    const [{ toNextJsHandler }, authInstance] = await Promise.all([
      import("better-auth/next-js"),
      ensureAuth(),
    ]);
    const handlers = toNextJsHandler(authInstance as unknown as Parameters<typeof toNextJsHandler>[0]) as {
      GET: Handler;
      POST: Handler;
    };
    return method === "GET" ? handlers.GET : handlers.POST;
  } catch {
    return demoHandler;
  }
}

export const GET: Handler = async (req: Request) => {
  const h = await resolveHandler("GET");
  return h(req);
};

export const POST: Handler = async (req: Request) => {
  const h = await resolveHandler("POST");
  return h(req);
};
