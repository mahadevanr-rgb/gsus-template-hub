import React, { useState, useRef } from "react";
import { useFileManager } from "./useFileManager";
import FileDropZone from "./FileDropZone";
import FilePreview from "./FilePreview";
import UploadProgress from "./UploadProgress";
import ImageCropModal from "./ImageCropModal";
import ImageCompressor from "./ImageCompressor";
import {
  Image as ImageIcon,
  Crop,
  Sliders,
  Trash2,
  Repeat,
  RefreshCw,
  XCircle,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatBytes } from "./fileUtils";

/**
 * ImageUpload
 * Dedicated image upload component with preview, dimension validation, crop, and compression.
 */
export default function ImageUpload({
  accept = "image/png,image/jpeg,image/webp,image/gif",
  maxSize = 10 * 1024 * 1024, // 10 MB
  minWidth = null,
  maxWidth = null,
  minHeight = null,
  maxHeight = null,
  allowCrop = true,
  allowCompress = true,
  aspectRatio = "1:1",
  autoUpload = false,
  title = "Upload Image",
  description = "PNG, JPG, WEBP or GIF supported",
  uploadHandler = null,
  onImageChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  className = "",
}) {
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [showCompressor, setShowCompressor] = useState(false);
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
    updateFileRecord,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileManager({
    multiple: false,
    accept,
    maxSize,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    autoUpload,
    uploadHandler,
    onFilesChange: (list) => {
      if (onImageChange) onImageChange(list[0] || null);
    },
    onUploadSuccess,
    onUploadError,
  });

  const currentImage = files[0] || null;

  const handleCropComplete = ({ file, previewUrl, width, height }) => {
    if (!currentImage) return;
    updateFileRecord(currentImage.id, {
      file,
      previewUrl,
      size: file.size,
      dimensions: { width, height },
      status: "selected",
      error: null,
    });
  };

  const handleCompressionComplete = ({ file, previewUrl, width, height }) => {
    if (!currentImage) return;
    updateFileRecord(currentImage.id, {
      file,
      previewUrl,
      size: file.size,
      dimensions: { width, height },
    });
  };

  const handleTriggerReplace = () => {
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleReplaceInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0 && currentImage) {
      replaceFile(currentImage.id, e.target.files[0]);
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <input
        ref={replaceInputRef}
        type="file"
        accept={accept}
        onChange={handleReplaceInputChange}
        className="hidden"
        tabIndex={-1}
      />

      {!currentImage ? (
        <FileDropZone
          onFilesSelected={addFiles}
          accept={accept}
          multiple={false}
          maxSize={maxSize}
          icon={ImageIcon}
          title={title}
          description={description}
          isDragOver={isDragOver}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      ) : (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          {/* Image Preview Container */}
          <div className="w-full relative">
            <FilePreview
              file={currentImage.file}
              previewUrl={currentImage.previewUrl}
              name={currentImage.name}
              size={currentImage.size}
              category="image"
              dimensions={currentImage.dimensions}
              aspectRatio="video"
            />
          </div>

          {/* Validation error banner if any */}
          {currentImage.error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{currentImage.error}</span>
            </div>
          )}

          {/* Controls and Metadata */}
          <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-xs" title={currentImage.name}>
                {currentImage.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {formatBytes(currentImage.size)}
                {currentImage.dimensions && ` · ${currentImage.dimensions.width}×${currentImage.dimensions.height}px`}
              </p>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {allowCrop && currentImage.previewUrl && (
                <button
                  type="button"
                  onClick={() => setIsCropOpen(true)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Crop className="w-3.5 h-3.5" />
                  <span>Crop</span>
                </button>
              )}

              {allowCompress && currentImage.file && (
                <button
                  type="button"
                  onClick={() => setShowCompressor(!showCompressor)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    showCompressor
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Compress</span>
                </button>
              )}

              {currentImage.status === "selected" && (
                <button
                  type="button"
                  onClick={() => startUpload(currentImage.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleTriggerReplace}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Replace Image"
              >
                <Repeat className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => removeFile(currentImage.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Remove Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expandable Compressor Drawer */}
          {showCompressor && (
            <ImageCompressor
              file={currentImage.file}
              onCompressionComplete={handleCompressionComplete}
            />
          )}

          {/* Upload Progress */}
          {(currentImage.status === "uploading" ||
            currentImage.status === "error" ||
            currentImage.status === "canceled" ||
            currentImage.status === "success") && (
            <UploadProgress
              progress={currentImage.progress}
              status={currentImage.status}
              error={currentImage.error}
            />
          )}

          {/* Crop Modal */}
          <ImageCropModal
            isOpen={isCropOpen}
            imageSrc={currentImage.previewUrl}
            imageName={currentImage.name}
            aspectRatio={aspectRatio}
            onClose={() => setIsCropOpen(false)}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}
    </div>
  );
}
