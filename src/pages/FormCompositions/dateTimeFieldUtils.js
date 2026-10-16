import {
  DatePicker,
  DateRangePicker,
  MonthPicker,
  YearPicker,
  WeekPicker,
  TimePicker,
  DateTimePicker,
  DateTimeRangePicker,
} from "@/pages/Forms/components/DateTime/DateTimePickers";
import {
  pickerCustomizationChoices,
  pickerPropMetadata,
  pickerVisualControlGroups,
  validateDateTimePickerProps,
  validateCompositionValidationRules,
} from "@/pages/DateTime/components/pickerCustomizationControls";

export const DateTimeComponentMap = {
  date: DatePicker,
  "date-picker": DatePicker,
  dateRange: DateRangePicker,
  "date-range-picker": DateRangePicker,
  month: MonthPicker,
  "month-picker": MonthPicker,
  year: YearPicker,
  "year-picker": YearPicker,
  week: WeekPicker,
  "week-picker": WeekPicker,
  time: TimePicker,
  "time-picker": TimePicker,
  datetime: DateTimePicker,
  "datetime-picker": DateTimePicker,
  datetimeRange: DateTimeRangePicker,
  "datetime-range-picker": DateTimeRangePicker,
};

const aliases = {
  date: "date-picker",
  dateRange: "date-range-picker",
  month: "month-picker",
  year: "year-picker",
  week: "week-picker",
  time: "time-picker",
  datetime: "datetime-picker",
  datetimeRange: "datetime-range-picker",
};

export function normalizePickerSlug(component) {
  return aliases[component] || component;
}

export function getPickerPropMetadata(component) {
  return pickerPropMetadata[normalizePickerSlug(component)] || null;
}

export { validateDateTimePickerProps, validateCompositionValidationRules };

export function getDateTimePickerProps(component, props = {}) {
  const metadata = getPickerPropMetadata(component);
  if (!metadata) return {};
  return Object.fromEntries(
    Object.keys(metadata)
      .filter((name) => metadata[name].json !== false && props[name] !== undefined)
      .map((name) => [name, props[name]]),
  );
}

export function getCompositionPickerTheme(fieldProps = {}, compositionTheme = "default") {
  if (fieldProps.theme) return fieldProps.theme;
  return compositionTheme === "default" ? "system" : "light";
}

export function getCompositionPickerProps(component, props = {}, compositionTheme = "default") {
  const normalized = getDateTimePickerProps(component, props);
  const metadata = getPickerPropMetadata(component);
  if (metadata?.theme) normalized.theme = getCompositionPickerTheme(props, compositionTheme);
  return normalized;
}

export function getPickerVisualControls(component) {
  const slug = normalizePickerSlug(component);
  const metadata = getPickerPropMetadata(slug);
  if (!metadata) return { appearance: [], dateTime: [] };
  const appearance = pickerVisualControlGroups.appearance
    .filter((name) => metadata[name])
    .map((name) => ({ name, ...pickerCustomizationChoices[name], ...metadata[name] }));
  const dateTime = (pickerVisualControlGroups.dateTime[slug] || [])
    .filter((name) => metadata[name])
    .map((name) => ({ name, ...(pickerCustomizationChoices[name] || {}), ...metadata[name] }));
  return { appearance, dateTime };
}

export function getCompositionFieldValidationRules(field) {
  const rules = { ...(field?.validationRules || {}) };
  if (field?.props?.required) rules.required = true;
  if (["dateRange", "date-range-picker", "datetimeRange", "datetime-range-picker"].includes(field?.component)) {
    rules.dateRange ??= true;
  }
  return rules;
}
