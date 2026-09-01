import "./buttons.css";

export default function PrimaryButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
