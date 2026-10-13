import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { OverlayPortal, OVERLAY_Z_INDEX } from "@/components/common/Overlay";

export default function DropdownMenu({
  trigger,
  items = [],
  onSelect,
  placement = "bottom", // 'bottom' | 'top'
  align = "start", // 'start' | 'end' | 'center'
  open: controlledOpen,
  onOpenChange,
  className = "",
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, ready: false });

  const setOpen = (val) => {
    if (!isControlled) setUncontrolledOpen(val);
    if (onOpenChange) onOpenChange(val);
    if (!val) {
      setActiveIndex(-1);
      setCoords((prev) => ({ ...prev, ready: false }));
    }
  };

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current
      ? menuRef.current.getBoundingClientRect()
      : { width: 224, height: 160 };

    let top = triggerRect.bottom + 6;
    if (placement === "top") {
      top = triggerRect.top - menuRect.height - 6;
    }

    let left = triggerRect.left;
    if (align === "end") {
      left = triggerRect.right - menuRect.width;
    } else if (align === "center") {
      left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
    }

    const maxLeft = window.innerWidth - menuRect.width - 12;
    const maxTop = window.innerHeight - menuRect.height - 12;
    left = Math.max(12, Math.min(left, maxLeft));
    top = Math.max(12, Math.min(top, maxTop));

    setCoords({ top, left, ready: true });
  }, [placement, align]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleScrollOrResize = () => calculatePosition();
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true);
        window.removeEventListener("resize", handleScrollOrResize);
      };
    }
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const item = items[activeIndex];
        if (item && !item.disabled && !item.separator) {
          if (item.onClick) item.onClick();
          if (onSelect) onSelect(item);
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, items, activeIndex, onSelect]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setOpen(!isOpen)}
        className="inline-block cursor-pointer"
      >
        {trigger || (
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-md"
          >
            <span>Options</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </span>

      {isOpen && (
        <OverlayPortal>
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: coords.ready ? 1 : 0,
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
              transition-opacity
              duration-150
              animate-in fade-in zoom-in-95
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
                    setOpen(false);
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
