import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

import SelectionSearchDetails from "./SelectionSearchDetails";
import SelectionSearchPreview from "./SelectionSearchPreview";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";

import { selectionComponents } from "./selectionSearch.config";

/* -------------------------------------------------------------------------- */
/* Reusable Page Header & Breadcrumbs                                         */
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
        Components
      </button>
      <span>/</span>
      <span className="font-medium text-white">Selection & Search</span>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-5 shadow-xl shadow-black/10 sm:px-6">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 sm:flex">
          <Search className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300">
            <Search className="h-3.5 w-3.5" />
            12 Selection & Search Patterns
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Selection{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              & Search Systems
            </span>
          </h1>

          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
            Dropdowns, multiselect, comboboxes, async searching, debouncing, and
            keyboard navigation controls.
          </p>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default function SelectionSearchPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const selectComponent = (id) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selected) {
    return (
      <SelectionSearchDetails
        selected={selected}
        onBack={goBack}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <main className="space-y-7">
      <Breadcrumbs onHome={() => navigate("/")} />

      <PageHeader />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {selectionComponents.map((item) => (
          <ShowcaseCard
            key={item.id}
            title={item.name}
            description={item.description}
            tag={item.tag}
            theme={item.theme}
            preview={<SelectionSearchPreview id={item.id} />}
            onClick={() => selectComponent(item.id)}
          />
        ))}
      </section>
    </main>
  );
}
