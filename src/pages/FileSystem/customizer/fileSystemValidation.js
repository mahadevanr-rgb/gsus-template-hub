/**
 * File System Validation Engine
 * Standalone, robust client-side validation logic reused across Preview and Code Export.
 */

import { formatBytes, getFileExtension, getFileCategory } from "@/components/common/FileSystem/fileFormatUtils";

export { formatBytes, getFileExtension, getFileCategory };

/**
 * Validate file against accept string (e.g. ".pdf,.png", "image/*", "application/pdf")
 */
export function validateFileType(file, accept) {
  if (!accept || accept === "*" || accept === "*/*") return { valid: true };
  if (!file) return { valid: false, error: "No file provided" };

  const acceptItems = accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (acceptItems.length === 0) return { valid: true };

  const fileName = (file.name || "").toLowerCase();
  const fileType = (file.type || "").toLowerCase();
  const fileExt = getFileExtension(fileName);

  const isValid = acceptItems.some((rule) => {
    if (rule.startsWith(".")) {
      return fileExt === rule;
    }
    if (rule.endsWith("/*")) {
      const prefix = rule.slice(0, -2);
      return fileType.startsWith(prefix);
    }
    return fileType === rule;
  });

  if (!isValid) {
    const readableRules = acceptItems
      .map((r) => r.replace(/^\./, "").replace("/*", " files").toUpperCase())
      .join(", ");
    return {
      valid: false,
      error: `Invalid file type. Supported formats: ${readableRules}`,
    };
  }

  return { valid: true };
}

/**
 * Validate file size against minimum and maximum byte constraints
 */
