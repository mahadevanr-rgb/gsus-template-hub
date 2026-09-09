import React from "react";

export const Snackbar = ({
  message = "Item deleted from project.",
  action = "Undo",
  onAction,
  onClose,
  className = "",
}) => (
  <div className={`p-3.5 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-white flex items-center justify-between gap-4 shadow-2xl max-w-sm w-full ${className}`}>
    <span className="text-xs font-medium text-slate-200">{message}</span>
    {action && (
      <button
        onClick={onAction}
        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        {action}
      </button>
    )}
  </div>
);

export default Snackbar;
