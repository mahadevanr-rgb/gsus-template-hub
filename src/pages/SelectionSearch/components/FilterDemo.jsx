import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const products = [
  "Chicken Breast",
  "Chicken Wings",
  "Mutton Curry Cut",
  "Fish Fillet",
  "Fresh Prawns",
  "Crab Whole",
  "Egg Pack",
  "Salmon Slice",
];

export default function FilterDemo() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Filtering</h3>

      <p className="text-sm text-slate-400 mb-4">
        Real-time filtering without delay.
      </p>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter products..."
          className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-700 bg-[#111827] px-4 py-3 text-slate-300"
          >
            {item}
          </div>
        ))}

        {!filtered.length && (
          <div className="rounded-lg border border-dashed border-slate-700 py-6 text-center text-slate-500">
            No matching products.
          </div>
        )}
      </div>
    </div>
  );
}
