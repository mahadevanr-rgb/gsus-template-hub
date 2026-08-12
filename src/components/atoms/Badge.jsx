export default function Badge({ text, variant = "default" }) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-primary-100 text-primary-700",
    success: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
}
