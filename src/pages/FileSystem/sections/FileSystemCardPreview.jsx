import React from "react";
import {
  CloudUpload,
  Image as ImageIcon,
  Repeat,
  XCircle,
  RefreshCw,
  Crop,
  Sliders,
  User,
} from "lucide-react";

export default function FileSystemCardPreview({ id }) {
  switch (id) {
    case "basic-file-upload":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-1.5 text-center shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
              <CloudUpload className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-white">Single File Upload</p>
            <div className="w-24 h-1.5 bg-indigo-500/40 rounded-full mx-auto" />
          </div>
        </div>
      );
    case "multiple-file-upload":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1 text-center shadow-lg">
            <div className="flex justify-center gap-1">
              <span className="w-6 h-6 rounded bg-purple-500/20 text-[9px] text-purple-300 font-bold flex items-center justify-center">PDF</span>
              <span className="w-6 h-6 rounded bg-indigo-500/20 text-[9px] text-indigo-300 font-bold flex items-center justify-center">PNG</span>
              <span className="w-6 h-6 rounded bg-emerald-500/20 text-[9px] text-emerald-300 font-bold flex items-center justify-center">ZIP</span>
            </div>
            <p className="text-[10px] font-bold text-purple-300">Multi-File Queue (3 files)</p>
          </div>
        </div>
      );
    case "drag-drop-upload":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border-2 border-dashed border-blue-500/40 space-y-1 text-center">
            <p className="text-[10px] font-bold text-blue-300">Drag &amp; Drop Target</p>
            <p className="text-[8px] text-slate-400">or click to browse</p>
          </div>
        </div>
      );
    case "image-upload":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="text-left text-[9px]">
              <p className="font-bold text-emerald-300">banner.webp</p>
              <p className="text-slate-400">1920 × 1080 px</p>
            </div>
          </div>
        </div>
      );
    case "document-upload":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-teal-500/30 flex items-center justify-between text-[9px]">
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">PDF</span>
            <span className="text-slate-300 font-semibold truncate max-w-[90px]">contract_v2.pdf</span>
            <span className="text-teal-400 font-mono">1.8 MB</span>
          </div>
        </div>
      );
    case "image-preview":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1 text-center">
            <div className="w-20 h-7 bg-cyan-500/10 border border-cyan-500/20 rounded mx-auto flex items-center justify-center text-[9px] text-cyan-300 font-mono">
              1080p Preview
            </div>
            <p className="text-[9px] text-slate-400">Fullscreen Inspection</p>
          </div>
        </div>
      );
    case "file-preview":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-fuchsia-500/30 flex justify-center gap-1.5 text-[8px] font-bold">
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">PDF</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">XLSX</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">CODE</span>
          </div>
        </div>
      );
    case "file-list":
      return (
        <div className="w-full px-3 py-1 space-y-1">
          <div className="p-1.5 rounded-lg bg-slate-950 border border-amber-500/30 flex items-center justify-between text-[8px]">
            <span className="text-white font-semibold">assets.zip</span>
            <span className="text-amber-400">Uploading 65%</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[8px]">
            <span className="text-slate-300">doc.pdf</span>
            <span className="text-emerald-400">Complete</span>
          </div>
        </div>
      );
    case "remove-replace":
      return (
        <div className="w-full px-3 py-1 flex justify-center gap-2">
          <div className="p-2 rounded-xl bg-slate-950 border border-orange-500/30 flex items-center gap-1.5 text-[9px] text-orange-300">
            <Repeat className="w-3 h-3" />
            <span>Replace In-Place</span>
          </div>
        </div>
      );
    case "upload-progress":
      return (
        <div className="w-full px-3 py-1 space-y-1">
          <div className="flex justify-between text-[8px] text-indigo-300">
            <span>Progress Bar</span>
            <span className="font-mono">75%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
        </div>
      );
    case "upload-cancel":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="p-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-1 text-[9px] text-rose-300">
            <XCircle className="w-3 h-3" />
            <span>AbortController Signal</span>
          </div>
        </div>
      );
    case "upload-retry":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center gap-1 text-[9px] text-purple-300">
            <RefreshCw className="w-3 h-3" />
            <span>One-Click Retry</span>
          </div>
        </div>
      );
    case "file-type-validation":
      return (
        <div className="w-full px-3 py-1 text-center">
          <div className="p-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-[9px] text-blue-300 font-semibold">
            Strict MIME / Accept Filter
          </div>
        </div>
      );
    case "file-size-validation":
      return (
        <div className="w-full px-3 py-1 text-center">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[9px] text-emerald-300 font-semibold">
            Max 2 MB Ceiling Enforced
          </div>
        </div>
      );
    case "image-dimension-validation":
      return (
        <div className="w-full px-3 py-1 text-center">
          <div className="p-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-[9px] text-teal-300 font-semibold">
            800 × 600 px Minimum
          </div>
        </div>
      );
    case "image-crop":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="p-2 rounded-xl bg-slate-950 border border-fuchsia-500/30 flex items-center gap-1.5 text-[9px] text-fuchsia-300 font-semibold">
            <Crop className="w-3 h-3" />
            <span>1:1 / 16:9 Canvas Crop</span>
          </div>
        </div>
      );
    case "image-compression":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="p-2 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center gap-1.5 text-[9px] text-cyan-300 font-semibold">
            <Sliders className="w-3 h-3" />
            <span>-65% Byte Optimizer</span>
          </div>
        </div>
      );
    case "avatar-upload":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center text-purple-300">
            <User className="w-5 h-5" />
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full px-3 py-1 text-center text-[10px] text-slate-500">
          Interactive File Component
        </div>
      );
  }
}
