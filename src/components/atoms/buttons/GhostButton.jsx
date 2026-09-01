import "./buttons.css";

export default function GhostButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-ghost" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
