import React, { useState } from "react";
import {
  X,
  Download,
  FileCode,
  FileJson,
  Package,
  Check,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../navigationCodeGenerator";
import {
  toPascalCase,
  toSlug,
  serializeNavigationConfig,
} from "../navigationCustomizationUtils";
import {
  downloadFile,
  exportNavigationZipPackage,
} from "../navigationExportService";

export default function NavigationExportMenu({ config, onClose }) {
  const [exportingZip, setExportingZip] = useState(false);
  const [downloadedAction, setDownloadedAction] = useState(null);

  const componentName = toPascalCase(config.name || "CustomNavigation");
  const slug = toSlug(config.name || "custom-navigation");

  const handleDownloadReact = () => {
    const code = generateReactCode(config);
    downloadFile(`${componentName}.jsx`, code, "text/javascript;charset=utf-8");
    flashFeedback("react");
  };

  const handleDownloadReactCss = () => {
    const { jsx, css } = generateReactAndCss(config);
    downloadFile(`${componentName}.jsx`, jsx, "text/javascript;charset=utf-8");
    downloadFile(`${componentName}.css`, css, "text/css;charset=utf-8");
    flashFeedback("react-css");
  };

  const handleDownloadHtml = () => {
    const html = generateHtmlCss(config);
    downloadFile("index.html", html, "text/html;charset=utf-8");
    flashFeedback("html");
  };

  const handleDownloadJson = () => {
    const json = serializeNavigationConfig(config);
    downloadFile("navigation.config.json", json, "application/json;charset=utf-8");
    flashFeedback("json");
  };

  const handleDownloadZip = async () => {
    setExportingZip(true);
    try {
      await exportNavigationZipPackage(config);
      flashFeedback("zip");
    } catch (err) {
      console.error("ZIP export failed:", err);
    } finally {
      setExportingZip(false);
    }
  };

  const flashFeedback = (id) => {
    setDownloadedAction(id);
    setTimeout(() => setDownloadedAction(null), 2500);
  };

  const exportOptions = [
    {
      id: "react",
      title: "React Component (JSX)",
      description: "Standalone React 18/19 component with embedded responsive styles and active state logic.",
      icon: FileCode,
      action: handleDownloadReact,
      badge: "Recommended",
    },
    {
      id: "react-css",
      title: "React + Scoped CSS",
      description: "Separate JSX component and CustomNavigation.css bundle for modular stylesheets.",
      icon: FileText,
      action: handleDownloadReactCss,
    },
    {
      id: "html",
      title: "Standalone HTML & CSS",
      description: "Vanilla markup ready for non-React static sites, emails, or CMS prototypes.",
      icon: FileCode,
      action: handleDownloadHtml,
    },
    {
      id: "json",
      title: "Configuration JSON",
      description: "Schema-validated template config that can be re-imported into TemplateHub anytime.",
      icon: FileJson,
      action: handleDownloadJson,
    },
    {
      id: "zip",
      title: "Complete Project Bundle (.zip)",
      description: "ZIP containing JSX, CSS, JSON, README.md with route integration docs, and package.json.",
      icon: Package,
      action: handleDownloadZip,
      highlight: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1322] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Export Navigation Component</h3>
              <p className="text-[11px] text-slate-400">
                Choose an export format for {config.name}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options list */}
        <div className="p-6 space-y-3">
          {exportOptions.map((opt) => {
            const Icon = opt.icon;
            const isDone = downloadedAction === opt.id;
            return (
              <div
                key={opt.id}
                onClick={opt.action}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  opt.highlight
                    ? "bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border-indigo-500/40 hover:border-indigo-400"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      opt.highlight
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 text-slate-300 group-hover:text-indigo-400"
                    }`}
                  >
                    {opt.id === "zip" && exportingZip ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isDone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {opt.title}
                      </h4>
                      {opt.badge && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : opt.highlight
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    {isDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
