const identity = (item) => item.slug ?? item.id;

export function createHomeStats({
  categories,
  buttons,
  cards,
  forms,
  dateTime,
  formCompositions,
  layouts,
  notifications,
  dataDisplay,
  additionalComponents = {},
}) {
  const categoryCounts = {
    buttons: buttons.length,
    cards: cards.length,
    forms: forms.length,
    "date-time": dateTime.length,
    "form-compositions": formCompositions.length,
    layouts: layouts.length,
    notifications: notifications.length,
    "data-display": dataDisplay.length,
    ...Object.fromEntries(
      Object.entries(additionalComponents).map(([category, components]) => [
        category,
        components.length,
      ]),
    ),
  };
  const componentGroups = [
    buttons,
    cards,
    forms,
    dateTime,
    formCompositions,
    layouts,
    notifications,
    dataDisplay,
    ...Object.values(additionalComponents),
  ];
  const distinctComponents = new Set([
    ...componentGroups.flat(),
  ].map(identity));

  return {
    categoryCounts,
    categoryCount: categories.length,
    totalComponents: distinctComponents.size,
  };
}
