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
} from "lucide-react";
import { downloadFile, downloadZipPackage } from "../fileSystemExportService";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../fileSystemCodeGenerator";
import { serializeConfig, toPascalCase } from "../fileSystemCustomizationUtils";

export default function FileSystemExportMenu({ config, onClose }) {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadedType, setDownloadedType] = useState(null);

  if (!config) return null;

  const componentName = toPascalCase(config.name || "CustomFileUploader");

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
      subtitle: "Includes React JSX, Scoped CSS, standalone index.html demo, README, and package.json",
      icon: FileArchive,
      highlight: true,
      badge: "Recommended",
      action: handleExportZip,
      loading: downloadingZip,
    },
    {
      id: "react",
      title: "React JSX Component (.jsx)",
      subtitle: "Fully functional file uploader with validation, drag & drop, and preview logic",
      icon: Code2,
      action: handleExportReact,
    },
    {
      id: "react-css",
      title: "React + Scoped CSS (.jsx + .css)",
      subtitle: "React component paired with a portable, scoped CSS stylesheet",
      icon: FileCode,
      action: handleExportReactCss,
    },
    {
      id: "html",
      title: "Standalone HTML & Vanilla JS (.html)",
      subtitle: "Zero-dependency single HTML file with drag-and-drop, validation, and previews",
      icon: Globe,
      action: handleExportHtml,
    },
    {
      id: "json",
      title: "Configuration JSON (.json)",
      subtitle: "Raw configuration file. Can be re-imported into TemplateHub at any time",
      icon: FileType,
      action: handleExportJson,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" />
              <span>Export Custom File Component</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose your preferred format to integrate into your application.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {exportOptions.map((opt) => {
            const Icon = opt.icon;
            const isDone = downloadedType === opt.id;

            return (
              <div
                key={opt.id}
                onClick={opt.action}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                  opt.highlight
                    ? "bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border-emerald-500/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      opt.highlight
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs sm:text-sm text-white truncate">
                        {opt.title}
                      </h4>
                      {opt.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {opt.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {opt.loading ? (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : isDone ? (
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Exported filename: <strong className="text-slate-300 font-mono">{componentName}</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
