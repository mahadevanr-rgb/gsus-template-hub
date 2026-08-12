export const SelectDropdown = ({ options = [], placeholder = "Select an option...", error, ...props }) => (
  <div className="relative">
    <select
      className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border ${
        error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
      } rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none text-slate-700 dark:text-slate-200`}
      {...props}
    >
      <option value="" disabled selected>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      ▾
    </div>
  </div>
);
