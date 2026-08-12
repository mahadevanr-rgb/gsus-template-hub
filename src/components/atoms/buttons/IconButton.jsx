import "./buttons.css";

export default function IconButton({
  icon,
  onClick,
  label,
  variant = "primary",
}) {
  return (
    <button
      className={`btn btn-icon-only btn-icon-${variant}`}
      onClick={onClick}
      title={label}
    >
      {icon}
    </button>
  );
}
