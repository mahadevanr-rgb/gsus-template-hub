import React, { useState, useMemo } from "react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../accordionCodeGenerator";
import {
  serializeConfig,
  parseImportedConfig,
  toPascalCase,
} from "../accordionCustomizationUtils";
import { downloadFile } from "../accordionExportService";
import { copyToClipboard } from "@/utils/installContract";
import { Copy, Check, Download, Upload, FileCode } from "lucide-react";

export default function AccordionCodePreview({ config, onLoadConfig }) {
  const [activeTab, setActiveTab] = useState("react");
  const [copied, setCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const componentName = toPascalCase(config.name || "CustomAccordion");

  const generated = useMemo(() => {
    try {
      const reactJsx = generateReactCode(config);
      const { jsx: reactCssJsx, css: standaloneCss } = generateReactAndCss(config);
      const htmlCss = generateHtmlCss(config);
      const jsonConfig = serializeConfig(config);

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
    switch (activeTab) {
      case "react":
        downloadFile(`${componentName}.jsx`, generated.react, "text/javascript;charset=utf-8");
        break;
      case "react-css":
        downloadFile(`${componentName}.jsx`, generated["react-css"], "text/javascript;charset=utf-8");
        break;
      case "html":
        downloadFile("index.html", generated.html, "text/html;charset=utf-8");
        break;
      case "json":
        downloadFile(`accordion.config.json`, generated.json, "application/json;charset=utf-8");
        break;
      default:
        downloadFile(`${componentName}.jsx`, currentCode);
    }
  };

  const handleImport = () => {
    if (!importJsonText.trim()) {
      setImportError("Please paste a JSON configuration.");
      return;
    }

    const result = parseImportedConfig(importJsonText);
    if (!result.success) {
      setImportError(result.error);
      return;
    }

    onLoadConfig(result.config);
    setShowImportModal(false);
    setImportJsonText("");
    setImportError("");
  };

  const TABS = [
    { id: "react", label: "React (JSX)" },
    { id: "react-css", label: "React + CSS" },
    { id: "html", label: "HTML / JS" },
    { id: "json", label: "Config (JSON)" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0b0f19] overflow-hidden select-none">
      {/* Tabs & Actions Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1322] border-b border-slate-800 text-xs shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Import Config */}
          {onLoadConfig && (
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Import Config JSON"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Import</span>
            </button>
          )}

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Download File"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs text-white shadow-sm transition-all cursor-pointer ${
              copied
                ? "bg-emerald-600"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
            title="Copy to Clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {generated.error && (
        <div className="px-4 py-3 bg-rose-900/20 border-b border-rose-800 text-xs text-rose-400">
          ⚠ Code generation error: {generated.error}
        </div>
      )}

      {/* Code Display */}
      <div className="flex-1 min-h-0 overflow-auto [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
        <pre className="p-4 text-[11px] sm:text-xs leading-relaxed text-slate-300 font-mono whitespace-pre">
          {currentCode || "// No code generated yet."}
        </pre>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Import Configuration JSON</h3>
              </div>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError("");
                  setImportJsonText("");
                }}
                className="text-slate-400 hover:text-white text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-400">
                Paste a previously exported <code className="text-indigo-400">accordion.config.json</code> to restore a saved design.
              </p>
              <textarea
                value={importJsonText}
                onChange={(e) => {
                  setImportJsonText(e.target.value);
                  setImportError("");
                }}
                placeholder='{ "accordion": { "sourceComponentId": "simple-accordion", ... } }'
                rows={8}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono px-3 py-2.5 focus:outline-none focus:border-indigo-500 resize-none"
              />
              {importError && (
                <p className="text-xs text-rose-400">{importError}</p>
              )}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportError("");
                    setImportJsonText("");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                >
                  Import & Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
