import React, { useState, useRef } from "react";
import { useFileManager } from "./useFileManager";
import ImageCropModal from "./ImageCropModal";
import UploadProgress from "./UploadProgress";
import { Camera, User, Trash2, Crop, RefreshCw, Upload, Sparkles } from "lucide-react";
import { formatBytes } from "./fileUtils";

/**
 * AvatarUpload
 * Specialized avatar upload component with circular preview, hover overlay, 1:1 crop, and compression.
 */
export default function AvatarUpload({
  defaultAvatarUrl = null,
  initials = "JD",
  size = "lg", // "sm" (64px) | "md" (96px) | "lg" (128px) | "xl" (160px)
  maxSize = 5 * 1024 * 1024, // 5 MB
  allowCrop = true,
  autoUpload = false,
  uploadHandler = null,
  onAvatarChange = null,
  onUploadSuccess = null,
  onUploadError = null,
  className = "",
}) {
  const [isCropOpen, setIsCropOpen] = useState(false);
  const inputRef = useRef(null);

  const {
    files,
    addFiles,
    removeFile,
    updateFileRecord,
    retryUpload,
    startUpload,
  } = useFileManager({
    multiple: false,
    accept: "image/png,image/jpeg,image/webp",
    maxSize,
    autoUpload,
    uploadHandler,
    onFilesChange: (list) => {
      if (onAvatarChange) onAvatarChange(list[0] || null);
    },
    onUploadSuccess,
    onUploadError,
  });

  const currentAvatar = files[0] || null;
  const activeUrl = currentAvatar?.previewUrl || defaultAvatarUrl;

  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-24 h-24 text-2xl",
    lg: "w-32 h-32 text-3xl",
    xl: "w-40 h-40 text-4xl",
  }[size] || "w-32 h-32 text-3xl";

  const handleTriggerBrowse = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const handleCropComplete = ({ file, previewUrl, width, height }) => {
    if (!currentAvatar) return;
    updateFileRecord(currentAvatar.id, {
      file,
      previewUrl,
      size: file.size,
      dimensions: { width, height },
      status: "selected",
    });
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 text-center ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
        tabIndex={-1}
      />

      {/* Avatar Circle Container */}
      <div className="relative group">
        <div
          onClick={handleTriggerBrowse}
          className={`
            relative rounded-full overflow-hidden border-2 border-dashed
            ${
              currentAvatar?.status === "error"
                ? "border-rose-500 bg-rose-500/10"
                : "border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500"
            }
            bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer shadow-lg transition-all duration-200
            ${sizeClasses}
          `}
        >
          {activeUrl ? (
            <img
              src={activeUrl}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-bold text-slate-500 dark:text-slate-400 select-none">
              {initials}
            </span>
          )}

          {/* Hover Camera Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
            <Camera className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
          </div>
        </div>

        {/* Quick Crop Badge Icon */}
        {allowCrop && currentAvatar?.previewUrl && (
          <button
            type="button"
            onClick={() => setIsCropOpen(true)}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-md transition-all hover:scale-110 border-2 border-white dark:border-slate-900"
            title="Crop Avatar"
          >
            <Crop className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Info & Action Buttons */}
      <div className="space-y-1 max-w-xs">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {currentAvatar ? currentAvatar.name : "Profile Avatar"}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          PNG, JPG or WEBP · Max {formatBytes(maxSize)}
        </p>
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          type="button"
          onClick={handleTriggerBrowse}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          {currentAvatar ? "Change Photo" : "Upload Photo"}
        </button>

        {currentAvatar?.status === "selected" && (
          <button
            type="button"
            onClick={() => startUpload(currentAvatar.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
        )}

        {(currentAvatar?.status === "error" || currentAvatar?.status === "canceled") && (
          <button
            type="button"
            onClick={() => retryUpload(currentAvatar.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        )}

        {currentAvatar && (
          <button
            type="button"
            onClick={() => removeFile(currentAvatar.id)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Remove Photo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Upload Progress & Error */}
      {currentAvatar &&
        (currentAvatar.status === "uploading" ||
          currentAvatar.status === "error" ||
          currentAvatar.status === "success") && (
          <div className="w-48 pt-1">
            <UploadProgress
              progress={currentAvatar.progress}
              status={currentAvatar.status}
              error={currentAvatar.error}
              size="sm"
            />
          </div>
        )}

      {/* Crop Modal */}
      {currentAvatar && (
        <ImageCropModal
          isOpen={isCropOpen}
          imageSrc={currentAvatar.previewUrl}
          imageName={currentAvatar.name}
          aspectRatio="1:1"
          onClose={() => setIsCropOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
