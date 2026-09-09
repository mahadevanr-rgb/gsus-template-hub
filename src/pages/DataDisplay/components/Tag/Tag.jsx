import React from "react";
import { X } from "lucide-react";

const variantColors = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export const Tag = ({
  label = "Tag",
  variant = "indigo",
  removable = false,
  onRemove,
  className = "",
}) => {
  const colorClass = variantColors[variant] || variantColors.indigo;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
    >
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-75 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Tag;
