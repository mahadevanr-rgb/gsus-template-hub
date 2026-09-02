import React from "react";
import { Card, CardContent } from "./Card";

/**
 * InvoiceCard
 * Invoice summary card with formatted monetary amount, status badge, client details, due date, and payment action.
 */
export default function InvoiceCard({
  invoiceNumber = "INV-0847",
  amount = 2480,
  currency = "USD",
  status = "due",
  statusLabel,
  billedTo = "Lumen Studio",
  dueDate = "Sep 30, 2026",
  actionLabel = "Pay invoice",
  onAction,
  className = "",
}) {
  // Format monetary amount cleanly
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case "paid":
        return {
          label: statusLabel || "Paid",
          badgeClass: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30",
        };
      case "overdue":
        return {
          label: statusLabel || "Overdue",
          badgeClass: "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/30",
        };
      case "pending":
      case "draft":
        return {
          label: statusLabel || "Pending",
          badgeClass: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60",
        };
      case "due":
      default:
        return {
          label: statusLabel || "Due in 3 days",
          badgeClass: "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/30",
        };
    }
  };

  const { label: computedStatusLabel, badgeClass } = getStatusStyles();

  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Header: Invoice # & Status Badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-400">
            Invoice #{invoiceNumber}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
            {computedStatusLabel}
          </span>
        </div>

        {/* Large Amount */}
        <div className="pt-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formattedAmount}
          </h3>
        </div>

        {/* Billing Metadata */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-400">Billed to</span>
            <span className="font-bold text-slate-900 dark:text-white">{billedTo}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-400">Due date</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{dueDate}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
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
