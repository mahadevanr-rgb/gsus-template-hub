import "./buttons.css";

export default function ShadowButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-shadow" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
