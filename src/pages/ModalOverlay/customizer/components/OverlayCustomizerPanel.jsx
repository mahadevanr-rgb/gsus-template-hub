import React, { useState } from "react";
import {
  Layout,
  Palette,
  Type,
  Square,
  List,
  Sliders,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  Layers,
  Shield,
  Eye,
  Maximize2,
  Check,
  MousePointer,
  HelpCircle,
} from "lucide-react";
import {
  COLOR_PALETTES,
  BORDER_STYLE_OPTIONS,
  STYLE_PRESETS,
  ANIMATION_PRESETS,
  FONT_OPTIONS,
} from "../modalOverlayCustomizerConfig";

import {
  CollapsibleSection,
  ControlRow,
  ColorInput,
  RangeInput,
  SelectInput,
  Toggle,
  TextInput,
} from "@/components/common/Customizer/CustomizerPrimitives";


/* ─────────────────────────────────────────────────────────────────────────── */
/* Main Panel Component                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function OverlayCustomizerPanel({ config, updateConfig }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    content: true,
    appearance: true,
    borders: false,
    layout: false,
    backdrop: false,
    buttons: false,
    typography: false,
    animation: false,
    interaction: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pattern = config?.pattern || config?.sourceComponentId || "basic-modal";
  const colors = config?.colors || {};
  const border = config?.border || {};
  const dimensions = config?.dimensions || {};
  const backdrop = config?.backdrop || {};
  const buttons = config?.buttons || {};
  const typography = config?.typography || {};
  const animation = config?.animation || {};
  const interaction = config?.interaction || {};
  const content = config?.content || {};

  // Color updates
  const handleColorChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: val },
    }));
  };

  // Palette apply
  const applyPalette = (pal) => {
    updateConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        surfaceBg: pal.overlayBg || pal.surfaceBg || prev.colors?.surfaceBg,
        headerBg: pal.headerBg || prev.colors?.headerBg,
        footerBg: pal.footerBg || prev.colors?.footerBg,
        textPrimary: pal.titleColor || pal.textColor || prev.colors?.textPrimary,
        textSecondary: pal.secondaryTextColor || prev.colors?.textSecondary,
        primaryBtnBg: pal.primaryBtnBg || prev.colors?.primaryBtnBg,
        primaryBtnText: pal.primaryBtnText || prev.colors?.primaryBtnText,
        secondaryBtnBg: pal.secondaryBtnBg || prev.colors?.secondaryBtnBg,
        secondaryBtnText: pal.secondaryBtnText || prev.colors?.secondaryBtnText,
        accent: pal.accentColor || prev.colors?.accent,
        danger: pal.dangerColor || prev.colors?.danger,
        success: pal.successColor || prev.colors?.success,
        inputBg: pal.inputBg || prev.colors?.inputBg,
      },
    }));
  };

  // Border preset apply
  const applyBorderPreset = (preset) => {
    const s = preset.settings || preset.border || {};
    updateConfig((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        width: s.borderWidth !== undefined ? Number(s.borderWidth) : prev.border?.width,
        style: s.borderStyle || prev.border?.style,
        radius: s.borderRadius !== undefined ? Number(s.borderRadius) : prev.border?.radius,
        shadowIntensity: s.shadow || prev.border?.shadowIntensity,
        color: s.borderColor || prev.border?.color,
      },
    }));
  };

  // Border update
  const handleBorderChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      border: { ...prev.border, [key]: val },
    }));
  };

  // Content update
  const handleContentChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      content: { ...prev.content, [key]: val },
    }));
  };

  // Dimensions update
  const handleDimensionsChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: val },
    }));
  };

  // Backdrop update
  const handleBackdropChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      backdrop: { ...prev.backdrop, [key]: val },
    }));
  };

  // Buttons update
  const handleButtonsChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      buttons: { ...prev.buttons, [key]: val },
    }));
  };

  // Typography update
  const handleTypographyChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      typography: { ...prev.typography, [key]: val },
    }));
  };

  // Interaction update
  const handleInteractionChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      interaction: { ...prev.interaction, [key]: val },
    }));
  };

  // Animation update
  const handleAnimationChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      animation: { ...prev.animation, [key]: val },
    }));
  };

  return (
    <div className="w-full h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            Configuration Studio
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          {pattern}
        </span>
      </div>

      {/* Scrollable controls list */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:#94a3b8_transparent] dark:[scrollbar-color:#334155_transparent] text-slate-700 dark:text-slate-300">
        {/* 1. GENERAL */}
        <CollapsibleSection
          title="General Settings"
          icon={Layout}
          isOpen={openSections.general}
          onToggle={() => toggleSection("general")}
        >
          <div className="space-y-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Configuration Name</label>
              <input
                type="text"
                value={config.name || ""}
                onChange={(e) => updateConfig((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Overlay Title</label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Subtitle / Summary</label>
              <input
                type="text"
                value={content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. CONTENT */}
        <CollapsibleSection
          title="Content & Body"
          icon={List}
          isOpen={openSections.content}
          onToggle={() => toggleSection("content")}
        >
          <div className="space-y-3">

            {pattern !== "command-palette" && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Body Text</label>
                <textarea
                  rows={3}
                  value={content.body || ""}
                  onChange={(e) => handleContentChange("body", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                  placeholder="Enter dialog content description..."
                />
              </div>
            )}

            {pattern === "command-palette" && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Search Placeholder</label>
                <input
                  type="text"
                  value={content.searchPlaceholder || ""}
                  onChange={(e) => handleContentChange("searchPlaceholder", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* 3. APPEARANCE & PALETTES */}
        <CollapsibleSection
          title="Appearance & Colors"
          icon={Palette}
          isOpen={openSections.appearance}
          onToggle={() => toggleSection("appearance")}
        >
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1.5">Curated Palettes</label>
              <div className="grid grid-cols-2 gap-1.5">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.name}
                    type="button"
                    onClick={() => applyPalette(pal)}
                    className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-left transition-all"
                  >
                    <div className="flex gap-0.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.primaryBtnBg || pal.accentColor || "#6366f1" }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.overlayBg || pal.surfaceBg || "#0f172a" }} />
                    </div>
                    <span className="text-[10px] text-slate-300 truncate">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <ControlRow label="Surface Background">
                <ColorInput value={colors.surfaceBg} onChange={(v) => handleColorChange("surfaceBg", v)} />
              </ControlRow>
              <ControlRow label="Header Background">
                <ColorInput value={colors.headerBg} onChange={(v) => handleColorChange("headerBg", v)} />
              </ControlRow>
              <ControlRow label="Footer Background">
                <ColorInput value={colors.footerBg} onChange={(v) => handleColorChange("footerBg", v)} />
              </ControlRow>
              <ControlRow label="Primary Text">
                <ColorInput value={colors.textPrimary} onChange={(v) => handleColorChange("textPrimary", v)} />
              </ControlRow>
              <ControlRow label="Secondary Text">
                <ColorInput value={colors.textSecondary} onChange={(v) => handleColorChange("textSecondary", v)} />
              </ControlRow>
              <ControlRow label="Primary Button Bg">
                <ColorInput value={colors.primaryBtnBg} onChange={(v) => handleColorChange("primaryBtnBg", v)} />
              </ControlRow>
              <ControlRow label="Primary Button Text">
                <ColorInput value={colors.primaryBtnText} onChange={(v) => handleColorChange("primaryBtnText", v)} />
              </ControlRow>
              <ControlRow label="Secondary Button Bg">
                <ColorInput value={colors.secondaryBtnBg} onChange={(v) => handleColorChange("secondaryBtnBg", v)} />
              </ControlRow>
              <ControlRow label="Secondary Button Text">
                <ColorInput value={colors.secondaryBtnText} onChange={(v) => handleColorChange("secondaryBtnText", v)} />
              </ControlRow>
              <ControlRow label="Close Icon Color">
                <ColorInput value={colors.closeIconColor} onChange={(v) => handleColorChange("closeIconColor", v)} />
              </ControlRow>
            </div>
          </div>
        </CollapsibleSection>

        {/* 4. BORDERS, CORNERS & SHADOWS */}
        <CollapsibleSection
          title="Borders & Shadows"
          icon={Square}
          isOpen={openSections.borders}
          onToggle={() => toggleSection("borders")}
        >
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1.5">Style Presets</label>
              <div className="grid grid-cols-2 gap-1.5">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyBorderPreset(preset)}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-left text-[11px] text-slate-300 transition-all truncate"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <ControlRow label="Corner Radius">
                <RangeInput value={border.radius ?? 16} onChange={(v) => handleBorderChange("radius", v)} min={0} max={36} />
              </ControlRow>
              <ControlRow label="Border Width">
                <RangeInput value={border.width ?? 1} onChange={(v) => handleBorderChange("width", v)} min={0} max={6} />
              </ControlRow>
              <ControlRow label="Border Color">
                <ColorInput value={border.color} onChange={(v) => handleBorderChange("color", v)} />
              </ControlRow>
              <ControlRow label="Shadow Intensity">
                <select
                  value={border.shadowIntensity || "lg"}
                  onChange={(e) => handleBorderChange("shadowIntensity", e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300"
                >
                  <option value="none">None</option>
                  <option value="sm">Subtle (SM)</option>
                  <option value="md">Medium (MD)</option>
                  <option value="lg">Elevated (LG)</option>
                  <option value="xl">Dramatic (XL)</option>
                  <option value="2xl">Maximum (2XL)</option>
                </select>
              </ControlRow>
            </div>
          </div>
        </CollapsibleSection>

        {/* 5. LAYOUT & POSITION */}
        <CollapsibleSection
          title="Layout & Position"
          icon={Maximize2}
          isOpen={openSections.layout}
          onToggle={() => toggleSection("layout")}
        >
          <div className="space-y-2">
            {pattern === "drawer-panel" && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Drawer Position</label>
                <div className="grid grid-cols-4 gap-1">
                  {["left", "right", "top", "bottom"].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => handleDimensionsChange("drawerPosition", pos)}
                      className={`py-1 rounded text-xs capitalize border ${
                        dimensions.drawerPosition === pos
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ControlRow label="Max Width">
              <input
                type="text"
                value={dimensions.maxWidth || "520px"}
                onChange={(e) => handleDimensionsChange("maxWidth", e.target.value)}
                className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-300 text-right"
              />
            </ControlRow>

            <ControlRow label="Content Padding">
              <RangeInput value={dimensions.padding ?? 24} onChange={(v) => handleDimensionsChange("padding", v)} min={12} max={48} />
            </ControlRow>
          </div>
        </CollapsibleSection>

        {/* 6. BACKDROP */}
        <CollapsibleSection
          title="Backdrop & Scrim"
          icon={Layers}
          isOpen={openSections.backdrop}
          onToggle={() => toggleSection("backdrop")}
        >
          <div className="space-y-2">
            <ControlRow label="Enable Backdrop">
              <input
                type="checkbox"
                checked={backdrop.enabled !== false}
                onChange={(e) => handleBackdropChange("enabled", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Backdrop Color">
              <ColorInput value={backdrop.color} onChange={(v) => handleBackdropChange("color", v)} />
            </ControlRow>
            <ControlRow label="Enable Backdrop Blur">
              <input
                type="checkbox"
                checked={backdrop.blur !== false}
                onChange={(e) => handleBackdropChange("blur", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            {backdrop.blur && (
              <ControlRow label="Blur Amount">
                <RangeInput value={backdrop.blurAmount ?? 4} onChange={(v) => handleBackdropChange("blurAmount", v)} min={1} max={20} />
              </ControlRow>
            )}
            <ControlRow label="Dismiss on Backdrop Click">
              <input
                type="checkbox"
                checked={backdrop.closeOnBackdropClick !== false}
                onChange={(e) => handleBackdropChange("closeOnBackdropClick", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
          </div>
        </CollapsibleSection>

        {/* 7. BUTTONS & ACTIONS */}
        <CollapsibleSection
          title="Buttons & Actions"
          icon={MousePointer}
          isOpen={openSections.buttons}
          onToggle={() => toggleSection("buttons")}
        >
          <div className="space-y-2">
            <ControlRow label="Show Primary Button">
              <input
                type="checkbox"
                checked={buttons.showPrimary !== false}
                onChange={(e) => handleButtonsChange("showPrimary", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Primary Label</label>
              <input
                type="text"
                value={buttons.primaryLabel || ""}
                onChange={(e) => handleButtonsChange("primaryLabel", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none"
              />
            </div>
            <ControlRow label="Destructive Action">
              <input
                type="checkbox"
                checked={buttons.isDestructive || false}
                onChange={(e) => handleButtonsChange("isDestructive", e.target.checked)}
                className="rounded accent-red-500"
              />
            </ControlRow>

            <div className="pt-2 border-t border-slate-800">
              <ControlRow label="Show Secondary Button">
                <input
                  type="checkbox"
                  checked={buttons.showSecondary !== false}
                  onChange={(e) => handleButtonsChange("showSecondary", e.target.checked)}
                  className="rounded accent-indigo-500"
                />
              </ControlRow>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Secondary Label</label>
                <input
                  type="text"
                  value={buttons.secondaryLabel || ""}
                  onChange={(e) => handleButtonsChange("secondaryLabel", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 8. TYPOGRAPHY */}
        <CollapsibleSection
          title="Typography"
          icon={Type}
          isOpen={openSections.typography}
          onToggle={() => toggleSection("typography")}
        >
          <div className="space-y-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Font Family</label>
              <select
                value={typography.fontFamily || "Inter, sans-serif"}
                onChange={(e) => handleTypographyChange("fontFamily", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <ControlRow label="Title Size">
              <RangeInput value={typography.titleSize ?? 18} onChange={(v) => handleTypographyChange("titleSize", v)} min={14} max={28} />
            </ControlRow>
            <ControlRow label="Body Size">
              <RangeInput value={typography.bodySize ?? 14} onChange={(v) => handleTypographyChange("bodySize", v)} min={12} max={18} />
            </ControlRow>
          </div>
        </CollapsibleSection>

        {/* 9. ANIMATION */}
        <CollapsibleSection
          title="Animation & Timing"
          icon={Sparkles}
          isOpen={openSections.animation}
          onToggle={() => toggleSection("animation")}
        >
          <div className="space-y-2">
            <ControlRow label="Enable Animation">
              <input
                type="checkbox"
                checked={animation.enabled !== false}
                onChange={(e) => handleAnimationChange("enabled", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Open Duration">
              <RangeInput value={animation.duration ?? 250} onChange={(v) => handleAnimationChange("duration", v)} min={100} max={600} step={25} unit="ms" />
            </ControlRow>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Easing Motion</label>
              <div className="grid grid-cols-2 gap-1.5">
                {ANIMATION_PRESETS.map((ap) => (
                  <button
                    key={ap.id}
                    type="button"
                    onClick={() => handleAnimationChange("easing", ap.easing)}
                    className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-left text-[11px] text-slate-300 truncate"
                  >
                    {ap.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 10. INTERACTION & ACCESSIBILITY */}
        <CollapsibleSection
          title="Interaction & A11y"
          icon={Shield}
          isOpen={openSections.interaction}
          onToggle={() => toggleSection("interaction")}
        >
          <div className="space-y-2">
            <ControlRow label="Show Close 'X' Button">
              <input
                type="checkbox"
                checked={interaction.showCloseBtn !== false}
                onChange={(e) => handleInteractionChange("showCloseBtn", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Close on Escape Key">
              <input
                type="checkbox"
                checked={interaction.closeOnEsc !== false}
                onChange={(e) => handleInteractionChange("closeOnEsc", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Trap Focus Inside">
              <input
                type="checkbox"
                checked={interaction.trapFocus !== false}
                onChange={(e) => handleInteractionChange("trapFocus", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Close on Submit/Select">
              <input
                type="checkbox"
                checked={interaction.closeOnSubmit !== false}
                onChange={(e) => handleInteractionChange("closeOnSubmit", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
