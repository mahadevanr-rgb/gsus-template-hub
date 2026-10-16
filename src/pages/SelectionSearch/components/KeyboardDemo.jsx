import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const options = ["Chicken", "Mutton", "Fish", "Prawns", "Crab", "Egg"];

export default function KeyboardDemo() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        setIndex((prev) => Math.min(prev + 1, options.length - 1));
      }

      if (e.key === "ArrowUp") {
        setIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        setSelected(options[index]);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">
        Keyboard Navigation
      </h3>

      <p className="text-sm text-slate-400 mb-4">Use ↑ ↓ and Enter.</p>

      <div className="space-y-2">
        {options.map((item, i) => (
          <div
            key={item}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 transition ${
              i === index
                ? "border-indigo-500 bg-indigo-500/10 text-white"
                : "border-slate-700 bg-[#111827] text-slate-300"
            }`}
          >
            {item}
            {i === index && (
              <ChevronRight className="w-4 h-4 text-indigo-400" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm">
        Selected: <span className="text-indigo-300">{selected || "None"}</span>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Click anywhere on the page, then press ↑ ↓ Enter.
      </div>
    </div>
  );
}
