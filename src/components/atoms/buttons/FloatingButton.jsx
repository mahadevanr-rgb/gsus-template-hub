import "./buttons.css";

export default function FloatingButton({ icon, onClick, label }) {
  return (
    <button className="btn btn-floating" onClick={onClick} title={label}>
      {icon}
    </button>
  );
}
