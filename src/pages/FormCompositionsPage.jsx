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
  AlignLeft,
  AlertCircle,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  CircleDot,
  GripVertical,
  Hash,
  Info,
  KeyRound,
  ListFilter,
  Plus,
  Search,
  SlidersHorizontal,
  ToggleLeft,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import FieldAdapter from "../lib/fieldAdapter";
// import formCompositions from "../registry/form-compositions";
import formFields from "../registry/forms";
import {
  saveFormComposition,
  generateUniqueSlug,
  fetchFormCompositions,
} from "../lib/db";
import "./FormCompositionsPage.css";

const FIELD_ICONS = {
  "text-input": Type,
  "password-input": KeyRound,
  textarea: AlignLeft,
  "search-input": Search,
  "select-dropdown": ListFilter,
  checkbox: CheckSquare,
  "radio-button": CircleDot,
  "switch-toggle": ToggleLeft,
  "range-slider": SlidersHorizontal,
  "date-input": Calendar,
  "file-upload": Upload,
  "otp-input": Hash,
  "input-label": Type,
  "input-error": AlertCircle,
  "helper-text": Info,
};
const PLACEHOLDER_FIELDS = new Set([
  "text-input",
  "password-input",
  "textarea",
  "search-input",
  "select-dropdown",
]);
const REQUIRED_FIELDS = new Set([
  "text-input",
  "password-input",
  "textarea",
  "search-input",
  "select-dropdown",
  "date-input",
  "checkbox",
  "radio-button",
]);

