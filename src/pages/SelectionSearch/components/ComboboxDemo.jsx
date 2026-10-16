import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const options = ["Chicken", "Mutton", "Fish", "Egg", "Prawns", "Crab"];

export default function ComboboxDemo() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  const choose = (value) => {
    setQuery(value);
    setOpen(false);
  };

  const handleKey = (e) => {
    if (!open) setOpen(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((p) => Math.min(p + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((p) => Math.max(p - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlight]) choose(filtered[highlight]);
    }

    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Combobox</h3>

      <p className="text-sm text-slate-400 mb-4">
        Search and navigate using keyboard.
      </p>

      <div className="relative">
        <input
          ref={inputRef}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKey}
          placeholder="Select or search..."
          className="w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 pr-10 text-white outline-none focus:border-indigo-500"
        />

        <ChevronDown
          className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute mt-2 w-full rounded-xl border border-slate-700 bg-[#111827] shadow-xl z-20">
            {filtered.map((item, index) => (
              <button
                key={item}
                onClick={() => choose(item)}
                className={`w-full text-left px-4 py-3 ${
                  highlight === index
                    ? "bg-indigo-500/20 text-white"
                    : "text-slate-300 hover:bg-indigo-500/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-slate-500">↑ ↓ Enter Esc supported</div>
    </div>
  );
}
