import KpiCard from "../../../components/atoms/cards/KpiCard";

const sourceCode = `import React from "react";

export default function KpiCard({
  icon = "cart",
  iconBg = "bg-emerald-500",
  value = "1,842",
  label = "TOTAL ORDERS",
  changePercent = "8.3%",
  changeDirection = "up",
  comparisonLabel = "Monthly Goal",
  comparisonValue = "92%",
  barPercent = 92,
  footerLeft = "This Month",
  footerRight = "158 to goal",
  className = "",
}) {
  const isUp = changeDirection === "up";

  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden max-w-xs w-full flex flex-col justify-between transition-all \${className}\`}
    >
      <div>
        {/* Top Header with Icon Chip & Trend Badge */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div
            className={\`w-10 h-10 rounded-xl \${iconBg} text-white flex items-center justify-center font-bold text-lg shadow-sm\`}
          >
            {icon === "cart" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            ) : typeof icon === "string" && icon.length <= 2 ? (
              <span>{icon}</span>
            ) : (
              icon
            )}
          </div>

          {changePercent && (
            <div
              className={\`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full \${
                isUp
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }\`}
            >
              <span>{isUp ? "↑" : "↓"}</span>
              <span>{changePercent}</span>
            </div>
          )}
        </div>

        {/* Content: Value, Label, and Goal Progress Bar */}
        <div className="p-5 pt-3 pb-4">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-1 mb-4">
            {label}
          </div>

          {/* Goal Progress Context */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {comparisonLabel}
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {comparisonValue}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: \`\${Math.min(Math.max(barPercent, 0), 100)}%\` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metadata */}
      {(footerLeft || footerRight) && (
        <div className="flex items-center justify-between p-5 pb-5 pt-3 border-t border-slate-100/80 dark:border-slate-800/80 mt-auto text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {footerLeft && (
            <div className="flex items-center gap-1.5 truncate">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
              <span className="truncate">{footerLeft}</span>
            </div>
          )}
          {footerRight && (
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 shrink-0 ml-2">
              <span className="font-semibold">{footerRight}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "kpi-card",
  slug: "kpi-card",
  name: "KPI Card",
  description: "Shows a key performance indicator together with trend, goal progress bar, and target context.",
  category: "cards",
  subCategory: "stats",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["kpi", "goal", "orders", "target", "progress", "performance", "metrics"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/KpiCard.jsx", type: "component" },
  ],
  uses: [
    "Monthly goal tracking",
    "Order fulfillment KPIs",
    "Sales target progress",
    "Performance milestone monitoring",
  ],
  component: KpiCard,
  previewProps: {
    icon: "cart",
    iconBg: "bg-emerald-500",
    value: "1,842",
    label: "TOTAL ORDERS",
    changePercent: "8.3%",
    changeDirection: "up",
    comparisonLabel: "Monthly Goal",
    comparisonValue: "92%",
    barPercent: 92,
    footerLeft: "This Month",
    footerRight: "158 to goal",
  },
  sourceCode,
};
