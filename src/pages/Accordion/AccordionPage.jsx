import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListCollapse,
  Layers,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
  Navigation,
  FileSpreadsheet,
  Heart,
  Users,
  User,
  Glasses,
  ThumbsUp,
  FileText,
  Wallet,
  Building,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import AccordionDetails from "./AccordionDetails";
import NumberedAccordion from "./components/NumberedAccordion/NumberedAccordion";
import FilterAccordion from "./components/FilterAccordion/FilterAccordion";
import SimpleAccordion from "./components/SimpleAccordion/SimpleAccordion";
import IconAccordion from "./components/IconAccordion/IconAccordion";
import FormAccordion from "./components/FormAccordion/FormAccordion";
import {
  numberedFaqItems,
  filterSections,
  simpleFaqItems,
  iconAccordionItems,
  formAccordionSections,
  accordionComponents,
} from "./accordion.config";

/* -------------------------------------------------------------------------- */
/* Reusability Test Configuration (Alternate form dataset)                     */
/* -------------------------------------------------------------------------- */

const alternateRegistrationSections = [
  {
    id: "candidate-details",
    title: "Personal & Contact Info",
    icon: <User className="w-4 h-4 text-blue-500" />,
    required: true,
    subtitle: "Provide primary identity details for registration",
    fields: [
      {
        id: "candidateName",
        name: "candidateName",
        label: "Full Legal Name",
        type: "text",
        placeholder: "Alex Johnson",
        required: true,
        defaultValue: "Alex Johnson",
      },
      {
        id: "candidateEmail",
        name: "candidateEmail",
        label: "Work Email Address",
        type: "text",
        placeholder: "alex@company.com",
        required: true,
        defaultValue: "alex@enterprise.com",
      },
    ],
  },
  {
    id: "employment",
    title: "Professional Experience",
    icon: <Briefcase className="w-4 h-4 text-indigo-500" />,
    subtitle: "Current role and years of domain expertise",
    fields: [
      {
        id: "jobTitle",
        name: "jobTitle",
        label: "Current Job Title",
        type: "text",
        defaultValue: "Senior Frontend Engineer",
      },
      {
        id: "yearsExp",
        name: "yearsExp",
        label: "Total Years in Software Engineering",
        type: "number",
        defaultValue: 6,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Save Candidate Profile",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Header & Breadcrumb Primitives                                             */
/* -------------------------------------------------------------------------- */

function Breadcrumbs({ onHome }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Home
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Components
      </button>
      <span>/</span>
      <span className="font-medium text-white">Accordion</span>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-6 shadow-xl shadow-black/10 sm:px-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="relative flex items-center gap-5">
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/25 sm:flex">
          <ListCollapse className="h-7 w-7" />
        </div>

        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            5 Production Patterns · Compound Architecture
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Accordion{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              & Disclosure Systems
            </span>
          </h1>

          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
            Modular, accessible accordion components with shared compound primitives. Includes Numbered FAQ, Filter Selection, Simple FAQ, Icon Navigation, and Dynamic Form patterns.
          </p>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Accordion Showcase Previews (for ShowcaseCard top section)                 */
/* -------------------------------------------------------------------------- */

function AccordionCardPreview({ id }) {
  switch (id) {
    case "numbered-accordion":
      return (
        <div className="w-full px-3 py-1 text-left">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">01</span>
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">−</span>
            </div>
            <p className="text-[11px] font-semibold text-white truncate">What is ATS and why does it matter?</p>
            <p className="text-[9px] text-slate-400 line-clamp-1">ATS stands for Applicant Tracking System...</p>
          </div>
        </div>
      );
    case "filter-accordion":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white">Industry</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">5</span>
              </div>
              <span className="text-slate-400 text-xs">▲</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-300">
              <span className="text-blue-400 text-xs">☑</span> Aerospace, Food, Mining...
            </div>
          </div>
        </div>
      );
    case "simple-accordion":
      return (
        <div className="w-full px-3 py-1 space-y-1.5">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200">
            <span className="truncate">How does Easy Accordion improve UX?</span>
            <span className="text-slate-400 text-xs">▼</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200">
            <span className="truncate">Can I customize colors easily?</span>
            <span className="text-slate-400 text-xs">▼</span>
          </div>
        </div>
      );
    case "icon-accordion":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-[#8f5229]/90 border border-[#7a421d] text-white space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Health Profile</span>
              </div>
              <span className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center text-[9px]">⌵</span>
            </div>
          </div>
        </div>
      );
    case "form-accordion":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs font-bold text-white">Income</span>
              </div>
              <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">REQUIRED</span>
            </div>
            <p className="text-[9px] text-slate-400">Dynamic field rendering with persistent values</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="text-xs text-slate-400 text-center">
          Accessible WAI-ARIA Compound Primitives
        </div>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Main Accordion Page Component                                              */
/* -------------------------------------------------------------------------- */

export default function AccordionPage() {
  const [selectedAccordion, setSelectedAccordion] = useState(null);
  const navigate = useNavigate();

  // State for Filter Accordion live demo
  const [filterSelections, setFilterSelections] = useState({
    company: ["google"],
    industry: ["aerospace", "food", "mining", "music", "transportation"],
    department: ["engineering"],
    employees: [],
  });

  // State for Icon Accordion live demo theme switcher
  const [iconVariant, setIconVariant] = useState("warm");

  // State for Form Accordion live demo
  const [formDataset, setFormDataset] = useState("tax"); // "tax" | "registration"
  const [lastSubmittedForm, setLastSubmittedForm] = useState(null);

  const handleSelect = (id) => {
    setSelectedAccordion(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedAccordion(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setFilterSelections({
      company: [],
      industry: ["aerospace", "food", "mining", "music", "transportation"],
      department: [],
      employees: [],
    });
  };

  if (selectedAccordion) {
    return (
      <AccordionDetails
        selected={selectedAccordion}
        onBack={handleBack}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs onHome={() => navigate("/")} />

      {/* 2. Hero Header */}
      <PageHeader />

      {/* 3. Component Collection Cards (Showcase Grid) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Component Registry Overview</span>
          </h2>
          <span className="text-xs text-slate-400">Click any card to inspect JSX code & documentation</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accordionComponents.map((item) => (
            <ShowcaseCard
              key={item.id}
              title={item.name}
              description={item.description}
              tag={item.tag}
              theme={item.theme}
              preview={<AccordionCardPreview id={item.id} />}
              onClick={() => handleSelect(item.id)}
            />
          ))}
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE DEMONSTRATION SECTION */}
      <section className="space-y-12 pt-6 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Interactive Live Demos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore All 5 Accordion Patterns
          </h2>
          <p className="text-sm text-slate-400">
            Fully responsive, accessible, animated, and theme-compliant components rendered in real-time.
          </p>
        </div>

        {/* STYLE 1: Numbered FAQ Accordion */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  STYLE 1
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Numbered FAQ Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Sequential numbered layout with circular expand/collapse toggles and single active item focus.
              </p>
            </div>
            <button
              onClick={() => handleSelect("numbered-accordion")}
              className="self-start sm:self-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View Code &amp; API →
            </button>
          </div>

          <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            <NumberedAccordion
              items={numberedFaqItems}
              defaultValue="01"
              type="single"
              collapsible={true}
            />
          </div>
        </div>

        {/* STYLE 2: Filter Accordion */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  STYLE 2
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Filter Selection Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Multi-panel filter accordion with calculated dynamic selection count badges and checkbox states.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Selections</span>
              </button>
              <button
                onClick={() => handleSelect("filter-accordion")}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Code &amp; API →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            <div className="lg:col-span-1 flex justify-center">
              <FilterAccordion
                sections={filterSections}
                selectedValues={filterSelections}
                onSelectionChange={(newVal) => setFilterSelections(newVal)}
                defaultOpenSections={["company", "industry"]}
                type="multiple"
                className="w-full"
              />
            </div>

            <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                    Live Filter State
                  </span>
                  <span className="text-xs font-mono text-blue-400 font-semibold">
                    {Object.values(filterSelections).flat().length} items selected
                  </span>
                </div>

                <div className="space-y-2.5">
                  {filterSections.map((sec) => {
                    const sel = filterSelections[sec.id] || [];
                    return (
                      <div key={sec.id} className="text-xs space-y-1">
                        <span className="font-semibold text-slate-300">{sec.title}:</span>
                        {sel.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {sel.map((optId) => {
                              const opt = sec.options.find((o) => o.id === optId);
                              return (
                                <span
                                  key={optId}
                                  className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-medium"
                                >
                                  {opt ? opt.label : optId}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-slate-500 italic text-[11px]">No filter selected</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
                💡 <strong className="text-slate-300">Live Reaction:</strong> Notice how checking checkboxes immediately updates the count badge (e.g. <span className="text-blue-400 font-bold">Industry 5</span>) in the header!
              </div>
            </div>
          </div>
        </div>

        {/* STYLE 3: Simple FAQ Accordion */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  STYLE 3
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Simple FAQ Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Minimal horizontal rows with rotating chevrons, smooth height reveals, and versatile styling.
              </p>
            </div>
            <button
              onClick={() => handleSelect("simple-accordion")}
              className="self-start sm:self-auto text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Code &amp; API →
            </button>
          </div>

          <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            <SimpleAccordion
              items={simpleFaqItems}
              defaultValue="faq-1"
              type="single"
              collapsible={true}
            />
          </div>
        </div>

        {/* STYLE 4: Icon Navigation Accordion (NEW) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  STYLE 4 · NEW
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Icon Navigation Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pixel-aligned icon list with circular expand triggers and warm/neutral theme variants.
              </p>
            </div>

            {/* Theme / Variant Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Variant:</span>
              {["warm", "default", "neutral"].map((v) => (
                <button
                  key={v}
                  onClick={() => setIconVariant(v)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    iconVariant === v
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                  }`}
                >
                  {v}
                </button>
              ))}
              <button
                onClick={() => handleSelect("icon-accordion")}
                className="ml-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                View Code →
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl flex flex-col items-center justify-center">
            <IconAccordion
              items={iconAccordionItems}
              defaultValue="health-profile"
              variant={iconVariant}
              className="w-full max-w-lg"
            />
          </div>
        </div>

        {/* STYLE 5: Dynamic Form Accordion (NEW) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  STYLE 5 · NEW
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Dynamic Form Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enterprise multi-section form disclosure with data-driven dynamic fields and cross-collapse state persistence.
              </p>
            </div>

            {/* Reusability Test Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Form Dataset:</span>
              <button
                onClick={() => setFormDataset("tax")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  formDataset === "tax"
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                }`}
              >
                Tax Income Form
              </button>
              <button
                onClick={() => setFormDataset("registration")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  formDataset === "registration"
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                    : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                }`}
              >
                Candidate Profile
              </button>
              <button
                onClick={() => handleSelect("form-accordion")}
                className="ml-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                View Code →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            {/* Form Accordion Component */}
            <div className="lg:col-span-2 flex justify-center">
              <FormAccordion
                key={formDataset}
                sections={
                  formDataset === "tax"
                    ? formAccordionSections
                    : alternateRegistrationSections
                }
                defaultValue={formDataset === "tax" ? "income" : "candidate-details"}
                onSubmit={(values, secId) => {
                  setLastSubmittedForm({ section: secId, values, timestamp: new Date().toLocaleTimeString() });
                }}
                className="w-full"
              />
            </div>

            {/* Form State & Persistence Inspector */}
            <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
                    Form State Log
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Last Submitted Data:
                  </span>
                  {lastSubmittedForm ? (
                    <div className="text-xs font-mono space-y-1 text-slate-300">
                      <p className="text-teal-400 font-semibold">Section: {lastSubmittedForm.section}</p>
                      <pre className="text-[11px] text-slate-300 overflow-x-auto p-2 rounded bg-slate-900 border border-slate-800">
                        {JSON.stringify(lastSubmittedForm.values, null, 2)}
                      </pre>
                      <p className="text-[10px] text-slate-500">Submitted at {lastSubmittedForm.timestamp}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Click "Continue" in any section to trigger submission.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
                🔒 <strong className="text-slate-300">State Persistence:</strong> Values entered in one section persist safely when collapsing and opening other sections!
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
