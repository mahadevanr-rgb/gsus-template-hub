import FeatureCard from "../../../components/atoms/cards/FeatureCard";

const sourceCode = `import React from "react";

export default function FeatureCard({
  icon = "⚡",
  iconBg = "bg-amber-50 dark:bg-amber-500/10 text-amber-500 border border-amber-200/50 dark:border-amber-500/20",
  title = "Real-time collaboration",
  description = "See edits, comments, and cursors update instantly across your whole team.",
  actionLabel = "Learn more →",
  onAction,
  className = "",
}) {
  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 flex flex-col justify-between \${className}\`}>
      <div className="space-y-4">
        <div className={\`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 \${iconBg}\`}>
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>

        <div className="space-y-1.5 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {actionLabel && (
        <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onAction}
            className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline transition-colors flex items-center gap-1 group"
          >
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}`;

export default {
  id: "feature-card",
  slug: "feature-card",
  name: "Feature Card",
  description: "Product feature showcase card with icon badge, title, descriptive summary, and interactive link action.",
  category: "cards",
  subCategory: "content",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["feature", "product", "benefits", "capabilities", "showcase", "icon", "highlights"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/FeatureCard.jsx", type: "component" },
  ],
  uses: [
    "Feature highlights grid",
    "Product capability cards",
    "Value proposition callouts",
    "SaaS feature matrix overview",
  ],
  component: FeatureCard,
  previewProps: {
    icon: "⚡",
    title: "Real-time collaboration",
    description: "See edits, comments, and cursors update instantly across your whole team.",
    actionLabel: "Learn more →",
  },
  sourceCode,
};
