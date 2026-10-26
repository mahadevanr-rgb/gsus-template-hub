import test from "node:test";
import assert from "node:assert/strict";
import { createHomeStats } from "./homeStats.js";

const sample = {
  categories: Array.from({ length: 8 }, (_, index) => ({ id: `category-${index}` })),
  buttons: Array.from({ length: 10 }, (_, index) => ({ slug: `button-${index}` })),
  cards: Array.from({ length: 26 }, (_, index) => ({ slug: `card-${index}` })),
  forms: Array.from({ length: 16 }, (_, index) => index === 10 ? { id: "datePicker", slug: "date-picker" } : { id: `form-${index}` }),
  dateTime: Array.from({ length: 8 }, (_, index) => ({ slug: index === 0 ? "date-picker" : `date-time-${index}` })),
  formCompositions: Array.from({ length: 4 }, (_, index) => ({ id: `composition-${index}` })),
  layouts: Array.from({ length: 4 }, (_, index) => ({ slug: `layout-${index}` })),
  notifications: Array.from({ length: 10 }, (_, index) => ({ id: `notification-${index}` })),
  dataDisplay: Array.from({ length: 10 }, (_, index) => ({ id: `data-${index}` })),
};

test("computes category counts and de-duplicates shared component ids", () => {
  assert.deepEqual(createHomeStats(sample), {
    categoryCounts: {
      buttons: 10,
      cards: 26,
      forms: 16,
      "date-time": 8,
      "form-compositions": 4,
      layouts: 4,
      notifications: 10,
      "data-display": 10,
    },
    categoryCount: 8,
    totalComponents: 87,
  });
});

test("reflects a newly added registry entry", () => {
  const stats = createHomeStats({ ...sample, buttons: [...sample.buttons, { slug: "new-button" }] });
  assert.equal(stats.categoryCounts.buttons, 11);
  assert.equal(stats.totalComponents, 88);
});
