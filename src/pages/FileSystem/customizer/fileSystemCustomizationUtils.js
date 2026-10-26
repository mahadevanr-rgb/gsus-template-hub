import {
  getFileSystemSchema,
  UNIVERSAL_DEFAULT_CONFIG,
} from "./fileSystemCustomizerConfig";

/**
 * Deep clones an object immutably.
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}

/**
 * Validates and sanitizes a CSS color string.
 */
export function sanitizeColor(color, fallback = "#10b981") {
  if (!color || typeof color !== "string") return fallback;
  const trimmed = color.trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed)) {
    return trimmed;
  }
  if (/^(rgb|rgba|hsl|hsla)\(/.test(trimmed)) {
    return trimmed;
  }
  if (trimmed === "transparent" || trimmed === "currentColor") {
    return trimmed;
  }
  if (/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    return `#${trimmed}`;
  }
  return fallback;
}

/**
 * Deeply merges user customized config with base schema defaults to guarantee completeness.
 */
export function normalizeFileSystemConfig(sourceComponentId, userConfig = {}) {
  const schema = getFileSystemSchema(sourceComponentId);
  const baseDefaults = deepClone(schema.defaultConfig || UNIVERSAL_DEFAULT_CONFIG);

  const merged = {
    id: userConfig.id || `fs-${Date.now()}`,
    sourceComponentId: sourceComponentId || "basic-file-upload",
    name: userConfig.name || schema.title || "Customized File Uploader",
    category: "file-system",
    schemaVersion: "1.0.0",

    general: {
      ...baseDefaults.general,
      ...(userConfig.general || {}),
    },

    layout: {
      ...baseDefaults.layout,
      ...(userConfig.layout || {}),
    },

    appearance: {
      ...baseDefaults.appearance,
      ...(userConfig.appearance || {}),
    },

    typography: {
      ...baseDefaults.typography,
      ...(userConfig.typography || {}),
    },

    icons: {
      ...baseDefaults.icons,
      ...(userConfig.icons || {}),
    },

    fileSelection: {
      ...baseDefaults.fileSelection,
      ...(userConfig.fileSelection || {}),
    },

    validation: {
      ...baseDefaults.validation,
      ...(userConfig.validation || {}),
    },

    preview: {
      ...baseDefaults.preview,
      ...(userConfig.preview || {}),
    },

    uploadBehavior: {
      ...baseDefaults.uploadBehavior,
      ...(userConfig.uploadBehavior || {}),
    },

    responsive: {
      ...baseDefaults.responsive,
      ...(userConfig.responsive || {}),
    },
  };

  // Reconcile single vs multiple contradictions
  if (!merged.fileSelection.multiple) {
    merged.fileSelection.maxFiles = 1;
  } else if (merged.fileSelection.maxFiles <= 1) {
    merged.fileSelection.maxFiles = 5;
  }

  // Calculate byte representation for file size limits
  const unit = merged.validation.maxSizeUnit === "KB" ? 1024 : 1024 * 1024;
  merged.validation.maxSizeBytes = (merged.validation.maxSizeValue || 10) * unit;

  return merged;
}

/**
 * Formats a user-facing name into a clean PascalCase component name.
 */
export function toPascalCase(str) {
  if (!str) return "CustomFileUploader";
  return (
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^([a-z])/, (_, chr) => chr.toUpperCase()) || "CustomFileUploader"
  );
}

/**
 * Formats a user-facing name into a clean slug / filename.
 */
export function toSlug(str) {
  if (!str) return "custom-file-uploader";
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom-file-uploader"
  );
}

/**
 * Serializes configuration to clean JSON for export.
 */
export function serializeConfig(config) {
  const exportPayload = {
    schemaVersion: "1.0.0",
    exportedAt: new Date().toISOString(),
    component: {
      id: config.id,
      name: config.name,
      sourceComponentId: config.sourceComponentId,
      category: "file-system",
      general: config.general,
      layout: config.layout,
      appearance: config.appearance,
      typography: config.typography,
      icons: config.icons,
      fileSelection: config.fileSelection,
      validation: config.validation,
      preview: config.preview,
      uploadBehavior: config.uploadBehavior,
      responsive: config.responsive,
    },
  };
  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Parses and validates an imported JSON configuration.
 */
export function parseImportedConfig(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const compData = parsed.component || parsed.fileSystem || parsed;
    if (!compData || typeof compData !== "object") {
      throw new Error("Invalid configuration structure: missing component definition.");
    }
    const sourceComponentId = compData.sourceComponentId || "basic-file-upload";
    const normalized = normalizeFileSystemConfig(sourceComponentId, compData);
    if (compData.name) normalized.name = compData.name;
    return { success: true, config: normalized };
  } catch (err) {
    return { success: false, error: err.message || "Failed to parse JSON configuration." };
  }
}
