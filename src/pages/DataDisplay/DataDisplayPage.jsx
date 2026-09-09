import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataDisplayDetails from "./DataDisplayDetails";
import { BarChart3, ArrowRight } from "lucide-react";

const dataDisplayComponents = [
  { id: "dataTable",   name: "Data Table",          description: "Responsive structured data table with striped rows, badges, and hover highlights.", tag: "Table",    color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "dataCard",    name: "Metric Data Card",    description: "Executive metric card with key value, positive/negative trend badge and icon.",     tag: "Card",     color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: "skeleton",    name: "Skeleton Shimmer",    description: "Smooth shimmer placeholder animation cards shown while data loads.",                 tag: "Loader",   color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  { id: "spinner",     name: "Loaders & Spinners",  description: "Set of clean CSS spinners, pulsing rings, and indeterminate loading bars.",         tag: "Loader",   color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { id: "progressBar", name: "Progress Bar",         description: "Linear progress bar with label, percentage counter, and variant gradients.",       tag: "Progress", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { id: "emptyState",  name: "Empty State View",    description: "Friendly placeholder with illustration/icon, title, description, and action CTA.",   tag: "State",    color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: "tag",         name: "Tags & Chips",        description: "Soft and solid chip badges with remove buttons and categorical colors.",             tag: "Chip",     color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { id: "avatarGroup", name: "Avatar Group",         description: "Stacked avatar circles with overflow badge counter for team displays.",             tag: "Avatar",   color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { id: "timeline",    name: "Activity Timeline",   description: "Vertical timeline stream for audit logs, activity feeds, and order tracking.",       tag: "Feed",     color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { id: "misc",        name: "Misc UI Primitives",  description: "Keyboard shortcuts badge (Kbd), section divider lines, and tooltip wrappers.",       tag: "Utility",  color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
];

export default function DataDisplayPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {selected ? (
        <DataDisplayDetails
          selected={selected}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Components</span>
            <span>/</span>
            <span className="text-white font-medium">Data Display</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>10 Data Display Primitives</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Data Display & Utilities</h1>
              <p className="text-sm text-slate-400 mt-1">Dense tables, metric cards, skeleton loaders, avatar groups, timelines and chips.</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dataDisplayComponents.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-pink-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-pink-400 font-mono transition-colors">
                      v1.0.0
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-pink-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-pink-400 transition-colors">
                  <span>View Details & Live Demo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
