"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect, useCallback } from "react";

type Theme = "light" | "dark";
type Density = "compact" | "comfortable";
type ColorKey = "emerald" | "violet" | "rose" | "amber" | "sky";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  density: Density;
  setDensity: (d: Density) => void;
  color: ColorKey;
  setColor: (c: ColorKey) => void;
};

const COLOR_PALETTLES: Record<ColorKey, { primary: string; primary600: string; primary700: string }> = {
  emerald: { primary: "#10b981", primary600: "#059669", primary700: "#047857" },
  violet: { primary: "#8b5cf6", primary600: "#7c3aed", primary700: "#6d28d9" },
  rose: { primary: "#f43f5e", primary600: "#e11d48", primary700: "#be123c" },
  amber: { primary: "#f59e0b", primary600: "#d97706", primary700: "#b45309" },
  sky: { primary: "#0ea5e9", primary600: "#0284c7", primary700: "#0369a1" },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy initializers read from localStorage on the client only (SSR-safe)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("nimbus-theme") as Theme | null) || "light";
  });
  const [density, setDensityState] = useState<Density>(() => {
    if (typeof window === "undefined") return "comfortable";
    return (localStorage.getItem("nimbus-density") as Density | null) || "comfortable";
  });
  const [color, setColorState] = useState<ColorKey>(() => {
    if (typeof window === "undefined") return "emerald";
    return (localStorage.getItem("nimbus-color") as ColorKey | null) || "emerald";
  });
  const [isInitialized, setIsInitialized] = useState(typeof window !== "undefined");

  useEffect(() => {
    // Apply current theme on mount (initial values already set via lazy initializers)
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.setAttribute("data-density", density);
      document.documentElement.setAttribute("data-color", color);
      const palette = COLOR_PALETTLES[color];
      const root = document.documentElement;
      root.style.setProperty("--color-brand-500", palette.primary);
      root.style.setProperty("--color-brand-600", palette.primary600);
      root.style.setProperty("--color-brand-700", palette.primary700);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("nimbus-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("nimbus-density", density);
    document.documentElement.setAttribute("data-density", density);
  }, [density, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("nimbus-color", color);
    document.documentElement.setAttribute("data-color", color);
    const palette = COLOR_PALETTLES[color];
    const root = document.documentElement;
    root.style.setProperty("--color-brand-500", palette.primary);
    root.style.setProperty("--color-brand-600", palette.primary600);
    root.style.setProperty("--color-brand-700", palette.primary700);
  }, [color, isInitialized]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setDensity = useCallback((d: Density) => setDensityState(d), []);
  const setColor = useCallback((c: ColorKey) => setColorState(c), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, density, setDensity, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

export { COLOR_PALETTLES };
export type { ColorKey };
