import React from "react";

export const ProgressBar = ({
  value = 72,
  max = 100,
  label = "Storage Quota",
  showValue = true,
  variant = "gradient",
  className = "",
}) => {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-semibold text-slate-300">{label}</span>}
          {showValue && <span className="font-mono text-indigo-400 font-bold">{pct}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-950 border border-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            variant === "gradient"
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : "bg-indigo-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
