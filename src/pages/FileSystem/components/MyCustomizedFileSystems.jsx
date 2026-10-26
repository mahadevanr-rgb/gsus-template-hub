import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomizedFileSystems,
  deleteCustomizedFileSystem,
  duplicateCustomizedFileSystem,
  renameCustomizedFileSystem,
} from "@/services/fileSystemCustomizerDb";
import FileSystemLiveRenderer from "../customizer/components/FileSystemLiveRenderer";
import FileSystemExportMenu from "../customizer/components/FileSystemExportMenu";
import {
  Plus,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  Download,
  Calendar,
  Search,
  Loader2,
  FolderUp,
} from "lucide-react";

export default function MyCustomizedFileSystems({ onNewComponent }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportItem, setExportItem] = useState(null);
  const navigate = useNavigate();

  const loadItems = async () => {
    setLoading(true);
    try {
      const saved = await fetchCustomizedFileSystems();
      setItems(saved || []);
    } catch (err) {
      console.error("Failed to load customized file system designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleEdit = (item) => {
    navigate(`/file-system/customize?design=${item.id}`);
  };

  const handleDuplicate = async (item, e) => {
    e.stopPropagation();
    try {
      await duplicateCustomizedFileSystem(item.id);
      loadItems();
    } catch (err) {
      console.error("Duplicate failed:", err);
    }
  };

  const handleRename = async (item, e) => {
    e.stopPropagation();
    const newName = window.prompt("Enter new design name:", item.name);
    if (!newName || !newName.trim()) return;

    try {
      await renameCustomizedFileSystem(item.id, newName);
      loadItems();
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteCustomizedFileSystem(item.id);
      loadItems();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredItems = items.filter((item) =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.sourceComponentId || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-500" />
            <span>My Customized File Components</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your saved and customized upload components, dropzones, and inspection cards.
          </p>
        </div>

        {/* Search input + New Component Action */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search saved designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
            />
          </div>

          <button
            type="button"
            onClick={onNewComponent || (() => navigate("/file-system/customize"))}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Custom Design</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Loading saved file components...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <FolderUp className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {searchQuery ? "No matching saved components" : "No Customized File Components Yet"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {searchQuery
                ? "Try searching with a different keyword."
                : "Open the File System Customizer to design, preview, and save your custom upload components."}
            </p>
          </div>
          {!searchQuery && (
            <button
              type="button"
              onClick={onNewComponent || (() => navigate("/file-system/customize"))}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Custom File Component</span>
            </button>
          )}
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const config = item.configuration || item;

            return (
              <div
                key={item.id}
                onClick={() => handleEdit(item)}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-lg shadow-black/5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
              >
                {/* Live Preview Container */}
                <div className="relative w-full p-4 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-center min-h-[220px] overflow-hidden">
                  <div className="w-full transform scale-90 origin-center pointer-events-none">
                    <FileSystemLiveRenderer config={config} />
                  </div>
                </div>

                {/* Content & Metadata */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 truncate">
                        {item.sourceComponentId || "File Uploader"}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors truncate">
                      {item.name}
                    </h3>
                  </div>

                  {/* Actions Bar */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleRename(item, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Rename"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDuplicate(item, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExportItem(config);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Export Component"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(item, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
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

      {/* Export Menu Modal */}
      {exportItem && (
        <FileSystemExportMenu
          config={exportItem}
          onClose={() => setExportItem(null)}
        />
      )}
    </div>
  );
}
