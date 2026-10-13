import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  OverlayPortal,
  OverlayBackdrop,
  OVERLAY_Z_INDEX,
} from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";

/**
 * Reusable NavigationDrawer component
 * Sliding drawer using the existing TemplateHub Overlay system
 */
export default function NavigationDrawer({
  open = false,
  onClose,
  position = "left", // "left" | "right"
  title = "Navigation Drawer",
  items = [
    { id: "dash", label: "Dashboard Overview", href: "#", icon: null },
    {
      id: "components",
      label: "UI Components",
      children: [
        { id: "nav-comp", label: "Navigation & States", href: "#" },
        { id: "form-comp", label: "Forms & Controls", href: "#" },
        { id: "btn-comp", label: "Buttons System", href: "#" },
      ],
    },
    { id: "analytics", label: "Analytics & Logs", href: "#", icon: null },
    { id: "settings", label: "System Preferences", href: "#", icon: null },
  ],
  activeId = "nav-comp",
  onItemSelect = null,
  closeOnSelect = true,
  footer = null,
  className = "",
}) {
  const [expandedItems, setExpandedItems] = useState({ components: true });

  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    lockBodyScroll: true,
    trapFocus: true,
  });

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (item) => {
    if (onItemSelect) onItemSelect(item);
    if (closeOnSelect && onClose) {
      onClose();
    }
  };

  if (!open) return null;

  const isLeft = position === "left";

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.drawer} flex ${
          isLeft ? "justify-start" : "justify-end"
        }`}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <OverlayBackdrop opacity="bg-black/75" blur={true} />

        <div
          ref={containerRef}
          className={`relative w-full max-w-xs sm:max-w-sm h-full bg-slate-900 border-slate-800 text-slate-200 shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-out animate-in ${
            isLeft
              ? "border-r slide-in-from-left"
              : "border-l slide-in-from-right"
          } ${className}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
            <h2 className="text-sm font-bold text-white tracking-tight">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close navigation drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = !!expandedItems[item.id];
              const isActive = activeId === item.id;

              return (
                <div key={item.id} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.id);
                      } else {
                        handleSelect(item);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive && !hasChildren
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {Icon && <Icon className="w-4 h-4 text-slate-400" />}
                      <span className="truncate">{item.label}</span>
                    </div>

                    {hasChildren && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Nested child items */}
                  {hasChildren && isExpanded && (
                    <div className="pl-4 ml-3 border-l border-slate-800 space-y-1 py-1">
                      {item.children.map((child) => {
                        const isChildActive = activeId === child.id;
                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => handleSelect(child)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                              isChildActive
                                ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            }`}
                          >
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40">
            {footer || (
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>TemplateHub Drawer</span>
                <span className="font-mono text-[10px]">v1.0.0</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}
