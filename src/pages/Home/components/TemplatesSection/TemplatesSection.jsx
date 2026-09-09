import React from "react";
import {
  Sparkles,
  Layers,
  FolderKanban,
  MousePointerClick,
  CreditCard,
  FormInput,
  Bell,
  BarChart3,
  Atom,
  TrendingUp,
  Eye,
  ChevronRight,
} from "lucide-react";

const categories = [
  { id: "buttons", name: "Buttons", count: 10, icon: MousePointerClick, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { id: "cards", name: "Cards", count: 26, icon: CreditCard, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { id: "forms", name: "Forms", count: 20, icon: FormInput, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { id: "notifications", name: "Notifications", count: 9, icon: Bell, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { id: "data-display", name: "Data Display", count: 11, icon: BarChart3, color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
];

const kpis = [
  { label: "Total Components", value: "76+", sub: "Ready-to-use UI elements", trend: "+12 this week", icon: Layers, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { label: "Active Categories", value: "7", sub: "Modular domains", trend: "Full coverage", icon: FolderKanban, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Design System", value: "100%", sub: "Tailwind & SCSS tokens", trend: "Standardized", icon: Atom, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Production Ready", value: "Vite", sub: "React 19 optimized", trend: "High perf", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
];

const popularComponents = [
  { id: "buttons", title: "Button Showcase", description: "Interactive button collection with various states, variants, and glowing styles.", badge: "Buttons", previewType: "button", version: "v1.0" },
  { id: "forms", title: "Text Input & Controls", description: "Accessible text inputs with validation states, icons, and error handling.", badge: "Forms", previewType: "input", version: "v1.0" },
  { id: "notifications", title: "Toast & Feedback", description: "Modern toast alerts and inline messages for seamless user communication.", badge: "Notifications", previewType: "toast", version: "v1.0" },
  { id: "data-display", title: "Data Table & Cards", description: "Dense, responsive tabular and card data displays with sorting states.", badge: "Data Display", previewType: "table", version: "v1.0" },
];

export default function TemplatesSection({ onNavigate }) {
  const totalComponents = 76;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950 border border-slate-800 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>React Template Hub · Module Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Explore Pre-built <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Components</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A modular library of production-ready React components with SCSS styling. Copy code, customize tokens, and build faster.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate && onNavigate("buttons")}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
            >
              Browse Components
            </button>
            <button
              onClick={() => onNavigate && onNavigate("cards")}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl border border-slate-700 transition-all"
            >
              Explore Cards
            </button>
          </div>
        </div>

        {/* Stats glass card */}
        <div className="relative shrink-0 w-full md:w-72 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4 shadow-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white leading-none">{totalComponents}+</p>
              <p className="text-xs text-slate-400 mt-1">Components</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white leading-none">{categories.length}</p>
              <p className="text-xs text-slate-400 mt-1">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KPI CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 space-y-3"
            >
              <div className={`inline-flex p-2.5 rounded-xl border ${kpi.bg}`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
                <p className="text-sm font-medium text-slate-300 mt-0.5">{kpi.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{kpi.sub}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. BROWSE BY CATEGORIES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Browse by Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate && onNavigate(cat.id)}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-all duration-200 group"
              >
                <div className={`p-2.5 rounded-xl border mb-2.5 transition-transform group-hover:scale-110 ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-white truncate w-full">{cat.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{cat.count} components</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. POPULAR COMPONENTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Popular Components</h2>
          <button
            onClick={() => onNavigate && onNavigate("buttons")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularComponents.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 cursor-pointer transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Preview box */}
                <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-3 mb-4">
                  {item.previewType === "button" && (
                    <button className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md shadow-md shadow-indigo-600/30">
                      Primary Button
                    </button>
                  )}
                  {item.previewType === "input" && (
                    <div className="w-full px-3 py-1.5 text-xs text-slate-500 bg-slate-900 border border-slate-700 rounded-md">
                      Enter your text...
                    </div>
                  )}
                  {item.previewType === "toast" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[10px] text-emerald-400 font-medium">
                      ✓ Action completed successfully
                    </div>
                  )}
                  {item.previewType === "table" && (
                    <div className="w-full space-y-1 text-[9px]">
                      <div className="flex gap-2 text-slate-500 font-semibold border-b border-slate-800 pb-1">
                        <span className="flex-1">Name</span>
                        <span className="flex-1">Status</span>
                        <span className="flex-1">Value</span>
                      </div>
                      {["Row A", "Row B"].map((r) => (
                        <div key={r} className="flex gap-2 text-slate-400">
                          <span className="flex-1">{r}</span>
                          <span className="flex-1 text-emerald-400">Active</span>
                          <span className="flex-1">—</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Live Preview
                </span>
                <span>{item.version}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
