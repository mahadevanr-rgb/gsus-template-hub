import React, { useState, useRef, useEffect, useCallback } from "react";
import { OverlayPortal, OVERLAY_Z_INDEX } from "@/components/common/Overlay";

export default function Popover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom", // 'top' | 'bottom' | 'left' | 'right'
  align = "center", // 'start' | 'center' | 'end'
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = "",
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, ready: false });

  const setOpen = (val) => {
    if (!isControlled) setUncontrolledOpen(val);
    if (onOpenChange) onOpenChange(val);
    if (!val) setCoords((prev) => ({ ...prev, ready: false }));
  };

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current
      ? popoverRef.current.getBoundingClientRect()
      : { width: 288, height: 160 };

    let top = 0;
    let left = 0;

    // Placement logic using fixed viewport coordinates
    if (placement === "bottom") {
      top = triggerRect.bottom + offset;
    } else if (placement === "top") {
      top = triggerRect.top - popoverRect.height - offset;
    } else if (placement === "left") {
      left = triggerRect.left - popoverRect.width - offset;
    } else if (placement === "right") {
      left = triggerRect.right + offset;
    }

    // Alignment logic
    if (placement === "bottom" || placement === "top") {
      if (align === "start") {
        left = triggerRect.left;
      } else if (align === "end") {
        left = triggerRect.right - popoverRect.width;
      } else {
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      }
    } else {
      if (align === "start") {
        top = triggerRect.top;
      } else if (align === "end") {
        top = triggerRect.bottom - popoverRect.height;
      } else {
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      }
    }

    // Keep within viewport bounds
    left = Math.max(12, Math.min(left, window.innerWidth - popoverRect.width - 12));
    top = Math.max(12, Math.min(top, window.innerHeight - popoverRect.height - 12));

    setCoords({ top, left, ready: true });
  }, [placement, align, offset]);

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

  // Handle outside click & escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        closeOnOutsideClick &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (closeOnEscape && e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEscape]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setOpen(!isOpen)}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </span>

      {isOpen && (
        <OverlayPortal>
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: coords.ready ? 1 : 0,
            }}
            className={`
              ${OVERLAY_Z_INDEX.popover}
              w-72
              rounded-2xl
              border border-slate-800
              bg-slate-900/95
              p-4
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
            {children}
          </div>
        </OverlayPortal>
      )}
    </>
  );
}
