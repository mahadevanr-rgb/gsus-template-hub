import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Layers,
  Plus,
  Search,
  ArrowRight,
  GripVertical,
  Trash2,
  X,
  Check,
} from "lucide-react";
import formFields from "@/codeRegistry/formsRegistry";
import { formCompositions as builtInCompositions } from "@/codeRegistry/formCompositionsRegistry";
import {
  saveFormComposition,
  deleteFormComposition,
  generateUniqueSlug,
  fetchFormCompositions,
} from "@/services/db";
import {
  DateTimeComponentMap,
  getCompositionFieldValidationRules,
  getDateTimePickerProps,
  getCompositionPickerProps,
  getPickerVisualControls,
  validateDateTimePickerProps,
  validateCompositionValidationRules,
} from "./dateTimeFieldUtils";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";
import FieldAdapter from "@/lib/fieldAdapter";

const fieldsWithoutPlaceholder = new Set([
  "checkbox", "radio-button", "switch-toggle", "range-slider", "file-upload",
  "otp-input", "input-label", "input-error", "helper-text",
]);

const pickerAppearanceProps = new Set(["theme", "size", "width", "variant", "accentColor"]);
const compositionOnlyPickerProps = (fieldSlug, name) => name !== "presets" || fieldSlug === "date-range-picker";
const optionFieldSlugs = new Set(["select-dropdown", "radio-button"]);
const getCompositionPickerOptions = (fieldSlug, config = {}) => {
  const options = getDateTimePickerProps(fieldSlug, config);
  return Object.fromEntries(Object.entries(options).filter(([name]) => !pickerAppearanceProps.has(name) && compositionOnlyPickerProps(fieldSlug, name)));
};
const getCompositionFieldProps = (fieldSlug, config = {}) => {
  if (DateTimeComponentMap[fieldSlug]) return getCompositionPickerOptions(fieldSlug, config);
  return {
    ...(!fieldsWithoutPlaceholder.has(fieldSlug) && config.placeholder !== undefined ? { placeholder: config.placeholder } : {}),
    ...(optionFieldSlugs.has(fieldSlug) ? { options: config.options || [] } : {}),
    ...(fieldSlug === "range-slider" ? { min: Number(config.min ?? 0), max: Number(config.max ?? 100), step: Number(config.step ?? 1) } : {}),
  };
};

const getPreviewInitialValue = (fieldSlug, config = {}) => {
  if (fieldSlug === "range-slider") {
    const min = Number(config.min ?? 0);
    const max = Number(config.max ?? 100);
    return Math.min(max, Math.max(min, Math.round((min + max) / 2)));
  }
  if (["checkbox", "switch-toggle"].includes(fieldSlug)) return false;
  if (fieldSlug.includes("range")) return {};
  return "";
};

