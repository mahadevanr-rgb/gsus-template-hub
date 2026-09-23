import React, { createContext, useContext, useState, useId } from "react";

const AccordionContext = createContext(null);

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion component");
  }
  return context;
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
  ...props
}) {
  const isControlled = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (type === "multiple") return [];
    return null;
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
      const currentList = Array.isArray(activeValue) ? activeValue : [];
      if (currentList.includes(itemValue)) {
        nextValue = currentList.filter((v) => v !== itemValue);
      } else {
        nextValue = [...currentList, itemValue];
      }
    } else {
      // Single mode
      if (activeValue === itemValue) {
        if (collapsible) {
          nextValue = null;
        } else {
          return; // Cannot collapse if not collapsible
        }
      } else {
        nextValue = itemValue;
      }
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    if (onValueChange) {
      onValueChange(nextValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        collapsible,
        activeValue,
        isItemOpen,
        toggleItem,
        disabled,
      }}
    >
      <div
        className={`w-full divide-y-0 space-y-2 ${className}`}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
