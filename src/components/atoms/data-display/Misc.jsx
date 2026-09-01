export const Kbd = ({ children }) => (
  <kbd style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", background: "#f3f4f6", border: "1px solid #d1d5db", borderBottom: "3px solid #d1d5db", borderRadius: "6px", fontSize: "12px", fontFamily: "monospace", color: "#374151", fontWeight: 600 }}>{children}</kbd>
);

export const Divider = ({ label, color = "#e5e7eb" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
    <div style={{ flex: 1, height: "1px", background: color }} />
    {label && <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>}
    {label && <div style={{ flex: 1, height: "1px", background: color }} />}
  </div>
);

export const Tooltip = ({ label, children }) => (
  <div style={{ position: "relative", display: "inline-flex" }}
    onMouseEnter={e => e.currentTarget.querySelector(".tip").style.opacity = "1"}
    onMouseLeave={e => e.currentTarget.querySelector(".tip").style.opacity = "0"}
  >
    {children}
    <div className="tip" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1f2937", color: "#fff", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", whiteSpace: "nowrap", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none", zIndex: 100 }}>{label}</div>
  </div>
);
