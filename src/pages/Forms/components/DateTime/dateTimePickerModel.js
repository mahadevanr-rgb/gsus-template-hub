const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^(\d{2}):(\d{2})$/;

export function formatDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function parseDateTimeValue(value) {
  if (!value) return null;
  const dateMatch = String(value).match(DATE_PATTERN);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    return makeLocalDate(Number(year), Number(month), Number(day));
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function createDateTimeDraft(value, fallbackTime = "09:00") {
  const date = parseDateTimeValue(value);
  return {
    date: date ? formatDateKey(date) : "",
    time: date
      ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
      : fallbackTime,
  };
}

export function selectDraftDate(draft, date) {
  return { ...draft, date: typeof date === "string" ? date : formatDateKey(date) };
}

export function selectDraftTime(draft, time) {
  return { ...draft, time };
}

export function publishDateTimeValue(
  value,
  { controlled, setInternalValue, onChange } = {},
) {
  if (!controlled) setInternalValue?.(value);
  onChange?.(value);
}

function makeLocalDate(year, month, day, hours = 0, minutes = 0) {
  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hours ||
    date.getMinutes() !== minutes
  ) {
    return null;
  }
  return date;
}

function parseBound(value, edge) {
  if (!value) return { date: null };
  const text = String(value);
  const dateMatch = text.match(DATE_PATTERN);
  if (dateMatch) {
    const [, year, month, day] = dateMatch.map(Number);
    const date = makeLocalDate(
      year,
      month,
      day,
      edge === "max" ? 23 : 0,
      edge === "max" ? 59 : 0,
    );
    if (!date) return { error: `${edge} must be a valid ISO date or datetime.` };
    if (edge === "max") date.setSeconds(59, 999);
    return { date };
  }

  const date = new Date(text);
  if (Number.isNaN(date.getTime())) {
    return { error: `${edge} must be a valid ISO date or datetime.` };
  }
  return { date };
}

export function isCalendarDateAllowed(date, { min, max, disableWeekends = false } = {}) {
  if (disableWeekends && [0, 6].includes(date.getDay())) return false;
  const key = formatDateKey(date);
  const minBound = parseBound(min, "min");
  const maxBound = parseBound(max, "max");
  const minKey = minBound.date ? formatDateKey(minBound.date) : "";
  const maxKey = maxBound.date ? formatDateKey(maxBound.date) : "";
  return (!minKey || key >= minKey) && (!maxKey || key <= maxKey);
}

/**
 * Commit a picker draft as a local wall-clock value: YYYY-MM-DDTHH:mm.
 * The returned string deliberately has no timezone because the component
 * displays and edits local calendar and clock values.
 */
export function commitDateTimeDraft(draft, { min, max } = {}, onChange) {
  if (!draft?.date) return { ok: false, error: "Select a date before submitting." };
  const dateParts = String(draft.date).match(DATE_PATTERN);
  const timeParts = String(draft.time || "").match(TIME_PATTERN);
  if (!dateParts || !timeParts) {
    return { ok: false, error: "Choose a valid date and time." };
  }

  const [, year, month, day] = dateParts.map(Number);
  const [, hours, minutes] = timeParts.map(Number);
  if (hours > 23 || minutes > 59) {
    return { ok: false, error: "Choose a valid time." };
  }
  const date = makeLocalDate(year, month, day, hours, minutes);
  if (!date) return { ok: false, error: "Choose a valid local date and time." };

  const minBound = parseBound(min, "min");
  if (minBound.error) return { ok: false, error: minBound.error };
  const maxBound = parseBound(max, "max");
  if (maxBound.error) return { ok: false, error: maxBound.error };
  if (minBound.date && date < minBound.date) {
    return { ok: false, error: "Choose a time on or after the minimum." };
  }
  if (maxBound.date && date > maxBound.date) {
    return { ok: false, error: "Choose a time on or before the maximum." };
  }

  const value = `${formatDateKey(date)}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  onChange?.(value);
  return {
    ok: true,
    value,
  };
}
