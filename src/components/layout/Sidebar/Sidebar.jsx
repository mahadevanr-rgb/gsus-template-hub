import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  MousePointerClick,
  FormInput,
  Bell,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Atom,
  GitFork,
  Combine,
  CreditCard,
  Search,
  ListCollapse,
  PanelsTopLeft,
  Layers,
  FolderUp,
  Compass,
  Palette,
  Table2,
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Home", path: "/" },
  { icon: MousePointerClick, label: "Buttons", path: "/buttons" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: FormInput, label: "Forms", path: "/forms" },
  { icon: Combine, label: "Form Compositions", path: "/form-compositions" },
  { icon: PanelsTopLeft, label: "Layout Module", path: "/layouts" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Monitor, label: "Data Display", path: "/data-display" },
  { icon: Table2, label: "Tables & Dashboards", path: "/tables-dashboard" },
  { icon: ListCollapse, label: "Accordion", path: "/accordion" },

  { icon: Layers, label: "Modal & Overlay", path: "/modal-overlay" },
  { icon: FolderUp, label: "File System", path: "/file-system" },
  { icon: Compass, label: "Navigation", path: "/navigation" },

  { icon: Search, label: "Selection & Search", path: "/selection-search" },
  { icon: Palette, label: "Design System", path: "/design-system" },
];

export default function Sidebar({ currentPage, isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col justify-between bg-[#0b0f19] border-r border-slate-800/80 p-3 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-60"}`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-2 py-4 border-b border-slate-800/50 mb-3 shrink-0 ${isCollapsed ? "justify-center" : ""}`}
        >
          <Atom className="w-7 h-7 text-indigo-500 shrink-0" />
          {!isCollapsed && (
            <span className="font-bold text-lg text-white tracking-tight truncate">
              TemplateHub
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto min-h-0 space-y-1 pr-1 overscroll-contain [scrollbar-width:thin] [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const id = item.path === "/" ? "dashboard" : item.path.slice(1);
            const isActive = currentPage === id;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isCollapsed ? "justify-center px-0" : ""} ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/25 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800/50 shrink-0">
        {/* GitHub link button */}
        <a
          href="https://github.com/mahadevanr-rgb/gsus-template-hub"
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors ${isCollapsed ? "justify-center px-0" : ""}`}
          title={isCollapsed ? "View on GitHub" : undefined}
        >
          <GitFork className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="truncate">GitHub Repository</span>}
        </a>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-800/60 hover:text-slate-300 transition-colors ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span>Collapse sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
