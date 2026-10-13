import React, { useState } from "react";
import { Search } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import FileSystemCardPreview from "./FileSystemCardPreview";

const CATEGORIES = [
  "All",
  "Single Upload",
  "Batch Upload",
  "Dropzone",
  "Image",
  "Documents",
  "Preview",
  "List",
  "Interaction",
  "Progress",
  "Resilience",
  "Validation",
  "Processing",
  "Avatar",
];

export default function FileSystemInteractiveGrid({ components, onSelectComponent }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = components.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.subCategory === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search file components..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((item) => (
          <ShowcaseCard
            key={item.id}
            item={item}
            previewComponent={<FileSystemCardPreview id={item.id} />}
            onViewDetails={(comp) => onSelectComponent(comp.slug || comp.id)}
            theme={item.theme || "indigo"}
            categoryLabel={item.subCategory}
          />
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="py-16 text-center text-slate-500">
          <p className="text-sm">No file system components match your criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs text-indigo-400 hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
