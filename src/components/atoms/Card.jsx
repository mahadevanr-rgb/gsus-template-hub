export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
                  ${onClick ? "cursor-pointer" : ""} 
                  ${className}`}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
}
