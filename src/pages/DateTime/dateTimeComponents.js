import { formComponents } from "@/codeRegistry/formsRegistry";

export const dateTimePreviewSlugs = [
  "date-picker", "date-range-picker", "month-picker", "year-picker",
  "week-picker", "time-picker", "datetime-picker", "datetime-range-picker",
];

export const dateTimeItems = formComponents
  .filter((component) => dateTimePreviewSlugs.includes(component.slug))
  .map((component) => ({
    ...component,
    group: component.slug.includes("time") || component.slug.includes("datetime") ? "Time" : "Date",
  }));
