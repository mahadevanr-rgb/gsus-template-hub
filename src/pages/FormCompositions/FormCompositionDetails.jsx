import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormComposition } from "@/services/db";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import { Check } from "lucide-react";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";
import FieldAdapter from "@/lib/fieldAdapter";
import {
  DateTimeComponentMap,
  getCompositionFieldValidationRules,
  getCompositionPickerProps,
} from "./dateTimeFieldUtils";
import dateTimePickersSource from "@/pages/Forms/components/DateTime/DateTimePickers.jsx?raw";
import dateTimePickerModelSource from "@/pages/Forms/components/DateTime/dateTimePickerModel.js?raw";
import formFieldSource from "@/pages/Forms/components/FormField/FormField.jsx?raw";
import inputErrorSource from "@/pages/Forms/components/InputError/InputError.jsx?raw";
import helperTextSource from "@/pages/Forms/components/HelperText/HelperText.jsx?raw";
import inputLabelSource from "@/pages/Forms/components/InputLabel/InputLabel.jsx?raw";
import validationIndexSource from "@/utils/validation/index.js?raw";
import validationHookSource from "@/utils/validation/useValidation.js?raw";
import validationEngineSource from "@/utils/validation/engine.js?raw";
import validationRulesSource from "@/utils/validation/rules.js?raw";

const themePresets = {
  default: {
    primaryColor: "#4f46e5",
    borderRadius: 12,
    background: "#020617",
    inputBackground: "#0f172a",
    inputText: "#f8fafc",
    labelColor: "#f8fafc",
  },
  bootstrap: {
    primaryColor: "#0d6efd",
    borderRadius: 6,
    background: "#f8f9fa",
    inputBackground: "#ffffff",
    inputText: "#212529",
    labelColor: "#212529",
  },
  minimal: {
    primaryColor: "#111827",
    borderRadius: 2,
    background: "#ffffff",
    inputBackground: "transparent",
    inputText: "#111827",
    labelColor: "#111827",
  },
  modern: {
    primaryColor: "#7c3aed",
    borderRadius: 18,
    background: "#f5f3ff",
    inputBackground: "#ffffff",
    inputText: "#1e1b4b",
    labelColor: "#312e81",
  },
};

const appearancePresets = {
  light: {
    background: "#ffffff",
    inputBackground: "#ffffff",
    inputText: "#0f172a",
    labelColor: "#334155",
  },
  dark: {
    background: "#020617",
    inputBackground: "#0f172a",
    inputText: "#f8fafc",
    labelColor: "#f8fafc",
  },
};

const themeColors = [
  { name: "Purple", value: "#6c4cf1" },
  { name: "Blue", value: "#2563eb" },
  { name: "Teal", value: "#0d9488" },
  { name: "Orange", value: "#ea580c" },
  { name: "Pink", value: "#db2777" },
  { name: "Red", value: "#dc2626" },
];

function getExportConfig(themeName) {
  if (themeName === "bootstrap") {
    return { styling: "Bootstrap", dependencies: ["bootstrap"] };
  }
  if (themeName === "modern") {
    return {
      styling: "Material UI",
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    };
  }
  return { styling: "Tailwind CSS", dependencies: ["None"] };
}

