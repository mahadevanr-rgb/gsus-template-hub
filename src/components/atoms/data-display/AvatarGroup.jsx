export const AvatarItem = ({ name = "", src, size = "40px", color = "#6366f1" }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return src ? (
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", border: "2px solid #fff", flexShrink: 0 }}>{initials}</div>
  );
};

export const AvatarGroup = ({ users = [], max = 4, size = "40px" }) => {
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#22c55e", "#3b82f6"];
  const visible = users.slice(0, max);
  const extra   = users.length - max;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {visible.map((u, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: visible.length - i }}>
          <AvatarItem name={u.name} src={u.src} size={size} color={colors[i % colors.length]} />
        </div>
      ))}
      {extra > 0 && (
        <div style={{ marginLeft: "-10px", width: size, height: size, borderRadius: "50%", background: "#e5e7eb", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", border: "2px solid #fff" }}>+{extra}</div>
      )}
    </div>
  );
};
