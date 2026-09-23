import React from "react";
import { useAccordionItem } from "./AccordionItem";

export function AccordionContent({
  children,
  className = "",
  innerClassName = "",
  ...props
}) {
  const { isOpen, triggerId, contentId } = useAccordionItem();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none overflow-hidden ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      } ${className}`}
      {...props}
    >
      <div className={`overflow-hidden ${innerClassName}`}>
        <div className="pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionContent;
