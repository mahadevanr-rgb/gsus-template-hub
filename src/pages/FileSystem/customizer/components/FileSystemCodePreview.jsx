import React, { useState, useMemo } from "react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../fileSystemCodeGenerator";
import {
  serializeConfig,
  parseImportedConfig,
  toPascalCase,
} from "../fileSystemCustomizationUtils";
import { downloadFile } from "../fileSystemExportService";
import { copyToClipboard } from "@/utils/installContract";
import { Copy, Check, Download, Upload, FileCode } from "lucide-react";

export default function FileSystemCodePreview({ config, onLoadConfig }) {
  const [activeTab, setActiveTab] = useState("react"); // 'react' | 'react-css' | 'html' | 'json'
  const [copied, setCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const componentName = toPascalCase(config.name || "CustomFileUploader");

  // Dynamically generate code based on current config
  const generated = useMemo(() => {
    const reactJsx = generateReactCode(config);
    const { jsx: reactCssJsx, css: standaloneCss } = generateReactAndCss(config);
    const htmlCss = generateHtmlCss(config);
    const jsonConfig = serializeConfig(config);

    return {
      react: reactJsx,
      "react-css": `${reactCssJsx}\n\n/* ========================================= */\n/* ${componentName}.css */\n/* ========================================= */\n\n${standaloneCss}`,
      html: htmlCss,
      json: jsonConfig,
    };
  }, [config, componentName]);

  const currentCode = generated[activeTab] || "";

  const handleCopy = async () => {
    await copyToClipboard(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    switch (activeTab) {
      case "react":
        downloadFile(`${componentName}.jsx`, generated.react, "text/javascript;charset=utf-8");
        break;
      case "html":
        downloadFile("index.html", generated.html, "text/html;charset=utf-8");
        break;
      case "json":
        downloadFile(`${componentName}.config.json`, generated.json, "application/json;charset=utf-8");
        break;
      case "react-css":
        downloadFile(`${componentName}.jsx`, generated["react-css"], "text/javascript;charset=utf-8");
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

  return (
    <div className="w-full h-full flex flex-col bg-[#0b0f19] overflow-hidden select-none">
      {/* Top Code Tabs & Actions Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1322] border-b border-slate-800 text-xs shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {[
            { id: "react", label: "React (JSX)" },
            { id: "react-css", label: "React + Scoped CSS" },
            { id: "html", label: "HTML / CSS / JS" },
            { id: "json", label: "Config (JSON)" },
          ].map((tab) => (
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

        {/* Action Buttons: Import, Download, Copy */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onLoadConfig && (
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Import JSON configuration"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Import</span>
            </button>
          )}

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Download active file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white shadow-sm transition-all cursor-pointer ${
              copied
                ? "bg-emerald-600"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Textarea / Viewer */}
      <div className="flex-1 relative overflow-auto p-4 bg-[#080c14] font-mono text-[12px] leading-relaxed text-slate-300 select-text">
        <pre className="m-0 whitespace-pre font-mono">{currentCode}</pre>
      </div>

      {/* JSON Import Modal Dialog */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Import Configuration JSON</h3>
              </div>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError("");
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Paste the exported JSON configuration below to reopen and customize this design.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => {
                setImportJsonText(e.target.value);
                setImportError("");
              }}
              placeholder='{\n  "schemaVersion": "1.0.0",\n  "component": { ... }\n}'
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            {importError && (
              <p className="text-xs text-rose-400 font-medium">{importError}</p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm cursor-pointer"
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
