import MetricCard from "../../../components/atoms/cards/MetricCard";

const sourceCode = `import React from "react";

export default function MetricCard({
  icon = "users",
  iconBg = "bg-amber-500",
  value = "12,456",
  label = "ACTIVE USERS",
  changePercent = "15.2%",
  changeDirection = "up",
  sparklineData = [40, 55, 38, 72, 60, 85, 95],
  period = "Last 30 Days",
  status = "68% New Users",
  footerLeft,
  footerRight,
  className = "",
}) {
  const isUp = changeDirection === "up";
  const displayFooterLeft = footerLeft || period;
  const displayFooterRight = footerRight || status;

  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden max-w-xs w-full flex flex-col justify-between transition-all \${className}\`}
    >
      <div>
        {/* Top Header with Amber Icon Chip & Trend Badge */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div
            className={\`w-10 h-10 rounded-xl \${iconBg} text-white flex items-center justify-center font-bold text-lg shadow-sm\`}
          >
            {icon === "users" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
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

        {/* Content: Value, Label, and Amber Bar Sparkline */}
        <div className="p-5 pt-3 pb-4">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-1 mb-4">
            {label}
          </div>

          {/* Warm Amber Sparkline */}
          {sparklineData && sparklineData.length > 0 && (
            <div className="flex items-end gap-1.5 h-10 pt-2">
              {sparklineData.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-amber-400/80 hover:bg-amber-500 dark:bg-amber-500/80 rounded-t-sm transition-all"
                  style={{ height: \`\${val}%\` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Metadata */}
      {(displayFooterLeft || displayFooterRight) && (
        <div className="flex items-center justify-between p-5 pb-5 pt-3 border-t border-slate-100/80 dark:border-slate-800/80 mt-auto text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {displayFooterLeft && (
            <div className="flex items-center gap-1.5 truncate">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="truncate">{displayFooterLeft}</span>
            </div>
          )}
          {displayFooterRight && (
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 shrink-0 ml-2">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
              </svg>
              <span className="font-semibold">{displayFooterRight}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "metric-card",
  slug: "metric-card",
  name: "Metric Card",
  description: "Displays a measurable value with supporting period, label, activity sparkline, and user acquisition status.",
  category: "cards",
  subCategory: "stats",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["metric", "users", "active", "sparkline", "analytics", "growth", "audience"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/MetricCard.jsx", type: "component" },
  ],
  uses: [
    "Active user analytics",
    "User growth monitoring",
    "Customer engagement metrics",
    "Traffic and audience stats",
  ],
  component: MetricCard,
  previewProps: {
    icon: "users",
    iconBg: "bg-amber-500",
    value: "12,456",
    label: "ACTIVE USERS",
    changePercent: "15.2%",
    changeDirection: "up",
    sparklineData: [40, 55, 38, 72, 60, 85, 95],
    period: "Last 30 Days",
    status: "68% New Users",
  },
  sourceCode,
};