function generateBootstrapCode(
  composition,
  componentName,
  fields,
  selectedTheme,
) {
  return `import { useState } from "react";
import { useValidation } from "../../utils/validation/index.js";
import { FormField as FieldLayout } from "../../pages/Forms/components/FormField/FormField.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker, DateRangePicker, MonthPicker, YearPicker, WeekPicker, TimePicker, DateTimePicker, DateTimeRangePicker } from "../../pages/Forms/components/DateTime/DateTimePickers.jsx";

const fields = ${fields};
const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component === "range-slider" ? Number(field.props?.min ?? 0) : field.component?.includes("range") ? {} : ""]));
const primaryColor = ${JSON.stringify(selectedTheme.primaryColor)};

function darken(hex, amount = 18) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => Math.max(0, parseInt(value.slice(offset, offset + 2), 16) - amount).toString(16).padStart(2, "0"));
  return "#" + channels.join("");
}

export default function ${componentName}({ onSubmit }) {
  const { values, errors, setValue, handleBlur, validateForm } = useValidation(initialValues, schema, { validateOnChange: true, validateOnBlur: true });
  const [submitHovered, setSubmitHovered] = useState(false);
  const updateField = (id, value) => setValue(id, value);
  const handleSubmit = async (event) => { event.preventDefault(); const result = await validateForm(); if (result.valid) onSubmit?.(values); };
const nameLiteral = JSON.stringify(composition.name || "");
const descriptionLiteral = JSON.stringify(composition.description || "");

  return (
    <form onSubmit={handleSubmit} className="templatehub-bootstrap-form card mx-auto shadow-sm" style={{ maxWidth: 520 }}>
      <style>{".templatehub-bootstrap-form .form-control:focus { border-color: " + primaryColor + "; box-shadow: 0 0 0 .25rem " + primaryColor + "33; }"}</style>
      <div className="card-body p-4 p-md-5">
        <h2 className="h4 card-title">{nameLiteral}</h2>
        <p className="text-body-secondary mb-4">{descriptionLiteral}</p>
        {fields.map((field) => {
          const DateTimeComponent = {
            date: DatePicker, "date-picker": DatePicker, dateRange: DateRangePicker, "date-range-picker": DateRangePicker,
            month: MonthPicker, "month-picker": MonthPicker, year: YearPicker, "year-picker": YearPicker,
            week: WeekPicker, "week-picker": WeekPicker, time: TimePicker, "time-picker": TimePicker,
            datetime: DateTimePicker, "datetime-picker": DateTimePicker, datetimeRange: DateTimeRangePicker, "datetime-range-picker": DateTimeRangePicker,
          }[field.component];
          if (DateTimeComponent) return <div className="mb-3" key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={errors[field.id]}><DateTimeComponent {...field.props} name={field.id} label="" value={values[field.id] ?? (field.component.includes("range") ? {} : "")} onChange={(value) => updateField(field.id, value)} /></FieldLayout></div>;
          if (field.component === "checkbox") return <div className="mb-3" key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout error={errors[field.id]}><label className="form-check"><input {...field.props} id={field.id} type="checkbox" checked={Boolean(values[field.id])} onChange={(event) => updateField(field.id, event.target.checked)} style={{ accentColor: primaryColor }} className="form-check-input" /><span className="form-check-label">{field.label}</span></label></FieldLayout></div>;
          if (field.component === "textarea") return <div className="mb-3" key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={errors[field.id]}><textarea {...field.props} id={field.id} value={values[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} className="form-control" rows={field.props?.rows || 4} /></FieldLayout></div>;
          return <div className="mb-3" key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={errors[field.id]}><input {...field.props} id={field.id} type={field.component === "password-input" ? "password" : field.props?.type || "text"} value={values[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} className="form-control" /></FieldLayout></div>;
        })}
        <button type="submit" onMouseEnter={() => setSubmitHovered(true)} onMouseLeave={() => setSubmitHovered(false)} style={{ backgroundColor: submitHovered ? darken(primaryColor) : primaryColor, borderColor: submitHovered ? darken(primaryColor) : primaryColor }} className="btn w-100 mt-2 text-white">${composition.action?.label || "Submit"}</button>
      </div>
    </form>
  );
}`;
}

function generateMuiCode(composition, componentName, fields, selectedTheme) {
  return `
import { useValidation } from "../../utils/validation/index.js";
import { FormField as FieldLayout } from "../../pages/Forms/components/FormField/FormField.jsx";
import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { DatePicker, DateRangePicker, MonthPicker, YearPicker, WeekPicker, TimePicker, DateTimePicker, DateTimeRangePicker } from "../../pages/Forms/components/DateTime/DateTimePickers.jsx";

const fields = ${fields};
const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component === "range-slider" ? Number(field.props?.min ?? 0) : field.component?.includes("range") ? {} : ""]));
const appTheme = createTheme({ palette: { primary: { main: ${JSON.stringify(selectedTheme.primaryColor)} } }, shape: { borderRadius: ${selectedTheme.borderRadius} } });

export default function ${componentName}({ onSubmit }) {
  const { values, errors, setValue, handleBlur, validateForm } = useValidation(initialValues, schema, { validateOnChange: true, validateOnBlur: true });
  const updateField = (id, value) => setValue(id, value);
  const handleSubmit = async (event) => { event.preventDefault(); const result = await validateForm(); if (result.valid) onSubmit?.(values); };

  return (
    <ThemeProvider theme={appTheme}><Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ mx: "auto", maxWidth: 520, p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Box><Typography variant="h5" fontWeight={700}>${composition.name}</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>${composition.description}</Typography></Box>
        {fields.map((field) => {
          const DateTimeComponent = {
            date: DatePicker, "date-picker": DatePicker, dateRange: DateRangePicker, "date-range-picker": DateRangePicker,
            month: MonthPicker, "month-picker": MonthPicker, year: YearPicker, "year-picker": YearPicker,
            week: WeekPicker, "week-picker": WeekPicker, time: TimePicker, "time-picker": TimePicker,
            datetime: DateTimePicker, "datetime-picker": DateTimePicker, datetimeRange: DateTimeRangePicker, "datetime-range-picker": DateTimeRangePicker,
          }[field.component];
          if (DateTimeComponent) return <div key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={errors[field.id]}><DateTimeComponent {...field.props} name={field.id} label="" value={values[field.id] ?? (field.component.includes("range") ? {} : "")} onChange={(value) => updateField(field.id, value)} /></FieldLayout></div>;
          return field.component === "checkbox" ? (
          <div key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout error={errors[field.id]}><FormControlLabel control={<Checkbox {...field.props} checked={Boolean(values[field.id])} onChange={(event) => updateField(field.id, event.target.checked)} />} label={field.label} /></FieldLayout></div>
        ) : (
          <div key={field.id} onBlurCapture={() => handleBlur(field.id)}><FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={errors[field.id]}><TextField {...field.props} fullWidth type={field.component === "password-input" ? "password" : field.props?.type || "text"} multiline={field.component === "textarea"} minRows={field.component === "textarea" ? field.props?.rows || 4 : undefined} value={values[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} /></FieldLayout></div>
          );
        })}
        <Button type="submit" variant="contained" size="large">${composition.action?.label || "Submit"}</Button>
      </Stack>
    </Paper></ThemeProvider>
  );
}`;
}

