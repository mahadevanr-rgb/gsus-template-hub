import { useState, createContext, useContext } from "react";
import { LIST_DATA } from "./model";

// ── Theme ────────────────────────────────────────────────────
export const PALETTES = [
  { name: "Indigo",  primary: "#6366f1", secondary: "#8b5cf6" },
  { name: "Blue",    primary: "#2563eb", secondary: "#3b82f6" },
  { name: "Emerald", primary: "#059669", secondary: "#10b981" },
  { name: "Rose",    primary: "#e11d48", secondary: "#f43f5e" },
  { name: "Amber",   primary: "#d97706", secondary: "#f59e0b" },
  { name: "Cyan",    primary: "#0891b2", secondary: "#06b6d4" },
  { name: "Violet",  primary: "#7c3aed", secondary: "#a78bfa" },
  { name: "Slate",   primary: "#475569", secondary: "#64748b" },
];

export const ThemeContext = createContext(null);
export const useThemeCtx = () => useContext(ThemeContext);

export function useTheme() {
  const [palette, setPalette] = useState(PALETTES[0]);
  const [dark, setDark] = useState(false);
  return { palette, setPalette, dark, setDark };
}

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("login"); // "login" | "forgot"

  const login = (email, password) => {
    if (email && password) { setLoggedIn(true); return true; }
    return false;
  };
  const logout = () => setLoggedIn(false);

  return { loggedIn, screen, setScreen, login, logout };
}

export function useDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeOpen, setThemeOpen] = useState(false);
  return { active, setActive, sidebarOpen, setSidebarOpen, themeOpen, setThemeOpen };
}

export function useListScreen(tab) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [showDel, setShowDel] = useState(null);

  const data = LIST_DATA[tab] || { cols: [], rows: [] };
  const filtered = data.rows.filter((r) =>
    r.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );
  const isStatus = data.cols[data.cols.length - 1] === "Status";

  return {
    search, setSearch,
    showAdd, setShowAdd,
    showView, setShowView,
    showEdit, setShowEdit,
    showDel, setShowDel,
    data, filtered, isStatus,
  };
}
