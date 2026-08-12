export const Snackbar = ({ message, action, onAction, onClose }) => (
  <div style={{ background: "#1f2937", color: "#fff", padding: "12px 20px", borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", maxWidth: "420px" }}>
    <span style={{ fontSize: "14px" }}>{message}</span>
    {action && <button onClick={onAction} style={{ background: "none", border: "none", color: "#818cf8", fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>{action}</button>}
    {onClose && <button onClick={onClose} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "16px" }}>✕</button>}
  </div>
);
