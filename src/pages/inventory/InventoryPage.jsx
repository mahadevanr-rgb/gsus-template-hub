import { useState } from "react";
import Template1 from "./Template1";
// import Template2 from "./Template2";
// import Template3 from "./Template3";
// import Template4 from "./Template4";
// import Template5 from "./Template5";

const templates = [
  {
    id: 1,
    name: "StockFlow",
    tagline: "Classic Light Sidebar",
    description: "Clean white sidebar with top appbar. Notion / Linear inspired. Perfect for SaaS inventory tools.",
    tags: ["Light", "Classic", "Minimal"],
    accent: "#6366f1",
    bg: "linear-gradient(135deg,#eff6ff,#f5f3ff)",
    preview: Template1,
  },
];

export default function InventoryPage() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const PreviewComponent = templates[selected].preview;
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", flexDirection: "column" }}>
        {/* Preview Topbar */}
        <div style={{ background: "#1f2937", color: "#fff", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>← Back</button>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>Preview: {templates[selected].name}</span>
            <span style={{ background: "rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", color: "#94a3b8" }}>{templates[selected].tagline}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["●", "●", "●"].map((d, i) => (
              <span key={i} style={{ color: i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e", fontSize: "14px" }}>{d}</span>
            ))}
          </div>
        </div>
        {/* Full Preview */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PreviewComponent />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%)", fontFamily: "'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "32px 48px 28px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📦</div>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 900, color: "#111827" }}>Inventory Manager Templates</h1>
          </div>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>
            Professional SaaS dashboard layouts. Click any template to preview the full design.
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {["All", "Light", "Dark", "Minimal", "Pro"].map(tag => (
              <button key={tag} style={{ padding: "6px 16px", background: tag === "All" ? "#6366f1" : "#f3f4f6", color: tag === "All" ? "#fff" : "#374151", border: "none", borderRadius: "999px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(520px,1fr))", gap: "28px" }}>
          {templates.map((t, i) => (
            <div key={t.id}
              style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
            >
              {/* Thumbnail Preview */}
              <div style={{ height: "280px", background: t.bg, position: "relative", overflow: "hidden" }}>
                <div style={{ transform: "scale(0.42) translateX(-68%) translateY(-68%)", transformOrigin: "top left", width: "238%", height: "238%", pointerEvents: "none", userSelect: "none" }}>
                  <t.preview />
                </div>
                {/* Overlay gradient */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.08) 100%)" }} />
                {/* Template number badge */}
                <div style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(0,0,0,0.5)", color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(8px)" }}>
                  Template {t.id}
                </div>
                {/* Preview button */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", background: "rgba(0,0,0,0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                  onClick={() => setSelected(i)}
                >
                  <button style={{ background: "#fff", color: "#111827", border: "none", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
                    👁 Preview Template
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800, color: "#111827" }}>{t.name}</h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{t.tagline}</p>
                  </div>
                  <button onClick={() => setSelected(i)}
                    style={{ background: t.accent, color: "#fff", border: "none", padding: "8px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", flexShrink: 0 }}>
                    Preview →
                  </button>
                </div>
                <p style={{ margin: "12px 0", fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>{t.description}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ background: `${t.accent}15`, color: t.accent, padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Cards */}
          {[2,3,4,5,6,7,8,9,10].map(n => (
            <div key={n} style={{ background: "#fff", borderRadius: "20px", border: "2px dashed #e5e7eb", overflow: "hidden", opacity: 0.6 }}>
              <div style={{ height: "280px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "40px" }}>🔒</div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#9ca3af" }}>Template {n}</span>
                <span style={{ fontSize: "12px", color: "#d1d5db", background: "#f3f4f6", padding: "4px 12px", borderRadius: "999px" }}>Coming Soon</span>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ height: "16px", background: "#f3f4f6", borderRadius: "8px", marginBottom: "8px", width: "60%" }} />
                <div style={{ height: "12px", background: "#f3f4f6", borderRadius: "8px", width: "80%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
