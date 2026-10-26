import React from "react";
import { X, Layers, Check } from "lucide-react";
import { OVERLAY_PATTERNS, SUPPORTED_OVERLAY_IDS } from "../modalOverlayCustomizerConfig";

export default function OverlayTemplateSelectorModal({
  currentTemplateId,
  onSelectTemplate,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1322] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Choose Overlay Pattern</h3>
              <p className="text-[11px] text-slate-400">
                Select an overlay pattern to start customizing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto space-y-3 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {SUPPORTED_OVERLAY_IDS.map((id) => {
              const meta = OVERLAY_PATTERNS[id];
              if (!meta) return null;
              const isSelected = currentTemplateId === id;

              return (
                <div
                  key={id}
                  onClick={() => {
                    if (isSelected) {
                      onClose();
                      return;
                    }
                    const confirmed = window.confirm(
                      `Switch to "${meta.name}"? Any unsaved edits will be reset to pattern defaults.`
                    );
                    if (confirmed) {
                      onSelectTemplate(id);
                      onClose();
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 text-left ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase tracking-wider">
                        {meta.category || meta.tag}
                      </span>
                      <h4 className="font-bold text-sm text-white">{meta.name}</h4>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {meta.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
