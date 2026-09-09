import React from "react";
import { Sparkles } from "lucide-react";

export default function IconButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={label || "Icon Button"}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 transition-all cursor-pointer ${className}`}
    >
      {icon || children || <Sparkles className="w-4 h-4 text-indigo-400" />}
    </button>
  );
}
