import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Blocks,
  FolderPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Atom,
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Home", id: "dashboard" },
  { icon: Package, label: "Components", id: "components" },
  { icon: Blocks, label: "Categories", id: "categories" },
  { icon: FolderPlus, label: "Documentation", id: "docs" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar({
  onNavigate,
  currentPage = "dashboard",
  isCollapsed,
  setIsCollapsed,
}) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col justify-between bg-[#0b0f19] border-r border-slate-800/80 p-3 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-60"
      }`}
    >
      <div>
        {/* Top: Logo inside Sidebar (as in UI Image) */}
        <div
          className={`flex items-center gap-3 px-2 py-4 border-b border-slate-800/50 mb-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <Atom className="w-7 h-7 text-indigo-500 shrink-0" />
          {!isCollapsed && (
            <span className="font-bold text-lg text-white tracking-tight truncate">
              ReactUI Hub
            </span>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isCollapsed ? "justify-center px-0" : ""
                } ${
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

      {/* Bottom Section */}
      <div className="space-y-3 shrink-0">
        {/* Promo Card */}
        {!isCollapsed && (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-900/40 border border-slate-800/80 relative overflow-hidden">
            <Sparkles className="w-4 h-4 text-indigo-400 mb-1.5" />
            <p className="text-xs font-semibold text-white leading-snug mb-0.5">
              Speed up your development
            </p>
            <p className="text-[11px] text-slate-400 mb-2.5">
              Install VS Code Extension
            </p>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 text-white text-xs font-medium py-1.5 rounded-lg transition-all duration-200 shadow-sm shadow-indigo-500/20">
              Install Now
            </button>
          </div>
        )}

        {/* Collapse Switcher */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg border border-slate-800/80 hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {!isCollapsed && (
            <p className="text-[10px] text-slate-500 text-center">
              © 2025 ReactUI Hub. All rights reserved.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
