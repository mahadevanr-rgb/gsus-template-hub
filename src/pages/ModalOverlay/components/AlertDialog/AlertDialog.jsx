import React from "react";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X,
} from "lucide-react";
import {
  OverlayPortal,
  OverlayBackdrop,
  OVERLAY_Z_INDEX,
} from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";

export default function AlertDialog({
  open = false,
  onClose,
  variant = "warning", // 'info' | 'success' | 'warning' | 'error'
  title = "System Notification",
  description,
  actionText = "Acknowledge",
  onAction,
  cancelText,
  onCancel,
  showClose = true,
  children,
}) {
  const handleAction = () => {
    if (onAction) onAction();
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };

  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose,
  });

  if (!open) return null;

  const variantConfig = {
    info: {
      icon: Info,
      iconStyle: "bg-blue-500/10 border-blue-500/25 text-blue-400",
      buttonStyle: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20",
      badge: "Information",
      badgeStyle: "bg-blue-500/15 border-blue-500/30 text-blue-300",
    },
    success: {
      icon: CheckCircle2,
      iconStyle: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
      buttonStyle: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20",
      badge: "Success",
      badgeStyle: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    },
    warning: {
      icon: AlertTriangle,
      iconStyle: "bg-amber-500/10 border-amber-500/25 text-amber-400",
      buttonStyle: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20",
      badge: "Attention",
      badgeStyle: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    },
    error: {
      icon: AlertOctagon,
      iconStyle: "bg-rose-500/10 border-rose-500/25 text-rose-400",
      buttonStyle: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20",
      badge: "Critical Alert",
      badgeStyle: "bg-rose-500/15 border-rose-500/30 text-rose-300",
    },
  };

  const config = variantConfig[variant] || variantConfig.warning;
  const IconComponent = config.icon;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.alertDialog} flex items-center justify-center p-4 overflow-y-auto`}
        onClick={handleOutsideClick}
        role="alertdialog"
        aria-modal="true"
      >
        <OverlayBackdrop opacity="bg-black/80" />

        <div
          ref={containerRef}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900 p-6 text-slate-200 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200"
        >
          {showClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${config.iconStyle}`}
            >
              <IconComponent className="h-5 w-5" />
            </div>

            <div className="space-y-1.5 min-w-0 flex-1 pr-6">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${config.badgeStyle}`}
                >
                  {config.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {children && (
            <div className="mt-4 pt-4 border-t border-slate-800/70 text-xs text-slate-300">
              {children}
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            {cancelText && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-800 transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={handleAction}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all active:scale-[0.98] ${config.buttonStyle}`}
            >
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}
