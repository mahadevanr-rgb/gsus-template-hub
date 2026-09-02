import React from "react";
import { Card, CardContent } from "./Card";

/**
 * TaskCard
 * Individual actionable task item card with priority indicator, owner avatar, and due date.
 */
export default function TaskCard({
  priority = "High Priority",
  priorityVariant = "high",
  title = "Redesign onboarding flow for mobile app",
  owner = {
    name: "Priya S.",
    avatarBg: "bg-purple-500",
  },
  dueDate = "Sep 12",
  completed = false,
  onToggleComplete,
  className = "",
}) {
  const getPriorityStyle = () => {
    switch (priorityVariant) {
      case "low":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";
      case "medium":
        return "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400";
      case "urgent":
      case "high":
      default:
        return "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400";
    }
  };

  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-3">
        {/* Priority Badge */}
        <div>
          <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getPriorityStyle()}`}>
            {priority}
          </span>
        </div>

        {/* Task Title */}
        <h3 className={`text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug ${completed ? "line-through text-slate-400" : ""}`}>
          {title}
        </h3>
      </div>

      {/* Owner and Due Date Footer */}
      <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {/* Owner */}
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${owner.avatarBg || "bg-purple-500"} text-white font-bold text-[10px] flex items-center justify-center shadow-sm`}>
            {owner.name?.charAt(0) || "U"}
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {owner.name}
          </span>
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-1 text-slate-400 font-medium">
          <span>📅</span>
          <span>{dueDate}</span>
        </div>
      </div>
    </Card>
  );
}
