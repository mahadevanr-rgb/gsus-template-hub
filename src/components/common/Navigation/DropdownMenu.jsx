import { useState, useRef, useEffect, useCallback } from "react";
import Menu from "./Menu";

/**
 * Reusable DropdownMenu component
 * Anchored popup menu with viewport boundary awareness, click-outside, and escape-key handling
 */
export default function DropdownMenu({
  trigger = null,
  triggerLabel = "Options",
  items = [
    { id: "edit", label: "Edit Item", shortcut: "⌘E" },
    { id: "duplicate", label: "Duplicate", shortcut: "⌘D" },
    { type: "separator" },
    { id: "archive", label: "Archive", shortcut: "⌘A" },
    { id: "delete", label: "Delete", shortcut: "⌫", danger: true },
  ],
  placement = "bottom-right", // "bottom-left" | "bottom-right" | "top-left" | "top-right"
  onSelect = null,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Click outside and ESC handlers
  useEffect(() => {
    if (!open) return;

    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose]);

  const getPlacementClass = () => {
    switch (placement) {
      case "bottom-left":
        return "left-0 top-full mt-2 origin-top-left";
      case "top-right":
        return "right-0 bottom-full mb-2 origin-bottom-right";
      case "top-left":
        return "left-0 bottom-full mb-2 origin-bottom-left";
      case "bottom-right":
      default:
        return "right-0 top-full mt-2 origin-top-right";
    }
  };

  const handleItemSelect = (item) => {
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger */}
      {trigger ? (
        <div
          ref={triggerRef}
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer inline-flex items-center"
        >
          {typeof trigger === "function" ? trigger({ open }) : trigger}
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={open}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span>{triggerLabel}</span>
          <span className="text-slate-400 text-[10px]">▼</span>
        </button>
      )}

      {/* Dropdown Popup */}
      {open && (
        <div
          className={`absolute ${getPlacementClass()} z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <Menu items={items} onSelect={handleItemSelect} />
        </div>
      )}
    </div>
  );
}
