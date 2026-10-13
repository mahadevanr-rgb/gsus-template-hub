import React, { useState, useRef, useEffect } from "react";
import { OverlayPortal, OVERLAY_Z_INDEX } from "@/components/common/Overlay";

export default function ContextMenu({
  items = [],
  children,
  onSelect,
  className = "",
  triggerClassName = "",
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const x = e.clientX;
    const y = e.clientY;

    // Boundary detection
    const menuWidth = 220;
    const menuHeight = items.length * 36 + 20;

    const boundedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const boundedY = y + menuHeight > window.innerHeight ? y - menuHeight : y;

    setPosition({ x: Math.max(10, boundedX), y: Math.max(10, boundedY) });
    setVisible(true);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setVisible(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setVisible(false);
        return;
      }

      const validItems = items.filter((item) => !item.separator && !item.disabled);
      if (validItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const selected = items[activeIndex];
        if (selected && !selected.disabled && !selected.separator) {
          if (selected.onClick) selected.onClick();
          if (onSelect) onSelect(selected);
          setVisible(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, items, activeIndex, onSelect]);

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className={triggerClassName}
      >
        {children}
      </div>

      {visible && (
        <OverlayPortal>
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
            role="menu"
            className={`
              ${OVERLAY_Z_INDEX.dropdown}
              w-56
              rounded-2xl
              border border-slate-800
              bg-slate-900/95
              p-1.5
              text-slate-200
              shadow-2xl
              shadow-black/80
              backdrop-blur-md
              animate-in fade-in zoom-in-95 duration-150
              ${className}
            `}
          >
            {items.map((item, idx) => {
              if (item.separator) {
                return (
                  <div
                    key={`sep-${idx}`}
                    className="my-1 border-t border-slate-800/80"
                    role="separator"
                  />
                );
              }

              const Icon = item.icon;
              const isSelected = activeIndex === idx;

              return (
                <button
                  key={item.id || item.label || idx}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    if (item.onClick) item.onClick();
                    if (onSelect) onSelect(item);
                    setVisible(false);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`
                    w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors
                    ${
                      item.disabled
                        ? "opacity-40 cursor-not-allowed text-slate-500"
                        : item.destructive
                        ? isSelected
                          ? "bg-rose-500/15 text-rose-300"
                          : "text-rose-400 hover:bg-rose-500/10"
                        : isSelected
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.shortcut && (
                    <span className="font-mono text-[10px] text-slate-500">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </OverlayPortal>
      )}
    </>
  );
}
