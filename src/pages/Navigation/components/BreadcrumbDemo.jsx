import { useState } from "react";
import Breadcrumb from "@/components/common/Navigation/Breadcrumb";
import { Home, Folder, Layers, FileCode, CheckCircle2 } from "lucide-react";

export default function BreadcrumbDemo() {
  const [separator, setSeparator] = useState("chevron");
  const [maxItems, setMaxItems] = useState(4);
  const [lastClicked, setLastClicked] = useState("Navigation");

  const trail = [
    { label: "Home", href: "#", icon: Home },
    { label: "Workspaces", href: "#", icon: Folder },
    { label: "Design Systems", href: "#", icon: Layers },
    { label: "React 19 Components", href: "#", icon: FileCode },
    { label: "Navigation Patterns", isCurrent: true },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">Separator:</span>
          {["chevron", "slash", "arrow", "dot"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeparator(s)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                separator === s
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Max Items:</span>
          {[3, 4, 6].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMaxItems(m)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                maxItems === m
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb Preview */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl space-y-4">
        <Breadcrumb
          items={trail}
          separator={separator}
          maxItems={maxItems}
          onItemClick={(item) => setLastClicked(item.label)}
        />

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Responsive Truncation: Intermediate items fold into popup when space is constrained.
          </span>
          <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Target: {lastClicked}
          </span>
        </div>
      </div>
    </div>
  );
}
