export const InlineMessage = ({ type = "info", message }) => {
  const styles = {
    success: { color: "#15803d", icon: "✅" },
    error:   { color: "#dc2626", icon: "❌" },
    warning: { color: "#d97706", icon: "⚠️" },
    info:    { color: "#2563eb", icon: "ℹ️" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "14px" }}>{s.icon}</span>
      <span style={{ fontSize: "13px", color: s.color, fontWeight: 500 }}>{message}</span>
    </div>
  );
};
