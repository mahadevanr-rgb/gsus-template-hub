import React from "react";
import { X, ListCollapse } from "lucide-react";
import { SUPPORTED_ACCORDION_IDS } from "../accordionCustomizerConfig";

const PATTERN_META = {
  "numbered-accordion": {
    name: "Numbered FAQ Accordion",
    description: "Large sequential numbering with +/- toggle triggers",
    color: "from-indigo-500 to-purple-500",
    tag: "FAQ",
  },
  "filter-accordion": {
    name: "Filter Selection Accordion",
    description: "Multi-section filter with checkbox selection and count badges",
    color: "from-blue-500 to-cyan-500",
    tag: "Filter",
  },
  "simple-accordion": {
    name: "Simple FAQ Accordion",
    description: "Minimal disclosure rows with rotating chevrons",
    color: "from-purple-500 to-pink-500",
    tag: "Minimal",
  },
  "icon-accordion": {
    name: "Icon Navigation Accordion",
    description: "Pixel-aligned icons with warm/neutral theme variants",
    color: "from-amber-500 to-orange-500",
    tag: "Navigation",
  },
  "form-accordion": {
    name: "Dynamic Form Accordion",
    description: "Multi-section enterprise form with dynamic fields",
    color: "from-teal-500 to-emerald-500",
    tag: "Form",
  },
};

export default function AccordionTemplateSelectorModal({
  currentTemplateId,
  onSelectTemplate,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0d1322] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ListCollapse className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Switch Accordion Pattern
              </h2>
              <p className="text-[11px] text-slate-400">
                Choose a base pattern — your name is preserved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning */}
        <div className="px-5 pt-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
            ⚠ Switching patterns resets settings to the new pattern's defaults.
            Save your current work first if needed.
          </div>
        </div>

        {/* Pattern Grid */}
        <div className="p-4 space-y-2">
          {SUPPORTED_ACCORDION_IDS.map((id) => {
            const meta = PATTERN_META[id];
            const isActive = id === currentTemplateId;

            return (
              <button
                key={id}
                onClick={() => {
                  onSelectTemplate(id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? "border-indigo-500/60 bg-indigo-500/10"
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${meta.color} shadow-md`}
                >
                  <ListCollapse className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {meta.name}
                    </p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      {meta.tag}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {meta.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
