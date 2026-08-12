export const Checkbox = ({ label, checked, onChange, error, ...props }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          checked
            ? "bg-indigo-600 border-indigo-600"
            : error
            ? "border-rose-500"
            : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
        }`}
      >
        {checked && <span className="text-white text-xs font-bold">✓</span>}
      </div>
    </div>
    {label && (
      <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
    )}
  </label>
);
