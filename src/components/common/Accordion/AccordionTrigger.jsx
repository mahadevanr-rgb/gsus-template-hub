import React from "react";
import { ChevronDown } from "lucide-react";
import { useAccordionItem } from "./AccordionItem";

export function AccordionTrigger({
  children,
  className = "",
  icon,
  hideIcon = false,
  onClick,
  onKeyDown,
  ...props
}) {
  const { isOpen, disabled, triggerId, contentId, handleToggle } = useAccordionItem();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    handleToggle();
  };

  const handleKeyDown = (e) => {
    if (onKeyDown) onKeyDown(e);

    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
      const currentTarget = e.currentTarget;
      const accordionRoot = currentTarget.closest("[data-accordion-root]") || currentTarget.closest("div");
      if (!accordionRoot) return;

      const triggers = Array.from(
        accordionRoot.querySelectorAll('button[aria-controls^="accordion-content-"]:not([disabled])')
      );
      const currentIndex = triggers.indexOf(currentTarget);

      if (currentIndex === -1) return;

      let targetIndex = currentIndex;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        targetIndex = (currentIndex + 1) % triggers.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        targetIndex = triggers.length - 1;
      }

      triggers[targetIndex]?.focus();
    }
  };

  return (
    <button
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      aria-disabled={disabled}
      disabled={disabled}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`flex w-full items-center justify-between py-4 text-left font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      {...props}
    >
      <div className="flex-1 min-w-0 pr-4">{children}</div>
      {!hideIcon && (
        <span className="shrink-0 flex items-center justify-center transition-transform duration-200">
          {icon ? (
            icon
          ) : (
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-indigo-500 dark:text-indigo-400" : ""
              }`}
            />
          )}
        </span>
      )}
    </button>
  );
}

export default AccordionTrigger;
