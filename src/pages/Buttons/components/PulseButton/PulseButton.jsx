import React from "react";

export default function PulseButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all cursor-pointer ${className}`}
    >
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
      {icon && <span>{icon}</span>}
      {children || label || "Pulse Action"}
    </button>
  );
}
