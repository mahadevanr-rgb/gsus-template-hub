import { useState, useMemo } from "react";
import { getAllComponents, getCategories } from "../../registry/index";
import Card from "../atoms/Card";
import SearchBar from "../atoms/SearchBar";

const CATEGORY_META = {
  buttons:      { icon: "🔘", color: "border-blue-400",   badge: "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",   page: "buttons" },
  forms:        { icon: "📝", color: "border-indigo-400", badge: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400", page: "forms" },
  notifications:{ icon: "🔔", color: "border-amber-400",  badge: "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400",  page: "notifications" },
  "data-display":{ icon: "📊", color: "border-green-400", badge: "bg-green-50 dark:bg-green-500/15 text-green-600 dark:text-green-400",  page: "data-display" },
};

export default function ComponentsSection({ onNavigate }) {
  const [query, setQuery]       = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const allComponents = getAllComponents();
  const categories    = getCategories(); // [{ name, count }]

  const filtered = useMemo(() => {
    let list = allComponents;
    if (activeCategory !== "all")
      list = list.filter((c) => c.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [query, activeCategory, allComponents]);

  const handleCardClick = (component) => {
    const meta = CATEGORY_META[component.category];
    if (meta?.page) onNavigate?.(meta.page);
  };

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Component Registry</h2>
        <p className="text-gray-600 dark:text-slate-400 text-lg mt-1">
          {allComponents.length} components across {categories.length} categories
        </p>
      </div>

      {/* Search + Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              activeCategory === "all"
                ? "bg-gray-900 dark:bg-primary-600 text-white border-gray-900 dark:border-primary-600"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500"
            }`}
          >
            All ({allComponents.length})
          </button>
          {categories.map(({ name, count }) => {
            const meta = CATEGORY_META[name] || {};
            return (
              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all capitalize ${
                  activeCategory === name
                    ? "bg-gray-900 dark:bg-primary-600 text-white border-gray-900 dark:border-primary-600"
                    : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500"
                }`}
              >
                {meta.icon} {name.replace("-", " ")} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-slate-600">
          <div className="text-5xl mb-3">🔍</div>
          <p className="font-semibold text-lg">No components found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((comp) => {
            const meta = CATEGORY_META[comp.category] || { icon: "📦", color: "border-gray-300 dark:border-slate-700", badge: "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400" };
            return (
              <Card
                key={comp.slug}
                onClick={() => handleCardClick(comp)}
                className={`p-4 cursor-pointer group border-l-4 ${meta.color} hover:shadow-md transition-all`}
              >
                <div className="text-3xl mb-2">{meta.icon}</div>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">{comp.name}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${meta.badge}`}>
                  {comp.category.replace("-", " ")}
                </span>
                {query && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {comp.tags.filter(t => t.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(t => (
                      <span key={t} className="text-xs bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
