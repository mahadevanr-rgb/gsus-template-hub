import React from "react";

export default function ThemePreview({ id }) {
  switch (id) {
    /* 01 Color Palette */
    case "color-palette":
      return (
        <div className="grid grid-cols-4 gap-2 p-1">
          {[
            { label: "Primary", color: "#6366F1" },
            { label: "Secondary", color: "#8B5CF6" },
            { label: "Accent", color: "#06B6D4" },
            { label: "Success", color: "#10B981" },
            { label: "Warning", color: "#F59E0B" },
            { label: "Error", color: "#EF4444" },
            { label: "Neutral", color: "#64748B" },
            { label: "Surface", color: "#0B1426" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="h-8 w-full rounded-md border border-white/10 shadow-inner"
                style={{ backgroundColor: item.color }}
              />
              <span className="mt-1 block text-[10px] text-slate-400 truncate">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      );

    /* 02 Spacing Scale */
    case "spacing-scale":
      return (
        <div className="flex items-end justify-between h-20 px-2 py-1">
          {[4, 8, 12, 16, 20, 24, 32, 40].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div
                className="w-2.5 rounded-xs bg-indigo-500/50 border border-indigo-400/60"
                style={{ height: `${s * 1.5}px` }}
              />
              <span className="text-[9px] font-mono text-slate-500">{s}</span>
            </div>
          ))}
        </div>
      );

    /* 03 Border Radius */
    case "border-radius":
      return (
        <div className="flex items-center justify-around h-20 px-2">
          {[4, 8, 12, 16, 24].map((r) => (
            <div key={r} className="flex flex-col items-center gap-1.5">
              <div
                className="h-9 w-9 border-2 border-indigo-400/70 bg-indigo-500/10"
                style={{ borderRadius: `${r}px` }}
              />
              <span className="text-[9px] font-mono text-slate-400">{r}px</span>
            </div>
          ))}
        </div>
      );

    /* 04 Border System */
    case "border-system":
      return (
        <div className="grid grid-cols-2 gap-2 text-[10px] p-1">
          <div className="p-2 border border-slate-700 rounded-lg text-slate-300 text-center">
            Default (1px)
          </div>
          <div className="p-2 border border-slate-800 rounded-lg text-slate-400 text-center">
            Subtle (1px)
          </div>
          <div className="p-2 border-2 border-indigo-500 rounded-lg text-slate-200 text-center font-semibold">
            Strong (2px)
          </div>
          <div className="p-2 border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded-lg text-white text-center font-bold">
            Focus Ring
          </div>
        </div>
      );

    /* 05 Shadow System */
    case "shadow-system":
      return (
        <div className="flex items-center justify-around h-20">
          {["SM", "MD", "LG", "Glow"].map((sh) => (
            <div
              key={sh}
              className={`h-10 w-10 bg-slate-800/90 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-300 border border-slate-700/50 ${
                sh === "SM"
                  ? "shadow-sm"
                  : sh === "MD"
                    ? "shadow-md"
                    : sh === "LG"
                      ? "shadow-lg"
                      : "shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              }`}
            >
              {sh}
            </div>
          ))}
        </div>
      );

    /* 06 Typography */
    case "typography":
      return (
        <div className="space-y-1 p-1">
          <div className="text-base font-bold text-white">Heading 1</div>
          <div className="text-xs font-semibold text-slate-300">
            Body Text Style
          </div>
          <div className="text-[10px] text-slate-500">Caption Small Legend</div>
        </div>
      );

    /* 07 Component Defaults */
    case "component-defaults":
      return (
        <div className="flex flex-wrap items-center gap-2 p-1">
          <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition shadow">
            Primary Button
          </button>
          <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Active
          </span>
          <input
            type="checkbox"
            defaultChecked
            className="accent-indigo-500 h-4 w-4"
          />
        </div>
      );

    /* 08 Surface & Elevation */
    case "surface-elevation":
      return (
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] p-1">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
            Base
          </div>
          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 shadow-md">
            Elevated
          </div>
          <div className="p-3 bg-indigo-950/40 backdrop-blur-md border border-indigo-500/30 rounded-lg text-indigo-300">
            Glass
          </div>
        </div>
      );

    /* 09 Dark Theme Tokens */
    case "dark-theme-tokens":
      return (
        <div className="text-[11px] font-mono space-y-1.5 p-1 text-slate-400">
          <div className="flex justify-between">
            <span>--bg:</span> <span className="text-indigo-400">#020817</span>
          </div>
          <div className="flex justify-between">
            <span>--surface:</span>{" "}
            <span className="text-indigo-400">#0B1426</span>
          </div>
          <div className="flex justify-between">
            <span>--border:</span>{" "}
            <span className="text-indigo-400">#1E293B</span>
          </div>
        </div>
      );

    default:
      return <div className="text-xs text-slate-500">Preview Token Visual</div>;
  }
}
