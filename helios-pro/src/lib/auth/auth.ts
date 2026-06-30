// Helios Pro — defensive auth configuration.
// When BETTER_AUTH_SECRET is not set, exports a no-op stub object
// so the app builds and runs in demo mode without a backend.

type AuthStub = {
  api: {
    getSession: (_opts: { headers: Headers }) => Promise<null>;
  };
  handler?: unknown;
};

function makeStub(): AuthStub {
  return {
    api: {
      getSession: async () => null,
    },
  };
}

let _auth: AuthStub | null = null;

async function loadAuth(): Promise<AuthStub> {
  if (_auth) return _auth;
  if (!process.env.BETTER_AUTH_SECRET || !process.env.DATABASE_URL) {
    _auth = makeStub();
    return _auth;
  }
  try {
    const [betterAuthModule, prismaAdapterModule, dbModule] = await Promise.all([
      import("better-auth"),
      import("better-auth/adapters/prisma"),
      import("../db"),
    ]);
    const betterAuth = (betterAuthModule as unknown as { default: (opts: unknown) => AuthStub }).default;
    const prismaAdapter = (prismaAdapterModule as unknown as { prismaAdapter: (db: unknown, opts: unknown) => unknown }).prismaAdapter;
    _auth = betterAuth({
      appName: "Helios Pro",
      baseURL: process.env.BETTER_AUTH_URL!,
      user: {
        additionalFields: {
          phoneNumber: { type: "number", required: false },
          bio: { type: "string", required: false },
        },
      },
      emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      },
      database: prismaAdapter(dbModule.db, { provider: "postgresql" }),
      session: {
        cookieCache: { enabled: true, maxAge: 60 * 5, strategy: "compact" },
        deferSessionRefresh: true,
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
      },
      trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!, process.env.BETTER_AUTH_URL!],
    });
    return _auth;
  } catch {
    _auth = makeStub();
    return _auth;
  }
}

// Synchronous accessor returns stub immediately; real auth loads in background.
export const auth: AuthStub = new Proxy(makeStub(), {
  get(target, prop) {
    if (prop in target) {
      return target[prop as keyof AuthStub];
    }
    return undefined;
  },
});

// Async accessor for callers that need the real (or stub) auth instance.
export const ensureAuth = loadAuth;
