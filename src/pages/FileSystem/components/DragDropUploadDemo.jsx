import React, { useState } from "react";
import { FileDropZone, FileList } from "@/components/common/FileSystem";
import { useFileManager } from "@/components/common/FileSystem";
import { CloudUpload } from "lucide-react";

export default function DragDropUploadDemo() {
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
    maxFiles: 4,
    accept: "*",
  });

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <FileDropZone
        onFilesSelected={addFiles}
        accept="*"
        multiple={true}
        icon={CloudUpload}
        title="Drag & drop project files here"
        description="Drop anything from your desktop or click browse"
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
