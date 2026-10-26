import { toPascalCase, toSlug } from "./fileSystemCustomizationUtils";
import { formatBytes } from "@/components/common/FileSystem/fileFormatUtils";

/**
 * Resolves shadow CSS value from preset
 */
function getShadowCss(preset, accentColor = "#10b981") {
  switch (preset) {
    case "none":
      return "none";
    case "sm":
      return "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    case "md":
      return "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    case "lg":
      return "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    case "xl":
      return "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    case "glow":
      return `0 0 25px -5px ${accentColor}40`;
    default:
      return "0 4px 6px -1px rgb(0 0 0 / 0.1)";
  }
}

/**
 * Generates self-contained, working React Component JSX with complete validation and interaction logic.
 */
export function generateReactCode(config) {
  const componentName = toPascalCase(config.name || "CustomFileUploader");
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
  } = config;

  const multiple = Boolean(fileSelection.multiple);
  const maxFiles = multiple ? fileSelection.maxFiles || 5 : 1;
  const acceptStr = fileSelection.acceptedExtensions || "*";
  const maxBytes = validation.maxSizeBytes || 10 * 1024 * 1024;
  const shadowValue = getShadowCss(appearance.shadow, appearance.accentColor);
  const uploadIconName = icons.uploadIcon || "UploadCloud";
  const helperText = general.helperText || `Supported: ${acceptStr} · Max ${formatBytes(maxBytes)}`;

  return `import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ${uploadIconName},
  Trash2,
  Repeat,
  RefreshCw,
  XCircle,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

/**
 * Format bytes into human-readable string
 */
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
}

/**
 * Extract file extension
 */
function getFileExtension(filename) {
  const name = filename || "";
  const dotIndex = name.lastIndexOf(".");
  return dotIndex !== -1 ? name.slice(dotIndex).toLowerCase() : "";
}

/**
 * ${componentName}
 * Exported from TemplateHub File System Customizer.
 * Enforces configured rules: accept="${acceptStr}", maxSize=${maxBytes} bytes (${formatBytes(maxBytes)}), maxFiles=${maxFiles}.
 */
export default function ${componentName}({
  onFileChange,
  onUploadSuccess,
  onUploadError,
  className = "",
}) {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const targetReplaceIdRef = useRef(null);
  const activeUrlsRef = useRef(new Set());

  // Revoke blob URLs on unmount to prevent memory leaks
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

  // Validate single file against configured rules
  const validateFile = useCallback((file) => {
    // 1. File type validation
    const accept = "${acceptStr}";
    if (accept && accept !== "*") {
      const acceptRules = accept.split(",").map((s) => s.trim().toLowerCase());
      const fileName = file.name.toLowerCase();
      const fileExt = getFileExtension(fileName);
      const fileType = (file.type || "").toLowerCase();

      const matched = acceptRules.some((rule) => {
        if (rule.startsWith(".")) return fileExt === rule;
        if (rule.endsWith("/*")) return fileType.startsWith(rule.slice(0, -2));
        return fileType === rule;
      });

      if (!matched) {
        return {
          valid: false,
          error: \`Invalid file format. Supported: \${accept.replace(/\\./g, "").toUpperCase()}\`,
        };
      }
    }

    // 2. File size ceiling check
    const maxSizeBytes = ${maxBytes};
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: \`File exceeds maximum limit of \${formatBytes(maxSizeBytes)} (Current: \${formatBytes(file.size)}).\`,
      };
    }

    return { valid: true };
  }, []);

  // Process incoming File objects
  const handleFiles = useCallback(
    (incomingFileList) => {
      setGlobalError(null);
      const incoming = Array.from(incomingFileList || []);
      if (!incoming.length) return;

      const isMultiple = ${multiple};
      const maxLimit = ${maxFiles};

      if (!isMultiple && incoming.length > 1) {
        setGlobalError("Only a single file can be selected at a time.");
        return;
      }

      const availableSlots = isMultiple ? Math.max(0, maxLimit - files.length) : 1;
      if (incoming.length > availableSlots) {
        setGlobalError(\`Cannot add \${incoming.length} files. Limit is \${maxLimit} total files.\`);
        return;
      }

      const processed = incoming.slice(0, availableSlots).map((file) => {
        const val = validateFile(file);
        let previewUrl = null;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
          activeUrlsRef.current.add(previewUrl);
        }

        return {
          id: \`file_\${Date.now()}_\${Math.random().toString(36).substring(2, 7)}\`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl,
          status: val.valid ? "selected" : "error",
          error: val.valid ? null : val.error,
          progress: 0,
        };
      });

      setFiles((prev) => {
        const next = isMultiple ? [...prev, ...processed] : processed;
        if (onFileChange) onFileChange(isMultiple ? next : next[0] || null);
        return next;
      });
    },
    [files, validateFile, onFileChange]
  );

  // Drag and drop event handlers
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
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
        activeUrlsRef.current.delete(target.previewUrl);
      }
      const updated = prev.filter((f) => f.id !== id);
      if (onFileChange) onFileChange(${multiple} ? updated : updated[0] || null);
      return updated;
    });
  };

  const triggerReplace = (id) => {
    targetReplaceIdRef.current = id;
    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
      replaceInputRef.current.click();
    }
  };

  const handleReplaceChange = (e) => {
    const file = e.target.files?.[0];
    const id = targetReplaceIdRef.current;
    if (!file || !id) return;

    const val = validateFile(file);
    let previewUrl = null;
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file);
      activeUrlsRef.current.add(previewUrl);
    }

    setFiles((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.previewUrl) {
            URL.revokeObjectURL(item.previewUrl);
            activeUrlsRef.current.delete(item.previewUrl);
          }
          return {
            ...item,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            previewUrl,
            status: val.valid ? "selected" : "error",
            error: val.valid ? null : val.error,
            progress: 0,
          };
        }
        return item;
      })
    );
  };

  // Upload simulation
  const startUpload = (id) => {
    setIsUploading(true);
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "uploading", progress: 10 } : item))
    );

    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: "success", progress: 100 } : item))
        );
        setIsUploading(false);
        if (onUploadSuccess) onUploadSuccess({ fileId: id, status: "success" });
      } else {
        setFiles((prev) =>
          prev.map((item) => (item.id === id ? { ...item, progress } : item))
        );
      }
    }, 250);
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
        activeUrlsRef.current.delete(f.previewUrl);
      }
    });
    setFiles([]);
    setGlobalError(null);
    if (onFileChange) onFileChange(${multiple} ? [] : null);
  };

  return (
    <div
      className={\`w-full max-w-${layout.maxWidth || "lg"} mx-auto p-4 space-y-4 \${className}\`}
      style={{ fontFamily: "${typography.fontFamily || "Inter, sans-serif"}" }}
    >
      {/* Hidden native file inputs */}
      <input
        ref={inputRef}
        type="file"
        accept="${acceptStr}"
        multiple={${multiple}}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="${acceptStr}"
        onChange={handleReplaceChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Drop Zone Box */}
      {(${multiple} || files.length === 0) && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label="${general.title || "Upload file drop target"}"
          className="relative group cursor-pointer select-none transition-all duration-200 outline-none p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-3"
          style={{
            backgroundColor: isDragOver ? "${appearance.dragOverBg || "rgba(16, 185, 129, 0.12)"}" : "${appearance.dropzoneBg || "#f8fafc"}",
            borderWidth: "${appearance.borderWidth || 2}px",
            borderStyle: "${appearance.borderStyle || "dashed"}",
            borderColor: isDragOver ? "${appearance.dragOverBorderColor || appearance.accentColor || "#10b981"}" : "${appearance.borderColor || "#cbd5e1"}",
            borderRadius: "${appearance.borderRadius || "16px"}",
            boxShadow: "${shadowValue}",
          }}
        >
          {/* Upload Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: "${appearance.iconBg || "rgba(16, 185, 129, 0.1)"}",
              color: "${appearance.iconColor || appearance.accentColor || "#10b981"}",
            }}
          >
            <${uploadIconName} className="w-6 h-6" />
          </div>

          {/* Heading & Instructions */}
          <div className="space-y-1 max-w-sm">
            <h3
              className="${typography.titleSize || "text-base"} ${typography.titleWeight || "font-bold"}"
              style={{ color: "${appearance.titleColor || "#0f172a"}" }}
            >
              ${general.title || "Click to browse or drag & drop"}
            </h3>
            <p
              className="${typography.descSize || "text-xs"}"
              style={{ color: "${appearance.descColor || "#64748b"}" }}
            >
              ${general.description || "Upload files up to maximum limit"}
            </p>
            <p
              className="text-[11px]"
              style={{ color: "${appearance.helperColor || "#94a3b8"}" }}
            >
              ${helperText}
            </p>
          </div>

          {/* Browse Trigger Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "${appearance.btnBg || "#059669"}",
              color: "${appearance.btnTextColor || "#ffffff"}",
            }}
          >
            ${general.browseBtnLabel || "Browse Files"}
          </button>
        </div>
      )}

      {/* Global Error Banner */}
      {globalError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Selected File Cards & Queue */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Selected Files ({files.length} / ${maxFiles})</span>
            {${multiple} && (
              <button
                type="button"
                onClick={clearAll}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                ${general.clearAllBtnLabel || "Clear All"}
              </button>
            )}
          </div>

          {files.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border transition-all space-y-3"
              style={{
                backgroundColor: "${appearance.cardBg || "#ffffff"}",
                borderColor: item.status === "error" ? "${appearance.errorColor || "#ef4444"}" : "${appearance.borderColor || "#cbd5e1"}",
                borderRadius: "${appearance.borderRadius || "16px"}",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {/* Optional Image Thumbnail Preview */}
              {${preview.showPreview !== false} && item.previewUrl && (
                <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="w-full h-full object-${preview.imageFit || "cover"}"
                  />
                </div>
              )}

              {/* File Info & Actions Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: item.status === "error" ? "rgba(239, 68, 68, 0.1)" : "${appearance.iconBg || "rgba(16, 185, 129, 0.1)"}",
                      color: item.status === "error" ? "${appearance.errorColor || "#ef4444"}" : "${appearance.iconColor || "#10b981"}",
                    }}
                  >
                    {item.status === "error" ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : item.type.startsWith("image/") ? (
                      <ImageIcon className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {formatBytes(item.size)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.status === "selected" && (
                    <button
                      type="button"
                      onClick={() => startUpload(item.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm flex items-center gap-1 hover:opacity-90 transition-all cursor-pointer"
                      style={{ backgroundColor: "${appearance.btnBg || "#059669"}" }}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>${general.uploadBtnLabel || "Upload"}</span>
                    </button>
                  )}

                  {${fileSelection.allowReplace !== false} && (
                    <button
                      type="button"
                      onClick={() => triggerReplace(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Replace file"
                    >
                      <Repeat className="w-4 h-4" />
                    </button>
                  )}

                  {${fileSelection.allowRemove !== false} && (
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      title="${general.removeBtnLabel || "Remove file"}"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Error Notice */}
              {item.status === "error" && (
                <p className="text-xs text-rose-500 font-medium">{item.error}</p>
              )}

              {/* Progress Bar */}
              {item.status === "uploading" && (
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: \`\${item.progress}%\`,
                        backgroundColor: "${appearance.progressColor || appearance.accentColor || "#10b981"}",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Uploading...</span>
                    <span>{item.progress}%</span>
                  </div>
                </div>
              )}

              {/* Success Badge */}
              {item.status === "success" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Upload complete</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer text */}
      {${general.showFooter !== false} && (
        <p className="text-center text-[11px] text-slate-400 mt-2">
          ${general.footerText || "Files are processed safely on your device."}
        </p>
      )}
    </div>
  );
}
`;
}

