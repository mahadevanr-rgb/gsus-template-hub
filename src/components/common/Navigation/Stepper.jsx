import { Check, AlertCircle } from "react";

/**
 * Reusable Stepper component
 * Supports horizontal & vertical orientation, validation gating, error states, and clickable steps
 */
export default function Stepper({
  steps = [
    { id: "account", title: "Account Info", description: "Email & credentials" },
    { id: "profile", title: "Profile Details", description: "Personal details & role" },
    { id: "security", title: "Two-Factor Auth", description: "Authenticator or SMS" },
    { id: "confirm", title: "Review & Finish", description: "Summary of choices" },
  ],
  currentStep = 0,
  completedSteps = [],
  errorStep = null,
  orientation = "horizontal", // "horizontal" | "vertical"
  onStepClick = null,
  allowClickCompleted = true,
  className = "",
}) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      aria-label="Process Stepper"
      className={`w-full ${isHorizontal ? "space-y-4" : "space-y-6"} ${className}`}
    >
      <div
        className={`flex ${
          isHorizontal
            ? "flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            : "flex-col space-y-6"
        }`}
      >
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(idx) || idx < currentStep;
          const isCurrent = idx === currentStep;
          const isError = errorStep === idx;
          const isUpcoming = !isCompleted && !isCurrent;
          const isClickable =
            onStepClick && ((allowClickCompleted && isCompleted) || idx <= currentStep);

          return (
            <div
              key={step.id || idx}
              className={`flex-1 flex ${
                isHorizontal
                  ? "flex-row sm:flex-col items-center sm:items-center text-left sm:text-center w-full"
                  : "items-start gap-4"
              }`}
            >
              {/* Step circle + connectors */}
              <div
                className={`relative flex items-center ${
                  isHorizontal ? "justify-center w-full" : "flex-col"
                }`}
              >
                {/* Horizontal Left Connector */}
                {isHorizontal && idx > 0 && (
                  <div
                    className={`hidden sm:block absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-0.5 -mr-4 ${
                      isCompleted || isCurrent
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  />
                )}

                {/* Horizontal Right Connector */}
                {isHorizontal && idx < steps.length - 1 && (
                  <div
                    className={`hidden sm:block absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-0.5 -ml-4 ${
                      completedSteps.includes(idx)
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  />
                )}

                {/* Indicator Circle Button */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(idx)}
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  } ${
                    isError
                      ? "bg-rose-500 text-white ring-4 ring-rose-500/20 shadow-md"
                      : isCompleted
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      : isCurrent
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 ring-4 ring-indigo-500/15"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                  aria-label={`Step ${idx + 1}: ${step.title}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isError ? (
                    <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                  ) : isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </button>

                {/* Vertical Connector Line below indicator */}
                {!isHorizontal && idx < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 my-1 ${
                      isCompleted
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  />
                )}
              </div>

              {/* Step Label & Subtitle */}
              <div
                className={`${
                  isHorizontal
                    ? "mt-2 px-1 text-center"
                    : "flex-1 pt-1 pb-4"
                }`}
              >
                <p
                  className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors ${
                    isError
                      ? "text-rose-500"
                      : isCurrent
                      ? "text-slate-900 dark:text-white"
                      : isCompleted
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
