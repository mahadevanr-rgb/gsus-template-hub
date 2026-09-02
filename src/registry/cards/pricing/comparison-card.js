import ComparisonCard from "../../../components/atoms/cards/ComparisonCard";

const sourceCode = `import React from "react";

export default function ComparisonCard({
  plans = [
    {
      planName: "Free",
      price: "$0",
      priceUnit: "Free for your whole team",
      description: "For individuals or teams looking to organize anything.",
      ctaLabel: "Get started",
      ctaVariant: "purple",
    },
    {
      planName: "Standard",
      price: "$6",
      priceUnit: "Per user per month",
      description: "For teams that need to manage more work.",
      ctaLabel: "Upgrade Now",
      ctaVariant: "teal",
    },
    {
      planName: "Premium",
      price: "$12",
      priceUnit: "Per user per month",
      description: "Best for teams that need to track multiple projects.",
      ctaLabel: "Try for free",
      ctaVariant: "amber",
    },
  ],
  layout = "segmented",
  className = "",
}) {
  const getCtaClasses = (variant) => {
    switch (variant) {
      case "purple":
        return "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200";
      case "teal":
        return "bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-200";
      case "amber":
      case "orange":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200";
      case "dark":
      default:
        return "bg-[#0d1322] hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900";
    }
  };

  if (layout === "stacked") {
    return (
      <div className={\`w-full flex items-center justify-center py-6 px-2 overflow-x-auto \${className}\`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            let rotationClass = "";
            let scaleZIndex = "z-10";

            if (idx === 0) {
              rotationClass = "md:-rotate-3 hover:rotate-0 md:-mr-3";
              scaleZIndex = "z-10";
            } else if (idx === 1) {
              rotationClass = "md:rotate-0 z-30 shadow-2xl scale-100 md:scale-105 border-2 border-indigo-500/40";
              scaleZIndex = "z-30";
            } else if (idx === 2) {
              rotationClass = "md:rotate-3 hover:rotate-0 md:-ml-3";
              scaleZIndex = "z-10";
            }

            return (
              <div
                key={plan.planName || idx}
                className={\`w-full max-w-[280px] sm:max-w-[300px] p-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl transition-all duration-300 transform \${rotationClass} \${scaleZIndex}\`}
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
                  {plan.planName}
                </h3>
                <div className="flex items-baseline justify-center mt-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 text-center mt-1 mb-5">
                  {plan.priceUnit}
                </p>
                <button
                  className={\`w-full py-2.5 px-4 rounded-lg text-xs font-semibold shadow transition-all \${getCtaClasses(plan.ctaVariant)}\`}
                >
                  {plan.ctaLabel || "Get started"}
                </button>
                {plan.features && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={\`w-full max-w-4xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden \${className}\`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        {plans.map((plan, idx) => (
          <div key={plan.planName || idx} className="p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {plan.planName}
              </h3>
              <div className="flex items-baseline mt-3.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {plan.price}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 mb-4 font-medium">
                {plan.priceUnit}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>
            </div>
            <div className="mt-6">
              <button
                className={\`py-2 px-5 rounded-lg text-xs font-bold transition-all \${getCtaClasses(plan.ctaVariant)}\`}
              >
                {plan.ctaLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;

export default {
  id: "comparison-card",
  slug: "comparison-card",
  name: "Comparison Card",
  description: "A cohesive layout wrapper for comparing pricing plans with segmented or stacked presentations.",
  category: "cards",
  subCategory: "pricing",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["comparison", "pricing", "plans", "tier", "segmented", "stacked", "table"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/ComparisonCard.jsx", type: "component" },
  ],
  uses: [
    "SaaS pricing page hero",
    "Multi-tier comparison grids",
    "Plan comparison cards",
    "Subscription upgrade choices",
  ],
  component: ComparisonCard,
  previewProps: {
    layout: "segmented",
    plans: [
      {
        planName: "Free",
        price: "$0",
        priceUnit: "Free for your whole team",
        description: "For individuals or teams looking to organize anything.",
        ctaLabel: "Get started",
        ctaVariant: "purple",
      },
      {
        planName: "Standard",
        price: "$6",
        priceUnit: "Per user per month",
        description: "For teams that need to manage more work.",
        ctaLabel: "Upgrade Now",
        ctaVariant: "teal",
      },
      {
        planName: "Premium",
        price: "$12",
        priceUnit: "Per user per month",
        description: "Best for teams that need to track multiple projects.",
        ctaLabel: "Try for free",
        ctaVariant: "amber",
      },
    ],
  },
  sourceCode,
};
