import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Blocks,
  FolderPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Templates", id: "templates" },
  { icon: Blocks, label: "Components", id: "components" },
  { icon: FolderPlus, label: "Create Project", id: "create" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const pageMap = {
  dashboard: "dashboard",
  templates: "dashboard",
  components: "dashboard",
  create:     "create-project",
  settings:   "dashboard",
};

export default function Sidebar({ onNavigate, currentPage }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeItem = Object.entries(pageMap).find(([, v]) => v === currentPage)?.[0] || "dashboard";

  const handleClick = (id) => {
    if (onNavigate) onNavigate(pageMap[id] || "dashboard");
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-sidebar"
      } flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)]`}
    >
      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </aside>
  );
}
