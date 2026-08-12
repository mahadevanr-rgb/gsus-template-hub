export const RadioButton = ({ label, value, selected, onChange, ...props }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="radio"
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="sr-only"
        {...props}
      />
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selected === value
            ? "border-indigo-600"
            : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
        }`}
      >
        {selected === value && (
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
        )}
      </div>
    </div>
    {label && (
      <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
    )}
  </label>
);
