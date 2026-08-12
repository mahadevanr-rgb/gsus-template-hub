export default function IconButton({ icon: Icon, label, className = "" }) {
  return (
    <button
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${className}`}
      title={label}
    >
      <Icon className="w-5 h-5 text-gray-700" />
    </button>
  );
}
