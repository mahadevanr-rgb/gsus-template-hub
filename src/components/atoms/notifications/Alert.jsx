export const Alert = ({ type = "info", title, message, onClose }) => {
  const styles = {
    success: { bg: "#f0fdf4", border: "#bbf7d0", icon: "✅", titleColor: "#15803d", msgColor: "#166534" },
    error:   { bg: "#fef2f2", border: "#fecaca", icon: "🚨", titleColor: "#dc2626", msgColor: "#991b1b" },
    warning: { bg: "#fffbeb", border: "#fde68a", icon: "⚠️", titleColor: "#d97706", msgColor: "#92400e" },
    info:    { bg: "#eff6ff", border: "#bfdbfe", icon: "💡", titleColor: "#2563eb", msgColor: "#1e40af" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "12px", padding: "16px 20px", display: "flex", gap: "12px", width: "100%" }}>
      <span style={{ fontSize: "20px", flexShrink: 0 }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "14px", color: s.titleColor }}>{title}</p>}
        <p style={{ margin: 0, fontSize: "13px", color: s.msgColor, lineHeight: 1.5 }}>{message}</p>
      </div>
      {onClose && <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "16px", alignSelf: "flex-start" }}>✕</button>}
    </div>
  );
};
