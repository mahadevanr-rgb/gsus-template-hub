import {
  getAccordionSchema,
  UNIVERSAL_DEFAULT_CONFIG,
} from "./accordionCustomizerConfig";

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
 * Generates a stable unique ID for new accordion items.
 */
export function generateItemId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Deeply merges user customized config with base schema defaults.
 */
export function normalizeAccordionConfig(sourceComponentId, userConfig = {}) {
  const schema = getAccordionSchema(sourceComponentId);
  const baseDefaults = deepClone(UNIVERSAL_DEFAULT_CONFIG);

  const defaultItems =
    userConfig.configuration?.items ||
    userConfig.items ||
    schema.defaultItems ||
    [];

  const patternSpecific = {
    ...(schema.patternSpecific || {}),
    ...(userConfig.configuration?.patternSpecific ||
      userConfig.patternSpecific ||
      {}),
  };

  const userColors =
    userConfig.configuration?.colors || userConfig.colors || {};
  const userBorders =
    userConfig.configuration?.borders || userConfig.borders || {};
  const userTypography =
    userConfig.configuration?.typography || userConfig.typography || {};
  const userIcons =
    userConfig.configuration?.icons || userConfig.icons || {};
  const userAnimation =
    userConfig.configuration?.animation || userConfig.animation || {};
  const userLayout =
    userConfig.configuration?.layout || userConfig.layout || {};
  const userResponsive =
    userConfig.configuration?.responsive || userConfig.responsive || {};

  const merged = {
    id:
      userConfig.id ||
      `accordion-${Date.now()}`,
    sourceComponentId: sourceComponentId || "numbered-accordion",
    name:
      userConfig.name ||
      schema.title ||
      "My Custom Accordion",
    schemaVersion: "1.0.0",

    // Top-level config fields
    sectionTitle:
      userConfig.configuration?.sectionTitle ||
      userConfig.sectionTitle ||
      baseDefaults.sectionTitle,
    sectionDescription:
      userConfig.configuration?.sectionDescription ||
      userConfig.sectionDescription ||
      baseDefaults.sectionDescription,
    showSectionTitle:
      userConfig.configuration?.showSectionTitle ??
      userConfig.showSectionTitle ??
      baseDefaults.showSectionTitle,
    width:
      userConfig.configuration?.width ||
      userConfig.width ||
      baseDefaults.width,
    maxWidth:
      userConfig.configuration?.maxWidth ||
      userConfig.maxWidth ||
      baseDefaults.maxWidth,
    containerPadding:
      userConfig.configuration?.containerPadding ||
      userConfig.containerPadding ||
      baseDefaults.containerPadding,
    contentAlignment:
      userConfig.configuration?.contentAlignment ||
      userConfig.contentAlignment ||
      baseDefaults.contentAlignment,
    expansionMode:
      userConfig.configuration?.expansionMode ||
      userConfig.expansionMode ||
      baseDefaults.expansionMode,
    collapsible:
      userConfig.configuration?.collapsible ??
      userConfig.collapsible ??
      baseDefaults.collapsible,
    initialExpandedItem:
      userConfig.configuration?.initialExpandedItem ||
      userConfig.initialExpandedItem ||
      baseDefaults.initialExpandedItem,
    initialExpandedItems:
      userConfig.configuration?.initialExpandedItems ||
      userConfig.initialExpandedItems ||
      [...baseDefaults.initialExpandedItems],

    items: defaultItems.map((item) => ({ ...item })),

    colors: {
      ...baseDefaults.colors,
      ...userColors,
    },
    borders: {
      ...baseDefaults.borders,
      ...userBorders,
    },
    typography: {
      ...baseDefaults.typography,
      ...userTypography,
    },
    icons: {
      ...baseDefaults.icons,
      ...userIcons,
    },
    animation: {
      ...baseDefaults.animation,
      ...userAnimation,
    },
    layout: {
      ...baseDefaults.layout,
      ...userLayout,
    },
    responsive: {
      ...baseDefaults.responsive,
      ...userResponsive,
    },
    patternSpecific,
  };

  return merged;
}

/**
 * Formats a name into PascalCase for component naming.
 */
export function toPascalCase(str) {
  if (!str) return "CustomAccordion";
  return (
    str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^([a-z])/, (_, chr) => chr.toUpperCase()) || "CustomAccordion"
  );
}

/**
 * Formats a name into a clean slug/filename.
 */
export function toSlug(str) {
  if (!str) return "custom-accordion";
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom-accordion"
  );
}

/**
 * Serializes configuration to clean JSON for export.
 */
export function serializeConfig(config) {
  const exportPayload = {
    schemaVersion: "1.0.0",
    exportedAt: new Date().toISOString(),
    accordion: {
      name: config.name,
      sourceComponentId: config.sourceComponentId,
      expansionMode: config.expansionMode,
      collapsible: config.collapsible,
      initialExpandedItem: config.initialExpandedItem,
      initialExpandedItems: config.initialExpandedItems,
      items: config.items,
      colors: config.colors,
      borders: config.borders,
      typography: config.typography,
      icons: config.icons,
      animation: config.animation,
      layout: config.layout,
      responsive: config.responsive,
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
    const accordionData = parsed.accordion || parsed;
    if (!accordionData || typeof accordionData !== "object") {
      throw new Error(
        "Invalid configuration structure: missing accordion definition."
      );
    }
    const sourceComponentId =
      accordionData.sourceComponentId || "simple-accordion";
    const normalized = normalizeAccordionConfig(
      sourceComponentId,
      accordionData
    );
    if (accordionData.name) normalized.name = accordionData.name;
    return { success: true, config: normalized };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to parse JSON configuration.",
    };
  }
}

/**
 * Reorders an array item from oldIndex to newIndex (immutable).
 */
export function reorderArray(arr, oldIndex, newIndex) {
  const result = [...arr];
  const [removed] = result.splice(oldIndex, 1);
  result.splice(newIndex, 0, removed);
  return result;
}

/**
 * Validates a numeric config value with a min/max guard.
 */
export function clampNumber(value, min = 0, max = 9999) {
  const num = parseFloat(value);
  if (isNaN(num)) return min;
  return Math.min(max, Math.max(min, num));
}

/**
 * Returns the CSS box-shadow string for a shadow preset.
 */
export function getShadowValue(preset) {
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
    default:
      return "none";
  }
}
