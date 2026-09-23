import numberedAccordion from "./accordion/numbered-accordion";
import filterAccordion from "./accordion/filter-accordion";
import simpleAccordion from "./accordion/simple-accordion";
import iconAccordion from "./accordion/icon-accordion";
import formAccordion from "./accordion/form-accordion";
import accordionPrimitive from "./accordion/accordion-primitive";

export const accordionComponents = [
  numberedAccordion,
  filterAccordion,
  simpleAccordion,
  iconAccordion,
  formAccordion,
  accordionPrimitive,
];

export function getAccordionComponents() {
  return accordionComponents;
}

export function getAccordionBySubCategory(subCategory) {
  return accordionComponents.filter((c) => c.subCategory === subCategory);
}

export function searchAccordions(query) {
  const q = (query || "").toLowerCase();
  return accordionComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default accordionComponents;
