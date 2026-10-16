import React, { useState } from "react";
import {
  X,
  FileCode,
  FileArchive,
  Download,
  Check,
  Code2,
  Globe,
  FileType,
  Sparkles,
} from "lucide-react";
import { downloadFile, downloadZipPackage } from "../cardExportService";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../cardCodeGenerator";
import { serializeConfig, toPascalCase } from "../cardCustomizationUtils";

export default function CardExportMenu({ config, onClose }) {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadedType, setDownloadedType] = useState(null);

  if (!config) return null;

  const componentName = toPascalCase(config.name || "CustomCard");

  const handleExportReact = () => {
    const code = generateReactCode(config);
    downloadFile(`${componentName}.jsx`, code, "text/javascript;charset=utf-8");
    flashDownloaded("react");
  };

  const handleExportReactCss = () => {
    const { jsx, css } = generateReactAndCss(config);
    downloadFile(`${componentName}.jsx`, jsx, "text/javascript;charset=utf-8");
    downloadFile(`${componentName}.css`, css, "text/css;charset=utf-8");
    flashDownloaded("react-css");
  };

  const handleExportHtml = () => {
    const html = generateHtmlCss(config);
    downloadFile("index.html", html, "text/html;charset=utf-8");
    flashDownloaded("html");
  };

  const handleExportJson = () => {
    const json = serializeConfig(config);
    downloadFile(`${componentName}.config.json`, json, "application/json;charset=utf-8");
    flashDownloaded("json");
  };

  const handleExportZip = async () => {
    try {
      setDownloadingZip(true);
      await downloadZipPackage(config);
      flashDownloaded("zip");
    } catch (err) {
      console.error("ZIP export failed:", err);
      alert("ZIP export failed. Please try downloading individual files.");
    } finally {
      setDownloadingZip(false);
    }
  };

  const flashDownloaded = (type) => {
    setDownloadedType(type);
    setTimeout(() => setDownloadedType(null), 2500);
  };

  const exportOptions = [
    {
      id: "zip",
      title: "Complete Project ZIP Package",
      subtitle: "Includes React JSX, CSS, index.html demo, README, and package.json",
      icon: FileArchive,
      highlight: true,
      badge: "Recommended",
      action: handleExportZip,
      loading: downloadingZip,
    },
    {
      id: "react",
      title: "React JSX Component (.jsx)",
      subtitle: "Self-contained component styled with Tailwind CSS & Lucide icons",
      icon: Code2,
      action: handleExportReact,
    },
    {
      id: "react-css",
      title: "React + Vanilla CSS (.jsx + .css)",
      subtitle: "React component paired with a separate standalone CSS stylesheet",
      icon: FileCode,
      action: handleExportReactCss,
    },
    {
      id: "html",
      title: "Standalone HTML & CSS (.html)",
      subtitle: "Single runnable HTML5 file with embedded CSS. Zero dependencies",
      icon: Globe,
      action: handleExportHtml,
    },
    {
      id: "json",
      title: "Card Configuration (.json)",
      subtitle: "Export card settings to reopen, share, or edit later in TemplateHub",
      icon: FileType,
      action: handleExportJson,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" />
              <span>Export "{config.name}"</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose your preferred export format for immediate use in external projects.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {exportOptions.map((opt) => {
            const Icon = opt.icon;
            const isDone = downloadedType === opt.id;
            return (
              <div
                key={opt.id}
                onClick={opt.loading ? undefined : opt.action}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  opt.highlight
                    ? "bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/20"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      opt.highlight
                        ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-white truncate">
                        {opt.title}
                      </h4>
                      {opt.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {opt.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : opt.highlight
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-800 group-hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    {isDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Downloaded!</span>
                      </>
                    ) : opt.loading ? (
                      <span>Packaging...</span>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-center text-[11px] text-slate-500">
          The exported code reflects all your custom styles, colors, dimensions, and typography.
        </div>
      </div>
    </div>
  );
}
