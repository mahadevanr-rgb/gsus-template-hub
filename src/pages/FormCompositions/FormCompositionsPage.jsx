import React, { useEffect, useMemo, useState } from "react";
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
  SlidersHorizontal,
  ArrowRight,
  GripVertical,
  Trash2,
  X,
  Sparkles,
  Check,
  Type,
  KeyRound,
  AlignLeft,
  CheckSquare,
} from "lucide-react";
import formFields from "@/codeRegistry/formsRegistry";
import {
  saveFormComposition,
  generateUniqueSlug,
  fetchFormCompositions,
} from "@/services/db";
import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import PrimaryButton from "@/pages/Buttons/components/PrimaryButton/PrimaryButton";

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

function CompositionBuilder({ onClose }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Custom");
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please provide a name for this form composition.");
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
        props: {
          placeholder: f.config.placeholder,
          required: f.config.required,
        },
      })),
      action: { component: "primary-button", label: "Submit" },
      dependencies: Array.from(new Set(fields.map((f) => f.fieldSlug))).concat(
        "primary-button",
      ),
      tags: ["custom", "form", category.toLowerCase()],
    };

    await saveFormComposition(compositionData);
    setSaving(false);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span
            className="hover:text-white cursor-pointer"
            onClick={onClose}
          >
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
                        field={formFields.find((f) => f.slug === inst.fieldSlug)}
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
                <h4 className="text-xs font-bold text-white mb-1">Canvas is empty</h4>
                <p className="text-xs text-slate-400 mb-4 max-w-xs">
                  Add reusable form inputs from the field library to start assembling your form.
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
                <div>
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
                            ? { ...f, config: { ...f.config, placeholder: val } }
                            : f,
                        ),
                      );
                    }}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
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
                  <label className="text-[11px] text-slate-300 font-medium block">
                    {f.config.label}
                    {f.config.required && <span className="text-rose-400 ml-1">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder={f.config.placeholder}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 cursor-not-allowed"
                  />
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
                <p className="text-xs text-slate-400">Choose from available primitives</p>
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

  useEffect(() => {
    let active = true;
    fetchFormCompositions().then((result) => {
      if (active) {
        setAllCompositions(result || []);
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
          const tags = Array.isArray(composition.tags) ? composition.tags.join(" ") : "";
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
                <span className="text-xs text-slate-500 font-mono">
                  {composition.fields?.length || 0} fields
                </span>
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
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-indigo-400 transition-colors">
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
          <p className="text-xs text-slate-400">No form compositions match your search.</p>
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
