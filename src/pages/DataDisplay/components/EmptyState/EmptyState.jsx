import React from "react";

export const EmptyState = ({
  icon = "📭",
  title = "No Projects Found",
  description = "Get started by creating your first project.",
  action,
  actionLabel,
  onAction,
  className = "",
}) => {
  const btnLabel = action || actionLabel || "Create New";

  return (
    <div className={`p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 ${className}`}>
      <div className="text-4xl">{icon}</div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      {description && (
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{description}</p>
      )}
      <button
        type="button"
        onClick={onAction}
        className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        {btnLabel}
      </button>
    </div>
  );
};

export default EmptyState;
