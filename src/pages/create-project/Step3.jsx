import { useState } from "react";
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Search, X } from "lucide-react";
import * as Icons from "lucide-react";
import Template1, { Template1Preview } from "../inventory/Template1";
import Template2 from "../inventory/Template2";
import Template3 from "../inventory/Template3";
import Template4 from "../inventory/Template4";
import Template5 from "../inventory/Template5";

const TEMPLATES_MAP = {
  1: Template1Preview,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
};

const ICON_OPTIONS = [
  "Package",
  "BarChart3",
  "Users",
  "RotateCw",
  "Truck",
  "ClipboardList",
  "Settings",
  "Factory",
  "DollarSign",
  "TrendingUp",
  "Shield",
  "Bell",
  "Folder",
  "Handshake",
  "PinIcon",
  "Home",
  "FileText",
  "Mail",
  "Download",
  "Upload",
  "Trash2",
  "Edit",
  "Eye",
  "Lock",
  "Unlock",
  "Check",
  "X",
  "Plus",
  "Minus",
  "Grid",
  "List",
  "Map",
  "Calendar",
  "Clock",
  "User",
  "MessageSquare",
  "Phone",
  "AlertCircle",
  "HelpCircle",
  "Info",
  "Zap",
  "Star",
  "Heart",
];

function IconPicker({ value, onChange, onClose }) {
  const [search, setSearch] = useState("");
  const filtered = ICON_OPTIONS.filter((ic) =>
    ic.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Select Icon
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={20} color="#9ca3af" />
          </button>
        </div>

        {/* Search */}
        <div
          style={{ padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={16}
              color="#9ca3af"
              style={{ position: "absolute", left: "12px" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
        </div>

        {/* Icons Grid */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: "8px",
          }}
        >
          {filtered.map((ic) => {
            const Icon = Icons[ic];
            const isSelected = ic === value;
            return (
              <button
                key={ic}
                onClick={() => {
                  onChange(ic);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                  borderRadius: "12px",
                  border: `2px solid ${isSelected ? "#6366f1" : "#e5e7eb"}`,
                  background: isSelected ? "#eff6ff" : "#f9fafb",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "#f9fafb";
                }}
              >
                {Icon && (
                  <Icon size={24} color={isSelected ? "#6366f1" : "#9ca3af"} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SortableModule({ mod, onRemove, onIconChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: mod.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const Icon = Icons[mod.icon];

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 14px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginBottom: "8px",
          boxShadow: isDragging
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Drag handle */}
        <span
          {...attributes}
          {...listeners}
          style={{
            cursor: "grab",
            color: "#d1d5db",
            fontSize: "16px",
            userSelect: "none",
          }}
        >
          ⠿
        </span>

        {/* Icon picker button */}
        <button
          onClick={() => setShowPicker(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {Icon && <Icon size={18} color="#6366f1" />}
        </button>

        {/* Label */}
        <span
          style={{
            flex: 1,
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {mod.label}
        </span>

        {/* Remove */}
        <button
          onClick={() => onRemove(mod.id)}
          style={{
            background: "#fef2f2",
            border: "none",
            color: "#ef4444",
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      {showPicker && (
        <IconPicker
          value={mod.icon}
          onChange={(e) => onIconChange(mod.id, e)}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

export default function Step3({ data, onChange, onNext, onBack }) {
  const [newModule, setNewModule] = useState("");
  const [newIcon, setNewIcon] = useState("Package");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const modules = data.modules || [
    { id: "1", label: "Dashboard", icon: "LayoutGrid" },
  ];

  const sensors = useSensors(useSensor(PointerSensor));

  const setModules = (mods) => onChange({ modules: mods });

  const addModule = () => {
    if (!newModule.trim()) return;
    setModules([
      ...modules,
      { id: Date.now().toString(), label: newModule.trim(), icon: newIcon },
    ]);
    setNewModule("");
    setNewIcon("Package");
  };

  const removeModule = (id) => setModules(modules.filter((m) => m.id !== id));

  const changeIcon = (id, icon) =>
    setModules(modules.map((m) => (m.id === id ? { ...m, icon } : m)));

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIdx = modules.findIndex((m) => m.id === active.id);
      const newIdx = modules.findIndex((m) => m.id === over.id);
      setModules(arrayMove(modules, oldIdx, newIdx));
    }
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "28px",
            fontWeight: 900,
            color: "#111827",
          }}
        >
          Configure Sidebar
        </h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>
          Add modules to your app's sidebar. Drag to reorder them.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}
      >
        {/* Left: Module Builder */}
        <div>
          {/* How it works */}
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "14px",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#1d4ed8",
              }}
            >
              💡 How to add modules
            </h4>
            <ol
              style={{
                margin: 0,
                paddingLeft: "18px",
                fontSize: "13px",
                color: "#1e40af",
                lineHeight: 1.8,
              }}
            >
              <li>Click the icon box to select an icon</li>
              <li>Type the module name</li>
              <li>
                Click <strong>Add Module</strong>
              </li>
              <li>Drag modules to reorder them</li>
            </ol>
          </div>

          {/* Add form */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#374151",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Add New Module
            </label>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <button
                onClick={() => setShowIconPicker(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  background: "#f3f4f6",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {Icons[newIcon]
                  ? React.createElement(Icons[newIcon], {
                      size: 20,
                      color: "#6366f1",
                    })
                  : null}
              </button>
              <input
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addModule()}
                placeholder="Module name (e.g. Users)"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "14px",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
            <button
              onClick={addModule}
              style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              + Add Module
            </button>
          </div>

          {/* Module List */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={modules.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              {modules.map((mod) => (
                <SortableModule
                  key={mod.id}
                  mod={mod}
                  onRemove={removeModule}
                  onIconChange={changeIcon}
                />
              ))}
            </SortableContext>
          </DndContext>

          {modules.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "24px",
                color: "#9ca3af",
                fontSize: "14px",
                background: "#f9fafb",
                borderRadius: "12px",
                border: "2px dashed #e5e7eb",
              }}
            >
              No modules yet. Add at least one above.
            </div>
          )}
        </div>

        {/* Right: Live Sidebar Preview */}
        <div>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#374151",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Live Template Preview
          </label>
          <div
            style={{
              background: "#f1f5f9",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              height: "500px",
              position: "relative",
            }}
          >
            {data.templateId ? (
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "286%",
                  height: "286%",
                  transform: "scale(0.35)",
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {data.templateId === 1
                  ? <Template1Preview modules={modules} />
                  : (() => { const C = TEMPLATES_MAP[data.templateId]; return C ? <C /> : null; })()
                }
              </div>
            ) : (
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100%",textAlign:"center",color:"#9ca3af",padding:"24px" }}>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>Select a template in Step 2 to preview</p>
              </div>
            )}
          </div>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: "12px",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            Template: <strong>{data.templateName || "—"}</strong>
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "14px 28px",
            background: "#f3f4f6",
            color: "#374151",
            border: "none",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={modules.length === 0}
          style={{
            flex: 1,
            padding: "14px",
            background:
              modules.length > 0
                ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                : "#e5e7eb",
            color: modules.length > 0 ? "#fff" : "#9ca3af",
            border: "none",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "16px",
            cursor: modules.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          Next: Build Page →
        </button>
      </div>

      {showIconPicker && (
        <IconPicker
          value={newIcon}
          onChange={(e) => setNewIcon(e)}
          onClose={() => setShowIconPicker(false)}
        />
      )}
    </div>
  );
}
