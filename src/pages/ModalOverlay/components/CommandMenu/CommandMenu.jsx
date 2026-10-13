import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  LayoutGrid,
  MousePointerClick,
  CreditCard,
  FormInput,
  PanelsTopLeft,
  Bell,
  Monitor,
  ListCollapse,
  Layers,
  FolderUp,
  Compass,
  Moon,
  Sun,
  Download,
  FolderPlus,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  OverlayPortal,
  OverlayBackdrop,
  OVERLAY_Z_INDEX,
} from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";

const defaultCommands = [
  {
    group: "Navigation",
    items: [
      { id: "nav-home", label: "Go to Dashboard", icon: LayoutGrid, path: "/" },
      { id: "nav-navigation", label: "Navigation & States", icon: Compass, path: "/navigation" },
      { id: "nav-buttons", label: "Browse Buttons", icon: MousePointerClick, path: "/buttons" },
      { id: "nav-cards", label: "Browse Cards", icon: CreditCard, path: "/cards" },
      { id: "nav-forms", label: "Browse Forms", icon: FormInput, path: "/forms" },
      { id: "nav-layouts", label: "Explore Layouts", icon: PanelsTopLeft, path: "/layouts" },
      { id: "nav-notifications", label: "View Notifications", icon: Bell, path: "/notifications" },
      { id: "nav-data-display", label: "View Data Display", icon: Monitor, path: "/data-display" },
      { id: "nav-accordion", label: "View Accordions", icon: ListCollapse, path: "/accordion" },
      { id: "nav-modal-overlay", label: "Modal & Overlay System", icon: Layers, path: "/modal-overlay" },
      { id: "nav-file-system", label: "File System & Upload", icon: FolderUp, path: "/file-system" },
    ],
  },
  {
    group: "Components & Overlays",
    items: [
      { id: "comp-modal", label: "Open Basic Modal", icon: Layers, action: "modal" },
      { id: "comp-dialog", label: "Open Form Dialog", icon: FormInput, action: "form-modal" },
      { id: "comp-drawer", label: "Open Right Drawer", icon: PanelsTopLeft, action: "drawer" },
      { id: "comp-alert", label: "Trigger Alert Dialog", icon: Bell, action: "alert" },
      { id: "comp-confirm", label: "Trigger Delete Confirmation", icon: Bell, action: "confirm" },
    ],
  },
  {
    group: "Quick Actions",
    items: [
      { id: "act-theme", label: "Toggle Dark / Light Theme", icon: Moon, action: "toggle-theme" },
      { id: "act-create", label: "Create New Project", icon: FolderPlus, action: "create-project" },
      { id: "act-export", label: "Export All Registry Components", icon: Download, action: "export" },
    ],
  },
];

export default function CommandMenu({
  open = false,
  onOpenChange,
  onClose,
  onAction,
  commands = defaultCommands,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
    setQuery("");
    setSelectedIndex(0);
  };

  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose: handleClose,
    closeOnEscape: true,
    closeOnOutsideClick: true,
  });

  // Filter commands
  const flatFilteredItems = [];
  const filteredGroups = commands
    .map((group) => {
      const matchedItems = group.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      matchedItems.forEach((item) => flatFilteredItems.push(item));
      return { ...group, items: matchedItems };
    })
    .filter((group) => group.items.length > 0);

  // Focus input upon opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (flatFilteredItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatFilteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatFilteredItems.length) % flatFilteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = flatFilteredItems[selectedIndex];
        if (selected) {
          executeCommand(selected);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, flatFilteredItems, selectedIndex]);

  const executeCommand = (item) => {
    handleClose();

    if (item.path) {
      navigate(item.path);
    } else if (item.action === "toggle-theme") {
      toggleTheme();
    } else if (onAction) {
      onAction(item);
    }
  };

  if (!open) return null;

  let currentItemCounter = 0;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.commandMenu} flex items-start justify-center p-4 pt-16 sm:pt-24`}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
      >
        <OverlayBackdrop opacity="bg-black/80" />

        <div
          ref={containerRef}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900 text-slate-200 shadow-2xl shadow-black/90 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 bg-slate-950/60">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search commands, components, pages... (Type to filter)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-300 px-2 py-0.5 rounded-lg bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Command List Body */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-4">
            {filteredGroups.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-400">No matching commands found.</p>
                <p>Try searching for "buttons", "modal", "theme", or "cards".</p>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.group} className="space-y-1">
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {group.group}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon || Sparkles;
                      const itemIndex = currentItemCounter++;
                      const isSelected = selectedIndex === itemIndex;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => executeCommand(item)}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                            isSelected
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-1.5 rounded-lg ${
                                isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-indigo-400"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="truncate">{item.label}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.path && (
                              <span
                                className={`text-[10px] font-mono ${
                                  isSelected ? "text-indigo-200" : "text-slate-500"
                                }`}
                              >
                                {item.path}
                              </span>
                            )}
                            <ArrowRight
                              className={`w-3.5 h-3.5 transition-transform ${
                                isSelected ? "translate-x-0.5 text-white" : "text-slate-600"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Shortcut Legend */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↓
                </kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↵
                </kbd>
                <span>Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                ESC
              </kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}
