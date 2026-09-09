import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export const InlineMessage = ({ type = "success", message = "Operation completed.", className = "" }) => {
  const icons = {
    success: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
    error:   <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
    info:    <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
  };

  const colors = {
    success: "text-emerald-400",
    error:   "text-rose-400",
    info:    "text-blue-400",
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${colors[type] || colors.success} ${className}`}>
      {icons[type] || icons.success}
      <span>{message}</span>
    </div>
  );
};

export default InlineMessage;
