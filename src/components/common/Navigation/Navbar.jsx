import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/**
 * Reusable Navbar component
 * Supports brand logo, links, dropdown items, mobile menu toggle, and actions
 */
export default function Navbar({
  brand = { name: "Acme Corp", href: "#", logo: null },
  items = [
    { label: "Home", href: "#", active: true },
    { label: "Features", href: "#" },
    {
      label: "Solutions",
      href: "#",
      children: [
        { label: "Enterprise Suite", description: "For fast-scaling teams", href: "#" },
        { label: "Security & Cloud", description: "SOC2 compliant infra", href: "#" },
        { label: "API Integrations", description: "REST & GraphQL connectors", href: "#" },
      ],
    },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  actions = null,
  activeHref = null,
  onItemClick = null,
  className = "",
  variant = "glass", // "glass" | "solid" | "bordered"
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const variantClasses = {
    glass: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm",
    solid: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm",
    bordered: "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm my-2",
  };

  const handleLinkClick = (e, item) => {
    if (item.children) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === item.label ? null : item.label));
      return;
    }
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <nav className={`w-full transition-colors ${variantClasses[variant] || variantClasses.glass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <a
              href={brand.href || "#"}
              className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-white tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
            >
              {brand.logo || (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
                  {brand.name ? brand.name.charAt(0) : "A"}
                </div>
              )}
              <span className="truncate">{brand.name}</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div ref={dropdownRef} className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = activeHref ? activeHref === item.href : item.active;
              const hasChildren = item.children && item.children.length > 0;
              const isDropdownOpen = openDropdown === item.label;

              return (
                <div key={item.label} className="relative">
                  <a
                    href={item.href || "#"}
                    onClick={(e) => handleLinkClick(e, item)}
                    aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {hasChildren && isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {item.children.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href || "#"}
                          onClick={(e) => handleLinkClick(e, subItem)}
                          className="flex flex-col p-2.5 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {subItem.label}
                          </span>
                          {subItem.description && (
                            <span className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                              {subItem.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {actions || (
              <>
                <button
                  type="button"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-xl shadow-sm shadow-indigo-600/30 transition-all"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Collapse */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {items.map((item) => {
            const isActive = activeHref ? activeHref === item.href : item.active;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label} className="space-y-1">
                <a
                  href={item.href || "#"}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {hasChildren && <ChevronDown className="w-4 h-4 opacity-70" />}
                </a>

                {hasChildren && (
                  <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                    {item.children.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href || "#"}
                        onClick={(e) => handleLinkClick(e, subItem)}
                        className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              className="w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm shadow-indigo-600/30"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
