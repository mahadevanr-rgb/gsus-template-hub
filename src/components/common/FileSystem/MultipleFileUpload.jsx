import React from "react";
import { useFileManager } from "./useFileManager";
import FileDropZone from "./FileDropZone";
import FileList from "./FileList";
import UploadProgress from "./UploadProgress";
import { Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { formatBytes } from "./fileUtils";

/**
 * MultipleFileUpload
 * Batch multiple-file upload component with individual status, progress, batch controls, and limits.
 */
export default function MultipleFileUpload({
  accept = "*",
  maxSize = 25 * 1024 * 1024, // 25 MB
  maxFiles = 10,
  autoUpload = false,
  allowReplace = true,
  allowRemove = true,
  disabled = false,
  title = "Upload project files",
  description = null,
  uploadHandler = null,
  onFilesChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  simulateFailureFor = [],
  className = "",
}) {
  const {
    files,
    isDragOver,
    globalError,
    isUploading,
    overallProgress,
    totalFiles,
    totalBytes,
    successCount,
    errorCount,
    addFiles,
    removeFile,
    replaceFile,
    retryUpload,
    cancelUpload,
    startUpload,
    startAllUploads,
    clearAll,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileManager({
    multiple: true,
    maxFiles,
    accept,
    maxSize,
    autoUpload,
    uploadHandler,
    onFilesChange,
    onUploadSuccess,
    onUploadError,
    simulateFailureFor,
  });

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Drop Zone */}
      <FileDropZone
        onFilesSelected={addFiles}
        accept={accept}
        multiple={true}
        disabled={disabled || files.length >= maxFiles}
        maxSize={maxSize}
        title={files.length >= maxFiles ? `Maximum limit reached (${maxFiles} files)` : title}
        description={description}
        isDragOver={isDragOver}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        compact={files.length > 0}
      />

      {/* Global Error Notice */}
      {globalError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Overall Progress if actively uploading */}
      {isUploading && (
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
            <span>Overall Batch Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <UploadProgress progress={overallProgress} status="uploading" showPercentage={false} size="sm" />
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <FileList
          files={files}
          onRemove={allowRemove ? removeFile : null}
          onReplace={allowReplace ? replaceFile : null}
          onRetry={retryUpload}
          onCancel={cancelUpload}
          onStartUpload={startUpload}
          onStartAllUploads={startAllUploads}
          onClearAll={clearAll}
          allowReplace={allowReplace}
          allowRemove={allowRemove}
        />
      )}
    </div>
  );
}
