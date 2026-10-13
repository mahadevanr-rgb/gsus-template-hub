import { useState, useRef } from "react";

/**
 * Reusable Tabs component
 * Fully accessible WAI-ARIA tablist with keyboard roving focus and variants
 */
export default function Tabs({
  tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "analytics", label: "Analytics", count: "Live" },
    { id: "security", label: "Security & Keys", count: 2 },
    { id: "billing", label: "Billing", disabled: true },
  ],
  activeTab = null,
  defaultActiveTab = null,
  onChange = null,
  variant = "line", // "line" | "pills" | "enclosed" | "segment"
  orientation = "horizontal", // "horizontal" | "vertical"
  children = null,
  className = "",
}) {
  const [internalActive, setInternalActive] = useState(
    defaultActiveTab || tabs[0]?.id
  );
  const isControlled = activeTab !== null && activeTab !== undefined;
  const currentTab = isControlled ? activeTab : internalActive;

  const tabListRef = useRef(null);

  const handleTabClick = (tab) => {
    if (tab.disabled) return;
    if (!isControlled) {
      setInternalActive(tab.id);
    }
    if (onChange) {
      onChange(tab.id);
    }
  };

  const handleKeyDown = (e, index) => {
    const isHorizontal = orientation === "horizontal";
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

    let targetIndex = -1;
    if (e.key === nextKey) {
      e.preventDefault();
      targetIndex = (index + 1) % tabs.length;
    } else if (e.key === prevKey) {
      e.preventDefault();
      targetIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = tabs.length - 1;
    }

    if (targetIndex >= 0) {
      // Skip disabled
      while (tabs[targetIndex]?.disabled && targetIndex !== index) {
        targetIndex = e.key === prevKey || e.key === "End"
          ? (targetIndex - 1 + tabs.length) % tabs.length
          : (targetIndex + 1) % tabs.length;
      }
      const targetTab = tabs[targetIndex];
      if (targetTab && !targetTab.disabled) {
        handleTabClick(targetTab);
        const buttons = tabListRef.current?.querySelectorAll('[role="tab"]');
        buttons?.[targetIndex]?.focus();
      }
    }
  };

  const getContainerStyle = () => {
    if (orientation === "vertical") {
      return "flex flex-col space-y-1";
    }
    switch (variant) {
      case "pills":
        return "flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit overflow-x-auto";
      case "enclosed":
        return "flex items-center border-b border-slate-200 dark:border-slate-800 overflow-x-auto";
      case "segment":
        return "inline-flex items-center p-1 bg-slate-200/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl overflow-x-auto";
      case "line":
      default:
        return "flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto";
    }
  };

  const getTabStyle = (tab, isActive) => {
    const base = "transition-all duration-150 font-medium text-xs sm:text-sm flex items-center gap-2 select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap";
    if (tab.disabled) {
      return `${base} opacity-40 cursor-not-allowed`;
    }

    if (orientation === "vertical") {
      return `${base} w-full px-3.5 py-2.5 rounded-xl cursor-pointer ${
        isActive
          ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
      }`;
    }

    switch (variant) {
      case "pills":
        return `${base} px-3.5 py-2 rounded-xl cursor-pointer ${
          isActive
            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`;
      case "enclosed":
        return `${base} px-4 py-2.5 border-b-2 -mb-px cursor-pointer ${
          isActive
            ? "border-indigo-500 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold rounded-t-xl border-t border-x border-slate-200 dark:border-slate-800"
            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
        }`;
      case "segment":
        return `${base} px-3.5 py-1.5 rounded-lg text-xs cursor-pointer ${
          isActive
            ? "bg-indigo-600 text-white font-semibold shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`;
      case "line":
      default:
        return `${base} pb-3 pt-1 border-b-2 -mb-px cursor-pointer ${
          isActive
            ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-semibold"
            : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
        }`;
    }
  };

  return (
    <div
      className={`w-full ${orientation === "vertical" ? "flex flex-col sm:flex-row gap-6" : "space-y-4"} ${className}`}
    >
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation={orientation}
        className={getContainerStyle()}
      >
        {tabs.map((tab, idx) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={getTabStyle(tab, isActive)}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{tab.label}</span>
              {tab.count !== null && tab.count !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Render children or matched panel */}
      {children && (
        <div
          role="tabpanel"
          id={`panel-${currentTab}`}
          aria-labelledby={`tab-${currentTab}`}
          className="flex-1 focus:outline-none"
        >
          {typeof children === "function" ? children(currentTab) : children}
        </div>
      )}
    </div>
  );
}
