import React from "react";
import CardLiveRenderer from "./CardLiveRenderer";
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from "lucide-react";

export default function CardPreviewCanvas({
  config,
  viewportMode = "desktop",
  zoom = 100,
  onZoomChange,
  canvasBg = "dots",
  onCanvasBgChange,
  onPreviewAction,
}) {
  // Determine canvas background class / styling
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

  // Viewport container width constraints
  const getViewportConstraints = () => {
    switch (viewportMode) {
      case "mobile":
        return {
          wrapperClass: "w-[375px] min-h-[600px] border-[6px] border-slate-800 rounded-[40px] shadow-2xl p-4 pt-7 bg-slate-900/90 relative flex flex-col justify-center",
          label: "Mobile Viewport (375 × 667)",
          icon: Smartphone,
          notch: true,
        };
      case "tablet":
        return {
          wrapperClass: "w-[768px] min-h-[500px] border-[8px] border-slate-800 rounded-[32px] shadow-2xl p-6 bg-slate-900/90 relative flex flex-col justify-center",
          label: "Tablet Viewport (768 × 1024)",
          icon: Tablet,
          notch: false,
        };
      case "desktop":
      default:
        return {
          wrapperClass: "w-full max-w-4xl p-6 sm:p-12 flex flex-col items-center justify-center",
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
      className={`relative w-full h-full overflow-auto p-4 sm:p-8 select-none transition-colors duration-300 flex ${getCanvasBackground()}`}
    >
      {/* Viewport & Resolution Info Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 font-mono shadow-lg">
        <ViewportIcon className="w-3.5 h-3.5 text-indigo-400" />
        <span className="hidden sm:inline">{viewportInfo.label}</span>
        <span className="sm:hidden">{viewportMode.toUpperCase()}</span>
        <span className="text-slate-600">|</span>
        <span className="text-indigo-400">{zoom}%</span>
      </div>

      {/* Scaling Stage Centered */}
      <div className="m-auto flex items-center justify-center min-w-full py-8 pb-24">
        <div
          className="transition-transform duration-200 ease-out origin-center flex items-center justify-center w-full"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className={viewportInfo.wrapperClass}>
            {/* Mobile Shell Top Speaker / Notch */}
            {viewportInfo.notch && (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>
            )}

            {/* Actual Live Card */}
            <div className="w-full flex items-center justify-center">
              <CardLiveRenderer
                config={config}
                onPreviewAction={onPreviewAction}
                previewMode={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Canvas Controls Dock (Zoom & Canvas Backdrop) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-2xl text-xs select-none">
        {/* Zoom Out / Percent / Zoom In */}
        <div className="flex items-center gap-0.5 bg-slate-950/60 rounded-xl p-0.5 border border-slate-800/60">
          <button
            onClick={() => onZoomChange && onZoomChange(Math.max(50, zoom - 25))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onZoomChange && onZoomChange(100)}
            className="px-1.5 font-mono text-[11px] text-slate-300 hover:text-white text-center min-w-[36px] cursor-pointer"
            title="Reset Zoom to 100%"
          >
            {zoom}%
          </button>
          <button
            onClick={() => onZoomChange && onZoomChange(Math.min(125, zoom + 25))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-[1px] h-4 bg-slate-800" />

        {/* Canvas Backdrop Selector */}
        <div className="flex items-center gap-1">
          {[
            { id: "dots", label: "Dots" },
            { id: "dark", label: "Dark" },
            { id: "light", label: "Light" },
            { id: "gradient", label: "Mesh" },
          ].map((bg) => (
            <button
              key={bg.id}
              onClick={() => onCanvasBgChange && onCanvasBgChange(bg.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                canvasBg === bg.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
