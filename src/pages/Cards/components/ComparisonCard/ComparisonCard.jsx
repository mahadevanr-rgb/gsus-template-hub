import React from "react";
import PricingCard from '@/pages/Cards/components/PricingCard/PricingCard';

/**
 * ComparisonCard
 * Composes multiple PricingCard instances into a cohesive comparison presentation.
 * Supports two layout modes:
 * - layout="segmented" -> Single unified card with vertical divider borders between columns.
 * - layout="stacked"   -> Tilted/offset isometric stacked card layout.
 */
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
  if (layout === "stacked") {
    const detailedPlans = plans.length > 0 ? plans : [
      {
        planName: "Hobby",
        price: "$29",
        priceUnit: "/month",
        ctaLabel: "Get started",
        ctaVariant: "dark",
        features: ["250 Subscribers", "5 Team Members", "5 Metrics"],
      },
      {
        planName: "Startup",
        price: "$99",
        priceUnit: "/month",
        ctaLabel: "Get started",
        ctaVariant: "dark",
        highlighted: true,
        features: [
          "1,000 Subscribers",
          "10 Team Members",
          "10 Metrics",
          "Email/SMS/Webhook Notifications",
          "Custom CSS",
          "Status & Authenticated API",
          "Team Member SSO",
        ],
      },
      {
        planName: "Enterprise",
        price: "$399",
        priceUnit: "/month",
        ctaLabel: "Get started",
        ctaVariant: "dark",
        features: [
          "5,000 Subscribers",
          "25 Team Members",
          "25 Metrics",
          "Email/SMS/Webhook Notifications",
          "Custom CSS/HTML/JS",
          "Status & Authenticated API",
          "Team Member SSO",
          "Component Subscriptions",
          "Yearly PO & Invoicing Available",
        ],
      },
    ];

    return (
      <div
        className={`w-full flex items-center justify-center py-6 px-2 overflow-x-auto ${className}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-5xl mx-auto">
          {detailedPlans.map((plan, idx) => {
            let rotationClass = "";
            let scaleZIndex = "z-10";

            if (idx === 0) {
              rotationClass = "md:-rotate-3 hover:rotate-0 md:-mr-3";
              scaleZIndex = "z-10";
            } else if (idx === 1) {
              rotationClass = "md:rotate-0 z-30 shadow-2xl scale-100 md:scale-105";
              scaleZIndex = "z-30";
            } else if (idx === 2) {
              rotationClass = "md:rotate-3 hover:rotate-0 md:-ml-3";
              scaleZIndex = "z-10";
            }

            return (
              <div
                key={plan.planName || idx}
                className={`w-full max-w-[280px] sm:max-w-[300px] transition-all duration-300 transform ${rotationClass} ${scaleZIndex}`}
              >
                <PricingCard
                  variant="detailed"
                  {...plan}
                  className="shadow-2xl bg-white dark:bg-slate-900"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // layout="segmented" (Default)
  return (
    <div
      className={`w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        {plans.map((plan, idx) => (
          <PricingCard
            key={plan.planName || idx}
            variant="compact"
            {...plan}
            className="border-0 shadow-none rounded-none bg-transparent"
          />
        ))}
      </div>
    </div>
  );
}
