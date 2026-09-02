import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent, getAllComponents } from "../registry/index";
import { getCardsBySubCategory, getCardComponents } from "../registry/cards/index";
import { copyToClipboard } from "../lib/installContract";
import AddToProjectModal from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";

function CopyAction({ text, label = "Copy Code", icon = "📋" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
      onClick={handle}
    >
      <span>{copied ? "✓" : icon}</span>
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}

export default function CardDetails({
  selectedCard,
  onBack,
  onNavigateHome,
}) {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);

  // Active slug can come from prop or URL route param
  const activeSlug = selectedCard || params.slug || "profile-card";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selectedCard) {
      setCurrentSlug(selectedCard);
    } else if (params.slug) {
      setCurrentSlug(params.slug);
    }
  }, [selectedCard, params.slug]);

  const component = getComponent(currentSlug);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/cards");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  if (!component) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-base text-slate-600 dark:text-slate-400 font-semibold mb-4">
          Card component not found in registry.
        </p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all"
        >
          ← Back to Cards Collection
        </button>
      </div>
    );
  }

  const Component = component.component;
  const subCategoryCards = getCardsBySubCategory(component.subCategory || "profile");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
            onClick={handleHome}
          >
            Home
          </span>
          <span>&gt;</span>
          <span
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
            onClick={handleBack}
          >
            Cards
          </span>
          <span>&gt;</span>
          <span className="text-slate-900 dark:text-white font-semibold">
            {component.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            ← Back
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/25"
            onClick={() => setShowModal(true)}
          >
            <span>⚡</span>
            <span>Add to Project</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {component.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-500/30 capitalize">
                {component.subCategory === "stats"
                  ? "Stat / KPI"
                  : component.subCategory === "notifications"
                  ? "Notification & Alert"
                  : component.subCategory === "events"
                  ? "Event & Booking"
                  : component.subCategory === "tasks"
                  ? "Task & Kanban"
                  : component.subCategory === "content"
                  ? "Testimonial & Feature"
                  : component.subCategory === "finance"
                  ? "Invoice & Finance"
                  : component.subCategory === "pricing"
                  ? "Pricing & Plan"
                  : component.subCategory === "social"
                  ? "User Profile"
                  : "Profile & Team"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                v{component.version || "1.0.0"}
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {component.description}
            </p>
          </div>

          {/* Family Variant Switcher */}
          {subCategoryCards.length > 1 && (
            <div className="bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl flex items-center gap-1 overflow-x-auto">
              {subCategoryCards.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCurrentSlug(c.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    currentSlug === c.slug
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {/* Interactive Preview Canvas */}
          <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center min-h-[360px] relative overflow-hidden">
            {/* Subtle background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
            
            <div className="relative z-10 w-full max-w-sm flex items-center justify-center">
              {Component ? (
                <Component {...(component.previewProps || {})} />
              ) : (
                <p className="text-xs text-slate-400">Component preview unavailable</p>
              )}
            </div>
          </section>

          {/* Standalone Code Preview Section */}
          <section className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-semibold text-slate-300">
                  {component.files?.[0]?.path || "Component.jsx"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                  Tailwind CSS
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                  ES6 JSX
                </span>
              </div>
            </div>

            <div className="p-5 relative">
              <pre className="text-xs text-slate-200 font-mono overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{component.sourceCode}</code>
              </pre>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
                <div className="w-36">
                  <CopyAction text={component.sourceCode} label="Copy Code" icon="📋" />
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Section (Description, Props, Usage, Dependencies) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              {["description", "props", "usage", "dependencies"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p>{component.description}</p>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                      Key Features & Use Cases
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {component.uses?.map((use, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{use}</span>
                        </li>
                      ))}
                      {component.tags?.map((tag, i) => (
                        <li key={`tag-${i}`} className="flex items-center gap-2 text-xs">
                          <span className="text-indigo-500 font-bold">#</span>
                          <span>Tag: {tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "props" && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500">
                    Accepts customizable props with sensible defaults:
                  </p>
                  <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto text-slate-700 dark:text-slate-300">
                    {JSON.stringify(component.previewProps, null, 2)}
                  </pre>
                </div>
              )}

              {activeTab === "usage" && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500">
                    Import and use directly inside your React components:
                  </p>
                  <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto text-indigo-600 dark:text-indigo-400">
                    {`import ${component.name.replace(/ /g, "")} from "./components/ui/cards/${component.name.replace(/ /g, "")}";\n\n<${component.name.replace(/ /g, "")} />`}
                  </pre>
                </div>
              )}

              {activeTab === "dependencies" && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                    Required Dependencies
                  </h4>
                  {component.dependencies && component.dependencies.length > 0 ? (
                    <ul className="space-y-1">
                      {component.dependencies.map((dep) => (
                        <li key={dep} className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                          {dep}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Zero external dependencies required. Standalone React + Tailwind CSS.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar Column (1 col) */}
        <div className="space-y-6">
          {/* Component Information Box */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Component Information
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                  {component.category} ({component.subCategory})
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Framework</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.framework || "React 19"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Styling</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Tailwind CSS
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Dependencies</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.dependencies?.length ? component.dependencies.join(", ") : "None"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Size</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ~2.5 KB
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Last Updated</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  May 12, 2025
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Author</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  TemplateHub UI Team
                </span>
              </div>
            </div>
          </section>

          {/* Actions Box */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Actions
            </h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/25"
                onClick={() => setShowModal(true)}
              >
                <span>⚡</span>
                <span>Add to Project</span>
              </button>

              <CopyAction text={component.sourceCode} label="Copy JSX Code" icon="📄" />

              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                onClick={() =>
                  window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank")
                }
              >
                <span>🔗</span>
                <span>View on GitHub</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Add To Project Modal */}
      {showModal && (
        <AddToProjectModal
          component={component}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
