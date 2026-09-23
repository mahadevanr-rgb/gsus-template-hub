import React from "react";
import { Info } from "lucide-react";
import TextInput from "@/pages/Forms/components/TextInput/TextInput";

export default function DynamicFieldRenderer({
  field,
  value,
  onChange,
  error,
}) {
  const {
    id,
    name,
    label,
    helperText,
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
    min,
    max,
    step,
    infoTooltip,
  } = field;

  const fieldId = id || name;

  const handleChange = (e) => {
    const rawVal = e.target.value;
    const finalVal = type === "number" ? (rawVal === "" ? "" : Number(rawVal)) : rawVal;
    onChange(name, finalVal);
  };

  return (
    <div className="space-y-1.5 text-left">
      {/* Label and Info Tooltip */}
      {label && (
        <div className="flex items-start justify-between gap-2">
          <label
            htmlFor={fieldId}
            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug inline-flex items-center gap-1.5 flex-wrap"
          >
            <span>{label}</span>
            {required && <span className="text-rose-500 font-bold">*</span>}
          </label>

          {(infoTooltip || helperText) && (
            <div className="relative group shrink-0 pt-0.5">
              <button
                type="button"
                tabIndex={0}
                aria-label={infoTooltip || helperText}
                className="cursor-help text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus:outline-none p-0.5 rounded flex items-center justify-center"
              >
                <Info className="w-3.5 h-3.5" />
              </button>

              {/* Tooltip Hover Popover */}
              <div className="pointer-events-none absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-30 w-56 p-2.5 rounded-lg bg-slate-900 text-white text-[11px] leading-tight shadow-xl border border-slate-700 text-center">
                {infoTooltip || helperText}
                <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Field Input with clearly visible default borders */}
      <div className="relative w-full">
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value !== undefined ? value : ""}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:bg-slate-50 ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
        />
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-medium pt-0.5">{error}</p>
      )}
    </div>
  );
}
