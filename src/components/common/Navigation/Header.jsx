import { useState } from "react";
import { Search, Bell, Menu, X, ChevronRight, User } from "lucide-react";

/**
 * Reusable Header component
 * Supports configurable breadcrumbs, search bar, notifications, avatar profile, and mobile drawer toggle
 */
export default function Header({
  title = "Enterprise Console",
  breadcrumbs = null,
  searchPlaceholder = "Search records, metrics or commands...",
  onSearch = null,
  sticky = false,
  showSearch = true,
  showNotifications = true,
  unreadCount = 3,
  user = {
    name: "Sarah Jenkins",
    role: "Admin",
    avatar: null,
  },
  actions = null,
  onMenuToggle = null,
  className = "",
}) {
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header
      className={`w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors ${
        sticky ? "sticky top-0 z-30" : ""
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Toggle + Breadcrumbs / Title */}
          <div className="flex items-center gap-3 min-w-0">
            {onMenuToggle && (
              <button
                type="button"
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="min-w-0">
              {breadcrumbs ? (
                <nav aria-label="Header breadcrumbs" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {breadcrumbs.map((bc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {idx > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />}
                      {bc.href ? (
                        <a
                          href={bc.href}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate"
                        >
                          {bc.label}
                        </a>
                      ) : (
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {bc.label}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              ) : (
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                  {title}
                </h1>
              )}
            </div>
          </div>

          {/* Center: Search Area */}
          {showSearch && (
            <div className="hidden sm:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Right: Actions, Notifications, Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {showSearch && (
              <button
                type="button"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                className="sm:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle search input"
              >
                {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            )}

            {actions}

            {showNotifications && (
              <button
                type="button"
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>
            )}

            {/* User Profile */}
            {user && (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-sm">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name ? user.name.split(" ").map((n) => n[0]).join("") : <User className="w-4 h-4" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-none">
                    {user.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Input Row */}
        {showSearch && mobileSearchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
