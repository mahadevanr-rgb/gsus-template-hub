import {
  validateFileType,
  validateFileSize,
  validateImageDimensions,
  getFileCategory,
} from "./fileUtils";

/**
 * Process and validate an individual incoming File instance into a managed file record.
 */
export async function processAndValidateFile(file, options = {}) {
  const {
    accept = "*",
    maxSize = null,
    minWidth = null,
    maxWidth = null,
    minHeight = null,
    maxHeight = null,
    registerPreviewUrl = (url) => url,
  } = options;

  const category = getFileCategory(file);
  let previewUrl = null;

  if (category === "image") {
    previewUrl = registerPreviewUrl(URL.createObjectURL(file));
  }

  const fileRecord = {
    id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    file,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    category,
    previewUrl,
    status: "validating",
    progress: 0,
    error: null,
    dimensions: null,
  };

  // 1. MIME / Extension type validation
  const typeCheck = validateFileType(file, accept);
  if (!typeCheck.valid) {
    fileRecord.status = "error";
    fileRecord.error = typeCheck.error;
    return fileRecord;
  }

  // 2. Size ceiling validation
  const sizeCheck = validateFileSize(file, maxSize);
  if (!sizeCheck.valid) {
    fileRecord.status = "error";
    fileRecord.error = sizeCheck.error;
    return fileRecord;
  }

  // 3. Image dimensions validation if constraints are provided
  if (category === "image" && (minWidth || maxWidth || minHeight || maxHeight)) {
    const dimCheck = await validateImageDimensions(file, {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    });

    if (!dimCheck.valid) {
      fileRecord.status = "error";
      fileRecord.error = dimCheck.error;
      return fileRecord;
    }

    fileRecord.dimensions = { width: dimCheck.width, height: dimCheck.height };
  }

  fileRecord.status = "selected";
  return fileRecord;
}
