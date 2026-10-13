import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Reusable Menu component
 * General-purpose standalone or nested menu list with keyboard navigation, shortcuts, and separators
 */
export default function Menu({
  items = [
    { id: "new-file", label: "New File", shortcut: "⌘N", icon: null },
    { id: "new-folder", label: "New Folder", shortcut: "⇧⌘N", icon: null },
    { type: "separator" },
    {
      id: "share",
      label: "Share Project",
      icon: null,
      children: [
        { id: "share-email", label: "Invite via Email", shortcut: null },
        { id: "share-link", label: "Copy Public Link", shortcut: "⌘C" },
      ],
    },
    { id: "download", label: "Download Archive", shortcut: "⌘D", icon: null },
    { type: "separator" },
    { id: "delete", label: "Delete Permanently", shortcut: "⌫", danger: true, icon: null },
  ],
  onSelect = null,
  activeId = null,
  className = "",
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRef = useRef(null);

  const actionableItems = items.filter((item) => item.type !== "separator");

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % actionableItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + actionableItems.length) % actionableItems.length);
    } else if (e.key === "ArrowRight") {
      const current = actionableItems[focusedIndex];
      if (current?.children) {
        e.preventDefault();
        setActiveSubmenu(current.id);
      }
    } else if (e.key === "ArrowLeft") {
      if (activeSubmenu) {
        e.preventDefault();
        setActiveSubmenu(null);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const current = actionableItems[focusedIndex];
      if (current && !current.disabled) {
        if (current.children) {
          setActiveSubmenu((prev) => (prev === current.id ? null : current.id));
        } else if (onSelect) {
          onSelect(current);
        }
      }
    } else if (e.key === "Escape") {
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    const el = menuRef.current?.querySelectorAll('[role="menuitem"]');
    el?.[focusedIndex]?.focus();
  }, [focusedIndex]);

  let actionCounter = 0;

  return (
    <div
      ref={menuRef}
      role="menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 shadow-xl shadow-black/5 dark:shadow-black/30 outline-none select-none ${className}`}
    >
      {items.map((item, idx) => {
        if (item.type === "separator") {
          return (
            <div
              key={`sep-${idx}`}
              role="separator"
              className="my-1 border-t border-slate-100 dark:border-slate-800"
            />
          );
        }

        const itemIndex = actionCounter++;
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;
        const isSubmenuOpen = activeSubmenu === item.id;
        const isFocused = focusedIndex === itemIndex;
        const isSelected = activeId === item.id;

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              setFocusedIndex(itemIndex);
              if (hasChildren) setActiveSubmenu(item.id);
            }}
            onMouseLeave={() => {
              if (hasChildren) setActiveSubmenu(null);
            }}
          >
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                if (hasChildren) {
                  setActiveSubmenu((prev) => (prev === item.id ? null : item.id));
                } else if (onSelect) {
                  onSelect(item);
                }
              }}
              tabIndex={isFocused ? 0 : -1}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors outline-none ${
                item.disabled
                  ? "opacity-40 cursor-not-allowed"
                  : item.danger
                  ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  : isSelected
                  ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : isFocused
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {Icon && <Icon className="w-4 h-4 shrink-0 text-slate-400" />}
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.shortcut && (
                  <kbd className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-widest">
                    {item.shortcut}
                  </kbd>
                )}
                {hasChildren && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </div>
            </button>

            {/* Submenu Popover */}
            {hasChildren && isSubmenuOpen && (
              <div className="absolute left-full top-0 ml-1.5 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 shadow-xl shadow-black/15 z-50 animate-in fade-in zoom-in-95 duration-150">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    role="menuitem"
                    disabled={child.disabled}
                    onClick={() => onSelect && onSelect(child)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span className="truncate">{child.label}</span>
                    {child.shortcut && (
                      <kbd className="text-[10px] text-slate-400 font-mono">
                        {child.shortcut}
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
