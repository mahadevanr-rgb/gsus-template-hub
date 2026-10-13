/**
 * File Format & Category Utilities
 */

/**
 * Format bytes into human-readable string (e.g. 1.4 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Extract file extension from filename or File object
 */
export function getFileExtension(filenameOrFile) {
  const name = typeof filenameOrFile === "string" ? filenameOrFile : filenameOrFile?.name || "";
  const dotIndex = name.lastIndexOf(".");
  return dotIndex !== -1 ? name.slice(dotIndex).toLowerCase() : "";
}

/**
 * Determine file category and metadata representation
 */
export function getFileCategory(fileOrName) {
  const name = typeof fileOrName === "string" ? fileOrName : fileOrName?.name || "";
  const ext = getFileExtension(name);
  const type = typeof fileOrName === "object" ? fileOrName?.type || "" : "";

  if (type.startsWith("image/") || [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".bmp"].includes(ext)) {
    return "image";
  }
  if (type === "application/pdf" || ext === ".pdf") {
    return "pdf";
  }
  if ([".doc", ".docx", ".rtf", ".odt", ".txt", ".md"].includes(ext) || type.includes("word") || type.includes("text")) {
    return "document";
  }
  if ([".xls", ".xlsx", ".csv", ".tsv"].includes(ext) || type.includes("sheet") || type.includes("csv")) {
    return "spreadsheet";
  }
  if ([".zip", ".rar", ".7z", ".tar", ".gz"].includes(ext) || type.includes("zip") || type.includes("compressed")) {
    return "archive";
  }
  if ([".mp4", ".mov", ".avi", ".webm", ".mkv"].includes(ext) || type.startsWith("video/")) {
    return "video";
  }
  if ([".mp3", ".wav", ".ogg", ".flac"].includes(ext) || type.startsWith("audio/")) {
    return "audio";
  }
  if ([".js", ".jsx", ".ts", ".tsx", ".html", ".css", ".json", ".py", ".rs", ".go"].includes(ext)) {
    return "code";
  }
  return "other";
}
