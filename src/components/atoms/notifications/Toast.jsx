export const Toast = ({ type = "success", message = "Action completed!", onClose }) => {
  const styles = {
    success: { bg: "#f0fdf4", border: "#22c55e", icon: "✅", text: "#15803d" },
    error:   { bg: "#fef2f2", border: "#ef4444", icon: "❌", text: "#dc2626" },
    warning: { bg: "#fffbeb", border: "#f59e0b", icon: "⚠️", text: "#d97706" },
    info:    { bg: "#eff6ff", border: "#3b82f6", icon: "ℹ️", text: "#2563eb" },
  };
  const s = styles[type] || styles.success;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderLeft: `4px solid ${s.border}`, borderRadius: "10px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", minWidth: "280px", maxWidth: "380px" }}>
      <span style={{ fontSize: "18px" }}>{s.icon}</span>
      <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: s.text }}>{message}</span>
      {onClose && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "16px" }}>✕</button>}
    </div>
  );
};
