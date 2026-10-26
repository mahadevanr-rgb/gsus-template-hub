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
  MousePointer,
  Maximize2,
  Layers,
  Compass,
} from "lucide-react";
import {
  COLOR_PALETTES,
  STYLE_PRESETS,
  FONT_OPTIONS,
  INDICATOR_STYLES,
  BORDER_STYLE_OPTIONS,
  ANIMATION_PRESETS,
} from "../navigationCustomizerConfig";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Helpers & Control Primitives                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, children }) {
  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-900/60 hover:bg-slate-800/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
          <span className="text-xs font-semibold text-slate-200">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        )}
      </button>
      {isOpen && <div className="p-3 space-y-3 bg-[#0b0f19]">{children}</div>}
    </div>
  );
}

function ControlRow({ label, children, tooltip }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-slate-400 shrink-0 min-w-0 leading-tight" title={tooltip}>
        {label}
      </span>
      <div className="flex items-center gap-1 shrink-0">{children}</div>
    </div>
  );
}

function toHex7(c) {
  if (!c || typeof c !== "string") return "#000000";
  const trimmed = c.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return "#4f46e5";
}

function ColorInput({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <input
        type="color"
        value={toHex7(value)}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded-lg cursor-pointer border border-slate-700 bg-transparent"
        title={label}
      />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
        placeholder="#000000"
      />
    </div>
  );
}

