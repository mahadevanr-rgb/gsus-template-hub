import React from "react";
import { Card, CardContent } from "./Card";

/**
 * RecommendationCard
 * Workflow and feature recommendation card with contextual eyebrow, title, value proposition explanation, and primary action.
 */
export default function RecommendationCard({
  icon = "✨",
  eyebrow = "Recommended for you",
  title = "Try the new Automations tab",
  description = "Based on your recent activity, automating this workflow could save ~4 hrs/week.",
  actionLabel = "Set it up",
  onAction,
  className = "",
}) {
  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Eyebrow with Icon */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs">
            {typeof icon === "string" ? <span>{icon}</span> : icon}
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {eyebrow}
          </span>
        </div>

        {/* Recommendation Title and Explanation */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      {actionLabel && (
        <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
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
