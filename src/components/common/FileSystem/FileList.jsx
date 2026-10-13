import React, { useRef } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  FileVideo,
  FileAudio,
  File as GenericFile,
  Trash2,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Repeat,
  Upload,
} from "lucide-react";
import { formatBytes, getFileCategory, getFileExtension } from "./fileUtils";
import UploadProgress from "./UploadProgress";

/**
 * FileListItem
 * Individual file row with icon, progress, status, retry, cancel, replace, and remove.
 */
export function FileListItem({
  fileRecord,
  onRemove,
  onReplace,
  onRetry,
  onCancel,
  onStartUpload,
  allowReplace = true,
  allowRemove = true,
}) {
  const replaceInputRef = useRef(null);

  const { id, name, size, category, status, progress, error, previewUrl, dimensions } = fileRecord;
  const ext = getFileExtension(name).replace(".", "").toUpperCase() || "FILE";

  const handleTriggerReplace = () => {
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0 && onReplace) {
      onReplace(id, e.target.files[0]);
    }
  };

  // Icon based on category
  const renderIcon = () => {
    if (category === "image" && previewUrl) {
      return (
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/80">
          <img src={previewUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      );
    }

    const iconMap = {
      pdf: { icon: FileText, bg: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
      spreadsheet: { icon: FileSpreadsheet, bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
      code: { icon: FileCode, bg: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
      archive: { icon: FileArchive, bg: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
      video: { icon: FileVideo, bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
      audio: { icon: FileAudio, bg: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
      document: { icon: FileText, bg: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    };

    const config = iconMap[category] || { icon: GenericFile, bg: "bg-slate-800 text-slate-400 border-slate-700" };
    const IconComp = config.icon;

    return (
      <div className={`w-10 h-10 rounded-xl ${config.bg} border flex items-center justify-center shrink-0`}>
        <IconComp className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700 space-y-2.5 shadow-sm">
      <input
        ref={replaceInputRef}
        type="file"
        className="hidden"
        tabIndex={-1}
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-between gap-3">
        {/* Left icon + metadata */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {renderIcon()}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate" title={name}>
                {name}
              </p>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase shrink-0">
                {ext}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{formatBytes(size)}</span>
              {dimensions && (
                <>
                  <span>•</span>
                  <span>{dimensions.width}×{dimensions.height}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {status === "uploading" && onCancel && (
            <button
              type="button"
              onClick={() => onCancel(id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Cancel Upload"
              aria-label="Cancel Upload"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}

          {(status === "error" || status === "canceled") && onRetry && (
            <button
              type="button"
              onClick={() => onRetry(id)}
              className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
              title="Retry Upload"
              aria-label="Retry Upload"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          {status === "selected" && onStartUpload && (
            <button
              type="button"
              onClick={() => onStartUpload(id)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 transition-colors"
              title="Start Upload"
            >
              <Upload className="w-3 h-3" />
              <span>Upload</span>
            </button>
          )}

          {allowReplace && onReplace && status !== "uploading" && (
            <button
              type="button"
              onClick={handleTriggerReplace}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Replace File"
              aria-label="Replace File"
            >
              <Repeat className="w-4 h-4" />
            </button>
          )}

          {allowRemove && onRemove && (
            <button
              type="button"
              onClick={() => onRemove(id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Remove File"
              aria-label="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Upload progress & error representation */}
      {(status === "uploading" || status === "error" || status === "canceled" || status === "success") && (
        <div className="pt-1">
          <UploadProgress
            progress={progress}
            status={status}
            error={error}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}

/**
 * FileList
 * Complete container for multiple file items with batch control header.
 */
export default function FileList({
  files = [],
  onRemove,
  onReplace,
  onRetry,
  onCancel,
  onStartUpload,
  onStartAllUploads,
  onClearAll,
  allowReplace = true,
  allowRemove = true,
  className = "",
}) {
  if (!files || files.length === 0) return null;

  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);
  const pendingCount = files.filter((f) => f.status === "selected" || f.status === "error" || f.status === "canceled").length;
  const uploadingCount = files.filter((f) => f.status === "uploading").length;

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Batch Actions Header */}
      <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200 dark:border-slate-800/80">
        <div className="text-slate-500 dark:text-slate-400 font-medium">
          <span>{files.length} {files.length === 1 ? "file" : "files"}</span>
          <span className="mx-1.5">·</span>
          <span>{formatBytes(totalBytes)}</span>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && onStartAllUploads && (
            <button
              type="button"
              onClick={onStartAllUploads}
              disabled={uploadingCount > 0}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors disabled:opacity-50"
            >
              Upload All ({pendingCount})
            </button>
          )}

          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium text-xs transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* List items */}
      <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-0.5">
        {files.map((fileRecord) => (
          <FileListItem
            key={fileRecord.id}
            fileRecord={fileRecord}
            onRemove={onRemove}
            onReplace={onReplace}
            onRetry={onRetry}
            onCancel={onCancel}
            onStartUpload={onStartUpload}
            allowReplace={allowReplace}
            allowRemove={allowRemove}
          />
        ))}
      </div>
    </div>
  );
}
