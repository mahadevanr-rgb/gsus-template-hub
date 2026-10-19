import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormComposition } from "@/services/db";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import { Check } from "lucide-react";
import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Textarea } from "@/pages/Forms/components/Textarea/Textarea";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import { OTPInput } from "@/pages/Forms/components/OtpInput/OtpInput";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";
import { DateTimeComponentMap, getCompositionFieldValidationRules, getCompositionPickerProps } from "./dateTimeFieldUtils";
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
    primaryColor: "#4f46e5", borderRadius: 12, background: "#020617",
    inputBackground: "#0f172a", inputText: "#f8fafc", labelColor: "#cbd5e1",
  },
  bootstrap: {
    primaryColor: "#0d6efd", borderRadius: 6, background: "#f8f9fa",
    inputBackground: "#ffffff", inputText: "#212529", labelColor: "#212529",
  },
  minimal: {
    primaryColor: "#111827", borderRadius: 2, background: "#ffffff",
    inputBackground: "transparent", inputText: "#111827", labelColor: "#111827",
  },
  modern: {
    primaryColor: "#7c3aed", borderRadius: 18, background: "#f5f3ff",
    inputBackground: "#ffffff", inputText: "#1e1b4b", labelColor: "#312e81",
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
    return { styling: "Material UI", dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"] };
  }
  return { styling: "Tailwind CSS", dependencies: ["None"] };
}

function generateBootstrapCode(composition, componentName, fields, selectedTheme) {
  return `import { useState } from "react";
import { useValidation } from "../../utils/validation/index.js";
import { FormField as FieldLayout } from "../../pages/Forms/components/FormField/FormField.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker, DateRangePicker, MonthPicker, YearPicker, WeekPicker, TimePicker, DateTimePicker, DateTimeRangePicker } from "../../pages/Forms/components/DateTime/DateTimePickers.jsx";

const fields = ${fields};
const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component?.includes("range") ? {} : ""]));
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

  return (
    <form onSubmit={handleSubmit} className="templatehub-bootstrap-form card mx-auto shadow-sm" style={{ maxWidth: 520 }}>
      <style>{".templatehub-bootstrap-form .form-control:focus { border-color: " + primaryColor + "; box-shadow: 0 0 0 .25rem " + primaryColor + "33; }"}</style>
      <div className="card-body p-4 p-md-5">
        <h2 className="h4 card-title">${composition.name}</h2>
        <p className="text-body-secondary mb-4">${composition.description}</p>
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
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component?.includes("range") ? {} : ""]));
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
  const componentName = composition.name.replace(/[^a-zA-Z0-9]/g, "");
  const fields = JSON.stringify((composition.fields || []).map((field) => ({
    ...field,
    props: DateTimeComponentMap[field.component]
      ? getCompositionPickerProps(field.component, field.props, selectedTheme.theme)
      : field.props || {},
    validationRules: getCompositionFieldValidationRules(field),
  })), null, 2);
  const theme = JSON.stringify(selectedTheme, null, 2);

  if (selectedTheme.theme === "bootstrap") return generateBootstrapCode(composition, componentName, fields, selectedTheme);
  if (selectedTheme.theme === "modern") return generateMuiCode(composition, componentName, fields, selectedTheme);

  // Keep exported compositions self-contained. A single downloaded .jsx file
  // must not rely on this app's private aliases or individual form atoms.
  return `import { useState } from "react";
import { useValidation } from "../../utils/validation/index.js";
import { FormField as FieldLayout } from "../../pages/Forms/components/FormField/FormField.jsx";
import { DatePicker, DateRangePicker, MonthPicker, YearPicker, WeekPicker, TimePicker, DateTimePicker, DateTimeRangePicker } from "../../pages/Forms/components/DateTime/DateTimePickers.jsx";

const fields = ${fields};
const defaultTheme = ${theme};
const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));
const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component?.includes("range") ? {} : ""]));

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
  const pickerProps = { ...inputProps, label: "", value: value ?? (field.component.includes("range") ? {} : ""), onChange };
  const fieldLayout = (picker) => <FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={field.error}>{picker}</FieldLayout>;
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
  if (field.component === "textarea") {
    return <FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={field.error}><textarea {...inputProps} value={value} onChange={onChange} rows={inputProps.rows || 4} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="block w-full resize-y border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></FieldLayout>;
  }
  if (field.component === "password-input") {
    return <FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={field.error}><PasswordField inputProps={inputProps} theme={theme} value={value} onChange={onChange} /></FieldLayout>;
  }
  return <FieldLayout label={field.label} required={Boolean(schema[field.id]?.required)} error={field.error}><input {...inputProps} value={value} onChange={onChange} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="block w-full border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></FieldLayout>;
}

