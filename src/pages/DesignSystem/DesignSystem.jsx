import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Palette,
  Layers,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Box,
  Type,
  Maximize2,
  Zap,
  LayoutGrid,
} from "lucide-react";

import ThemeDetails from "./ThemeDetails";
import ThemePreview from "./ThemePreview";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";

import { themeTokensConfig } from "./themeTokens.config";

/* -------------------------------------------------------------------------- */
/* Reusable Breadcrumbs & Header Component                                    */
/* -------------------------------------------------------------------------- */

function Breadcrumbs({ onHome }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white"
      >
        Home
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white"
      >
        Design System
      </button>
      <span>/</span>
      <span className="font-medium text-white">Theme & Design Tokens</span>
    </div>
  );
}

function PageHeader({ onOpenCustomizer }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-950/60 px-5 py-6 shadow-2xl shadow-indigo-950/20 sm:px-6">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 text-white shadow-xl shadow-indigo-500/25 sm:flex">
            <Palette className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              18 Theme & Design Tokens System
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Theme &{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Design System
              </span>
            </h1>

            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
              Colors, spacing, radius, borders, shadows, typography, and
              reusable component defaults mapped to CSS custom variables.
            </p>
          </div>
        </div>

        {/* Live Customize Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenCustomizer}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-95"
        >
          <Sliders className="h-4 w-4" />
          <span>Customize Tokens</span>
        </button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Complete Theme Flow (Bottom Section Architecture)                          */
/* -------------------------------------------------------------------------- */

function CompleteThemeFlow({ activeStep, setActiveStep }) {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Design Tokens",
      desc: "Colors, spacing, radius, shadows, typography",
    },
    {
      id: 2,
      number: "02",
      title: "Components",
      desc: "Buttons, inputs, selects, toggles, badges",
    },
    {
      id: 3,
      number: "03",
      title: "Layout Module",
      desc: "Pages, grids, responsive structure",
    },
    {
      id: 4,
      number: "04",
      title: "Final Dashboard",
      desc: "Beautiful, consistent, and production ready",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-xl">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
          <Zap className="h-4 w-4" />
          Complete Theme Flow
        </div>
        <p className="text-xs text-slate-400">
          From design tokens to a fully themed product experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`group relative cursor-pointer rounded-xl border p-4 transition-all ${
                isActive
                  ? "border-indigo-500/80 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-mono font-bold ${isActive ? "text-indigo-400" : "text-slate-500"}`}
                >
                  {step.number}
                </span>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                )}
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {step.title}
              </h4>
              <p className="mt-1 text-xs text-slate-400 leading-normal">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Theme & Design Tokens Showcase Page                                   */
/* -------------------------------------------------------------------------- */

export default function ThemeDesignPage() {
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  const selectTokenModule = (id) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render detail view if a token system card is selected
  if (selected) {
    return (
      <ThemeDetails
        selected={selected}
        onBack={goBack}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <main className="space-y-7">
      {/* Navigation Breadcrumbs */}
      <Breadcrumbs onHome={() => navigate("/")} />

      {/* Main Header */}
      <PageHeader onOpenCustomizer={() => {}} />

      {/* Grid Display: 01 to 09 Cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {themeTokensConfig.map((item) => (
          <ShowcaseCard
            key={item.id}
            title={`${item.number} ${item.name}`}
            description={item.description}
            tag={item.tag}
            theme={item.theme}
            preview={<ThemePreview id={item.id} />}
            onClick={() => selectTokenModule(item.id)}
          />
        ))}
      </section>

      {/* Complete Interactive Theme Flow */}
      <CompleteThemeFlow
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </main>
  );
}
