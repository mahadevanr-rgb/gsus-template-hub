import React from "react";
import { Card, CardContent } from '@/pages/Cards/components/Card/Card';

/**
 * FeatureCard
 * Product feature showcase card with top icon badge, title, description, and link action.
 */
export default function FeatureCard({
  icon = "⚡",
  iconBg = "bg-amber-50 dark:bg-amber-500/10 text-amber-500 border border-amber-200/50 dark:border-amber-500/20",
  title = "Real-time collaboration",
  description = "See edits, comments, and cursors update instantly across your whole team.",
  actionLabel = "Learn more →",
  onAction,
  className = "",
}) {
  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Feature Icon Container */}
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>

        {/* Title and Description */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Action Link/Button */}
      {actionLabel && (
        <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onAction}
            className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline transition-colors flex items-center gap-1 group"
          >
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </Card>
  );
}
