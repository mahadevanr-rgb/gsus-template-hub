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

function generateCompositionCode(composition) {
  if (!composition) return "";
  const imports = [
    'import React, { useState } from "react";',
    'import { TextInput } from "@/components/ui/forms/TextInput";',
    'import { PasswordInput } from "@/components/ui/forms/PasswordInput";',
    'import { Checkbox } from "@/components/ui/forms/Checkbox";',
    'import PrimaryButton from "@/components/ui/buttons/PrimaryButton";',
  ];

  return `${imports.join("\n")}\n\nexport default function ${composition.name.replace(/[^a-zA-Z0-9]/g, "")}() {\n  const [formData, setFormData] = useState({});\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log("Submitted:", formData);\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">\n      <h3 className="text-lg font-bold text-white mb-2">${composition.name}</h3>\n      {/* Form Fields */}\n      <PrimaryButton className="w-full mt-2">${composition.action?.label || "Submit"}</PrimaryButton>\n    </form>\n  );\n}`;
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
  const sourceCode = generateCompositionCode(activeComp);

  const componentData = {
    name: activeComp.name,
    slug: activeComp.slug,
    category: "Form Compositions",
    subCategory: activeComp.category,
    description: activeComp.description,
    sourceCode,
    files: [{ path: `components/forms/${activeComp.slug}.jsx` }],
    framework: "react",
    styling: "Tailwind CSS",
    version: activeComp.version || "1.0.0",
    dependencies: activeComp.dependencies || ["None"],
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
