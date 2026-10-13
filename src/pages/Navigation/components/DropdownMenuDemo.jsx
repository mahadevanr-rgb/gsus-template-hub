import { useState } from "react";
import DropdownMenu from "@/components/common/Navigation/DropdownMenu";
import { MoreVertical, Settings, Copy, Archive, Trash } from "lucide-react";

export default function DropdownMenuDemo() {
  const [placement, setPlacement] = useState("bottom-right");
  const [lastAction, setLastAction] = useState(null);

  const items = [
    { id: "settings", label: "Project Configuration", shortcut: "⌘,", icon: Settings },
    { id: "clone", label: "Clone Environment", shortcut: "⌘D", icon: Copy },
    { type: "separator" },
    { id: "archive", label: "Archive Snapshot", shortcut: "⌥⌘A", icon: Archive },
    { id: "destroy", label: "Teardown Cluster", shortcut: "⌫", danger: true, icon: Trash },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Placement Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Placement:</span>
          {["bottom-right", "bottom-left", "top-right"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlacement(p)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                placement === p
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Executed Action:</span>
          <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {lastAction ? lastAction.label : "None"}
          </span>
        </div>
      </div>

      {/* Demo Canvas */}
      <div className="p-16 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center min-h-[300px] shadow-xl">
        <DropdownMenu
          placement={placement}
          items={items}
          onSelect={(item) => setLastAction(item)}
          trigger={({ open }) => (
            <button
              type="button"
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                open
                  ? "bg-indigo-600 text-white shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              <span>Manage Cluster Options</span>
              <MoreVertical className="w-4 h-4 opacity-75" />
            </button>
          )}
        />
      </div>
    </div>
  );
}
