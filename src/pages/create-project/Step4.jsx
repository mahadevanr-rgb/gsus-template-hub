import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { X, ClipboardList, Circle, Palette } from "lucide-react";
import {
  PrimaryButton,
  SecondaryButton,
  AnimatedButton,
  GhostButton,
  GradientButton,
  PulseButton,
  ShadowButton,
  OutlineButton,
  FloatingButton,
  IconButton,
} from "../../components/atoms/buttons";

/* ── Button variant map — mirrors ButtonShowcase exactly ── */
const BUTTON_VARIANTS = [
  { id: "primary",   name: "Primary Button",   desc: "Main call-to-action button",       component: PrimaryButton,   defaultLabel: "Primary Action", props: {} },
  { id: "secondary", name: "Secondary Button", desc: "Secondary action button",           component: SecondaryButton, defaultLabel: "Secondary",      props: {} },
  { id: "animated",  name: "Animated Button",  desc: "Button with shimmer animation",    component: AnimatedButton,  defaultLabel: "Animated",       props: {} },
  { id: "ghost",     name: "Ghost Button",     desc: "Transparent button with border",   component: GhostButton,     defaultLabel: "Ghost",          props: {} },
  { id: "gradient",  name: "Gradient Button",  desc: "Button with animated gradient",    component: GradientButton,  defaultLabel: "Gradient",       props: {} },
  { id: "pulse",     name: "Pulse Button",     desc: "Button with pulsing animation",    component: PulseButton,     defaultLabel: "Pulse",          props: {} },
  { id: "shadow",    name: "Shadow Button",    desc: "Button with elevated shadow",      component: ShadowButton,    defaultLabel: "Shadow",         props: {} },
  { id: "outline",   name: "Outline Button",   desc: "Button with border and hover fill",component: OutlineButton,   defaultLabel: "Outline",        props: {} },
  { id: "floating",  name: "Floating Button",  desc: "FAB style floating action button", component: FloatingButton,  defaultLabel: "+",              props: { icon: "+" } },
  { id: "icon",      name: "Icon Button",      desc: "Icon-only button variants",        component: IconButton,      defaultLabel: "🎨",             props: { icon: "🎨", variant: "primary" } },
];

