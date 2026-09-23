import FilterAccordion from "@/pages/Accordion/components/FilterAccordion/FilterAccordion";
import { filterSections } from "@/pages/Accordion/accordion.config";

const sourceCode = `import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export default function FilterAccordion({
  sections = [],
  selectedValues: controlledSelectedValues,
  onSelectionChange,
  defaultOpenSections = ["industry"],
  type = "multiple",
  className = "",
}) {
  const isControlled = controlledSelectedValues !== undefined;

  const [internalSelectedValues, setInternalSelectedValues] = useState(() => {
    const initial = {};
    sections.forEach((sec) => {
      initial[sec.id] = sec.defaultSelected || [];
    });
    return initial;
  });

  const activeSelectedValues = isControlled
    ? controlledSelectedValues
    : internalSelectedValues;

  const handleOptionToggle = (sectionId, optionId) => {
    const currentSectionSelected = activeSelectedValues[sectionId] || [];
    const isSelected = currentSectionSelected.includes(optionId);

    const nextSectionSelected = isSelected
      ? currentSectionSelected.filter((id) => id !== optionId)
      : [...currentSectionSelected, optionId];

    const nextSelectedValues = {
      ...activeSelectedValues,
      [sectionId]: nextSectionSelected,
    };

    if (!isControlled) {
      setInternalSelectedValues(nextSelectedValues);
    }
    if (onSelectionChange) {
      onSelectionChange(nextSelectedValues, sectionId, optionId);
    }
  };

  return (
    <div
      className={\`w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-900/5 dark:shadow-black/20 overflow-hidden \${className}\`}
    >
      <Accordion
        type={type}
        defaultValue={defaultOpenSections}
        className="divide-y divide-slate-100 dark:divide-slate-800 space-y-0"
      >
        {sections.map((section) => {
          const selectedList = activeSelectedValues[section.id] || [];
          const selectedCount = selectedList.length;

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              disabled={section.disabled}
              className="px-4 transition-colors"
            >
              <AccordionTrigger className="py-3.5 hover:no-underline group">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {section.title}
                  </span>
                  {selectedCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 transition-all">
                      {selectedCount}
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-0 pb-3">
                <div className="space-y-1">
                  {section.options?.map((option) => {
                    const isChecked = selectedList.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group"
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              handleOptionToggle(section.id, option.id)
                            }
                            disabled={option.disabled}
                            className="sr-only"
                          />
                          <div
                            className={\`w-4 h-4 rounded flex items-center justify-center transition-all \${
                              isChecked
                                ? "bg-blue-600 border border-blue-600 text-white shadow-sm"
                                : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-500"
                            }\`}
                          >
                            {isChecked && (
                              <Check className="w-3 h-3 stroke-[3]" />
                            )}
                          </div>
                        </div>
                        <span
                          className={\`text-xs font-medium transition-colors \${
                            isChecked
                              ? "text-slate-900 dark:text-white font-semibold"
                              : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                          }\`}
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}`;

export default {
  id: "filter-accordion",
  name: "Filter Selection Accordion",
  slug: "filter-accordion",
  category: "accordion",
  subCategory: "Filter",
  tag: "Filter",
  description:
    "Multi-section filter accordion with dynamic selection counters, styled checkboxes, and multi-open panel states.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "filter", "checkbox", "sidebar", "search", "facets"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "FilterAccordion.jsx",
      path: "components/ui/FilterAccordion.jsx",
    },
  ],
  uses: [
    "E-commerce product sidebars",
    "Faceted search panels",
    "Dashboard query filters",
    "Category selectors",
  ],
  previewProps: {
    sections: filterSections,
    defaultOpenSections: ["industry"],
  },
  component: FilterAccordion,
  sourceCode,
};
