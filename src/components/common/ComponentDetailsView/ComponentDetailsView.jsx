import React, { useState } from "react";
import { copyToClipboard } from "@/utils/installContract";
import AddToProjectModal from "@/components/common/AddToProjectModal/AddToProjectModal";

function CopyAction({ text, label = "Copy Code", icon = "📋", className = "" }) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    if (!text) return;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors ${className}`}
      onClick={handle}
    >
      <span>{copied ? "✓" : icon}</span>
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}

export default function ComponentDetailsView({
  component,
  categoryName = "Components",
  categoryPath = "/",
  subCategories = [],
  activeSlug,
  onSelectSibling,
  onBack,
  onNavigateHome,
  renderCustomPreview,
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);

  if (!component) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-base text-slate-600 dark:text-slate-400 font-semibold mb-4">
          Component not found in registry.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all"
        >
          ← Back to Collection
        </button>
      </div>
    );
  }

  const Component = component.component;
  const filePath = component.files?.[0]?.path || `components/ui/${component.slug || "Component"}.jsx`;
  const codeContent = component.sourceCode || component.code || `// Code for ${component.name}\nexport default function ${component.name.replace(/ /g, "")}() {\n  return <div>${component.name}</div>;\n}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
            onClick={onNavigateHome}
          >
            Home
          </span>
          <span>&gt;</span>
          <span
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
            onClick={onBack}
          >
            {categoryName}
          </span>
          <span>&gt;</span>
          <span className="text-slate-900 dark:text-white font-semibold">
            {component.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
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
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {component.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-500/30 capitalize">
                {component.subCategory || component.tag || component.category || "Component"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                v{component.version || "1.0.0"}
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {component.description}
            </p>
          </div>

          {/* Sibling / Variant Switcher */}
          {subCategories && subCategories.length > 1 && (
            <div className="bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl flex items-center gap-1 overflow-x-auto">
              {subCategories.map((c) => (
                <button
                  key={c.slug || c.id}
                  onClick={() => onSelectSibling && onSelectSibling(c.slug || c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    (activeSlug === (c.slug || c.id))
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
          <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center min-h-[340px] relative overflow-hidden">
            {/* Subtle dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

            <div className="relative z-10 w-full max-w-md flex items-center justify-center">
              {renderCustomPreview ? (
                renderCustomPreview()
              ) : Component ? (
                <Component {...(component.previewProps || {})}>
                  {component.previewChildren || "Click Me"}
                </Component>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">Live Component Preview</p>
                </div>
              )}
            </div>
          </section>

          {/* macOS Style Code Preview Section */}
          <section className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-semibold text-slate-300">
                  {filePath}
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
                <code>{codeContent}</code>
              </pre>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
                <div className="w-36">
                  <CopyAction text={codeContent} label="Copy Code" icon="📋" />
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
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
                  <p>
                    The <strong className="text-slate-900 dark:text-white">{component.name}</strong> component is designed for production React applications with seamless dark mode and responsive layout.
                  </p>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold">✓</span> Pure Tailwind CSS (Zero external CSS runtime)
                      </li>
                      <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold">✓</span> Fully responsive & accessible
                      </li>
                      <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold">✓</span> Dark & Light theme compliant
                      </li>
                      <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 font-bold">✓</span> Copy & paste ready
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "props" && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Available props and configuration options:</p>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-indigo-500">children / label</td>
                          <td className="p-3 text-slate-500">ReactNode | string</td>
                          <td className="p-3 text-slate-500">-</td>
                          <td className="p-3">Content to render inside component</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-indigo-500">className</td>
                          <td className="p-3 text-slate-500">string</td>
                          <td className="p-3 text-slate-500">""</td>
                          <td className="p-3">Custom Tailwind or CSS class overrides</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-indigo-500">onClick / onChange</td>
                          <td className="p-3 text-slate-500">function</td>
                          <td className="p-3 text-slate-500">-</td>
                          <td className="p-3">Interactive event callbacks</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "usage" && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Simple import and usage in your JSX tree:</p>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <pre className="font-mono text-xs text-indigo-300">
                      <code>{`import ${component.name.replace(/ /g, "")} from "@/components/ui/${component.name.replace(/ /g, "")}";\n\nfunction MyPage() {\n  return (\n    <${component.name.replace(/ /g, "")} />\n  );\n}`}</code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === "dependencies" && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Packages and utilities required for this component:</p>
                  <div className="flex flex-wrap gap-2">
                    {component.dependencies && component.dependencies.length > 0 && component.dependencies[0] !== "None" ? (
                      component.dependencies.map((dep) => (
                        <span key={dep} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-semibold text-indigo-400 border border-slate-200 dark:border-slate-700">
                          {dep}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-emerald-500 border border-slate-200 dark:border-slate-700">
                        ✓ No external dependencies (Zero install)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (1 col) - Info & Actions */}
        <div className="space-y-6">
          {/* Component Information Card */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              COMPONENT INFORMATION
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {categoryName} {component.subCategory ? `(${component.subCategory})` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Framework</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.framework || "react"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Styling</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.styling || "Tailwind CSS"}
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
                  {component.size || "~2.5 KB"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Last Updated</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.lastUpdated || "May 12, 2025"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500">Author</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {component.author || "TemplateHub UI Team"}
                </span>
              </div>
            </div>
          </section>

          {/* Actions Box */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              ACTIONS
            </h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-500/25 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <span>⚡</span>
                <span>Add to Project</span>
              </button>

              <CopyAction text={codeContent} label="Copy JSX Code" icon="📄" />

              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
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