function fieldInstance(field, order) {
  return {
    instanceId:
      globalThis.crypto?.randomUUID?.() ||
      `${field.slug}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    fieldSlug: field.slug,
    order,
    config: {
      label: field.name,
      placeholder: "",
      required: false,
      validation: { rule: "none" },
    },
  };
}

function previewField(instance) {
  const { config } = instance;
  const props = {
    required: REQUIRED_FIELDS.has(instance.fieldSlug) && config.required,
  };
  if (PLACEHOLDER_FIELDS.has(instance.fieldSlug))
    props.placeholder = config.placeholder;
  if (
    instance.fieldSlug === "text-input" &&
    config.validation?.rule === "email"
  )
    props.type = "email";
  return { component: instance.fieldSlug, label: config.label, props };
}

function FieldPicker({ onAdd, onClose }) {
  const [query, setQuery] = useState("");
  const fields = formFields.filter((field) =>
    `${field.name} ${field.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div
      className="fcb-picker-overlay"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="fcb-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fcb-picker-title"
      >
        <header>
          <div>
            <p>Field library</p>
            <h2 id="fcb-picker-title">Add a field</h2>
          </div>
          <button
            className="fcb-icon-button"
            onClick={onClose}
            aria-label="Close field picker"
          >
            <X size={20} />
          </button>
        </header>
        <label className="fcb-picker-search">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search form fields"
          />
        </label>
        <div className="fcb-picker-grid">
          {fields.map((field) => {
            const Icon = FIELD_ICONS[field.slug] || Type;
            return (
              <button
                className="fcb-picker-field"
                key={field.slug}
                onClick={() => onAdd(field)}
              >
                <span className="fcb-field-icon">
                  <Icon size={20} />
                </span>
                <span>
                  <strong>{field.name}</strong>
                  <small>{field.description}</small>
                </span>
                <Plus size={18} />
              </button>
            );
          })}
        </div>
        {!fields.length && (
          <p className="fcb-picker-empty">No fields match that search.</p>
        )}
      </section>
    </div>
  );
}

function SortableField({
  instance,
  field,
  selected,
  onSelect,
  onRemove,
  onMove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: instance.instanceId });
  const Icon = FIELD_ICONS[instance.fieldSlug] || Type;
  return (
    <article
      ref={setNodeRef}
      onClick={onSelect}
      className={`fcb-canvas-field ${selected ? "is-selected" : ""} ${isDragging ? "is-dragging" : ""}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div
        className="fcb-drag-handle"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        <GripVertical size={20} />
      </div>
      <div className="fcb-canvas-icon">
        <Icon size={19} />
      </div>
      <div className="fcb-field-body">
        <div className="fcb-field-title">
          <strong>{instance.config.label}</strong>
          <code>{field.slug}</code>
        </div>
        <div className="fcb-field-preview">
          <FieldAdapter
            field={previewField(instance)}
            value={
              instance.fieldSlug === "checkbox" ||
              instance.fieldSlug === "switch-toggle"
                ? false
                : ""
            }
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="fcb-field-actions">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onMove(instance.instanceId, -1);
          }}
          title="Move up"
        >
          <ChevronUp size={18} />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onMove(instance.instanceId, 1);
          }}
          title="Move down"
        >
          <ChevronDown size={18} />
        </button>
        <button
          className="danger"
          onClick={(event) => {
            event.stopPropagation();
            onRemove(instance.instanceId);
          }}
          title="Remove field"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}

function FieldSettings({ instance, onChange }) {
  if (!instance)
    return (
      <section className="fcb-settings fcb-settings-empty">
        <h2>Field settings</h2>
        <p>Select a field from the canvas to configure it.</p>
      </section>
    );
  const canPlaceholder = PLACEHOLDER_FIELDS.has(instance.fieldSlug);
  const canRequired = REQUIRED_FIELDS.has(instance.fieldSlug);
  const isTextInput = instance.fieldSlug === "text-input";
  return (
    <section className="fcb-settings">
      <div>
        <p>Selected field</p>
        <h2>Field settings</h2>
      </div>
      <label>
        Label
        <input
          value={instance.config.label}
          onChange={(event) => onChange({ label: event.target.value })}
        />
      </label>
      {canPlaceholder && (
        <label>
          Placeholder
          <input
            value={instance.config.placeholder}
            onChange={(event) => onChange({ placeholder: event.target.value })}
            placeholder="Enter placeholder text"
          />
        </label>
      )}
      {canRequired && (
        <label className="fcb-toggle-row">
          <input
            type="checkbox"
            checked={instance.config.required}
            onChange={(event) => onChange({ required: event.target.checked })}
          />
          <span>
            <strong>Required</strong>
            <small>Mark this field as required.</small>
          </span>
        </label>
      )}
      {isTextInput && (
        <label>
          Validation
          <select
            value={instance.config.validation?.rule || "none"}
            onChange={(event) =>
              onChange({ validation: { rule: event.target.value } })
            }
          >
            <option value="none">None</option>
            <option value="email">Email address</option>
          </select>
          <small className="fcb-setting-note">
            Stored locally; Email uses the existing input&apos;s native email
            type.
          </small>
        </label>
      )}
    </section>
  );
}

function LivePreview({ fields, values, onChange }) {
  return (
    <section className="fcb-live-preview">
      <div>
        <p>Interactive</p>
        <h2>Live preview</h2>
      </div>
      {fields.length ? (
        <form onSubmit={(event) => event.preventDefault()}>
          {fields.map((instance) => (
            <FieldAdapter
              key={instance.instanceId}
              field={previewField(instance)}
              value={values[instance.instanceId] ?? ""}
              onChange={(value) => onChange(instance.instanceId, value)}
            />
          ))}
        </form>
      ) : (
        <p className="fcb-preview-empty">Your added fields will appear here.</p>
      )}
    </section>
  );
}

function CompositionBuilder({ onClose }) {
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [category, setCategory] = useState("Authentication");
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );
  const selectedField =
    fields.find((field) => field.instanceId === selectedId) || null;

  const updateFields = (next) =>
    setFields(next.map((field, index) => ({ ...field, order: index })));
  const addField = (field) => {
    const instance = fieldInstance(field, fields.length);
    updateFields([...fields, instance]);
    setSelectedId(instance.instanceId);
    setPickerOpen(false);
  };
  const removeField = (instanceId) => {
    const next = fields.filter((field) => field.instanceId !== instanceId);
    updateFields(next);
    setValues((current) => {
      const { [instanceId]: removed, ...rest } = current;
      return rest;
    });
    if (selectedId === instanceId) setSelectedId(next[0]?.instanceId || null);
  };
  const moveField = (instanceId, direction) => {
    const index = fields.findIndex((field) => field.instanceId === instanceId);
    const nextIndex = index + direction;
    if (index >= 0 && nextIndex >= 0 && nextIndex < fields.length)
      updateFields(arrayMove(fields, index, nextIndex));
  };
  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id)
      updateFields(
        arrayMove(
          fields,
          fields.findIndex((field) => field.instanceId === active.id),
          fields.findIndex((field) => field.instanceId === over.id),
        ),
      );
  };
  const updateSelectedConfig = (changes) =>
    updateFields(
      fields.map((field) =>
        field.instanceId === selectedId
          ? { ...field, config: { ...field.config, ...changes } }
          : field,
      ),
    );

  const handleSave = async () => {
    setSaveError(null);
    if (!formName.trim()) {
      setSaveError("Form name is required.");
      return;
    }
    if (!category) {
      setSaveError("Form category is required.");
      return;
    }
    if (!fields.length) {
      setSaveError("Add at least one field before saving.");
      return;
    }

    setSaving(true);
    try {
      const slug = await generateUniqueSlug(formName.trim());
      const compositionFields = fields.map((instance) => ({
        id: instance.instanceId,
        ...previewField(instance),
      }));
      const dependencies = [
        ...new Set([
          ...fields.map((instance) => instance.fieldSlug),
          "primary-button",
        ]),
      ];
      const payload = {
        id: slug,
        name: formName.trim(),
        slug,
        category,
        version: "1.0.0",
        description: `${formName.trim()} composition with ${fields.length} field${fields.length === 1 ? "" : "s"}.`,
        overview: `A custom form composition built from ${dependencies.length} reusable component${dependencies.length === 1 ? "" : "s"}.`,
        fields: compositionFields,
        action: { component: "primary-button", label: "Submit" },
        dependencies,
        tags: [category.toLowerCase()],
      };
      const { error } = await saveFormComposition(payload);
      if (error) {
        setSaveError(
          typeof error === "string"
            ? error
            : error.message || "Failed to save composition.",
        );
        return;
      }
      navigate(`/form-compositions/${slug}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="fcb-page">
      <nav className="fc-breadcrumbs">
        <button onClick={onClose}>Form Compositions</button>
        <span>/</span>
        <span>New Composition</span>
      </nav>
      <header className="fcb-header">
        <div>
          <h2>New Form Composition</h2>
          <p>
            Choose form details, then add existing fields to your composition.
          </p>
        </div>
        <div className="fcb-header-actions">
          <button className="fcb-cancel" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="fcb-save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Composition"}
          </button>
        </div>
      </header>
      {saveError && <p className="fcb-save-error">{saveError}</p>}
      <section className="fcb-details">
        <label>
          Form Name
          <input
            value={formName}
            onChange={(event) => setFormName(event.target.value)}
            placeholder="e.g. Account registration"
          />
        </label>
        <label>
          Form Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {[
              "Authentication",
              "Registration",
              "Contact",
              "Feedback",
              "Other",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </section>
      <div className="fcb-workspace">
        <section className="fcb-canvas-section">
          <div className="fcb-canvas-header">
            <div>
              <h2>Builder canvas</h2>
              <p>
                {fields.length
                  ? `${fields.length} field${fields.length === 1 ? "" : "s"} in this composition`
                  : "Add fields from the existing form library."}
              </p>
            </div>
            <button
              className="fc-new-button"
              onClick={() => setPickerOpen(true)}
            >
              <Plus size={18} /> Add Field
            </button>
          </div>
          {fields.length ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.instanceId)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((instance) => (
                  <SortableField
                    key={instance.instanceId}
                    instance={instance}
                    field={formFields.find(
                      (field) => field.slug === instance.fieldSlug,
                    )}
                    selected={instance.instanceId === selectedId}
                    onSelect={() => setSelectedId(instance.instanceId)}
                    onRemove={removeField}
                    onMove={moveField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className="fcb-empty-canvas">
              <span>
                <Plus size={23} />
              </span>
              <h3>Your canvas is empty</h3>
              <p>
                Add existing form fields to begin building this composition.
              </p>
              <button onClick={() => setPickerOpen(true)}>
                <Plus size={17} /> Add Field
              </button>
            </div>
          )}
        </section>
        <aside className="fcb-side-panel">
          <FieldSettings
            instance={selectedField}
            onChange={updateSelectedConfig}
          />
          <LivePreview
            fields={fields}
            values={values}
            onChange={(instanceId, value) =>
              setValues((current) => ({ ...current, [instanceId]: value }))
            }
          />
        </aside>
      </div>
      {pickerOpen && (
        <FieldPicker onAdd={addField} onClose={() => setPickerOpen(false)} />
      )}
    </main>
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
        setAllCompositions(result);
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
        .filter((composition) =>
          `${composition.name} ${composition.description} ${composition.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "name"
            ? a.name.localeCompare(b.name)
            : b.version.localeCompare(a.version),
        ),
    [allCompositions, category, query, sort],
  );
  return (
    <main className="fc-collection">
      <nav className="fc-breadcrumbs">
        <button onClick={() => navigate("/")}>Home</button>
        <span>/</span>
        <span>Form Compositions</span>
      </nav>
      <header className="fc-collection-header">
        <div>
          <h2>Form Compositions</h2>
          <p>Ready-to-use form patterns assembled from reusable UI atoms.</p>
        </div>
        <button className="fc-new-button" type="button" onClick={onNew}>
          <Plus size={18} /> New Composition
        </button>
      </header>
      <div className="fc-toolbar">
        <div className="fc-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="fc-controls">
          <label className="fc-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search compositions"
            />
          </label>
          <label className="fc-sort">
            <SlidersHorizontal size={16} />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="name">Name</option>
              <option value="version">Version</option>
            </select>
          </label>
        </div>
      </div>
      <section className="fc-card-grid" aria-label="Form compositions">
        {compositions.map((composition) => (
          <article
            className="fc-composition-card"
            key={composition.slug}
            onClick={() => navigate(`/form-compositions/${composition.slug}`)}
          >
            <div className="fc-card-preview">
              <div className="fc-preview-lines">
                <i />
                <i />
                <i />
              </div>
              <span>{composition.fields.length} fields</span>
            </div>
            <div className="fc-card-content">
              <div className="fc-card-meta">
                <span>{composition.category}</span>
                <small>v{composition.version}</small>
              </div>
              <h2>{composition.name}</h2>
              <p>{composition.description}</p>
              <button type="button">
                View composition <span>→</span>
              </button>
            </div>
          </article>
        ))}
         {loading && <p className="fc-empty">Loading compositions…</p>}
        {!loading && !compositions.length && (
          <p className="fc-empty">No compositions match your search.</p>
        )}
      </section>
    </main>
  );
}

export default function FormCompositionsPage() {
  const [building, setBuilding] = useState(false);
  return (
    <MainLayout>
      {building ? (
        <CompositionBuilder onClose={() => setBuilding(false)} />
      ) : (
        <CompositionCollection onNew={() => setBuilding(true)} />
      )}
    </MainLayout>
  );
}
