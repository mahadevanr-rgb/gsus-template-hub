import "./buttons.css";

export default function SecondaryButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
