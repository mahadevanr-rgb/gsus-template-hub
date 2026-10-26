import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  UploadCloud,
  FileUp,
  FolderUp,
  Upload,
  ArrowUpCircle,
  HardDrive,
  Trash2,
  Repeat,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  Sparkles,
  Crop,
  Camera,
  Maximize2,
  X,
} from "lucide-react";
import {
  formatBytes,
  getFileCategory,
  validateFileRecord,
} from "../fileSystemValidation";
import ImageCropModal from "@/components/common/FileSystem/ImageCropModal";

// Map string icon names to Lucide icon components
const ICON_COMPONENTS = {
  UploadCloud,
  FileUp,
  FolderUp,
  Upload,
  ArrowUpCircle,
  HardDrive,
  Sparkles,
  Camera,
  FileText,
  Image: ImageIcon,
};

export default function FileSystemLiveRenderer({ config }) {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [cropTargetFile, setCropTargetFile] = useState(null);
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const inputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const replaceTargetIdRef = useRef(null);
  const activeUrlsRef = useRef(new Set());

  const {
    general = {},
    layout = {},
    appearance = {},
    typography = {},
    icons = {},
    fileSelection = {},
    validation = {},
    preview = {},
    uploadBehavior = {},
    sourceComponentId = "basic-file-upload",
  } = config;

  const isMultiple = Boolean(fileSelection.multiple);
  const maxLimit = isMultiple ? fileSelection.maxFiles || 5 : 1;
  const isAvatar = sourceComponentId === "avatar-upload";

  // Revoke blob URLs on unmount
  useEffect(() => {
    return () => {
      activeUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });
      activeUrlsRef.current.clear();
    };
  }, []);

  // Process incoming File objects with real validation
  const processIncomingFiles = useCallback(
    async (incomingFileList) => {
      setGlobalError(null);
      const incoming = Array.from(incomingFileList || []);
      if (!incoming.length) return;

      if (!isMultiple && incoming.length > 1) {
        setGlobalError("Only a single file can be uploaded in this configuration.");
        return;
      }

      const availableSlots = isMultiple ? Math.max(0, maxLimit - files.length) : 1;
      if (incoming.length > availableSlots) {
        setGlobalError(`Cannot add ${incoming.length} files. Max file limit is ${maxLimit}.`);
        return;
      }

      const validatedRecords = [];
      for (const file of incoming.slice(0, availableSlots)) {
        const valResult = await validateFileRecord(file, config, files);

        let previewUrl = null;
        const category = getFileCategory(file);
        if (category === "image") {
          previewUrl = URL.createObjectURL(file);
          activeUrlsRef.current.add(previewUrl);
        }

        validatedRecords.push({
          id: `f_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          file,
          name: file.name,
          size: file.size,
          category,
          previewUrl,
          dimensions: valResult.dimensions || null,
          status: valResult.valid ? "selected" : "error",
          error: valResult.valid ? null : valResult.error,
          progress: 0,
        });
      }

      setFiles((prev) => (isMultiple ? [...prev, ...validatedRecords] : validatedRecords));

      // Auto upload if enabled
      if (uploadBehavior.autoUpload) {
        validatedRecords.forEach((rec) => {
          if (rec.status === "selected") {
            setTimeout(() => triggerUpload(rec.id), 200);
          }
        });
      }
    },
    [files, config, isMultiple, maxLimit, uploadBehavior.autoUpload]
  );

  // Drag and Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  // Remove single file
  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
        activeUrlsRef.current.delete(target.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // Replace single file
  const triggerReplace = (id) => {
    replaceTargetIdRef.current = id;
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleReplaceChange = async (e) => {
    const file = e.target.files?.[0];
    const targetId = replaceTargetIdRef.current;
    if (!file || !targetId) return;

    const valResult = await validateFileRecord(file, config, files.filter((f) => f.id !== targetId));

    let previewUrl = null;
    const category = getFileCategory(file);
    if (category === "image") {
      previewUrl = URL.createObjectURL(file);
      activeUrlsRef.current.add(previewUrl);
    }

    setFiles((prev) =>
      prev.map((item) => {
        if (item.id === targetId) {
          if (item.previewUrl) {
            URL.revokeObjectURL(item.previewUrl);
            activeUrlsRef.current.delete(item.previewUrl);
          }
          return {
            ...item,
            file,
            name: file.name,
            size: file.size,
            category,
            previewUrl,
            dimensions: valResult.dimensions || null,
            status: valResult.valid ? "selected" : "error",
            error: valResult.valid ? null : valResult.error,
            progress: 0,
          };
        }
        return item;
      })
    );
  };

  // Upload simulation
  const triggerUpload = (id) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "uploading", progress: 10, error: null } : item
      )
    );

    const speed = uploadBehavior.uploadSpeedMs || 1000;
    const stepInterval = Math.max(50, Math.floor(speed / 5));

    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress >= 100) {
        clearInterval(interval);
        if (uploadBehavior.simulateFailure) {
          setFiles((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, status: "error", error: "Simulated network failure on upload endpoint." }
                : item
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: "success", progress: 100 } : item))
          );
        }
      } else {
        setFiles((prev) =>
          prev.map((item) => (item.id === id ? { ...item, progress: currentProgress } : item))
        );
      }
    }, stepInterval);
  };

  // Reset all test files
  const resetAllFiles = () => {
    files.forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
        activeUrlsRef.current.delete(f.previewUrl);
      }
    });
    setFiles([]);
    setGlobalError(null);
  };

  // Sandbox helper: test with synthetic file
  const addSyntheticFile = (type = "valid") => {
    let mockFile;
    if (type === "valid") {
      mockFile = new File(["Mock PDF document content string here"], "project-specification.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });
    } else if (type === "invalid-format") {
      mockFile = new File(["Binary executable bytes here"], "disallowed_malware.exe", {
        type: "application/x-msdownload",
        lastModified: Date.now(),
      });
    } else if (type === "oversized") {
      // Mock File object with artificially large size property
      mockFile = new File(["Big file"], "oversized_4k_raw_video.mov", {
        type: "video/quicktime",
        lastModified: Date.now(),
      });
      Object.defineProperty(mockFile, "size", { value: 1024 * 1024 * 1024 }); // 1 GB
    }
    if (mockFile) {
      processIncomingFiles([mockFile]);
    }
  };

  // Handle crop completion
  const handleCropComplete = ({ file, previewUrl, width, height }) => {
    if (!cropTargetFile) return;
    setFiles((prev) =>
      prev.map((item) =>
        item.id === cropTargetFile.id
          ? {
              ...item,
              file,
              previewUrl,
              size: file.size,
              dimensions: { width, height },
              status: "selected",
              error: null,
            }
          : item
      )
    );
    setCropTargetFile(null);
  };

  // Resolved icon component
  const UploadIconComp = ICON_COMPONENTS[icons.uploadIcon] || UploadCloud;
  const currentAvatarFile = files[0] || null;

  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      style={{ fontFamily: typography.fontFamily || "Inter, sans-serif" }}
    >
      {/* Hidden File Inputs */}
      <input
        ref={inputRef}
        type="file"
        accept={fileSelection.acceptedExtensions || "*"}
        multiple={isMultiple}
        onChange={(e) => processIncomingFiles(e.target.files)}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept={fileSelection.acceptedExtensions || "*"}
        onChange={handleReplaceChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="w-full flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 ${
            layout.maxWidth === "sm"
              ? "max-w-sm"
              : layout.maxWidth === "md"
              ? "max-w-md"
              : layout.maxWidth === "lg"
              ? "max-w-lg"
              : layout.maxWidth === "xl"
              ? "max-w-xl"
              : layout.maxWidth === "2xl"
              ? "max-w-2xl"
              : "max-w-full"
          }`}
        >
          {/* =========================================================================
              SPECIAL ARCHETYPE: AVATAR UPLOADER
             ========================================================================= */}
          {isAvatar ? (
            <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                className="relative group w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer transition-all shadow-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800"
                style={{
                  borderColor: appearance.borderColor || "#cbd5e1",
                  backgroundColor: appearance.dropzoneBg || "#f8fafc",
                }}
              >
                {currentAvatarFile?.previewUrl ? (
                  <img
                    src={currentAvatarFile.previewUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-slate-400">JD</span>
                )}

                {/* Camera Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1">
                  <Camera className="w-5 h-5" />
                  <span>Change</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3
                  className={`${typography.titleSize || "text-base"} ${typography.titleWeight || "font-bold"}`}
                  style={{ color: appearance.titleColor || "#0f172a" }}
                >
                  {general.title || "Profile Avatar"}
                </h3>
                <p className="text-xs text-slate-500">
                  {general.description || "Upload a 1:1 square photo"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all text-white cursor-pointer"
                  style={{ backgroundColor: appearance.btnBg || "#059669" }}
                >
                  {general.browseBtnLabel || "Browse Photo"}
                </button>
                {currentAvatarFile && (
                  <button
                    type="button"
                    onClick={() => removeFile(currentAvatarFile.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove avatar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* =========================================================================
                STANDARD FILE UPLOAD & BATCH DROPZONE
               ========================================================================= */
            <div className="space-y-4">
              {/* Dropzone Container */}
              {(isMultiple || files.length === 0) && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  aria-label={general.title || "Upload file drop target"}
                  className={`
                    relative group cursor-pointer select-none transition-all duration-200 outline-none
                    ${layout.padding === "compact" ? "p-4 sm:p-5" : layout.padding === "spacious" ? "p-8 sm:p-12" : "p-6 sm:p-8"}
                    flex flex-col items-center justify-center text-center space-y-3
                  `}
                  style={{
                    backgroundColor: isDragOver ? appearance.dragOverBg || "rgba(16, 185, 129, 0.12)" : appearance.dropzoneBg || "#f8fafc",
                    borderWidth: `${appearance.borderWidth || 2}px`,
                    borderStyle: appearance.borderStyle || "dashed",
                    borderColor: isDragOver ? appearance.dragOverBorderColor || appearance.accentColor || "#10b981" : appearance.borderColor || "#cbd5e1",
                    borderRadius: appearance.borderRadius || "16px",
                  }}
                >
                  {/* Upload Icon */}
                  <div
                    className={`
                      ${icons.iconSize === "sm" ? "w-9 h-9" : icons.iconSize === "lg" ? "w-14 h-14" : "w-12 h-12"}
                      ${icons.iconShape === "circle" ? "rounded-full" : icons.iconShape === "square" ? "rounded-none" : "rounded-2xl"}
                      flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0
                    `}
                    style={{
                      backgroundColor: appearance.iconBg || "rgba(16, 185, 129, 0.1)",
                      color: appearance.iconColor || appearance.accentColor || "#10b981",
                    }}
                  >
                    <UploadIconComp className={icons.iconSize === "sm" ? "w-4 h-4" : icons.iconSize === "lg" ? "w-7 h-7" : "w-6 h-6"} />
                  </div>

                  {/* Heading & Instructions */}
                  <div className="space-y-1 max-w-sm">
                    <h3
                      className={`${typography.titleSize || "text-base"} ${typography.titleWeight || "font-bold"}`}
                      style={{ color: appearance.titleColor || "#0f172a" }}
                    >
                      {general.title || "Click to browse or drag & drop"}
                    </h3>
                    <p
                      className={typography.descSize || "text-xs"}
                      style={{ color: appearance.descColor || "#64748b" }}
                    >
                      {general.description || "Upload files up to maximum limit"}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: appearance.helperColor || "#94a3b8" }}
                    >
                      {general.helperText || `Supported: ${fileSelection.acceptedExtensions || "*"} · Max ${validation.maxSizeValue || 10} ${validation.maxSizeUnit || "MB"}`}
                    </p>
                  </div>

                  {/* Multiple files badge */}
                  {isMultiple && icons.showDecorativeBadge !== false && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>Multiple files allowed (Max {maxLimit})</span>
                    </div>
                  )}

                  {/* Browse Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                    className="mt-1 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: appearance.btnBg || "#059669",
                      color: appearance.btnTextColor || "#ffffff",
                    }}
                  >
                    {general.browseBtnLabel || "Browse Files"}
                  </button>
                </div>
              )}

              {/* Global Error Notice */}
              {globalError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{globalError}</span>
                </div>
              )}

              {/* Selected Files & Batch Queue */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>Selected Files ({files.length} / {maxLimit})</span>
                    {isMultiple && fileSelection.allowClearAll !== false && (
                      <button
                        type="button"
                        onClick={resetAllFiles}
                        className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        {general.clearAllBtnLabel || "Clear All"}
                      </button>
                    )}
                  </div>

                  {files.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border transition-all space-y-3 shadow-sm"
                      style={{
                        backgroundColor: appearance.cardBg || "#ffffff",
                        borderColor: item.status === "error" ? appearance.errorColor || "#ef4444" : appearance.borderColor || "#cbd5e1",
                        borderRadius: appearance.borderRadius || "16px",
                      }}
                    >
                      {/* Image Thumbnail Preview */}
                      {preview.showPreview !== false && item.previewUrl && (
                        <div
                          className={`w-full ${preview.aspectRatio === "square" ? "h-48" : "h-36"} rounded-xl overflow-hidden bg-slate-900/40 relative group`}
                        >
                          <img
                            src={item.previewUrl}
                            alt={item.name}
                            className={`w-full h-full object-${preview.imageFit || "cover"}`}
                          />
                          {preview.allowEnlarge !== false && (
                            <button
                              type="button"
                              onClick={() => setLightboxUrl(item.previewUrl)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                              title="Enlarge preview"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* File Metadata & Actions */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: item.status === "error" ? "rgba(239, 68, 68, 0.1)" : appearance.iconBg || "rgba(16, 185, 129, 0.1)",
                              color: item.status === "error" ? appearance.errorColor || "#ef4444" : appearance.iconColor || "#10b981",
                            }}
                          >
                            {item.status === "error" ? (
                              <AlertCircle className="w-4 h-4" />
                            ) : item.category === "image" ? (
                              <ImageIcon className="w-4 h-4" />
                            ) : item.category === "pdf" ? (
                              <FileText className="w-4 h-4" />
                            ) : item.category === "spreadsheet" ? (
                              <FileSpreadsheet className="w-4 h-4" />
                            ) : item.category === "archive" ? (
                              <FileArchive className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title={item.name}>
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {formatBytes(item.size)}
                              {item.dimensions && ` · ${item.dimensions.width}×${item.dimensions.height}px`}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Image Crop Action */}
                          {preview.allowCrop && item.category === "image" && item.status !== "uploading" && (
                            <button
                              type="button"
                              onClick={() => setCropTargetFile(item)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
                              title="Crop image"
                            >
                              <Crop className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Crop</span>
                            </button>
                          )}

                          {item.status === "selected" && (
                            <button
                              type="button"
                              onClick={() => triggerUpload(item.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm flex items-center gap-1 hover:opacity-90 transition-all cursor-pointer"
                              style={{ backgroundColor: appearance.btnBg || "#059669" }}
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{general.uploadBtnLabel || "Upload"}</span>
                            </button>
                          )}

                          {item.status === "error" && validation.allowRetry !== false && (
                            <button
                              type="button"
                              onClick={() => triggerUpload(item.id)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-colors flex items-center gap-1"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Retry</span>
                            </button>
                          )}

                          {fileSelection.allowReplace !== false && item.status !== "uploading" && (
                            <button
                              type="button"
                              onClick={() => triggerReplace(item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Replace file"
                            >
                              <Repeat className="w-4 h-4" />
                            </button>
                          )}

                          {fileSelection.allowRemove !== false && item.status !== "uploading" && (
                            <button
                              type="button"
                              onClick={() => removeFile(item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title={general.removeBtnLabel || "Remove file"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Error notice */}
                      {item.status === "error" && (
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{item.error}</span>
                        </div>
                      )}

                      {/* Progress bar */}
                      {item.status === "uploading" && (
                        <div className="space-y-1">
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full transition-all duration-300 rounded-full"
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: appearance.progressColor || appearance.accentColor || "#10b981",
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Uploading...</span>
                            <span>{item.progress}%</span>
                          </div>
                        </div>
                      )}

                      {/* Success confirmation */}
                      {item.status === "success" && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Upload complete</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Note */}
              {general.showFooter !== false && (
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  {general.footerText || "Files are processed safely on your device."}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SANDBOX TEST ACTION TOOLBAR
         ========================================================================= */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
          <span>🧪 Live Test Sandbox:</span>
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => addSyntheticFile("valid")}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            + Test Valid PDF
          </button>
          <button
            type="button"
            onClick={() => addSyntheticFile("invalid-format")}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer text-[11px]"
            title="Attempts to upload .exe file"
          >
            ⚠️ Test Invalid Format
          </button>
          <button
            type="button"
            onClick={() => addSyntheticFile("oversized")}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer text-[11px]"
            title="Attempts to upload 1GB file"
          >
            ⚠️ Test Oversize File
          </button>
          {files.length > 0 && (
            <button
              type="button"
              onClick={resetAllFiles}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              Reset Sandbox
            </button>
          )}
        </div>
      </div>

      {/* Image Crop Modal Dialog */}
      {cropTargetFile && (
        <ImageCropModal
          isOpen={Boolean(cropTargetFile)}
          imageSrc={cropTargetFile.previewUrl}
          imageName={cropTargetFile.name}
          aspectRatio={validation.aspectRatio || "16:9"}
          onCropComplete={handleCropComplete}
          onClose={() => setCropTargetFile(null)}
        />
      )}

      {/* Lightbox Enlargement */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-black">
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxUrl} alt="Enlarged" className="w-full h-auto max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
