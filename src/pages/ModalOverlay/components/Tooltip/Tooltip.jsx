import React, { useState, useRef, useEffect, useCallback } from "react";
import { OverlayPortal, OVERLAY_Z_INDEX } from "@/components/common/Overlay";

export default function Tooltip({
  content,
  children,
  placement = "top", // 'top' | 'bottom' | 'left' | 'right'
  delay = 100,
  disabled = false,
  className = "",
}) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, ready: false });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current
      ? tooltipRef.current.getBoundingClientRect()
      : { width: 140, height: 32 };

    let top = 0;
    let left = 0;
    const offset = 8;

    if (placement === "top") {
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
    } else if (placement === "bottom") {
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
    } else if (placement === "left") {
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left - tooltipRect.width - offset;
    } else if (placement === "right") {
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + offset;
    }

    // Keep strictly inside viewport bounds
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8));

    setCoords({ top, left, ready: true });
  }, [placement]);

  const showTooltip = () => {
    if (disabled || !content) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
    setCoords((prev) => ({ ...prev, ready: false }));
  };

  useEffect(() => {
    if (visible) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true);
        window.removeEventListener("resize", handleScrollOrResize);
      };
    }
  }, [visible, updatePosition]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-flex cursor-pointer"
      >
        {children}
      </span>

      {visible && content && (
        <OverlayPortal>
          <div
            ref={tooltipRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: coords.ready ? 1 : 0,
              pointerEvents: "none",
            }}
            role="tooltip"
            className={`
              ${OVERLAY_Z_INDEX.tooltip}
              rounded-xl
              border border-slate-700
              bg-slate-900/95
              px-3 py-1.5
              text-xs
              font-semibold
              text-white
              shadow-2xl
              shadow-black/80
              backdrop-blur-md
              transition-opacity
              duration-150
              ${className}
            `}
          >
            {content}
          </div>
        </OverlayPortal>
      )}
    </>
  );
}
