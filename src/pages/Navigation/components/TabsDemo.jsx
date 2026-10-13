import { useState } from "react";
import Tabs from "@/components/common/Navigation/Tabs";
import { Activity, ShieldAlert, Cpu, HardDrive } from "lucide-react";

export default function TabsDemo() {
  const [variant, setVariant] = useState("line");
  const [orientation, setOrientation] = useState("horizontal");
  const [activeTab, setActiveTab] = useState("metrics");

  const sampleTabs = [
    { id: "metrics", label: "Runtime Metrics", icon: Activity, count: "Live" },
    { id: "nodes", label: "Cluster Nodes", icon: Cpu, count: 18 },
    { id: "storage", label: "PV Volumes", icon: HardDrive, count: null },
    { id: "quarantine", label: "Quarantine", icon: ShieldAlert, disabled: true, count: 0 },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">Variant:</span>
          {["line", "pills", "enclosed", "segment"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                variant === v
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Orientation:</span>
          {["horizontal", "vertical"].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrientation(o)}
              className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                orientation === o
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Canvas */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl">
        <Tabs
          tabs={sampleTabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id)}
          variant={variant}
          orientation={orientation}
        >
          {(tabId) => (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 animate-in fade-in duration-200">
              <h4 className="text-sm font-bold text-white capitalize">
                Panel Content: {tabId}
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Accessible WAI-ARIA tabpanel with roving tabindex. Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">←</kbd> and{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">→</kbd> keys to cycle through active tabs seamlessly.
              </p>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
