import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const DataCard = ({
  title,
  label,
  value = "$48,250",
  subtitle = "Compared to last month",
  icon = "💰",
  trend = "+14.2%",
  positive = true,
  trendUp,
  className = "",
}) => {
  const isUp = trendUp !== undefined ? trendUp : positive;
  const heading = title || label || "Total Revenue";

  return (
    <div className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">{heading}</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">{value}</h3>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-semibold ${
                isUp ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-500 text-[11px]">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default DataCard;