/**
 * Generates separate React JSX and portable Scoped CSS files.
 */
export function generateReactAndCss(config) {
  const componentName = toPascalCase(config.name || "CustomFileUploader");
  const slug = toSlug(config.name || "custom-file-uploader");
  const {
    general = {},
    layout = {},
    appearance = {},
    typography = {},
    icons = {},
    fileSelection = {},
    validation = {},
    preview = {},
  } = config;

  const multiple = Boolean(fileSelection.multiple);
  const maxFiles = multiple ? fileSelection.maxFiles || 5 : 1;
  const acceptStr = fileSelection.acceptedExtensions || "*";
  const maxBytes = validation.maxSizeBytes || 10 * 1024 * 1024;
  const uploadIconName = icons.uploadIcon || "UploadCloud";

  const jsx = `import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ${uploadIconName},
  Trash2,
  Repeat,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import "./${componentName}.css";

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return \`\${(bytes / Math.pow(1024, i)).toFixed(1)} \${sizes[i]}\`;
}

export default function ${componentName}({ onFileChange }) {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (incoming) => {
    setError(null);
    const list = Array.from(incoming || []);
    if (!list.length) return;

    const validated = list.map((file) => {
      let previewUrl = null;
      if (file.type.startsWith("image/")) {
        previewUrl = URL.createObjectURL(file);
      }
      return {
        id: "f_" + Math.random().toString(36).substring(2, 8),
        file,
        name: file.name,
        size: file.size,
        previewUrl,
      };
    });

    setFiles(${multiple} ? (prev) => [...prev, ...validated].slice(0, ${maxFiles}) : validated.slice(0, 1));
  };

  return (
    <div className="${slug}-root">
      <input
        ref={inputRef}
        type="file"
        accept="${acceptStr}"
        multiple={${multiple}}
        onChange={(e) => handleFiles(e.target.files)}
        className="${slug}-hidden-input"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        className={\`${slug}-dropzone \${isDragOver ? "${slug}-dropzone-active" : ""}\`}
      >
        <div className="${slug}-icon-wrapper">
          <${uploadIconName} className="${slug}-icon" />
        </div>
        <h3 className="${slug}-title">${general.title || "Click to browse or drag & drop"}</h3>
        <p className="${slug}-desc">${general.description || "Upload files up to maximum limit"}</p>
        <button type="button" className="${slug}-btn">${general.browseBtnLabel || "Browse Files"}</button>
      </div>

      {files.length > 0 && (
        <div className="${slug}-file-list">
          {files.map((item) => (
            <div key={item.id} className="${slug}-file-card">
              {item.previewUrl && (
                <img src={item.previewUrl} alt={item.name} className="${slug}-preview-img" />
              )}
              <div className="${slug}-file-meta">
                <span className="${slug}-file-name">{item.name}</span>
                <span className="${slug}-file-size">{formatBytes(item.size)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

  const css = `/* Scoped CSS for ${componentName} */
.${slug}-root {
  --th-accent: ${appearance.accentColor || "#10b981"};
  --th-bg: ${appearance.cardBg || "#ffffff"};
  --th-dropzone-bg: ${appearance.dropzoneBg || "#f8fafc"};
  --th-border-color: ${appearance.borderColor || "#cbd5e1"};
  --th-title-color: ${appearance.titleColor || "#0f172a"};
  --th-desc-color: ${appearance.descColor || "#64748b"};
  --th-btn-bg: ${appearance.btnBg || "#059669"};
  --th-btn-text: ${appearance.btnTextColor || "#ffffff"};
  --th-radius: ${appearance.borderRadius || "16px"};

  font-family: ${typography.fontFamily || "Inter, sans-serif"};
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  box-sizing: border-box;
}

.${slug}-hidden-input {
  display: none;
}

.${slug}-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 24px;
  background-color: var(--th-dropzone-bg);
  border: ${appearance.borderWidth || 2}px ${appearance.borderStyle || "dashed"} var(--th-border-color);
  border-radius: var(--th-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.${slug}-dropzone:hover {
  border-color: var(--th-accent);
}

.${slug}-dropzone-active {
  background-color: ${appearance.dragOverBg || "rgba(16, 185, 129, 0.12)"};
  border-color: var(--th-accent);
  transform: scale(1.01);
}

.${slug}-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--th-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.${slug}-icon {
  width: 24px;
  height: 24px;
}

.${slug}-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--th-title-color);
  margin: 0 0 4px 0;
}

