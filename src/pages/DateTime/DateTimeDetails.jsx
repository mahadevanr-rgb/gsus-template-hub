import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import {
  fetchAllComponents,
  fetchComponent,
} from "@/services/supabase/components.service";
import { DatePicker } from "@/pages/Forms/components/DatePicker/DatePicker";
import {
  DateRangePicker,
  DateTimePicker,
  DateTimeRangePicker,
  MonthPicker,
  TimePicker,
  WeekPicker,
  YearPicker,
} from "@/pages/Forms/components/DateTime/DateTimePickers";

const dateTimePreviews = {
  "date-picker": DatePicker,
  "date-range-picker": DateRangePicker,
  "month-picker": MonthPicker,
  "year-picker": YearPicker,
  "week-picker": WeekPicker,
  "time-picker": TimePicker,
  "datetime-picker": DateTimePicker,
  "datetime-range-picker": DateTimeRangePicker,
};
const dateTimeAccentColors = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Blue", value: "#2563eb" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Teal", value: "#0f766e" },
  { name: "Rose", value: "#e11d48" },
  { name: "Slate", value: "#475569" },
];
const dateTimePropDetails = {
  "date-picker": [
    ["value", "Date | null", "undefined", "Selected local calendar date."],
    ["onChange", "(date) => void", "-", "Receives the selected Date or null."],
    [
      "minDate / maxDate",
      "Date",
      "undefined",
      "Limit the selectable date range.",
    ],
    [
      "disabledDates / disabledDays",
      "Array",
      "[]",
      "Exclude specific dates or weekdays.",
    ],
    [
      "disableWeekends",
      "boolean",
      "false",
      "Prevent Saturday and Sunday selection.",
    ],
    [
      "locale / format",
      "string",
      "browser / short",
      "Control date language and display format.",
    ],
    [
      "clearable / disabled",
      "boolean",
      "false",
      "Show clear action or disable the picker.",
    ],
  ],
  "date-range-picker": [
    [
      "value",
      "{ start, end }",
      "{}",
      "Selected start and end date strings (YYYY-MM-DD).",
    ],
    ["onChange", "(range) => void", "-", "Receives the updated range object."],
    [
      "minDate / maxDate",
      "string",
      "undefined",
      "Limit the selectable date range.",
    ],
    ["presets", "Array", "[]", "Quick-select predefined ranges."],
    [
      "disableWeekends / disabledDays",
      "boolean / Array",
      "false / []",
      "Prevent selecting configured weekdays.",
    ],
    [
      "clearable / disabled",
      "boolean",
      "true / false",
      "Show a clear action or disable the picker.",
    ],
  ],
  "month-picker": [
    ["value", "string", '""', "Selected month in YYYY-MM format."],
    ["onChange", "(value) => void", "-", "Receives the selected month string."],
    ["min / max", "string", "undefined", "Set month bounds in YYYY-MM format."],
    [
      "disabled / label",
      "boolean / string",
      "false / Month",
      "Disable the control or set its label.",
    ],
  ],
  "year-picker": [
    ["value", "string", '""', "Selected year."],
    ["onChange", "(value) => void", "-", "Receives the selected year string."],
    ["min / max", "number", "undefined", "Set the minimum and maximum year."],
    [
      "disabled / label",
      "boolean / string",
      "false / Year",
      "Disable the control or set its label.",
    ],
  ],
  "week-picker": [
    ["value", "string", '""', "Selected ISO week, for example 2026-W24."],
    [
      "onChange",
      "(value) => void",
      "-",
      "Receives the selected ISO week string.",
    ],
    ["min / max", "string", "undefined", "Set bounds in ISO week format."],
    [
      "disabled / label",
      "boolean / string",
      "false / Week",
      "Disable the control or set its label.",
    ],
  ],
  "time-picker": [
    ["value", "string", '""', "Selected time in HH:mm format."],
    ["onChange", "(value) => void", "-", "Receives the selected time string."],
    ["format", '"12h" | "24h"', '"24h"', "Choose the time entry format."],
    [
      "includeSeconds",
      "boolean",
      "false",
      "Include seconds in the time value.",
    ],
    [
      "min / max / disabled",
      "string / boolean",
      "undefined / false",
      "Constrain or disable time selection.",
    ],
  ],
  "datetime-picker": [
    [
      "value",
      "string",
      '""',
      "Selected local date-time in YYYY-MM-DDTHH:mm format.",
    ],
    [
      "onChange",
      "(value) => void",
      "-",
      "Receives the local date-time string.",
    ],
    [
      "min / max",
      "string",
      "undefined",
      "Limit selectable local date and time.",
    ],
    [
      "locale / timeFormat",
      "string",
      '"en-US" / "24h"',
      "Set date locale and 12/24-hour display.",
    ],
    [
      "theme / accentColor",
      "string",
      '"light" / "#4f46e5"',
      "Choose appearance and highlight color.",
    ],
    [
      "size / width / variant",
      "string",
      '"md" / "full" / "default"',
      "Adjust control sizing and shape.",
    ],
    [
      "clearable / disableWeekends / disabled",
      "boolean",
      "true / false / false",
      "Configure clearing and availability.",
    ],
  ],
  "datetime-range-picker": [
    [
      "value",
      "{ start, end }",
      "{}",
      "Selected local start and end date-time strings.",
    ],
    ["onChange", "(range) => void", "-", "Receives the updated range object."],
    ["min / max", "string", "undefined", "Limit the date-time range."],
    [
      "clearable / disabled",
      "boolean",
      "true / false",
      "Show a clear action or disable the picker.",
    ],
  ],
};

