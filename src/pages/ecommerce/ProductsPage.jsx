import { useState } from "react";
import { products } from "./data";

export default function ProductsPage({ onProductClick }) {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(3000);
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["All", "Electronics", "Fashion", "Home & Living", "Books"];

  const filtered = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating")     return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px", minHeight: "100vh" }}>
      {/* Sidebar Filters */}
      <aside>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", border: "1px solid #e5e7eb", position: "sticky", top: "160px" }}>
          <h3 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: 800, color: "#111827" }}>Filters</h3>

          {/* Categories */}
          <div style={{ marginBottom: "28px" }}>
            <h4 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</h4>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 14px", marginBottom: "6px", background: selectedCategory === cat ? "#eff6ff" : "none", border: selectedCategory === cat ? "1px solid #bfdbfe" : "1px solid transparent", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: selectedCategory === cat ? 700 : 500, color: selectedCategory === cat ? "#6366f1" : "#374151", textAlign: "left" }}
              >
                {cat}
                <span style={{ background: "#f3f4f6", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", color: "#6b7280" }}>
                  {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: "28px" }}>
            <h4 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price Range</h4>
            <input type="range" min={0} max={3000} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#6366f1" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "13px", color: "#6b7280" }}>
              <span>$0</span>
              <span style={{ fontWeight: 700, color: "#6366f1" }}>Up to ${priceRange}</span>
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: "28px" }}>
            <h4 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Rating</h4>
            {[4.5, 4.0, 3.5].map(r => (
              <button key={r} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#374151" }}>
                <span style={{ color: "#f59e0b" }}>{"★".repeat(Math.floor(r))}</span>
                <span>{r}+ & above</span>
              </button>
            ))}
          </div>

          <button onClick={() => { setSelectedCategory("All"); setPriceRange(3000); }}
            style={{ width: "100%", padding: "12px", background: "#f3f4f6", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer", color: "#374151" }}>
            Clear Filters
          </button>
        </div>
      </aside>

      {/* Products Grid */}
      <div>
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", background: "#fff", padding: "16px 20px", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Showing <strong style={{ color: "#111827" }}>{filtered.length}</strong> products
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", cursor: "pointer" }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div style={{ display: "flex", gap: "4px" }}>
              {["grid", "list"].map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  style={{ padding: "8px 12px", background: viewMode === mode ? "#6366f1" : "#f3f4f6", color: viewMode === mode ? "#fff" : "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}>
                  {mode === "grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill,minmax(260px,1fr))" : "1fr", gap: "20px" }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => onProductClick(p.id)}
              style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s", border: "1px solid #e5e7eb", display: viewMode === "list" ? "flex" : "block" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "relative", background: `${p.color}12`, height: viewMode === "list" ? "160px" : "220px", width: viewMode === "list" ? "200px" : "100%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: viewMode === "list" ? "72px" : "90px" }}>{p.emoji}</div>
                {p.badge && <div style={{ position: "absolute", top: "10px", left: "10px", background: p.color, color: "#fff", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700 }}>{p.badge}</div>}
                <button onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>🤍</button>
              </div>
              <div style={{ padding: "18px", flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>{p.category}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 700, color: "#111827" }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{p.rating}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>({p.reviews.toLocaleString()})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>${p.price}</span>
                    {p.originalPrice && <span style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "line-through" }}>${p.originalPrice}</span>}
                  </div>
                  <button onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
