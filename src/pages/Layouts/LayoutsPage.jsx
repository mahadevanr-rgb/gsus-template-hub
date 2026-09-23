import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Search } from "lucide-react";
import layoutSections from "@/codeRegistry/layoutsRegistry";

const categories = ["All Reusable Sections", "Headers & Navbars", "Footers", "Sidebars", "Hero"];

function LayoutThumbnail({ category }) {
  const accent = category === "Footers" ? "from-purple-500 to-pink-500" : "from-indigo-500 to-purple-500";
  return (
    <div className="relative h-48 overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#050914] p-5">
      <div className={`mx-auto h-3 w-40 rounded-full bg-gradient-to-r ${accent} opacity-80`} />
      <div className="mx-auto mt-4 h-3 w-3/4 rounded-full bg-slate-700/70" />
      <div className="mx-auto mt-7 flex w-44 gap-3"><span className="h-8 flex-1 rounded-md bg-indigo-500/50" /><span className="h-8 flex-1 rounded-md bg-slate-700/70" /></div>
      {category === "Sidebars" && <div className="absolute bottom-0 left-0 top-0 w-16 border-r border-indigo-500/20 bg-slate-900/70" />}
      {category === "Hero" && <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />}
    </div>
  );
}

export default function LayoutsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Reusable Sections");
  const [query, setQuery] = useState("");
  const sections = useMemo(() => layoutSections.filter((section) => {
    const inCategory = activeCategory === "All Reusable Sections" || section.category === activeCategory;
    const searchTerm = query.trim().toLowerCase();
    return inCategory && (!searchTerm || `${section.name} ${section.description} ${section.category}`.toLowerCase().includes(searchTerm));
  }), [activeCategory, query]);

  return (
    <div className="space-y-7">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Layout Module</span>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Reusable Layout Sections</h1>
        <p className="mt-2 text-sm text-slate-400">Ready-to-use application and marketing layout building blocks.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3">
        {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-2xl border px-6 py-3 text-base font-semibold transition-all duration-300 ${activeCategory === category ? "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20" : "border-slate-800 bg-[#111827] text-slate-400 hover:border-indigo-500/40 hover:text-white"}`}>{category}</button>)}
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search layout sections..." className="w-full rounded-xl border border-slate-800 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => <button key={section.slug} type="button" onClick={() => navigate(`/layouts/${section.slug}`)} className="group rounded-3xl border border-slate-800 bg-[#111827] p-5 text-left shadow-lg shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-indigo-500/15">
          <div className="mb-5 flex items-center justify-between"><span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-sm font-semibold text-indigo-300">{section.category}</span><Bookmark className="h-5 w-5 text-slate-400 transition-colors group-hover:text-indigo-400" /></div>
          <LayoutThumbnail category={section.category} />
          <h2 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-indigo-300">{section.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{section.description}</p>
          {section.dependencies?.length > 0 && section.dependencies[0] !== "None" && (
            <p className="mt-3 text-xs text-slate-500">
              Requires: <code className="rounded bg-slate-800 px-1.5 py-1 font-mono text-slate-300">npm install {section.dependencies.join(" ")}</code>
            </p>
          )}
          <div className="mt-5 border-t border-slate-800 pt-4 text-xs font-semibold text-indigo-400">View section details →</div>
        </button>)}
      </div>

      {!sections.length && <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-14 text-center text-sm text-slate-400">No reusable sections match your search.</div>}
    </div>
  );
}
