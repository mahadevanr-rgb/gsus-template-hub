import React from "react";
import {
  X,
  UploadCloud,
  Layers,
  Image as ImageIcon,
  FileText,
  Eye,
  Camera,
  Check,
} from "lucide-react";
import { FILE_SYSTEM_SCHEMAS } from "../fileSystemCustomizerConfig";

const TEMPLATE_ICONS = {
  "basic-file-upload": UploadCloud,
  "multiple-file-upload": Layers,
  "drag-drop-upload": UploadCloud,
  "image-upload": ImageIcon,
  "document-upload": FileText,
  "file-preview": Eye,
  "avatar-upload": Camera,
};

export default function FileSystemTemplateModal({
  currentTemplateId,
  onSelectTemplate,
  onClose,
}) {
  const templates = Object.values(FILE_SYSTEM_SCHEMAS);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="font-bold text-base text-white">Switch Base File System Archetype</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a foundation template. Compatible visual settings will be preserved.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1">
          {templates.map((tpl) => {
            const Icon = TEMPLATE_ICONS[tpl.id] || UploadCloud;
            const isSelected = currentTemplateId === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? "bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-800 text-slate-300 group-hover:text-emerald-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {tpl.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Archetype: {tpl.subCategory}</span>
                  <span className="font-semibold text-emerald-400 group-hover:underline">
                    Select &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
