export const SearchInput = ({ placeholder = "Search...", onSearch, error, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
    <input
      type="search"
      className={`w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border ${
        error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
      } rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all`}
      placeholder={placeholder}
      onChange={(e) => onSearch && onSearch(e.target.value)}
      {...props}
    />
  </div>
);
