import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomizedAccordions,
  deleteCustomizedAccordion,
  duplicateCustomizedAccordion,
  renameCustomizedAccordion,
} from "@/services/accordionCustomizerDb";
import AccordionLiveRenderer from "../customizer/components/AccordionLiveRenderer";
import AccordionExportMenu from "../customizer/components/AccordionExportMenu";
import { normalizeAccordionConfig } from "../customizer/accordionCustomizationUtils";
import {
  Plus,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  Download,
  Search,
  Loader2,
  ListCollapse,
} from "lucide-react";

export default function MyCustomizedAccordions({ onNewAccordion }) {
  const [accordions, setAccordions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportAccordion, setExportAccordion] = useState(null);
  const navigate = useNavigate();

  const loadAccordions = async () => {
    setLoading(true);
    try {
      const saved = await fetchCustomizedAccordions();
      setAccordions(saved || []);
    } catch (err) {
      console.error("Failed to load customized accordions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccordions();
  }, []);

  const handleEdit = (item) => {
    navigate(`/accordion/customize?design=${item.id}`);
  };

  const handleDuplicate = async (item, e) => {
    e.stopPropagation();
    try {
      await duplicateCustomizedAccordion(item.id);
      loadAccordions();
    } catch (err) {
      console.error("Duplicate failed:", err);
    }
  };

  const handleRename = async (item, e) => {
    e.stopPropagation();
    const newName = window.prompt("Enter new accordion name:", item.name);
    if (!newName || !newName.trim()) return;

    try {
      await renameCustomizedAccordion(item.id, newName);
      loadAccordions();
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteCustomizedAccordion(item.id);
      loadAccordions();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredAccordions = accordions.filter((a) =>
    (a.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <span>My Customized Accordions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your saved personalized accordion systems. Reopen, edit, duplicate, or export anytime.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={onNewAccordion || (() => navigate("/accordion/customize"))}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Custom Accordion</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
          <p className="text-xs">Loading your saved accordion designs...</p>
        </div>
      ) : filteredAccordions.length === 0 ? (
        /* Empty state */
        <div className="py-16 px-6 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
            <ListCollapse className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {searchQuery ? "No matching saved accordions" : "No Customized Accordions Yet"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm leading-relaxed">
            {searchQuery
              ? `No designs matched "${searchQuery}". Clear your search query to see all designs.`
              : "Design, customize, and save your first accordion disclosure with personalized themes, typography, and items."}
          </p>

          <button
            onClick={onNewAccordion || (() => navigate("/accordion/customize"))}
            className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Accordion</span>
          </button>
        </div>
      ) : (
        /* Grid of Saved Accordions */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccordions.map((item) => {
            const configPayload = normalizeAccordionConfig(
              item.sourceComponentId || "numbered-accordion",
              item.configuration || item
            );

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Miniature Preview Frame */}
                <div
                  onClick={() => handleEdit(item)}
                  className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 min-h-[260px] max-h-[320px] cursor-pointer relative overflow-hidden"
                >
                  <div className="transform scale-[0.75] group-hover:scale-[0.78] transition-transform origin-center pointer-events-none w-full flex justify-center overflow-hidden">
                    <AccordionLiveRenderer
                      config={configPayload}
                      viewportMode="desktop"
                    />
                  </div>

                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors pointer-events-none" />
                </div>

                {/* Accordion Meta & Action Bar */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3
                        onClick={() => handleRename(item, { stopPropagation: () => {} })}
                        className="font-bold text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                        title="Click to rename"
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="capitalize">
                          {item.sourceComponentId?.replace("-accordion", "") || "Accordion"}
                        </span>
                        <span>•</span>
                        <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 uppercase tracking-wider">
                      Saved
                    </span>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>

                    <div className="flex items-center gap-1 text-slate-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExportAccordion(configPayload);
                        }}
                        className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Export Package"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(item, e)}
                        className="p-1.5 rounded-lg hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item, e)}
                        className="p-1.5 rounded-lg hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Export Modal if user clicks Export from saved accordion */}
      {exportAccordion && (
        <AccordionExportMenu
          config={exportAccordion}
          onClose={() => setExportAccordion(null)}
        />
      )}
    </div>
  );
}
