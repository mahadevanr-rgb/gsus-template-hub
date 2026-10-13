import React, { useRef } from "react";
import { UploadCloud, FileUp, Sparkles } from "lucide-react";
import { formatBytes } from "./fileUtils";

/**
 * FileDropZone
 * Accessible drag-and-drop zone with browse button and keyboard support.
 */
export default function FileDropZone({
  onFilesSelected,
  accept = "*",
  multiple = false,
  disabled = false,
  maxSize = null,
  title = null,
  description = null,
  icon: CustomIcon = null,
  isDragOver = false,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  className = "",
  compact = false,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (disabled) return;
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onFilesSelected) {
        onFilesSelected(e.target.files);
      }
    }
  };

  // Helper text computation
  const getHelperText = () => {
    if (description) return description;
    const parts = [];
    if (accept && accept !== "*") {
      const cleanAccept = accept
        .split(",")
        .map((s) => s.trim().replace(/^\./, "").replace("/*", ""))
        .join(", ")
        .toUpperCase();
      parts.push(`Supported: ${cleanAccept}`);
    }
    if (maxSize) {
      parts.push(`Max size: ${formatBytes(maxSize)}`);
    }
    return parts.join(" · ") || "All files supported";
  };

  const IconComponent = CustomIcon || UploadCloud;

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      aria-disabled={disabled}
      aria-label="Upload files area. Drag and drop or press enter to browse files."
      className={`
        relative group cursor-pointer select-none rounded-2xl border-2 border-dashed
        transition-all duration-200 outline-none
        ${compact ? "p-4 sm:p-5" : "p-6 sm:p-8"}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30"
            : isDragOver
            ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 scale-[1.008]"
            : "border-slate-300 dark:border-slate-800/90 bg-slate-50/50 dark:bg-slate-900/50 hover:border-indigo-500/60 dark:hover:border-indigo-500/50 hover:bg-slate-100/60 dark:hover:bg-slate-900/80"
        }
        focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex flex-col items-center justify-center text-center space-y-3 pointer-events-none">
        {/* Glow effect on hover/drag */}
        <div
          className={`
            w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300
            ${
              isDragOver
                ? "bg-indigo-600 text-white scale-110 shadow-md shadow-indigo-500/30"
                : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-105"
            }
          `}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="space-y-1 max-w-sm">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {title || (
              <>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  Click to browse
                </span>{" "}
                or drag & drop
              </>
            )}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {getHelperText()}
          </p>
        </div>

        {multiple && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Multiple files allowed</span>
          </div>
        )}
      </div>
    </div>
  );
}
