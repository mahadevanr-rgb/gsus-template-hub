export const Banner = ({ type = "info", message, action, onAction, onClose }) => {
  const styles = {
    success: { bg: "#22c55e" },
    error:   { bg: "#ef4444" },
    warning: { bg: "#f59e0b" },
    info:    { bg: "#3b82f6" },
    dark:    { bg: "#1f2937" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ background: s.bg, color: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", borderRadius: "10px", width: "100%" }}>
      <span style={{ fontSize: "14px", fontWeight: 500 }}>{message}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        {action && <button onClick={onAction} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "4px 12px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>{action}</button>}
        {onClose && <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "18px" }}>✕</button>}
      </div>
    </div>
  );
};
