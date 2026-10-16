import { ArrowRight, Check, Play } from "lucide-react";

const previewBars = [38, 58, 46, 74, 55, 88, 66, 96, 72, 82, 61, 91];

/** A reusable product hero with editable copy, actions, and appearance. */
export default function HeroSection({
  onExplore,
  onPlayground,
  eyebrow,
  announcement,
  title,
  headline,
  highlightedText,
  trailingHeadline,
  description = "A clear, concise description of what your product helps people do.",
  primaryLabel = "Get started",
  secondaryLabel = "Learn more",
  accentColor = "#4f46e5",
  colorMode = "dark",
  alignment = "left",
  showEyebrow = true,
  showSecondaryAction = true,
  showVisual = true,
  showCodePreview,
}) {
  const resolvedTitle = title || [headline, highlightedText, trailingHeadline].filter(Boolean).join(" ") || "Build a better experience";
  const resolvedEyebrow = eyebrow ?? announcement ?? "A better way to work";
  const dark = colorMode === "dark";
  const showProductVisual = showCodePreview ?? showVisual;
  const centered = alignment === "center";
  const palette = dark
    ? { background: "#0b1220", foreground: "#f8fafc", muted: "#a7b4c8", surface: "#111c2e", border: "#26364d", soft: "#17243a" }
    : { background: "#ffffff", foreground: "#0f172a", muted: "#526078", surface: "#f8fafc", border: "#e2e8f0", soft: "#eef2ff" };

  const visual = (
    <div className="relative mx-auto w-full max-w-xl" role="img" aria-label="Abstract product dashboard preview">
      <div className="overflow-hidden rounded-2xl border shadow-xl" style={{ borderColor: palette.border, backgroundColor: palette.surface, boxShadow: `0 24px 64px ${accentColor}18` }}>
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: palette.border }}>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accentColor }} /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /></div>
          <span className="h-2 w-20 rounded-full" style={{ backgroundColor: palette.border }} />
        </div>
        <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] gap-5 p-5 sm:p-7">
          <div className="space-y-3 border-r pr-4" style={{ borderColor: palette.border }}>
            <span className="block h-2.5 w-4/5 rounded-full" style={{ backgroundColor: accentColor }} />
            {["w-full", "w-4/5", "w-11/12", "w-3/4", "w-full", "w-2/3"].map((width, index) => <span key={index} className={`block h-2 ${width} rounded-full`} style={{ backgroundColor: palette.border }} />)}
          </div>
          <div className="min-w-0">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="space-y-2"><span className="block h-3 w-28 rounded-full" style={{ backgroundColor: palette.foreground, opacity: 0.8 }} /><span className="block h-2 w-20 rounded-full" style={{ backgroundColor: palette.muted, opacity: 0.45 }} /></div>
              <span className="rounded-lg px-3 py-2" style={{ backgroundColor: `${accentColor}18` }}><Check className="h-4 w-4" style={{ color: accentColor }} /></span>
            </div>
            <div className="flex h-32 items-end gap-2 rounded-xl border px-3 pb-3 pt-5 sm:h-40 sm:gap-3 sm:px-5" style={{ borderColor: palette.border, backgroundColor: palette.background }}>
              {previewBars.map((height, index) => <span key={index} className="min-w-0 flex-1 rounded-t-sm" style={{ height: `${height}%`, backgroundColor: accentColor, opacity: 0.3 + (index % 4) * 0.16 }} />)}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => <div key={item} className="space-y-2 rounded-lg border p-3" style={{ borderColor: palette.border }}><span className="block h-2 w-3/4 rounded-full" style={{ backgroundColor: palette.muted, opacity: 0.45 }} /><span className="block h-3 w-1/2 rounded-full" style={{ backgroundColor: palette.foreground, opacity: 0.65 }} /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24" style={{ backgroundColor: palette.background, color: palette.foreground }}>
      <div className={`mx-auto grid w-full max-w-7xl items-center gap-12 lg:gap-16 ${showProductVisual && !centered ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        <div className={`min-w-0 ${centered ? "mx-auto flex max-w-4xl flex-col items-center text-center" : "max-w-2xl"}`}>
          {showEyebrow && resolvedEyebrow && <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: accentColor }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />{resolvedEyebrow}</p>}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{resolvedTitle}</h1>
          {description && <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: palette.muted }}>{description}</p>}
          <div className={`mt-8 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
            <button type="button" onClick={onExplore} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>
              {primaryLabel}<ArrowRight className="h-4 w-4" />
            </button>
            {showSecondaryAction && <button type="button" onClick={onPlayground} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800" style={{ borderColor: palette.border, color: palette.foreground }}>
              <Play className="h-4 w-4" />{secondaryLabel}
            </button>}
          </div>
        </div>
        {showProductVisual && !centered && visual}
        {showProductVisual && centered && <div className="mx-auto mt-2 w-full max-w-3xl">{visual}</div>}
      </div>
    </section>
  );
}
