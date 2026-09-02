import React from "react";
import { Card, CardContent } from "./Card";

/**
 * AlertCard
 * Action-oriented alert card for critical warnings, quotas, and state changes.
 * Supports configurable severity types (warning, error, info, success), custom badge, and CTA action.
 */
export default function AlertCard({
  type = "warning",
  title = "Storage almost full",
  description = "You've used 92% of your available storage space.",
  badge = "Action required",
  actionLabel = "Upgrade storage",
  onAction,
  className = "",
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          iconBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/30",
          badgeBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case "info":
        return {
          iconBg: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-500/30",
          badgeBg: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case "success":
        return {
          iconBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30",
          badgeBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case "warning":
      default:
        return {
          iconBg: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/30",
          badgeBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
    }
  };

  const { iconBg, badgeBg, icon } = getTypeStyles();

  return (
    <Card className={`max-w-sm w-full overflow-hidden p-6 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Top Icon & Title Area */}
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Action Required Badge */}
        {badge && (
          <div className="pt-1">
            <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md ${badgeBg}`}>
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      {actionLabel && (
        <div className="mt-6 pt-2">
          <button
            onClick={onAction}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0d1322] hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-md active:scale-[0.98] transition-all"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </Card>
  );
}
