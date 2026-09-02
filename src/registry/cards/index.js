import profileCards from "./profile/index";
import statsCards from "./stats/index";
import pricingCards from "./pricing/index";
import socialCards from "./social/index";
import notificationCards from "./notifications/index";
import eventCards from "./events/index";
import taskCards from "./tasks/index";
import contentCards from "./content/index";
import financeCards from "./finance/index";

export const cardComponents = [
  ...profileCards,
  ...statsCards,
  ...pricingCards,
  ...socialCards,
  ...notificationCards,
  ...eventCards,
  ...taskCards,
  ...contentCards,
  ...financeCards,
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
