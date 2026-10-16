const pickerAppearance = ["theme", "size", "width", "variant"];

const appearanceProps = {
  theme: { type: "enum", values: ["light", "dark", "system"] },
  size: { type: "enum", values: ["compact", "md", "lg"] },
  width: { type: "enum", values: ["full", "auto"] },
  variant: { type: "enum", values: ["default", "compact", "pill"] },
  accentColor: { type: "color" },
  disabled: { type: "boolean" },
  className: { type: "string" },
};

const namedProp = { name: { type: "string" } };

const calendarProps = {
  minDate: { type: "date" },
  maxDate: { type: "date" },
  disabledDates: { type: "date-list" },
  disabledDays: { type: "weekday-list" },
  disableWeekends: { type: "boolean" },
  presets: { type: "presets" },
  clearable: { type: "boolean" },
  locale: { type: "enum", values: ["en-US", "en-GB", "de-DE", "ja-JP"] },
  disabledDate: { type: "function", json: false },
};

const datetimeProps = {
  min: { type: "datetime-bound" },
  max: { type: "datetime-bound" },
  locale: { type: "enum", values: ["en-US", "en-GB", "de-DE", "ja-JP"] },
  timeFormat: { type: "enum", values: ["12h", "24h"] },
  clearable: { type: "boolean" },
  disableWeekends: { type: "boolean" },
};

const timeProps = {
  format: { type: "enum", values: ["12h", "24h"] },
  includeSeconds: { type: "boolean" },
  min: { type: "time" },
  max: { type: "time" },
};

const datePickerProps = {
  ...appearanceProps,
  ...calendarProps,
  errorMessage: { type: "string" },
  keepOpenOnOutsideClick: { type: "boolean" },
  renderCalendarHeader: { type: "function", json: false },
  renderCalendarFooter: { type: "function", json: false },
};

const dateRangePickerProps = { ...appearanceProps, ...calendarProps, ...namedProp, errorMessage: { type: "string" } };
const monthPickerProps = { ...appearanceProps, ...namedProp, min: { type: "month" }, max: { type: "month" } };
const yearPickerProps = { ...appearanceProps, ...namedProp, min: { type: "year" }, max: { type: "year" } };
const weekPickerProps = {
  ...appearanceProps,
  ...namedProp,
  min: { type: "week" },
  max: { type: "week" },
  clearable: { type: "boolean" },
};
const timePickerProps = { ...appearanceProps, ...namedProp, ...timeProps };
const dateTimePickerProps = { ...appearanceProps, ...namedProp, ...datetimeProps, keepOpenOnOutsideClick: { type: "boolean" } };
const dateTimeRangePickerProps = {
  ...appearanceProps,
  ...namedProp,
  ...datetimeProps,
  min: { type: "datetime-bound" },
  max: { type: "datetime-bound" },
};

/** Canonical serializable prop metadata shared by Date & Time and compositions. */
export const pickerPropMetadata = {
  "date-picker": datePickerProps,
  "date-range-picker": dateRangePickerProps,
  "month-picker": monthPickerProps,
  "year-picker": yearPickerProps,
  "week-picker": weekPickerProps,
  "time-picker": timePickerProps,
  "datetime-picker": dateTimePickerProps,
  "datetime-range-picker": dateTimeRangePickerProps,
};

export const pickerVisualControlGroups = {
  appearance: ["theme", "size", "width", "variant", "accentColor"],
  dateTime: {
    "date-picker": ["locale", "clearable", "disableWeekends", "minDate", "maxDate", "disabledDates", "disabledDays", "presets"],
    "date-range-picker": ["locale", "clearable", "disableWeekends", "minDate", "maxDate", "disabledDates", "disabledDays", "presets"],
    "month-picker": ["min", "max"],
    "year-picker": ["min", "max"],
    "week-picker": ["clearable", "min", "max"],
    "time-picker": ["format", "includeSeconds", "min", "max"],
    "datetime-picker": ["locale", "timeFormat", "clearable", "disableWeekends", "min", "max"],
    "datetime-range-picker": ["locale", "timeFormat", "clearable", "disableWeekends", "min", "max"],
  },
};

const isValidDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
};

const isValidDateTimeBound = (value) => {
  if (isValidDate(value)) return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return false;
  const [date, time] = value.split("T");
  const [hour, minute] = time.split(":").map(Number);
  return isValidDate(date) && hour < 24 && minute < 60;
};

function validateValue(name, value, definition) {
  if (definition.json === false) return `${name} is a callback and cannot be stored in JSON. Configure it in code instead.`;
  switch (definition.type) {
    case "enum":
      return definition.values.includes(value) ? "" : `${name} must be one of: ${definition.values.join(", ")}.`;
    case "boolean":
      return typeof value === "boolean" ? "" : `${name} must be true or false.`;
    case "color":
      return typeof value === "string" && /^#[\da-f]{3}(?:[\da-f]{3}|[\da-f]{5})?$/i.test(value) ? "" : `${name} must be a hex color, such as #4f46e5.`;
    case "date":
      return isValidDate(value) ? "" : `${name} must be a valid date in YYYY-MM-DD format.`;
    case "date-list":
      return Array.isArray(value) && value.every(isValidDate) ? "" : `${name} must be an array of valid YYYY-MM-DD dates.`;
    case "weekday-list":
      return Array.isArray(value) && value.every((day) => Number.isInteger(day) && day >= 0 && day <= 6) ? "" : `${name} must be an array of weekday numbers from 0 (Sunday) to 6 (Saturday).`;
    case "datetime-bound":
      return isValidDateTimeBound(value) ? "" : `${name} must be a valid date (YYYY-MM-DD) or local date and time (YYYY-MM-DDTHH:mm).`;
    case "time":
      return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value) ? "" : `${name} must use 24-hour HH:mm format.`;
    case "presets":
      if (!Array.isArray(value)) return `${name} must be an array of presets.`;
      for (const preset of value) {
        if (!preset || typeof preset !== "object" || typeof preset.label !== "string" || !preset.value || typeof preset.value !== "object" || Array.isArray(preset.value)) return `Each ${name} item needs a label and a start/end value object.`;
        const { start, end } = preset.value;
        if (!isValidDate(start) || !isValidDate(end) || start > end) return `Each ${name} value needs valid start/end dates, with start on or before end.`;
      }
      return "";
    case "month":
      return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value) ? "" : `${name} must use YYYY-MM format.`;
    case "year":
      return (typeof value === "number" && Number.isInteger(value)) || (typeof value === "string" && /^\d{4}$/.test(value)) ? "" : `${name} must be a four-digit year.`;
    case "week":
      return typeof value === "string" && /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(value) ? "" : `${name} must use ISO week format, such as 2026-W24.`;
    case "string":
      return typeof value === "string" ? "" : `${name} must be text.`;
    default:
      return `${name} has no JSON validator.`;
  }
}

export function validateDateTimePickerProps(component, props = {}) {
  const canonicalComponent = ({ date: "date-picker", dateRange: "date-range-picker", month: "month-picker", year: "year-picker", week: "week-picker", time: "time-picker", datetime: "datetime-picker", datetimeRange: "datetime-range-picker" })[component] || component;
  const metadata = pickerPropMetadata[canonicalComponent];
  if (!metadata) return ["This field is not a registered Date & Time picker."];
  if (!props || typeof props !== "object" || Array.isArray(props)) return ["Picker options must be a JSON object."];
  const errors = [];
  for (const [name, value] of Object.entries(props)) {
    const definition = metadata[name];
    if (!definition) {
      errors.push(`Unsupported option for this picker: ${name}.`);
      continue;
    }
    const error = validateValue(name, value, definition);
    if (error) errors.push(error);
  }
  return errors;
}

