import featureCard from "./cards/content/feature-card";
import recommendationCard from "./cards/content/recommendation-card";
import testimonialCard from "./cards/content/testimonial-card";

import appointmentCard from "./cards/events/appointment-card";
import bookingCard from "./cards/events/booking-card";
import eventCard from "./cards/events/event-card";

import invoiceCard from "./cards/finance/invoice-card";
import paymentCard from "./cards/finance/payment-card";
import transactionCard from "./cards/finance/transaction-card";

import alertCard from "./cards/notifications/alert-card";
import notificationCard from "./cards/notifications/notification-card";
import statusCard from "./cards/notifications/status-card";

import comparisonCard from "./cards/pricing/comparison-card";
import pricingCard from "./cards/pricing/pricing-card";
import subscriptionCard from "./cards/pricing/subscription-card";

import productCard from "./cards/profile/product-card";
import profileCard from "./cards/profile/profile-card";
import teamCard from "./cards/profile/team-card";

import photoProfileCard from "./cards/social/photo-profile-card";

import kpiCard from "./cards/stats/kpi-card";
import metricCard from "./cards/stats/metric-card";
import progressCard from "./cards/stats/progress-card";
import statCard from "./cards/stats/stat-card";

import kanbanCard from "./cards/tasks/kanban-card";
import projectCard from "./cards/tasks/project-card";
import taskCard from "./cards/tasks/task-card";

export const cardComponents = [
  profileCard,
  teamCard,
  productCard,
  photoProfileCard,
  statCard,
  kpiCard,
  metricCard,
  progressCard,
  pricingCard,
  comparisonCard,
  subscriptionCard,
  notificationCard,
  alertCard,
  statusCard,
  eventCard,
  bookingCard,
  appointmentCard,
  taskCard,
  kanbanCard,
  projectCard,
  featureCard,
  recommendationCard,
  testimonialCard,
  invoiceCard,
  transactionCard,
  paymentCard,
];

export function getCardComponents() {
  return cardComponents;
}

export function getCardsBySubCategory(subCategory) {
  return cardComponents.filter((c) => c.subCategory === subCategory);
}

export function searchCards(query) {
  const q = query.toLowerCase();
  return cardComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default cardComponents;
