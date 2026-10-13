import React from "react";
import { FolderUp, Sparkles, Layers, HardDrive, ShieldCheck, Zap } from "lucide-react";

export function FileSystemBreadcrumbs({ onHome }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Home
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Components
      </button>
      <span>/</span>
      <span className="font-medium text-white">File System</span>
    </div>
  );
}

export function FileSystemHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-6 shadow-xl shadow-black/10 sm:px-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-emerald-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl" />

      <div className="relative flex items-center gap-5">
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-500 text-white shadow-xl shadow-emerald-500/25 sm:flex">
          <FolderUp className="h-7 w-7" />
        </div>

        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            18 Production Patterns · Unified File System Foundation
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            File System &amp;{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
              Upload Architecture
            </span>
          </h1>

          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
            Production-ready file upload workflows, drag-and-drop targets, batch queues, strict MIME &amp; dimension validation, client-side canvas crop, and memory-safe preview pipelines.
          </p>
        </div>
      </div>
    </header>
  );
}

export function FileSystemStatsBar({ totalCount = 18 }) {
  const stats = [
    { label: "Components", value: totalCount, icon: Layers, color: "text-emerald-400" },
    { label: "Client Processing", value: "Crop & Compress", icon: Zap, color: "text-indigo-400" },
    { label: "Upload Engine", value: "Abort & Retry", icon: HardDrive, color: "text-cyan-400" },
    { label: "Validation Engine", value: "MIME & Dimensions", icon: ShieldCheck, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3.5"
          >
            <div className={`rounded-lg bg-slate-800/80 p-2 ${stat.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{stat.value}</p>
              <p className="text-[11px] text-slate-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
