export default function Avatar({ name = "User" }) {
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white dark:ring-slate-900 flex-shrink-0">
      {initials}
    </div>
  );
}
