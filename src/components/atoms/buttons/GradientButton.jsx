import "./buttons.css";

export default function GradientButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-gradient" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
    </button>
  );
}
