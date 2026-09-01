export const DateInput = ({ error, ...props }) => (
  <input
    type="date"
    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border ${
      error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
    } rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 dark:text-slate-200`}
    {...props}
  />
);
