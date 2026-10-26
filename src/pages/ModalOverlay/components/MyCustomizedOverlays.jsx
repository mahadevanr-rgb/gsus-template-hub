import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomizedOverlays,
  deleteCustomizedOverlay,
  duplicateCustomizedOverlay,
  renameCustomizedOverlay,
} from "@/services/modalOverlayCustomizerDb";
import OverlayExportMenu from "../customizer/components/OverlayExportMenu";
import { normalizeOverlayConfig } from "../customizer/modalOverlayCustomizationUtils";
import {
  Plus,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  Download,
  Search,
  Loader2,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function MyCustomizedOverlays({ onNewOverlay }) {
  const [overlays, setOverlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportOverlay, setExportOverlay] = useState(null);
  const navigate = useNavigate();

  const loadOverlays = async () => {
    setLoading(true);
    try {
      const saved = await fetchCustomizedOverlays();
      setOverlays(saved || []);
    } catch (err) {
      console.error("Failed to load customized overlays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverlays();
  }, []);

  const handleEdit = (item) => {
    navigate(`/modal-overlay/customize?design=${item.id}`);
  };

  const handleDuplicate = async (item, e) => {
    e.stopPropagation();
    try {
      await duplicateCustomizedOverlay(item.id);
      loadOverlays();
    } catch (err) {
      console.error("Duplicate failed:", err);
    }
  };

  const handleRename = async (item, e) => {
    e.stopPropagation();
    const newName = window.prompt("Enter new overlay name:", item.name);
    if (!newName || !newName.trim()) return;

    try {
      await renameCustomizedOverlay(item.id, newName);
      loadOverlays();
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
      await deleteCustomizedOverlay(item.id);
      loadOverlays();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredOverlays = overlays.filter((o) =>
    (o.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <span>My Customized Overlays</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your saved personalized modal & overlay systems. Reopen, edit, duplicate, or export anytime.
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
            onClick={onNewOverlay || (() => navigate("/modal-overlay/customize"))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>New Custom Overlay</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
          <p className="text-sm">Loading your saved designs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && overlays.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            No Saved Overlays Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Customize any modal, dialog, drawer, popover, or command palette to match your product's design system, then save it here for instant reuse.
          </p>
          <button
            onClick={onNewOverlay || (() => navigate("/modal-overlay/customize"))}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Open Customizer Studio</span>
          </button>
        </div>
      )}

      {/* No Search Results */}
      {!loading && overlays.length > 0 && filteredOverlays.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          No saved overlays match "{searchQuery}".
        </div>
      )}

      {/* Saved Designs Grid */}
      {!loading && filteredOverlays.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOverlays.map((item) => {
            const config = normalizeOverlayConfig(item);
            return (
              <div
                key={item.id}
                onClick={() => handleEdit(item)}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Header preview thumbnail */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.colors?.primaryBtnBg || "#4f46e5" }}
                    />
                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                      {config.pattern || config.sourceComponentId || "Modal"}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.updatedAt || item.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-500 transition-colors flex items-center justify-between">
                      <span>{item.name || config.name || "Untitled Overlay"}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {config.content?.description || config.content?.title || "Customized overlay configuration"}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      R: {config.border?.radius ?? 16}px
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      W: {config.dimensions?.maxWidth || "520px"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      ESC: {config.interaction?.closeOnEsc !== false ? "✓" : "✗"}
                    </span>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div
                  className="px-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleRename(item, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      title="Rename"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDuplicate(item, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExportOverlay(config);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      title="Export Bundle"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(item, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Open Studio →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Export Modal for saved items */}
      {exportOverlay && (
        <OverlayExportMenu
          isOpen={!!exportOverlay}
          onClose={() => setExportOverlay(null)}
          config={exportOverlay}
        />
      )}
    </div>
  );
}
