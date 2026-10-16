import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";

const data = ["Chicken", "Mutton", "Fish", "Prawns", "Crab", "Egg"];

export default function AsyncSelectDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setItems(
        data.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
      );
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Async Select</h3>

      <p className="text-sm text-slate-400 mb-4">
        Simulated API search with loading.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search API..."
          className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mt-4 rounded-xl border border-slate-700 bg-[#111827] max-h-52 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading...
          </div>
        ) : items.length ? (
          items.map((item) => (
            <div
              key={item}
              className="px-4 py-3 border-b border-slate-800 last:border-none text-slate-300"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-slate-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
