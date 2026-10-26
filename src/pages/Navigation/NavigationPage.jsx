import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Menu,
  ChevronRight,
  PanelLeft,
  Smartphone,
  Command,
  MousePointer,
} from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import NavigationDetails from "./NavigationDetails";
import MyCustomizedNavigation from "./components/MyCustomizedNavigation";
import { navigationComponents } from "./navigation.config";
import {
  NavbarDemo,
  HeaderDemo,
  SidebarDemo,
  BreadcrumbDemo,
  TabsDemo,
  NestedTabsDemo,
  BottomNavigationDemo,
  StepperDemo,
  MenuDemo,
  DropdownMenuDemo,
  MegaMenuDemo,
  ContextMenuDemo,
  CommandPaletteDemo,
  NavigationDrawerDemo,
} from "./components";

/* Breadcrumbs Header Primitive */
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
      <span className="font-medium text-white">Navigation</span>
    </div>
  );
}

/* Page Hero Banner */
function PageHeader({ onCustomize }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-6 shadow-xl shadow-black/10 sm:px-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/25 sm:flex">
            <Compass className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              14 Production Navigation & Component State Patterns
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Navigation{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                & Component States
              </span>
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
              Enterprise navigation architectures supporting active route states, responsive mobile menus, keyboard navigation, collapsible panels, and robust browser history integration.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCustomize}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Customizer</span>
        </button>
      </div>
    </header>
  );
}

/* Card Previews for Showcase Grid */
function NavigationCardPreview({ id }) {
  switch (id) {
    case "navbar":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-400">Brand</span>
            <div className="flex gap-2 text-[10px] text-slate-400">
              <span className="text-white font-semibold">Docs</span>
              <span>Pricing</span>
            </div>
          </div>
        </div>
      );
    case "header":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400">App &gt; Dashboard</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
          </div>
        </div>
      );
    case "sidebar":
      return (
        <div className="w-full px-3 py-1 flex gap-2">
          <div className="w-8 h-12 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex flex-col items-center py-1 gap-1">
            <div className="w-3 h-1 bg-indigo-400 rounded" />
            <div className="w-3 h-1 bg-slate-700 rounded" />
          </div>
          <div className="flex-1 h-12 rounded-lg bg-slate-950/80 border border-slate-800 p-1.5 space-y-1">
            <div className="w-16 h-1.5 bg-slate-700 rounded" />
            <div className="w-10 h-1.5 bg-slate-800 rounded" />
          </div>
        </div>
      );
    case "breadcrumb":
      return (
        <div className="w-full px-3 py-1 text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
          <span>Home</span>
          <span>/</span>
          <span>Projects</span>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">Task</span>
        </div>
      );
    case "tabs":
      return (
        <div className="w-full px-3 py-1 flex justify-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-semibold">Live</span>
          <span className="px-2 py-0.5 text-slate-400">Nodes</span>
          <span className="px-2 py-0.5 text-slate-400">Logs</span>
        </div>
      );
    case "nested-tabs":
      return (
        <div className="w-full px-3 py-1 space-y-1">
          <div className="flex gap-1.5 text-[9px] bg-slate-900 p-1 rounded-lg">
            <span className="bg-indigo-600 px-1.5 py-0.5 text-white rounded font-bold">INFRA</span>
            <span className="text-slate-400 px-1 py-0.5">DATA</span>
          </div>
          <div className="flex gap-1 text-[9px] text-slate-400 pl-1">
            <span className="text-indigo-300 font-semibold">• Compute</span>
            <span>• Storage</span>
          </div>
        </div>
      );
    case "bottom-navigation":
      return (
        <div className="w-full px-4 py-1">
          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-around text-xs">
            <span className="text-indigo-400">🏠</span>
            <span className="text-slate-400">🔍</span>
            <span className="text-indigo-500 font-bold">➕</span>
            <span className="text-slate-400">🔔</span>
          </div>
        </div>
      );
    case "stepper":
      return (
        <div className="w-full px-3 py-1 flex items-center justify-center gap-2 text-xs">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
          <span className="w-4 h-0.5 bg-indigo-500" />
          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
          <span className="w-4 h-0.5 bg-slate-800" />
          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[10px]">3</span>
        </div>
      );
    case "command-palette":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>⌘ Search...</span>
            <span className="text-[10px] font-mono px-1 bg-slate-800 rounded">ESC</span>
          </div>
        </div>
      );
    case "navigation-drawer":
      return (
        <div className="w-full px-3 py-1 flex gap-1.5">
          <div className="w-12 h-10 rounded-lg bg-indigo-600/30 border border-indigo-500/40 p-1 space-y-1">
            <div className="w-8 h-1 bg-indigo-300 rounded" />
            <div className="w-6 h-1 bg-slate-600 rounded" />
          </div>
          <div className="flex-1 h-10 rounded-lg bg-slate-900/60 border border-slate-800" />
        </div>
      );
    default:
      return (
        <div className="w-full px-3 py-1 text-center text-xs text-slate-400">
          Component Preview
        </div>
      );
  }
}

