import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CardDetails from "./CardDetails";
import { getCardComponents, getCardsBySubCategory } from "../registry/cards/index";
import ProfileCard from "../components/atoms/cards/ProfileCard";
import TeamCard from "../components/atoms/cards/TeamCard";
import ProductCard from "../components/atoms/cards/ProductCard";
import StatCard from "../components/atoms/cards/StatCard";
import KpiCard from "../components/atoms/cards/KpiCard";
import MetricCard from "../components/atoms/cards/MetricCard";
import ProgressCard from "../components/atoms/cards/ProgressCard";

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

  const profileCards = getCardsBySubCategory("profile");
  const statsCards = getCardsBySubCategory("stats");

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-12">
        {selectedCard ? (
          <CardDetails
            selectedCard={selectedCard}
            onBack={handleBack}
            onNavigateHome={() => navigate("/")}
          />
        ) : (
          <section className="space-y-12">
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
                  Reusable, theme-aware card UI system for user profiles, teams, products, and real-time KPI dashboards.
                </p>
              </div>
            </div>

            {/* =========================================================================
                FAMILY 1: Profile, Team & Product Cards
               ========================================================================= */}
            <div className="space-y-6">
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
                  3 Components
                </span>
              </div>

              {/* Showcase Canvas matching Reference 2 */}
              <div className="rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-600 to-amber-500 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center max-w-5xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("profile-card")}
                  >
                    <ProfileCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("team-card")}
                  >
                    <TeamCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("product-card")}
                  >
                    <ProductCard />
                  </div>
                </div>
              </div>

              {/* Grid List for Family 1 */}
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
                FAMILY 2: Statistics & KPI Cards
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
                  4 Components
                </span>
              </div>

              {/* Showcase Canvas matching Reference 1 (Blue/Purple Header with 4 Cards) */}
              <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Canvas Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="inline-flex items-center gap-2 text-white font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow-sm">
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span>Statistics Dashboard</span>
                  </div>
                  <p className="text-indigo-100 text-xs sm:text-sm font-medium mt-1">
                    Real-time business metrics and KPIs
                  </p>
                </div>

                {/* 4 Cards in Row */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 justify-center max-w-6xl mx-auto">
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("stat-card")}
                  >
                    <StatCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("kpi-card")}
                  >
                    <KpiCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("metric-card")}
                  >
                    <MetricCard />
                  </div>
                  <div
                    className="cursor-pointer transform hover:-translate-y-1 transition-transform flex justify-center"
                    onClick={() => handleSelectCard("progress-card")}
                  >
                    <ProgressCard />
                  </div>
                </div>
              </div>

              {/* Grid List for Family 2 */}
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
          </section>
        )}
      </div>
    </MainLayout>
  );
}
