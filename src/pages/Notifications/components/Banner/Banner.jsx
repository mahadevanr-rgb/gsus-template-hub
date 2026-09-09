import React from "react";
import { Sparkles, X } from "lucide-react";

export const Banner = ({
  type = "info",
  message = "New version 2.0 is live!",
  action = "Learn more",
  onAction,
  onClose,
  className = "",
}) => (
  <div className={`p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 flex items-center justify-between gap-4 w-full ${className}`}>
    <div className="flex items-center gap-2.5">
      <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <Sparkles className="w-4 h-4" />
      </div>
      <span className="text-xs font-semibold text-white">{message}</span>
    </div>
    <div className="flex items-center gap-3">
      {action && (
        <button
          onClick={onAction}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer"
        >
          {action}
        </button>
      )}
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  </div>
);

export default Banner;
