import React from "react";

export default function PrimaryButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-500/25 transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Primary Action"}
    </button>
  );
}
