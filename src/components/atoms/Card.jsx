export default function Card({ children, className = "", onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:border-slate-700 transition-all duration-300
                  ${onClick ? "cursor-pointer" : ""}
                  ${className}`}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
}
