import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormComposition } from "@/services/db";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Textarea } from "@/pages/Forms/components/Textarea/Textarea";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import { OTPInput } from "@/pages/Forms/components/OTPInput/OTPInput";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";

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
      <div className="w-full max-w-sm p-6 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
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
            className="w-full"
            onClick={() => alert(`Form submitted successfully for ${activeComp.name}!`)}
          >
            {activeComp.action?.label || "Submit"}
          </PrimaryButton>
        </div>
      </div>
    );
  };

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
    />
  );
}