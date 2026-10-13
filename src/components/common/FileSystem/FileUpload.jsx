import React, { useRef } from "react";
import { useFileManager } from "./useFileManager";
import FileDropZone from "./FileDropZone";
import FilePreview from "./FilePreview";
import UploadProgress from "./UploadProgress";
import {
  Trash2,
  Repeat,
  RefreshCw,
  XCircle,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { formatBytes } from "./fileUtils";

/**
 * FileUpload
 * High-level single file upload component with dropzone, preview, progress, remove, and replace.
 */
export default function FileUpload({
  accept = "*",
  maxSize = 10 * 1024 * 1024, // 10 MB default
  autoUpload = false,
  showPreview = true,
  allowReplace = true,
  allowRemove = true,
  disabled = false,
  title = null,
  description = null,
  uploadHandler = null,
  onFileChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  className = "",
}) {
  const replaceInputRef = useRef(null);

  const {
    files,
    isDragOver,
    addFiles,
    removeFile,
    replaceFile,
    retryUpload,
    cancelUpload,
    startUpload,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileManager({
    multiple: false,
    accept,
    maxSize,
    autoUpload,
    uploadHandler,
    onFilesChange: (fileList) => {
      if (onFileChange) onFileChange(fileList[0] || null);
    },
    onUploadSuccess,
    onUploadError,
  });

  const currentFile = files[0] || null;

  const handleTriggerReplace = () => {
    if (disabled) return;
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleReplaceInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0 && currentFile) {
      replaceFile(currentFile.id, e.target.files[0]);
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <input
        ref={replaceInputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleReplaceInputChange}
        className="hidden"
        tabIndex={-1}
      />

      {!currentFile ? (
        <FileDropZone
          onFilesSelected={addFiles}
          accept={accept}
          multiple={false}
          disabled={disabled}
          maxSize={maxSize}
          title={title}
          description={description}
          isDragOver={isDragOver}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      ) : (
        /* Selected file card */
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          {showPreview && (
            <div className="w-full">
              <FilePreview
                file={currentFile.file}
                previewUrl={currentFile.previewUrl}
                name={currentFile.name}
                size={currentFile.size}
                category={currentFile.category}
                dimensions={currentFile.dimensions}
                aspectRatio="auto"
              />
            </div>
          )}

          {/* File Information & Action Bar */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate" title={currentFile.name}>
                {currentFile.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {formatBytes(currentFile.size)} · {currentFile.category.toUpperCase()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {currentFile.status === "uploading" && (
                <button
                  type="button"
                  onClick={() => cancelUpload(currentFile.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}

              {(currentFile.status === "error" || currentFile.status === "canceled") && (
                <button
                  type="button"
                  onClick={() => retryUpload(currentFile.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}

              {currentFile.status === "selected" && (
                <button
                  type="button"
                  onClick={() => startUpload(currentFile.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              )}

              {allowReplace && currentFile.status !== "uploading" && (
                <button
                  type="button"
                  onClick={handleTriggerReplace}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Replace File"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              )}

              {allowRemove && currentFile.status !== "uploading" && (
                <button
                  type="button"
                  onClick={() => removeFile(currentFile.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {(currentFile.status === "uploading" ||
            currentFile.status === "error" ||
            currentFile.status === "canceled" ||
            currentFile.status === "success") && (
            <UploadProgress
              progress={currentFile.progress}
              status={currentFile.status}
              error={currentFile.error}
            />
          )}
        </div>
      )}
    </div>
  );
}
