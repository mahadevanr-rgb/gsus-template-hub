import assert from "node:assert/strict";
import test from "node:test";
import {
  getPickerCustomizationControls,
  pickerPropMetadata,
  validateDateTimePickerProps,
  validateCompositionValidationRules,
} from "./pickerCustomizationControls.js";

const pickerSlugs = [
  "date-picker",
  "date-range-picker",
  "month-picker",
  "year-picker",
  "week-picker",
  "time-picker",
  "datetime-picker",
  "datetime-range-picker",
];

test("every Date and Time picker has shared appearance customization controls", () => {
  for (const slug of pickerSlugs) {
    const controls = getPickerCustomizationControls(slug);
    assert.deepEqual(
      controls.slice(0, 4).map(({ name }) => name),
      ["theme", "size", "width", "variant"],
      slug,
    );
  }
});

test("picker-specific controls use prop names supported by each component", () => {
  const controlsBySlug = Object.fromEntries(
    pickerSlugs.map((slug) => [
      slug,
      getPickerCustomizationControls(slug).map(({ name }) => name),
    ]),
  );

  assert.ok(controlsBySlug["date-picker"].includes("accentColor"));
  assert.ok(controlsBySlug["date-range-picker"].includes("locale"));
  assert.ok(controlsBySlug["date-range-picker"].includes("disableWeekends"));
  assert.ok(controlsBySlug["time-picker"].includes("format"));
  assert.ok(!controlsBySlug["time-picker"].includes("timeFormat"));
  assert.ok(controlsBySlug["datetime-picker"].includes("timeFormat"));
  assert.ok(controlsBySlug["datetime-range-picker"].includes("clearable"));
});

test("shared metadata includes Date Range Picker locale without changing standalone controls", () => {
  assert.equal(pickerPropMetadata["date-range-picker"].locale.type, "enum");
  assert.deepEqual(validateDateTimePickerProps("date-range-picker", { locale: "en-GB" }), []);
  assert.ok(validateDateTimePickerProps("date-range-picker", { placeholder: "Pick dates" }).some((error) => error.includes("placeholder")));
});

test("picker configuration rejects unsupported props and invalid values", () => {
  assert.ok(validateDateTimePickerProps("date-picker", { disableWeekends: "yes" }).some((error) => error.includes("true or false")));
  assert.ok(validateDateTimePickerProps("date-picker", { minDate: "2026-02-30" }).some((error) => error.includes("valid date")));
  assert.ok(validateDateTimePickerProps("time-picker", { timeFormat: "12h" }).some((error) => error.includes("Unsupported option")));
  assert.deepEqual(validateCompositionValidationRules({ required: true }), []);
  assert.ok(validateCompositionValidationRules({ unknownRule: true }).length > 0);
});