.${slug}-desc {
  font-size: 13px;
  color: var(--th-desc-color);
  margin: 0 0 16px 0;
}

.${slug}-btn {
  background-color: var(--th-btn-bg);
  color: var(--th-btn-text);
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.${slug}-btn:hover {
  opacity: 0.9;
}

.${slug}-file-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.${slug}-file-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--th-bg);
  border: 1px solid var(--th-border-color);
  border-radius: 12px;
}

.${slug}-preview-img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
}

.${slug}-file-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--th-title-color);
}

.${slug}-file-size {
  display: block;
  font-size: 11px;
  color: var(--th-desc-color);
}

@media (max-width: 640px) {
  .${slug}-dropzone {
    padding: 24px 16px;
  }
}
`;

  return { jsx, css };
}

/**
 * Generates standalone, zero-dependency HTML / CSS / JS document.
 */
export function generateHtmlCss(config) {
  const {
    general = {},
    appearance = {},
    typography = {},
    fileSelection = {},
    validation = {},
  } = config;

  const multiple = Boolean(fileSelection.multiple);
  const acceptStr = fileSelection.acceptedExtensions || "*";
  const maxBytes = validation.maxSizeBytes || 10 * 1024 * 1024;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name || "Custom File Uploader"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${typography.fontFamily || "'Inter', sans-serif"};
      background-color: #0b0f19;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .uploader-card {
      width: 100%;
      max-width: 520px;
      background: ${appearance.cardBg || "#ffffff"};
      border-radius: ${appearance.borderRadius || "20px"};
      padding: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
      color: #0f172a;
    }
    .dropzone {
      border: ${appearance.borderWidth || 2}px ${appearance.borderStyle || "dashed"} ${appearance.borderColor || "#cbd5e1"};
      border-radius: ${appearance.borderRadius || "16px"};
      background: ${appearance.dropzoneBg || "#f8fafc"};
      padding: 32px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .dropzone.dragover {
      background: ${appearance.dragOverBg || "rgba(16, 185, 129, 0.12)"};
      border-color: ${appearance.accentColor || "#10b981"};
      transform: scale(1.01);
    }
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(16, 185, 129, 0.1);
      color: ${appearance.accentColor || "#10b981"};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    h2 { font-size: 16px; font-weight: 700; color: ${appearance.titleColor || "#0f172a"}; }
    p { font-size: 13px; color: ${appearance.descColor || "#64748b"}; }
    .btn {
      background: ${appearance.btnBg || "#059669"};
      color: ${appearance.btnTextColor || "#ffffff"};
      border: none;
      padding: 8px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.9; }
    .file-list { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #f1f5f9;
      border-radius: 10px;
      font-size: 13px;
    }
    .error-banner {
      margin-top: 12px;
      padding: 10px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #dc2626;
      font-size: 12px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="uploader-card">
    <div class="dropzone" id="dropzone">
      <div class="icon">☁️</div>
      <h2>${general.title || "Click to browse or drag & drop"}</h2>
      <p>${general.description || "Upload files up to maximum limit"}</p>
      <button type="button" class="btn" id="browseBtn">${general.browseBtnLabel || "Browse Files"}</button>
      <input type="file" id="fileInput" accept="${acceptStr}" ${multiple ? "multiple" : ""} style="display: none;">
    </div>
    <div class="error-banner" id="errorBanner"></div>
    <div class="file-list" id="fileList"></div>
  </div>

  <script>
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");
    const browseBtn = document.getElementById("browseBtn");
    const fileList = document.getElementById("fileList");
    const errorBanner = document.getElementById("errorBanner");

    const maxBytes = ${maxBytes};
    const accept = "${acceptStr}";

    browseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    dropzone.addEventListener("click", () => fileInput.click());

    ["dragenter", "dragover"].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
    });

    ["dragleave", "drop"].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files) handleFiles(e.target.files);
    });

    function handleFiles(files) {
      errorBanner.style.display = "none";
      fileList.innerHTML = "";
      for (const file of Array.from(files)) {
        if (file.size > maxBytes) {
          errorBanner.textContent = \`File "\${file.name}" exceeds \${(maxBytes / 1024 / 1024).toFixed(1)} MB limit.\`;
          errorBanner.style.display = "block";
          return;
        }
        const item = document.createElement("div");
        item.className = "file-item";
        item.innerHTML = \`<span>\${file.name}</span><span>\${(file.size / 1024).toFixed(1)} KB</span>\`;
        fileList.appendChild(item);
      }
    }
  </script>
</body>
</html>`;
}
