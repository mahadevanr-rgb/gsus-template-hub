import React from "react";
import { useFileManager } from "./useFileManager";
import FileDropZone from "./FileDropZone";
import FileList from "./FileList";
import { FileText, Sparkles } from "lucide-react";

/**
 * DocumentUpload
 * Specialized component for PDF, DOCX, XLSX, and CSV documents with type tags and status tracking.
 */
export default function DocumentUpload({
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt",
  maxSize = 15 * 1024 * 1024, // 15 MB
  multiple = true,
  maxFiles = 5,
  autoUpload = false,
  title = "Upload Documents",
  description = "PDF, Word, Excel and CSV formats supported",
  uploadHandler = null,
  onFilesChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  className = "",
}) {
  const {
    files,
    isDragOver,
    globalError,
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
    multiple,
    maxFiles,
    accept,
    maxSize,
    autoUpload,
    uploadHandler,
    onFilesChange,
    onUploadSuccess,
    onUploadError,
  });

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <FileDropZone
        onFilesSelected={addFiles}
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        icon={FileText}
        title={title}
        description={description}
        isDragOver={isDragOver}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        compact={files.length > 0}
      />

      {files.length > 0 && (
        <FileList
          files={files}
          onRemove={removeFile}
          onReplace={replaceFile}
          onRetry={retryUpload}
          onCancel={cancelUpload}
          onStartUpload={startUpload}
          onStartAllUploads={startAllUploads}
          onClearAll={clearAll}
        />
      )}
    </div>
  );
}
