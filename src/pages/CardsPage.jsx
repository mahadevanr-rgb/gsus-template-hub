import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CardDetails from "./CardDetails";
import { getCardsBySubCategory } from "../registry/cards/index";

// Atom Card Components
import ProfileCard from "../components/atoms/cards/ProfileCard";
import TeamCard from "../components/atoms/cards/TeamCard";
import ProductCard from "../components/atoms/cards/ProductCard";
import StatCard from "../components/atoms/cards/StatCard";
import KpiCard from "../components/atoms/cards/KpiCard";
import MetricCard from "../components/atoms/cards/MetricCard";
import ProgressCard from "../components/atoms/cards/ProgressCard";
import NotificationCard from "../components/atoms/cards/NotificationCard";
import AlertCard from "../components/atoms/cards/AlertCard";
import StatusCard from "../components/atoms/cards/StatusCard";
import EventCard from "../components/atoms/cards/EventCard";
import BookingCard from "../components/atoms/cards/BookingCard";
import AppointmentCard from "../components/atoms/cards/AppointmentCard";
import TaskCard from "../components/atoms/cards/TaskCard";
import KanbanCard from "../components/atoms/cards/KanbanCard";
import ProjectCard from "../components/atoms/cards/ProjectCard";
import PricingCard from "../components/atoms/cards/PricingCard";
import ComparisonCard from "../components/atoms/cards/ComparisonCard";
import SubscriptionCard from "../components/atoms/cards/SubscriptionCard";
import PhotoProfileCard from "../components/atoms/cards/PhotoProfileCard";
import TestimonialCard from "../components/atoms/cards/TestimonialCard";
import FeatureCard from "../components/atoms/cards/FeatureCard";
import RecommendationCard from "../components/atoms/cards/RecommendationCard";
import InvoiceCard from "../components/atoms/cards/InvoiceCard";
import TransactionCard from "../components/atoms/cards/TransactionCard";
import PaymentCard from "../components/atoms/cards/PaymentCard";

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleSelectCard = (slug) => {
    setSelectedCard(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedCard(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contentCards = getCardsBySubCategory("content");
  const financeCards = getCardsBySubCategory("finance");
  const notificationCards = getCardsBySubCategory("notifications");
  const eventCards = getCardsBySubCategory("events");
  const taskCards = getCardsBySubCategory("tasks");
  const profileCards = getCardsBySubCategory("profile");
  const statsCards = getCardsBySubCategory("stats");
  const pricingCards = getCardsBySubCategory("pricing");
  const socialCards = getCardsBySubCategory("social");

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-16">
        {selectedCard ? (
          <CardDetails
            selectedCard={selectedCard}
            onBack={handleBack}
            onNavigateHome={() => navigate("/")}
          />
        ) : (
          <section className="space-y-16">
            {/* Top Breadcrumb & Header */}
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                <span
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>
                <span>&gt;</span>
                <span
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
                  onClick={() => navigate("/")}
                >
                  Components
                </span>
                <span>&gt;</span>
                <span className="text-slate-900 dark:text-white font-semibold">
                  Cards
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Cards UI Collection
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Reusable, theme-aware card UI system for testimonials, features, financial workflows, task management, and dashboards.
                </p>
              </div>
            </div>

            {/* =========================================================================
                FAMILY 1: Testimonial, Feature & Recommendation Cards
               ========================================================================= */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>⭐</span>
                    <span>Testimonial, Feature & Recommendation Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Customer social proof reviews, product capability showcases, and proactive workflow recommendations
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 self-start sm:self-auto">
                  {contentCards.length} Components
                </span>
              </div>

              {/* Showcase Canvas matching Coral/Orange Gradient Reference */}
              <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center max-w-5xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("testimonial-card")}
                  >
                    <TestimonialCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("feature-card")}
                  >
                    <FeatureCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("recommendation-card")}
                  >
                    <RecommendationCard />
                  </div>
                </div>
              </div>

              {/* Grid List for Content Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                FAMILY 2: Invoice, Transaction & Payment Cards
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>💵</span>
                    <span>Invoice, Transaction & Payment Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Payable client invoices, financial ledger transactions, and secure masked payment methods
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 self-start sm:self-auto">
                  {financeCards.length} Components
                </span>
              </div>

              {/* Showcase Canvas matching Teal/Emerald Gradient Reference */}
              <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-teal-300/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center max-w-5xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("invoice-card")}
                  >
                    <InvoiceCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("transaction-card")}
                  >
                    <TransactionCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("payment-card")}
                  >
                    <PaymentCard />
                  </div>
                </div>
              </div>

              {/* Grid List for Finance Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {financeCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                NOTIFICATION, ALERT & STATUS CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>🔔</span>
                    <span>Notification, Alert & Status Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    User activity feeds, critical quota warnings, and live system health monitors
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 self-start sm:self-auto">
                  {notificationCards.length} Components
                </span>
              </div>

              <div className="rounded-3xl bg-[#1e293b] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center max-w-5xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("notification-card")}
                  >
                    <NotificationCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("alert-card")}
                  >
                    <AlertCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("status-card")}
                  >
                    <StatusCard />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notificationCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                EVENT, BOOKING & APPOINTMENT CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>🗓️</span>
                    <span>Event, Booking & Appointment Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Summit invitations, hospitality reservations, and provider consultation schedules
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 self-start sm:self-auto">
                  {eventCards.length} Components
                </span>
              </div>

              <div className="rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center max-w-5xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("event-card")}
                  >
                    <EventCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("booking-card")}
                  >
                    <BookingCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("appointment-card")}
                  >
                    <AppointmentCard />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                TASK, KANBAN & PROJECT CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>⚡</span>
                    <span>Task, Kanban & Project Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Actionable sprint tasks, interactive @dnd-kit Kanban boards, and milestone tracking
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 self-start sm:self-auto">
                  {taskCards.length} Components
                </span>
              </div>

              <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-950 p-6 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                <div className="relative z-10 w-full space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
                    <div
                      className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                      onClick={() => handleSelectCard("task-card")}
                    >
                      <TaskCard />
                    </div>
                    <div
                      className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                      onClick={() => handleSelectCard("project-card")}
                    >
                      <ProjectCard />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center">
                    <div className="text-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Live Interactive Drag & Drop Board
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Try dragging work items between columns
                      </p>
                    </div>
                    <KanbanCard />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {taskCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                PROFILE, TEAM & PRODUCT CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>👤</span>
                    <span>Profile, Team & Product Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Identity cards, team collaboration workspaces, and digital product highlights
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 self-start sm:self-auto">
                  {profileCards.length} Components
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                STATISTICS & KPI CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>📊</span>
                    <span>Statistics & KPI Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Measurable numeric metrics, comparison bars, and real-time KPI trend indicators
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 self-start sm:self-auto">
                  {statsCards.length} Components
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {statsCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-5 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[190px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[240px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            React
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                PRICING & PLAN CARDS
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>💳</span>
                    <span>Pricing & Plan Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Tier cards, segmented multi-plan comparisons, stacked layouts, and subscription management
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 self-start sm:self-auto">
                  {pricingCards.length} Components
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                USER PROFILE CARDS (PHOTO-STYLE)
               ========================================================================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>📸</span>
                    <span>User Profile Cards</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Portrait creator cards with verified badges, bio previews, engagement metrics, and follow actions
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 self-start sm:self-auto">
                  {socialCards.length} Component
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialCards.map((card) => {
                  const Comp = card.component;
                  return (
                    <div
                      key={card.slug}
                      onClick={() => handleSelectCard(card.slug)}
                      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 min-h-[220px]">
                        <div className="transform scale-90 group-hover:scale-95 transition-transform origin-center pointer-events-none max-w-[280px] w-full">
                          <Comp {...card.previewProps} />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {card.name}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                              {card.subCategory}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            View Details →
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            React + Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
