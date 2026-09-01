import { useState } from "react";
import { products } from "./data";

export default function ProductDetails({ productId, onBack, onAddToCart, onNavigate }) {
  const product = products.find(p => p.id === productId);
  const related = products.filter(p => p.id !== productId && p.category === product?.category).slice(0, 3);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const reviews = [
    { name: "Sarah M.", rating: 5, date: "Dec 2024", comment: "Absolutely love this product! Exceeded all my expectations. The quality is outstanding and delivery was super fast." },
    { name: "James K.", rating: 5, date: "Nov 2024", comment: "Best purchase I've made this year. Highly recommend to anyone looking for premium quality." },
    { name: "Priya R.", rating: 4, date: "Nov 2024", comment: "Great product overall. Minor packaging issue but the product itself is perfect." },
  ];

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
          <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "13px" }}>Home</button>
          <span>›</span>
          <button onClick={() => onNavigate("products")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "13px" }}>Products</button>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
        {/* Left: Image */}
        <div>
          <div style={{ background: `${product.color}12`, borderRadius: "24px", height: "480px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: `2px solid ${product.color}20` }}>
            <div style={{ fontSize: "200px" }}>{product.emoji}</div>
            {product.badge && (
              <div style={{ position: "absolute", top: "20px", left: "20px", background: product.color, color: "#fff", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 700 }}>{product.badge}</div>
            )}
            {discount > 0 && (
              <div style={{ position: "absolute", top: "20px", right: "20px", background: "#ef4444", color: "#fff", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 700 }}>-{discount}%</div>
            )}
          </div>
          {/* Thumbnail Row */}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ flex: 1, background: `${product.color}10`, borderRadius: "12px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", cursor: "pointer", border: i === 1 ? `2px solid ${product.color}` : "2px solid transparent" }}>
                {product.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{product.category}</div>
          <h1 style={{ margin: "0 0 16px", fontSize: "36px", fontWeight: 900, color: "#111827", lineHeight: 1.2 }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: s <= Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb", fontSize: "20px" }}>★</span>
              ))}
            </div>
            <span style={{ fontWeight: 700, color: "#111827" }}>{product.rating}</span>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontSize: "44px", fontWeight: 900, color: "#111827" }}>${product.price}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: "20px", color: "#9ca3af", textDecoration: "line-through" }}>${product.originalPrice}</span>
                <span style={{ background: "#fef2f2", color: "#ef4444", padding: "4px 10px", borderRadius: "8px", fontSize: "14px", fontWeight: 700 }}>Save ${product.originalPrice - product.price}</span>
              </>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {product.tags.map(tag => (
              <span key={tag} style={{ background: `${product.color}15`, color: product.color, padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600 }}>{tag}</span>
            ))}
          </div>

          {/* Stock */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: product.stock > 10 ? "#22c55e" : "#f59e0b" }} />
            <span style={{ fontSize: "14px", color: product.stock > 10 ? "#15803d" : "#d97706", fontWeight: 600 }}>
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left!`}
            </span>
          </div>

          {/* Quantity */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Quantity:</span>
            <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "10px 16px", background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "18px", fontWeight: 700 }}>−</button>
              <span style={{ padding: "10px 20px", fontWeight: 700, fontSize: "16px", minWidth: "40px", textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ padding: "10px 16px", background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "18px", fontWeight: 700 }}>+</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <button onClick={handleAddToCart}
              style={{ flex: 1, padding: "16px", background: added ? "#22c55e" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer", transition: "all 0.3s" }}>
              {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
            </button>
            <button style={{ flex: 1, padding: "16px", background: "#111827", color: "#fff", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
              ⚡ Buy Now
            </button>
            <button style={{ padding: "16px", background: "#fff", border: "2px solid #e5e7eb", borderRadius: "14px", cursor: "pointer", fontSize: "20px" }}>🤍</button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "🚚", title: "Free Delivery", desc: "On orders over $50" },
              { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
              { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption" },
              { icon: "🎁", title: "Gift Wrapping", desc: "Available at checkout" },
            ].map(b => (
              <div key={b.title} style={{ display: "flex", gap: "10px", padding: "12px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: "20px" }}>{b.icon}</span>
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#111827" }}>{b.title}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description / Reviews */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 80px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          {/* Tab Headers */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
            {["description", "reviews", "shipping"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "18px 32px", background: "none", border: "none", borderBottom: activeTab === tab ? "3px solid #6366f1" : "3px solid transparent", fontWeight: activeTab === tab ? 700 : 500, color: activeTab === tab ? "#6366f1" : "#6b7280", cursor: "pointer", fontSize: "15px", textTransform: "capitalize" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: "32px" }}>
            {activeTab === "description" && (
              <div>
                <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.8, marginBottom: "24px" }}>{product.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                  {product.tags.map(tag => (
                    <div key={tag} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px", background: "#f9fafb", borderRadius: "12px" }}>
                      <span style={{ color: "#22c55e", fontSize: "18px" }}>✓</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <div style={{ display: "flex", gap: "48px", marginBottom: "32px", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "64px", fontWeight: 900, color: "#111827" }}>{product.rating}</div>
                    <div style={{ color: "#f59e0b", fontSize: "24px" }}>{"★".repeat(5)}</div>
                    <div style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>{product.reviews.toLocaleString()} reviews</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[5,4,3,2,1].map(s => (
                      <div key={s} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "13px", color: "#6b7280", width: "16px" }}>{s}</span>
                        <span style={{ color: "#f59e0b" }}>★</span>
                        <div style={{ flex: 1, height: "8px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${s === 5 ? 70 : s === 4 ? 20 : 5}%`, background: "#f59e0b", borderRadius: "999px" }} />
                        </div>
                        <span style={{ fontSize: "13px", color: "#6b7280", width: "32px" }}>{s === 5 ? "70%" : s === 4 ? "20%" : "5%"}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {reviews.map((r, i) => (
                    <div key={i} style={{ padding: "20px", background: "#f9fafb", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{r.name[0]}</div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#111827" }}>{r.name}</p>
                            <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>{r.date}</p>
                          </div>
                        </div>
                        <div style={{ color: "#f59e0b" }}>{"★".repeat(r.rating)}</div>
                      </div>
                      <p style={{ margin: 0, fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {[
                  { icon: "🚀", title: "Express Delivery", desc: "1-2 business days", price: "$9.99" },
                  { icon: "🚚", title: "Standard Delivery", desc: "3-5 business days", price: "Free over $50" },
                  { icon: "🏪", title: "Store Pickup", desc: "Ready in 2 hours", price: "Free" },
                  { icon: "🌍", title: "International", desc: "7-14 business days", price: "From $19.99" },
                ].map(s => (
                  <div key={s.title} style={{ padding: "20px", background: "#f9fafb", borderRadius: "14px", border: "1px solid #e5e7eb", display: "flex", gap: "16px" }}>
                    <span style={{ fontSize: "32px" }}>{s.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "15px", color: "#111827" }}>{s.title}</p>
                      <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7280" }}>{s.desc}</p>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#6366f1" }}>{s.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 80px" }}>
          <h2 style={{ margin: "0 0 24px", fontSize: "28px", fontWeight: 800, color: "#111827" }}>Related Products</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {related.map(p => (
              <div key={p.id} onClick={() => onProductClick(p.id)}
                style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", cursor: "pointer", border: "1px solid #e5e7eb", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ background: `${p.color}12`, height: "180px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px" }}>{p.emoji}</div>
                <div style={{ padding: "16px" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 700, color: "#111827" }}>{p.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>${p.price}</span>
                    <span style={{ color: "#f59e0b", fontSize: "13px" }}>★ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
