import { useState, useCallback, useEffect, useRef } from "react";
import { simulateUploadAdapter } from "./fileUtils";
import { processAndValidateFile } from "./fileRecordProcessor";
import { useFileDragDrop } from "./useFileDragDrop";

/**
 * useFileManager
 * Central state management hook for file selection, validation, upload queues, progress, abort, and retry.
 */
export function useFileManager({
  multiple = false,
  maxFiles = 10,
  accept = "*",
  maxSize = null,
  minWidth = null,
  maxWidth = null,
  minHeight = null,
  maxHeight = null,
  autoUpload = false,
  uploadHandler = null,
  onFilesChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  simulateFailureFor = [],
  disabled = false,
} = {}) {
  const [files, setFiles] = useState([]);
  const [globalError, setGlobalError] = useState(null);

  const activeUrlsRef = useRef(new Set());
  const abortControllersRef = useRef(new Map());

  const registerPreviewUrl = useCallback((url) => {
    if (url && typeof url === "string" && url.startsWith("blob:")) {
      activeUrlsRef.current.add(url);
    }
    return url;
  }, []);

  const revokePreviewUrl = useCallback((url) => {
    if (url && typeof url === "string" && url.startsWith("blob:")) {
      activeUrlsRef.current.delete(url);
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Unmount cleanup for all object URLs and active abort controllers
  useEffect(() => {
    return () => {
      abortControllersRef.current.forEach((controller) => {
        try {
          controller.abort();
        } catch (e) {
          // ignore
        }
      });
      abortControllersRef.current.clear();

      activeUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // ignore
        }
      });
      activeUrlsRef.current.clear();
    };
  }, []);

  // Execute upload simulation or external uploadHandler for a single file record
  const executeUpload = useCallback(
    async (fileId, currentFilesList) => {
      const targetList = currentFilesList || files;
      const fileIndex = targetList.findIndex((item) => item.id === fileId);
      if (fileIndex === -1) return;

      const currentRecord = targetList[fileIndex];
      if (currentRecord.status === "uploading") return;

      const controller = new AbortController();
      abortControllersRef.current.set(fileId, controller);

      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileId
            ? { ...item, status: "uploading", progress: 0, error: null }
            : item
        )
      );

      const progressCallback = (pct) => {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === fileId ? { ...item, progress: pct } : item
          )
        );
      };

      try {
        const shouldFail =
          simulateFailureFor.includes(currentRecord.name) ||
          simulateFailureFor.includes(fileId);

        let result;
        if (uploadHandler) {
          result = await uploadHandler(currentRecord.file, {
            onProgress: progressCallback,
            signal: controller.signal,
          });
        } else {
          result = await simulateUploadAdapter(currentRecord.file, {
            onProgress: progressCallback,
            signal: controller.signal,
            shouldFail,
          });
        }

        abortControllersRef.current.delete(fileId);

        setFiles((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? {
                  ...item,
                  status: "success",
                  progress: 100,
                  error: null,
                  uploadedData: result,
                }
              : item
          )
        );

        if (onUploadSuccess) {
          onUploadSuccess({
            ...currentRecord,
            status: "success",
            progress: 100,
            uploadedData: result,
          });
        }
      } catch (err) {
        abortControllersRef.current.delete(fileId);

        const isCanceled =
          err?.name === "AbortError" || err?.message?.includes("canceled");
        const status = isCanceled ? "canceled" : "error";
        const errorMessage = isCanceled
          ? "Upload canceled"
          : err?.message || "Upload failed. Please try again.";

        setFiles((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? {
                  ...item,
                  status,
                  error: errorMessage,
                }
              : item
          )
        );

        if (!isCanceled && onUploadError) {
          onUploadError(currentRecord, errorMessage);
        }
      }
    },
    [files, uploadHandler, simulateFailureFor, onUploadSuccess, onUploadError]
  );

  // Add files to state and validate them
  const addFiles = useCallback(
    async (fileInputList) => {
      setGlobalError(null);
      const incoming = Array.from(fileInputList || []);
      if (incoming.length === 0) return;

      let acceptedFiles = incoming;

      if (!multiple) {
        files.forEach((f) => {
          if (f.previewUrl) revokePreviewUrl(f.previewUrl);
        });
        acceptedFiles = incoming.slice(0, 1);
      } else {
        const remainingSlots = Math.max(0, maxFiles - files.length);
        if (incoming.length > remainingSlots) {
          setGlobalError(`You can only upload a maximum of ${maxFiles} files.`);
          acceptedFiles = incoming.slice(0, remainingSlots);
        }
      }

      if (acceptedFiles.length === 0) return;

      const processedRecords = await Promise.all(
        acceptedFiles.map((file) =>
          processAndValidateFile(file, {
            accept,
            maxSize,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            registerPreviewUrl,
          })
        )
      );

      const nextFiles = multiple
        ? [...files, ...processedRecords]
        : processedRecords;

      setFiles(nextFiles);
      if (onFilesChange) onFilesChange(nextFiles);

      if (autoUpload) {
        processedRecords.forEach((rec) => {
          if (rec.status === "selected") {
            executeUpload(rec.id, nextFiles);
          }
        });
      }
    },
    [
      multiple,
      maxFiles,
      files,
      revokePreviewUrl,
      accept,
      maxSize,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      registerPreviewUrl,
      onFilesChange,
      autoUpload,
      executeUpload,
    ]
  );

  // Remove a single file record
  const removeFile = useCallback(
    (fileId) => {
      const controller = abortControllersRef.current.get(fileId);
      if (controller) {
        try {
          controller.abort();
        } catch (e) {
          // ignore
        }
        abortControllersRef.current.delete(fileId);
      }

      setFiles((prev) => {
        const target = prev.find((f) => f.id === fileId);
        if (target && target.previewUrl) {
          revokePreviewUrl(target.previewUrl);
        }
        const updated = prev.filter((f) => f.id !== fileId);
        if (onFilesChange) onFilesChange(updated);
        return updated;
      });
    },
    [revokePreviewUrl, onFilesChange]
  );

  // Replace an existing file record with a newly selected File
  const replaceFile = useCallback(
    async (fileId, newFile) => {
      if (!newFile) return;

      const controller = abortControllersRef.current.get(fileId);
      if (controller) {
        try {
          controller.abort();
        } catch (e) {
          // ignore
        }
        abortControllersRef.current.delete(fileId);
      }

      const oldRecord = files.find((f) => f.id === fileId);
      if (oldRecord?.previewUrl) {
        revokePreviewUrl(oldRecord.previewUrl);
      }

      const processed = await processAndValidateFile(newFile, {
        accept,
        maxSize,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        registerPreviewUrl,
      });
      const replacedRecord = { ...processed, id: fileId };

      setFiles((prev) => {
        const next = prev.map((item) =>
          item.id === fileId ? replacedRecord : item
        );
        if (onFilesChange) onFilesChange(next);
        return next;
      });

      if (autoUpload && replacedRecord.status === "selected") {
        executeUpload(
          fileId,
          files.map((item) => (item.id === fileId ? replacedRecord : item))
        );
      }
    },
    [
      files,
      revokePreviewUrl,
      accept,
      maxSize,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      registerPreviewUrl,
      onFilesChange,
      autoUpload,
      executeUpload,
    ]
  );

  const retryUpload = useCallback(
    (fileId) => {
      executeUpload(fileId);
    },
    [executeUpload]
  );

  const cancelUpload = useCallback((fileId) => {
    const controller = abortControllersRef.current.get(fileId);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(fileId);
    }
  }, []);

  const startAllUploads = useCallback(() => {
    files.forEach((rec) => {
      if (
        rec.status === "selected" ||
        rec.status === "error" ||
        rec.status === "canceled"
      ) {
        executeUpload(rec.id);
      }
    });
  }, [files, executeUpload]);

  const startUpload = useCallback(
    (fileId) => {
      executeUpload(fileId);
    },
    [executeUpload]
  );

  const clearAll = useCallback(() => {
    files.forEach((f) => {
      if (f.previewUrl) revokePreviewUrl(f.previewUrl);
      const controller = abortControllersRef.current.get(f.id);
      if (controller) {
        try {
          controller.abort();
        } catch (e) {
          // ignore
        }
      }
    });
    abortControllersRef.current.clear();
    setFiles([]);
    setGlobalError(null);
    if (onFilesChange) onFilesChange([]);
  }, [files, revokePreviewUrl, onFilesChange]);

  const updateFileRecord = useCallback(
    (fileId, updates) => {
      setFiles((prev) =>
        prev.map((item) => {
          if (item.id === fileId) {
            if (
              updates.previewUrl &&
              item.previewUrl &&
              item.previewUrl !== updates.previewUrl
            ) {
              revokePreviewUrl(item.previewUrl);
              registerPreviewUrl(updates.previewUrl);
            }
            return { ...item, ...updates };
          }
          return item;
        })
      );
    },
    [revokePreviewUrl, registerPreviewUrl]
  );

  // Drag and drop integration
  const {
    isDragOver,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileDragDrop({ onFilesDropped: addFiles, disabled });

  const totalFiles = files.length;
  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);
  const uploadingCount = files.filter((f) => f.status === "uploading").length;
  const successCount = files.filter((f) => f.status === "success").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const isUploading = uploadingCount > 0;
  const overallProgress =
    totalFiles > 0
      ? Math.round(
          files.reduce((acc, f) => acc + (f.progress || 0), 0) / totalFiles
        )
      : 0;

  return {
    files,
    isDragOver,
    globalError,
    setGlobalError,
    isUploading,
    overallProgress,
    totalFiles,
    totalBytes,
    uploadingCount,
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
    updateFileRecord,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    registerPreviewUrl,
    revokePreviewUrl,
  };
}
