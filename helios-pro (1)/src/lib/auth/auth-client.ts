// Helios Pro — defensive auth client.
// Returns no-op stubs when better-auth is not configured.
// This lets all pages render in demo mode without a backend.

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Session = {
  data: { user: User } | null;
  isPending: boolean;
  error: unknown;
};

// Permissive result type so legacy auth components keep compiling
// without a real backend configured.
type AuthResult = {
  data: unknown;
  error: { message?: string } | null;
} & Record<string, unknown>;

const ok = (): AuthResult => ({ data: null, error: null });

export const signIn = Object.assign(
  () => Promise.resolve(ok()),
  {
    email: () => Promise.resolve(ok()),
    social: () => Promise.resolve(ok()),
  },
) as unknown as ((...args: unknown[]) => Promise<AuthResult>) & {
  email: (...args: unknown[]) => Promise<AuthResult>;
  social: (...args: unknown[]) => Promise<AuthResult>;
};

export const signUp = Object.assign(
  () => Promise.resolve(ok()),
  {
    email: () => Promise.resolve(ok()),
  },
) as unknown as ((...args: unknown[]) => Promise<AuthResult>) & {
  email: (...args: unknown[]) => Promise<AuthResult>;
};

export const signOut = () => Promise.resolve<AuthResult>(ok());
export const updateUser = (data?: Record<string, unknown>) =>
  Promise.resolve<AuthResult>({ data, error: null });

export function useSession(): Session {
  return {
    data: {
      user: {
        id: "demo",
        name: "Helios Admin",
        email: "admin@helios.pro",
        image: null,
      },
    },
    isPending: false,
    error: null,
  };
}

export function getSession() {
  return Promise.resolve({
    data: {
      user: {
        id: "demo",
        name: "Helios Admin",
        email: "admin@helios.pro",
        image: null,
      },
    },
  });
}

export const authClient = {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  updateUser,
};
