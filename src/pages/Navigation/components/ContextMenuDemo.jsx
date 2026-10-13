import { useState } from "react";
import ContextMenu from "@/components/common/Navigation/ContextMenu";
import { MousePointer, Terminal, Sparkles, Check } from "lucide-react";

export default function ContextMenuDemo() {
  const [lastAction, setLastAction] = useState(null);

  const contextItems = [
    { id: "view-source", label: "Inspect Node Structure", shortcut: "⌥⌘I" },
    { id: "copy-jsx", label: "Copy JSX Snippet", shortcut: "⌘C" },
    { id: "duplicate", label: "Clone Micro-Service", shortcut: "⌘D" },
    { type: "separator" },
    { id: "restart", label: "Hot Reload Container", shortcut: "⌘R" },
    { id: "terminate", label: "Kill Process", danger: true, shortcut: "⌫" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* State Log */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Context Action Fired:</span>
        <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {lastAction ? `${lastAction.label} (${lastAction.id})` : "Right-click the card below"}
        </span>
      </div>

      {/* Target Area Canvas */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-950 flex justify-center shadow-xl">
        <ContextMenu
          items={contextItems}
          onSelect={(item) => setLastAction(item)}
        >
          <div className="w-full max-w-lg p-10 rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/90 hover:border-indigo-500/60 transition-colors flex flex-col items-center justify-center text-center cursor-context-menu group select-none">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MousePointer className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Right-Click Anywhere Inside This Card
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Context menu opens at pointer position with automatic viewport edge clamping and escape dismissal.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-medium">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Browser right-click is protected everywhere else</span>
            </div>
          </div>
        </ContextMenu>
      </div>
    </div>
  );
}
