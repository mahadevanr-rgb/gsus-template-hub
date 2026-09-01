import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder="Search components..."
        className="w-full pl-9 pr-12 py-1.5 text-sm bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
      />
      {/* Keyboard shortcut indicator (⌘ K) */}
      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
        <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded">
          ⌘ K
        </kbd>
      </div>
    </div>
  );
}
