import { Boxes, CircleHelp, Gauge, LayoutPanelLeft, LayoutTemplate, MonitorSmartphone, Settings, Smartphone, Store } from "lucide-react";

const navigationGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: Gauge },
      { label: "Layout Sections", icon: LayoutPanelLeft },
      { label: "Components", icon: Boxes },
      { label: "Templates", icon: LayoutTemplate },
    ],
  },
  {
    label: "Workspaces",
    items: [
      { label: "Web Apps", icon: MonitorSmartphone },
      { label: "Mobile Apps", icon: Smartphone },
      { label: "Marketing", icon: Store },
    ],
  },
];

/** A persistent, configurable application sidebar. Render inside a flex shell. */
export default function Sidebar({
  activeItem = "Layout Sections",
  onNavigate,
  storageUsed = 85,
  responsive = true,
  brandName = "TemplateHub",
  brandLogo = "",
  accentColor = "#6366f1",
  colorMode = "dark",
  showStorage = true,
  showSettings = true,
  showSupport = true,
}) {
  const usage = Math.min(100, Math.max(0, Number(storageUsed) || 0));
  const dark = colorMode !== "light";
  const palette = dark
    ? { background: "#111827", foreground: "#f8fafc", muted: "#94a3b8", subtle: "#64748b", border: "#263244", hover: "#1f2937", track: "#263244" }
    : { background: "#ffffff", foreground: "#0f172a", muted: "#475569", subtle: "#64748b", border: "#e2e8f0", hover: "#f1f5f9", track: "#e2e8f0" };
  const showFooter = showStorage || showSettings || showSupport;

  return (
    <aside
      className={`sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r ${responsive ? "hidden lg:flex" : "flex"}`}
      style={{ backgroundColor: palette.background, color: palette.foreground, borderColor: palette.border }}
    >
      <div className="flex min-h-[72px] items-center gap-3 border-b px-5" style={{ borderColor: palette.border }}>
        {brandLogo ? (
          <img src={brandLogo} alt={`${brandName} logo`} className="h-9 w-9 shrink-0 rounded-lg object-contain" />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, #9333ea)` }}>
            <LayoutTemplate className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
        <span className="min-w-0 truncate text-sm font-bold tracking-tight">{brandName}</span>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6" aria-label="Sidebar navigation">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: palette.subtle }}>{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ label, icon: Icon }) => {
                const isActive = activeItem === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onNavigate?.(label)}
                    aria-current={isActive ? "page" : undefined}
                    className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors"
                    style={isActive
                      ? { backgroundColor: `${accentColor}18`, color: accentColor }
                      : { color: palette.muted }}
                    onMouseEnter={(event) => { if (!isActive) event.currentTarget.style.backgroundColor = palette.hover; }}
                    onMouseLeave={(event) => { if (!isActive) event.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {showFooter && <div className="space-y-4 border-t p-4" style={{ borderColor: palette.border }}>
        {showStorage && <div>
          <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
            <span className="font-medium" style={{ color: palette.foreground }}>Storage usage</span>
            <span style={{ color: palette.subtle }}>{usage}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: palette.track }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${usage}%`, backgroundColor: accentColor }} />
          </div>
        </div>}
        {(showSettings || showSupport) && <div className="grid grid-cols-2 gap-2">
          {showSettings && <button type="button" onClick={() => onNavigate?.("Settings")} className="flex min-h-9 items-center justify-center gap-2 rounded-lg border px-2 text-[11px] font-medium transition-colors" style={{ borderColor: palette.border, color: palette.muted }} onMouseEnter={(event) => { event.currentTarget.style.borderColor = accentColor; event.currentTarget.style.color = accentColor; }} onMouseLeave={(event) => { event.currentTarget.style.borderColor = palette.border; event.currentTarget.style.color = palette.muted; }}><Settings className="h-3.5 w-3.5" />Settings</button>}
          {showSupport && <button type="button" onClick={() => onNavigate?.("Support")} className="flex min-h-9 items-center justify-center gap-2 rounded-lg border px-2 text-[11px] font-medium transition-colors" style={{ borderColor: palette.border, color: palette.muted }} onMouseEnter={(event) => { event.currentTarget.style.borderColor = accentColor; event.currentTarget.style.color = accentColor; }} onMouseLeave={(event) => { event.currentTarget.style.borderColor = palette.border; event.currentTarget.style.color = palette.muted; }}><CircleHelp className="h-3.5 w-3.5" />Support</button>}
        </div>}
      </div>}
    </aside>
  );
}
