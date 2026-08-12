import "./buttons.css";

export default function AnimatedButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-animated" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
      <span className="btn-shimmer"></span>
    </button>
  );
}
