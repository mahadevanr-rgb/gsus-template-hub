import React, { useState } from "react";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  RotateCcw,
  Save,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Loader2,
  Compass,
  Code,
  Edit2,
  Sparkles,
} from "lucide-react";

export default function NavigationCustomizerToolbar({
  navName,
  onNameChange,
  onBack,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  isDirty,
  isSaving,
  saveStatus,
  onSave,
  onOpenExport,
  onOpenCode,
  onOpenTemplateSelector,
  viewportMode,
  onViewportChange,
  sourcePatternTitle = "Navbar",
}) {
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0d1322] px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-30 select-none">
      {/* LEFT: Back + Editable Title + Pattern Pill */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          title="Back to Navigation Catalog"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          {isEditingName ? (
            <input
              type="text"
              value={navName}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              autoFocus
              className="bg-slate-800 text-white font-bold text-sm sm:text-base px-2 py-1 rounded-lg border border-indigo-500 focus:outline-none max-w-[200px] sm:max-w-[280px]"
            />
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1.5 cursor-pointer group py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-colors min-w-0"
              title="Click to rename navigation design"
            >
              <h1 className="font-bold text-sm sm:text-base text-white truncate max-w-[160px] sm:max-w-[240px]">
                {navName}
              </h1>
              <Edit2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0" />
            </div>
          )}

          {/* Pattern Switcher Pill */}
          <button
            type="button"
            onClick={onOpenTemplateSelector}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 hover:bg-indigo-500/20 transition-colors cursor-pointer shrink-0"
            title="Switch navigation pattern"
          >
            <Compass className="w-3 h-3 text-indigo-400" />
            <span className="truncate max-w-[140px]">{sourcePatternTitle}</span>
            <span className="text-[10px] text-indigo-400">▾</span>
          </button>
        </div>
      </div>

      {/* CENTER: History + Viewport Switches */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Undo / Redo / Reset */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all settings to component defaults?")) {
                onReset();
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Viewport Simulation Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => onViewportChange("desktop")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewportMode === "desktop"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Desktop fluid layout"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => onViewportChange("tablet")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewportMode === "tablet"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Tablet preview (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => onViewportChange("mobile")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewportMode === "mobile"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Mobile preview (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* RIGHT: Status Indicator + Code + Export + Save */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Unsaved Changes Indicator */}
        <div className="hidden sm:flex items-center mr-1">
          {isDirty ? (
            <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Unsaved</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
              <Check className="w-3 h-3" />
              <span>Saved</span>
            </span>
          )}
        </div>

        {/* View Code / Inspect */}
        <button
          type="button"
          onClick={onOpenCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
          title="Inspect generated React JSX & CSS"
        >
          <Code className="w-4 h-4 text-indigo-400" />
          <span className="hidden md:inline">Code</span>
        </button>

        {/* Export Modal Trigger */}
        <button
          type="button"
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
          title="Export bundle ZIP"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
            saveStatus === "saved"
              ? "bg-emerald-600 text-white"
              : saveStatus === "error"
              ? "bg-rose-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">Saving...</span>
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
