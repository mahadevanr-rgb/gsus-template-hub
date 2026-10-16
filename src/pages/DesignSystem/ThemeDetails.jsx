import React, { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Code2,
  Layers,
  Sliders,
} from "lucide-react";
import ThemePreview from "./ThemePreview";

export default function ThemeDetails({ selected, onBack, onNavigateHome }) {
  const [copied, setCopied] = useState(false);

  // Example detail data generator for each token category
  const getDetailInfo = (id) => {
    switch (id) {
      case "color-palette":
        return {
          title: "01 Color Palette",
          subtitle: "Global Color System & Custom Variables",
          cssCode: `:root {\n  --color-primary: #6366F1;\n  --color-secondary: #8B5CF6;\n  --color-accent: #06B6D4;\n  --color-success: #10B981;\n  --color-warning: #F59E0B;\n  --color-error: #EF4444;\n  --color-neutral: #64748B;\n}`,
        };
      case "spacing-scale":
        return {
          title: "02 Spacing Scale",
          subtitle: "Padding and Margin Tokens Scale",
          cssCode: `:root {\n  --spacing-xs: 4px;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 24px;\n  --spacing-xl: 32px;\n}`,
        };
      case "border-radius":
        return {
          title: "03 Border Radius",
          subtitle: "Corner Radius Scale",
          cssCode: `:root {\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 12px;\n  --radius-xl: 16px;\n  --radius-full: 9999px;\n}`,
        };
      default:
        return {
          title: "Design System Token",
          subtitle: "Global CSS Variables Mapped",
          cssCode: `:root {\n  --theme-token: active;\n}`,
        };
    }
  };

  const detail = getDetailInfo(selected);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(detail.cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Design Tokens
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-white">
            Home
          </button>
          <span>/</span>
          <span>Tokens</span>
          <span>/</span>
          <span className="text-indigo-400">{selected}</span>
        </div>
      </div>

      {/* Main Detail Header Card */}
      <div className="rounded-2xl border border-indigo-500/20 bg-slate-950/70 p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Token Deep Dive
            </div>
            <h1 className="text-2xl font-bold text-white">{detail.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{detail.subtitle}</p>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? "Variables Copied!" : "Copy CSS Code"}</span>
          </button>
        </div>
      </div>

      {/* Content Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Preview */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0B1426] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Live Token Preview
          </h3>
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 min-h-[180px] flex items-center justify-center">
            <ThemePreview id={selected} />
          </div>
        </div>

        {/* CSS Code Snippet */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0B1426] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" /> Token Definition (CSS
            Variables)
          </h3>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto">
            {detail.cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
