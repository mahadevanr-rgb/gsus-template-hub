import { useMemo, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

const options = [
  "Chicken",
  "Mutton",
  "Fish",
  "Prawns",
  "Crab",
  "Egg",
  "Turkey",
  "Duck",
  "Sardine",
  "Salmon",
];

export default function SearchableSelectDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Fish");

  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const choose = (item) => {
    setSelected(item);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">
        Searchable Select
      </h3>

      <p className="text-sm text-slate-400 mb-4">
        Large list with built-in search.
      </p>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-white"
        >
          {selected}
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </button>

        {open && (
          <div className="absolute mt-2 w-full rounded-xl border border-slate-700 bg-[#111827] shadow-xl z-20">
            <div className="relative p-3 border-b border-slate-700">
              <Search className="absolute left-6 top-6 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg bg-[#0B1220] py-2 pl-9 pr-3 text-white outline-none border border-slate-700 focus:border-indigo-500"
              />
            </div>

            <div className="max-h-56 overflow-auto">
              {filtered.length ? (
                filtered.map((item) => (
                  <button
                    key={item}
                    onClick={() => choose(item)}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-indigo-500/10 hover:text-white"
                  >
                    {item}
                    {selected === item && (
                      <Check className="w-4 h-4 text-indigo-400" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-slate-500">
                  No matching items.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-slate-400">
        Current: <span className="text-indigo-300">{selected}</span>
      </div>
    </div>
  );
}
