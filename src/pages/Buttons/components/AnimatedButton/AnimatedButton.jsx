import React from "react";

export default function AnimatedButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 overflow-hidden group active:scale-[0.98] transition-all cursor-pointer ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      {icon && <span>{icon}</span>}
      <span className="relative z-10">{children || label || "Animated Button"}</span>
    </button>
  );
}
