import { Bell, ChevronDown, LayoutTemplate, Search } from "lucide-react";

const defaultNavigation = ["Dashboard", "Components", "Layouts", "Docs"];

/** A responsive application navbar for layout previews and production dashboards. */
export default function Navbar({
  navigation = defaultNavigation,
  activeItem = "Layouts",
  onNavigate,
  onSearch,
  userName = "Jordan Davis",
  userInitials = "JD",
  onUpgrade,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-[#0b0f19]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => onNavigate?.("Dashboard")} className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30">
            <LayoutTemplate className="h-5 w-5 text-white" />
          </span>
          <span className="text-base font-bold tracking-tight text-white">TemplateHub</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onNavigate?.(item)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                activeItem === item ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:bg-gray-800/70 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <label className="relative mx-auto hidden w-full max-w-sm lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search layouts..."
            onChange={(event) => onSearch?.(event.target.value)}
            className="h-10 w-full rounded-xl border border-gray-800 bg-[#111827] py-2 pl-9 pr-12 text-sm text-white outline-none placeholder:text-slate-500 transition-all duration-300 focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/10"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">/</kbd>
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <button type="button" aria-label="Notifications" className="relative rounded-xl p-2 text-slate-400 transition-all duration-300 hover:bg-gray-800 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500 ring-2 ring-[#0b0f19]" />
          </button>
          <button type="button" aria-label={`Open ${userName}'s menu`} className="hidden items-center gap-2 rounded-xl p-1 pr-2 text-slate-300 transition-all duration-300 hover:bg-gray-800 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">{userInitials}</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
          <button type="button" onClick={onUpgrade} className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 sm:px-4 sm:text-sm">
            Upgrade Pro
          </button>
        </div>
      </div>
    </header>
  );
}
