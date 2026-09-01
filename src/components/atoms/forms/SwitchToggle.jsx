import React from "react";

export const SwitchToggle = ({ checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`block w-11 h-6 rounded-full transition-colors ${checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`}
      ></div>
      <div
        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${checked ? "translate-x-5" : ""}`}
      ></div>
    </div>
    {label && (
      <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
    )}
  </label>
);
