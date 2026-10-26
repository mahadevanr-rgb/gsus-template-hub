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
} from "../modalOverlayCodeGenerator";
import { serializeConfig, toPascalCase } from "../modalOverlayCustomizationUtils";
import {
  downloadFile,
  downloadZipPackage,
} from "../modalOverlayExportService";

export default function OverlayExportMenu({ config, onClose }) {
  const [downloading, setDownloading] = useState(null);

  const componentName = toPascalCase(config.name || "CustomOverlay");

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
          downloadFile(
            `${componentName}.jsx`,
            jsx,
            "text/javascript;charset=utf-8"
          );
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
            "overlay.config.json",
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
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export: " + (err.message || "Unknown error"));
    } finally {
      setTimeout(() => setDownloading(null), 800);
    }
  };

  const exportOptions = [
    {
      id: "react",
      title: "React Component (JSX)",
      description: "Self-contained component with inline styles and full focus/ESC handling.",
      icon: FileCode,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: "react-css",
      title: "React + External CSS",
      description: "Component file accompanied by dedicated scoped CSS stylesheet.",
      icon: FileCode,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "html",
      title: "Standalone HTML / JS",
      description: "Zero-dependency demo file. Open directly in any web browser.",
      icon: Globe,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "json",
      title: "Configuration JSON",
      description: "Full serialized specification. Import back into TemplateHub anytime.",
      icon: FileJson,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "zip",
      title: "Complete ZIP Package",
      description: "All formats combined with package.json and README documentation.",
      icon: Package,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      featured: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1322] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Export Overlay</h3>
              <p className="text-[11px] text-slate-400">
                Choose your preferred export format for {config.name}.
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

        <div className="p-6 space-y-2.5">
          {exportOptions.map((opt) => {
            const Icon = opt.icon;
            const isCurrent = downloading === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleExport(opt.id)}
                disabled={downloading !== null}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                  opt.featured
                    ? "border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${opt.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-white group-hover:text-indigo-300 transition-colors">
                        {opt.title}
                      </span>
                      {opt.featured && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-500 group-hover:text-white transition-colors">
                  {isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
