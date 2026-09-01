import React from "react";

const baseStyles =
  "w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:bg-slate-50";

const errorStyles =
  "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10";

export const TextInput = ({ error, icon, ...props }) => {
  return (
    <div className="relative group">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
      )}
      <input
        className={`${baseStyles} ${error ? errorStyles : ""} ${icon ? "pl-11" : ""}`}
        {...props}
      />
    </div>
  );
};
