import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sparkles, ArrowRight, Check, Sliders, Copy } from "lucide-react";

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
  const highlightedStep = themeContext?.highlightedStep || 1;
  const setHighlightedStep = themeContext?.setHighlightedStep || (() => {});

  // Optional: Loading state check
  if (!themeContext?.tokens) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading Theme Tokens...
      </div>
    );
  }
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
    </div>
  );
};
