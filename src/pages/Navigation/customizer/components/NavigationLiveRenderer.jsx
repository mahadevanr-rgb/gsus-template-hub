import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  Bell,
  User,
  Home,
  Compass,
  Layers,
  Settings,
  Folder,
  ArrowRight,
  Check,
  Activity,
  BarChart2,
  Users,
  Copy,
  Trash2,
  Download,
  Eye,
  Sliders,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { getShadowValue } from "../navigationCustomizationUtils";

export default function NavigationLiveRenderer({
  config,
  viewport = "desktop",
}) {
  const [activeId, setActiveId] = useState(config.activeId || "1");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [commandQuery, setCommandQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const pattern = config.sourceComponentId || config.componentType || "navbar";
  const colors = config.colors || {};
  const border = config.border || {};
  const typography = config.typography || {};
  const layout = config.layout || {};
  const animation = config.animation || {};
  const brand = config.brand || {};
  const items = config.items || [];
  const groups = config.groups || [];
  const columns = config.columns || [];

  // Reset local state when switching patterns
  useEffect(() => {
    setActiveId(config.activeId || "1");
    setCurrentStep(1);
    setActiveDropdown(null);
    setDrawerOpen(false);
    setContextMenuPos(null);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pattern, config.id]);

  const shadow = getShadowValue(border.shadowIntensity || "lg", "rgba(0,0,0,0.25)");

  const containerStyles = {
    backgroundColor: colors.surfaceBg || "#0f172a",
    color: colors.inactiveText || "#94a3b8",
    borderRadius: `${border.radius ?? 16}px`,
    borderWidth: `${border.width ?? 1}px`,
    borderStyle: border.style || "solid",
    borderColor: border.color || "#1e293b",
    boxShadow: shadow,
    fontFamily: typography.fontFamily || "Inter, sans-serif",
    transition: animation.enabled ? `all ${animation.duration || 250}ms ${animation.easing || "ease-out"}` : "none",
  };

  const handleItemClick = (id, e) => {
    if (e) e.preventDefault();
    setActiveId(id);
    setActiveDropdown(null);
    setMegaMenuOpen(false);
  };

  // Helper for active indicator styles
  const getActiveItemStyle = (isActive) => {
    if (!isActive) {
      return {
        color: colors.inactiveText || "#94a3b8",
        backgroundColor: "transparent",
      };
    }

    switch (config.indicatorStyle) {
      case "underline":
        return {
          color: colors.activeText || "#ffffff",
          backgroundColor: "transparent",
          borderBottom: `2px solid ${colors.activeBg || "#4f46e5"}`,
          borderRadius: 0,
        };
      case "left-bar":
        return {
          color: colors.activeText || "#ffffff",
          backgroundColor: "transparent",
          borderLeft: `3px solid ${colors.activeBg || "#4f46e5"}`,
        };
      case "glow":
        return {
          color: colors.activeText || "#ffffff",
          backgroundColor: colors.activeBg || "#4f46e5",
          boxShadow: `0 0 16px ${colors.activeBg || "#4f46e5"}`,
        };
      case "subtle-bg":
        return {
          color: colors.activeText || "#ffffff",
          backgroundColor: colors.hoverBg || "rgba(255,255,255,0.08)",
        };
      case "pill":
      default:
        return {
          color: colors.activeText || "#ffffff",
          backgroundColor: colors.activeBg || "#4f46e5",
        };
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 1. SIDEBAR PATTERN                                                         */
  /* -------------------------------------------------------------------------- */
  if (pattern === "sidebar") {
    return (
      <aside
        className={`flex flex-col transition-all duration-300 relative select-none w-full max-w-sm ${
          sidebarCollapsed ? "sm:w-20" : "sm:w-72"
        }`}
        style={containerStyles}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4 border-b shrink-0"
          style={{ borderColor: colors.borderColor || "#1e293b", backgroundColor: colors.headerBg || colors.surfaceBg }}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                style={{ backgroundColor: colors.activeBg || "#4f46e5" }}
              >
                {brand.logoText || "NC"}
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-white">{brand.name || "App Sidebar"}</h3>
                <p className="text-[10px] text-slate-400">{brand.tagline || "Workspace Console"}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-auto"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Groups */}
        <div className="p-3 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
          {groups.map((group) => (
            <div key={group.id} className="space-y-1">
              {!sidebarCollapsed && group.title && (
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {group.title}
                </div>
              )}
              {group.items?.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group"
                    style={getActiveItemStyle(isActive)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 flex items-center justify-center">●</span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{ backgroundColor: colors.badgeBg || "#6366f1", color: colors.badgeText || "#ffffff" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 2. TABS & NESTED TABS PATTERN                                              */
  /* -------------------------------------------------------------------------- */
  if (pattern === "tabs" || pattern === "nested-tabs") {
    const isNested = pattern === "nested-tabs";
    const activeParentTab = items.find((t) => t.id === activeId) || items[0];

    return (
      <div className="w-full max-w-2xl space-y-4" style={{ fontFamily: typography.fontFamily }}>
        <div
          className="flex items-center gap-1.5 p-1.5 border overflow-x-auto"
          style={containerStyles}
        >
          {items.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleItemClick(tab.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2"
                style={getActiveItemStyle(isActive)}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: colors.badgeBg || "#6366f1", color: colors.badgeText || "#ffffff" }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Nested secondary row */}
        {isNested && activeParentTab?.children && (
          <div
            className="flex items-center gap-2 p-2 rounded-xl border bg-slate-900/40 text-xs"
            style={{ borderColor: border.color || "#1e293b" }}
          >
            <span className="text-slate-500 font-mono text-[10px] uppercase px-2">Sub-tier:</span>
            {activeParentTab.children.map((sub) => (
              <span
                key={sub.id}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium"
              >
                {sub.label}
              </span>
            ))}
          </div>
        )}

        <div
          className="p-6 rounded-2xl border bg-slate-900/30 text-xs text-slate-400 leading-relaxed"
          style={{ borderColor: border.color || "#1e293b" }}
        >
          Selected Tab: <strong className="text-white">{activeParentTab?.label || "None"}</strong>. Tab navigation supports keyboard arrow roving focus and synchronized state disclosure.
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 3. STEPPER PATTERN                                                         */
  /* -------------------------------------------------------------------------- */
  if (pattern === "stepper") {
    return (
      <div className="w-full max-w-2xl p-6 border space-y-6 select-none" style={containerStyles}>
        <div className="flex items-center justify-between">
          {items.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            return (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(stepNum)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md"
                    style={{
                      backgroundColor: isDone || isCurrent ? colors.activeBg || "#4f46e5" : "rgba(255,255,255,0.1)",
                      color: isDone || isCurrent ? colors.activeText || "#ffffff" : colors.inactiveText || "#94a3b8",
                    }}
                  >
                    {isDone ? <Check size={14} /> : stepNum}
                  </button>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-white">{step.title}</div>
                    <div className="text-[10px] text-slate-400">{step.description}</div>
                  </div>
                </div>
                {idx < items.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-3 sm:mx-4"
                    style={{ backgroundColor: isDone ? colors.activeBg || "#4f46e5" : colors.borderColor || "#1e293b" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pt-4 border-t" style={{ borderColor: colors.borderColor || "#1e293b" }}>
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            className="px-4 py-2 rounded-xl text-xs font-semibold border disabled:opacity-40"
            style={{ borderColor: colors.borderColor || "#1e293b", color: colors.inactiveText || "#94a3b8" }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep((s) => Math.min(items.length, s + 1))}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-all"
            style={{ backgroundColor: colors.activeBg || "#4f46e5" }}
          >
            {currentStep === items.length ? "Finish Wizard" : "Next Step →"}
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 4. BREADCRUMB PATTERN                                                      */
  /* -------------------------------------------------------------------------- */
  if (pattern === "breadcrumb") {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 px-5 py-3 border select-none w-full max-w-xl" style={containerStyles}>
        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={crumb.id}>
              {idx > 0 && <span className="text-xs text-slate-600">{layout.separator || "/"}</span>}
              {isLast ? (
                <span className="text-xs font-bold" style={{ color: colors.activeText || "#ffffff" }} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href || "#"}
                  onClick={(e) => handleItemClick(crumb.id, e)}
                  className="text-xs hover:underline transition-colors"
                  style={{ color: colors.inactiveText || "#94a3b8" }}
                >
                  {crumb.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 5. BOTTOM NAVIGATION PATTERN                                               */
  /* -------------------------------------------------------------------------- */
  if (pattern === "bottom-navigation") {
    return (
      <div className="w-full max-w-sm border p-2 flex items-center justify-around select-none" style={containerStyles}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative"
              style={{
                color: isActive ? colors.activeText || "#ffffff" : colors.inactiveText || "#94a3b8",
              }}
            >
              <span className="text-base">●</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
              {item.badge && (
                <span
                  className="absolute -top-1 right-1 text-[9px] px-1 rounded-full font-bold"
                  style={{ backgroundColor: colors.badgeBg || "#6366f1", color: colors.badgeText || "#ffffff" }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 6. COMMAND PALETTE PATTERN                                                 */
  /* -------------------------------------------------------------------------- */
  if (pattern === "command-palette") {
    const filtered = items.filter((it) =>
      it.label.toLowerCase().includes(commandQuery.toLowerCase())
    );

    return (
      <div className="w-full max-w-lg overflow-hidden border flex flex-col select-none" style={containerStyles}>
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: colors.borderColor || "#1e293b" }}>
          <Search size={18} style={{ color: colors.inactiveText }} />
          <input
            type="text"
            value={commandQuery}
            onChange={(e) => setCommandQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">ESC</kbd>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto space-y-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors"
              style={{
                backgroundColor: activeId === item.id ? colors.activeBg || "#4f46e5" : "transparent",
                color: activeId === item.id ? colors.activeText || "#ffffff" : colors.inactiveText || "#94a3b8",
              }}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={14} />
                <span>{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-500">No actions found.</div>
          )}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 7. MEGA MENU PATTERN                                                       */
  /* -------------------------------------------------------------------------- */
  if (pattern === "mega-menu") {
    return (
      <div className="w-full max-w-3xl border p-5 select-none space-y-4" style={containerStyles}>
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderColor || "#1e293b" }}>
          <div className="font-bold text-sm text-white">Mega Menu Preview (3 Columns)</div>
          <span className="text-[10px] font-mono text-slate-400">Desktop Disclosure</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.id} className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {col.title}
              </div>
              <div className="space-y-1">
                {col.links?.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleItemClick(link.id)}
                    className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 transition-colors group"
                  >
                    <div className="font-bold text-white group-hover:text-indigo-300">{link.label}</div>
                    {link.desc && <div className="text-[10px] text-slate-400">{link.desc}</div>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* 8. GENERAL NAVBAR / HEADER / MENU (DEFAULT)                                */
  /* -------------------------------------------------------------------------- */
  return (
    <nav
      className="w-full max-w-4xl px-5 py-3 border flex items-center justify-between gap-4 select-none relative"
      style={containerStyles}
    >
      {/* Brand Section */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
          style={{ backgroundColor: colors.activeBg || "#4f46e5" }}
        >
          {brand.logoText || "NC"}
        </div>
        <div>
          <span className="font-bold text-sm text-white tracking-tight">{brand.name || "Navbar Brand"}</span>
          {brand.tagline && <span className="hidden sm:block text-[10px] text-slate-400">{brand.tagline}</span>}
        </div>
      </div>

      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  if (item.children) {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id);
                  } else {
                    handleItemClick(item.id, e);
                  }
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                style={getActiveItemStyle(isActive)}
              >
                <span>{item.label}</span>
                {item.children && <ChevronDown size={12} />}
              </button>

              {item.children && activeDropdown === item.id && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 p-2 rounded-2xl border shadow-xl z-50 flex flex-col space-y-1"
                  style={{ backgroundColor: colors.surfaceBg || "#0f172a", borderColor: colors.borderColor || "#1e293b" }}
                >
                  {item.children.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={(e) => handleItemClick(sub.id, e)}
                      className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 transition-colors"
                      style={{ color: colors.inactiveText || "#94a3b8" }}
                    >
                      <div className="font-bold text-white">{sub.label}</div>
                      {sub.description && <div className="text-[10px] text-slate-400">{sub.description}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Search Area */}
      <div className="flex items-center gap-2.5">
        {layout.searchEnabled && (
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 border text-xs" style={{ borderColor: border.color }}>
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-xs text-white w-24"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border text-slate-400"
          style={{ borderColor: colors.borderColor || "#1e293b" }}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <button
          type="button"
          className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-95 transition-all"
          style={{ backgroundColor: colors.activeBg || "#4f46e5" }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
