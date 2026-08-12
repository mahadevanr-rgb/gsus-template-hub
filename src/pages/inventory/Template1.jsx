import { useState, useEffect, useRef } from "react";
import {
  Eye, Pencil, Trash2, X, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, Search, Plus, Filter,
  MoreHorizontal, Menu, LogOut, KeyRound, ArrowLeft,
  Palette, Moon, Sun, Check,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { NAV, KPI, STATUS_STYLE } from "./t1/model";
import { useAuth, useDashboard, useListScreen, useTheme, useThemeCtx, ThemeContext, PALETTES } from "./t1/controller";
import "./t1/Template1.css";

// ── Apply theme vars to DOM ───────────────────────────────────
function useApplyTheme(palette, dark, rootRef) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--t1-primary", palette.primary);
    el.style.setProperty("--t1-secondary", palette.secondary);
    // soft bg = primary at 10% opacity approximated
    el.style.setProperty("--t1-primary-soft", dark ? palette.primary + "22" : palette.primary + "18");
    el.style.setProperty("--t1-primary-text", palette.primary);
    el.classList.toggle("dark", dark);
  }, [palette, dark, rootRef]);
}

// ── Modal ─────────────────────────────────────────────────────
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

// ── KPI Cards ─────────────────────────────────────────────────
function KPICards() {
  const { palette } = useThemeCtx();
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

// ── List Screen ───────────────────────────────────────────────
function ListScreen({ tab }) {
  const { search, setSearch, showAdd, setShowAdd, showView, setShowView,
    showEdit, setShowEdit, showDel, setShowDel, data, filtered, isStatus } = useListScreen(tab);

  return (
    <div className="t1-table-card">
      {/* Toolbar */}
      <div className="t1-toolbar">
        <span className="t1-toolbar-title">{tab}</span>
        <div className="t1-search-wrap">
          <input className="t1-search-input" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab.toLowerCase()}...`} />
          <Search size={14} color="#9ca3af" style={{ position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)" }} />
        </div>
        <button className="t1-filter-btn"><Filter size={14} /> Filter</button>
        <button className="t1-add-btn" onClick={() => setShowAdd(true)}><Plus size={14} /> Add {tab.slice(0,-1)}</button>
      </div>

      {/* Table */}
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
                    <td key={ci} className={`t1-td${ci === 0 ? " t1-td-bold" : ""}`}>
                      {isStatusCell
                        ? <span style={{ background:STATUS_STYLE[cell].bg,color:STATUS_STYLE[cell].color,padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:600 }}>{cell}</span>
                        : cell}
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

      {/* Pagination */}
      <div className="t1-pagination">
        <span className="t1-page-info">Showing {filtered.length} of {data.rows.length} entries</span>
        <div style={{ display:"flex",gap:"4px" }}>
          <button className="t1-page-btn"><ChevronLeft size={13} /></button>
          {[1,2,3].map((p) => <button key={p} className={`t1-page-btn${p===1?" active":""}`}>{p}</button>)}
          <button className="t1-page-btn"><ChevronRight size={13} /></button>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <Modal title={`Add ${tab.slice(0,-1)}`} onClose={() => setShowAdd(false)}>
          {data.cols.map((col) => (
            <div key={col} className="t1-field">
              <label className="t1-field-label">{col}</label>
              <input className="t1-field-input" placeholder={`Enter ${col.toLowerCase()}...`} />
            </div>
          ))}
          <div style={{ display:"flex",gap:"8px",marginTop:"4px" }}>
            <button className="t1-btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="t1-btn-primary" onClick={() => setShowAdd(false)}>Save</button>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {showView && (
        <Modal title="View Details" onClose={() => setShowView(null)}>
          {data.cols.map((col, i) => (
            <div key={col} className="t1-view-row">
              <span className="t1-view-key">{col}</span>
              <span className="t1-view-val">{showView[i]}</span>
            </div>
          ))}
          <button className="t1-btn-cancel" style={{ width:"100%",marginTop:"16px" }} onClick={() => setShowView(null)}>Close</button>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Record" onClose={() => setShowEdit(null)}>
          {data.cols.map((col, i) => (
            <div key={col} className="t1-field">
              <label className="t1-field-label">{col}</label>
              <input className="t1-field-input" defaultValue={showEdit[i]} />
            </div>
          ))}
          <div style={{ display:"flex",gap:"8px",marginTop:"4px" }}>
            <button className="t1-btn-cancel" onClick={() => setShowEdit(null)}>Cancel</button>
            <button className="t1-btn-primary" onClick={() => setShowEdit(null)}>Update</button>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDel && (
        <Modal title="Confirm Delete" onClose={() => setShowDel(null)}>
          <div style={{ textAlign:"center",padding:"8px 0 20px" }}>
            <div style={{ width:"56px",height:"56px",background:"#fef2f2",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
              <Trash2 size={24} color="#dc2626" />
            </div>
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

// ── Theme Panel ───────────────────────────────────────────────
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
          <button key={p.name} className={`t1-swatch${palette.name === p.name ? " selected" : ""}`}
            style={{ background:`linear-gradient(135deg,${p.primary},${p.secondary})` }}
            title={p.name}
            onClick={() => setPalette(p)}>
            {palette.name === p.name && <span className="t1-swatch-check"><Check size={12} /></span>}
          </button>
        ))}
      </div>

      <div className="t1-panel-sub">Mode</div>
      <div className="t1-dark-toggle">
        <span className="t1-dark-toggle-label">
          {dark ? <Moon size={15} /> : <Sun size={15} />}
          {dark ? "Dark Mode" : "Light Mode"}
        </span>
        <button className="t1-toggle-track"
          style={{ background: dark ? palette.primary : "#e5e7eb" }}
          onClick={() => setDark((d) => !d)}>
          <div className="t1-toggle-thumb" style={{ left: dark ? "21px" : "3px" }} />
        </button>
      </div>

      <div className="t1-panel-sub" style={{ marginTop:"14px" }}>Preview</div>
      <div style={{ display:"flex",gap:"6px",flexWrap:"wrap" }}>
        {["Primary","Gradient","Soft"].map((lbl, i) => (
          <div key={lbl} style={{
            flex:1, padding:"8px", borderRadius:"8px", textAlign:"center",
            fontSize:"11px", fontWeight:700, color: i===2 ? palette.primary : "#fff",
            background: i===0 ? palette.primary : i===1 ? `linear-gradient(135deg,${palette.primary},${palette.secondary})` : palette.primary+"22",
          }}>{lbl}</div>
        ))}
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────
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
        <img src="../src/assets/images/logo.png" width="90" height="90" alt="logo"
          style={{ marginBottom:"24px",borderRadius:"20px",boxShadow:"0 8px 32px rgba(0,0,0,0.2)" }} />
        <div style={{ fontSize:"32px",fontWeight:800,marginBottom:"12px",textAlign:"center" }}>StockFlow</div>
        <div style={{ fontSize:"16px",opacity:0.85,textAlign:"center",maxWidth:"320px",lineHeight:1.6 }}>
          Your all-in-one inventory management platform. Track, manage, and grow.
        </div>
        <div style={{ display:"flex",gap:"32px",marginTop:"48px" }}>
          {[["2,847+","Products"],["1,293+","Orders"],["$84.2K","Revenue"]].map(([val,lbl]) => (
            <div key={lbl} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"22px",fontWeight:800 }}>{val}</div>
              <div style={{ fontSize:"12px",opacity:0.75 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="t1-login-right">
        {screen === "login" ? (
          <>
            <div style={{ marginBottom:"32px" }}>
              <div className="t1-login-card-title">Welcome back 👋</div>
              <div className="t1-login-card-sub">Sign in to your StockFlow account</div>
            </div>
            <div className="t1-login-field">
              <label className="t1-login-label">Email Address</label>
              <input className="t1-login-input" type="email" placeholder="you@example.com"
                value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
            </div>
            <div className="t1-login-field">
              <label className="t1-login-label" style={{ display:"flex",justifyContent:"space-between" }}>
                Password
                <button className="t1-login-link" onClick={() => { setScreen("forgot"); setError(""); }}>Forgot password?</button>
              </label>
              <input className="t1-login-input" type="password" placeholder="••••••••"
                value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            {error && <div className="t1-login-error">{error}</div>}
            <button className="t1-login-btn" onClick={handleLogin}>Sign In</button>
          </>
        ) : (
          <>
            <button className="t1-login-link" style={{ display:"flex",alignItems:"center",gap:"6px",marginBottom:"28px",fontSize:"14px" }}
              onClick={() => { setScreen("login"); setForgotSent(false); setForgotEmail(""); }}>
              <ArrowLeft size={15} /> Back to Sign In
            </button>
            <div style={{ marginBottom:"28px" }}>
              <div style={{ width:"48px",height:"48px",background:"var(--t1-primary-soft)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px" }}>
                <KeyRound size={22} color="var(--t1-primary)" />
              </div>
              <div className="t1-login-card-title">Forgot Password?</div>
              <div className="t1-login-card-sub">Enter your email and we'll send you a reset link.</div>
            </div>
            {!forgotSent ? (
              <>
                <div className="t1-login-field">
                  <label className="t1-login-label">Email Address</label>
                  <input className="t1-login-input" type="email" placeholder="you@example.com"
                    value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                </div>
                <button className="t1-login-btn" onClick={() => forgotEmail && setForgotSent(true)}>Send Reset Link</button>
              </>
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

// ── Dashboard ─────────────────────────────────────────────────
function Dashboard({ onLogout, navItems }) {
  const { active, setActive, sidebarOpen, setSidebarOpen, themeOpen, setThemeOpen } = useDashboard();
  const { palette, dark } = useThemeCtx();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const navList = navItems || NAV;

  return (
    <div className="t1-wrap">
      {isMobile && sidebarOpen && <div className="t1-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`t1-sidebar${!sidebarOpen ? " collapsed" : ""}${isMobile && sidebarOpen ? " mobile-open" : ""}`}>
        <div className="t1-sidebar-logo">
          <img src="../src/assets/images/logo.png" width="40" height="40" alt="logo" style={{ borderRadius:"8px",flexShrink:0 }} />
          <div className="t1-logo-text">
            <div className="t1-logo-name">StockFlow</div>
            <div className="t1-logo-sub">Inventory Pro</div>
          </div>
        </div>

        <nav className="t1-nav">
          <div className="t1-nav-label">Main Menu</div>
          {navList.map((item) => {
            const isActive = active === item.label;
            const Icon = item.icon;
            return (
              <button key={item.label} className={`t1-nav-btn${isActive ? " active" : ""}`}
                onClick={() => { setActive(item.label); if (isMobile) setSidebarOpen(false); }}
                title={!sidebarOpen ? item.label : undefined}>
                <Icon size={17} />
                <span className="t1-nav-btn-label">{item.label}</span>
                {item.badge && (
                  <span className="t1-badge" style={{ background:isActive?palette.primary:"var(--t1-border)",color:isActive?"#fff":"var(--t1-text3)",borderRadius:"999px",fontSize:"11px",fontWeight:700,padding:"1px 7px" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="t1-user">
          <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:`linear-gradient(135deg,${palette.primary},${palette.secondary})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"13px",flexShrink:0 }}>JD</div>
          <div className="t1-user-info">
            <div className="t1-user-name">John Doe</div>
            <div className="t1-user-role">Admin</div>
          </div>
          <button className="t1-user-more" style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center" }}>
            <MoreHorizontal size={16} color="var(--t1-text4)" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="t1-main">
        <header className="t1-header">
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <button className="t1-hamburger" onClick={() => setSidebarOpen((o) => !o)}><Menu size={20} /></button>
            <span className="t1-header-title">{active}</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
            <button className="t1-theme-btn" onClick={() => setThemeOpen((o) => !o)}>
              <Palette size={15} /> Theme
            </button>
            <button className="t1-logout-btn" onClick={onLogout}>
              <LogOut size={15} /> Logout
            </button>
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

