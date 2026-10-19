const identity = (item) => item.slug ?? item.id;

export function createHomeStats({ categories, buttons, cards, forms, dateTime, formCompositions, layouts, notifications, dataDisplay }) {
  const categoryCounts = {
    buttons: buttons.length,
    cards: cards.length,
    forms: forms.length,
    "date-time": dateTime.length,
    "form-compositions": formCompositions.length,
    layouts: layouts.length,
    notifications: notifications.length,
    "data-display": dataDisplay.length,
  };
  const distinctComponents = new Set([
    ...buttons, ...cards, ...forms, ...dateTime, ...formCompositions,
    ...layouts, ...notifications, ...dataDisplay,
  ].map(identity));

  return {
    categoryCounts,
    categoryCount: categories.length,
    totalComponents: distinctComponents.size,
  };
}
