import React from "react";
import { AlertTriangle, Trash2, Info, Loader2 } from "lucide-react";
import {
  OverlayPortal,
  OverlayBackdrop,
  OVERLAY_Z_INDEX,
} from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";

export default function ConfirmDialog({
  open = false,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm to proceed.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // 'danger' | 'warning' | 'info'
  isLoading = false,
  disabled = false,
  confirmIcon: CustomConfirmIcon,
  children,
}) {
  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose: isLoading ? () => {} : onClose,
    closeOnEscape: !isLoading,
    closeOnOutsideClick: !isLoading,
  });

  if (!open) return null;

  const variantConfig = {
    danger: {
      icon: Trash2,
      iconBg: "bg-rose-500/10 border-rose-500/25 text-rose-400",
      buttonBg: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
      buttonBg: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20",
    },
    info: {
      icon: Info,
      iconBg: "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
      buttonBg: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20",
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig.danger;
  const IconComponent = CustomConfirmIcon || currentVariant.icon;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.alertDialog} flex items-center justify-center p-4 overflow-y-auto`}
        onClick={handleOutsideClick}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
      >
        <OverlayBackdrop opacity="bg-black/80" />

        <div
          ref={containerRef}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900 p-6 text-slate-200 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${currentVariant.iconBg}`}
            >
              <IconComponent className="h-5 w-5" />
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <h3
                id="confirm-dialog-title"
                className="text-base font-bold text-white tracking-tight"
              >
                {title}
              </h3>
              <p
                id="confirm-dialog-desc"
                className="text-xs text-slate-400 leading-relaxed"
              >
                {description}
              </p>
            </div>
          </div>

          {children && (
            <div className="mt-4 pt-4 border-t border-slate-800/70 text-xs text-slate-300">
              {children}
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading || disabled}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading || disabled}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 ${currentVariant.buttonBg}`}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}
