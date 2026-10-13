import { useState } from "react";
import { Home, Compass, Bell, User, PlusCircle } from "lucide-react";

/**
 * Reusable BottomNavigation component
 * Mobile-first navigation bar with icon badges, active indicator, action button, and safe-area padding
 */
export default function BottomNavigation({
  items = [
    { id: "home", label: "Home", icon: Home, badge: null },
    { id: "explore", label: "Explore", icon: Compass, badge: "New" },
    { id: "create", label: "Create", icon: PlusCircle, isAction: true },
    { id: "alerts", label: "Alerts", icon: Bell, badge: 4 },
    { id: "profile", label: "Profile", icon: User, badge: null },
  ],
  activeId = "home",
  onChange = null,
  fixed = false, // If true, fixed to bottom of screen; if false, inline demo
  className = "",
}) {
  const [currentActive, setCurrentActive] = useState(activeId);

  const active = onChange ? activeId : currentActive;

  const handleClick = (item) => {
    if (!onChange) {
      setCurrentActive(item.id);
    }
    if (onChange) {
      onChange(item.id, item);
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className={`${
        fixed
          ? "fixed bottom-0 inset-x-0 z-40 pb-safe"
          : "relative w-full max-w-md mx-auto"
      } bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t sm:border border-slate-200 dark:border-slate-800 sm:rounded-3xl shadow-xl shadow-black/10 dark:shadow-black/40 px-2 py-2 select-none ${className}`}
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item)}
                className="flex flex-col items-center justify-center -mt-6 p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/40 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                aria-label={item.label}
              >
                {Icon && <Icon className="w-6 h-6 stroke-[2.2]" />}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <div className="relative">
                {Icon && (
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                )}

                {/* Badges */}
                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 flex items-center justify-center text-[9px] font-bold rounded-full text-white ${
                      typeof item.badge === "number"
                        ? "bg-rose-500"
                        : "bg-indigo-600 text-[8px]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] tracking-tight mt-1 truncate">
                {item.label}
              </span>

              {/* Active Indicator bar */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
