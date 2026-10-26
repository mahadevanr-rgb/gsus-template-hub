import React, { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  HelpCircle,
  Trash2,
  ArrowRight,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Command,
  Sliders,
  Send,
  Loader2,
} from "lucide-react";
import { getShadowValue } from "../modalOverlayCustomizationUtils";

export default function OverlayLiveRenderer({
  config,
  isOpen,
  onClose,
  onOpen,
  viewport = "desktop",
}) {
  const [nestedOpen, setNestedOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({});

  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  const colors = config?.colors || {};
  const border = config?.border || {};
  const typography = config?.typography || {};
  const dimensions = config?.dimensions || {};
  const backdrop = config?.backdrop || {};
  const buttons = config?.buttons || {};
  const interaction = config?.interaction || {};
  const animation = config?.animation || {};
  const content = config?.content || {};
  const pattern = config?.pattern || config?.sourceComponentId || "basic-modal";

  // Reset states on pattern change
  useEffect(() => {
    setCurrentStep(1);
    setNestedOpen(false);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setSelectedMenuItem(null);
  }, [pattern, config?.id]);

  // Handle ESC dismissal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && interaction.closeOnEsc !== false) {
        if (nestedOpen) {
          setNestedOpen(false);
          e.stopPropagation();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nestedOpen, interaction.closeOnEsc, onClose]);

  // Handle Backdrop Click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop.closeOnBackdropClick !== false) {
      onClose();
    }
  };

  // Shadow calculation
  const shadowValue = getShadowValue(border.shadowIntensity || "lg", border.shadowColor || "rgba(0,0,0,0.2)");

  // Icon mapping
  const renderIcon = (iconName, size = 20, color = colors.primaryBtnBg || "#3b82f6") => {
    switch (iconName) {
      case "check-circle":
        return <CheckCircle2 size={size} color={colors.success || "#10b981"} />;
      case "alert-triangle":
        return <AlertTriangle size={size} color={colors.warning || "#f59e0b"} />;
      case "shield-alert":
      case "trash":
        return <Trash2 size={size} color={colors.danger || "#ef4444"} />;
      case "help-circle":
        return <HelpCircle size={size} color={color} />;
      case "sliders":
        return <Sliders size={size} color={color} />;
      case "command":
        return <Command size={size} color={color} />;
      case "sparkles":
        return <Sparkles size={size} color={color} />;
      case "info":
      default:
        return <Info size={size} color={colors.info || color} />;
    }
  };

  // Form submit simulation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        if (interaction.closeOnSubmit !== false) {
          onClose();
        }
      }, 1500);
    }, 1000);
  };

  // Helper trigger button in canvas
  const renderTestTrigger = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 text-indigo-500">
        <Sparkles size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
        {config.title || "Overlay Ready for Testing"}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        Click below to simulate real trigger invocation with current styles, animations, and behaviors.
      </p>
      <button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        className="px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        style={{
          backgroundColor: colors.primaryBtnBg || "#4f46e5",
          color: colors.primaryBtnText || "#ffffff",
          borderRadius: `${border.radius || 12}px`,
        }}
      >
        <span>Open {config.name || "Overlay"}</span>
        <ArrowRight size={16} />
      </button>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        {interaction.closeOnEsc !== false ? "Press ESC or click backdrop to close" : "Backdrop & ESC dismissal disabled"}
      </p>
    </div>
  );

  if (!isOpen) {
    return renderTestTrigger();
  }

  // Common wrapper styles
  const overlayStyle = {
    backgroundColor: colors.surfaceBg || "#ffffff",
    color: colors.textPrimary || "#0f172a",
    borderRadius: `${border.radius || 16}px`,
    borderWidth: `${border.width ?? 1}px`,
    borderStyle: border.style || "solid",
    borderColor: border.color || "#e2e8f0",
    boxShadow: shadowValue,
    fontFamily: typography.fontFamily || "Inter, sans-serif",
    transition: animation.enabled ? `all ${animation.duration || 250}ms ${animation.easing || "cubic-bezier(0.16, 1, 0.3, 1)"}` : "none",
  };

  // 1. DRAWER / SLIDING PANEL RENDERER
  if (pattern === "drawer-panel") {
    const position = dimensions.drawerPosition || "right";
    const isHorizontal = position === "left" || position === "right";
    const drawerSize = dimensions.drawerSize || "420px";

    const positionClasses = {
      right: "right-0 top-0 bottom-0 h-full",
      left: "left-0 top-0 bottom-0 h-full",
      top: "top-0 left-0 right-0 w-full",
      bottom: "bottom-0 left-0 right-0 w-full",
    }[position];

    return (
      <div
        className="fixed inset-0 z-50 flex"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdrop.enabled !== false ? (backdrop.color || "rgba(15, 23, 42, 0.65)") : "transparent",
          backdropFilter: backdrop.blur ? `blur(${backdrop.blurAmount || 4}px)` : "none",
        }}
      >
        <div
          ref={overlayRef}
          className={`absolute flex flex-col ${positionClasses}`}
          style={{
            ...overlayStyle,
            width: isHorizontal ? (viewport === "mobile" ? "100%" : drawerSize) : "100%",
            height: !isHorizontal ? drawerSize : "100%",
            borderRadius: position === "right" ? `${border.radius}px 0 0 ${border.radius}px` : position === "left" ? `0 ${border.radius}px ${border.radius}px 0` : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{
              backgroundColor: colors.headerBg || colors.surfaceBg || "#ffffff",
              borderColor: border.color || "#e2e8f0",
            }}
          >
            <div className="flex items-center gap-3">
              {content.icon && renderIcon(content.icon, 22)}
              <div>
                <h3 className="font-bold text-base leading-tight" style={{ color: colors.textPrimary }}>
                  {content.title || "Side Drawer Panel"}
                </h3>
                {content.description && (
                  <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                    {content.description}
                  </p>
                )}
              </div>
            </div>
            {interaction.showCloseBtn !== false && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                style={{ color: colors.closeIconColor || colors.textSecondary }}
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
              {content.body || "Customize and inspect real-time content changes inside this drawer panel."}
            </p>

            <div className="p-4 rounded-xl border space-y-2" style={{ borderColor: border.color, backgroundColor: colors.headerBg }}>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                Quick Panel Settings
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b" style={{ borderColor: border.color }}>
                <span>Position</span>
                <span className="font-semibold capitalize text-indigo-500">{position}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b" style={{ borderColor: border.color }}>
                <span>Backdrop Blur</span>
                <span className="font-semibold">{backdrop.blur ? `${backdrop.blurAmount || 4}px` : "Disabled"}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1">
                <span>Esc Dismissal</span>
                <span className="font-semibold">{interaction.closeOnEsc !== false ? "Enabled" : "Locked"}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNestedOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                borderColor: border.color,
                color: colors.textPrimary,
                backgroundColor: colors.headerBg,
              }}
            >
              <span>Test Stacked Modal</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0"
            style={{
              backgroundColor: colors.footerBg || colors.surfaceBg || "#ffffff",
              borderColor: border.color || "#e2e8f0",
            }}
          >
            {buttons.showSecondary !== false && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium border hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: colors.secondaryBtnBg || "#f1f5f9",
                  color: colors.secondaryBtnText || "#475569",
                  borderColor: border.color,
                }}
              >
                {buttons.secondaryLabel || "Close"}
              </button>
            )}
            {buttons.showPrimary !== false && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-95 transition-opacity"
                style={{
                  backgroundColor: colors.primaryBtnBg || "#4f46e5",
                  color: colors.primaryBtnText || "#ffffff",
                }}
              >
                {buttons.primaryLabel || "Save Changes"}
              </button>
            )}
          </div>
        </div>

        {/* Stacked child dialog if triggered */}
        {nestedOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
              className="max-w-md w-full p-6 rounded-2xl border shadow-2xl relative"
              style={{
                backgroundColor: colors.surfaceBg,
                color: colors.textPrimary,
                borderColor: border.color,
              }}
            >
              <h4 className="font-bold text-base mb-2">Nested Confirmation</h4>
              <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                This verifies overlay stacking, keyboard isolation, and focus priority.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNestedOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: colors.primaryBtnBg, color: colors.primaryBtnText }}
                >
                  Return to Drawer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. COMMAND PALETTE RENDERER
  if (pattern === "command-palette") {
    const items = content.menuItems || [
      { id: "1", label: "Create New Project", shortcut: "⌘N", icon: "sparkles" },
      { id: "2", label: "Open Settings", shortcut: "⌘,", icon: "sliders" },
      { id: "3", label: "Export Code Bundle", shortcut: "⌘E", icon: "arrow-right" },
      { id: "4", label: "Toggle Dark Theme", shortcut: "⌘D", icon: "sparkles" },
      { id: "5", label: "Delete Cache", shortcut: "⌘⌫", icon: "trash" },
    ];

    const filteredItems = items.filter((it) =>
      it.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdrop.enabled !== false ? (backdrop.color || "rgba(15, 23, 42, 0.65)") : "transparent",
          backdropFilter: backdrop.blur ? `blur(${backdrop.blurAmount || 4}px)` : "none",
        }}
      >
        <div
          ref={overlayRef}
          className="w-full max-w-xl overflow-hidden"
          style={{
            ...overlayStyle,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Bar Input */}
          <div
            className="flex items-center px-4 py-3.5 border-b gap-3"
            style={{ borderColor: border.color, backgroundColor: colors.headerBg }}
          >
            <Search size={20} style={{ color: colors.textSecondary }} />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={content.searchPlaceholder || "Type a command or search..."}
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-slate-400"
              style={{ color: colors.textPrimary }}
            />
            {interaction.showCloseBtn !== false && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-xs px-2"
                style={{ color: colors.textSecondary, border: `1px solid ${border.color}` }}
              >
                ESC
              </button>
            )}
          </div>

          {/* Results list */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1">
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>
              Suggestions
            </div>
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedMenuItem(item.id);
                  if (interaction.closeOnSelect !== false) onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors"
                style={{
                  backgroundColor: selectedMenuItem === item.id ? (colors.accent || "#4f46e5") : "transparent",
                  color: selectedMenuItem === item.id ? "#ffffff" : colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  if (selectedMenuItem !== item.id) e.currentTarget.style.backgroundColor = colors.hoverBg || "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (selectedMenuItem !== item.id) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-center gap-3">
                  {renderIcon(item.icon || "command", 16)}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      backgroundColor: "rgba(100,116,139,0.15)",
                      color: selectedMenuItem === item.id ? "#ffffff" : colors.textSecondary,
                    }}
                  >
                    {item.shortcut}
                  </span>
                )}
              </button>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-sm" style={{ color: colors.textSecondary }}>
                No matching actions found.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t text-xs"
            style={{ backgroundColor: colors.footerBg, borderColor: border.color, color: colors.textSecondary }}
          >
            <span>Navigation: ↑ ↓ Enter</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. POPOVER & CONTEXT MENU RENDERER
  if (pattern === "popover-flyout" || pattern === "context-menu" || pattern === "dropdown-overlay") {
    const items = content.menuItems || [
      { id: "1", label: "Edit Item", icon: "sliders" },
      { id: "2", label: "Duplicate Entry", icon: "sparkles" },
      { id: "3", label: "Share Link", icon: "arrow-right" },
      { id: "4", label: "Delete Record", icon: "trash", danger: true },
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdrop.enabled ? (backdrop.color || "rgba(15, 23, 42, 0.4)") : "transparent",
        }}
      >
        <div
          ref={overlayRef}
          className="w-full max-w-xs overflow-hidden"
          style={{
            ...overlayStyle,
            maxWidth: dimensions.maxWidth || "320px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {content.title && (
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ backgroundColor: colors.headerBg, borderColor: border.color }}
            >
              <span className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                {content.title}
              </span>
              {interaction.showCloseBtn && (
                <button type="button" onClick={onClose} style={{ color: colors.closeIconColor || colors.textSecondary }}>
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          <div className="p-2 space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedMenuItem(item.id);
                  if (interaction.closeOnSelect !== false) onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors"
                style={{
                  color: item.danger ? (colors.danger || "#ef4444") : colors.textPrimary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverBg || "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {renderIcon(item.icon, 16, item.danger ? colors.danger : colors.textSecondary)}
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. MULTI-STEP WIZARD DIALOG
  if (pattern === "multi-step-dialog") {
    const totalSteps = 3;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdrop.enabled !== false ? (backdrop.color || "rgba(15, 23, 42, 0.65)") : "transparent",
          backdropFilter: backdrop.blur ? `blur(${backdrop.blurAmount || 4}px)` : "none",
        }}
      >
        <div
          ref={overlayRef}
          className="w-full overflow-hidden flex flex-col"
          style={{
            ...overlayStyle,
            maxWidth: dimensions.maxWidth || "560px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ backgroundColor: colors.headerBg, borderColor: border.color }}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-0.5">
                Step {currentStep} of {totalSteps}
              </div>
              <h3 className="font-bold text-base" style={{ color: colors.textPrimary }}>
                {currentStep === 1 ? "Account Setup" : currentStep === 2 ? "Preferences & Theme" : "Confirm & Deploy"}
              </h3>
            </div>
            {interaction.showCloseBtn !== false && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{ color: colors.closeIconColor || colors.textSecondary }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Stepper progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 flex">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                backgroundColor: colors.primaryBtnBg || "#4f46e5",
              }}
            />
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {currentStep === 1 && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold" style={{ color: colors.textSecondary }}>
                  Workspace Name
                </label>
                <input
                  type="text"
                  defaultValue="Production Alpha"
                  className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
                  style={{
                    backgroundColor: colors.inputBg || colors.surfaceBg,
                    borderColor: border.color,
                    color: colors.textPrimary,
                  }}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold" style={{ color: colors.textSecondary }}>
                  Environment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("cloud")}
                    className={`p-3 rounded-xl border text-sm font-medium text-left ${activeTab === "cloud" ? "ring-2 ring-indigo-500" : ""}`}
                    style={{ borderColor: border.color, backgroundColor: colors.headerBg }}
                  >
                    ☁️ Cloud Managed
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("onprem")}
                    className={`p-3 rounded-xl border text-sm font-medium text-left ${activeTab === "onprem" ? "ring-2 ring-indigo-500" : ""}`}
                    style={{ borderColor: border.color, backgroundColor: colors.headerBg }}
                  >
                    🏢 On-Premises
                  </button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 size={40} className="mx-auto" style={{ color: colors.success || "#10b981" }} />
                <h4 className="font-bold text-base" style={{ color: colors.textPrimary }}>All Set!</h4>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Ready to deploy your customized overlay configuration directly to production.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t"
            style={{ backgroundColor: colors.footerBg, borderColor: border.color }}
          >
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 rounded-lg text-sm font-medium border disabled:opacity-40"
              style={{
                borderColor: border.color,
                color: colors.textSecondary,
                backgroundColor: colors.secondaryBtnBg,
              }}
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
                className="px-5 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: colors.primaryBtnBg, color: colors.primaryBtnText }}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: colors.primaryBtnBg, color: colors.primaryBtnText }}
              >
                Finish & Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 5. FORM MODAL / INPUT OVERLAY
  if (pattern === "form-modal") {
    const fields = content.formFields || [
      { id: "name", label: "Full Name", type: "text", placeholder: "e.g. Alex Morgan", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "alex@example.com", required: true },
      { id: "notes", label: "Project Notes", type: "textarea", placeholder: "Add any special instructions..." },
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdrop.enabled !== false ? (backdrop.color || "rgba(15, 23, 42, 0.65)") : "transparent",
          backdropFilter: backdrop.blur ? `blur(${backdrop.blurAmount || 4}px)` : "none",
        }}
      >
        <div
          ref={overlayRef}
          className="w-full overflow-hidden flex flex-col"
          style={{
            ...overlayStyle,
            maxWidth: dimensions.maxWidth || "520px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ backgroundColor: colors.headerBg, borderColor: border.color }}
          >
            <div className="flex items-center gap-3">
              {content.icon && renderIcon(content.icon, 20)}
              <div>
                <h3 className="font-bold text-base" style={{ color: colors.textPrimary }}>
                  {content.title || "Edit Information"}
                </h3>
                {content.description && (
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {content.description}
                  </p>
                )}
              </div>
            </div>
            {interaction.showCloseBtn !== false && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                style={{ color: colors.closeIconColor || colors.textSecondary }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Form Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col flex-1">
            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              {submitSuccess ? (
                <div className="p-4 rounded-xl flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={24} />
                  <div>
                    <h5 className="font-bold text-sm">Form Submitted Successfully!</h5>
                    <p className="text-xs">Your changes have been saved.</p>
                  </div>
                </div>
              ) : null}

              {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-xs font-semibold" style={{ color: colors.textSecondary }}>
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border outline-none text-sm transition-all focus:ring-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: colors.inputBg || colors.surfaceBg,
                        borderColor: border.color,
                        color: colors.textPrimary,
                        borderRadius: `${border.radius > 8 ? 8 : border.radius}px`,
                      }}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border outline-none text-sm transition-all focus:ring-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: colors.inputBg || colors.surfaceBg,
                        borderColor: border.color,
                        color: colors.textPrimary,
                        borderRadius: `${border.radius > 8 ? 8 : border.radius}px`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4 border-t"
              style={{ backgroundColor: colors.footerBg, borderColor: border.color }}
            >
              {buttons.showSecondary !== false && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium border"
                  style={{
                    backgroundColor: colors.secondaryBtnBg,
                    color: colors.secondaryBtnText,
                    borderColor: border.color,
                  }}
                >
                  {buttons.secondaryLabel || "Cancel"}
                </button>
              )}
              {buttons.showPrimary !== false && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  style={{
                    backgroundColor: colors.primaryBtnBg,
                    color: colors.primaryBtnText,
                  }}
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{buttons.primaryLabel || "Save & Submit"}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 6. DEFAULT MODAL / ALERT / CONFIRM / CONFIG DIALOG
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: backdrop.enabled !== false ? (backdrop.color || "rgba(15, 23, 42, 0.65)") : "transparent",
        backdropFilter: backdrop.blur ? `blur(${backdrop.blurAmount || 4}px)` : "none",
      }}
    >
      <div
        ref={overlayRef}
        className="w-full overflow-hidden flex flex-col"
        style={{
          ...overlayStyle,
          maxWidth: dimensions.maxWidth || "480px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-6 py-4 border-b"
          style={{ backgroundColor: colors.headerBg, borderColor: border.color }}
        >
          <div className="flex items-start gap-3">
            {content.icon && (
              <div className="mt-0.5 shrink-0">
                {renderIcon(content.icon, 22)}
              </div>
            )}
            <div>
              <h3
                className="font-bold leading-snug"
                style={{
                  fontSize: `${typography.titleSize || 18}px`,
                  color: colors.textPrimary,
                }}
              >
                {content.title || config.name || "Modal Window"}
              </h3>
              {content.description && (
                <p
                  className="mt-1"
                  style={{
                    fontSize: `${typography.subtitleSize || 13}px`,
                    color: colors.textSecondary,
                  }}
                >
                  {content.description}
                </p>
              )}
            </div>
          </div>
          {interaction.showCloseBtn !== false && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              style={{ color: colors.closeIconColor || colors.textSecondary }}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Body Content */}
        <div
          className="p-6 overflow-y-auto max-h-[60vh] space-y-3"
          style={{
            fontSize: `${typography.bodySize || 14}px`,
            lineHeight: typography.lineHeight || 1.5,
          }}
        >
          <p style={{ color: colors.textPrimary }}>
            {content.body || "This dialog supports live real-time customization of styling, backdrop, animations, and actions."}
          </p>

          {pattern === "confirm-alert" && (
            <div
              className="p-3.5 rounded-xl border text-xs space-y-1"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                borderColor: colors.danger || "#ef4444",
                color: colors.danger || "#ef4444",
              }}
            >
              <div className="font-bold">⚠️ Warning Action</div>
              <div>This action cannot be undone. All associated repository configurations will be permanently purged.</div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ backgroundColor: colors.footerBg, borderColor: border.color }}
        >
          {buttons.showSecondary !== false && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: colors.secondaryBtnBg || "#f1f5f9",
                color: colors.secondaryBtnText || "#475569",
                borderColor: border.color,
                borderRadius: `${border.radius > 8 ? 8 : border.radius}px`,
              }}
            >
              {buttons.secondaryLabel || "Cancel"}
            </button>
          )}
          {buttons.showPrimary !== false && (
            <button
              type="button"
              onClick={() => {
                if (interaction.closeOnSubmit !== false) onClose();
              }}
              className="px-5 py-2 rounded-lg text-sm font-medium hover:opacity-95 transition-opacity"
              style={{
                backgroundColor: buttons.isDestructive ? (colors.danger || "#ef4444") : (colors.primaryBtnBg || "#4f46e5"),
                color: colors.primaryBtnText || "#ffffff",
                borderRadius: `${border.radius > 8 ? 8 : border.radius}px`,
              }}
            >
              {buttons.primaryLabel || "Confirm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
