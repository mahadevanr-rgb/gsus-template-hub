import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from "lucide-react";

/**
 * Reusable Sidebar component
 * Data-driven with expandable groups, badges, collapsible states, collapsed tooltips, and nested submenus
 */
export default function Sidebar({
  brand = { name: "Console App", logo: null },
  groups = [
    {
      title: "Core Platform",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: null, badge: "New" },
        {
          id: "analytics",
          label: "Analytics",
          icon: null,
          children: [
            { id: "realtime", label: "Realtime Feeds", href: "/analytics/realtime" },
            { id: "reports", label: "Monthly Reports", href: "/analytics/reports" },
            { id: "funnels", label: "Conversion Funnels", href: "/analytics/funnels" },
          ],
        },
        { id: "projects", label: "Projects", href: "/projects", icon: null, badge: 12 },
      ],
    },
    {
      title: "Workspace",
      items: [
        { id: "team", label: "Team Members", href: "/team", icon: null },
        { id: "settings", label: "Settings", href: "/settings", icon: null },
      ],
    },
  ],
  activeId = "dashboard",
  collapsed = false,
  onCollapseToggle = null,
  onItemSelect = null,
  footerActions = null,
  className = "",
}) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [expandedGroups, setExpandedGroups] = useState({ analytics: true });

  const effectiveCollapsed = onCollapseToggle ? collapsed : isCollapsed;

  const toggleGroup = (itemId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleToggle = () => {
    if (onCollapseToggle) {
      onCollapseToggle(!collapsed);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <aside
      className={`relative flex flex-col justify-between bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out select-none ${
        effectiveCollapsed ? "w-20" : "w-64"
      } ${className}`}
    >
      {/* Top Brand Header */}
      <div>
        <div
          className={`flex items-center gap-3 p-4 border-b border-slate-800/80 ${
            effectiveCollapsed ? "justify-center px-0" : ""
          }`}
        >
          {brand.logo || (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-600/30 shrink-0">
              {brand.name ? brand.name.charAt(0) : "T"}
            </div>
          )}
          {!effectiveCollapsed && (
            <span className="font-bold text-base text-white tracking-tight truncate">
              {brand.name}
            </span>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!effectiveCollapsed && group.title && (
                <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {group.title}
                </p>
              )}

              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren = item.children && item.children.length > 0;
                  const isItemExpanded = !!expandedGroups[item.id];
                  const isParentActive =
                    activeId === item.id ||
                    (hasChildren && item.children.some((c) => c.id === activeId));

                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (hasChildren) {
                            toggleGroup(item.id);
                          } else if (onItemSelect) {
                            onItemSelect(item);
                          }
                        }}
                        title={effectiveCollapsed ? item.label : undefined}
                        className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          effectiveCollapsed ? "justify-center px-0" : ""
                        } ${
                          isParentActive && !hasChildren
                            ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/20"
                            : isParentActive && hasChildren
                            ? "bg-slate-800/80 text-white font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {Icon && <Icon className="w-4 h-4 shrink-0" />}
                          {!effectiveCollapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>

                        {!effectiveCollapsed && (
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                {item.badge}
                              </span>
                            )}
                            {hasChildren && (
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                                  isItemExpanded ? "rotate-180 text-slate-300" : ""
                                }`}
                              />
                            )}
                          </div>
                        )}

                        {/* Collapsed Tooltip */}
                        {effectiveCollapsed && (
                          <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-950 text-white text-xs rounded-lg shadow-xl border border-slate-800 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                            {item.label}
                          </div>
                        )}
                      </button>

                      {/* Nested Children */}
                      {!effectiveCollapsed && hasChildren && isItemExpanded && (
                        <div className="pl-4 ml-3 border-l border-slate-800 space-y-1 pt-1 pb-1">
                          {item.children.map((child) => {
                            const isChildActive = activeId === child.id;
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => onItemSelect && onItemSelect(child)}
                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                  isChildActive
                                    ? "bg-indigo-600 text-white font-medium shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                }`}
                              >
                                <span className="truncate">{child.label}</span>
                                {child.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                    {child.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls & Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        {footerActions || (
          <div className="space-y-1">
            <button
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors ${
                effectiveCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              {!effectiveCollapsed && <span>Support & Docs</span>}
            </button>
            <button
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-colors ${
                effectiveCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!effectiveCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        )}

        {/* Collapse Trigger Button */}
        <button
          type="button"
          onClick={handleToggle}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors ${
            effectiveCollapsed ? "justify-center px-0" : ""
          }`}
          aria-label={effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {effectiveCollapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
