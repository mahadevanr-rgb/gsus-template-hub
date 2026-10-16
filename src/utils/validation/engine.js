import { getRuleMessage, isEmptyValue, validationRules } from "./rules";

const normalizeConfig = (rulesConfig) => {
  if (!rulesConfig) return [];
  if (Array.isArray(rulesConfig)) return rulesConfig.map((rule) => [rule.name || rule.type, rule]);
  if (typeof rulesConfig === "function") return [["custom", rulesConfig]];
  return Object.entries(rulesConfig).filter(([name]) => name !== "dependsOn");
};

const unpackRule = (config) => {
  if (config && typeof config === "object" && !Array.isArray(config)) {
    return { enabled: config.value ?? config.enabled ?? true, message: config.message, validator: config.validator, debounceMs: config.debounceMs };
  }
  if (typeof config === "function") return { enabled: true, validator: config };
  return { enabled: config, message: undefined, validator: undefined, debounceMs: undefined };
};

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

export async function validateField(value, rulesConfig, context = {}, options = {}) {
  const mode = options.mode || context.mode || "first";
  const errors = [];
  const ruleEntries = normalizeConfig(rulesConfig);

  for (const [name, config] of ruleEntries) {
    const rule = unpackRule(config);
    if (!rule.enabled) continue;
    if (name !== "required" && isEmptyValue(value)) continue;

    const ruleContext = { ...context, value, rule: name, mode };
    let result;
    try {
      if (name === "custom" || name === "async") {
        const validator = rule.validator || (typeof config === "function" ? config : config?.validate);
        if (typeof validator !== "function") continue;
        const delay = Number(rule.debounceMs ?? options.debounceMs ?? 300);
        if (delay > 0) await wait(delay);
        result = await validator(value, ruleContext);
      } else {
        const validate = validationRules[name];
        if (!validate) continue;
        result = await validate(value, rule.enabled, ruleContext);
      }
    } catch {
      result = "Validation could not be completed.";
    }

    if (result === true || result === undefined || result === null) continue;
    const message = typeof result === "string"
      ? result
      : rule.message || getRuleMessage(name, rule.enabled);
    errors.push(message);
    if (mode !== "all") break;
  }

  return { valid: errors.length === 0, errors, error: errors[0] || "" };
}

export async function validateForm(values = {}, schema = {}, options = {}) {
  const errors = {};
  const fields = Object.keys(schema);
  const results = await Promise.all(fields.map(async (field) => {
    const result = await validateField(values[field], schema[field], {
      ...(options.context || {}),
      value: values[field],
      field,
      values,
      mode: options.mode || "first",
    }, options);
    return [field, result];
  }));
  results.forEach(([field, result]) => {
    if (result.errors.length) errors[field] = options.mode === "all" ? result.errors : result.error;
  });
  return { valid: Object.keys(errors).length === 0, errors };
}
