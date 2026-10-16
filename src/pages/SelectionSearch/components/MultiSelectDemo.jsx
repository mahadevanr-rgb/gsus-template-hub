import { useState } from "react";
import { Check, X } from "lucide-react";

const options = ["Chicken", "Mutton", "Fish", "Egg", "Prawns", "Crab"];

export default function MultiSelectDemo() {
  const [selected, setSelected] = useState(["Chicken", "Fish"]);

  const toggle = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Multi Select</h3>
      <p className="text-sm text-slate-400 mb-4">
        Select multiple items with chip preview.
      </p>

      <div className="space-y-2">
        {options.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition ${
                active
                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                  : "border-slate-700 bg-[#111827] text-slate-300 hover:border-slate-500"
              }`}
            >
              {item}

              {active && <Check className="w-5 h-5 text-indigo-400" />}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 text-sm text-indigo-300"
          >
            {item}
            <button onClick={() => toggle(item)}>
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
