import profileCards from "./profile/index";
import statsCards from "./stats/index";

export const cardComponents = [
  ...profileCards,
  ...statsCards,
];

/** Get all card components */
export function getCardComponents() {
  return cardComponents;
}

/** Get card components by subcategory ('profile' or 'stats') */
export function getCardsBySubCategory(subCategory) {
  return cardComponents.filter((c) => c.subCategory === subCategory);
}

/** Search cards by query matching name, description, or tags */
export function searchCards(query) {
  const q = query.toLowerCase();
  return cardComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default cardComponents;
