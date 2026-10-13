import { formatBytes, getFileExtension } from "./fileFormatUtils";

/**
 * Validate file against accept string (e.g., "image/*", ".pdf,.docx", "image/png,image/jpeg")
 */
export function validateFileType(file, accept) {
  if (!accept || accept === "*") return { valid: true };
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
 * Validate file against maximum byte size
 */
export function validateFileSize(file, maxSize) {
  if (!maxSize || maxSize <= 0) return { valid: true };
  if (!file) return { valid: false, error: "No file provided" };

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File exceeds the ${formatBytes(maxSize)} limit (Current: ${formatBytes(file.size)}).`,
    };
  }

  return { valid: true };
}

/**
 * Get image dimensions (width & height) from File or Object URL
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
      return reject(new Error("Invalid image source"));
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
      reject(new Error("Failed to load image for dimensions check"));
    };
    img.src = url;
  });
}

/**
 * Validate image dimensions against min/max constraints
 */
export async function validateImageDimensions(file, constraints = {}) {
  const { minWidth, maxWidth, minHeight, maxHeight } = constraints;
  if (!minWidth && !maxWidth && !minHeight && !maxHeight) {
    return { valid: true };
  }

  try {
    const { width, height } = await getImageDimensions(file);

    if (minWidth && width < minWidth) {
      return {
        valid: false,
        width,
        height,
        error: `Image width is too small (${width}px). Minimum required: ${minWidth}px.`,
      };
    }
    if (minHeight && height < minHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image height is too small (${height}px). Minimum required: ${minHeight}px.`,
      };
    }
    if (maxWidth && width > maxWidth) {
      return {
        valid: false,
        width,
        height,
        error: `Image width exceeds maximum limit (${width}px). Maximum allowed: ${maxWidth}px.`,
      };
    }
    if (maxHeight && height > maxHeight) {
      return {
        valid: false,
        width,
        height,
        error: `Image height exceeds maximum limit (${height}px). Maximum allowed: ${maxHeight}px.`,
      };
    }

    return { valid: true, width, height };
  } catch (err) {
    return { valid: false, error: "Unable to inspect image dimensions." };
  }
}