// ── Preview Export (used by Step3 — skips login, accepts live nav) ────────────
export function Template1Preview({ modules }) {
  const theme = useTheme();
  const rootRef = useRef();
  useApplyTheme(theme.palette, theme.dark, rootRef);

  // Convert Step3 module format → NAV format
  const navItems = modules && modules.length > 0
    ? modules.map((m) => ({ icon: LucideIcons[m.icon] || LucideIcons["Package"], label: m.label }))
    : NAV;

  return (
    <ThemeContext.Provider value={theme}>
      <div ref={rootRef} className="t1-root" style={{ width:"100%", height:"100%", fontFamily:"'Inter',sans-serif" }}>
        <Dashboard onLogout={() => {}} navItems={navItems} />
      </div>
    </ThemeContext.Provider>
  );
}

// ── Root ──────────────────────────────────────────────────────
export default function Template1() {
  const { loggedIn, screen, setScreen, login, logout } = useAuth();
  const theme = useTheme();
  const rootRef = useRef();
  useApplyTheme(theme.palette, theme.dark, rootRef);

  return (
    <ThemeContext.Provider value={theme}>
      <div ref={rootRef} className="t1-root" style={{ height:"100%", fontFamily:"'Inter',sans-serif" }}>
        {!loggedIn
          ? <LoginScreen onLogin={login} screen={screen} setScreen={setScreen} />
          : <Dashboard onLogout={logout} />}
      </div>
    </ThemeContext.Provider>
  );
}
