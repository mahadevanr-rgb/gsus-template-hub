export const Textarea = ({ placeholder = "Enter text...", rows = 4, error, ...props }) => (
  <textarea
    rows={rows}
    className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border ${
      error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
    } rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-y min-h-[100px]`}
    placeholder={placeholder}
    {...props}
  />
);
