import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorStateDemo() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Error State</h3>
      <p className="text-sm text-slate-400 mb-4">
        Display errors with recovery actions.
      </p>

      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-red-400" />

        <h4 className="mt-3 text-red-300 font-medium">Failed to load data</h4>

        <p className="mt-2 text-sm text-red-200/80">
          Something went wrong while fetching data.
        </p>

        <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-500 hover:bg-red-400 px-4 py-2 text-sm text-white transition">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );
}
