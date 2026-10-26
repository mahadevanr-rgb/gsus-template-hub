import React, { useState } from "react";
import {
  Download,
  FileCode,
  FileJson,
  Globe,
  Package,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../accordionCodeGenerator";
import { serializeConfig, toPascalCase } from "../accordionCustomizationUtils";
import {
  downloadFile,
  downloadZipPackage,
} from "../accordionExportService";

export default function AccordionExportMenu({ config, onClose }) {
  const [downloading, setDownloading] = useState(null);

  const componentName = toPascalCase(config.name || "CustomAccordion");

  const handleExport = async (type) => {
    setDownloading(type);
    try {
      switch (type) {
        case "react":
          downloadFile(
            `${componentName}.jsx`,
            generateReactCode(config),
            "text/javascript;charset=utf-8"
          );
          break;
        case "react-css": {
          const { jsx, css } = generateReactAndCss(config);
          downloadFile(`${componentName}.jsx`, jsx, "text/javascript;charset=utf-8");
          setTimeout(() => {
            downloadFile(`${componentName}.css`, css, "text/css;charset=utf-8");
          }, 300);
          break;
        }
        case "html":
          downloadFile(
            "index.html",
            generateHtmlCss(config),
            "text/html;charset=utf-8"
          );
          break;
        case "json":
          downloadFile(
            "accordion.config.json",
            serializeConfig(config),
            "application/json;charset=utf-8"
          );
          break;
        case "zip":
          await downloadZipPackage(config);
          break;
        default:
          break;
      }
      setTimeout(() => setDownloading(null), 1500);
    } catch (err) {
      console.error("Export failed:", err);
      setDownloading(null);
    }
  };

  const EXPORT_OPTIONS = [
    {
      id: "react",
      label: "React Component",
      description: `${componentName}.jsx — Self-contained with inline styles`,
      icon: FileCode,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "react-css",
      label: "React + CSS",
      description: `${componentName}.jsx + ${componentName}.css — Separate stylesheet`,
      icon: FileCode,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: "html",
      label: "HTML / CSS / JavaScript",
      description: "index.html — Standalone, no build tools required",
      icon: Globe,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "json",
      label: "Configuration JSON",
      description: "accordion.config.json — Import back into TemplateHub",
      icon: FileJson,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "zip",
      label: "Complete ZIP Package",
      description: "All files + README + package.json",
      icon: Package,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
      featured: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0d1322] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Export Accordion</h2>
              <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                {config.name}
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

        {/* Export Options */}
        <div className="p-4 space-y-2.5">
          {EXPORT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isLoading = downloading === opt.id;
            const isDone = false;

            return (
              <button
                key={opt.id}
                onClick={() => handleExport(opt.id)}
                disabled={!!downloading}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer disabled:opacity-60 disabled:pointer-events-none ${
                  opt.featured
                    ? "bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30 hover:border-purple-500/60 hover:from-purple-900/50 hover:to-indigo-900/50"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${opt.bgColor}`}
                >
                  {isLoading ? (
                    <Loader2 className={`w-4 h-4 animate-spin ${opt.color}`} />
                  ) : (
                    <Icon className={`w-4 h-4 ${opt.color}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {opt.label}
                    {opt.featured && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        RECOMMENDED
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {opt.description}
                  </p>
                </div>

                <Download
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isLoading ? "text-transparent" : "text-slate-600"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="px-5 pb-4">
          <p className="text-[10px] text-slate-600 text-center">
            Exports include {(config.items || []).length} items with your customization settings.
          </p>
        </div>
      </div>
    </div>
  );
}
