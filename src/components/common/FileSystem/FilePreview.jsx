import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  FileVideo,
  FileAudio,
  File as GenericFile,
  Eye,
  Maximize2,
  X,
} from "lucide-react";
import { formatBytes, getFileCategory, getFileExtension } from "./fileUtils";

/**
 * FilePreview
 * Adaptive preview component for images, PDFs, code, spreadsheets, and documents.
 */
export default function FilePreview({
  file,
  previewUrl = null,
  dimensions = null,
  name = null,
  size = null,
  category = null,
  aspectRatio = "video", // "video" (16:9) | "square" (1:1) | "auto"
  allowEnlarge = true,
  className = "",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resolvedName = name || file?.name || "Uploaded file";
  const resolvedSize = size ?? file?.size ?? 0;
  const resolvedCategory = category || getFileCategory(file || resolvedName);
  const resolvedExt = getFileExtension(resolvedName).toUpperCase().replace(".", "") || "FILE";
  const resolvedUrl = previewUrl || (file instanceof Blob ? URL.createObjectURL(file) : null);

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    auto: "h-44",
  }[aspectRatio] || "aspect-video";

  // Category Icon & Color Mapping
  const getCategoryConfig = () => {
    switch (resolvedCategory) {
      case "pdf":
        return {
          icon: FileText,
          bg: "bg-rose-500/10 dark:bg-rose-950/40",
          border: "border-rose-500/30",
          color: "text-rose-600 dark:text-rose-400",
          badgeBg: "bg-rose-500/20 text-rose-500 dark:text-rose-300",
        };
      case "spreadsheet":
        return {
          icon: FileSpreadsheet,
          bg: "bg-emerald-500/10 dark:bg-emerald-950/40",
          border: "border-emerald-500/30",
          color: "text-emerald-600 dark:text-emerald-400",
          badgeBg: "bg-emerald-500/20 text-emerald-500 dark:text-emerald-300",
        };
      case "code":
        return {
          icon: FileCode,
          bg: "bg-purple-500/10 dark:bg-purple-950/40",
          border: "border-purple-500/30",
          color: "text-purple-600 dark:text-purple-400",
          badgeBg: "bg-purple-500/20 text-purple-500 dark:text-purple-300",
        };
      case "archive":
        return {
          icon: FileArchive,
          bg: "bg-amber-500/10 dark:bg-amber-950/40",
          border: "border-amber-500/30",
          color: "text-amber-600 dark:text-amber-400",
          badgeBg: "bg-amber-500/20 text-amber-500 dark:text-amber-300",
        };
      case "video":
        return {
          icon: FileVideo,
          bg: "bg-cyan-500/10 dark:bg-cyan-950/40",
          border: "border-cyan-500/30",
          color: "text-cyan-600 dark:text-cyan-400",
          badgeBg: "bg-cyan-500/20 text-cyan-500 dark:text-cyan-300",
        };
      case "audio":
        return {
          icon: FileAudio,
          bg: "bg-pink-500/10 dark:bg-pink-950/40",
          border: "border-pink-500/30",
          color: "text-pink-600 dark:text-pink-400",
          badgeBg: "bg-pink-500/20 text-pink-500 dark:text-pink-300",
        };
      case "document":
      default:
        return {
          icon: FileText,
          bg: "bg-blue-500/10 dark:bg-blue-950/40",
          border: "border-blue-500/30",
          color: "text-blue-600 dark:text-blue-400",
          badgeBg: "bg-blue-500/20 text-blue-500 dark:text-blue-300",
        };
    }
  };

  const config = getCategoryConfig();
  const IconComponent = config.icon;

  return (
    <>
      <div
        className={`
          relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800
          bg-slate-100/80 dark:bg-slate-900/90 w-full flex items-center justify-center group
          ${aspectClass} ${className}
        `}
      >
        {resolvedCategory === "image" && resolvedUrl ? (
          <>
            <img
              src={resolvedUrl}
              alt={resolvedName}
              className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Hover overlay with Enlarge button */}
            {allowEnlarge && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 rounded-xl bg-slate-900/90 text-white hover:bg-slate-800 hover:scale-110 transition-all shadow-lg text-xs flex items-center gap-1.5 font-medium"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            )}

            {/* Dimensions Badge */}
            {dimensions && (
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300">
                {dimensions.width} × {dimensions.height} px
              </div>
            )}
          </>
        ) : (
          /* Document/Fallback preview */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div
              className={`w-14 h-14 rounded-2xl ${config.bg} ${config.border} border flex items-center justify-center ${config.color} shadow-sm`}
            >
              <IconComponent className="w-7 h-7" />
            </div>

            <div className="space-y-1 max-w-[200px]">
              <span
                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.badgeBg}`}
              >
                {resolvedExt}
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {resolvedName}
              </p>
              {resolvedSize > 0 && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {formatBytes(resolvedSize)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enlarge Image Modal */}
      {isModalOpen && resolvedUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-950 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-300 font-medium">
              <span className="truncate max-w-md">{resolvedName}</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={resolvedUrl}
                alt={resolvedName}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
