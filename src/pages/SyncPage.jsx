import { useState } from "react";
import { syncRegistryToSupabase } from "../lib/db";
import { getAllComponents } from "../registry/index";

export default function SyncPage() {
  const [status, setStatus] = useState("idle"); // idle | syncing | done | error
  const [message, setMessage] = useState("");
  const components = getAllComponents();

  const handleSync = async () => {
    setStatus("syncing");
    setMessage("");
    const result = await syncRegistryToSupabase();
    if (result.error) {
      setStatus("error");
      setMessage(result.error?.message || String(result.error));
    } else {
      setStatus("done");
      setMessage(`✅ Synced ${result.count} components to Supabase successfully.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Registry Sync</h1>
        <p className="text-gray-500 text-sm mb-8">
          Seeds your Supabase <code className="bg-gray-100 px-1 rounded">components</code> table
          from the local registry. Run this once after setting up the database.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 space-y-1">
          <p>📦 <strong>{components.length}</strong> components ready to sync</p>
          <p>🗂 Categories: {[...new Set(components.map(c => c.category))].join(", ")}</p>
        </div>

        <button
          onClick={handleSync}
          disabled={status === "syncing"}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "syncing" ? "Syncing..." : "Sync to Supabase"}
        </button>

        {message && (
          <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${
            status === "done"  ? "bg-green-50 text-green-700" :
            status === "error" ? "bg-red-50 text-red-700" : ""
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
