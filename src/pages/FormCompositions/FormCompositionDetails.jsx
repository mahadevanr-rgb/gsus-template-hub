import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormComposition } from "@/services/db";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import { Check } from "lucide-react";
import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Textarea } from "@/pages/Forms/components/Textarea/Textarea";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import { OTPInput } from "@/pages/Forms/components/OTPInput/OTPInput";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";

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
import "bootstrap/dist/css/bootstrap.min.css";

const fields = ${fields};
const primaryColor = ${JSON.stringify(selectedTheme.primaryColor)};

function darken(hex, amount = 18) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => Math.max(0, parseInt(value.slice(offset, offset + 2), 16) - amount).toString(16).padStart(2, "0"));
  return "#" + channels.join("");
}

export default function ${componentName}({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [submitHovered, setSubmitHovered] = useState(false);
  const updateField = (id, value) => setFormData((current) => ({ ...current, [id]: value }));
  const handleSubmit = (event) => { event.preventDefault(); onSubmit?.(formData); };

  return (
    <form onSubmit={handleSubmit} className="templatehub-bootstrap-form card mx-auto shadow-sm" style={{ maxWidth: 520 }}>
      <style>{".templatehub-bootstrap-form .form-control:focus { border-color: " + primaryColor + "; box-shadow: 0 0 0 .25rem " + primaryColor + "33; }"}</style>
      <div className="card-body p-4 p-md-5">
        <h2 className="h4 card-title">${composition.name}</h2>
        <p className="text-body-secondary mb-4">${composition.description}</p>
        {fields.map((field) => {
          if (field.component === "checkbox") return <div className="form-check mb-3" key={field.id}><input {...field.props} id={field.id} type="checkbox" checked={Boolean(formData[field.id])} onChange={(event) => updateField(field.id, event.target.checked)} style={{ accentColor: primaryColor }} className="form-check-input" /><label className="form-check-label" htmlFor={field.id}>{field.label}</label></div>;
          if (field.component === "textarea") return <div className="mb-3" key={field.id}><label className="form-label" htmlFor={field.id}>{field.label}</label><textarea {...field.props} id={field.id} value={formData[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} className="form-control" rows={field.props?.rows || 4} /></div>;
          return <div className="mb-3" key={field.id}><label className="form-label" htmlFor={field.id}>{field.label}</label><input {...field.props} id={field.id} type={field.component === "password-input" ? "password" : field.props?.type || "text"} value={formData[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} className="form-control" /></div>;
        })}
        <button type="submit" onMouseEnter={() => setSubmitHovered(true)} onMouseLeave={() => setSubmitHovered(false)} style={{ backgroundColor: submitHovered ? darken(primaryColor) : primaryColor, borderColor: submitHovered ? darken(primaryColor) : primaryColor }} className="btn w-100 mt-2 text-white">${composition.action?.label || "Submit"}</button>
      </div>
    </form>
  );
}`;
}

function generateMuiCode(composition, componentName, fields, selectedTheme) {
  return `import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

const fields = ${fields};
const appTheme = createTheme({ palette: { primary: { main: ${JSON.stringify(selectedTheme.primaryColor)} } }, shape: { borderRadius: ${selectedTheme.borderRadius} } });

export default function ${componentName}({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const updateField = (id, value) => setFormData((current) => ({ ...current, [id]: value }));
  const handleSubmit = (event) => { event.preventDefault(); onSubmit?.(formData); };

  return (
    <ThemeProvider theme={appTheme}><Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ mx: "auto", maxWidth: 520, p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
      <Stack spacing={2.5}>
        <Box><Typography variant="h5" fontWeight={700}>${composition.name}</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>${composition.description}</Typography></Box>
        {fields.map((field) => field.component === "checkbox" ? (
          <FormControlLabel key={field.id} control={<Checkbox {...field.props} checked={Boolean(formData[field.id])} onChange={(event) => updateField(field.id, event.target.checked)} />} label={field.label} />
        ) : (
          <TextField key={field.id} {...field.props} fullWidth label={field.label} type={field.component === "password-input" ? "password" : field.props?.type || "text"} multiline={field.component === "textarea"} minRows={field.component === "textarea" ? field.props?.rows || 4 : undefined} value={formData[field.id] || ""} onChange={(event) => updateField(field.id, event.target.value)} />
        ))}
        <Button type="submit" variant="contained" size="large">${composition.action?.label || "Submit"}</Button>
      </Stack>
    </Paper></ThemeProvider>
  );
}`;
}

function generateCompositionCode(composition, selectedTheme) {
  if (!composition) return "";
  const componentName = composition.name.replace(/[^a-zA-Z0-9]/g, "");
  const fields = JSON.stringify(composition.fields || [], null, 2);
  const theme = JSON.stringify(selectedTheme, null, 2);

  if (selectedTheme.theme === "bootstrap") return generateBootstrapCode(composition, componentName, fields, selectedTheme);
  if (selectedTheme.theme === "modern") return generateMuiCode(composition, componentName, fields, selectedTheme);

  // Keep exported compositions self-contained. A single downloaded .jsx file
  // must not rely on this app's private aliases or individual form atoms.
  return `import { useState } from "react";

const fields = ${fields};
const defaultTheme = ${theme};

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
  if (field.component === "checkbox") {
    return <label className="flex cursor-pointer items-center gap-3 text-sm" style={{ color: theme.labelColor }}><input {...inputProps} type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />{field.label}</label>;
  }
  if (field.component === "textarea") {
    return <label className="block space-y-1.5 text-sm font-medium" style={{ color: theme.labelColor }}>{field.label}<textarea {...inputProps} value={value} onChange={onChange} rows={inputProps.rows || 4} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="block w-full resize-y border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></label>;
  }
  if (field.component === "password-input") {
    return <label className="block space-y-1.5 text-sm font-medium" style={{ color: theme.labelColor }}>{field.label}<PasswordField inputProps={inputProps} theme={theme} value={value} onChange={onChange} /></label>;
  }
  return <label className="block space-y-1.5 text-sm font-medium" style={{ color: theme.labelColor }}>{field.label}<input {...inputProps} value={value} onChange={onChange} style={{ backgroundColor: theme.inputBackground, color: theme.inputText, borderRadius: theme.borderRadius }} className="block w-full border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" /></label>;
}

export default function ${componentName}({ onSubmit, theme: themeOverrides = {} }) {
  const [formData, setFormData] = useState({});
  const theme = { ...defaultTheme, ...themeOverrides };
  const updateField = (id, value) => setFormData((current) => ({ ...current, [id]: value }));
  const handleSubmit = (event) => { event.preventDefault(); onSubmit?.(formData); };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: theme.background, borderRadius: theme.borderRadius }} className="mx-auto w-full max-w-md space-y-5 border border-slate-200 p-6 shadow-sm">
      <div><h2 style={{ color: theme.inputText }} className="text-lg font-bold">${composition.name}</h2><p className="mt-1 text-sm text-slate-500">${composition.description}</p></div>
      <div className="space-y-4">{fields.map((field) => <FormField key={field.id} field={field} theme={theme} value={formData[field.id] ?? ""} onChange={(value) => updateField(field.id, value?.target ? value.target.value : value)} />)}</div>
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

  const componentData = {
    name: activeComp.name,
    slug: activeComp.slug,
    category: "Form Compositions",
    subCategory: activeComp.category,
    description: activeComp.description,
    sourceCode,
    files: [{ path: `components/forms/${activeComp.slug}.jsx` }],
    framework: "react",
    styling: exportConfig.styling,
    version: activeComp.version || "1.0.0",
    dependencies: exportConfig.dependencies,
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
