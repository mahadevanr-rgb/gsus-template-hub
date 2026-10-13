import { useState } from "react";
import Header from "@/components/common/Navigation/Header";
import { Sliders, RefreshCw } from "lucide-react";

export default function HeaderDemo() {
  const [showSearch, setShowSearch] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [unreadCount, setUnreadCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [useBreadcrumbs, setUseBreadcrumbs] = useState(true);

  const breadcrumbs = [
    { label: "Organization", href: "#org" },
    { label: "Production Cluster", href: "#cluster" },
    { label: "Pod Metrics" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setUseBreadcrumbs((p) => !p)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              useBreadcrumbs ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
            }`}
          >
            {useBreadcrumbs ? "Breadcrumb Mode" : "Title Mode"}
          </button>
          <button
            type="button"
            onClick={() => setShowSearch((p) => !p)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              showSearch ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
            }`}
          >
            {showSearch ? "Search: ON" : "Search: OFF"}
          </button>
          <button
            type="button"
            onClick={() => setShowNotifications((p) => !p)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              showNotifications ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
            }`}
          >
            {showNotifications ? `Bell (${unreadCount})` : "Bell: OFF"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Search Log:</span>
          <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {searchQuery || "None"}
          </span>
        </div>
      </div>

      {/* Header Canvas */}
      <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-950 p-2 sm:p-4 shadow-xl">
        <Header
          title="Cluster Performance Monitor"
          breadcrumbs={useBreadcrumbs ? breadcrumbs : null}
          showSearch={showSearch}
          showNotifications={showNotifications}
          unreadCount={unreadCount}
          onSearch={(val) => setSearchQuery(val)}
          user={{
            name: "Devon Vance",
            role: "Principal SRE",
          }}
        />
      </div>
    </div>
  );
}
