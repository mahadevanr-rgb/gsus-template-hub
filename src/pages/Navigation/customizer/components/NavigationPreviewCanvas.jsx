import React from "react";
import NavigationLiveRenderer from "./NavigationLiveRenderer";
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react";

export default function NavigationPreviewCanvas({
  config,
  viewportMode = "desktop",
  zoom = 100,
  onZoomChange,
  canvasBg = "dots",
  onCanvasBgChange,
}) {
  const getCanvasBackground = () => {
    switch (canvasBg) {
      case "dark":
        return "bg-[#090d16]";
      case "light":
        return "bg-slate-100 text-slate-900";
      case "gradient":
        return "bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950";
      case "grid":
        return "bg-slate-900 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px]";
      case "dots":
      default:
        return "bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:18px_18px]";
    }
  };

  const getViewportConstraints = () => {
    switch (viewportMode) {
      case "mobile":
        return {
          wrapperClass:
            "w-[375px] min-h-[667px] border-[6px] border-slate-800 rounded-[40px] shadow-2xl p-4 pt-8 bg-slate-900/90 relative flex flex-col justify-start overflow-hidden",
          label: "Mobile Viewport (375 × 667)",
          icon: Smartphone,
          notch: true,
        };
      case "tablet":
        return {
          wrapperClass:
            "w-[768px] min-h-[580px] border-[8px] border-slate-800 rounded-[32px] shadow-2xl p-6 bg-slate-900/90 relative flex flex-col justify-start overflow-hidden",
          label: "Tablet Viewport (768 × 1024)",
          icon: Tablet,
          notch: false,
        };
      case "desktop":
      default:
        return {
          wrapperClass:
            "w-full max-w-5xl min-h-[480px] rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 flex flex-col items-center justify-start shadow-xl backdrop-blur-xs relative",
          label: "Responsive Desktop (Fluid)",
          icon: Monitor,
          notch: false,
        };
    }
  };

  const viewportInfo = getViewportConstraints();
  const ViewportIcon = viewportInfo.icon;

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-hidden select-none transition-colors duration-300 ${getCanvasBackground()}`}
    >
      {/* Viewport Info Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 font-mono shadow-lg">
        <ViewportIcon className="w-3.5 h-3.5 text-indigo-400" />
        <span className="hidden sm:inline">{viewportInfo.label}</span>
        <span className="sm:hidden">{viewportMode.toUpperCase()}</span>
        <span className="text-slate-600">|</span>
        <span className="text-indigo-400">{zoom}%</span>
      </div>

      {/* Main Canvas Stage Container with generous pb-48 clearance to prevent dock overlaps */}
      <div className="w-full min-h-full flex flex-col items-center justify-start pt-16 pb-48 px-4 sm:px-8">
        <div
          className="transition-transform duration-200 ease-out origin-top flex items-start justify-center w-full"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className={viewportInfo.wrapperClass}>
            {/* Mobile notch indicator */}
            {viewportInfo.notch && (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center z-30">
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>
            )}

            {/* Live Navigation Component */}
            <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
              <NavigationLiveRenderer
                config={config}
                viewport={viewportMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Canvas Controls Dock (Zoom & Canvas Background) */}
      <div className="sticky sm:fixed lg:absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl text-xs select-none pointer-events-auto">
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-400 font-mono text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stage</span>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-0.5" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-0.5 bg-slate-950/60 rounded-xl p-0.5 border border-slate-800/60">
          <button
            type="button"
            onClick={() => onZoomChange && onZoomChange(Math.max(50, zoom - 10))}
            disabled={zoom <= 50}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <button
            type="button"
            onClick={() => onZoomChange && onZoomChange(100)}
            className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-indigo-400 transition-colors"
            title="Reset Zoom to 100%"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={() => onZoomChange && onZoomChange(Math.min(150, zoom + 10))}
            disabled={zoom >= 150}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-0.5" />

        {/* Canvas Background Presets */}
        <div className="flex items-center gap-1 bg-slate-950/60 rounded-xl p-1 border border-slate-800/60">
          {[
            { id: "dots", label: "Dots", color: "#334155" },
            { id: "grid", label: "Grid", color: "#1e293b" },
            { id: "dark", label: "Dark", color: "#090d16" },
            { id: "light", label: "Light", color: "#e2e8f0" },
            { id: "gradient", label: "Gradient", color: "#4338ca" },
          ].map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => onCanvasBgChange && onCanvasBgChange(bg.id)}
              className={`w-5 h-5 rounded-md transition-all flex items-center justify-center ${
                canvasBg === bg.id
                  ? "ring-2 ring-indigo-500 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: bg.color }}
              title={`Canvas: ${bg.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
