import {
  getOverlaySchema,
  UNIVERSAL_DEFAULT_CONFIG,
} from "./modalOverlayCustomizerConfig";

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
export function sanitizeColor(color, fallback = "#6366f1") {
  if (!color || typeof color !== "string") return fallback;
  const trimmed = color.trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed))
    return trimmed;
  if (/^(rgb|rgba|hsl|hsla)\(/.test(trimmed)) return trimmed;
  if (trimmed === "transparent" || trimmed === "currentColor") return trimmed;
  if (/^[0-9a-fA-F]{6}$/.test(trimmed)) return `#${trimmed}`;
  return fallback;
}

/**
 * Generates a stable unique ID.
 */
export function generateItemId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Deeply merges user customized config with base schema defaults.
 */
export function normalizeOverlayConfig(sourceComponentId, userConfig = {}) {
  const schema = getOverlaySchema(sourceComponentId);
  const baseDefaults = deepClone(UNIVERSAL_DEFAULT_CONFIG);
  const patternDefaults = schema.defaultConfig || {};

  const userInner = userConfig.configuration || userConfig;

  const merged = {
    id: userConfig.id || `overlay-${Date.now()}`,
    sourceComponentId: sourceComponentId || "basic-modal",
    overlayType: schema.overlayType || "modal",
    name: userConfig.name || `${schema.name} Custom`,
    schemaVersion: "1.0.0",

    dimensions: {
      ...baseDefaults.dimensions,
      ...(patternDefaults.dimensions || {}),
      ...(userInner.dimensions || {}),
    },

    content: {
      ...baseDefaults.content,
      ...(patternDefaults.content || {}),
      ...(userInner.content || {}),
    },

    colors: {
      ...baseDefaults.colors,
      ...(patternDefaults.colors || {}),
      ...(userInner.colors || {}),
    },

    borders: {
      ...baseDefaults.borders,
      ...(patternDefaults.borders || {}),
      ...(userInner.borders || {}),
    },

    typography: {
      ...baseDefaults.typography,
      ...(patternDefaults.typography || {}),
      ...(userInner.typography || {}),
    },

    headerFooter: {
      ...baseDefaults.headerFooter,
      ...(patternDefaults.headerFooter || {}),
      ...(userInner.headerFooter || {}),
    },

    buttons: {
      ...baseDefaults.buttons,
      ...(patternDefaults.buttons || {}),
      ...(userInner.buttons || {}),
    },

    backdrop: {
      ...baseDefaults.backdrop,
      ...(patternDefaults.backdrop || {}),
      ...(userInner.backdrop || {}),
    },

    animation: {
      ...baseDefaults.animation,
      ...(patternDefaults.animation || {}),
      ...(userInner.animation || {}),
    },

    interaction: {
      ...baseDefaults.interaction,
      ...(patternDefaults.interaction || {}),
      ...(userInner.interaction || {}),
    },

    patternSpecific: {
      ...baseDefaults.patternSpecific,
      ...(patternDefaults.patternSpecific || {}),
      ...(userInner.patternSpecific || {}),
    },
  };

  // Deep clone array contents in content
  if (Array.isArray(userInner.content?.formFields)) {
    merged.content.formFields = userInner.content.formFields.map((f) => ({ ...f }));
  } else if (Array.isArray(patternDefaults.content?.formFields)) {
    merged.content.formFields = patternDefaults.content.formFields.map((f) => ({ ...f }));
  }

  if (Array.isArray(userInner.content?.menuItems)) {
    merged.content.menuItems = userInner.content.menuItems.map((m) => ({ ...m }));
  } else if (Array.isArray(patternDefaults.content?.menuItems)) {
    merged.content.menuItems = patternDefaults.content.menuItems.map((m) => ({ ...m }));
  }

  if (Array.isArray(userInner.content?.commandItems)) {
    merged.content.commandItems = userInner.content.commandItems.map((c) => ({ ...c }));
  } else if (Array.isArray(patternDefaults.content?.commandItems)) {
    merged.content.commandItems = patternDefaults.content.commandItems.map((c) => ({ ...c }));
  }

  return merged;
}

/**
 * Converts string to PascalCase for component naming.
 */
export function toPascalCase(str) {
  if (!str) return "CustomOverlay";
  return (
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^[a-z]/, (m) => m.toUpperCase()) || "CustomOverlay"
  );
}

/**
 * Formats a name into a clean slug/filename.
 */
export function toSlug(str) {
  if (!str) return "custom-overlay";
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom-overlay"
  );
}

/**
 * Returns the CSS box-shadow string for a shadow preset.
 */
export function getShadowValue(preset) {
  switch (preset) {
    case "none":
      return "none";
    case "sm":
      return "0 1px 2px 0 rgb(0 0 0 / 0.1)";
    case "md":
      return "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)";
    case "lg":
      return "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.2)";
    case "xl":
      return "0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.3)";
    case "2xl":
      return "0 25px 50px -12px rgb(0 0 0 / 0.5)";
    default:
      return "0 20px 25px -5px rgb(0 0 0 / 0.35)";
  }
}

/**
 * Serializes configuration to clean JSON for export.
 */
export function serializeConfig(config) {
  const exportPayload = {
    schemaVersion: "1.0.0",
    exportedAt: new Date().toISOString(),
    overlay: {
      name: config.name,
      sourceComponentId: config.sourceComponentId,
      overlayType: config.overlayType,
      dimensions: config.dimensions,
      content: config.content,
      colors: config.colors,
      borders: config.borders,
      typography: config.typography,
      headerFooter: config.headerFooter,
      buttons: config.buttons,
      backdrop: config.backdrop,
      animation: config.animation,
      interaction: config.interaction,
      patternSpecific: config.patternSpecific,
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
    const overlayData = parsed.overlay || parsed;
    if (!overlayData || typeof overlayData !== "object") {
      throw new Error("Invalid configuration structure: missing overlay definition.");
    }
    const sourceComponentId = overlayData.sourceComponentId || "basic-modal";
    const normalized = normalizeOverlayConfig(sourceComponentId, overlayData);
    if (overlayData.name) normalized.name = overlayData.name;
    return { success: true, config: normalized };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to parse JSON configuration.",
    };
  }
}
