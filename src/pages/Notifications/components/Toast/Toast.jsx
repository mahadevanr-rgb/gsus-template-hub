import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export const Toast = ({ type = "success", message = "Action completed!", onClose, className = "" }) => {
  const styles = {
    success: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", Icon: CheckCircle2 },
    error:   { border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", Icon: AlertCircle },
    warning: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", Icon: AlertTriangle },
    info:    { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", Icon: Info },
  };
  const s = styles[type] || styles.success;
  const IconComp = s.Icon;

  return (
    <div className={`p-4 rounded-2xl bg-slate-900 border ${s.border} flex items-center gap-3 shadow-2xl max-w-sm w-full ${className}`}>
      <div className={`p-2 rounded-xl ${s.bg} ${s.text} shrink-0`}>
        <IconComp className="w-4 h-4" />
      </div>
      <span className="flex-1 text-xs font-semibold text-white leading-relaxed">{message}</span>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
