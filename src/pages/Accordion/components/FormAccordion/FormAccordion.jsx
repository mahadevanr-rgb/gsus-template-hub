import React, { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
} from "@/components/common/Accordion";
import DynamicFieldRenderer from "./DynamicFieldRenderer";

function SectionTriggerChevron() {
  const { isOpen } = useAccordionItem();
  return (
    <ChevronDown
      className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
        isOpen ? "rotate-180 text-teal-600 dark:text-teal-400" : ""
      }`}
    />
  );
}

function RenderSectionIcon({ icon, className = "w-4 h-4" }) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  const IconComponent = icon;
  return <IconComponent className={className} />;
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

  // Internal form state to ensure values persist across expand/collapse cycles
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
  const [submittedSection, setSubmittedSection] = useState(null);

  const activeValues = isControlledValues ? controlledValues : internalValues;

  const handleFieldChange = (fieldName, val) => {
    const nextValues = {
      ...activeValues,
      [fieldName]: val,
    };

    if (!isControlledValues) {
      setInternalValues(nextValues);
    }

    if (onChange) {
      onChange(fieldName, val, nextValues);
    }

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleSectionSubmit = (e, section) => {
    e.preventDefault();

    // Validate required fields in this section
    const newErrors = {};
    let hasError = false;

    section.fields?.forEach((field) => {
      if (field.required) {
        const val = activeValues[field.name];
        if (val === undefined || val === "" || val === null) {
          newErrors[field.name] = `${field.label || field.name} is required`;
          hasError = true;
        }
      }
    });

    if (hasError) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setSubmittedSection(section.id);
    setTimeout(() => {
      setSubmittedSection((prev) => (prev === section.id ? null : prev));
    }, 4000);

    if (onSubmit) {
      onSubmit(activeValues, section.id);
    }
  };

  return (
    <div className={`w-full max-w-2xl space-y-3.5 ${className}`}>
      <Accordion
        type={type}
        collapsible={collapsible}
        defaultValue={defaultValue}
        value={openSection}
        onValueChange={onSectionChange}
        className="space-y-3.5"
      >
        {sections.map((section) => {
          const isRequired = Boolean(section.required);
          const isSubmitted = submittedSection === section.id;

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              disabled={section.disabled}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 data-[state=open]:shadow-md"
            >
              {/* Section Header Trigger */}
              <AccordionTrigger
                icon={<SectionTriggerChevron />}
                className="px-5 sm:px-6 py-4 hover:no-underline focus-visible:ring-teal-500"
              >
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Left Section Icon */}
                    {section.icon && (
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                        <RenderSectionIcon icon={section.icon} className="w-4 h-4" />
                      </div>
                    )}

                    {/* Section Title */}
                    <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                      {section.title}
                    </span>
                  </div>

                  {/* Required Badge on Right */}
                  {isRequired && (
                    <span className="ml-auto mr-2 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-rose-600 text-white select-none">
                      REQUIRED
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              {/* Expanded Section Form Content */}
              <AccordionContent className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80">
                <form
                  onSubmit={(e) => handleSectionSubmit(e, section)}
                  className="space-y-5 pt-4"
                >
                  {/* Optional Section Subtitle / Header */}
                  {section.subtitle && (
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                      {section.subtitle}
                    </h4>
                  )}

                  {/* Dynamic Fields List */}
                  {section.fields && section.fields.length > 0 ? (
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
                  ) : (
                    <p className="text-xs text-slate-400 italic py-2">
                      No additional inputs required for this section.
                    </p>
                  )}

                  {/* Submission Feedback Message */}
                  {isSubmitted && (
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center gap-2 text-xs font-semibold text-teal-700 dark:text-teal-300 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span>{section.title} details saved successfully!</span>
                    </div>
                  )}

                  {/* Section Actions (Continue / Submit button) */}
                  <div className="pt-2 flex items-center gap-3">
                    {section.actions && section.actions.length > 0 ? (
                      section.actions.map((act, idx) => (
                        <button
                          key={idx}
                          type={act.type || "submit"}
                          onClick={act.onClick}
                          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                            act.variant === "secondary"
                              ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                              : "bg-[#007b8f] hover:bg-[#00697a] text-white shadow-teal-900/10 active:scale-[0.98]"
                          }`}
                        >
                          {act.label || "Continue"}
                        </button>
                      ))
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#007b8f] hover:bg-[#00697a] transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
