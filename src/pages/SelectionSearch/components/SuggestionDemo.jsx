import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const suggestions = [
  "Chicken Curry Cut",
  "Boneless Chicken",
  "Fresh Fish",
  "Prawns Jumbo",
  "Mutton Chops",
  "Crab Premium",
];

export default function SuggestionDemo() {
  const [query, setQuery] = useState("");

  const matched = useMemo(() => {
    if (!query) return suggestions.slice(0, 4);

    return suggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Suggestions</h3>

      <p className="text-sm text-slate-400 mb-4">
        Smart suggestions while typing.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Start typing..."
        className="w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-indigo-500"
      />

      <div className="mt-4 space-y-2">
        {matched.map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            className="w-full flex items-center gap-3 rounded-lg border border-slate-700 bg-[#111827] px-4 py-3 text-left text-slate-300 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white transition"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