export function validateFileSize(file, maxSize, minSize = 0) {
  if (!file) return { valid: false, error: "No file provided" };

  if (maxSize && maxSize > 0 && file.size > maxSize) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds maximum limit (${formatBytes(maxSize)}). Current: ${formatBytes(file.size)}.`,
    };
  }

  if (minSize && minSize > 0 && file.size < minSize) {
    return {
      valid: false,
      error: `File "${file.name}" is smaller than minimum required (${formatBytes(minSize)}). Current: ${formatBytes(file.size)}.`,
    };
  }

  return { valid: true };
}

/**
 * Validate total combined batch size
 */
export function validateBatchSize(existingFiles = [], newFiles = [], maxBatchSize = null) {
  if (!maxBatchSize || maxBatchSize <= 0) return { valid: true };

  const totalExistingBytes = existingFiles.reduce((acc, f) => acc + (f.size || f.file?.size || 0), 0);
  const totalNewBytes = Array.from(newFiles).reduce((acc, f) => acc + (f.size || 0), 0);
  const totalBytes = totalExistingBytes + totalNewBytes;

  if (totalBytes > maxBatchSize) {
    return {
      valid: false,
      error: `Total batch size (${formatBytes(totalBytes)}) exceeds limit of ${formatBytes(maxBatchSize)}.`,
    };
  }

  return { valid: true, totalBytes };
}

/**
 * Validate file count limits (single or batch)
 */
export function validateFileCount(currentCount, incomingCount, maxFiles = 10, multiple = false) {
  if (!multiple && (currentCount > 0 || incomingCount > 1)) {
    return {
      valid: false,
      error: "Only a single file can be uploaded at a time.",
    };
  }

  if (multiple && maxFiles && currentCount + incomingCount > maxFiles) {
    return {
      valid: false,
      error: `Maximum file limit reached (${maxFiles} files). Cannot add ${incomingCount} more.`,
    };
  }

  return { valid: true };
}

/**
 * Check if incoming file is a duplicate of an existing file
 */
export function isDuplicateFile(newFile, existingFiles = []) {
  if (!newFile || !existingFiles.length) return false;
  return existingFiles.some((item) => {
    const existing = item.file || item;
    return (
      existing.name === newFile.name &&
      existing.size === newFile.size &&
      (existing.lastModified === newFile.lastModified || !existing.lastModified)
    );
  });
}

/**
 * Inspect image dimensions (natural width & height)
 */
export function getImageDimensions(fileOrUrl) {
  return new Promise((resolve, reject) => {
    let url = "";
    let isCreatedUrl = false;

    if (typeof fileOrUrl === "string") {
      url = fileOrUrl;
    } else if (fileOrUrl instanceof Blob || fileOrUrl instanceof File) {
      url = URL.createObjectURL(fileOrUrl);
      isCreatedUrl = true;
    } else {
      return reject(new Error("Invalid image source for dimension inspection"));
    }

    const img = new Image();
    img.onload = () => {
      const dimensions = { width: img.naturalWidth, height: img.naturalHeight };
      if (isCreatedUrl) {
        URL.revokeObjectURL(url);
      }
      resolve(dimensions);
    };
    img.onerror = () => {
      if (isCreatedUrl) {
        URL.revokeObjectURL(url);
      }
      reject(new Error("Failed to decode image for dimensions check"));
    };
    img.src = url;
  });
}

/**
 * Validate image constraints: min/max dimensions & aspect ratio
 */
export async function validateImageDimensions(file, constraints = {}) {
  const { minWidth, maxWidth, minHeight, maxHeight, aspectRatio } = constraints;
  if (!minWidth && !maxWidth && !minHeight && !maxHeight && (!aspectRatio || aspectRatio === "auto")) {
    return { valid: true };
  }

  try {
    const { width, height } = await getImageDimensions(file);

    if (minWidth && width < minWidth) {
      return {
        valid: false,
        width,
        height,
        error: `Image width (${width}px) is below minimum of ${minWidth}px.`,
      };
    }
    if (minHeight && height < minHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image height (${height}px) is below minimum of ${minHeight}px.`,
      };
    }
    if (maxWidth && width > maxWidth) {
      return {
        valid: false,
        width,
        height,
        error: `Image width (${width}px) exceeds maximum allowed of ${maxWidth}px.`,
      };
    }
    if (maxHeight && height > maxHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image height (${height}px) exceeds maximum allowed of ${maxHeight}px.`,
      };
    }

    if (aspectRatio && aspectRatio !== "auto") {
      const targetRatios = {
        "1:1": 1,
        "16:9": 16 / 9,
        "4:3": 4 / 3,
        "3:2": 3 / 2,
        "9:16": 9 / 16,
      };
      const expected = targetRatios[aspectRatio];
      if (expected) {
        const actual = width / height;
        const tolerance = 0.05; // 5% leeway
        if (Math.abs(actual - expected) > tolerance) {
          return {
            valid: false,
            width,
            height,
            error: `Image aspect ratio (${actual.toFixed(2)}) does not match required ${aspectRatio}.`,
          };
        }
      }
    }

    return { valid: true, width, height };
  } catch (err) {
    return { valid: false, error: "Unable to inspect image dimensions. Ensure file is a valid image." };
  }
}

/**
 * Master validation function for a single file according to customizer configuration
 */
export async function validateFileRecord(file, config, existingFiles = []) {
  if (!file) return { valid: false, error: "No file provided" };

  // 1. Duplicate check
  if (config.fileSelection?.preventDuplicates && isDuplicateFile(file, existingFiles)) {
    return { valid: false, error: `File "${file.name}" has already been selected.` };
  }

  // 2. MIME & Extension validation
  const acceptStr = config.fileSelection?.acceptedExtensions || config.fileSelection?.acceptMime || "*";
  const typeResult = validateFileType(file, acceptStr);
  if (!typeResult.valid) {
    return typeResult;
  }

  // 3. File size validation
  const maxBytes = config.validation?.maxSizeBytes || (config.validation?.maxSizeValue ? config.validation.maxSizeValue * (config.validation.maxSizeUnit === "KB" ? 1024 : 1024 * 1024) : null);
  const minBytes = config.validation?.minSizeBytes || 0;
  const sizeResult = validateFileSize(file, maxBytes, minBytes);
  if (!sizeResult.valid) {
    return sizeResult;
  }

  // 4. Image dimensions validation if applicable
  const category = getFileCategory(file);
  if (category === "image" && config.validation?.validateDimensions) {
    const dimResult = await validateImageDimensions(file, {
      minWidth: config.validation.minWidth,
      maxWidth: config.validation.maxWidth,
      minHeight: config.validation.minHeight,
      maxHeight: config.validation.maxHeight,
      aspectRatio: config.validation.aspectRatio,
    });
    if (!dimResult.valid) {
      return dimResult;
    }
    return { valid: true, dimensions: { width: dimResult.width, height: dimResult.height } };
  }

  return { valid: true };
}
