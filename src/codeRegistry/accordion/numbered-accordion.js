import NumberedAccordion from "@/pages/Accordion/components/NumberedAccordion/NumberedAccordion";
import { numberedFaqItems } from "@/pages/Accordion/accordion.config";

const sourceCode = `import React from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
} from "@/components/ui/Accordion";

function NumberedTriggerIcon() {
  const { isOpen } = useAccordionItem();

  return (
    <div
      className={\`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm \${
        isOpen
          ? "bg-slate-900 dark:bg-slate-800 text-white"
          : "bg-slate-800/80 dark:bg-slate-800 text-slate-300 group-hover:bg-slate-700"
      }\`}
    >
      {isOpen ? (
        <Minus className="w-4 h-4 stroke-[2.5]" />
      ) : (
        <Plus className="w-4 h-4 stroke-[2.5]" />
      )}
    </div>
  );
}

export default function NumberedAccordion({
  items = [],
  defaultValue = "01",
  value,
  onValueChange,
  type = "single",
  collapsible = true,
  className = "",
}) {
  return (
    <div
      className={\`w-full rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-xl shadow-slate-900/5 dark:shadow-black/20 overflow-hidden \${className}\`}
    >
      <Accordion
        type={type}
        collapsible={collapsible}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className="divide-y divide-slate-200/80 dark:divide-slate-800/80 space-y-0"
      >
        {items.map((item, index) => {
          const formattedNumber =
            item.number ||
            item.id ||
            String(index + 1).padStart(2, "0");
          const itemId = item.id || formattedNumber;

          return (
            <AccordionItem
              key={itemId}
              value={itemId}
              disabled={item.disabled}
              className="group px-6 sm:px-8 transition-colors duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 data-[state=open]:bg-slate-50/80 dark:data-[state=open]:bg-slate-800/40"
            >
              <AccordionTrigger
                icon={<NumberedTriggerIcon />}
                className="py-6 focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
              >
                <div className="flex items-center gap-6 sm:gap-8">
                  <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 group-data-[state=open]:text-indigo-600 dark:group-data-[state=open]:text-indigo-400 transition-colors shrink-0 select-none tracking-tight">
                    {formattedNumber}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                    {item.title || item.question}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-12 sm:pl-16 pr-2">
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.content || item.answer}
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
  id: "numbered-accordion",
  name: "Numbered FAQ Accordion",
  slug: "numbered-accordion",
  category: "accordion",
  subCategory: "FAQ",
  tag: "FAQ",
  description:
    "Prominent numbered accordion with large sequential index headers, circular +/- toggle triggers, and accessible single-item focus.",
  framework: "react",
  language: "javascript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  dependencies: ["lucide-react"],
  tags: ["accordion", "faq", "numbered", "disclosure", "collapse"],
  author: "TemplateHub UI Team",
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  files: [
    {
      name: "NumberedAccordion.jsx",
      path: "components/ui/NumberedAccordion.jsx",
    },
  ],
  uses: [
    "Product FAQ sections",
    "Onboarding steps & tutorials",
    "Feature breakdowns",
    "Process workflows",
  ],
  previewProps: { items: numberedFaqItems, defaultValue: "01" },
  component: NumberedAccordion,
  sourceCode,
};
