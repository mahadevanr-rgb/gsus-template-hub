import { useState } from "react";

export default function EcommerceHeader({ cartCount = 0, onCartClick, onNavigate, currentPage }) {
  const [search, setSearch] = useState("");

  const navLinks = ["All Products", "Electronics", "Fashion", "Home & Living", "Sports", "Beauty"];

  return (
    <header style={{ background: "#fff", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      {/* Announcement Bar */}
      <div style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff", padding: "8px 0", textAlign: "center", fontSize: "13px", fontWeight: 500 }}>
        🎉 Free shipping on orders over $50 &nbsp;·&nbsp; Use code <strong>SAVE20</strong> for 20% off
      </div>

      {/* Main Header */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Logo */}
        <div onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🛍️</div>
          <span style={{ fontSize: "22px", fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShopHub</span>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: "560px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 56px 12px 18px", border: "2px solid #e5e7eb", borderRadius: "14px", fontSize: "14px", outline: "none", background: "#f9fafb", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.background = "#fff"; }}
            onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; }}
          />
          <button style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "16px" }}>🔍</button>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          {/* Wishlist */}
          <button style={{ position: "relative", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", cursor: "pointer", fontSize: "18px" }}>
            🤍
            <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", color: "#fff", borderRadius: "999px", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
          </button>

          {/* Cart */}
          <button onClick={onCartClick} style={{ position: "relative", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "10px 14px", cursor: "pointer", fontSize: "18px" }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#6366f1", color: "#fff", borderRadius: "999px", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            )}
          </button>

          {/* Account */}
          <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "12px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}>
            <span>👤</span> Account
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <div style={{ borderTop: "1px solid #f3f4f6", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "flex", gap: "4px" }}>
          {navLinks.map((cat) => (
            <button key={cat} onClick={() => onNavigate("products")}
              style={{ padding: "12px 16px", background: "none", border: "none", fontSize: "13px", fontWeight: 600, color: "#6b7280", cursor: "pointer", borderBottom: "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.borderBottomColor = "#6366f1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >{cat}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
