import React, { useState } from "react";
import {
  Layout,
  Palette,
  Type,
  Square,
  List,
  MousePointer,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  GripVertical,
  ChevronUp,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import {
  FONT_OPTIONS,
  ANIMATION_PRESETS,
  BORDER_STYLE_OPTIONS,
  STYLE_PRESETS,
  COLOR_PALETTES,
  ITEM_ICON_OPTIONS,
  getAccordionSchema,
} from "../accordionCustomizerConfig";
import { generateItemId } from "../accordionCustomizationUtils";

/* ─────────────────────────────────────────────────────────────────────────── */
/* Reusable Control Primitives                                                  */
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

function ControlRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-slate-400 shrink-0 min-w-0 leading-tight">
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
  return "#6366f1";
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
        onChange={(e) => onChange(e.target.value)}
        className="w-20 accent-indigo-500"
      />
      <span className="text-[11px] font-mono text-slate-300 w-10 text-right">
        {num}{unit}
      </span>
    </div>
  );
}

function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[140px]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
        checked ? "bg-indigo-600" : "bg-slate-700"
      }`}
      title={label}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Item Editor                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

function ItemEditor({
  items,
  sourceComponentId,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onDuplicateItem,
  onReorderItems,
}) {
  const [expandedItemIdx, setExpandedItemIdx] = useState(null);

  const handleMoveUp = (idx) => {
    if (idx > 0) onReorderItems(idx, idx - 1);
  };

  const handleMoveDown = (idx) => {
    if (idx < items.length - 1) onReorderItems(idx, idx + 1);
  };

  const getDefaultNewItem = () => {
    const id = generateItemId("item");
    switch (sourceComponentId) {
      case "numbered-accordion":
        return {
          id,
          title: "New Question",
          content: "Your answer goes here.",
          disabled: false,
        };
      case "filter-accordion":
        return {
          id,
          title: "New Filter Group",
          options: [
            { id: generateItemId("opt"), label: "Option 1" },
            { id: generateItemId("opt"), label: "Option 2" },
          ],
          disabled: false,
        };
      case "icon-accordion":
        return {
          id,
          title: "New Item",
          content: "Description goes here.",
          icon: "Star",
          disabled: false,
        };
      case "form-accordion":
        return {
          id,
          title: "New Section",
          subtitle: "",
          icon: "FileText",
          required: false,
          fields: [
            {
              id: generateItemId("field"),
              name: generateItemId("field"),
              label: "New Field",
              type: "text",
              placeholder: "",
              required: false,
              defaultValue: "",
            },
          ],
          disabled: false,
        };
      default:
        return {
          id,
          title: "New Question",
          content: "Your answer goes here.",
          disabled: false,
        };
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex flex-col items-center justify-center py-6 rounded-xl border border-dashed border-slate-700 text-center space-y-2">
          <List className="w-8 h-8 text-slate-600" />
          <p className="text-xs text-slate-500">No items yet. Add your first item below.</p>
        </div>
        <button
          onClick={() => onAddItem(getDefaultNewItem())}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add First Item
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-800 overflow-hidden"
        >
          {/* Item Header Row */}
          <div className="flex items-center gap-1.5 px-2 py-2 bg-slate-900/80">
            {/* Move controls */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleMoveUp(idx)}
                disabled={idx === 0}
                className="p-0.5 rounded text-slate-600 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                title="Move up"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleMoveDown(idx)}
                disabled={idx === items.length - 1}
                className="p-0.5 rounded text-slate-600 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                title="Move down"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Label */}
            <span className="flex-1 min-w-0 text-[11px] font-medium text-slate-300 truncate">
              {item.title || item.label || `Item ${idx + 1}`}
            </span>

            {/* Disabled toggle */}
            <button
              onClick={() => onUpdateItem(idx, { disabled: !item.disabled })}
              className={`p-1 rounded transition-colors cursor-pointer ${
                item.disabled ? "text-slate-600" : "text-slate-400 hover:text-white"
              }`}
              title={item.disabled ? "Enable item" : "Disable item"}
            >
              {item.disabled ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>

            {/* Duplicate */}
            <button
              onClick={() => onDuplicateItem(idx)}
              className="p-1 rounded text-slate-600 hover:text-slate-300 transition-colors cursor-pointer"
              title="Duplicate item"
            >
              <Copy className="w-3 h-3" />
            </button>

            {/* Delete */}
            <button
              onClick={() => {
                if (window.confirm(`Delete "${item.title || "this item"}"?`)) {
                  onRemoveItem(idx);
                }
              }}
              className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete item"
            >
              <Trash2 className="w-3 h-3" />
            </button>

            {/* Expand editor */}
            <button
              onClick={() =>
                setExpandedItemIdx(expandedItemIdx === idx ? null : idx)
              }
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Edit item"
            >
              {expandedItemIdx === idx ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Expanded Item Editor */}
          {expandedItemIdx === idx && (
            <div className="px-3 pb-3 pt-2 space-y-2.5 border-t border-slate-800 bg-[#0b0f19]">
              {/* Title / Label */}
              <div>
                <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                  {sourceComponentId === "filter-accordion" ? "Group Title" : "Title / Question"}
                </label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => onUpdateItem(idx, { title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter title..."
                />
              </div>

              {/* Content / Answer (not for filter or form) */}
              {sourceComponentId !== "filter-accordion" &&
                sourceComponentId !== "form-accordion" && (
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                      Content / Answer
                    </label>
                    <textarea
                      value={item.content || item.answer || ""}
                      onChange={(e) => onUpdateItem(idx, { content: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                      placeholder="Enter content..."
                    />
                  </div>
                )}

              {/* Icon (for icon-accordion and form-accordion) */}
              {(sourceComponentId === "icon-accordion" ||
                sourceComponentId === "form-accordion") && (
                <div>
                  <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                    Icon
                  </label>
                  <select
                    value={item.icon || ""}
                    onChange={(e) => onUpdateItem(idx, { icon: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {ITEM_ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Form Accordion: Subtitle + Required */}
              {sourceComponentId === "form-accordion" && (
                <>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={item.subtitle || ""}
                      onChange={(e) => onUpdateItem(idx, { subtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter subtitle..."
                    />
                  </div>
                  <ControlRow label="Required section">
                    <Toggle
                      checked={!!item.required}
                      onChange={(val) => onUpdateItem(idx, { required: val })}
                    />
                  </ControlRow>
                </>
              )}

              {/* Filter Accordion: Manage Options */}
              {sourceComponentId === "filter-accordion" && (
                <div>
                  <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                    Filter Options
                  </label>
                  <div className="space-y-1.5">
                    {(item.options || []).map((opt, optIdx) => (
                      <div key={opt.id} className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={!!opt.selected}
                          onChange={(e) => {
                            const updatedOptions = item.options.map((o, i) =>
                              i === optIdx ? { ...o, selected: e.target.checked } : o
                            );
                            onUpdateItem(idx, { options: updatedOptions });
                          }}
                          className="accent-indigo-500 cursor-pointer"
                          title="Default selected"
                        />
                        <input
                          type="text"
                          value={opt.label || ""}
                          onChange={(e) => {
                            const updatedOptions = item.options.map((o, i) =>
                              i === optIdx ? { ...o, label: e.target.value } : o
                            );
                            onUpdateItem(idx, { options: updatedOptions });
                          }}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                          placeholder="Option label..."
                        />
                        <button
                          onClick={() => {
                            const updatedOptions = item.options.filter(
                              (_, i) => i !== optIdx
                            );
                            onUpdateItem(idx, { options: updatedOptions });
                          }}
                          className="p-1 rounded text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updatedOptions = [
                          ...(item.options || []),
                          { id: generateItemId("opt"), label: "New Option" },
                        ];
                        onUpdateItem(idx, { options: updatedOptions });
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-slate-700 text-[11px] text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add Item Button */}
      <button
        onClick={() => onAddItem(getDefaultNewItem())}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-900/40 text-xs font-semibold transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Item
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main Panel                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function AccordionCustomizerPanel({
  config,
  updateConfig,
  updateItem,
  addItem,
  removeItem,
  duplicateItem,
  reorderItems,
}) {
  const [openSections, setOpenSections] = useState({
    general: true,
    items: true,
    appearance: false,
    typography: false,
    borders: false,
    behavior: true,
    animation: false,
    accessibility: false,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const {
    sourceComponentId,
    colors = {},
    borders = {},
    typography = {},
    icons: iconConfig = {},
    animation = {},
    layout = {},
    items = [],
    expansionMode,
    collapsible,
    initialExpandedItem,
    initialExpandedItems,
    patternSpecific = {},
  } = config;

  const schema = getAccordionSchema(sourceComponentId);

  const applyPalette = (palette) => {
    updateConfig((c) => ({
      ...c,
      colors: {
        ...(c.colors || {}),
        containerBg: palette.containerBg,
        itemBg: palette.itemBg,
        headerBg: palette.headerBg,
        expandedHeaderBg: palette.expandedHeaderBg,
        contentBg: palette.contentBg,
        borderColor: palette.borderColor,
        titleColor: palette.titleColor,
        contentColor: palette.contentColor,
        iconColor: palette.iconColor,
        accentColor: palette.accentColor,
        hoverBg: palette.hoverBg,
      },
    }));
  };

  const applyStylePreset = (preset) => {
    updateConfig((c) => ({
      ...c,
      borders: {
        ...(c.borders || {}),
        borderWidth: preset.settings.borderWidth,
        borderStyle: preset.settings.borderStyle,
        borderRadius: preset.settings.borderRadius,
        itemSpacing: preset.settings.itemSpacing,
        shadow: preset.settings.shadow,
        showDivider: preset.settings.showDivider,
      },
    }));
  };

  const applyAnimationPreset = (preset) => {
    const p = ANIMATION_PRESETS.find((a) => a.value === preset);
    if (!p) return;
    updateConfig((c) => ({
      ...c,
      animation: {
        ...(c.animation || {}),
        preset: p.value,
        duration: p.duration,
        easing: p.easing,
        enabled: p.value !== "none",
      },
    }));
  };

  return (
    <div className="w-full h-full overflow-y-auto min-h-0 bg-[#0d1322] border-r border-slate-800 p-3 space-y-2.5 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] select-none text-xs text-slate-300">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. GENERAL                                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="General"
        icon={Layout}
        isOpen={openSections.general}
        onToggle={() => toggleSection("general")}
      >
        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
            Width
          </label>
          <SelectInput
            value={config.width}
            onChange={(v) => updateConfig("width", v)}
            options={[
              { label: "Full Width (100%)", value: "100%" },
              { label: "Large (800px)", value: "800" },
              { label: "Medium (640px)", value: "640" },
              { label: "Small (480px)", value: "480" },
            ]}
          />
        </div>
        <ControlRow label="Container padding">
          <RangeInput
            value={config.containerPadding || 0}
            onChange={(v) => updateConfig("containerPadding", v)}
            min={0}
            max={64}
          />
        </ControlRow>
        <ControlRow label="Header padding X">
          <RangeInput
            value={layout.headerPaddingX}
            onChange={(v) => updateConfig("layout.headerPaddingX", v)}
            min={0}
            max={64}
          />
        </ControlRow>
        <ControlRow label="Header padding Y">
          <RangeInput
            value={layout.headerPaddingY}
            onChange={(v) => updateConfig("layout.headerPaddingY", v)}
            min={0}
            max={64}
          />
        </ControlRow>
        <ControlRow label="Content padding X">
          <RangeInput
            value={layout.contentPaddingX}
            onChange={(v) => updateConfig("layout.contentPaddingX", v)}
            min={0}
            max={64}
          />
        </ControlRow>
        <ControlRow label="Content padding Y">
          <RangeInput
            value={layout.contentPaddingY}
            onChange={(v) => updateConfig("layout.contentPaddingY", v)}
            min={0}
            max={64}
          />
        </ControlRow>
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. ITEMS                                                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title={`Items (${items.length})`}
        icon={List}
        isOpen={openSections.items}
        onToggle={() => toggleSection("items")}
      >
        <ItemEditor
          items={items}
          sourceComponentId={sourceComponentId}
          onUpdateItem={updateItem}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onDuplicateItem={duplicateItem}
          onReorderItems={reorderItems}
        />
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. ACCORDION BEHAVIOR                                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="Accordion Behavior"
        icon={MousePointer}
        isOpen={openSections.behavior}
        onToggle={() => toggleSection("behavior")}
      >
        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
            Expansion Mode
          </label>
          <div className="flex gap-1">
            {["single", "multiple"].map((mode) => (
              <button
                key={mode}
                onClick={() => updateConfig("expansionMode", mode)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                  expansionMode === mode
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <ControlRow label="Collapsible">
          <Toggle
            checked={!!collapsible}
            onChange={(val) => updateConfig("collapsible", val)}
            label="Allow collapse"
          />
        </ControlRow>

        {/* Initially expanded item */}
        {expansionMode === "single" && (
          <div>
            <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
              Initially Expanded
            </label>
            <select
              value={initialExpandedItem || ""}
              onChange={(e) =>
                updateConfig("initialExpandedItem", e.target.value || null)
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="">None (all closed)</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title || item.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pattern-specific: Icon Accordion Variant */}
        {sourceComponentId === "icon-accordion" && (
          <div>
            <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
              Color Variant
            </label>
            <div className="flex gap-1">
              {["warm", "default", "neutral"].map((v) => (
                <button
                  key={v}
                  onClick={() =>
                    updateConfig((c) => {
                      c.patternSpecific.variant = v;
                      return c;
                    })
                  }
                  className={`flex-1 py-1 rounded-lg text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                    patternSpecific.variant === v
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pattern-specific: Numbered Accordion */}
        {sourceComponentId === "numbered-accordion" && (
          <ControlRow label="Show numbers">
            <Toggle
              checked={patternSpecific.showNumbers !== false}
              onChange={(val) =>
                updateConfig((c) => {
                  c.patternSpecific.showNumbers = val;
                  return c;
                })
              }
            />
          </ControlRow>
        )}

        {/* Pattern-specific: Filter */}
        {sourceComponentId === "filter-accordion" && (
          <ControlRow label="Show count badges">
            <Toggle
              checked={patternSpecific.showBadgeCount !== false}
              onChange={(val) =>
                updateConfig((c) => {
                  c.patternSpecific.showBadgeCount = val;
                  return c;
                })
              }
            />
          </ControlRow>
        )}
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. APPEARANCE                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="Appearance"
        icon={Palette}
        isOpen={openSections.appearance}
        onToggle={() => toggleSection("appearance")}
      >
        {/* Color Palettes */}
        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-2">
            Color Palettes
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.name}
                onClick={() => applyPalette(palette)}
                title={palette.name}
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer group"
              >
                <div className="flex gap-0.5">
                  <div
                    className="w-3 h-4 rounded-l"
                    style={{ backgroundColor: palette.itemBg }}
                  />
                  <div
                    className="w-3 h-4"
                    style={{ backgroundColor: palette.accentColor }}
                  />
                  <div
                    className="w-3 h-4 rounded-r"
                    style={{ backgroundColor: palette.titleColor }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 group-hover:text-slate-300 truncate w-full text-center">
                  {palette.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Color Controls */}
        <div className="space-y-2 pt-1">
          {[
            { label: "Item Background", key: "itemBg" },
            { label: "Header Background", key: "headerBg" },
            { label: "Expanded Header Bg", key: "expandedHeaderBg" },
            { label: "Content Background", key: "contentBg" },
            { label: "Border Color", key: "borderColor" },
            { label: "Title Color", key: "titleColor" },
            { label: "Content Color", key: "contentColor" },
            { label: "Icon Color", key: "iconColor" },
            { label: "Accent Color", key: "accentColor" },
            { label: "Hover Background", key: "hoverBg" },
          ].map(({ label, key }) => (
            <ControlRow key={key} label={label}>
              <ColorInput
                value={colors[key]}
                onChange={(v) => updateConfig(`colors.${key}`, v)}
                label={label}
              />
            </ControlRow>
          ))}
        </div>
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. TYPOGRAPHY                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="Typography"
        icon={Type}
        isOpen={openSections.typography}
        onToggle={() => toggleSection("typography")}
      >
        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
            Font Family
          </label>
          <SelectInput
            value={typography.fontFamily}
            onChange={(v) => updateConfig("typography.fontFamily", v)}
            options={FONT_OPTIONS}
          />
        </div>

        <ControlRow label="Title font size">
          <RangeInput
            value={typography.titleFontSize}
            onChange={(v) => updateConfig("typography.titleFontSize", v)}
            min={10}
            max={36}
          />
        </ControlRow>

        <ControlRow label="Title font weight">
          <SelectInput
            value={typography.titleFontWeight}
            onChange={(v) => updateConfig("typography.titleFontWeight", v)}
            options={[
              { label: "Normal (400)", value: "400" },
              { label: "Medium (500)", value: "500" },
              { label: "Semibold (600)", value: "600" },
              { label: "Bold (700)", value: "700" },
              { label: "Black (900)", value: "900" },
            ]}
          />
        </ControlRow>

        <ControlRow label="Content font size">
          <RangeInput
            value={typography.contentFontSize}
            onChange={(v) => updateConfig("typography.contentFontSize", v)}
            min={10}
            max={28}
          />
        </ControlRow>

        <ControlRow label="Line height">
          <RangeInput
            value={parseFloat(typography.contentLineHeight) * 10}
            onChange={(v) =>
              updateConfig("typography.contentLineHeight", String(v / 10))
            }
            min={10}
            max={30}
            unit=""
          />
        </ControlRow>

        <ControlRow label="Text align">
          <SelectInput
            value={typography.textAlign}
            onChange={(v) => updateConfig("typography.textAlign", v)}
            options={[
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ]}
          />
        </ControlRow>
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. BORDERS & SHAPE                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="Borders & Shape"
        icon={Square}
        isOpen={openSections.borders}
        onToggle={() => toggleSection("borders")}
      >
        {/* Style Presets */}
        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1.5">
            Style Presets
          </label>
          <div className="grid grid-cols-2 gap-1">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyStylePreset(preset)}
                className="px-2 py-1.5 rounded-lg border border-slate-800 hover:border-indigo-500/50 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
              >
                <p className="font-semibold">{preset.name}</p>
                <p className="text-[9px] text-slate-600 truncate">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        <ControlRow label="Border width">
          <RangeInput
            value={borders.borderWidth}
            onChange={(v) => updateConfig("borders.borderWidth", v)}
            min={0}
            max={8}
          />
        </ControlRow>

        <ControlRow label="Border style">
          <SelectInput
            value={borders.borderStyle}
            onChange={(v) => updateConfig("borders.borderStyle", v)}
            options={BORDER_STYLE_OPTIONS}
          />
        </ControlRow>

        <ControlRow label="Border radius">
          <RangeInput
            value={borders.borderRadius}
            onChange={(v) => updateConfig("borders.borderRadius", v)}
            min={0}
            max={32}
          />
        </ControlRow>

        <ControlRow label="Item spacing">
          <RangeInput
            value={borders.itemSpacing}
            onChange={(v) => updateConfig("borders.itemSpacing", v)}
            min={0}
            max={48}
          />
        </ControlRow>

        <div>
          <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
            Shadow
          </label>
          <div className="flex flex-wrap gap-1">
            {["none", "sm", "md", "lg", "xl"].map((s) => (
              <button
                key={s}
                onClick={() => updateConfig("borders.shadow", s)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  borders.shadow === s
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ControlRow label="Show divider">
          <Toggle
            checked={!!borders.showDivider}
            onChange={(v) => updateConfig("borders.showDivider", v)}
          />
        </ControlRow>
      </CollapsibleSection>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. ANIMATION                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CollapsibleSection
        title="Animation"
        icon={Sparkles}
        isOpen={openSections.animation}
        onToggle={() => toggleSection("animation")}
      >
        <ControlRow label="Enabled">
          <Toggle
            checked={!!animation.enabled}
            onChange={(v) => updateConfig("animation.enabled", v)}
          />
        </ControlRow>

        {animation.enabled && (
          <>
            <div>
              <label className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mb-1">
                Preset
              </label>
              <div className="flex flex-wrap gap-1">
                {ANIMATION_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => applyAnimationPreset(preset.value)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      animation.preset === preset.value
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <ControlRow label="Duration">
              <RangeInput
                value={animation.duration}
                onChange={(v) => updateConfig("animation.duration", parseInt(v))}
                min={0}
                max={1000}
                step={50}
                unit="ms"
              />
            </ControlRow>

            <ControlRow label="Rotate icon">
              <Toggle
                checked={!!animation.rotateIcon}
                onChange={(v) => updateConfig("animation.rotateIcon", v)}
              />
            </ControlRow>

            <ControlRow label="Fade content">
              <Toggle
                checked={!!animation.fadeContent}
                onChange={(v) => updateConfig("animation.fadeContent", v)}
              />
            </ControlRow>
          </>
        )}
      </CollapsibleSection>
    </div>
  );
}
