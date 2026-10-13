import { useState } from "react";
import CommandPalette from "@/components/common/Navigation/CommandPalette";
import { Command, Search, Sparkles } from "lucide-react";

export default function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [lastExecuted, setLastExecuted] = useState(null);

  return (
    <div className="w-full space-y-4">
      {/* State Log */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Last Executed Command:</span>
        <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {lastExecuted ? lastExecuted.label : "None (Press ⌘K or click below)"}
        </span>
      </div>

      {/* Launcher Canvas */}
      <div className="p-16 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center min-h-[300px] shadow-xl space-y-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white shadow-xl transition-all"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          <span className="text-xs font-semibold">Open Command Palette</span>
          <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 rounded-md border border-slate-700 transition-colors">
            ⌘K / Ctrl+K
          </kbd>
        </button>

        <p className="text-xs text-slate-500 text-center max-w-sm">
          Try searching for "navigation", "buttons", "cards", "file system", or "toggle theme".
        </p>

        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
          onExecute={(cmd) => setLastExecuted(cmd)}
        />
      </div>
    </div>
  );
}
