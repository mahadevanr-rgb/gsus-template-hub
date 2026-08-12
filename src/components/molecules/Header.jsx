import { Menu, X } from "lucide-react";
import Logo from "../atoms/Logo";
import { useState } from "react";

export default function Header({ onNavigate, currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Dashboard", page: "dashboard" },
    { label: "Templates", page: "templates" },
    { label: "Components", page: "components" },
    { label: "Create Project", page: "create-project" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Floating Appbar */}
        <div className="bg-white border-2 border-cyan-500 rounded-3xl shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex-shrink-0 hover:scale-105 transition-transform duration-200">
              <Logo />
            </div>

            {/* Center: Navigation - Desktop */}
            {/* <nav className="hidden md:flex items-center gap-8 flex-1 px-12">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate && onNavigate(item.page)}
                  className={`text-sm font-semibold transition-all duration-200 relative group ${
                    currentPage === item.page
                      ? "text-cyan-600"
                      : "text-gray-700 hover:text-cyan-600"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300 ${
                      currentPage === item.page
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </nav> */}

            {/* Mobile Menu Button */}
            {/* <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-cyan-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-600" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-600" />
              )}
            </button> */}
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 flex flex-col gap-2 border-t border-gray-200 pt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate && onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all text-left ${
                    currentPage === item.page
                      ? "bg-cyan-100 text-cyan-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
