import SimpleAccordion from "@/pages/Accordion/components/SimpleAccordion/SimpleAccordion";
import { simpleFaqItems } from "@/pages/Accordion/accordion.config";

const sourceCode = `import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export default function SimpleAccordion({
  items = [],
  defaultValue,
  value,
  onValueChange,
  type = "single",
  collapsible = true,
  className = "",
}) {
  return (
    <div className={\`w-full space-y-3 \${className}\`}>
      <Accordion
        type={type}
        collapsible={collapsible}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className="space-y-3"
      >
        {items.map((item, index) => {
          const itemId = item.id || \`faq-\${index + 1}\`;

          return (
            <AccordionItem
              key={itemId}
              value={itemId}
              disabled={item.disabled}
              className="rounded-xl sm:rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 px-5 sm:px-6 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 data-[state=open]:border-indigo-500/40 dark:data-[state=open]:border-indigo-500/40 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-900 shadow-sm"
            >
              <AccordionTrigger className="py-4 hover:no-underline group">
                <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-relaxed">
                  {item.question || item.title}
                </span>
              </AccordionTrigger>

              <AccordionContent className="pt-0 pb-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.answer || item.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}`;

export default {
  id: "simple-accordion",
  name: "Simple FAQ Accordion",
  slug: "simple-accordion",
  category: "accordion",
  subCategory: "Minimal",
  tag: "Minimal",
  description:
    "Clean minimal FAQ accordion rows with rounded corners, subtle backgrounds, and smooth rotating chevrons.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "faq", "minimal", "easy-accordion", "questions"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "SimpleAccordion.jsx",
      path: "components/ui/SimpleAccordion.jsx",
    },
  ],
  uses: [
    "General help center FAQs",
    "Pricing FAQs",
    "Terms of service sections",
    "Support documentation",
  ],
  previewProps: { items: simpleFaqItems },
  component: SimpleAccordion,
  sourceCode,
};
