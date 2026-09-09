import React from "react";
import { Card, CardContent } from '@/pages/Cards/components/Card/Card';

/**
 * ProjectCard
 * Project status summary card with progress bar, task counters, team member stack, and due date.
 */
export default function ProjectCard({
  title = "Website Relaunch",
  subtitle = "Marketing · Q3 initiative",
  progress = 64,
  completedTasks = 12,
  totalTasks = 19,
  members = [
    { name: "Sarah", bg: "bg-rose-400" },
    { name: "Liam", bg: "bg-sky-400" },
    { name: "Maya", bg: "bg-amber-400" },
  ],
  dueDate = "Due Oct 3",
  onProjectClick,
  className = "",
}) {
  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Title and Subtitle */}
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Progress Bar and Counters */}
        <div className="space-y-2 pt-1">
          {/* Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-indigo-600 dark:text-indigo-400">
              {progress}% complete
            </span>
            <span className="text-slate-400 dark:text-slate-400">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Members & Due Date */}
      <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {/* Members Avatar Stack */}
        <div className="flex -space-x-2">
          {members.map((m, idx) => (
            <div
              key={idx}
              className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 ${m.bg} shadow-sm flex items-center justify-center text-white text-[9px] font-bold`}
              title={m.name}
            >
              {m.name?.charAt(0)}
            </div>
          ))}
        </div>

        {/* Due Date */}
        <span className="text-slate-400 dark:text-slate-400 font-medium text-xs">
          {dueDate}
        </span>
      </div>
    </Card>
  );
}