function RangeInput({ value, onChange, min = 0, max = 100, step = 1, unit = "px" }) {
  const num = parseFloat(value) || 0;
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={num}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 accent-indigo-500"
      />
      <span className="text-[11px] font-mono text-slate-300 w-10 text-right">
        {num}{unit}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main Panel Component                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function NavigationCustomizerPanel({ config, updateConfig }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    items: true,
    appearance: true,
    indicator: true,
    borders: false,
    layout: false,
    typography: false,
    animation: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pattern = config?.sourceComponentId || config?.componentType || "navbar";
  const colors = config?.colors || {};
  const border = config?.border || {};
  const dimensions = config?.dimensions || {};
  const layout = config?.layout || {};
  const typography = config?.typography || {};
  const animation = config?.animation || {};
  const brand = config?.brand || {};
  const items = config?.items || [];

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
        surfaceBg: pal.surfaceBg || prev.colors?.surfaceBg,
        headerBg: pal.headerBg || prev.colors?.headerBg,
        activeBg: pal.activeBg || prev.colors?.activeBg,
        activeText: pal.activeText || prev.colors?.activeText,
        inactiveText: pal.inactiveText || prev.colors?.inactiveText,
        hoverBg: pal.hoverBg || prev.colors?.hoverBg,
        hoverText: pal.hoverText || prev.colors?.hoverText,
        borderColor: pal.borderColor || prev.colors?.borderColor,
        badgeBg: pal.badgeBg || prev.colors?.badgeBg,
        badgeText: pal.badgeText || prev.colors?.badgeText,
        accent: pal.accent || prev.colors?.accent,
      },
    }));
  };

  // Border preset apply
  const applyBorderPreset = (preset) => {
    updateConfig((prev) => ({
      ...prev,
      border: {
        ...prev.border,
        width: preset.borderWidth !== undefined ? Number(preset.borderWidth) : prev.border?.width,
        style: preset.borderStyle || prev.border?.style,
        radius: preset.borderRadius !== undefined ? Number(preset.borderRadius) : prev.border?.radius,
        shadowIntensity: preset.shadow || prev.border?.shadowIntensity,
        color: preset.borderColor || prev.border?.color,
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

  // Brand update
  const handleBrandChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      brand: { ...prev.brand, [key]: val },
    }));
  };

  // Typography update
  const handleTypographyChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      typography: { ...prev.typography, [key]: val },
    }));
  };

  // Layout update
  const handleLayoutChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      layout: { ...prev.layout, [key]: val },
    }));
  };

  // Animation update
  const handleAnimationChange = (key, val) => {
    updateConfig((prev) => ({
      ...prev,
      animation: { ...prev.animation, [key]: val },
    }));
  };

  // Item helpers
  const handleItemLabelChange = (id, newLabel) => {
    updateConfig((prev) => ({
      ...prev,
      items: (prev.items || []).map((it) => (it.id === id ? { ...it, label: newLabel } : it)),
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      id: `nav-item-${Date.now()}`,
      label: "New Page",
      href: "#",
    };
    updateConfig((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem],
    }));
  };

  const handleRemoveItem = (id) => {
    updateConfig((prev) => ({
      ...prev,
      items: (prev.items || []).filter((it) => it.id !== id),
    }));
  };

  return (
    <div className="w-80 lg:w-88 shrink-0 h-full border-r border-slate-800 bg-[#090d16] flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Navigation Studio
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {pattern}
        </span>
      </div>

      {/* Scrollable controls list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {/* 1. GENERAL & BRAND */}
        <CollapsibleSection
          title="General & Brand"
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
              <label className="text-[11px] text-slate-400 block mb-1">Brand Name</label>
              <input
                type="text"
                value={brand.name || ""}
                onChange={(e) => handleBrandChange("name", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Logo Text</label>
                <input
                  type="text"
                  value={brand.logoText || ""}
                  onChange={(e) => handleBrandChange("logoText", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={brand.tagline || ""}
                  onChange={(e) => handleBrandChange("tagline", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. NAVIGATION ITEMS */}
        {items.length > 0 && (
          <CollapsibleSection
            title={`Navigation Items (${items.length})`}
            icon={List}
            isOpen={openSections.items}
            onToggle={() => toggleSection("items")}
          >
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-800 bg-slate-900/50"
                >
                  <span className="text-[10px] font-mono text-slate-500 w-4 text-center">{idx + 1}</span>
                  <input
                    type="text"
                    value={item.label || item.title || ""}
                    onChange={(e) => handleItemLabelChange(item.id, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-200 outline-none border-b border-transparent focus:border-indigo-500"
                  />
                  {items.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-1.5 rounded-lg border border-dashed border-slate-700 hover:border-indigo-500 text-xs font-semibold text-slate-400 hover:text-indigo-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>
          </CollapsibleSection>
        )}

        {/* 3. ACTIVE STATE & INDICATOR */}
        <CollapsibleSection
          title="Active State & Indicator"
          icon={MousePointer}
          isOpen={openSections.indicator}
          onToggle={() => toggleSection("indicator")}
        >
          <div className="space-y-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Indicator Style</label>
              <div className="grid grid-cols-2 gap-1.5">
                {INDICATOR_STYLES.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => updateConfig((p) => ({ ...p, indicatorStyle: ind.id }))}
                    className={`py-1 px-2 rounded-lg text-[11px] text-left border transition-all truncate ${
                      config.indicatorStyle === ind.id
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 4. APPEARANCE & COLORS */}
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
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.activeBg }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.surfaceBg }} />
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
              <ControlRow label="Active Item Bg">
                <ColorInput value={colors.activeBg} onChange={(v) => handleColorChange("activeBg", v)} />
              </ControlRow>
              <ControlRow label="Active Item Text">
                <ColorInput value={colors.activeText} onChange={(v) => handleColorChange("activeText", v)} />
              </ControlRow>
              <ControlRow label="Inactive Item Text">
                <ColorInput value={colors.inactiveText} onChange={(v) => handleColorChange("inactiveText", v)} />
              </ControlRow>
              <ControlRow label="Border Color">
                <ColorInput value={colors.borderColor} onChange={(v) => handleColorChange("borderColor", v)} />
              </ControlRow>
              <ControlRow label="Badge Background">
                <ColorInput value={colors.badgeBg} onChange={(v) => handleColorChange("badgeBg", v)} />
              </ControlRow>
            </div>
          </div>
        </CollapsibleSection>

        {/* 5. BORDERS & SHADOWS */}
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

        {/* 6. TYPOGRAPHY */}
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
            <ControlRow label="Font Size">
              <RangeInput value={typography.fontSize ?? 14} onChange={(v) => handleTypographyChange("fontSize", v)} min={11} max={18} />
            </ControlRow>
          </div>
        </CollapsibleSection>

        {/* 7. LAYOUT & POSITIONING */}
        <CollapsibleSection
          title="Layout & Features"
          icon={Maximize2}
          isOpen={openSections.layout}
          onToggle={() => toggleSection("layout")}
        >
          <div className="space-y-2">
            <ControlRow label="Search Bar Enabled">
              <input
                type="checkbox"
                checked={layout.searchEnabled !== false}
                onChange={(e) => handleLayoutChange("searchEnabled", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            <ControlRow label="Sticky Positioning">
              <input
                type="checkbox"
                checked={layout.sticky !== false}
                onChange={(e) => handleLayoutChange("sticky", e.target.checked)}
                className="rounded accent-indigo-500"
              />
            </ControlRow>
            {pattern === "breadcrumb" && (
              <ControlRow label="Separator Char">
                <input
                  type="text"
                  value={layout.separator || "/"}
                  onChange={(e) => handleLayoutChange("separator", e.target.value)}
                  className="w-12 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center text-white"
                />
              </ControlRow>
            )}
          </div>
        </CollapsibleSection>

        {/* 8. ANIMATION */}
        <CollapsibleSection
          title="Animation & Transitions"
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
            <ControlRow label="Duration">
              <RangeInput value={animation.duration ?? 250} onChange={(v) => handleAnimationChange("duration", v)} min={100} max={600} step={25} unit="ms" />
            </ControlRow>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
