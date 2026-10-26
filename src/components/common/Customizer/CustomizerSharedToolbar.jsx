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
  Code,
  Edit2,
  LayoutTemplate,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function CustomizerSharedToolbar({
  name = "",
  onNameChange,
  onBack,
  backTitle = "Back to Collection",
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onReset,
  resetConfirmMessage = "Reset all customizations to pattern defaults?",
  isDirty = false,
  isSaving = false,
  saveStatus = null,
  onSave,
  onOpenExport,
  onOpenCode,
  onOpenTemplateSelector,
  viewportMode = "desktop",
  onViewportChange,
  sourcePatternTitle = "Template",
  patternIcon: PatternIcon = LayoutTemplate,
}) {
  const [isEditingName, setIsEditingName] = useState(false);

  const handleResetClick = () => {
    if (resetConfirmMessage) {
      if (window.confirm(resetConfirmMessage)) {
        onReset?.();
      }
    } else {
      onReset?.();
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0d1322] px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-30 select-none">
      {/* =========================================================================
          LEFT: Back Button + Editable Title + Pattern Switcher
         ========================================================================= */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          title={backTitle}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange?.(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              autoFocus
              className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg border border-indigo-500 focus:outline-none w-36 sm:w-52"
            />
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1.5 cursor-pointer group px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors min-w-0"
              title="Click to rename design"
            >
              <h1 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 dark:text-white tracking-tight truncate max-w-[120px] sm:max-w-[170px] md:max-w-[210px]">
                {name || "Untitled Design"}
              </h1>
              <Edit2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
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
          {onOpenTemplateSelector && (
            <button
              type="button"
              onClick={onOpenTemplateSelector}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors shrink-0 cursor-pointer"
              title="Switch base template archetype"
            >
              <PatternIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className="truncate max-w-[120px]">{sourcePatternTitle}</span>
              <span className="text-slate-400 dark:text-slate-600 text-[10px]">▾</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MIDDLE: Undo / Redo / Reset & Viewport Switcher
         ========================================================================= */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {/* Undo / Redo / Reset Group */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 p-0.5">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetClick}
            title="Reset to Template Defaults"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-0.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Modes */}
        {onViewportChange && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 p-0.5">
            <button
              type="button"
              onClick={() => onViewportChange("desktop")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === "desktop"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
              title="Responsive Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewportChange("tablet")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === "tablet"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewportChange("mobile")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === "mobile"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          RIGHT: Theme Switcher, Code, Save, and Export Actions
         ========================================================================= */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Sleek Theme Toggle */}
        <ThemeToggle className="!w-8 !h-8 sm:!w-9 sm:!h-9 shrink-0" />

        {onOpenCode && (
          <button
            type="button"
            onClick={onOpenCode}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-all cursor-pointer active:scale-[0.98]"
            title="View & Copy Generated Code"
          >
            <Code className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="hidden sm:inline">Code</span>
          </button>
        )}

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer ${
              saveStatus === "saved"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                : isDirty
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
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
        )}

        {onOpenExport && (
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        )}
      </div>
    </header>
  );
}