function SortableFieldItem({ instance, field, selected, onSelect, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: instance.instanceId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
        selected
          ? "bg-indigo-600/10 border-indigo-500 text-white ring-1 ring-indigo-500/30"
          : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-slate-300"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div>
          <p className="text-xs font-semibold text-white">
            {instance.config.label || field?.name || "Field"}
          </p>
          <p className="text-[10px] text-slate-500 capitalize">
            {instance.fieldSlug}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(instance.instanceId);
        }}
        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function DateTimeOptionsEditor({ instance, onChange, onValidityChange }) {
  const controls = getPickerVisualControls(instance.fieldSlug);
  const dateTimeOrder = { locale: 0, format: 1, timeFormat: 1, includeSeconds: 2, minDate: 3, min: 3, maxDate: 4, max: 4, disabledDates: 5, clearable: 6, disableWeekends: 7, disabledDays: 8, presets: 9 };
  const orderedDateTimeControls = controls.dateTime.filter((control) => compositionOnlyPickerProps(instance.fieldSlug, control.name)).sort((a, b) => (dateTimeOrder[a.name] ?? 10) - (dateTimeOrder[b.name] ?? 10));
  const options = getCompositionPickerOptions(instance.fieldSlug, instance.config);
  const jsonValue = JSON.stringify({
    ...options,
    ...(instance.config.validationRules ? { validationRules: instance.config.validationRules } : {}),
  }, null, 2);
  const [draft, setDraft] = useState(jsonValue);
  const [error, setError] = useState("");
  const [controlErrors, setControlErrors] = useState({});
  const [controlDrafts, setControlDrafts] = useState({});
  const [presetsDraft, setPresetsDraft] = useState(() => options.presets || []);

  const updateProp = (name, value) => {
    const next = { ...options, [name]: value };
    const validationRules = instance.config.validationRules;
    setDraft(JSON.stringify({ ...next, ...(validationRules ? { validationRules } : {}) }, null, 2));
    if (name === "presets") setControlDrafts((current) => ({ ...current, presets: JSON.stringify(value || [], null, 2) }));
    onChange({ [name]: value });
  };
  const validatePresets = (presets) => {
    if (!Array.isArray(presets)) return "Presets must be a JSON array.";
    if (presets.some((preset) => !String(preset?.label || "").trim())) return "Give every preset a label.";
    return validateDateTimePickerProps(instance.fieldSlug, { presets })[0] || "";
  };
  const updatePresetsDraft = (nextPresets) => {
    setPresetsDraft(nextPresets);
    const validationError = validatePresets(nextPresets);
    if (!validationError) updateProp("presets", nextPresets);
    setControlErrors((current) => ({ ...current, presets: validationError }));
    onValidityChange?.(instance.instanceId, !validationError && !error);
  };
  const renderControl = (control) => {
    const value = options[control.name];
    const label = control.label || control.name;
    if (control.type === "enum") {
      const enumOptions = control.options || control.values?.map((item) => ({ value: item, label: item })) || [];
      const mergedOptions = [...enumOptions, ...(control.values || []).filter((item) => !enumOptions.some((option) => option.value === item)).map((item) => ({ value: item, label: item }))];
      return <label key={control.name} className="block text-xs text-slate-300">{label}<select value={value ?? (control.name === "theme" ? "inherit" : control.values?.[0] || "")} onChange={(event) => updateProp(control.name, event.target.value === "inherit" ? undefined : event.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white">{control.name === "theme" && <option value="inherit">Use composition theme</option>}{mergedOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
    }
    if (control.type === "color") return <label key={control.name} className="block text-xs text-slate-300">{label}<input type="color" value={value || "#4f46e5"} onChange={(event) => updateProp(control.name, event.target.value)} className="mt-1 h-9 w-full rounded-lg border border-slate-700 bg-slate-950 p-1" /></label>;
    if (control.type === "boolean") return <label key={control.name} className="flex min-h-9 items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={Boolean(value)} onChange={(event) => updateProp(control.name, event.target.checked)} className="accent-indigo-500" />{label}</label>;
    if (control.type === "weekday-list") return <fieldset key={control.name} className="col-span-2 min-w-0"><legend className="mb-1 text-xs text-slate-300">{label}</legend><div className="flex flex-wrap gap-x-3 gap-y-2">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => <label key={day} className="flex items-center gap-1.5 text-[11px] text-slate-400"><input type="checkbox" checked={(value || []).includes(index)} onChange={(event) => updateProp(control.name, event.target.checked ? [...new Set([...(value || []), index])].sort() : (value || []).filter((item) => item !== index))} className="accent-indigo-500" />{day}</label>)}</div></fieldset>;
    if (control.type === "presets") return <section key={control.name} className="col-span-2 min-w-0 space-y-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3" aria-labelledby={`${instance.instanceId}-presets-title`}>
      <div className="flex flex-wrap items-start justify-between gap-2"><div><h5 id={`${instance.instanceId}-presets-title`} className="text-xs font-semibold text-slate-200">Date range presets</h5><p className="mt-1 text-[10px] text-slate-500">Add quick date ranges people can select in the picker. Dates use YYYY-MM-DD.</p></div><button type="button" onClick={() => updatePresetsDraft([...presetsDraft, { label: `Preset ${presetsDraft.length + 1}`, value: { start: "", end: "" } }])} className="rounded-lg border border-indigo-500/40 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/10">Add preset</button></div>
      {presetsDraft.length === 0 ? <p className="rounded-lg border border-dashed border-slate-700 px-3 py-4 text-center text-[11px] text-slate-500">No presets yet. Add one for a reusable date range.</p> : <div className="space-y-2.5">{presetsDraft.map((preset, index) => <div key={`${control.name}-${index}`} className="grid min-w-0 grid-cols-1 items-end gap-2 rounded-lg border border-slate-800 p-2.5 min-[541px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <label className="block min-w-0 text-[10px] text-slate-400">Preset label<input type="text" value={preset.label || ""} onChange={(event) => updatePresetsDraft(presetsDraft.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} placeholder="Last 7 Days" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>
        <label className="block min-w-0 text-[10px] text-slate-400">Start date<input type="date" value={preset.value?.start || ""} onChange={(event) => updatePresetsDraft(presetsDraft.map((item, itemIndex) => itemIndex === index ? { ...item, value: { ...(item.value || {}), start: event.target.value } } : item))} className="mt-1 w-full min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>
        <label className="block min-w-0 text-[10px] text-slate-400">End date<input type="date" value={preset.value?.end || ""} onChange={(event) => updatePresetsDraft(presetsDraft.map((item, itemIndex) => itemIndex === index ? { ...item, value: { ...(item.value || {}), end: event.target.value } } : item))} className="mt-1 w-full min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>
        <button type="button" onClick={() => updatePresetsDraft(presetsDraft.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${preset.label || `preset ${index + 1}`}`} className="mb-0.5 justify-self-end rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"><Trash2 className="h-4 w-4" /></button>
      </div>)}</div>}
      {controlErrors[control.name] && <p role="alert" className="text-[11px] text-rose-400">{controlErrors[control.name]}</p>}
      <div className="rounded-lg border border-slate-800 p-2.5"><label htmlFor={`${instance.instanceId}-presets-json`} className="text-[11px] font-semibold text-slate-300">Presets JSON</label><p className="mb-2 mt-1 text-[10px] text-slate-500">Each item needs a label and a value with start/end dates. Example: {`[{"label":"Last 7 Days","value":{"start":"2026-10-19","end":"2026-10-25"}}]`}</p><textarea id={`${instance.instanceId}-presets-json`} aria-label="Date range presets JSON" value={controlDrafts[control.name] ?? JSON.stringify(presetsDraft, null, 2)} onChange={(event) => { const raw = event.target.value; setControlDrafts((current) => ({ ...current, [control.name]: raw })); try { const parsed = JSON.parse(raw); const validationError = validatePresets(parsed); if (validationError) throw new Error(validationError); setPresetsDraft(parsed); updateProp(control.name, parsed); setControlErrors((current) => ({ ...current, [control.name]: "" })); onValidityChange?.(instance.instanceId, !error); } catch (parseError) { onValidityChange?.(instance.instanceId, false); setControlErrors((current) => ({ ...current, [control.name]: parseError.message || "Enter a valid JSON array of presets." })); } }} rows={5} spellCheck={false} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white" /></div>
    </section>;
    if (["date-list", "weekday-list"].includes(control.type)) return <label key={control.name} className="col-span-2 block min-w-0 text-xs text-slate-300">{label}<input value={(value || []).join(", ")} onChange={(event) => updateProp(control.name, event.target.value.split(",").map((item) => item.trim()).filter(Boolean).map((item) => control.type === "weekday-list" ? Number(item) : item))} placeholder={control.type === "date-list" ? "YYYY-MM-DD, YYYY-MM-DD" : "0, 6 (Sunday, Saturday)"} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" /></label>;
    const type = control.type === "date" ? "date" : control.type === "month" ? "month" : control.type === "time" ? "time" : control.type === "year" ? "number" : control.type === "datetime-bound" ? "datetime-local" : "text";
    return <label key={control.name} className="block text-xs text-slate-300">{label}<input type={type} min={type === "number" ? 1 : undefined} max={type === "number" ? 9999 : undefined} value={value ?? ""} onChange={(event) => updateProp(control.name, type === "number" && event.target.value ? Number(event.target.value) : event.target.value || undefined)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white" /></label>;
  };

  const applyAdvanced = () => {
    try {
      const parsed = JSON.parse(draft);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Configuration must be a JSON object.");
      const { validationRules = {}, ...pickerProps } = parsed;
      const appearanceOverrides = Object.keys(pickerProps).filter((name) => pickerAppearanceProps.has(name));
      if (appearanceOverrides.length) throw new Error("Picker appearance follows the form composition theme. Remove theme, size, width, variant, and accentColor from this configuration.");
      if (pickerProps.presets !== undefined && !compositionOnlyPickerProps(instance.fieldSlug, "presets")) throw new Error("Date range presets are only supported by the Date Range Picker in form compositions.");
      const presetError = pickerProps.presets === undefined ? "" : validatePresets(pickerProps.presets);
      if (presetError) throw new Error(presetError);
      const errors = [...validateDateTimePickerProps(instance.fieldSlug, pickerProps), ...validateCompositionValidationRules(validationRules)];
      if (errors.length) throw new Error(errors.join(" "));
      if (pickerProps.presets !== undefined) {
        setPresetsDraft(pickerProps.presets);
        setControlDrafts({ presets: JSON.stringify(pickerProps.presets, null, 2) });
        setControlErrors({});
      }
      onChange({ ...pickerProps, validationRules }, true);
      onValidityChange?.(instance.instanceId, true);
      setError("");
    } catch (parseError) {
      onValidityChange?.(instance.instanceId, false);
      setError(parseError.message || "Enter valid JSON.");
    }
  };

  return <div className="space-y-4 border-t border-slate-800 pt-4">
    {orderedDateTimeControls.length > 0 && <section className="space-y-2"><h4 className="text-xs font-semibold text-white">Date &amp; Time</h4><div className="grid grid-cols-2 items-start gap-3">{orderedDateTimeControls.map((control) => control.name === "locale" ? <div key={control.name} className="col-span-2">{renderControl(control)}</div> : renderControl(control))}</div></section>}
    <details className="rounded-lg border border-slate-800 p-3"><summary className="cursor-pointer text-xs font-semibold text-slate-200">Advanced JSON</summary><p className="mb-2 mt-2 text-[10px] text-slate-500">Only props supported by this picker and supported validation rules are accepted.</p><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={6} spellCheck={false} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-white" /><button type="button" onClick={applyAdvanced} className="mt-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Apply JSON</button>{error && <p role="alert" className="mt-2 text-xs text-rose-400">{error}</p>}</details>
  </div>;
}

function CompositionBuilder({ onClose }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Custom");
  const [fields, setFields] = useState([]);
  const [previewValues, setPreviewValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [invalidPickerIds, setInvalidPickerIds] = useState(() => new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const addField = (field) => {
    const newInst = {
      instanceId: `inst-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      fieldSlug: field.slug,
      config: {
        label: field.name,
        placeholder: `Enter ${field.name.toLowerCase()}...`,
        required: false,
        ...(optionFieldSlugs.has(field.slug) ? { options: [{ value: "option-1", label: "Option 1" }, { value: "option-2", label: "Option 2" }] } : {}),
        ...(field.slug === "range-slider" ? { min: 0, max: 100, step: 1 } : {}),
      },
    };
    setFields((prev) => [...prev, newInst]);
    setSelectedId(newInst.instanceId);
    setPickerOpen(false);
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((f) => f.instanceId !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((i) => i.instanceId === active.id);
        const newIndex = items.findIndex((i) => i.instanceId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const selectedField = fields.find((f) => f.instanceId === selectedId);
  const selectedOptions = selectedField?.config.options || [];
  const selectedOptionsInvalid = Boolean(selectedField && optionFieldSlugs.has(selectedField.fieldSlug) && (
    !selectedOptions.length || selectedOptions.some((option) => !String(option.value || "").trim() || !String(option.label || "").trim()) ||
    new Set(selectedOptions.map((option) => String(option.value).trim())).size !== selectedOptions.length
  ));
  const selectedRangeInvalid = Boolean(selectedField?.fieldSlug === "range-slider" && (
    !Number.isFinite(Number(selectedField.config.min)) || !Number.isFinite(Number(selectedField.config.max)) ||
    !Number.isFinite(Number(selectedField.config.step)) || Number(selectedField.config.max) <= Number(selectedField.config.min) || Number(selectedField.config.step) <= 0
  ));
  const updateSelectedConfig = (patch) => setFields((current) => current.map((field) =>
    field.instanceId === selectedId ? { ...field, config: { ...field.config, ...patch } } : field,
  ));
  const updateOption = (index, key, value) => updateSelectedConfig({
    options: (selectedField.config.options || []).map((option, optionIndex) => optionIndex === index ? { ...option, [key]: value } : option),
  });
  const addOption = () => {
    const options = selectedField.config.options || [];
    let index = options.length + 1;
    while (options.some((option) => option.value === `option-${index}`)) index += 1;
    updateSelectedConfig({ options: [...options, { value: `option-${index}`, label: `Option ${index}` }] });
  };
  const removeOption = (index) => updateSelectedConfig({
    options: (selectedField.config.options || []).filter((_, optionIndex) => optionIndex !== index),
  });
  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please provide a name for this form composition.");
      return;
    }
    if (fields.some((field) => invalidPickerIds.has(field.instanceId))) {
      alert("Apply or correct the advanced picker JSON configuration before saving.");
      return;
    }
    const invalidPicker = fields.find((field) => DateTimeComponentMap[field.fieldSlug] && (
      validateDateTimePickerProps(field.fieldSlug, getCompositionPickerOptions(field.fieldSlug, field.config)).length ||
      validateCompositionValidationRules(field.config.validationRules || {}).length
    ));
    if (invalidPicker) {
      alert(`Please correct the picker configuration for “${invalidPicker.config.label || "Date & Time field"}” before saving.`);
      return;
    }
    const invalidOptions = fields.find((field) => optionFieldSlugs.has(field.fieldSlug) && (
      !Array.isArray(field.config.options) || !field.config.options.length ||
      field.config.options.some((option) => !String(option.value || "").trim() || !String(option.label || "").trim()) ||
      new Set(field.config.options.map((option) => String(option.value).trim())).size !== field.config.options.length
    ));
    if (invalidOptions) {
      alert(`Add at least one option with a unique value and a label to “${invalidOptions.config.label || "this field"}”.`);
      return;
    }
    const invalidRange = fields.find((field) => field.fieldSlug === "range-slider" && (
      !Number.isFinite(Number(field.config.min)) || !Number.isFinite(Number(field.config.max)) ||
      !Number.isFinite(Number(field.config.step)) || Number(field.config.max) <= Number(field.config.min) || Number(field.config.step) <= 0
    ));
    if (invalidRange) {
      alert(`Set a valid minimum, a greater maximum, and a positive step for “${invalidRange.config.label || "this range"}”.`);
      return;
    }
    setSaving(true);
    const slug = generateUniqueSlug(name);
    const compositionData = {
      id: slug,
      slug,
      name,
      category,
      description: description || "Custom built form composition.",
      version: "1.0.0",
      fields: fields.map((f) => ({
        id: f.instanceId,
        component: f.fieldSlug,
        label: f.config.label,
        props: getCompositionFieldProps(f.fieldSlug, f.config),
        validationRules: getCompositionFieldValidationRules({
          component: f.fieldSlug,
          props: { required: f.config.required },
          validationRules: f.config.validationRules,
        }),
      })),
      action: { component: "primary-button", label: "Submit" },
      dependencies: Array.from(new Set(fields.map((f) => f.fieldSlug))).concat(
        "primary-button",
      ),
      tags: ["custom", "form", category.toLowerCase()],
    };

    try {
      const result = await saveFormComposition(compositionData);
      if (!result?.data)
        throw new Error(result?.error || "Unable to save composition.");
      navigate(`/form-compositions/${result.data.slug}`);
    } catch (error) {
      alert(error.message || "Unable to save composition. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="hover:text-white cursor-pointer" onClick={onClose}>
            Form Compositions
          </span>
          <span>/</span>
          <span className="text-white font-medium">New Composition</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving || !fields.length}
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Composition"}</span>
          </button>
        </div>
      </div>

      {/* Main Builder Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Canvas (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata inputs */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Composition Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lead Capture Form"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Authentication">Authentication</option>
                  <option value="Contact">Contact</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what this composition accomplishes..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Canvas & Fields */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Form Fields</h3>
                <p className="text-xs text-slate-400">
                  Drag to reorder or click to customize.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Field</span>
              </button>
            </div>

            {fields.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields.map((f) => f.instanceId)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2.5">
                    {fields.map((inst) => (
                      <SortableFieldItem
                        key={inst.instanceId}
                        instance={inst}
                        field={formFields.find(
                          (f) => f.slug === inst.fieldSlug,
                        )}
                        selected={selectedId === inst.instanceId}
                        onSelect={() => setSelectedId(inst.instanceId)}
                        onRemove={removeField}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Canvas is empty
                </h4>
                <p className="text-xs text-slate-400 mb-4 max-w-xs">
                  Add reusable form inputs from the field library to start
                  assembling your form.
                </p>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Browse Field Library
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Settings & Preview (1 col) */}
        <div className="space-y-6">
          {/* Field Settings */}
          {selectedField ? (
            <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Field Properties
              </h3>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-white">Basic</h4>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={selectedField.config.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFields((prev) =>
                        prev.map((f) =>
                          f.instanceId === selectedId
                            ? { ...f, config: { ...f.config, label: val } }
                            : f,
                        ),
                      );
                    }}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                {!fieldsWithoutPlaceholder.has(selectedField.fieldSlug) && <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={selectedField.config.placeholder}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFields((prev) =>
                        prev.map((f) =>
                          f.instanceId === selectedId
                            ? {
                                ...f,
                                config: { ...f.config, placeholder: val },
                              }
                            : f,
                        ),
                      );
                    }}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="reqCheck"
                    checked={selectedField.config.required}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setFields((prev) =>
                        prev.map((f) =>
                          f.instanceId === selectedId
                            ? { ...f, config: { ...f.config, required: val } }
                            : f,
                        ),
                      );
                    }}
                    className="rounded bg-slate-950 border-slate-800 text-indigo-600"
                  />
                  <label htmlFor="reqCheck" className="text-xs text-slate-300">
                    Required field
                  </label>
                </div>
                {selectedField && optionFieldSlugs.has(selectedField.fieldSlug) && <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3" aria-label={`${selectedField.fieldSlug === "select-dropdown" ? "Dropdown" : "Radio button"} options`}>
                  <div className="flex items-center justify-between gap-2">
                    <div><h4 className="text-xs font-semibold text-slate-200">Options</h4><p className="mt-1 text-[10px] text-slate-500">Set the stored value and the text users see.</p></div>
                    <button type="button" onClick={addOption} className="shrink-0 rounded-lg border border-indigo-500/40 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/10">Add option</button>
                  </div>
                  {selectedOptions.map((option, index) => <div key={`${selectedField.instanceId}-option-${index}`} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end gap-2">
                    <label className="block min-w-0 text-[10px] text-slate-400">Label<input type="text" value={option.label ?? ""} onChange={(event) => updateOption(index, "label", event.target.value)} placeholder={`Option ${index + 1}`} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>
                    <label className="block min-w-0 text-[10px] text-slate-400">Value<input type="text" value={option.value ?? ""} onChange={(event) => updateOption(index, "value", event.target.value)} placeholder={`option-${index + 1}`} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>
                    <button type="button" onClick={() => removeOption(index)} aria-label={`Remove option ${option.label || index + 1}`} className="mb-0.5 rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"><Trash2 className="h-4 w-4" /></button>
                  </div>)}
                  {selectedOptionsInvalid && <p role="alert" className="text-[11px] text-rose-400">Provide a label and unique value for every option, with at least one option.</p>}
                </section>}
                {selectedField?.fieldSlug === "range-slider" && <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3" aria-label="Range slider limits">
                  <h4 className="text-xs font-semibold text-slate-200">Range limits</h4>
                  <p className="text-[10px] text-slate-500">Choose the allowed minimum, maximum, and increment.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[ ["min", "Minimum"], ["max", "Maximum"], ["step", "Step"] ].map(([key, label]) => <label key={key} className="block min-w-0 text-[10px] text-slate-400">{label}<input type="number" value={selectedField.config[key] ?? (key === "max" ? 100 : key === "step" ? 1 : 0)} onChange={(event) => updateSelectedConfig({ [key]: event.target.value === "" ? "" : Number(event.target.value) })} className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" /></label>)}
                  </div>
                  {selectedRangeInvalid && <p role="alert" className="text-[11px] text-rose-400">Maximum must be greater than minimum, and step must be positive.</p>}
                </section>}
                {DateTimeComponentMap[selectedField.fieldSlug] && (
                  <DateTimeOptionsEditor
                    key={selectedField.instanceId}
                    instance={selectedField}
                    onValidityChange={(fieldId, isValid) => setInvalidPickerIds((current) => {
                      const next = new Set(current);
                      if (isValid) next.delete(fieldId);
                      else next.add(fieldId);
                      return next;
                    })}
                    onChange={(options, replacePickerOptions = false) =>
                      setFields((current) =>
                        current.map((field) =>
                          field.instanceId === selectedId
                            ? {
                                ...field,
                                config: replacePickerOptions
                                  ? {
                                      label: field.config.label,
                                      placeholder: field.config.placeholder,
                                      required: field.config.required,
                                      ...options,
                                    }
                                  : { ...field.config, ...options },
                              }
                            : field,
                        ),
                      )
                    }
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center py-8">
              <p className="text-xs text-slate-500">
                Select a field to configure its properties
              </p>
            </div>
          )}

          {/* Mini Live Preview */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Preview
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              {fields.map((f) => (
                <div key={f.instanceId} className="space-y-1">
                  {(() => {
                    const Picker = DateTimeComponentMap[f.fieldSlug];
                    if (Picker) return (
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-300 font-medium block">
                          {f.config.label}{f.config.required && <span className="ml-1 text-rose-400">*</span>}
                        </label>
                        <Picker
                        {...getCompositionPickerProps(f.fieldSlug, getCompositionPickerOptions(f.fieldSlug, f.config), "default")}
                        label=""
                        value={
                          previewValues[f.instanceId] ??
                          getPreviewInitialValue(f.fieldSlug, f.config)
                        }
                        onChange={(value) =>
                          setPreviewValues((current) => ({
                            ...current,
                            [f.instanceId]: value,
                          }))
                        }
                      />
                      </div>
                    );
                    return <FieldAdapter
                      field={{
                        component: f.fieldSlug,
                        label: f.config.label,
                        props: { ...getCompositionFieldProps(f.fieldSlug, f.config), required: f.config.required },
                      }}
                      value={previewValues[f.instanceId] ?? getPreviewInitialValue(f.fieldSlug, f.config)}
                      onChange={(value) => setPreviewValues((current) => ({ ...current, [f.instanceId]: value }))}
                    />;
                  })()}
                </div>
              ))}
              <div className="pt-2">
                <PrimaryButton className="w-full">Submit Form</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Field Picker Modal */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setPickerOpen(false)}
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Add a Field</h3>
                <p className="text-xs text-slate-400">
                  Choose from available primitives
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
              {formFields.map((field) => (
                <button
                  key={field.slug}
                  type="button"
                  onClick={() => addField(field)}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 transition-all flex items-center justify-between text-left group"
                >
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-indigo-400">
                      {field.name}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {field.description}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompositionCollection({ onNew }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name");
  const [allCompositions, setAllCompositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState("");

  useEffect(() => {
    let active = true;
    fetchFormCompositions().then((result) => {
      if (active) {
        const builtInSlugs = new Set(builtInCompositions.map((item) => item.slug));
        setAllCompositions((result || []).filter((item) => !(item.customizedFrom && builtInSlugs.has(item.customizedFrom))));
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = [
    "All",
    ...new Set(allCompositions.map((composition) => composition.category)),
  ];

  const compositions = useMemo(
    () =>
      allCompositions
        .filter(
          (composition) =>
            category === "All" || composition.category === category,
        )
        .filter((composition) => {
          const tags = Array.isArray(composition.tags)
            ? composition.tags.join(" ")
            : "";
          return `${composition.name} ${composition.description} ${tags}`
            .toLowerCase()
            .includes(query.toLowerCase());
        })
        .sort((a, b) =>
          sort === "name"
            ? a.name.localeCompare(b.name)
            : (b.version || "1.0.0").localeCompare(a.version || "1.0.0"),
        ),
    [allCompositions, category, query, sort],
  );

  const handleDelete = async (event, composition) => {
    event.stopPropagation();
    if (!window.confirm(`Delete “${composition.name}”? This cannot be undone.`)) return;

    setDeletingSlug(composition.slug);
    try {
      await deleteFormComposition(composition.slug);
      setAllCompositions((current) => current.filter((item) => item.slug !== composition.slug));
    } catch (error) {
      window.alert(error.message || "Unable to delete this composition.");
    } finally {
      setDeletingSlug("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span
          className="hover:text-white cursor-pointer transition-colors"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <span>/</span>
        <span className="text-white font-medium">Form Compositions</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Field Patterns</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Form Compositions
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ready-to-use form patterns assembled from reusable UI atoms.
          </p>
        </div>

        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Composition</span>
        </button>
      </div>

      {/* Toolbar (Filters & Search) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                category === item
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search compositions..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="version">Version</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {compositions.map((composition) => (
          <div
            key={composition.slug}
            onClick={() => navigate(`/form-compositions/${composition.slug}`)}
            className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-indigo-500/5"
          >
            <div className="space-y-3">
              {/* Card Meta Row */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border text-indigo-400 bg-indigo-500/10 border-indigo-500/20">
                  {composition.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">
                    {composition.fields?.length || 0} fields
                  </span>
                  {composition.category === "Custom" && (
                    <button
                      type="button"
                      aria-label={`Delete ${composition.name}`}
                      title="Delete composition"
                      disabled={deletingSlug === composition.slug}
                      onClick={(event) => handleDelete(event, composition)}
                      className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 disabled:cursor-wait disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {composition.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {composition.description}
                </p>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs font-medium text-slate-400 group-hover:text-indigo-400 transition-colors">
              <span>View composition</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-xs text-slate-400">Loading form compositions...</p>
        </div>
      )}

      {!loading && !compositions.length && (
        <div className="text-center py-12 border border-slate-800 rounded-2xl bg-slate-900/40 p-8">
          <p className="text-xs text-slate-400">
            No form compositions match your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default function FormCompositionsPage() {
  const [building, setBuilding] = useState(false);
  return building ? (
    <CompositionBuilder onClose={() => setBuilding(false)} />
  ) : (
    <CompositionCollection onNew={() => setBuilding(true)} />
  );
}
