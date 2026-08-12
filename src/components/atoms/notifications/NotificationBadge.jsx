export const NotificationBadge = ({ count = 0, max = 99, dot = false, color = "#ef4444", children }) => (
  <div style={{ position: "relative", display: "inline-flex" }}>
    {children}
    {(dot || count > 0) && (
      <span style={{ position: "absolute", top: "-6px", right: "-6px", background: color, color: "#fff", borderRadius: "999px", minWidth: dot ? "10px" : "18px", height: dot ? "10px" : "18px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: dot ? 0 : "0 4px", border: "2px solid #fff" }}>
        {!dot && (count > max ? `${max}+` : count)}
      </span>
    )}
  </div>
);
