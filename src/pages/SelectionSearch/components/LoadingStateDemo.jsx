import { Loader2 } from "lucide-react";

export default function LoadingStateDemo() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Loading State</h3>
      <p className="text-sm text-slate-400 mb-4">
        Skeleton and spinner while fetching data.
      </p>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-slate-700 bg-[#111827] p-4"
          >
            <div className="h-3 w-2/3 rounded bg-slate-700 mb-3"></div>
            <div className="h-3 w-1/3 rounded bg-slate-800"></div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#111827] py-4 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
        Loading components...
      </div>
    </div>
  );
}
