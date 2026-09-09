import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from '@/pages/Cards/components/Card/Card';

/**
 * SubscriptionCard
 * Represents an active subscription / billing account state.
 * Informational display with renewal dates, status badges, payment info, and management actions.
 */
export default function SubscriptionCard({
  currentPlanName = "Pro Annual Plan",
  price = "$290",
  billingPeriod = "/year",
  renewalDate = "Renews automatically on May 15, 2026",
  statusBadge = "Active",
  statusVariant = "active",
  paymentMethod = "Visa ending in 4242",
  seats = "8 of 10 team seats assigned",
  seatsPercent = 80,
  onManage,
  onUpgrade,
  onCancel,
  className = "",
}) {
  const getStatusBadgeStyle = () => {
    switch (statusVariant) {
      case "trial":
        return "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50";
      case "past_due":
        return "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50";
      case "cancelled":
        return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/50";
      case "active":
      default:
        return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50";
    }
  };

  return (
    <Card className={`overflow-hidden max-w-md w-full flex flex-col justify-between ${className}`}>
      <div>
        {/* Top Header */}
        <CardHeader className="pt-6 px-6 pb-2">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Current Subscription
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {currentPlanName}
            </h3>
          </div>

          <div
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadgeStyle()}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{statusBadge}</span>
          </div>
        </CardHeader>

        {/* Content Details */}
        <CardContent className="px-6 py-4 space-y-4">
          {/* Price Row */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {price}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {billingPeriod}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
            </svg>
            <span>{renewalDate}</span>
          </p>

          {/* Seats Usage Bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Team Allocation
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {seats}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${seatsPercent}%` }}
              />
            </div>
          </div>

          {/* Payment Method Line */}
          {paymentMethod && (
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                  <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                </svg>
                <span>{paymentMethod}</span>
              </div>
              <button
                onClick={onManage}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Edit
              </button>
            </div>
          )}
        </CardContent>
      </div>

      {/* Action Buttons Footer */}
      <CardFooter className="px-6 pb-6 pt-3 flex items-center justify-between gap-3">
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline transition-colors"
        >
          Cancel Subscription
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onManage}
            className="py-2 px-3.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Manage
          </button>
          <button
            onClick={onUpgrade}
            className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/25"
          >
            Upgrade Plan
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
