import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { HelperText } from "../HelperText/HelperText";
import { InputError } from "../InputError/InputError";
import { InputLabel } from "../InputLabel/InputLabel";
import {
  commitDateTimeDraft,
  createDateTimeDraft,
  formatDateKey,
  isCalendarDateAllowed,
  parseDateTimeValue,
  publishDateTimeValue,
  selectDraftTime,
} from "./dateTimePickerModel";

/* -------------------------------------------------------------------------- */
/* Shared styling                                                             */
/* -------------------------------------------------------------------------- */

const getFieldClass = ({
  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) => {
  const widthClass =
    {
      auto: "w-auto",
      full: "w-full",
    }[width] || "w-full";

  const sizeClass =
    {
      compact: "px-3 py-2 text-xs",
      sm: "px-3 py-2 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
    }[size] || "px-4 py-2.5 text-sm";

  const themeClass =
    {
      light:
        "bg-white text-slate-800 border-slate-200 placeholder:text-slate-400 hover:border-slate-300",
      dark: "bg-slate-900 text-slate-100 border-slate-700 placeholder:text-slate-500 hover:border-slate-600",
      system:
        "bg-white text-slate-800 border-slate-200 placeholder:text-slate-400 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:placeholder:text-slate-500 dark:hover:border-slate-600",
    }[theme] || "bg-white text-slate-800 border-slate-200";

  const variantClass =
    {
      default: "rounded-xl",
      compact: "rounded-lg",
      pill: "rounded-full",
    }[variant] || "rounded-xl";

  return [
    widthClass,
    sizeClass,
    variantClass,
    "border outline-none transition-all duration-200",
    "focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-slate-50 dark:read-only:bg-slate-950",
    themeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
};

const getISOWeekValue = (date) => {
  const thursday = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const year = thursday.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil(((thursday - yearStart) / 86400000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
};

const getDateFromISOWeek = (value) => {
  const match = /^(\d{4})-W(\d{2})$/.exec(value || "");
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (week < 1 || week > 53) return null;
  const januaryFourth = new Date(year, 0, 4);
  const weekday = januaryFourth.getDay() || 7;
  januaryFourth.setDate(januaryFourth.getDate() - weekday + 1 + (week - 1) * 7);
  return getISOWeekValue(januaryFourth) === value ? januaryFourth : null;
};

const FormField = ({ id, label, helperText, errorMessage, children }) => (
  <div className="w-full">
    {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
    {children}
    {errorMessage ? (
      <InputError message={errorMessage} />
    ) : helperText ? (
      <HelperText text={helperText} />
    ) : null}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Advanced Date & Time Date Picker (Single Date Picker)                      */
/* -------------------------------------------------------------------------- */

export function DatePicker({
  value = null,
  onChange,
  label = "Date picker",
  placeholder = "Select date",
  minDate,
  maxDate,
  disabledDates = [],
  disabledDays = [],
  disabledDate,
  disableWeekends = false,
  presets = [],
  clearable = true,
  disabled = false,
  locale = "en-US",
  accentColor = "#4f46e5",
  keepOpenOnOutsideClick = false,
  renderCalendarHeader,
  renderCalendarFooter,
  commitOnSelect = false,
  errorMessage,

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const fieldClass = getFieldClass({ theme, size, width, variant, className });

  const validInitial = useMemo(() => {
    const initialDate = value ? new Date(value) : null;
    return initialDate && !Number.isNaN(initialDate.getTime())
      ? initialDate
      : null;
  }, [value]);

  const [open, setOpen] = useState(false);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredDay, setHoveredDay] = useState("");
  const [focusedDay, setFocusedDay] = useState("");
  const [draftValue, setDraftValue] = useState(validInitial);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const init = validInitial || new Date();
    return new Date(init.getFullYear(), init.getMonth(), 1);
  });

  const pickerRef = useRef(null);

  useEffect(() => {
    // Keep the draft synchronized with controlled value changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftValue(validInitial);
  }, [validInitial]);

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") {
        setOpen(false);
        setDraftValue(validInitial);
      }
      if (
        event.type === "mousedown" &&
        !keepOpenOnOutsideClick &&
        !pickerRef.current?.contains(event.target)
      ) {
        setOpen(false);
        setDraftValue(validInitial);
      }
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open, keepOpenOnOutsideClick, validInitial]);

  const dateKey = (d) =>
    [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-");

  const unavailable = (d) => {
    if (!d) return false;
    const key = dateKey(d);
    const day = d.getDay();
    const minKey = minDate
      ? minDate instanceof Date
        ? dateKey(minDate)
        : minDate.slice(0, 10)
      : null;
    const maxKey = maxDate
      ? maxDate instanceof Date
        ? dateKey(maxDate)
        : maxDate.slice(0, 10)
      : null;

    return (
      (minKey && key < minKey) ||
      (maxKey && key > maxKey) ||
      disabledDates.some((blocked) =>
        typeof blocked === "string"
          ? blocked === key
          : blocked instanceof Date && dateKey(blocked) === key,
      ) ||
      disabledDays.includes(day) ||
      (disableWeekends && [0, 6].includes(day)) ||
      Boolean(disabledDate?.(d))
    );
  };

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);

  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(2024, 0, 7 + index),
    ),
  );

  const firstDay = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  ).getDay();

  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();

  const today = new Date();

  const handleSelectDate = (d) => {
    if (unavailable(d)) return;
    setDraftValue(d);
    if (commitOnSelect) {
      onChange?.(dateKey(d));
      setOpen(false);
    }
  };

  const applyDraft = () => {
    if (draftValue) {
      onChange?.(dateKey(draftValue));
    } else {
      onChange?.(null);
    }
    setOpen(false);
  };

  const cancelDraft = () => {
    setDraftValue(validInitial);
    setOpen(false);
  };

  const applyPreset = (preset) => {
    const res =
      typeof preset.value === "function" ? preset.value() : preset.value;
    const d = res instanceof Date ? res : new Date(res);
    if (!Number.isNaN(d.getTime()) && !unavailable(d)) {
      setDraftValue(d);
      onChange?.(dateKey(d));
      setOpen(false);
    }
  };

  const displayString = validInitial
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
        validInitial,
      )
    : placeholder;

  const isSystem = theme === "system";
  const isDark =
    theme === "dark" ||
    (isSystem && document.documentElement.classList.contains("dark"));
  const popupSurface = isDark
    ? "border-slate-700 bg-slate-900 text-slate-100"
    : "border-slate-200 bg-white text-slate-900";
  const mutedText = isDark ? "text-slate-400" : "text-slate-500";
  const hoverDay = isDark
    ? "text-slate-200 hover:bg-slate-800"
    : "text-slate-700 hover:bg-slate-100";
  const hoverControl = isDark
    ? "hover:bg-slate-800 hover:text-white"
    : "hover:bg-slate-100 hover:text-slate-900";

  return (
    <FormField id={id} label={label} errorMessage={errorMessage}>
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            if (validInitial) {
              setVisibleMonth(
                new Date(
                  validInitial.getFullYear(),
                  validInitial.getMonth(),
                  1,
                ),
              );
            }
            setOpen((curr) => !curr);
          }}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
          className={`${fieldClass} picker-accent-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused
              ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
              : undefined,
            width: width === "auto" ? "max-content" : "100%",
            maxWidth: "100%",
          }}
        >
          <span
            className={
              validInitial
                ? `truncate ${isDark ? "text-slate-100" : "text-slate-900"}`
                : `truncate ${isDark ? "text-slate-500" : "text-slate-400"}`
            }
          >
            {displayString}
          </span>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
        </button>

        {open && (
          <div
            role="dialog"
            aria-label="Choose date"
            style={{ "--picker-accent": accentColor }}
            className={`absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${popupSurface}`}
          >
            {renderCalendarHeader ? (
              renderCalendarHeader({
                visibleMonth,
                previousMonth: () =>
                  setVisibleMonth(
                    (c) => new Date(c.getFullYear(), c.getMonth() - 1, 1),
                  ),
                nextMonth: () =>
                  setVisibleMonth(
                    (c) => new Date(c.getFullYear(), c.getMonth() + 1, 1),
                  ),
                monthLabel,
              })
            ) : (
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() =>
                    setVisibleMonth(
                      (c) => new Date(c.getFullYear(), c.getMonth() - 1, 1),
                    )
                  }
                  className={`rounded-lg p-2 transition ${hoverControl} ${mutedText}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p
                  className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {monthLabel}
                </p>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() =>
                    setVisibleMonth(
                      (c) => new Date(c.getFullYear(), c.getMonth() + 1, 1),
                    )
                  }
                  className={`rounded-lg p-2 transition ${hoverControl} ${mutedText}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {presets.length > 0 && (
              <div
                className={`mb-3 flex flex-wrap gap-1.5 border-b pb-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}
              >
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${isDark ? "bg-slate-800 text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400" : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdayLabels.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className={`py-1 text-[10px] font-semibold uppercase ${mutedText}`}
                >
                  {day}
                </span>
              ))}
              {Array.from({ length: firstDay }, (_, index) => (
                <span key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const dayNum = index + 1;
                const d = new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                  dayNum,
                );
                const k = dateKey(d);
                const isSelected = draftValue && dateKey(draftValue) === k;
                const isToday = k === dateKey(today);
                const isDisabled = unavailable(d);

                return (
                  <button
                    key={k}
                    type="button"
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    onMouseEnter={() => setHoveredDay(k)}
                    onMouseLeave={() => setHoveredDay("")}
                    onFocus={() => {
                      setHoveredDay(k);
                      setFocusedDay(k);
                    }}
                    onBlur={() => {
                      setHoveredDay("");
                      setFocusedDay("");
                    }}
                    onClick={() => handleSelectDate(d)}
                    style={{
                      "--picker-accent": accentColor,
                      ...(isSelected
                        ? {
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 12px ${accentColor}40`,
                          }
                        : isToday
                          ? { borderColor: accentColor, color: accentColor }
                          : hoveredDay === k
                            ? {
                                backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                                color: accentColor,
                              }
                            : {}),
                      ...(focusedDay === k
                        ? {
                            outline: `2px solid ${accentColor}`,
                            outlineOffset: 2,
                            boxShadow: `0 0 0 2px color-mix(in srgb, ${accentColor} 18%, transparent)`,
                          }
                        : {}),
                    }}
                    className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-xs transition focus-visible:outline-none ${isSelected ? "font-semibold text-white" : isToday ? "border" : hoverDay} disabled:cursor-not-allowed disabled:opacity-30`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {renderCalendarFooter ? (
              renderCalendarFooter({
                selectedDate: draftValue,
                onToday: () => {
                  const now = new Date();
                  if (!unavailable(now)) {
                    setDraftValue(now);
                    setVisibleMonth(
                      new Date(now.getFullYear(), now.getMonth(), 1),
                    );
                  }
                },
                onClear: () => {
                  setDraftValue(null);
                  onChange?.(null);
                  setOpen(false);
                },
                onApply: applyDraft,
                onCancel: cancelDraft,
              })
            ) : (
              <div
                className={`mt-4 flex items-center justify-between border-t pt-3 ${isDark ? "border-slate-700" : "border-slate-200"}`}
              >
                <div className="flex gap-2">
                  {clearable && (
                    <button
                      type="button"
                      onClick={() => {
                        setDraftValue(null);
                        onChange?.(null);
                        setOpen(false);
                      }}
                      className={`text-xs font-medium transition hover:text-rose-500 ${mutedText}`}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                  onClick={() => {
                    const now = new Date();
                    if (!unavailable(now)) {
                      setDraftValue(now);
                      setVisibleMonth(
                        new Date(now.getFullYear(), now.getMonth(), 1),
                      );
                      if (commitOnSelect) {
                        onChange?.(dateKey(now));
                        setOpen(false);
                      }
                    }
                  }}
                    className={`text-xs font-medium transition hover:text-indigo-500 ${mutedText}`}
                  >
                    Today
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={cancelDraft}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applyDraft}
                    style={{ backgroundColor: accentColor }}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Date Range Picker                                                          */
/* -------------------------------------------------------------------------- */

export function DateRangePicker({
  value,
  onChange,
  name,
  label = "Date range",
  startLabel = "Start date",
  endLabel = "End date",
  startPlaceholder = "Select date",
  endPlaceholder = "Select date",
  minDate,
  maxDate,
  disabledDates = [],
  disabledDays = [],
  disabledDate,
  disableWeekends = false,
  presets = [],
  clearable = true,
  disabled = false,
  errorMessage,
  locale = "en-US",
  accentColor = "#4f46e5",

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  // Treat a value without an onChange handler as an initial value. Otherwise
  // consumers that pass a value but omit the handler get a permanently frozen
  // picker that cannot display their selection.
  const isValueControlled = value !== undefined && typeof onChange === "function";
  const [internalValue, setInternalValue] = useState(() => ({
    start: value?.start || "",
    end: value?.end || "",
  }));
  const rangeValue = isValueControlled ? value || {} : internalValue;

  const unavailable = (date) => {
    if (!date) return false;

    const dateValue = new Date(`${date}T12:00:00`);
    const day = dateValue.getDay();

    return (
      (minDate && date < minDate) ||
      (maxDate && date > maxDate) ||
      disabledDates.some((blocked) =>
        typeof blocked === "string"
          ? blocked === date
          : blocked instanceof Date &&
            blocked.toDateString() === dateValue.toDateString(),
      ) ||
      disabledDays.includes(day) ||
      (disableWeekends && [0, 6].includes(day)) ||
      Boolean(disabledDate?.(dateValue))
    );
  };

  const update = (key, next) => {
    if (next && unavailable(next)) return;

    const nextValue = {
      ...rangeValue,
      [key]: next,
      ...(key === "start" && rangeValue.end && next > rangeValue.end ? { end: "" } : {}),
    };
    if (!isValueControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const applyPreset = (preset) => {
    const next =
      typeof preset.value === "function" ? preset.value() : preset.value;

    if (
      (next?.start && unavailable(next.start)) ||
      (next?.end && unavailable(next.end)) ||
      (next?.start && next?.end && next.start > next.end)
    ) {
      return;
    }

    if (!isValueControlled) setInternalValue(next);
    onChange?.(next);
  };

  const rangeError =
    rangeValue.start && rangeValue.end && rangeValue.start > rangeValue.end
      ? "Start date must be on or before end date."
      : errorMessage;

  return (
    <FormField id={id} label={label} errorMessage={rangeError}>
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
          gap: "0.5rem",
          maxWidth: width === "auto" ? undefined : "42rem",
        }}
      >
        <DatePicker
          label={startLabel}
          placeholder={startPlaceholder}
          value={rangeValue.start || null}
          minDate={minDate}
          maxDate={rangeValue.end || maxDate}
          disabledDates={disabledDates}
          disabledDays={disabledDays}
          disabledDate={disabledDate}
          disableWeekends={disableWeekends}
          locale={locale}
          accentColor={accentColor}
          clearable={false}
          disabled={disabled}
          theme={theme}
          size={size}
          width={width}
          variant={variant}
          className={className}
          commitOnSelect
          onChange={(next) => update("start", next || "")}
        />
        <DatePicker
          label={endLabel}
          placeholder={endPlaceholder}
          value={rangeValue.end || null}
          minDate={rangeValue.start || minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          disabledDays={disabledDays}
          disabledDate={disabledDate}
          disableWeekends={disableWeekends}
          locale={locale}
          accentColor={accentColor}
          clearable={false}
          disabled={disabled}
          theme={theme}
          size={size}
          width={width}
          variant={variant}
          className={className}
          commitOnSelect
          onChange={(next) => update("end", next || "")}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset)}
            disabled={disabled}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
          >
            {preset.label}
          </button>
        ))}

        {clearable && (rangeValue.start || rangeValue.end) && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              const nextValue = {
                start: "",
                end: "",
              };
              if (!isValueControlled) setInternalValue(nextValue);
              onChange?.(nextValue);
            }}
            className="rounded-lg px-2.5 py-1 text-xs text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
          >
            Clear
          </button>
        )}
      </div>

      {name && <input type="hidden" name={`${name}.start`} value={rangeValue.start || ""} />}
      {name && <input type="hidden" name={`${name}.end`} value={rangeValue.end || ""} />}

      {((rangeValue.start && unavailable(rangeValue.start)) ||
        (rangeValue.end && unavailable(rangeValue.end))) && (
        <p role="alert" className="mt-2 text-xs font-medium text-rose-500">
          Selected dates must satisfy the configured limits and disabled-date
          rules.
        </p>
      )}
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Month Picker                                                               */
/* -------------------------------------------------------------------------- */

export function MonthPicker({
  value,
  onChange,
  name,
  label = "Month",
  min,
  max,
  disabled = false,
  accentColor = "#4f46e5",

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const currentValue = isValueControlled ? value : internalValue;
  const pickerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState("");
  const [focusedMonth, setFocusedMonth] = useState("");
  const [visibleYear, setVisibleYear] = useState(() => {
    const valueYear = Number(currentValue?.slice(0, 4));
    return valueYear || new Date().getFullYear();
  });
  const fieldClass = getFieldClass({
    theme,
    size,
    width,
    variant,
    className,
  });
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const publishValue = (nextValue) => {
    if (!isValueControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(visibleYear, index, 1);
    const monthValue = `${visibleYear}-${String(index + 1).padStart(2, "0")}`;
    return {
      value: monthValue,
      label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      unavailable: Boolean(
        (min && monthValue < min) || (max && monthValue > max),
      ),
    };
  });
  const selectedMonth = currentValue ? new Date(`${currentValue}-01T12:00:00`) : null;
  const selectedMonthIsValid =
    selectedMonth && !Number.isNaN(selectedMonth.getTime());
  const displayValue = selectedMonthIsValid
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(selectedMonth)
    : "Select month";
  const canShowYear = (year) =>
    months.some(({ value: monthValue }) => {
      const candidate = `${year}-${monthValue.slice(5)}`;
      return (!min || candidate >= min) && (!max || candidate <= max);
    });

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setOpen(false);
      if (
        event.type === "mousedown" &&
        !pickerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return (
    <FormField id={id} label={label}>
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            if (selectedMonthIsValid)
              setVisibleYear(selectedMonth.getFullYear());
            setOpen((current) => !current);
          }}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
          className={`${fieldClass} picker-accent-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused
              ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
              : undefined,
          }}
        >
          <span
            className={`truncate ${selectedMonthIsValid ? (isDark ? "text-slate-100" : "text-slate-900") : isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {displayValue}
          </span>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
        {name && <input type="hidden" name={name} value={selectedMonthIsValid ? currentValue : ""} />}

        {open && (
          <div
            role="dialog"
            aria-label="Choose month"
            className={`absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous year"
                disabled={!canShowYear(visibleYear - 1)}
                onClick={() => setVisibleYear((year) => year - 1)}
                className={`picker-accent-hover rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-30 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold">{visibleYear}</p>
              <button
                type="button"
                aria-label="Next year"
                disabled={!canShowYear(visibleYear + 1)}
                onClick={() => setVisibleYear((year) => year + 1)}
                className={`picker-accent-hover rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-30 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => {
                const selected = currentValue === month.value;
                return (
                  <button
                    key={month.value}
                    type="button"
                    disabled={disabled || month.unavailable}
                    aria-pressed={selected}
                    onMouseEnter={() => setHoveredMonth(month.value)}
                    onMouseLeave={() => setHoveredMonth("")}
                    onFocus={() => {
                      setHoveredMonth(month.value);
                      setFocusedMonth(month.value);
                    }}
                    onBlur={() => {
                      setHoveredMonth("");
                      setFocusedMonth("");
                    }}
                    style={{
                      "--picker-accent": accentColor,
                      outline:
                        focusedMonth === month.value
                          ? `2px solid ${accentColor}`
                          : undefined,
                      outlineOffset: focusedMonth === month.value ? 2 : undefined,
                      boxShadow: selected
                        ? `0 4px 12px ${accentColor}40`
                        : focusedMonth === month.value
                          ? `0 0 0 2px color-mix(in srgb, ${accentColor} 18%, transparent)`
                          : undefined,
                      ...(selected
                        ? { backgroundColor: accentColor }
                        : hoveredMonth === month.value
                          ? {
                              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                              color: accentColor,
                            }
                          : {}),
                    }}
                    onClick={() => {
                      publishValue(month.value);
                      setOpen(false);
                    }}
                    className={`rounded-xl px-3 py-2.5 text-xs font-medium transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 ${selected ? "text-white" : isDark ? "text-slate-200" : "text-slate-700"}`}
                  >
                    {month.label}
                  </button>
                );
              })}
            </div>
            <div
              className={`mt-4 flex items-center justify-between border-t pt-3 ${isDark ? "border-slate-700" : "border-slate-200"}`}
            >
              <button
                type="button"
                disabled={!selectedMonthIsValid}
                onClick={() => {
                  publishValue("");
                  setOpen(false);
                }}
                className={`text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400 hover:text-rose-400" : "text-slate-500 hover:text-rose-500"}`}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`text-xs font-medium transition ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={Boolean(
                  (min &&
                    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}` <
                      min) ||
                  (max &&
                    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}` >
                      max),
                )}
                onClick={() => {
                  const today = new Date();
                  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
                  publishValue(currentMonth);
                  setVisibleYear(today.getFullYear());
                  setOpen(false);
                }}
                className={`picker-accent-hover rounded px-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                This month
              </button>
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Year Picker                                                                */
/* -------------------------------------------------------------------------- */

export function YearPicker({
  value,
  onChange,
  name,
  label = "Year",
  min,
  max,
  disabled = false,
  accentColor = "#4f46e5",

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const currentValue = isValueControlled ? value : internalValue;
  const pickerRef = useRef(null);
  const selectedYear = /^\d{4}$/.test(String(currentValue))
    ? Number(currentValue)
    : null;
  const [open, setOpen] = useState(false);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredYear, setHoveredYear] = useState(null);
  const [visibleYear, setVisibleYear] = useState(
    () => selectedYear || new Date().getFullYear(),
  );
  const fieldClass = getFieldClass({
    theme,
    size,
    width,
    variant,
    className,
  });
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const decadeStart = Math.floor(visibleYear / 10) * 10;
  const years = Array.from(
    { length: 12 },
    (_, index) => decadeStart - 1 + index,
  );
  const minYear = min === undefined || min === "" ? null : Number(min);
  const maxYear = max === undefined || max === "" ? null : Number(max);
  const publishValue = (nextValue) => {
    if (!isValueControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setOpen(false);
      if (
        event.type === "mousedown" &&
        !pickerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return (
    <FormField id={id} label={label}>
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            if (selectedYear) setVisibleYear(selectedYear);
            setOpen((current) => !current);
          }}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
          className={`${fieldClass} picker-accent-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused
              ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
              : undefined,
          }}
        >
          <span
            className={`truncate ${selectedYear ? (isDark ? "text-slate-100" : "text-slate-900") : isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {selectedYear || "Select year"}
          </span>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
        {name && <input type="hidden" name={name} value={selectedYear || ""} />}

        {open && (
          <div
            role="dialog"
            aria-label="Choose year"
            className={`absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous decade"
                disabled={minYear !== null && decadeStart + 8 < minYear}
                onClick={() => setVisibleYear((year) => year - 10)}
                className={`picker-accent-hover rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-30 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold">
                {decadeStart} – {decadeStart + 9}
              </p>
              <button
                type="button"
                aria-label="Next decade"
                disabled={maxYear !== null && decadeStart + 1 > maxYear}
                onClick={() => setVisibleYear((year) => year + 10)}
                className={`picker-accent-hover rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-30 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {years.map((year) => {
                const selected = selectedYear === year;
                const unavailable =
                  (minYear !== null && year < minYear) ||
                  (maxYear !== null && year > maxYear);
                return (
                  <button
                    key={year}
                    type="button"
                    disabled={disabled || unavailable}
                    aria-pressed={selected}
                    onMouseEnter={() => setHoveredYear(year)}
                    onMouseLeave={() => setHoveredYear(null)}
                    onFocus={() => setHoveredYear(year)}
                    onBlur={() => setHoveredYear(null)}
                    style={{
                      "--picker-accent": accentColor,
                      ...(selected
                        ? {
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 12px ${accentColor}40`,
                          }
                        : hoveredYear === year
                          ? {
                              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                              color: accentColor,
                            }
                          : {}),
                    }}
                    onClick={() => {
                      publishValue(String(year));
                      setOpen(false);
                    }}
                    className={`picker-accent-hover picker-accent-focus rounded-xl px-3 py-2.5 text-xs font-medium transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 ${selected ? "text-white" : isDark ? "text-slate-200" : "text-slate-700"}`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
            <div
              className={`mt-4 flex items-center justify-between border-t pt-3 ${isDark ? "border-slate-700" : "border-slate-200"}`}
            >
              <button
                type="button"
                disabled={!selectedYear}
                onClick={() => {
                  publishValue("");
                  setOpen(false);
                }}
                className={`text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400 hover:text-rose-400" : "text-slate-500 hover:text-rose-500"}`}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`text-xs font-medium transition ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  (minYear !== null && new Date().getFullYear() < minYear) ||
                  (maxYear !== null && new Date().getFullYear() > maxYear)
                }
                onClick={() => {
                  const thisYear = new Date().getFullYear();
                  publishValue(String(thisYear));
                  setVisibleYear(thisYear);
                  setOpen(false);
                }}
                className={`picker-accent-hover rounded px-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                style={{ "--picker-accent": accentColor }}
              >
                This year
              </button>
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Week Picker                                                                */
/* -------------------------------------------------------------------------- */

export function WeekPicker({
  value,
  onChange,
  name,
  label = "Week",
  min,
  max,
  disabled = false,
  clearable = true,
  accentColor = "#4f46e5",

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const currentValue = isValueControlled ? value : internalValue;
  const pickerRef = useRef(null);
  const selectedWeekStart = getDateFromISOWeek(currentValue);
  const [open, setOpen] = useState(false);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [focusedWeek, setFocusedWeek] = useState(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initial = selectedWeekStart || new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });
  const fieldClass = getFieldClass({
    theme,
    size,
    width,
    variant,
    className,
  });
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const publishValue = (nextValue) => {
    if (!isValueControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const firstDayOffset =
    (new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay() +
      6) %
    7;
  const firstCalendarDate = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1 - firstDayOffset,
  );
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      firstCalendarDate.getFullYear(),
      firstCalendarDate.getMonth(),
      firstCalendarDate.getDate() + index,
    );
    const weekValue = getISOWeekValue(date);
    return {
      date,
      weekValue,
      inVisibleMonth: date.getMonth() === visibleMonth.getMonth(),
    };
  });
  const thisWeek = getISOWeekValue(new Date());
  const selectedWeekIsValid = Boolean(selectedWeekStart);
  const isWeekUnavailable = (weekValue) =>
    Boolean((min && weekValue < min) || (max && weekValue > max));
  const displayValue = selectedWeekIsValid
    ? `Week ${currentValue.slice(-2)} · ${currentValue.slice(0, 4)}`
    : "Select week";

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setOpen(false);
      if (
        event.type === "mousedown" &&
        !pickerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return (
    <FormField id={id} label={label}>
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            const selected = getDateFromISOWeek(currentValue);
            if (selected)
              setVisibleMonth(
                new Date(selected.getFullYear(), selected.getMonth(), 1),
              );
            setOpen((current) => !current);
          }}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
          className={`${fieldClass} picker-accent-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused
              ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
              : undefined,
          }}
        >
          <span
            className={`truncate ${selectedWeekIsValid ? (isDark ? "text-slate-100" : "text-slate-900") : isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {displayValue}
          </span>
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
        {name && <input type="hidden" name={name} value={selectedWeekIsValid ? currentValue : ""} />}

        {open && (
          <div
            role="dialog"
            aria-label="Choose week"
            className={`absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = accentColor;
                  event.currentTarget.style.backgroundColor = `color-mix(in srgb, ${accentColor} 12%, transparent)`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "";
                  event.currentTarget.style.backgroundColor = "";
                }}
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
                className={`rounded-lg p-2 transition ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold">{monthLabel}</p>
              <button
                type="button"
                aria-label="Next month"
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = accentColor;
                  event.currentTarget.style.backgroundColor = `color-mix(in srgb, ${accentColor} 12%, transparent)`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "";
                  event.currentTarget.style.backgroundColor = "";
                }}
                onClick={() =>
                  setVisibleMonth(
                    (month) =>
                      new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
                className={`rounded-lg p-2 transition ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span
                  key={day}
                  className={`py-1 text-[10px] font-semibold uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {day}
                </span>
              ))}
              {calendarDays.map(({ date, weekValue, inVisibleMonth }) => {
                const unavailable = isWeekUnavailable(weekValue);
                const selected = currentValue === weekValue;
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={disabled || unavailable}
                    aria-label={`${weekValue}, ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)}`}
                    aria-pressed={selected}
                    onMouseEnter={() => setHoveredWeek(weekValue)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    onFocus={() => {
                      setHoveredWeek(weekValue);
                      setFocusedWeek(weekValue);
                    }}
                    onBlur={() => {
                      setHoveredWeek(null);
                      setFocusedWeek(null);
                    }}
                    style={{
                      "--picker-accent": accentColor,
                      outline:
                        focusedWeek === weekValue
                          ? `2px solid ${accentColor}`
                          : undefined,
                      outlineOffset: focusedWeek === weekValue ? 2 : undefined,
                      ...(focusedWeek === weekValue
                        ? {
                            boxShadow: `0 0 0 2px color-mix(in srgb, ${accentColor} 18%, transparent)`,
                          }
                        : {}),
                      ...(selected
                        ? {
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 12px ${accentColor}40`,
                          }
                        : hoveredWeek === weekValue
                          ? {
                              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                              color: accentColor,
                            }
                          : {}),
                    }}
                    onClick={() => {
                      publishValue(weekValue);
                      setOpen(false);
                    }}
                    className={`picker-accent-focus mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-xs transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 ${selected ? "font-semibold text-white" : !inVisibleMonth ? (isDark ? "text-slate-600" : "text-slate-300") : isDark ? "text-slate-200" : "text-slate-700"}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
            <div
              className={`mt-4 flex items-center justify-between border-t pt-3 ${isDark ? "border-slate-700" : "border-slate-200"}`}
            >
              {clearable ? <button
                type="button"
                disabled={!selectedWeekIsValid}
                onClick={() => {
                  publishValue("");
                  setOpen(false);
                }}
                className={`text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400 hover:text-rose-400" : "text-slate-500 hover:text-rose-500"}`}
              >
                Clear
              </button> : <span />}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`text-xs font-medium transition ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isWeekUnavailable(thisWeek)}
                onClick={() => {
                  const currentWeekStart = getDateFromISOWeek(thisWeek);
                  if (currentWeekStart)
                    setVisibleMonth(
                      new Date(
                        currentWeekStart.getFullYear(),
                        currentWeekStart.getMonth(),
                        1,
                      ),
                    );
                  publishValue(thisWeek);
                  setOpen(false);
                }}
                className={`text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                onMouseEnter={(event) => { event.currentTarget.style.color = accentColor; }}
                onMouseLeave={(event) => { event.currentTarget.style.color = ""; }}
              >
                This week
              </button>
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Time Picker                                                                */
/* -------------------------------------------------------------------------- */

export function TimePicker({
  value,
  onChange,
  name,
  label = "Time",
  format = "24h",
  accentColor = "#4f46e5",
  includeSeconds = false,
  min,
  max,
  disabled = false,

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const currentValue = isValueControlled ? value : internalValue;
  const pickerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [fieldHovered, setFieldHovered] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [hoveredSelect, setHoveredSelect] = useState("");
  const [focusedSelect, setFocusedSelect] = useState("");
  const fieldClass = getFieldClass({
    theme,
    size,
    width,
    variant,
    className,
  });
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const parseParts = (timeValue) => {
    const [hour = "", minute = "", second = "00"] = (timeValue || "").split(
      ":",
    );
    if (!hour) return { hour: "09", minute: "00", second: "00", period: "AM" };
    const hourNumber = Number(hour);
    return {
      hour:
        format === "12h"
          ? String(hourNumber % 12 || 12).padStart(2, "0")
          : hour,
      minute,
      second: second || "00",
      period: hourNumber >= 12 ? "PM" : "AM",
    };
  };
  const [draft, setDraft] = useState(() => parseParts(currentValue));
  const parts = draft;
  const displayValue = currentValue
    ? format === "12h"
      ? `${String(Number(currentValue.slice(0, 2)) % 12 || 12).padStart(2, "0")}:${currentValue.slice(3, 5)}${includeSeconds && currentValue.length > 5 ? `:${currentValue.slice(6, 8)}` : ""} ${Number(currentValue.slice(0, 2)) >= 12 ? "PM" : "AM"}`
      : currentValue
    : "Select time";
  const normalizeForBounds = (timeValue) => {
    const [hour = "00", minute = "00", second = "00"] = timeValue.split(":");
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
  };
  const updatePart = (part, nextPart) => {
    const nextParts = { ...parts, [part]: nextPart };
    setDraft(nextParts);
    if (!nextParts.hour || !nextParts.minute) return;

    const hour =
      format === "12h"
        ? (Number(nextParts.hour) % 12) + (nextParts.period === "PM" ? 12 : 0)
        : Number(nextParts.hour);
    const result = [String(hour).padStart(2, "0"), nextParts.minute];
    if (includeSeconds) result.push(nextParts.second || "00");
    const nextValue = result.join(":");
    const comparable = normalizeForBounds(nextValue);
    if (
      (min && comparable < normalizeForBounds(min)) ||
      (max && comparable > normalizeForBounds(max))
    )
      return;
    if (!isValueControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };
  const selectClass = `picker-accent-field w-full rounded-xl border px-3 py-2 text-sm outline-none ${isDark ? "border-slate-700 bg-slate-800 text-slate-100" : "border-slate-200 bg-white text-slate-800"}`;
  const getSelectAccentProps = (part) => ({
    onMouseEnter: () => setHoveredSelect(part),
    onMouseLeave: () => setHoveredSelect(""),
    onFocus: () => setFocusedSelect(part),
    onBlur: () => setFocusedSelect(""),
    style: {
      "--picker-accent": accentColor,
      accentColor,
      borderColor:
        hoveredSelect === part || focusedSelect === part
          ? accentColor
          : undefined,
      boxShadow:
        focusedSelect === part
          ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
          : undefined,
    },
  });
  const hours = Array.from(
    { length: format === "12h" ? 12 : 24 },
    (_, index) => (format === "12h" ? index + 1 : index),
  );

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setOpen(false);
      if (
        event.type === "mousedown" &&
        !pickerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return (
    <FormField id={id} label={label}>
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            setDraft(parseParts(currentValue));
            setOpen((current) => !current);
          }}
          onMouseEnter={() => setFieldHovered(true)}
          onMouseLeave={() => setFieldHovered(false)}
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
          className={`${fieldClass} picker-accent-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            borderColor: fieldHovered || fieldFocused ? accentColor : undefined,
            boxShadow: fieldFocused
              ? `0 0 0 4px color-mix(in srgb, ${accentColor} 16%, transparent)`
              : undefined,
          }}
        >
          <span
            className={`truncate ${currentValue ? (isDark ? "text-slate-100" : "text-slate-900") : isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {displayValue}
          </span>
          <Clock3 className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
        {name && <input type="hidden" name={name} value={currentValue || ""} />}

        {open && (
          <div
            role="dialog"
            aria-label="Choose time"
            className={`absolute left-0 top-full z-30 mt-2 w-[min(24rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}
          >
            <div
              className={`mb-3 text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              Choose a time
            </div>
            <div
              className={`grid gap-2 ${format === "12h" ? "grid-cols-4" : includeSeconds ? "grid-cols-3" : "grid-cols-2"}`}
            >
              <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Hour
                <select
                  aria-label="Hour"
                  value={parts.hour}
                  disabled={disabled}
                  {...getSelectAccentProps("hour")}
                  onChange={(event) => updatePart("hour", event.target.value)}
                  className={selectClass}
                >
                  <option value="">--</option>
                  {hours.map((hour) => (
                    <option key={hour} value={String(hour).padStart(2, "0")}>
                      {String(hour).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Minute
                <select
                  aria-label="Minute"
                  value={parts.minute}
                  disabled={disabled}
                  {...getSelectAccentProps("minute")}
                  onChange={(event) => updatePart("minute", event.target.value)}
                  className={selectClass}
                >
                  <option value="">--</option>
                  {Array.from({ length: 60 }, (_, index) =>
                    String(index).padStart(2, "0"),
                  ).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </label>
              {includeSeconds && (
                <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Second
                  <select
                    aria-label="Second"
                    value={parts.second}
                    disabled={disabled}
                    {...getSelectAccentProps("second")}
                    onChange={(event) =>
                      updatePart("second", event.target.value)
                    }
                    className={selectClass}
                  >
                    {Array.from({ length: 60 }, (_, index) =>
                      String(index).padStart(2, "0"),
                    ).map((second) => (
                      <option key={second} value={second}>
                        {second}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {format === "12h" && (
                <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Period
                  <select
                    aria-label="AM or PM"
                    value={parts.period}
                    disabled={disabled}
                    {...getSelectAccentProps("period")}
                    onChange={(event) =>
                      updatePart("period", event.target.value)
                    }
                    className={selectClass}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </label>
              )}
            </div>
            <div
              className={`mt-4 flex items-center justify-between border-t pt-3 ${isDark ? "border-slate-700" : "border-slate-200"}`}
            >
              <button
                type="button"
                disabled={!currentValue}
                onClick={() => {
                  if (!isValueControlled) setInternalValue("");
                  onChange?.("");
                  setDraft(parseParts(""));
                  setOpen(false);
                }}
                className={`text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark ? "text-slate-400 hover:text-rose-400" : "text-slate-500 hover:text-rose-500"}`}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(parseParts(currentValue));
                  setOpen(false);
                }}
                className={`text-xs font-medium transition ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}

/* -------------------------------------------------------------------------- */
/* Date + Time Picker                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Emits a local wall-clock string (`YYYY-MM-DDTHH:mm`) through onChange after
 * the user confirms the draft with Done. Date-only bounds cover their full
 * local day; datetime bounds enforce their exact time.
 */
export function DateTimePicker({
  value,
  onChange,
  name,
  label = "Date and time",
  min,
  max,
  locale = "en-US",
  timeFormat = "24h",
  accentColor = "#4f46e5",
  clearable = true,
  disableWeekends = false,
  keepOpenOnOutsideClick = false,
  disabled = false,

  theme = "light",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const id = useId();
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const currentValue = isValueControlled ? value : internalValue;
  const selected = parseDateTimeValue(currentValue);
  const validSelected =
    selected && !Number.isNaN(selected.getTime()) ? selected : null;
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const initial = validSelected || new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });
  const pickerRef = useRef(null);
  const fieldClass = getFieldClass({
    theme,
    size,
    width,
    variant,
    className,
  });
  const isSystem = theme === "system";
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const popupSurface = isDark
    ? "border-slate-700 bg-slate-900 text-slate-100"
    : "border-slate-200 bg-white text-slate-900";
  const mutedText = isDark
    ? "text-slate-400"
    : isSystem
      ? "text-slate-400 dark:text-slate-400"
      : "text-slate-500";
  const hoverDay = isDark ? "text-slate-200" : "text-slate-700";
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(2024, 0, 7 + index),
    ),
  );
  const firstDay = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  ).getDay();
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();
  const dateKey = formatDateKey;
  const selectedDate = validSelected ? dateKey(validSelected) : "";
  const selectedTime = validSelected
    ? `${String(validSelected.getHours()).padStart(2, "0")}:${String(validSelected.getMinutes()).padStart(2, "0")}`
    : "09:00";

  const [draftDate, setDraftDate] = useState(selectedDate);
  const [draftTime, setDraftTime] = useState(selectedTime);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") setOpen(false);
      if (
        event.type === "mousedown" &&
        !keepOpenOnOutsideClick &&
        !pickerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open, keepOpenOnOutsideClick]);

  useEffect(() => {
    // Reset the uncommitted selection whenever the controlled value changes.
    const nextDraft = createDateTimeDraft(currentValue);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftDate(nextDraft.date);
    setDraftTime(nextDraft.time);
    if (open && selectedDate) {
      const [year, month] = selectedDate.split("-").map(Number);
      setVisibleMonth(new Date(year, month - 1, 1));
    }
  }, [currentValue, selectedDate, selectedTime, open]);

  // Reflect an uncommitted calendar choice in the field immediately. Done
  // commits it; Cancel still discards the draft without changing the value.
  const draftSelected = draftDate
    ? parseDateTimeValue(`${draftDate}T${draftTime}`)
    : null;
  const displayedDate = open ? draftSelected : validSelected;
  const displayValue = displayedDate
    ? `${new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(displayedDate)} · ${new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: timeFormat === "12h" }).format(displayedDate)}`
    : "Select date and time";
  const unavailable = (date) => !isCalendarDateAllowed(date, { min, max, disableWeekends });
  const publishValue = (nextValue) =>
    publishDateTimeValue(nextValue, {
      controlled: isValueControlled,
      setInternalValue,
      onChange,
    });
  const [draftHour24, draftMinute] = draftTime.split(":");
  const draftHourNumber = Number(draftHour24 || 0);
  const draftHour12 = String(draftHourNumber % 12 || 12).padStart(2, "0");
  const draftPeriod = draftHourNumber >= 12 ? "PM" : "AM";
  const updateTimePart = (part, nextPart) => {
    let hours = draftHourNumber;
    let minutes = Number(draftMinute || 0);
    if (part === "hour") {
      hours =
        timeFormat === "12h"
          ? (Number(nextPart) % 12) + (draftPeriod === "PM" ? 12 : 0)
          : Number(nextPart);
    } else if (part === "minute") {
      minutes = Number(nextPart);
    } else if (part === "period") {
      hours = (draftHourNumber % 12) + (nextPart === "PM" ? 12 : 0);
    }
    const nextTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const nextDraft = selectDraftTime({ date: draftDate, time: draftTime }, nextTime);
    setDraftTime(nextDraft.time);
    setValidationError("");
  };
  const timeSelectClass = `picker-accent-focus w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${isDark ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200 bg-white text-slate-800"}`;
  const moveMonth = (amount) =>
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`mb-1.5 ml-0.5 block text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          {label}
        </label>
      )}
      <div ref={pickerRef} className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => {
            if (open) {
              setOpen(false);
              return;
            }
            const nextDraft = createDateTimeDraft(currentValue);
            setDraftDate(nextDraft.date);
            setDraftTime(nextDraft.time);
            setValidationError("");
            const initialDate = validSelected || new Date();
            setVisibleMonth(
              new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
            );
            setOpen(true);
          }}
          className={`${fieldClass} date-time-picker-field flex items-center justify-between gap-3 text-left`}
          style={{
            "--picker-accent": accentColor,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            color: isDark ? "#f1f5f9" : "#0f172a",
          }}
        >
          <span
            className={`truncate ${validSelected ? (isDark ? "text-slate-100" : "text-slate-900") : isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            {displayValue}
          </span>
          <span className="flex shrink-0 items-center gap-2 text-slate-400">
            <CalendarDays className="h-4 w-4" />
          </span>
        </button>
        {name && (
          <input
            type="hidden"
            name={name}
            value={validSelected ? `${dateKey(validSelected)}T${String(validSelected.getHours()).padStart(2, "0")}:${String(validSelected.getMinutes()).padStart(2, "0")}` : ""}
          />
        )}

        {open && (
          <div
            role="dialog"
            aria-label="Choose date and time"
            style={{ "--picker-accent": accentColor }}
            className={`absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl shadow-slate-950/20 ${popupSurface}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => moveMonth(-1)}
                className={`picker-accent-hover rounded-lg p-2 transition ${mutedText}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {monthLabel}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => moveMonth(1)}
                className={`picker-accent-hover rounded-lg p-2 transition ${mutedText}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdayLabels.map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className={`py-1 text-[10px] font-semibold uppercase ${mutedText}`}
                >
                  {day}
                </span>
              ))}
              {Array.from({ length: firstDay }, (_, index) => (
                <span key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const currentDate = new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                  day,
                );
                const key = dateKey(currentDate);
                const isSelected = key === (draftDate || selectedDate);
                const isToday = key === dateKey(today);
                const isDisabled = unavailable(currentDate);
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setDraftDate(key);
                      setValidationError("");
                    }}
                    style={
                      isSelected
                        ? {
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 12px ${accentColor}40`,
                          }
                        : isToday
                          ? { borderColor: accentColor, color: accentColor }
                          : undefined
                    }
                    className={`picker-accent-hover picker-accent-focus mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-xs transition focus-visible:outline-none ${isSelected ? "font-semibold text-white" : isToday ? "border" : hoverDay} disabled:cursor-not-allowed disabled:opacity-30`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div
              className={`mt-4 border-t pt-4 ${isDark ? "border-slate-700" : isSystem ? "border-slate-200 dark:border-slate-700" : "border-slate-200"}`}
            >
              <label
                htmlFor={`${id}-time`}
                className={`mb-2 flex items-center gap-2 text-xs font-semibold ${mutedText}`}
              >
                <Clock3 className="h-3.5 w-3.5" />
                Time
              </label>
              <div
                className={`grid gap-2 ${timeFormat === "12h" ? "grid-cols-3" : "grid-cols-2"}`}
              >
                <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Hour
                  <select
                    aria-label="Hour"
                    value={timeFormat === "12h" ? draftHour12 : draftHour24}
                    disabled={disabled}
                    onChange={(event) =>
                      updateTimePart("hour", event.target.value)
                    }
                    className={timeSelectClass}
                  >
                    {Array.from(
                      { length: timeFormat === "12h" ? 12 : 24 },
                      (_, index) => {
                        const hour = timeFormat === "12h" ? index + 1 : index;
                        const hourValue = String(hour).padStart(2, "0");
                        return (
                          <option key={hourValue} value={hourValue}>
                            {hourValue}
                          </option>
                        );
                      },
                    )}
                  </select>
                </label>
                <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Minute
                  <select
                    aria-label="Minute"
                    value={draftMinute}
                    disabled={disabled}
                    onChange={(event) =>
                      updateTimePart("minute", event.target.value)
                    }
                    className={timeSelectClass}
                  >
                    {Array.from({ length: 60 }, (_, index) =>
                      String(index).padStart(2, "0"),
                    ).map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </label>
                {timeFormat === "12h" && (
                  <label className="space-y-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                    Period
                    <select
                      aria-label="AM or PM"
                      value={draftPeriod}
                      disabled={disabled}
                      onChange={(event) =>
                        updateTimePart("period", event.target.value)
                      }
                      className={timeSelectClass}
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </label>
                )}
              </div>
              {validationError && (
                <p className="mt-3 text-xs font-medium text-rose-600" role="alert">
                  {validationError}
                </p>
              )}
              <div className="mt-3 flex items-center justify-between">
                {clearable ? (
                  <button
                    type="button"
                    onClick={() => {
                      publishValue("");
                      setDraftDate("");
                      setDraftTime("09:00");
                      setValidationError("");
                    }}
                    className={`text-xs font-medium transition hover:text-rose-500 ${mutedText}`}
                  >
                    Clear
                  </button>
                ) : (
                  <span />
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const resetDraft = createDateTimeDraft(currentValue);
                      setDraftDate(resetDraft.date);
                      setDraftTime(resetDraft.time);
                      setValidationError("");
                      setOpen(false);
                    }}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const result = commitDateTimeDraft(
                        { date: draftDate, time: draftTime },
                        { min, max },
                        publishValue,
                      );
                      if (!result.ok) {
                        setValidationError(result.error);
                        return;
                      }
                      setValidationError("");
                      setOpen(false);
                    }}
                    style={{ backgroundColor: accentColor }}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Date + Time Range Picker                                                   */
/* -------------------------------------------------------------------------- */

export function DateTimeRangePicker({
  value,
  onChange,
  label = "Date and time range",
  min,
  max,
  clearable = true,
  disableWeekends = false,
  disabled = false,
  locale = "en-US",
  timeFormat = "24h",
  accentColor = "#4f46e5",

  theme = "system",
  size = "md",
  width = "full",
  variant = "default",
  className = "",
}) {
  const controlled = value !== undefined && typeof onChange === "function";
  const [internalValue, setInternalValue] = useState(() => ({
    start: value?.start || "",
    end: value?.end || "",
  }));
  const rangeValue = controlled ? value || {} : internalValue;

  const change = (key, next) => {
    const nextValue = {
      ...rangeValue,
      [key]: next,
      ...(key === "start" && rangeValue.end && next > rangeValue.end ? { end: "" } : {}),
    };
    if (!controlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const invalid = rangeValue.start && rangeValue.end && rangeValue.start > rangeValue.end;

  return (
    <FormField
      id="datetime-range-start"
      label={label}
      errorMessage={invalid ? "Start must be before end." : undefined}
    >
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "0.5rem",
          maxWidth: width === "auto" ? undefined : "42rem",
        }}
      >
        <DateTimePicker
          label="Start"
          value={rangeValue.start || ""}
          min={min}
          max={rangeValue.end || max}
          locale={locale}
          timeFormat={timeFormat}
          accentColor={accentColor}
          disableWeekends={disableWeekends}
          clearable={false}
          disabled={disabled}
          theme={theme}
          size={size}
          width={width}
          variant={variant}
          className={className}
          onChange={(next) => change("start", next || "")}
        />

        <DateTimePicker
          label="End"
          value={rangeValue.end || ""}
          min={rangeValue.start || min}
          max={max}
          locale={locale}
          timeFormat={timeFormat}
          accentColor={accentColor}
          disableWeekends={disableWeekends}
          clearable={false}
          disabled={disabled}
          theme={theme}
          size={size}
          width={width}
          variant={variant}
          className={className}
          onChange={(next) => change("end", next || "")}
        />
      </div>

      {clearable && (rangeValue.start || rangeValue.end) && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            const nextValue = {
              start: "",
              end: "",
            };
            if (!controlled) setInternalValue(nextValue);
            onChange?.(nextValue);
          }}
          className="mt-2 rounded-lg px-2.5 py-1 text-xs text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
        >
          Clear range
        </button>
      )}
    </FormField>
  );
}
