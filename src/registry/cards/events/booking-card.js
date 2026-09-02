import BookingCard from "../../../components/atoms/cards/BookingCard";

const sourceCode = `import React from "react";

export default function BookingCard({
  bookingId = "A-2291",
  status = "Confirmed",
  title = "Studio Loft 4B",
  dateRange = "Check-in Sep 18 · Check-out Sep 21",
  guests = "2 adults",
  total = "$486.00",
  onManage,
  className = "",
}) {
  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden p-5 sm:p-6 flex flex-col justify-between \${className}\`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Booking #{bookingId}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/30">
            {status}
          </span>
        </div>

        <div className="space-y-1 pt-1">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {dateRange}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-400">Guests</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{guests}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-400">Total</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{total}</span>
          </div>
        </div>
      </div>

      {onManage && (
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={onManage}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Manage Booking
          </button>
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "booking-card",
  slug: "booking-card",
  name: "Booking Card",
  description: "Reservation summary card showing booking ID, confirmed status, check-in dates, guest count, and total.",
  category: "cards",
  subCategory: "events",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["booking", "hotel", "reservation", "travel", "stay", "guest", "checkout"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/BookingCard.jsx", type: "component" },
  ],
  uses: [
    "Travel & hospitality booking portals",
    "Reservation confirmation summaries",
    "Rental & space checkout screens",
    "Customer stay overviews",
  ],
  component: BookingCard,
  previewProps: {
    bookingId: "A-2291",
    status: "Confirmed",
    title: "Studio Loft 4B",
    dateRange: "Check-in Sep 18 · Check-out Sep 21",
    guests: "2 adults",
    total: "$486.00",
  },
  sourceCode,
};
