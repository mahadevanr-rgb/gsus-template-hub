import { useState } from "react";
import JSZip from "jszip";
import { Palette, PenTool, Layers } from "lucide-react";

const getThemeBg = (theme) => {
  if (!theme) return "linear-gradient(135deg,#6366f1,#8b5cf6)";
  if (theme.type === "single") return theme.color;
  if (theme.type === "gradient") return `linear-gradient(135deg,${theme.from},${theme.to})`;
  return "linear-gradient(135deg,#6366f1,#8b5cf6)";
};

// ── Task 1: model.js — NAV + LIST_DATA built from user modules & components ──
const DEFAULT_ICONS = new Set([
  "LayoutDashboard","Package","Tag","Truck","ClipboardList",
  "BarChart2","Settings","AlertTriangle","ShoppingCart","DollarSign",
]);

const generateModelJs = (modules, components) => {
  const navLines = (modules || []).map((m) =>
    `  { icon: ${m.icon}, label: "${m.label}" },`
  ).join("\n");
  const extraIcons = [...new Set((modules||[]).map(m=>m.icon))].filter(ic => !DEFAULT_ICONS.has(ic));
  const extraLine = extraIcons.length > 0 ? `  ${extraIcons.join(", ")},\n` : "";

  // Build LIST_DATA from user-defined table components; fallback to empty cols/rows
  const tableCols = {};
  (components || []).filter(c => c.type === "table" && c.moduleName).forEach(c => {
    tableCols[c.moduleName] = c.columns || [];
  });

  const listDataEntries = (modules || []).map(m => {
    const cols = tableCols[m.label] || [];
    const colsStr = JSON.stringify(cols);
    return `  ${JSON.stringify(m.label)}: { cols: ${colsStr}, rows: [] },`;
  }).join("\n");

  return `import {\n  LayoutDashboard, Package, Tag, Truck, ClipboardList,\n  BarChart2, Settings, AlertTriangle, ShoppingCart, DollarSign,\n${extraLine}} from "lucide-react";

export const NAV = [
${navLines}
];

export const KPI = [
  { label: "Total Products", value: "2,847", change: "+12%", up: true, Icon: Package, color: "#6366f1", bg: "#eff6ff" },
  { label: "Low Stock", value: "34", change: "-5%", up: false, Icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
  { label: "Total Orders", value: "1,293", change: "+8%", up: true, Icon: ShoppingCart, color: "#22c55e", bg: "#f0fdf4" },
  { label: "Revenue", value: "$84.2K", change: "+18%", up: true, Icon: DollarSign, color: "#f59e0b", bg: "#fffbeb" },
];

export const LIST_DATA = {
${listDataEntries}
};

export const STATUS_STYLE = {
  "In Stock": { bg: "#f0fdf4", color: "#16a34a" },
  "Low Stock": { bg: "#fffbeb", color: "#d97706" },
  "Out of Stock": { bg: "#fef2f2", color: "#dc2626" },
  Active: { bg: "#f0fdf4", color: "#16a34a" },
  Inactive: { bg: "#fef2f2", color: "#dc2626" },
  Pending: { bg: "#fffbeb", color: "#d97706" },
  Shipped: { bg: "#eff6ff", color: "#2563eb" },
  Delivered: { bg: "#f0fdf4", color: "#16a34a" },
  Ready: { bg: "#f0fdf4", color: "#16a34a" },
  Processing: { bg: "#fffbeb", color: "#d97706" },
};
`;
};

// ── Task 2: controller.js — exact copy ───────────────────────
const generateControllerJs = () =>
`import { useState, createContext, useContext } from "react";
import { LIST_DATA } from "./model";

export const PALETTES = [
  { name: "Indigo",  primary: "#6366f1", secondary: "#8b5cf6" },
  { name: "Blue",    primary: "#2563eb", secondary: "#3b82f6" },
  { name: "Emerald", primary: "#059669", secondary: "#10b981" },
  { name: "Rose",    primary: "#e11d48", secondary: "#f43f5e" },
  { name: "Amber",   primary: "#d97706", secondary: "#f59e0b" },
  { name: "Cyan",    primary: "#0891b2", secondary: "#06b6d4" },
  { name: "Violet",  primary: "#7c3aed", secondary: "#a78bfa" },
  { name: "Slate",   primary: "#475569", secondary: "#64748b" },
];

export const ThemeContext = createContext(null);
export const useThemeCtx = () => useContext(ThemeContext);

export function useTheme() {
  const [palette, setPalette] = useState(PALETTES[0]);
  const [dark, setDark] = useState(false);
  return { palette, setPalette, dark, setDark };
}

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("login");
  const login = (email, password) => {
    if (email && password) { setLoggedIn(true); return true; }
    return false;
  };
  const logout = () => setLoggedIn(false);
  return { loggedIn, screen, setScreen, login, logout };
}

export function useDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeOpen, setThemeOpen] = useState(false);
  return { active, setActive, sidebarOpen, setSidebarOpen, themeOpen, setThemeOpen };
}

export function useListScreen(tab) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [showDel, setShowDel] = useState(null);
  const data = LIST_DATA[tab] || { cols: [], rows: [] };
  const filtered = data.rows.filter((r) =>
    r.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );
  const isStatus = data.cols[data.cols.length - 1] === "Status";
  return { search, setSearch, showAdd, setShowAdd, showView, setShowView, showEdit, setShowEdit, showDel, setShowDel, data, filtered, isStatus };
}
`;

// ── Task 3: package.json ──────────────────────────────────────
const generatePackageJson = (data) =>
  JSON.stringify({
    name: data.projectName,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { react: "^19.0.0", "react-dom": "^19.0.0", "lucide-react": "^0.400.0" },
    devDependencies: { "@vitejs/plugin-react": "^4.0.0", vite: "^5.0.0" },
  }, null, 2);

