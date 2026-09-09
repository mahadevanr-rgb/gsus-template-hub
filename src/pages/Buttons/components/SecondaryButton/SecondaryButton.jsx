import React from "react";

export default function SecondaryButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 hover:border-slate-600 transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Secondary Action"}
    </button>
  );
}
