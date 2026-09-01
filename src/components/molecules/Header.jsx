import { Bell, ChevronDown } from "lucide-react";
import Avatar from "../atoms/Avatar";
import SearchInput from "../atoms/SearchInput";
import ThemeToggle from "../atoms/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-black border-slate-800/80 px-6">
      <div className="h-full flex items-center justify-between gap-4">
        {/* Search Input in Center/Left */}
        <div className="flex-1 max-w-md">
          <SearchInput />
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Icon */}
          <button
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0b0f19]" />
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Profile Initials Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none">
              <Avatar name="JD" />
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
