import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/common/Accordion";

export default function FilterAccordion({
  sections = [],
  selectedValues: controlledSelectedValues,
  onSelectionChange,
  defaultOpenSections = ["industry"],
  type = "multiple",
  className = "",
}) {
  const isControlled = controlledSelectedValues !== undefined;

  // Internal state for uncontrolled selections: { [sectionId]: string[] }
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
      className={`w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-900/5 dark:shadow-black/20 overflow-hidden ${className}`}
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

                  {/* Calculated dynamic count badge */}
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
                            className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-blue-600 border border-blue-600 text-white shadow-sm"
                                : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-500"
                            }`}
                          >
                            {isChecked && (
                              <Check className="w-3 h-3 stroke-[3]" />
                            )}
                          </div>
                        </div>

                        <span
                          className={`text-xs font-medium transition-colors ${
                            isChecked
                              ? "text-slate-900 dark:text-white font-semibold"
                              : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                          }`}
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                  {(!section.options || section.options.length === 0) && (
                    <p className="text-xs text-slate-400 px-2 py-1 italic">
                      No options available
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
