import React from "react";
import { AlertTriangle, X } from "lucide-react";

export const ConfirmDialog = ({
  title = "Delete Project?",
  message = "This action cannot be undone and will delete all associated data.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className = "",
}) => (
  <div className={`p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-sm w-full shadow-2xl ${className}`}>
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-white">{title}</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">{message}</p>
      </div>
    </div>
    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
      <button
        type="button"
        onClick={onCancel}
        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20"
      >
        {confirmLabel}
      </button>
    </div>
  </div>
);

export default ConfirmDialog;
