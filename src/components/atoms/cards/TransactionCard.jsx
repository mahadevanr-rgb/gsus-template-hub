import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

/**
 * TransactionCard
 * Financial transaction history card with directional icons, timestamps, and formatted monetary credits/debits.
 */
export default function TransactionCard({
  title = "Recent Transactions",
  transactions = [
    {
      id: "tx-1",
      title: "Client payment",
      date: "Today, 9:14 AM",
      amount: 1200,
      currency: "USD",
      type: "credit",
    },
    {
      id: "tx-2",
      title: "Software subscription",
      date: "Yesterday",
      amount: 49,
      currency: "USD",
      type: "debit",
    },
  ],
  onTransactionClick,
  className = "",
}) {
  const formatTransactionAmount = (amount, currency, type) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

    return type === "credit" ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <Card className={`max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between ${className}`}>
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        {/* Transactions List */}
        <div className="space-y-3 pt-1">
          {transactions.map((tx) => {
            const isCredit = tx.type === "credit";
            return (
              <div
                key={tx.id}
                onClick={() => onTransactionClick?.(tx)}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors cursor-pointer"
              >
                {/* Left: Direction Icon and Title/Date */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCredit
                        ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {isCredit ? "↓" : "↑"}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {tx.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400">
                      {tx.date}
                    </p>
                  </div>
                </div>

                {/* Right: Formatted Amount */}
                <div
                  className={`text-xs sm:text-sm font-bold shrink-0 ml-3 ${
                    isCredit
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {formatTransactionAmount(tx.amount, tx.currency, tx.type)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
