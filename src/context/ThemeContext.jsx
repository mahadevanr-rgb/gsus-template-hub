// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext(null);

// const STORAGE_KEY = "templatehub-theme";

// function getInitialTheme() {
//   if (typeof window === "undefined") return "light";
//   const stored = window.localStorage.getItem(STORAGE_KEY);
//   if (stored === "light" || stored === "dark") return stored;
//   const prefersDark = window.matchMedia?.(
//     "(prefers-color-scheme: dark)"
//   ).matches;
//   return prefersDark ? "dark" : "light";
// }

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     window.localStorage.setItem(STORAGE_KEY, theme);
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) {
//     return {
//       theme: 'light',
//       setTheme: () => {},
//       toggleTheme: () => {},
//     };
//   }
//   return ctx;
// }
import { createContext, useContext, useEffect, useState } from "react";
import { initialTokens } from "../pages/DesignSystem/tokens/themeTokens";

// Fallback Tokens for Design System Customizer
const fallbackTokens = {
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    neutral: "#64748b",
    background: "#020817",
    surface: "#0b1426",
    border: "#1e293b",
    text: "#f8fafc",
  },
  radius: 12,
  spacing: 16,
  shadow: "md",
};

const ThemeContext = createContext(null);

const STORAGE_KEY = "templatehub-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  // 1. Existing Light / Dark Theme State
  const [theme, setTheme] = useState(getInitialTheme);

  // 2. Design System Tokens State
  const [tokens, setTokens] = useState(() => initialTokens || fallbackTokens);
  const [activePage, setActivePage] = useState("theme"); // 'theme' | 'card-builder'
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [highlightedStep, setHighlightedStep] = useState(null);

  // Existing Effect: Dark/Light Mode Class Toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Design Tokens Effect: CSS Custom Variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = tokens?.colors || fallbackTokens.colors;

    root.style.setProperty("--color-primary", colors.primary || "#6366f1");
    root.style.setProperty("--color-secondary", colors.secondary || "#8b5cf6");
    root.style.setProperty("--color-accent", colors.accent || "#06b6d4");
    root.style.setProperty("--color-success", colors.success || "#10b981");
    root.style.setProperty("--color-warning", colors.warning || "#f59e0b");
    root.style.setProperty("--color-error", colors.error || "#ef4444");
    root.style.setProperty("--color-neutral", colors.neutral || "#64748b");
    root.style.setProperty(
      "--color-background",
      colors.background || "#020817",
    );
    root.style.setProperty("--color-surface", colors.surface || "#0b1426");
    root.style.setProperty("--color-border", colors.border || "#1e293b");
    root.style.setProperty("--color-text", colors.text || "#f8fafc");

    root.style.setProperty("--theme-radius", `${tokens?.radius ?? 12}px`);
    root.style.setProperty("--theme-spacing", `${tokens?.spacing ?? 16}px`);

    // Dynamic Shadows
    let shadowVal = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";
    const currentShadow = tokens?.shadow ?? "md";

    if (currentShadow === "xs") shadowVal = "0 1px 2px 0 rgba(0, 0, 0, 0.2)";
    if (currentShadow === "sm") shadowVal = "0 1px 3px 0 rgba(0, 0, 0, 0.3)";
    if (currentShadow === "md") shadowVal = "0 4px 6px -1px rgba(0, 0, 0, 0.3)";
    if (currentShadow === "xl")
      shadowVal = "0 20px 25px -5px rgba(0, 0, 0, 0.4)";
    if (currentShadow === "glow")
      shadowVal = `0 0 20px ${colors.primary || "#6366f1"}66`;

    root.style.setProperty("--theme-shadow", shadowVal);
  }, [tokens]);

  // Handlers
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const updateColor = (key, val) => {
    setTokens((prev) => ({
      ...prev,
      colors: { ...(prev?.colors || fallbackTokens.colors), [key]: val },
    }));
  };

  const updateRadius = (val) => setTokens((p) => ({ ...p, radius: val }));
  const updateSpacing = (val) => setTokens((p) => ({ ...p, spacing: val }));
  const updateShadow = (val) => setTokens((p) => ({ ...p, shadow: val }));

  const resetTheme = () => setTokens(initialTokens || fallbackTokens);

  return (
    <ThemeContext.Provider
      value={{
        // Existing Light / Dark props
        theme,
        setTheme,
        toggleTheme,

        // Design System Tokens & Customizer props
        tokens: tokens || fallbackTokens,
        setTokens,
        updateColor,
        updateRadius,
        updateSpacing,
        updateShadow,
        resetTheme,
        activePage,
        setActivePage,
        isCustomizerOpen,
        setIsCustomizerOpen,
        highlightedStep,
        setHighlightedStep,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook with Fail-safe Fallbacks
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      // Light / Dark Fallbacks
      theme: "light",
      setTheme: () => {},
      toggleTheme: () => {},

      // Design System Tokens Fallbacks
      tokens: fallbackTokens,
      setTokens: () => {},
      updateColor: () => {},
      updateRadius: () => {},
      updateSpacing: () => {},
      updateShadow: () => {},
      resetTheme: () => {},
      activePage: "theme",
      setActivePage: () => {},
      isCustomizerOpen: false,
      setIsCustomizerOpen: () => {},
      highlightedStep: null,
      setHighlightedStep: () => {},
    };
  }
  return ctx;
}
