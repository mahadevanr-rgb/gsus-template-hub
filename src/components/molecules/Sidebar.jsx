import { useNavigate } from "react-router-dom";
import {
  LayoutGrid, MousePointerClick, FormInput, Bell, Monitor,
  ChevronLeft, ChevronRight, Atom, GitFork, ShoppingBag, Package,
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid,        label: "Home",          path: "/" },
  { icon: MousePointerClick, label: "Buttons",       path: "/buttons" },
  { icon: FormInput,         label: "Forms",         path: "/forms" },
  { icon: Bell,              label: "Notifications", path: "/notifications" },
  { icon: Monitor,           label: "Data Display",  path: "/data-display" },
  { icon: ShoppingBag,       label: "Ecommerce",     path: "/ecommerce" },
  { icon: Package,           label: "Inventory",     path: "/inventory" },
];

export default function Sidebar({ currentPage, isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside className={`fixed left-0 top-0 h-screen z-40 flex flex-col justify-between bg-[#0b0f19] border-r border-slate-800/80 p-3 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-60"}`}>
      <div>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-2 py-4 border-b border-slate-800/50 mb-3 ${isCollapsed ? "justify-center" : ""}`}>
          <Atom className="w-7 h-7 text-indigo-500 shrink-0" />
          {!isCollapsed && <span className="font-bold text-lg text-white tracking-tight truncate">TemplateHub</span>}
        </div>

        {/* Nav */}
        <nav className="space-y-1">
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

      {/* Bottom */}
      <div className="space-y-3 shrink-0">
        {!isCollapsed && (
          <a
            href="https://github.com/mahadevanr-rgb/gsus-template-hub"
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all duration-200"
          >
            <GitFork className="w-5 h-5 shrink-0" />
            <span className="truncate">View on GitHub</span>
          </a>
        )}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg border border-slate-800/80 hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          {!isCollapsed && <p className="text-[10px] text-slate-500 text-center">© 2025 TemplateHub</p>}
        </div>
      </div>
    </aside>
  );
}
