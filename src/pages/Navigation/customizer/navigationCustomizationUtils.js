import {
  getDefaultNavigationConfig,
  getNavigationSchema,
} from "./navigationCustomizerConfig";

export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.warn("deepClone error:", err);
    return { ...obj };
  }
}

export function toPascalCase(str) {
  if (!str) return "CustomNavigation";
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}

export function toSlug(str) {
  if (!str) return "custom-navigation";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getShadowValue(intensity = "lg", shadowColor = "rgba(0,0,0,0.2)") {
  switch (intensity) {
    case "none":
      return "none";
    case "sm":
      return `0 1px 2px 0 ${shadowColor}`;
    case "md":
      return `0 4px 6px -1px ${shadowColor}, 0 2px 4px -2px ${shadowColor}`;
    case "lg":
      return `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`;
    case "xl":
      return `0 20px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColor}`;
    case "2xl":
      return `0 25px 50px -12px ${shadowColor}`;
    default:
      return `0 10px 15px -3px ${shadowColor}`;
  }
}

export function normalizeNavigationConfig(sourceId = "navbar", savedData = null) {
  const schema = getNavigationSchema(sourceId);
  const baseDefaults = getDefaultNavigationConfig(schema.id);

  if (!savedData) return baseDefaults;

  const rawConfig = savedData.configuration || savedData;

  return {
    ...baseDefaults,
    ...rawConfig,
    id: savedData.id || rawConfig.id || baseDefaults.id,
    name: savedData.name || rawConfig.name || baseDefaults.name,
    sourceComponentId: schema.id,
    componentType: schema.id,

    brand: {
      ...baseDefaults.brand,
      ...(rawConfig.brand || {}),
    },

    items: rawConfig.items || baseDefaults.items,
    groups: rawConfig.groups || baseDefaults.groups,
    columns: rawConfig.columns || baseDefaults.columns,

    colors: {
      ...baseDefaults.colors,
      ...(rawConfig.colors || {}),
    },

    border: {
      ...baseDefaults.border,
      ...(rawConfig.border || {}),
    },

    typography: {
      ...baseDefaults.typography,
      ...(rawConfig.typography || {}),
    },

    layout: {
      ...baseDefaults.layout,
      ...(rawConfig.layout || {}),
    },

    animation: {
      ...baseDefaults.animation,
      ...(rawConfig.animation || {}),
    },

    responsive: {
      ...baseDefaults.responsive,
      ...(rawConfig.responsive || {}),
    },

    behavior: {
      ...baseDefaults.behavior,
      ...(rawConfig.behavior || {}),
    },
  };
}

export function serializeNavigationConfig(config) {
  return JSON.stringify(
    {
      templateHubSchemaVersion: "1.0.0",
      type: "navigation",
      sourceComponentId: config.sourceComponentId,
      name: config.name,
      configuration: config,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function validateNavigationJsonConfig(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { valid: false, error: "Parsed JSON is not an object" };
  }

  const config = parsed.configuration || parsed;
  if (!config || typeof config !== "object") {
    return { valid: false, error: "Configuration object is missing" };
  }

  if (!config.sourceComponentId && !config.componentType) {
    return { valid: false, error: "Missing sourceComponentId or componentType" };
  }

  return { valid: true, config };
}

export function parseImportedNavigationConfig(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const validation = validateNavigationJsonConfig(parsed);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const sourceId = validation.config.sourceComponentId || validation.config.componentType || "navbar";
    const normalized = normalizeNavigationConfig(sourceId, validation.config);
    return { success: true, config: normalized };
  } catch (err) {
    return { success: false, error: err.message || "Invalid JSON syntax" };
  }
}
