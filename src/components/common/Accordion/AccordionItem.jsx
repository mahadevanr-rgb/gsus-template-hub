import React, { createContext, useContext, useId } from "react";
import { useAccordion } from "./Accordion";

const AccordionItemContext = createContext(null);

export function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem");
  }
  return context;
}

export function AccordionItem({
  value,
  disabled: itemDisabled = false,
  className = "",
  children,
  ...props
}) {
  const { isItemOpen, toggleItem, disabled: rootDisabled } = useAccordion();
  const generatedId = useId();

  const isDisabled = rootDisabled || itemDisabled;
  const isOpen = isItemOpen(value);

  const triggerId = `accordion-trigger-${value || generatedId}`;
  const contentId = `accordion-content-${value || generatedId}`;

  const handleToggle = () => {
    if (!isDisabled) {
      toggleItem(value);
    }
  };

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        disabled: isDisabled,
        triggerId,
        contentId,
        handleToggle,
      }}
    >
      <div
        data-state={isOpen ? "open" : "closed"}
        data-disabled={isDisabled ? "" : undefined}
        className={`w-full transition-colors ${className}`}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
