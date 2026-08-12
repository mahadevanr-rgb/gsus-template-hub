import "./buttons.css";

export default function OutlineButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-outline" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
