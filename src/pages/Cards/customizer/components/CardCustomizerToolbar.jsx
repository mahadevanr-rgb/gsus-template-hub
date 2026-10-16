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
  LayoutTemplate,
  Code,
} from "lucide-react";

export default function CardCustomizerToolbar({
  cardName,
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
  sourceCardTitle = "Card",
}) {
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0d1322] px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-30 select-none">
      {/* =========================================================================
          LEFT: Back Button + Editable Title + Template Switcher
         ========================================================================= */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          title="Back to Cards Collection"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          {isEditingName ? (
            <input
              type="text"
              value={cardName}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              autoFocus
              className="bg-slate-900 text-white font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg border border-indigo-500 focus:outline-none w-36 sm:w-52"
            />
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1.5 cursor-pointer group px-2 py-1 rounded-lg hover:bg-slate-800/60 transition-colors min-w-0"
              title="Click to rename design"
            >
              <h1 className="font-bold text-xs sm:text-sm md:text-base text-white tracking-tight truncate max-w-[120px] sm:max-w-[170px] md:max-w-[210px]">
                {cardName || "My Custom Card"}
              </h1>
              <span className="text-[10px] text-slate-500 group-hover:text-indigo-400 shrink-0">
                ✏️
              </span>
            </div>
          )}

          {/* Unsaved indicator dot */}
          {isDirty && (
            <span
              className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"
              title="Unsaved modifications"
            />
          )}

          {/* Current template pill button */}
          <button
            onClick={onOpenTemplateSelector}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-colors shrink-0 cursor-pointer"
            title="Switch base template archetype"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate max-w-[110px]">{sourceCardTitle}</span>
            <span className="text-slate-600 text-[10px]">▾</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MIDDLE: Undo / Redo / Reset & Viewport Switcher
         ========================================================================= */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {/* Undo / Redo / Reset Group */}
        <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-800 p-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onReset}
            title="Reset to Template Defaults"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors ml-0.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Modes */}
        <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-800 p-0.5">
          <button
            onClick={() => onViewportChange("desktop")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "desktop"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Responsive Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewportChange("tablet")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "tablet"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewportChange("mobile")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewportMode === "mobile"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Mobile (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          RIGHT: View Code, Save, and Export Actions
         ========================================================================= */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {onOpenCode && (
          <button
            onClick={onOpenCode}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer active:scale-[0.98]"
            title="View & Copy Generated Code"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Code</span>
          </button>
        )}

        <button
          onClick={onSave}
          disabled={isSaving}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer ${
            saveStatus === "saved"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : isDirty
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200"
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

        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