// This is exported so the Add to Project source output can be verified directly.
// eslint-disable-next-line react-refresh/only-export-components
export function generateCompositionCode(composition, selectedTheme) {
  if (!composition) return "";
  const rawComponentName = (composition.name || "GeneratedForm").replace(
    /[^a-zA-Z0-9]/g,
    "",
  );

  const componentName = /^[A-Za-z_$]/.test(rawComponentName)
    ? rawComponentName
    : `Generated${rawComponentName || "Form"}`;
  const fields = JSON.stringify(
    (composition.fields || []).map((field) => ({
      ...field,
      props: DateTimeComponentMap[field.component]
        ? getCompositionPickerProps(
            field.component,
            field.props,
            selectedTheme.theme,
          )
        : field.props || {},
      validationRules: getCompositionFieldValidationRules(field),
    })),
    null,
    2,
  );
  const theme = JSON.stringify(selectedTheme, null, 2);
  const linksMarkup = composition.links
    ? `<div className="mt-4 space-y-3 text-sm"><div className="text-right"><a href={customization.forgotPasswordHref || ${JSON.stringify(composition.links.forgotPassword?.href || "/forgot-password")}} className="font-medium hover:underline" style={{ color: theme.primaryColor }}>{customization.forgotPasswordText || ${JSON.stringify(composition.links.forgotPassword?.label || "Forgot password?")}}</a></div><p className="text-center" style={{ color: theme.labelColor }}>{customization.signUpText || ${JSON.stringify(composition.links.signUp?.text || "Don't have an account?")}} <a href={customization.signUpHref || ${JSON.stringify(composition.links.signUp?.href || "/signup")}} className="font-semibold hover:underline" style={{ color: theme.primaryColor }}>{customization.signUpLabel || ${JSON.stringify(composition.links.signUp?.label || "Sign up")}}</a></p></div>`
    : "";
  const formStyle = `<style>{${JSON.stringify('.composition-customizable-form input:not([type="checkbox"]):not([type="radio"]):hover, .composition-customizable-form input:not([type="checkbox"]):not([type="radio"]):focus, .composition-customizable-form textarea:hover, .composition-customizable-form textarea:focus, .composition-customizable-form select:hover, .composition-customizable-form select:focus { border-color: var(--composition-primary-color) !important; } .composition-customizable-form select option:hover, .composition-customizable-form select option:checked { background-color: var(--composition-primary-color) !important; color: #fff !important; } .composition-customizable-form input:not([type="checkbox"]):not([type="radio"]):focus, .composition-customizable-form textarea:focus, .composition-customizable-form select:focus { outline: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--composition-primary-color) 22%, transparent) !important; } .composition-customizable-form input[type="checkbox"]:hover, .composition-customizable-form input[type="checkbox"]:focus { accent-color: var(--composition-primary-color); }')}}</style>`;

  if (selectedTheme.theme === "bootstrap")
    return generateBootstrapCode(
      composition,
      componentName,
      fields,
      selectedTheme,
    );
  if (selectedTheme.theme === "modern")
    return generateMuiCode(composition, componentName, fields, selectedTheme);

  // Keep exported compositions self-contained. A single downloaded .jsx file
  // must not rely on this app's private aliases or individual form atoms.
  return `import { useState } from "react";
import { useValidation } from "../../utils/validation/index.js";
import { FormField as FieldLayout } from "../../pages/Forms/components/FormField/FormField.jsx";
import { DatePicker, DateRangePicker, MonthPicker, YearPicker, WeekPicker, TimePicker, DateTimePicker, DateTimeRangePicker } from "../../pages/Forms/components/DateTime/DateTimePickers.jsx";

const fields = ${fields};
const defaultTheme = ${theme};
const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component === "range-slider" ? Number(field.props?.min ?? 0) : field.component?.includes("range") ? {} : ""]));

function PasswordField({ value, onChange, inputProps, theme }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input {...inputProps} type={visible ? "text" : "password"} value={value} onChange={onChange} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="w-full border border-slate-300 px-4 py-2.5 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
      <button type="button" onClick={() => setVisible((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-900">{visible ? "Hide" : "Show"}</button>
    </div>
  );
}

function FormField({ field, value, onChange, theme }) {
  const inputProps = field.props || {};
  const [selectOpen, setSelectOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const otpLength = Math.max(1, Number(inputProps.length) || 6);
  const pickerProps = { ...inputProps, theme: theme.background === "#020617" ? "dark" : "light", accentColor: theme.primaryColor, label: "", value: value ?? (field.component.includes("range") ? {} : ""), onChange };
  const fieldLayout = (picker) => (
  <div className="composition-field">
    <FieldLayout
      label={field.label}
      labelColor={theme.labelColor}
      required={Boolean(schema[field.id]?.required)}
      error={field.error}
    >
      {picker}
    </FieldLayout>
  </div>
);
  if (["date", "date-picker"].includes(field.component)) return fieldLayout(<DatePicker {...pickerProps} />);
  if (["dateRange", "date-range-picker"].includes(field.component)) return fieldLayout(<DateRangePicker {...pickerProps} />);
  if (["month", "month-picker"].includes(field.component)) return fieldLayout(<MonthPicker {...pickerProps} />);
  if (["year", "year-picker"].includes(field.component)) return fieldLayout(<YearPicker {...pickerProps} />);
  if (["week", "week-picker"].includes(field.component)) return fieldLayout(<WeekPicker {...pickerProps} />);
  if (["time", "time-picker"].includes(field.component)) return fieldLayout(<TimePicker {...pickerProps} />);
  if (["datetime", "datetime-picker"].includes(field.component)) return fieldLayout(<DateTimePicker {...pickerProps} />);
  if (["datetimeRange", "datetime-range-picker"].includes(field.component)) return fieldLayout(<DateTimeRangePicker {...pickerProps} />);
  if (field.component === "checkbox") {
    return <FieldLayout error={field.error}><label className="flex cursor-pointer items-center gap-3 text-sm" style={{ color: theme.labelColor }}><input {...inputProps} type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />{field.label}</label></FieldLayout>;
  }
  if (field.component === "otp-input") {
    const updateOtp = (startIndex, rawValue) => {
      const entered = String(rawValue).replace(/\\D/g, "").slice(0, otpLength - startIndex);
      const next = Array.from({ length: otpLength }, (_, index) => String(value || "")[index] || "");
      if (!entered) next[startIndex] = "";
      else entered.split("").forEach((digit, offset) => { next[startIndex + offset] = digit; });
      onChange(next.join(""));
      if (entered) document.getElementById(field.id + "-otp-" + (Math.min(startIndex + entered.length, otpLength) - 1))?.focus();
    };
    return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><div role="group" aria-label={field.label || "Verification code"} className="flex flex-wrap justify-center gap-2 sm:gap-3">{Array.from({ length: otpLength }, (_, index) => <input key={field.id + "-digit-" + index} id={field.id + "-otp-" + index} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} aria-label={(field.label || "Verification code") + " digit " + (index + 1) + " of " + otpLength} value={String(value || "")[index] || ""} onChange={(event) => updateOtp(index, event.target.value)} onPaste={(event) => { event.preventDefault(); updateOtp(index, event.clipboardData.getData("text")); }} onKeyDown={(event) => { if (event.key === "Backspace" && !event.currentTarget.value && index > 0) document.getElementById(field.id + "-otp-" + (index - 1))?.focus(); if (event.key === "ArrowLeft" && index > 0) document.getElementById(field.id + "-otp-" + (index - 1))?.focus(); if (event.key === "ArrowRight" && index < otpLength - 1) document.getElementById(field.id + "-otp-" + (index + 1))?.focus(); }} style={{ width: 48, height: 48, backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="border border-slate-300 text-center text-lg font-semibold outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />)}</div></FieldLayout>;
  }
  if (field.component === "textarea") {
    return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><textarea {...inputProps} value={value} onChange={onChange} rows={inputProps.rows || 4} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="block w-full resize-y border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></FieldLayout>;
  }
  if (field.component === "password-input") {
    return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><PasswordField inputProps={inputProps} theme={theme} value={value} onChange={onChange} /></FieldLayout>;
  }
  const inputClassName = "block w-full border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";
  const inputStyle = { backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius };
  if (field.component === "select-dropdown") {
    const selectOptions = Array.isArray(inputProps.options) && inputProps.options.length ? inputProps.options : [];
    const selectedIndex = selectOptions.findIndex((option) => option.value === value);
    const selectOption = (option) => { onChange(option.value); setSelectOpen(false); };
    const handleSelectKeyDown = (event) => {
      if (["ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        setSelectOpen(true);
        setActiveOptionIndex((current) => {
          if (!selectOpen) return direction > 0 ? Math.max(0, selectedIndex) : selectedIndex < 0 ? Math.max(0, selectOptions.length - 1) : selectedIndex;
          return Math.max(0, Math.min(selectOptions.length - 1, current + direction));
        });
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (selectOpen && selectOptions[activeOptionIndex]) selectOption(selectOptions[activeOptionIndex]);
        else { setSelectOpen(true); setActiveOptionIndex(Math.max(0, selectedIndex)); }
      } else if (event.key === "Escape") {
        setSelectOpen(false);
      }
    };
    return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><div className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSelectOpen(false); }}><button id={field.id} type="button" role="combobox" aria-label={field.label || "Choose an option"} aria-haspopup="listbox" aria-expanded={selectOpen} aria-controls={field.id + "-options"} aria-activedescendant={selectOpen ? field.id + "-option-" + activeOptionIndex : undefined} onClick={() => { setSelectOpen((open) => !open); setActiveOptionIndex(Math.max(0, selectedIndex)); }} onKeyDown={handleSelectKeyDown} style={{ ...inputStyle, borderColor: selectOpen ? theme.primaryColor : undefined }} className="flex w-full items-center justify-between gap-3 border border-slate-300 px-4 py-2.5 text-left text-sm outline-none transition focus:ring-4 focus:ring-indigo-500/10"><span className={selectedIndex < 0 ? "text-slate-400" : ""}>{selectedIndex < 0 ? inputProps.placeholder || "Select an option..." : selectOptions[selectedIndex].label}</span><span aria-hidden="true" className="text-xs text-slate-500">▾</span></button>{selectOpen && <div id={field.id + "-options"} role="listbox" aria-label={field.label || "Options"} className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-300 py-1 shadow-xl" style={{ backgroundColor: theme.inputBackground, borderColor: theme.primaryColor }}>{selectOptions.map((option, index) => <button key={String(option.value)} id={field.id + "-option-" + index} type="button" role="option" aria-selected={value === option.value} onMouseEnter={() => setActiveOptionIndex(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => selectOption(option)} style={{ backgroundColor: activeOptionIndex === index ? theme.primaryColor : "transparent", color: activeOptionIndex === index ? "#fff" : theme.inputText }} className="block w-full px-3 py-2 text-left text-sm transition-colors">{option.label}</button>)}</div>}</div></FieldLayout>;
  }
  if (field.component === "radio-button") { const options = Array.isArray(inputProps.options) && inputProps.options.length ? inputProps.options : [{ value: "option", label: "Option" }]; return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><div role="radiogroup" aria-label={field.label || "Choose an option"} className="space-y-2">{options.map((option) => <label key={String(option.value)} className="flex cursor-pointer items-center gap-2 text-sm" style={{ color: theme.labelColor }}><input type="radio" name={field.id} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} style={{ accentColor: theme.primaryColor }} />{option.label}</label>)}</div></FieldLayout>; }
  if (field.component === "switch-toggle") return <FieldLayout error={field.error}><label className="flex items-center gap-2 text-sm" style={{ color: theme.labelColor }}><input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />{field.label}</label></FieldLayout>;
  if (field.component === "range-slider") { const min = Number(inputProps.min ?? 0); const max = Number(inputProps.max ?? 100); const rangeValue = value === "" || value == null ? min : Math.min(max, Math.max(min, Number(value))); return <FieldLayout label={field.label} labelColor={theme.labelColor} error={field.error}><div className="space-y-2"><input type="range" min={min} max={max} step={Number(inputProps.step ?? 1)} value={rangeValue} onChange={(event) => onChange(Number(event.target.value))} style={{ accentColor: theme.primaryColor }} className="w-full" /><div className="flex justify-between text-xs" style={{ color: theme.labelColor }}><span>{min}</span><span className="font-semibold">{rangeValue}</span><span>{max}</span></div></div></FieldLayout>; }
  if (["input-label", "input-error", "helper-text"].includes(field.component)) return <FieldLayout error={field.error}><p className="text-sm" style={{ color: theme.labelColor }}>{field.label}</p></FieldLayout>;
  const inputType = { "date-input": "date", "search-input": "search", "file-upload": "file" }[field.component] || inputProps.type || "text";
  return <FieldLayout label={field.label} labelColor={theme.labelColor} required={Boolean(schema[field.id]?.required)} error={field.error}><input {...inputProps} type={inputType} value={field.component === "file-upload" ? undefined : value} onChange={(event) => onChange(field.component === "file-upload" ? event.target.files : event.target.value)} style={inputStyle} className={inputClassName} /></FieldLayout>;
}

export default function ${componentName}({ onSubmit, theme: themeOverrides = {}, ...customization }) {
  const { values, errors, setValue, handleBlur, validateForm } = useValidation(initialValues, schema, { mode: "first", validateOnChange: true, validateOnBlur: true });
  const theme = { ...defaultTheme, ...themeOverrides };
  const updateField = (id, value) => setValue(id, value);
  const handleSubmit = async (event) => { event.preventDefault(); const result = await validateForm(); if (result.valid) onSubmit?.(values); };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: theme.background, borderRadius: theme.borderRadius, "--composition-primary-color": theme.primaryColor }} className="composition-customizable-form mx-auto w-full max-w-md space-y-5 border border-slate-200 p-6 shadow-sm">
      ${formStyle}
      <div><h2 style={{ color: theme.inputText }} className="text-lg font-bold">${composition.name}</h2><p className="mt-1 text-sm text-slate-500">${composition.description}</p></div>
      <div className="space-y-4">{fields.map((field) => <div key={field.id} onBlurCapture={() => handleBlur(field.id)}><FormField field={{ ...field, error: errors[field.id] }} theme={theme} value={values[field.id] ?? ""} onChange={(value) => updateField(field.id, value?.target ? value.target.value : value)} /></div>)}</div>
<button
  type="submit"
  style={{
    backgroundColor: theme.primaryColor,
    borderRadius: theme.borderRadius,
  }}
  className="w-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
>
  ${composition.action?.label || "Submit"}
</button>${linksMarkup}    </form>
  );
}`;
}

