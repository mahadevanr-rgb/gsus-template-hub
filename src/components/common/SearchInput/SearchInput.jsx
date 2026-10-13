import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import CommandMenu from "@/pages/ModalOverlay/components/CommandMenu/CommandMenu";

export default function SearchInput() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div
        onClick={() => setCommandOpen(true)}
        className="relative w-full max-w-md cursor-pointer group"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-hover:text-indigo-400 transition-colors">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          readOnly
          placeholder="Search components or press ⌘K..."
          className="w-full pl-9 pr-12 py-1.5 text-sm bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors group-hover:border-slate-700"
        />
        {/* Keyboard shortcut indicator (⌘ K) */}
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
          <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ⌘ K
          </kbd>
        </div>
      </div>

      <CommandMenu
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />
    </>
  );
}
