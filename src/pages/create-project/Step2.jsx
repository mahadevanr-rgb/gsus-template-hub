import Template1 from "../inventory/Template1";
import Template2 from "../inventory/Template2";
import Template3 from "../inventory/Template3";
import Template4 from "../inventory/Template4";
import Template5 from "../inventory/Template5";

const templates = [
  { id: 1, name: "StockFlow",    tagline: "Classic Light Sidebar",          tags: ["Light","Minimal"],       accent: "#6366f1", bg: "linear-gradient(135deg,#eff6ff,#f5f3ff)", component: Template1 },
  { id: 2, name: "NexStock",     tagline: "Dark Pro Sidebar",               tags: ["Dark","Enterprise"],     accent: "#818cf8", bg: "linear-gradient(135deg,#0f172a,#1e293b)", component: Template2 },
  { id: 3, name: "VaultIQ",      tagline: "Floating Pill UI",               tags: ["Floating","Modern"],     accent: "#f97316", bg: "linear-gradient(135deg,#eef2f7,#fce7f3)", component: Template3 },
  { id: 4, name: "WarehouseOS",  tagline: "Glassmorphism Dark + Icon Rail", tags: ["Glass","Icon Rail"],     accent: "#6366f1", bg: "linear-gradient(135deg,#0a0a1a,#1e1b4b)", component: Template4 },
  { id: 5, name: "DepotOS",      tagline: "Gradient Sidebar + Bento Grid",  tags: ["Gradient","Bento"],      accent: "#4f46e5", bg: "linear-gradient(135deg,#f0f4ff,#ede9fe)", component: Template5 },
];

export default function Step2({ data, onChange, onNext, onBack }) {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: 900, color: "#111827" }}>Choose a template</h2>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>
          Your app name <strong style={{ color: "#6366f1" }}>"{data.appName}"</strong> will appear dynamically in the selected template.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(480px,1fr))", gap: "24px", marginBottom: "32px" }}>
        {templates.map(t => {
          const isSelected = data.templateId === t.id;
          return (
            <div key={t.id} onClick={() => onChange({ templateId: t.id, templateName: t.name })}
              style={{
                borderRadius: "20px", overflow: "hidden", cursor: "pointer",
                border: `3px solid ${isSelected ? t.accent : "#e5e7eb"}`,
                boxShadow: isSelected ? `0 0 0 4px ${t.accent}25, 0 12px 32px rgba(0,0,0,0.1)` : "0 4px 16px rgba(0,0,0,0.06)",
                transition: "all 0.25s", background: "#fff",
              }}
              onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}}
              onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}}
            >
              {/* Thumbnail */}
              <div style={{ height: "260px", background: t.bg, position: "relative", overflow: "hidden" }}>
                <div style={{ transform: "scale(0.42) translateX(-68%) translateY(-68%)", transformOrigin: "top left", width: "238%", height: "238%", pointerEvents: "none", userSelect: "none" }}>
                  <t.component />
                </div>
                {/* App name overlay */}
                <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, fontFamily: data.font || "Inter" }}>
                  {data.appName}
                </div>
                {isSelected && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: t.accent, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>✓</div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800, color: "#111827" }}>{t.name}</h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{t.tagline}</p>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ background: `${t.accent}15`, color: t.accent, padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} style={{ padding: "14px 28px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} disabled={!data.templateId}
          style={{ flex: 1, padding: "14px", background: data.templateId ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e5e7eb", color: data.templateId ? "#fff" : "#9ca3af", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: data.templateId ? "pointer" : "not-allowed", boxShadow: data.templateId ? "0 4px 16px rgba(99,102,241,0.3)" : "none" }}>
          Next: Configure Sidebar →
        </button>
      </div>
    </div>
  );
}
