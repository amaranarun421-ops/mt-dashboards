// Helios Pro — defensive Prisma client wrapper.
// When DATABASE_URL is configured, returns a real PrismaClient.
// Otherwise it returns a no-op proxy so the app renders without a database.

type PrismaLike = Record<string, unknown>;

let _db: PrismaLike | null = null;
let _loadPromise: Promise<PrismaLike | null> | null = null;

async function loadDb(): Promise<PrismaLike | null> {
  if (typeof window !== "undefined") return null;
  if (_db) return _db;
  if (_loadPromise) return _loadPromise;
  _loadPromise = (async () => {
    try {
      if (!process.env.DATABASE_URL) return null;
      const [{ PrismaPg }, prismaClientModule] = await Promise.all([
        import("@prisma/adapter-pg"),
        import("@prisma/client"),
      ]);
      const PrismaClient = (prismaClientModule as unknown as { PrismaClient: new (opts: unknown) => PrismaLike }).PrismaClient;
      _db = new PrismaClient({
        adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
      });
      return _db;
    } catch {
      return null;
    }
  })();
  return _loadPromise;
}

// Synchronous accessor used by legacy code — returns a no-op proxy if DB is not yet loaded.
export const db = new Proxy({} as PrismaLike, {
  get(_target, prop) {
    return (...args: unknown[]) => {
      // Fire-and-forget the load, return null in the meantime.
      void loadDb().then((client) => {
        if (client && typeof (client as Record<string, unknown>)[prop as string] === "function") {
          ((client as Record<string, (...a: unknown[]) => unknown>)[prop as string])(...args);
        }
      });
      return Promise.resolve(null);
    };
  },
});

export const ensureDb = loadDb;