export default function NavigationPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("collection");
  const navigate = useNavigate();

  const handleSelect = (slug) => {
    navigate(`/navigation/${slug}`);
  };

  const filteredComponents =
    selectedSubCategory === "all"
      ? navigationComponents
      : navigationComponents.filter((c) => c.subCategory === selectedSubCategory);

  const subCategories = ["all", "Bar & Header", "Panels & Drawers", "Path & Tabs", "Mobile & Stepper", "Menus & Overlays"];

  if (selectedComponent) {
    return (
      <NavigationDetails
        selected={selectedComponent}
        onBack={() => setSelectedComponent(null)}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs onHome={() => navigate("/")} />

      {/* 2. Hero Header */}
      <PageHeader onCustomize={() => navigate("/navigation/customize")} />

      {/* 3. Tab Switcher & Quick Customize Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveTab("collection")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "collection"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Browse Components ({navigationComponents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my-designs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "my-designs"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>My Saved Navigation</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/navigation/customize")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>🎨 Open Navigation Customizer</span>
        </button>
      </div>

      {activeTab === "my-designs" ? (
        <MyCustomizedNavigation onNewNavigation={() => navigate("/navigation/customize")} />
      ) : (
        <>
          {/* SubCategory Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subCategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubCategory === sub
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {sub === "all" ? "All Components (14)" : sub}
              </button>
            ))}
          </div>

      {/* 4. Showcase Cards Catalog Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Component Registry Overview</span>
          </h2>
          <span className="text-xs text-slate-400">
            Click any component to inspect code & API documentation
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredComponents.map((item) => (
            <ShowcaseCard
              key={item.id}
              title={item.name}
              description={item.description}
              tag={item.tag}
              theme={item.theme}
              preview={<NavigationCardPreview id={item.id} />}
              onClick={() => handleSelect(item.slug)}
            />
          ))}
        </div>
      </section>

      {/* 5. LIVE INTERACTIVE DEMONSTRATION SECTION */}
      <section className="space-y-14 pt-8 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Interactive Live Demos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore All 14 Navigation Patterns
          </h2>
          <p className="text-sm text-slate-400">
            Fully interactive, responsive, theme-aware, and keyboard-accessible navigation components rendered live.
          </p>
        </div>

        {/* DEMO 1: Navbar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">1. Navbar (Responsive Top Bar)</h3>
              <p className="text-xs text-slate-400">Brand logo, dropdown menus, theme-aware styles, and mobile drawer.</p>
            </div>
            <button
              onClick={() => handleSelect("navbar")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <NavbarDemo />
        </div>

        {/* DEMO 2: Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">2. Header (Application Header)</h3>
              <p className="text-xs text-slate-400">Breadcrumbs, search integration, unread alerts, and user avatar.</p>
            </div>
            <button
              onClick={() => handleSelect("header")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <HeaderDemo />
        </div>

        {/* DEMO 3: Sidebar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">3. Sidebar (Collapsible Panel)</h3>
              <p className="text-xs text-slate-400">Expandable groups, badge counts, collapsed tooltips, and active routes.</p>
            </div>
            <button
              onClick={() => handleSelect("sidebar")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <SidebarDemo />
        </div>

        {/* DEMO 4: Breadcrumb */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">4. Breadcrumb (Hierarchy Trail)</h3>
              <p className="text-xs text-slate-400">Configurable separators, icons, and intermediate responsive truncation.</p>
            </div>
            <button
              onClick={() => handleSelect("breadcrumb")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <BreadcrumbDemo />
        </div>

        {/* DEMO 5: Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">5. Tabs (WAI-ARIA Tablist)</h3>
              <p className="text-xs text-slate-400">Keyboard roving focus, horizontal/vertical layouts, and 4 design variants.</p>
            </div>
            <button
              onClick={() => handleSelect("tabs")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <TabsDemo />
        </div>

        {/* DEMO 6: Nested Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">6. Nested Tabs (Two-Tier Hierarchy)</h3>
              <p className="text-xs text-slate-400">Independent active state with clean parent-child synchronization.</p>
            </div>
            <button
              onClick={() => handleSelect("nested-tabs")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <NestedTabsDemo />
        </div>

        {/* DEMO 7: Bottom Navigation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">7. Bottom Navigation (Mobile Dock)</h3>
              <p className="text-xs text-slate-400">Mobile-first navigation bar with icon badges and elevated primary action.</p>
            </div>
            <button
              onClick={() => handleSelect("bottom-navigation")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <BottomNavigationDemo />
        </div>

        {/* DEMO 8: Stepper */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">8. Stepper (Validation Wizard)</h3>
              <p className="text-xs text-slate-400">Step validation gating, clickable previous steps, and error triggers.</p>
            </div>
            <button
              onClick={() => handleSelect("stepper")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <StepperDemo />
        </div>

        {/* DEMO 9: Menu */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">9. Menu (Standalone &amp; Submenus)</h3>
              <p className="text-xs text-slate-400">Keyboard arrow navigation, action shortcuts, separators, and nested flyouts.</p>
            </div>
            <button
              onClick={() => handleSelect("menu")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <MenuDemo />
        </div>

        {/* DEMO 10: Dropdown Menu */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">10. Dropdown Menu (Anchored Popup)</h3>
              <p className="text-xs text-slate-400">Placement options, click-outside-to-close, and escape key handling.</p>
            </div>
            <button
              onClick={() => handleSelect("dropdown-menu")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <DropdownMenuDemo />
        </div>

        {/* DEMO 11: Mega Menu */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">11. Mega Menu (Multi-Column Disclosure)</h3>
              <p className="text-xs text-slate-400">Category columns, rich item descriptions, and featured product highlights.</p>
            </div>
            <button
              onClick={() => handleSelect("mega-menu")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <MegaMenuDemo />
        </div>

        {/* DEMO 12: Context Menu */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">12. Context Menu (Cursor-Anchored Actions)</h3>
              <p className="text-xs text-slate-400">Local right-click prevention with automatic viewport boundary clamping.</p>
            </div>
            <button
              onClick={() => handleSelect("context-menu")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <ContextMenuDemo />
        </div>

        {/* DEMO 13: Command Palette */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">13. Command Palette (⌘K Spotlight)</h3>
              <p className="text-xs text-slate-400">Global keyboard shortcuts, categorized search results, and instant route execution.</p>
            </div>
            <button
              onClick={() => handleSelect("command-palette")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <CommandPaletteDemo />
        </div>

        {/* DEMO 14: Navigation Drawer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">14. Navigation Drawer (Overlay Sliding Panel)</h3>
              <p className="text-xs text-slate-400">Left and right sliding drawers leveraging the existing TemplateHub Overlay system.</p>
            </div>
            <button
              onClick={() => handleSelect("navigation-drawer")}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View API &amp; Code →
            </button>
          </div>
          <NavigationDrawerDemo />
        </div>
      </section>
      </>
      )}
    </div>
  );
}
