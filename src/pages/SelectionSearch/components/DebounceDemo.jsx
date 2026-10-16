import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";

const data = [
  "Chicken Breast",
  "Chicken Wings",
  "Mutton Curry Cut",
  "Fresh Fish",
  "Salmon Fillet",
  "Fresh Prawns",
  "Crab Whole",
  "Egg Pack",
];

export default function DebounceDemo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(data);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setResults(
        data.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">
        Debounced Search
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Search runs after 500ms instead of every keystroke.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type slowly..."
          className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mt-4 rounded-xl border border-slate-700 bg-[#111827] max-h-48 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            Searching...
          </div>
        ) : (
          results.map((item) => (
            <div
              key={item}
              className="px-4 py-3 border-b border-slate-800 last:border-none text-slate-300"
            >
              {item}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Current Query:{" "}
        <span className="text-indigo-300">{debouncedQuery || "None"}</span>
      </div>
    </div>
  );
}
