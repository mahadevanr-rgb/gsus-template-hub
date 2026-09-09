import React from "react";

export default function GhostButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/60 active:scale-[0.98] transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Ghost Button"}
    </button>
  );
}