/* ── Button Picker Modal ── */
function ButtonPickerModal({ onSelect, onCancel }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"16px" }}>
      <div style={{ background:"#fff",borderRadius:"20px",padding:"28px",width:"680px",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
          <h3 style={{ margin:0,fontSize:"18px",fontWeight:800,color:"#111827" }}>Choose a Button Style</h3>
          <button onClick={onCancel} style={{ background:"#f3f4f6",border:"none",width:"32px",height:"32px",borderRadius:"8px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px" }}>
          {BUTTON_VARIANTS.map((v) => {
            const Comp = v.component;
            return (
              <div
                key={v.id}
                onClick={() => onSelect(v)}
                style={{ border:"2px solid #e5e7eb",borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"all 0.15s",background:"#fafafa" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.background="#eff6ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="#fafafa"; }}
              >
                <div style={{ display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"10px",minHeight:"36px" }}>
                  {v.id === "floating" ? (
                    <Comp icon={v.props.icon} label={v.defaultLabel} onClick={() => {}} />
                  ) : v.id === "icon" ? (
                    <Comp icon={v.props.icon} label={v.defaultLabel} variant={v.props.variant} onClick={() => {}} />
                  ) : (
                    <Comp label={v.defaultLabel} icon="→" onClick={() => {}} />
                  )}
                </div>
                <div style={{ fontSize:"13px",fontWeight:700,color:"#111827",marginBottom:"2px" }}>{v.name}</div>
                <div style={{ fontSize:"11px",color:"#9ca3af" }}>{v.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Button Label Modal (after picking style) ── */
function ButtonLabelModal({ variant, onConfirm, onCancel }) {
  const [label, setLabel] = useState(variant.defaultLabel);
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1100,padding:"16px" }}>
      <div style={{ background:"#fff",borderRadius:"20px",padding:"28px",width:"380px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin:"0 0 16px",fontSize:"18px",fontWeight:800,color:"#111827" }}>Configure Button</h3>
        <div style={{ marginBottom:"16px",padding:"14px",background:"#f9fafb",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"52px" }}>
          {variant.id === "floating" ? (
            <variant.component icon={variant.props.icon} label={label} onClick={() => {}} />
          ) : variant.id === "icon" ? (
            <variant.component icon={variant.props.icon} label={label} variant={variant.props.variant} onClick={() => {}} />
          ) : (
            <variant.component label={label} icon="→" onClick={() => {}} />
          )}
        </div>
        {variant.id !== "floating" && variant.id !== "icon" && (
          <div style={{ marginBottom:"16px" }}>
            <label style={{ fontSize:"13px",fontWeight:700,color:"#374151",display:"block",marginBottom:"6px" }}>Button Label</label>
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="e.g. Add Product"
              style={{ width:"100%",padding:"8px 12px",border:"2px solid #e5e7eb",borderRadius:"8px",fontSize:"13px",outline:"none",boxSizing:"border-box" }}
            />
          </div>
        )}
        <div style={{ display:"flex",gap:"10px" }}>
          <button onClick={onCancel} style={{ flex:1,padding:"10px",background:"#f3f4f6",border:"none",borderRadius:"10px",fontWeight:600,cursor:"pointer",color:"#374151" }}>Back</button>
          <button onClick={() => onConfirm({ label, variantId: variant.id })} style={{ flex:1,padding:"10px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:"10px",fontWeight:700,cursor:"pointer" }}>Add to Page</button>
        </div>
      </div>
    </div>
  );
}

/* ── Dropped component renderer ── */
function DroppedComponent({ comp, onRemove }) {
  if (comp.type === "table") {
    return (
      <div style={{ background:"#fff",borderRadius:"12px",border:"2px solid #6366f1",overflow:"hidden",marginBottom:"12px",position:"relative" }}>
        <button onClick={() => onRemove(comp.id)} style={{ position:"absolute",top:"8px",right:"8px",background:"#fef2f2",border:"none",color:"#ef4444",width:"24px",height:"24px",borderRadius:"6px",cursor:"pointer",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <X size={14} />
        </button>
        <div style={{ padding:"10px 14px",background:"#eff6ff",borderBottom:"1px solid #e5e7eb",fontSize:"12px",fontWeight:700,color:"#6366f1",display:"flex",alignItems:"center",gap:"6px" }}>
          <ClipboardList size={14} /> {comp.moduleName} — {comp.columns?.join(", ") || "No columns"}
        </div>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:"12px" }}>
          <thead>
            <tr style={{ background:"#f9fafb" }}>
              {(comp.columns || ["Column 1","Column 2","Column 3"]).map(c => (
                <th key={c} style={{ padding:"8px 12px",textAlign:"left",fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(r => (
              <tr key={r} style={{ borderBottom:"1px solid #f3f4f6" }}>
                {(comp.columns || ["Column 1","Column 2","Column 3"]).map(c => (
                  <td key={c} style={{ padding:"8px 12px",color:"#9ca3af" }}>Sample data</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (comp.type === "button") {
    const variant = BUTTON_VARIANTS.find(v => v.id === comp.variantId) || BUTTON_VARIANTS[0];
    const Comp = variant.component;
    return (
      <div style={{ marginBottom:"12px",position:"relative",display:"inline-flex",alignItems:"center" }}>
        <button onClick={() => onRemove(comp.id)} style={{ position:"absolute",top:"-8px",right:"-8px",background:"#fef2f2",border:"none",color:"#ef4444",width:"20px",height:"20px",borderRadius:"50%",cursor:"pointer",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <X size={12} />
        </button>
        {variant.id === "floating" ? (
          <Comp icon={variant.props.icon} label={comp.label} onClick={() => {}} />
        ) : variant.id === "icon" ? (
          <Comp icon={variant.props.icon} label={comp.label} variant={variant.props.variant} onClick={() => {}} />
        ) : (
          <Comp label={comp.label} icon="→" onClick={() => {}} />
        )}
      </div>
    );
  }

  return null;
}

/* ── Drop zone ── */
function DropZone({ components, onRemove }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div
      ref={setNodeRef}
      style={{ flex:1,minHeight:"300px",background:isOver?"#eff6ff":"#f9fafb",border:`2px dashed ${isOver?"#6366f1":"#d1d5db"}`,borderRadius:"16px",padding:"16px",transition:"all 0.2s" }}
    >
      {components.length === 0 ? (
        <div style={{ height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#9ca3af",gap:"8px",minHeight:"200px" }}>
          <Palette size={40} color="#d1d5db" />
          <span style={{ fontSize:"14px",fontWeight:600 }}>Drop components here</span>
          <span style={{ fontSize:"12px" }}>Drag from the panel on the right</span>
        </div>
      ) : (
        components.map(comp => <DroppedComponent key={comp.id} comp={comp} onRemove={onRemove} />)
      )}
    </div>
  );
}

/* ── Table Config Modal ── */
function TableConfigModal({ modules, onConfirm, onCancel }) {
  const [selectedModule, setSelectedModule] = useState(modules[0]?.label || "");
  const [cols, setCols] = useState(["Name", "Status", "Date"]);
  const [colInput, setColInput] = useState("");

  const addCol = () => {
    if (colInput.trim()) { setCols([...cols, colInput.trim()]); setColInput(""); }
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"16px" }}>
      <div style={{ background:"#fff",borderRadius:"20px",padding:"28px",width:"480px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin:"0 0 20px",fontSize:"18px",fontWeight:800,color:"#111827" }}>Configure Data Table</h3>
        
        {/* Module Dropdown */}
        <div style={{ marginBottom:"16px" }}>
          <label style={{ fontSize:"13px",fontWeight:700,color:"#374151",display:"block",marginBottom:"8px" }}>Select Module</label>
          <select
            value={selectedModule}
            onChange={e => setSelectedModule(e.target.value)}
            style={{ width:"100%",padding:"10px 12px",border:"2px solid #e5e7eb",borderRadius:"8px",fontSize:"14px",outline:"none",cursor:"pointer",background:"#fff",color:"#111827",fontWeight:600 }}
          >
            {modules.map(m => (
              <option key={m.id} value={m.label}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Column Names */}
        <label style={{ fontSize:"13px",fontWeight:700,color:"#374151",display:"block",marginBottom:"8px" }}>Column Names</label>
        <div style={{ display:"flex",gap:"8px",marginBottom:"10px" }}>
          <input
            value={colInput}
            onChange={e => setColInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCol()}
            placeholder="Add column..."
            style={{ flex:1,padding:"8px 12px",border:"2px solid #e5e7eb",borderRadius:"8px",fontSize:"13px",outline:"none" }}
          />
          <button onClick={addCol} style={{ padding:"8px 14px",background:"#6366f1",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer",fontWeight:700 }}>+</button>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"16px",minHeight:"40px" }}>
          {cols.map((c, i) => (
            <span key={i} style={{ background:"#eff6ff",color:"#6366f1",padding:"4px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:600,display:"flex",alignItems:"center",gap:"4px" }}>
              {c}
              <button onClick={() => setCols(cols.filter((_,j) => j !== i))} style={{ background:"none",border:"none",cursor:"pointer",color:"#6366f1",fontSize:"12px",padding:0 }}>✕</button>
            </span>
          ))}
        </div>
        <div style={{ display:"flex",gap:"10px" }}>
          <button onClick={onCancel} style={{ flex:1,padding:"10px",background:"#f3f4f6",border:"none",borderRadius:"10px",fontWeight:600,cursor:"pointer",color:"#374151" }}>Cancel</button>
          <button onClick={() => onConfirm({ moduleName: selectedModule, columns: cols })} style={{ flex:1,padding:"10px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:"10px",fontWeight:700,cursor:"pointer" }}>Save Table</button>
        </div>
      </div>
    </div>
  );
}

const PALETTE = [
  { type: "table",  icon: ClipboardList, label: "Data Table" },
  { type: "button", icon: Circle,        label: "Button" },
];

export default function Step4({ data, onChange, onNext, onBack }) {
  const [components, setComponents] = useState(data.components || []);
  const [pendingType, setPendingType] = useState(null);         // "table" | "button"
  const [pickerOpen, setPickerOpen] = useState(false);          // button style picker
  const [selectedVariant, setSelectedVariant] = useState(null); // chosen button variant
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (over?.id === "canvas" && active.data.current?.fromPalette) {
      const type = active.data.current.type;
      if (type === "button") { setPickerOpen(true); }
      else { setPendingType(type); }
    }
  };

  const handleQuickAdd = (type) => {
    if (type === "button") { setPickerOpen(true); }
    else { setPendingType(type); }
  };

  const handleVariantSelect = (variant) => {
    setPickerOpen(false);
    setSelectedVariant(variant);
  };

  const handleButtonConfirm = (config) => {
    const newComp = { id: Date.now().toString(), type: "button", ...config };
    const updated = [...components, newComp];
    setComponents(updated);
    onChange({ components: updated });
    setSelectedVariant(null);
  };

  const handleTableConfirm = (config) => {
    const newComp = { id: Date.now().toString(), type: "table", ...config };
    const updated = [...components, newComp];
    setComponents(updated);
    onChange({ components: updated });
    setPendingType(null);
  };

  const removeComp = (id) => {
    const updated = components.filter(c => c.id !== id);
    setComponents(updated);
    onChange({ components: updated });
  };

  const activePalette = PALETTE.find(p => `palette-${p.type}` === activeId);

  return (
    <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
      <div style={{ marginBottom:"24px" }}>
        <h2 style={{ margin:"0 0 8px",fontSize:"28px",fontWeight:900,color:"#111827" }}>Build your page</h2>
        <p style={{ margin:0,color:"#6b7280",fontSize:"15px" }}>Drag components from the right panel onto the canvas to build your page layout.</p>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 280px",gap:"20px" }}>
          {/* Canvas */}
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px" }}>
              <span style={{ fontSize:"13px",fontWeight:700,color:"#374151" }}>Page Canvas</span>
              <span style={{ background:"#f3f4f6",color:"#6b7280",padding:"2px 8px",borderRadius:"999px",fontSize:"12px" }}>{components.length} components</span>
            </div>
            <DropZone components={components} onRemove={removeComp} />
          </div>

          {/* Palette */}
          <div>
            <div style={{ fontSize:"13px",fontWeight:700,color:"#374151",marginBottom:"12px" }}>Components</div>
            <div style={{ background:"#fff",borderRadius:"16px",border:"1px solid #e5e7eb",padding:"14px" }}>
              <p style={{ margin:"0 0 12px",fontSize:"12px",color:"#9ca3af" }}>Drag any component to the canvas</p>
              {PALETTE.map(p => {
                const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette-${p.type}`, data: { type: p.type, fromPalette: true } });
                const Icon = p.icon;
                return (
                  <div
                    key={p.type}
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    style={{ display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",background:isDragging?"#eff6ff":"#fff",border:"2px solid #e5e7eb",borderRadius:"12px",cursor:"grab",marginBottom:"8px",transition:"all 0.15s",userSelect:"none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.background="#eff6ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background=isDragging?"#eff6ff":"#fff"; }}
                  >
                    <Icon size={20} color="#6366f1" />
                    <div>
                      <div style={{ fontSize:"13px",fontWeight:700,color:"#111827" }}>{p.label}</div>
                      <div style={{ fontSize:"11px",color:"#9ca3af" }}>Drag to canvas</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick add */}
            <div style={{ marginTop:"16px",background:"#fff",borderRadius:"16px",border:"1px solid #e5e7eb",padding:"14px" }}>
              <p style={{ margin:"0 0 10px",fontSize:"12px",fontWeight:700,color:"#374151" }}>Quick Add</p>
              {PALETTE.map(p => {
                const Icon = p.icon;
                return (
                  <button key={p.type} onClick={() => handleQuickAdd(p.type)} style={{ width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:"8px",cursor:"pointer",fontSize:"13px",fontWeight:600,color:"#374151",marginBottom:"6px" }}>
                    <Icon size={16} color="#6366f1" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activePalette && (
            <div style={{ padding:"10px 14px",background:"#eff6ff",border:"2px solid #6366f1",borderRadius:"12px",fontSize:"13px",fontWeight:700,color:"#6366f1",boxShadow:"0 8px 24px rgba(99,102,241,0.2)" }}>
              {activePalette.label}
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Button style picker */}
      {pickerOpen && <ButtonPickerModal onSelect={handleVariantSelect} onCancel={() => setPickerOpen(false)} />}

      {/* Button label config */}
      {selectedVariant && (
        <ButtonLabelModal
          variant={selectedVariant}
          onConfirm={handleButtonConfirm}
          onCancel={() => { setSelectedVariant(null); setPickerOpen(true); }}
        />
      )}

      {/* Table config */}
      {pendingType === "table" && (
        <TableConfigModal modules={data.modules || []} onConfirm={handleTableConfirm} onCancel={() => setPendingType(null)} />
      )}

      <div style={{ display:"flex",gap:"12px",marginTop:"24px" }}>
        <button onClick={onBack} style={{ padding:"14px 28px",background:"#f3f4f6",color:"#374151",border:"none",borderRadius:"14px",fontWeight:700,fontSize:"15px",cursor:"pointer" }}>← Back</button>
        <button onClick={() => { onChange({ components }); onNext(); }} style={{ flex:1,padding:"14px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:"14px",fontWeight:700,fontSize:"16px",cursor:"pointer" }}>Next: Launch →</button>
      </div>
    </div>
  );
}
