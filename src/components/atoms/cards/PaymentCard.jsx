import React from "react";
import { Card, CardHeader, CardContent } from "./Card";

/**
 * PaymentCard
 * Secure payment method summary card displaying masked card details, brand identifier, cardholder name, and active status.
 */
export default function PaymentCard({
  title = "Payment Method",
  status = "active",
  brand = "Visa",
  last4 = "4471",
  cardholderName = "J. Alvarez",
  expiryMonth = "08",
  expiryYear = "29",
  onManage,
  className = "",
}) {
  const getStatusBadge = () => {
    switch (status?.toLowerCase()) {
      case "expired":
        return "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-500/30";
      case "inactive":
        return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60";
      case "active":
      default:
        return "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/30";
    }
  };

  // Construct safe masked display using only last4
  const safeLast4 = String(last4).slice(-4) || "4471";
  const maskedCardNumber = `•••• •••• •••• ${safeLast4}`;

  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Header: Title and Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${getStatusBadge()}`}>
            {status}
          </span>
        </div>

        {/* Inner Dark Payment Card Surface */}
        <div className="bg-[#1e293b] text-white rounded-2xl p-5 shadow-inner space-y-5 border border-slate-800 relative overflow-hidden">
          {/* Top Row: Brand & Masked Preview */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>{brand} •••• {safeLast4}</span>
            <div className="w-6 h-4 rounded bg-slate-700/80 flex items-center justify-center text-[9px] font-bold text-slate-300 tracking-wider">
              {brand.toUpperCase().slice(0, 4)}
            </div>
          </div>

          {/* Masked Card Number */}
          <div className="text-base sm:text-lg font-mono font-bold tracking-widest text-slate-100">
            {maskedCardNumber}
          </div>

          {/* Bottom Row: Cardholder & Expiry */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-medium text-slate-300">{cardholderName}</span>
            <span className="font-mono text-slate-400">{expiryMonth}/{expiryYear}</span>
          </div>
        </div>
      </div>

      {onManage && (
        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onManage}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Manage Payment Method
          </button>
        </div>
      )}
    </Card>
  );
}