// ── Task 4: index.html ────────────────────────────────────────
const generateIndexHtml = (data) =>
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.appName || "My App"}</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { height: 100%; width: 100%; overflow: hidden; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

// ── Logo SVG placeholder ──────────────────────────────────────
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <rect width="80" height="80" rx="16" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="32" font-family="sans-serif" font-weight="bold" fill="white">S</text>
</svg>`;

// ── buttons.css — inlined for zip ────────────────────────────
const BUTTONS_CSS = `/* Button Component Styles */
:root{--primary-color:#3b82f6;--secondary-color:#8b5cf6;--success-color:#10b981;--danger-color:#ef4444;--warning-color:#f59e0b;--text-color:#1f2937;--text-light:#6b7280;--border-radius:8px;--transition-speed:0.3s}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:7px 14px;font-size:13px;font-weight:600;border:none;border-radius:var(--border-radius);cursor:pointer;transition:all var(--transition-speed) ease;position:relative;overflow:hidden;white-space:nowrap;user-select:none}
.btn-primary{background:linear-gradient(135deg,var(--primary-color),#2563eb);color:#fff;box-shadow:0 4px 15px rgba(59,130,246,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,130,246,.4)}
.btn-secondary{background:linear-gradient(135deg,var(--secondary-color),#7c3aed);color:#fff;box-shadow:0 4px 15px rgba(139,92,246,.3)}
.btn-secondary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,92,246,.4)}
.btn-animated{background:linear-gradient(90deg,#3b82f6,#8b5cf6,#3b82f6);background-size:200% 100%;color:#fff;box-shadow:0 4px 15px rgba(59,130,246,.3)}
.btn-animated:hover{animation:shimmer .6s ease-in-out infinite;transform:translateY(-2px)}
@keyframes shimmer{0%,100%{background-position:0% center}50%{background-position:100% center}}
.btn-shimmer{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.1) 50%,transparent 70%);animation:shimmerSlide 3s infinite}
@keyframes shimmerSlide{0%{transform:translate(-100%,-100%) rotate(45deg)}100%{transform:translate(100%,100%) rotate(45deg)}}
.btn-ghost{background:transparent;color:var(--text-color);border:2px solid var(--primary-color);padding:5px 12px}
.btn-ghost:hover{background:var(--primary-color);color:#fff;transform:scale(1.05)}
.btn-gradient{background:linear-gradient(135deg,#667eea 0%,#764ba2 25%,#f093fb 50%,#4facfe 75%,#00f2fe 100%);background-size:200% 200%;color:#fff;box-shadow:0 4px 20px rgba(102,126,234,.4)}
.btn-gradient:hover{animation:gradientShift 1.5s ease infinite;transform:translateY(-2px)}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.btn-pulse{background:linear-gradient(135deg,var(--success-color),#059669);color:#fff;box-shadow:0 4px 15px rgba(16,185,129,.3)}
.btn-pulse:hover{animation:pulse 1.5s ease-in-out infinite;box-shadow:0 0 30px rgba(16,185,129,.5)}
@keyframes pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(16,185,129,.7)}50%{box-shadow:0 0 0 10px rgba(16,185,129,0)}}
.btn-pulse-ring{position:absolute;width:100%;height:100%;border:2px solid var(--success-color);border-radius:var(--border-radius);animation:pulseRing 2s ease-out infinite;opacity:0}
@keyframes pulseRing{0%{transform:scale(.9);opacity:1}100%{transform:scale(1.4);opacity:0}}
.btn-shadow{background:linear-gradient(135deg,#f93b1d,#ea1e63);color:#fff;box-shadow:0 4px 6px rgba(0,0,0,.1),0 10px 20px rgba(249,59,29,.3);transition:all .3s cubic-bezier(.34,1.56,.64,1)}
.btn-shadow:hover{transform:translateY(-4px);box-shadow:0 8px 12px rgba(0,0,0,.15),0 20px 40px rgba(249,59,29,.4)}
.btn-outline{background:transparent;color:var(--warning-color);border:2px solid var(--warning-color);padding:5px 12px;transition:all var(--transition-speed) ease}
.btn-outline:hover{background:var(--warning-color);color:#fff;transform:translateX(2px);box-shadow:-4px 4px 15px rgba(245,158,11,.3)}
.btn-floating{width:60px;height:60px;padding:0;border-radius:50%;background:linear-gradient(135deg,var(--primary-color),#2563eb);color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.15);font-size:1.5rem;transition:all .3s ease}
.btn-floating:hover{transform:scale(1.1) rotate(10deg);box-shadow:0 8px 20px rgba(0,0,0,.2),0 0 0 10px rgba(59,130,246,.1)}
.btn-icon-only{width:36px;height:36px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;background:transparent;color:var(--text-color);border:2px solid transparent;transition:all var(--transition-speed) ease}
.btn-icon-primary{background:rgba(59,130,246,.1);color:var(--primary-color);border-color:var(--primary-color)}
.btn-icon-primary:hover{background:var(--primary-color);color:#fff;transform:rotate(15deg) scale(1.1)}
.btn-icon-secondary{background:rgba(139,92,246,.1);color:var(--secondary-color);border-color:var(--secondary-color)}
.btn-icon-secondary:hover{background:var(--secondary-color);color:#fff;transform:rotate(-15deg) scale(1.1)}
.btn-icon{display:inline-flex;align-items:center;justify-content:center;font-size:1.1em}
.btn-text{position:relative}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.btn::after{content:"";position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(255,255,255,.2);transform:translate(-50%,-50%);transition:width .6s,height .6s}
.btn:active::after{width:300px;height:300px}
`;

// ── Task 9: Template1.jsx — inlined raw source (no fetch, no HMR) ─
const generateTemplate1Jsx = (components, appName) => {
  // Build the chosen button import + JSX for the add button in toolbar
  const btnComp = (components || []).find(c => c.type === "button");
  const VARIANT_CLASS_MAP = {
    primary:   "btn btn-primary",
    secondary: "btn btn-secondary",
    animated:  "btn btn-animated",
    ghost:     "btn btn-ghost",
    gradient:  "btn btn-gradient",
    pulse:     "btn btn-pulse",
    shadow:    "btn btn-shadow",
    outline:   "btn btn-outline",
    floating:  "btn btn-floating",
    icon:      "btn btn-icon-only btn-icon-primary",
  };
  const btnClass = btnComp ? (VARIANT_CLASS_MAP[btnComp.variantId] || "btn btn-primary") : "t1-add-btn";
  const btnLabel = btnComp ? btnComp.label : "Add";
  // For floating/icon, no text label
  const isIconOnly = btnComp && (btnComp.variantId === "floating" || btnComp.variantId === "icon");
  const addBtnJsx = isIconOnly
    ? `<button className="${btnClass}" onClick={() => setShowAdd(true)}>+</button>`
    : `<button className="${btnClass}" onClick={() => setShowAdd(true)}><Plus size={14} /> ` + "{tab.slice(0,-1)}" + `</button>`;
  const needsBtnCss = !!btnComp;
  const btnCssImport = needsBtnCss ? `\nimport "./buttons.css";` : "";
  return `import { useState, useEffect, useRef } from "react";
import {
  Eye, Pencil, Trash2, X, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, Search, Plus, Filter,
  MoreHorizontal, Menu, LogOut, KeyRound, ArrowLeft,
  Palette, Moon, Sun, Check,
} from "lucide-react";
import logo from "../../assets/logo.svg";
import { NAV, KPI, STATUS_STYLE } from "./t1/model";
import { useAuth, useDashboard, useListScreen, useTheme, useThemeCtx, ThemeContext, PALETTES } from "./t1/controller";
import "./t1/Template1.css";${btnCssImport}

function useApplyTheme(palette, dark, rootRef) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--t1-primary", palette.primary);
    el.style.setProperty("--t1-secondary", palette.secondary);
    el.style.setProperty("--t1-primary-soft", dark ? palette.primary + "22" : palette.primary + "18");
    el.style.setProperty("--t1-primary-text", palette.primary);
    el.classList.toggle("dark", dark);
  }, [palette, dark, rootRef]);
}

function Modal({ title, children, onClose }) {
  return (
    <div className="t1-modal-bg">
      <div className="t1-modal">
        <div className="t1-modal-header">
          <h3 className="t1-modal-title">{title}</h3>
          <button className="t1-modal-close" onClick={onClose}><X size={14} color="#6b7280" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function KPICards() {
  return (
    <div className="t1-kpi-grid">
      {KPI.map((k) => (
        <div key={k.label} className="t1-kpi-card">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px" }}>
            <div style={{ width:"40px",height:"40px",background:k.bg,borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <k.Icon size={20} color={k.color} />
            </div>
            <span style={{ display:"flex",alignItems:"center",gap:"3px",fontSize:"12px",fontWeight:700,color:k.up?"#16a34a":"#dc2626",background:k.up?"#f0fdf4":"#fef2f2",padding:"3px 8px",borderRadius:"999px" }}>
              {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.change}
            </span>
          </div>
          <div className="t1-kpi-value">{k.value}</div>
          <div className="t1-kpi-label">{k.label}</div>
        </div>
      ))}
    </div>
  );
}

function ListScreen({ tab }) {
  const { search, setSearch, showAdd, setShowAdd, showView, setShowView,
    showEdit, setShowEdit, showDel, setShowDel, data, filtered, isStatus } = useListScreen(tab);
  const fieldStyle = { width:"100%",padding:"9px 12px",border:"1px solid var(--t1-border)",borderRadius:"8px",fontSize:"13px",outline:"none",boxSizing:"border-box",background:"var(--t1-input-bg)",color:"var(--t1-text)" };
  return (
    <div className="t1-table-card">
      <div className="t1-toolbar">
        <span className="t1-toolbar-title">{tab}</span>
        <div className="t1-search-wrap">
          <input className="t1-search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={\`Search \${tab.toLowerCase()}...\`} />
          <Search size={14} color="#9ca3af" style={{ position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)" }} />
        </div>
        <button className="t1-filter-btn"><Filter size={14} /> Filter</button>
        ${addBtnJsx}
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:"13px" }}>
          <thead>
            <tr className="t1-thead-row">
              {data.cols.map((h) => <th key={h} className="t1-th">{h}</th>)}
              <th className="t1-th t1-th-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={data.cols.length + 1} className="t1-empty">No results found</td></tr>
            ) : filtered.map((row, i) => (
              <tr key={i} className="t1-tr">
                {row.map((cell, ci) => {
                  const isStatusCell = ci === row.length - 1 && isStatus && STATUS_STYLE[cell];
                  return (
                    <td key={ci} className={\`t1-td\${ci === 0 ? " t1-td-bold" : ""}\`}>
                      {isStatusCell ? <span style={{ background:STATUS_STYLE[cell].bg,color:STATUS_STYLE[cell].color,padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:600 }}>{cell}</span> : cell}
                    </td>
                  );
                })}
                <td className="t1-td" style={{ padding:"10px 16px" }}>
                  <div style={{ display:"flex",gap:"6px",justifyContent:"center" }}>
                    {[
                      { fn:()=>setShowView(row), bg:"#eff6ff", color:"#2563eb", Icon:Eye },
                      { fn:()=>setShowEdit(row), bg:"#f0fdf4", color:"#16a34a", Icon:Pencil },
                      { fn:()=>setShowDel(row),  bg:"#fef2f2", color:"#dc2626", Icon:Trash2 },
                    ].map(({ fn, bg, color, Icon }, idx) => (
                      <button key={idx} onClick={fn} style={{ width:"30px",height:"30px",background:bg,color,border:"none",borderRadius:"7px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="t1-pagination">
        <span className="t1-page-info">Showing {filtered.length} of {data.rows.length} entries</span>
        <div style={{ display:"flex",gap:"4px" }}>
          <button className="t1-page-btn"><ChevronLeft size={13} /></button>
          {[1,2,3].map((p) => <button key={p} className={\`t1-page-btn\${p===1?" active":""}\`}>{p}</button>)}
          <button className="t1-page-btn"><ChevronRight size={13} /></button>
        </div>
      </div>
      {showAdd && (
        <Modal title={\`Add \${tab.slice(0,-1)}\`} onClose={() => setShowAdd(false)}>
          {data.cols.map((col) => (<div key={col} className="t1-field"><label className="t1-field-label">{col}</label><input className="t1-field-input" placeholder={\`Enter \${col.toLowerCase()}...\`} style={fieldStyle} /></div>))}
          <div style={{ display:"flex",gap:"8px",marginTop:"4px" }}>
            <button className="t1-btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="t1-btn-primary" onClick={() => setShowAdd(false)}>Save</button>
          </div>
        </Modal>
      )}
      {showView && (
        <Modal title="View Details" onClose={() => setShowView(null)}>
          {data.cols.map((col, i) => (<div key={col} className="t1-view-row"><span className="t1-view-key">{col}</span><span className="t1-view-val">{showView[i]}</span></div>))}
          <button className="t1-btn-cancel" style={{ width:"100%",marginTop:"16px" }} onClick={() => setShowView(null)}>Close</button>
        </Modal>
      )}
      {showEdit && (
        <Modal title="Edit Record" onClose={() => setShowEdit(null)}>
          {data.cols.map((col, i) => (<div key={col} className="t1-field"><label className="t1-field-label">{col}</label><input className="t1-field-input" defaultValue={showEdit[i]} style={fieldStyle} /></div>))}
          <div style={{ display:"flex",gap:"8px",marginTop:"4px" }}>
            <button className="t1-btn-cancel" onClick={() => setShowEdit(null)}>Cancel</button>
            <button className="t1-btn-primary" onClick={() => setShowEdit(null)}>Update</button>
          </div>
        </Modal>
      )}
      {showDel && (
        <Modal title="Confirm Delete" onClose={() => setShowDel(null)}>
          <div style={{ textAlign:"center",padding:"8px 0 20px" }}>
            <div style={{ width:"56px",height:"56px",background:"#fef2f2",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}><Trash2 size={24} color="#dc2626" /></div>
            <p style={{ margin:"0 0 6px",fontSize:"15px",fontWeight:700,color:"var(--t1-text)" }}>Delete this record?</p>
            <p style={{ margin:0,fontSize:"13px",color:"var(--t1-text3)" }}><strong>{showDel[0]}</strong> — this action cannot be undone.</p>
          </div>
          <div style={{ display:"flex",gap:"8px" }}>
            <button className="t1-btn-cancel" onClick={() => setShowDel(null)}>Cancel</button>
            <button className="t1-btn-danger" onClick={() => setShowDel(null)}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ThemePanel({ onClose }) {
  const { palette, setPalette, dark, setDark } = useThemeCtx();
  const ref = useRef();
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return (
    <div className="t1-theme-panel" ref={ref}>
      <div className="t1-panel-title">🎨 Theme Customizer</div>
      <div className="t1-panel-sub">Accent Color</div>
      <div className="t1-palette-grid">
        {PALETTES.map((p) => (
          <button key={p.name} className={\`t1-swatch\${palette.name === p.name ? " selected" : ""}\`}
            style={{ background:\`linear-gradient(135deg,\${p.primary},\${p.secondary})\` }}
            title={p.name} onClick={() => setPalette(p)}>
            {palette.name === p.name && <span className="t1-swatch-check"><Check size={12} /></span>}
          </button>
        ))}
      </div>
      <div className="t1-panel-sub">Mode</div>
      <div className="t1-dark-toggle">
        <span className="t1-dark-toggle-label">{dark ? <Moon size={15} /> : <Sun size={15} />}{dark ? "Dark Mode" : "Light Mode"}</span>
        <button className="t1-toggle-track" style={{ background: dark ? palette.primary : "#e5e7eb" }} onClick={() => setDark((d) => !d)}>
          <div className="t1-toggle-thumb" style={{ left: dark ? "21px" : "3px" }} />
        </button>
      </div>
      <div className="t1-panel-sub" style={{ marginTop:"14px" }}>Preview</div>
      <div style={{ display:"flex",gap:"6px",flexWrap:"wrap" }}>
        {["Primary","Gradient","Soft"].map((lbl, i) => (
          <div key={lbl} style={{ flex:1,padding:"8px",borderRadius:"8px",textAlign:"center",fontSize:"11px",fontWeight:700,
            color: i===2 ? palette.primary : "#fff",
            background: i===0 ? palette.primary : i===1 ? \`linear-gradient(135deg,\${palette.primary},\${palette.secondary})\` : palette.primary+"22" }}>{lbl}</div>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, screen, setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const handleLogin = () => {
    if (!email || !password) { setError("Please enter email and password."); return; }
    if (!onLogin(email, password)) setError("Invalid credentials.");
  };
  return (
    <div className="t1-login-wrap">
      <div className="t1-login-left">
        <img src={logo} width="90" height="90" alt="logo" style={{ marginBottom:"24px",borderRadius:"20px",boxShadow:"0 8px 32px rgba(0,0,0,0.2)" }} />
        <div style={{ fontSize:"32px",fontWeight:800,marginBottom:"12px",textAlign:"center" }}>${appName || "StockFlow"}</div>
        <div style={{ fontSize:"16px",opacity:0.85,textAlign:"center",maxWidth:"320px",lineHeight:1.6 }}>Your all-in-one inventory management platform.</div>
        <div style={{ display:"flex",gap:"32px",marginTop:"48px" }}>
          {[["2,847+","Products"],["1,293+","Orders"],["$84.2K","Revenue"]].map(([val,lbl]) => (
            <div key={lbl} style={{ textAlign:"center" }}><div style={{ fontSize:"22px",fontWeight:800 }}>{val}</div><div style={{ fontSize:"12px",opacity:0.75 }}>{lbl}</div></div>
          ))}
        </div>
      </div>
      <div className="t1-login-right">
        {screen === "login" ? (
          <>
            <div style={{ marginBottom:"32px" }}><div className="t1-login-card-title">Welcome back 👋</div><div className="t1-login-card-sub">Sign in to your ${appName || "StockFlow"} account</div></div>
            <div className="t1-login-field"><label className="t1-login-label">Email Address</label><input className="t1-login-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} /></div>
            <div className="t1-login-field">
              <label className="t1-login-label" style={{ display:"flex",justifyContent:"space-between" }}>Password<button className="t1-login-link" onClick={() => { setScreen("forgot"); setError(""); }}>Forgot password?</button></label>
              <input className="t1-login-input" type="password" placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            {error && <div className="t1-login-error">{error}</div>}
            <button className="t1-login-btn" onClick={handleLogin}>Sign In</button>
          </>
        ) : (
          <>
            <button className="t1-login-link" style={{ display:"flex",alignItems:"center",gap:"6px",marginBottom:"28px",fontSize:"14px" }} onClick={() => { setScreen("login"); setForgotSent(false); setForgotEmail(""); }}><ArrowLeft size={15} /> Back to Sign In</button>
            <div style={{ marginBottom:"28px" }}>
              <div style={{ width:"48px",height:"48px",background:"var(--t1-primary-soft)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px" }}><KeyRound size={22} color="var(--t1-primary)" /></div>
              <div className="t1-login-card-title">Forgot Password?</div>
              <div className="t1-login-card-sub">Enter your email and we'll send you a reset link.</div>
            </div>
            {!forgotSent ? (
              <><div className="t1-login-field"><label className="t1-login-label">Email Address</label><input className="t1-login-input" type="email" placeholder="you@example.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} /></div><button className="t1-login-btn" onClick={() => forgotEmail && setForgotSent(true)}>Send Reset Link</button></>
            ) : (
              <div style={{ textAlign:"center",padding:"24px",background:"#f0fdf4",borderRadius:"12px",border:"1px solid #bbf7d0" }}>
                <div style={{ fontSize:"32px",marginBottom:"8px" }}>✅</div>
                <div style={{ fontWeight:700,color:"#16a34a",marginBottom:"4px" }}>Reset link sent!</div>
                <div style={{ fontSize:"13px",color:"#6b7280" }}>Check your inbox at <strong>{forgotEmail}</strong></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const { active, setActive, sidebarOpen, setSidebarOpen, themeOpen, setThemeOpen } = useDashboard();
  const { palette } = useThemeCtx();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return (
    <div className="t1-wrap">
      {isMobile && sidebarOpen && <div className="t1-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={\`t1-sidebar\${!sidebarOpen ? " collapsed" : ""}\${isMobile && sidebarOpen ? " mobile-open" : ""}\`}>
        <div className="t1-sidebar-logo">
          <img src={logo} width="40" height="40" alt="logo" style={{ borderRadius:"8px",flexShrink:0 }} />
          <div className="t1-logo-text"><div className="t1-logo-name">${appName || "StockFlow"}</div><div className="t1-logo-sub">Inventory Pro</div></div>
        </div>
        <nav className="t1-nav">
          <div className="t1-nav-label">Main Menu</div>
          {NAV.map((item) => {
            const isActive = active === item.label;
            const Icon = item.icon;
            return (
              <button key={item.label} className={\`t1-nav-btn\${isActive ? " active" : ""}\`}
                onClick={() => { setActive(item.label); if (isMobile) setSidebarOpen(false); }}
                title={!sidebarOpen ? item.label : undefined}>
                <Icon size={17} />
                <span className="t1-nav-btn-label">{item.label}</span>
                {item.badge && <span className="t1-badge" style={{ background:isActive?palette.primary:"var(--t1-border)",color:isActive?"#fff":"var(--t1-text3)",borderRadius:"999px",fontSize:"11px",fontWeight:700,padding:"1px 7px" }}>{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="t1-user">
          <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:\`linear-gradient(135deg,\${palette.primary},\${palette.secondary})\`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"13px",flexShrink:0 }}>JD</div>
          <div className="t1-user-info"><div className="t1-user-name">John Doe</div><div className="t1-user-role">Admin</div></div>
          <button className="t1-user-more" style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center" }}><MoreHorizontal size={16} color="var(--t1-text4)" /></button>
        </div>
      </aside>
      <div className="t1-main">
        <header className="t1-header">
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <button className="t1-hamburger" onClick={() => setSidebarOpen((o) => !o)}><Menu size={20} /></button>
            <span className="t1-header-title">{active}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
            <button className="t1-theme-btn" onClick={() => setThemeOpen((o) => !o)}><Palette size={15} /> Theme</button>
            <button className="t1-logout-btn" onClick={onLogout}><LogOut size={15} /> Logout</button>
          </div>
        </header>
        <main className="t1-body">
          {active === "Dashboard" ? <><KPICards /><ListScreen tab="Products" /></> : <ListScreen tab={active} />}
        </main>
      </div>
      {themeOpen && <ThemePanel onClose={() => setThemeOpen(false)} />}
    </div>
  );
}

export default function Template1() {
  const { loggedIn, screen, setScreen, login, logout } = useAuth();
  const theme = useTheme();
  const rootRef = useRef();
  useApplyTheme(theme.palette, theme.dark, rootRef);
  return (
    <ThemeContext.Provider value={theme}>
      <div ref={rootRef} className="t1-root" style={{ height:"100%", fontFamily:"'Inter',sans-serif" }}>
        {!loggedIn ? <LoginScreen onLogin={login} screen={screen} setScreen={setScreen} /> : <Dashboard onLogout={logout} />}
      </div>
    </ThemeContext.Provider>
  );
}
`;
};

// ── Task 5: main.jsx ──────────────────────────────────────────
const generateMainJsx = () =>
`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

// ── Task 6: App.jsx ───────────────────────────────────────────
const generateAppJsx = () =>
`import Template1 from './pages/inventory/Template1';

export default function App() {
  return <Template1 />;
}
`;

// ── Task 7: vite.config.js ────────────────────────────────────
const generateViteConfig = () =>
`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

// ── Task 8: README ────────────────────────────────────────────
const generateReadme = (data) =>
`# ${data.appName || "My App"}

Generated by **TemplateHub** — Template: ${data.templateName || "StockFlow"}

## Modules
${(data.modules || []).map((m) => `- ${m.label}`).join("\n")}

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`
`;

// ── Task 10: Template1.css — inlined ──────────────────────────
const generateTemplate1Css = () =>
`.t1-root{--t1-primary:#6366f1;--t1-secondary:#8b5cf6;--t1-primary-soft:#eff6ff;--t1-primary-text:#6366f1;--t1-bg:#f8fafc;--t1-surface:#fff;--t1-surface2:#f9fafb;--t1-border:#e5e7eb;--t1-border2:#f3f4f6;--t1-text:#111827;--t1-text2:#374151;--t1-text3:#6b7280;--t1-text4:#9ca3af;--t1-input-bg:#f9fafb;--t1-hover:#f9fafb;--t1-shadow:rgba(0,0,0,0.18)}
.t1-root.dark{--t1-bg:#0f172a;--t1-surface:#1e293b;--t1-surface2:#273549;--t1-border:#334155;--t1-border2:#1e293b;--t1-text:#f1f5f9;--t1-text2:#cbd5e1;--t1-text3:#94a3b8;--t1-text4:#64748b;--t1-input-bg:#273549;--t1-hover:#273549;--t1-shadow:rgba(0,0,0,0.5)}
.t1-wrap{display:flex;height:100vh;font-family:'Inter',sans-serif;background:var(--t1-bg);overflow:hidden}
.t1-sidebar{width:240px;background:var(--t1-surface);border-right:1px solid var(--t1-border);display:flex;flex-direction:column;flex-shrink:0;transition:width .2s,transform .2s;overflow:hidden}
.t1-sidebar.collapsed{width:64px}
.t1-sidebar-logo{padding:18px 20px;border-bottom:1px solid var(--t1-border2);display:flex;align-items:center;gap:10px;min-height:80px}
.t1-sidebar.collapsed .t1-sidebar-logo{justify-content:center;padding:18px 0}
.t1-logo-text{white-space:nowrap;overflow:hidden}
.t1-sidebar.collapsed .t1-logo-text{display:none}
.t1-logo-name{font-weight:800;font-size:15px;color:var(--t1-text)}
.t1-logo-sub{font-size:11px;color:var(--t1-text4)}
.t1-nav{flex:1;padding:12px 10px;overflow-y:auto}
.t1-nav-label{font-size:10px;font-weight:700;color:var(--t1-text4);text-transform:uppercase;letter-spacing:.08em;padding:0 10px;margin-bottom:8px;white-space:nowrap;overflow:hidden}
.t1-sidebar.collapsed .t1-nav-label{opacity:0}
.t1-nav-btn{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:none;background:none;color:var(--t1-text3);font-weight:500;font-size:14px;cursor:pointer;margin-bottom:2px;transition:all .15s;text-align:left;white-space:nowrap;overflow:hidden}
.t1-nav-btn.active{background:var(--t1-primary-soft);color:var(--t1-primary-text);font-weight:700}
.t1-nav-btn:hover:not(.active){background:var(--t1-hover)}
.t1-sidebar.collapsed .t1-nav-btn{justify-content:center;padding:10px 0}
.t1-nav-btn-label{flex:1}
.t1-sidebar.collapsed .t1-nav-btn-label{display:none}
.t1-sidebar.collapsed .t1-badge{display:none}
.t1-user{padding:12px 16px;border-top:1px solid var(--t1-border2);display:flex;align-items:center;gap:10px}
.t1-sidebar.collapsed .t1-user{justify-content:center;padding:12px 0}
.t1-user-info{flex:1;min-width:0}
.t1-sidebar.collapsed .t1-user-info{display:none}
.t1-sidebar.collapsed .t1-user-more{display:none}
.t1-user-name{font-size:13px;font-weight:700;color:var(--t1-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t1-user-role{font-size:11px;color:var(--t1-text4)}
.t1-main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.t1-header{background:var(--t1-surface);border-bottom:1px solid var(--t1-border);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;gap:12px}
.t1-header-title{font-size:18px;font-weight:800;color:var(--t1-text)}
.t1-body{flex:1;overflow-y:auto;padding:24px}
.t1-kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.t1-kpi-card{background:var(--t1-surface);border-radius:14px;padding:20px;border:1px solid var(--t1-border)}
.t1-kpi-value{font-size:26px;font-weight:800;color:var(--t1-text);margin-bottom:4px}
.t1-kpi-label{font-size:13px;color:var(--t1-text3)}
.t1-table-card{background:var(--t1-surface);border-radius:14px;border:1px solid var(--t1-border);overflow:hidden}
.t1-toolbar{padding:14px 20px;border-bottom:1px solid var(--t1-border2);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.t1-toolbar-title{font-weight:700;font-size:15px;color:var(--t1-text);flex:1}
.t1-search-wrap{position:relative}
.t1-search-input{padding:7px 12px 7px 34px;border:1px solid var(--t1-border);border-radius:8px;font-size:13px;outline:none;width:180px;background:var(--t1-input-bg);color:var(--t1-text)}
.t1-search-input::placeholder{color:var(--t1-text4)}
.t1-filter-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;background:var(--t1-surface2);border:1px solid var(--t1-border);border-radius:8px;font-size:13px;font-weight:600;color:var(--t1-text2);cursor:pointer}
.t1-add-btn{display:flex;align-items:center;gap:6px;padding:7px 16px;background:linear-gradient(135deg,var(--t1-primary),var(--t1-secondary));color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}
.t1-thead-row{background:var(--t1-surface2)}
.t1-th{padding:11px 16px;text-align:left;font-weight:700;color:var(--t1-text2);font-size:12px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.t1-th-center{text-align:center}
.t1-td{padding:13px 16px;color:var(--t1-text2);white-space:nowrap}
.t1-td-bold{font-weight:600;color:var(--t1-text)}
.t1-tr{border-top:1px solid var(--t1-border2)}
.t1-tr:hover{background:var(--t1-hover)}
.t1-empty{padding:40px;text-align:center;color:var(--t1-text4);font-size:14px}
.t1-pagination{padding:12px 20px;border-top:1px solid var(--t1-border2);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
.t1-page-info{font-size:12px;color:var(--t1-text4)}
.t1-page-btn{width:28px;height:28px;border:1px solid var(--t1-border);border-radius:6px;background:var(--t1-surface);color:var(--t1-text2);font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center}
.t1-page-btn.active{background:var(--t1-primary);color:#fff;border-color:var(--t1-primary)}
.t1-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px}
.t1-modal{background:var(--t1-surface);border-radius:16px;padding:24px;width:100%;max-width:440px;max-height:80vh;overflow-y:auto;box-shadow:0 24px 64px var(--t1-shadow)}
.t1-modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.t1-modal-title{margin:0;font-size:16px;font-weight:800;color:var(--t1-text)}
.t1-modal-close{background:var(--t1-surface2);border:none;width:30px;height:30px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.t1-field{margin-bottom:14px}
.t1-field-label{display:block;font-size:12px;font-weight:700;color:var(--t1-text2);margin-bottom:5px}
.t1-field-input{width:100%;padding:9px 12px;border:1px solid var(--t1-border);border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;background:var(--t1-input-bg);color:var(--t1-text)}
.t1-btn-cancel{flex:1;padding:10px;background:var(--t1-surface2);border:none;border-radius:8px;font-weight:600;cursor:pointer;color:var(--t1-text2)}
.t1-btn-primary{flex:1;padding:10px;background:linear-gradient(135deg,var(--t1-primary),var(--t1-secondary));color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}
.t1-btn-danger{flex:1;padding:10px;background:#ef4444;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}
.t1-view-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--t1-border2)}
.t1-view-key{font-size:13px;color:var(--t1-text3);font-weight:600}
.t1-view-val{font-size:13px;color:var(--t1-text);font-weight:700}
.t1-logout-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:13px;font-weight:600;color:#dc2626;cursor:pointer;white-space:nowrap}
.t1-logout-btn:hover{background:#fee2e2}
.t1-theme-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;background:var(--t1-surface2);border:1px solid var(--t1-border);border-radius:8px;font-size:13px;font-weight:600;color:var(--t1-text2);cursor:pointer;white-space:nowrap}
.t1-theme-btn:hover{background:var(--t1-hover)}
.t1-hamburger{background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:6px;border-radius:8px;color:var(--t1-text3)}
.t1-hamburger:hover{background:var(--t1-hover)}
.t1-theme-panel{position:fixed;top:68px;right:16px;z-index:500;background:var(--t1-surface);border:1px solid var(--t1-border);border-radius:16px;padding:20px;width:280px;box-shadow:0 16px 48px var(--t1-shadow);animation:t1-fadeIn .15s ease}
@keyframes t1-fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.t1-panel-title{font-size:13px;font-weight:700;color:var(--t1-text);margin-bottom:14px}
.t1-panel-sub{font-size:11px;font-weight:600;color:var(--t1-text4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.t1-palette-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px}
.t1-swatch{width:100%;aspect-ratio:1;border-radius:10px;border:3px solid transparent;cursor:pointer;transition:transform .1s,border-color .1s;position:relative}
.t1-swatch:hover{transform:scale(1.1)}
.t1-swatch.selected{border-color:var(--t1-text)}
.t1-swatch-check{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:800}
.t1-dark-toggle{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--t1-surface2);border-radius:10px;border:1px solid var(--t1-border)}
.t1-dark-toggle-label{font-size:13px;font-weight:600;color:var(--t1-text2);display:flex;align-items:center;gap:8px}
.t1-toggle-track{width:40px;height:22px;border-radius:999px;cursor:pointer;border:none;position:relative;transition:background .2s;flex-shrink:0}
.t1-toggle-thumb{position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s}
.t1-overlay{display:none}
.t1-login-wrap{min-height:100vh;display:flex;font-family:'Inter',sans-serif;background:linear-gradient(135deg,var(--t1-primary) 0%,var(--t1-secondary) 100%)}
.t1-login-left{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px;color:#fff}
.t1-login-right{width:480px;background:var(--t1-surface);display:flex;flex-direction:column;justify-content:center;padding:48px;flex-shrink:0}
.t1-login-card-title{font-size:26px;font-weight:800;color:var(--t1-text);margin-bottom:6px}
.t1-login-card-sub{font-size:14px;color:var(--t1-text3);margin-bottom:32px}
.t1-login-field{margin-bottom:18px}
.t1-login-label{display:block;font-size:12px;font-weight:700;color:var(--t1-text2);margin-bottom:6px}
.t1-login-input{width:100%;padding:11px 14px;border:1.5px solid var(--t1-border);border-radius:10px;font-size:14px;outline:none;box-sizing:border-box;transition:border-color .15s;background:var(--t1-input-bg);color:var(--t1-text)}
.t1-login-input:focus{border-color:var(--t1-primary)}
.t1-login-btn{width:100%;padding:12px;background:linear-gradient(135deg,var(--t1-primary),var(--t1-secondary));color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;margin-top:4px}
.t1-login-btn:hover{opacity:.92}
.t1-login-error{font-size:12px;color:#dc2626;margin-top:8px;text-align:center}
.t1-login-link{background:none;border:none;color:var(--t1-primary);font-size:13px;font-weight:600;cursor:pointer;padding:0}
.t1-login-link:hover{text-decoration:underline}
@media(max-width:1024px){.t1-kpi-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.t1-sidebar{position:fixed;top:0;left:0;height:100vh;z-index:200;transform:translateX(-100%);width:240px!important}.t1-sidebar.mobile-open{transform:translateX(0)}.t1-sidebar.collapsed{transform:translateX(-100%)}.t1-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:199}.t1-body{padding:16px}.t1-header{padding:0 16px}.t1-kpi-grid{grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px}.t1-login-left{display:none}.t1-login-right{width:100%;padding:32px 24px}.t1-theme-panel{right:8px;left:8px;width:auto}}
@media(max-width:480px){.t1-kpi-grid{grid-template-columns:1fr 1fr;gap:10px}.t1-login-right{padding:24px 16px}}
`;

export default function Step5({ data, onBack }) {
  const [status, setStatus] = useState("idle"); // idle | generating | done

  const handleLaunch = async () => {
    setStatus("generating");
    await new Promise((r) => setTimeout(r, 1200));

    const zip = new JSZip();
    const src = zip.folder("src");
    const assets = src.folder("assets");
    const pages = src.folder("pages");
    const inventory = pages.folder("inventory");
    const t1 = inventory.folder("t1");

    // wiring files
    src.file("main.jsx", generateMainJsx());
    src.file("App.jsx", generateAppJsx());

    // logo — SVG placeholder, no fetch needed
    assets.file("logo.svg", LOGO_SVG);

    // exact Template1 MVC files — all inlined, no fetch, no HMR symbols
    inventory.file("Template1.jsx", generateTemplate1Jsx(data.components, data.appName));
    t1.file("model.js", generateModelJs(data.modules, data.components));
    t1.file("controller.js", generateControllerJs());
    t1.file("Template1.css", generateTemplate1Css());
    if ((data.components || []).some(c => c.type === "button")) {
      inventory.file("buttons.css", BUTTONS_CSS);
    }

    // project root files
    zip.file("package.json", generatePackageJson(data));
    zip.file("index.html", generateIndexHtml(data));
    zip.file("vite.config.js", generateViteConfig());
    zip.file("README.md", generateReadme(data));

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.projectName || "my-app"}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("done");
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "28px",
            fontWeight: 900,
            color: "#111827",
          }}
        >
          Ready to launch
        </h2>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          Review your project summary and download your generated app.
        </p>
      </div>

      {/* Summary Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            background: getThemeBg(data.theme),
            padding: "20px 24px",
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "20px",
              fontWeight: 900,
              color: "#fff",
            }}
          >
            {data.appName}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            /{data.projectName}
          </p>
        </div>

        <div
          style={{
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {[
            {
              label: "Template",
              value: data.templateName,
              icon: Palette,
            },
            {
              label: "Font",
              value: data.font,
              icon: PenTool,
            },
            {
              label: "Theme",
              value:
                data.theme?.type === "gradient"
                  ? `${data.theme.from} → ${data.theme.to}`
                  : data.theme?.color || "—",
              icon: Palette,
            },
            {
              label: "Modules",
              value: `${data.modules?.length || 0} sidebar modules`,
              icon: Layers,
            },
            {
              label: "Components",
              value: `${data.components?.length || 0} page components`,
              icon: Layers,
            },
          ].map((item) => {
            const ItemIcon = item.icon;

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "12px",
                  background: "#f9fafb",
                  borderRadius: "12px",
                }}
              >
                <ItemIcon size={20} color="#6366f1" style={{ flexShrink: 0 }} />

                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modules list */}
        <div style={{ padding: "0 24px 20px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            Sidebar Modules
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {data.modules?.map((m) => (
              <span
                key={m.id}
                style={{
                  background: "#eff6ff",
                  color: "#6366f1",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>

        {/* File structure */}
        <div style={{ padding: "0 24px 20px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            Generated File Structure
          </div>

          <div
            style={{
              background: "#1f2937",
              borderRadius: "12px",
              padding: "14px 16px",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#e5e7eb",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#f59e0b" }}>📁 {data.projectName}/</div>
            <div style={{ paddingLeft: "16px", color: "#94a3b8" }}>📁 src/</div>
            <div style={{ paddingLeft: "32px", color: "#94a3b8" }}>📁 pages/inventory/</div>
            <div style={{ paddingLeft: "48px", color: "#86efac" }}>📄 Template1.jsx</div>
            <div style={{ paddingLeft: "48px", color: "#94a3b8" }}>📁 t1/</div>
            <div style={{ paddingLeft: "64px", color: "#86efac" }}>📄 model.js</div>
            <div style={{ paddingLeft: "64px", color: "#86efac" }}>📄 controller.js</div>
            <div style={{ paddingLeft: "64px", color: "#86efac" }}>📄 Template1.css</div>
            <div style={{ paddingLeft: "32px", color: "#86efac" }}>📄 App.jsx</div>
            <div style={{ paddingLeft: "32px", color: "#86efac" }}>📄 main.jsx</div>
            <div style={{ paddingLeft: "16px", color: "#86efac" }}>📄 package.json</div>
            <div style={{ paddingLeft: "16px", color: "#86efac" }}>📄 index.html</div>
            <div style={{ paddingLeft: "16px", color: "#86efac" }}>📄 vite.config.js</div>
            <div style={{ paddingLeft: "16px", color: "#86efac" }}>📄 README.md</div>
          </div>
        </div>
      </div>

      {status === "done" ? (
        <div
          style={{
            background: "#f0fdf4",
            border: "2px solid #22c55e",
            borderRadius: "16px",
            padding: "20px 24px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>✓</div>

          <h3
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: 800,
              color: "#15803d",
            }}
          >
            Project Downloaded!
          </h3>

          <p
            style={{
              margin: "0 0 12px",
              fontSize: "14px",
              color: "#16a34a",
            }}
          >
            <strong>{data.projectName}.zip</strong> has been downloaded. Extract
            and run:
          </p>

          <div
            style={{
              background: "#1f2937",
              borderRadius: "10px",
              padding: "10px 16px",
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#86efac",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            cd {data.projectName} → npm install → npm run dev
          </div>
        </div>
      ) : (
        <button
          onClick={handleLaunch}
          disabled={status === "generating"}
          style={{
            width: "100%",
            padding: "16px",
            background:
              status === "generating" ? "#e5e7eb" : getThemeBg(data.theme),
            color: status === "generating" ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "16px",
            cursor: status === "generating" ? "not-allowed" : "pointer",
            boxShadow:
              status === "generating"
                ? "none"
                : "0 4px 16px rgba(99,102,241,0.3)",
            marginBottom: "12px",
          }}
        >
          {status === "generating"
            ? "Generating project..."
            : "Launch & Download Project"}
        </button>
      )}

      <button
        onClick={onBack}
        style={{
          width: "100%",
          padding: "12px",
          background: "#f3f4f6",
          color: "#374151",
          border: "none",
          borderRadius: "14px",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        ← Back to Page Builder
      </button>
    </div>
  );
}
