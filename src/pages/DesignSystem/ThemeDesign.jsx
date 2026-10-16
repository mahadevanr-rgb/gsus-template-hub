import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  Sliders,
  Sparkles,
  X,
} from "lucide-react";

const colorLabels = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  success: "Success",
  warning: "Warning",
  error: "Error",
  neutral: "Neutral",
  background: "Background",
  surface: "Surface",
  border: "Border",
  text: "Text",
};

function createTokenCss(tokens) {
  const colors = Object.entries(tokens.colors)
    .map(([name, value]) => `  --color-${name}: ${value};`)
    .join("\n");
  const typography = tokens.typography || {};

  return `:root {
${colors}
  --theme-radius: ${tokens.radius}px;
  --theme-spacing: ${tokens.spacing}px;
  --theme-shadow: ${getShadowValue(tokens.shadow, tokens.colors.primary)};
  --theme-border-style: ${tokens.borderStyle || "solid"};
  --font-family: ${typography.fontFamily || "Inter, sans-serif"};
  --font-h1-size: ${typography.h1Size || "32px"};
  --font-h2-size: ${typography.h2Size || "24px"};
  --font-h3-size: ${typography.h3Size || "20px"};
  --font-body-size: ${typography.bodySize || "16px"};
  --font-caption-size: ${typography.captionSize || "12px"};
}

/* Example usage */
body {
  font-family: var(--font-family);
  font-size: var(--font-body-size);
  color: var(--color-text);
  background: var(--color-background);
}

.button-primary {
  background: var(--color-primary);
  border-radius: var(--theme-radius);
  box-shadow: var(--theme-shadow);
}`;
}

