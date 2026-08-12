import "./buttons.css";

export default function PulseButton({ label, onClick, icon }) {
  return (
    <button className="btn btn-pulse" onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{label}</span>
      <span className="btn-pulse-ring"></span>
    </button>
  );
}
