import React from "react";

export default function ShadowButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-900 border border-slate-700 hover:border-slate-500 shadow-2xl shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Shadow Button"}
    </button>
  );
}
