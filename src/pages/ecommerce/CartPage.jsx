export default function CartPage({ cart = [], onUpdateQty, onRemove, onNavigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ fontSize: "120px", marginBottom: "24px" }}>🛒</div>
        <h2 style={{ margin: "0 0 12px", fontSize: "32px", fontWeight: 800, color: "#111827" }}>Your cart is empty</h2>
        <p style={{ margin: "0 0 32px", fontSize: "16px", color: "#6b7280" }}>Looks like you haven't added anything yet. Start shopping!</p>
        <button onClick={() => onNavigate("products")} style={{ padding: "14px 32px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "32px", minHeight: "100vh" }}>
      {/* Cart Items */}
      <div>
        <h1 style={{ margin: "0 0 24px", fontSize: "32px", fontWeight: 800, color: "#111827" }}>Shopping Cart ({cart.length})</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cart.map(item => (
            <div key={item.id} style={{ background: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e5e7eb", display: "flex", gap: "20px" }}>
              <div style={{ width: "120px", height: "120px", background: `${item.color}12`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px", flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 700, color: "#111827" }}>{item.name}</h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{item.category}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "20px" }}>🗑️</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{item.rating}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ padding: "8px 14px", background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}>−</button>
                    <span style={{ padding: "8px 16px", fontWeight: 700, fontSize: "15px" }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ padding: "8px 14px", background: "#f9fafb", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}>+</button>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>${(item.price * item.qty).toFixed(2)}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>${item.price} each</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => onNavigate("products")} style={{ marginTop: "20px", padding: "12px 24px", background: "none", border: "2px solid #6366f1", color: "#6366f1", borderRadius: "12px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
          ← Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div style={{ position: "sticky", top: "160px", height: "fit-content" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ margin: "0 0 24px", fontSize: "20px", fontWeight: 800, color: "#111827" }}>Order Summary</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#6b7280" }}>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#111827" }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#6b7280" }}>Shipping</span>
              <span style={{ fontWeight: 600, color: shipping === 0 ? "#22c55e" : "#111827" }}>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#6b7280" }}>Tax (8%)</span>
              <span style={{ fontWeight: 600, color: "#111827" }}>${tax.toFixed(2)}</span>
            </div>
          </div>

          {subtotal < 50 && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "12px", marginBottom: "20px", fontSize: "13px", color: "#d97706" }}>
              💡 Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for free shipping!
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "18px" }}>
            <span style={{ fontWeight: 800, color: "#111827" }}>Total</span>
            <span style={{ fontWeight: 900, fontSize: "28px", color: "#111827" }}>${total.toFixed(2)}</span>
          </div>

          <button style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer", marginBottom: "12px" }}>
            Proceed to Checkout →
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "12px", color: "#6b7280" }}>
            <span>🔒</span>
            <span>Secure checkout powered by Stripe</span>
          </div>
        </div>

        {/* Promo Code */}
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e5e7eb", marginTop: "16px" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 700, color: "#111827" }}>Have a promo code?</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <input type="text" placeholder="Enter code" style={{ flex: 1, padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none" }} />
            <button style={{ padding: "10px 20px", background: "#111827", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
