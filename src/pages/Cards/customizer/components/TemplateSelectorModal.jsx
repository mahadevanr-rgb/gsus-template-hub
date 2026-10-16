import React from "react";
import { X, Sparkles, Check } from "lucide-react";
import { CARD_SCHEMAS } from "../cardCustomizerConfig";

export default function TemplateSelectorModal({ currentTemplateId, onSelectTemplate, onClose }) {
  const templates = Object.values(CARD_SCHEMAS);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-5 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Choose a Base Card Template</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any card archetype to load its specialized layout, fields, and default styling.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto p-1 flex-1 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
          {templates.map((tpl) => {
            const isSelected = currentTemplateId === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/30"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-indigo-300">
                      {tpl.category}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-white">
                    {tpl.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Apply Template →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