export default function ${componentName}({ onSubmit, theme: themeOverrides = {} }) {
  const { values, errors, setValue, handleBlur, validateForm } = useValidation(initialValues, schema, { mode: "first", validateOnChange: true, validateOnBlur: true });
  const theme = { ...defaultTheme, ...themeOverrides };
  const updateField = (id, value) => setValue(id, value);
  const handleSubmit = async (event) => { event.preventDefault(); const result = await validateForm(); if (result.valid) onSubmit?.(values); };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: theme.background, borderRadius: theme.borderRadius }} className="mx-auto w-full max-w-md space-y-5 border border-slate-200 p-6 shadow-sm">
      <div><h2 style={{ color: theme.inputText }} className="text-lg font-bold">${composition.name}</h2><p className="mt-1 text-sm text-slate-500">${composition.description}</p></div>
      <div className="space-y-4">{fields.map((field) => <div key={field.id} onBlurCapture={() => handleBlur(field.id)}><FormField field={{ ...field, error: errors[field.id] }} theme={theme} value={values[field.id] ?? ""} onChange={(value) => updateField(field.id, value?.target ? value.target.value : value)} /></div>)}</div>
      <button type="submit" style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }} className="w-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/30">${composition.action?.label || "Submit"}</button>
    </form>
  );
}`;
}

export default function FormCompositionDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [composition, setComposition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form values state for live interactive preview
  const [formData, setFormData] = useState({});
  const [formTheme, setFormTheme] = useState({ theme: "default", ...themePresets.default });

  useEffect(() => {
    let active = true;
    const targetSlug = id || slug || "login-form";

    // Try finding in local registry first, then db
    const local = formCompositions.find((c) => c.slug === targetSlug || c.id === targetSlug);
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
  const sourceCode = generateCompositionCode(activeComp, formTheme);
  const exportConfig = getExportConfig(formTheme.theme);
  const installableFormFieldSource = formFieldSource
    .replace("@/pages/Forms/components/InputError/InputError", "../InputError/InputError.jsx")
    .replace("@/pages/Forms/components/HelperText/HelperText", "../HelperText/HelperText.jsx");

  const componentData = {
    name: activeComp.name,
    slug: activeComp.slug,
    category: "Form Compositions",
    subCategory: activeComp.category,
    description: activeComp.description,
    sourceCode,
    files: [
      { path: "src/pages/Forms/components/DateTime/DateTimePickers.jsx", content: dateTimePickersSource },
      { path: "src/pages/Forms/components/DateTime/dateTimePickerModel.js", content: dateTimePickerModelSource },
      { path: "src/pages/Forms/components/FormField/FormField.jsx", content: installableFormFieldSource },
      { path: "src/pages/Forms/components/InputError/InputError.jsx", content: inputErrorSource },
      { path: "src/pages/Forms/components/HelperText/HelperText.jsx", content: helperTextSource },
      { path: "src/pages/Forms/components/InputLabel/InputLabel.jsx", content: inputLabelSource },
      { path: "src/utils/validation/index.js", content: validationIndexSource },
      { path: "src/utils/validation/useValidation.js", content: validationHookSource },
      { path: "src/utils/validation/engine.js", content: validationEngineSource },
      { path: "src/utils/validation/rules.js", content: validationRulesSource },
      { path: `src/components/forms/${activeComp.slug}.jsx`, content: sourceCode },
    ],
    framework: "react",
    styling: exportConfig.styling,
    version: activeComp.version || "1.0.0",
    dependencies: [
      "lucide-react",
      ...exportConfig.dependencies.filter((dependency) => dependency !== "None"),
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
          <h3 className="text-sm font-bold text-white">{activeComp.name}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{activeComp.description}</p>
        </div>

        <div className="space-y-3">
          {activeComp.fields?.map((field) => {
            const fieldKey = field.id || field.label;
            const val = formData[fieldKey] ?? "";

            if (field.component === "password-input") {
              return (
                <div key={fieldKey} className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-300 block">
                    {field.label}
                  </label>
                  <PasswordInput
                    placeholder={field.props?.placeholder || "Enter password..."}
                    value={val}
                    onChange={(e) =>
                      setFormData({ ...formData, [fieldKey]: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
              );
            }

            if (field.component === "checkbox") {
              return (
                <div key={fieldKey} className="pt-1">
                  <Checkbox
                    label={field.label}
                    checked={!!val}
                    onChange={(checked) =>
                      setFormData({ ...formData, [fieldKey]: checked })
                    }
                  />
                </div>
              );
            }

            if (field.component === "textarea") {
              return (
                <div key={fieldKey} className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-300 block">
                    {field.label}
                  </label>
                  <Textarea
                    placeholder={field.props?.placeholder || "Write message..."}
                    value={val}
                    onChange={(e) =>
                      setFormData({ ...formData, [fieldKey]: e.target.value })
                    }
                    rows={3}
                    className="w-full"
                  />
                </div>
              );
            }

            if (field.component === "otp-input") {
              return (
                <div key={fieldKey} className="space-y-2 text-center">
                  <label className="text-[11px] font-medium text-slate-300 block">
                    {field.label}
                  </label>
                  <OTPInput length={6} />
                </div>
              );
            }

            const DateTimeComponent = DateTimeComponentMap[field.component];
            if (DateTimeComponent) {
              return (
                <div key={fieldKey} className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-300">
                    {field.label}
                    {field.validationRules?.required && <span className="ml-1 text-rose-400">*</span>}
                  </label>
                  <DateTimeComponent
                    {...getCompositionPickerProps(field.component, field.props, formTheme.theme)}
                    label=""
                    value={val || (field.component.includes("range") ? {} : "")}
                    onChange={(value) => setFormData((current) => ({ ...current, [fieldKey]: value }))}
                  />
                </div>
              );
            }

            // Default Text Input
            return (
              <div key={fieldKey} className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300 block">
                  {field.label}
                </label>
                <TextInput
                  type={field.props?.type || "text"}
                  placeholder={field.props?.placeholder || "Enter text..."}
                  value={val}
                  onChange={(e) =>
                    setFormData({ ...formData, [fieldKey]: e.target.value })
                  }
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <PrimaryButton
            className="composition-submit w-full"
            onClick={() => alert(`Form submitted successfully for ${activeComp.name}!`)}
          >
            {activeComp.action?.label || "Submit"}
          </PrimaryButton>
        </div>
      </div>
    );
  };

  const renderCustomizePanel = () => (
    <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customize</h3>
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
            <option key={theme} value={theme}>{theme[0].toUpperCase() + theme.slice(1)}</option>
          ))}
        </select>
      </label>
      <div>
        <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-300">Primary color</p>
        <div className="flex flex-wrap gap-2">
          {themeColors.map((color) => {
            const active = formTheme.primaryColor.toLowerCase() === color.value.toLowerCase();
            return (
              <button
                key={color.value}
                type="button"
                title={color.name}
                aria-label={`Use ${color.name}`}
                onClick={() => setFormTheme((current) => ({ ...current, primaryColor: color.value }))}
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
          onChange={(event) => setFormTheme((current) => ({ ...current, borderRadius: Number(event.target.value) }))}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
        >
          <option value={2}>Square</option><option value={6}>Soft</option><option value={12}>Rounded</option><option value={18}>Large rounded</option>
        </select>
      </label>
    </section>
  );

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
      renderCustomPreview={renderLiveFormPreview}
      renderSidebar={renderCustomizePanel}
    />
  );
}
