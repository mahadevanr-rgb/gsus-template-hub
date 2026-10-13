import React from "react";
import { useFileManager } from "@/components/common/FileSystem";
import { FileDropZone, FileList } from "@/components/common/FileSystem";

export default function UploadRetryDemo() {
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
    autoUpload: true,
    simulateFailureFor: ["f_fail", "error-test.pdf", "fail.png"], // easily triggers failure for retry test
  });

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <FileDropZone
        onFilesSelected={addFiles}
        accept="*"
        multiple={true}
        title="Upload Resilience & Retry"
        description="Select any file or test retry on simulated failure states"
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
