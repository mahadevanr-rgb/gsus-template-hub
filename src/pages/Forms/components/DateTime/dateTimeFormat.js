/**
 * Format a Date or local datetime-local value for display.
 * The original value is never mutated or converted for storage.
 */
export function formatDateTimeValue(value, { locale, timezone, dateStyle = "medium", timeStyle = "short" } = {}) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const options = { dateStyle, timeStyle };
  if (timezone) options.timeZone = timezone;
  return new Intl.DateTimeFormat(locale, options).format(date);
}
