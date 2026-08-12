import { products, categories } from "./data";

export default function EcommerceHome({ onNavigate, onProductClick }) {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)", color: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }}>
              ✨ New Collection 2024
            </div>
            <h1 style={{ margin: "0 0 20px", fontSize: "56px", fontWeight: 900, lineHeight: 1.1 }}>
              Discover Your Style
            </h1>
            <p style={{ margin: "0 0 32px", fontSize: "18px", opacity: 0.9, lineHeight: 1.6 }}>
              Shop the latest trends in electronics, fashion, home decor and more. Premium quality at unbeatable prices.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => onNavigate("products")} style={{ background: "#fff", color: "#6366f1", border: "none", padding: "16px 32px", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                Shop Now →
              </button>
              <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "16px 32px", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
                View Deals
              </button>
            </div>
            <div style={{ display: "flex", gap: "32px", marginTop: "48px" }}>
              {[{ label: "Products", value: "2,400+" }, { label: "Customers", value: "50K+" }, { label: "Reviews", value: "4.8★" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "28px", fontWeight: 800 }}>{s.value}</div>
                  <div style={{ fontSize: "13px", opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", height: "480px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "360px", height: "360px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", position: "absolute", animation: "pulse 3s ease-in-out infinite" }} />
            <div style={{ fontSize: "200px", position: "relative", zIndex: 2 }}>🛍️</div>
            <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(1.1);opacity:0.5}}`}</style>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: "1280px", margin: "-60px auto 80px", padding: "0 32px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "20px" }}>
          {categories.map(cat => (
            <div key={cat.name} onClick={() => onNavigate("products")}
              style={{ background: cat.bg, border: `2px solid ${cat.color}20`, borderRadius: "20px", padding: "32px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>{cat.emoji}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>{cat.name}</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{cat.count} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ maxWidth: "1280px", margin: "0 auto 80px", padding: "0 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: 800, color: "#111827" }}>Featured Products</h2>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "15px" }}>Handpicked items just for you</p>
          </div>
          <button onClick={() => onNavigate("products")} style={{ background: "none", border: "2px solid #6366f1", color: "#6366f1", padding: "10px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            View All →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "24px" }}>
          {products.slice(0, 4).map(p => (
            <div key={p.id} onClick={() => onProductClick(p.id)}
              style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ position: "relative", background: `${p.color}15`, height: "240px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "100px" }}>{p.emoji}</div>
                {p.badge && (
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: p.color, color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>{p.badge}</div>
                )}
                <button style={{ position: "absolute", top: "12px", right: "12px", background: "#fff", border: "none", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>🤍</button>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>{p.category}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                  <span style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{p.rating}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>({p.reviews.toLocaleString()})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>${p.price}</span>
                  {p.originalPrice && <span style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "line-through" }}>${p.originalPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section style={{ maxWidth: "1280px", margin: "0 auto 80px", padding: "0 32px" }}>
        <div style={{ background: "linear-gradient(135deg,#ec4899,#f59e0b)", borderRadius: "24px", padding: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "200px", height: "200px", background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: "-60px", bottom: "-60px", width: "240px", height: "240px", background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: "40px", fontWeight: 900 }}>Summer Sale 🔥</h2>
            <p style={{ margin: "0 0 24px", fontSize: "18px", opacity: 0.9 }}>Up to 50% off on selected items. Limited time offer!</p>
            <button onClick={() => onNavigate("products")} style={{ background: "#fff", color: "#ec4899", border: "none", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              Shop Sale →
            </button>
          </div>
          <div style={{ fontSize: "180px", position: "relative", zIndex: 2 }}>🎁</div>
        </div>
      </section>
    </div>
  );
}
