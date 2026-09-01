import { useState } from "react";
import { syncRegistryToSupabase } from "../../lib/db";
import { getAllComponents } from "../../registry/index";

export default function SyncBanner() {
  const [status, setStatus] = useState("idle"); // idle | syncing | done | error
  const [msg, setMsg] = useState("");

  const handleSync = async () => {
    setStatus("syncing");
    const result = await syncRegistryToSupabase();
    if (result.error) {
      setStatus("error");
      setMsg(result.error?.message || String(result.error));
    } else {
      setStatus("done");
      setMsg(`${result.count} components synced to Supabase ✅`);
    }
  };

  if (status === "done") {
    return (
      <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-medium">
        <span>✅</span>
        <span>{msg}</span>
        <button
          onClick={() => setStatus("idle")}
          className="ml-auto text-green-400 hover:text-green-600 text-lg leading-none"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3">
      <span className="text-indigo-700 text-sm font-medium flex-1">
        🗄️ Supabase connected — {getAllComponents().length} components ready to sync
      </span>

      {status === "error" && (
        <span className="text-red-600 text-xs">{msg}</span>
      )}

      <button
        onClick={handleSync}
        disabled={status === "syncing"}
        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "syncing" ? "Syncing..." : "Sync to Supabase"}
      </button>
    </div>
  );
}
