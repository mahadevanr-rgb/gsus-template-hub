import primaryButton from "./buttons/primary-button";
import secondaryButton from "./buttons/secondary-button";
import animatedButton from "./buttons/animated-button";
import ghostButton from "./buttons/ghost-button";
import gradientButton from "./buttons/gradient-button";
import pulseButton from "./buttons/pulse-button";
import shadowButton from "./buttons/shadow-button";
import outlineButton from "./buttons/outline-button";
import floatingButton from "./buttons/floating-button";
import iconButton from "./buttons/icon-button";

import formComponents from "./forms/index";
import notificationComponents from "./notifications/index";
import dataDisplayComponents from "./data-display/index";

/** All registered components — single source of truth */
const registry = [
  primaryButton,
  secondaryButton,
  animatedButton,
  ghostButton,
  gradientButton,
  pulseButton,
  shadowButton,
  outlineButton,
  floatingButton,
  iconButton,
  ...formComponents,
  ...notificationComponents,
  ...dataDisplayComponents,
];

/** Get all components */
export function getAllComponents() {
  return registry;
}

/** Get component by slug */
export function getComponent(slug) {
  return registry.find((c) => c.slug === slug) ?? null;
}

/** Get all components in a category */
export function getComponentsByCategory(category) {
  return registry.filter((c) => c.category === category);
}

/** Get all unique categories with counts */
export function getCategories() {
  const counts = registry.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

/** Search components by name, description, or tags */
export function searchComponents(query) {
  const q = query.toLowerCase();
  return registry.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default registry;
