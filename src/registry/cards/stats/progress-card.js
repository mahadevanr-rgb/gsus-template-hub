import ProgressCard from "../../../components/atoms/cards/ProgressCard";

const sourceCode = `import React from "react";

export default function ProgressCard({
  icon = "pie",
  iconBg = "bg-purple-600",
  value = "3.8%",
  label = "CONVERSION RATE",
  changePercent = "3.1%",
  changeDirection = "up",
  goalLabel = "Industry Average",
  comparisonValue = "Above 2.5%",
  goalPercent = 65,
  footerLeft = "This Quarter",
  remainingLabel = "+0.34% increase",
  footerRight,
  className = "",
}) {
  const isUp = changeDirection === "up";
  const displayFooterRight = footerRight || remainingLabel;

  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden max-w-xs w-full flex flex-col justify-between transition-all \${className}\`}
    >
      <div>
        {/* Top Header with Purple Icon Chip & Trend Badge */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div
            className={\`w-10 h-10 rounded-xl \${iconBg} text-white flex items-center justify-center font-bold text-lg shadow-sm\`}
          >
            {icon === "pie" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
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

        {/* Content: Value, Label, and Comparison Progress Bar */}
        <div className="p-5 pt-3 pb-4">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-1 mb-4">
            {label}
          </div>

          {/* Progress / Comparison Context */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {goalLabel}
              </span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {comparisonValue}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: \`\${Math.min(Math.max(goalPercent, 0), 100)}%\` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metadata */}
      {(footerLeft || displayFooterRight) && (
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
          {displayFooterRight && (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 ml-2">
              <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{displayFooterRight}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "progress-card",
  slug: "progress-card",
  name: "Progress Card",
  description: "Shows progress toward a target, conversion rates, benchmark comparisons, and periodic growth.",
  category: "cards",
  subCategory: "stats",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["progress", "goal", "conversion", "benchmark", "pie", "growth", "target"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/ProgressCard.jsx", type: "component" },
  ],
  uses: [
    "Conversion rate tracking",
    "Quarterly goal progress",
    "Benchmark & industry comparisons",
    "Marketing campaign evaluation",
  ],
  component: ProgressCard,
  previewProps: {
    icon: "pie",
    iconBg: "bg-purple-600",
    value: "3.8%",
    label: "CONVERSION RATE",
    changePercent: "3.1%",
    changeDirection: "up",
    goalLabel: "Industry Average",
    comparisonValue: "Above 2.5%",
    goalPercent: 65,
    footerLeft: "This Quarter",
    remainingLabel: "+0.34% increase",
  },
  sourceCode,
};
