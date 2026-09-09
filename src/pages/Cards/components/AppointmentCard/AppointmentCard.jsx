import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/pages/Cards/components/Card/Card';

/**
 * AppointmentCard
 * Appointment and consultation scheduling card with provider info, session type, time slot, and reschedule action.
 */
export default function AppointmentCard({
  title = "Upcoming Appointment",
  personName = "Dr. Naomi Reyes",
  subtitle = "Dermatology Consult",
  date = "Tomorrow",
  time = "10:30 AM",
  avatarGradient = "from-amber-400 via-rose-400 to-pink-500",
  actionLabel = "Reschedule",
  onAction,
  className = "",
}) {
  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        {/* Provider Profile Row */}
        <div className="flex items-center gap-3 pt-1">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${avatarGradient} shadow-md flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-white dark:ring-slate-800`}>
            {personName.replace(/Dr\.\s*/, "").charAt(0)}
          </div>

          {/* Provider Details */}
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {personName}
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Schedule Slot */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400">{date}</span>
          <span className="text-slate-900 dark:text-white font-bold">{time}</span>
        </div>
      </div>

      {/* Action Button */}
      {actionLabel && (
        <div className="mt-5 pt-2">
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
