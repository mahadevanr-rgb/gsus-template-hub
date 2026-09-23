import IconAccordion from "@/pages/Accordion/components/IconAccordion/IconAccordion";
import { iconAccordionItems } from "@/pages/Accordion/accordion.config";

const sourceCode = `import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
} from "@/components/ui/Accordion";

function CircularChevronIcon() {
  const { isOpen } = useAccordionItem();

  return (
    <div
      className={\`w-6 h-6 rounded-full border border-white/50 dark:border-white/40 flex items-center justify-center transition-transform duration-200 \${
        isOpen ? "rotate-180 bg-white/15" : "bg-transparent"
      }\`}
    >
      <ChevronDown className="w-3.5 h-3.5 text-white stroke-[2.5]" />
    </div>
  );
}

export default function IconAccordion({
  items = [],
  defaultValue,
  value,
  onValueChange,
  type = "single",
  collapsible = true,
  variant = "warm",
  className = "",
}) {
  const variantStyles = {
    warm: "bg-[#8f5229] dark:bg-[#7b431e] border-[#7a421d] text-white shadow-xl shadow-[#8f5229]/15",
    default: "bg-slate-900 border-slate-800 text-white shadow-xl shadow-black/20",
    neutral: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white shadow-lg",
  };

  const dividerStyles = {
    warm: "divide-white/15",
    default: "divide-slate-800",
    neutral: "divide-slate-200 dark:divide-slate-800",
  };

  return (
    <div
      className={\`w-full max-w-md rounded-2xl border overflow-hidden transition-all duration-300 \${
        variantStyles[variant] || variantStyles.warm
      } \${className}\`}
    >
      <Accordion
        type={type}
        collapsible={collapsible}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={\`divide-y space-y-0 \${
          dividerStyles[variant] || dividerStyles.warm
        }\`}
      >
        {items.map((item, index) => {
          const itemId = item.id || \`icon-nav-\${index + 1}\`;

          return (
            <AccordionItem
              key={itemId}
              value={itemId}
              disabled={item.disabled}
              className="px-5 sm:px-6 transition-colors duration-150 hover:bg-black/10 dark:hover:bg-white/5 data-[state=open]:bg-black/15 dark:data-[state=open]:bg-white/10"
            >
              <AccordionTrigger
                icon={<CircularChevronIcon />}
                className="py-4 hover:no-underline focus-visible:ring-white/40"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 w-full">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0 text-white select-none">
                    {item.icon}
                  </div>
                  <span className="flex-1 min-w-0 text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                    {item.label || item.title}
                  </span>
                </div>
              </AccordionTrigger>

              {item.content && (
                <AccordionContent className="pt-0 pb-4">
                  <div className="pl-9 pr-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    {item.content}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}`;

export default {
  id: "icon-accordion",
  name: "Icon Navigation Accordion",
  slug: "icon-accordion",
  category: "accordion",
  subCategory: "Navigation",
  tag: "Navigation",
  description:
    "Compact vertical navigation list with left-aligned icons, clean typography, right circular chevron triggers, and theme variant support.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "navigation", "icons", "menu", "sidebar", "disclosure"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "IconAccordion.jsx",
      path: "components/ui/IconAccordion.jsx",
    },
  ],
  uses: [
    "Sidebar navigation menus",
    "Health profile & settings directories",
    "Sectional navigation drawers",
    "Step-by-step guides",
  ],
  previewProps: { items: iconAccordionItems, variant: "warm" },
  component: IconAccordion,
  sourceCode,
};
