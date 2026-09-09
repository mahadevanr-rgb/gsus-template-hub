import React from "react";
import { Card } from '@/pages/Cards/components/Card/Card';

/**
 * PricingCard
 * Reusable single-tier pricing card supporting two visual densities:
 * - variant="compact"  -> Minimal card (name, price, unit, short description, colored CTA pill)
 * - variant="detailed" -> Feature-rich card (name, price, unit, dark CTA button, checkmarked feature list)
 */
export default function PricingCard({
  planName = "Standard",
  price = "$6",
  priceUnit = "Per user per month",
  description = "For teams that need to manage more work.",
  features = [
    "1,000 Subscribers",
    "10 Team Members",
    "10 Metrics",
    "Email/SMS/Webhook Notifications",
    "Custom CSS",
    "Status & Authenticated API",
    "Team Member SSO",
  ],
  ctaLabel = "Upgrade Now",
  ctaVariant = "teal",
  highlighted = false,
  variant = "compact",
  onCtaClick,
  className = "",
}) {
  // Derive CTA styling based on ctaVariant prop
  const getCtaClasses = () => {
    switch (ctaVariant) {
      case "purple":
        return "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60";
      case "teal":
        return "bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/60";
      case "amber":
      case "orange":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60";
      case "dark":
      case "black":
        return "bg-[#0d1322] hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-md";
      case "primary":
      default:
        return "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20";
    }
  };

  // Format price display if price string contains "$"
  const cleanPrice = String(price).replace(/^\$/, "");
  const hasDollar = String(price).startsWith("$") || !isNaN(Number(price));

  if (variant === "detailed") {
    return (
      <Card
        className={`w-full max-w-sm flex flex-col justify-between p-6 sm:p-7 rounded-2xl shadow-xl transition-all duration-200 ${
          highlighted
            ? "border-2 border-indigo-500 shadow-indigo-500/10 dark:shadow-indigo-950/30"
            : "border border-slate-100 dark:border-slate-800"
        } ${className}`}
      >
        <div>
          {/* Plan Name */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
            {planName}
          </h3>

          {/* Price Header */}
          <div className="flex items-baseline justify-center mt-3">
            {hasDollar && (
              <span className="text-2xl font-bold text-slate-900 dark:text-white mr-0.5">
                $
              </span>
            )}
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {cleanPrice}
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 text-center mt-1 mb-5">
            {priceUnit}
          </p>

          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
              ctaVariant === "dark" || !ctaVariant
                ? "bg-[#0d1322] hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow"
                : getCtaClasses()
            }`}
          >
            {ctaLabel}
          </button>

          {/* Features Checkmark List */}
          {features && features.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs">
                  <svg
                    className="w-4 h-4 text-slate-900 dark:text-white shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }

  // variant="compact" (Default)
  return (
    <Card
      className={`w-full max-w-sm flex flex-col justify-between p-6 sm:p-7 rounded-2xl transition-all duration-200 ${
        highlighted
          ? "border-2 border-indigo-500 shadow-lg shadow-indigo-500/10"
          : "border border-slate-100 dark:border-slate-800 shadow-sm"
      } ${className}`}
    >
      <div>
        {/* Plan Tier Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
          {planName}
        </h3>

        {/* Price & Unit */}
        <div className="flex items-baseline mt-3.5">
          {hasDollar && (
            <span className="text-xl font-bold text-slate-900 dark:text-white mr-0.5">
              $
            </span>
          )}
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {cleanPrice}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1 mb-4 font-medium">
          {priceUnit}
        </p>

        {/* Description line */}
        {description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[36px]">
            {description}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <div className="mt-6">
        <button
          onClick={onCtaClick}
          className={`py-2 px-5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-[0.98] ${getCtaClasses()}`}
        >
          {ctaLabel}
        </button>
      </div>
    </Card>
  );
}
