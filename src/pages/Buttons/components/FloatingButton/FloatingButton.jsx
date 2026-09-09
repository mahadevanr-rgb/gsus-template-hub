import React from "react";
import { Plus } from "lucide-react";

export default function FloatingButton({ children, label, onClick, icon, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/50 transition-all cursor-pointer ${className}`}
    >
      {icon || <Plus className="w-4 h-4" />}
      <span>{children || label || "Create Action"}</span>
    </button>
  );
}
