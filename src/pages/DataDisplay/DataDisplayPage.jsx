import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataDisplayDetails from "./DataDisplayDetails";
import { BarChart3, ArrowRight } from "lucide-react";
import { dataDisplayComponents } from "./dataDisplay.config";

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
                <span>{dataDisplayComponents.length} Data Display Primitives</span>
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
