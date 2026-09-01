export const ConfirmDialog = ({ title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, type = "danger" }) => {
  const colors = { danger: "#ef4444", warning: "#f59e0b", info: "#3b82f6", success: "#22c55e" };
  const icons  = { danger: "🗑️", warning: "⚠️", info: "ℹ️", success: "✅" };
  const color  = colors[type] || colors.danger;
  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxWidth: "380px", width: "100%" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "16px" }}>
        {icons[type]}
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>{title}</h3>
      <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#6b7280", lineHeight: 1.5 }}>{message}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>{cancelLabel}</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "8px", background: color, color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>{confirmLabel}</button>
      </div>
    </div>
  );
};
