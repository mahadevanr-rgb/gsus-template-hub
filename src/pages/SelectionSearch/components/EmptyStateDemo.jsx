import { SearchX } from "lucide-react";

export default function EmptyStateDemo() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Empty State</h3>
      <p className="text-sm text-slate-400 mb-4">
        Displayed when no results are available.
      </p>

      <div className="rounded-xl border border-dashed border-slate-700 bg-[#111827] py-10 text-center">
        <SearchX className="mx-auto h-10 w-10 text-slate-500" />

        <h4 className="mt-3 text-white font-medium">No Results Found</h4>

        <p className="mt-2 text-sm text-slate-500">
          Try searching with a different keyword.
        </p>

        <button className="mt-5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm text-white transition">
          Clear Search
        </button>
      </div>
    </div>
  );
}