function getShadowValue(shadow, primaryColor) {
  const shadows = {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
    glow: `0 0 20px ${primaryColor}66`,
  };
  return shadows[shadow] || shadows.lg;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function ColorTokenControl({ name, value, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
      <span className="text-xs font-medium text-slate-300">{colorLabels[name] || name}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-slate-500">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent"
          aria-label={`${colorLabels[name] || name} color`}
        />
      </span>
    </label>
  );
}

export const ThemeFormDesign = () => {
  const themeContext = useTheme();
  const tokens = themeContext?.tokens || {
    colors: {},
    radius: 8,
    spacing: 16,
    shadow: "md",
  };

  const updateColor = themeContext?.updateColor || (() => {});
  const setIsCustomizerOpen = themeContext?.setIsCustomizerOpen || (() => {});
  const isCustomizerOpen = themeContext?.isCustomizerOpen || false;
  const updateRadius = themeContext?.updateRadius || (() => {});
  const updateSpacing = themeContext?.updateSpacing || (() => {});
  const updateShadow = themeContext?.updateShadow || (() => {});
  const updateBorderStyle = themeContext?.updateBorderStyle || (() => {});
  const updateTypography = themeContext?.updateTypography || (() => {});
  const resetTheme = themeContext?.resetTheme || (() => {});
  const highlightedStep = themeContext?.highlightedStep || 1;
  const setHighlightedStep = themeContext?.setHighlightedStep || (() => {});
  const [exportStatus, setExportStatus] = useState("");

  // Optional: Loading state check
  if (!themeContext?.tokens) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading Theme Tokens...
      </div>
    );
  }
  const cssTokens = createTokenCss(tokens);

  const copyTokens = async () => {
    try {
      await navigator.clipboard.writeText(cssTokens);
      setExportStatus("copied");
    } catch (error) {
      console.error("Failed to copy design tokens:", error);
      setExportStatus("copy-error");
    }
  };

  const exportTokens = (format) => {
    try {
      if (format === "css") {
        downloadFile("design-tokens.css", cssTokens, "text/css");
      } else {
        downloadFile(
          "design-tokens.json",
          JSON.stringify(tokens, null, 2),
          "application/json",
        );
      }
      setExportStatus("downloaded");
    } catch (error) {
      console.error("Failed to export design tokens:", error);
      setExportStatus("download-error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/40 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              18 Theme & Design Tokens Live
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Theme & Design System
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Colors, spacing, radius, borders, shadows, typography, and
              reusable component defaults mapped through CSS custom variables.
            </p>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/30 whitespace-nowrap"
          >
            <Sliders className="w-4 h-4" />
            Customize System
          </button>
        </div>
      </div>

      {/* Grid 01 - 09 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 01 Color Palette */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              01
            </span>
            <span className="text-xs text-slate-400">Color Palette</span>
          </div>
          <div className="grid grid-cols-4 gap-3 pt-2">
            {Object.entries(tokens.colors)
              .slice(0, 8)
              .map(([key, value]) => (
                <div key={key} className="text-center group">
                  <div
                    className="w-full h-10 rounded-lg border border-white/10 shadow-inner mb-1.5 transition transform group-hover:scale-105"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-[10px] capitalize text-slate-400 block truncate">
                    {key}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono block">
                    {value}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* 02 Spacing Scale */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              02
            </span>
            <span className="text-xs text-slate-400">Spacing Scale</span>
          </div>
          <div className="flex items-end justify-between h-20 pt-4 px-2">
            {[4, 8, 12, 16, 20, 24, 32].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div
                  className="bg-indigo-500/40 border border-indigo-400/50 rounded-sm w-3"
                  style={{ height: `${s * 1.5}px` }}
                />
                <span className="text-[10px] text-slate-500">{s}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* 03 Border Radius */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              03
            </span>
            <span className="text-xs text-slate-400">Border Radius</span>
          </div>
          <div className="flex items-center justify-around pt-4">
            {[4, 8, 12, 16, 24].map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 border-2 border-indigo-400/60 bg-indigo-500/10"
                  style={{ borderRadius: `${r}px` }}
                />
                <span className="text-[10px] text-slate-400">{r}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* 04 Border System */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              04
            </span>
            <span className="text-xs text-slate-400">Border System</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-2 border border-slate-700 rounded-lg text-center text-xs text-slate-300">
              Default (1px)
            </div>
            <div className="p-2 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
              Subtle (1px)
            </div>
            <div className="p-2 border-2 border-indigo-500 rounded-lg text-center text-xs text-slate-200">
              Strong (2px)
            </div>
            <div className="p-2 border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded-lg text-center text-xs text-white">
              Focus Ring
            </div>
          </div>
        </div>

        {/* 05 Shadow System */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              05
            </span>
            <span className="text-xs text-slate-400">Shadow System</span>
          </div>
          <div className="flex items-center justify-around pt-3">
            {["SM", "MD", "LG", "Glow"].map((sh) => (
              <div
                key={sh}
                className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-300 shadow-xl border border-slate-700/50"
              >
                {sh}
              </div>
            ))}
          </div>
        </div>

        {/* 06 Typography */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              06
            </span>
            <span className="text-xs text-slate-400">Typography</span>
          </div>
          <div className="space-y-2 pt-1">
            <div className="text-xl font-bold text-white">H1 Heading</div>
            <div className="text-sm font-medium text-slate-300">
              Body Text Style
            </div>
            <div className="text-xs text-slate-500">Caption Small Legend</div>
          </div>
        </div>

        {/* 07 Component Defaults */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              07
            </span>
            <span className="text-xs text-slate-400">Component Previews</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              className="px-3 py-1.5 text-xs text-white rounded-lg transition"
              style={{
                backgroundColor: "var(--color-primary)",
                borderRadius: "var(--theme-radius)",
              }}
            >
              Primary Button
            </button>
            <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Active Badge
            </span>
          </div>
        </div>

        {/* 08 Surface & Elevation */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              08
            </span>
            <span className="text-xs text-slate-400">Surface & Elevation</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-2">
            <div className="p-3 bg-[#020817] border border-slate-800 rounded-lg text-slate-400">
              Base
            </div>
            <div className="p-3 bg-[#0B1426] border border-slate-700 rounded-lg text-slate-300 shadow-md">
              Elevated
            </div>
            <div className="p-3 bg-indigo-950/30 backdrop-blur-md border border-indigo-500/30 rounded-lg text-indigo-300">
              Glass
            </div>
          </div>
        </div>

        {/* 09 Dark Theme Tokens */}
        <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-5 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              09
            </span>
            <span className="text-xs text-slate-400">Active Global Engine</span>
          </div>
          <div className="text-xs space-y-1 text-slate-400 font-mono pt-1">
            <div className="flex justify-between">
              <span>--radius:</span>{" "}
              <span className="text-indigo-400">{tokens.radius}px</span>
            </div>
            <div className="flex justify-between">
              <span>--spacing:</span>{" "}
              <span className="text-indigo-400">{tokens.spacing}px</span>
            </div>
            <div className="flex justify-between">
              <span>--shadow:</span>{" "}
              <span className="text-indigo-400">{tokens.shadow}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Theme Flow Diagram */}
      <div className="bg-[#0B1426] border border-[#1E293B] rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-white">
          Complete Theme Flow
        </h3>
        <p className="text-xs text-slate-400">
          From low-level design tokens to fully compiled product UI screens.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {[
            {
              id: 1,
              title: "1. Design Tokens",
              desc: "Colors, Spacing, Radius",
            },
            { id: 2, title: "2. Components", desc: "Buttons, Badges, Inputs" },
            { id: 3, title: "3. Layouts", desc: "Grids, Cards & Panels" },
            {
              id: 4,
              title: "4. Final Dashboard",
              desc: "Complete Application",
            },
          ].map((step) => (
            <div
              key={step.id}
              onClick={() => setHighlightedStep(step.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                highlightedStep === step.id
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
            >
              <div className="text-xs font-bold text-indigo-400 mb-1">
                {step.title}
              </div>
              <div className="text-[11px] text-slate-400">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {isCustomizerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close theme customizer"
            onClick={() => setIsCustomizerOpen(false)}
            className="absolute inset-0 cursor-default"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-customizer-title"
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border-l border-slate-700 bg-[#0b0f19] shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-[#0d1322] px-5 py-4">
              <div>
                <h2 id="theme-customizer-title" className="text-base font-bold text-white">Customize Design Tokens</h2>
                <p className="mt-1 text-xs text-slate-400">Changes apply live and save automatically in this browser.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_340px]">
              <div className="space-y-6 p-5">
                <section className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Color palette</h3>
                    <p className="text-xs text-slate-500">Set the colors used by your project components.</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(tokens.colors).map(([name, value]) => (
                      <ColorTokenControl
                        key={name}
                        name={name}
                        value={value}
                        onChange={(color) => updateColor(name, color)}
                      />
                    ))}
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="flex justify-between text-xs font-medium text-slate-300"><span>Border radius</span><span className="font-mono text-indigo-300">{tokens.radius}px</span></span>
                    <input type="range" min="0" max="32" value={tokens.radius} onChange={(event) => updateRadius(Number(event.target.value))} className="w-full accent-indigo-500" />
                  </label>
                  <label className="space-y-2">
                    <span className="flex justify-between text-xs font-medium text-slate-300"><span>Base spacing</span><span className="font-mono text-indigo-300">{tokens.spacing}px</span></span>
                    <input type="range" min="4" max="40" step="2" value={tokens.spacing} onChange={(event) => updateSpacing(Number(event.target.value))} className="w-full accent-indigo-500" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs font-medium text-slate-300">Shadow style</span>
                    <select value={tokens.shadow} onChange={(event) => updateShadow(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                      {["xs", "sm", "md", "lg", "xl", "glow"].map((shadow) => <option key={shadow} value={shadow}>{shadow.toUpperCase()}</option>)}
                    </select>
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-xs font-medium text-slate-300">Border style</span>
                    <select value={tokens.borderStyle || "solid"} onChange={(event) => updateBorderStyle(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                      {["solid", "subtle", "strong", "focus", "gradient"].map((style) => <option key={style} value={style}>{style[0].toUpperCase() + style.slice(1)}</option>)}
                    </select>
                  </label>
                </section>

                <section className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Typography</h3>
                    <p className="text-xs text-slate-500">Choose the font family and type scale.</p>
                  </div>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-slate-300">Font family</span>
                    <select
                      value={tokens.typography?.fontFamily || "Inter, sans-serif"}
                      onChange={(event) => updateTypography("fontFamily", event.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    >
                      {[
                        ["Inter, sans-serif", "Inter"],
                        ["system-ui, sans-serif", "System UI"],
                        ["Arial, sans-serif", "Arial"],
                        ["Georgia, serif", "Georgia"],
                        ["ui-monospace, monospace", "Monospace"],
                      ].map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["h1Size", "Heading 1"],
                      ["h2Size", "Heading 2"],
                      ["h3Size", "Heading 3"],
                      ["bodySize", "Body"],
                      ["captionSize", "Caption"],
                    ].map(([key, label]) => (
                      <label key={key} className="flex items-center justify-between gap-2 text-xs text-slate-300">
                        <span>{label}</span>
                        <input
                          type="number"
                          min="10"
                          max="64"
                          value={Number.parseInt(tokens.typography?.[key] || "16", 10)}
                          onChange={(event) => updateTypography(key, `${Math.min(64, Math.max(10, Number(event.target.value)))}px`)}
                          className="w-20 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-right text-slate-100"
                        />
                      </label>
                    ))}
                  </div>
                </section>

                <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                  <button type="button" onClick={() => exportTokens("css")} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"><Download className="h-3.5 w-3.5" />Export CSS</button>
                  <button type="button" onClick={() => exportTokens("json")} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"><Download className="h-3.5 w-3.5" />Export JSON</button>
                  <button type="button" onClick={copyTokens} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"><Copy className="h-3.5 w-3.5" />Copy CSS</button>
                  <button type="button" onClick={resetTheme} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"><RotateCcw className="h-3.5 w-3.5" />Reset defaults</button>
                </div>
                {exportStatus === "copied" && <p role="status" className="text-xs text-emerald-400">CSS tokens copied to clipboard.</p>}
                {exportStatus === "copy-error" && <p role="alert" className="text-xs text-rose-400">Could not access clipboard. Try exporting CSS instead.</p>}
                {exportStatus === "downloaded" && <p role="status" className="text-xs text-emerald-400">Token file downloaded and ready to add to your project.</p>}
                {exportStatus === "download-error" && <p role="alert" className="text-xs text-rose-400">Could not export the token file.</p>}
              </div>

              <aside className="space-y-4 border-t border-slate-800 bg-slate-950/60 p-5 lg:border-l lg:border-t-0">
                <div>
                  <h3 className="text-sm font-semibold text-white">Live preview</h3>
                  <p className="mt-1 text-xs text-slate-500">A sample component using your selected tokens.</p>
                </div>
                <div
                  className="space-y-4 border p-5"
                  style={{
                    background: tokens.colors.surface,
                    color: tokens.colors.text,
                    borderColor: tokens.colors.border,
                    borderRadius: `${tokens.radius}px`,
                    boxShadow: getShadowValue(tokens.shadow, tokens.colors.primary),
                    fontFamily: tokens.typography?.fontFamily,
                    gap: `${tokens.spacing}px`,
                  }}
                >
                  <div>
                    <p style={{ color: tokens.colors.primary, fontSize: tokens.typography?.h3Size }} className="font-semibold">Project preview</p>
                    <p style={{ color: tokens.colors.neutral, fontSize: tokens.typography?.bodySize }} className="mt-1">Preview typography, colors, radius, and shadows.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" style={{ background: tokens.colors.primary, borderRadius: `${tokens.radius}px`, boxShadow: getShadowValue(tokens.shadow, tokens.colors.primary) }} className="px-3 py-2 text-xs font-semibold text-white">Primary action</button>
                    <span style={{ color: tokens.colors.success, borderColor: tokens.colors.success, borderRadius: `${tokens.radius}px` }} className="border px-2.5 py-2 text-xs">Success</span>
                  </div>
                  <input
                    aria-label="Preview form field"
                    placeholder="Form input preview"
                    style={{ background: tokens.colors.background, color: tokens.colors.text, borderColor: tokens.colors.border, borderRadius: `${tokens.radius}px`, fontSize: tokens.typography?.bodySize }}
                    className="w-full border px-3 py-2"
                  />
                  <pre className="overflow-x-auto rounded-lg bg-black/20 p-3 text-[10px] text-slate-400">{cssTokens}</pre>
                </div>
              </aside>
            </div>

            <footer className="flex shrink-0 items-center justify-between border-t border-slate-800 bg-[#0d1322] px-5 py-3">
              <span className="text-[11px] text-slate-500">Tokens persist in this browser and update CSS variables live.</span>
              <button type="button" onClick={() => setIsCustomizerOpen(false)} className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700">
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
};
