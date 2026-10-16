import { useState } from "react";
import { Bell, ChevronDown, LayoutTemplate, Search, X } from "lucide-react";

const defaultNavigation = ["Dashboard", "Components", "Layouts", "Docs"];

/** A responsive, single-row application navbar with search and profile actions. */
export default function Navbar({
  navigation = defaultNavigation,
  activeItem = "Layouts",
  onNavigate,
  onSearch,
  onNotifications,
  brandName = "TemplateHub",
  brandLogo = "",
  searchPlaceholder = "Search...",
  accentColor = "#4f46e5",
  colorMode = "dark",
  showSearch = true,
  showNotifications = true,
  showProfile = true,
  showUpgrade = true,
  userName = "Jordan Davis",
  userInitials,
  ctaLabel = "Get started",
  onUpgrade,
}) {
  const [failedLogo, setFailedLogo] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = colorMode === "dark";
  const palette = dark
    ? { background: "#0b1220", foreground: "#f8fafc", muted: "#94a3b8", border: "#243247", input: "#111c2e", hover: "#17243a" }
    : { background: "#ffffff", foreground: "#0f172a", muted: "#64748b", border: "#e2e8f0", input: "#f8fafc", hover: "#f1f5f9" };
  const initials = userInitials || userName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl" style={{ backgroundColor: `${palette.background}f2`, borderColor: palette.border }}>
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center gap-2 sm:gap-4">
          <button type="button" onClick={() => onNavigate?.("Dashboard")} className="flex min-w-0 shrink items-center gap-2.5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 sm:w-48 sm:shrink-0" style={{ color: palette.foreground, "--tw-ring-color": accentColor }} aria-label={`${brandName} home`}>
            {brandLogo && failedLogo !== brandLogo ? (
              <img src={brandLogo} alt="" className="h-9 w-9 shrink-0 object-contain" onError={() => setFailedLogo(brandLogo)} />
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundColor: accentColor }}>
                <LayoutTemplate className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
            )}
            <span className="max-w-32 truncate text-sm font-bold tracking-tight sm:max-w-none">{brandName}</span>
          </button>

          <nav className="hidden shrink-0 items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const selected = activeItem === item;
              return (
                <button key={item} type="button" onClick={() => onNavigate?.(item)} aria-current={selected ? "page" : undefined} className="shrink-0 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-[13px]" style={selected ? { color: accentColor, backgroundColor: `${accentColor}14` } : { color: palette.muted }} onMouseEnter={(event) => { if (!selected) event.currentTarget.style.backgroundColor = palette.hover; }} onMouseLeave={(event) => { if (!selected) event.currentTarget.style.backgroundColor = "transparent"; }}>
                  {item}
                </button>
              );
            })}
          </nav>

          {showSearch && (
            <label className="relative mx-1 hidden min-w-32 max-w-xs flex-1 lg:flex sm:mx-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: palette.muted }} aria-hidden="true" />
              <input type="search" placeholder={searchPlaceholder} onChange={(event) => onSearch?.(event.target.value)} onFocus={(event) => { event.currentTarget.style.borderColor = accentColor; event.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}20`; }} onBlur={(event) => { event.currentTarget.style.borderColor = palette.border; event.currentTarget.style.boxShadow = "none"; }} className="h-10 w-full rounded-xl border py-2 pl-9 pr-3 text-sm outline-none transition-shadow" style={{ borderColor: palette.border, backgroundColor: palette.input, color: palette.foreground }} />
            </label>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2.5">
            {showNotifications && (
              <button type="button" aria-label="Notifications" onClick={onNotifications} className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors" style={{ color: palette.muted }} onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = palette.hover; }} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = "transparent"; }}>
                <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 0 2px ${palette.background}` }} />
              </button>
            )}
            {showProfile && (
              <button type="button" aria-label={`Open ${userName}'s profile`} className="flex shrink-0 items-center gap-2 rounded-xl p-1 transition-colors" style={{ color: palette.foreground }} onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = palette.hover; }} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = "transparent"; }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ backgroundColor: accentColor }}>{initials}</span>
                <span className="hidden max-w-28 truncate text-xs font-medium sm:block">{userName}</span>
                <ChevronDown className="h-4 w-4" style={{ color: palette.muted }} aria-hidden="true" />
              </button>
            )}
            {showUpgrade && (
              <button type="button" onClick={onUpgrade} className="hidden min-h-9 shrink-0 items-center justify-center rounded-lg px-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex sm:px-3.5" style={{ backgroundColor: accentColor }}>{ctaLabel}</button>
            )}
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:hidden" style={{ color: palette.foreground }} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="navbar-mobile-menu" onClick={() => setMenuOpen((open) => !open)} onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = palette.hover; }} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = "transparent"; }}>
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <span className="flex w-[18px] flex-col gap-1" aria-hidden="true"><span className="h-0.5 w-full rounded-full bg-current" /><span className="h-0.5 w-full rounded-full bg-current" /><span className="h-0.5 w-full rounded-full bg-current" /></span>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="navbar-mobile-menu" className="space-y-3 border-t py-3 lg:hidden" style={{ borderColor: palette.border }}>
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navigation.map((item) => {
                const selected = activeItem === item;
                return <button key={item} type="button" onClick={() => { onNavigate?.(item); setMenuOpen(false); }} aria-current={selected ? "page" : undefined} className="rounded-lg px-3 py-2.5 text-left text-sm font-medium" style={selected ? { color: accentColor, backgroundColor: `${accentColor}14` } : { color: palette.muted }}>{item}</button>;
              })}
            </nav>
            {showSearch && (
              <label className="relative flex w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: palette.muted }} aria-hidden="true" />
                <input type="search" placeholder={searchPlaceholder} onChange={(event) => onSearch?.(event.target.value)} onFocus={(event) => { event.currentTarget.style.borderColor = accentColor; event.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}20`; }} onBlur={(event) => { event.currentTarget.style.borderColor = palette.border; event.currentTarget.style.boxShadow = "none"; }} className="h-10 w-full rounded-xl border py-2 pl-9 pr-3 text-sm outline-none transition-shadow" style={{ borderColor: palette.border, backgroundColor: palette.input, color: palette.foreground }} />
              </label>
            )}
            {showUpgrade && <button type="button" onClick={onUpgrade} className="min-h-10 w-full rounded-lg px-3 text-sm font-semibold text-white" style={{ backgroundColor: accentColor }}>{ctaLabel}</button>}
          </div>
        )}
      </div>
    </header>
  );
}
