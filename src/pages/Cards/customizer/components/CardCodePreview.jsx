import React, { useState, useMemo } from "react";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "../cardCodeGenerator";
import { serializeConfig, parseImportedConfig, toPascalCase } from "../cardCustomizationUtils";
import { downloadFile } from "../cardExportService";
import { copyToClipboard } from "@/utils/installContract";
import { Copy, Check, Download, Upload, FileCode } from "lucide-react";

export default function CardCodePreview({ config, onLoadConfig }) {
  const [activeTab, setActiveTab] = useState("react"); // 'react' | 'react-css' | 'html' | 'json'
  const [copied, setCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const componentName = toPascalCase(config.name || "CustomCard");

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
            { id: "react-css", label: "React + CSS" },
            { id: "html", label: "HTML / CSS" },
            { id: "json", label: "Config (JSON)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors shrink-0 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Import configuration JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Stage */}
      <div className="flex-1 p-4 overflow-auto [scrollbar-width:thin] [scrollbar-color:#334155_transparent] bg-[#090d16] font-mono text-xs text-slate-300 leading-relaxed select-text">
        <pre className="whitespace-pre overflow-x-auto">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Import Configuration JSON Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-indigo-400" />
                <span>Import Card Configuration</span>
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
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
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{ "schemaVersion": "1.0.0", "card": { ... } }'
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
            />

            {importError && (
              <p className="text-xs text-rose-400 font-medium">⚠️ {importError}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
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
