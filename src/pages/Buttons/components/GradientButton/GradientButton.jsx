import React from "react";

export default function GradientButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-[0.98] shadow-lg shadow-purple-500/25 transition-all cursor-pointer ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children || label || "Gradient Action"}
    </button>
  );
}
