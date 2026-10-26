import React, { useState, useMemo } from "react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../navigationCodeGenerator";
import {
  serializeNavigationConfig,
  parseImportedNavigationConfig,
  toPascalCase,
} from "../navigationCustomizationUtils";
import { downloadFile } from "../navigationExportService";
import { copyToClipboard } from "@/utils/installContract";
import { Copy, Check, Download, Upload, FileCode } from "lucide-react";

export default function NavigationCodePreview({ config, onLoadConfig }) {
  const [activeTab, setActiveTab] = useState("react");
  const [copied, setCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const componentName = toPascalCase(config.name || "CustomNavigation");

  const generated = useMemo(() => {
    try {
      const reactJsx = generateReactCode(config);
      const { jsx: reactCssJsx, css: standaloneCss } = generateReactAndCss(config);
      const htmlCss = generateHtmlCss(config);
      const jsonConfig = serializeNavigationConfig(config);

      return {
        react: reactJsx,
        "react-css": `${reactCssJsx}\n\n/* =============================== */\n/* ${componentName}.css             */\n/* =============================== */\n\n${standaloneCss}`,
        html: htmlCss,
        json: jsonConfig,
        error: null,
      };
    } catch (err) {
      return {
        react: "",
        "react-css": "",
        html: "",
        json: "",
        error: err.message || "Code generation failed.",
      };
    }
  }, [config, componentName]);

  const currentCode = generated[activeTab] || "";

  const handleCopy = async () => {
    try {
      await copyToClipboard(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }
  };

  const handleDownload = () => {
    const filenames = {
      react: `${componentName}.jsx`,
      "react-css": `${componentName}-bundle.txt`,
      html: "index.html",
      json: "navigation.config.json",
    };
    const mimeTypes = {
      react: "text/javascript;charset=utf-8",
      "react-css": "text/plain;charset=utf-8",
      html: "text/html;charset=utf-8",
      json: "application/json;charset=utf-8",
    };
    downloadFile(
      filenames[activeTab] || `${componentName}.txt`,
      currentCode,
      mimeTypes[activeTab] || "text/plain;charset=utf-8"
    );
  };

  const handleImportSubmit = () => {
    setImportError("");
    const result = parseImportedNavigationConfig(importJsonText);
    if (!result.success) {
      setImportError(result.error);
      return;
    }
    if (onLoadConfig) {
      onLoadConfig(result.config);
    }
    setShowImportModal(false);
    setImportJsonText("");
  };

  const tabs = [
    { id: "react", label: "React (JSX)" },
    { id: "react-css", label: "React + CSS" },
    { id: "html", label: "HTML/JS" },
    { id: "json", label: "Config JSON" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] text-slate-200 select-none">
      {/* Top Tabs Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1322] border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Import configuration JSON"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Download active file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all cursor-pointer ${
              copied
                ? "bg-emerald-600"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Code Editor / Viewer */}
      <div className="flex-1 min-h-0 overflow-auto p-4 font-mono text-xs custom-scrollbar bg-[#07090e]">
        {generated.error ? (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
            {generated.error}
          </div>
        ) : (
          <pre className="text-slate-300 leading-relaxed whitespace-pre font-mono select-text">
            <code>{currentCode}</code>
          </pre>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>Import Navigation Configuration</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Paste an exported <code className="text-indigo-300">navigation.config.json</code> payload to restore its settings.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON configuration here..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 resize-none select-text"
            />

            {importError && (
              <p className="text-xs text-rose-400 font-medium">{importError}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                disabled={!importJsonText.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40"
              >
                Load Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
