import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Standardized Z-Index layering scale for overlays
 */
export const OVERLAY_Z_INDEX = {
  dropdown: "z-[45]",
  popover: "z-[48]",
  drawer: "z-[50]",
  modal: "z-[60]",
  alertDialog: "z-[70]",
  commandMenu: "z-[80]",
  tooltip: "z-[90]",
};

/**
 * OverlayPortal: Renders overlay markup directly into document.body
 */
export function OverlayPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

/**
 * OverlayBackdrop: Standardized dimmed background layer with blur
 */
export function OverlayBackdrop({
  onClick,
  blur = true,
  opacity = "bg-black/75",
  className = "",
  children,
}) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 transition-opacity duration-200 ${opacity} ${
        blur ? "backdrop-blur-sm" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/**
 * OverlayCloseButton: Accessible close button
 */
export function OverlayCloseButton({
  onClick,
  className = "",
  ariaLabel = "Close overlay",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${className}`}
    >
      <X className="w-4 h-4" />
    </button>
  );
}

/**
 * OverlayHeader: Standardized header with title, subtitle, and optional close action
 */
export function OverlayHeader({
  title,
  description,
  icon: Icon,
  badge,
  onClose,
  children,
  className = "",
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 border-b border-slate-800/80 bg-slate-950/60 px-6 py-4 ${className}`}
    >
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {title && (
              <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                {title}
              </h2>
            )}
            {badge && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
      {onClose && <OverlayCloseButton onClick={onClose} />}
    </div>
  );
}

/**
 * OverlayBody: Scrollable content container
 */
export function OverlayBody({ children, className = "" }) {
  return (
    <div className={`p-6 overflow-y-auto max-h-[70vh] text-slate-300 text-sm ${className}`}>
      {children}
    </div>
  );
}

/**
 * OverlayFooter: Standardized actions container
 */
export function OverlayFooter({ children, className = "" }) {
  return (
    <div
      className={`flex items-center justify-end gap-3 border-t border-slate-800/80 bg-slate-950/40 px-6 py-3.5 ${className}`}
    >
      {children}
    </div>
  );
}

export default {
  OverlayPortal,
  OverlayBackdrop,
  OverlayHeader,
  OverlayBody,
  OverlayFooter,
  OverlayCloseButton,
  OVERLAY_Z_INDEX,
};
