import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";

export default function StatCard({
  icon = "$",
  iconBg = "bg-blue-500",
  value = "247,500",
  label = "TOTAL REVENUE",
  changePercent = "12.5%",
  changeDirection = "up",
  sparklineData = [35, 50, 28, 65, 45, 80, 95],
  footerLeft = "This Month",
  footerRight = "+$27k vs last month",
  className = "",
}) {
  const isUp = changeDirection === "up";

  return (
    <Card className={`overflow-hidden max-w-xs w-full flex flex-col justify-between ${className}`}>
      <div>
        {/* Top Header with Icon Chip & Trend Badge */}
        <CardHeader className="pt-5 px-5">
          <div
            className={`w-10 h-10 rounded-xl ${iconBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}
          >
            {typeof icon === "string" && icon.length <= 2 ? (
              <span>{icon}</span>
            ) : (
              icon
            )}
          </div>

          {changePercent && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                isUp
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              <span>{isUp ? "↑" : "↓"}</span>
              <span>{changePercent}</span>
            </div>
          )}
        </CardHeader>

        {/* Content: Value, Label, and Bar Sparkline */}
        <CardContent className="px-5 pt-3 pb-4">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-1 mb-4">
            {label}
          </div>

          {/* Mini Bar Chart Sparkline */}
          {sparklineData && sparklineData.length > 0 && (
            <div className="flex items-end gap-1.5 h-10 pt-2">
              {sparklineData.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-blue-400/80 hover:bg-blue-500 dark:bg-blue-500/80 rounded-t-sm transition-all"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </div>

      {/* Footer Metadata */}
      {(footerLeft || footerRight) && (
        <CardFooter className="px-5 pb-5 pt-3">
          <div className="flex items-center justify-between w-full text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {footerLeft && (
              <div className="flex items-center gap-1.5 truncate">
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                </svg>
                <span className="truncate">{footerLeft}</span>
              </div>
            )}
            {footerRight && (
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 shrink-0 ml-2">
                <span className="font-semibold">{footerRight}</span>
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
