import BaseAccordionPreview from "@/pages/Accordion/components/BaseAccordion/BaseAccordionPreview";

const sourceCode = `import React, { createContext, useContext, useState, useId } from "react";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export function useAccordion() {
  return useContext(AccordionContext);
}

export function useAccordionItem() {
  return useContext(AccordionItemContext);
}

export function Accordion({
  type = "single",
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  className = "",
  children,
}) {
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    return type === "multiple" ? [] : null;
  });

  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const isItemOpen = (itemValue) => {
    if (type === "multiple") {
      return Array.isArray(activeValue) && activeValue.includes(itemValue);
    }
    return activeValue === itemValue;
  };

  const toggleItem = (itemValue) => {
    if (disabled) return;
    let nextValue;
    if (type === "multiple") {
      const list = Array.isArray(activeValue) ? activeValue : [];
      nextValue = list.includes(itemValue)
        ? list.filter((v) => v !== itemValue)
        : [...list, itemValue];
    } else {
      nextValue = activeValue === itemValue ? (collapsible ? null : activeValue) : itemValue;
    }

    if (!isControlled) setUncontrolledValue(nextValue);
    if (onValueChange) onValueChange(nextValue);
  };

  return (
    <AccordionContext.Provider value={{ type, collapsible, isItemOpen, toggleItem, disabled }}>
      <div className={\`w-full space-y-2 \${className}\`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, disabled = false, className = "", children }) {
  const { isItemOpen, toggleItem, disabled: rootDisabled } = useAccordion();
  const generatedId = useId();
  const isDisabled = rootDisabled || disabled;
  const isOpen = isItemOpen(value);

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        disabled: isDisabled,
        triggerId: \`accordion-trigger-\${value || generatedId}\`,
        contentId: \`accordion-content-\${value || generatedId}\`,
        handleToggle: () => !isDisabled && toggleItem(value),
      }}
    >
      <div data-state={isOpen ? "open" : "closed"} className={className}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className = "", icon, hideIcon = false }) {
  const { isOpen, disabled, triggerId, contentId, handleToggle } = useAccordionItem();

  return (
    <button
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      disabled={disabled}
      onClick={handleToggle}
      className={\`flex w-full items-center justify-between py-4 text-left font-medium transition-all cursor-pointer \${className}\`}
    >
      <div className="flex-1 min-w-0 pr-4">{children}</div>
      {!hideIcon && (icon || <ChevronDown className={\`w-4 h-4 transition-transform duration-200 \${isOpen ? "rotate-180" : ""}\`} />)}
    </button>
  );
}

export function AccordionContent({ children, className = "" }) {
  const { isOpen, triggerId, contentId } = useAccordionItem();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={\`grid transition-all duration-300 ease-in-out overflow-hidden \${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} \${className}\`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}`;

export default {
  id: "accordion-primitive",
  name: "Base Accordion Primitive",
  slug: "accordion-primitive",
  category: "accordion",
  subCategory: "Primitive",
  tag: "Primitive",
  description:
    "Accessible compound Accordion primitives (Accordion, Item, Trigger, Content) handling state and keyboard navigation.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "primitive", "wai-aria", "compound-component", "disclosure"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "Accordion.jsx",
      path: "components/ui/Accordion.jsx",
    },
  ],
  uses: [
    "Building custom disclosure interfaces",
    "Collapsible sidebar widgets",
    "Modular FAQ blocks",
    "Multi-step accordion forms",
  ],
  component: BaseAccordionPreview,
  sourceCode,
};