export default function FormCompositionDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [composition, setComposition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [formTheme, setFormTheme] = useState({
    theme: "default",
    appearance: "dark",
    ...themePresets.default,
  });

  useEffect(() => {
    let active = true;
    const targetSlug = id || slug || "login-form";

    // Try finding in local registry first, then db
    const local = formCompositions.find(
      (c) => c.slug === targetSlug || c.id === targetSlug,
    );
    if (local) {
      setComposition(local);
      setLoading(false);
    } else {
      fetchFormComposition(targetSlug).then((result) => {
        if (active) {
          setComposition(result || formCompositions[0]);
          setLoading(false);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [id, slug]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xs text-slate-400">Loading composition details...</p>
      </div>
    );
  }

  const activeComp = composition || formCompositions[0];
  const sourceCode =
    activeComp.customizedSourceCode ||
    generateCompositionCode(activeComp, formTheme);
  const exportConfig = getExportConfig(formTheme.theme);
  const installableFormFieldSource = formFieldSource
    .replace(
      "@/pages/Forms/components/InputError/InputError",
      "../InputError/InputError.jsx",
    )
    .replace(
      "@/pages/Forms/components/HelperText/HelperText",
      "../HelperText/HelperText.jsx",
    );

  const componentData = {
    name: activeComp.name,
    slug: activeComp.slug,
    category: "Form Compositions",
    subCategory: activeComp.category,
    description: activeComp.description,
    sourceCode,
    installProps: activeComp.installProps || {},
    files: activeComp.customizedFiles?.length
      ? activeComp.customizedFiles
      : [
          {
            path: "src/pages/Forms/components/DateTime/DateTimePickers.jsx",
            content: dateTimePickersSource,
          },
          {
            path: "src/pages/Forms/components/DateTime/dateTimePickerModel.js",
            content: dateTimePickerModelSource,
          },
          {
            path: "src/pages/Forms/components/FormField/FormField.jsx",
            content: installableFormFieldSource,
          },
          {
            path: "src/pages/Forms/components/InputError/InputError.jsx",
            content: inputErrorSource,
          },
          {
            path: "src/pages/Forms/components/HelperText/HelperText.jsx",
            content: helperTextSource,
          },
          {
            path: "src/pages/Forms/components/InputLabel/InputLabel.jsx",
            content: inputLabelSource,
          },
          {
            path: "src/utils/validation/index.js",
            content: validationIndexSource,
          },
          {
            path: "src/utils/validation/useValidation.js",
            content: validationHookSource,
          },
          {
            path: "src/utils/validation/engine.js",
            content: validationEngineSource,
          },
          {
            path: "src/utils/validation/rules.js",
            content: validationRulesSource,
          },
          {
            path: `src/components/forms/${activeComp.slug}.jsx`,
            content: sourceCode,
          },
        ],
    framework: "react",
    styling: exportConfig.styling,
    version: activeComp.version || "1.0.0",
    dependencies: [
      "lucide-react",
      ...exportConfig.dependencies.filter(
        (dependency) => dependency !== "None",
      ),
    ],
    size: "~3.5 KB",
    lastUpdated: "May 12, 2025",
    author: "TemplateHub UI Team",
  };

  const handleBack = () => {
    navigate("/form-compositions");
  };

  const handleHome = () => {
    navigate("/");
  };

  const renderLiveFormPreview = () => {
    return (
      <div
        className="composition-preview w-full max-w-sm p-6 border shadow-xl space-y-4"
        style={{
          "--composition-primary": formTheme.primaryColor,
          "--composition-radius": `${formTheme.borderRadius}px`,
          "--composition-input-background": formTheme.inputBackground,
          "--composition-input-text": formTheme.inputText,
          "--composition-label": formTheme.labelColor,
          backgroundColor: formTheme.background,
          borderRadius: `${formTheme.borderRadius}px`,
          borderColor: formTheme.primaryColor,
        }}
      >
        <div className="border-b border-slate-800/80 pb-3">
          <style>{`
  .composition-preview .fc-field input:not([type="checkbox"]):not([type="radio"]),
  .composition-preview .fc-field textarea,
  .composition-preview .fc-field select {
    background-color: var(--composition-input-background) !important;
    color: var(--composition-input-text) !important;
    border-radius: var(--composition-radius) !important;
  }

  .composition-preview .fc-field select option:hover,
  .composition-preview .fc-field select option:checked {
    background-color: var(--composition-primary) !important;
    color: #fff !important;
  }

  .composition-preview .fc-field label,
  .composition-preview .fc-field > span {
    color: var(--composition-label);
  }

  .composition-preview .fc-field input::placeholder,
  .composition-preview .fc-field textarea::placeholder {
    color: var(--composition-label);
    opacity: 0.65;
  }
`}</style>

          <h3
            className="text-sm font-bold"
            style={{ color: formTheme.inputText }}
          >
            {activeComp.name}
          </h3>

          <p
            className="mt-0.5 text-[11px]"
            style={{ color: formTheme.labelColor }}
          >
            {activeComp.description}
          </p>
        </div>

        <div className="space-y-3">
          {activeComp.fields?.map((field) => {
            const fieldKey = field.id || field.label;
            const val = formData[fieldKey] ?? "";

            const DateTimeComponent = DateTimeComponentMap[field.component];
            if (DateTimeComponent) {
              return (
                <div key={fieldKey} className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-300">
                    {field.label}
                    {field.validationRules?.required && (
                      <span className="ml-1 text-rose-400">*</span>
                    )}
                  </label>
                  <DateTimeComponent
                    {...getCompositionPickerProps(
                      field.component,
                      field.props,
                      formTheme.theme,
                    )}
                    label=""
                    value={val || (field.component.includes("range") ? {} : "")}
                    onChange={(value) =>
                      setFormData((current) => ({
                        ...current,
                        [fieldKey]: value,
                      }))
                    }
                  />
                  {formErrors[fieldKey] && (
                    <p className="text-xs text-rose-500" role="alert">
                      {formErrors[fieldKey]}
                    </p>
                  )}
                </div>
              );
            }

            return (
              <div key={fieldKey} className="space-y-1">
                <FieldAdapter
                  field={{ ...field, props: field.props || {} }}
                  value={val}
                  error={formErrors[fieldKey]}
                  onChange={(value) => {
                    setFormData((current) => ({
                      ...current,
                      [fieldKey]: value,
                    }));

                    setFormErrors((current) => ({
                      ...current,
                      [fieldKey]: "",
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="pt-2 space-y-3">
          <div className="flex justify-end">
            <a
              href={
                activeComp.links?.forgotPassword?.href || "/forgot-password"
              }
              className="text-sm font-medium hover:underline"
              style={{ color: formTheme.labelColor }}
            >
              {activeComp.links?.forgotPassword?.label || "Forgot password?"}
            </a>
          </div>

          <PrimaryButton
            className="composition-submit w-full"
            onClick={() => {
              if (!validatePreviewForm()) return;

              alert(`Form submitted successfully for ${activeComp.name}!`);
            }}
          >
            {activeComp.action?.label || "Submit"}
          </PrimaryButton>

          <p className="mt-4 text-center text-sm">
            <span style={{ color: formTheme.labelColor }}>
              {activeComp.links?.signUp?.text || "Don't have an account?"}
            </span>{" "}
            <a
              href={activeComp.links?.signUp?.href || "/signup"}
              className="font-semibold hover:underline"
              style={{ color: formTheme.labelColor }}
            >
              {activeComp.links?.signUp?.label || "Sign up"}
            </a>
          </p>
        </div>
      </div>
    );
  };

  const validatePreviewForm = () => {
    const nextErrors = {};

    activeComp.fields?.forEach((field) => {
      const fieldKey = field.id || field.label;
      const value = formData[fieldKey];
      const rules = getCompositionFieldValidationRules(field);

      if (
        rules?.required &&
        (value === undefined ||
          value === null ||
          value === "" ||
          (typeof value === "string" && !value.trim()))
      ) {
        nextErrors[fieldKey] = `${field.label} is required`;
      }
    });

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const renderCustomizePanel = () => (
    <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Customize
      </h3>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
        Theme
        <select
          value={formTheme.theme}
          onChange={(event) => {
            const theme = event.target.value;
            setFormTheme({ theme, ...themePresets[theme] });
          }}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
        >
          {Object.keys(themePresets).map((theme) => (
            <option key={theme} value={theme}>
              {theme[0].toUpperCase() + theme.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <div>
        <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          Primary color
        </p>
        <div className="flex flex-wrap gap-2">
          {themeColors.map((color) => {
            const active =
              formTheme.primaryColor.toLowerCase() ===
              color.value.toLowerCase();
            return (
              <button
                key={color.value}
                type="button"
                title={color.name}
                aria-label={`Use ${color.name}`}
                onClick={() =>
                  setFormTheme((current) => ({
                    ...current,
                    primaryColor: color.value,
                  }))
                }
                className={`flex h-7 w-7 items-center justify-center rounded-lg border-2 text-white transition-transform hover:-translate-y-0.5 ${active ? "border-slate-900 dark:border-white ring-2 ring-indigo-400/50" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
              >
                {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
        Input style
        <select
          value={formTheme.borderRadius}
          onChange={(event) =>
            setFormTheme((current) => ({
              ...current,
              borderRadius: Number(event.target.value),
            }))
          }
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
        >
          <option value={2}>Square</option>
          <option value={6}>Soft</option>
          <option value={12}>Rounded</option>
          <option value={18}>Large rounded</option>
        </select>
      </label>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
          Appearance
          <select
            value={formTheme.appearance}
            onChange={(event) => {
              const appearance = event.target.value;

              setFormTheme((current) => ({
                ...current,
                appearance,
                ...appearancePresets[appearance],
              }));
            }}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </section>
  );

  // <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
  //   Appearance
  //   <select
  //     value={formTheme.appearance}
  //     onChange={(event) => {
  //       const appearance = event.target.value;

  //       setFormTheme((current) => ({
  //         ...current,
  //         appearance,
  //         ...appearancePresets[appearance],
  //       }));
  //     }}
  //     className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
  //   >
  //     <option value="light">Light</option>
  //     <option value="dark">Dark</option>
  //   </select>
  // </label>;

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Form Compositions"
      categoryPath="/form-compositions"
      subCategories={formCompositions.map((c) => ({
        slug: c.slug,
        name: c.name,
      }))}
      activeSlug={activeComp.slug}
      onSelectSibling={(slug) => navigate(`/form-compositions/${slug}`)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      onCustomizeCode={() =>
        navigate(`/form-compositions/${activeComp.slug}/customize`)
      }
      renderCustomPreview={renderLiveFormPreview}
      renderSidebar={renderCustomizePanel}
    />
  );
}
