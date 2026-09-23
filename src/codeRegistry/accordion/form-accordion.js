import FormAccordion from "@/pages/Accordion/components/FormAccordion/FormAccordion";
import { formAccordionSections } from "@/pages/Accordion/accordion.config";

const sourceCode = `import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
} from "@/components/ui/Accordion";
import TextInput from "@/components/ui/TextInput";

function SectionTriggerChevron() {
  const { isOpen } = useAccordionItem();
  return (
    <ChevronDown
      className={\`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 \${
        isOpen ? "rotate-180 text-teal-600 dark:text-teal-400" : ""
      }\`}
    />
  );
}

function DynamicFieldRenderer({ field, value, onChange, error }) {
  const { id, name, label, helperText, type = "text", placeholder = "", required = false, disabled = false, min, max, step, infoTooltip } = field;
  const fieldId = id || name;

  const handleChange = (e) => {
    const rawVal = e.target.value;
    const finalVal = type === "number" ? (rawVal === "" ? "" : Number(rawVal)) : rawVal;
    onChange(name, finalVal);
  };

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <div className="flex items-start justify-between gap-2">
          <label htmlFor={fieldId} className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug inline-flex items-center gap-1.5 flex-wrap">
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
              <div className="pointer-events-none absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-30 w-56 p-2.5 rounded-lg bg-slate-900 text-white text-[11px] leading-tight shadow-xl border border-slate-700 text-center">
                {infoTooltip || helperText}
                <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          )}
        </div>
      )}
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
          className={\`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:bg-slate-50 \${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }\`}
        />
      </div>
      {error && <p className="text-xs text-rose-500 font-medium pt-0.5">{error}</p>}
    </div>
  );
}

export default function FormAccordion({
  sections = [],
  values: controlledValues,
  initialValues = {},
  onChange,
  onSubmit,
  value: openSection,
  defaultValue = "income",
  onSectionChange,
  type = "single",
  collapsible = true,
  className = "",
}) {
  const isControlledValues = controlledValues !== undefined;
  const [internalValues, setInternalValues] = useState(() => {
    const init = { ...initialValues };
    sections.forEach((sec) => {
      sec.fields?.forEach((f) => {
        if (init[f.name] === undefined && f.defaultValue !== undefined) {
          init[f.name] = f.defaultValue;
        }
      });
    });
    return init;
  });

  const [errors, setErrors] = useState({});
  const activeValues = isControlledValues ? controlledValues : internalValues;

  const handleFieldChange = (fieldName, val) => {
    const nextValues = { ...activeValues, [fieldName]: val };
    if (!isControlledValues) setInternalValues(nextValues);
    if (onChange) onChange(fieldName, val, nextValues);
    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: null }));
  };

  const handleSectionSubmit = (e, section) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;
    section.fields?.forEach((field) => {
      if (field.required) {
        const val = activeValues[field.name];
        if (val === undefined || val === "" || val === null) {
          newErrors[field.name] = \`\${field.label || field.name} is required\`;
          hasError = true;
        }
      }
    });
    if (hasError) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }
    if (onSubmit) onSubmit(activeValues, section.id);
  };

  return (
    <div className={\`w-full max-w-2xl space-y-3.5 \${className}\`}>
      <Accordion type={type} collapsible={collapsible} defaultValue={defaultValue} value={openSection} onValueChange={onSectionChange} className="space-y-3.5">
        {sections.map((section) => {
          const isRequired = Boolean(section.required);
          return (
            <AccordionItem key={section.id} value={section.id} disabled={section.disabled} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200">
              <AccordionTrigger icon={<SectionTriggerChevron />} className="px-5 sm:px-6 py-4 hover:no-underline focus-visible:ring-teal-500">
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {section.icon && (
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                        {section.icon}
                      </div>
                    )}
                    <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                      {section.title}
                    </span>
                  </div>
                  {isRequired && (
                    <span className="ml-auto mr-2 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-rose-600 text-white select-none">
                      REQUIRED
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80">
                <form onSubmit={(e) => handleSectionSubmit(e, section)} className="space-y-5 pt-4">
                  {section.subtitle && (
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                      {section.subtitle}
                    </h4>
                  )}
                  {section.fields?.length > 0 && (
                    <div className="space-y-4">
                      {section.fields.map((field) => (
                        <DynamicFieldRenderer
                          key={field.id || field.name}
                          field={field}
                          value={activeValues[field.name]}
                          onChange={handleFieldChange}
                          error={errors[field.name]}
                        />
                      ))}
                    </div>
                  )}
                  <div className="pt-2 flex items-center gap-3">
                    <button type="submit" className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#007b8f] hover:bg-[#00697a] transition-all shadow-sm active:scale-[0.98] cursor-pointer">
                      Continue
                    </button>
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}`;

export default {
  id: "form-accordion",
  name: "Dynamic Form Accordion",
  slug: "form-accordion",
  category: "accordion",
  subCategory: "Form",
  tag: "Form",
  description:
    "Enterprise multi-section form disclosure with data-driven dynamic field rendering, tooltips, required badges, and state persistence.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "form", "dynamic-fields", "tax-form", "multi-step", "inputs"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "FormAccordion.jsx",
      path: "components/ui/FormAccordion.jsx",
    },
    {
      name: "DynamicFieldRenderer.jsx",
      path: "components/ui/DynamicFieldRenderer.jsx",
    },
  ],
  uses: [
    "Multi-step application forms",
    "Tax preparation workflows",
    "Onboarding questionnaires",
    "Account settings panels",
  ],
  previewProps: { sections: formAccordionSections, defaultValue: "income" },
  component: FormAccordion,
  sourceCode,
};
