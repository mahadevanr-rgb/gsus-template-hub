export default function EcommerceFooter() {
  return (
    <footer style={{ background: "#111827", color: "#fff", marginTop: "80px" }}>
      {/* Newsletter */}
      <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "48px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: 800 }}>Stay in the loop 📬</h3>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "15px" }}>Get exclusive deals, new arrivals and style tips delivered to your inbox.</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <input type="email" placeholder="Enter your email..." style={{ padding: "12px 20px", borderRadius: "12px", border: "none", fontSize: "14px", width: "280px", outline: "none" }} />
            <button style={{ background: "#fff", color: "#6366f1", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🛍️</div>
            <span style={{ fontSize: "20px", fontWeight: 800, background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShopHub</span>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>Your one-stop destination for premium products at unbeatable prices. Shop with confidence.</p>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
              <button key={i} style={{ width: "36px", height: "36px", background: "#1f2937", border: "1px solid #374151", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 style={{ margin: "0 0 20px", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#e5e7eb" }}>Shop</h4>
          {["All Products", "New Arrivals", "Best Sellers", "Sale", "Electronics", "Fashion"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: "#9ca3af", textDecoration: "none", fontSize: "14px", marginBottom: "10px", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = "#818cf8"}
              onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            >{l}</a>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4 style={{ margin: "0 0 20px", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#e5e7eb" }}>Support</h4>
          {["Help Center", "Track Order", "Returns", "Shipping Info", "Contact Us", "FAQs"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: "#9ca3af", textDecoration: "none", fontSize: "14px", marginBottom: "10px", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = "#818cf8"}
              onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            >{l}</a>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 style={{ margin: "0 0 20px", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#e5e7eb" }}>Company</h4>
          {["About Us", "Careers", "Press", "Blog", "Privacy Policy", "Terms"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: "#9ca3af", textDecoration: "none", fontSize: "14px", marginBottom: "10px", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = "#818cf8"}
              onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            >{l}</a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid #1f2937", padding: "20px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>© 2024 ShopHub. All rights reserved.</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {["💳 Visa", "💳 Mastercard", "💳 PayPal", "💳 Apple Pay"].map(p => (
              <span key={p} style={{ background: "#1f2937", border: "1px solid #374151", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", color: "#9ca3af" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
