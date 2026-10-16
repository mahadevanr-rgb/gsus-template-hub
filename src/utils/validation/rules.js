const isEmpty = (value) => value === "" || value === null || value === undefined;

const parseDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
};

const parseTime = (value) => {
  if (typeof value !== "string" || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [hours, minutes] = value.split(":").map(Number);
  return hours < 24 && minutes < 60 ? hours * 60 + minutes : null;
};

const parseDateTime = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const [datePart, timePart] = value.split("T");
  const date = parseDate(datePart);
  const time = parseTime(timePart);
  return date && time !== null ? date.getTime() + time * 60_000 : null;
};

const messageFor = (rule, param) => ({
  required: "This field is required.",
  minLength: `Enter at least ${param} characters.`,
  maxLength: `Enter no more than ${param} characters.`,
  min: `Enter a value greater than or equal to ${param}.`,
  max: `Enter a value less than or equal to ${param}.`,
  pattern: "The value has an invalid format.",
  email: "Enter a valid email address.",
  url: "Enter a valid URL.",
  number: "Enter a valid number.",
  integer: "Enter a whole number.",
  positive: "Enter a positive number.",
  date: "Enter a valid date in YYYY-MM-DD format.",
  time: "Enter a valid time in HH:mm format.",
  datetime: "Enter a valid date and time in YYYY-MM-DDTHH:mm format.",
  dateRange: "The start date must be on or before the end date.",
})[rule] || "This value is invalid.";

export const validationRules = {
  required: (value) => {
    if (isEmpty(value) || value === false || (typeof value === "string" && !value.trim())) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object" && !(value instanceof Date)) {
      if ("start" in value || "end" in value) return !isEmpty(value.start) && !isEmpty(value.end);
      return Object.keys(value).length > 0;
    }
    return true;
  },
  minLength: (value, length) => String(value).length >= Number(length),
  maxLength: (value, length) => String(value).length <= Number(length),
  min: (value, minimum) => {
    if (typeof value === "number" || /^-?\d+(\.\d+)?$/.test(String(value))) return Number(value) >= Number(minimum);
    const date = parseDate(value);
    if (date && parseDate(minimum)) return date >= parseDate(minimum);
    const dateTime = parseDateTime(value);
    if (dateTime !== null && parseDateTime(minimum) !== null) return dateTime >= parseDateTime(minimum);
    return false;
  },
  max: (value, maximum) => {
    if (typeof value === "number" || /^-?\d+(\.\d+)?$/.test(String(value))) return Number(value) <= Number(maximum);
    const date = parseDate(value);
    if (date && parseDate(maximum)) return date <= parseDate(maximum);
    const dateTime = parseDateTime(value);
    if (dateTime !== null && parseDateTime(maximum) !== null) return dateTime <= parseDateTime(maximum);
    return false;
  },
  pattern: (value, pattern) => new RegExp(pattern).test(String(value)),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),
  url: (value) => {
    try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
  },
  number: (value) => /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(String(value).trim()),
  integer: (value) => /^[-+]?\d+$/.test(String(value).trim()),
  positive: (value) => /^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(String(value).trim()) && Number(value) > 0,
  date: (value) => Boolean(parseDate(value)),
  time: (value) => parseTime(value) !== null,
  datetime: (value) => parseDateTime(value) !== null,
  dateRange: (value) => {
    if (!value || typeof value !== "object") return false;
    if (isEmpty(value.start) || isEmpty(value.end)) return true;
    const parseRangeValue = (item) => {
      const date = parseDate(item);
      if (date) return date.getTime();
      return parseDateTime(item);
    };
    const start = parseRangeValue(value.start);
    const end = parseRangeValue(value.end);
    return start !== null && end !== null && start <= end;
  },
};

export const isEmptyValue = isEmpty;
export const getRuleMessage = messageFor;
