import React from "react";
import OverlayLiveRenderer from "./OverlayLiveRenderer";
import {
  CanvasZoomControls,
  CanvasBackdropSelector,
} from "../../../../components/common/Customizer/CustomizerPrimitives";
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
} from "lucide-react";

export default function OverlayPreviewCanvas({
  config,
  isOpen,
  onOpen,
  onClose,
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
            "w-full max-w-4xl min-h-[500px] rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 p-6 flex flex-col items-center justify-start shadow-xl backdrop-blur-xs relative",
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
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono shadow-lg">
        <ViewportIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
        <span className="hidden sm:inline">{viewportInfo.label}</span>
        <span className="sm:hidden">{viewportMode.toUpperCase()}</span>
        <span className="text-slate-400 dark:text-slate-600">|</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{zoom}%</span>
        {isOpen && (
          <>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </>
        )}
      </div>

      {/* Main Stage Container with pb-40 clearance to prevent floating dock overlaps */}
      <div className="w-full min-h-full flex flex-col items-center justify-start pt-16 pb-40 px-4 sm:px-8">
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

            {/* Live Overlay Component */}
            <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
              <OverlayLiveRenderer
                config={config}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                viewport={viewportMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Canvas Controls Dock */}
      <div className="sticky sm:fixed lg:absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl text-xs select-none pointer-events-auto">
        {/* Toggle Overlay Trigger State */}
        <button
          type="button"
          onClick={() => (isOpen ? onClose() : onOpen())}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
            isOpen
              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
          }`}
          title={isOpen ? "Close test overlay" : "Open test overlay"}
        >
          <Eye size={14} />
          <span>{isOpen ? "Close Preview" : "Trigger Overlay"}</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Zoom Controls */}
        <CanvasZoomControls
          zoom={zoom}
          onZoomChange={onZoomChange}
          min={50}
          max={150}
          step={10}
        />

        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Canvas Background Presets */}
        <CanvasBackdropSelector
          canvasBg={canvasBg}
          onCanvasBgChange={onCanvasBgChange}
        />
      </div>
    </div>
  );
}
