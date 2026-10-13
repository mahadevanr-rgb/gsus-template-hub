import { useState, useEffect, useRef } from "react";
import {
  Search,
  LayoutGrid,
  MousePointerClick,
  CreditCard,
  FormInput,
  FolderUp,
  Compass,
  Moon,
  Sun,
  Layers,
  Sparkles,
  ArrowRight,
  Command,
} from "lucide-react";
import { OverlayPortal, OverlayBackdrop, OVERLAY_Z_INDEX } from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

const defaultNavigationCommands = [
  {
    group: "Navigation Destinations",
    items: [
      { id: "cmd-nav-home", label: "Dashboard Overview", description: "Return to TemplateHub home", icon: LayoutGrid, path: "/" },
      { id: "cmd-nav-nav", label: "Navigation Module", description: "14 Navbar, Menu & Stepper patterns", icon: Compass, path: "/navigation" },
      { id: "cmd-nav-buttons", label: "Buttons Collection", description: "Interactive buttons and micro-states", icon: MousePointerClick, path: "/buttons" },
      { id: "cmd-nav-cards", label: "Cards Catalog", description: "KPI, Profile, Invoice and Task cards", icon: CreditCard, path: "/cards" },
      { id: "cmd-nav-forms", label: "Forms & Controls", description: "Inputs, textareas, toggles and OTP", icon: FormInput, path: "/forms" },
      { id: "cmd-nav-files", label: "File System & Upload", description: "Dropzones, batch queues and crop", icon: FolderUp, path: "/file-system" },
      { id: "cmd-nav-modals", label: "Modal & Overlay System", description: "Drawers, alerts, tooltips and dialogs", icon: Layers, path: "/modal-overlay" },
    ],
  },
  {
    group: "System & Theme Actions",
    items: [
      { id: "cmd-theme", label: "Toggle Dark / Light Theme", description: "Switch application theme mode", icon: Moon, action: "toggle-theme" },
      { id: "cmd-docs", label: "View GitHub Repository", description: "Open TemplateHub open source repo", icon: Command, action: "github" },
    ],
  },
];

/**
 * Reusable CommandPalette component
 * Global keyboard launcher with shortcut detection, query filtering, and arrow key execution
 */
export default function CommandPalette({
  open = false,
  onOpenChange = null,
  onClose = null,
  commands = defaultNavigationCommands,
  hotkey = "k", // Key to trigger with metaKey/ctrlKey
  placeholder = "Type a command or search categories...",
  onExecute = null,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  // Global hotkey listener (ignores active inputs/textareas)
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        const activeTag = document.activeElement?.tagName;
        const isEditable = document.activeElement?.isContentEditable;
        if (activeTag === "INPUT" || activeTag === "TEXTAREA" || isEditable) {
          return;
        }
        e.preventDefault();
        if (onOpenChange) {
          onOpenChange(!open);
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [hotkey, open, onOpenChange]);

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
  const flatItems = [];
  const filteredGroups = commands
    .map((group) => {
      const matched = group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      );
      matched.forEach((item) => flatItems.push(item));
      return { ...group, items: matched };
    })
    .filter((group) => group.items.length > 0);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (flatItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = flatItems[selectedIndex];
        if (selected && !selected.disabled) {
          runCommand(selected);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, flatItems, selectedIndex]);

  const runCommand = (item) => {
    handleClose();

    if (item.path) {
      navigate(item.path);
    } else if (item.action === "toggle-theme") {
      toggleTheme();
    } else if (item.action === "github") {
      window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank");
    } else if (onExecute) {
      onExecute(item);
    }
  };

  if (!open) return null;

  let itemCounter = 0;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.commandMenu} flex items-start justify-center p-4 pt-16 sm:pt-24`}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <OverlayBackdrop opacity="bg-black/80" />

        <div
          ref={containerRef}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900 text-slate-200 shadow-2xl shadow-black/90 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Input */}
          <div className="flex items-center px-5 py-4 border-b border-slate-800 bg-slate-950/70">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-lg bg-slate-800"
              >
                Clear
              </button>
            ) : (
              <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                ESC
              </span>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-4">
            {filteredGroups.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-400">No matching commands found.</p>
                <p>Try searching for "navigation", "buttons", "cards", or "theme".</p>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.group} className="space-y-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {group.group}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon || Sparkles;
                      const itemIndex = itemCounter++;
                      const isSelected = selectedIndex === itemIndex;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={item.disabled}
                          onClick={() => runCommand(item)}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs transition-colors ${
                            item.disabled
                              ? "opacity-40 cursor-not-allowed"
                              : isSelected
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`p-2 rounded-xl shrink-0 ${
                                isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-indigo-400"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left min-w-0">
                              <p className="font-semibold truncate">{item.label}</p>
                              {item.description && (
                                <p
                                  className={`text-[11px] truncate mt-0.5 ${
                                    isSelected ? "text-indigo-200" : "text-slate-500"
                                  }`}
                                >
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.path && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                                  isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {item.path}
                              </span>
                            )}
                            <ArrowRight
                              className={`w-4 h-4 transition-transform ${
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

          {/* Footer Controls Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↓
                </kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400">
                  ↵
                </kbd>
                <span>Execute</span>
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <span>TemplateHub Command Engine</span>
            </span>
          </div>
        </div>
      </div>
    </OverlayPortal>
  );
}