export function validateCompositionValidationRules(rules = {}) {
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) return ["Validation rules must be a JSON object."];
  const supported = new Set(["required", "minLength", "maxLength", "min", "max", "pattern", "email", "url", "number", "integer", "positive", "date", "time", "datetime", "dateRange"]);
  const errors = [];
  for (const [name, config] of Object.entries(rules)) {
    if (!supported.has(name)) {
      errors.push(`Unsupported validation rule: ${name}.`);
      continue;
    }
    if (config && typeof config === "object") {
      if (Array.isArray(config) || Object.keys(config).some((key) => !["value", "enabled", "message"].includes(key))) {
        errors.push(`${name} must be a value or an object containing value, enabled, and/or message.`);
      } else if (config.message !== undefined && typeof config.message !== "string") {
        errors.push(`${name}.message must be text.`);
      } else if (["value", "enabled"].some((key) => config[key] !== undefined && !["boolean", "number", "string"].includes(typeof config[key]))) {
        errors.push(`${name}.value and ${name}.enabled must be simple JSON values.`);
      }
    } else if (!["boolean", "number", "string"].includes(typeof config)) {
      errors.push(`${name} must be a boolean, number, or text value.`);
    }
  }
  return errors;
}

export const pickerCustomizationChoices = {
  theme: {
    name: "theme",
    label: "Appearance",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
  },
  size: {
    name: "size",
    label: "Size",
    options: [
      { value: "compact", label: "Compact" },
      { value: "md", label: "Comfortable" },
      { value: "lg", label: "Large" },
    ],
  },
  width: {
    name: "width",
    label: "Width",
    options: [
      { value: "full", label: "Full" },
      { value: "auto", label: "Auto" },
    ],
  },
  variant: {
    name: "variant",
    label: "Corners",
    options: [
      { value: "default", label: "Rounded" },
      { value: "compact", label: "Compact" },
      { value: "pill", label: "Pill" },
    ],
  },
  locale: {
    name: "locale",
    label: "Locale",
    help: "Formats month, weekday, and selected date labels; it does not change the stored value or timezone.",
    options: [
      { value: "en-US", label: "English (US)" },
      { value: "en-GB", label: "English (UK)" },
      { value: "de-DE", label: "German" },
      { value: "ja-JP", label: "Japanese" },
    ],
  },
  timeFormat: {
    name: "timeFormat",
    label: "Time format",
    options: [
      { value: "24h", label: "24 hour" },
      { value: "12h", label: "12 hour" },
    ],
  },
  format: {
    name: "format",
    label: "Time format",
    options: [
      { value: "24h", label: "24 hour" },
      { value: "12h", label: "12 hour" },
    ],
  },
  accentColor: {
    name: "accentColor",
    label: "Accent color",
    type: "color",
    options: [
      { value: "#4f46e5", label: "Indigo" },
      { value: "#2563eb", label: "Blue" },
      { value: "#0f766e", label: "Teal" },
      { value: "#e11d48", label: "Rose" },
    ],
  },
  clearable: { name: "clearable", label: "Clearable", type: "checkbox" },
  disableWeekends: {
    name: "disableWeekends",
    label: "Disable weekends",
    type: "checkbox",
  },
};

const controlsByComponent = {
  "date-picker": [...pickerAppearance, "accentColor", "locale", "clearable", "disableWeekends"],
  "date-range-picker": [...pickerAppearance, "accentColor", "locale", "clearable", "disableWeekends"],
  "month-picker": [...pickerAppearance, "accentColor"],
  "year-picker": [...pickerAppearance, "accentColor"],
  "week-picker": [...pickerAppearance, "accentColor", "clearable"],
  "time-picker": [...pickerAppearance, "accentColor", "format"],
  "datetime-picker": [...pickerAppearance, "accentColor", "locale", "timeFormat", "clearable", "disableWeekends"],
  "datetime-range-picker": [...pickerAppearance, "accentColor", "locale", "timeFormat", "clearable", "disableWeekends"],
};

export function getPickerCustomizationControls(componentSlug) {
  return (controlsByComponent[componentSlug] || pickerAppearance).map(
    (key) => pickerCustomizationChoices[key],
  );
}
