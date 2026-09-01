export const Skeleton = ({ width = "100%", height = "16px", rounded = false, circle = false }) => (
  <div style={{
    width: circle ? height : width,
    height,
    borderRadius: circle ? "50%" : rounded ? "999px" : "6px",
    background: "linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  }}>
    <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
  </div>
);

export const SkeletonCard = () => (
  <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Skeleton width="48px" height="48px" circle />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton width="60%" height="14px" />
        <Skeleton width="40%" height="12px" />
      </div>
    </div>
    <Skeleton width="100%" height="12px" />
    <Skeleton width="85%" height="12px" />
    <Skeleton width="70%" height="12px" />
    <Skeleton width="40%" height="32px" rounded />
  </div>
);
