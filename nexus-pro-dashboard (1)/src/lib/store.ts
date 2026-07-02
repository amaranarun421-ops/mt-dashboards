import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * UI state store — sidebar, command palette, theme preferences, etc.
 *
 * NOTE: This store does NOT drive page routing. All routing is handled by
 * the Next.js App Router (`next/link` + `usePathname`). Zustand is used only
 * for ephemeral UI state and a few persisted preferences.
 */

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;

  // Command palette
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;

  // Sidebar favorites & recents
  favorites: string[];
  toggleFavorite: (path: string) => void;
  recentPages: string[];
  pushRecentPage: (path: string) => void;

  // Density preference for data tables
  tableDensity: "compact" | "standard" | "comfortable";
  setTableDensity: (v: "compact" | "standard" | "comfortable") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      mobileSidebarOpen: false,
      setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),

      commandOpen: false,
      setCommandOpen: (v) => set({ commandOpen: v }),

      favorites: ["/sales/overview", "/dashboard/ecommerce", "/sales/pipeline"],
      toggleFavorite: (path) =>
        set((s) => ({
          favorites: s.favorites.includes(path)
            ? s.favorites.filter((p) => p !== path)
            : [...s.favorites, path],
        })),

      recentPages: [],
      pushRecentPage: (path) =>
        set((s) => ({
          recentPages: [
            path,
            ...s.recentPages.filter((p) => p !== path),
          ].slice(0, 8),
        })),

      tableDensity: "standard",
      setTableDensity: (v) => set({ tableDensity: v }),
    }),
    {
      name: "nexus-ui",
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        favorites: s.favorites,
        tableDensity: s.tableDensity,
      }),
    }
  )
);
