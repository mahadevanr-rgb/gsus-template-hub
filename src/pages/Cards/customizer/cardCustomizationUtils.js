import { getCardSchema, UNIVERSAL_DEFAULT_CONFIG } from "./cardCustomizerConfig";

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
export function normalizeCardConfig(sourceCardId, userConfig = {}) {
  const schema = getCardSchema(sourceCardId);
  const baseDefaults = deepClone(schema.defaultConfig || UNIVERSAL_DEFAULT_CONFIG);

  const merged = {
    id: userConfig.id || `card-${Date.now()}`,
    sourceCardId: sourceCardId || "profile-card",
    name: userConfig.name || schema.title || "Customized Card",
    schemaVersion: "1.0.0",
    layout: {
      ...baseDefaults.layout,
      ...(userConfig.layout || {}),
    },
    colors: {
      ...baseDefaults.colors,
      ...(userConfig.colors || {}),
    },
    typography: {
      ...baseDefaults.typography,
      ...(userConfig.typography || {}),
    },
    borders: {
      ...baseDefaults.borders,
      ...(userConfig.borders || {}),
    },
    content: {
      ...baseDefaults.content,
      ...(userConfig.content || {}),
    },
    button: {
      ...baseDefaults.button,
      ...(userConfig.button || {}),
    },
    image: {
      ...baseDefaults.image,
      ...(userConfig.image || {}),
    },
    interactive: {
      ...baseDefaults.interactive,
      ...(userConfig.interactive || {}),
    },
  };

  // Deep clone array contents in content (e.g. stats, features, tags)
  if (Array.isArray(merged.content.stats)) {
    merged.content.stats = merged.content.stats.map((s) => ({ ...s }));
  }
  if (Array.isArray(merged.content.features)) {
    merged.content.features = [...merged.content.features];
  }
  if (Array.isArray(merged.content.tags)) {
    merged.content.tags = [...merged.content.tags];
  }

  return merged;
}

/**
 * Formats a user-facing name into a clean PascalCase component name.
 */
export function toPascalCase(str) {
  if (!str) return "CustomCard";
  return (
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^([a-z])/, (_, chr) => chr.toUpperCase()) || "CustomCard"
  );
}

/**
 * Formats a user-facing name into a clean slug / filename.
 */
export function toSlug(str) {
  if (!str) return "custom-card";
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom-card"
  );
}

/**
 * Serializes configuration to clean JSON for export.
 */
export function serializeConfig(config) {
  const exportPayload = {
    schemaVersion: "1.0.0",
    exportedAt: new Date().toISOString(),
    card: {
      name: config.name,
      sourceCardId: config.sourceCardId,
      layout: config.layout,
      colors: config.colors,
      typography: config.typography,
      borders: config.borders,
      content: config.content,
      button: config.button,
      image: config.image,
      interactive: config.interactive,
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
    const cardData = parsed.card || parsed;
    if (!cardData || typeof cardData !== "object") {
      throw new Error("Invalid configuration structure: missing card definition.");
    }
    const sourceCardId = cardData.sourceCardId || "profile-card";
    const normalized = normalizeCardConfig(sourceCardId, cardData);
    if (cardData.name) normalized.name = cardData.name;
    return { success: true, config: normalized };
  } catch (err) {
    return { success: false, error: err.message || "Failed to parse JSON configuration." };
  }
}
