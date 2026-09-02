import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

/**
 * StatusCard
 * System status card displaying operational health across services and APIs.
 * Supports operational, degraded, warning, offline, and error states.
 */
export default function StatusCard({
  title = "System Status",
  statuses = [
    {
      label: "API",
      status: "operational",
      text: "Operational",
    },
    {
      label: "Database",
      status: "operational",
      text: "Operational",
    },
    {
      label: "Webhooks",
      status: "degraded",
      text: "Degraded",
    },
  ],
  onStatusClick,
  className = "",
}) {
  const getStatusIndicator = (status) => {
    switch (status?.toLowerCase()) {
      case "degraded":
      case "warning":
        return {
          dot: "bg-amber-500",
          textClass: "text-amber-600 dark:text-amber-400 font-semibold",
          ring: "bg-amber-100 dark:bg-amber-500/20",
        };
      case "offline":
      case "error":
        return {
          dot: "bg-rose-500",
          textClass: "text-rose-600 dark:text-rose-400 font-semibold",
          ring: "bg-rose-100 dark:bg-rose-500/20",
        };
      case "operational":
      case "healthy":
      default:
        return {
          dot: "bg-emerald-500",
          textClass: "text-emerald-600 dark:text-emerald-400 font-semibold",
          ring: "bg-emerald-100 dark:bg-emerald-500/20",
        };
    }
  };

  return (
    <Card className={`max-w-sm w-full overflow-hidden p-5 sm:p-6 ${className}`}>
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-3 pt-1">
        {statuses.map((item, idx) => {
          const { dot, textClass, ring } = getStatusIndicator(item.status);
          return (
            <div
              key={item.label || idx}
              onClick={() => onStatusClick?.(item)}
              className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-2 rounded-lg transition-colors cursor-pointer"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {item.label}
              </span>

              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${ring}`}>
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                </span>
                <span className={`text-xs ${textClass}`}>
                  {item.text || item.status}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