const normalizeCategory = (category) =>
  String(category || "")
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");

const sectionClass =
  "rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const labelClass =
  "mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200";

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function PickerStyleControls({
  theme,
  setTheme,
  accent,
  setAccent,
  size,
  setSize,
  width,
  setWidth,
  variant,
  setVariant,
  showAccent = false,
}) {
  return (
    <>
      <div>
        <label className={labelClass} htmlFor="picker-appearance">
          Appearance
        </label>
        <select
          id="picker-appearance"
          className={inputClass}
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
        >
          <option value="system">Match app theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      {showAccent && (
        <div>
          <span className={labelClass}>Accent color</span>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Picker accent color"
          >
            {dateTimeAccentColors.map((color) => (
              <button
                key={color.value}
                type="button"
                title={color.name}
                aria-label={`Use ${color.name} accent`}
                aria-pressed={accent === color.value}
                onClick={() => setAccent(color.value)}
                className={`h-7 w-7 rounded-lg border-2 transition hover:-translate-y-0.5 ${accent === color.value ? "border-slate-900 ring-2 ring-indigo-400/50 dark:border-white" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
      )}
      <div>
        <label className={labelClass} htmlFor="picker-size">
          Control size
        </label>
        <select
          id="picker-size"
          className={inputClass}
          value={size}
          onChange={(event) => setSize(event.target.value)}
        >
          <option value="sm">Compact</option>
          <option value="md">Comfortable</option>
          <option value="lg">Large</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="picker-width">
          Field width
        </label>
        <select
          id="picker-width"
          className={inputClass}
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        >
          <option value="full">Full width</option>
          <option value="auto">Content width</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="picker-corners">
          Corner style
        </label>
        <select
          id="picker-corners"
          className={inputClass}
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
        >
          <option value="default">Rounded</option>
          <option value="compact">Compact</option>
          <option value="pill">Pill</option>
        </select>
      </div>
    </>
  );
}

export default function DateTimeDetails() {
  const { id, slug } = useParams();
  const targetSlug = id || slug;
  const navigate = useNavigate();
  const [lookup, setLookup] = useState({
    slug: null,
    status: "loading",
    component: null,
    siblings: [],
    error: "",
  });

  const [date, setDate] = useState(null);
  const [range, setRange] = useState({ start: "", end: "" });
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [time, setTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [dateTimeRange, setDateTimeRange] = useState({ start: "", end: "" });
  const [locale, setLocale] = useState("en-US");
  const [clearable, setClearable] = useState(true);
  const [disableWeekends, setDisableWeekends] = useState(false);
  const [timeFormat, setTimeFormat] = useState("24h");
  const [dateTimeTheme, setDateTimeTheme] = useState("light");
  const [dateTimeAccent, setDateTimeAccent] = useState("#4f46e5");
  const [dateTimeSize, setDateTimeSize] = useState("md");
  const [dateTimeWidth, setDateTimeWidth] = useState("full");
  const [dateTimeVariant, setDateTimeVariant] = useState("default");
  const [includeSeconds, setIncludeSeconds] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let active = true;
    if (!targetSlug) {
      return () => {
        active = false;
      };
    }

    Promise.allSettled([fetchComponent(targetSlug), fetchAllComponents()])
      .then(([resolvedResult, allResult]) => {
        if (!active) return;
        const resolved =
          resolvedResult.status === "fulfilled" ? resolvedResult.value : null;
        const allComponents =
          allResult.status === "fulfilled" ? allResult.value : [];
        const registryComponent = allComponents.find(
          (item) => item.slug === targetSlug || item.id === targetSlug,
        );
        const record = registryComponent || resolved;
        const siblings = allComponents.filter(
          (item) => normalizeCategory(item.category) === "date-time",
        );

        if (
          resolvedResult.status === "rejected" &&
          allResult.status === "rejected"
        ) {
          setLookup({
            slug: targetSlug,
            status: "error",
            component: null,
            siblings: [],
            error:
              resolvedResult.reason?.message ||
              "Unable to load this component.",
          });
          return;
        }

        if (
          !record ||
          normalizeCategory(record.category) !== "date-time" ||
          !dateTimePreviews[targetSlug]
        ) {
          setLookup({
            slug: targetSlug,
            status: "not-found",
            component: null,
            siblings,
            error: "",
          });
          return;
        }

        const sourceCode =
          record.sourceCode ||
          record.code ||
          record.files?.find((file) => file.content)?.content ||
          "";
        if (!sourceCode) {
          setLookup({
            slug: targetSlug,
            status: "error",
            component: null,
            siblings,
            error: "The registry entry does not contain component source code.",
          });
          return;
        }

        setLookup({
          slug: targetSlug,
          status: "ready",
          siblings,
          error: "",
          component: {
            ...record,
            slug: targetSlug,
            sourceCode,
            files: record.files || [],
            dependencies: Array.isArray(record.dependencies)
              ? record.dependencies
              : [],
            componentDependencies:
              record.componentDependencies ||
              record.component_dependencies ||
              [],
          },
        });
      })
      .catch((error) => {
        if (active)
          setLookup({
            slug: targetSlug,
            status: "error",
            component: null,
            siblings: [],
            error: error.message || "Unable to load this component.",
          });
      });

    return () => {
      active = false;
    };
  }, [targetSlug]);

  if (!targetSlug) {
    return (
      <ComponentDetailsView
        component={null}
        categoryName="Date & Time"
        onBack={() => navigate("/date-time")}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  if (lookup.slug !== targetSlug || lookup.status === "loading") {
    return (
      <div className="py-16 text-center text-sm text-slate-500">
        Loading component...
      </div>
    );
  }

  if (lookup.status === "error") {
    return (
      <div role="alert" className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-rose-500">{lookup.error}</p>
        <button
          type="button"
          onClick={() => navigate("/date-time")}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Back to Date &amp; Time
        </button>
      </div>
    );
  }

  if (lookup.status === "not-found") {
    return (
      <ComponentDetailsView
        component={null}
        categoryName="Date & Time"
        onBack={() => navigate("/date-time")}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  const componentData = {
    ...lookup.component,
    category: "Date & Time",
    props: (dateTimePropDetails[targetSlug] || []).map(
      ([name, type, defaultValue, description]) => ({
        name,
        type,
        defaultValue,
        description,
      }),
    ),
    installProps: {
      "date-picker": { locale, clearable, disableWeekends, disabled },
      "date-range-picker": {
        clearable,
        disableWeekends,
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
      "month-picker": {
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
      "year-picker": {
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
      "week-picker": {
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
      "time-picker": {
        format: timeFormat,
        includeSeconds,
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
      "datetime-picker": {
        locale,
        timeFormat,
        theme: dateTimeTheme,
        accentColor: dateTimeAccent,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
        clearable,
        disableWeekends,
        disabled,
      },
      "datetime-range-picker": {
        clearable,
        disabled,
        theme: dateTimeTheme,
        size: dateTimeSize,
        width: dateTimeWidth,
        variant: dateTimeVariant,
      },
    }[targetSlug],
  };
  const PreviewComponent = dateTimePreviews[targetSlug];
  const siblings = lookup.siblings.map((item) => ({
    slug: item.slug,
    name: item.name,
  }));

  const renderPreview = () => {
    const commonProps = { label: componentData.name };
    switch (targetSlug) {
      case "date-picker":
        return (
          <DatePicker
            {...commonProps}
            value={date}
            onChange={setDate}
            locale={locale}
            clearable={clearable}
            disableWeekends={disableWeekends}
          />
        );
      case "date-range-picker":
        return (
          <DateRangePicker
            {...commonProps}
            value={range}
            onChange={setRange}
            clearable={clearable}
            disableWeekends={disableWeekends}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      case "month-picker":
        return (
          <MonthPicker
            {...commonProps}
            value={month}
            onChange={setMonth}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      case "year-picker":
        return (
          <YearPicker
            {...commonProps}
            value={year}
            onChange={setYear}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      case "week-picker":
        return (
          <WeekPicker
            {...commonProps}
            value={week}
            onChange={setWeek}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      case "time-picker":
        return (
          <TimePicker
            {...commonProps}
            value={time}
            onChange={setTime}
            format={timeFormat}
            includeSeconds={includeSeconds}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      case "datetime-picker":
        return (
          <DateTimePicker
            {...commonProps}
            value={dateTime}
            onChange={setDateTime}
            locale={locale}
            timeFormat={timeFormat}
            theme={dateTimeTheme}
            accentColor={dateTimeAccent}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
            clearable={clearable}
            disableWeekends={disableWeekends}
            keepOpenOnOutsideClick
            disabled={disabled}
          />
        );
      case "datetime-range-picker":
        return (
          <DateTimeRangePicker
            {...commonProps}
            value={dateTimeRange}
            onChange={setDateTimeRange}
            clearable={clearable}
            disabled={disabled}
            theme={dateTimeTheme}
            size={dateTimeSize}
            width={dateTimeWidth}
            variant={dateTimeVariant}
          />
        );
      default:
        return <PreviewComponent {...commonProps} />;
    }
  };

  const renderCustomizePanel = () => {
    if (targetSlug === "date-picker") {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customize picker
          </h3>
          <div>
            <label className={labelClass} htmlFor="date-preview-locale">
              Locale
            </label>
            <select
              id="date-preview-locale"
              className={inputClass}
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="de-DE">German</option>
              <option value="ja-JP">Japanese</option>
            </select>
          </div>
          <Toggle
            label="Clearable"
            checked={clearable}
            onChange={setClearable}
          />
          <Toggle
            label="Disable weekends"
            checked={disableWeekends}
            onChange={setDisableWeekends}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    if (targetSlug === "date-range-picker") {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customize picker
          </h3>
          <PickerStyleControls
            theme={dateTimeTheme}
            setTheme={setDateTimeTheme}
            size={dateTimeSize}
            setSize={setDateTimeSize}
            width={dateTimeWidth}
            setWidth={setDateTimeWidth}
            variant={dateTimeVariant}
            setVariant={setDateTimeVariant}
          />
          <Toggle
            label="Clearable"
            checked={clearable}
            onChange={setClearable}
          />
          <Toggle
            label="Disable weekends"
            checked={disableWeekends}
            onChange={setDisableWeekends}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    if (targetSlug === "time-picker") {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customize picker
          </h3>
          <PickerStyleControls
            theme={dateTimeTheme}
            setTheme={setDateTimeTheme}
            size={dateTimeSize}
            setSize={setDateTimeSize}
            width={dateTimeWidth}
            setWidth={setDateTimeWidth}
            variant={dateTimeVariant}
            setVariant={setDateTimeVariant}
          />
          <div>
            <label className={labelClass} htmlFor="time-preview-format">
              Hour format
            </label>
            <select
              id="time-preview-format"
              className={inputClass}
              value={timeFormat}
              onChange={(event) => setTimeFormat(event.target.value)}
            >
              <option value="12h">12 hour</option>
              <option value="24h">24 hour</option>
            </select>
          </div>
          <Toggle
            label="Include seconds"
            checked={includeSeconds}
            onChange={setIncludeSeconds}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    if (targetSlug === "datetime-picker") {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Customize picker
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Adjust the date display, time format, and selectable days. The
              preview stays open while you customize it.
            </p>
          </div>
          <PickerStyleControls
            theme={dateTimeTheme}
            setTheme={setDateTimeTheme}
            accent={dateTimeAccent}
            setAccent={setDateTimeAccent}
            size={dateTimeSize}
            setSize={setDateTimeSize}
            width={dateTimeWidth}
            setWidth={setDateTimeWidth}
            variant={dateTimeVariant}
            setVariant={setDateTimeVariant}
            showAccent
          />
          <div>
            <label className={labelClass} htmlFor="datetime-preview-locale">
              Date locale
            </label>
            <select
              id="datetime-preview-locale"
              className={inputClass}
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="de-DE">German</option>
              <option value="ja-JP">Japanese</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="datetime-preview-format">
              Time format
            </label>
            <select
              id="datetime-preview-format"
              className={inputClass}
              value={timeFormat}
              onChange={(event) => setTimeFormat(event.target.value)}
            >
              <option value="12h">12 hour</option>
              <option value="24h">24 hour</option>
            </select>
          </div>
          <Toggle
            label="Clearable"
            checked={clearable}
            onChange={setClearable}
          />
          <Toggle
            label="Disable weekends"
            checked={disableWeekends}
            onChange={setDisableWeekends}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    if (["month-picker", "year-picker", "week-picker"].includes(targetSlug)) {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customize picker
          </h3>
          <PickerStyleControls
            theme={dateTimeTheme}
            setTheme={setDateTimeTheme}
            size={dateTimeSize}
            setSize={setDateTimeSize}
            width={dateTimeWidth}
            setWidth={setDateTimeWidth}
            variant={dateTimeVariant}
            setVariant={setDateTimeVariant}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    if (targetSlug === "datetime-range-picker") {
      return (
        <section className={`${sectionClass} space-y-4`}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customize picker
          </h3>
          <PickerStyleControls
            theme={dateTimeTheme}
            setTheme={setDateTimeTheme}
            size={dateTimeSize}
            setSize={setDateTimeSize}
            width={dateTimeWidth}
            setWidth={setDateTimeWidth}
            variant={dateTimeVariant}
            setVariant={setDateTimeVariant}
          />
          <Toggle
            label="Clearable"
            checked={clearable}
            onChange={setClearable}
          />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </section>
      );
    }
    return null;
  };

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Date & Time"
      categoryPath="/date-time"
      subCategories={siblings}
      activeSlug={targetSlug}
      onSelectSibling={(nextSlug) => navigate(`/date-time/${nextSlug}`)}
      onBack={() => navigate("/date-time")}
      onNavigateHome={() => navigate("/")}
      renderCustomPreview={renderPreview}
      renderSidebar={renderCustomizePanel}
      onCustomizeCode={() => navigate(`/date-time/${targetSlug}/customize`)}
    />
  );
}
