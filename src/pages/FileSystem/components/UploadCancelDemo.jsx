import React, { useState } from "react";
import { useFileManager } from "@/components/common/FileSystem";
import { FileDropZone, FileList } from "@/components/common/FileSystem";

export default function UploadCancelDemo() {
  const {
    files,
    isDragOver,
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
    maxFiles: 3,
    autoUpload: true, // starts uploading immediately so cancel can be tested
  });

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <FileDropZone
        onFilesSelected={addFiles}
        accept="*"
        multiple={true}
        title="Select file to test Cancel Upload"
        description="Upload starts immediately; click (X) to abort in flight"
        isDragOver={isDragOver}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
