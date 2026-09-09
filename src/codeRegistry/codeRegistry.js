import animatedButton from "./buttons/animated-button";
import floatingButton from "./buttons/floating-button";
import ghostButton from "./buttons/ghost-button";
import gradientButton from "./buttons/gradient-button";
import iconButton from "./buttons/icon-button";
import outlineButton from "./buttons/outline-button";
import primaryButton from "./buttons/primary-button";
import pulseButton from "./buttons/pulse-button";
import secondaryButton from "./buttons/secondary-button";
import shadowButton from "./buttons/shadow-button";

import { cardComponents } from "./cardsRegistry";
import { formComponents } from "./formsRegistry";
import { formCompositions } from "./formCompositionsRegistry";

export const allComponents = [
  primaryButton,
  secondaryButton,
  outlineButton,
  ghostButton,
  gradientButton,
  shadowButton,
  animatedButton,
  pulseButton,
  iconButton,
  floatingButton,
  ...(cardComponents || []),
  ...(formComponents || []),
];

export function getAllComponents() {
  return allComponents;
}

export function getComponent(slug) {
  if (!slug) return null;
  return allComponents.find((c) => c.slug === slug || c.id === slug) || {
    id: slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: slug,
    category: 'components',
    description: 'Component details and live preview.',
    framework: 'react',
    language: 'javascript',
    styling: 'tailwind',
    version: '1.0.0',
    tags: [slug],
    files: [{ name: `${slug}.jsx`, path: `pages/` }]
  };
}

export function getCategories() {
  const categories = {};
  allComponents.forEach((c) => {
    if (!categories[c.category]) {
      categories[c.category] = { name: c.category, count: 0, components: [] };
    }
    categories[c.category].count++;
    categories[c.category].components.push(c);
  });
  return Object.values(categories);
}

export function getComponentsByCategory(category) {
  return allComponents.filter((c) => c.category === category);
}

export function searchComponents(query) {
  const q = (query || '').toLowerCase();
  return allComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default {
  getAllComponents,
  getComponent,
  getCategories,
  getComponentsByCategory,
  searchComponents,
};
