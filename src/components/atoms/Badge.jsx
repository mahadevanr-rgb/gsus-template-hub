export default function Badge({ text, variant = "default" }) {
  const variantClasses = {
    default: "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300",
    primary: "bg-primary-50 dark:bg-primary-500/15 text-primary-700 dark:text-primary-400",
    success: "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
}
