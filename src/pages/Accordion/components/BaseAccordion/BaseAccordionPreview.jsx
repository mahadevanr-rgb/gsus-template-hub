import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/common/Accordion";

export default function BaseAccordionPreview() {
  return (
    <Accordion
      defaultValue="item-1"
      className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm space-y-0"
    >
      <AccordionItem value="item-1" className="py-2">
        <AccordionTrigger className="text-slate-900 dark:text-white text-sm font-semibold py-2 hover:text-indigo-600 dark:hover:text-indigo-400">
          Is this component fully accessible?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Yes, it implements WAI-ARIA Accordion patterns with aria-expanded, aria-controls, and keyboard focus navigation.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="py-2">
        <AccordionTrigger className="text-slate-900 dark:text-white text-sm font-semibold py-2 hover:text-indigo-600 dark:hover:text-indigo-400">
          Does it support single and multiple mode?
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Yes, configure type="single" (default) or type="multiple" dynamically to support different layout patterns.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
