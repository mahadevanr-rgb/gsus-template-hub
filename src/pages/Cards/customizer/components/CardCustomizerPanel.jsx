import React, { useState } from "react";
import {
  Layout,
  Palette,
  Type,
  Square,
  FileText,
  Image as ImageIcon,
  MousePointer,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Upload,
  RotateCcw,
} from "lucide-react";
import {
  FONT_OPTIONS,
  COLOR_PALETTES,
  SHADOW_PRESETS,
  RADIUS_PRESETS,
  LUCIDE_ICONS_LIST,
} from "../cardCustomizerConfig";

export default function CardCustomizerPanel({ config, updateConfig }) {
  // Collapsible section states
  const [openSections, setOpenSections] = useState({
    content: true,
    colors: true,
    layout: false,
    typography: false,
    borders: false,
    image: false,
    button: false,
    advanced: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const {
    sourceCardId = "profile-card",
    layout = {},
    colors = {},
    typography = {},
    borders = {},
    content = {},
    button = {},
    image = {},
    interactive = {},
  } = config;

  // Handle local image file upload safely via FileReader
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      updateConfig("image.url", dataUrl);
      updateConfig("image.show", true);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input
  };

  // Apply a curated color palette in one click
  const applyPalette = (palette) => {
    updateConfig((current) => {
      current.colors.cardBg = palette.cardBg;
      current.colors.accentColor = palette.accentColor;
      current.colors.titleColor = palette.titleColor;
      current.colors.subtitleColor = palette.subtitleColor;
      current.colors.borderColor = palette.borderCol;
      current.colors.badgeBg = palette.badgeBg;
      current.colors.badgeTextColor = palette.badgeText;
      current.colors.gradientFrom = palette.gradientFrom;
      current.colors.gradientTo = palette.gradientTo;
      current.button.btnBg = palette.btnBg;
      current.button.btnTextColor = palette.btnText;
      return current;
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto min-h-0 bg-white dark:bg-[#0d1322] border-r border-slate-200 dark:border-slate-800 p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:#94a3b8_transparent] dark:[scrollbar-color:#334155_transparent] select-none text-xs text-slate-700 dark:text-slate-300">
      {/* =========================================================================
          SECTION 1: Content & Fields (Card-Type-Aware)
         ========================================================================= */}
      <CollapsibleSection
        title="Card Content & Fields"
        icon={FileText}
        isOpen={openSections.content}
        onToggle={() => toggleSection("content")}
        badge={sourceCardId.replace("-card", "")}
      >
        {renderContentEditor({
          sourceCardId,
          content,
          updateConfig,
        })}
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 2: Colors & Appearance
         ========================================================================= */}
      <CollapsibleSection
        title="Colors & Appearance"
        icon={Palette}
        isOpen={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        {/* Curated Color Palettes */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Color Palettes
          </label>
          <div className="grid grid-cols-2 gap-2">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.name}
                type="button"
                onClick={() => applyPalette(palette)}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all text-left group"
              >
                <div className="flex -space-x-1 shrink-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full ring-1 ring-slate-950"
                    style={{ backgroundColor: palette.cardBg }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full ring-1 ring-slate-950"
                    style={{ backgroundColor: palette.accentColor }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full ring-1 ring-slate-950"
                    style={{ backgroundColor: palette.titleColor }}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-white truncate">
                  {palette.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Background Toggle */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Gradient Background</span>
            <input
              type="checkbox"
              checked={!!colors.useGradient}
              onChange={(e) => updateConfig("colors.useGradient", e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {colors.useGradient ? (
            <div className="space-y-2.5 pt-1">
              <ColorPickerRow
                label="Gradient Start"
                value={colors.gradientFrom || "#6366f1"}
                onChange={(val) => updateConfig("colors.gradientFrom", val)}
              />
              <ColorPickerRow
                label="Gradient End"
                value={colors.gradientTo || "#a855f7"}
                onChange={(val) => updateConfig("colors.gradientTo", val)}
              />
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Direction</label>
                <select
                  value={colors.gradientDirection || "to-br"}
                  onChange={(e) => updateConfig("colors.gradientDirection", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
                >
                  <option value="to-br">Diagonal (Top-Left to Bottom-Right)</option>
                  <option value="to-r">Horizontal (Left to Right)</option>
                  <option value="to-b">Vertical (Top to Bottom)</option>
                  <option value="to-tr">Angled (Bottom-Left to Top-Right)</option>
                </select>
              </div>
            </div>
          ) : (
            <ColorPickerRow
              label="Card Background"
              value={colors.cardBg || "#ffffff"}
              onChange={(val) => updateConfig("colors.cardBg", val)}
            />
          )}
        </div>

        {/* Core Color Controls */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <ColorPickerRow
            label="Heading Text"
            value={colors.titleColor || "#0f172a"}
            onChange={(val) => updateConfig("colors.titleColor", val)}
          />
          <ColorPickerRow
            label="Body / Subtitle"
            value={colors.subtitleColor || "#64748b"}
            onChange={(val) => updateConfig("colors.subtitleColor", val)}
          />
          <ColorPickerRow
            label="Accent Color"
            value={colors.accentColor || "#6366f1"}
            onChange={(val) => updateConfig("colors.accentColor", val)}
          />
          <ColorPickerRow
            label="Border Color"
            value={colors.borderColor || "#e2e8f0"}
            onChange={(val) => updateConfig("colors.borderColor", val)}
          />
          <ColorPickerRow
            label="Badge Background"
            value={colors.badgeBg || "#e0e7ff"}
            onChange={(val) => updateConfig("colors.badgeBg", val)}
          />
          <ColorPickerRow
            label="Badge Text"
            value={colors.badgeTextColor || "#4338ca"}
            onChange={(val) => updateConfig("colors.badgeTextColor", val)}
          />
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 3: Layout & Spacing
         ========================================================================= */}
      <CollapsibleSection
        title="Layout & Spacing"
        icon={Layout}
        isOpen={openSections.layout}
        onToggle={() => toggleSection("layout")}
      >
        <SliderRow
          label="Card Max Width"
          value={layout.maxWidth || 380}
          min={280}
          max={600}
          unit="px"
          onChange={(val) => updateConfig("layout.maxWidth", val)}
        />
        <SliderRow
          label="Internal Padding"
          value={layout.padding || 24}
          min={12}
          max={48}
          unit="px"
          onChange={(val) => updateConfig("layout.padding", val)}
        />
        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-300">Overflow Hidden</span>
          <input
            type="checkbox"
            checked={layout.overflowHidden !== false}
            onChange={(e) => updateConfig("layout.overflowHidden", e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 4: Typography
         ========================================================================= */}
      <CollapsibleSection
        title="Typography"
        icon={Type}
        isOpen={openSections.typography}
        onToggle={() => toggleSection("typography")}
      >
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Font Family</label>
          <select
            value={typography.fontFamily || "Inter, sans-serif"}
            onChange={(e) => updateConfig("typography.fontFamily", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <SliderRow
          label="Title Size"
          value={typography.titleFontSize || 20}
          min={14}
          max={32}
          unit="px"
          onChange={(val) => updateConfig("typography.titleFontSize", val)}
        />

        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Title Weight</label>
          <select
            value={typography.titleFontWeight || "700"}
            onChange={(e) => updateConfig("typography.titleFontWeight", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
          >
            <option value="600">Semi-Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>

        <SliderRow
          label="Body Size"
          value={typography.bodyFontSize || 14}
          min={11}
          max={18}
          unit="px"
          onChange={(val) => updateConfig("typography.bodyFontSize", val)}
        />
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 5: Borders & Shadows
         ========================================================================= */}
      <CollapsibleSection
        title="Borders & Shadows"
        icon={Square}
        isOpen={openSections.borders}
        onToggle={() => toggleSection("borders")}
      >
        <SliderRow
          label="Corner Radius"
          value={borders.borderRadius ?? 24}
          min={0}
          max={40}
          unit="px"
          onChange={(val) => updateConfig("borders.borderRadius", val)}
        />

        <SliderRow
          label="Border Width"
          value={borders.borderWidth ?? 1}
          min={0}
          max={6}
          unit="px"
          onChange={(val) => updateConfig("borders.borderWidth", val)}
        />

        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Border Style</label>
          <select
            value={borders.borderStyle || "solid"}
            onChange={(e) => updateConfig("borders.borderStyle", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Shadow Preset</label>
          <select
            value={borders.shadowPreset || "lg"}
            onChange={(e) => updateConfig("borders.shadowPreset", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
          >
            {SHADOW_PRESETS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-300">Hover Elevation Effect</span>
          <input
            type="checkbox"
            checked={!!borders.hoverElevation}
            onChange={(e) => updateConfig("borders.hoverElevation", e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 6: Images & Avatars
         ========================================================================= */}
      <CollapsibleSection
        title="Images & Media"
        icon={ImageIcon}
        isOpen={openSections.image}
        onToggle={() => toggleSection("image")}
      >
        <div className="flex items-center justify-between pb-2">
          <span className="font-semibold text-slate-300">Show Image</span>
          <input
            type="checkbox"
            checked={image.show !== false}
            onChange={(e) => updateConfig("image.show", e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        {image.show !== false && (
          <div className="space-y-3 pt-1 border-t border-slate-800">
            {/* Upload File */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Upload Local Image</label>
              <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-slate-300">Choose Image file</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* External URL */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Or Image URL</label>
              <input
                type="text"
                value={image.url || ""}
                onChange={(e) => updateConfig("image.url", e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Avatar Shape</label>
              <select
                value={image.avatarShape || "circle"}
                onChange={(e) => updateConfig("image.avatarShape", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
              >
                <option value="circle">Circular (Full Pill)</option>
                <option value="rounded">Rounded Square</option>
                <option value="square">Sharp Square</option>
              </select>
            </div>
          </div>
        )}
      </CollapsibleSection>

      {/* =========================================================================
          SECTION 7: Buttons & Actions
         ========================================================================= */}
      <CollapsibleSection
        title="Button & Action"
        icon={MousePointer}
        isOpen={openSections.button}
        onToggle={() => toggleSection("button")}
      >
        <div className="flex items-center justify-between pb-2">
          <span className="font-semibold text-slate-300">Show Action Button</span>
          <input
            type="checkbox"
            checked={button.show !== false}
            onChange={(e) => updateConfig("button.show", e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        {button.show !== false && (
          <div className="space-y-3 pt-1 border-t border-slate-800">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Button Label</label>
              <input
                type="text"
                value={button.label || ""}
                onChange={(e) => updateConfig("button.label", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
              />
            </div>

            <ColorPickerRow
              label="Button Background"
              value={button.btnBg || colors.accentColor || "#6366f1"}
              onChange={(val) => updateConfig("button.btnBg", val)}
            />

            <ColorPickerRow
              label="Button Text Color"
              value={button.btnTextColor || "#ffffff"}
              onChange={(val) => updateConfig("button.btnTextColor", val)}
            />

            <SliderRow
              label="Button Corner Radius"
              value={button.btnRadius ?? 12}
              min={0}
              max={30}
              unit="px"
              onChange={(val) => updateConfig("button.btnRadius", val)}
            />

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Full Width Button</span>
              <input
                type="checkbox"
                checked={button.btnFullWidth !== false}
                onChange={(e) => updateConfig("button.btnFullWidth", e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block">Button Icon</label>
              <select
                value={button.btnIcon || ""}
                onChange={(e) => updateConfig("button.btnIcon", e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
              >
                <option value="">None</option>
                {LUCIDE_ICONS_LIST.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
}

/**
 * Dynamic Content Form Fields based on card family
 */
function renderContentEditor({ sourceCardId, content, updateConfig }) {
  // Profile Card
  if (sourceCardId.includes("profile") || sourceCardId.includes("team") || sourceCardId.includes("user")) {
    const stats = content.stats || [];

    const handleStatChange = (idx, field, val) => {
      const updated = [...stats];
      updated[idx] = { ...updated[idx], [field]: val };
      updateConfig("content.stats", updated);
    };

    const handleAddStat = () => {
      if (stats.length >= 4) return;
      updateConfig("content.stats", [...stats, { label: "Metric", value: "100" }]);
    };

    const handleRemoveStat = (idx) => {
      updateConfig("content.stats", stats.filter((_, i) => i !== idx));
    };

    return (
      <div className="space-y-3">
        <TextInput
          label="Full Name"
          value={content.name || ""}
          onChange={(val) => updateConfig("content.name", val)}
        />
        <TextInput
          label="Job Role / Title"
          value={content.role || ""}
          onChange={(val) => updateConfig("content.role", val)}
        />
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 block">Short Biography</label>
          <textarea
            rows={2}
            value={content.bio || ""}
            onChange={(e) => updateConfig("content.bio", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
          />
        </div>

        {/* Stats Editor */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Profile Metrics ({stats.length})
            </label>
            {stats.length < 4 && (
              <button
                type="button"
                onClick={handleAddStat}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            )}
          </div>
          {stats.map((st, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Value"
                value={st.value}
                onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                className="w-20 bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-200 font-bold"
              />
              <input
                type="text"
                placeholder="Label"
                value={st.label}
                onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="p-1.5 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pricing Card
  if (sourceCardId.includes("pricing") || sourceCardId.includes("subscription") || sourceCardId.includes("comparison")) {
    const features = content.features || [];

    const handleFeatureChange = (idx, val) => {
      const updated = [...features];
      updated[idx] = val;
      updateConfig("content.features", updated);
    };

    const handleAddFeature = () => {
      updateConfig("content.features", [...features, "New feature item"]);
    };

    const handleRemoveFeature = (idx) => {
      updateConfig("content.features", features.filter((_, i) => i !== idx));
    };

    return (
      <div className="space-y-3">
        <TextInput
          label="Plan Name"
          value={content.planName || ""}
          onChange={(val) => updateConfig("content.planName", val)}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Currency"
            value={content.currency || "$"}
            onChange={(val) => updateConfig("content.currency", val)}
          />
          <TextInput
            label="Price"
            value={content.price || ""}
            onChange={(val) => updateConfig("content.price", val)}
          />
        </div>
        <TextInput
          label="Billing Period / Unit"
          value={content.priceUnit || ""}
          onChange={(val) => updateConfig("content.priceUnit", val)}
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-300">Highlight Plan</span>
          <input
            type="checkbox"
            checked={!!content.highlighted}
            onChange={(e) => updateConfig("content.highlighted", e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        {content.highlighted && (
          <TextInput
            label="Highlight Badge Text"
            value={content.highlightBadge || ""}
            onChange={(val) => updateConfig("content.highlightBadge", val)}
          />
        )}

        {/* Feature List Editor */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Included Features ({features.length})
            </label>
            <button
              type="button"
              onClick={handleAddFeature}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Feature
            </button>
          </div>
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="p-1.5 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Testimonial Card
  if (sourceCardId.includes("testimonial") || sourceCardId.includes("review")) {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 block">Customer Quote</label>
          <textarea
            rows={3}
            value={content.quote || ""}
            onChange={(e) => updateConfig("content.quote", e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
          />
        </div>
        <SliderRow
          label="Star Rating"
          value={content.rating || 5}
          min={1}
          max={5}
          unit="★"
          onChange={(val) => updateConfig("content.rating", val)}
        />
        <TextInput
          label="Author Name"
          value={content.authorName || ""}
          onChange={(val) => updateConfig("content.authorName", val)}
        />
        <TextInput
          label="Author Role"
          value={content.authorRole || ""}
          onChange={(val) => updateConfig("content.authorRole", val)}
        />
        <TextInput
          label="Company / Handle"
          value={content.authorCompany || ""}
          onChange={(val) => updateConfig("content.authorCompany", val)}
        />
      </div>
    );
  }

  // Stat / Metric Card
  if (sourceCardId.includes("stat") || sourceCardId.includes("kpi") || sourceCardId.includes("metric") || sourceCardId.includes("progress")) {
    return (
      <div className="space-y-3">
        <TextInput
          label="Metric Label"
          value={content.label || ""}
          onChange={(val) => updateConfig("content.label", val)}
        />
        <TextInput
          label="Metric Value"
          value={content.value || ""}
          onChange={(val) => updateConfig("content.value", val)}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Trend %"
            value={content.changePercent || ""}
            onChange={(val) => updateConfig("content.changePercent", val)}
          />
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 block">Direction</label>
            <select
              value={content.changeDirection || "up"}
              onChange={(e) => updateConfig("content.changeDirection", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
            >
              <option value="up">Positive (Up)</option>
              <option value="down">Negative (Down)</option>
            </select>
          </div>
        </div>
        <TextInput
          label="Footer Note Left"
          value={content.footerLeft || ""}
          onChange={(val) => updateConfig("content.footerLeft", val)}
        />
        <TextInput
          label="Footer Note Right"
          value={content.footerRight || ""}
          onChange={(val) => updateConfig("content.footerRight", val)}
        />
      </div>
    );
  }

  // Product Card
  if (sourceCardId.includes("product") || sourceCardId.includes("ecommerce")) {
    return (
      <div className="space-y-3">
        <TextInput
          label="Product Name"
          value={content.productName || ""}
          onChange={(val) => updateConfig("content.productName", val)}
        />
        <TextInput
          label="Category"
          value={content.category || ""}
          onChange={(val) => updateConfig("content.category", val)}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Current Price"
            value={content.price || ""}
            onChange={(val) => updateConfig("content.price", val)}
          />
          <TextInput
            label="Original Price"
            value={content.originalPrice || ""}
            onChange={(val) => updateConfig("content.originalPrice", val)}
          />
        </div>
        <TextInput
          label="Badge Text"
          value={content.badge || ""}
          onChange={(val) => updateConfig("content.badge", val)}
        />
      </div>
    );
  }

  // Generic / Feature / Blank Card
  return (
    <div className="space-y-3">
      <TextInput
        label="Title"
        value={content.title || ""}
        onChange={(val) => updateConfig("content.title", val)}
      />
      <div className="space-y-1">
        <label className="text-[11px] text-slate-400 block">Description</label>
        <textarea
          rows={3}
          value={content.description || ""}
          onChange={(e) => updateConfig("content.description", e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
        />
      </div>
      <TextInput
        label="Icon (Emoji)"
        value={content.iconEmoji || "⚡"}
        onChange={(val) => updateConfig("content.iconEmoji", val)}
      />
    </div>
  );
}

// Collapsible Section Container
function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, badge, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100/70 hover:bg-slate-200/60 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-left select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />}
          <span className="font-bold text-xs text-slate-800 dark:text-slate-200 tracking-tight truncate">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-3.5 space-y-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0f19]/60">
          {children}
        </div>
      )}
    </div>
  );
}

// Reusable Input Rows
function TextInput({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
      />
    </div>
  );
}

function ColorPickerRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-slate-500 dark:text-slate-400 text-xs truncate">{label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="color"
          value={value?.startsWith("#") ? value : "#6366f1"}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, unit = "", onChange }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  );
}
