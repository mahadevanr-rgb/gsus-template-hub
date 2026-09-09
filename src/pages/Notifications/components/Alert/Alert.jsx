import React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";

export const Alert = ({ type = "info", title = "Note", message = "System status update.", onClose, className = "" }) => {
  const styles = {
    info:    { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", Icon: Info },
    success: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", Icon: CheckCircle2 },
    warning: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", Icon: AlertTriangle },
    error:   { border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", Icon: AlertCircle },
  };
  const s = styles[type] || styles.info;
  const IconComp = s.Icon;

  return (
    <div className={`p-4 rounded-2xl bg-slate-900 border ${s.border} flex items-start gap-3 w-full max-w-md ${className}`}>
      <div className={`p-1.5 rounded-xl ${s.bg} ${s.text} shrink-0 mt-0.5`}>
        <IconComp className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-0.5">
        <h4 className="text-xs font-bold text-white">{title}</h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
