import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const options = [
  "Chicken",
  "Mutton",
  "Fish",
  "Prawns",
  "Crab",
  "Egg",
  "Turkey",
  "Duck",
];

export default function AutocompleteDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filtered = useMemo(() => {
    if (!query) return options;
    return options.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Autocomplete</h3>
      <p className="text-sm text-slate-400 mb-4">
        Type to instantly find matching options.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
        />

        {query && (
          <div className="absolute mt-2 w-full rounded-xl border border-slate-700 bg-[#111827] shadow-xl z-20 max-h-56 overflow-auto">
            {filtered.length ? (
              filtered.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setQuery(item);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-indigo-500/10 hover:text-white"
                >
                  {item}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-slate-500">No results found.</div>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-3 text-sm">
          Selected: <span className="text-indigo-300">{selected}</span>
        </div>
      )}
    </div>
  );
}
