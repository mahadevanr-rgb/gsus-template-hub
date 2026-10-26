import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { HelperText } from "../HelperText/HelperText";
import { InputError } from "../InputError/InputError";
import { InputLabel } from "../InputLabel/InputLabel";
import { TextInput } from "../TextInput/TextInput";

const pad = (value) => String(value).padStart(2, "0");
const validDate = (date) =>
  date instanceof Date && !Number.isNaN(date.getTime());
const dateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const parseDate = (value) => {
  if (value instanceof Date)
    return validDate(value)
      ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
      : null;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
};
const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const displayDate = (date, locale, format) =>
  date
    ? new Intl.DateTimeFormat(locale, { dateStyle: format }).format(date)
    : "";

/** Date picker returning a local Date (or null) through onChange. */
export function DatePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  disabledDate,
  disabledDays = [],
  disableWeekends = false,
  clearable = false,
  disabled = false,
  readOnly = false,
  label,
  required = false,
  helperText,
  error = false,
  errorMessage,
  placeholder = "Select date",
  locale,
  format = "short",
  renderCalendarHeader,
  renderCalendarFooter,
  defaultOpen = false,
  keepOpenOnSelect = false,
  accentColor = "#4f46e5",
  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  id: suppliedId,
  className = "",
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = suppliedId || generatedId;
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const dayButtons = useRef(new Map());
  const suppressOpenOnFocus = useRef(false);
  const controlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    parseDate(defaultValue),
  );
  const selected = controlled ? parseDate(value) : uncontrolledValue;
  const [draftValue, setDraftValue] = useState(null);
  const [draftError, setDraftError] = useState(false);
  const [open, setOpen] = useState(defaultOpen);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredDateKey, setHoveredDateKey] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(() =>
    monthStart(parseDate(controlled ? value : defaultValue) || new Date()),
  );
  const [focusedDate, setFocusedDate] = useState(
    () => parseDate(controlled ? value : defaultValue) || new Date(),
  );
  const focusInputWithoutOpening = () => {
    const input = inputRef.current;
    if (!input || document.activeElement === input) return;
    suppressOpenOnFocus.current = true;
    input.focus();
  };

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        focusInputWithoutOpening();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const min = parseDate(minDate);
  const max = parseDate(maxDate);
  const blockedKeys = new Set(
    disabledDates
      .map((date) => parseDate(date))
      .filter(Boolean)
      .map(dateKey),
  );
  const isDisabled = (date) =>
    date < (min || new Date(0)) ||
    (max && date > max) ||
    disabledDays.includes(date.getDay()) ||
    (disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) ||
    blockedKeys.has(dateKey(date)) ||
    (disabledDate?.(date) ?? false);
  const previousMonth = () => {
    const nextMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() - 1,
      1,
    );
    setVisibleMonth(nextMonth);
    setFocusedDate(nextMonth);
  };
  const nextMonth = () => {
    const next = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      1,
    );
    setVisibleMonth(next);
    setFocusedDate(next);
  };

  const commit = (date) => {
    if (!controlled) setUncontrolledValue(date);
    setDraftValue(null);
    setDraftError(false);
    if (date) setVisibleMonth(monthStart(date));
    onChange?.(date);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setDraftValue(text);
    if (!text.trim()) {
      setDraftError(false);
      if (selected) commit(null);
      return;
    }
    // Manual entry uses the ISO form YYYY-MM-DD, avoiding ambiguous locale dates.
    const candidate = parseDate(text);
    if (candidate && !isDisabled(candidate)) commit(candidate);
    else setDraftError(true);
  };

  const today = new Date();
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const selectedDisplay = displayDate(selected, locale, format);
  const isDark = theme === "dark" || (theme === "system" && document.documentElement.classList.contains("dark"));
  const fieldMetrics = {
    compact: { padding: "0.5rem 3.25rem 0.5rem 0.75rem", fontSize: "0.75rem" },
    sm: { padding: "0.5rem 3.25rem 0.5rem 0.75rem", fontSize: "0.75rem" },
    md: { padding: "0.625rem 3.25rem 0.625rem 1rem", fontSize: "0.875rem" },
    lg: { padding: "0.75rem 3.5rem 0.75rem 1.25rem", fontSize: "1rem" },
  }[size] || { padding: "0.625rem 3.25rem 0.625rem 1rem", fontSize: "0.875rem" };
  const fieldRadius = { default: "0.75rem", compact: "0.5rem", pill: "9999px" }[variant] || "0.75rem";
  useEffect(() => {
    if (!open) return;
    const key = dateKey(focusedDate);
    dayButtons.current.get(key)?.focus();
  }, [open, focusedDate, visibleMonth]);
  const firstDay = monthStart(visibleMonth);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
  const weeks = Array.from({ length: 6 }, (_, week) =>
    days.slice(week * 7, week * 7 + 7),
  );
  const showError = Boolean(error || errorMessage || draftError);
  const message =
    errorMessage ||
    (draftError
      ? "Enter a valid date (YYYY-MM-DD) within the allowed range."
      : "");

  return (
    <div ref={rootRef} className={`relative ${width === "auto" ? "w-fit max-w-full" : "w-full"} ${className}`}>
      {label && (
        <InputLabel htmlFor={inputId} required={required}>
          {label}
        </InputLabel>
      )}
      <div className="relative">
        <TextInput
          {...inputProps}
          containerClassName={width === "auto" ? "w-fit max-w-full" : "w-full"}
          ref={inputRef}
          id={inputId}
          type="text"
          value={draftValue ?? selectedDisplay}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          error={showError}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={showError}
          aria-describedby={
            showError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          onChange={handleTextChange}
          onFocus={() => {
            setFieldFocused(true);
            if (suppressOpenOnFocus.current) {
              suppressOpenOnFocus.current = false;
              return;
            }
            if (!readOnly && !disabled) {
              setFocusedDate(selected || new Date());
              setOpen(true);
            }
          }}
          onBlur={() => setFieldFocused(false)}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onClick={() => {
            if (!readOnly && !disabled) {
              setFocusedDate(selected || new Date());
              setOpen(true);
            }
          }}
          className="picker-accent-field"
          style={{
            ...fieldMetrics,
            width: width === "auto" ? "max-content" : "100%",
            maxWidth: "100%",
            borderRadius: fieldRadius,
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f1f5f9" : "#0f172a",
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)` : undefined,
            "--picker-accent": accentColor,
          }}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-slate-400">
          {clearable && selected && !disabled && !readOnly && (
            <button
              type="button"
              aria-label="Clear date"
              onClick={() => {
                commit(null);
                inputRef.current?.focus();
              }}
            className="picker-accent-hover picker-accent-focus rounded-md p-1"
            style={{ "--picker-accent": accentColor }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Open calendar"
            aria-expanded={open}
            disabled={disabled || readOnly}
            onClick={() => setOpen((current) => !current)}
            className="picker-accent-hover picker-accent-focus rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ "--picker-accent": accentColor }}
          >
            <CalendarDays className="h-4 w-4" />
          </button>
        </div>
      </div>
      {showError ? (
        <div id={`${inputId}-error`} role="alert">
          <InputError message={message || "Please enter a valid date."} />
        </div>
      ) : helperText ? (
        <div id={`${inputId}-helper`}>
          <HelperText text={helperText} />
        </div>
      ) : null}

      {open && !disabled && !readOnly && (
        <section
          role="dialog"
          aria-label="Choose a date"
          className={`absolute left-0 top-full z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border p-4 shadow-xl ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}
          style={{ "--picker-accent": accentColor }}
        >
          {renderCalendarHeader ? (
            renderCalendarHeader({ visibleMonth, previousMonth, nextMonth })
          ) : (
            <header className="mb-3 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={previousMonth}
                className="picker-accent-hover picker-accent-focus rounded-lg p-2 text-slate-500"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {monthLabel.format(visibleMonth)}
              </h2>
              <button
                type="button"
                aria-label="Next month"
                onClick={nextMonth}
                className="picker-accent-hover picker-accent-focus rounded-lg p-2 text-slate-500"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </header>
          )}
          <div
            className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-slate-400"
            aria-hidden="true"
          >
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} className="py-1">
                {new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(
                  new Date(2024, 0, 7 + index),
                )}
              </span>
            ))}
          </div>
          <div
            className="grid grid-cols-7 gap-y-1"
            role="grid"
            aria-label={monthLabel.format(visibleMonth)}
          >
            {weeks.flat().map((date) => {
              const outside = date.getMonth() !== visibleMonth.getMonth();
              const chosen = selected && dateKey(date) === dateKey(selected);
              const isToday = dateKey(date) === dateKey(today);
              const unavailable = isDisabled(date);
              return (
                <button
                  key={dateKey(date)}
                  ref={(node) => {
                    if (node) dayButtons.current.set(dateKey(date), node);
                    else dayButtons.current.delete(dateKey(date));
                  }}
                  tabIndex={dateKey(date) === dateKey(focusedDate) ? 0 : -1}
                  onFocus={() =>
                    setFocusedDate((current) =>
                      dateKey(current) === dateKey(date) ? current : date,
                    )
                  }
                  onMouseEnter={() => setHoveredDateKey(dateKey(date))}
                  onMouseLeave={() => setHoveredDateKey("")}
                  onKeyDown={(event) => {
                    const offsets = {
                      ArrowLeft: -1,
                      ArrowRight: 1,
                      ArrowUp: -7,
                      ArrowDown: 7,
                    };
                    if (offsets[event.key]) {
                      event.preventDefault();
                      const next = new Date(date);
                      next.setDate(next.getDate() + offsets[event.key]);
                      if (!isDisabled(next)) {
                        setFocusedDate(next);
                        if (next.getMonth() !== visibleMonth.getMonth())
                          setVisibleMonth(monthStart(next));
                      }
                    } else if (event.key === "Home" || event.key === "End") {
                      event.preventDefault();
                      const next = new Date(date);
                      next.setDate(
                        next.getDate() +
                          (event.key === "Home"
                            ? -date.getDay()
                            : 6 - date.getDay()),
                      );
                      setFocusedDate(next);
                      if (next.getMonth() !== visibleMonth.getMonth())
                        setVisibleMonth(monthStart(next));
                    } else if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      if (!isDisabled(date)) {
                        commit(date);
                        if (!keepOpenOnSelect) {
                          setOpen(false);
                          focusInputWithoutOpening();
                        }
                      }
                    }
                  }}
                  type="button"
                  role="gridcell"
                  aria-label={new Intl.DateTimeFormat(locale, {
                    dateStyle: "full",
                  }).format(date)}
                  aria-selected={Boolean(chosen)}
                  disabled={unavailable}
                  onClick={() => {
                    commit(date);
                    if (!keepOpenOnSelect) {
                      setOpen(false);
                      focusInputWithoutOpening();
                    }
                  }}
                  style={{
                    ...(chosen ? { backgroundColor: accentColor, color: "#fff", boxShadow: `0 4px 12px ${accentColor}40` } : isToday ? { border: `1px solid ${accentColor}`, color: accentColor } : hoveredDateKey === dateKey(date) ? { backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`, color: accentColor } : {}),
                    ...(focusedDate && dateKey(focusedDate) === dateKey(date) && !isToday && !chosen ? { outline: `1px solid ${accentColor}`, outlineOffset: 0 } : {}),
                  }}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs transition-colors focus-visible:outline-none ${chosen ? "font-semibold text-white" : "text-slate-700 dark:text-slate-200"} ${outside ? "opacity-40" : ""} disabled:cursor-not-allowed disabled:opacity-25`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          {renderCalendarFooter ? (
            renderCalendarFooter({
              selected,
              selectToday: () => {
                commit(
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                  ),
                );
                if (!keepOpenOnSelect) setOpen(false);
              },
              clear: () => {
                commit(null);
                setOpen(false);
              },
            })
          ) : (
            <footer className="mt-3 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                disabled={isDisabled(
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                  ),
                )}
                onClick={() => {
                  commit(
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate(),
                    ),
                  );
                if (!keepOpenOnSelect) setOpen(false);
                if (!keepOpenOnSelect) focusInputWithoutOpening();
                }}
                className="picker-accent-hover picker-accent-focus rounded-lg px-2 py-1 text-xs font-medium disabled:opacity-40"
                style={{ "--picker-accent": accentColor, color: accentColor }}
              >
                Today
              </button>
              {clearable && selected && (
                <button
                  type="button"
                  onClick={() => {
                    commit(null);
                    setOpen(false);
                    focusInputWithoutOpening();
                  }}
                  className="picker-accent-hover picker-accent-focus rounded-lg px-2 py-1 text-xs text-slate-500"
                  style={{ "--picker-accent": accentColor }}
                >
                  Clear
                </button>
              )}
            </footer>
          )}
        </section>
      )}
    </div>
  );
}

export default DatePicker;
