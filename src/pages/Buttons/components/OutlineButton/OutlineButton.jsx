import React from "react";

export default function OutlineButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-indigo-400 hover:text-white bg-transparent hover:bg-indigo-600/10 active:scale-[0.98] border border-indigo-500/40 hover:border-indigo-500 transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Outline Button"}
    </button>
  );
}
