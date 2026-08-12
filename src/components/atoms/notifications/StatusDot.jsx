export const StatusDot = ({ status = "online", label, pulse = false }) => {
  const colors = { online: "#22c55e", offline: "#9ca3af", busy: "#ef4444", away: "#f59e0b", pending: "#3b82f6" };
  const color = colors[status] || colors.online;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <div style={{ position: "relative", width: "10px", height: "10px" }}>
        {pulse && <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />}
        <span style={{ position: "relative", display: "block", width: "10px", height: "10px", borderRadius: "50%", background: color }} />
      </div>
      {label && <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, textTransform: "capitalize" }}>{label}</span>}
      <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
    </div>
  );
};
